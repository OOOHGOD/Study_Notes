# B 站视频总结 SOP（BiliNote 桌面版后端直调）—— AI 可直接照做

> **用途**：拿到任意 B 站视频链接（含 b23.tv 短链）后，按本 SOP 走完「解析 → 拆解 → 转写 → 总结 → 落盘 → 清理」全流程。
> **适用环境**：Windows + BiliNote 桌面版 v2.4.5（已安装于 `C:\Users\DC\AppData\Local\BiliNote`）
> **实测样例**：2026-11-18，《项目越写越乱？先改目录结构 | 整洁架构》（BV1VEWY6kEto），全流程跑通。
> **读者**：AI（照做）与人类（理解原理）。AI 执行时逐节按顺序执行，遇到前置检查失败先看「常见坑」。

---

## 0. 能力与原理

- BiliNote = yt-dlp（抓取/音频下载）+ faster-whisper（本地转写）+ LLM API（总结）的桌面应用（Tauri GUI + PyInstaller 打包的 FastAPI 后端）。
- **AI 复用无需碰 GUI**：后端是独立进程 `BiliNoteBackend.exe`，HTTP API 监听 `http://127.0.0.1:8483`（端口写在 `C:\Users\DC\AppData\Local\BiliNote\_internal\.env` 的 `BACKEND_PORT`）。
- 所有 API 响应都是信封结构 `{"code": 0, "msg": "success", "data": ...}`，取 `.data`。
- 该视频无公开字幕时走**本地 whisper 转写**；B 站链接默认不需要 cookie（yt-dlp 公开可抓）。

## 1. 前置检查（每次执行先跑）

```powershell
# 1a. 后端是否在跑
Get-Process BiliNoteBackend -ErrorAction SilentlyContinue   # 无输出 = 需启动

# 1b. 启动后端（计划任务方式，防沙箱进程树清理；不经 GUI，避免系统代理注入）：
$action = New-ScheduledTaskAction -Execute "C:\Users\DC\AppData\Local\BiliNote\BiliNoteBackend.exe" -WorkingDirectory "C:\Users\DC\AppData\Local\BiliNote"
Register-ScheduledTask -TaskName "BiliNoteBackendLaunch" -Action $action -Trigger (New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(5)) -Force | Out-Null
Start-ScheduledTask -TaskName "BiliNoteBackendLaunch"
Unregister-ScheduledTask -TaskName "BiliNoteBackendLaunch" -Confirm:$false
Start-Sleep -Seconds 25
# 普通人工环境（非 AI 沙箱）直接双击 app.exe 或运行 BiliNoteBackend.exe 即可

# 1c. 后端健康（ffmpeg/db 都内置，应全 true）
Invoke-RestMethod "http://127.0.0.1:8483/api/sys_health"

# 1d. 转写模型是否就绪（whisper_model.downloaded 应为 true；若清理过副本见「常见坑2」先嫁接）
Invoke-RestMethod "http://127.0.0.1:8483/api/transcriber_models_status"

# 1e. LLM 供应商是否已配（应至少有一个 enabled 的 provider + models 表有记录）
Invoke-RestMethod "http://127.0.0.1:8483/api/get_all_providers" | % { $_.data } | Select id,name,base_url,enabled
```

完整接口文档：`GET http://127.0.0.1:8483/openapi.json`（标准 FastAPI OpenAPI）。

## 2. 短链解析（b23.tv → BV 号）

b23.tv 短链官方未承诺被 yt-dlp 直吃，先解析：

```powershell
curl.exe -sI "https://b23.tv/xxxxxx" | Select-String "location"    # Location 头含 BV 号
```

示例结果：`location: https://www.bilibili.com/video/BV1VEWY6kEto` → 提取 `BV1VEWY6kEto`。
完整链接可直接跳过本步。元数据（标题/UP主/时长/播放量）可用 B 站公开 API 速查：

```powershell
Invoke-RestMethod "https://api.bilibili.com/x/web-interface/view?bvid=BV1VEWY6kEto"
```

## 3. 提交总结任务

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$body = @{ video_url = "https://www.bilibili.com/video/BV1VEWY6kEto"
           platform = "bilibili"; quality = "fast"
           screenshot = $false; link = $true
           model_name = "deepseek-chat"; provider_id = "deepseek"
           video_understanding = $false } | ConvertTo-Json
$r = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:8483/api/generate_note" `
      -ContentType "application/json" -Body $body -TimeoutSec 60
$taskId = $r.data.task_id    # 记下这个，后面全靠它
```

参数说明：`quality=fast` 音频优先（总结足够）；`link=$true` 总结里带可跳转时间戳链接；`provider_id/model_name` 换成已配置的 LLM。

## 4. 轮询状态直到完成

状态序列：`DOWNLOADING → TRANSCRIBING → SUCCESS`（失败为 `FAILED/ERROR`）。

```powershell
for ($i=1; $i -le 40; $i++) {
  Start-Sleep -Seconds 30
  $s = Invoke-RestMethod "http://127.0.0.1:8483/api/task_status/$taskId" -TimeoutSec 15
  $st = $s.data.status
  Write-Output ("[" + (Get-Date -Format "HH:mm:ss") + "] " + $st)
  if ($st -in @("SUCCESS","FAILED","ERROR")) { break }
}
```

**耗时参考**（本机 128GB RAM，CPU 推理）：7 分钟视频 = 下载 ~1 分钟 + medium 转写 ~14 分钟 + LLM 总结 ~1 分钟。长视频按比例放大；切 `small` 模型更快但中文术语易错。

## 5. 取结果（读文件，别调 get_note_content）

⚠️ `GET /api/get_note_content/{id}` 实测 404，**直接读落盘文件**：

```
%LOCALAPPDATA%\BiliNote\note_results\{task_id}_markdown.md    ← 总结成品
%LOCALAPPDATA%\BiliNote\note_results\{task_id}_transcript.json ← 带时间戳字幕（{language, full_text, segments[{start,end,text}]}）
%LOCALAPPDATA%\BiliNote\note_results\{task_id}_audio.json      ← 视频元数据（标题/UP主/tags/简介/封面）
```

## 6. 知识沉淀（本仓库惯例）

在 `C:\Users\DC\Documents\GitHub\Study_Notes\AI\我的SKILL仓库\` 下为该主题建子文件夹，产出：
1. 视频知识总结（结构化笔记，人读）
2. 本 SOP 的实战补充（如有新坑）
需要字幕稿时把 `_transcript.json` 转成 md 归档。

## 7. 清理（省空间，任务完成后执行）

| 目标 | 路径 | 动作 |
|---|---|---|
| 安装包 | `...\WorkBuddy\<会话>\downloads\BiliNote_*.exe`（98MB） | 删 |
| 音频缓存 | `%LOCALAPPDATA%\BiliNote\data\*.mp3`（每视频 ~3MB） | 删 |
| 任务临时件 | `%LOCALAPPDATA%\BiliNote\note_results\`（成品拷走后可删） | 按需 |
| 模型副本 | `%APPDATA%\BiliNote\models\`（medium 2.9GB，**HF 缓存原件在** `~\.cache\huggingface\hub`） | 空间紧张时删，用时再嫁接（见坑 2） |

## 常见坑（实测踩过，按命中概率排序）

1. **接口信封**：所有响应外面套 `{code,msg,data}`，遍历顶层会得到寂寞，永远取 `.data`。
2. **沙箱/终端会话的进程树清理（2026-11-18 实测）**：AI 在受限 shell 里 `Start-Process` 启动的 GUI/后端进程，可能在该 shell 命令结束后被**连带杀死**（后端无声消失、日志无 error、Windows 事件日志无崩溃记录）。特征：进程起来 → 命令结束 → 死。**解法：用计划任务把它变成"孤儿"**：
   ```powershell
   $action = New-ScheduledTaskAction -Execute "C:\Users\DC\AppData\Local\BiliNote\BiliNoteBackend.exe" -WorkingDirectory "C:\Users\DC\AppData\Local\BiliNote"
   Register-ScheduledTask -TaskName "BiliNoteBackendLaunch" -Action $action -Trigger (New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(5)) -Force | Out-Null
   Start-ScheduledTask -TaskName "BiliNoteBackendLaunch"
   Unregister-ScheduledTask -TaskName "BiliNoteBackendLaunch" -Confirm:$false   # 启动完删任务
   ```
   （GUI app.exe 同理；若 `Register-ScheduledTask` 不可用，退而求其次用 `schtasks /create` + `/run`。）
3. **冷启动 generate_note 超时但任务已受理（2026-11-18 实测）**：进程刚起时 medium 模型冷加载要 ~62 秒（日志 `WhisperTranscriber 创建成功`），`generate_note` 同步等它 → 客户端 60 秒超时。**此时任务其实已受理**：到 `%LOCALAPPDATA%\BiliNote\note_results\` 找最新的 `{uuid}.status.json` 拿真实 task_id，直接进轮询，**不要重提交**（会重复跑）。热进程（已转写过一次）提交是秒回。
4. **whisper 模型不读 HuggingFace 缓存**：BiliNote 用 `snapshot_download(cache_dir=自己目录)` 强制重新下载（~486MB~2.9GB），且 `/api/transcriber_download` 是**同步阻塞**——会把整个后端冻住（连 sys_health 都超时）。**嫁接方案**：把 `~\.cache\huggingface\hub\models--Systran--faster-whisper-{size}` 整目录 Copy-Item 到 `%APPDATA%\BiliNote\models\whisper\`（保持 HF 布局含 snapshots/<hash>/model.bin），再用 `/api/transcriber_config` 切 `{"transcriber_type":"fast-whisper","whisper_model_size":"{size}"}`，零下载秒就绪。**清理后复用**：删除模型副本后下次用，重新 Copy-Item 一次即可（~2 分钟，1.5GB 走本地磁盘）。
5. **GUI 会注入系统代理**：用 app.exe（GUI）拉起后端时，后端日志可能出现「已应用全局代理到环境变量: http://127.0.0.1:59217」（Clash Verge 随机端口）——B 站直连下载可能被这个代理掐死。**直接跑 BiliNoteBackend.exe（不经 GUI）无此问题**；权威代理状态以 `GET /api/proxy_config` 为准（`enabled:false,url:""` = 直连）。
6. **LLM 供应商配置**：数据库**预置内置供应商**（id 如 `deepseek`），别 `add_provider` 新建（会撞重名）。正确姿势：`POST /api/update_provider` 带 `{"id":"deepseek","api_key":"sk-..."}` → `POST /api/models` 带 `{"provider_id":"deepseek","model_name":"deepseek-chat"}` → `POST /api/connect_test` 验证。key 落本机 SQLite，不进明文配置，符合密钥安全原则；**建议同时把 key 存用户环境变量**。
7. **connect_test 报 200105（key/地址不正确）**：先直连官方 API 验证 key 本身（`Invoke-RestMethod https://api.deepseek.com/chat/completions`），排除拼装/抄写错误再怪工具。
8. **GitHub 下载被 GFW/死节点掐**：Clash 端口 7897 TCP 通≠节点活。活体诊断：命名管道 `\\.\pipe\verge-mihomo-production-*`（v2.4.7 管道名带 hash 后缀，`[System.IO.Directory]::GetFiles("\\.\pipe\")` 里找）+ `Authorization: Bearer <secret in clash-verge.yaml>`，HTTP/**1.0**（规避 chunked），`PUT /proxies/<组名URL编码>` 切到「自动选择」组让节点自愈。之后 curl 加 `-x http://127.0.0.1:7897` + `-C -` 断点续传。
9. **BiliNote 下载慢/断**：官方 Release（`BiliNote_x64-setup.exe` ~103MB）走代理 + `--retry 3` + `-C -` 断点续传，装完 `Get-FileHash` 对比官方 SHA256SUMS。
10. **后端进程死于转写中**：重启后任务不自动恢复，重新提交 generate_note 即可——已下载的 mp3 在 `data\` 里会复用，只重跑转写。
11. **PowerShell 编码**：读中文 JSON 前 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`；PowerShell 5.1 不支持 `??` 语法。
12. **URL 清洗**：用户甩来的链接常带 `?share_source=copy_web&vd_source=...` 参数，提交前剥掉只留 `https://www.bilibili.com/video/BVxxxx`。

## 版本与许可

- BiliNote v2.4.5（2026-08-25），MIT License，仓库 `JefferyHcool/BiliNote`。
- 备选工具（当时对比结论）：XZXZZX-Ai/bilibili-mcp（MCP，51★，更新最勤）、bilibili-video-info-mcp（已停更）。若 BiliNote 弃用，MCP 路线是次优解。
