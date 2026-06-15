---
order: 61
title: Python与Celery
module: python
category: Python
difficulty: intermediate
description: Celery异步任务队列
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与SQLAlchemy
  - python/控制流
  - python/Python与Docker
  - python/Python与Redis
prerequisites:
  - python/语法速查
---

## 1. Celery 配置

```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379')

@app.task
def process_data(data_id):
  data = fetch_data(data_id)
  return transform(data)

# 调用
result = process_data.delay(42)
result.get(timeout=30)
```
