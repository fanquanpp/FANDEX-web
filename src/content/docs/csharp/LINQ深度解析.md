---
order: 50
title: LINQ深度解析
module: csharp
category: 'C#'
difficulty: intermediate
description: LINQ查询语法与方法语法
author: fanquanpp
updated: '2026-06-14'
related:
  - csharp/测试与工程化
  - csharp/游戏开发与Unity
  - csharp/异步编程详解
  - csharp/模式匹配
prerequisites:
  - csharp/概述与环境配置
---

## 1. LINQ 语法

```csharp
// 方法语法
var result = users
  .Where(u => u.Age > 18)
  .OrderBy(u => u.Name)
  .Select(u => new { u.Name, u.Age });

// 查询语法
var result2 = from u in users
              where u.Age > 18
              orderby u.Name
              select new { u.Name, u.Age };
```

## 2. 常用操作符

| 操作符      | 说明 |
| ----------- | ---- |
| `Where`     | 过滤 |
| `Select`    | 投影 |
| `OrderBy`   | 排序 |
| `GroupBy`   | 分组 |
| `Join`      | 连接 |
| `Distinct`  | 去重 |
| `Aggregate` | 聚合 |
| `Zip`       | 合并 |
