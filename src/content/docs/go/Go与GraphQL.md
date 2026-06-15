---
order: 62
title: Go与GraphQL
module: go
category: Go
difficulty: intermediate
description: 'gqlgen GraphQL框架'
author: fanquanpp
updated: '2026-06-14'
related:
  - go/内存对齐
  - go/Go与gRPC
  - go/Go与Docker
  - go/Go与Kubernetes
prerequisites:
  - go/概述与环境配置
---

## 1. gqlgen

```go
//go:generate go run github.com/99designs/gqlgen generate

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
  return r.userService.GetAll(ctx)
}
```
