import assert from "node:assert/strict";
import test from "node:test";

import {
  SKIN_ID,
  STATUS_EXPRESSION,
  THEME_CSS,
  buildInstallExpression,
  buildRemoveExpression,
} from "../src/theme.mjs";

test("theme identifiers and original brand copy are present", () => {
  assert.equal(SKIN_ID, "codex-twice");
  assert.match(THEME_CSS, /codex-twice-controls/);
  assert.match(buildInstallExpression(), /ONE IN A MILLION/);
  assert.match(buildInstallExpression(), /Ready To Be/);
  assert.match(buildInstallExpression(), /Live Once, Love Twice/);
  assert.match(buildInstallExpression(), /prefers-color-scheme: light/);
  assert.match(buildInstallExpression(), /systemPalette\.addEventListener\("change"/);
  assert.doesNotMatch(buildInstallExpression(), /option\("White mode"/);
  assert.match(THEME_CSS, /data-twice-palette="light"/);
  assert.match(THEME_CSS, /--twice-glass: rgba\(255, 250, 252, \.72\)/);
  assert.doesNotMatch(THEME_CSS, /https?:\/\//);
});

test("public readme defaults to English and links all three languages", async () => {
  const { readFile } = await import("node:fs/promises");
  const english = await readFile(new URL("../README.md", import.meta.url), "utf8");
  const traditionalChinese = await readFile(new URL("../README.zh-Hant.md", import.meta.url), "utf8");
  const simplifiedChinese = await readFile(new URL("../README.zh-Hans.md", import.meta.url), "utf8");
  assert.match(english, /README\.zh-Hant\.md/);
  assert.match(english, /README\.zh-Hans\.md/);
  assert.match(english, /Security and privacy/);
  assert.match(traditionalChinese, /README\.md/);
  assert.match(traditionalChinese, /README\.zh-Hans\.md/);
  assert.match(traditionalChinese, /安全與私隱/);
  assert.match(simplifiedChinese, /README\.md/);
  assert.match(simplifiedChinese, /README\.zh-Hant\.md/);
  assert.match(simplifiedChinese, /安全与隐私/);
});

test("bundled transparent PNG appears only as the post-prompt centered background", async () => {
  const { readFile } = await import("node:fs/promises");
  const image = await readFile(new URL("../assets/twice-logo.png", import.meta.url));
  assert.ok(image.length > 10000 && image.length < 2000000);
  assert.deepEqual([...image.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const expression = buildInstallExpression({
    logoDataUrl: `data:image/png;base64,${image.toString("base64")}`,
  });
  assert.match(THEME_CSS, /#codex-twice-logo/);
  assert.match(THEME_CSS, /data-twice-logo="background"/);
  assert.match(THEME_CSS, /width: clamp\(120px, 20\.8vw, 336px\)/);
  assert.match(THEME_CSS, /top: 50%/);
  assert.match(THEME_CSS, /left: 50%/);
  assert.match(expression, /logoPreference && !showBrand \? "background" : "off"/);
  assert.match(expression, /storedLogo === null \? !hasSavedBackground/);
  assert.match(expression, /logoPreference = false/);
  assert.match(THEME_CSS, /data-twice-custom-background="on"/);
  assert.match(THEME_CSS, /var\(--twice-background-dim, \.2\)/);
  assert.doesNotMatch(THEME_CSS, /data-twice-logo="brand"/);
  assert.match(expression, /TWICE logo/);
});

test("renderer expressions compile", () => {
  assert.doesNotThrow(() => new Function(buildInstallExpression()));
  assert.doesNotThrow(() => new Function(buildRemoveExpression()));
  assert.doesNotThrow(() => new Function(STATUS_EXPRESSION));
});

test("skin has a reversible cleanup path and no looping animation", () => {
  assert.match(buildInstallExpression(), /const remove = \(\) =>/);
  assert.match(buildRemoveExpression(), /delete window\.__codexTwiceSkin/);
  assert.doesNotMatch(THEME_CSS, /animation\s*:/i);
  assert.match(buildInstallExpression(), /brandPreference && isNewTask\(\)/);
  assert.match(buildInstallExpression(), /const isNativeSettings = \(\) =>/);
  assert.match(buildInstallExpression(), /const isChatPage = \(\) =>/);
  assert.match(buildInstallExpression(), /isChatPage\(\) && !isNativeSettings\(\)/);
  assert.match(buildInstallExpression(), /\.composer-surface-chrome/);
  assert.doesNotMatch(buildInstallExpression(), /handleComposerInput/);
  assert.match(buildInstallExpression(), /pageObserver\.disconnect\(\)/);
  assert.match(buildInstallExpression(), /systemPalette\.removeEventListener\("change"/);
  assert.doesNotMatch(THEME_CSS, /data-twice-controls-open/);
  assert.match(buildRemoveExpression(), /delete document\.documentElement\.dataset\.twicePalette/);
  assert.match(buildInstallExpression(), /codex-twice-background-v1/);
  assert.match(buildInstallExpression(), /image\/webp/);
  assert.match(buildInstallExpression(), /8388608/);
  assert.match(buildInstallExpression(), /document\.addEventListener\(\"drop\"/);
  assert.match(buildInstallExpression(), /Drag photo/);
  assert.match(buildInstallExpression(), /Drop photo inside this frame/);
  assert.match(buildInstallExpression(), /if \(!dragPhotoMode\)/);
  assert.match(buildInstallExpression(), /Wallpaper size/);
  assert.match(buildInstallExpression(), /Horizontal position/);
  assert.match(buildInstallExpression(), /Vertical position/);
  assert.match(buildInstallExpression(), /Wallpaper brightness/);
  assert.match(buildInstallExpression(), /Reset position/);
  assert.match(buildInstallExpression(), /wallpaperControls\.hidden = !hasSavedBackground/);
  assert.match(buildInstallExpression(), /wallpaperControls\.hidden = false/);
  assert.match(buildInstallExpression(), /wallpaperControls\.hidden = true/);
  assert.match(THEME_CSS, /twice-wallpaper-controls\[hidden\]/);
  assert.match(buildInstallExpression(), /codex-twice-background-size-v1/);
  assert.match(buildInstallExpression(), /codex-twice-background-brightness-v2/);
  assert.match(buildInstallExpression(), /legacyBackgroundBrightnessKey/);
  assert.match(buildInstallExpression(), /Math\.min\(100, Math\.max\(-100/);
  assert.match(buildInstallExpression(), /onOutsidePointerDown/);
  assert.match(buildInstallExpression(), /document\.addEventListener\(\"pointerdown\"/);
  assert.match(THEME_CSS, /--twice-background-dim/);
  assert.match(THEME_CSS, /--twice-background-light/);
  assert.match(THEME_CSS, /rgba\(20,14,23,\.84\)/);
  assert.doesNotMatch(THEME_CSS, /rgba\(20,14,23,\.35\)/);
  assert.match(THEME_CSS, /--twice-glass: rgba\(34, 22, 35, \.66\)/);
  assert.match(THEME_CSS, /background: rgba\(30,21,32,\.7\)/);
  assert.doesNotMatch(buildInstallExpression(), /Enable drag-to-wallpaper/);
  assert.match(THEME_CSS, /"Bodoni 72"/);
  assert.match(THEME_CSS, /text-transform: uppercase/);
});

test("restart worker uses only the dedicated loopback port", async () => {
  const { readFile } = await import("node:fs/promises");
  const worker = await readFile(new URL("../src/restart-worker.mjs", import.meta.url), "utf8");
  assert.match(worker, /127\.0\.0\.1/);
  assert.match(worker, /9342/);
  assert.doesNotMatch(worker, /9341/);
  assert.match(worker, /waitForCodexExit/);
  assert.match(worker, /refusing to launch a second instance/);
});

test("CLI verifies every shared CDP listener through the Codex process tree", async () => {
  const { readFile } = await import("node:fs/promises");
  const cli = await readFile(new URL("../src/cli.mjs", import.meta.url), "utf8");
  assert.match(cli, /mainPids\.length !== 1/);
  assert.match(cli, /outside the Codex process tree/);
  assert.match(cli, /visited\.size > 64/);
  assert.ok((cli.match(/await verifyOfficialApp\(\{ allowUnverifiedSignature \}\)/g) || []).length >= 2);
});

test("persistent controller is bounded and waits before restarting normal Codex", async () => {
  const { readFile } = await import("node:fs/promises");
  const controller = await readFile(new URL("../src/controller.mjs", import.meta.url), "utf8");
  assert.match(controller, /NORMAL_LAUNCH_CONFIRMATIONS = 5/);
  assert.match(controller, /RESTART_COOLDOWN_MS = 30000/);
  assert.match(controller, /if \(!running\)/);
  assert.match(controller, /applyIfMissing/);
});

test("persistence installer is reversible and rejects symlink targets", async () => {
  const { readFile } = await import("node:fs/promises");
  const install = await readFile(new URL("../scripts/install-persistence.mjs", import.meta.url), "utf8");
  const uninstall = await readFile(new URL("../scripts/uninstall-persistence.mjs", import.meta.url), "utf8");
  assert.match(install, /refuseSymlink/);
  assert.match(install, /launchctl/);
  assert.match(install, /attempt < 12/);
  assert.match(install, /SOURCE_ROOT, \"assets\"/);
  assert.match(uninstall, /refuseSymlink/);
  assert.match(uninstall, /bootout/);
});
