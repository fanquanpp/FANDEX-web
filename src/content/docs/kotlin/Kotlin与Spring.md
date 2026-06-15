---
order: 56
title: Kotlin与Spring
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Kotlin Spring Boot开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/协程基础
  - kotlin/Flow与响应式流
  - kotlin/Kotlin与Android
  - kotlin/Kotlin内联类
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Spring Boot with Kotlin

```kotlin
@RestController
class UserController(private val service: UserService) {
  @GetMapping("/users/{id}")
  suspend fun getUser(@PathVariable id: String): User =
    service.findById(id)
}

@Service
class UserService(private val repo: UserRepository) {
  suspend fun findById(id: String): User = coroutineScope {
    repo.findById(id) ?: throw NotFoundException()
  }
}
```
