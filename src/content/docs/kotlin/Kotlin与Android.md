---
order: 57
title: Kotlin与Android
module: kotlin
category: Kotlin
difficulty: intermediate
description: 'Kotlin Android开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Flow与响应式流
  - kotlin/Kotlin与Spring
  - kotlin/Kotlin内联类
  - kotlin/Kotlin契约
prerequisites:
  - kotlin/概述与环境配置
---

## 1. Activity

```kotlin
class MainActivity : AppCompatActivity() {
  private val viewModel: MainViewModel by viewModels()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      MaterialTheme {
        MainScreen(viewModel)
      }
    }
  }
}
```
