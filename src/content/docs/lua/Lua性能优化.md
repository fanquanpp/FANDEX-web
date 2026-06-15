---
order: 64
title: Lua性能优化
module: lua
category: Lua
difficulty: intermediate
description: Lua性能优化技巧
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua迭代器
  - 'lua/Lua与World of Warcraft'
  - lua/Lua调试技巧
  - lua/协程与异步
prerequisites:
  - lua/概述与环境配置
---

## 1. 优化技巧

- 使用局部变量代替全局变量
- 预分配表大小
- 避免在热路径创建闭包
- 使用 `table.insert` 的位置参数
- 字符串拼接使用 `table.concat`
- 使用 LuaJIT 获得更好性能
