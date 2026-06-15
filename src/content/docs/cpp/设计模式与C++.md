---
order: 70
title: 设计模式与C++
module: cpp
category: C++
difficulty: intermediate
description: C++实现常见设计模式
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/constexpr与编译期计算
  - cpp/命名空间与链接
  - cpp/面向对象进阶
  - cpp/C++内存模型
prerequisites:
  - cpp/概述与现代标准
---

## 1. 单例模式

```cpp
class Singleton {
public:
  static Singleton& instance() {
    static Singleton inst;
    return inst;
  }
  Singleton(const Singleton&) = delete;
  Singleton& operator=(const Singleton&) = delete;
private:
  Singleton() = default;
};
```

## 2. 观察者模式

```cpp
class Observable {
  std::vector<std::function<void()>> observers_;
public:
  void subscribe(std::function<void()> obs) { observers_.push_back(std::move(obs)); }
  void notify() { for (auto& obs : observers_) obs(); }
};
```
