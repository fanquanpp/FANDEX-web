---
order: 60
title: Java新特性
module: java
category: Java
difficulty: intermediate
description: 'Java 17-21新特性'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java序列化
  - java/JavaIO与NIO
  - java/运算符与表达式
  - java/Spring基础
prerequisites:
  - java/概述与开发环境
---

## 1. Record（Java 16）

```java
public record Point(int x, int y) {}
```

## 2. Sealed Classes（Java 17）

```java
public sealed interface Shape permits Circle, Rectangle {}
public record Circle(double radius) implements Shape {}
public record Rectangle(double w, double h) implements Shape {}
```

## 3. Pattern Matching（Java 21）

```java
if (obj instanceof String s && s.length() > 5) {
  System.out.println(s.toUpperCase());
}

switch (shape) {
  case Circle(var r) -> Math.PI * r * r;
  case Rectangle(var w, var h) -> w * h;
}
```

## 4. Virtual Threads（Java 21）

```java
Thread.startVirtualThread(() -> doWork());
```
