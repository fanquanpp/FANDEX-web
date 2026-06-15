---
order: 54
title: 协程与asyncio
module: python
category: Python
difficulty: intermediate
description: async/await与异步IO
author: fanquanpp
updated: '2026-06-14'
related:
  - python/元类
  - python/描述符协议
  - python/多进程与多线程
  - python/数据类与Pydantic
prerequisites:
  - python/语法速查
---

## 1. async/await

```python
import asyncio

async def fetch_data(url):
  async with aiohttp.ClientSession() as session:
    async with session.get(url) as response:
      return await response.json()

async def main():
  results = await asyncio.gather(
    fetch_data(url1),
    fetch_data(url2)
  )

asyncio.run(main())
```
