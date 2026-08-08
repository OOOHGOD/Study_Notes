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

**神经网络是什么？**
	`类似于function函数->拟合函数->world is a function->拟合世界`
**Attention是什么？**（看3b1b）
	`模型处理序列文本时，动态计算每个 token 之间的关联权重，重点关注相关性高的字词，弱化无关字词。`
**Pytorch框架？**（看飞天闪客）
	`Tensor张量`、`Parameter参数`、`Modulet容器/层`、`Autograd梯度计算`、`Optimizer优化参数`

### Minimind分析模型架构解读
![[Pasted image 20260731173957.png]]

#### Transformer Layer
包含了`FFN`、`GQA`两个部分

##### **GQA attention模块（Grouped Query Attention分组查询注意力）**

> 它把多个 **Q（Query，查询头）** 分成若干组，同一组内的 Q 共享一套 **K（Key）和 V（Value）**：
> - **MHA**：每个 Q 都有独立的 K、V，效果好但显存占用大。
> - **MQA**：所有 Q 共用一套 K、V，速度快但表达能力可能下降。
> - **GQA**：介于两者之间，在速度、显存和效果之间取得平衡。
> 架构图中，`Q` 有多个查询头，而 `K′`、`V′` 是数量更少、由多个 Q 共享的 KV 头。这样可以减少推理时的 **KV Cache**，提升大模型生成文本的速度。

- `RMSNorn层` 对数据进行处理，让数据更加规律稳定（归一化）

- `Linear线性变换层 (attention 投影层)` 
	可学习的特征转换器，通过权重矩阵把输入向量投影到新的维度或表示空间。在QGA中Linear作用为：`q_proj`、`k_proj`、`v_proj` 把隐藏状态分别转换为 Q、K、V。
	
	为什么要有这个层？因为输入向量只是把很多信息混合在一起，可以把输入向量想成一份包含多种信息的“综合档案”，Linear 层通过学习权重，重新组合其中的特征。需要注意：Linear 层单独只能完成线性变换，模型还要结合 **SiLU、SoftMax、注意力机制和多层堆叠**，才能表达复杂的非线性关系。

**重要的三组向量QKV：**
可以把 Q、K、V 理解成一次“搜索信息”的过程：
- **Q（Query查询）**：我想找什么？
- **K（Key）**：我这里有什么信息，适不适合被找到？
- **V（Value）**：如果找到我，应该取走什么内容？
例如模型处理：`小明把苹果放进冰箱，因为他想稍后吃掉它。`

当模型理解“它”指什么时：
- “它”的 **Q**：我要寻找一个可以被吃掉的对象。
- “苹果”的 **K**：我是食物，可以被吃。
- “冰箱”的 **K**：我是地点，通常不能被吃。
- 因此“它”的 Q 与“苹果”的 K 更匹配。
- 模型就更多地读取“苹果”的 **V** 所携带的信息。

计算过程可以简化为三步。
1. 计算匹配程度： $\text{score}=QK^T$
	Q 和某个 K 越匹配，分数越高。
2. 转成注意力权重：  $A=\operatorname{Softmax}\left(\frac{QK^T}{\sqrt{d}}\right)$
	SoftMax 将分数转换为权重，例如：
	- 苹果：0.75
	- 冰箱：0.15
	- 小明：0.10
3. 按权重读取 V：  ${output}=AV$
	模型把不同 token 的 V 按注意力权重加权求和，得到当前 token 需要的上下文信息。
	
	Q、K、V 都来自同一个输入 \(X\)，但经过了不同的 Linear 层：
	$Q=XW_Q,\qquad K=XW_K,\qquad V=XW_V$

因此，它们不是三个不同的原始输入，而是同一份信息的三种视角：
> Q 负责提问，K 负责匹配，V 负责提供内容。

另外，Q、K、V 的具体含义并不是程序员提前规定的，而是模型在训练过程中通过学习 $W_Q$、$W_K$、$W_V$ 自动形成的。

执行流程：
1. Q 和所有 K 做点积 → 衡量相似度
2. 除以$(\sqrt{d_k})$缩放，防止维度太高点积数值爆炸
3. Softmax 归一化，得到**注意力权重（0~1，总和为 1）**
4. 权重 和 V 加权求和 → 输出结果
公式：
$(\text{Attention}(Q,K,V)=\text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V)$


- `RoPE`  旋转位置编码