---
order: 84
title: Java记录类
module: java
category: Java
difficulty: intermediate
description: Record类与密封接口
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与GraalVM
  - java/Java与Kubernetes
  - java/Java文本块
  - java/Java模块系统
prerequisites:
  - java/概述与开发环境
---

## 1. Record 类（Java 16+）

```java
public record Point(int x, int y) {
  // 自动生成：构造器、getter、equals、hashCode、toString
  public Point { // 紧凑构造器
    if (x < 0 || y < 0) throw new IllegalArgumentException();
  }
}

var p = new Point(3, 4);
p.x(); // 3
```

## 2. 密封接口（Java 17+）

```java
public sealed interface Expr permits Add, Mul, Val {}
public record Add(Expr left, Expr right) implements Expr {}
public record Mul(Expr left, Expr right) implements Expr {}
public record Val(int value) implements Expr {}
```
