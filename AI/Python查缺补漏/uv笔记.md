---
title: Python uv 笔记
summary: uv是一个速度极快的 Python 包**安装器和解析器
tags:
  - Python
  - uv
  - 依赖管理
created: 2026-07-31
category: Python
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

### 为什么会出现uv
**统一的工具链 (Unified Toolchain)**

`uv` 的核心理念是将过去分散的多个工具整合为一。在 `uv` 出现之前，一个典型的 Python 项目可能需要：
- `python -m venv .venv`：创建虚拟环境
- `pip`：安装包
- `pip-tools`：从 `requirements.in` 解析和锁定依赖到 `requirements.txt`
- `pipx`：安装和管理全局命令行工具

**`uv` 将以上所有功能整合到了一个二进制文件中**，你可以用 `uv venv`, `uv pip install`, `uv pip compile`, `uv tool install` 等子命令完成所有操作。这大大简化了工具管理和项目配置。

### **常用操作**
```bash
uv venv                     # 创建环境
uv venv my-env -p 3.11      # 指定环境名字和python版本
uv venv -p python@3.11 # 使用 python3.11 创建 .venv
source .venv/bin/activate   # 激活环境 (此步仍然需要)
uv init # 初始化uv项目
uv pip install # 装包
uv add # 为项目加包
uv sync # 如果有拉取一个uv的项目，直接sync即可配置好环境
uv pip freeze > requirements.txt # 生成一个包含所有已安装包及其精确版本的列表，格式与 pip freeze 的输出相同，常用于生成 requirements.txt 文件
```

### 进阶内容
1. 依赖解析与锁定
    代替pip-tools，从一个 `requirements.in` 文件生成一个锁定的 `requirements.txt`。
```
uv pip compile requirements.in -o requirements.txt
```
2. 全局工具安装
    代替pipx
    - **安装工具**：Bash
	```bash
uv tool install ruff # 安装 ruff
uv tool install black --python python3.11 # 为其指定python版本
	```
	- **管理工具：Bash**
  ```bash
uv tool list         # 列出所有已安装的工具
uv tool uninstall ruff # 卸载工具
uv tool run black .  # 在不激活环境的情况下运行工具
  ```

