---
order: 68
title: Kotlin与Ktor
module: kotlin
category: Kotlin
difficulty: intermediate
description: Ktor服务端框架
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Gradle
  - kotlin/Kotlin与Arrow
  - kotlin/Kotlin与Exposed
  - kotlin/Kotlin与Koin
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Ktor 服务器

```kotlin
embeddedServer(Netty, port = 8080) {
  routing {
    get("/hello") {
      call.respondText("Hello, World!")
    }
    get("/users/{id}") {
      val id = call.parameters["id"]!!
      call.respond(userService.findById(id))
    }
  }
}.start(wait = true)
```
