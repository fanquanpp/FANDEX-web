---
order: 58
title: Kotlin内联类
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'value class与内联优化'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Spring
  - kotlin/Kotlin与Android
  - kotlin/Kotlin契约
  - kotlin/Kotlin序列化
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Value Class

```kotlin
@JvmInline
value class UserId(val value: String)
@JvmInline
value class Email(val value: String)

fun findUser(id: UserId) { /* ... */ }
findUser(UserId("123"))  // 类型安全，运行时无开销
```
