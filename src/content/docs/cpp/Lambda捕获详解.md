---
order: 105
title: Lambda捕获详解
module: cpp
category: 'dev-lang'
difficulty: advanced
description: 'C++ Lambda捕获详解：值捕获、引用捕获、初始化捕获、*this。'
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/虚函数表与多态内存布局
  - cpp/智能指针循环引用
  - cpp/类型萃取与SFINAE
  - cpp/可变参数模板与折叠表达式
prerequisites:
  - cpp/概述与现代标准
---

## 1. 捕获方式

```cpp
int x = 10;
int y = 20;

// 值捕获
auto f1 = [x]() { return x; };

// 引用捕获
auto f2 = [&x]() { return x; };

// 全部值捕获
auto f3 = [=]() { return x + y; };

// 全部引用捕获
auto f4 = [&]() { return x + y; };

// 混合捕获
auto f5 = [x, &y]() { return x + y; };
```

## 2. 初始化捕获（C++14）

```cpp
auto ptr = std::make_unique<int>(42);

// 移动捕获
auto f = [p = std::move(ptr)]() { return *p; };
```

## 3. \*this 捕获（C++17）

```cpp
struct S {
    int x;
    auto getCallback() {
        // [*this] 值拷贝当前对象
        return [*this]() { return x; };
    }
};
```

## 4. 注意事项

- 引用捕获可能导致悬空引用
- 值捕获的是创建时的副本
- 避免捕获局部变量的引用
