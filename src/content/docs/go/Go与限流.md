---
order: 89
title: Go与限流
module: go
category: Go
difficulty: intermediate
description: 限流与熔断
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与OAuth2
  - go/Go与分布式追踪
  - go/goroutine与channel通信原理
  - go/GMP调度模型
prerequisites:
  - go/概述与环境配置
---

## 1. 限流

```go
import "golang.org/x/time/rate"

limiter := rate.NewLimiter(100, 10) // 100/s, burst 10
if !limiter.Allow() {
  http.Error(w, "Too Many Requests", 429)
  return
}
```
