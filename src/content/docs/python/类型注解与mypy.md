---
order: 105
title: 类型注解与mypy
module: python
category: 'dev-lang'
difficulty: advanced
description: Python类型注解与mypy静态检查详解。
author: fanquanpp
updated: '2026-06-14'
related:
  - python/元类与单例模式
  - python/异步编程详解
  - python/数据类与字段默认值
  - python/描述符
prerequisites:
  - python/语法速查
---

## 1. 基本类型注解

```python
def greet(name: str, age: int = 0) -> str:
    return f"Hello, {name}! You are {age}."

# 变量注解
x: int = 42
names: list[str] = ["Alice", "Bob"]
scores: dict[str, float] = {"Alice": 95.0}
```

## 2. 高级类型

```python
from typing import Optional, Union, Literal, Callable, TypeVar, Generic

# Optional
def find(id: int) -> Optional[User]: ...

# Union
def process(data: Union[str, bytes]) -> None: ...

# Literal
def set_mode(mode: Literal["read", "write"]) -> None: ...

# Callable
def apply(fn: Callable[[int], str], value: int) -> str: ...

# 泛型
T = TypeVar('T')
class Stack(Generic[T]):
    def push(self, item: T) -> None: ...
    def pop(self) -> T: ...
```

## 3. mypy 使用

```bash
pip install mypy
mypy src/
mypy src/ --strict
```

## 4. pyproject.toml 配置

```toml
[tool.mypy]
python_version = "3.12"
strict = true
disallow_untyped_defs = true
warn_return_any = true
```
