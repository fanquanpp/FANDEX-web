---
order: 62
title: SpringBoot进阶
module: java
category: Java
difficulty: intermediate
description: SpringBoot高级特性
author: fanquanpp
updated: '2026-06-14'
related:
  - java/运算符与表达式
  - java/Spring基础
  - java/SpringBoot安全
  - java/SpringBoot数据访问
prerequisites:
  - java/概述与开发环境
---

## 1. 自动配置

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration { }
```

## 2. 自定义 Starter

```
my-spring-boot-starter/
├── autoconfigure/
│   └── MyAutoConfiguration.java
├── starter/
└── pom.xml
```
