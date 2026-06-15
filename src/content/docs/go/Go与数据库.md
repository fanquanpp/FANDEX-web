---
order: 65
title: Go与数据库
module: go
category: Go
difficulty: intermediate
description: database/sql与GORM
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与Docker
  - go/Go与Kubernetes
  - go/Go与Redis
  - go/Go与消息队列
prerequisites:
  - go/概述与环境配置
---

## 1. database/sql

```go
db, _ := sql.Open("postgres", connStr)
row := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = $1", id)
var name string
row.Scan(&name)
```

## 2. GORM

```go
var user User
db.First(&user, 1)
db.Where("age > ?", 18).Find(&users)
```
