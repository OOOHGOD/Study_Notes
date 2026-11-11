# Material for MkDocs 使用说明

本目录包含 Study Notes 网站所需的全部配置和本地构建文件。网站采用“白名单式构建”：MkDocs 只会读取 `mkdocs_hooks.py` 中 `PILOT_PAGES` 列出的笔记，以及这些笔记引用且已经被 Git 跟踪的图片。

```text
mkdocs-site/
├── mkdocs.yml
├── mkdocs_hooks.py
├── requirements.txt
├── site_docs/
│   ├── index.md
│   └── stylesheets/extra.css
├── .venv/                 # 本地 Python 环境，Git 忽略
└── site/                  # 生成的网站，Git 忽略
```

## 首次安装

在仓库根目录使用 PowerShell：

```powershell
py -m venv .\mkdocs-site\.venv
.\mkdocs-site\.venv\Scripts\python.exe -m pip install -r .\mkdocs-site\requirements.txt
```

不需要激活虚拟环境，因此不会受到 PowerShell 脚本执行策略影响。

如果当前 Windows 没有可用的 `py` 命令，在 Codex 桌面环境中可以使用随附的 Python：

```powershell
& 'C:\Users\DC\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m venv .\mkdocs-site\.venv
```

## 本地预览

```powershell
.\mkdocs-site\.venv\Scripts\python.exe -m mkdocs serve -f .\mkdocs-site\mkdocs.yml
```

然后打开 <http://127.0.0.1:8000>。修改白名单中的笔记后，预览服务器会自动刷新。

## 严格构建

```powershell
.\mkdocs-site\.venv\Scripts\python.exe -m mkdocs build -f .\mkdocs-site\mkdocs.yml --strict
```

生成结果位于 `mkdocs-site/site/`，该目录已被 Git 忽略。

## 增加公开笔记

“工作”和“留学”目录禁止发布到网站，包括被学习笔记引用的附件；构建会检查实际文件路径并阻止发布。这些目录仍正常同步到私密 GitHub 仓库。

## 自动构建与网站发布

推送 main 时执行严格构建。网站部署默认关闭，避免私密仓库没有 Pages 服务时出现部署失败。
若已确认账号支持私密仓库 Pages，并在仓库 Settings → Pages 设置 GitHub Actions 作为发布源，可在 Settings → Secrets and variables → Actions → Variables 添加 `ENABLE_PAGES_DEPLOY=true` 开启部署。个人账号从私密仓库发布 Pages 通常需要 GitHub Pro；网站内容仍可能公开，请先确认白名单。

1. 确认笔记及附件适合公开，并且已经被 Git 跟踪。
2. 把笔记路径添加到 `mkdocs-site/mkdocs_hooks.py` 的 `PILOT_PAGES`。
3. 把同一路径添加到 `mkdocs-site/mkdocs.yml` 的 `nav`。
4. 执行严格构建并检查页面、链接和图片。

如果页面引用了未跟踪、缺失或同名的 Obsidian 附件，构建会直接停止，避免把本地私有文件误发布。
