---
order: 50
title: JSX深度解析
module: react
category: React
difficulty: intermediate
description: JSX语法原理与编译过程
author: fanquanpp
updated: '2026-06-14'
related:
  - react/测试与工程化
  - react/Next.js全栈开发
  - react/Fiber架构
  - react/Concurrent模式
prerequisites:
  - react/概述与环境配置
---

## 1. JSX 本质

JSX 是 `React.createElement` 的语法糖：

```jsx
// JSX
const element = <h1 className="title">Hello</h1>;

// 编译后
const element = React.createElement('h1', { className: 'title' }, 'Hello');

// React 17+ 新转换
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', { className: 'title', children: 'Hello' });
```

## 2. JSX 表达式

```jsx
// 变量
const name = 'Alice';
const el = <h1>Hello, {name}</h1>;

// 表达式
const el2 = <div>{2 + 2}</div>;

// 条件渲染
const el3 = <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;

// 列表渲染
const list = items.map((item) => <li key={item.id}>{item.name}</li>);
```

## 3. JSX 规则

| 规则      | 说明                            |
| --------- | ------------------------------- |
| 单根元素  | 必须有一个根元素（或 Fragment） |
| 闭合标签  | `<img />` 必须自闭合            |
| className | 使用 className 而非 class       |
| camelCase | 属性使用驼峰命名                |
| 表达式    | 使用 {} 嵌入表达式              |
| key       | 列表必须提供 key                |
