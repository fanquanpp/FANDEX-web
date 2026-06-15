---
order: 54
title: Vue3编译优化
module: vue3
category: Vue3
difficulty: advanced
description: 编译时优化与运行时优化
author: fanquanpp
updated: '2026-06-14'
related:
  - vue3/自定义指令进阶
  - vue3/Transition与动画
  - vue3/Vue3服务端渲染
  - vue3/生命周期钩子
prerequisites:
  - vue3/语法速查
---

## 1. 静态提升

```javascript
// 模板中的静态节点会被提升到渲染函数外
const _hoisted_1 = createStaticVNode('<div class="static">静态内容</div>');

function render() {
  return createVNode('div', null, [_hoisted_1, dynamicContent]);
}
```

## 2. 预字符串化

连续的静态节点会被合并为一个字符串：

```javascript
const _hoisted_1 = createStaticVNode('<div><span>a</span><span>b</span></div>', 2);
```

## 3. PatchFlag

```javascript
// 动态节点标记
createVNode('div', { class: _ctx.className }, null, PatchFlags.CLASS);
// PatchFlags: TEXT=1, CLASS=2, STYLE=4, PROPS=8, ...
```

## 4. Block Tree

```javascript
// v-if/v-for 会创建 Block，收集动态子节点
// diff 时只遍历动态节点，跳过静态节点
```

## 5. 缓存事件处理程序

```javascript
// 缓存内联事件处理器
const _cache = getCache();
return createVNode('button', { onClick: _cache[0] || (_cache[0] = ($event) => count.value++) });
```

## 6. Tree Shaking

Vue 3 的运行时支持 Tree Shaking，未使用的 API 不会打包：

```javascript
// 只导入需要的 API
import { ref, computed, watch } from 'vue';
// v-model, v-for 等编译器特性按需引入
```
