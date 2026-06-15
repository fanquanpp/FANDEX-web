---
order: 86
title: C++正则表达式
module: cpp
category: C++
difficulty: intermediate
description: 'std::regex与正则匹配'
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++数学库
  - cpp/智能指针
  - cpp/C++日期时间
  - cpp/C++格式化输出
prerequisites:
  - cpp/概述与现代标准
---

## 1. 基本用法

```cpp
#include <regex>

std::regex pattern(R"(\d{4}-\d{2}-\d{2})");
std::string text = "Date: 2026-06-14";

std::smatch match;
if (std::regex_search(text, match, pattern)) {
  std::cout << match[0]; // "2026-06-14"
}

// 替换
std::string result = std::regex_replace(text, pattern, "YYYY-MM-DD");
```
