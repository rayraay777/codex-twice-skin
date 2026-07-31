import { execFile, spawn } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const APP_EXECUTABLE = "/Applications/ChatGPT.app/Contents/MacOS/ChatGPT";
const BUNDLE_ID = "com.openai.codex";
const PORT = 9342;
const LOG = "/private/tmp/codex-twice-apply.log";
const SOURCE_DIR = dirname(fileURLToPath(import.meta.url));

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function log(message) {
  await appendFile(LOG, `[${new Date().toISOString()}] ${message}\n`);
}

async function waitForTargets() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/list`, {
        signal: AbortSignal.timeout(900),
      });
      if (response.ok) {
        const targets = await response.json();
        if (Array.isArray(targets) && targets.some((target) => target?.type === "page")) return;
      }
    } catch {}
    await sleep(250);
  }
  throw new Error("Timed out waiting for the restarted Codex renderer");
}

async function codexProcessRunning() {
  const { stdout } = await run("/bin/ps", ["-axo", "command="]);
  return stdout.split("\n").some((line) => {
    const command = line.trim();
    return command === APP_EXECUTABLE || command.startsWith(`${APP_EXECUTABLE} `);
  });
}

async function waitForCodexExit() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (!(await codexProcessRunning())) return;
    await sleep(250);
  }
  throw new Error("Codex did not finish its graceful quit; refusing to launch a second instance");
}

async function main() {
  await sleep(900);
  await log("requesting graceful Codex quit");
  try {
    await run("osascript", ["-e", `tell application id \"${BUNDLE_ID}\" to quit`]);
  } catch (error) {
    const message = `${error.stderr || error.message || error}`;
    if (!/not running|Application isn.t running|-600/i.test(message)) throw error;
  }
  await waitForCodexExit();
  await log("launching Codex with loopback CDP");
  const app = spawn(APP_EXECUTABLE, [
    "--remote-debugging-address=127.0.0.1",
    `--remote-debugging-port=${PORT}`,
  ], { detached: true, stdio: "ignore" });
  app.unref();
  await waitForTargets();
  await log("renderer ready; applying skin");
  const { stdout, stderr } = await run(process.execPath, [join(SOURCE_DIR, "cli.mjs"), "apply"], {
    timeout: 12000,
  });
  if (stdout.trim()) await log(stdout.trim());
  if (stderr.trim()) await log(stderr.trim());
  await log("completed");
}

main().catch(async (error) => {
  try { await log(`failed: ${error.message}`); } catch {}
  process.exitCode = 1;
});
