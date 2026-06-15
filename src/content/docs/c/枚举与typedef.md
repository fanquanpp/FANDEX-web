---
order: 51
title: 枚举与typedef
module: c
category: C
difficulty: beginner
description: 枚举类型与类型别名
author: fanquanpp
updated: '2026-06-14'
related:
  - c/位运算与位域
  - c/运算符与表达式
  - c/多文件编译
  - c/动态内存管理
prerequisites:
  - c/概述
---

## 1. 枚举

```c
enum Color { RED, GREEN, BLUE };
enum Color c = GREEN;

// 指定值
enum Status {
  OK = 200,
  NOT_FOUND = 404,
  ERROR = 500
};
```

## 2. typedef

```c
typedef unsigned long ulong;
typedef int (*Comparator)(const void*, const void*);
typedef struct { double x; double y; } Point;

Point p = {1.0, 2.0};
```
