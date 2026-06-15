---
order: 106
title: 分代ZGC详解
module: java
category: 'dev-lang'
difficulty: advanced
description: 'JDK 21分代ZGC详解：原理、配置与调优。'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/反射与动态代理
  - java/注解处理器
  - java/面向对象编程
  - java/抽象类与接口
prerequisites:
  - java/概述与开发环境
---

## 1. ZGC 概述

ZGC（Z Garbage Collector）是低延迟垃圾收集器，目标停顿时间 < 1ms。

### 1.1 核心技术

- 着色指针（Colored Pointers）
- 读屏障（Load Barrier）
- 并发整理（Concurrent Compaction）

## 2. 分代 ZGC（JDK 21）

### 2.1 为什么分代

- 大多数对象朝生夕死（弱分代假说）
- 分代可以更频繁地回收新生代
- 减少全堆扫描的开销

### 2.2 启用

```bash
java -XX:+UseZGC -XX:+ZGenerational -jar app.jar
```

## 3. 配置参数

```bash
-XX:+UseZGC              # 启用 ZGC
-XX:+ZGenerational       # 启用分代模式
-XX:ZAllocationSpikeTolerance=2  # 分配峰值容忍度
-XX:SoftMaxHeapSize=1g   # 软最大堆大小
-XX:ConcGCThreads=4      # 并发 GC 线程数
```

## 4. 适用场景

- 要求极低延迟（< 10ms 停顿）
- 大堆内存（TB 级别）
- 实时交易系统
- 在线游戏服务器
