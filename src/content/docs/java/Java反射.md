---
order: 57
title: Java反射
module: java
category: Java
difficulty: intermediate
description: 反射API与动态代理
author: fanquanpp
updated: '2026-06-14'
related:
  - java/JVM类加载机制
  - java/JVM垃圾回收
  - java/Java序列化
  - java/JavaIO与NIO
prerequisites:
  - java/概述与开发环境
---

## 1. 基本反射

```java
Class<?> clazz = Class.forName("com.example.User");
Method[] methods = clazz.getDeclaredMethods();
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);
```

## 2. 动态代理

```java
interface Service { void execute(); }

Service proxy = (Service) Proxy.newProxyInstance(
  Service.class.getClassLoader(),
  new Class[]{Service.class},
  (obj, method, args) -> {
    System.out.println("Before: " + method.getName());
    Object result = method.invoke(target, args);
    System.out.println("After");
    return result;
  }
);
```
