<div align="center">

# 23andMe · 交互式网页演示

从中文口播节拍到 React 交互式演示。

[English](README.md) · **简体中文**

![React](https://img.shields.io/badge/React-149ECA?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square) [![MIT License](https://img.shields.io/badge/License-MIT-2563EB?style=flat-square)](../../../../LICENSE)

</div>

<p align="center">
<a href="#项目概览">项目概览</a> · <a href="#作者与许可">作者与许可</a>
</p>

---

> **项目定位** · 数字叙事实验


## 项目概览

把中文口播稿、分章提纲和 React 网页结合的 AI 辅助叙事实验。`script.md` 保存口播节拍，`outline.md` 规划 15 章；当前源码只包含第一章实现，不代表完整演示已经制作完成。

## 本地预览

使用与 `presentation/package.json` 中 Vite 兼容的 Node.js，在本目录运行：

```bash
cd presentation
npm install
npm run dev
```

打开 Vite 输出的本地地址。`npm run build` 构建，`npm run preview` 预览构建结果。语音合成需另外配置服务商，参照 `presentation/scripts/tts-providers/README.md`。

## 材料与授权

`presentation/src/chapters/` 保存已实现章节，`components/` 与 `hooks/` 提供分步推进、进度和播放逻辑。正式素材来源记录位于 `presentation/public/assets/official/SOURCES.md`。口播中的商业事实需在发布前另行核实。

## 作者与许可

作者 / 维护者：[OOOHGOD](https://github.com/OOOHGOD) · 原创贡献：[MIT License](../../../../LICENSE)

允许商用和修改；分发软件副本或实质部分时，须保留版权与许可声明。第三方代码、数据、模型和媒体素材保留各自权利，详见 [许可适用范围](../../../../LICENSE_SCOPE.md)。
