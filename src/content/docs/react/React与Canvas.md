---
order: 73
title: React与Canvas
module: react
category: React
difficulty: intermediate
description: React中Canvas绘图
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React无障碍
  - react/React与PWA
  - react/React与D3
  - react/React与Storybook
prerequisites:
  - react/概述与环境配置
---

## 1. Canvas 组件

```jsx
function Canvas({ draw, width = 800, height = 600 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) draw(ctx);
  }, [draw]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
```

## 2. 动画

```jsx
function AnimatedCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let x = 0;

    function animate() {
      ctx.clearRect(0, 0, 800, 600);
      ctx.fillRect(x, 100, 50, 50);
      x = (x + 2) % 800;
      frameRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
```
