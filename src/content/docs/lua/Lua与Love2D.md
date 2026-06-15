---
order: 57
title: Lua与Love2D
module: lua
category: Lua
difficulty: intermediate
description: Love2D游戏开发
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua与C交互
  - lua/Lua即时编译器
  - lua/Lua与Neovim
  - lua/Lua与Redis脚本
prerequisites:
  - lua/概述与环境配置
---

## 1. Love2D 基础

```lua
function love.load()
  player = {x = 100, y = 100, speed = 200}
end

function love.update(dt)
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
end

function love.draw()
  love.graphics.rectangle("fill", player.x, player.y, 50, 50)
end
```
