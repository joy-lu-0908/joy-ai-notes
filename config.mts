import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Joy's AI Notes",
  description: 'AI 算法、LLM、推荐系统、科研与面试手撕笔记',
  lang: 'zh-CN',
  base: process.env.VITEPRESS_BASE || '/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '算法手撕', link: '/algorithm/' },
      { text: 'LLM', link: '/llm/' },
      { text: '推荐系统', link: '/recommendation/' },
      { text: '项目', link: '/projects/' },
      { text: '面试', link: '/interview/' }
    ],
    sidebar: {
      '/algorithm/': [
        {
          text: 'LeetCode',
          items: [
            { text: '题库首页', link: '/algorithm/' },
            { text: '1. Two Sum', link: '/algorithm/problems/two-sum' },
            { text: '3. 无重复字符的最长子串', link: '/algorithm/problems/longest-substring' },
            { text: '146. LRU Cache', link: '/algorithm/problems/lru-cache' },
            { text: '215. 数组中的第 K 个最大元素', link: '/algorithm/problems/quickselect' },
            { text: '25. K 个一组翻转链表', link: '/algorithm/problems/reverse-k-group' }
          ]
        },
        {
          text: 'AI Handwriting',
          items: [
            { text: 'AI-01. Self-Attention', link: '/algorithm/problems/self-attention' },
            { text: 'AI-02. Cross-Attention', link: '/algorithm/problems/cross-attention' },
            { text: 'AI-03. Multi-Head Attention', link: '/algorithm/problems/multi-head-attention' },
            { text: 'AI-04. MHA + KV Cache', link: '/algorithm/problems/mha-kv-cache' },
            { text: 'AI-05. Stable Softmax', link: '/algorithm/problems/stable-softmax' },
            { text: 'AI-06. RMSNorm', link: '/algorithm/problems/rmsnorm' }
          ]
        },
        {
          text: 'Math / Optimization',
          items: [
            { text: 'MATH-01. GD vs Newton 求平方根', link: '/algorithm/problems/sqrt-gd-newton' }
          ]
        },
        {
          text: 'Recommendation Handwriting',
          items: [
            { text: 'REC-01. DCN-V2 Cross Network', link: '/algorithm/problems/dcn-v2' },
            { text: 'REC-02. Simplified HSTU Block', link: '/algorithm/problems/hstu-block' }
          ]
        }
      ]
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    footer: { message: 'Built with VitePress', copyright: 'Joy\'s AI Notes' }
  },
  markdown: {
    lineNumbers: true,
    math: true
  }
})
