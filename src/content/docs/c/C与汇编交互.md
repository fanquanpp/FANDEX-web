---
order: 75
title: C与汇编交互
module: c
category: C
difficulty: advanced
description: 内联汇编与外部汇编
author: fanquanpp
updated: '2026-06-14'
related:
  - c/跨平台编程
  - c/嵌入式C编程
  - c/数组详解
  - c/预处理器与宏
prerequisites:
  - c/概述
---

## 1. 内联汇编

```c
// GCC 内联汇编
static inline uint64_t rdtsc(void) {
  unsigned int lo, hi;
  __asm__ __volatile__ ("rdtsc" : "=a"(lo), "=d"(hi));
  return ((uint64_t)hi << 32) | lo;
}
```

## 2. 扩展汇编

```c
int add(int a, int b) {
  int result;
  __asm__ (
    "addl %%ebx, %%eax"
    : "=a" (result)
    : "a" (a), "b" (b)
  );
  return result;
}
```
