---
order: 80
title: Kotlin与时间
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'kotlinx-datetime'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与IO
  - kotlin/Kotlin与正则
  - kotlin/Kotlin与并发安全
  - kotlin/Kotlin与WebSocket
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 日期时间

```kotlin
import kotlinx.datetime.*

val now = Clock.System.now()
val today = now.toLocalDateTime(TimeZone.currentSystemDefault()).date

val birthday = LocalDate(2000, Month.JANUARY, 15)
val age = today.year - birthday.year

val duration = 30.minutes
val instant = now + duration
```
