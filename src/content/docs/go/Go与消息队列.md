---
order: 67
title: Go与消息队列
module: go
category: Go
difficulty: intermediate
description: Kafka与NATS
author: fanquanpp
updated: '2026-06-14'
related:
  - go/Go与数据库
  - go/Go与Redis
  - go/Go与测试
  - go/Go与Fuzzing
prerequisites:
  - go/概述与环境配置
---

## 1. Kafka (confluent-kafka-go)

```go
p, _ := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost:9092"})
p.Produce(&kafka.Message{TopicPartition: kafka.TopicPartition{Topic: &topic}, Value: []byte(msg)}, nil)
```
