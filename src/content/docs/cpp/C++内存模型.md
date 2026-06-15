---
order: 71
title: C++内存模型
module: cpp
category: C++
difficulty: advanced
description: C++原子操作与内存序
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/设计模式与C++
  - cpp/面向对象进阶
  - cpp/C++工具链
  - cpp/C++测试框架
prerequisites:
  - cpp/概述与现代标准
---

## 1. 原子操作

```cpp
#include <atomic>

std::atomic<int> counter{0};
counter.fetch_add(1, std::memory_order_relaxed);
counter.load(std::memory_order_acquire);
counter.store(0, std::memory_order_release);
```

## 2. 内存序

| 内存序    | 说明                         |
| --------- | ---------------------------- |
| `relaxed` | 无顺序保证                   |
| `acquire` | 读操作，后续不能重排到此之前 |
| `release` | 写操作，之前不能重排到此之后 |
| `acq_rel` | 读写都有保证                 |
| `seq_cst` | 顺序一致（默认）             |
