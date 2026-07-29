# Study Notes

一个持续更新的个人学习知识库，记录 AI Agent、大语言模型、Python、AI 开发工具与机器人项目的学习笔记、实践过程和阶段性复盘。

> 本仓库同时也是一个 [Obsidian](https://obsidian.md/) Vault。内容以 Markdown 为主，可以直接在 GitHub 阅读，也可以克隆到本地后使用 Obsidian 打开。
![[9db422e4-1f26-4acb-b531-ca89b078e82d.jpg]]

## 学习地图

| 方向 | 主要内容 | 快速入口 |
| --- | --- | --- |
| AI Agent | Tool Calling、Agent Loop、RAG、MCP、Agent Skills、Harness、多 Agent | [Agent 学习路径](./AI%20Agent学习/Agent组成部分学习/Agent学习路径.md) |
| 大语言模型 | NLP、Transformer、预训练、模型训练与应用 | [Happy-LLM 笔记](./大模型LLM学习/Happy-LLM/) |
| Python | 类型提示、装饰器、闭包、`uv` | [Python 答疑](./Python答疑/) |
| AI 工具 | Codex 等开发工具的概念与使用记录 | [AI 工具学习](./AI%20工具学习/) |
| 项目实践 | AI 工作流、ElectronBot、动画宠物等 | [项目目录](./项目/) |

推荐阅读顺序：

```text
LLM 基础 → Python 与 API → Tool Calling → Agent Loop
→ RAG / Memory → MCP / Skills / Harness → 多 Agent → 项目实践
```

## 内容导航

### AI Agent

- [Agent 学习路径](./AI%20Agent学习/Agent组成部分学习/Agent学习路径.md)：从基础能力到完整 Agent 系统的学习路线
- [Function Call](./AI%20Agent学习/Agent组成部分学习/Function%20Call.md)：工具调用的基本机制
- [从 ToolCall 到 Harness、Claw](./AI%20Agent学习/Agent组成部分学习/从ToolCall到Harness、Claw/)：理论、代码与 Agent Loop 实践
  - [学习笔记](./AI%20Agent学习/Agent组成部分学习/从ToolCall到Harness、Claw/从ToolCall到Harness、Claw笔记.md)
  - [MokioClaw 项目规划](./AI%20Agent学习/Agent组成部分学习/从ToolCall到Harness、Claw/项目篇规划.md)
  - [OpenAI 使用笔记](./AI%20Agent学习/Agent组成部分学习/从ToolCall到Harness、Claw/openai使用笔记.md)
- [MCP](./AI%20Agent学习/Agent组成部分学习/MCP.md)：模型上下文协议学习记录
- [RAG 专题](./AI%20Agent学习/Agent组成部分学习/RAG技术从小白到深入理解/)：从基础概念到深入理解
- [Agent Skills](./AI%20Agent学习/Agent组成部分学习/Agent%20Skills/)：Skills 框架与 Harness 自动化实践
- [PaddleOCR](./AI%20Agent学习/Agent组成部分学习/PaddleOCR/)：PaddleOCR-VL 论文与模型笔记
- [大模型 Agent 从 0 到 1](./AI%20Agent学习/Agent组成部分学习/大模型Agent从0-1笔记/大模型Agent从0-1笔记.md)

### 大语言模型

[Happy-LLM 学习笔记](./大模型LLM学习/Happy-LLM/)覆盖以下主题：

- NLP 基础与 Transformer 架构
- 预训练语言模型与大语言模型
- 动手搭建和训练大模型
- 大模型应用实践

### Python 与开发工具

- [类型提示 Type Hints](./Python答疑/TypeHints类型提示语法.md)
- [装饰器](./Python答疑/装饰器知识点%7Bdone%7D.md)
- [闭包 Closure](./Python答疑/闭包（Closure）是什么.md)
- [Python `uv`](./Python答疑/python%20uv/uv笔记.md)
- [Codex：什么是 Hook？](./AI%20工具学习/Codex/什么是hook？/什么是hook.md)

### 项目实践

- [订单自动识别工作流课程](./项目/AI工作流教学%20以订单识别为例/00-课程总索引.md)：从业务目标、角色和流程设计，到表单、异常审批、自动化与完整复盘
- [ElectronBot 实际使用问题](./项目/ElectroBot/ElectronBot%20学习笔记/实际使用中会遇到的问题.md)：机器人调试与使用记录
- [Codex 动画宠物](./项目/pet-runs/)：生成记录、提示词、素材和质量检查资料
- `项目/文言文学习软件/`：文言文学习应用的探索项目
- [待办事项](./A%20Todo%20List.md)：后续学习主题与项目想法

## 仓库结构

```text
Study_Notes/
├── AI Agent学习/          # Agent 核心概念、架构与实践
├── AI 工具学习/           # Codex 等 AI 开发工具
├── Python答疑/            # Python 语言与工程问题
├── 大模型LLM学习/         # LLM 基础与 Happy-LLM 笔记
├── 项目/
│   ├── AI工作流教学 以订单识别为例/
│   ├── ElectroBot/
│   ├── pet-runs/
│   └── 文言文学习软件/
├── 面试反思/              # 面试复盘资料
├── .obsidian/             # Obsidian Vault 配置
└── A Todo List.md         # 学习与项目待办
```

## 本地使用

```bash
git clone https://github.com/OOOHGOD/Study_Notes.git
cd Study_Notes
```

克隆完成后，可以直接阅读 Markdown 文件，或在 Obsidian 中选择“打开本地仓库”，并指向该目录。

## 说明

- 笔记以个人理解和实践记录为主，部分内容仍在持续整理。
- 文件名包含 `{done}` 时，表示该主题已经完成一轮整理，但仍可能继续补充。
- 引用的文章、图片、项目源码及其他资料，其版权归原作者或原项目所有。
- 如果内容对你有帮助，欢迎通过 Issue 交流或指出错误。
