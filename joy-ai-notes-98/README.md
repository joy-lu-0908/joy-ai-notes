# Joy's AI Notes — V1

一个面向 AI/算法学习与面试复习的个人知识库模板。

## 当前已经实现

- VitePress 首页与知识库导航
- Algorithm Practice 题库首页
- 5 道完整手撕样例：Two Sum、最长无重复子串、LRU、QuickSelect、K 组反转链表
- 代码编辑器（Monaco / VS Code 内核）
- 「完全清空」与「恢复函数模板」
- 草稿自动保存在浏览器 localStorage
- 点击「完成并对比标准答案」后显示左右 Diff
- 自动保存最近 10 次答案，可重新载入
- 每题手动标记：未练习 / 熟练 / 需复习 / 不会
- LLM、Recommendation、Projects、Interview、Research 的目录骨架
- GitHub Pages 自动部署工作流

## 本地启动

需要 Node.js。当前官方 VitePress 新版文档建议 Node.js 22+。

```bash
npm install
npm run docs:dev
```

打开终端显示的本地地址（通常是 `http://localhost:5173`）。

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 部署到 GitHub Pages

1. 在 GitHub 创建一个仓库，例如 `joy-ai-notes`。
2. 把本项目全部 push 到仓库的 `main` 分支。
3. GitHub 仓库进入 `Settings -> Pages`。
4. Source 选择 `GitHub Actions`。
5. `.github/workflows/deploy.yml` 会自动构建并部署。

工作流会自动判断：
- 仓库名为 `用户名.github.io`：使用根路径 `/`
- 普通项目仓库：自动使用 `/<仓库名>/`

## 如何增加一道算法题

### 1. 在题库数据中增加题目

编辑：

```text
docs/.vitepress/theme/data/problems.ts
```

复制一个现有 problem，修改：

```ts
{
  id: 'edit-distance',
  number: '72',
  title: '编辑距离',
  difficulty: 'Medium',
  tags: ['DP'],
  href: '/algorithm/problems/edit-distance',
  description: `...`,
  starterCode: `...`,
  blankCode: '',
  solutionCode: `...`,
  keyPoints: ['...'],
  complexity: '...',
  interviewTalk: '...'
}
```

### 2. 新建页面

`docs/algorithm/problems/edit-distance.md`

```md
<script setup>
const problemId = 'edit-distance'
</script>

<PracticeProblem :problem-id="problemId" />
```

### 3. 加到侧边栏（可选）

编辑：

```text
docs/.vitepress/config.mts
```

题库首页会自动读取 `problems.ts`，所以不需要单独维护首页表格。

## 数据保存在哪里？

所有手撕草稿、历史答案、熟练度状态都保存在当前浏览器的 `localStorage`。

优点：
- 不需要数据库
- 不需要登录
- GitHub Pages 即可部署

注意：换浏览器或清除浏览器网站数据后，本地练习记录不会自动同步。后续如果需要，可以再做 GitHub 登录 / 云端同步。

## 推荐下一步

1. 把高频算法题扩展到 30–50 道。
2. 新增 AI Handwriting：MHA、RMSNorm、RoPE、AUC、GAUC、NDCG。
3. 把项目经历做成 Portfolio 页面。
4. 增加「只看需复习题」筛选和随机抽题。
5. 最后再做视觉细节，不要一开始沉迷装修站点。
