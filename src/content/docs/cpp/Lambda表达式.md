---
order: 52
title: Lambda表达式
module: cpp
category: C++
difficulty: intermediate
description: Lambda捕获、泛型Lambda与C++23改进
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/指针
  - cpp/智能指针详解
  - cpp/模板元编程
  - cpp/C++20范围
prerequisites:
  - cpp/概述与现代标准
---

## 1. 基本语法

```cpp
auto add = [](int a, int b) { return a + b; };
add(1, 2); // 3
```

## 2. 捕获

```cpp
int x = 10, y = 20;

auto f1 = [x, y]() { return x + y; };    // 值捕获
auto f2 = [&x, &y]() { x++; y++; };      // 引用捕获
auto f3 = [=]() { return x + y; };       // 全部值捕获
auto f4 = [&]() { x++; y++; };           // 全部引用捕获
auto f5 = [=, &x]() { x++; return y; };  // 混合捕获
auto f6 = [this]() { return member; };    // 捕获 this
```

## 3. 泛型 Lambda（C++14）

```cpp
auto greater = [](auto a, auto b) { return a > b; };
greater(3, 2);    // true
greater(3.0, 2.5); // true
```

## 4. C++23 改进

```cpp
// 递归 Lambda
auto fib = [](this auto self, int n) -> int {
  return n <= 1 ? n : self(n-1) + self(n-2);
};
```
