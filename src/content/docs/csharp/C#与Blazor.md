---
order: 58
title: 'C#与Blazor'
module: csharp
category: 'C#'
difficulty: intermediate
description: 'Blazor WebAssembly与Server'
author: fanquanpp
updated: '2026-06-14'
related:
  - csharp/源生成器
  - 'csharp/C#与Unity游戏开发'
  - 'csharp/C#与MAUI'
  - 'csharp/C#与EF Core'
prerequisites:
  - csharp/概述与环境配置
---

## 1. Blazor 组件

```razor
@page "/counter"
<h1>Counter: @count</h1>
<button @onclick="Increment">Click</button>

@code {
  private int count = 0;
  private void Increment() => count++;
}
```
