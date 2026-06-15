---
order: 105
title: 垃圾回收与GC调优
module: go
category: 'dev-lang'
difficulty: advanced
description: Go垃圾回收与GC调优详解：并发标记清除。
author: fanquanpp
updated: '2026-06-14'
related:
  - go/反射实现通用函数
  - go/内存逃逸分析
  - go/泛型详解
  - go/单元测试与基准测试
prerequisites:
  - go/概述与环境配置
---

## 1. GC 算法

Go 使用**并发三色标记清除**算法：

- 三色标记：白（待回收）、灰（待扫描）、黑（存活）
- 并发执行：GC 与用户代码并发运行
- 写屏障：保证并发标记的正确性

## 2. GC 调优参数

```bash
# GOGC：堆增长比例（默认 100）
# 堆大小达到上次 GC 后存活大小的 2 倍时触发 GC
GOGC=200 ./myapp

# GOMEMLIMIT：内存上限
GOMEMLIMIT=1GiB ./myapp
```

## 3. GC 调优策略

### 3.1 减少 GC 压力

- 减少堆分配（使用栈分配）
- 对象复用（sync.Pool）
- 预分配容器大小

### 3.2 GOGC 调整

```
GOGC=100  → 堆翻倍时 GC（默认，平衡吞吐和延迟）
GOGC=200  → 堆 3 倍时 GC（减少 GC 频率，增加吞吐）
GOGC=50   → 堆 1.5 倍时 GC（增加 GC 频率，减少延迟）
```

## 4. GC 监控

```go
var stats debug.GCStats
debug.ReadGCStats(&stats)
fmt.Printf("GC pauses: %v\n", stats.PauseTotal)
```

```bash
GODEBUG=gctrace=1 ./myapp
```
