---
order: 68
title: Java日志系统
module: java
category: Java
difficulty: intermediate
description: SLF4J、Logback与日志框架
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java函数式编程
  - java/Java网络编程
  - java/Java单元测试
  - java/Java构建工具
prerequisites:
  - java/概述与开发环境
---

## 1. SLF4J + Logback

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("User {} logged in", userId);
logger.error("Error processing", exception);
```

## 2. logback.xml

```xml
<configuration>
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder><pattern>%d{HH:mm:ss} [%thread] %-5level %logger - %msg%n</pattern></encoder>
  </appender>
  <root level="INFO"><appender-ref ref="STDOUT"/></root>
</configuration>
```
