---
order: 66
title: React设计模式
module: react
category: React
difficulty: intermediate
description: React组件设计模式
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React动画
  - react/React服务端渲染
  - react/React与WebAssembly
  - react/React与WebSocket
prerequisites:
  - react/概述与环境配置
---

## 1. Compound Components

```jsx
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, { active: i === activeIndex, onClick: () => setActiveIndex(i) })
  );
}

<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
</Tabs>;
```

## 2. Render Props

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return render(position);
}
```

## 3. HOC（高阶组件）

```jsx
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const user = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}
```
