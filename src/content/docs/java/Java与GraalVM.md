---
order: 82
title: Java与GraalVM
module: java
category: Java
difficulty: advanced
description: GraalVM原生镜像
author: fanquanpp
updated: '2026-06-14'
related:
  - java/方法详解
  - java/Java与虚拟线程
  - java/Java与Kubernetes
  - java/Java记录类
prerequisites:
  - java/概述与开发环境
---

## 1. Native Image

```bash
native-image -jar myapp.jar
./myapp # 毫秒级启动
```

## 2. Spring Boot Native

```bash
mvn -Pnative native:compile
```

## 3. 限制

- 反射需要配置
- 动态代理需要配置
- JNI 有限制
- 类加载受限
