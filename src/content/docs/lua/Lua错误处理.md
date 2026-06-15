---
order: 61
title: Lua错误处理
module: lua
category: Lua
difficulty: beginner
description: 错误处理与保护调用
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua与Nginx
  - lua/模块与包
  - lua/Lua迭代器
  - 'lua/Lua与World of Warcraft'
prerequisites:
  - lua/概述与环境配置
---

## 1. 错误处理

```lua
-- pcall
local ok, result = pcall(function()
  return riskyOperation()
end)
if not ok then
  print("Error:", result)
end

-- xpcall（带错误处理函数）
local ok, result = xpcall(riskyFn, debug.traceback)
```
