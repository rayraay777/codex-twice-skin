#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { spawn, execFile } from "node:child_process";
import { openSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { evaluate, listTargets } from "./cdp.mjs";
import { buildInstallExpression, buildRemoveExpression, STATUS_EXPRESSION } from "./theme.mjs";

const run = promisify(execFile);
const PORT = 9342;
const APP = "/Applications/ChatGPT.app";
const EXECUTABLE = `${APP}/Contents/MacOS/ChatGPT`;
const BUNDLE_ID = "com.openai.codex";
const TEAM_ID = "2DC432GLL2";
const SOURCE_DIR = dirname(fileURLToPath(import.meta.url));
const RESTART_LOG = "/private/tmp/codex-twice-apply.log";
const LOGO = join(SOURCE_DIR, "..", "assets", "twice-logo.png");

async function loadLogo() {
  const bytes = await readFile(LOGO);
  const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length < 8 || bytes.length > 2000000 || pngMagic.some((value, index) => bytes[index] !== value)) {
    throw new Error("Bundled logo is not a bounded PNG");
  }
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

async function verifyOfficialApp({ allowUnverifiedSignature = false } = {}) {
  await access(EXECUTABLE);
  const bundle = await run("plutil", ["-extract", "CFBundleIdentifier", "raw", `${APP}/Contents/Info.plist`]);
  if (bundle.stdout.trim() !== BUNDLE_ID) throw new Error(`Refusing unexpected app bundle: ${bundle.stdout.trim()}`);
  try {
    await run("codesign", ["--verify", "--deep", "--strict", APP]);
  } catch {
    if (!allowUnverifiedSignature) {
      throw new Error("Codex app signature is invalid. Reinstall the official Codex app before applying this skin");
    }
    console.warn("Codex Twice warning: continuing with reduced signature verification by explicit request");
  }
  let signature;
  try {
    signature = await run("codesign", ["-dv", "--verbose=4", APP]);
  } catch (error) {
    signature = { stdout: error.stdout || "", stderr: error.stderr || "" };
  }
  const details = `${signature.stdout || ""}\n${signature.stderr || ""}`;
  if (!details.includes(`TeamIdentifier=${TEAM_ID}`)) throw new Error("Refusing app with an unexpected signing team");
}

async function listenerPids() {
  try {
    const { stdout } = await run("lsof", ["-nP", `-iTCP:${PORT}`, "-sTCP:LISTEN", "-t"]);
    const pids = [...new Set(stdout.trim().split(/\s+/).filter(Boolean))];
    if (pids.length === 0 || pids.some((pid) => !/^\d+$/.test(pid))) {
      throw new Error(`Port ${PORT} has an invalid owner list`);
    }
    return pids.map(Number);
  } catch (error) {
    if (error.code === 1 && !String(error.stdout || "").trim()) return [];
    throw error;
  }
}

async function assertCodexOwnsPort() {
  const pids = await listenerPids();
  if (pids.length === 0) throw new Error(`Codex debug port ${PORT} is not open`);
  const mainPids = [];
  for (const pid of pids) {
    const { stdout } = await run("lsof", ["-a", "-p", String(pid), "-d", "txt", "-Fn"]);
    const paths = stdout.split("\n").filter((line) => line.startsWith("n")).map((line) => line.slice(1));
    if (paths.includes(EXECUTABLE)) mainPids.push(pid);
  }
  if (mainPids.length !== 1) throw new Error(`Port ${PORT} has no unique exact Codex main owner`);
  const rootPid = mainPids[0];
  const { stdout: processTable } = await run("/bin/ps", ["-axo", "pid=,ppid=,command="]);
  const rows = new Map();
  for (const line of processTable.split("\n")) {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+(.*)$/);
    if (match) rows.set(Number(match[1]), { ppid: Number(match[2]), command: match[3] });
  }
  const root = rows.get(rootPid);
  if (!root || !(root.command === EXECUTABLE || root.command.startsWith(`${EXECUTABLE} `))) {
    throw new Error("Codex main process identity changed during verification");
  }
  for (const ownerPid of pids) {
    let current = ownerPid;
    const visited = new Set();
    while (current !== rootPid) {
      if (visited.has(current) || visited.size > 64) throw new Error("CDP owner ancestry is invalid");
      visited.add(current);
      const row = rows.get(current);
      if (!row || row.ppid <= 0) throw new Error(`Refusing listener ${ownerPid} outside the Codex process tree`);
      current = row.ppid;
    }
  }
  return pids;
}

async function waitForPort({ open, timeoutMs }) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const pids = await listenerPids();
    if ((pids.length > 0) === open) return;
    await new Promise((resolve) => setTimeout(resolve, 180));
  }
  throw new Error(`Timed out waiting for port ${PORT} to ${open ? "open" : "close"}`);
}

async function scheduleRestartAndApply({ allowUnverifiedSignature = false } = {}) {
  await verifyOfficialApp({ allowUnverifiedSignature });
  const log = openSync(RESTART_LOG, "w");
  const child = spawn(process.execPath, [join(SOURCE_DIR, "restart-worker.mjs")], {
    detached: true,
    stdio: ["ignore", log, log],
  });
  child.unref();
  return { scheduled: true, workerPid: child.pid, log: RESTART_LOG };
}

async function rendererTargets() {
  await assertCodexOwnsPort();
  const targets = await listTargets(PORT);
  if (targets.length === 0) throw new Error("No eligible Codex renderer was found");
  return targets;
}

async function runForTargets(expression) {
  const targets = await rendererTargets();
  const results = [];
  for (const target of targets) results.push(await evaluate(target, expression));
  return results;
}

async function main() {
  const command = process.argv[2] || "status";
  const restart = process.argv.includes("--restart");
  const allowUnverifiedSignature = process.argv.includes("--allow-unverified-signature");
  if (!["apply", "restore", "status"].includes(command)) {
    throw new Error("Usage: node src/cli.mjs <apply|restore|status> [--restart]");
  }
  if (restart && command !== "apply") throw new Error("--restart is supported only with apply");

  if (command === "apply") {
    if (restart) {
      const scheduled = await scheduleRestartAndApply({ allowUnverifiedSignature });
      console.log(JSON.stringify({ ok: true, action: "restart-and-apply", ...scheduled }, null, 2));
      return;
    }
    await verifyOfficialApp({ allowUnverifiedSignature });
    const results = await runForTargets(buildInstallExpression({
      logoDataUrl: await loadLogo(),
    }));
    console.log(JSON.stringify({ ok: true, action: "apply", port: PORT, renderers: results }, null, 2));
    return;
  }
  if (command === "restore") {
    const results = await runForTargets(buildRemoveExpression());
    console.log(JSON.stringify({ ok: true, action: "restore", renderers: results }, null, 2));
    return;
  }
  const results = await runForTargets(STATUS_EXPRESSION);
  console.log(JSON.stringify({ ok: true, action: "status", renderers: results }, null, 2));
}

main().catch((error) => {
  console.error(`Codex Twice: ${error.message}`);
  process.exitCode = 1;
});
