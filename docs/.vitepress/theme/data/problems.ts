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
    description: `请使用 PyTorch 手写一个单头 Self-Attention 模块。\n\n要求：\n1. 输入 x.shape = (batch_size, seq_len, embed_dim)\n2. 通过三个线性层生成 Q、K、V\n3. 计算 scaled dot-product attention\n4. 对最后一个维度进行 softmax\n5. 使用 attention weights 对 V 加权求和\n\n输出：\n(batch_size, seq_len, embed_dim)\n\n核心公式：\nAttention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V`,
    starterCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass SelfAttention(nn.Module):\n    def __init__(self, embed_dim):\n        super().__init__()\n        pass\n\n    def forward(self, x):\n        pass\n`,
    blankCode: '',
    solutionCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass SelfAttention(nn.Module):\n    def __init__(self, embed_dim):\n        super().__init__()\n        self.embed_dim = embed_dim\n        self.W_q = nn.Linear(embed_dim, embed_dim)\n        self.W_k = nn.Linear(embed_dim, embed_dim)\n        self.W_v = nn.Linear(embed_dim, embed_dim)\n\n    def forward(self, x):\n        # x: (batch_size, seq_len, embed_dim)\n        Q = self.W_q(x)\n        K = self.W_k(x)\n        V = self.W_v(x)\n\n        # (B, L, D) @ (B, D, L) -> (B, L, L)\n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.embed_dim)\n        attn_weights = torch.softmax(scores, dim=-1)\n\n        # (B, L, L) @ (B, L, D) -> (B, L, D)\n        output = torch.matmul(attn_weights, V)\n        return output\n`,
    keyPoints: [
      'Self-Attention 中 Q、K、V 都来自同一个输入 x，只是经过不同线性映射。',
      'K.transpose(-2, -1) 把 K 从 [B, L, D] 变成 [B, D, L]，因此 QK^T 得到 [B, L, L]。',
      '单头版本里 d_k = embed_dim；多头版本里 d_k = head_dim。',
      '除以 sqrt(d_k) 是为了控制点积尺度，避免 softmax 过早饱和。',
      'softmax(dim=-1) 表示每个 query 对所有 key 的权重归一化。'
    ],
    complexity: '时间 O(B · L² · D)，注意力矩阵空间 O(B · L²)。',
    interviewTalk: '我先把同一个输入 x 分别投影成 Q、K、V，再计算 QK^T 得到 token 两两之间的相关性；除以 sqrt(d_k) 做缩放后沿 key 维做 softmax，最后用权重对 V 做加权求和。'
  },
  {
    id: 'cross-attention',
    number: 'AI-02',
    title: 'Cross-Attention',
    difficulty: 'Medium',
    tags: ['Transformer', 'Cross-Attention', 'PyTorch'],
    href: '/algorithm/problems/cross-attention',
    description: `请使用 PyTorch 手写一个单头 Cross-Attention 模块。\n\n要求：\n1. query 来自 x_q\n2. key/value 来自 x_kv\n3. x_q.shape = (B, L_q, D)\n4. x_kv.shape = (B, L_kv, D)\n5. 输出 shape = (B, L_q, D)`,
    starterCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass CrossAttention(nn.Module):\n    def __init__(self, embed_dim):\n        super().__init__()\n        pass\n\n    def forward(self, x_q, x_kv):\n        pass\n`,
    blankCode: '',
    solutionCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass CrossAttention(nn.Module):\n    def __init__(self, embed_dim):\n        super().__init__()\n        self.embed_dim = embed_dim\n        self.W_q = nn.Linear(embed_dim, embed_dim)\n        self.W_k = nn.Linear(embed_dim, embed_dim)\n        self.W_v = nn.Linear(embed_dim, embed_dim)\n\n    def forward(self, x_q, x_kv):\n        # x_q:  (B, L_q, D)\n        # x_kv: (B, L_kv, D)\n        Q = self.W_q(x_q)\n        K = self.W_k(x_kv)\n        V = self.W_v(x_kv)\n\n        # (B, L_q, D) @ (B, D, L_kv) -> (B, L_q, L_kv)\n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.embed_dim)\n        attn_weights = torch.softmax(scores, dim=-1)\n\n        # (B, L_q, L_kv) @ (B, L_kv, D) -> (B, L_q, D)\n        output = torch.matmul(attn_weights, V)\n        return output\n`,
    keyPoints: [
      'Self-Attention 的 Q/K/V 来自同一序列；Cross-Attention 的 Q 和 K/V 来自不同序列。',
      '注意力矩阵形状是 [B, L_q, L_kv]，而不是一定是方阵。',
      '输出长度由 query 长度 L_q 决定。',
      '典型场景包括 encoder-decoder attention、多模态融合、Perceiver 类架构等。'
    ],
    complexity: '时间 O(B · L_q · L_kv · D)，注意力矩阵空间 O(B · L_q · L_kv)。',
    interviewTalk: 'Cross-Attention 和 Self-Attention 的计算公式一样，区别在输入来源：Q 来自查询序列 x_q，K/V 来自上下文序列 x_kv，所以最终注意力矩阵是 L_q × L_kv，输出长度保持为 L_q。'
  },
  {
    id: 'multi-head-attention',
    number: 'AI-03',
    title: 'Multi-Head Attention',
    difficulty: 'Medium',
    tags: ['Transformer', 'MHA', 'PyTorch'],
    href: '/algorithm/problems/multi-head-attention',
    description: `请使用 PyTorch 手写 Multi-Head Attention。\n\n要求：\n1. 输入 x.shape = (B, L, D)\n2. D 必须能被 num_heads 整除\n3. 将 Q/K/V reshape 为 (B, H, L, d_h)\n4. 每个 head 独立计算 scaled dot-product attention\n5. 支持可广播的 attention mask\n6. 合并 heads 后经过输出投影 W_o`,
    starterCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, embed_dim, num_heads):\n        super().__init__()\n        pass\n\n    def forward(self, x, mask=None):\n        pass\n`,
    blankCode: '',
    solutionCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, embed_dim, num_heads):\n        super().__init__()\n        assert embed_dim % num_heads == 0\n\n        self.embed_dim = embed_dim\n        self.num_heads = num_heads\n        self.head_dim = embed_dim // num_heads\n\n        self.W_q = nn.Linear(embed_dim, embed_dim)\n        self.W_k = nn.Linear(embed_dim, embed_dim)\n        self.W_v = nn.Linear(embed_dim, embed_dim)\n        self.W_o = nn.Linear(embed_dim, embed_dim)\n\n    def forward(self, x, mask=None):\n        B, L, _ = x.shape\n\n        Q = self.W_q(x)\n        K = self.W_k(x)\n        V = self.W_v(x)\n\n        # [B, L, D] -> [B, H, L, d_h]\n        Q = Q.view(B, L, self.num_heads, self.head_dim).transpose(1, 2)\n        K = K.view(B, L, self.num_heads, self.head_dim).transpose(1, 2)\n        V = V.view(B, L, self.num_heads, self.head_dim).transpose(1, 2)\n\n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.head_dim)\n\n        if mask is not None:\n            # 常见情况：\n            # [L, L] -> [1, 1, L, L]\n            # [B, L, L] -> [B, 1, L, L]\n            if mask.dim() == 2:\n                mask = mask.unsqueeze(0).unsqueeze(0)\n            elif mask.dim() == 3:\n                mask = mask.unsqueeze(1)\n            scores = scores.masked_fill(mask == 0, float('-inf'))\n\n        attn_weights = torch.softmax(scores, dim=-1)\n        output = torch.matmul(attn_weights, V)\n\n        # [B, H, L, d_h] -> [B, L, D]\n        output = output.transpose(1, 2).contiguous().view(B, L, self.embed_dim)\n        return self.W_o(output)\n`,
    keyPoints: [
      '必须先保证 embed_dim % num_heads == 0。',
      '分头的关键形状变化是 [B, L, D] -> [B, H, L, d_h]。',
      '缩放因子必须是 sqrt(head_dim)，不是 sqrt(embed_dim)。',
      'mask 需要能够广播到 scores 的 [B, H, L, L]。',
      '合并 heads 前要 transpose 回 [B, L, H, d_h]，并用 contiguous() 后再 view。',
      '最后 W_o 用于混合不同 head 的输出。'
    ],
    complexity: '注意力主项时间 O(B · H · L² · d_h) = O(B · L² · D)，注意力矩阵空间 O(B · H · L²)。',
    interviewTalk: 'MHA 的核心是在多个子空间并行做 attention。我先把 D 维表示切成 H 个 head，每个 head 维度 d_h=D/H；在每个 head 内计算 QK^T/sqrt(d_h) 和 softmax，再和 V 相乘。最后把各 head 拼回 D 维并经过 W_o。'
  },
  {
    id: 'mha-kv-cache',
    number: 'AI-04',
    title: 'Multi-Head Attention with KV Cache',
    difficulty: 'Hard',
    tags: ['Transformer', 'KV Cache', 'Inference', 'PyTorch'],
    href: '/algorithm/problems/mha-kv-cache',
    description: `在 Multi-Head Attention 基础上加入 KV Cache，用于自回归推理。\n\n要求：\n1. 第一次 prefill 时缓存 prompt 的 K/V\n2. 后续 decode 时只计算新 token 的 Q/K/V\n3. 将新 K/V 追加到历史 cache\n4. query 只来自当前输入，key/value 来自完整 cache\n5. 提供 reset_cache() 清空不同序列之间的状态`,
    starterCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass MultiHeadAttentionWithKVCache(nn.Module):\n    def __init__(self, embed_dim, num_heads):\n        super().__init__()\n        pass\n\n    def reset_cache(self):\n        pass\n\n    def forward(self, x, mask=None, use_cache=False):\n        pass\n`,
    blankCode: '',
    solutionCode: `import torch\nimport torch.nn as nn\nimport math\n\n\nclass MultiHeadAttentionWithKVCache(nn.Module):\n    def __init__(self, embed_dim, num_heads):\n        super().__init__()\n        assert embed_dim % num_heads == 0\n\n        self.embed_dim = embed_dim\n        self.num_heads = num_heads\n        self.head_dim = embed_dim // num_heads\n\n        self.W_q = nn.Linear(embed_dim, embed_dim)\n        self.W_k = nn.Linear(embed_dim, embed_dim)\n        self.W_v = nn.Linear(embed_dim, embed_dim)\n        self.W_o = nn.Linear(embed_dim, embed_dim)\n\n        self.cache_k = None\n        self.cache_v = None\n\n    def reset_cache(self):\n        self.cache_k = None\n        self.cache_v = None\n\n    def forward(self, x, mask=None, use_cache=False):\n        B, L_q, _ = x.shape\n\n        Q = self.W_q(x)\n        K = self.W_k(x)\n        V = self.W_v(x)\n\n        Q = Q.view(B, L_q, self.num_heads, self.head_dim).transpose(1, 2)\n        K = K.view(B, L_q, self.num_heads, self.head_dim).transpose(1, 2)\n        V = V.view(B, L_q, self.num_heads, self.head_dim).transpose(1, 2)\n\n        if use_cache:\n            # KV Cache 通常用于推理；detach 避免构建跨 step 的反向图。\n            K = K.detach()\n            V = V.detach()\n\n            if self.cache_k is None:\n                self.cache_k = K\n                self.cache_v = V\n            else:\n                self.cache_k = torch.cat([self.cache_k, K], dim=-2)\n                self.cache_v = torch.cat([self.cache_v, V], dim=-2)\n\n            K = self.cache_k\n            V = self.cache_v\n\n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.head_dim)\n\n        if mask is not None:\n            if mask.dim() == 2:\n                mask = mask.unsqueeze(0).unsqueeze(0)\n            elif mask.dim() == 3:\n                mask = mask.unsqueeze(1)\n            scores = scores.masked_fill(mask == 0, float('-inf'))\n\n        attn_weights = torch.softmax(scores, dim=-1)\n        output = torch.matmul(attn_weights, V)\n\n        output = output.transpose(1, 2).contiguous().view(B, L_q, self.embed_dim)\n        return self.W_o(output)\n`,
    keyPoints: [
      'KV Cache 缓存的是每一层 attention 的 K/V，不缓存 Q。',
      '自回归 decode 时当前 token 只需要重新算自己的 Q/K/V，过去 token 的 K/V 可直接复用。',
      'cache 的序列维是 -2，因此追加使用 torch.cat(..., dim=-2)。',
      'prefill 阶段如果一次输入完整 prompt，通常仍需要 causal mask；单 token decode 时历史 cache 本身只包含过去和当前位置。',
      '不同请求或新序列开始前必须 reset_cache()。',
      '这个写法适合教学；真实框架通常预分配 cache，避免每步 torch.cat 带来的内存拷贝。'
    ],
    complexity: '不使用 cache 时逐 token 自回归会重复计算历史 K/V；使用 cache 后，每个 decode step 只新增当前 token 的 K/V，但仍需让当前 Q 与长度为 T 的全部 K 做注意力，因此单步 attention 约 O(B · H · T · d_h)，KV cache 空间随序列长度线性增长。',
    interviewTalk: 'KV Cache 的作用不是消掉 attention 本身，而是避免生成第 t 个 token 时再次计算前 t-1 个 token 的 K/V。prefill 先得到整段 prompt 的 cache，之后每一步只计算新 token 的 Q/K/V，把新 K/V 追加到 cache，再用当前 Q 和完整历史 K/V 做 attention。'
  },
  {
    id: 'stable-softmax',
    number: 'AI-05',
    title: 'Stable Softmax',
    difficulty: 'Easy',
    tags: ['Softmax', 'Numerical Stability', 'NumPy'],
    href: '/algorithm/problems/stable-softmax',
    description: `请使用 NumPy 手写数值稳定的 Softmax。\n\n要求：\n1. 支持沿最后一个维度计算\n2. 避免 exp(x) 在大数值下溢出/上溢\n3. 保持输入的 batch 维度`,
    starterCode: `import numpy as np\n\n\ndef softmax(x):\n    pass\n`,
    blankCode: '',
    solutionCode: `import numpy as np\n\n\ndef softmax(x):\n    x = x - np.max(x, axis=-1, keepdims=True)\n    exp_x = np.exp(x)\n    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)\n`,
    keyPoints: [
      '先减去每一行最大值是数值稳定技巧，不会改变 softmax 结果。',
      '原因是 softmax 对所有 logits 同时加/减一个常数不变。',
      '减最大值后，最大的 logit 变为 0，因此 exp 的最大值是 1，能显著降低上溢风险。',
      'keepdims=True 保留维度，便于 NumPy 广播。'
    ],
    complexity: '对最后一维长度为 n 的向量，时间 O(n)，额外空间 O(n) 用于 exp 结果。',
    interviewTalk: '直接计算 exp(x) 容易数值上溢，所以我先减去每一行最大值。softmax 对整体平移不敏感，因此结果不变，但最大指数项变成 exp(0)=1，数值会稳定很多。'
  }
]

export const problemMap = Object.fromEntries(problems.map((p) => [p.id, p])) as Record<string, Problem>
