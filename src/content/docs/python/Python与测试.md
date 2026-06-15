---
order: 71
title: Python与测试
module: python
category: Python
difficulty: intermediate
description: pytest与测试最佳实践
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与自动化
  - python/函数详解
  - python/Python与日志
  - python/Python与加密
prerequisites:
  - python/语法速查
---

## 1. pytest

```python
import pytest

@pytest.fixture
def user():
  return User(name="Alice", age=25)

def test_user_name(user):
  assert user.name == "Alice"

@pytest.mark.parametrize("input,expected", [
  (1, 2), (2, 4), (3, 6)
])
def test_double(input, expected):
  assert input * 2 == expected
```
