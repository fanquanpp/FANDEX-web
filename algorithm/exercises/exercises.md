# 算法练习题
 False
 False> @Module: algorithm
 False> @Total: 10
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 快速排序的平均时间复杂度和最坏时间复杂度分别是？
 False
 FalseA. O(n log n), O(n log n)
 FalseB. O(n log n), O(n²)
 FalseC. O(n²), O(n²)
 FalseD. O(n), O(n log n)
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: 快速排序平均情况下每次划分将数组近似对半分，递归深度 O(log n)，每层比较 O(n)，总复杂度 O(n log n)。最坏情况（如已排序数组且选首元素为 pivot）每次划分极不均匀，退化为 O(n²)。可通过随机化 pivot 或三数取中避免最坏情况。
 False</details>
 False
 False### 2. 0-1 背包问题的时间复杂度是？
 False
 FalseA. O(nW)，其中 n 是物品数，W 是背包容量
 FalseB. O(2ⁿ)
 FalseC. O(n²)
 FalseD. O(n log n)
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: A
 False
 False**解析**: 0-1 背包的 DP 解法状态数为 n × W，每个状态转移 O(1)，总复杂度 O(nW)。注意这是伪多项式时间，因为 W 的输入大小为 log W。暴力枚举是 O(2ⁿ)。
 False</details>
 False
 False### 3. 在有序数组中二分查找目标值，若目标不存在，`left` 指针最终指向？
 False
 FalseA. 小于目标的最大元素位置
 FalseB. 大于等于目标的最小元素位置
 FalseC. 目标应插入的位置
 FalseD. B 和 C 都正确
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: D
 False
 False**解析**: 标准二分查找中，循环结束时 `left` 指向第一个大于等于目标的位置（即下界），这也是目标应插入的位置以保持有序。这正是 `bisect_left` / `lower_bound` 的语义。
 False</details>
 False
 False### 4. BFS 和 DFS 的主要区别是？
 False
 FalseA. BFS 用栈，DFS 用队列
 FalseB. BFS 用队列，DFS 用栈（或递归调用栈）
 FalseC. BFS 只能用于树，DFS 只能用于图
 FalseD. BFS 空间复杂度总是优于 DFS
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: BFS 使用队列（先进先出）实现层序遍历，DFS 使用栈（后进先出）或递归实现深度优先遍历。两者都可用于树和图。空间复杂度取决于具体场景：BFS 最坏 O(宽度)，DFS 最坏 O(深度)。
 False</details>
 False
 False### 5. 以下哪个问题不适合用贪心算法求解？
 False
 FalseA. 活动选择问题
 FalseB. Huffman 编码
 FalseC. 0-1 背包问题
 FalseD. Dijkstra 最短路径
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: 0-1 背包问题中，局部最优选择（贪心选性价比最高的物品）不能保证全局最优，因为物品不可分割。需要用动态规划求解。活动选择、Huffman 编码和 Dijkstra 都有贪心选择性质和最优子结构。
 False</details>
 False
 False## 编程题
 False
 False### 1. 合并区间（排序）
 False
 False给定一组区间，合并所有重叠区间。
 False
 False**输入**: `[[1,3],[2,6],[8,10],[15,18]]`
 False**输出**: `[[1,6],[8,10],[15,18]]`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Truedef merge(intervals):
 True if not intervals:
 True return []
 True intervals.sort(key=lambda x: x[0])
 True merged = [intervals[0]]
 True for start, end in intervals[1:]:
 True if start <= merged[-1][1]:
 True merged[-1][1] = max(merged[-1][1], end)
 True else:
 True merged.append([start, end])
 True return merged
 True```
</details>
 False
 False### 2. 最长递增子序列（动态规划）
 False
 False给定整数数组，找到最长严格递增子序列的长度。
 False
 False**输入**: `[10, 9, 2, 5, 3, 7, 101, 18]`
 False**输出**: `4`（子序列为 [2, 3, 7, 101]）
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueimport bisect
 True
 Truedef length_of_lis(nums):
 True tails = []
 True for num in nums:
 True pos = bisect.bisect_left(tails, num)
 True if pos == len(tails):
 True tails.append(num)
 True else:
 True tails[pos] = num
 True return len(tails)
 True```
</details>
 False
 False### 3. 搜索旋转排序数组（二分查找）
 False
 False升序数组在某个未知点旋转后，搜索目标值，返回索引，不存在返回 -1。时间复杂度 O(log n)。
 False
 False**输入**: `nums = [4,5,6,7,0,1,2], target = 0`
 False**输出**: `4`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Truedef search(nums, target):
 True left, right = 0, len(nums) - 1
 True while left <= right:
 True mid = (left + right) // 2
 True if nums[mid] == target:
 True return mid
 True if nums[left] <= nums[mid]:
 True if nums[left] <= target < nums[mid]:
 True right = mid - 1
 True else:
 True left = mid + 1
 True else:
 True if nums[mid] < target <= nums[right]:
 True left = mid + 1
 True else:
 True right = mid - 1
 True return -1
 True```
</details>
 False
 False### 4. 岛屿数量（BFS/DFS）
 False
 False给定二维网格（`'1'` 表示陆地，`'0'` 表示水），计算岛屿数量。
 False
 False**输入**:
```
 True[['1','1','0','0','0'],
 True ['1','1','0','0','0'],
 True ['0','0','1','0','0'],
 True ['0','0','0','1','1']]
 True```
**输出**: `3`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Truedef num_islands(grid):
 True if not grid:
 True return 0
 True rows, cols = len(grid), len(grid[0])
 True count = 0
 True
 True def dfs(r, c):
 True if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
 True return
 True grid[r][c] = '#'
 True dfs(r + 1, c)
 True dfs(r - 1, c)
 True dfs(r, c + 1)
 True dfs(r, c - 1)
 True
 True for r in range(rows):
 True for c in range(cols):
 True if grid[r][c] == '1':
 True dfs(r, c)
 True count += 1
 True return count
 True```
</details>
 False
 False### 5. 跳跃游戏 II（贪心）
 False
 False给定非负整数数组，每个元素表示该位置可跳跃的最大步数，求到达最后一个位置的最少跳跃次数。
 False
 False**输入**: `nums = [2,3,1,1,4]`
 False**输出**: `2`（从索引 0 跳到索引 1，再跳到索引 4）
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Truedef jump(nums):
 True jumps = 0
 True current_end = 0
 True farthest = 0
 True for i in range(len(nums) - 1):
 True farthest = max(farthest, i + nums[i])
 True if i == current_end:
 True jumps += 1
 True current_end = farthest
 True return jumps
 True```
</details>
 False