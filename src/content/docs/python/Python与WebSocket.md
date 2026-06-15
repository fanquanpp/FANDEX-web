---
order: 78
title: Python与WebSocket
module: python
category: Python
difficulty: intermediate
description: WebSocket实时通信
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与消息队列
  - python/Python与gRPC
  - 'python/Python与CI-CD'
  - python/Python与性能优化
prerequisites:
  - python/语法速查
---

## 1. FastAPI WebSocket

```python
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
  await websocket.accept()
  while True:
    data = await websocket.receive_text()
    await websocket.send_text(f"Echo: {data}")
```
