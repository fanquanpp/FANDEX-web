---
order: 75
title: Python与配置管理
module: python
category: Python
difficulty: beginner
description: 配置文件与环境变量
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与加密
  - python/Python与CLI
  - python/装饰器
  - python/Python与消息队列
prerequisites:
  - python/语法速查
---

## 1. pydantic-settings

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  database_url: str = "sqlite:///db.sqlite3"
  secret_key: str
  debug: bool = False

  class Config:
    env_file = ".env"

settings = Settings()
```
