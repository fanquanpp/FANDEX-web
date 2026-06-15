---
order: 55
title: JVM垃圾回收
module: java
category: Java
difficulty: advanced
description: GC算法与垃圾回收器
author: fanquanpp
updated: '2026-06-14'
related:
  - java/JUC并发包
  - java/JVM类加载机制
  - java/Java反射
  - java/Java序列化
prerequisites:
  - java/概述与开发环境
---

## 1. GC 算法

| 算法      | 说明               |
| --------- | ------------------ |
| 标记-清除 | 产生碎片           |
| 标记-整理 | 无碎片，但移动开销 |
| 复制算法  | 无碎片，但空间浪费 |
| 分代收集  | 结合以上算法       |

## 2. 垃圾回收器

| 回收器     | 说明     | 适用场景   |
| ---------- | -------- | ---------- |
| Serial     | 单线程   | 客户端     |
| Parallel   | 多线程   | 吞吐量优先 |
| CMS        | 低停顿   | 已废弃     |
| G1         | 分区收集 | 服务端默认 |
| ZGC        | 超低延迟 | 大内存     |
| Shenandoah | 低延迟   | 大内存     |
