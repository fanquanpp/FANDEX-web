---
order: 87
title: Python与OAuth2
module: python
category: Python
difficulty: intermediate
description: OAuth2与JWT认证
author: fanquanpp
updated: '2026-06-14'
related:
  - python/并发编程
  - python/Python与数据库迁移
  - 'python/Python与WebSocket-2'
  - python/Python与向量数据库
prerequisites:
  - python/语法速查
---

## 1. FastAPI OAuth2

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
  return decode_jwt(token)
```
