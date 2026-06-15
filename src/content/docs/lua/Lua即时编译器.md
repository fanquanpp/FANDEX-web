---
order: 56
title: LuaJIT
module: lua
category: Lua
difficulty: advanced
description: LuaJIT与FFI
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/字符串模式匹配
  - lua/Lua与C交互
  - lua/Lua与Love2D
  - lua/Lua与Neovim
prerequisites:
  - lua/概述与环境配置
---

## 1. FFI

```lua
local ffi = require("ffi")

ffi.cdef[[
  int printf(const char *fmt, ...);
]]

ffi.C.printf("Hello from C!\n")
```
