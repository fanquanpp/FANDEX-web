---
order: 86
title: Java模块系统
module: java
category: Java
difficulty: advanced
description: JPMS模块系统
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java记录类
  - java/Java文本块
  - java/Java与数据库连接
  - java/Java新特性与生态
prerequisites:
  - java/概述与开发环境
---

## 1. module-info.java

```java
module com.example.app {
  requires java.sql;
  requires transitive com.example.api;
  exports com.example.app.service;
  opens com.example.app.model to com.fasterxml.jackson.databind;
}
```
