---
title: "Ruff：Python 代码检查与格式化工具"
summary: "介绍 Ruff 出现的背景，以及它如何整合代码检查、导入排序、语法升级和格式化等 Python 工具能力。"
tags:
  - "Python"
  - "Ruff"
  - "Linter"
  - "代码格式化"
created: 2026-07-31
category: "Python"
---

## 为什么会出现ruff
在 Ruff 出现之前，一个标准的项目可能需要配置以下工具：
- `Flake8`：用于代码风格和逻辑错误检查。
- `pycodestyle`, `pyflakes`：Flake8 的核心插件。
- `isort`：用于 `import` 语句排序。
- `pylint`：更严格的、可配置的 Linter。
- `pyupgrade`：用于自动升级 Python 语法。
- `autoflake`：用于移除未使用的导入。
- `black`：用于代码格式化。

**Ruff 的目标是替代以上所有工具**。你只需要安装和配置 `ruff` 这一个依赖，就能获得上述大部分功能。这极大地简化了项目的依赖管理和配置文件。
