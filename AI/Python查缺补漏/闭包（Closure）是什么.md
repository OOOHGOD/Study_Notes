---
title: "闭包（Closure）是什么"
summary: "通过 LeoClaw 工具注册代码解释闭包如何捕获外部状态，以及它在工具调用中的作用。"
tags:
  - "Python"
  - "闭包"
  - "函数"
created:
category: "Python"
---

闭包 = **一个函数 + 它捕获的外部变量**。
看 [src/mokioclaw/tools/registry.py:13-17](vscode-webview://1b6lteju7dn47fm8eqapiqp08jpv7thsufa4ris5cq7eqo2holgk/src/mokioclaw/tools/registry.py#L13-L17)：
```python
def build_tools(state: RuntimeState):       # state 是外部变量
    return [
        StructuredTool.from_function(
            func=lambda file_path, offset=0, limit=2000: read_file(state, file_path, offset, limit),
            #             ↑ 这个 lambda 函数 "捕获" 了外层的 state ↑
        ),
    ]
```
拆开来看：
```python
# 普通函数：所有参数都从调用者传入
def ordinary_read(state, file_path, offset, limit):
    return read_file(state, file_path, offset, limit)

# 闭包：state 不是参数，而是从外层"捕获"的
def build_tools(state):
    def closure_read(file_path, offset=0, limit=2000):  # 没有 state 参数！
        return read_file(state, file_path, offset, limit)  # state 来自外层作用域
    return closure_read
```
## 为什么这里要用闭包？
关键原因：**LLM 调用工具时，只会传 `file_path`、`offset`、`limit` 这些参数，它不知道也不应该知道 `state` 是什么。**
流程是这样的：
```
用户 → build_tools(state) → 返回工具列表 → model.bind_tools(工具列表)
                                                    ↓
                                              LLM 决定调用工具
                                                    ↓
                                LLM 只传: {"file_path": "test.py", "offset": 0, "limit": 100}
                                                    ↓
                                闭包自动补上 state → read_file(state, "test.py", 0, 100)
```
用伪代码对比：
```python
# ❌ 如果不用闭包，LLM 需要传 state —— 但它根本不知道 state 是什么
func(file_path, offset, limit, state)  # state 从哪来？

# ✅ 用闭包，state 被"预装"好了，LLM 只需要传它知道的参数
func(file_path, offset, limit)  # state 已经在闭包里了
```
## 类比理解
就像一个**预装电池的遥控器**：
- 遥控器 = 闭包函数（lambda/内部函数）
- 电池 = 闭包捕获的外部变量（`state`）
- 你按按钮 = LLM 调用工具时只传 `file_path`
你不需要每次按按钮前装一次电池——电池在遥控器出厂时（`build_tools` 调用时）就已经装好了。
