# Security

Codex Twice Skin is a local appearance layer. It does not modify the Codex application bundle, `app.asar`, executable, resources, or code signature. Optional automatic restoration uses a user LaunchAgent and a runtime copy under `~/.codex`; both are removed by `Disable Auto Restore.command`.

## CDP exposure

Applying the skin restarts Codex with Chrome DevTools Protocol listening on `127.0.0.1:9342`. CDP has no authentication. Any process running as the same macOS user may attempt to connect while that Codex session remains open.

The command refuses to inject unless:

- `/Applications/ChatGPT.app` has bundle identifier `com.openai.codex`;
- its signing TeamIdentifier is `2DC432GLL2`;
- strict deep signature verification passes;
- the sole listener on port `9342` maps to the exact official Codex executable; and
- the renderer target uses Codex's local `app:` protocol.

Every public double-click launcher and npm command uses strict signature verification by default. The internal CLI contains an explicit `--allow-unverified-signature` recovery option for exceptional local trust-store failures. It skips strict code-signature validation and therefore weakens the security boundary. It is never used by a public launcher, should not be used to bypass an unexpected failure, and should be considered only after independently verifying the app and diagnosing the macOS trust subsystem.

No non-loopback network requests are made. The package contains no third-party runtime dependency.

## Closing the exposure

Disable Auto Restore first, then quit Codex and reopen it normally without the `--remote-debugging-port` argument. Restoring the CSS inside the current session does not by itself close CDP; only a normal restart closes the debugging port.

## Custom background data

Dropped images are decoded and compressed locally. The renderer accepts PNG, JPEG, or WebP up to 8 MB and 24 megapixels, produces a WebP no larger than 2560 × 1440, and refuses a stored data URL over 6 MB. No image is uploaded by this package. `Clear` removes the stored background from Codex local storage.

Do not enable the skin while working with credentials, private keys, sensitive source code, or other high-value data.
