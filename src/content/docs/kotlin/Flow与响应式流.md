---
order: 55
title: Flow与响应式流
module: kotlin
category: Kotlin
difficulty: advanced
description: 'Kotlin Flow与Channel'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/委托属性
  - kotlin/协程基础
  - kotlin/Kotlin与Spring
  - kotlin/Kotlin与Android
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Flow

```kotlin
fun numbers(): Flow<Int> = flow {
  for (i in 1..10) {
    emit(i)
    delay(100)
  }
}

numbers()
  .filter { it % 2 == 0 }
  .map { it * it }
  .collect { println(it) }
```

## 2. StateFlow & SharedFlow

```kotlin
private val _state = MutableStateFlow(initialValue)
val state: StateFlow<T> = _state.asStateFlow()
```
