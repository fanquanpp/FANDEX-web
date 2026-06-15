---
order: 72
title: Python与日志
module: python
category: Python
difficulty: beginner
description: logging模块与日志配置
author: fanquanpp
updated: '2026-06-14'
related:
  - python/函数详解
  - python/Python与测试
  - python/Python与加密
  - python/Python与CLI
prerequisites:
  - python/语法速查
---

## 1. logging

```python
import logging

logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)

logger = logging.getLogger(__name__)
logger.info("Processing started")
logger.error("Something went wrong", exc_info=True)
```
