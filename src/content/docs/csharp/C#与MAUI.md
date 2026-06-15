---
order: 59
title: 'C#与MAUI'
module: csharp
category: 'C#'
difficulty: intermediate
description: '.NET MAUI跨平台开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - 'csharp/C#与Unity游戏开发'
  - 'csharp/C#与Blazor'
  - 'csharp/C#与EF Core'
  - 'csharp/C#与依赖注入'
prerequisites:
  - csharp/概述与环境配置
---

## 1. MAUI 页面

```xml
<ContentPage>
  <VerticalStackLayout>
    <Label Text="Hello MAUI" />
    <Button Text="Click" Clicked="OnClicked" />
  </VerticalStackLayout>
</ContentPage>
```
