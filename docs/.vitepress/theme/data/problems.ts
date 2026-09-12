export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Problem {
  id: string
  number: string
  title: string
  difficulty: Difficulty
  tags: string[]
  href: string
  description: string
  starterCode: string
  blankCode: string
  solutionCode: string
  keyPoints: string[]
  complexity: string
  interviewTalk: string
}

export const problems: Problem[] = [
  {
    id: 'two-sum',
    number: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['数组', '哈希表'],
    href: '/algorithm/problems/two-sum',
    description: `给定整数数组 nums 和目标值 target，请在数组中找出和为 target 的两个整数，并返回它们的下标。\n\n示例：\nnums = [2, 7, 11, 15], target = 9\n输出：[0, 1]`,
    starterCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass\n`,
    blankCode: '',
    solutionCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, x in enumerate(nums):\n            need = target - x\n            if need in seen:\n                return [seen[need], i]\n            seen[x] = i\n        return []\n`,
    keyPoints: [
      '把 x + y = target 改写成 y = target - x。',
      '遍历当前元素时，只需要 O(1) 查询 complement 是否已经出现。',
      '先查再写入，避免同一个元素被使用两次。'
    ],
    complexity: '时间 O(n)，空间 O(n)。',
    interviewTalk: '我用哈希表保存已经访问过的值到下标的映射。遍历 x 时检查 target - x 是否已经出现；如果出现就直接返回两个下标，因此把暴力 O(n²) 降到了 O(n)。'
  },
  {
    id: 'longest-substring',
    number: '3',
    title: '无重复字符的最长子串',
    difficulty: 'Medium',
    tags: ['字符串', '滑动窗口', '哈希表'],
    href: '/algorithm/problems/longest-substring',
    description: `给定一个字符串 s，请找出其中不含重复字符的最长子串长度。\n\n示例：\ns = "abcabcbb"\n输出：3\n解释：最长无重复子串为 "abc"。`,
    starterCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass\n`,
    blankCode: '',
    solutionCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last = {}\n        left = 0\n        ans = 0\n\n        for right, ch in enumerate(s):\n            if ch in last and last[ch] >= left:\n                left = last[ch] + 1\n            last[ch] = right\n            ans = max(ans, right - left + 1)\n\n        return ans\n`,
    keyPoints: [
      '窗口 [left, right] 始终满足“内部没有重复字符”这一不变量。',
      '哈希表保存字符最近一次出现的位置。',
      '只有 last[ch] >= left 时才需要移动 left，避免窗口左边界向左回退。'
    ],
    complexity: '时间 O(n)，空间 O(|Σ|)。',
    interviewTalk: '我维护一个无重复字符的滑动窗口。right 向右扩展，遇到窗口内已经出现过的字符时，把 left 移到该字符上次位置的后一位；每个字符最多被左右指针处理一次，所以整体是 O(n)。'
  },
  {
    id: 'lru-cache',
    number: '146',
    title: 'LRU Cache',
    difficulty: 'Medium',
    tags: ['设计', '哈希表', '双向链表'],
    href: '/algorithm/problems/lru-cache',
    description: `设计一个 LRU（Least Recently Used）缓存，实现 get 和 put，要求两个操作平均时间复杂度均为 O(1)。\n\n访问或更新某个 key 后，它应当变成“最近使用”；容量满时淘汰“最久未使用”的 key。`,
    starterCode: `class Node:\n    def __init__(self, key=0, value=0):\n        self.key = key\n        self.value = value\n        self.prev = None\n        self.next = None\n\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n`,
    blankCode: '',
    solutionCode: `class Node:\n    def __init__(self, key=0, value=0):\n        self.key = key\n        self.value = value\n        self.prev = None\n        self.next = None\n\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {}\n        self.head = Node()\n        self.tail = Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _add_to_head(self, node):\n        node.prev = self.head\n        node.next = self.head.next\n        self.head.next.prev = node\n        self.head.next = node\n\n    def _move_to_head(self, node):\n        self._remove(node)\n        self._add_to_head(node)\n\n    def _remove_tail(self):\n        node = self.tail.prev\n        self._remove(node)\n        return node\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        node = self.cache[key]\n        self._move_to_head(node)\n        return node.value\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            node = self.cache[key]\n            node.value = value\n            self._move_to_head(node)\n            return\n\n        node = Node(key, value)\n        self.cache[key] = node\n        self._add_to_head(node)\n\n        if len(self.cache) > self.capacity:\n            removed = self._remove_tail()\n            del self.cache[removed.key]\n`,
    keyPoints: [
      'HashMap 负责 O(1) 定位节点；双向链表负责 O(1) 删除和移动。',
      'head.next 表示最近使用，tail.prev 表示最久未使用。',
      '把链表原子操作拆成 _remove、_add_to_head、_move_to_head、_remove_tail。'
    ],
    complexity: 'get / put 平均时间 O(1)，空间 O(capacity)。',
    interviewTalk: '单用哈希表无法维护访问顺序，单用链表又无法 O(1) 定位节点，所以我组合哈希表和双向链表：哈希表定位，链表维护 LRU 顺序。'
  },
  {
    id: 'quickselect',
    number: '215',
    title: '数组中的第 K 个最大元素',
    difficulty: 'Medium',
    tags: ['数组', '分治', 'QuickSelect'],
    href: '/algorithm/problems/quickselect',
    description: `给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。要求尽量不要完整排序。\n\n示例：\nnums = [3,2,1,5,6,4], k = 2\n输出：5`,
    starterCode: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass\n`,
    blankCode: '',
    solutionCode: `import random\n\n\nclass Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        target = len(nums) - k\n\n        def partition(left, right):\n            pivot_idx = random.randint(left, right)\n            nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]\n            pivot = nums[right]\n            store = left\n\n            for i in range(left, right):\n                if nums[i] <= pivot:\n                    nums[store], nums[i] = nums[i], nums[store]\n                    store += 1\n\n            nums[store], nums[right] = nums[right], nums[store]\n            return store\n\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            p = partition(left, right)\n            if p == target:\n                return nums[p]\n            if p < target:\n                left = p + 1\n            else:\n                right = p - 1\n\n        raise RuntimeError('unreachable')\n`,
    keyPoints: [
      '升序下第 k 大对应下标 n-k。',
      'partition 后 pivot 已经处于最终排序位置。',
      'QuickSelect 只进入目标所在的一侧，而 QuickSort 两侧都递归。',
      '随机 pivot 可以降低退化为 O(n²) 的概率。'
    ],
    complexity: '平均时间 O(n)，最坏 O(n²)，额外空间 O(1)（迭代实现）。',
    interviewTalk: '完整排序需要 O(n log n)，但我们只关心一个位置，所以用 QuickSelect。每次 partition 后只保留包含目标下标的一侧，平均会不断缩小搜索区间，因此平均复杂度是 O(n)。'
  },
  {
    id: 'reverse-k-group',
    number: '25',
    title: 'K 个一组翻转链表',
    difficulty: 'Hard',
    tags: ['链表', '指针', '反转'],
    href: '/algorithm/problems/reverse-k-group',
    description: `给定链表 head，每 k 个节点一组进行翻转。如果最后剩余节点不足 k 个，则保持原有顺序。\n\n示例：\n1 -> 2 -> 3 -> 4 -> 5, k = 2\n输出：2 -> 1 -> 4 -> 3 -> 5`,
    starterCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n\nclass Solution:\n    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:\n        pass\n`,
    blankCode: '',
    solutionCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n\nclass Solution:\n    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:\n        dummy = ListNode(0, head)\n        group_prev = dummy\n\n        while True:\n            kth = group_prev\n            for _ in range(k):\n                kth = kth.next\n                if kth is None:\n                    return dummy.next\n\n            group_next = kth.next\n\n            prev = group_next\n            cur = group_prev.next\n            while cur != group_next:\n                nxt = cur.next\n                cur.next = prev\n                prev = cur\n                cur = nxt\n\n            old_group_head = group_prev.next\n            group_prev.next = kth\n            group_prev = old_group_head\n`,
    keyPoints: [
      'dummy 统一处理第一组翻转后头节点改变的问题。',
      '先找到本组第 k 个节点；不足 k 个时立即结束。',
      '反转时把 prev 初始化为 group_next，可直接把反转后的尾部接回剩余链表。',
      '一组结束后，旧组头变成新组尾，作为下一组的 group_prev。'
    ],
    complexity: '时间 O(n)，空间 O(1)。',
    interviewTalk: '我用 dummy 和 group_prev 划定每一组。先检查是否存在完整的 k 个节点，再原地反转该区间，并把前后两段重新接起来；每个节点只处理常数次，所以是 O(n)。'
  },
  {
    id: 'self-attention',
    number: 'AI-01',
    title: 'Self-Attention',
    difficulty: 'Medium',
    tags: ['Transformer', 'Attention', 'PyTorch'],
    href: '/algorithm/problems/self-attention',

    description: `请使用 PyTorch 手写一个单头 Self-Attention 模块。

  要求：

  输入：
  x.shape = (batch_size, seq_len, embed_dim)

  实现：
  1. 通过三个线性层生成 Q、K、V
  2. 计算 scaled dot-product attention
  3. 对最后一个维度进行 softmax
  4. 使用 attention weights 对 V 加权求和

  输出：
  (batch_size, seq_len, embed_dim)

  核心公式：

  Attention(Q, K, V)
  = softmax(QK^T / sqrt(d_k)) V`,

    starterCode: `import torch
  import torch.nn as nn
  import math


  class SelfAttention(nn.Module):
      def __init__(self, embed_dim):
          super().__init__()
          pass

      def forward(self, x):
          pass
  `,

    blankCode: '',

    solutionCode: `import torch
  import torch.nn as nn
  import math


  class SelfAttention(nn.Module):
      def __init__(self, embed_dim):
          super().__init__()
          self.embed_dim = embed_dim

          self.W_q = nn.Linear(embed_dim, embed_dim)
          self.W_k = nn.Linear(embed_dim, embed_dim)
          self.W_v = nn.Linear(embed_dim, embed_dim)

      def forward(self, x):
          # x: (batch_size, seq_len, embed_dim)

          Q = self.W_q(x)
          K = self.W_k(x)
          V = self.W_v(x)

          # QK^T: (batch_size, seq_len, seq_len)
          scores = torch.matmul(
              Q,
              K.transpose(-2, -1)
          ) / math.sqrt(self.embed_dim)

          # 在 key 维度归一化
          attn_weights = torch.softmax(scores, dim=-1)

          # (batch_size, seq_len, embed_dim)
          output = torch.matmul(attn_weights, V)

          return output
  `,

    keyPoints: [
      'Self-Attention 中 Q、K、V 都来自同一个输入 x，只是经过不同的线性映射。',
      'K.transpose(-2, -1) 把 K 从 [B, L, D] 变为 [B, D, L]，因此 QK^T 得到 [B, L, L]。',
      '除以 sqrt(d_k) 是为了控制点积方差，避免维度增大后 softmax 过于饱和。',
      'softmax(dim=-1) 表示每一个 query 对所有 key 的注意力权重归一化。',
      '最后通过 Attention Weight @ V，把不同位置的 Value 按权重聚合。'
    ],

    complexity: '时间复杂度 O(B · L² · D)，Attention Matrix 的空间复杂度 O(B · L²)。',

    interviewTalk: '我先将输入 x 分别通过三个线性层得到 Q、K、V。然后计算 Q 和 K 转置的点积得到每个 token 与其他 token 的相关性，并除以 sqrt(d_k) 做缩放，再沿 key 维度做 softmax 得到 attention weights。最后用 attention weights 对 V 做加权求和，得到每个 token 融合全局上下文后的表示。'
  }
]
export const problemMap = Object.fromEntries(problems.map((p) => [p.id, p])) as Record<string, Problem>
