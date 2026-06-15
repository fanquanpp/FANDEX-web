---
order: 59
title: Lua与Redis脚本
module: lua
category: Lua
difficulty: intermediate
description: 'Redis Lua脚本'
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua与Love2D
  - lua/Lua与Neovim
  - lua/Lua与Nginx
  - lua/模块与包
prerequisites:
  - lua/概述与环境配置
---

## 1. Redis Lua

```lua
-- 限流脚本
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = tonumber(redis.call('GET', key) or '0')
if current >= limit then
  return 0
end
redis.call('INCR', key)
redis.call('EXPIRE', key, window)
return 1
```
