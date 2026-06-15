---
order: 59
title: Kotlin契约
module: kotlin
category: Kotlin
difficulty: advanced
description: 契约与编译器提示
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Android
  - kotlin/Kotlin内联类
  - kotlin/Kotlin序列化
  - kotlin/Kotlin集合操作
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 契约

```kotlin
fun requireNonNull(value: Any?) {
  contract { returns() implies (value != null) }
  if (value == null) throw IllegalArgumentException()
}

fun process(s: String?) {
  requireNonNull(s)
  s.length  // 编译器知道 s 不为 null
}
```
