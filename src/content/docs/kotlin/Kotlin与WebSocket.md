---
order: 82
title: Kotlin与WebSocket
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Ktor WebSocket'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与时间
  - kotlin/Kotlin与并发安全
  - kotlin/Kotlin与安全
  - kotlin/协程调度器与上下文
prerequisites:
  - kotlin/概述与环境配置
---

## 1. WebSocket 服务器

```kotlin
routing {
  webSocket("/ws") {
    for (frame in incoming) {
      if (frame is Frame.Text) {
        val text = frame.readText()
        send(Frame.Text("Echo: $text"))
      }
    }
  }
}
```
