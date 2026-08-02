# Material for MkDocs 使用说明

这个仓库采用“白名单式构建”：MkDocs 只会读取 `mkdocs_hooks.py` 中 `PILOT_PAGES` 列出的笔记，以及这些笔记引用且已经被 Git 跟踪的图片。

## 首次安装

在仓库根目录使用 PowerShell：

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-docs.txt
```

不需要激活虚拟环境，因此不会受到 PowerShell 脚本执行策略影响。

如果当前 Windows 没有可用的 `py` 命令，在 Codex 桌面环境中可以使用随附的 Python：

```powershell
& 'C:\Users\DC\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m venv .venv
```

## 本地预览

```powershell
.\.venv\Scripts\python.exe -m mkdocs serve
```

然后打开 <http://127.0.0.1:8000>。修改白名单中的笔记后，预览服务器会自动刷新。

## 严格构建

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

生成结果位于 `site/`，该目录已被 Git 忽略。

## 增加公开笔记

1. 确认笔记及附件适合公开，并且已经被 Git 跟踪。
2. 把笔记路径添加到 `mkdocs_hooks.py` 的 `PILOT_PAGES`。
3. 把同一路径添加到 `mkdocs.yml` 的 `nav`。
4. 执行严格构建并检查页面、链接和图片。

如果页面引用了未跟踪、缺失或同名的 Obsidian 附件，构建会直接停止，避免把本地私有文件误发布。
