---
order: 74
title: Python与CLI
module: python
category: Python
difficulty: intermediate
description: Click与命令行工具
author: fanquanpp
updated: '2026-06-14'
related:
  - python/Python与日志
  - python/Python与加密
  - python/Python与配置管理
  - python/装饰器
prerequisites:
  - python/语法速查
---

## 1. Click

```python
import click

@click.command()
@click.option('--name', '-n', required=True, help='Your name')
@click.option('--count', default=1, type=int)
def hello(name, count):
  for _ in range(count):
    click.echo(f'Hello, {name}!')

if __name__ == '__main__':
  hello()
```
