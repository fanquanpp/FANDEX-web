---
order: 51
title: Fiber架构
module: react
category: React
difficulty: advanced
description: 'React Fiber协调引擎'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/Next.js全栈开发
  - react/JSX深度解析
  - react/Concurrent模式
  - react/服务端组件
prerequisites:
  - react/概述与环境配置
---

## 1. Fiber 概述

Fiber 是 React 16+ 的协调引擎，实现了可中断的异步渲染。

```
Fiber 节点结构：
{
  type,        // 组件类型
  key,         // key
  props,       // 属性
  stateNode,   // 实例/DOM节点
  return,      // 父 Fiber
  child,       // 第一个子 Fiber
  sibling,     // 兄弟 Fiber
  alternate,   // 双缓冲对应 Fiber
  effectTag,   // 副作用标记
  ...
}
```

## 2. 工作循环

```
1. 开始工作循环
2. 执行工作单元（处理 Fiber 节点）
3. 检查是否需要让出主线程
4. 如需要，中断并让出
5. 空闲时继续
6. 所有工作完成后提交
```

## 3. 双缓冲机制

```
current 树（当前屏幕显示） ↔ workInProgress 树（正在构建）
alternate 指针互指
提交时交换根指针
```

## 4. 优先级调度

| 优先级       | 说明                   |
| ------------ | ---------------------- |
| Immediate    | 同步执行               |
| UserBlocking | 用户交互（点击、输入） |
| Normal       | 普通更新               |
| Low          | 数据获取               |
| Idle         | 空闲任务               |
