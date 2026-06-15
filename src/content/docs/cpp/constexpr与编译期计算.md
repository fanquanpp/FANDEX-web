---
order: 68
title: constexpr与编译期计算
module: cpp
category: C++
difficulty: advanced
description: 编译期常量与计算
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/类型特征与SFINAE
  - cpp/变参模板
  - cpp/命名空间与链接
  - cpp/设计模式与C++
prerequisites:
  - cpp/概述与现代标准
---

## 1. constexpr

```cpp
constexpr int factorial(int n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

static_assert(factorial(5) == 120); // 编译期计算

constexpr auto val = factorial(10); // 编译期常量
```

## 2. consteval（C++20）

```cpp
consteval int square(int n) { return n * n; }
// 必须在编译期计算
int arr[square(5)]; // OK
```

## 3. constinit（C++20）

```cpp
constinit int global = factorial(5); // 编译期初始化，运行时变量
```
