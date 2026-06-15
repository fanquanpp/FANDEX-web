---
order: 55
title: Span与Memory
module: csharp
category: 'C#'
difficulty: advanced
description: 零分配内存操作
author: fanquanpp
updated: '2026-06-14'
related:
  - csharp/记录类型
  - csharp/泛型与协变逆变
  - csharp/源生成器
  - 'csharp/C#与Unity游戏开发'
prerequisites:
  - csharp/概述与环境配置
---

## 1. Span<T>

```csharp
Span<int> span = stackalloc int[100];
span[0] = 42;

// 切片
Span<int> slice = span[10..20];

// 不需要 unsafe 的指针操作
void Process(Span<byte> buffer) {
  for (int i = 0; i < buffer.Length; i++)
    buffer[i] = (byte)(buffer[i] * 2);
}
```

## 2. Memory<T>

```csharp
// 可以存储在堆上，跨 async 边界
Memory<byte> memory = new byte[1024];
await ProcessAsync(memory);
```
