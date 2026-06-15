---
order: 76
title: Kotlin与原子操作
module: kotlin
category: Kotlin
difficulty: intermediate
description: kotlinx.atomicfu
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与编译器插件
  - kotlin/Kotlin与DSL
  - kotlin/Kotlin与Benchmark
  - kotlin/Kotlin与IO
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 原子操作

```kotlin
import kotlinx.atomicfu.atomic

class Counter {
  private val count = atomic(0)
  fun increment() = count.incrementAndGet()
  fun get() = count.value
}
```
