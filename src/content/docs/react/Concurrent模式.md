---
order: 52
title: Concurrent模式
module: react
category: React
difficulty: advanced
description: 并发渲染与Suspense集成
author: fanquanpp
updated: '2026-06-14'
related:
  - react/JSX深度解析
  - react/Fiber架构
  - react/服务端组件
  - react/Hooks原理
prerequisites:
  - react/概述与环境配置
---

## 1. 并发渲染

```jsx
// useTransition — 标记非紧急更新
const [isPending, startTransition] = useTransition();

function handleChange(e) {
  // 紧急更新：输入框立即响应
  setInputValue(e.target.value);

  // 非紧急更新：搜索结果可延迟
  startTransition(() => {
    setSearchQuery(e.target.value);
  });
}
```

## 2. useDeferredValue

```jsx
// 延迟值的更新
const deferredQuery = useDeferredValue(searchQuery);

// deferredQuery 会延迟更新，让紧急更新优先
const results = useMemo(() => search(deferredQuery), [deferredQuery]);
```

## 3. Suspense 与并发

```jsx
<Suspense fallback={<Loading />}>
  <ConcurrentComponent />
</Suspense>
```

## 4. 流式 SSR

```jsx
// React 18 流式 SSR
renderToPipeableStream(<App />, {
  onShellReady() {
    pipe(res);
  },
});
```
