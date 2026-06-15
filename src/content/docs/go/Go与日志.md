---
order: 76
title: Go与日志
module: go
category: Go
difficulty: beginner
description: slog与结构化日志
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与依赖注入
  - go/Go与配置管理
  - go/Go与模板
  - go/Go与加密
prerequisites:
  - go/概述与环境配置
---

## 1. slog（Go 1.21+）

```go
import "log/slog"

slog.Info("request processed",
  "method", r.Method,
  "path", r.URL.Path,
  "duration", elapsed,
)
```
