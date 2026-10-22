<div align="center">

# Yuexin Miao · Animated Mascot

Character consistency across prompts, sprites, and visual QA.

**English** · [简体中文](README.zh-CN.md)

![AI Art](https://img.shields.io/badge/AI%20Art-334155?style=flat-square) ![Sprites](https://img.shields.io/badge/Sprites-334155?style=flat-square) ![Animation](https://img.shields.io/badge/Animation-334155?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-2563EB?style=flat-square)](../../../../LICENSE)

</div>

<p align="center">
<a href="#overview">Overview</a> · <a href="#workflow-represented">Workflow represented</a> · <a href="#author--license">Author &amp; License</a>
</p>

---

> **Project focus** · Character Animation


## Overview

An AI-assisted character-animation study for the kitten mascot “Yuexin Miao,” recording prompts, references, sprite-production iterations, registration checks, and review artifacts.


## Explore

| Path | Purpose |
| --- | --- |
| [Base prompt](prompts/base-pet.md) | Identity, silhouette, palette, and generation constraints |
| `prompts/rows/`, `prompts/row-retries/` | State/pose prompts and iteration records |
| `references/` | Character references and layout guides |
| [QA contact sheet](qa/contact-sheet.png) | Visual overview for inspection |
| `qa/` | Review records and pose/direction registration checks |
| `pet_request.json`, `imagegen-jobs.json` | Production request and generation records |

This is a process/artifact archive, not a standalone desktop-pet application. Browsing prompts and images needs no installation. Regeneration may require the original environment and services; a saved request does not establish that a pet is currently installed or active.

## Workflow represented

Define the character -> establish a reference pose -> generate state/direction variations -> inspect silhouette and registration -> revise inconsistent frames -> review the contact sheet.


## Visual Preview

![Mascot QA contact sheet](qa/contact-sheet.png)

QA contact sheet from the recorded production process; it does not imply an installed or active pet.

## Author & License

Author / maintainer: [OOOHGOD](https://github.com/OOOHGOD) · Original contributions: [MIT License](../../../../LICENSE)

Commercial use and modification are permitted with preservation of copyright and license notices in copies or substantial portions. Third-party code, datasets, models, and media retain their own terms; see [license scope](../../../../LICENSE_SCOPE.md).
