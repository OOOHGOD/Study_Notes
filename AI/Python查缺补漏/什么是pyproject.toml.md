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
## UV
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

### 三、`pyproject.toml` 的结构

文件由多个“表”（table）组成，每个表用 `[table_name]` 表示。主要分为三大类：
1. `[build-system]`：定义项目的构建系统。
2. `[project]`：定义项目的核心元数据（包名、版本、依赖等）。
3. `[tool.*]`：用于配置各种第三方工具（如 `uv`, `ruff`, `mypy`, `pytest` 等）。
下面我们详细讲解每个部分。
![[Pasted image 20260731013123.png]]
#### `[build-system]` 表（可分发包时强制）
它告诉打包工具（如 `pip`）如何构建你的项目。
```toml
# pyproject.toml

[build-system]
# --- 声明构建项目本身所需要的依赖 ---
requires = ["setuptools>=61.0"] 
# --- 指定用于构建的 Python 后端对象 ---
build-backend = "setuptools.build_meta"
```
- `requires`: 一个列表，声明了构建你的包需要哪些依赖。常见的有 `setuptools`, `hatchling`, `flit_core`, `poetry-core`。
- `build-backend`: 一个字符串，指向一个 Python 对象，这个对象知道如何构建你的包（例如，创建 wheel 文件）。
> 你通常不需要手动编写这个部分。当你使用 hatch new my-app 或 poetry new my-app 等现代工具初始化项目时，它会自动生成。对于一个简单的应用或库，使用 setuptools 或 hatchling 是常见的选择。

#### `[project]` 表
这是项目的“身份证”，由 [PEP 621](https://peps.python.org/pep-0621/) 标准化，用来替代过去 `setup.py` 中的大部分 `setup()` 函数参数。
```toml
[project]
name = "my-package" # 项目名，发布到PyPI时使用
version = "0.1.0" # 项目版本
description = "A short description of my project." # 项目简短描述
readme = "README.md" # 指定README文件
requires-python = ">=3.9" # 要求的Python版本
license = { file = "LICENSE" } # 指定许可证文件比如MIT

authors = [ # 作者信息
  { name = "Your Name", email = "your.email@example.com" },
]

keywords = ["packaging", "python", "example"] # 项目关键词

# --- 核心依赖，即 install_requires ---
dependencies = [
  "httpx",
  "rich>=13.0.0",
  'tomli; python_version < "3.11"', # 可以包含环境标记
]

# --- 可选依赖，即 extras_require ---
[project.optional-dependencies]
test = [ # 'test' 依赖组
  "pytest",
  "pytest-cov",
]
dev = [ # 'dev' 依赖组，可以引用其他组
  "my-package[test]", # 包含 'test' 组的所有依赖
  "ruff",
  "mypy",
]

# --- 命令行脚本入口，即 entry_points.console_scripts ---
[project.scripts]
my-cli = "my_package.cli:main"

# --- 项目相关链接 ---
[project.urls]
Homepage = "<https://github.com/user/my-package>"
Repository = "<https://github.com/user/my-package>"
```
这个表几乎涵盖了所有你需要声明的项目信息，非常清晰和结构化。

#### `[tool.*]` 表
这是 `pyproject.toml` 最强大的功能之一：**统一配置所有开发工具**。每个工具都可以定义自己的配置表，以 `[tool.工具名]` 的形式存在。
这样，你就不再需要 `.ruff.toml`, `mypy.ini`, `.pytest.ini` 等零散的配置文件了。
**示例：配置 `uv`, `ruff`, 和 `mypy`**
```toml
# --- uv 的配置 ---
[tool.uv.pip]
# 为所有pip命令设置一个额外的索引URL
extra-index-url = "https://my-private-registry.com/simple" 

# --- ruff (linter/formatter) 的配置 ---
[tool.ruff]
line-length = 88 # 设置行长限制
target-version = "py311" # 设定目标Python版本以应用相应规则

[tool.ruff.lint]
# 选择要启用的规则集，E=pycodestyle错误, F=pyflakes, I=isort
select = ["E", "F", "I"] 
# 忽略特定的规则
ignore = ["E501"] 

[tool.ruff.lint.isort]
# isort 排序配置
known-first-party = ["my_package"] 

# --- mypy (type checker) 的配置 ---
[tool.mypy]
python_version = "3.11" # 指定Python版本
warn_return_any = true # 对返回Any类型的函数发出警告
ignore_missing_imports = true # 忽略找不到模块定义的错误
```

### 四、完整示例

下面是一个结合了所有部分的 `pyproject.toml` 完整示例，可以作为你新项目的模板。
```TOML
# pyproject.toml

# 1. 构建系统配置
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

# 2. 项目核心元数据
[project]
name = "data-analyzer"
version = "1.0.0"
description = "A tool for analyzing data sets."
readme = "README.md"
requires-python = ">=3.9"
license = { text = "MIT" }
authors = [{ name = "Data Team", email = "data@example.com" }]

dependencies = [
  "pandas>=2.0.0",
  "numpy",
  "matplotlib",
]

[project.optional-dependencies]
dev = [
  "pytest",
  "ruff",
  "uv >= 0.1.0",
]

[project.scripts]
analyze = "data_analyzer.main:run"

[project.urls]
Repository = "https://github.com/example/data-analyzer"

# 3. 第三方工具配置
[tool.ruff]
line-length = 99
select = ["E", "F", "W", "I", "N", "D"]
ignore = ["D100", "D104"] # 忽略部分文档字符串规则

[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-ra -q"
testpaths = [
    "tests",
]
```
#### 总结
- **`pyproject.toml` 是现代 Python 项目的配置标准。**
- 它使用 **TOML** 格式，结构清晰，**声明式**而非可执行。
- `[build-system]` 定义了**如何构建**项目，解决了 `setup.py` 的核心痛点。
- `[project]` 定义了项目**是什么**，是包的元数据中心。
- `[tool.*]` 允许你将**所有工具链的配置**集中于一处，极大地简化了项目管理。

对于任何新启动的 Python 项目，都应优先使用 `pyproject.toml` 作为唯一的配置文件。

## UV和conda的区别
![[Pasted image 20260731013816.png]]
### **总结**
![[Pasted image 20260731014023.png]]

> 🚀 趋势：随着 uv、pixi（conda 的 Rust 替代品）等工具出现，纯 Python 项目正快速转向 uv，而 conda 仍主导科学计算重依赖场景。