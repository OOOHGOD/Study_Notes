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

## 论文一句话

《Attention Is All You Need》提出了 **Transformer**：一种完全基于注意力机制的序列转导模型。它不再依赖 RNN 的递归计算，也不再依赖 CNN 的卷积结构，而是用 **Self-Attention** 在序列中任意两个 token 之间直接建立关系，从而同时获得：

- 更强的并行训练能力
- 更短的长距离依赖路径
- 更好的机器翻译效果
- 更容易观察的注意力权重

论文里的核心句子可以概括为：**Attention is all you need**，不是说模型只剩一个 attention 层，而是说建模序列依赖的核心机制可以完全由 attention 承担。

## 背景：Transformer 要解决什么问题

Transformer 属于 **Sequence Transduction Model（序列转导模型）**，也就是把一个序列转换成另一个序列的模型。例如：

- 机器翻译：`How are you?` -> `你好吗？`
- 文本生成：用户输入 -> 模型回复
- 语音转文字：音频序列 -> 文本序列
- 摘要生成：长文本 -> 短摘要

在 Transformer 之前，主流方案通常是 **Encoder-Decoder + RNN/LSTM/GRU + Attention**。

### FNN 的问题

前馈神经网络（FNN）可以处理向量输入，但不适合处理自然语言序列：

- 如果把词向量平均，会丢掉词语顺序。
- 如果把词向量拼接，输入长度必须固定，不适合变长句子。
- 它更像把句子当成一个整体向量处理，难以表达“谁在谁前面”“哪个词依赖哪个词”。

### RNN 的改进与瓶颈

RNN 按时间步逐个读入 token，用隐藏状态 `h_t` 保存历史信息：

```text
h_t = g(Wx_t + Uh_{t-1})
y_t = g(Vh_t)
```

它解决了 FNN 的三个问题：

- 能够建模词序
- 能够建模上下文依赖
- 支持不定长输入

但 RNN 的根本瓶颈是：**必须按顺序计算**。第 `t` 个位置依赖 `t-1` 的隐藏状态，所以训练样本内部很难并行。序列越长，这个问题越明显。

### Encoder-Decoder 的意义与问题

编码器-解码器结构解决了输入输出不等长的问题。编码器把输入序列压缩成上下文表示，解码器再根据它逐步生成目标序列。

早期 Seq2Seq 中，最简单的上下文向量 `C` 可以理解为编码器最后一个时间步的隐藏状态。问题是：句子越长，所有信息都挤在一个固定长度向量里，远距离信息容易被稀释。

### Attention 的引入

Attention 机制让解码器在生成每个输出 token 时，不必只依赖一个固定的上下文向量，而是可以动态关注输入序列中不同位置。

例如翻译到某个词时，模型可以给输入中的每个 hidden state 分配不同权重：

```text
C_i = alpha_i1 * h_1 + alpha_i2 * h_2 + ... + alpha_in * h_n
```

这样就缓解了长序列“遗忘”和不同输入位置重要性不同的问题。

但在传统 RNN + Attention 里，Attention 只是增强模块，底层仍然是 RNN，串行计算瓶颈还在。

### CNN 路线的不足

有些模型用 CNN 代替 RNN，以获得更好的并行性。但 CNN 的局部感受野会让远距离 token 之间的信息传递需要多层堆叠：

- ConvS2S 的路径长度随距离线性增长。
- ByteNet 通过扩张卷积降低到对数级。
- Transformer 的 Self-Attention 可以让任意两个位置在一层中直接交互，路径长度是常数级。

## Transformer 架构总览

> Transformer 完全基于**注意力机制**，核心是 Self-Attention 和 Multi-Head Attention。

自注意力机制（Self-Attention / Intra-Attention）：同一个序列内部的 token 彼此互相关注。

多头注意力机制（Multi-Head Attention）：把注意力拆成多个 head，让模型从多个表示子空间、多个关系角度同时理解序列。

## Model Architecture 模型架构

> 在神经序列转换领域，表现卓越的模型普遍采用**编码器-解码器**架构。编码器负责将输入的一系列符号（如 x1, x2, ..., xn）转换成一系列连续的向量表示 z（即 z1, z2, ..., zn）。一旦得到这一系列向量，解码器便基于它们逐个生成输出序列的符号（如 y1, y2, ..., ym）。Transformer 也是如此。

![[Pasted image 20260802155615.png]]

Transformer 仍然遵循 Encoder-Decoder 架构，但核心机制变成了：

1. 多层堆叠的自注意力机制
2. 逐位置的全连接前馈网络
3. 残差连接和层归一化
4. 显式位置编码

论文中的 base model 关键配置：

| 配置 | 数值 |
|---|---:|
| Encoder 层数 N | 6 |
| Decoder 层数 N | 6 |
| `d_model` | 512 |
| 注意力头数 h | 8 |
| 每个 head 的 `d_k` / `d_v` | 64 |
| FFN 内层维度 `d_ff` | 2048 |
| Dropout | 0.1 |

## 输入表示：Embedding + Positional Encoding

### Input Embedding

`Input Embedding` 是词嵌入：把输入 token 转换成机器可以处理的高维向量。论文中的 `d_model = 512`，也就是每个 token 会被表示成 512 维向量。

但 embedding 本身不包含顺序信息。比如：

```text
我 爱 水课
水课 爱 我
```

如果只看词向量集合，模型并不能自然知道哪个词在前、哪个词在后。

### Positional Encoding

`Positional Encoding` 是位置编码：给每个位置生成一个同样为 `d_model` 维的向量，再加到词向量上。可以把它理解为给每个 token 加了一个“位置标签”。

![[Pasted image 20260805032958.png]]

论文使用正弦和余弦函数生成固定位置编码：

```text
PE(pos, 2i)     = sin(pos / 10000^(2i / d_model))
PE(pos, 2i + 1) = cos(pos / 10000^(2i / d_model))
```

其中：

- `pos` 表示 token 在序列中的位置。
- `i` 表示向量维度下标。
- 偶数维用 `sin`，奇数维用 `cos`。

选择这种方式的原因：

- 每个位置都有独特编码。
- 不同维度对应不同频率，既能表达短距离位置，也能表达长距离位置。
- 论文认为它有利于模型学习相对位置关系。
- 相比 learned positional embedding，它可能更容易外推到训练时没见过的更长序列。

## Encoder 编码器

编码器由 `N = 6` 个完全相同的层堆叠而成。每一层包含两个子层：

1. Multi-Head Self-Attention
2. Position-wise Feed-Forward Network

每个子层外面都有：

```text
LayerNorm(x + Sublayer(x))
```

这表示：

- `Sublayer(x)`：子层本身的输出
- `x + Sublayer(x)`：残差连接，缓解深层网络训练困难
- `LayerNorm(...)`：层归一化，让训练更稳定

编码器中 Self-Attention 的 Q、K、V 都来自同一个地方：上一层编码器输出。因此输入序列中的每个位置都可以关注输入序列中的所有位置。

## Decoder 解码器

解码器同样由 `N = 6` 个相同层堆叠而成，但每层有三个子层：

1. Masked Multi-Head Self-Attention
2. Encoder-Decoder Attention
3. Position-wise Feed-Forward Network

### Masked Self-Attention

解码器是自回归生成的：预测第 `i` 个 token 时，只能看到第 `i` 个之前的输出，不能偷看未来答案。

所以解码器的 Self-Attention 会加入 mask，把未来位置对应的 attention score 设置成 `-inf`，这样 softmax 后这些位置的权重就接近 0。

### Encoder-Decoder Attention

这一层连接编码器和解码器：

- Query 来自解码器上一层。
- Key 和 Value 来自编码器输出。

它的作用是：解码器在生成每个目标 token 时，可以关注输入序列中的所有位置。这相当于传统 Seq2Seq 里的 encoder-decoder attention。

## Attention 注意力机制

Attention 可以理解成一个“按相关性加权读取信息”的函数。

它接收：

- `Query`：当前我要查询什么
- `Key`：每个位置可以被匹配的索引
- `Value`：每个位置真正要被读取的信息

输出是对所有 `Value` 的加权和，权重来自 `Query` 和 `Key` 的相似度。

### Scaled Dot-Product Attention

论文使用的注意力形式叫 **Scaled Dot-Product Attention**：

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V
```

计算过程：

1. 用 `QK^T` 计算 query 和 key 的相似度。
2. 除以 `sqrt(d_k)` 做缩放。
3. 通过 `softmax` 得到注意力权重。
4. 用权重对 `V` 加权求和。

为什么要除以 `sqrt(d_k)`？

当 `d_k` 很大时，点积结果的数值可能变得很大，softmax 会进入梯度很小的区域，训练会不稳定。缩放因子可以把数值拉回更合适的范围。

### Multi-Head Attention

单头注意力相当于一次性用完整的 `d_model` 维度计算一个注意力结果。多头注意力则把表示投影到多个子空间中并行计算：

```text
MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O
head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

论文 base model 中：

- `h = 8`
- `d_model = 512`
- 每个 head 的 `d_k = d_v = 512 / 8 = 64`

直观理解：

- 一个 head 可能关注主谓关系。
- 一个 head 可能关注指代关系。
- 一个 head 可能关注邻近词。
- 一个 head 可能关注长距离依赖。

多个 head 的结果拼接后再线性变换，模型就能同时吸收不同角度的信息。

### Transformer 中注意力的三种用法

| 位置 | Q 来自 | K/V 来自 | 作用 |
|---|---|---|---|
| Encoder Self-Attention | Encoder 上一层 | Encoder 上一层 | 输入 token 之间互相关注 |
| Decoder Masked Self-Attention | Decoder 上一层 | Decoder 上一层 | 目标 token 只能看当前及之前位置 |
| Encoder-Decoder Attention | Decoder 上一层 | Encoder 输出 | 生成时关注输入序列 |

## Position-wise Feed-Forward Network

每个编码器层和解码器层里，注意力子层后面都有一个逐位置前馈网络：

```text
FFN(x) = max(0, xW_1 + b_1)W_2 + b_2
```

它的特点：

- 对每个位置单独应用。
- 不同位置共享同一组参数。
- 两层线性变换中间加 ReLU。
- 输入输出维度都是 `d_model = 512`。
- 中间层维度是 `d_ff = 2048`。

可以把它理解为：Attention 负责“从哪里拿信息”，FFN 负责“对每个位置拿到的信息再做非线性加工”。

## Embeddings and Softmax

Transformer 使用 learned embeddings 把输入 token 和输出 token 转换成 `d_model` 维向量。

解码器最后通过线性层和 softmax，把每个位置的输出转换成下一个 token 的概率分布。

论文中还使用了权重共享：

- 输入 embedding
- 输出 embedding
- softmax 前的线性变换权重

并在 embedding 层中乘以 `sqrt(d_model)`，让 embedding 的数值尺度更合适。

## 为什么 Self-Attention 有优势

论文从三个角度比较 Self-Attention、RNN 和 CNN：

1. 每层计算复杂度
2. 能否并行
3. 长距离依赖的路径长度

| Layer Type | 每层复杂度 | 顺序操作数 | 最大路径长度 |
|---|---:|---:|---:|
| Self-Attention | `O(n^2 * d)` | `O(1)` | `O(1)` |
| Recurrent | `O(n * d^2)` | `O(n)` | `O(n)` |
| Convolutional | `O(k * n * d^2)` | `O(1)` | `O(log_k(n))` |
| Restricted Self-Attention | `O(r * n * d)` | `O(1)` | `O(n / r)` |

其中：

- `n` 是序列长度。
- `d` 是表示维度。
- `k` 是卷积核大小。
- `r` 是局部注意力窗口大小。

核心结论：

- RNN 的问题是串行，顺序操作数是 `O(n)`。
- CNN 可以并行，但远距离 token 需要通过多层传播。
- Self-Attention 一层内就能让任意两个位置直接交互，长距离依赖路径最短。

补充理解：Self-Attention 的复杂度是 `O(n^2 * d)`，所以当序列非常长时会很贵。这也是后来很多长上下文模型会改造 attention 的原因。

## 训练设置

论文主要在机器翻译任务上训练和验证 Transformer。

### 数据

- WMT 2014 English-German：约 450 万句对，使用 BPE，源语言和目标语言共享约 37000 token 词表。
- WMT 2014 English-French：约 3600 万句对，使用约 32000 word-piece 词表。
- 每个 batch 约包含 25000 个 source token 和 25000 个 target token。

### 硬件与训练时间

- 使用 8 块 NVIDIA P100 GPU。
- base model：训练 100000 steps，约 12 小时。
- big model：训练 300000 steps，约 3.5 天。

### 优化器

使用 Adam：

```text
beta_1 = 0.9
beta_2 = 0.98
epsilon = 10^-9
```

学习率 schedule：

```text
lrate = d_model^-0.5 * min(step_num^-0.5, step_num * warmup_steps^-1.5)
```

其中 `warmup_steps = 4000`。含义是：

- 前 4000 步线性升高学习率。
- 之后学习率按 step number 的平方根倒数下降。

### 正则化

论文使用了：

- Residual Dropout：base model 中 `P_drop = 0.1`
- Embedding 与 Positional Encoding 相加后也使用 dropout
- Label Smoothing：`epsilon_ls = 0.1`

Label Smoothing 会让模型不要过分自信，可能伤害 perplexity，但能提升 accuracy 和 BLEU。

## 实验结果

机器翻译结果：

- WMT 2014 English-to-German：Transformer big 达到 28.4 BLEU，超过此前最好结果 2 BLEU 以上。
- WMT 2014 English-to-French：Transformer big 达到 41.8 BLEU。
- English-to-French big model 在 8 块 P100 上训练 3.5 天，训练成本低于很多此前模型。

模型变体实验结论：

- 单头注意力比最佳配置低约 0.9 BLEU。
- 注意力头太多也会导致效果下降。
- 减小 `d_k` 会伤害模型质量，说明计算 query-key 兼容性并不容易。
- 更大的模型效果更好。
- Dropout 对防止过拟合很重要。
- learned positional embedding 和 sinusoidal positional encoding 结果接近。

泛化实验：

- Transformer 还被用于 English constituency parsing。
- 在没有大量任务特定调参的情况下，Transformer 也取得了很强结果，说明它不只是机器翻译专用结构。

## 和 RNN Attention / Memory Network 的区别

| 机制 | 注意力怎么用 | 是否摆脱串行 |
|---|---|---|
| RNN + Attention | 用注意力缓解固定上下文向量的信息瓶颈 | 否，RNN 仍按时间步串行 |
| Memory Network | 用注意力从记忆中多轮读取信息 | 不完全，多轮读取仍带递归味道 |
| Transformer Self-Attention | 序列中每个 token 与所有 token 直接交互 | 是，训练时可并行处理所有位置 |

这也是 Transformer 的底层范式变化：注意力不再只是一个辅助模块，而是成为主要计算结构。

## 复习速记

### 1. Transformer 的一句话定义

Transformer 是一个完全基于注意力机制的 Encoder-Decoder 序列转导模型，用 Self-Attention 替代 RNN/CNN 来建模 token 之间的依赖关系。

### 2. Self-Attention 解决了什么

- 解决 RNN 难并行的问题。
- 缩短长距离依赖的信息路径。
- 让每个 token 可以直接关注序列中的所有 token。

### 3. Multi-Head Attention 为什么重要

单个注意力头容易把不同关系平均在一起。多个 head 可以在不同子空间学习不同关系，再把结果拼接起来，表达能力更强。

### 4. Decoder 为什么要 mask

因为生成任务必须自回归。预测当前位置时不能看到未来 token，否则训练时会“作弊”，推理时也无法成立。

### 5. 位置编码为什么需要

Transformer 没有递归和卷积，天然不知道 token 顺序，所以必须把位置信息显式加入 embedding。

### 6. Attention 公式要记住

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V
```

含义：先用 Q 和 K 算相关性，再 softmax 成权重，最后对 V 加权求和。

### 7. Encoder 和 Decoder 的主要区别

- Encoder：Self-Attention + FFN。
- Decoder：Masked Self-Attention + Encoder-Decoder Attention + FFN。

### 8. 为什么说 Attention is all you need

因为论文证明了：在序列转导任务中，不使用 RNN/CNN，只靠 attention 作为核心依赖建模机制，也能达到更好的效果和更高训练效率。

## 资料来源

- `C:\Users\DC\Documents\bilibili_repository-master\0517Transformer\Attention Is All You Need.pdf`
- `C:\Users\DC\Documents\bilibili_repository-master\0517Transformer\《Attention Is All You Need》笔记版.pdf`
- `C:\Users\DC\Documents\bilibili_repository-master\0517Transformer\《Attention Is All You Need》花里胡哨笔记版.pdf`
- `C:\Users\DC\Documents\bilibili_repository-master\0517Transformer\Transformer.pptx`
