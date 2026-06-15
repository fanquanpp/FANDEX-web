---
order: 63
title: 'Lua与World of Warcraft'
module: lua
category: Lua
difficulty: intermediate
description: WoW插件开发
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua错误处理
  - lua/Lua迭代器
  - lua/Lua性能优化
  - lua/Lua调试技巧
prerequisites:
  - lua/概述与环境配置
---

## 1. WoW 插件

```lua
-- MyAddon.toc
## Title: My Addon
## Interface: 100205

-- MyAddon.lua
local frame = CreateFrame("Frame")
frame:RegisterEvent("PLAYER_ENTERING_WORLD")
frame:SetScript("OnEvent", function(self, event)
  print("Hello, " .. UnitName("player"))
end)
```
