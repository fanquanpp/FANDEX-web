---
order: 73
title: Go与代码生成
module: go
category: Go
difficulty: intermediate
description: 'go generate与代码生成'
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与CGO
  - go/Go与Wasm
  - go/Go与依赖注入
  - go/Go与配置管理
prerequisites:
  - go/概述与环境配置
---

## 1. go generate

```go
//go:generate go run github.com/sqlc-dev/sqlc/cmd/sqlc generate
//go:generate mockgen -source=service.go -destination=mock/service.go
```

```bash
go generate ./...
```
