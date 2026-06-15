---
order: 64
title: Kotlin类型系统
module: kotlin
category: Kotlin
difficulty: advanced
description: 泛型、型变与星投影
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin集合操作
  - kotlin/Kotlin作用域函数
  - kotlin/Kotlin与Compose
  - kotlin/Kotlin与Gradle
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 型变

```kotlin
// 协变 — out（生产者）
interface Source<out T> { fun next(): T }

// 逆变 — in（消费者）
interface Sink<in T> { fun put(value: T) }

// 不变
class MutableStack<T> { fun push(item: T) {} fun pop(): T }
```

## 2. 星投影

```kotlin
fun printSize(list: List<*>) {
  println(list.size) // 可以，不依赖 T
}
```
