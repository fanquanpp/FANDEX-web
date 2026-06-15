---
order: 59
title: unsafe与指针
module: go
category: Go
difficulty: advanced
description: unsafe包与指针操作
author: fanquanpp
updated: '2026-06-14'
related:
  - go/错误处理进阶
  - go/反射
  - go/内存对齐
  - go/Go与gRPC
prerequisites:
  - go/概述与环境配置
---

## 1. unsafe 操作

```go
import "unsafe"

// 获取偏移量
offset := unsafe.Offsetof(struct{}.Field)

// 指针转换
ptr := unsafe.Pointer(&x)
*(*int)(ptr) = 42

// SliceHeader
hdr := (*reflect.SliceHeader)(unsafe.Pointer(&slice))
```
