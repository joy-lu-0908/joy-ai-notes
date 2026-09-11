# Multi-Head Attention

## 核心公式

给定输入 $X \in \mathbb{R}^{B \times L \times D}$：

$$
Q=XW_Q,\quad K=XW_K,\quad V=XW_V
$$

单个 head 的 scaled dot-product attention：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_h}}\right)V
$$

## 面试关注点

- 为什么除以 $\sqrt{d_h}$？
- 多头相对单头带来了什么？
- causal mask 和 padding mask 的区别？
- 张量形状如何从 `[B,L,D]` 变成 `[B,H,L,d_h]`？

> 后续可以把 MHA 也接入 Algorithm Practice，当作「AI 手撕题」。
