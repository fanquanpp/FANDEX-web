---
order: 72
title: Go与Wasm
module: go
category: Go
difficulty: advanced
description: Go编译为WebAssembly
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与性能分析
  - go/Go与CGO
  - go/Go与代码生成
  - go/Go与依赖注入
prerequisites:
  - go/概述与环境配置
---

## 1. 编译

```bash
GOOS=js GOARCH=wasm go build -o main.wasm
```

## 2. 与 JavaScript 交互

```go
import "syscall/js"

js.Global().Get("console").Call("log", "Hello from Go!")
```
