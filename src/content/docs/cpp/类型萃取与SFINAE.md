---
order: 106
title: 类型萃取与SFINAE
module: cpp
category: 'dev-lang'
difficulty: advanced
description: C++类型萃取与SFINAE详解：type_traits与编译期类型判断。
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/智能指针循环引用
  - cpp/Lambda捕获详解
  - cpp/可变参数模板与折叠表达式
  - cpp/C++20协程
prerequisites:
  - cpp/概述与现代标准
---

## 1. type_traits

```cpp
#include <type_traits>

static_assert(std::is_integral<int>::value);
static_assert(std::is_pointer<int*>::value);
static_assert(std::is_same<int, int32_t>::value);

// C++17 简写
static_assert(std::is_integral_v<int>);
```

## 2. SFINAE

替换失败不是错误（Substitution Failure Is Not An Error）：

```cpp
// 仅当 T 是整数类型时启用
template<typename T>
std::enable_if_t<std::is_integral_v<T>, T>
process(T value) {
    return value * 2;
}

// 仅当 T 是浮点类型时启用
template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, T>
process(T value) {
    return value * 2.0;
}
```

## 3. void_t 技巧（C++17）

```cpp
template<typename T, typename = void>
struct has_toString : std::false_type {};

template<typename T>
struct has_toString<T, std::void_t<decltype(std::declval<T>().toString())>>
    : std::true_type {};
```

## 4. C++20 Concepts 替代

```cpp
template<std::integral T>
T process(T value) { return value * 2; }
```
