---
title: "MiniMind：PyTorch 从零手敲大模型笔记"
summary: "整理学习 MiniMind 前所需的 Python、uv、PyTorch、数学与 Transformer 基础，并记录核心概念问题。"
tags:
  - "MiniMind"
  - "PyTorch"
  - "大语言模型"
  - "Transformer"
created: 2026-07-31
category: "大语言模型"
---
> 大语言模型(Large LanguageModel,LLM)的出现引发了全世界对Al的空前关注。无论是ChatGPT、DeepSeek还是Qwen,都以其惊艳的效果令人叹为观止。然而,动辄数百亿参数的庞大规模,使得它们对个人设备而言不仅难以训练,甚至连部署都显得遥不可及。打开大模型的"黑盒子",探索其内部运作机制,多么令人心潮澎湃!遗憾的是,99%的探索只能止步于使用LoRA等技术对现有大模型进行少量微调,学习一些指令或任务。这就好比教牛顿如何使用21世纪的智能手机--虽然有趣,却完全偏离了理解物理本质的初衷。与此同时,第三方的大模型框架和工具库,如transformers+trl,几乎只暴露了高度抽象的接口。通过短短10行代码,就能完成"加载模型+加载数据+推理+强化学习"的全流程训练。这种高效的封装固然便利,但也像一架高高速飞船,将开发者与底层实现隔离开来,阻碍了深入探究LLM核心代码的机会。然而,"用乐高拼出一架飞机,远比生在头等舱里飞行更让人兴奋!"。更糟糕的是,互联网上充斥着大量付费课程和营销号,以漏洞百出、一知半解的内容推销AI教程。正因如此,本项目初衷是拉低LLM的学习门槛,让每个人都能从理解每一行代码开始,从零开始亲手训练一个极小的语言模型。是的,从零开始训练,而不是仅仅进行推理!最低只需3块钱不到的服务器成本,就能亲身体验从0到1构建一个语言模型的全过程。一起感受创造的乐趣吧!


> [!前置基础知识]
>  - 现代化python工具
>  - [ ] 【Python/uv】[!迈向AI的第零步！现代化Python工具指南](https://www.bilibili.com/video/BV1xk1eBQEUB?vd_source=cb8aa1c7c46e4af8f825bfcbba1dcc71)
>  - python基础
>  - [ ] 【[!小飞有点东西的个人空间-小飞有点东西个人主页-哔哩哔哩视频](https://space.bilibili.com/1803865534/lists)​】
>  -  pytorch基础
>  - [ ] [!60分钟Pytorch从入门到精通](https://www.bilibili.com/video/BV1Yx4y187MR?spm_id_from=333.788.videopod.sections&vd_source=4870063f04ee1968e8d1cf61c019a352)
>  - 相关数理知识与transformer
>  - [ ] [! [PyTorch]《RethinkFun深度学习》教程](https://www.bilibili.com/video/BV1A9tszhEpp/?spm_id_from=333.1387.upload.video_card.click&vd_source=4870063f04ee1968e8d1cf61c019a352)
>  - [ ] [! 3Blue1Brown的个人空间](https://space.bilibili.com/88461692/lists)
>  - [ ] [! 飞天闪客的个人空间](https://space.bilibili.com/325864133)
>  - [ ] [! 残差思想 | 是怎么实现的](https://www.bilibili.com/video/BV1aXpfzhEeW/?vd_source=4870063f04ee1968e8d1cf61c019a352)
> - Minimind项目
> - [ ] [! jingyaogong/minimind: 🧠「大模型」2小时完全从0训练64M的小参数LLM！Train a 64M-parameter LLM from scratch in just 2h!](https://github.com/jingyaogong/minimind#)
> 




神经网络是什么？
Attention是什么？
Pytorch框架？