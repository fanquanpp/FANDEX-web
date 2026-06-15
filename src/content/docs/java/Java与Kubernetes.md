---
order: 83
title: Java与Kubernetes
module: java
category: Java
difficulty: intermediate
description: Java云原生部署
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与虚拟线程
  - java/Java与GraalVM
  - java/Java记录类
  - java/Java文本块
prerequisites:
  - java/概述与开发环境
---

## 1. Kubernetes 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: myapp }
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: myapp
          image: myapp:latest
          resources:
            requests: { memory: '512Mi', cpu: '500m' }
            limits: { memory: '1Gi', cpu: '1000m' }
```

## 2. 健康检查

```java
@RestController
class HealthController {
  @GetMapping("/actuator/health")
  Map<String, String> health() { return Map.of("status", "UP"); }
}
```
