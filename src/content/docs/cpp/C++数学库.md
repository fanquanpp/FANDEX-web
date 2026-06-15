---
order: 85
title: C++数学库
module: cpp
category: C++
difficulty: intermediate
description: 数值计算与数学库
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++与WebAssembly
  - cpp/C++反射与元编程
  - cpp/智能指针
  - cpp/C++正则表达式
prerequisites:
  - cpp/概述与现代标准
---

## 1. 数学函数

```cpp
#include <cmath>

std::sqrt(2.0);
std::pow(2, 10);
std::sin(M_PI / 4);
std::log(std::exp(1.0)); // 1.0
std::abs(-42);
std::floor(3.7);  // 3
std::ceil(3.2);   // 4
std::round(3.5);  // 4
```

## 2. 复数

```cpp
#include <complex>
std::complex<double> z(1.0, 2.0);
std::abs(z);   // 模
std::arg(z);   // 辐角
std::norm(z);  // 模的平方
```
