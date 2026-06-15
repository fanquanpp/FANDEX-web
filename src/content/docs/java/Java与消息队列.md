---
order: 72
title: Java与消息队列
module: java
category: Java
difficulty: intermediate
description: Kafka与RabbitMQ集成
author: fanquanpp
updated: '2026-06-14'
related:
  - java/控制流
  - java/Java与微服务
  - java/Java与Redis
  - java/Java与Docker
prerequisites:
  - java/概述与开发环境
---

## 1. Kafka

```java
@KafkaListener(topics = "orders")
public void handleOrder(OrderEvent event) {
  processOrder(event);
}

kafkaTemplate.send("orders", orderEvent);
```

## 2. RabbitMQ

```java
@RabbitListener(queues = "task-queue")
public void handleTask(Task task) { process(task); }

rabbitTemplate.convertAndSend("task-queue", task);
```
