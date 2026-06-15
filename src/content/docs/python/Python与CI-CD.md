---
order: 79
title: 'Python与CI-CD'
module: python
category: Python
difficulty: intermediate
description: Python项目CI/CD
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与gRPC
  - python/Python与WebSocket
  - python/Python与性能优化
  - python/内置数据结构
prerequisites:
  - python/语法速查
---

## 1. GitHub Actions

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r requirements.txt
      - run: pytest
      - run: ruff check .
```
