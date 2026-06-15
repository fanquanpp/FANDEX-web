---
order: 81
title: Python与设计模式
module: python
category: Python
difficulty: intermediate
description: Python实现设计模式
author: fanquanpp
updated: '2026-06-14'
related:
  - python/内置数据结构
  - python/正则表达式
  - python/Python与打包发布
  - python/Python与Jupyter
prerequisites:
  - python/语法速查
---

## 1. 常用模式

```python
# 单例
class Singleton:
  _instance = None
  def __new__(cls):
    if cls._instance is None:
      cls._instance = super().__new__(cls)
    return cls._instance

# 策略模式
class Sorter:
  def __init__(self, strategy): self.strategy = strategy
  def sort(self, data): return self.strategy(data)

# 观察者
class Observable:
  def __init__(self): self._observers = []
  def subscribe(self, obs): self._observers.append(obs)
  def notify(self, event):
    for obs in self._observers: obs(event)
```
