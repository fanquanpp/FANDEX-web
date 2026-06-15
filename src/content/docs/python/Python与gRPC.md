---
order: 77
title: Python与gRPC
module: python
category: Python
difficulty: intermediate
description: gRPC服务开发
author: fanquanpp
updated: '2026-06-14'
related:
  - python/装饰器
  - python/Python与消息队列
  - python/Python与WebSocket
  - 'python/Python与CI-CD'
prerequisites:
  - python/语法速查
---

## 1. gRPC

```python
import grpc

class GreeterServicer(greeter_pb2_grpc.GreeterServicer):
  def SayHello(self, request, context):
    return greeter_pb2.HelloReply(message=f"Hello, {request.name}!")

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
greeter_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
server.add_insecure_port('[::]:50051')
server.start()
```
