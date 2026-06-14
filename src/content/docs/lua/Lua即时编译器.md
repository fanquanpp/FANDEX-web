---
order: 56
title: 'LuaJIT'
module: 'lua'
category: 'Lua'
difficulty: 'advanced'
description: 'LuaJIT与FFI'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. FFI

```lua
local ffi = require("ffi")

ffi.cdef[[
  int printf(const char *fmt, ...);
]]

ffi.C.printf("Hello from C!\n")
```
