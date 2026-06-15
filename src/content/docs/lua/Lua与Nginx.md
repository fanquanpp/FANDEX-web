---
order: 60
title: Lua与Nginx
module: lua
category: Lua
difficulty: intermediate
description: 'OpenResty Lua开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua与Neovim
  - lua/Lua与Redis脚本
  - lua/模块与包
  - lua/Lua错误处理
prerequisites:
  - lua/概述与环境配置
---

## 1. OpenResty

```lua
-- access_by_lua_block
local token = ngx.var.http_authorization
if not token then
  ngx.exit(401)
end

-- content_by_lua_block
ngx.say('{"status":"ok"}')
```
