---
order: 86
title: Go与中间件
module: go
category: Go
difficulty: intermediate
description: HTTP中间件模式
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与HTTP客户端
  - go/Go与HTTP服务器
  - go/Go与OAuth2
  - go/Go与分布式追踪
prerequisites:
  - go/概述与环境配置
---

## 1. 中间件

```go
func Logging(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    next.ServeHTTP(w, r)
    log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
  })
}

// 链式
handler := Logging(Auth(Recovery(mux)))
```
