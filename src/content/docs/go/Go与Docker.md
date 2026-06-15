---
order: 63
title: Go与Docker
module: go
category: Go
difficulty: intermediate
description: Go容器化与多阶段构建
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与gRPC
  - go/Go与GraphQL
  - go/Go与Kubernetes
  - go/Go与数据库
prerequisites:
  - go/概述与环境配置
---

## 1. 多阶段构建

```dockerfile
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /server .

FROM alpine:3.19
COPY --from=builder /server /server
ENTRYPOINT ["/server"]
```
