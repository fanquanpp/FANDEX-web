# Vue3 模板语法
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: Vue3 模板语法
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [插值表达式](#插值表达式)
 False2. [指令](#指令)
 False3. [模板表达式](#模板表达式)
 False4. [模板编译](#模板编译)
 False5. [最佳实践](#最佳实践)
 False6. [常见问题](#常见问题)
 False7. [总结](#总结)
 False
 False---
 False
 False## 1. 插值表达式
 False
 False### 1.1 文本插值
 False
```vue
 True<template>
 True <div>
 True <h1>{{ message }}</h1>
 True <p>{{ count }}</p>
 True <p>{{ isActive ? '激活' : '未激活' }}</p>
 True <p>{{ user.name }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, reactive } from 'vue'
 True
 Trueconst message = ref('Hello Vue3')
 Trueconst count = ref(0)
 Trueconst isActive = ref(true)
 Trueconst user = reactive({
 True name: '张三',
 True age: 20
 True})
 True</script>
 True```

 False### 1.2 原始 HTML
 False
```vue
 True<template>
 True <div>
 True <p>{{ rawHtml }}</p> <!-- 输出: <strong>加粗文本</strong> -->
 True <p v-html="rawHtml"></p> <!-- 输出: 加粗文本 -->
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst rawHtml = ref('<strong>加粗文本</strong>')
 True</script>
 True```

 False### 1.3 表达式
 False
```vue
 True<template>
 True <div>
 True <p>{{ count + 1 }}</p>
 True <p>{{ message.toUpperCase() }}</p>
 True <p>{{ user.name + ' (' + user.age + '岁)' }}</p>
 True <p>{{ items.length }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, reactive } from 'vue'
 True
 Trueconst count = ref(0)
 Trueconst message = ref('hello')
 Trueconst user = reactive({
 True name: '张三',
 True age: 20
 True})
 Trueconst items = ref([1, 2, 3, 4, 5])
 True</script>
 True```

 False## 2. 指令
 False
 False### 2.1 条件指令
 False
 False#### v-if
 False
```vue
 True<template>
 True <div>
 True <p v-if="isLoggedIn">欢迎回来！</p>
 True <p v-else>请登录</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst isLoggedIn = ref(false)
 True</script>
 True```

 False#### v-else-if
 False
```vue
 True<template>
 True <div>
 True <p v-if="score >= 90">优秀</p>
 True <p v-else-if="score >= 80">良好</p>
 True <p v-else-if="score >= 60">及格</p>
 True <p v-else>不及格</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst score = ref(85)
 True</script>
 True```

 False#### v-show
 False
```vue
 True<template>
 True <div>
 True <p v-show="isVisible">这是一个可显示/隐藏的元素</p>
 True <button @click="isVisible = !isVisible">切换显示</button>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst isVisible = ref(true)
 True</script>
 True```

 False### 2.2 循环指令
 False
 False#### v-for
 False
```vue
 True<template>
 True <div>
 True <ul>
 True <li v-for="item in items" :key="item.id">
 True {{ item.name }}
 True </li>
 True </ul>
 True 
 True <ul>
 True <li v-for="(item, index) in items" :key="index">
 True {{ index + 1 }}. {{ item.name }}
 True </li>
 True </ul>
 True 
 True <ul>
 True <li v-for="(value, key) in user" :key="key">
 True {{ key }}: {{ value }}
 True </li>
 True </ul>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, reactive } from 'vue'
 True
 Trueconst items = ref([
 True { id: 1, name: '项目 1' },
 True { id: 2, name: '项目 2' },
 True { id: 3, name: '项目 3' }
 True])
 True
 Trueconst user = reactive({
 True name: '张三',
 True age: 20,
 True email: 'zhangsan@example.com'
 True})
 True</script>
 True```

 False### 2.3 绑定指令
 False
 False#### v-bind
 False
```vue
 True<template>
 True <div>
 True <img v-bind:src="imageSrc" alt="图片">
 True <a v-bind:href="linkUrl">链接</a>
 True <div v-bind:class="className">类绑定</div>
 True <div v-bind:style="styleObject">样式绑定</div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, reactive } from 'vue'
 True
 Trueconst imageSrc = ref('https://example.com/image.jpg')
 Trueconst linkUrl = ref('https://example.com')
 Trueconst className = ref('container')
 Trueconst styleObject = reactive({
 True color: 'red',
 True fontSize: '16px'
 True})
 True</script>
 True```

 False#### 简写形式
 False
```vue
 True<template>
 True <div>
 True <img :src="imageSrc" alt="图片">
 True <a :href="linkUrl">链接</a>
 True <div :class="className">类绑定</div>
 True <div :style="styleObject">样式绑定</div>
 True </div>
 True</template>
 True```

 False### 2.4 事件指令
 False
 False#### v-on
 False
```vue
 True<template>
 True <div>
 True <button v-on:click="handleClick">点击我</button>
 True <button v-on:mouseenter="handleMouseEnter">鼠标进入</button>
 True <button v-on:mouseleave="handleMouseLeave">鼠标离开</button>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Truefunction handleClick() {
 True console.log('点击事件')
 True}
 True
 Truefunction handleMouseEnter() {
 True console.log('鼠标进入事件')
 True}
 True
 Truefunction handleMouseLeave() {
 True console.log('鼠标离开事件')
 True}
 True</script>
 True```

 False#### 简写形式
 False
```vue
 True<template>
 True <div>
 True <button @click="handleClick">点击我</button>
 True <button @mouseenter="handleMouseEnter">鼠标进入</button>
 True <button @mouseleave="handleMouseLeave">鼠标离开</button>
 True </div>
 True</template>
 True```

 False### 2.5 表单指令
 False
 False#### v-model
 False
```vue
 True<template>
 True <div>
 True <input v-model="message" type="text" placeholder="输入内容">
 True <p>输入内容: {{ message }}</p>
 True 
 True <input v-model="isChecked" type="checkbox">
 True <p>是否选中: {{ isChecked }}</p>
 True 
 True <select v-model="selectedOption">
 True <option value="1">选项 1</option>
 True <option value="2">选项 2</option>
 True <option value="3">选项 3</option>
 True </select>
 True <p>选中选项: {{ selectedOption }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('')
 Trueconst isChecked = ref(false)
 Trueconst selectedOption = ref('1')
 True</script>
 True```

 False### 2.6 其他指令
 False
 False#### v-pre
 False
```vue
 True<template>
 True <div>
 True <p v-pre>{{ 这不会被编译 }}</p>
 True </div>
 True</template>
 True```

 False#### v-cloak
 False
```vue
 True<template>
 True <div>
 True <p v-cloak>{{ message }}</p>
 True </div>
 True</template>
 True
 True<style>
 True[v-cloak] {
 True display: none;
 True}
 True</style>
 True```

 False#### v-once
 False
```vue
 True<template>
 True <div>
 True <p v-once>{{ message }}</p>
 True <button @click="message = '更新后的消息'">更新消息</button>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('初始消息')
 True</script>
 True```

 False## 3. 模板表达式
 False
 False### 3.1 过滤器（已废弃）
 False
 False在 Vue3 中，过滤器已被废弃，建议使用计算属性或方法代替：
 False
```vue
 True<template>
 True <div>
 True <p>{{ formattedDate }}</p>
 True <p>{{ formatDate(date) }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, computed } from 'vue'
 True
 Trueconst date = ref(new Date())
 True
 Trueconst formattedDate = computed(() => {
 True return new Intl.DateTimeFormat('zh-CN').format(date.value)
 True})
 True
 Truefunction formatDate(date: Date): string {
 True return new Intl.DateTimeFormat('zh-CN').format(date)
 True}
 True</script>
 True```

 False### 3.2 空格和换行
 False
```vue
 True<template>
 True <div>
 True <!-- 保留空格和换行 -->
 True <pre>{{ message }}</pre>
 True 
 True <!-- 自动移除空格和换行 -->
 True <p>{{ message }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref(`Hello
 TrueWorld`)
 True</script>
 True```

 False## 4. 模板编译
 False
 False### 4.1 编译模式
 False
 FalseVue3 提供了两种编译模式：
 False
 False- **运行时编译**：在浏览器中编译模板
 False- **预编译**：在构建时编译模板
 False
 False### 4.2 编译优化
 False
 FalseVue3 的模板编译进行了以下优化：
 False
 False- **静态提升**：将静态内容提升到渲染函数外部
 False- **补丁标记**：为动态内容添加标记，减少 diff 时间
 False- **缓存指令**：缓存指令的编译结果
 False
 False## 5. 最佳实践
 False
 False### 5.1 模板结构
 False
 False- 保持模板简洁明了
 False- 避免在模板中使用复杂表达式
 False- 使用计算属性或方法处理复杂逻辑
 False
 False### 5.2 性能优化
 False
 False- 使用 `v-once` 处理静态内容
 False- 使用 `v-memo` 缓存计算结果
 False- 合理使用 `v-if` 和 `v-show`
 False- 为 `v-for` 添加唯一的 key
 False
 False### 5.3 代码风格
 False
 False- 使用简写形式（`:src` 代替 `v-bind:src`，`@click` 代替 `v-on:click`）
 False- 保持模板缩进一致
 False- 为指令添加适当的空格
 False
 False## 6. 常见问题
 False
 False### 6.1 插值表达式不更新
 False
 False**问题**：插值表达式的值没有更新
 False
 False**解决方案**：
 False
 False- 确保使用了响应式数据（`ref` 或 `reactive`）
 False- 对于 `ref`，确保使用 `.value` 访问和修改值
 False- 对于 `reactive`，确保直接修改对象属性，而不是替换整个对象
 False
 False### 6.2 v-for 不渲染
 False
 False**问题**：`v-for` 没有渲染列表
 False
 False**解决方案**：
 False
 False- 确保数组是响应式的
 False- 为每个项添加唯一的 `key`
 False- 检查数组是否为空
 False
 False### 6.3 v-model 不工作
 False
 False**问题**：`v-model` 绑定的值没有更新
 False
 False**解决方案**：
 False
 False- 确保使用了响应式数据
 False- 检查表单元素的类型是否正确
 False- 对于自定义组件，确保正确实现了 `v-model` 接口
 False
 False## 7. 总结
 False
 FalseVue3 的模板语法简洁明了，提供了丰富的指令和表达式，使开发者可以轻松构建交互式界面。通过本教程的学习，你应该已经掌握了 Vue3 模板语法的基本使用方法，可以在实际项目中灵活运用。
 False