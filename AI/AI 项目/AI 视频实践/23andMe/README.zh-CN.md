# 23andMe 交互式网页演示

[English](README.md) | **简体中文**

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

作者/维护者：https://github.com/OOOHGOD 。原创代码与文档适用根目录 MIT 许可证；第三方图片、标志、字体和引用材料保留原有权利，详见根目录 `LICENSE_SCOPE.md`。
