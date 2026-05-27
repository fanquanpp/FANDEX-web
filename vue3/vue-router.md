# Vue Router 详解
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: Vue Router 详解
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [Vue Router 概述](#vue-router-概述)
 False2. [环境搭建](#环境搭建)
 False3. [基础用法](#基础用法)
 False4. [路由守卫](#路由守卫)
 False5. [编程式导航](#编程式导航)
 False6. [路由元信息](#路由元信息)
 False7. [滚动行为](#滚动行为)
 False8. [路由懒加载](#路由懒加载)
 False9. [路由模块化](#路由模块化)
 False10. [常见问题与解决方案](#常见问题与解决方案)
 False11. [最佳实践](#最佳实践)
 False12. [总结](#总结)
 False
 False---
 False
 False## 1. Vue Router 概述
 False
 FalseVue Router 是 Vue.js 官方的路由管理器，它与 Vue.js 核心深度集成，让构建单页应用变得更加简单。
 False
 False### 1.1 主要特性
 False
 False- **嵌套路由**：支持复杂的路由结构
 False- **动态路由**：支持参数化路由
 False- **路由守卫**：提供导航守卫机制
 False- **编程式导航**：通过 API 进行导航
 False- **命名路由**：使用命名路由简化路由跳转
 False- **路由元信息**：为路由添加自定义数据
 False- **滚动行为**：控制导航时的滚动位置
 False
 False## 2. 环境搭建
 False
 False### 2.1 安装 Vue Router
 False
```bash
 True# 使用 npm
 Truenpm install vue-router@4
 True
 True# 使用 yarn
 Trueyarn add vue-router@4
 True```

 False### 2.2 基本配置
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

 False### 2.3 注册路由
 False
```ts
 True// main.ts
 Trueimport { createApp } from 'vue'
 Trueimport App from './App.vue'
 Trueimport router from './router'
 True
 Trueconst app = createApp(App)
 Trueapp.use(router)
 Trueapp.mount('#app')
 True```

 False## 3. 基础用法
 False
 False### 3.1 路由链接
 False
```vue
 True<template>
 True <nav>
 True <router-link to="/">首页</router-link>
 True <router-link to="/about">关于</router-link>
 True </nav>
 True <router-view></router-view>
 True</template>
 True```

 False### 3.2 动态路由
 False
```ts
 True// 路由配置
 Trueconst routes = [
 True {
 True path: '/user/:id',
 True name: 'User',
 True component: () => import('../views/User.vue')
 True }
 True]
 True```

```vue
 True<!-- User.vue -->
 True<template>
 True <div>
 True <h1>用户详情</h1>
 True <p>用户 ID: {{ $route.params.id }}</p>
 True </div>
 True</template>
 True```

 False### 3.3 嵌套路由
 False
```ts
 True// 路由配置
 Trueconst routes = [
 True {
 True path: '/user',
 True component: () => import('../views/UserLayout.vue'),
 True children: [
 True {
 True path: '',
 True name: 'UserList',
 True component: () => import('../views/UserList.vue')
 True },
 True {
 True path: ':id',
 True name: 'UserDetail',
 True component: () => import('../views/UserDetail.vue')
 True }
 True ]
 True }
 True]
 True```

 False## 4. 路由守卫
 False
 False### 4.1 全局守卫
 False
```ts
 True// 全局前置守卫
 Truerouter.beforeEach((to, from, next) => {
 True // 检查用户是否登录
 True const isLoggedIn = localStorage.getItem('token')
 True if (to.meta.requiresAuth && !isLoggedIn) {
 True next('/login')
 True } else {
 True next()
 True }
 True})
 True
 True// 全局后置守卫
 Truerouter.afterEach((to, from) => {
 True // 可以在这里添加页面标题更新等操作
 True document.title = to.meta.title || '默认标题'
 True})
 True```

 False### 4.2 路由独享守卫
 False
```ts
 Trueconst routes = [
 True {
 True path: '/admin',
 True component: () => import('../views/Admin.vue'),
 True beforeEnter: (to, from, next) => {
 True // 检查用户是否为管理员
 True const isAdmin = localStorage.getItem('role') === 'admin'
 True if (isAdmin) {
 True next()
 True } else {
 True next('/')
 True }
 True }
 True }
 True]
 True```

 False### 4.3 组件内守卫
 False
```vue
 True<script setup lang="ts">
 Trueimport { onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
 True
 True// 进入路由前
 TrueonBeforeRouteEnter((to, from, next) => {
 True console.log('进入路由前')
 True next()
 True})
 True
 True// 路由更新时
 TrueonBeforeRouteUpdate((to, from, next) => {
 True console.log('路由更新时')
 True next()
 True})
 True
 True// 离开路由前
 TrueonBeforeRouteLeave((to, from, next) => {
 True if (confirm('确定要离开吗？')) {
 True next()
 True } else {
 True next(false)
 True }
 True})
 True</script>
 True```

 False## 5. 编程式导航
 False
 False### 5.1 基本导航
 False
```vue
 True<script setup lang="ts">
 Trueimport { useRouter } from 'vue-router'
 True
 Trueconst router = useRouter()
 True
 Truefunction navigateToAbout() {
 True router.push('/about')
 True}
 True
 Truefunction navigateToUser(id: number) {
 True router.push({
 True name: 'User',
 True params: { id }
 True })
 True}
 True
 Truefunction goBack() {
 True router.back()
 True}
 True
 Truefunction goForward() {
 True router.forward()
 True}
 True
 Truefunction navigateReplace() {
 True router.replace('/about')
 True}
 True</script>
 True```

 False### 5.2 导航守卫中的编程式导航
 False
```ts
 Truerouter.beforeEach((to, from, next) => {
 True if (to.path === '/login' && isLoggedIn) {
 True next('/')
 True } else {
 True next()
 True }
 True})
 True```

 False## 6. 路由元信息
 False
 False### 6.1 定义路由元信息
 False
```ts
 Trueconst routes = [
 True {
 True path: '/admin',
 True component: () => import('../views/Admin.vue'),
 True meta: {
 True requiresAuth: true,
 True role: 'admin',
 True title: '管理员页面'
 True }
 True }
 True]
 True```

 False### 6.2 使用路由元信息
 False
```ts
 Truerouter.beforeEach((to, from, next) => {
 True // 检查是否需要认证
 True if (to.meta.requiresAuth) {
 True // 检查用户是否登录
 True const isLoggedIn = localStorage.getItem('token')
 True if (!isLoggedIn) {
 True next('/login')
 True return
 True }
 True 
 True // 检查用户角色
 True if (to.meta.role) {
 True const userRole = localStorage.getItem('role')
 True if (userRole !== to.meta.role) {
 True next('/')
 True return
 True }
 True }
 True }
 True 
 True // 更新页面标题
 True document.title = to.meta.title || '默认标题'
 True next()
 True})
 True```

 False## 7. 滚动行为
 False
 False### 7.1 基本配置
 False
```ts
 Trueconst router = createRouter({
 True history: createWebHistory(),
 True routes,
 True scrollBehavior(to, from, savedPosition) {
 True // 如果有保存的位置，返回该位置
 True if (savedPosition) {
 True return savedPosition
 True } else {
 True // 否则滚动到顶部
 True return { top: 0 }
 True }
 True }
 True})
 True```

 False### 7.2 自定义滚动行为
 False
```ts
 Trueconst router = createRouter({
 True history: createWebHistory(),
 True routes,
 True scrollBehavior(to, from, savedPosition) {
 True if (savedPosition) {
 True return savedPosition
 True } else if (to.hash) {
 True // 如果有哈希值，滚动到对应元素
 True return {
 True el: to.hash,
 True behavior: 'smooth'
 True }
 True } else {
 True return { top: 0 }
 True }
 True }
 True})
 True```

 False## 8. 路由懒加载
 False
 False### 8.1 基本用法
 False
```ts
 Trueconst routes = [
 True {
 True path: '/',
 True name: 'Home',
 True component: () => import('../views/Home.vue')
 True },
 True {
 True path: '/about',
 True name: 'About',
 True component: () => import('../views/About.vue')
 True }
 True]
 True```

 False### 8.2 命名 chunk
 False
```ts
 Trueconst routes = [
 True {
 True path: '/',
 True name: 'Home',
 True component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
 True },
 True {
 True path: '/about',
 True name: 'About',
 True component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
 True }
 True]
 True```

 False## 9. 路由模块化
 False
 False### 9.1 模块化路由配置
 False
```ts
 True// router/modules/user.ts
 Trueimport { RouteRecordRaw } from 'vue-router'
 True
 Trueconst userRoutes: RouteRecordRaw[] = [
 True {
 True path: '/user',
 True component: () => import('../../views/user/UserLayout.vue'),
 True children: [
 True {
 True path: '',
 True name: 'UserList',
 True component: () => import('../../views/user/UserList.vue')
 True },
 True {
 True path: ':id',
 True name: 'UserDetail',
 True component: () => import('../../views/user/UserDetail.vue')
 True }
 True ]
 True }
 True]
 True
 Trueexport default userRoutes
 True```

```ts
 True// router/index.ts
 Trueimport { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 Trueimport userRoutes from './modules/user'
 True
 Trueconst routes: RouteRecordRaw[] = [
 True {
 True path: '/',
 True name: 'Home',
 True component: () => import('../views/Home.vue')
 True },
 True ...userRoutes
 True]
 True
 Trueconst router = createRouter({
 True history: createWebHistory(),
 True routes
 True})
 True
 Trueexport default router
 True```

 False## 10. 常见问题与解决方案
 False
 False### 10.1 路由参数变化时组件不更新
 False
 False**问题**：当路由参数变化时，组件不会重新渲染
 False
 False**解决方案**：
 False
```vue
 True<script setup lang="ts">
 Trueimport { watch, useRoute } from 'vue-router'
 True
 Trueconst route = useRoute()
 True
 True// 监听路由参数变化
 Truewatch(
 True () => route.params.id,
 True (newId) => {
 True // 处理参数变化
 True fetchData(newId)
 True }
 True)
 True</script>
 True```

 False### 10.2 嵌套路由的默认子路由
 False
 False**问题**：嵌套路由需要一个默认的子路由
 False
 False**解决方案**：
 False
```ts
 Trueconst routes = [
 True {
 True path: '/user',
 True component: () => import('../views/UserLayout.vue'),
 True children: [
 True {
 True path: '', // 空路径作为默认子路由
 True name: 'UserList',
 True component: () => import('../views/UserList.vue')
 True }
 True ]
 True }
 True]
 True```

 False### 10.3 路由守卫中的无限循环
 False
 False**问题**：在路由守卫中使用 `next('/login')` 导致无限循环
 False
 False**解决方案**：
 False
```ts
 Truerouter.beforeEach((to, from, next) => {
 True const isLoggedIn = localStorage.getItem('token')
 True if (to.path === '/login') {
 True // 如果已经在登录页面，直接放行
 True next()
 True } else if (to.meta.requiresAuth && !isLoggedIn) {
 True // 如果需要认证但未登录，跳转到登录页面
 True next('/login')
 True } else {
 True // 其他情况放行
 True next()
 True }
 True})
 True```

 False## 11. 最佳实践
 False
 False1. **使用命名路由**：提高代码可读性和可维护性
 False2. **使用路由元信息**：集中管理路由相关的配置
 False3. **使用路由懒加载**：减少初始加载时间
 False4. **使用模块化路由**：提高代码组织性
 False5. **合理使用路由守卫**：实现权限控制和导航逻辑
 False6. **使用 TypeScript**：提供类型安全
 False7. **测试路由**：确保路由配置正确
 False
 False## 12. 总结
 False
 FalseVue Router 是 Vue3 生态系统中不可或缺的一部分，它提供了强大的路由管理功能，使构建单页应用变得更加简单和高效。通过本教程的学习，你应该已经掌握了 Vue Router 的核心概念和使用方法，可以在实际项目中灵活运用。
 False