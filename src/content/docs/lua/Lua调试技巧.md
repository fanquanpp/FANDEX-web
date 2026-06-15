---
order: 65
title: Lua调试技巧
module: lua
category: Lua
difficulty: intermediate
description: 调试与性能分析
author: fanquanpp
updated: '2026-06-14'
related:
  - 'lua/Lua与World of Warcraft'
  - lua/Lua性能优化
  - lua/协程与异步
  - lua/标准库详解
prerequisites:
  - lua/概述与环境配置
---

## 1. 调试

```lua
-- debug 库
debug.traceback()
debug.getinfo(func)
debug.sethook(callback, "l")  -- 行钩子

-- 简单性能分析
local start = os.clock()
doWork()
print(string.format("耗时: %.3fs", os.clock() - start))
```
