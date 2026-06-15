---
order: 79
title: Go与信号处理
module: go
category: Go
difficulty: intermediate
description: 信号处理与优雅关闭
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与模板
  - go/Go与加密
  - go/Go与文件监控
  - go/Go与正则表达式
prerequisites:
  - go/概述与环境配置
---

## 1. 优雅关闭

```go
sigChan := make(chan os.Signal, 1)
signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

<-sigChan
log.Println("Shutting down...")
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
server.Shutdown(ctx)
```
