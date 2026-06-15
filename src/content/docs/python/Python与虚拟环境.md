---
order: 84
title: Python与虚拟环境
module: python
category: Python
difficulty: beginner
description: venv、conda与环境管理
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与打包发布
  - python/Python与Jupyter
  - python/Python与代码质量
  - python/并发编程
prerequisites:
  - python/语法速查
---

## 1. venv

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

## 2. uv（现代替代）

```bash
uv venv
uv pip install fastapi
uv pip compile requirements.in -o requirements.txt
```
