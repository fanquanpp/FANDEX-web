---
order: 76
title: Python与消息队列
module: python
category: Python
difficulty: intermediate
description: RabbitMQ与Kafka
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与配置管理
  - python/装饰器
  - python/Python与gRPC
  - python/Python与WebSocket
prerequisites:
  - python/语法速查
---

## 1. Kafka

```python
from kafka import KafkaProducer, KafkaConsumer

producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('topic', b'message')

consumer = KafkaConsumer('topic', bootstrap_servers='localhost:9092')
for msg in consumer:
  print(msg.value)
```
