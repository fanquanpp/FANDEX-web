---
order: 84
title: C++反射与元编程
module: cpp
category: C++
difficulty: advanced
description: 编译期反射与代码生成
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++代码规范
  - cpp/C++与WebAssembly
  - cpp/C++数学库
  - cpp/智能指针
prerequisites:
  - cpp/概述与现代标准
---

## 1. 编译期类型信息

```cpp
#include <typeinfo>
std::cout << typeid(int).name(); // 输出类型名

// C++26 反射（提案中）
// consteval auto members = std::meta::members_of(^MyStruct);
```

## 2. 静态反射技巧

```cpp
// 聚合类型字段计数
template<typename T>
consteval size_t field_count() {
  // 通过聚合初始化技巧
  return []<size_t... I>(std::index_sequence<I...>) {
    return sizeof...(I);
  }(std::make_index_sequence<sizeof(T)>{});
}
```
