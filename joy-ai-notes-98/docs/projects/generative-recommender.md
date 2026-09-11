# Generative Recommender

## Problem

把用户历史行为序列编码成 Semantic ID token，并使用 decoder-only 模型完成 Next-Item Prediction。

## Architecture

```text
User History
    ↓
Semantic ID Sequence
    ↓
Decoder-only LLM
    ↓
Constrained Decoding
    ↓
Next Item
```

## 后续建议补充

- RQ-KMeans vs RQ-VAE
- K-Means Initialization
- STE
- Sinkhorn Balancing
- SID Collision / Utilization
- Recall@10 / NDCG@10
- Ablation Study
