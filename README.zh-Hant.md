# Codex Twice Skin

[English](README.md) | **繁體中文** | [简体中文](README.zh-Hans.md)

<p align="center">
  <img src="assets/twice-logo.png" alt="TWICE 標誌" width="180">
</p>

一款為 macOS Codex Desktop 製作、以 TWICE 為靈感的非官方 Skin。介面加入 Candybong 粉紅色、梅紫玻璃質感、圓潤字體、 TWICE Logo作為默認背景，以及自訂背景功能。

Codex Twice 只會改變 Mac 上的介面外觀，不會改動 AI、提示詞或回覆內容，亦不會修改 `app.asar` 或破壞 Codex App 的程式碼簽署。


> [!IMPORTANT]
> Codex Twice 目前只支援安裝於 `/Applications/ChatGPT.app` 的官方 macOS Codex Desktop，並需要 Node.js 22 或以上版本。

## 三步完成安裝

1. 從 **Releases** 下載ZIP，然後解壓文件。
2. 開啟解壓後的 `codex-twice-skin` 資料夾。
3. 雙擊 **`Apply Codex Twice.command`**。

套用期間 Codex 會自動關閉並重新開啟一次。進入新 Chat 時，送出第一句指令前會看到歡迎標題；送出後，TWICE Logo 會變成置中的淡色背景。

macOS 可能會要求用戶確認，才可開啟已下載的 `.command` 檔案。點選繼續之前，請先核對 Release checksum 及原始碼；請勿停用 Gatekeeper。

## 選擇保留方式

| 操作 | 開啟的檔案 |
| --- | --- |
| 只在目前的 Codex 工作階段使用 Skin | `Apply Codex Twice.command` |
| 每次開啟 Codex 都自動套用 | `Enable Auto Restore.command` |
| 停止自動套用 | `Disable Auto Restore.command` |
| 回復 Codex 原本外觀 | `Restore Codex.command` |

Auto Restore 是選用功能。如未啟用，完全退出 Codex 後再正常開啟，注入的外觀層便會消失。

## 安裝後的改變

- **自動跟隨深淺色模式**，配合 macOS 外觀設定即時轉換。
- **Candybong 風格配色**，同時保持主要文字、程式碼及 diff 清晰易讀。
- **TWICE 元素標題**，只會在 Chat 頁面出現，不會在 Settings、Skills 等系統頁面顯示。
- **字體分工**，英文控制項使用圓潤字體、中文使用 PingFang、程式碼使用 Menlo／SF Mono。
- **自訂背景**，圖片只會儲存於本機，並可調校大小、位置及亮度。
- **控制面板**，在 Codex 內點擊 `Codex Twice ✦` 即可開啟。

此 Skin 不會以圖片偽裝成 Codex 按鈕，亦不會改變模型或 App 功能。

## 使用控制面板

在 Codex 內開啟 **`Codex Twice ✦`**，用戶可以：

- 開關閱讀增強、TWICE Logo 及新 Chat 標題；
- 選擇 PNG、JPEG 或 WebP 背景圖片；
- 即時調校背景大小、位置及亮度；
- 清除背景，或者回復 Codex 原本外觀。

背景圖片全程保留於用戶的 Mac。檔案上限為 8 MB、2,400 萬像素，最大會縮放至 2560 × 1440，並以壓縮 WebP 儲存於 Codex local storage。

## 回復原本 Codex 外觀

雙擊 **`Restore Codex.command`**。亦可在控制面板選擇 **Restore native Codex**，或執行：

```sh
npm run restore
```

如已啟用 Auto Restore，請先將其停用，否則下次開啟 Codex 時 Skin 會再次出現。

## 系統要求

- macOS
- 官方 Codex Desktop，安裝位置必須為 `/Applications/ChatGPT.app`
- Node.js 22 或以上版本
- 無需安裝任何 npm dependencies

目前不支援 Windows、Linux、瀏覽器版 Codex 或其他 App 安裝位置。由於 Skin 依賴 Codex 現時的 renderer 結構，Codex 更新後可能需要同步更新 Skin。

## 安全與私隱

Skin 運作期間會透過只限本機的 `127.0.0.1:9342` 使用 Chrome DevTools Protocol。此連接埠並無驗證機制，因此同一個 macOS 用戶帳戶下的其他程式，理論上可以嘗試連接 renderer。

處理登入憑證、私鑰、敏感原始碼或其他重要資料時，請勿使用此 Skin。要完全關閉連接：

1. 開啟 `Disable Auto Restore.command`。
2. 完全退出 Codex。
3. 正常重新開啟 Codex。

完整威脅模型及技術驗證方式請參閱 [SECURITY.md](SECURITY.md)。

## 常見問題

如果套用後未有顯示新外觀：

1. 確認 Codex 安裝於 `/Applications/ChatGPT.app`。
2. 使用 `node --version` 檢查 Node.js，版本必須為 22 或以上。
3. 確認沒有另一個 Codex instance 同時開啟。
4. 在此資料夾執行 `npm run verify`，並保留完整錯誤訊息。

如果程式碼簽署驗證失敗，請先停止操作，並從 OpenAI 重新安裝最新官方 Codex App。請勿為略過非預期錯誤而使用 reduced verification。

## 開發者資料

發佈前請執行測試及 Release audit：

```sh
npm run verify
```

主要檔案：

- `src/theme.mjs` — 視覺設計及 App 內控制項
- `src/cli.mjs` — 驗證、套用、狀態及還原指令
- `src/controller.mjs` — 有界限的 Auto Restore controller
- `src/cdp.mjs` — 精簡、只限 loopback 的 CDP client
- `scripts/` — 自動恢復管理及 Release audit

## 授權與聲明

程式碼依 [MIT License](LICENSE) 發佈。

Codex Twice 與 TWICE、JYP Entertainment、OpenAI 或 Codex 無關，亦未獲以上任何單位認可。專案不包含官方相片、音樂或字體。內附的 TWICE Logo 由用戶提供，並不屬於 MIT 軟件授權範圍；詳情請參閱 [NOTICE.md](NOTICE.md)。
