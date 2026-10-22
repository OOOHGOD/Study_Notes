**English** | [简体中文](README.zh-CN.md)

# Study Notes

An evolving Obsidian knowledge base of AI-agent learning, Python practice, workflow automation, robotics references, and AI-assisted digital-media experiments. Most source notes are in Chinese; this README provides an English map.

**Categories:** Artificial Intelligence · AI & Digital Media

## Explore

| Area | Entry point |
| --- | --- |
| AI agents and LLM applications | [AI-agent learning](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/) |
| Learning path | [Agent learning path](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/Agent%E5%AD%A6%E4%B9%A0%E8%B7%AF%E5%BE%84.md) |
| Tool integration | [MCP notes](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/MCP%E5%AD%A6%E4%B9%A0/MCP.md) |
| Retrieval-augmented generation | [RAG notes](AI/AI%20Agent%E5%AD%A6%E4%B9%A0/RAG%E6%8A%80%E6%9C%AF%E4%BB%8E%E5%B0%8F%E7%99%BD%E5%88%B0%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3/RAG.md) |
| Order-processing workflow course | [Course index](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%95%99%E5%AD%A6%20%E4%BB%A5%E8%AE%A2%E5%8D%95%E8%AF%86%E5%88%AB%E4%B8%BA%E4%BE%8B/00-%E8%AF%BE%E7%A8%8B%E6%80%BB%E7%B4%A2%E5%BC%95.md) |
| Interactive storytelling | [23andMe web-presentation experiment](AI/AI%20%E9%A1%B9%E7%9B%AE/AI%20%E8%A7%86%E9%A2%91%E5%AE%9E%E8%B7%B5/23andMe/README.md) |
| Character production | [Animated mascot experiment](AI/AI%20%E9%A1%B9%E7%9B%AE/pet-runs/yuexinmiao1-v2/README.md) |
| Robotics references | [Project materials](%E9%A1%B9%E7%9B%AE/) |
| Site build and preview | [MkDocs instructions](mkdocs-site/README.md) |

## Local use

```bash
git clone https://github.com/OOOHGOD/Study_Notes.git
cd Study_Notes
```

Browse Markdown in an editor or open this directory as an Obsidian vault. Some internal links and attachments work best in Obsidian.

## Optional documentation website

After creating and activating a virtual environment:

```bash
python -m pip install -r mkdocs-site/requirements.txt
python -m mkdocs serve -f mkdocs-site/mkdocs.yml
```

Preview at <http://127.0.0.1:8000>. Build selected pages with:

```bash
python -m mkdocs build -f mkdocs-site/mkdocs.yml --strict
```

Review the selected-page list, tracked attachments, and configuration before changing publication settings. This update does not enable deployment.

## Layout and status

- `AI/`: learning notes, workflow projects, and digital-media experiments.
- `项目/`: additional project/robotics materials and reference code.
- `mkdocs-site/`: website configuration and hooks.
- `.obsidian/`: vault settings and third-party plugins.
- `A Todo List.md`: learning backlog.

These are working notes and experiments, not one installable application. Some content describes unfinished work or duplicates earlier versions. Third-party tutorials, papers, media, firmware, plugins, and reference code retain their own rights; the root MIT grant only covers eligible original contributions.

## Author and license

Author / maintainer: [https://github.com/OOOHGOD](https://github.com/OOOHGOD).

Eligible original contributions are under the [MIT License](LICENSE), permitting commercial use and modification with preservation of copyright and license notices in copies or substantial portions. [License scope](LICENSE_SCOPE.md) explains third-party exclusions and upstream terms.
