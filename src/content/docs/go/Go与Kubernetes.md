---
order: 64
title: Go与Kubernetes
module: go
category: Go
difficulty: advanced
description: 'client-go与K8s开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与GraphQL
  - go/Go与Docker
  - go/Go与数据库
  - go/Go与Redis
prerequisites:
  - go/概述与环境配置
---

## 1. client-go

```go
config, _ := rest.InClusterConfig()
clientset, _ := kubernetes.NewForConfig(config)

pods, _ := clientset.CoreV1().Pods("default").List(ctx, metav1.ListOptions{})
for _, pod := range pods.Items {
  fmt.Println(pod.Name)
}
```
