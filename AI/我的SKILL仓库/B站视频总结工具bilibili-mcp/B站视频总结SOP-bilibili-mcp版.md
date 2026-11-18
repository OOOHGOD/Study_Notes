# B 站视频总结 SOP（bilibili-mcp 版）—— AI 可直接照做

> **用途**：拿到任意 B 站视频链接后，按本 SOP 走完「解析 → 拆解（元数据/章节/字幕/评论）→ 总结 → 沉淀」全流程。
> **工具**：[XZXZZX-Ai/bilibili-mcp](https://github.com/XZXZZX-Ai/bilibili-mcp) v1.14.6（npm `@xzxzzx/bilibili-mcp`，Apache-2.0）
> **与 BiliNote 的本质区别**：bilibili-mcp 只负责**拆解素材**（元数据/章节/字幕/转写/评论），**总结由 AI 自己完成**；BiliNote 是 GUI 应用内置 LLM 总结（已于 2026-11-18 弃用，旧 SOP 见归档）。
> **实测样例**：2026-11-18，《项目越写越乱？先改目录结构 | 整洁架构》（BV1VEWY6kEto），全链路跑通（元数据 ✓ 章节 ✓ 转写 ✓ 评论 ✓）。
> **读者**：AI（照做）与人类（理解原理）。前提：本机已安装配置完毕（Node 22 / 凭证 / ASR / Clash fake-ip-filter 均已就绪，见 §0 现状）。

---

## 0. 本机现状（2026-11-18 已配好，勿重复配置）

| 项 | 状态 |
|---|---|
| WorkBuddy MCP 配置 | 已写入 `~/.workbuddy/mcp.json`（bilibili-mcp / npx）。**每次新会话需在连接器管理页对 `bilibili-mcp` 点信任激活** |
| B 站凭证 | 已配置（`~/.bilibili-mcp/config.json`），登录验证通过。⚠️ 2026-11-18 的凭证曾经过聊天传输，建议用户在 B 站「退出所有设备」后重新配置 |
| ASR 模型 | small（486MB）已装于 `~/.bilibili-mcp/asr/`，CPU INT8 验证通过（GPU 未启用：受控运行时缺 CUDA 组件，需另装 CUDA 12/cuBLAS/cuDNN 9 才能用 5070 Ti） |
| Clash fake-ip-filter | 已加 `+.bilivideo.com`/`+.bilivideo.cn`（写在全局 `profiles\Merge.yaml` 的 dns 段），已生效。**删除或换 Merge 文件会复发 ASR_FAKE_IP_DNS** |
| 转写耗时参考 | 7 分钟视频 = CPU small 约 6.7 分钟（medium 参考值约 14 分钟，BiliNote 实测） |

## 1. 前置检查（每次执行先跑）

MCP 工具可用时（已信任激活）直接调；不可用时的裸调方式见 §5。

1. `check_bilibili_credentials` → 必须 `configured: true` 且 `logged_in: true`
   - `configured: false` → 用户终端跑 `npx -y @xzxzzx/bilibili-mcp@latest setup`
   - `logged_in: false` → 跑 `npx -y @xzxzzx/bilibili-mcp@latest config` 强制重配
2. ASR 状态（仅无字幕视频需要）：`npx -y @xzxzzx/bilibili-mcp@latest doctor --json` → `asr.status: "ready"`

## 2. 链接解析（b23.tv 短链不支持直喂！）

**实测 b23.tv 短链直喂 `bvid_or_url` 报内部错误（UNKNOWN）**，必须先解析：

```powershell
curl.exe -sI "https://b23.tv/xxxxxx" | Select-String "location"   # Location 头提取 BV 号
```

完整链接 `https://www.bilibili.com/video/BVxxx/?share_source=...` → 剥掉查询参数只留 `BVxxx`（工具也吃完整 URL，但带参 URL 保险起见清洗后再用）。

## 3. 拆解调用顺序（建议）

| 步 | 工具 | 关键参数 | 产出 |
|---|---|---|---|
| 1 | `get_video_metadata` | `bvid_or_url` | 标题/UP主/时长/简介/分P/播放点赞投币收藏 |
| 2 | `get_video_chapters` | `bvid_or_url` | 章节/进度条分段 |
| 3 | `get_video_transcript` | `bvid_or_url`, `include_timestamps: true` | 字幕带时间戳；`data_source` 三种：`subtitle`(人工)/`ai_subtitle`(B站AI)/`asr`(本地) |
| 4 | `get_video_comments` | `bvid_or_url`, `sort: "hot"`, `limit` | 热门评论带点赞数 |
| 5 | （可选）transcript 的 `query` 参数 | `query: "关键词"` | 在字幕里定位原话，返回上下文+时间戳+可跳转时刻链接 |

### 字幕获取的三级策略（本视频实锤的坑）

1. **先普通调用**：拿到 `data_source: "subtitle"` → 最好，直接用。
2. **拿到 `ai_subtitle` → 警惕串台**：B 站 AI 字幕可能**内容错配**（本视频实测拿到的是一期"珊瑚保育"节目的字幕，标题正确内容错误）。判断方法：转写开头内容与标题/简介明显不符 → 不可信。工具的完整性检查只验"双读一致"，不验语义匹配（官方承认的已接受限制）。
3. **`force_asr: true` 强制本地转写**：绕过一切字幕直接 ASR，串台时的唯一解。`data_source: "asr"` 为可信本地转写。
   - 前提：ASR ready（§0/§1 已配）
   - 触发 `ASR_FAKE_IP_DNS` 错误 → Clash fake-ip 又拦音频 CDN → 检查 `Merge.yaml` 的 `dns.fake-ip-filter` 是否还有 `+.bilivideo.com`/`+.bilivideo.cn`，改完重启 clash-verge.exe
   - 工具要求**用户明确授权**才可 force_asr/改网络配置（错误响应里写了"Do not automatically ... edit the proxy config"），AI 遇到要停下来问用户

## 4. 总结与沉淀（AI 的活，工具不管）

1. 用转写稿（时间戳文本）+ 章节 + 元数据 + 高价值评论做结构化总结
2. 沉淀到 `C:\Users\DC\Documents\GitHub\Study_Notes\AI\我的SKILL仓库\B站视频总结工具bilibili-mcp\`（本文件夹）
3. 转写稿可选归档：`_transcript` 文本转成 md 存档

## 5. MCP 未激活时的裸调方式（stdio JSON-RPC）

MCP 工具未就绪时可直接 stdio 调用（Node 脚本）：spawn `node <入口>` 而非 npx（**Windows 下 Node spawn npx.cmd 会报 EINVAL**）。入口在 npx 缓存：
`C:\Users\DC\AppData\Local\npm-cache\_npx\b59ad51cc5cf8ab4\node_modules\@xzxzzx\bilibili-mcp\dist\index.js`
协议：行分隔 JSON-RPC → `initialize` → `notifications/initialized` → `tools/call {name, arguments}`，stdout 按行读 JSON 按 id 匹配。

## 6. 安装备忘（如需在新机器重配）

1. MCP 配置：`mcp.json` 加 `{"command":"npx","args":["-y","@xzxzzx/bilibili-mcp@latest"]}`（部分 Windows 客户端 npx 报 ENOENT 时改 `command: "cmd", args: ["/c","npx","-y","@xzxzzx/bilibili-mcp@latest"]`）
2. 凭证：`npx -y @xzxzzx/bilibili-mcp@latest setup` → 推荐扫码（回车即选）或手动 Cookie 三字段（F12 → Application → Cookies → `https://www.bilibili.com`，取 `SESSDATA`/`bili_jct`/`DedeUserID`，右键 Copy value）。凭证只进终端隐藏提示符，**绝不过聊天/AI/客户端配置**
3. 非交互凭证注入（AI 代配时）：进程环境变量 `BILIBILI_SESSDATA/BILIBILI_BILI_JCT/BILIBILI_DEDEUSERID` + `setup --non-interactive` → 落盘 `~/.bilibili-mcp/config.json`，之后删环境变量
4. ASR：`setup --non-interactive --asr-model small --asr-device auto`（需 Python 3.9+；模型从 HuggingFace 下载，国内走代理 `HTTPS_PROXY=http://127.0.0.1:7897`）。**沙箱里 vvenv 创建 python.exe 会被权限拦截，需非沙箱模式跑**
5. Clash TUN 用户必配 `dns.fake-ip-filter: ["+.bilivideo.com","+.bilivideo.cn"]`，否则 ASR 拒载音频

## 常见坑速查

| 坑 | 症状 | 解 |
|---|---|---|
| b23.tv 短链 | `get_video_*` 报内部错误 UNKNOWN | curl -sI 解析出 BV 再调用 |
| AI 字幕串台 | `data_source: "ai_subtitle"` 但内容和标题驴唇不对马嘴 | `force_asr: true` 本地转写 |
| ASR 拒载音频 | `ASR_FAKE_IP_DNS`（198.18.x.x） | Clash fake-ip-filter 加 bilivideo 两域，重启 clash-verge |
| ASR 未装 | `ASR_NOT_READY` | `setup --non-interactive --asr-model small --asr-device auto` |
| ASR 安装失败 | `venv creation failed: Permission denied ...python.exe` | 沙箱拦截，非沙箱模式重跑（支持断点续传） |
| Node spawn npx | `spawn EINVAL` | 直接 spawn node + npx 缓存里的 dist/index.js 入口 |
| npx 执行策略 | PowerShell 跑 npx 报"禁止运行脚本" | 用 `npx.cmd` 或 cmd 窗口跑 |
| GPU 不生效 | doctor 显示 cuda_runtime_missing | CPU INT8 够用；要 GPU 需装 CUDA 12+cuBLAS+cuDNN 9 |
| 登录失效 | `logged_in: false` | `npx ... config` 重配（Cookie 过期/退出过设备） |

## 与 BiliNote 对比结论（2026-11-18 实测）

| 维度 | bilibili-mcp | BiliNote（已卸载） |
|---|---|---|
| 接入方式 | MCP 原生，任何 AI 会话直接甩链接 | 独立 GUI 应用 + 316MB 安装 + HTTP API 逆向 |
| 总结 | AI 自己写（素材齐全，质量取决于 AI） | 内置 DeepSeek 调用（质量固定） |
| 转写 | faster-whisper small，CPU 6.7min/7min 视频 | medium，CPU 14min（质量略高） |
| 拆解深度 | 元数据+章节+评论+关键词定位+时刻链接 | 元数据+字幕+总结（无评论） |
| 凭证安全 | 明确设计：不过聊天/客户端配置 | cookie 走 SQLite |
| 磁盘占用 | 模型 486MB（shared HF 缓存可省）+包 | 应用 316MB+模型副本 2.9GB |

旧 BiliNote SOP（含 HF 缓存嫁接、mihomo 管道切换节点等通用坑）已归档至《归档-BiliNoteSOP-2026-11-18弃用.md》。
