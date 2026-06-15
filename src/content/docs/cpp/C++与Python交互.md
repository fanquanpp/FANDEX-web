---
order: 74
title: C++与Python交互
module: cpp
category: C++
difficulty: advanced
description: pybind11与C++/Python互操作
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++工具链
  - cpp/C++测试框架
  - cpp/C++性能优化
  - cpp/C++序列化
prerequisites:
  - cpp/概述与现代标准
---

## 1. pybind11

```cpp
#include <pybind11/pybind11.h>

int add(int a, int b) { return a + b; }

PYBIND11_MODULE(mymod, m) {
  m.def("add", &add, "Add two numbers");
}
```

```python
import mymod
mymod.add(1, 2)  # 3
```
