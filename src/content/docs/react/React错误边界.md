---
order: 58
title: React错误边界
module: react
category: React
difficulty: intermediate
description: 错误边界与异常处理
author: fanquanpp
updated: '2026-06-14'
related:
  - react/状态管理方案对比
  - react/React性能优化
  - react/React表单处理
  - react/React与TypeScript
prerequisites:
  - react/概述与环境配置
---

## 1. 错误边界组件

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 2. 使用

```jsx
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```

## 3. 限制

- 只捕获子组件的渲染错误
- 不捕获事件处理错误
- 不捕获异步错误
- 不捕获服务端渲染错误
