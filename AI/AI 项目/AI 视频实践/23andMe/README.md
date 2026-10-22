<div align="center">

# 23andMe · Interactive Web Presentation

From narration beats to an interactive React presentation.

**English** · [简体中文](README.zh-CN.md)

![React](https://img.shields.io/badge/React-149ECA?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-2563EB?style=flat-square)](../../../../LICENSE)

</div>

<p align="center">
<a href="#overview">Overview</a> · <a href="#author--license">Author &amp; License</a>
</p>

---

> **Project focus** · Digital Storytelling


## Overview

An AI-assisted storytelling experiment turning Chinese narration and a chapter outline into a step-driven React presentation.


## Implementation status

The checked-in application includes an opening chapter, stage components, step navigation, progress controls, and audio/autoplay hooks. The outline plans 15 chapters; only the opening chapter's source is present under `presentation/src/chapters/`. The full planned presentation is not finished.

## Preview

Use a Node.js version compatible with Vite in `presentation/package.json`. From this directory:

```bash
cd presentation
npm install
npm run dev
```

Open the local address printed by Vite. To build and preview:

```bash
npm run build
npm run preview
```

## Material map

| Path | Purpose |
| --- | --- |
| `script.md` | Narration beats |
| `outline.md` | Planned chapters and pacing |
| `presentation/src/chapters/` | Implemented chapter source |
| `presentation/src/components/` and `hooks/` | Navigation and playback logic |
| `presentation/public/assets/official/SOURCES.md` | Sources for referenced assets |
| `presentation/scripts/tts-providers/README.md` | Optional narration tooling |

Audio synthesis scripts require separate provider configuration. Business-narrative claims and referenced materials need their own source checks before publication.

## Author & License

Author / maintainer: [OOOHGOD](https://github.com/OOOHGOD) · Original contributions: [MIT License](../../../../LICENSE)

Commercial use and modification are permitted with preservation of copyright and license notices in copies or substantial portions. Third-party code, datasets, models, and media retain their own terms; see [license scope](../../../../LICENSE_SCOPE.md).
