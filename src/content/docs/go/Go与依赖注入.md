---
order: 74
title: Go与依赖注入
module: go
category: Go
difficulty: intermediate
description: Wire与依赖注入
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与Wasm
  - go/Go与代码生成
  - go/Go与配置管理
  - go/Go与日志
prerequisites:
  - go/概述与环境配置
---

## 1. Wire

```go
//go:build wireinject

func InitializeApp() (*App, error) {
  wire.Build(
    NewDB,
    NewRepository,
    NewService,
    NewHandler,
    wire.Struct(new(App), "*"),
  )
  return nil, nil
}
```
