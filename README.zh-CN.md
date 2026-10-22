<div align="center">

# 学习笔记与实践档案

持续整理 AI Agents、工作流自动化与数字媒体实践。

[English](README.md) · **简体中文**

![Obsidian](https://img.shields.io/badge/Obsidian-334155?style=flat-square) ![AI Agents](https://img.shields.io/badge/AI%20Agents-334155?style=flat-square) ![Digital Media](https://img.shields.io/badge/Digital%20Media-334155?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-2563EB?style=flat-square)](LICENSE)

</div>

<p align="center">
<a href="#项目概览">项目概览</a> · <a href="#本地使用">本地使用</a> · <a href="#内容导航">内容导航</a> · <a href="#作者与许可">作者与许可</a>
</p>

---

> **项目定位** · 知识库与实践档案


## 项目概览

以 Obsidian Vault 形式持续整理 AI Agents、LLM、Python、工作流自动化与机器人相关学习记录，并归档 AI 辅助数字媒体实验。

多数原始笔记使用中文；这份 README 提供阅读入口、目录说明和本地使用方式。

## 内容导航

| 方向 | 阅读入口 |
| --- | --- |
| AI Agents 与 LLM | [学习目录](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/) · [学习路径](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/Agent%E5%AD%A6%E4%B9%A0%E8%B7%AF%E5%BE%84.md) |
| Tool Calling 与 MCP | [Function Calling](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/Function%20Calling%E5%AD%A6%E4%B9%A0/) · [MCP](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/MCP%E5%AD%A6%E4%B9%A0/MCP.md) |
| RAG | [RAG 笔记](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/RAG%E6%8A%80%E6%9C%AF%E4%BB%8E%E5%B0%8F%E7%99%BD%E5%88%B0%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/RAG.md) |
| Happy-LLM | [课程学习记录](AI/LLM%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%AD%A6%E4%B9%A0/Happy-LLM%201/) |
| Python 与开发工具 | [Python 查缺补漏](AI/Python%E6%9F%A5%E7%BC%BA%E8%A1%A5%E6%BC%8F/) · [Codex 笔记](AI/AI%20%E5%B7%A5%E5%85%B7%E5%AD%A6%E4%B9%A0/Codex/) |
| 订单识别工作流 | [课程总索引](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%95%99%E5%AD%A6%20%E4%BB%A5%E8%AE%A2%E5%8D%95%E8%AF%86%E5%88%AB%E4%B8%BA%E4%BE%8B/00-%E8%AF%BE%E7%A8%8B%E6%80%BB%E7%B4%A2%E5%BC%95.md) · [讲义提纲](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%95%99%E5%AD%A6%20%E4%BB%A5%E8%AE%A2%E5%8D%95%E8%AF%86%E5%88%AB%E4%B8%BA%E4%BE%8B/%E8%AE%B2%E4%B9%89%E6%8F%90%E7%BA%B2.md) · [模板包](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%95%99%E5%AD%A6%20%E4%BB%A5%E8%AE%A2%E5%8D%95%E8%AF%86%E5%88%AB%E4%B8%BA%E4%BE%8B/%E6%A8%A1%E6%9D%BF%E5%8C%85.md) |
| 交互式网页叙事 | [23andMe 演示实验](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%20%E8%A7%86%E9%A2%91%E5%AE%9E%E8%B7%B5/23andMe/README.zh-CN.md) |
| AI 角色动画 | [月薪喵制作实验](AI/AI%20%E9%A1%B9%E7%9B%AE/pet-runs/yuexinmiao1-v2/README.zh-CN.md) |
| 机器人与硬件 | [ElectronBot 学习材料](AI/AI%20%E9%A1%B9%E7%9B%AE/ElectroBot/ElectronBot%20%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/) · [项目参考](%E9%A1%B9%E7%9B%AE/) |

## 本地使用

```bash
git clone https://github.com/OOOHGOD/Study_Notes.git
cd Study_Notes
```

可直接阅读 Markdown，或用 Obsidian 打开整个目录。部分内部链接和附件更适合在 Obsidian 中查看。

## 可选 MkDocs 预览

创建并激活虚拟环境后运行：

```bash
python -m pip install -r mkdocs-site/requirements.txt
python -m mkdocs serve -f mkdocs-site/mkdocs.yml
```

打开 <http://127.0.0.1:8000>。严格构建命令为：

```bash
python -m mkdocs build -f mkdocs-site/mkdocs.yml --strict
```

修改发布设置前，应检查已选页面、已跟踪附件与构建配置；本次 README 排版不启用网站发布。更多说明见 [MkDocs 使用文档](mkdocs-site/README.md)。

## 目录与维护

| 目录 | 内容 |
| --- | --- |
| `AI/` | 学习笔记、工作流、数字媒体与其他实践 |
| `项目/` | 补充项目、机器人材料和参考源码 |
| `mkdocs-site/` | 站点配置与构建 Hook |
| `.obsidian/` | Vault 配置及第三方 Plugin |
| [A Todo List.md](A%20Todo%20List.md) | 学习主题与后续任务 |

笔记以个人理解、实践记录和阶段复盘为主；部分内容尚未整理完成或存在历史副本。欢迎通过 Issue 讨论和纠错。

第三方文章、图像、论文、Plugin、Firmware 与参考源码保留原有权利，不自动纳入本仓库原创贡献的 MIT 授权。

## 作者与许可

作者 / 维护者：[OOOHGOD](https://github.com/OOOHGOD) · 原创贡献：[MIT License](LICENSE)

允许商用和修改；分发软件副本或实质部分时，须保留版权与许可声明。第三方代码、数据、模型和媒体素材保留各自权利，详见 [许可适用范围](LICENSE_SCOPE.md)。
