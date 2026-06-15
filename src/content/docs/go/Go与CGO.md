---
order: 71
title: Go与CGO
module: go
category: Go
difficulty: advanced
description: CGO与C互操作
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与Fuzzing
  - go/Go与性能分析
  - go/Go与Wasm
  - go/Go与代码生成
prerequisites:
  - go/概述与环境配置
---

## 1. CGO

```go
/*
#include <stdio.h>
void say_hello() { printf("Hello from C!\n"); }
*/
import "C"

C.say_hello()
```
