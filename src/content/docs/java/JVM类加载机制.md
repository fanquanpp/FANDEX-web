---
order: 54
title: JVM类加载机制
module: java
category: Java
difficulty: advanced
description: 类加载器与双亲委派
author: fanquanpp
updated: '2026-06-14'
related:
  - java/并发编程基础
  - java/JUC并发包
  - java/JVM垃圾回收
  - java/Java反射
prerequisites:
  - java/概述与开发环境
---

## 1. 类加载过程

加载 → 验证 → 准备 → 解析 → 初始化

## 2. 双亲委派

```
Bootstrap ClassLoader（rt.jar）
  ↑
Extension ClassLoader（ext目录）
  ↑
Application ClassLoader（classpath）
  ↑
自定义 ClassLoader
```

## 3. 打破双亲委派

```java
class CustomClassLoader extends ClassLoader {
  @Override
  protected Class<?> findClass(String name) {
    byte[] classData = loadClassData(name);
    return defineClass(name, classData, 0, classData.length);
  }
}
```
