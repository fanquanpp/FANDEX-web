# 01-性能优化 | Performance Optimization
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: 01-性能优化 | Performance Optimization
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [性能优化概述 | Performance Optimization Overview](#性能优化概述-|-performance-optimization-overview)
 False2. [渲染性能优化 | Rendering Performance Optimization](#渲染性能优化-|-rendering-performance-optimization)
 False3. [响应式性能优化 | Reactive Performance Optimization](#响应式性能优化-|-reactive-performance-optimization)
 False4. [网络性能优化 | Network Performance Optimization](#网络性能优化-|-network-performance-optimization)
 False5. [构建优化 | Build Optimization](#构建优化-|-build-optimization)
 False6. [性能监控与分析 | Performance Monitoring and Analysis](#性能监控与分析-|-performance-monitoring-and-analysis)
 False7. [最佳实践 | Best Practices](#最佳实践-|-best-practices)
 False8. [示例 | Examples](#示例-|-examples)
 False9. [小结 | Summary](#小结-|-summary)
 False
 False---
 False
 False## 1. 性能优化概述 | Performance Optimization Overview
 False
 FalseVue3 应用的性能优化是开发过程中的重要环节，它直接影响用户体验和应用的可扩展性。Vue3 本身已经做了很多性能优化，但在实际开发中，我们仍然需要注意一些性能问题，以确保应用的流畅运行。
 False
 False### 1.1 性能优化的重要性
 False
 False- **用户体验**：性能好的应用能够提供更流畅的交互体验
 False- **SEO 友好**：性能好的应用加载速度快，有利于搜索引擎优化
 False- **可扩展性**：性能好的应用能够更好地处理复杂的业务逻辑
 False- **服务器成本**：性能好的应用可以减少服务器的负载和成本
 False
 False### 1.2 Vue3 的性能优势
 False
 False- **虚拟 DOM 重写**：Vue3 的虚拟 DOM 实现更加高效
 False- **编译器优化**：Vue3 的编译器能够生成更高效的渲染代码
 False- **响应式系统优化**：Vue3 使用 Proxy 替代 Object.defineProperty，提供更高效的响应式能力
 False- **Tree-shaking**：Vue3 支持 Tree-shaking，减少了打包体积
 False
 False## 2. 渲染性能优化 | Rendering Performance Optimization
 False
 False### 2.1 使用 v-memo
 False
 False`v-memo` 指令可以缓存计算结果，避免不必要的渲染：
 False
```vue
 True<template>
 True <div v-memo="[value]">
 True {{ heavyComputation(value) }}
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst value = ref(0)
 True
 Trueconst heavyComputation = (value) => {
 True // 模拟 heavy computation
 True let result = 0
 True for (let i = 0; i < 1000000; i++) {
 True result += i
 True }
 True return result + value
 True}
 True</script>
 True```

 False### 2.2 使用 v-once
 False
 False`v-once` 指令可以让元素只渲染一次，适用于静态内容：
 False
```vue
 True<template>
 True <div v-once>
 True {{ staticContent }}
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst staticContent = ref('This content will only be rendered once')
 True</script>
 True```

 False### 2.3 使用 keep-alive
 False
 False`keep-alive` 组件可以缓存组件的状态，避免重复渲染：
 False
```vue
 True<template>
 True <keep-alive>
 True <component :is="currentComponent"></component>
 True </keep-alive>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 Trueimport ComponentA from './ComponentA.vue'
 Trueimport ComponentB from './ComponentB.vue'
 True
 Trueconst currentComponent = ref('ComponentA')
 True</script>
 True```

 False### 2.4 避免在模板中使用复杂表达式
 False
 False在模板中使用复杂表达式会影响渲染性能，应该使用计算属性：
 False
```vue
 True<template>
 True <div>
 True <!-- 不推荐 -->
 True <p>{{ users.filter(user => user.age > 18).map(user => user.name).join(', ') }}</p>
 True 
 True <!-- 推荐 -->
 True <p>{{ adultUserNames }}</p>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, computed } from 'vue'
 True
 Trueconst users = ref([
 True { name: 'John', age: 20 },
 True { name: 'Jane', age: 17 },
 True { name: 'Bob', age: 25 }
 True])
 True
 Trueconst adultUserNames = computed(() => {
 True return users.value
 True .filter(user => user.age > 18)
 True .map(user => user.name)
 True .join(', ')
 True})
 True</script>
 True```

 False### 2.5 使用虚拟滚动
 False
 False对于大量数据的列表，使用虚拟滚动可以提高性能：
 False
```vue
 True<template>
 True <div class="list-container" style="height: 400px; overflow: auto;">
 True <virtual-list
 True :data-key="'id'"
 True :data-sources="items"
 True :data-component="'item'"
 True :estimate-size="50"
 True >
 True <template v-slot:item="{ source }">
 True <div class="item">
 True {{ source.name }}
 True </div>
 True </template>
 True </virtual-list>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 Trueimport VirtualList from 'vue-virtual-scroller'
 True
 Trueconst items = ref(
 True Array.from({ length: 10000 }, (_, i) => ({
 True id: i,
 True name: `Item ${i}`
 True }))
 True)
 True</script>
 True```

 False## 3. 响应式性能优化 | Reactive Performance Optimization
 False
 False### 3.1 使用 shallowRef 和 shallowReactive
 False
 False对于大型对象或不需要深度响应的数据，使用 `shallowRef` 和 `shallowReactive` 可以减少响应式开销：
 False
```vue
 True<template>
 True <div>
 True <p>{{ user.name }}</p>
 True <button @click="updateUser">Update User</button>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { shallowRef } from 'vue'
 True
 Trueconst user = shallowRef({
 True name: 'John',
 True age: 30,
 True address: {
 True street: '123 Main St',
 True city: 'New York'
 True }
 True})
 True
 Trueconst updateUser = () => {
 True // 直接替换整个对象
 True user.value = {
 True name: 'Jane',
 True age: 25,
 True address: {
 True street: '456 Elm St',
 True city: 'Boston'
 True }
 True }
 True}
 True</script>
 True```

 False### 3.2 使用 markRaw
 False
 False对于不需要响应式的数据，使用 `markRaw` 可以避免将其转换为响应式对象：
 False
```vue
 True<template>
 True <div>
 True <p>{{ config.apiUrl }}</p>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { markRaw } from 'vue'
 True
 True// 配置对象不需要响应式
 Trueconst config = markRaw({
 True apiUrl: 'https://api.example.com',
 True timeout: 5000
 True})
 True</script>
 True```

 False### 3.3 合理使用 computed
 False
 False计算属性会缓存计算结果，避免重复计算：
 False
```vue
 True<template>
 True <div>
 True <p>Total: {{ total }}</p>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, computed } from 'vue'
 True
 Trueconst items = ref([1, 2, 3, 4, 5])
 True
 True// 使用计算属性缓存计算结果
 Trueconst total = computed(() => {
 True console.log('Computing total...')
 True return items.value.reduce((sum, item) => sum + item, 0)
 True})
 True</script>
 True```

 False### 3.4 避免频繁修改响应式数据
 False
 False频繁修改响应式数据会触发多次渲染，应该批量修改：
 False
```vue
 True<template>
 True <div>
 True <p>Count: {{ count }}</p>
 True <p>Message: {{ message }}</p>
 True <button @click="updateData">Update Data</button>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst count = ref(0)
 Trueconst message = ref('Hello')
 True
 True// 批量修改数据，只触发一次渲染
 Trueconst updateData = () => {
 True count.value = 1
 True message.value = 'Hi'
 True}
 True</script>
 True```

 False## 4. 网络性能优化 | Network Performance Optimization
 False
 False### 4.1 代码分割
 False
 False使用动态导入实现代码分割，减少初始加载时间：
 False
```vue
 True<template>
 True <div>
 True <button @click="loadComponent">Load Component</button>
 True <component v-if="dynamicComponent" :is="dynamicComponent" />
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst dynamicComponent = ref(null)
 True
 Trueconst loadComponent = async () => {
 True const { default: Component } = await import('./HeavyComponent.vue')
 True dynamicComponent.value = Component
 True}
 True</script>
 True```

 False### 4.2 资源预加载
 False
 False使用 `rel="preload"` 预加载重要资源：
 False
```html
 True<!-- 在 index.html 中 -->
 True<link rel="preload" href="/api/data" as="fetch" crossorigin>
 True<link rel="preload" href="/images/hero.jpg" as="image">
 True```

 False### 4.3 缓存策略
 False
 False使用 HTTP 缓存和本地缓存减少网络请求：
 False
```vue
 True<template>
 True <div>
 True <div v-if="loading">Loading...</div>
 True <div v-else>{{ data }}</div>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, onMounted } from 'vue'
 True
 Trueconst data = ref(null)
 Trueconst loading = ref(true)
 True
 TrueonMounted(async () => {
 True // 检查本地缓存
 True const cachedData = localStorage.getItem('apiData')
 True if (cachedData) {
 True data.value = JSON.parse(cachedData)
 True loading.value = false
 True return
 True }
 True 
 True // 从服务器获取数据
 True const response = await fetch('/api/data')
 True const result = await response.json()
 True data.value = result
 True loading.value = false
 True 
 True // 缓存数据
 True localStorage.setItem('apiData', JSON.stringify(result))
 True})
 True</script>
 True```

 False### 4.4 减少 HTTP 请求
 False
 False合并请求，减少 HTTP 请求数量：
 False
```javascript
 True// 不推荐
 Truefetch('/api/user')
 Truefetch('/api/posts')
 Truefetch('/api/comments')
 True
 True// 推荐
 Truefetch('/api/batch', {
 True method: 'POST',
 True body: JSON.stringify({
 True requests: [
 True { path: '/user' },
 True { path: '/posts' },
 True { path: '/comments' }
 True ]
 True })
 True})
 True```

 False## 5. 构建优化 | Build Optimization
 False
 False### 5.1 代码压缩
 False
 False使用 Vite 或 Webpack 进行代码压缩：
 False
```javascript
 True// vite.config.js
 Trueimport { defineConfig } from 'vite'
 Trueimport vue from '@vitejs/plugin-vue'
 True
 Trueexport default defineConfig({
 True plugins: [vue()],
 True build: {
 True minify: 'terser',
 True terserOptions: {
 True compress: {
 True drop_console: true,
 True drop_debugger: true
 True }
 True }
 True }
 True})
 True```

 False### 5.2 树摇 (Tree-shaking)
 False
 False使用 ES 模块，利用 Tree-shaking 减少打包体积：
 False
```javascript
 True// 不推荐
 Trueimport * as lodash from 'lodash'
 True
 True// 推荐
 Trueimport { debounce, throttle } from 'lodash'
 True```

 False### 5.3 懒加载
 False
 False使用动态导入实现组件和路由的懒加载：
 False
```javascript
 True// router/index.js
 Trueimport { createRouter, createWebHistory } from 'vue-router'
 True
 Trueconst routes = [
 True {
 True path: '/',
 True component: () => import('../views/Home.vue')
 True },
 True {
 True path: '/about',
 True component: () => import('../views/About.vue')
 True }
 True]
 True
 Trueconst router = createRouter({
 True history: createWebHistory(),
 True routes
 True})
 True
 Trueexport default router
 True```

 False### 5.4 资源优化
 False
 False优化图片和其他静态资源：
 False
 False- 使用适当的图片格式（WebP、AVIF）
 False- 压缩图片
 False- 使用 CDN 加速静态资源
 False- 配置浏览器缓存
 False
 False## 6. 性能监控与分析 | Performance Monitoring and Analysis
 False
 False### 6.1 使用 Vue DevTools
 False
 FalseVue DevTools 可以帮助你分析组件的渲染性能：
 False
 False- **组件面板**：查看组件的状态和属性
 False- **性能面板**：分析组件的渲染时间
 False- **事件面板**：查看事件的触发和处理
 False
 False### 6.2 使用浏览器开发者工具
 False
 False浏览器开发者工具可以帮助你分析网络请求和页面性能：
 False
 False- **Network 面板**：分析网络请求的时间和大小
 False- **Performance 面板**：分析页面的渲染性能
 False- **Memory 面板**：分析内存使用情况
 False
 False### 6.3 使用第三方工具
 False
 False使用第三方工具进行性能监控：
 False
 False- **Lighthouse**：分析页面的性能、可访问性和 SEO
 False- **WebPageTest**：测试页面的加载性能
 False- **New Relic**：监控应用的性能和错误
 False
 False## 7. 最佳实践 | Best Practices
 False
 False### 7.1 组件设计
 False
 False- **拆分组件**：将大型组件拆分为小型、可复用的组件
 False- **合理使用 props**：只传递必要的 props，避免过度传递
 False- **使用 slots**：使用 slots 提高组件的灵活性
 False- **避免过度使用 watch**：优先使用 computed
 False
 False### 7.2 状态管理
 False
 False- **合理使用状态管理**：只在必要时使用 Pinia 或 Vuex
 False- **避免过度使用全局状态**：优先使用组件级状态
 False- **使用模块化**：将状态管理按功能模块划分
 False
 False### 7.3 代码组织
 False
 False- **合理组织代码**：按功能和模块组织代码
 False- **使用 TypeScript**：提高代码的可维护性和类型安全性
 False- **遵循代码规范**：使用 ESLint 和 Prettier 保持代码风格一致
 False
 False### 7.4 性能预算
 False
 False- **设置性能预算**：为应用的加载时间、资源大小等设置预算
 False- **监控性能指标**：定期监控应用的性能指标
 False- **持续优化**：不断优化应用的性能
 False
 False## 8. 示例 | Examples
 False
 False### 8.1 优化前
 False
```vue
 True<template>
 True <div>
 True <h2>User List</h2>
 True <ul>
 True <li v-for="user in users" :key="user.id">
 True <div>
 True <h3>{{ user.name }}</h3>
 True <p>{{ user.email }}</p>
 True <p>{{ formatDate(user.createdAt) }}</p>
 True </div>
 True </li>
 True </ul>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst users = ref(
 True Array.from({ length: 1000 }, (_, i) => ({
 True id: i,
 True name: `User ${i}`,
 True email: `user${i}@example.com`,
 True createdAt: new Date()
 True }))
 True)
 True
 Trueconst formatDate = (date) => {
 True return date.toLocaleString()
 True}
 True</script>
 True```

 False### 8.2 优化后
 False
```vue
 True<template>
 True <div>
 True <h2>User List</h2>
 True <ul>
 True <li v-for="user in users" :key="user.id">
 True <div>
 True <h3>{{ user.name }}</h3>
 True <p>{{ user.email }}</p>
 True <p>{{ user.formattedCreatedAt }}</p>
 True </div>
 True </li>
 True </ul>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, computed } from 'vue'
 True
 Trueconst users = ref(
 True Array.from({ length: 1000 }, (_, i) => ({
 True id: i,
 True name: `User ${i}`,
 True email: `user${i}@example.com`,
 True createdAt: new Date(),
 True formattedCreatedAt: new Date().toLocaleString()
 True }))
 True)
 True</script>
 True```

 False## 9. 小结 | Summary
 False
 FalseVue3 应用的性能优化是一个持续的过程，需要从多个方面入手，包括渲染性能、响应式性能、网络性能和构建优化等。通过本章节的学习，你已经了解了 Vue3 应用性能优化的基本方法和最佳实践。
 False
 False在实际开发中，要根据应用的具体情况，选择合适的优化策略，同时要定期监控应用的性能，不断优化和改进。只有这样，才能构建出性能优异、用户体验良好的 Vue3 应用。
 False