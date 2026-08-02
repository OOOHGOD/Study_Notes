---
title: "Attention Is All You Need 学习笔记"
summary: "记录 Transformer 架构、注意力机制、自注意力和多头注意力等核心概念。"
tags:
  - "Transformer"
  - "Attention"
  - "自注意力"
  - "论文笔记"
created: 2026-08-01
category: "大语言模型"
---

> 无论是机器翻译、文本生成，还是问答系统，Transformer都显著提升了任务的效果和效率。引领了生成式AI浪潮，大家所熟知的**GPT**，全称**Generative Pre-trained Transformer**，就是基于Transformer架构开发的。这也是GPT的命名由来。

## Transformer 架构
> Transformer，它完全基于**注意力机制**

自注意力机制（self-attention、Intra-attention）

多头注意力机制（multi-head attention）

## Model Architecture 模型架构
> 在神经序列转换领域，表现卓越的模型普遍采用**编码器-解码器**架构。编码器负责将输入的一系列符号（如x1, x2, ..., xn）转换成一系列连续的向量表示z（即z1, z2, ..., zn）。一旦得到这一系列向量，解码器便基于它们逐个生成输出序列的符号（如y1, y2, ..., ym）。Transformer也是如此。

![[Pasted image 20260802155615.png]]
**编码器**：我们的编码器由6个相同的层堆叠而成。每层包含两个主要组件：首先是多头自注意力机制，其次是一个逐点相连的全连接前馈网络。在每个子层之后，我们实施了残差连接，并紧接着进行层归一化，公式表示为LayerNorm(x + Sublayer(x))，其中Sublayer(x)代表子层的输出。为了保持残差连接的一致性，模型中所有的子层以及嵌入层都产生维度为512的输出向量。
解码器：