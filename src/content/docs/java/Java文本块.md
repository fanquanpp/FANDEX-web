---
order: 85
title: Java文本块
module: java
category: Java
difficulty: beginner
description: 文本块与字符串模板
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与Kubernetes
  - java/Java记录类
  - java/Java模块系统
  - java/Java与数据库连接
prerequisites:
  - java/概述与开发环境
---

## 1. 文本块（Java 15+）

```java
String json = """
  {
    "name": "Alice",
    "age": 25
  }
  """;
```

## 2. 字符串模板（Java 21 Preview）

```java
String msg = STR."Hello \{name}, age \{age}";
```
