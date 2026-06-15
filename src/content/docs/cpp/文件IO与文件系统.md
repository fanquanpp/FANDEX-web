---
order: 63
title: 文件IO与文件系统
module: cpp
category: C++
difficulty: intermediate
description: '文件操作与std::filesystem'
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/STL算法详解
  - cpp/字符串处理
  - cpp/异常安全
  - cpp/多线程与并发
prerequisites:
  - cpp/概述与现代标准
---

## 1. 文件流

```cpp
std::ifstream in("input.txt");
std::ofstream out("output.txt");
std::string line;
while (std::getline(in, line)) {
  out << line << "\n";
}
```

## 2. std::filesystem（C++17）

```cpp
#include <filesystem>
namespace fs = std::filesystem;

fs::path p = "/usr/local/bin";
p / "app";                        // 路径拼接
fs::exists(p);                     // 是否存在
fs::is_directory(p);               // 是否目录
fs::file_size(p);                  // 文件大小
fs::create_directories("a/b/c");   // 创建目录
fs::copy("src", "dst", fs::copy_options::recursive);
```
