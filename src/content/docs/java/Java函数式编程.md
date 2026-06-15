---
order: 66
title: Java函数式编程
module: java
category: Java
difficulty: intermediate
description: Lambda、Stream与函数式接口
author: fanquanpp
updated: '2026-06-14'
related:
  - java/SpringBoot数据访问
  - java/Java设计模式
  - java/Java网络编程
  - java/Java日志系统
prerequisites:
  - java/概述与开发环境
---

## 1. 函数式接口

```java
@FunctionalInterface
interface Transformer<T, R> { R transform(T input); }

// 内置
Function<T, R>       // T → R
Consumer<T>          // T → void
Supplier<T>          // () → T
Predicate<T>         // T → boolean
BiFunction<T, U, R>  // (T, U) → R
```

## 2. Stream API

```java
List<String> names = users.stream()
  .filter(u -> u.getAge() > 18)
  .map(User::getName)
  .sorted()
  .collect(Collectors.toList());

// 并行流
long count = list.parallelStream().filter(x -> x > 0).count();
```
