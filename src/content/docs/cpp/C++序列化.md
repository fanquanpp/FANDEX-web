---
order: 76
title: C++序列化
module: cpp
category: C++
difficulty: intermediate
description: 序列化与反序列化
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++与Python交互
  - cpp/C++性能优化
  - cpp/C++网络编程
  - cpp/C++图形编程
prerequisites:
  - cpp/概述与现代标准
---

## 1. JSON 序列化

```cpp
#include <nlohmann/json.hpp>

struct User {
  std::string name;
  int age;
};

// 序列化
nlohmann::json j = {{"name", user.name}, {"age", user.age}};
std::string json_str = j.dump();

// 反序列化
auto j2 = nlohmann::json::parse(json_str);
User u2 = j2.get<User>();
```
