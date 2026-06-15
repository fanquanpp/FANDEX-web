---
order: 64
title: React动画
module: react
category: React
difficulty: intermediate
description: React动画实现方案
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React路由进阶
  - react/React国际化
  - react/React服务端渲染
  - react/React设计模式
prerequisites:
  - react/概述与环境配置
---

## 1. CSS Transitions

```jsx
function FadeIn({ children, show }) {
  return <div className={`fade ${show ? 'show' : ''}`}>{children}</div>;
}
```

## 2. Framer Motion

```jsx
import { motion, AnimatePresence } from 'framer-motion';

function List({ items }) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {item.name}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
```

## 3. React Transition Group

```jsx
import { CSSTransition } from 'react-transition-group';

<CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
  <div>Content</div>
</CSSTransition>;
```
