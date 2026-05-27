# 04-组件系统 | Component System
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: 04-组件系统 | Component System
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [组件系统概述 | Component System Overview](#组件系统概述-|-component-system-overview)
 False2. [单文件组件 | Single-File Components](#单文件组件-|-single-file-components)
 False3. [组件的 props](#组件的-props)
 False4. [组件的事件](#组件的事件)
 False5. [组件的插槽](#组件的插槽)
 False6. [组件的生命周期](#组件的生命周期)
 False7. [组件的通信](#组件的通信)
 False8. [组件的高级特性](#组件的高级特性)
 False9. [组件的最佳实践](#组件的最佳实践)
 False10. [示例 | Examples](#示例-|-examples)
 False11. [小结 | Summary](#小结-|-summary)
 False
 False---
 False
 False## 1. 组件系统概述 | Component System Overview
 False
 False组件是 Vue3 应用的基本构建块，它允许我们将 UI 拆分为独立、可复用的部分。Vue3 的组件系统提供了一种清晰的方式来组织和管理应用的 UI 结构，使代码更加模块化、可维护。
 False
 False### 1.1 组件的特点
 False
 False- **封装性**：组件将模板、逻辑和样式封装在一起
 False- **可复用性**：组件可以在多个地方重复使用
 False- **组合性**：组件可以嵌套组合，形成复杂的 UI 结构
 False- **可维护性**：组件化使代码更加清晰、易于维护
 False
 False### 1.2 组件的类型
 False
 False- **全局组件**：在整个应用中可用
 False- **局部组件**：只在特定组件中可用
 False- **单文件组件**：使用 `.vue` 文件格式，包含模板、脚本和样式
 False
 False## 2. 单文件组件 | Single-File Components
 False
 False单文件组件（SFC）是 Vue3 推荐的组件编写方式，它使用 `.vue` 文件格式，包含三个部分：
 False
 False- `<template>`：组件的模板
 False- `<script>`：组件的逻辑
 False- `<style>`：组件的样式
 False
 False### 2.1 基本结构
 False
```vue
 True<template>
 True <div class="component">
 True <h2>{{ title }}</h2>
 True <p>{{ message }}</p>
 True <button @click="handleClick">Click me</button>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst title = ref('Hello')
 Trueconst message = ref('Welcome to Vue3')
 True
 Trueconst handleClick = () => {
 True message.value = 'You clicked the button!'
 True}
 True</script>
 True
 True<style scoped>
 True.component {
 True padding: 20px;
 True border: 1px solid #ddd;
 True border-radius: 8px;
 True}
 True
 Trueh2 {
 True color: #42b983;
 True}
 True
 Truebutton {
 True padding: 5px 10px;
 True background-color: #42b983;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True}
 True</style>
 True```

 False### 2.2 script setup 语法
 False
 FalseVue3.2+ 提供了 `script setup` 语法糖，使组件的编写更加简洁：
 False
 False- 不需要导出组件
 False- 直接在模板中使用定义的变量和函数
 False- 自动注册导入的组件
 False
 False## 3. 组件的 props
 False
 FalseProps 是组件的输入数据，允许父组件向子组件传递数据。
 False
 False### 3.1 基本用法
 False
```vue
 True<!-- ChildComponent.vue -->
 True<template>
 True <div class="child">
 True <h3>{{ title }}</h3>
 True <p>{{ message }}</p>
 True </div>
 True</template>
 True
 True<script setup>
 TruedefineProps({
 True title: String,
 True message: {
 True type: String,
 True default: 'Default message'
 True }
 True})
 True</script>
 True
 True<!-- ParentComponent.vue -->
 True<template>
 True <div class="parent">
 True <ChildComponent 
 True title="Hello from parent"
 True message="This is a prop"
 True />
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport ChildComponent from './ChildComponent.vue'
 True</script>
 True```

 False### 3.2 Props 验证
 False
```vue
 True<script setup>
 TruedefineProps({
 True // 基本类型
 True title: String,
 True count: Number,
 True isActive: Boolean,
 True items: Array,
 True user: Object,
 True callback: Function,
 True 
 True // 带默认值
 True message: {
 True type: String,
 True default: 'Default message'
 True },
 True 
 True // 必需的
 True requiredProp: {
 True type: String,
 True required: true
 True },
 True 
 True // 自定义验证
 True customProp: {
 True validator: (value) => {
 True return ['option1', 'option2'].includes(value)
 True }
 True }
 True})
 True</script>
 True```

 False## 4. 组件的事件
 False
 False事件允许子组件向父组件传递消息。
 False
 False### 4.1 基本用法
 False
```vue
 True<!-- ChildComponent.vue -->
 True<template>
 True <div class="child">
 True <button @click="handleClick">Click me</button>
 True </div>
 True</template>
 True
 True<script setup>
 Trueconst emit = defineEmits(['click', 'custom-event'])
 True
 Trueconst handleClick = () => {
 True emit('click', 'Button clicked')
 True emit('custom-event', { data: 'Custom event data' })
 True}
 True</script>
 True
 True<!-- ParentComponent.vue -->
 True<template>
 True <div class="parent">
 True <ChildComponent 
 True @click="handleChildClick"
 True @custom-event="handleCustomEvent"
 True />
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport ChildComponent from './ChildComponent.vue'
 True
 Trueconst handleChildClick = (message) => {
 True console.log('Child clicked:', message)
 True}
 True
 Trueconst handleCustomEvent = (data) => {
 True console.log('Custom event:', data)
 True}
 True</script>
 True```

 False### 4.2 事件验证
 False
```vue
 True<script setup>
 Trueconst emit = defineEmits({
 True // 基本事件
 True click: null,
 True 
 True // 带参数验证的事件
 True 'update:count': (value) => {
 True return typeof value === 'number'
 True }
 True})
 True</script>
 True```

 False## 5. 组件的插槽
 False
 False插槽允许父组件向子组件的特定位置插入内容。
 False
 False### 5.1 基本插槽
 False
```vue
 True<!-- ChildComponent.vue -->
 True<template>
 True <div class="child">
 True <h3>Child Component</h3>
 True <slot></slot>
 True </div>
 True</template>
 True
 True<!-- ParentComponent.vue -->
 True<template>
 True <div class="parent">
 True <ChildComponent>
 True <p>This content is inserted into the slot</p>
 True </ChildComponent>
 True </div>
 True</template>
 True```

 False### 5.2 具名插槽
 False
```vue
 True<!-- ChildComponent.vue -->
 True<template>
 True <div class="child">
 True <header>
 True <slot name="header"></slot>
 True </header>
 True <main>
 True <slot></slot>
 True </main>
 True <footer>
 True <slot name="footer"></slot>
 True </footer>
 True </div>
 True</template>
 True
 True<!-- ParentComponent.vue -->
 True<template>
 True <div class="parent">
 True <ChildComponent>
 True <template #header>
 True <h2>Page Header</h2>
 True </template>
 True <p>Main content goes here</p>
 True <template #footer>
 True <p>Page Footer</p>
 True </template>
 True </ChildComponent>
 True </div>
 True</template>
 True```

 False### 5.3 作用域插槽
 False
```vue
 True<!-- ChildComponent.vue -->
 True<template>
 True <div class="child">
 True <ul>
 True <li v-for="item in items" :key="item.id">
 True <slot :item="item">{{ item.name }}</slot>
 True </li>
 True </ul>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst items = ref([
 True { id: 1, name: 'Item 1' },
 True { id: 2, name: 'Item 2' },
 True { id: 3, name: 'Item 3' }
 True])
 True</script>
 True
 True<!-- ParentComponent.vue -->
 True<template>
 True <div class="parent">
 True <ChildComponent>
 True <template #default="{ item }">
 True <strong>{{ item.id }}: {{ item.name }}</strong>
 True </template>
 True </ChildComponent>
 True </div>
 True</template>
 True```

 False## 6. 组件的生命周期
 False
 False组件的生命周期包括创建、挂载、更新、卸载等阶段，我们可以在这些阶段执行相应的逻辑。
 False
 False### 6.1 生命周期钩子
 False
 False| 钩子函数 | 描述 |
 False| :--- | :--- |
 False| `onMounted` | 组件挂载后 |
 False| `onUpdated` | 组件更新后 |
 False| `onUnmounted` | 组件卸载后 |
 False| `onBeforeMount` | 组件挂载前 |
 False| `onBeforeUpdate` | 组件更新前 |
 False| `onBeforeUnmount` | 组件卸载前 |
 False| `onErrorCaptured` | 捕获子组件错误 |
 False| `onRenderTracked` | 响应式依赖被追踪时 |
 False| `onRenderTriggered` | 响应式依赖被触发时 |
 False
 False### 6.2 使用生命周期钩子
 False
```vue
 True<template>
 True <div class="component">
 True <h2>{{ title }}</h2>
 True <p>{{ message }}</p>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, onMounted, onUpdated, onUnmounted } from 'vue'
 True
 Trueconst title = ref('Hello')
 Trueconst message = ref('Welcome to Vue3')
 True
 TrueonMounted(() => {
 True console.log('Component mounted')
 True // 执行初始化逻辑
 True})
 True
 TrueonUpdated(() => {
 True console.log('Component updated')
 True // 执行更新后逻辑
 True})
 True
 TrueonUnmounted(() => {
 True console.log('Component unmounted')
 True // 执行清理逻辑
 True})
 True</script>
 True```

 False## 7. 组件的通信
 False
 False### 7.1 父子组件通信
 False
 False- **Props**：父组件向子组件传递数据
 False- **Events**：子组件向父组件传递消息
 False- **Refs**：父组件访问子组件的实例或 DOM 元素
 False
 False### 7.2 跨组件通信
 False
 False- **Provide/Inject**：祖先组件向后代组件传递数据
 False- **Pinia/Vuex**：状态管理库
 False- **Event Bus**：事件总线
 False
 False### 7.3 Provide/Inject 示例
 False
```vue
 True<!-- GrandparentComponent.vue -->
 True<script setup>
 Trueimport { provide, ref } from 'vue'
 Trueimport ParentComponent from './ParentComponent.vue'
 True
 Trueconst theme = ref('light')
 Trueconst changeTheme = () => {
 True theme.value = theme.value === 'light' ? 'dark' : 'light'
 True}
 True
 Trueprovide('theme', theme)
 Trueprovide('changeTheme', changeTheme)
 True</script>
 True
 True<!-- ChildComponent.vue -->
 True<script setup>
 Trueimport { inject } from 'vue'
 True
 Trueconst theme = inject('theme', 'light')
 Trueconst changeTheme = inject('changeTheme')
 True</script>
 True
 True<template>
 True <div :class="theme">
 True <p>Current theme: {{ theme }}</p>
 True <button @click="changeTheme">Change theme</button>
 True </div>
 True</template>
 True
 True<style scoped>
 True.light {
 True background-color: white;
 True color: black;
 True}
 True
 True.dark {
 True background-color: black;
 True color: white;
 True}
 True</style>
 True```

 False## 8. 组件的高级特性
 False
 False### 8.1 动态组件
 False
```vue
 True<template>
 True <div class="dynamic-component">
 True <button @click="currentComponent = 'ComponentA'">Component A</button>
 True <button @click="currentComponent = 'ComponentB'">Component B</button>
 True <component :is="currentComponent"></component>
 True </div>
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

 False### 8.2 异步组件
 False
```vue
 True<template>
 True <div class="async-component">
 True <Suspense>
 True <template #default>
 True <AsyncComponent />
 True </template>
 True <template #fallback>
 True <p>Loading...</p>
 True </template>
 True </Suspense>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { defineAsyncComponent } from 'vue'
 True
 Trueconst AsyncComponent = defineAsyncComponent({
 True loader: () => import('./AsyncComponent.vue'),
 True loadingComponent: () => '<p>Loading...</p>',
 True errorComponent: () => '<p>Error</p>',
 True delay: 200,
 True timeout: 3000
 True})
 True</script>
 True```

 False### 8.3 递归组件
 False
```vue
 True<template>
 True <div class="tree-node">
 True <div class="node-content" @click="toggle">
 True {{ node.name }}
 True </div>
 True <div v-if="isOpen && node.children" class="node-children">
 True <TreeNode 
 True v-for="child in node.children" 
 True :key="child.id" 
 True :node="child"
 True />
 True </div>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref } from 'vue'
 True
 Trueconst props = defineProps({
 True node: Object
 True})
 True
 Trueconst isOpen = ref(false)
 True
 Trueconst toggle = () => {
 True isOpen.value = !isOpen.value
 True}
 True</script>
 True
 True<style scoped>
 True.tree-node {
 True margin-left: 20px;
 True}
 True
 True.node-content {
 True cursor: pointer;
 True padding: 5px;
 True border: 1px solid #ddd;
 True border-radius: 4px;
 True margin: 5px 0;
 True}
 True
 True.node-content:hover {
 True background-color: #f0f0f0;
 True}
 True
 True.node-children {
 True margin-top: 5px;
 True}
 True</style>
 True```

 False## 9. 组件的最佳实践
 False
 False### 9.1 组件设计原则
 False
 False- **单一职责**：每个组件只负责一个功能
 False- **可复用性**：设计通用的、可复用的组件
 False- **可维护性**：代码清晰、易于理解和维护
 False- **性能优化**：避免不必要的渲染和计算
 False
 False### 9.2 组件命名规范
 False
 False- **组件名**：使用 PascalCase（大驼峰）命名
 False- **文件名**：使用 PascalCase 命名，与组件名一致
 False- **props 名**：使用 camelCase（小驼峰）命名
 False- **事件名**：使用 kebab-case（短横线分隔）命名
 False
 False### 9.3 组件样式规范
 False
 False- **使用 scoped**：避免样式冲突
 False- **使用 CSS 变量**：便于主题切换
 False- **使用 BEM 命名**：提高样式的可维护性
 False- **避免使用深度选择器**：保持组件的封装性
 False
 False### 9.4 性能优化
 False
 False- **使用 v-memo**：缓存计算结果
 False- **使用 v-once**：只渲染一次
 False- **使用 keep-alive**：缓存组件状态
 False- **使用 shallowRef 和 shallowReactive**：减少响应式开销
 False- **避免在模板中使用复杂表达式**：使用计算属性
 False
 False## 10. 示例 | Examples
 False
 False### 10.1 基础组件示例
 False
```vue
 True<!-- Button.vue -->
 True<template>
 True <button 
 True :class="[
 True 'btn', 
 True `btn-${variant}`,
 True { 'btn-disabled': disabled }
 True ]" 
 True :disabled="disabled"
 True @click="$emit('click')"
 True >
 True <slot></slot>
 True </button>
 True</template>
 True
 True<script setup>
 TruedefineProps({
 True variant: {
 True type: String,
 True default: 'primary',
 True validator: (value) => {
 True return ['primary', 'secondary', 'success', 'danger'].includes(value)
 True }
 True },
 True disabled: {
 True type: Boolean,
 True default: false
 True }
 True})
 True
 TruedefineEmits(['click'])
 True</script>
 True
 True<style scoped>
 True.btn {
 True padding: 8px 16px;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True font-size: 14px;
 True}
 True
 True.btn-primary {
 True background-color: #42b983;
 True color: white;
 True}
 True
 True.btn-secondary {
 True background-color: #999;
 True color: white;
 True}
 True
 True.btn-success {
 True background-color: #28a745;
 True color: white;
 True}
 True
 True.btn-danger {
 True background-color: #dc3545;
 True color: white;
 True}
 True
 True.btn-disabled {
 True opacity: 0.6;
 True cursor: not-allowed;
 True}
 True</style>
 True```

 False### 10.2 复杂组件示例
 False
```vue
 True<!-- TodoList.vue -->
 True<template>
 True <div class="todo-list">
 True <h2>Todo List</h2>
 True <div class="todo-input">
 True <input 
 True v-model="newTodo" 
 True @keyup.enter="addTodo"
 True placeholder="Add a new todo"
 True />
 True <button @click="addTodo">Add</button>
 True </div>
 True <ul class="todo-items">
 True <li v-for="todo in todos" :key="todo.id" class="todo-item">
 True <input 
 True type="checkbox" 
 True v-model="todo.completed"
 True @change="updateTodo(todo)"
 True />
 True <span :class="{ 'completed': todo.completed }">{{ todo.text }}</span>
 True <button @click="deleteTodo(todo.id)">Delete</button>
 True </li>
 True </ul>
 True <div class="todo-stats">
 True <p>Total: {{ todos.length }}</p>
 True <p>Completed: {{ completedCount }}</p>
 True <p>Remaining: {{ remainingCount }}</p>
 True </div>
 True </div>
 True</template>
 True
 True<script setup>
 Trueimport { ref, computed } from 'vue'
 True
 Trueconst todos = ref([
 True { id: 1, text: 'Learn Vue3', completed: false },
 True { id: 2, text: 'Build a project', completed: false },
 True { id: 3, text: 'Deploy to production', completed: false }
 True])
 True
 Trueconst newTodo = ref('')
 True
 Trueconst completedCount = computed(() => {
 True return todos.value.filter(todo => todo.completed).length
 True})
 True
 Trueconst remainingCount = computed(() => {
 True return todos.value.filter(todo => !todo.completed).length
 True})
 True
 Trueconst addTodo = () => {
 True if (newTodo.value.trim()) {
 True todos.value.push({
 True id: Date.now(),
 True text: newTodo.value.trim(),
 True completed: false
 True })
 True newTodo.value = ''
 True }
 True}
 True
 Trueconst updateTodo = (todo) => {
 True // 可以在这里添加更新逻辑，比如发送到服务器
 True console.log('Updated todo:', todo)
 True}
 True
 Trueconst deleteTodo = (id) => {
 True todos.value = todos.value.filter(todo => todo.id !== id)
 True}
 True</script>
 True
 True<style scoped>
 True.todo-list {
 True max-width: 400px;
 True margin: 0 auto;
 True padding: 20px;
 True border: 1px solid #ddd;
 True border-radius: 8px;
 True}
 True
 True.todo-input {
 True display: flex;
 True margin-bottom: 20px;
 True}
 True
 True.todo-input input {
 True flex: 1;
 True padding: 8px;
 True border: 1px solid #ddd;
 True border-radius: 4px 0 0 4px;
 True}
 True
 True.todo-input button {
 True padding: 8px 16px;
 True background-color: #42b983;
 True color: white;
 True border: none;
 True border-radius: 0 4px 4px 0;
 True cursor: pointer;
 True}
 True
 True.todo-items {
 True list-style-type: none;
 True padding: 0;
 True margin-bottom: 20px;
 True}
 True
 True.todo-item {
 True display: flex;
 True align-items: center;
 True padding: 10px;
 True border-bottom: 1px solid #eee;
 True}
 True
 True.todo-item input {
 True margin-right: 10px;
 True}
 True
 True.todo-item span {
 True flex: 1;
 True}
 True
 True.todo-item .completed {
 True text-decoration: line-through;
 True color: #999;
 True}
 True
 True.todo-item button {
 True padding: 4px 8px;
 True background-color: #dc3545;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True}
 True
 True.todo-stats {
 True display: flex;
 True justify-content: space-between;
 True font-size: 14px;
 True color: #666;
 True}
 True</style>
 True```

 False## 11. 小结 | Summary
 False
 FalseVue3 的组件系统是其核心特性之一，它提供了一种清晰、模块化的方式来组织和管理应用的 UI 结构。通过本章节的学习，你已经了解了 Vue3 组件系统的基本概念和使用方法，包括单文件组件、props、事件、插槽、生命周期、组件通信和高级特性。
 False
 False组件系统的核心优势在于它允许我们将 UI 拆分为独立、可复用的部分，使代码更加模块化、可维护。在实际开发中，要遵循组件设计原则，使用合适的命名规范和样式规范，注意性能优化，以构建高质量的 Vue3 应用。
 False