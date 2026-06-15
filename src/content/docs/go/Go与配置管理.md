---
order: 75
title: Go与配置管理
module: go
category: Go
difficulty: intermediate
description: Viper与配置
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与代码生成
  - go/Go与依赖注入
  - go/Go与日志
  - go/Go与模板
prerequisites:
  - go/概述与环境配置
---

## 1. Viper

```go
viper.SetConfigName("config")
viper.AddConfigPath(".")
viper.ReadInConfig()

dbURL := viper.GetString("database.url")
port := viper.GetInt("server.port")
```
