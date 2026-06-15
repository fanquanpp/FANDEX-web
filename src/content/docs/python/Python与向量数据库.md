---
order: 89
title: Python与向量数据库
module: python
category: Python
difficulty: advanced
description: 向量搜索与RAG
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与OAuth2
  - 'python/Python与WebSocket-2'
  - python/Python进阶与最新特性
  - python/推导式与生成器
prerequisites:
  - python/语法速查
---

## 1. ChromaDB

```python
import chromadb

client = chromadb.PersistentClient()
collection = client.get_or_create_collection("docs")

collection.add(documents=["Hello world"], ids=["1"])
results = collection.query(query_texts=["Hi"], n_results=5)
```
