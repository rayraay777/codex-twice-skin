# Codex Twice Skin

**English** | [繁體中文（香港）](README.zh-Hant.md) | [简体中文](README.zh-Hans.md)

<p align="center">
  <img src="assets/twice-logo.png" alt="TWICE logo" width="180">
</p>

An unofficial TWICE-inspired skin for Codex Desktop on macOS. It adds Candybong pink accents, plum glass surfaces, rounded typography, TWICE logo as default background, and optional custom wallpapers.

Codex Twice changes only the interface on your Mac. It does not change the AI, your prompts, or your responses, and it does not modify `app.asar` or invalidate the Codex app signature.

> [!IMPORTANT]
> Codex Twice currently works only with the official Codex Desktop app installed at `/Applications/ChatGPT.app`. Node.js 22 or newer is required.

## Install in three steps

1. Download the latest ZIP from **Releases** and extract it.
2. Open the extracted `codex-twice-skin` folder.
3. Double-click **`Apply Codex Twice.command`**.

Codex quits and reopens once while the skin is applied. On a new chat, the welcome title appears before your first prompt; after you send it, the TWICE logo becomes a subtle centered background.

macOS may ask you to confirm before opening a downloaded `.command` file. Check the release checksum and source before continuing. Do not disable Gatekeeper.

## Choose how long it stays active

| What you want | What to open |
| --- | --- |
| Use the skin for the current Codex session | `Apply Codex Twice.command` |
| Restore the skin automatically whenever Codex starts | `Enable Auto Restore.command` |
| Stop automatic restoration | `Disable Auto Restore.command` |
| Return to the original Codex appearance | `Restore Codex.command` |

Auto Restore is optional. Without it, quitting Codex and reopening it normally removes the injected appearance layer.

## What changes

- **Light and dark modes** that follow the macOS appearance setting.
- **Candybong-inspired colors** while keeping primary text, code, and diffs readable.
- **Responsive TWICE branding** shown only on chat pages, not in Settings, Skills, or other system pages.
- **Purposeful typography** with rounded English controls, PingFang for Chinese, and Menlo/SF Mono for code.
- **Custom wallpapers** stored locally, with size, position, and brightness controls.
- **A compact control panel** opened from `Codex Twice ✦` inside Codex.

The skin does not replace Codex controls with fake artwork and does not alter models or app behavior.

## Use the control panel

Open **`Codex Twice ✦`** inside Codex to:

- turn readability enhancements, the TWICE logo, or the new-chat title on and off;
- choose a PNG, JPEG, or WebP wallpaper;
- adjust wallpaper size, position, and brightness;
- clear the wallpaper or restore the native Codex appearance.

Wallpaper files stay on your Mac. Images are limited to 8 MB and 24 megapixels, resized to a maximum of 2560 × 1440, and saved as compressed WebP in Codex local storage.

## Restore the original Codex appearance

Double-click **`Restore Codex.command`**. You can also use **Restore native Codex** in the control panel or run:

```sh
npm run restore
```

If Auto Restore is enabled, disable it first so that the skin does not return the next time Codex starts.

## Requirements

- macOS
- Official Codex Desktop at `/Applications/ChatGPT.app`
- Node.js 22 or newer
- No npm dependency installation required

Windows, Linux, browser Codex, and alternate app locations are not currently supported. Because the skin depends on the current Codex renderer, a future Codex update may temporarily require a skin update.

## Security and privacy

While active, Codex Twice uses the Chrome DevTools Protocol on the loopback-only address `127.0.0.1:9342`. The port has no authentication, so another process running under the same macOS user could attempt to connect to the renderer.

Do not use the skin while handling credentials, private keys, sensitive source code, or other high-value information. To close the connection completely:

1. Open `Disable Auto Restore.command`.
2. Quit Codex completely.
3. Reopen Codex normally.

Read [SECURITY.md](SECURITY.md) for the complete threat model and technical checks.

## Troubleshooting

If the skin does not appear:

1. Check that Codex is installed at `/Applications/ChatGPT.app`.
2. Check your Node.js version with `node --version`; it must be 22 or newer.
3. Make sure another Codex instance is not already open.
4. Run `npm run verify` in this folder and keep the complete error output.

If signature verification fails, stop and reinstall the current official Codex app from OpenAI. Do not bypass an unexpected signature error with reduced verification.

## For developers

Run the tests and release audit before publishing:

```sh
npm run verify
```

Main files:

- `src/theme.mjs` — visual design and in-app controls
- `src/cli.mjs` — verification, apply, status, and restore commands
- `src/controller.mjs` — bounded Auto Restore controller
- `src/cdp.mjs` — minimal loopback-only CDP client
- `scripts/` — persistence management and release audit

## License and notices

The code is released under the [MIT License](LICENSE).

Codex Twice is not affiliated with or endorsed by TWICE, JYP Entertainment, OpenAI, or Codex. It contains no official photographs, music, or fonts. The bundled user-supplied TWICE logo is outside the MIT software license; see [NOTICE.md](NOTICE.md).
