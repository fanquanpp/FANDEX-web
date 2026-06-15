---
order: 88
title: Go与分布式追踪
module: go
category: Go
difficulty: advanced
description: OpenTelemetry集成
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与中间件
  - go/Go与OAuth2
  - go/Go与限流
  - go/goroutine与channel通信原理
prerequisites:
  - go/概述与环境配置
---

## 1. OpenTelemetry

```go
import "go.opentelemetry.io/otel"

ctx, span := otel.Tracer("app").Start(ctx, "process")
defer span.End()
// ... 业务逻辑
span.SetAttributes(attribute.String("key", "value"))
```
