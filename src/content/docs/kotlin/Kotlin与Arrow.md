---
order: 67
title: Kotlin与Arrow
module: kotlin
category: Kotlin
difficulty: advanced
description: 函数式编程库Arrow
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Compose
  - kotlin/Kotlin与Gradle
  - kotlin/Kotlin与Ktor
  - kotlin/Kotlin与Exposed
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Either

```kotlin
import arrow.core.Either

fun divide(a: Int, b: Int): Either<String, Int> =
  if (b == 0) Either.Left("Division by zero")
  else Either.Right(a / b)

val result = divide(10, 0)
  .map { it * 2 }
  .getOrElse { 0 }
```
