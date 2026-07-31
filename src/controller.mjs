#!/usr/bin/env node
import { execFile } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { evaluate, listTargets } from "./cdp.mjs";
import { STATUS_EXPRESSION } from "./theme.mjs";

const run = promisify(execFile);
const SOURCE_DIR = dirname(fileURLToPath(import.meta.url));
const CLI = join(SOURCE_DIR, "cli.mjs");
const APP_EXECUTABLE = "/Applications/ChatGPT.app/Contents/MacOS/ChatGPT";
const PORT = 9342;
const LOOP_MS = 750;
const NORMAL_LAUNCH_CONFIRMATIONS = 5;
const RESTART_COOLDOWN_MS = 30000;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function codexRunning() {
  const { stdout } = await run("/bin/ps", ["-axo", "command="]);
  return stdout.split("\n").some((line) => {
    const command = line.trim();
    return command === APP_EXECUTABLE || command.startsWith(`${APP_EXECUTABLE} `);
  });
}

async function portOpen() {
  try {
    const response = await fetch(`http://127.0.0.1:${PORT}/json/version`, {
      redirect: "error",
      signal: AbortSignal.timeout(700),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function applyIfMissing() {
  const targets = await listTargets(PORT);
  if (targets.length === 0) return;
  let missing = false;
  for (const target of targets) {
    const status = await evaluate(target, STATUS_EXPRESSION);
    if (status?.installed !== true || status?.id !== "codex-twice") missing = true;
  }
  if (!missing) return;
  await run(process.execPath, [CLI, "apply"], { timeout: 15000 });
  console.log("Codex Twice controller: renderer restored");
}

async function scheduleRestart() {
  const args = [CLI, "apply", "--restart"];
  if (process.env.CODEX_TWICE_ALLOW_UNVERIFIED === "1") args.push("--allow-unverified-signature");
  await run(process.execPath, args, { timeout: 15000 });
  console.log("Codex Twice controller: normal Codex launch detected; restart scheduled");
}

let stopped = false;
let normalLaunchCount = 0;
let restartCooldownUntil = 0;
let lastRendererCheck = 0;
process.once("SIGTERM", () => { stopped = true; });
process.once("SIGINT", () => { stopped = true; });

while (!stopped) {
  try {
    const running = await codexRunning();
    if (!running) {
      normalLaunchCount = 0;
      await sleep(LOOP_MS);
      continue;
    }
    if (await portOpen()) {
      normalLaunchCount = 0;
      if (Date.now() - lastRendererCheck >= 2500) {
        lastRendererCheck = Date.now();
        await applyIfMissing();
      }
    } else if (Date.now() >= restartCooldownUntil) {
      normalLaunchCount += 1;
      if (normalLaunchCount >= NORMAL_LAUNCH_CONFIRMATIONS) {
        normalLaunchCount = 0;
        restartCooldownUntil = Date.now() + RESTART_COOLDOWN_MS;
        await scheduleRestart();
      }
    }
  } catch (error) {
    console.error(`Codex Twice controller: ${error.message}`);
  }
  await sleep(LOOP_MS);
}
