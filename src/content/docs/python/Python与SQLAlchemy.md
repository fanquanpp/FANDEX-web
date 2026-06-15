---
order: 60
title: Python与SQLAlchemy
module: python
category: Python
difficulty: intermediate
description: 'SQLAlchemy ORM'
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与FastAPI
  - python/Python与Django
  - python/控制流
  - python/Python与Celery
prerequisites:
  - python/语法速查
---

## 1. SQLAlchemy 2.0

```python
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

class Base(DeclarativeBase): pass

class User(Base):
  __tablename__ = "users"
  id: Mapped[int] = mapped_column(primary_key=True)
  name: Mapped[str] = mapped_column(String(50))

async with AsyncSession(engine) as session:
  result = await session.execute(select(User).where(User.name == "Alice"))
  user = result.scalar_one()
```
