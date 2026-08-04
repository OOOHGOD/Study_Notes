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

Transformer模型遵循编码器-解码器结构，但他的核心机制在于
1. 多层堆叠的自注意力机制
2. 逐点的全连接层

编码器：
`Input Embedding：` 词嵌入，把输入的自然语言转换为机器能够理解的512维的高维向量，但是无法把顺序信息带入机器
`Position Encoding：` 位置编码，给每一个词生成一个512维的位置编码的向量也就是顺序信息编码，可以简单理解为为词向量添加了个tag。使用正弦函数和余弦函数和傅里叶变换等思想。

解码器：

