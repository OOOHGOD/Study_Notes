# 23andMe Interactive Web Presentation

**English** | [简体中文](README.zh-CN.md)

An AI-assisted storytelling experiment turning Chinese narration and a chapter outline into a step-driven React presentation.

**Category:** AI & Digital Media  
**Stack:** React · TypeScript · Vite · CSS

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

## Attribution and rights

Author / maintainer: [https://github.com/OOOHGOD](https://github.com/OOOHGOD). The root [MIT License](../../../../LICENSE) covers eligible original code and documentation. [License scope](../../../../LICENSE_SCOPE.md) excludes third-party text, logos, photographs, fonts, and other referenced media; consult asset source records before reuse.
