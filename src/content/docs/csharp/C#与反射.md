---
order: 64
title: 'C#与反射'
module: csharp
category: 'C#'
difficulty: advanced
description: 反射与表达式树
author: fanquanpp
updated: '2026-06-14'
related:
  - 'csharp/C#与最小API'
  - 'csharp/C#12与C#13新特性'
  - csharp/LINQ延迟与立即执行
  - 'csharp/async-await状态机'
prerequisites:
  - csharp/概述与环境配置
---

## 1. 反射

```csharp
var type = typeof(User);
var props = type.GetProperties();
var method = type.GetMethod("GetName");
var result = method.Invoke(instance, null);
```

## 2. 表达式树

```csharp
Expression<Func<User, bool>> expr = u => u.Age > 18;
// 可以编译执行，也可以分析结构
var compiled = expr.Compile();
bool result = compiled(user);
```
