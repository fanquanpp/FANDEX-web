---
order: 77
title: Go与模板
module: go
category: Go
difficulty: intermediate
description: text/template与html/template
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与配置管理
  - go/Go与日志
  - go/Go与加密
  - go/Go与信号处理
prerequisites:
  - go/概述与环境配置
---

## 1. 模板

```go
tmpl := template.Must(template.New("hello").Parse("Hello, {{.Name}}!"))
tmpl.Execute(os.Stdout, struct{ Name string }{"Alice"})
```
