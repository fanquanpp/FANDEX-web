---
order: 61
title: Spring基础
module: java
category: Java
difficulty: intermediate
description: Spring框架核心概念
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java新特性
  - java/运算符与表达式
  - java/SpringBoot进阶
  - java/SpringBoot安全
prerequisites:
  - java/概述与开发环境
---

## 1. IoC 容器

```java
@Service
public class UserService {
  @Autowired
  private UserRepository repo;
}
```

## 2. AOP

```java
@Aspect
@Component
public class LoggingAspect {
  @Around("@annotation(Loggable)")
  public Object log(ProceedingJoinPoint pjp) throws Throwable {
    log.info("Before: {}", pjp.getSignature());
    Object result = pjp.proceed();
    log.info("After");
    return result;
  }
}
```
