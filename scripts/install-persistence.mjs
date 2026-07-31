#!/usr/bin/env node
import { execFile } from "node:child_process";
import { cp, lstat, mkdir, realpath, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const SOURCE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const USER_HOME = homedir();
const INSTALL_ROOT = join(USER_HOME, ".codex", "codex-twice-runtime");
const AGENT_DIR = join(USER_HOME, "Library", "LaunchAgents");
const PLIST = join(AGENT_DIR, "com.codex-twice.controller.plist");
const LABEL = "com.codex-twice.controller";
const LOG = join(USER_HOME, ".codex", "codex-twice-controller.log");
const allowUnverified = process.argv.includes("--allow-unverified-signature");
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const xml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

async function refuseSymlink(path) {
  try {
    const info = await lstat(path);
    if (info.isSymbolicLink()) throw new Error(`Refusing symlink install target: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await refuseSymlink(INSTALL_ROOT);
await refuseSymlink(PLIST);
await mkdir(INSTALL_ROOT, { recursive: true, mode: 0o700 });
await cp(join(SOURCE_ROOT, "src"), join(INSTALL_ROOT, "src"), { recursive: true, force: true });
await cp(join(SOURCE_ROOT, "assets"), join(INSTALL_ROOT, "assets"), { recursive: true, force: true });
await writeFile(join(INSTALL_ROOT, "runtime.json"), JSON.stringify({
  schemaVersion: 1,
  source: await realpath(SOURCE_ROOT),
  installedAt: new Date().toISOString(),
}, null, 2) + "\n", { mode: 0o600 });
await mkdir(AGENT_DIR, { recursive: true });

const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>${LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${xml(process.execPath)}</string>
    <string>${xml(join(INSTALL_ROOT, "src", "controller.mjs"))}</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict><key>CODEX_TWICE_ALLOW_UNVERIFIED</key><string>${allowUnverified ? "1" : "0"}</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>5</integer>
  <key>StandardOutPath</key><string>${xml(LOG)}</string>
  <key>StandardErrorPath</key><string>${xml(LOG)}</string>
</dict>
</plist>
`;
await writeFile(PLIST, plist, { mode: 0o600 });
const target = `gui/${process.getuid()}`;
await run("/bin/launchctl", ["bootout", `${target}/${LABEL}`]).catch(() => {});
let bootstrapError = null;
for (let attempt = 0; attempt < 12; attempt += 1) {
  await sleep(1000);
  try {
    await run("/bin/launchctl", ["bootstrap", target, PLIST]);
    bootstrapError = null;
    break;
  } catch (error) {
    bootstrapError = error;
  }
}
if (bootstrapError) throw bootstrapError;
await run("/bin/launchctl", ["kickstart", "-k", `${target}/${LABEL}`]);
console.log(JSON.stringify({ installed: true, label: LABEL, plist: PLIST, runtime: INSTALL_ROOT }, null, 2));
