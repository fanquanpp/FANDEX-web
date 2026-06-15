---
order: 53
title: Goroutine调度
module: go
category: Go
difficulty: advanced
description: GMP调度模型
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Map原理
  - go/Channel原理
  - go/Context详解
  - go/接口与类型断言
prerequisites:
  - go/概述与环境配置
---

## 1. GMP 模型

| 概念          | 说明       |
| ------------- | ---------- |
| G (Goroutine) | 协程       |
| M (Machine)   | 系统线程   |
| P (Processor) | 逻辑处理器 |

## 2. 调度策略

- Work Stealing：P 从其他 P 偷 G
- Hand Off：M 阻塞时释放 P
- 抢占式调度：基于信号的抢占（Go 1.14+）
