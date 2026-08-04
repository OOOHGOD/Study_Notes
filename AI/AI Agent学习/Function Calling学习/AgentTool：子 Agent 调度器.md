---
title: Function Call
summary: AgentTool 是 Claude Code 最有代表性的工具之一。
tags:
  - AI-Agent
  - Function-Calling
  - Tool-Calling
created: 2026-07-29
category: AI Agent
---
## 这个工具到底解决什么问题

`AgentTool` 是 Claude Code 最有代表性的工具之一。  
它解决的不是“读文件”或者“跑命令”这种单点能力，而是：
> 当主线程模型觉得一个任务太大、太杂、太适合并行时，如何把一部分工作拆给另一个 Agent 去做。

这也是 Claude Code 和普通代码助手的核心分水岭之一。  
很多 AI 工具只有一个主线程模型一直往下跑，而 Claude Code 明确支持：

- 研究型子任务
- 后台执行
- 多 Agent 协作
- 本地 / 远程子 Agent

## 先看它的输入长什么样

`tools/AgentTool/AgentTool.tsx` 一上来就把核心参数暴露出来了：
```ts
const baseInputSchema = z.object({
  description: z.string().describe('A short (3-5 word) description of the task'),
  prompt: z.string().describe('The task for the agent to perform'),
  subagent_type: z.string().optional(),
  model: z.enum(['sonnet', 'opus', 'haiku']).optional(),
  run_in_background: z.boolean().optional(),
})
```

这几个字段已经很说明它的定位：
- `description`：给子任务一个简短标题
- `prompt`：真正交给子 Agent 的工作内容
- `subagent_type`：选择专门类型的 Agent
- `model`：必要时换模型
- `run_in_background`：放后台跑
也就是说，`AgentTool` 本质上是一个**任务派发器**。

## 它在工具池里的位置非常特殊
在 Claude Code 的总工具池里，它被放在最前面：

```ts
export function getAllBaseTools(): Tools {
  return [
    AgentTool,
    TaskOutputTool,
    BashTool,
    ...
  ]
}
```

这不一定代表“最常调用”，但说明 Anthropic 把它视为第一层核心能力。  
因为一旦有了 `AgentTool`，其他工具就不再只是“主线程自己用”，而是可以被子 Agent 继续调用。

## 一张图看它在系统里的位置
![[Pasted image 20260729184956.png]]
## 它不是“再开一个模型”这么简单

看 `AgentTool.tsx` 的导入就能看出来，这个工具背后其实串着很多子系统：

```ts
import { enhanceSystemPromptWithEnvDetails, getSystemPrompt } from '../../constants/prompts.js'
import { assembleToolPool } from '../../tools.js'
import { runAgent } from './runAgent.js'
import { registerAsyncAgent } from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import { registerRemoteAgentTask } from '../../tasks/RemoteAgentTask/RemoteAgentTask.js'
```
这意味着 `AgentTool` 至少做了 4 件事：

1. 重新生成子 Agent 的 system prompt
2. 重新裁剪一套工具池
3. 决定是本地任务还是远程任务
4. 把子 Agent 挂到任务系统里

所以它的真实含义更接近：
> 用 Claude Code 的运行时框架，再启动一个受控的、带任务上下文的工作线程

## 子 Agent 为什么不会变成“失控副本”

这个问题很关键。  如果只是简单 fork 一个模型，系统很快就会失控。

Claude Code 通过几层机制约束它：
- 子 Agent 有自己的输入 schema
- 子 Agent 会重新组装 prompt
- 子 Agent 的工具池是单独过滤的
- 子 Agent 会被挂进任务系统，支持状态、输出、停止、通知

所以 `AgentTool` 不是一个“自由分身器”，而是一个**受控派单器**。

## 调用链可以再细一点
![[Pasted image 20260729185155.png]]

## 它和 Task 系统是强绑定的

Claude Code 不是让子 Agent 偷偷在后台跑，而是把它们做成了正式任务：
- 可查看输出
- 可后台执行
- 可停止
- 可恢复

这就是为什么 `AgentTool` 后面紧跟着就是 `TaskOutputTool`。  
两者天然是一组：
- `AgentTool` 负责派活
- `TaskOutputTool` 负责取结果

## 真实使用路径是什么

你可以把一个典型路径理解成这样：
1. 主线程发现“这个问题需要深入查某个子系统”
2. 主线程调用 `AgentTool`
3. 子 Agent 自己去搜索、读文件、推理、执行
4. 子 Agent 给出压缩后的结论
5. 主线程拿这个结论继续向前推进

这和“主线程自己执行所有搜索”相比，最大的优势是：
- 减少主上下文污染
- 容易并行
- 更适合做重研究、重排查类任务

## 最容易误解它的地方

### 误解一：AgentTool 就是多轮聊天
不是。  
它是明确的工具调用，带 schema、任务生命周期和结果回注。

### 误解二：子 Agent 和主线程完全一样
也不是。  
子 Agent 的 prompt、工具池、运行模式都可能不同。

### 误解三：AgentTool 只是“更高级的 prompt”
不够准确。  
它更像“把另一个 Agent 作为正式运行时对象挂进系统”。

## 它和相邻工具的关系
- 和 `TaskOutputTool` 配合：读取子 Agent 输出
- 和 `SendMessageTool` 配合：多 Agent 模式下互相通信
- 和 `BashTool`、`Read`、`Edit` 配合：子 Agent 自己继续完成任务
- 和 `SkillTool` 配合：某些 skill 会在独立子 Agent 中执行

## 小结
如果你只能记住一句话：
> `AgentTool` 不是单个工具能力，而是 Claude Code 把“任务拆分 + 子 Agent 执行 + 任务生命周期管理”封装成了一个正式工具。

它是 Claude Code 从“会调工具的模型”升级成“多任务 Agent 系统”的关键节点。