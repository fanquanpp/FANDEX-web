---
order: 62
title: Kotlin集合操作
module: kotlin
category: Kotlin
difficulty: beginner
description: 函数式集合操作
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin契约
  - kotlin/Kotlin序列化
  - kotlin/Kotlin作用域函数
  - kotlin/Kotlin类型系统
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 常用操作

```kotlin
val result = users
  .filter { it.age > 18 }
  .map { it.name }
  .sorted()
  .distinct()

// 聚合
val totalAge = users.sumOf { it.age }
val grouped = users.groupBy { it.city }

// 关联
val userMap = users.associateBy { it.id }
```
