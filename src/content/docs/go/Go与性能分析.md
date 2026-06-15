---
order: 70
title: Go与性能分析
module: go
category: Go
difficulty: advanced
description: pprof与性能调优
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与测试
  - go/Go与Fuzzing
  - go/Go与CGO
  - go/Go与Wasm
prerequisites:
  - go/概述与环境配置
---

## 1. pprof

```go
import _ "net/http/pprof"

go http.ListenAndServe(":6060", nil)
```

```bash
go tool pprof http://localhost:6060/debug/pprof/profile
go tool pprof http://localhost:6060/debug/pprof/heap
```
