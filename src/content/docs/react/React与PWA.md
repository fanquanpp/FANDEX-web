---
order: 72
title: React与PWA
module: react
category: React
difficulty: intermediate
description: React渐进式Web应用
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与微前端
  - react/React无障碍
  - react/React与Canvas
  - react/React与D3
prerequisites:
  - react/概述与环境配置
---

## 1. Service Worker

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 2. Vite PWA 插件

```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        short_name: 'App',
        icons: [{ src: '/icon.png', sizes: '192x192', type: 'image/png' }],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache', expiration: { maxEntries: 50 } },
          },
        ],
      },
    }),
  ],
};
```
