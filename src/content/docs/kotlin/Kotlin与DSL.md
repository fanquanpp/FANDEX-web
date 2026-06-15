---
order: 75
title: Kotlin与DSL
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Kotlin DSL设计'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与协程Channel
  - kotlin/Kotlin与编译器插件
  - kotlin/Kotlin与原子操作
  - kotlin/Kotlin与Benchmark
prerequisites:
  - kotlin/概述与环境配置
---

## 1. DSL 构建

```kotlin
fun html(block: HTML.() -> Unit): HTML = HTML().apply(block)

class HTML {
  private val children = mutableListOf<String>()
  fun body(block: Body.() -> Unit) { children.add(Body().apply(block).toString()) }
  override fun toString() = children.joinToString("\n")
}

html {
  body {
    h1("Title")
    p("Content")
  }
}
```
