---
order: 58
title: Java序列化
module: java
category: Java
difficulty: intermediate
description: 序列化与反序列化
author: fanquanpp
updated: '2026-06-14'
related:
  - java/JVM垃圾回收
  - java/Java反射
  - java/JavaIO与NIO
  - java/Java新特性
prerequisites:
  - java/概述与开发环境
---

## 1. Serializable

```java
public class User implements Serializable {
  private static final long serialVersionUID = 1L;
  private String name;
  private transient String password; // 不序列化
}
```

## 2. 替代方案

| 方案                | 优点         |
| ------------------- | ------------ |
| JSON (Jackson/Gson) | 可读、跨语言 |
| Protocol Buffers    | 高效、跨语言 |
| Kryo                | Java 高性能  |
| Avro                | Schema 演化  |
