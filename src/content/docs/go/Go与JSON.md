---
order: 83
title: Go与JSON
module: go
category: Go
difficulty: intermediate
description: encoding/json详解
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与正则表达式
  - go/Go与时间
  - go/Go与HTTP客户端
  - go/Go与HTTP服务器
prerequisites:
  - go/概述与环境配置
---

## 1. JSON

```go
type User struct {
  Name  string `json:"name"`
  Age   int    `json:"age"`
  Email string `json:"email,omitempty"`
}

data, _ := json.Marshal(user)
json.Unmarshal(data, &user)

// Decoder（流式）
decoder := json.NewDecoder(r.Body)
decoder.Decode(&user)
```
