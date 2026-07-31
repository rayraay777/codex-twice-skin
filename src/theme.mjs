export const SKIN_ID = "codex-twice";
export const STYLE_ID = "codex-twice-style";
export const UI_ID = "codex-twice-controls";

export const THEME_CSS = String.raw`
:root[data-codex-twice="on"] {
  color-scheme: dark !important;
  --twice-pink: #ff5fa2;
  --twice-peach: #ffad83;
  --twice-plum: #171219;
  --twice-ink: #f9eef3;
  --twice-glass: rgba(34, 22, 35, .66);
  --twice-muted: #e6aac3;
  --twice-muted-soft: #bd8ba2;
  --color-background-surface: rgba(23, 18, 25, .78) !important;
  --color-background-panel: rgba(27, 20, 29, .88) !important;
  --color-background-button-primary: #ff5fa2 !important;
  --color-text-foreground: #f9eef3 !important;
  --color-text-secondary: #e6aac3 !important;
  --color-text-tertiary: #bd8ba2 !important;
  --color-border: rgba(255, 111, 169, .27) !important;
}

:root[data-codex-twice="on"] body,
:root[data-codex-twice="on"] #root {
  background-image:
    linear-gradient(90deg, rgba(20,14,23,.84) 0 22%, rgba(23,15,25,.5) 42%, rgba(23,15,25,.06) 76%),
    radial-gradient(circle at 82% 46%, rgba(255,81,151,.16), transparent 30%),
    radial-gradient(circle at 70% 8%, rgba(255,176,127,.1), transparent 28%),
    var(--twice-background-image, linear-gradient(135deg, #2b1d2a, #201721 52%, #3a1b2f)) !important;
  background-position: center, center, center, var(--twice-background-position, center) !important;
  background-size: cover, cover, cover, var(--twice-background-size, cover) !important;
  background-repeat: no-repeat !important;
}

:root[data-codex-twice="on"][data-twice-custom-background="on"] body,
:root[data-codex-twice="on"][data-twice-custom-background="on"] #root {
  background-image:
    linear-gradient(rgb(0 0 0 / var(--twice-background-dim, .2)), rgb(0 0 0 / var(--twice-background-dim, .2))),
    linear-gradient(rgb(255 255 255 / var(--twice-background-light, 0)), rgb(255 255 255 / var(--twice-background-light, 0))),
    var(--twice-background-image) !important;
  background-position: center, center, var(--twice-background-position, center) !important;
  background-size: cover, cover, var(--twice-background-size, cover) !important;
}

:root[data-codex-twice="on"] .app-shell-left-panel {
  position: relative;
  z-index: 2;
  border-right: 1px solid rgba(255,111,169,.22) !important;
  background: rgba(20,14,23,.84) !important;
  backdrop-filter: blur(10px) saturate(1.08);
}

:root[data-codex-twice="on"] .main-surface,
:root[data-codex-twice="on"] .browser-main-surface {
  position: relative;
  z-index: 1;
  background: linear-gradient(180deg, transparent 0 46%, rgba(23,18,25,.62) 100%) !important;
}

:root[data-codex-twice="on"] button,
:root[data-codex-twice="on"] [role="button"],
:root[data-codex-twice="on"] nav,
:root[data-codex-twice="on"] [role="menu"],
:root[data-codex-twice="on"] [role="option"] {
  font-family: ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", system-ui, "PingFang TC", "PingFang SC", sans-serif !important;
}

:root[data-codex-twice="on"] pre,
:root[data-codex-twice="on"] code,
:root[data-codex-twice="on"] textarea {
  font-family: Menlo, "SF Mono", monospace !important;
}

:root[data-codex-twice="on"] .composer-surface-chrome,
:root[data-codex-twice="on"] [data-user-message-bubble],
:root[data-codex-twice="on"] [data-codex-approval-surface] {
  color: #f9eef3 !important;
  border: 1px solid rgba(255,111,169,.3) !important;
  border-radius: 22px !important;
  background: var(--twice-glass) !important;
  box-shadow: 0 12px 34px rgba(14,6,13,.28), 0 0 28px rgba(255,69,148,.08) !important;
  backdrop-filter: blur(11px) saturate(1.08);
}

:root[data-codex-twice="on"] [data-app-action-sidebar-thread-active="true"] {
  border-radius: 14px !important;
  background: linear-gradient(90deg, rgba(255,91,159,.25), rgba(255,173,131,.1)) !important;
}

:root[data-codex-twice="on"] .text-token-foreground-secondary,
:root[data-codex-twice="on"] [class*="text-token-foreground-secondary"],
:root[data-codex-twice="on"] [class*="text-token-foreground-tertiary"],
:root[data-codex-twice="on"] [class*="text-token-text-secondary"] {
  color: var(--twice-muted) !important;
}
:root[data-codex-twice="on"] input::placeholder,
:root[data-codex-twice="on"] textarea::placeholder,
:root[data-codex-twice="on"] [data-codex-composer="true"][data-placeholder]::before {
  color: var(--twice-muted-soft) !important;
}

:root[data-codex-twice="on"][data-twice-readable="on"] [data-response-annotation-conversation] {
  padding: 14px 16px 12px;
  border: 1px solid rgba(255,111,169,.16) !important;
  border-radius: 22px;
  color: #f9eef3 !important;
  background: rgba(30,21,32,.7) !important;
}

#codex-twice-branding {
  position: fixed;
  z-index: 15;
  top: 72px;
  left: max(300px, 25vw);
  max-width: 470px;
  pointer-events: none;
  color: #f9eef3;
  text-shadow: 0 3px 18px rgba(19,7,16,.6);
}
#codex-twice-branding strong {
  display: block;
  color: #ff86b7;
  font: 500 13px/1.2 ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
  letter-spacing: .16em;
}
#codex-twice-branding span {
  display: block;
  margin-top: 8px;
  font-family: "Bodoni 72 Smallcaps", "Bodoni 72", Didot, "Times New Roman", serif;
  font-size: clamp(34px, 5vw, 68px);
  font-style: italic;
  font-weight: 500;
  line-height: .96;
  letter-spacing: -.045em;
  text-transform: uppercase;
}
:root[data-twice-brand="off"] #codex-twice-branding { display: none; }

#codex-twice-controls {
  position: fixed;
  z-index: 2147483000;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
  color: #f9eef3;
  -webkit-app-region: no-drag;
}
#codex-twice-controls > button {
  min-height: 30px;
  padding: 4px 12px;
  border: 1px solid rgba(255,105,166,.42);
  border-radius: 999px;
  color: #fff1f7;
  background: rgba(49,22,38,.88);
  box-shadow: 0 7px 24px rgba(255,65,145,.13);
  cursor: pointer;
}
#codex-twice-controls section {
  position: absolute;
  top: 39px;
  left: 50%;
  width: 320px;
  transform: translateX(-50%);
  padding: 15px;
  border: 1px solid rgba(255,139,184,.26);
  border-radius: 20px;
  background: rgba(31,20,32,.96);
  box-shadow: 0 22px 60px rgba(10,3,9,.5);
  backdrop-filter: blur(22px);
}
#codex-twice-controls section[hidden] { display: none; }
#codex-twice-controls h2 { margin: 0 0 3px; font-size: 16px; font-weight: 500; }
#codex-twice-controls p { margin: 0 0 13px; color: rgba(249,238,243,.62); font-size: 11px; }
#codex-twice-controls label { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; }
#codex-twice-controls input { accent-color: #ff5fa2; }
#codex-twice-controls .twice-restore {
  width: 100%;
  margin-top: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(255,139,184,.22);
  border-radius: 12px;
  color: #ffeef5;
  background: rgba(255,95,162,.12);
  cursor: pointer;
}
#codex-twice-controls .twice-background-actions {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 7px;
  margin-top: 10px;
}
#codex-twice-controls .twice-background-actions button {
  padding: 7px 9px;
  border: 1px solid rgba(255,139,184,.22);
  border-radius: 11px;
  color: #ffeef5;
  background: rgba(255,95,162,.1);
  cursor: pointer;
}
#codex-twice-controls .twice-background-state {
  margin: 7px 0 0;
  color: #e6aac3;
  font-size: 11px;
}
#codex-twice-controls .twice-wallpaper-controls {
  margin-top: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(255,139,184,.18);
  border-radius: 13px;
  background: rgba(255,95,162,.06);
}
#codex-twice-controls .twice-wallpaper-controls[hidden] { display: none; }
#codex-twice-controls .twice-wallpaper-controls label {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 5px 0;
  color: #f8dfe9;
  font-size: 11px;
}
#codex-twice-controls .twice-wallpaper-controls input[type="range"] {
  grid-column: 1 / -1;
  width: 100%;
}
#codex-twice-controls .twice-wallpaper-controls select {
  min-width: 105px;
  padding: 4px 7px;
  border: 1px solid rgba(255,139,184,.24);
  border-radius: 9px;
  color: #ffeef5;
  background: #33202f;
}
#codex-twice-controls .twice-wallpaper-reset {
  width: 100%;
  margin-top: 5px;
  padding: 6px 8px;
  border: 1px solid rgba(255,139,184,.2);
  border-radius: 9px;
  color: #ffeef5;
  background: rgba(255,95,162,.08);
  cursor: pointer;
}
#codex-twice-drop-overlay {
  position: fixed;
  z-index: 2147482999;
  inset: 54px 24px 24px;
  display: grid;
  place-items: center;
  border: 2px dashed rgba(255,126,179,.72);
  border-radius: 26px;
  color: #fff2f8;
  background: rgba(34,17,30,.72);
  box-shadow: inset 0 0 90px rgba(255,76,151,.16);
  backdrop-filter: blur(9px);
  pointer-events: none;
  font: 500 18px/1.3 ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
}
#codex-twice-drop-overlay[hidden] { display: none; }
#codex-twice-logo {
  position: fixed;
  z-index: 0;
  aspect-ratio: 496 / 503;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  filter: drop-shadow(0 14px 34px rgba(255, 73, 149, .2));
  pointer-events: none;
  transition: opacity .22s ease, width .22s ease, top .22s ease, left .22s ease, transform .22s ease;
}
:root[data-twice-logo="background"] #codex-twice-logo {
  top: 50%;
  left: 50%;
  width: clamp(120px, 20.8vw, 336px);
  max-height: 54.4vh;
  transform: translate(-50%, -50%);
  opacity: .22;
}
:root[data-twice-logo="off"] #codex-twice-logo { display: none; }

:root[data-codex-twice="on"][data-twice-palette="light"] {
  color-scheme: light !important;
  --twice-plum: #fff8fb;
  --twice-ink: #38222f;
  --twice-glass: rgba(255, 250, 252, .72);
  --twice-muted: #a34e73;
  --twice-muted-soft: #9b7083;
  --color-background-surface: rgba(255, 249, 252, .76) !important;
  --color-background-panel: rgba(255, 252, 253, .9) !important;
  --color-text-foreground: #38222f !important;
  --color-text-secondary: #a34e73 !important;
  --color-text-tertiary: #9b7083 !important;
  --color-border: rgba(218, 73, 137, .26) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"]:not([data-twice-custom-background="on"]) body,
:root[data-codex-twice="on"][data-twice-palette="light"]:not([data-twice-custom-background="on"]) #root {
  background-image:
    linear-gradient(90deg, rgba(255,250,252,.82) 0 22%, rgba(255,247,251,.48) 42%, rgba(255,255,255,.08) 76%),
    radial-gradient(circle at 82% 46%, rgba(255,81,151,.14), transparent 30%),
    radial-gradient(circle at 70% 8%, rgba(255,176,127,.16), transparent 28%),
    linear-gradient(135deg, #fff9fc, #fff1f7 52%, #ffe5f0) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"] .app-shell-left-panel {
  border-right-color: rgba(218,73,137,.2) !important;
  background: rgba(255,250,252,.84) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"] .main-surface,
:root[data-codex-twice="on"][data-twice-palette="light"] .browser-main-surface {
  background: linear-gradient(180deg, transparent 0 46%, rgba(255,248,251,.54) 100%) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"] .composer-surface-chrome,
:root[data-codex-twice="on"][data-twice-palette="light"] [data-user-message-bubble],
:root[data-codex-twice="on"][data-twice-palette="light"] [data-codex-approval-surface] {
  color: #38222f !important;
  border-color: rgba(218,73,137,.28) !important;
  background: var(--twice-glass) !important;
  box-shadow: 0 12px 34px rgba(102,42,70,.12), 0 0 28px rgba(255,69,148,.07) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"][data-twice-readable="on"] [data-response-annotation-conversation] {
  color: #38222f !important;
  border-color: rgba(218,73,137,.16) !important;
  background: rgba(255,252,253,.78) !important;
}
:root[data-codex-twice="on"][data-twice-palette="light"] [data-app-action-sidebar-thread-active="true"] {
  background: linear-gradient(90deg, rgba(255,91,159,.18), rgba(255,173,131,.1)) !important;
}
:root[data-twice-palette="light"] #codex-twice-branding { color: #38222f; text-shadow: 0 3px 18px rgba(255,255,255,.7); }
:root[data-twice-palette="light"] #codex-twice-branding strong { color: #d94b89; }
:root[data-twice-palette="light"] #codex-twice-controls { color: #38222f; }
:root[data-twice-palette="light"] #codex-twice-controls > button {
  color: #6b2948;
  border-color: rgba(218,73,137,.34);
  background: rgba(255,250,252,.92);
  box-shadow: 0 7px 24px rgba(188,55,113,.12);
}
:root[data-twice-palette="light"] #codex-twice-controls section {
  color: #38222f;
  border-color: rgba(218,73,137,.2);
  background: rgba(255,252,253,.97);
  box-shadow: 0 22px 60px rgba(102,42,70,.2);
}
:root[data-twice-palette="light"] #codex-twice-controls p,
:root[data-twice-palette="light"] #codex-twice-controls .twice-background-state { color: #9b5875; }
:root[data-twice-palette="light"] #codex-twice-controls .twice-background-actions button,
:root[data-twice-palette="light"] #codex-twice-controls .twice-wallpaper-reset,
:root[data-twice-palette="light"] #codex-twice-controls .twice-restore {
  color: #6b2948;
  border-color: rgba(218,73,137,.22);
  background: rgba(255,95,162,.08);
}
:root[data-twice-palette="light"] #codex-twice-controls .twice-wallpaper-controls {
  color: #38222f;
  border-color: rgba(218,73,137,.16);
  background: rgba(255,95,162,.05);
}
:root[data-twice-palette="light"] #codex-twice-controls .twice-wallpaper-controls label { color: #563144; }
:root[data-twice-palette="light"] #codex-twice-controls .twice-wallpaper-controls select {
  color: #563144;
  border-color: rgba(218,73,137,.22);
  background: #fff8fb;
}
:root[data-twice-palette="light"] #codex-twice-drop-overlay {
  color: #6b2948;
  border-color: rgba(218,73,137,.62);
  background: rgba(255,248,252,.82);
}

@media (max-width: 700px) {
  #codex-twice-branding { left: 86px; top: 70px; }
  #codex-twice-branding span { font-size: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  #codex-twice-controls *, :root[data-codex-twice="on"] * { transition: none !important; }
}
`;

export function buildInstallExpression({ logoDataUrl = null } = {}) {
  if (
    logoDataUrl !== null
    && (typeof logoDataUrl !== "string"
      || logoDataUrl.length > 2000000
      || !/^data:image\/png;base64,[a-z0-9+/=]+$/i.test(logoDataUrl))
  ) throw new Error("logo must be a bounded PNG data URL");
  return `(() => {
    window.__codexTwiceSkin?.remove?.();
    const style = document.createElement("style");
    style.id = ${JSON.stringify(STYLE_ID)};
    style.textContent = ${JSON.stringify(THEME_CSS)};
    document.head.appendChild(style);
    document.documentElement.dataset.codexTwice = "on";
    document.documentElement.dataset.twiceReadable = localStorage.getItem("codex-twice-readable") === "0" ? "off" : "on";
    localStorage.removeItem("codex-twice-palette-v1");
    const systemPalette = matchMedia("(prefers-color-scheme: light)");
    const syncSystemPalette = () => {
      document.documentElement.dataset.twicePalette = systemPalette.matches ? "light" : "dark";
    };
    systemPalette.addEventListener("change", syncSystemPalette);
    syncSystemPalette();
    document.documentElement.dataset.twiceBrand = "off";
    const backgroundKey = "codex-twice-background-v1";
    const backgroundPattern = /^data:image\\/webp;base64,[a-z0-9+/=]+$/i;
    const savedBackground = localStorage.getItem(backgroundKey);
    const hasSavedBackground = Boolean(savedBackground && savedBackground.length <= 6000000 && backgroundPattern.test(savedBackground));
    const backgroundSizeKey = "codex-twice-background-size-v1";
    const backgroundXKey = "codex-twice-background-x-v1";
    const backgroundYKey = "codex-twice-background-y-v1";
    const backgroundBrightnessKey = "codex-twice-background-brightness-v2";
    const legacyBackgroundBrightnessKey = "codex-twice-background-brightness-v1";
    const allowedBackgroundSizes = new Set(["cover", "contain", "80%", "100%", "120%", "150%", "200%"]);
    const storedBackgroundSize = localStorage.getItem(backgroundSizeKey);
    let backgroundSize = allowedBackgroundSizes.has(storedBackgroundSize) ? storedBackgroundSize : "cover";
    const boundedPosition = (value) => {
      if (value === null || value === "") return 50;
      const number = Number(value);
      return Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : 50;
    };
    let backgroundX = boundedPosition(localStorage.getItem(backgroundXKey));
    let backgroundY = boundedPosition(localStorage.getItem(backgroundYKey));
    const storedBrightnessValue = localStorage.getItem(backgroundBrightnessKey);
    const legacyBrightnessValue = localStorage.getItem(legacyBackgroundBrightnessKey);
    const brightnessCandidate = storedBrightnessValue !== null
      ? Number(storedBrightnessValue)
      : (legacyBrightnessValue !== null ? Number(legacyBrightnessValue) - 100 : 0);
    let backgroundBrightness = Number.isFinite(brightnessCandidate)
      ? Math.min(100, Math.max(-100, Math.round(brightnessCandidate)))
      : 0;
    if (storedBrightnessValue === null) localStorage.setItem(backgroundBrightnessKey, String(backgroundBrightness));
    const syncBackgroundView = () => {
      document.documentElement.style.setProperty("--twice-background-position", backgroundX + "% " + backgroundY + "%");
      document.documentElement.style.setProperty("--twice-background-size", backgroundSize);
      const dim = Math.max(0, Math.min(.65, -backgroundBrightness / 100 * .8));
      const light = Math.max(0, Math.min(.35, backgroundBrightness / 100 * .35));
      document.documentElement.style.setProperty("--twice-background-dim", String(dim));
      document.documentElement.style.setProperty("--twice-background-light", String(light));
    };
    if (hasSavedBackground) {
      document.documentElement.style.setProperty("--twice-background-image", "url(" + JSON.stringify(savedBackground) + ")");
      syncBackgroundView();
      document.documentElement.dataset.twiceCustomBackground = "on";
    }

    const logoKey = "codex-twice-logo-v2";
    const storedLogo = localStorage.getItem(logoKey);
    let logoPreference = storedLogo === null ? !hasSavedBackground : storedLogo === "1";
    const bundledLogo = ${JSON.stringify(logoDataUrl)};
    const logo = document.createElement("div");
    logo.id = "codex-twice-logo";
    if (typeof bundledLogo === "string") {
      logo.style.backgroundImage = "url(" + JSON.stringify(bundledLogo) + ")";
    }
    document.body.appendChild(logo);

    const branding = document.createElement("div");
    branding.id = "codex-twice-branding";
    const eyebrow = document.createElement("strong");
    eyebrow.textContent = "ONE IN A MILLION";
    const headline = document.createElement("span");
    headline.textContent = "Ready To Be";
    branding.append(eyebrow, headline);
    document.body.appendChild(branding);

    let brandPreference = localStorage.getItem("codex-twice-brand") !== "0";
    const isVisible = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };
    const normalizedText = (element) => element.textContent?.trim().replace(/\s+/g, " ").toLowerCase() || "";
    const isNativeSettings = () => {
      const headingMatch = [...document.querySelectorAll("h1,h2,h3,[role=heading]")]
        .some((element) => isVisible(element) && /^(settings|設定|设置)$/.test(normalizedText(element)));
      if (headingMatch) return true;
      const visibleControls = new Set([...document.querySelectorAll("button,[role=tab],[role=menuitem],nav a")]
        .filter(isVisible)
        .map(normalizedText));
      const settingsSignals = ["general", "appearance", "notifications", "personalization", "account", "git", "worktrees", "mcp & apps"];
      return settingsSignals.filter((label) => visibleControls.has(label)).length >= 3;
    };
    const isChatPage = () => Boolean(document.querySelector('.composer-surface-chrome,[data-codex-composer="true"]'));
    const isNewTask = () => isChatPage() && !isNativeSettings() && !document.querySelector([
      "[data-user-message-bubble]",
      "[data-response-annotation-conversation]",
      "[data-local-conversation-final-assistant]",
      "[data-codex-approval-surface]",
    ].join(","));
    const syncVisualState = () => {
      const showBrand = brandPreference && isNewTask();
      document.documentElement.dataset.twiceBrand = showBrand ? "on" : "off";
      document.documentElement.dataset.twiceLogo = logoPreference && !showBrand ? "background" : "off";
    };
    const pageObserver = new MutationObserver(syncVisualState);
    pageObserver.observe(document.body, { childList: true, subtree: true });
    syncVisualState();

    const controls = document.createElement("div");
    controls.id = ${JSON.stringify(UI_ID)};
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.textContent = "Codex Twice ✦";
    trigger.setAttribute("aria-expanded", "false");
    const panel = document.createElement("section");
    panel.hidden = true;
    const title = document.createElement("h2");
    title.textContent = "Codex Twice";
    const note = document.createElement("p");
    note.textContent = "Live Once, Love Twice";

    const option = (label, checked, onChange) => {
      const row = document.createElement("label");
      const text = document.createElement("span");
      text.textContent = label;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.addEventListener("change", () => onChange(input.checked));
      row.append(text, input);
      return row;
    };
    const readable = option("Enhanced readability", document.documentElement.dataset.twiceReadable === "on", (on) => {
      document.documentElement.dataset.twiceReadable = on ? "on" : "off";
      localStorage.setItem("codex-twice-readable", on ? "1" : "0");
    });
    const brand = option("New-task One in a Million slogan", brandPreference, (on) => {
      brandPreference = on;
      localStorage.setItem("codex-twice-brand", on ? "1" : "0");
      syncVisualState();
    });
    const logoOption = option("TWICE logo", logoPreference, (on) => {
      logoPreference = on;
      localStorage.setItem(logoKey, on ? "1" : "0");
      syncVisualState();
    });
    const backgroundActions = document.createElement("div");
    backgroundActions.className = "twice-background-actions";
    const dragBackground = document.createElement("button");
    dragBackground.type = "button";
    dragBackground.textContent = "Drag photo";
    const chooseBackground = document.createElement("button");
    chooseBackground.type = "button";
    chooseBackground.textContent = "Choose photo";
    const clearBackground = document.createElement("button");
    clearBackground.type = "button";
    clearBackground.textContent = "Clear";
    const backgroundInput = document.createElement("input");
    backgroundInput.type = "file";
    backgroundInput.accept = "image/png,image/jpeg,image/webp";
    backgroundInput.hidden = true;
    const backgroundState = document.createElement("div");
    backgroundState.className = "twice-background-state";
    backgroundState.textContent = hasSavedBackground ? "Saved wallpaper loaded" : "Use Drag photo or Choose photo";
    backgroundActions.append(dragBackground, chooseBackground, clearBackground, backgroundInput);

    const wallpaperControls = document.createElement("div");
    wallpaperControls.className = "twice-wallpaper-controls";
    wallpaperControls.hidden = !hasSavedBackground;
    const sizeLabel = document.createElement("label");
    const sizeText = document.createElement("span");
    sizeText.textContent = "Wallpaper size";
    const sizeSelect = document.createElement("select");
    for (const [value, label] of [["cover", "Fill screen"], ["contain", "Fit photo"], ["80%", "80%"], ["100%", "100%"], ["120%", "120%"], ["150%", "150%"], ["200%", "200%"]]) {
      const item = document.createElement("option");
      item.value = value;
      item.textContent = label;
      sizeSelect.appendChild(item);
    }
    sizeSelect.value = backgroundSize;
    sizeSelect.addEventListener("change", () => {
      if (!allowedBackgroundSizes.has(sizeSelect.value)) return;
      backgroundSize = sizeSelect.value;
      localStorage.setItem(backgroundSizeKey, backgroundSize);
      syncBackgroundView();
    });
    sizeLabel.append(sizeText, sizeSelect);
    const rangeControl = (label, initial, min, max, onInput) => {
      const row = document.createElement("label");
      const text = document.createElement("span");
      text.textContent = label;
      const output = document.createElement("output");
      output.textContent = initial + "%";
      const input = document.createElement("input");
      input.type = "range";
      input.min = String(min);
      input.max = String(max);
      input.step = "1";
      input.value = String(initial);
      input.addEventListener("input", () => {
        output.textContent = input.value + "%";
        onInput(Number(input.value));
      });
      row.append(text, output, input);
      return { row, input, output };
    };
    const horizontalPosition = rangeControl("Horizontal position", backgroundX, 0, 100, (value) => {
      backgroundX = boundedPosition(String(value));
      localStorage.setItem(backgroundXKey, String(backgroundX));
      syncBackgroundView();
    });
    const verticalPosition = rangeControl("Vertical position", backgroundY, 0, 100, (value) => {
      backgroundY = boundedPosition(String(value));
      localStorage.setItem(backgroundYKey, String(backgroundY));
      syncBackgroundView();
    });
    const brightnessControl = rangeControl("Wallpaper brightness", backgroundBrightness, -100, 100, (value) => {
      backgroundBrightness = Math.min(100, Math.max(-100, Math.round(value)));
      localStorage.setItem(backgroundBrightnessKey, String(backgroundBrightness));
      syncBackgroundView();
    });
    const resetPosition = document.createElement("button");
    resetPosition.type = "button";
    resetPosition.className = "twice-wallpaper-reset";
    resetPosition.textContent = "Reset position";
    resetPosition.addEventListener("click", () => {
      backgroundX = 50;
      backgroundY = 50;
      localStorage.setItem(backgroundXKey, "50");
      localStorage.setItem(backgroundYKey, "50");
      horizontalPosition.input.value = "50";
      horizontalPosition.output.textContent = "50%";
      verticalPosition.input.value = "50";
      verticalPosition.output.textContent = "50%";
      syncBackgroundView();
      backgroundState.textContent = "Wallpaper position reset to center";
    });
    wallpaperControls.append(sizeLabel, horizontalPosition.row, verticalPosition.row, brightnessControl.row, resetPosition);

    const dropOverlay = document.createElement("div");
    dropOverlay.id = "codex-twice-drop-overlay";
    dropOverlay.hidden = true;
    dropOverlay.textContent = "Drop photo inside this frame";
    document.body.appendChild(dropOverlay);

    let dragPhotoMode = false;
    const setDragPhotoMode = (on) => {
      dragPhotoMode = on;
      dropOverlay.hidden = !on;
      dragBackground.textContent = on ? "Cancel drag" : "Drag photo";
      backgroundState.textContent = on ? "Drop a PNG, JPEG, or WebP inside the frame" : "Drag mode closed";
    };
    dragBackground.addEventListener("click", () => setDragPhotoMode(!dragPhotoMode));

    let backgroundWork = 0;
    const setBackground = (dataUrl) => {
      if (!backgroundPattern.test(dataUrl) || dataUrl.length > 6000000) throw new Error("The processed wallpaper is too large");
      localStorage.setItem(backgroundKey, dataUrl);
      document.documentElement.style.setProperty("--twice-background-image", "url(" + JSON.stringify(dataUrl) + ")");
      syncBackgroundView();
      document.documentElement.dataset.twiceCustomBackground = "on";
      wallpaperControls.hidden = false;
      logoPreference = false;
      localStorage.setItem(logoKey, "0");
      syncVisualState();
      logoOption.querySelector("input").checked = false;
      backgroundState.textContent = "Wallpaper saved and ready for the next launch";
    };
    const processBackground = (file) => new Promise((resolve, reject) => {
      if (!(file instanceof File) || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        reject(new Error("Please use a PNG, JPEG, or WebP image")); return;
      }
      if (file.size < 1 || file.size > 8388608) {
        reject(new Error("The image must be smaller than 8 MB")); return;
      }
      const generation = ++backgroundWork;
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("The image could not be read"));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("The image could not be decoded"));
        image.onload = () => {
          try {
            if (generation !== backgroundWork) return;
            const pixels = image.naturalWidth * image.naturalHeight;
            if (!image.naturalWidth || !image.naturalHeight || pixels > 24000000) throw new Error("The image dimensions are too large");
            const scale = Math.min(1, 2560 / image.naturalWidth, 1440 / image.naturalHeight);
            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            const context = canvas.getContext("2d");
            if (!context) throw new Error("The image canvas could not be created");
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const encoded = canvas.toDataURL("image/webp", .84);
            setBackground(encoded);
            resolve();
          } catch (error) { reject(error); }
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
    const importBackground = async (file) => {
      backgroundState.textContent = "Processing wallpaper…";
      try { await processBackground(file); }
      catch (error) { backgroundState.textContent = error.message || "Wallpaper processing failed"; }
    };
    chooseBackground.addEventListener("click", () => backgroundInput.click());
    backgroundInput.addEventListener("change", () => {
      const file = backgroundInput.files?.[0];
      if (file) void importBackground(file);
      backgroundInput.value = "";
    });
    clearBackground.addEventListener("click", () => {
      backgroundWork += 1;
      localStorage.removeItem(backgroundKey);
      document.documentElement.style.removeProperty("--twice-background-image");
      document.documentElement.style.removeProperty("--twice-background-position");
      document.documentElement.style.removeProperty("--twice-background-size");
      delete document.documentElement.dataset.twiceCustomBackground;
      wallpaperControls.hidden = true;
      logoPreference = true;
      localStorage.setItem(logoKey, "1");
      syncVisualState();
      logoOption.querySelector("input").checked = true;
      backgroundState.textContent = "Custom wallpaper cleared";
    });
    const containsFiles = (event) => [...(event.dataTransfer?.types || [])].includes("Files");
    const onDragEnter = (event) => {
      if (!containsFiles(event)) return;
      event.preventDefault();
      dropOverlay.hidden = !dragPhotoMode;
    };
    const onDragOver = (event) => {
      if (!containsFiles(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = dragPhotoMode ? "copy" : "none";
    };
    const onDragLeave = () => { if (!dragPhotoMode) dropOverlay.hidden = true; };
    const onDrop = (event) => {
      if (!containsFiles(event)) return;
      event.preventDefault();
      if (!dragPhotoMode) {
        dropOverlay.hidden = true;
        backgroundState.textContent = "Drop blocked · press Drag photo first";
        return;
      }
      const file = event.dataTransfer.files?.[0];
      setDragPhotoMode(false);
      if (file) void importBackground(file);
    };
    const onKeyDown = (event) => { if (event.key === "Escape" && dragPhotoMode) setDragPhotoMode(false); };
    document.addEventListener("dragenter", onDragEnter, true);
    document.addEventListener("dragover", onDragOver, true);
    document.addEventListener("dragleave", onDragLeave, true);
    document.addEventListener("drop", onDrop, true);
    document.addEventListener("keydown", onKeyDown, true);
    const restore = document.createElement("button");
    restore.type = "button";
    restore.className = "twice-restore";
    restore.textContent = "Restore native Codex";
    panel.append(title, note, readable, brand, logoOption, backgroundActions, wallpaperControls, backgroundState, restore);
    controls.append(trigger, panel);
    document.body.appendChild(controls);

    const close = () => {
      setDragPhotoMode(false);
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    };
    trigger.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      if (!open) setDragPhotoMode(false);
    });
    const onOutsidePointerDown = (event) => {
      if (!panel.hidden && !controls.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", onOutsidePointerDown, true);
    const remove = () => {
      pageObserver.disconnect();
      systemPalette.removeEventListener("change", syncSystemPalette);
      backgroundWork += 1;
      document.removeEventListener("dragenter", onDragEnter, true);
      document.removeEventListener("dragover", onDragOver, true);
      document.removeEventListener("dragleave", onDragLeave, true);
      document.removeEventListener("drop", onDrop, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onOutsidePointerDown, true);
      document.getElementById(${JSON.stringify(STYLE_ID)})?.remove();
      document.getElementById("codex-twice-branding")?.remove();
      document.getElementById(${JSON.stringify(UI_ID)})?.remove();
      document.getElementById("codex-twice-drop-overlay")?.remove();
      document.getElementById("codex-twice-logo")?.remove();
      delete document.documentElement.dataset.codexTwice;
      delete document.documentElement.dataset.twiceReadable;
      delete document.documentElement.dataset.twicePalette;
      delete document.documentElement.dataset.twiceBrand;
      delete document.documentElement.dataset.twiceLogo;
      document.documentElement.style.removeProperty("--twice-background-image");
      document.documentElement.style.removeProperty("--twice-background-position");
      document.documentElement.style.removeProperty("--twice-background-size");
      document.documentElement.style.removeProperty("--twice-background-dim");
      document.documentElement.style.removeProperty("--twice-background-light");
      delete document.documentElement.dataset.twiceCustomBackground;
      delete window.__codexTwiceSkin;
      return true;
    };
    restore.addEventListener("click", remove);
    window.__codexTwiceSkin = { id: ${JSON.stringify(SKIN_ID)}, version: "0.4.3", remove, close };
    return { installed: true, id: ${JSON.stringify(SKIN_ID)}, version: "0.4.3" };
  })()`;
}

export function buildRemoveExpression() {
  return `(() => {
    window.__codexTwiceSkin?.remove?.();
    document.getElementById(${JSON.stringify(STYLE_ID)})?.remove();
    document.getElementById("codex-twice-branding")?.remove();
    document.getElementById(${JSON.stringify(UI_ID)})?.remove();
    document.getElementById("codex-twice-logo")?.remove();
    delete document.documentElement.dataset.codexTwice;
    delete document.documentElement.dataset.twiceReadable;
    delete document.documentElement.dataset.twicePalette;
    delete document.documentElement.dataset.twiceBrand;
    delete document.documentElement.dataset.twiceLogo;
    document.documentElement.style.removeProperty("--twice-background-image");
    document.documentElement.style.removeProperty("--twice-background-position");
    document.documentElement.style.removeProperty("--twice-background-size");
    document.documentElement.style.removeProperty("--twice-background-dim");
    document.documentElement.style.removeProperty("--twice-background-light");
    delete document.documentElement.dataset.twiceCustomBackground;
    delete window.__codexTwiceSkin;
    return { installed: false };
  })()`;
}

export const STATUS_EXPRESSION = `(() => {
  const logo = document.getElementById("codex-twice-logo");
  const logoStyle = logo ? getComputedStyle(logo) : null;
  return {
    installed: document.documentElement.dataset.codexTwice === "on"
      && Boolean(document.getElementById(${JSON.stringify(STYLE_ID)})),
    id: window.__codexTwiceSkin?.id ?? null,
    version: window.__codexTwiceSkin?.version ?? null,
    palette: document.documentElement.dataset.twicePalette ?? null,
    logoMode: document.documentElement.dataset.twiceLogo ?? null,
    customBackground: document.documentElement.dataset.twiceCustomBackground ?? "off",
    wallpaperEditor: document.querySelector(".twice-wallpaper-controls")?.hidden ? "hidden" : "visible",
    wallpaperView: {
      size: document.documentElement.style.getPropertyValue("--twice-background-size") || "cover",
      position: document.documentElement.style.getPropertyValue("--twice-background-position") || "center",
      brightness: (localStorage.getItem("codex-twice-background-brightness-v2") || "0") + "%",
    },
    logoLayout: logoStyle ? {
      display: logoStyle.display,
      width: logoStyle.width,
      top: logoStyle.top,
      left: logoStyle.left,
      transform: logoStyle.transform,
    } : null,
  };
})()`;
