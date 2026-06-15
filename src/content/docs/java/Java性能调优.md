---
order: 76
title: Java性能调优
module: java
category: Java
difficulty: advanced
description: Java应用性能优化
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与Docker
  - java/Java与GraphQL
  - java/Java与AI
  - java/Java与安全
prerequisites:
  - java/概述与开发环境
---

## 1. 性能分析工具

```bash
jvisualvm     # 可视化监控
async-profiler # CPU/内存分析
JFR           # Java Flight Recorder
```

## 2. 常见优化

- 使用 StringBuilder 代替字符串拼接
- 使用基本类型代替包装类
- 合理设置线程池大小
- 使用缓存减少重复计算
- 选择合适的 GC 算法
