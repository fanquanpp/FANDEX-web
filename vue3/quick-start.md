# Vue3 快速入门指南
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: Vue3 快速入门指南
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [环境搭建](#环境搭建)
 False2. [项目结构](#项目结构)
 False3. [第一个 Vue3 应用](#第一个-vue3-应用)
 False4. [核心概念快速了解](#核心概念快速了解)
 False5. [路由与状态管理](#路由与状态管理)
 False6. [构建与部署](#构建与部署)
 False7. [学习资源](#学习资源)
 False8. [快速开发提示](#快速开发提示)
 False
 False---
 False
 False## 1. 环境搭建
 False
 False### 1.1 安装 Node.js
 False
 FalseVue3 项目需要 Node.js 环境，推荐安装最新的 LTS 版本：
 False
 False- 访问 [Node.js 官网](https://nodejs.org/)
 False- 下载并安装适合你操作系统的 LTS 版本
 False- 安装完成后，在终端运行以下命令验证：
 False
 ```bash
 True node -v
 True npm -v
 True ```

 False### 1.2 安装 Vue CLI 或 Vite
 False
 False#### 使用 Vite（推荐）
 False
 FalseVite 是 Vue 官方推荐的构建工具，速度更快：
 False
```bash
 True# 安装 create-vite@latest
 Truenpm create vite@latest
 True
 True# 按照提示创建 Vue3 项目
 True# 选择 Vue + TypeScript 模板获取最佳开发体验
 True```

 False#### 使用 Vue CLI
 False
```bash
 True# 安装 Vue CLI
 Truenpm install -g @vue/cli
 True
 True# 创建 Vue3 项目
 Truevue create my-vue3-project
 True# 选择 Vue 3 预设
 True```

 False## 2. 项目结构
 False
 False一个典型的 Vue3 项目结构如下：
 False
```
 Truemy-vue3-project/
 True├── public/
 True│ └── favicon.ico
 True├── src/
 True│ ├── assets/
 True│ │ └── logo.png
 True│ ├── components/
 True│ │ └── HelloWorld.vue
 True│ ├── router/
 True│ │ └── index.ts
 True│ ├── store/
 True│ │ └── index.ts
 True│ ├── views/
 True│ │ ├── Home.vue
 True│ │ └── About.vue
 True│ ├── App.vue
 True│ └── main.ts
 True├── .gitignore
 True├── index.html
 True├── package.json
 True├── tsconfig.json
 True├── vite.config.ts
 True└── README.md
 True```

 False## 3. 第一个 Vue3 应用
 False
 False### 3.1 基本组件结构
 False
 False创建一个简单的 Vue3 组件：
 False
```vue
 True<template>
 True <div class="hello">
 True <h1>{{ message }}</h1>
 True <button @click="count++">点击计数: {{ count }}</button>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('Hello Vue3!')
 Trueconst count = ref(0)
 True</script>
 True
 True<style scoped>
 True.hello {
 True text-align: center;
 True margin-top: 2rem;
 True}
 True</style>
 True```

 False### 3.2 运行项目
 False
```bash
 True# 进入项目目录
 Truecd my-vue3-project
 True
 True# 安装依赖
 Truenpm install
 True
 True# 启动开发服务器
 Truenpm run dev
 True```

 False## 4. 核心概念快速了解
 False
 False### 4.1 组合式 API
 False
```vue
 True<script setup lang="ts">
 Trueimport { ref, computed, onMounted } from 'vue'
 True
 True// 响应式数据
 Trueconst count = ref(0)
 True
 True// 计算属性
 Trueconst doubleCount = computed(() => count.value * 2)
 True
 True// 生命周期钩子
 TrueonMounted(() => {
 True console.log('组件挂载完成')
 True})
 True
 True// 方法
 Truefunction increment() {
 True count.value++
 True}
 True</script>
 True```

 False### 4.2 响应式系统
 False
```vue
 True<script setup lang="ts">
 Trueimport { ref, reactive, toRefs } from 'vue'
 True
 True// 基本类型响应式
 Trueconst count = ref(0)
 True
 True// 对象响应式
 Trueconst user = reactive({
 True name: '张三',
 True age: 20
 True})
 True
 True// 解构响应式对象
 Trueconst { name, age } = toRefs(user)
 True</script>
 True```

 False### 4.3 组件通信
 False
 False#### 父传子（Props）
 False
```vue
 True<!-- 父组件 -->
 True<template>
 True <ChildComponent :message="parentMessage" />
 True</template>
 True
 True<script setup lang="ts">
 Trueimport ChildComponent from './ChildComponent.vue'
 Trueimport { ref } from 'vue'
 True
 Trueconst parentMessage = ref('来自父组件的消息')
 True</script>
 True```

```vue
 True<!-- 子组件 -->
 True<template>
 True <div>{{ message }}</div>
 True</template>
 True
 True<script setup lang="ts">
 TruedefineProps<{
 True message: string
 True}>()
 True</script>
 True```

 False#### 子传父（Emits）
 False
```vue
 True<!-- 子组件 -->
 True<template>
 True <button @click="emit('update', '来自子组件的消息')">
 True 发送消息
 True </button>
 True</template>
 True
 True<script setup lang="ts">
 Trueconst emit = defineEmits<{
 True (e: 'update', message: string): void
 True}>()
 True</script>
 True```

```vue
 True<!-- 父组件 -->
 True<template>
 True <ChildComponent @update="handleUpdate" />
 True <div>{{ childMessage }}</div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport ChildComponent from './ChildComponent.vue'
 Trueimport { ref } from 'vue'
 True
 Trueconst childMessage = ref('')
 True
 Truefunction handleUpdate(message: string) {
 True childMessage.value = message
 True}
 True</script>
 True```

 False## 5. 路由与状态管理
 False
 False### 5.1 Vue Router
 False
 False安装：
 False
```bash
 Truenpm install vue-router@4
 True```

 False基本配置：
 False
```ts
 True// router/index.ts
 Trueimport { createRouter, createWebHistory } from 'vue-router'
 Trueimport Home from '../views/Home.vue'
 True
 Trueconst routes = [
 True {
 True path: '/',
 True name: 'Home',
 True component: Home
 True },
 True {
 True path: '/about',
 True name: 'About',
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

 False### 5.2 Pinia 状态管理
 False
 False安装：
 False
```bash
 Truenpm install pinia
 True```

 False基本配置：
 False
```ts
 True// store/index.ts
 Trueimport { defineStore } from 'pinia'
 True
 Trueexport const useCounterStore = defineStore('counter', {
 True state: () => ({
 True count: 0
 True }),
 True actions: {
 True increment() {
 True this.count++
 True }
 True },
 True getters: {
 True doubleCount: (state) => state.count * 2
 True }
 True})
 True```

 False使用：
 False
```vue
 True<script setup lang="ts">
 Trueimport { useCounterStore } from '../store'
 True
 Trueconst counterStore = useCounterStore()
 True</script>
 True
 True<template>
 True <div>
 True <p>Count: {{ counterStore.count }}</p>
 True <p>Double: {{ counterStore.doubleCount }}</p>
 True <button @click="counterStore.increment">Increment</button>
 True </div>
 True</template>
 True```

 False## 6. 构建与部署
 False
 False### 6.1 构建生产版本
 False
```bash
 Truenpm run build
 True```

 False构建产物会生成在 `dist` 目录中。
 False
 False### 6.2 部署选项
 False
 False- **静态网站托管**：GitHub Pages、Vercel、Netlify 等
 False- **服务器部署**：Nginx、Apache 等
 False- **容器化部署**：Docker
 False
 False## 7. 学习资源
 False
 False- [Vue3 官方文档](https://v3.vuejs.org/)
 False- [Vue 3 教程 - 中文](https://cn.vuejs.org/)
 False- [Vite 官方文档](https://vitejs.dev/)
 False- [Vue Router 官方文档](https://router.vuejs.org/)
 False- [Pinia 官方文档](https://pinia.vuejs.org/)
 False
 False## 8. 快速开发提示
 False
 False1. **使用 TypeScript**：提供类型安全，减少运行时错误
 False2. **使用 ESLint 和 Prettier**：保持代码风格一致
 False3. **使用 Volar**：Vue3 官方推荐的 VS Code 扩展
 False4. **组件拆分**：将复杂组件拆分为更小的、可复用的组件
 False5. **使用 composables**：提取可复用的逻辑
 False6. **性能优化**：使用 `v-memo`、`v-once` 等指令优化渲染性能
 False
 False通过本快速入门指南，你已经了解了 Vue3 的基本使用方法。接下来可以深入学习各个核心概念和高级特性。
 False