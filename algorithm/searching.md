# 搜索算法
 False
 False> @Version: v4.0.0
 False> @Author: fanquanpp
 False> @Category: Algorithm/Searching
 False> @Description: 线性搜索、二分搜索、哈希查找、广度优先搜索与深度优先搜索的原理、复杂度分析与多语言实现。
 False
 False## 目录
 False
 False- [1. 搜索问题总论](#1-搜索问题总论)
 False- [2. 线性搜索](#2-线性搜索)
 False- [3. 二分搜索](#3-二分搜索)
 False- [4. 哈希查找](#4-哈希查找)
 False- [5. 广度优先搜索 (BFS)](#5-广度优先搜索-bfs)
 False- [6. 深度优先搜索 (DFS)](#6-深度优先搜索-dfs)
 False- [7. 搜索策略对比](#7-搜索策略对比)
 False- [8. 搜索算法速查表](#8-搜索算法速查表)
 False- [9. 延伸阅读](#9-延伸阅读)
 False
 False---
 False
 False## 1. 搜索问题总论
 False
 False### 1.1 搜索问题的分类
 False
 False搜索是计算机科学中最基础的操作之一。根据不同维度，搜索问题可做如下分类：
 False
 False**按数据组织方式**：
 False- 静态搜索：数据集合不变，只需支持查找操作
 False- 动态搜索：数据集合动态变化，需支持插入、删除、查找
 False
 False**按匹配方式**：
 False- 精确匹配：查找与目标完全相等的元素
 False- 近似匹配：查找最接近目标的元素（如最近邻搜索）
 False- 范围查询：查找满足范围条件的所有元素
 False
 False**按数据结构**：
 False- 线性结构搜索：数组、链表
 False- 树形结构搜索：BST、B树、Trie
 False- 图结构搜索：BFS、DFS
 False- 哈希结构搜索：哈希表
 False
 False### 1.2 搜索的评估指标
 False
 False| 指标 | 定义 | 典型值 |
 False|------|------|--------|
 False| 查找成功ASL | 找到元素的平均比较次数 | 依赖数据结构 |
 False| 查找失败ASL | 确定元素不存在的平均比较次数 | 依赖数据结构 |
 False| 最坏情况比较次数 | 任何输入下的最大比较次数 | 衡量保证 |
 False| 空间开销 | 额外存储需求 | 权衡因素 |
 False
 False> 跨模块引用：搜索算法的复杂度分析基于 [[algorithm/overview|算法分析基础]] 中的渐进符号。排序是搜索的预处理步骤，参见 [[algorithm/sorting|排序算法]]。
 False
 False---
 False
 False## 2. 线性搜索
 False
 False### 2.1 问题描述
 False
 False在无序数组中查找目标值，返回其下标（不存在则返回-1）。
 False
 False### 2.2 思路分析
 False
 False线性搜索是最朴素的搜索策略：从头到尾逐个比较。虽然简单，但在以下场景中不可替代：
 False
 False- 数据量小（n < 20），线性搜索的常数因子最小
 False- 数据无序且只需查找一次，排序的预处理成本不值得
 False- 数据存储在链表等不支持随机访问的结构中
 False
 False**哨兵优化**：在数组末尾放置目标值作为哨兵，省去每次循环的越界检查。
 False
```
 True普通线性搜索:
 Truefor i in range(n):
 True if arr[i] == target: # 每次需要检查 i < n
 True return i
 True
 True哨兵搜索:
 Truearr.append(target) # 末尾放哨兵
 Truei = 0
 Truewhile arr[i] != target: # 只需一次比较
 True i += 1
 Truearr.pop()
 Truereturn i if i < n else -1
 True```

 False### 2.3 复杂度分析
 False
 False| 指标 | 无序数组 | 有序数组 |
 False|------|----------|----------|
 False| 查找成功ASL | (n+1)/2 | (n+1)/2 |
 False| 查找失败ASL | n | n/2 (可提前终止) |
 False| 最坏比较次数 | n | n |
 False| 时间复杂度 | O(n) | O(n) |
 False
 False空间复杂度：O(1)。
 False
 False### 2.4 代码实现
 False
```python
 Truedef linear_search(arr, target):
 True for i, val in enumerate(arr):
 True if val == target:
 True return i
 True return -1
 True
 Truedef linear_search_sentinel(arr, target):
 True arr.append(target)
 True i = 0
 True while arr[i] != target:
 True i += 1
 True arr.pop()
 True return i if i < len(arr) else -1
 True
 Truedef linear_search_ordered(arr, target):
 True for i, val in enumerate(arr):
 True if val == target:
 True return i
 True if val > target:
 True return -1
 True return -1
 True```

```cpp
 Trueint linearSearch(const vector<int>& arr, int target) {
 True for (int i = 0; i < arr.size(); i++) {
 True if (arr[i] == target) return i;
 True }
 True return -1;
 True}
 True
 Trueint linearSearchSentinel(vector<int>& arr, int target) {
 True arr.push_back(target);
 True int i = 0;
 True while (arr[i] != target) i++;
 True arr.pop_back();
 True return (i < arr.size()) ? i : -1;
 True}
 True
 Trueint linearSearchOrdered(const vector<int>& arr, int target) {
 True for (int i = 0; i < arr.size(); i++) {
 True if (arr[i] == target) return i;
 True if (arr[i] > target) return -1;
 True }
 True return -1;
 True}
 True```

 False---
 False
 False## 3. 二分搜索
 False
 False### 3.1 问题描述
 False
 False在有序数组中查找目标值，利用有序性每次将搜索范围缩小一半。
 False
 False### 3.2 思路分析
 False
 False二分搜索的核心是**循环不变量**：每次迭代后，目标值（若存在）一定在[lo, hi]范围内。
 False
```
 True数组: [1, 3, 5, 7, 9, 11, 13, 15], target = 7
 True
 True第1轮: lo=0, hi=7, mid=3, arr[3]=7 == target, 找到!
 True```

 False更复杂的例子：
 False
```
 True数组: [1, 3, 5, 7, 9, 11, 13, 15], target = 6
 True
 True第1轮: lo=0, hi=7, mid=3, arr[3]=7 > 6, hi=2
 True第2轮: lo=0, hi=2, mid=1, arr[1]=3 < 6, lo=2
 True第3轮: lo=2, hi=2, mid=2, arr[2]=5 < 6, lo=3
 Truelo > hi, 未找到
 True```

 False### 3.3 经典二分及其变种
 False
 False**标准二分**：查找目标值，存在返回下标，不存在返回-1。
 False
 False**左边界二分**：查找第一个等于目标值的元素（lower_bound）。
 False
 False**右边界二分**：查找最后一个等于目标值的元素（upper_bound - 1）。
 False
 False**旋转数组搜索**：在旋转有序数组中搜索。
 False
 False**峰值查找**：在先增后减的数组中找峰值。
 False
 False### 3.4 复杂度分析
 False
 False每次迭代将搜索范围减半：n -> n/2 -> n/4 -> ... -> 1
 False
 False最多迭代 log2(n) 次，因此时间复杂度为 O(log n)。
 False
 False空间复杂度：迭代版O(1)，递归版O(log n)。
 False
 False### 3.5 代码实现
 False
```python
 Truedef binary_search(arr, target):
 True lo, hi = 0, len(arr) - 1
 True while lo <= hi:
 True mid = lo + (hi - lo) // 2
 True if arr[mid] == target:
 True return mid
 True elif arr[mid] < target:
 True lo = mid + 1
 True else:
 True hi = mid - 1
 True return -1
 True
 Truedef lower_bound(arr, target):
 True lo, hi = 0, len(arr)
 True while lo < hi:
 True mid = lo + (hi - lo) // 2
 True if arr[mid] < target:
 True lo = mid + 1
 True else:
 True hi = mid
 True return lo
 True
 Truedef upper_bound(arr, target):
 True lo, hi = 0, len(arr)
 True while lo < hi:
 True mid = lo + (hi - lo) // 2
 True if arr[mid] <= target:
 True lo = mid + 1
 True else:
 True hi = mid
 True return lo
 True
 Truedef search_rotated(arr, target):
 True lo, hi = 0, len(arr) - 1
 True while lo <= hi:
 True mid = lo + (hi - lo) // 2
 True if arr[mid] == target:
 True return mid
 True if arr[lo] <= arr[mid]:
 True if arr[lo] <= target < arr[mid]:
 True hi = mid - 1
 True else:
 True lo = mid + 1
 True else:
 True if arr[mid] < target <= arr[hi]:
 True lo = mid + 1
 True else:
 True hi = mid - 1
 True return -1
 True
 Truedef find_peak(arr):
 True lo, hi = 0, len(arr) - 1
 True while lo < hi:
 True mid = lo + (hi - lo) // 2
 True if arr[mid] < arr[mid + 1]:
 True lo = mid + 1
 True else:
 True hi = mid
 True return lo
 True```

```cpp
 Trueint binarySearch(const vector<int>& arr, int target) {
 True int lo = 0, hi = arr.size() - 1;
 True while (lo <= hi) {
 True int mid = lo + (hi - lo) / 2;
 True if (arr[mid] == target) return mid;
 True else if (arr[mid] < target) lo = mid + 1;
 True else hi = mid - 1;
 True }
 True return -1;
 True}
 True
 Trueint lowerBound(const vector<int>& arr, int target) {
 True int lo = 0, hi = arr.size();
 True while (lo < hi) {
 True int mid = lo + (hi - lo) / 2;
 True if (arr[mid] < target) lo = mid + 1;
 True else hi = mid;
 True }
 True return lo;
 True}
 True
 Trueint upperBound(const vector<int>& arr, int target) {
 True int lo = 0, hi = arr.size();
 True while (lo < hi) {
 True int mid = lo + (hi - lo) / 2;
 True if (arr[mid] <= target) lo = mid + 1;
 True else hi = mid;
 True }
 True return lo;
 True}
 True
 Trueint searchRotated(const vector<int>& arr, int target) {
 True int lo = 0, hi = arr.size() - 1;
 True while (lo <= hi) {
 True int mid = lo + (hi - lo) / 2;
 True if (arr[mid] == target) return mid;
 True if (arr[lo] <= arr[mid]) {
 True if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
 True else lo = mid + 1;
 True } else {
 True if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
 True else hi = mid - 1;
 True }
 True }
 True return -1;
 True}
 True
 Trueint findPeak(const vector<int>& arr) {
 True int lo = 0, hi = arr.size() - 1;
 True while (lo < hi) {
 True int mid = lo + (hi - lo) / 2;
 True if (arr[mid] < arr[mid + 1]) lo = mid + 1;
 True else hi = mid;
 True }
 True return lo;
 True}
 True```

 False### 3.6 二分答案（参数搜索）
 False
 False当问题的判定比求解更容易时，可以对答案进行二分搜索：
 False
 False1. 确定答案的取值范围[lo, hi]
 False2. 对mid判断是否可行（判定问题）
 False3. 根据判定结果缩小范围
 False
 False**经典应用**：最小化最大值、最大化最小值、第k小问题。
 False
```python
 Truedef binary_search_answer(lo, hi, check):
 True while lo < hi:
 True mid = lo + (hi - lo) // 2
 True if check(mid):
 True hi = mid
 True else:
 True lo = mid + 1
 True return lo
 True```

 False### 3.7 变体与优化
 False
 False**快速选择（Quickselect）**：在无序数组中找第k小元素，平均O(n)，最坏O(n^2)。
 False
```python
 Trueimport random
 True
 Truedef quickselect(arr, k):
 True def select(lo, hi, k):
 True if lo == hi:
 True return arr[lo]
 True pivot_idx = random.randint(lo, hi)
 True arr[pivot_idx], arr[hi] = arr[hi], arr[pivot_idx]
 True pivot = arr[hi]
 True i = lo - 1
 True for j in range(lo, hi):
 True if arr[j] <= pivot:
 True i += 1
 True arr[i], arr[j] = arr[j], arr[i]
 True arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
 True pivot_idx = i + 1
 True if k == pivot_idx:
 True return arr[k]
 True elif k < pivot_idx:
 True return select(lo, pivot_idx - 1, k)
 True else:
 True return select(pivot_idx + 1, hi, k)
 True return select(0, len(arr) - 1, k)
 True```

```cpp
 Trueint quickselect(vector<int>& arr, int k) {
 True int lo = 0, hi = arr.size() - 1;
 True while (lo < hi) {
 True int pivotIdx = lo + rand() % (hi - lo + 1);
 True swap(arr[pivotIdx], arr[hi]);
 True int pivot = arr[hi];
 True int i = lo - 1;
 True for (int j = lo; j < hi; j++) {
 True if (arr[j] <= pivot) { i++; swap(arr[i], arr[j]); }
 True }
 True swap(arr[i + 1], arr[hi]);
 True pivotIdx = i + 1;
 True if (k == pivotIdx) return arr[k];
 True else if (k < pivotIdx) hi = pivotIdx - 1;
 True else lo = pivotIdx + 1;
 True }
 True return arr[lo];
 True}
 True```

 False> 跨模块引用：快速选择的分区思想来源于 [[algorithm/sorting|排序算法]] 中的快速排序。
 False
 False---
 False
 False## 4. 哈希查找
 False
 False### 4.1 问题描述
 False
 False通过哈希函数将键映射到数组下标，实现O(1)平均时间的查找。
 False
 False### 4.2 思路分析
 False
 False哈希查找的核心思想是"直接寻址"的推广：
 False
 False- 直接寻址表：键k直接存储在数组位置k。当键域U很大但实际键很少时浪费空间。
 False- 哈希表：用哈希函数h(k)将键映射到有限的槽位中，空间O(m)（m为槽位数）。
 False
 False冲突是不可避免的（鸽巢原理），因此需要冲突处理策略。
 False
 False### 4.3 复杂度分析
 False
 False| 操作 | 平均 | 最坏 |
 False|------|------|------|
 False| 查找 | O(1) | O(n) |
 False| 插入 | O(1) | O(n) |
 False| 删除 | O(1) | O(n) |
 False
 False最坏情况发生在所有键都映射到同一个槽位（哈希函数退化）。
 False
 False### 4.4 代码实现
 False
```python
 Trueclass HashTable:
 True def __init__(self, capacity=16):
 True self.capacity = capacity
 True self.size = 0
 True self.buckets = [[] for _ in range(capacity)]
 True
 True def _hash(self, key):
 True return hash(key) % self.capacity
 True
 True def _resize(self):
 True old_buckets = self.buckets
 True self.capacity *= 2
 True self.buckets = [[] for _ in range(self.capacity)]
 True self.size = 0
 True for bucket in old_buckets:
 True for k, v in bucket:
 True self.put(k, v)
 True
 True def put(self, key, value):
 True if self.size >= self.capacity * 0.75:
 True self._resize()
 True idx = self._hash(key)
 True bucket = self.buckets[idx]
 True for i, (k, v) in enumerate(bucket):
 True if k == key:
 True bucket[i] = (key, value)
 True return
 True bucket.append((key, value))
 True self.size += 1
 True
 True def get(self, key):
 True idx = self._hash(key)
 True bucket = self.buckets[idx]
 True for k, v in bucket:
 True if k == key:
 True return v
 True return None
 True
 True def remove(self, key):
 True idx = self._hash(key)
 True bucket = self.buckets[idx]
 True for i, (k, v) in enumerate(bucket):
 True if k == key:
 True del bucket[i]
 True self.size -= 1
 True return
 True```

```cpp
 True#include <vector>
 True#include <list>
 True#include <functional>
 Trueusing namespace std;
 True
 Truetemplate<typename K, typename V>
 Trueclass HashTable {
 True vector<list<pair<K,V>>> buckets;
 True int sz;
 True int capacity;
 True
 True int hashFunc(const K& key) const {
 True return hash<K>()(key) % capacity;
 True }
 True
 True void resize() {
 True vector<list<pair<K,V>>> oldBuckets = move(buckets);
 True capacity *= 2;
 True buckets.assign(capacity, list<pair<K,V>>());
 True sz = 0;
 True for (auto& bucket : oldBuckets) {
 True for (auto& kv : bucket) {
 True put(kv.first, kv.second);
 True }
 True }
 True }
 True
 Truepublic:
 True HashTable(int cap = 16) : capacity(cap), sz(0) {
 True buckets.assign(capacity, list<pair<K,V>>());
 True }
 True
 True void put(const K& key, const V& value) {
 True if (sz >= capacity * 0.75) resize();
 True int idx = hashFunc(key);
 True for (auto& kv : buckets[idx]) {
 True if (kv.first == key) { kv.second = value; return; }
 True }
 True buckets[idx].push_back({key, value});
 True sz++;
 True }
 True
 True V* get(const K& key) {
 True int idx = hashFunc(key);
 True for (auto& kv : buckets[idx]) {
 True if (kv.first == key) return &kv.second;
 True }
 True return nullptr;
 True }
 True
 True void remove(const K& key) {
 True int idx = hashFunc(key);
 True auto& bucket = buckets[idx];
 True for (auto it = bucket.begin(); it != bucket.end(); ++it) {
 True if (it->first == key) { bucket.erase(it); sz--; return; }
 True }
 True }
 True};
 True```

 False> 跨模块引用：哈希表的完整分析参见 [[algorithm/hashtable|哈希表]]。
 False
 False---
 False
 False## 5. 广度优先搜索 (BFS)
 False
 False### 5.1 问题描述
 False
 False从起始节点出发，按层次逐步扩展，先访问距离为1的所有节点，再访问距离为2的节点，依此类推。
 False
 False### 5.2 思路分析
 False
 FalseBFS使用队列作为核心数据结构，保证节点按距离递增的顺序被访问：
 False
```
 True图: 0 -- 1 -- 3
 True | |
 True 2 -- 4 -- 5
 True
 TrueBFS从0出发:
 True第0层: {0}
 True第1层: {1, 2}
 True第2层: {3, 4}
 True第3层: {5}
 True
 True访问顺序: 0, 1, 2, 3, 4, 5
 True```

 FalseBFS的关键性质：在无权图中，BFS首次到达某节点时的路径就是最短路径。
 False
 False### 5.3 复杂度分析
 False
 False- 时间复杂度：O(V + E)，每个顶点和边最多访问一次
 False- 空间复杂度：O(V)，队列和visited数组
 False
 False### 5.4 代码实现
 False
```python
 Truefrom collections import deque, defaultdict
 True
 Truedef bfs(graph, start):
 True visited = set([start])
 True queue = deque([start])
 True order = []
 True while queue:
 True node = queue.popleft()
 True order.append(node)
 True for neighbor in graph[node]:
 True if neighbor not in visited:
 True visited.add(neighbor)
 True queue.append(neighbor)
 True return order
 True
 Truedef bfs_shortest_path(graph, start, end):
 True visited = set([start])
 True queue = deque([(start, [start])])
 True while queue:
 True node, path = queue.popleft()
 True if node == end:
 True return path
 True for neighbor in graph[node]:
 True if neighbor not in visited:
 True visited.add(neighbor)
 True queue.append((neighbor, path + [neighbor]))
 True return None
 True
 Truedef bfs_distance(graph, start):
 True dist = {start: 0}
 True queue = deque([start])
 True while queue:
 True node = queue.popleft()
 True for neighbor in graph[node]:
 True if neighbor not in dist:
 True dist[neighbor] = dist[node] + 1
 True queue.append(neighbor)
 True return dist
 True```

```cpp
 True#include <vector>
 True#include <queue>
 True#include <unordered_set>
 True#include <unordered_map>
 Trueusing namespace std;
 True
 Truevector<int> bfs(const vector<vector<int>>& graph, int start) {
 True int n = graph.size();
 True vector<bool> visited(n, false);
 True vector<int> order;
 True queue<int> q;
 True visited[start] = true;
 True q.push(start);
 True while (!q.empty()) {
 True int node = q.front(); q.pop();
 True order.push_back(node);
 True for (int neighbor : graph[node]) {
 True if (!visited[neighbor]) {
 True visited[neighbor] = true;
 True q.push(neighbor);
 True }
 True }
 True }
 True return order;
 True}
 True
 Trueunordered_map<int, int> bfsDistance(const vector<vector<int>>& graph, int start) {
 True unordered_map<int, int> dist;
 True queue<int> q;
 True dist[start] = 0;
 True q.push(start);
 True while (!q.empty()) {
 True int node = q.front(); q.pop();
 True for (int neighbor : graph[node]) {
 True if (dist.find(neighbor) == dist.end()) {
 True dist[neighbor] = dist[node] + 1;
 True q.push(neighbor);
 True }
 True }
 True }
 True return dist;
 True}
 True```

 False### 5.5 BFS的应用
 False
 False1. **无权最短路径**：BFS天然保证按距离递增访问
 False2. **连通分量**：对每个未访问节点启动BFS
 False3. **层序遍历**：二叉树的按层输出
 False4. **拓扑排序**：Kahn算法（BFS入度法）
 False5. **状态空间搜索**：八数码、走迷宫等
 False
 False> 跨模块引用：BFS在图中的应用详见 [[algorithm/graph|图论算法]]，树中层序遍历参见 [[algorithm/tree|树结构]]。
 False
 False---
 False
 False## 6. 深度优先搜索 (DFS)
 False
 False### 6.1 问题描述
 False
 False从起始节点出发，沿一条路径尽可能深入，无法继续时回溯到上一个分支点，尝试其他路径。
 False
 False### 6.2 思路分析
 False
 FalseDFS使用栈（或递归调用栈）作为核心数据结构：
 False
```
 True图: 0 -- 1 -- 3
 True | |
 True 2 -- 4 -- 5
 True
 TrueDFS从0出发（递归版）:
 True访问0 -> 访问1 -> 访问3（回溯）-> 访问4 -> 访问5（回溯）-> 访问2
 True
 True访问顺序: 0, 1, 3, 4, 5, 2
 True```

 FalseDFS的关键性质：通过时间戳和颜色标记，可以识别图的拓扑结构。
 False
 False**颜色标记法**：
 False- 白色：未发现
 False- 灰色：已发现但未完成
 False- 黑色：已完成
 False
 False**边的分类**：
 False- 树边：DFS树中的边
 False- 回边：指向祖先节点的边（灰色节点），表示存在环
 False- 前向边：指向后代节点的边（黑色节点，非树边）
 False- 横叉边：指向其他DFS子树的边（黑色节点）
 False
 False### 6.3 复杂度分析
 False
 False- 时间复杂度：O(V + E)
 False- 空间复杂度：O(V)（递归栈和visited数组）
 False
 False### 6.4 代码实现
 False
```python
 Truedef dfs_recursive(graph, start, visited=None, order=None):
 True if visited is None:
 True visited = set()
 True if order is None:
 True order = []
 True visited.add(start)
 True order.append(start)
 True for neighbor in graph[start]:
 True if neighbor not in visited:
 True dfs_recursive(graph, neighbor, visited, order)
 True return order
 True
 Truedef dfs_iterative(graph, start):
 True visited = set([start])
 True stack = [start]
 True order = []
 True while stack:
 True node = stack.pop()
 True order.append(node)
 True for neighbor in reversed(graph[node]):
 True if neighbor not in visited:
 True visited.add(neighbor)
 True stack.append(neighbor)
 True return order
 True
 Truedef dfs_cycle_detect(graph):
 True n = len(graph)
 True WHITE, GRAY, BLACK = 0, 1, 2
 True color = [WHITE] * n
 True has_cycle = False
 True
 True def dfs(node):
 True nonlocal has_cycle
 True color[node] = GRAY
 True for neighbor in graph[node]:
 True if color[neighbor] == GRAY:
 True has_cycle = True
 True return
 True if color[neighbor] == WHITE:
 True dfs(neighbor)
 True color[node] = BLACK
 True
 True for i in range(n):
 True if color[i] == WHITE:
 True dfs(i)
 True return has_cycle
 True
 Truedef dfs_topological_sort(graph):
 True n = len(graph)
 True visited = [False] * n
 True order = []
 True
 True def dfs(node):
 True visited[node] = True
 True for neighbor in graph[node]:
 True if not visited[neighbor]:
 True dfs(neighbor)
 True order.append(node)
 True
 True for i in range(n):
 True if not visited[i]:
 True dfs(i)
 True return order[::-1]
 True```

```cpp
 True#include <vector>
 True#include <stack>
 True#include <algorithm>
 Trueusing namespace std;
 True
 Truevoid dfsRecursive(const vector<vector<int>>& graph, int node,
 True vector<bool>& visited, vector<int>& order) {
 True visited[node] = true;
 True order.push_back(node);
 True for (int neighbor : graph[node]) {
 True if (!visited[neighbor]) {
 True dfsRecursive(graph, neighbor, visited, order);
 True }
 True }
 True}
 True
 Truevector<int> dfsIterative(const vector<vector<int>>& graph, int start) {
 True int n = graph.size();
 True vector<bool> visited(n, false);
 True vector<int> order;
 True stack<int> stk;
 True visited[start] = true;
 True stk.push(start);
 True while (!stk.empty()) {
 True int node = stk.top(); stk.pop();
 True order.push_back(node);
 True for (int i = graph[node].size() - 1; i >= 0; i--) {
 True int neighbor = graph[node][i];
 True if (!visited[neighbor]) {
 True visited[neighbor] = true;
 True stk.push(neighbor);
 True }
 True }
 True }
 True return order;
 True}
 True
 Truebool dfsCycleDetect(const vector<vector<int>>& graph) {
 True int n = graph.size();
 True vector<int> color(n, 0);
 True bool hasCycle = false;
 True
 True function<void(int)> dfs = [&](int node) {
 True color[node] = 1;
 True for (int neighbor : graph[node]) {
 True if (color[neighbor] == 1) { hasCycle = true; return; }
 True if (color[neighbor] == 0) dfs(neighbor);
 True }
 True color[node] = 2;
 True };
 True
 True for (int i = 0; i < n; i++) {
 True if (color[i] == 0) dfs(i);
 True }
 True return hasCycle;
 True}
 True```

 False### 6.5 DFS的应用
 False
 False1. **环检测**：遇到灰色节点即发现环
 False2. **拓扑排序**：DFS后序逆序
 False3. **连通分量**：对每个未访问节点启动DFS
 False4. **回溯搜索**：排列、组合、子集等问题
 False5. **割点与桥**：Tarjan算法
 False6. **强连通分量**：Kosaraju/Tarjan算法
 False
 False> 跨模块引用：DFS在图论中的深入应用参见 [[algorithm/graph|图论算法]]。
 False
 False---
 False
 False## 7. 搜索策略对比
 False
 False### 7.1 综合对比表
 False
 False| 算法 | 数据结构要求 | 时间复杂度 | 空间复杂度 | 典型应用 |
 False|------|------------|-----------|-----------|----------|
 False| 线性搜索 | 无 | O(n) | O(1) | 无序小规模数据 |
 False| 二分搜索 | 有序数组 | O(log n) | O(1) | 有序数据查找 |
 False| 哈希查找 | 哈希表 | O(1)* | O(n) | 快速键值查找 |
 False| BFS | 图/树 | O(V+E) | O(V) | 最短路径、层序 |
 False| DFS | 图/树 | O(V+E) | O(V) | 环检测、拓扑排序 |
 False
 False*平均复杂度
 False
 False### 7.2 搜索策略选择决策树
 False
```
 True数据是否有序？
 True|-- 否 --> 数据量是否小(n<50)？ --是--> 线性搜索
 True| |
 True| +--否--> 是否需要频繁查找？ --是--> 建立哈希表
 True| |
 True| +--否--> 排序后二分搜索
 True|
 True+--是 --> 是否需要精确匹配？ --是--> 二分搜索
 True |
 True +--否--> 是否需要范围查询？ --是--> BST/B树
 True |
 True +--否--> 二分搜索变种
 True```

 False### 7.3 BFS vs DFS 选择指南
 False
 False| 场景 | 选择 | 原因 |
 False|------|------|------|
 False| 求最短路径(无权) | BFS | 天然按距离递增 |
 False| 检测环 | DFS | 回边检测更自然 |
 False| 拓扑排序 | DFS | 后序逆序 |
 False| 层次遍历 | BFS | 按层输出 |
 False| 求所有路径 | DFS | 回溯枚举 |
 False| 连通分量 | 均可 | 效率相同 |
 False| 空间受限(深图) | BFS | DFS栈深度可能很大 |
 False| 空间受限(宽图) | DFS | BFS队列可能很大 |
 False
 False---
 False
 False## 8. 搜索算法速查表
 False
 False| 算法 | 最好 | 平均 | 最坏 | 空间 | 前置条件 |
 False|------|------|------|------|------|----------|
 False| 线性搜索 | O(1) | O(n) | O(n) | O(1) | 无 |
 False| 二分搜索 | O(1) | O(logn) | O(logn) | O(1) | 有序 |
 False| 插值搜索 | O(1) | O(loglogn) | O(n) | O(1) | 有序+均匀分布 |
 False| 哈希查找 | O(1) | O(1) | O(n) | O(n) | 哈希表 |
 False| BST查找 | O(1) | O(logn) | O(n) | O(n) | BST |
 False| 红黑树查找 | O(logn) | O(logn) | O(logn) | O(n) | 红黑树 |
 False| BFS | O(V+E) | O(V+E) | O(V+E) | O(V) | 图 |
 False| DFS | O(V+E) | O(V+E) | O(V+E) | O(V) | 图 |
 False
 False---
 False
 False## 9. 延伸阅读
 False
 False- CLRS 第 11 章（哈希表）、第 22 章（BFS/DFS）
 False- 《算法竞赛入门经典》(刘汝佳) 搜索专题
 False- [Binary Search -- VisuAlgo](https://visualgo.net/en/bst)
 False- Sedgewick & Wayne, *Algorithms*, Chapter 3 (Searching)
 False- Knuth, *The Art of Computer Programming*, Vol.3, Sorting and Searching
 False
 False> 跨模块引用：搜索算法的实现语言基础参见 [[cpp/overview|C++基础]] 和 [[python/overview|Python基础]]。哈希表细节参见 [[algorithm/hashtable|哈希表]]，图搜索参见 [[algorithm/graph|图论算法]]。