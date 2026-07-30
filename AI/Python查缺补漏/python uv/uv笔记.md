---
title: "Python uv 笔记"
summary:
tags:
  - "Python"
  - "uv"
  - "依赖管理"
created:
category: "Python"
---
`uv` 是一个速度极快的 Python 包**安装器和解析器**，由 `Ruff` 的作者 **Charlie Marsh** 开发，并由 Astral 公司提供支持。你可以把它看作是 `pip` 和 `pip-tools` 的一个**高性能替代品**。它旨在解决 Python 包管理中长期存在的**速度和性能**问题。

如果你的系统上还没有 `uv`，先安装它。推荐使用 curl。
```bash
# 在 macOS / Linux 上推荐
curl -LsSf <https://astral.sh/uv/install.sh> | sh
```
以**管理员身份**打开 PowerShell
```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

```bash
# 1. 创建并进入项目目录
mkdir my-python-project
cd my-python-project

# 2. 使用 uv 创建虚拟环境 (它会默认创建在 .venv 目录)
uv venv

# 3. 激活虚拟环境
source .venv/bin/activate
# Windows 用户: .venv\Scripts\activate
```