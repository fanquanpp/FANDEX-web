---
order: 78
title: Kotlin与IO
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'kotlinx-io与文件操作'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与原子操作
  - kotlin/Kotlin与Benchmark
  - kotlin/Kotlin与正则
  - kotlin/Kotlin与时间
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 文件操作

```kotlin
// 读取
val lines = File("data.txt").readLines()
val text = File("data.txt").readText()

// 写入
File("output.txt").writeText("Hello, World!")
File("output.txt").appendText("More content")

// 遍历
File(".").walkTopDown().filter { it.extension == "kt" }.forEach { println(it) }
```
