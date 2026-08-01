#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED = [
  "README.md",
  "README.zh-Hant.md",
  "README.zh-Hans.md",
  "SECURITY.md",
  "NOTICE.md",
  "LICENSE",
  "package.json",
  "assets/twice-logo.png",
  "assets/previews/codex-twice-preview-dark.jpg",
  "assets/previews/codex-twice-preview-light.jpg",
  "assets/previews/codex-twice-zh-hant-dark.png",
  "assets/previews/codex-twice-zh-hant-light.png",
  "assets/previews/codex-twice-zh-hans-dark.png",
  "assets/previews/codex-twice-zh-hans-light.png",
  "Apply Codex Twice.command",
  "Restore Codex.command",
  "Enable Auto Restore.command",
  "Disable Auto Restore.command",
];
const LAUNCHERS = REQUIRED.filter((path) => path.endsWith(".command"));

for (const relative of REQUIRED) await stat(join(ROOT, relative));

const packageJson = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
const theme = await readFile(join(ROOT, "src/theme.mjs"), "utf8");
if (!theme.includes(`version: "${packageJson.version}"`)) {
  throw new Error("package.json and renderer versions do not match");
}

for (const relative of LAUNCHERS) {
  const path = join(ROOT, relative);
  const contents = await readFile(path, "utf8");
  const mode = (await stat(path)).mode;
  if ((mode & 0o111) === 0) throw new Error(`${relative} is not executable`);
  if (contents.includes("--allow-unverified-signature")) {
    throw new Error(`${relative} must use strict signature verification`);
  }
  if (!contents.includes("source scripts/check-node.zsh")) {
    throw new Error(`${relative} does not check the Node.js requirement`);
  }
}

const png = await readFile(join(ROOT, "assets/twice-logo.png"));
const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (png.length > 2000000 || pngMagic.some((value, index) => png[index] !== value)) {
  throw new Error("Bundled logo is not a bounded PNG");
}

const publicFiles = [];
const collect = async (directory) => {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(item.name)) continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) await collect(path);
    else if (!/\.(?:png|jpe?g)$/i.test(item.name)) publicFiles.push(path);
  }
};
await collect(ROOT);
for (const path of publicFiles) {
  const contents = await readFile(path, "utf8");
  if (/\/Users\/[A-Za-z0-9._-]+/.test(contents)) {
    throw new Error(`Personal home path found in ${path.slice(ROOT.length + 1)}`);
  }
}

console.log(JSON.stringify({ ok: true, version: packageJson.version, launchers: LAUNCHERS.length }, null, 2));
