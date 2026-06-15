---
order: 59
title: RAII与资源管理
module: cpp
category: C++
difficulty: intermediate
description: 资源获取即初始化模式
author: fanquanpp
updated: '2026-06-14'
related:
  - cpp/C++20模块
  - cpp/C++23与C++26新特性
  - cpp/运算符重载
  - cpp/面向对象基础
prerequisites:
  - cpp/概述与现代标准
---

## 1. RAII 原则

```cpp
class FileHandle {
  FILE* file_;
public:
  FileHandle(const char* path, const char* mode)
    : file_(fopen(path, mode)) {
    if (!file_) throw std::runtime_error("Cannot open file");
  }
  ~FileHandle() { if (file_) fclose(file_); }

  // 禁止拷贝
  FileHandle(const FileHandle&) = delete;
  FileHandle& operator=(const FileHandle&) = delete;

  // 允许移动
  FileHandle(FileHandle&& other) noexcept : file_(other.file_) { other.file_ = nullptr; }

  FILE* get() const { return file_; }
};
```

## 2. 标准库 RAII 类

| 类                | 资源       |
| ----------------- | ---------- |
| `std::string`     | 字符缓冲区 |
| `std::vector`     | 动态数组   |
| `std::unique_ptr` | 堆对象     |
| `std::shared_ptr` | 共享堆对象 |
| `std::lock_guard` | 互斥锁     |
| `std::fstream`    | 文件       |
