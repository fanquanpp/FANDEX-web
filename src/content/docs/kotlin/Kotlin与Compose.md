---
order: 65
title: Kotlin与Compose
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Jetpack Compose桌面/移动'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin作用域函数
  - kotlin/Kotlin类型系统
  - kotlin/Kotlin与Gradle
  - kotlin/Kotlin与Arrow
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Compose 基础

```kotlin
@Composable
fun Greeting(name: String) {
  var count by remember { mutableStateOf(0) }
  Column {
    Text("Hello, $name! Count: $count")
    Button(onClick = { count++ }) {
      Text("Click")
    }
  }
}
```
