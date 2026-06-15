---
order: 66
title: Kotlin与Gradle
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Kotlin DSL构建脚本'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin类型系统
  - kotlin/Kotlin与Compose
  - kotlin/Kotlin与Arrow
  - kotlin/Kotlin与Ktor
prerequisites:
  - kotlin/概述与环境配置
---

## 1. build.gradle.kts

```kotlin
plugins {
  kotlin("jvm") version "2.0.0"
  kotlin("plugin.serialization") version "2.0.0"
}

dependencies {
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
  implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
  testImplementation(kotlin("test"))
}

tasks.test { useJUnitPlatform() }
```
