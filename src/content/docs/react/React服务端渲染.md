---
order: 65
title: React服务端渲染
module: react
category: React
difficulty: intermediate
description: 'Next.js SSR/SSG/ISR'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React国际化
  - react/React动画
  - react/React设计模式
  - react/React与WebAssembly
prerequisites:
  - react/概述与环境配置
---

## 1. Next.js 渲染模式

| 模式 | 说明         | 适用场景 |
| ---- | ------------ | -------- |
| SSR  | 每次请求渲染 | 动态内容 |
| SSG  | 构建时渲染   | 静态内容 |
| ISR  | 增量静态再生 | 周期更新 |
| CSR  | 客户端渲染   | 交互密集 |

## 2. App Router (Next.js 13+)

```tsx
// app/page.tsx — Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}

// app/page.tsx — Client Component
('use client');
import { useState } from 'react';
export default function Page() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

## 3. 数据获取

```tsx
// Server Component 直接 fetch
async function Posts() {
  const posts = await fetch('/api/posts', { cache: 'no-store' });
  return <PostList posts={posts} />;
}

// 静态生成
async function StaticPage() {
  const data = await fetch('/api/data', { next: { revalidate: 3600 } }); // ISR
  return <div>{data}</div>;
}
```
