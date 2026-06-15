---
order: 71
title: React无障碍
module: react
category: React
difficulty: intermediate
description: React应用可访问性
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与GraphQL
  - react/React与微前端
  - react/React与PWA
  - react/React与Canvas
prerequisites:
  - react/概述与环境配置
---

## 1. ARIA 属性

```jsx
function Modal({ isOpen, onClose, children }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose} aria-label="关闭对话框">
        X
      </button>
    </div>
  );
}
```

## 2. 键盘导航

```jsx
function Menu({ items }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        setActiveIndex((i) => (i + 1) % items.length);
        break;
      case 'ArrowUp':
        setActiveIndex((i) => (i - 1 + items.length) % items.length);
        break;
      case 'Enter':
        items[activeIndex]?.onSelect();
        break;
    }
  };

  return (
    <ul role="menu" onKeyDown={handleKeyDown}>
      {items.map((item, i) => (
        <li key={i} role="menuitem" aria-selected={i === activeIndex}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```
