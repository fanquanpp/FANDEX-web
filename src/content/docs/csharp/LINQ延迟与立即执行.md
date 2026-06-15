---
order: 100
title: LINQ延迟与立即执行
module: csharp
category: 'dev-lang'
difficulty: advanced
description: 'C# LINQ延迟执行与立即执行详解。'
author: fanquanpp
updated: '2026-06-14'
related:
  - 'csharp/C#12与C#13新特性'
  - 'csharp/C#与反射'
  - 'csharp/async-await状态机'
  - csharp/委托与事件底层原理
prerequisites:
  - csharp/概述与环境配置
---

## 1. 延迟执行

```csharp
var query = numbers.Where(n => n > 3);  // 不执行
var results = query.ToList();  // 此时才执行
```

延迟执行的方法：Where, Select, OrderBy, GroupBy, Skip, Take, Concat, Union, ...

## 2. 立即执行

```csharp
var count = numbers.Count();        // 立即执行
var list = numbers.ToList();        // 立即执行
var first = numbers.First();        // 立即执行
var any = numbers.Any(n => n > 5);  // 立即执行
```

## 3. 延迟执行的陷阱

```csharp
var numbers = new List<int> { 1, 2, 3 };
var query = numbers.Where(n => n > 1);
numbers.Add(4);  // 修改源数据
query.Count();   // 3（包含新添加的 4）
```

## 4. IQueryable vs IEnumerable

| 类型        | 执行位置         | 适用场景   |
| ----------- | ---------------- | ---------- |
| IEnumerable | 客户端（内存）   | 内存集合   |
| IQueryable  | 服务端（数据库） | 数据库查询 |
