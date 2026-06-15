---
order: 101
title: GMP调度模型
module: go
category: 'dev-lang'
difficulty: advanced
description: 'Go GMP调度模型详解：G、M、P结构。'
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与限流
  - go/goroutine与channel通信原理
  - go/并发模式
  - go/反射实现通用函数
prerequisites:
  - go/概述与环境配置
---

## 1. 三个核心概念

| 概念          | 说明                            |
| ------------- | ------------------------------- |
| G (Goroutine) | 协程，用户态轻量级线程          |
| M (Machine)   | 操作系统线程                    |
| P (Processor) | 逻辑处理器，GOMAXPROCS 控制数量 |

## 2. 调度流程

```
1. P 持有本地运行队列（local run queue）
2. M 绑定 P 后从本地队列取 G 执行
3. 本地队列为空时，从全局队列获取
4. 全局队列也为空时，从其他 P 偷取（work stealing）
```

## 3. 调度时机

- `go func()` 创建新 G
- 系统调用（M 阻塞时释放 P）
- channel 操作阻塞
- time.Sleep
- runtime.Gosched() 主动让出
- 函数调用时栈检查点

## 4. GOMAXPROCS

```go
// 设置 P 的数量（默认等于 CPU 核数）
runtime.GOMAXPROCS(4)
```

## 5. work stealing

当 P 的本地队列为空时：

1. 从全局队列获取
2. 从 netpoller 获取
3. 从其他 P 的本地队列偷取一半
