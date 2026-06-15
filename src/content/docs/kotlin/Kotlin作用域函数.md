---
order: 63
title: Kotlin作用域函数
module: kotlin
category: Kotlin
difficulty: beginner
description: let/run/with/apply/also
author: fanquanpp
updated: '2026-06-14'
related:
  - kotlin/Kotlin序列化
  - kotlin/Kotlin集合操作
  - kotlin/Kotlin类型系统
  - kotlin/Kotlin与Compose
prerequisites:
  - kotlin/概述与环境配置
---

## 1. 作用域函数对比

| 函数    | 对象引用 | 返回值      | 适用场景     |
| ------- | -------- | ----------- | ------------ |
| `let`   | `it`     | Lambda 结果 | 空检查、转换 |
| `run`   | `this`   | Lambda 结果 | 初始化+计算  |
| `with`  | `this`   | Lambda 结果 | 非空对象操作 |
| `apply` | `this`   | 对象本身    | 对象配置     |
| `also`  | `it`     | 对象本身    | 附加操作     |

```kotlin
val person = Person().apply {
  name = "Alice"
  age = 25
}.also {
  println("Created: $it")
}
```
