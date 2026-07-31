#!/usr/bin/env node
import { execFile } from "node:child_process";
import { lstat, rm, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const USER_HOME = homedir();
const INSTALL_ROOT = join(USER_HOME, ".codex", "codex-twice-runtime");
const PLIST = join(USER_HOME, "Library", "LaunchAgents", "com.codex-twice.controller.plist");
const LABEL = "com.codex-twice.controller";
const target = `gui/${process.getuid()}`;

async function refuseSymlink(path) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`Refusing symlink removal target: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await refuseSymlink(INSTALL_ROOT);
await refuseSymlink(PLIST);
await run("/bin/launchctl", ["bootout", `${target}/${LABEL}`]).catch(() => {});
await unlink(PLIST).catch((error) => { if (error.code !== "ENOENT") throw error; });
await rm(INSTALL_ROOT, { recursive: true, force: true });
console.log(JSON.stringify({ installed: false, label: LABEL }, null, 2));
