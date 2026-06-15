---
order: 77
title: React与Monorepo
module: react
category: React
difficulty: advanced
description: 'React Monorepo架构'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与Storybook
  - 'react/React与CI-CD'
  - 'react/React-Compiler自动记忆化'
  - 'react/Server-Components与Client-Components'
prerequisites:
  - react/概述与环境配置
---

## 1. 项目结构

```
monorepo/
├── packages/
│   ├── ui/          # 共享组件库
│   ├── utils/       # 工具函数
│   ├── app-web/     # Web 应用
│   └── app-admin/   # 管理后台
├── package.json
└── pnpm-workspace.yaml
```

## 2. pnpm workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

## 3. 共享组件

```json
// packages/app-web/package.json
{
  "dependencies": {
    "@myorg/ui": "workspace:*"
  }
}
```
