---
order: 69
title: Go与Fuzzing
module: go
category: Go
difficulty: intermediate
description: Go模糊测试
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与消息队列
  - go/Go与测试
  - go/Go与性能分析
  - go/Go与CGO
prerequisites:
  - go/概述与环境配置
---

## 1. Fuzzing

```go
func FuzzReverse(f *testing.F) {
  f.Add("hello")
  f.Fuzz(func(t *testing.T, orig string) {
    rev := reverse(orig)
    if reverse(rev) != orig {
      t.Errorf("reverse(reverse(%q)) = %q", orig, reverse(rev))
    }
  })
}
```
