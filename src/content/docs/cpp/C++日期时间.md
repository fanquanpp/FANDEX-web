---
order: 87
title: C++日期时间
module: cpp
category: C++
difficulty: intermediate
description: chrono与日期时间处理
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/智能指针
  - cpp/C++正则表达式
  - cpp/C++格式化输出
  - cpp/C++26与最新标准
prerequisites:
  - cpp/概述与现代标准
---

## 1. chrono

```cpp
#include <chrono>

using namespace std::chrono;

auto start = steady_clock::now();
// ... 操作
auto end = steady_clock::now();
auto duration = duration_cast<milliseconds>(end - start);
std::cout << duration.count() << "ms\n";
```

## 2. C++20 日历

```cpp
#include <chrono>

auto today = year_month_day{2026y, June, 14d};
auto birthday = 2000y / January / 15;
```
