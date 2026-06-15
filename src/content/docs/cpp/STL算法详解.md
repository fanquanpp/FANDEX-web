---
order: 61
title: STL算法详解
module: cpp
category: C++
difficulty: intermediate
description: STL算法库深入
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/运算符重载
  - cpp/面向对象基础
  - cpp/字符串处理
  - cpp/文件IO与文件系统
prerequisites:
  - cpp/概述与现代标准
---

## 1. 排序与搜索

```cpp
std::sort(v.begin(), v.end());
std::stable_sort(v.begin(), v.end());
std::partial_sort(v.begin(), v.begin() + 5, v.end());

auto it = std::binary_search(v.begin(), v.end(), target);
auto [lower, upper] = std::equal_range(v.begin(), v.end(), target);
```

## 2. 修改序列

```cpp
std::transform(in.begin(), in.end(), out.begin(), fn);
std::remove_if(v.begin(), v.end(), pred);
std::unique(v.begin(), v.end());
std::reverse(v.begin(), v.end());
std::rotate(v.begin(), v.begin() + k, v.end());
```

## 3. 数值算法

```cpp
std::accumulate(v.begin(), v.end(), 0);
std::inner_product(a.begin(), a.end(), b.begin(), 0);
std::partial_sum(v.begin(), v.end(), out.begin());
std::iota(v.begin(), v.end(), 1);
```
