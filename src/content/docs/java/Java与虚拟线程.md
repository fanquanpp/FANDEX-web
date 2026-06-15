---
order: 81
title: Java与虚拟线程
module: java
category: Java
difficulty: intermediate
description: 'Project Loom虚拟线程'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与响应式编程
  - java/方法详解
  - java/Java与GraalVM
  - java/Java与Kubernetes
prerequisites:
  - java/概述与开发环境
---

## 1. 虚拟线程（Java 21）

```java
// 创建虚拟线程
Thread.startVirtualThread(() -> doWork());

// ExecutorService
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
  IntStream.range(0, 10000).forEach(i -> {
    executor.submit(() -> {
      Thread.sleep(Duration.ofSeconds(1));
      return i;
    });
  });
}
```

## 2. 虚拟线程 vs 平台线程

| 特性     | 虚拟线程     | 平台线程   |
| -------- | ------------ | ---------- |
| 创建成本 | 极低         | 高         |
| 数量     | 百万级       | 千级       |
| 阻塞     | 不占用OS线程 | 占用OS线程 |
| 适用     | IO密集       | CPU密集    |
