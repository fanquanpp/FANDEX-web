---
order: 59
title: JavaIO与NIO
module: java
category: Java
difficulty: intermediate
description: BIO、NIO与AIO
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java反射
  - java/Java序列化
  - java/Java新特性
  - java/运算符与表达式
prerequisites:
  - java/概述与开发环境
---

## 1. BIO vs NIO vs AIO

| 模型 | 说明                          |
| ---- | ----------------------------- |
| BIO  | 同步阻塞，一个连接一个线程    |
| NIO  | 同步非阻塞，Selector 多路复用 |
| AIO  | 异步非阻塞，回调通知          |

## 2. NIO 核心

```java
// Buffer
ByteBuffer buf = ByteBuffer.allocate(1024);
buf.put(data);
buf.flip();
buf.get();

// Channel
FileChannel channel = FileChannel.open(path, StandardOpenOption.READ);

// Selector
Selector selector = Selector.open();
channel.register(selector, SelectionKey.OP_READ);
```
