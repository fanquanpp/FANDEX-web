---
order: 54
title: Hooks原理
module: react
category: React
difficulty: advanced
description: 'React Hooks底层实现原理'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/Concurrent模式
  - react/服务端组件
  - react/自定义Hooks设计模式
  - react/状态管理方案对比
prerequisites:
  - react/概述与环境配置
---

## 1. Hooks 链表

Hooks 在 Fiber 上以链表形式存储：

```
Fiber.memoizedState → Hook1 → Hook2 → Hook3 → ...
每个 Hook 节点：
{
  memoizedState,  // 当前状态
  queue,          // 更新队列
  next,           // 下一个 Hook
}
```

## 2. useState 实现

```javascript
function useState(initialState) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = initialState;
  hook.queue = { pending: null, dispatch: null };
  const dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, hook.queue);
  hook.queue.dispatch = dispatch;
  return [hook.memoizedState, dispatch];
}
```

## 3. useEffect 实现

```javascript
function useEffect(create, deps) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = { create, deps, destroy: undefined };
  currentlyRenderingFiber.flags |= PassiveEffect;
}
```

## 4. Hooks 规则的原因

- **只在顶层调用**：Hooks 按链表顺序匹配，条件调用会破坏顺序
- **只在函数组件中调用**：需要 Fiber 上下文
