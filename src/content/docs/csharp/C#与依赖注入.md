---
order: 61
title: 'C#与依赖注入'
module: csharp
category: 'C#'
difficulty: intermediate
description: .NET依赖注入容器
author: fanquanpp
updated: '2026-06-14'
related:
  - 'csharp/C#与MAUI'
  - 'csharp/C#与EF Core'
  - 'csharp/C#与最小API'
  - 'csharp/C#12与C#13新特性'
prerequisites:
  - csharp/概述与环境配置
---

## 1. 注册与使用

```csharp
// 注册
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<ICache, MemoryCache>();

// 使用
public class UserController {
  private readonly IUserService _service;
  public UserController(IUserService service) => _service = service;
}
```
