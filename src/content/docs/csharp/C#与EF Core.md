---
order: 60
title: 'C#与EF Core'
module: csharp
category: 'C#'
difficulty: intermediate
description: 'Entity Framework Core'
author: fanquanpp
updated: '2026-06-14'
related:
  - 'csharp/C#与Blazor'
  - 'csharp/C#与MAUI'
  - 'csharp/C#与依赖注入'
  - 'csharp/C#与最小API'
prerequisites:
  - csharp/概述与环境配置
---

## 1. DbContext

```csharp
public class AppDbContext : DbContext {
  public DbSet<User> Users => Set<User>();
  protected override void OnConfiguring(DbContextOptionsBuilder options) =>
    options.UseSqlite("Data Source=app.db");
}

// 使用
await using var db = new AppDbContext();
var users = await db.Users.Where(u => u.Age > 18).ToListAsync();
```
