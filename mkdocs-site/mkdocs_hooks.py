"""Safely expose a small, explicit subset of this Obsidian vault to MkDocs."""

from __future__ import annotations

import logging
import posixpath
import re
import subprocess
from collections import defaultdict
from pathlib import Path, PurePosixPath
from urllib.parse import quote, unquote

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.exceptions import PluginError
from mkdocs.structure.files import File, Files


REPOSITORY_ROOT = Path(__file__).resolve().parent.parent

# Pilot scope: only these eight Markdown files can become public site pages.
PILOT_PAGES = (
    "AI/AI Agent学习/Function Calling学习/AgentTool：子 Agent 调度器.md",
    "AI/AI Agent学习/从ToolCall到Harness、Claw/从ToolCall到Harness、Claw笔记.md",
    "AI/大模型LLM学习/Attention is all you need 学习笔记.md",
    "AI/大模型LLM学习/Minimind 学习/Minimind Pytorch从零手敲大模型笔记.md",
    "AI/Python查缺补漏/TypeHints类型提示语法.md",
    "AI/Python查缺补漏/什么是pyproject.toml.md",
    "AI/Python查缺补漏/装饰器知识点{done}.md",
)

WIKI_EMBED_RE = re.compile(r"!\[\[([^\]]+)\]\]")
MARKDOWN_IMAGE_RE = re.compile(
    r"!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s\)]+))(?:\s+['\"][^'\"]*['\"])?\s*\)"
)
HTML_IMAGE_RE = re.compile(r"<img\b[^>]*?\bsrc=['\"]([^'\"]+)['\"]", re.IGNORECASE)
EXTERNAL_TARGET_RE = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", re.IGNORECASE)

log = logging.getLogger("mkdocs.study_notes")
_wiki_assets: dict[tuple[str, str], str] = {}


def _git_tracked_paths() -> set[str]:
    """Return Git-tracked repository paths, decoded deterministically as UTF-8."""
    try:
        result = subprocess.run(
            ["git", "-c", "core.quotePath=false", "ls-files", "-z"],
            cwd=REPOSITORY_ROOT,
            check=True,
            capture_output=True,
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        raise PluginError("无法读取 Git 跟踪清单；为避免泄露本地文件，已停止构建。") from exc

    tracked = {
        item.decode("utf-8").replace("\\", "/")
        for item in result.stdout.split(b"\0")
        if item
    }
    return {path for path in tracked if (REPOSITORY_ROOT / path).is_file()}


def _normalize_repo_path(path: PurePosixPath) -> str:
    normalized = posixpath.normpath(path.as_posix())
    if normalized == ".." or normalized.startswith("../"):
        raise PluginError(f"站点资源越过了仓库边界：{path}")
    return normalized


def _local_target(target: str) -> str | None:
    target = target.strip().strip("<>")
    if not target or EXTERNAL_TARGET_RE.match(target):
        return None
    return unquote(target.split("#", 1)[0].split("?", 1)[0])


def _resolve_relative_asset(page_path: str, target: str, tracked: set[str]) -> str | None:
    local = _local_target(target)
    if local is None:
        return None
    candidate = _normalize_repo_path(PurePosixPath(page_path).parent / local)
    if candidate in tracked and (REPOSITORY_ROOT / candidate).is_file():
        return candidate
    return None


def _resolve_wiki_asset(
    page_path: str,
    embed: str,
    tracked: set[str],
    tracked_by_name: dict[str, list[str]],
) -> str:
    target = embed.split("|", 1)[0].split("#", 1)[0].strip()
    if not target:
        raise PluginError(f"空的 Obsidian 嵌入：{page_path}")

    relative = _resolve_relative_asset(page_path, target, tracked)
    if relative:
        return relative

    root_relative = _normalize_repo_path(PurePosixPath(target))
    if root_relative in tracked and (REPOSITORY_ROOT / root_relative).is_file():
        return root_relative

    matches = tracked_by_name.get(PurePosixPath(target).name, [])
    if len(matches) == 1:
        return matches[0]
    if not matches:
        raise PluginError(f"找不到已跟踪的 Obsidian 附件：{target}（页面：{page_path}）")
    raise PluginError(f"Obsidian 附件名称不唯一：{target}（页面：{page_path}）")


def _append_generated_file(files: Files, config: MkDocsConfig, repo_path: str) -> None:
    if files.get_file_from_path(repo_path) is not None:
        return
    source = REPOSITORY_ROOT / repo_path
    files.append(File.generated(config, repo_path, abs_src_path=str(source)))


def on_files(files: Files, config: MkDocsConfig, **kwargs: object) -> Files:
    """Add only allowlisted notes and their tracked local images to MkDocs."""
    del kwargs
    tracked = _git_tracked_paths()
    tracked_by_name: dict[str, list[str]] = defaultdict(list)
    for path in tracked:
        tracked_by_name[PurePosixPath(path).name].append(path)

    assets: set[str] = set()
    _wiki_assets.clear()

    for page_path in PILOT_PAGES:
        if page_path not in tracked:
            raise PluginError(f"白名单页面未被 Git 跟踪，已停止构建：{page_path}")

        page_source = REPOSITORY_ROOT / page_path
        if not page_source.is_file():
            raise PluginError(f"白名单页面不存在，已停止构建：{page_path}")

        markdown = page_source.read_text(encoding="utf-8")
        _append_generated_file(files, config, page_path)

        for match in WIKI_EMBED_RE.finditer(markdown):
            embed = match.group(1)
            asset = _resolve_wiki_asset(page_path, embed, tracked, tracked_by_name)
            _wiki_assets[(page_path, embed)] = asset
            assets.add(asset)

        image_targets = [
            match.group(1) or match.group(2)
            for match in MARKDOWN_IMAGE_RE.finditer(markdown)
        ]
        image_targets.extend(match.group(1) for match in HTML_IMAGE_RE.finditer(markdown))
        for target in image_targets:
            if _local_target(target) is None:
                continue
            asset = _resolve_relative_asset(page_path, target, tracked)
            if asset is None:
                raise PluginError(f"找不到已跟踪的图片：{target}（页面：{page_path}）")
            assets.add(asset)

    for asset in sorted(assets):
        _append_generated_file(files, config, asset)

    log.info("Pilot whitelist: %d pages and %d tracked assets", len(PILOT_PAGES), len(assets))
    return files


def on_page_markdown(markdown: str, page: object, **kwargs: object) -> str:
    """Translate Obsidian image embeds without changing the source notes."""
    del kwargs
    page_path = page.file.src_uri

    def replace_embed(match: re.Match[str]) -> str:
        embed = match.group(1)
        asset = _wiki_assets.get((page_path, embed))
        if asset is None:
            return match.group(0)
        relative = posixpath.relpath(asset, PurePosixPath(page_path).parent.as_posix())
        encoded = quote(relative, safe="/@:+")
        alt = PurePosixPath(asset).name
        return f"![{alt}]({encoded})"

    return WIKI_EMBED_RE.sub(replace_embed, markdown)
