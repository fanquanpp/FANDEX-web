# C++ STL 算法与函数对象 (C++ STL Algorithms & Functors)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: STL 算法、仿函数、lambda 表达式、智能指针与 STL 及最佳实践。 | STL algorithms, functors, lambda expressions, smart pointers with STL, and best practices.
 False
 False---
 False
 False## 目录
 False
 False1. [常用算法](#常用算法)
 False2. [仿函数与函数对象](#仿函数与函数对象)
 False3. [lambda 表达式](#lambda-表达式)
 False4. [智能指针与 STL](#智能指针与-stl)
 False5. [STL 最佳实践](#stl-最佳实践)
 False6. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 常用算法
 False
 FalseSTL 算法位于 `<algorithm>` 头文件中，提供了各种操作容器元素的函数。
 False
 False### 1.1 算法一览
 False
 False| 算法 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **排序** | | |
 False| `std::sort` | 排序元素 | `std::sort(vec.begin(), vec.end());` |
 False| `std::stable_sort` | 稳定排序 | `std::stable_sort(vec.begin(), vec.end());` |
 False| `std::partial_sort` | 部分排序 | `std::partial_sort(vec.begin(), vec.begin() + 3, vec.end());` |
 False| `std::nth_element` | 第 n 小元素 | `std::nth_element(vec.begin(), vec.begin() + 2, vec.end());` |
 False| **查找** | | |
 False| `std::find` | 查找元素 | `auto it = std::find(vec.begin(), vec.end(), 5);` |
 False| `std::binary_search` | 二分查找 | `bool found = std::binary_search(vec.begin(), vec.end(), 5);` |
 False| `std::lower_bound` | 查找下界 | `auto it = std::lower_bound(vec.begin(), vec.end(), 5);` |
 False| `std::upper_bound` | 查找上界 | `auto it = std::upper_bound(vec.begin(), vec.end(), 5);` |
 False| **修改** | | |
 False| `std::copy` | 复制元素 | `std::copy(src.begin(), src.end(), dest.begin());` |
 False| `std::move` | 移动元素 | `std::move(src.begin(), src.end(), dest.begin());` |
 False| `std::fill` | 填充元素 | `std::fill(vec.begin(), vec.end(), 0);` |
 False| `std::replace` | 替换元素 | `std::replace(vec.begin(), vec.end(), 5, 10);` |
 False| `std::transform` | 转换元素 | `std::transform(vec.begin(), vec.end(), vec.begin(), [](int n) { return n * 2; });` |
 False| **计数** | | |
 False| `std::count` | 计数元素 | `int count = std::count(vec.begin(), vec.end(), 5);` |
 False| `std::count_if` | 条件计数 | `int count = std::count_if(vec.begin(), vec.end(), is_even);` |
 False| **最值** | | |
 False| `std::min_element` | 最小值 | `auto it = std::min_element(vec.begin(), vec.end());` |
 False| `std::max_element` | 最大值 | `auto it = std::max_element(vec.begin(), vec.end());` |
 False| `std::minmax_element` | 最小值和最大值 | `auto pair = std::minmax_element(vec.begin(), vec.end());` |
 False| **其他** | | |
 False| `std::reverse` | 反转元素 | `std::reverse(vec.begin(), vec.end());` |
 False| `std::unique` | 去重元素 | `auto last = std::unique(vec.begin(), vec.end());` |
 False| `std::for_each` | 遍历元素 | `std::for_each(vec.begin(), vec.end(), print);` |
 False| `std::accumulate` | 累积计算 | `int sum = std::accumulate(vec.begin(), vec.end(), 0);` |
 False| `std::all_of` | 检查所有元素满足条件 | `bool all_even = std::all_of(vec.begin(), vec.end(), is_even);` |
 False| `std::any_of` | 检查任一元素满足条件 | `bool any_even = std::any_of(vec.begin(), vec.end(), is_even);` |
 False| `std::none_of` | 检查无元素满足条件 | `bool none_even = std::none_of(vec.begin(), vec.end(), is_even);` |
 False
 False### 1.2 算法使用示例
 False
```cpp
 True#include <algorithm>
 True#include <vector>
 True#include <iostream>
 True#include <numeric>
 True
 True// 辅助函数
 Truebool is_even(int n) {
 True return n % 2 == 0;
 True}
 True
 Truebool is_odd(int n) {
 True return n % 2 != 0;
 True}
 True
 Truevoid print(int n) {
 True std::cout << n << " ";
 True}
 True
 Trueint main() {
 True std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
 True
 True // 排序
 True std::sort(vec.begin(), vec.end());
 True std::cout << "Sorted: ";
 True std::for_each(vec.begin(), vec.end(), print);
 True std::cout << std::endl;
 True
 True // 部分排序（前3个元素）
 True std::vector<int> vec2 = {3, 1, 4, 1, 5, 9, 2, 6};
 True std::partial_sort(vec2.begin(), vec2.begin() + 3, vec2.end());
 True std::cout << "Partially sorted: ";
 True std::for_each(vec2.begin(), vec2.end(), print);
 True std::cout << std::endl;
 True
 True // 查找
 True auto it = std::find(vec.begin(), vec.end(), 5);
 True if (it != vec.end()) {
 True std::cout << "Found 5 at position: " << std::distance(vec.begin(), it) << std::endl;
 True }
 True
 True // 二分查找（需要先排序）
 True bool found = std::binary_search(vec.begin(), vec.end(), 5);
 True std::cout << "Binary search for 5: " << (found ? "found" : "not found") << std::endl;
 True
 True // 下界和上界
 True auto lower = std::lower_bound(vec.begin(), vec.end(), 5);
 True auto upper = std::upper_bound(vec.begin(), vec.end(), 5);
 True std::cout << "Lower bound of 5: position " << std::distance(vec.begin(), lower) << std::endl;
 True std::cout << "Upper bound of 5: position " << std::distance(vec.begin(), upper) << std::endl;
 True
 True // 计数
 True int count = std::count(vec.begin(), vec.end(), 1);
 True std::cout << "Count of 1: " << count << std::endl;
 True
 True // 条件计数
 True int even_count = std::count_if(vec.begin(), vec.end(), is_even);
 True std::cout << "Count of even numbers: " << even_count << std::endl;
 True
 True // 最值
 True auto min_it = std::min_element(vec.begin(), vec.end());
 True auto max_it = std::max_element(vec.begin(), vec.end());
 True std::cout << "Min: " << *min_it << ", Max: " << *max_it << std::endl;
 True
 True // 同时获取最小值和最大值
 True auto minmax = std::minmax_element(vec.begin(), vec.end());
 True std::cout << "Min (minmax): " << *minmax.first << ", Max (minmax): " << *minmax.second << std::endl;
 True
 True // 反转
 True std::reverse(vec.begin(), vec.end());
 True std::cout << "Reversed: ";
 True std::for_each(vec.begin(), vec.end(), print);
 True std::cout << std::endl;
 True
 True // 去重（需要先排序）
 True std::sort(vec.begin(), vec.end());
 True auto last = std::unique(vec.begin(), vec.end());
 True vec.erase(last, vec.end());
 True std::cout << "Unique: ";
 True std::for_each(vec.begin(), vec.end(), print);
 True std::cout << std::endl;
 True
 True // 转换
 True std::transform(vec.begin(), vec.end(), vec.begin(), [](int n) { return n * 2; });
 True std::cout << "Transformed (x2): ";
 True std::for_each(vec.begin(), vec.end(), print);
 True std::cout << std::endl;
 True
 True // 累积
 True int sum = std::accumulate(vec.begin(), vec.end(), 0);
 True std::cout << "Sum: " << sum << std::endl;
 True
 True // 检查条件
 True bool all_even = std::all_of(vec.begin(), vec.end(), is_even);
 True bool any_odd = std::any_of(vec.begin(), vec.end(), is_odd);
 True bool none_negative = std::none_of(vec.begin(), vec.end(), [](int n) { return n < 0; });
 True
 True std::cout << "All even: " << (all_even ? "yes" : "no") << std::endl;
 True std::cout << "Any odd: " << (any_odd ? "yes" : "no") << std::endl;
 True std::cout << "None negative: " << (none_negative ? "yes" : "no") << std::endl;
 True
 True return 0;
 True}
 True```

 False## 2. 仿函数与函数对象
 False
 False仿函数是重载了 `operator()` 的类，可以像函数一样使用。
 False
```cpp
 True// 仿函数类
 Trueclass Add {
 Trueprivate:
 True int value;
 True
 Truepublic:
 True Add(int v) : value(v) {}
 True
 True int operator()(int x) const {
 True return x + value;
 True }
 True};
 True
 True// 比较仿函数
 Trueclass Compare {
 Truepublic:
 True bool operator()(int a, int b) const {
 True return a > b; // 降序排序
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True Add add5(5);
 True int result = add5(10); // 调用 operator()
 True std::cout << result << std::endl; // 15
 True
 True // 使用 STL 算法
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True std::transform(vec.begin(), vec.end(), vec.begin(), Add(10));
 True
 True for (int num : vec) {
 True std::cout << num << " "; // 11 12 13 14 15
 True }
 True std::cout << std::endl;
 True
 True // 使用比较仿函数
 True std::sort(vec.begin(), vec.end(), Compare());
 True for (int num : vec) {
 True std::cout << num << " "; // 15 14 13 12 11
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False## 3. lambda 表达式 (C++11)
 False
 Falselambda 表达式是一种创建匿名函数对象的简便方法。
 False
```cpp
 Trueint main() {
 True // 基本 lambda
 True auto add = [](int a, int b) { return a + b; };
 True std::cout << add(5, 3) << std::endl; // 8
 True
 True // 捕获外部变量
 True int x = 10;
 True auto add_x = [x](int y) { return x + y; };
 True std::cout << add_x(5) << std::endl; // 15
 True
 True // 引用捕获
 True auto add_x_ref = [&x](int y) { return x + y; };
 True x = 20;
 True std::cout << add_x_ref(5) << std::endl; // 25
 True
 True // 捕获所有变量
 True auto func = [&]() { std::cout << x << std::endl; };
 True func(); // 20
 True
 True // 混合捕获
 True int y = 5;
 True auto mixed = [x, &y](int z) { return x + y + z; };
 True y = 10;
 True std::cout << mixed(5) << std::endl; // 20 + 10 + 5 = 35
 True
 True // 使用 lambda 与 STL 算法
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True
 True // 转换
 True std::transform(vec.begin(), vec.end(), vec.begin(), [](int n) { return n * 2; });
 True for (int num : vec) {
 True std::cout << num << " "; // 2 4 6 8 10
 True }
 True std::cout << std::endl;
 True
 True // 条件判断
 True auto is_even = [](int n) { return n % 2 == 0; };
 True int even_count = std::count_if(vec.begin(), vec.end(), is_even);
 True std::cout << "Even count: " << even_count << std::endl; // 5
 True
 True // 排序
 True std::sort(vec.begin(), vec.end(), [](int a, int b) { return a > b; });
 True for (int num : vec) {
 True std::cout << num << " "; // 10 8 6 4 2
 True }
 True std::cout << std::endl;
 True
 True // 查找
 True auto it = std::find_if(vec.begin(), vec.end(), [](int n) { return n == 6; });
 True if (it != vec.end()) {
 True std::cout << "Found 6 at position: " << std::distance(vec.begin(), it) << std::endl;
 True }
 True
 True return 0;
 True}
 True```

 False## 4. 智能指针与 STL
 False
 False智能指针可以与 STL 容器结合使用，管理动态内存。
 False
```cpp
 True#include <vector>
 True#include <memory>
 True#include <iostream>
 True
 Trueclass MyClass {
 Trueprivate:
 True int value;
 Truepublic:
 True MyClass(int v) : value(v) {
 True std::cout << "Constructor: " << value << std::endl;
 True }
 True ~MyClass() {
 True std::cout << "Destructor: " << value << std::endl;
 True }
 True int getValue() const { return value; }
 True};
 True
 Trueint main() {
 True // 使用 unique_ptr
 True std::vector<std::unique_ptr<MyClass>> vec;
 True
 True // 添加元素
 True vec.push_back(std::make_unique<MyClass>(1));
 True vec.push_back(std::make_unique<MyClass>(2));
 True vec.push_back(std::make_unique<MyClass>(3));
 True
 True // 遍历元素
 True for (const auto& ptr : vec) {
 True std::cout << ptr->getValue() << " ";
 True }
 True std::cout << std::endl;
 True
 True // 移除元素
 True vec.pop_back(); // 自动调用析构函数
 True
 True // 清空容器
 True vec.clear(); // 自动调用所有剩余元素的析构函数
 True
 True std::cout << "Done" << std::endl;
 True
 True return 0;
 True}
 True```

 False## 5. STL 最佳实践
 False
 False### 5.1 容器选择
 False
 False| 场景 | 推荐容器 | 原因 |
 False| :--- | :--- | :--- |
 False| 随机访问 | `std::vector` | 提供 O(1) 随机访问 |
 False| 频繁插入/删除 | `std::list` | 提供 O(1) 插入/删除 |
 False| 两端操作 | `std::deque` | 两端插入/删除高效 |
 False| 固定大小 | `std::array` | 栈上分配，性能好 |
 False| 查找操作 | `std::unordered_set`/`std::unordered_map` | 平均 O(1) 查找 |
 False| 有序集合 | `std::set`/`std::map` | 自动排序，O(log n) 查找 |
 False| 先进先出 | `std::queue` | 队列接口 |
 False| 后进先出 | `std::stack` | 栈接口 |
 False| 优先级处理 | `std::priority_queue` | 自动排序 |
 False
 False### 5.2 性能优化
 False
 False- **避免不必要的拷贝**: 使用移动语义和引用
 False- **合理使用 reserve**: 对于 `std::vector`，预先分配空间
 False- **选择合适的迭代器**: 随机访问迭代器比双向迭代器快
 False- **避免频繁重新哈希**: 对于无序容器，合理设置桶大小
 False- **使用 emplace 系列函数**: 直接在容器中构造对象，避免拷贝
 False
 False### 5.3 代码风格
 False
 False- **使用 `auto`**: 简化代码，提高可读性
 False- **使用范围 for 循环**: 更简洁的遍历方式
 False- **使用 lambda 表达式**: 简化函数对象的使用
 False- **使用 STL 算法**: 利用标准库的优化实现
 False- **注意异常安全**: 确保容器操作的异常安全性
 False
 False## 6. 代码示例
 False
 False### 6.1 模板的综合使用
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <string>
 True
 True// 函数模板：打印容器
 Truetemplate <typename Container>
 Truevoid printContainer(const Container& container, const std::string& name) {
 True std::cout << name << ": ";
 True for (const auto& item : container) {
 True std::cout << item << " ";
 True }
 True std::cout << std::endl;
 True}
 True
 True// 类模板：栈
 Truetemplate <typename T>
 Trueclass Stack {
 Trueprivate:
 True std::vector<T> elements;
 True
 Truepublic:
 True void push(const T& item) {
 True elements.push_back(item);
 True }
 True
 True void push(T&& item) {
 True elements.push_back(std::move(item));
 True }
 True
 True T pop() {
 True if (elements.empty()) {
 True throw std::runtime_error("Stack is empty");
 True }
 True T top = std::move(elements.back());
 True elements.pop_back();
 True return top;
 True }
 True
 True bool empty() const {
 True return elements.empty();
 True }
 True
 True size_t size() const {
 True return elements.size();
 True }
 True};
 True
 True// 可变参数模板：求和
 Truetemplate <typename T>
 TrueT sum(T first) {
 True return first;
 True}
 True
 Truetemplate <typename T, typename... Args>
 TrueT sum(T first, Args... rest) {
 True return first + sum(rest...);
 True}
 True
 Trueint main() {
 True // 测试函数模板
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True printContainer(vec, "Vector");
 True
 True // 测试类模板
 True Stack<int> intStack;
 True intStack.push(1);
 True intStack.push(2);
 True intStack.push(3);
 True std::cout << "Stack size: " << intStack.size() << std::endl;
 True while (!intStack.empty()) {
 True std::cout << "Popped: " << intStack.pop() << std::endl;
 True }
 True
 True // 测试可变参数模板
 True int total = sum(1, 2, 3, 4, 5);
 True std::cout << "Sum: " << total << std::endl;
 True
 True double total_d = sum(1.5, 2.5, 3.5);
 True std::cout << "Sum (double): " << total_d << std::endl;
 True
 True return 0;
 True}
 True```

 False### 6.2 STL 容器的综合使用
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <list>
 True#include <map>
 True#include <unordered_map>
 True#include <stack>
 True#include <queue>
 True#include <algorithm>
 True
 Trueint main() {
 True // 向量
 True std::vector<int> vec = {5, 2, 8, 1, 9};
 True std::sort(vec.begin(), vec.end());
 True std::cout << "Sorted vector: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 列表
 True std::list<int> lst = {5, 2, 8, 1, 9};
 True lst.sort();
 True std::cout << "Sorted list: ";
 True for (int num : lst) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 映射
 True std::map<std::string, int> scores;
 True scores["Alice"] = 95;
 True scores["Bob"] = 88;
 True scores["Charlie"] = 92;
 True std::cout << "Scores: " << std::endl;
 True for (const auto& pair : scores) {
 True std::cout << pair.first << ": " << pair.second << std::endl;
 True }
 True
 True // 无序映射
 True std::unordered_map<std::string, int> ages;
 True ages["Alice"] = 25;
 True ages["Bob"] = 30;
 True ages["Charlie"] = 35;
 True std::cout << "Ages: " << std::endl;
 True for (const auto& pair : ages) {
 True std::cout << pair.first << ": " << pair.second << std::endl;
 True }
 True
 True // 栈
 True std::stack<int> st;
 True st.push(1);
 True st.push(2);
 True st.push(3);
 True std::cout << "Stack top: " << st.top() << std::endl;
 True st.pop();
 True std::cout << "Stack top after pop: " << st.top() << std::endl;
 True
 True // 队列
 True std::queue<int> q;
 True q.push(1);
 True q.push(2);
 True q.push(3);
 True std::cout << "Queue front: " << q.front() << std::endl;
 True q.pop();
 True std::cout << "Queue front after pop: " << q.front() << std::endl;
 True
 True // 优先队列
 True std::priority_queue<int> pq;
 True pq.push(3);
 True pq.push(1);
 True pq.push(4);
 True std::cout << "Priority queue top: " << pq.top() << std::endl;
 True pq.pop();
 True std::cout << "Priority queue top after pop: " << pq.top() << std::endl;
 True
 True return 0;
 True}
 True```

 False### 6.3 算法的综合使用
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <algorithm>
 True#include <functional>
 True
 Trueint main() {
 True std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
 True
 True std::cout << "Original vector: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 排序
 True std::sort(vec.begin(), vec.end());
 True std::cout << "Sorted vector: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 去重
 True auto last = std::unique(vec.begin(), vec.end());
 True vec.erase(last, vec.end());
 True std::cout << "Unique vector: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 反转
 True std::reverse(vec.begin(), vec.end());
 True std::cout << "Reversed vector: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 查找
 True auto it = std::find(vec.begin(), vec.end(), 5);
 True if (it != vec.end()) {
 True std::cout << "Found 5 at position: " << std::distance(vec.begin(), it) << std::endl;
 True }
 True
 True // 二分查找
 True std::sort(vec.begin(), vec.end());
 True bool found = std::binary_search(vec.begin(), vec.end(), 5);
 True std::cout << "Binary search for 5: " << (found ? "found" : "not found") << std::endl;
 True
 True // 最值
 True auto min_it = std::min_element(vec.begin(), vec.end());
 True auto max_it = std::max_element(vec.begin(), vec.end());
 True std::cout << "Min: " << *min_it << ", Max: " << *max_it << std::endl;
 True
 True // 计数
 True int count = std::count(vec.begin(), vec.end(), 5);
 True std::cout << "Count of 5: " << count << std::endl;
 True
 True // 条件计数
 True int even_count = std::count_if(vec.begin(), vec.end(), [](int n) { return n % 2 == 0; });
 True std::cout << "Count of even numbers: " << even_count << std::endl;
 True
 True // 转换
 True std::vector<int> doubled(vec.size());
 True std::transform(vec.begin(), vec.end(), doubled.begin(), [](int n) { return n * 2; });
 True std::cout << "Doubled vector: ";
 True for (int num : doubled) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 累积
 True int sum = std::accumulate(vec.begin(), vec.end(), 0);
 True std::cout << "Sum: " << sum << std::endl;
 True
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_105 拆分，专注于 STL 算法、仿函数、lambda 表达式及最佳实践。
 False