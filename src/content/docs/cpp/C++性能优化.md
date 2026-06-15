---
order: 75
title: C++性能优化
module: cpp
category: C++
difficulty: advanced
description: C++性能优化技巧
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++测试框架
  - cpp/C++与Python交互
  - cpp/C++序列化
  - cpp/C++网络编程
prerequisites:
  - cpp/概述与现代标准
---

## 1. 编译器优化

```bash
-O2          # 标准优化
-O3          # 激进优化
-march=native # 针对本机CPU优化
-flto        # 链接时优化
```

## 2. 数据布局优化

```cpp
// 缓存友好的数据布局
struct SoA { // Structure of Arrays
  std::vector<float> x, y, z;
};

struct AoS { // Array of Structures
  struct Point { float x, y, z; };
  std::vector<Point> points;
};
// SoA 更适合 SIMD 和缓存行
```

## 3. 移动代替拷贝

```cpp
std::vector<int> v2 = std::move(v1); // O(1) 而非 O(n)
```
