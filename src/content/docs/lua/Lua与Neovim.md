---
order: 58
title: Lua与Neovim
module: lua
category: Lua
difficulty: intermediate
description: 'Neovim Lua配置'
author: fanquanpp
updated: '2026-06-14'
related:
  - lua/Lua即时编译器
  - lua/Lua与Love2D
  - lua/Lua与Redis脚本
  - lua/Lua与Nginx
prerequisites:
  - lua/概述与环境配置
---

## 1. Neovim 配置

```lua
-- init.lua
vim.opt.number = true
vim.opt.relativenumber = true

vim.keymap.set('n', '<leader>f', vim.lsp.buf.format, { desc = 'Format' })

-- 插件管理 (lazy.nvim)
require('lazy').setup({
  'nvim-treesitter/nvim-treesitter',
  'neovim/nvim-lspconfig',
})
```
