# Codex Twice Skin

[English](README.md) | [繁體中文（香港）](README.zh-Hant.md) | **简体中文**

<p align="center">
  <img src="assets/twice-logo.png" alt="TWICE 标志" width="180">
</p>

一款为 macOS Codex Desktop 打造、以 TWICE 为灵感的非官方皮肤。界面加入了 Candybong 粉色、梅紫色玻璃质感、圆润字体、TWICE Logo作为默认背景，以及自定义壁纸功能。

Codex Twice 只会改变电脑上的界面外观，不会修改 AI、提示词或回复内容，也不会修改 `app.asar` 或破坏 Codex App 的代码签名。

> [!IMPORTANT]
> Codex Twice 目前只支持安装在 `/Applications/ChatGPT.app` 的官方 macOS Codex Desktop，并且需要 Node.js 22 或更高版本。

## 三步完成安装

1. 从 **Releases** 下载最新 ZIP 并解压。
2. 打开解压后的 `codex-twice-skin` 文件夹。
3. 双击 **`Apply Codex Twice.command`**。

应用过程中，Codex 会自动退出并重新打开一次。进入新对话后，发送第一条指令前会看到欢迎标题；发送后，TWICE Logo 会变成居中的浅色背景。

macOS 可能会要求用户确认后才能打开下载的 `.command` 文件。继续之前，建议先核对 Release 校验值和源代码；不要关闭 Gatekeeper。

## 选择皮肤的保留方式

| 想进行的操作 | 打开这个文件 |
| --- | --- |
| 只在当前 Codex 会话中使用皮肤 | `Apply Codex Twice.command` |
| 每次启动 Codex 时自动应用 | `Enable Auto Restore.command` |
| 停止自动应用 | `Disable Auto Restore.command` |
| 恢复 Codex 原生外观 | `Restore Codex.command` |

Auto Restore 是可选功能。如果没有启用，完全退出 Codex 后再正常打开，注入的外观层就会被移除。

## 安装后有哪些变化

- **自动跟随深色和浅色模式**，实时匹配 macOS 的外观设置。
- **Candybong 风格配色**，同时保证主要文字、代码和 diff 清晰易读。
- **响应式 TWICE 元素**，只在对话页面显示，不会出现在 Settings、Skills 等系统页面。
- **合理的字体搭配**，英文控件使用圆润字体、中文使用 PingFang、代码使用 Menlo／SF Mono。
- **自定义壁纸**，图片只保存在本地，并可调整大小、位置和亮度。
- **简洁的控制面板**，在 Codex 中点击 `Codex Twice ✦` 即可打开。

这款皮肤不会用图片伪造 Codex 按钮，也不会修改模型或 App 功能。

## 使用控制面板

在 Codex 中打开 **`Codex Twice ✦`**，你可以：

- 开关阅读增强、TWICE Logo 和新对话标题；
- 选择 PNG、JPEG 或 WebP 壁纸；
- 实时调整壁纸大小、位置和亮度；
- 清除壁纸，或者恢复 Codex 原生外观。

壁纸会始终保留在你的 Mac 上。文件上限为 8 MB、2400 万像素，最大会缩放至 2560 × 1440，并以压缩 WebP 格式保存在 Codex 本地存储中。

## 恢复 Codex 原生外观

双击 **`Restore Codex.command`**。你也可以在控制面板中选择 **Restore native Codex**，或者运行：

```sh
npm run restore
```

如果已经启用 Auto Restore，请先将它关闭，否则下次启动 Codex 时皮肤会再次出现。

## 系统要求

- macOS
- 官方 Codex Desktop，安装位置必须为 `/Applications/ChatGPT.app`
- Node.js 22 或更高版本
- 无需安装任何 npm 依赖

目前不支持 Windows、Linux、浏览器版 Codex 或其他 App 安装位置。由于皮肤依赖 Codex 当前的 renderer 结构，Codex 更新后可能需要同步更新皮肤。

## 安全与隐私

皮肤运行期间会通过仅限本机的 `127.0.0.1:9342` 使用 Chrome DevTools Protocol。这个端口没有身份验证机制，因此同一个 macOS 用户账户下的其他程序理论上可以尝试连接 renderer。

处理登录凭据、私钥、敏感源代码或其他重要数据时，请不要使用这款皮肤。要彻底关闭连接：

1. 打开 `Disable Auto Restore.command`。
2. 完全退出 Codex。
3. 正常重新打开 Codex。

完整威胁模型和技术验证方式请参阅 [SECURITY.md](SECURITY.md)。

## 常见问题

如果应用后没有看到新外观：

1. 确认 Codex 安装在 `/Applications/ChatGPT.app`。
2. 使用 `node --version` 检查 Node.js，版本必须为 22 或更高。
3. 确认没有另一个 Codex 实例正在运行。
4. 在当前文件夹运行 `npm run verify`，并保留完整的错误信息。

如果代码签名验证失败，请停止操作，并从 OpenAI 重新安装最新的官方 Codex App。不要为了跳过意外错误而使用 reduced verification。

## 开发者信息

发布前请运行测试和 Release 审计：

```sh
npm run verify
```

主要文件：

- `src/theme.mjs` — 视觉设计和 App 内控件
- `src/cli.mjs` — 验证、应用、状态和恢复命令
- `src/controller.mjs` — 有边界的 Auto Restore 控制器
- `src/cdp.mjs` — 精简、仅限 loopback 的 CDP 客户端
- `scripts/` — 自动恢复管理和 Release 审计

## 许可证与声明

代码基于 [MIT License](LICENSE) 发布。

Codex Twice 与 TWICE、JYP Entertainment、OpenAI 或 Codex 无关，也未获得上述任何机构认可。项目不包含官方照片、音乐或字体。内置的 TWICE Logo 由用户提供，不属于 MIT 软件许可证的授权范围；详情请参阅 [NOTICE.md](NOTICE.md)。
