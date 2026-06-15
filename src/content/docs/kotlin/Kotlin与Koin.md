---
order: 70
title: Kotlin与Koin
module: kotlin
category: Kotlin
difficulty: intermediate
description: Koin依赖注入
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin与Ktor
  - kotlin/Kotlin与Exposed
  - 'kotlin/Kotlin与ktor-client'
  - kotlin/Kotlin与测试
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Koin 配置

```kotlin
val appModule = module {
  single { UserRepository(get()) }
  viewModel { UserViewModel(get()) }
}

startKoin {
  modules(appModule)
}
```
