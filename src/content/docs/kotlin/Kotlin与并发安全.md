---
order: 81
title: Kotlin与并发安全
module: kotlin
category: Kotlin
difficulty: advanced
description: 协程并发与线程安全
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与正则
  - kotlin/Kotlin与时间
  - kotlin/Kotlin与WebSocket
  - kotlin/Kotlin与安全
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Mutex

```kotlin
val mutex = Mutex()
var counter = 0

repeat(1000) {
  launch {
    mutex.withLock {
      counter++
    }
  }
}
```

## 2. Actor

```kotlin
fun CoroutineScope.counterActor() = actor<CounterMsg> {
  var counter = 0
  for (msg in channel) {
    when (msg) {
      is Inc -> counter++
      is Get -> msg.response.complete(counter)
    }
  }
}
```
