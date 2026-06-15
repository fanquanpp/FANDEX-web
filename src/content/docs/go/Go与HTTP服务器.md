---
order: 85
title: Go与HTTP服务器
module: go
category: Go
difficulty: intermediate
description: net/http与路由
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与JSON
  - go/Go与HTTP客户端
  - go/Go与中间件
  - go/Go与OAuth2
prerequisites:
  - go/概述与环境配置
---

## 1. HTTP 服务器

```go
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
  id := r.PathValue("id")
  json.NewEncoder(w).Encode(getUser(id))
})

http.ListenAndServe(":8080", mux)
```
