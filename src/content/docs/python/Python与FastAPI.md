---
order: 58
title: Python与FastAPI
module: python
category: Python
difficulty: intermediate
description: FastAPI框架开发
author: fanquanpp
updated: '2026-06-14'
related:
  - python/多进程与多线程
  - python/数据类与Pydantic
  - python/Python与Django
  - python/Python与SQLAlchemy
prerequisites:
  - python/语法速查
---

## 1. FastAPI 基础

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
async def get_user(user_id: int) -> User:
  return await user_service.get(user_id)

@app.post("/users")
async def create_user(user: UserCreate) -> User:
  return await user_service.create(user)
```
