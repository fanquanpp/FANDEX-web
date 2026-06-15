---
order: 69
title: Kotlin与Exposed
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Kotlin SQL框架Exposed'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Arrow
  - kotlin/Kotlin与Ktor
  - kotlin/Kotlin与Koin
  - 'kotlin/Kotlin与ktor-client'
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Exposed DSL

```kotlin
object Users : Table() {
  val id = integer("id").autoIncrement()
  val name = varchar("name", 50)
  override val primaryKey = PrimaryKey(id)
}

transaction {
  Users.insert { it[name] = "Alice" }
  Users.selectAll().map { it[Users.name] }
}
```
