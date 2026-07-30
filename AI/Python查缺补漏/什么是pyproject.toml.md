---
title: "什么是 pyproject.toml"
summary: "用于整理 pyproject.toml 在 Python 项目配置、构建和依赖管理中的作用。"
tags:
  - "Python"
  - "pyproject.toml"
  - "项目配置"
  - "依赖管理"
created: 2026-07-31
category: "Python"
---
### 一、`pyproject.toml` 是什么？
![[Pasted image 20260731012833.png]]
`pyproject.toml` 是一个由 [PEP 518](https://peps.python.org/pep-0518/) 引入并由后续多个 PEP 扩展的、**统一的 Python 项目配置文件**。
**它的核心目标**是解决过去配置混乱的问题。在它出现之前，一个项目可能同时包含 `setup.py`, `setup.cfg`, `requirements.txt`, `MANIFEST.in`, 以及各种工具的配置文件（如 `.flake8`, `.coveragerc`, `mypy.ini` 等）。
`pyproject.toml` 使用 [TOML](https://toml.io/cn/) 格式，旨在成为这些配置的**唯一入口和最终归宿**，让项目结构更清晰、更标准化。

### 二、它解决了什么核心问题？

它主要解决了 `setup.py` 时代的两个痛点：

1. **静态元数据的缺失**：`setup.py` 是一个可执行的 Python 脚本。这意味着，如果不运行它，你无法确定构建项目需要哪些依赖（即 "build-time dependencies"）。这就产生了一个“先有鸡还是先有蛋”的悖论：我需要安装构建依赖才能运行 `setup.py`，但我需要运行 `setup.py` 才能知道要安装哪些构建依赖。
2. **配置分散**：如上所述，项目配置散落在十几个不同的文件中，难以管理。

`pyproject.toml` 通过一个**静态的、声明性的文件**解决了这两个问题。打包工具（如 `pip` 或 `uv`）可以先读取这个文件，了解构建需求，安装好构建依赖，然后再进行项目的实际构建和打包。