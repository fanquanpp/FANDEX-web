# C++ STL 容器与迭代器 (C++ STL Containers & Iterators)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: STL 序列容器、关联容器、无序容器、容器适配器及迭代器。 | STL sequence containers, associative containers, unordered containers, container adapters, and iterators.
 False
 False---
 False
 False## 目录
 False
 False1. [序列容器](#序列容器)
 False2. [关联容器](#关联容器)
 False3. [无序容器](#无序容器)
 False4. [容器适配器](#容器适配器)
 False5. [迭代器](#迭代器)
 False
 False---
 False
 False## 1. 序列容器
 False
 False序列容器按顺序存储元素，支持随机访问或顺序访问。
 False
 False| 容器 | 描述 | 特点 | 示例 |
 False| :--- | :--- | :--- | :--- |
 False| `std::vector` | 动态数组 | 随机访问快，尾部插入/删除快 | `std::vector<int> v = {1, 2, 3};` |
 False| `std::list` | 双向链表 | 任意位置插入/删除快，不支持随机访问 | `std::list<int> l = {1, 2, 3};` |
 False| `std::deque` | 双端队列 | 两端插入/删除快，随机访问快 | `std::deque<int> d = {1, 2, 3};` |
 False| `std::array` | 固定大小数组 (C++11) | 栈上分配，随机访问快 | `std::array<int, 3> a = {1, 2, 3};` |
 False| `std::forward_list` | 单向链表 (C++11) | 空间开销小，仅支持前向遍历 | `std::forward_list<int> fl = {1, 2, 3};` |
 False
 False### 1.1 std::vector
 False
```cpp
 True#include <vector>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建向量
 True std::vector<int> v;
 True
 True // 预分配空间
 True v.reserve(10);
 True
 True // 添加元素
 True v.push_back(1);
 True v.push_back(2);
 True v.push_back(3);
 True
 True // 访问元素
 True std::cout << v[0] << std::endl; // 1 (无边界检查)
 True std::cout << v.at(1) << std::endl; // 2 (有边界检查)
 True
 True // 遍历元素
 True for (size_t i = 0; i < v.size(); i++) {
 True std::cout << v[i] << " ";
 True }
 True std::cout << std::endl;
 True
 True // 范围 for 循环
 True for (int num : v) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 迭代器遍历
 True for (auto it = v.begin(); it != v.end(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 插入元素
 True v.insert(v.begin() + 1, 4); // 在索引 1 处插入 4
 True
 True // 删除元素
 True v.erase(v.begin() + 2); // 删除索引 2 处的元素
 True
 True // 清空容器
 True v.clear();
 True std::cout << "Size after clear: " << v.size() << std::endl;
 True
 True return 0;
 True}
 True```

 False### 1.2 std::list
 False
```cpp
 True#include <list>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建链表
 True std::list<int> l = {1, 2, 3};
 True
 True // 添加元素
 True l.push_front(0); // 头部添加
 True l.push_back(4); // 尾部添加
 True
 True // 遍历元素
 True for (int num : l) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl; // 0 1 2 3 4
 True
 True // 插入元素
 True auto it = l.begin();
 True ++it; // 移动到第二个元素
 True l.insert(it, 5); // 在 0 和 1 之间插入 5
 True
 True // 删除元素
 True it = l.begin();
 True ++it; // 指向 5
 True l.erase(it); // 删除 5
 True
 True // 排序
 True l.sort();
 True
 True // 合并
 True std::list<int> l2 = {6, 7, 8};
 True l.merge(l2);
 True
 True // 移除元素
 True l.remove(3); // 移除所有值为 3 的元素
 True
 True // 移除满足条件的元素
 True l.remove_if([](int n) { return n % 2 == 0; }); // 移除所有偶数
 True
 True // 遍历结果
 True for (int num : l) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 1.3 std::array
 False
```cpp
 True#include <array>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建数组
 True std::array<int, 5> arr = {1, 2, 3, 4, 5};
 True
 True // 访问元素
 True std::cout << "First element: " << arr[0] << std::endl;
 True std::cout << "Last element: " << arr.back() << std::endl;
 True
 True // 遍历元素
 True for (size_t i = 0; i < arr.size(); i++) {
 True std::cout << arr[i] << " ";
 True }
 True std::cout << std::endl;
 True
 True // 范围 for 循环
 True for (int num : arr) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 检查是否为空
 True std::cout << "Is empty: " << (arr.empty() ? "yes" : "no") << std::endl;
 True
 True // 填充元素
 True arr.fill(10);
 True for (int num : arr) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False## 2. 关联容器
 False
 False关联容器按键值对存储元素，自动排序。
 False
 False| 容器 | 描述 | 特点 | 示例 |
 False| :--- | :--- | :--- | :--- |
 False| `std::set` | 有序集合 | 自动排序，无重复元素 | `std::set<int> s = {3, 1, 2};` |
 False| `std::map` | 有序键值对 | 自动按键排序 | `std::map<std::string, int> m = {{"a", 1}, {"b", 2}};` |
 False| `std::multiset` | 有序多重集合 | 自动排序，允许重复元素 | `std::multiset<int> ms = {1, 2, 1, 3};` |
 False| `std::multimap` | 有序多重映射 | 自动按键排序，允许重复键 | `std::multimap<std::string, int> mm = {{"a", 1}, {"a", 2}};` |
 False
 False### 2.1 std::map
 False
```cpp
 True#include <map>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建映射
 True std::map<std::string, int> m;
 True
 True // 添加元素
 True m["Alice"] = 25;
 True m["Bob"] = 30;
 True m["Charlie"] = 35;
 True
 True // 插入元素的另一种方式
 True m.insert(std::make_pair("David", 40));
 True m.insert({"Eve", 45});
 True
 True // 访问元素
 True std::cout << m["Alice"] << std::endl; // 25
 True
 True // 检查键是否存在
 True if (m.find("David") != m.end()) {
 True std::cout << "David found: " << m["David"] << std::endl;
 True } else {
 True std::cout << "David not found" << std::endl;
 True }
 True
 True // 使用 at() 访问（有边界检查）
 True try {
 True std::cout << m.at("Bob") << std::endl;
 True // std::cout << m.at("Frank") << std::endl; // 会抛出异常
 True } catch (const std::out_of_range& e) {
 True std::cout << "Exception: " << e.what() << std::endl;
 True }
 True
 True // 遍历元素
 True for (const auto& pair : m) {
 True std::cout << pair.first << ": " << pair.second << std::endl;
 True }
 True
 True // 删除元素
 True m.erase("Bob");
 True
 True // 清空容器
 True // m.clear();
 True
 True return 0;
 True}
 True```

 False### 2.2 std::multimap
 False
```cpp
 True#include <map>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建多重映射
 True std::multimap<std::string, int> mm;
 True
 True // 添加元素
 True mm.insert({"Alice", 25});
 True mm.insert({"Alice", 30});
 True mm.insert({"Bob", 35});
 True mm.insert({"Bob", 40});
 True mm.insert({"Charlie", 45});
 True
 True // 遍历所有元素
 True std::cout << "All elements: " << std::endl;
 True for (const auto& pair : mm) {
 True std::cout << pair.first << ": " << pair.second << std::endl;
 True }
 True
 True // 查找特定键的范围
 True std::cout << "\nAlice's entries: " << std::endl;
 True auto range = mm.equal_range("Alice");
 True for (auto it = range.first; it != range.second; ++it) {
 True std::cout << it->first << ": " << it->second << std::endl;
 True }
 True
 True // 计算特定键的元素个数
 True std::cout << "\nNumber of Bob's entries: " << mm.count("Bob") << std::endl;
 True
 True return 0;
 True}
 True```

 False## 3. 无序容器 (C++11)
 False
 False无序容器使用哈希表实现，提供平均常数时间的查找、插入和删除操作。
 False
 False| 容器 | 描述 | 特点 | 示例 |
 False| :--- | :--- | :--- | :--- |
 False| `std::unordered_set` | 无序集合 | 哈希表实现，无序 | `std::unordered_set<int> us = {3, 1, 2};` |
 False| `std::unordered_map` | 无序键值对 | 哈希表实现，无序 | `std::unordered_map<std::string, int> um = {{"a", 1}, {"b", 2}};` |
 False| `std::unordered_multiset` | 无序多重集合 | 哈希表实现，允许重复元素 | `std::unordered_multiset<int> ums = {1, 2, 1, 3};` |
 False| `std::unordered_multimap` | 无序多重映射 | 哈希表实现，允许重复键 | `std::unordered_multimap<std::string, int> umm = {{"a", 1}, {"a", 2}};` |
 False
 False### 3.1 std::unordered_map
 False
```cpp
 True#include <unordered_map>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建无序映射
 True std::unordered_map<std::string, int> um;
 True
 True // 添加元素
 True um["Alice"] = 25;
 True um["Bob"] = 30;
 True um["Charlie"] = 35;
 True
 True // 访问元素
 True std::cout << um["Alice"] << std::endl; // 25
 True
 True // 遍历元素（顺序不确定）
 True std::cout << "Elements: " << std::endl;
 True for (const auto& pair : um) {
 True std::cout << pair.first << ": " << pair.second << std::endl;
 True }
 True
 True // 桶相关操作
 True std::cout << "Bucket count: " << um.bucket_count() << std::endl;
 True std::cout << "Load factor: " << um.load_factor() << std::endl;
 True std::cout << "Max load factor: " << um.max_load_factor() << std::endl;
 True
 True // 查找元素
 True auto it = um.find("Bob");
 True if (it != um.end()) {
 True std::cout << "Found Bob: " << it->second << std::endl;
 True }
 True
 True // 删除元素
 True um.erase("Charlie");
 True
 True return 0;
 True}
 True```

 False## 4. 容器适配器
 False
 False容器适配器是对现有容器的封装，提供特定的接口。
 False
 False| 容器 | 描述 | 底层容器 | 示例 |
 False| :--- | :--- | :--- | :--- |
 False| `std::stack` | 栈（后进先出） | `deque` (默认) | `std::stack<int> st; st.push(1);` |
 False| `std::queue` | 队列（先进先出） | `deque` (默认) | `std::queue<int> q; q.push(1);` |
 False| `std::priority_queue` | 优先队列（最大堆） | `vector` (默认) | `std::priority_queue<int> pq; pq.push(1);` |
 False
 False### 4.1 std::stack
 False
```cpp
 True#include <stack>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建栈
 True std::stack<int> st;
 True
 True // 压入元素
 True st.push(1);
 True st.push(2);
 True st.push(3);
 True
 True // 查看栈顶元素
 True std::cout << "Top: " << st.top() << std::endl; // 3
 True
 True // 弹出元素
 True st.pop();
 True std::cout << "Top after pop: " << st.top() << std::endl; // 2
 True
 True // 检查大小
 True std::cout << "Size: " << st.size() << std::endl; // 2
 True
 True // 检查是否为空
 True std::cout << "Empty: " << (st.empty() ? "yes" : "no") << std::endl; // no
 True
 True // 清空栈
 True while (!st.empty()) {
 True st.pop();
 True }
 True std::cout << "Size after clear: " << st.size() << std::endl; // 0
 True
 True return 0;
 True}
 True```

 False### 4.2 std::queue
 False
```cpp
 True#include <queue>
 True#include <iostream>
 True
 Trueint main() {
 True // 创建队列
 True std::queue<int> q;
 True
 True // 入队
 True q.push(1);
 True q.push(2);
 True q.push(3);
 True
 True // 查看队首元素
 True std::cout << "Front: " << q.front() << std::endl; // 1
 True
 True // 查看队尾元素
 True std::cout << "Back: " << q.back() << std::endl; // 3
 True
 True // 出队
 True q.pop();
 True std::cout << "Front after pop: " << q.front() << std::endl; // 2
 True
 True // 检查大小
 True std::cout << "Size: " << q.size() << std::endl; // 2
 True
 True // 检查是否为空
 True std::cout << "Empty: " << (q.empty() ? "yes" : "no") << std::endl; // no
 True
 True return 0;
 True}
 True```

 False### 4.3 std::priority_queue
 False
```cpp
 True#include <queue>
 True#include <vector>
 True#include <iostream>
 True
 True// 自定义类型
 Truestruct Person {
 True std::string name;
 True int age;
 True
 True Person(const std::string& n, int a) : name(n), age(a) {}
 True
 True // 重载 < 运算符（用于最大堆）
 True bool operator<(const Person& other) const {
 True return age < other.age; // 年龄大的优先级高
 True }
 True};
 True
 Trueint main() {
 True // 创建优先队列（默认最大堆）
 True std::priority_queue<int> pq;
 True
 True // 压入元素
 True pq.push(3);
 True pq.push(1);
 True pq.push(4);
 True pq.push(1);
 True pq.push(5);
 True
 True // 查看队首元素（最大值）
 True std::cout << "Top: " << pq.top() << std::endl; // 5
 True
 True // 弹出元素
 True pq.pop();
 True std::cout << "Top after pop: " << pq.top() << std::endl; // 4
 True
 True // 创建最小堆
 True std::priority_queue<int, std::vector<int>, std::greater<int>> min_pq;
 True min_pq.push(3);
 True min_pq.push(1);
 True min_pq.push(4);
 True std::cout << "Min top: " << min_pq.top() << std::endl; // 1
 True
 True // 使用自定义类型
 True std::priority_queue<Person> person_pq;
 True person_pq.emplace("Alice", 25);
 True person_pq.emplace("Bob", 30);
 True person_pq.emplace("Charlie", 20);
 True
 True while (!person_pq.empty()) {
 True const Person& p = person_pq.top();
 True std::cout << p.name << " (" << p.age << ")" << std::endl;
 True person_pq.pop();
 True }
 True // 输出：Bob (30), Alice (25), Charlie (20)
 True
 True return 0;
 True}
 True```

 False## 5. 迭代器 (Iterators)
 False
 False迭代器是连接容器与算法的桥梁，提供了访问容器元素的统一接口。
 False
 False### 5.1 迭代器类型
 False
 False| 迭代器类型 | 描述 | 支持的操作 |
 False| :--- | :--- | :--- |
 False| **输入迭代器** | 只读，单向移动 | `++`, `*`, `==`, `!=` |
 False| **输出迭代器** | 只写，单向移动 | `++`, `*` |
 False| **前向迭代器** | 可读可写，单向移动 | `++`, `*`, `==`, `!=` |
 False| **双向迭代器** | 可读可写，双向移动 | `++`, `--`, `*`, `==`, `!=` |
 False| **随机访问迭代器** | 可读可写，随机访问 | `++`, `--`, `+`, `-`, `[]`, `==`, `!=`, `<`, `>`, `<=`, `>=` |
 False
 False### 5.2 迭代器使用示例
 False
```cpp
 True#include <vector>
 True#include <list>
 True#include <iostream>
 True
 Trueint main() {
 True // 向量迭代器（随机访问）
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True std::cout << "Vector elements: ";
 True for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 常量迭代器
 True std::cout << "Vector elements (const): ";
 True for (std::vector<int>::const_iterator it = vec.cbegin(); it != vec.cend(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 列表迭代器（双向）
 True std::list<int> lst = {1, 2, 3, 4, 5};
 True std::cout << "List elements: ";
 True for (std::list<int>::const_iterator it = lst.cbegin(); it != lst.cend(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 反向迭代器
 True std::cout << "Vector reversed: ";
 True for (std::vector<int>::reverse_iterator it = vec.rbegin(); it != vec.rend(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 常量反向迭代器
 True std::cout << "Vector reversed (const): ";
 True for (std::vector<int>::const_reverse_iterator it = vec.crbegin(); it != vec.crend(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 范围 for 循环 (C++11)
 True std::cout << "Range for: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 使用 auto 简化迭代器声明
 True std::cout << "Using auto: ";
 True for (auto it = vec.begin(); it != vec.end(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_105 拆分，专注于 STL 容器与迭代器。
 False