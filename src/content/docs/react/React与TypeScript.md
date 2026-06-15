---
order: 60
title: React与TypeScript
module: react
category: React
difficulty: intermediate
description: 'React TypeScript最佳实践'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React错误边界
  - react/React表单处理
  - react/React测试
  - react/React路由进阶
prerequisites:
  - react/概述与环境配置
---

## 1. 组件类型

```tsx
interface Props {
  name: string;
  age?: number;
  onClick: (id: string) => void;
  children: React.ReactNode;
}

const MyComponent: React.FC<Props> = ({ name, age, onClick, children }) => {
  return (
    <div onClick={() => onClick('1')}>
      {name} {children}
    </div>
  );
};
```

## 2. Hook 类型

```tsx
const [count, setCount] = useState<number>(0);
const inputRef = useRef<HTMLInputElement>(null);
const theme = useContext<Theme>(ThemeContext);
```

## 3. 事件类型

```tsx
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {};
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {};
const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {};
```

## 4. 泛型组件

```tsx
function List<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode }) {
  return <ul>{items.map(render)}</ul>;
}
```
