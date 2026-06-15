---
order: 68
title: Go与测试
module: go
category: Go
difficulty: intermediate
description: Go测试框架与基准测试
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与Redis
  - go/Go与消息队列
  - go/Go与Fuzzing
  - go/Go与性能分析
prerequisites:
  - go/概述与环境配置
---

## 1. 测试

```go
func TestAdd(t *testing.T) {
  if add(1, 2) != 3 { t.Error("expected 3") }
}

func BenchmarkAdd(b *testing.B) {
  for i := 0; i < b.N; i++ { add(1, 2) }
}

// 表驱动测试
func TestParse(t *testing.T) {
  tests := []struct{ input, expected string }{
    {"hello", "HELLO"},
    {"world", "WORLD"},
  }
  for _, tt := range tests {
    if got := parse(tt.input); got != tt.expected {
      t.Errorf("parse(%q) = %q, want %q", tt.input, got, tt.expected)
    }
  }
}
```
