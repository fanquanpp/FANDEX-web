---
order: 74
title: Kotlin与编译器插件
module: kotlin
category: Kotlin
difficulty: advanced
description: kapt、KSP与编译器插件
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与测试
  - kotlin/Kotlin与协程Channel
  - kotlin/Kotlin与DSL
  - kotlin/Kotlin与原子操作
prerequisites:
  - kotlin/概述与环境配置
---

## 1. KSP（Kotlin Symbol Processing）

```kotlin
// build.gradle.kts
plugins {
  id("com.google.devtools.ksp") version "2.0.0-1.0.21"
}

dependencies {
  ksp("com.example:processor:1.0.0")
}
```

KSP 比 kapt 更快，因为直接操作 Kotlin AST。
