# Vue3 指令系统
 False
 False> @Author: fanquanpp
 False> @Category: Vue3 Basics
 False> @Description: Vue3 指令系统
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [指令概述](#指令概述)
 False2. [内置指令](#内置指令)
 False3. [自定义指令](#自定义指令)
 False4. [指令的应用场景](#指令的应用场景)
 False5. [最佳实践](#最佳实践)
 False6. [常见问题](#常见问题)
 False7. [总结](#总结)
 False
 False---
 False
 False## 1. 指令概述
 False
 False指令是 Vue 模板中特殊的标记，以 `v-` 前缀开头，用于在 DOM 上应用特殊的响应式行为。Vue3 提供了丰富的内置指令，同时支持自定义指令。
 False
 False## 2. 内置指令
 False
 False### 2.1 条件渲染指令
 False
 False#### v-if
 False
 False**作用**：根据表达式的值条件性地渲染元素
 False
 False**用法**：
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
 False**作用**：与 `v-if` 配合使用，作为其 else-if 分支
 False
 False**用法**：
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

 False#### v-else
 False
 False**作用**：与 `v-if` 或 `v-else-if` 配合使用，作为最后的 else 分支
 False
 False**用法**：见上面的示例
 False
 False#### v-show
 False
 False**作用**：根据表达式的值条件性地显示元素（通过 CSS display 属性）
 False
 False**用法**：
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

 False**v-if vs v-show**：
 False
 False- `v-if`：真正的条件渲染，会销毁和重建元素
 False- `v-show`：只是切换元素的 display 属性，元素始终存在
 False
 False### 2.2 列表渲染指令
 False
 False#### v-for
 False
 False**作用**：基于源数据多次渲染元素
 False
 False**用法**：
 False
```vue
 True<template>
 True <div>
 True <!-- 遍历数组 -->
 True <ul>
 True <li v-for="item in items" :key="item.id">
 True {{ item.name }}
 True </li>
 True </ul>
 True 
 True <!-- 遍历数组（带索引） -->
 True <ul>
 True <li v-for="(item, index) in items" :key="index">
 True {{ index + 1 }}. {{ item.name }}
 True </li>
 True </ul>
 True 
 True <!-- 遍历对象 -->
 True <ul>
 True <li v-for="(value, key, index) in user" :key="key">
 True {{ index + 1 }}. {{ key }}: {{ value }}
 True </li>
 True </ul>
 True 
 True <!-- 遍历数字 -->
 True <ul>
 True <li v-for="n in 5" :key="n">
 True {{ n }}
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

 False**key 的重要性**：
 False
 False- 用于 Vue 的虚拟 DOM 算法，提高渲染性能
 False- 必须是唯一的，且不应该在渲染过程中改变
 False- 推荐使用稳定且唯一的 ID，避免使用索引
 False
 False### 2.3 属性绑定指令
 False
 False#### v-bind
 False
 False**作用**：动态绑定一个或多个属性，或一个组件 prop 到表达式
 False
 False**用法**：
 False
```vue
 True<template>
 True <div>
 True <!-- 绑定单个属性 -->
 True <img v-bind:src="imageSrc" alt="图片">
 True <a v-bind:href="linkUrl">链接</a>
 True 
 True <!-- 简写形式 -->
 True <img :src="imageSrc" alt="图片">
 True <a :href="linkUrl">链接</a>
 True 
 True <!-- 绑定多个属性 -->
 True <div v-bind="objectOfAttrs"></div>
 True 
 True <!-- 绑定 class -->
 True <div :class="className">单个类</div>
 True <div :class="[classA, classB]">多个类</div>
 True <div :class="{ active: isActive, 'text-danger': hasError }">条件类</div>
 True 
 True <!-- 绑定 style -->
 True <div :style="styleObject">对象样式</div>
 True <div :style="[styleObject1, styleObject2]">多个样式</div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, reactive } from 'vue'
 True
 Trueconst imageSrc = ref('https://example.com/image.jpg')
 Trueconst linkUrl = ref('https://example.com')
 Trueconst className = ref('container')
 Trueconst classA = ref('class-a')
 Trueconst classB = ref('class-b')
 Trueconst isActive = ref(true)
 Trueconst hasError = ref(false)
 Trueconst objectOfAttrs = reactive({
 True id: 'container',
 True class: 'box'
 True})
 Trueconst styleObject = reactive({
 True color: 'red',
 True fontSize: '16px'
 True})
 Trueconst styleObject1 = reactive({
 True color: 'blue'
 True})
 Trueconst styleObject2 = reactive({
 True fontSize: '18px'
 True})
 True</script>
 True```

 False### 2.4 事件处理指令
 False
 False#### v-on
 False
 False**作用**：监听 DOM 事件
 False
 False**用法**：
 False
```vue
 True<template>
 True <div>
 True <!-- 基本用法 -->
 True <button v-on:click="handleClick">点击我</button>
 True 
 True <!-- 简写形式 -->
 True <button @click="handleClick">点击我</button>
 True 
 True <!-- 带参数 -->
 True <button @click="handleClickWithParam('Hello')">点击我</button>
 True 
 True <!-- 带事件对象 -->
 True <button @click="handleClickWithEvent">点击我</button>
 True 
 True <!-- 事件修饰符 -->
 True <button @click.stop="handleClick">阻止冒泡</button>
 True <button @click.prevent="handleSubmit">阻止默认行为</button>
 True <button @click.capture="handleClick">捕获模式</button>
 True <button @click.self="handleClick">仅自身触发</button>
 True <button @click.once="handleClick">仅触发一次</button>
 True 
 True <!-- 按键修饰符 -->
 True <input @keyup.enter="handleEnter" placeholder="按 Enter 键">
 True <input @keyup.esc="handleEsc" placeholder="按 Esc 键">
 True 
 True <!-- 系统修饰符 -->
 True <button @click.ctrl="handleCtrlClick">Ctrl + 点击</button>
 True <button @click.alt="handleAltClick">Alt + 点击</button>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Truefunction handleClick() {
 True console.log('点击事件')
 True}
 True
 Truefunction handleClickWithParam(message: string) {
 True console.log('点击事件，参数:', message)
 True}
 True
 Truefunction handleClickWithEvent(event: MouseEvent) {
 True console.log('点击事件，事件对象:', event)
 True}
 True
 Truefunction handleSubmit(event: Event) {
 True console.log('提交事件')
 True}
 True
 Truefunction handleEnter() {
 True console.log('Enter 键被按下')
 True}
 True
 Truefunction handleEsc() {
 True console.log('Esc 键被按下')
 True}
 True
 Truefunction handleCtrlClick() {
 True console.log('Ctrl + 点击')
 True}
 True
 Truefunction handleAltClick() {
 True console.log('Alt + 点击')
 True}
 True</script>
 True```

 False### 2.5 表单输入绑定指令
 False
 False#### v-model
 False
 False**作用**：在表单元素上创建双向数据绑定
 False
 False**用法**：
 False
```vue
 True<template>
 True <div>
 True <!-- 文本输入 -->
 True <input v-model="message" type="text" placeholder="输入内容">
 True <p>输入内容: {{ message }}</p>
 True 
 True <!-- 多行文本 -->
 True <textarea v-model="textareaContent" placeholder="输入多行内容"></textarea>
 True <p>多行内容: {{ textareaContent }}</p>
 True 
 True <!-- 复选框 -->
 True <input v-model="isChecked" type="checkbox">
 True <p>是否选中: {{ isChecked }}</p>
 True 
 True <!-- 多个复选框 -->
 True <div>
 True <input v-model="checkedValues" type="checkbox" value="option1"> 选项 1
 True <input v-model="checkedValues" type="checkbox" value="option2"> 选项 2
 True <input v-model="checkedValues" type="checkbox" value="option3"> 选项 3
 True </div>
 True <p>选中值: {{ checkedValues }}</p>
 True 
 True <!-- 单选按钮 -->
 True <div>
 True <input v-model="selectedRadio" type="radio" value="option1"> 选项 1
 True <input v-model="selectedRadio" type="radio" value="option2"> 选项 2
 True </div>
 True <p>选中值: {{ selectedRadio }}</p>
 True 
 True <!-- 选择框 -->
 True <select v-model="selectedOption">
 True <option value="">请选择</option>
 True <option value="option1">选项 1</option>
 True <option value="option2">选项 2</option>
 True <option value="option3">选项 3</option>
 True </select>
 True <p>选中值: {{ selectedOption }}</p>
 True 
 True <!-- 多选选择框 -->
 True <select v-model="selectedOptions" multiple>
 True <option value="option1">选项 1</option>
 True <option value="option2">选项 2</option>
 True <option value="option3">选项 3</option>
 True </select>
 True <p>选中值: {{ selectedOptions }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('')
 Trueconst textareaContent = ref('')
 Trueconst isChecked = ref(false)
 Trueconst checkedValues = ref<string[]>([])
 Trueconst selectedRadio = ref('')
 Trueconst selectedOption = ref('')
 Trueconst selectedOptions = ref<string[]>([])
 True</script>
 True```

 False**修饰符**：
 False
 False- `.lazy`：在 change 事件后更新
 False- `.number`：将输入值转换为数字
 False- `.trim`：去除输入值的首尾空格
 False
```vue
 True<template>
 True <div>
 True <input v-model.lazy="message" type="text">
 True <input v-model.number="age" type="number">
 True <input v-model.trim="name" type="text">
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('')
 Trueconst age = ref(0)
 Trueconst name = ref('')
 True</script>
 True```

 False### 2.6 其他内置指令
 False
 False#### v-pre
 False
 False**作用**：跳过这个元素及其子元素的编译过程
 False
 False**用法**：
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
 False**作用**：在 Vue 实例编译完成之前，隐藏元素
 False
 False**用法**：
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
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst message = ref('Hello Vue3')
 True</script>
 True```

 False#### v-once
 False
 False**作用**：只渲染元素和组件一次，随后的重新渲染会跳过
 False
 False**用法**：
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

 False#### v-memo
 False
 False**作用**：缓存元素或组件的渲染结果
 False
 False**用法**：
 False
```vue
 True<template>
 True <div>
 True <div v-memo="[valueA, valueB]">
 True {{ valueA }} - {{ valueB }}
 True </div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref } from 'vue'
 True
 Trueconst valueA = ref(1)
 Trueconst valueB = ref(2)
 True</script>
 True```

 False## 3. 自定义指令
 False
 False### 3.1 全局自定义指令
 False
 False**注册**：
 False
```ts
 True// main.ts
 Trueimport { createApp } from 'vue'
 Trueimport App from './App.vue'
 True
 Trueconst app = createApp(App)
 True
 True// 注册全局自定义指令
 Trueapp.directive('focus', {
 True mounted(el) {
 True el.focus()
 True }
 True})
 True
 Trueapp.mount('#app')
 True```

 False**使用**：
 False
```vue
 True<template>
 True <div>
 True <input v-focus type="text" placeholder="自动聚焦">
 True </div>
 True</template>
 True```

 False### 3.2 局部自定义指令
 False
 False**定义**：
 False
```vue
 True<template>
 True <div>
 True <input v-focus type="text" placeholder="自动聚焦">
 True <div v-highlight="{ color: 'red' }">高亮文本</div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { directive } from 'vue'
 True
 True// 定义局部自定义指令
 Trueconst vFocus = directive('focus', {
 True mounted(el) {
 True el.focus()
 True }
 True})
 True
 Trueconst vHighlight = directive('highlight', {
 True mounted(el, binding) {
 True el.style.color = binding.value.color
 True },
 True updated(el, binding) {
 True el.style.color = binding.value.color
 True }
 True})
 True</script>
 True```

 False### 3.3 指令生命周期钩子
 False
 False- **created**：指令绑定到元素时调用
 False- **beforeMount**：元素插入 DOM 前调用
 False- **mounted**：元素插入 DOM 后调用
 False- **beforeUpdate**：元素更新前调用
 False- **updated**：元素更新后调用
 False- **beforeUnmount**：元素卸载前调用
 False- **unmounted**：元素卸载后调用
 False
 False**示例**：
 False
```vue
 True<template>
 True <div>
 True <div v-example>示例元素</div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { directive } from 'vue'
 True
 Trueconst vExample = directive('example', {
 True created(el) {
 True console.log('指令创建')
 True },
 True beforeMount(el) {
 True console.log('元素插入前')
 True },
 True mounted(el) {
 True console.log('元素插入后')
 True },
 True beforeUpdate(el) {
 True console.log('元素更新前')
 True },
 True updated(el) {
 True console.log('元素更新后')
 True },
 True beforeUnmount(el) {
 True console.log('元素卸载前')
 True },
 True unmounted(el) {
 True console.log('元素卸载后')
 True }
 True})
 True</script>
 True```

 False## 4. 指令的应用场景
 False
 False### 4.1 表单验证
 False
```vue
 True<template>
 True <div>
 True <input v-model="email" v-validate.email type="email" placeholder="请输入邮箱">
 True <p v-if="emailError">{{ emailError }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, directive } from 'vue'
 True
 Trueconst email = ref('')
 Trueconst emailError = ref('')
 True
 Trueconst vValidate = directive('validate', {
 True mounted(el, binding) {
 True el.addEventListener('blur', () => {
 True validate(el, binding)
 True })
 True },
 True updated(el, binding) {
 True validate(el, binding)
 True }
 True})
 True
 Truefunction validate(el: HTMLInputElement, binding: any) {
 True const value = el.value
 True const type = binding.arg
 True 
 True if (type === 'email') {
 True const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 True if (!emailRegex.test(value)) {
 True emailError.value = '请输入有效的邮箱地址'
 True } else {
 True emailError.value = ''
 True }
 True }
 True}
 True</script>
 True```

 False### 4.2 滚动监听
 False
```vue
 True<template>
 True <div>
 True <div v-scroll="handleScroll" style="height: 200px; overflow: auto;">
 True <div style="height: 400px; background: #f0f0f0;">
 True 滚动内容
 True </div>
 True </div>
 True <p>滚动位置: {{ scrollTop }}</p>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { ref, directive } from 'vue'
 True
 Trueconst scrollTop = ref(0)
 True
 Trueconst vScroll = directive('scroll', {
 True mounted(el, binding) {
 True el.addEventListener('scroll', binding.value)
 True },
 True unmounted(el, binding) {
 True el.removeEventListener('scroll', binding.value)
 True }
 True})
 True
 Truefunction handleScroll(event: Event) {
 True const target = event.target as HTMLElement
 True scrollTop.value = target.scrollTop
 True}
 True</script>
 True```

 False### 4.3 拖拽功能
 False
```vue
 True<template>
 True <div>
 True <div 
 True v-draggable 
 True style="width: 100px; height: 100px; background: #42b983; color: white; display: flex; align-items: center; justify-content: center; cursor: move; position: absolute; top: 0; left: 0;">
 True 拖拽我
 True </div>
 True </div>
 True</template>
 True
 True<script setup lang="ts">
 Trueimport { directive } from 'vue'
 True
 Trueconst vDraggable = directive('draggable', {
 True mounted(el) {
 True let isDragging = false
 True let startX = 0
 True let startY = 0
 True let initialLeft = 0
 True let initialTop = 0
 True
 True el.addEventListener('mousedown', (e) => {
 True isDragging = true
 True startX = e.clientX
 True startY = e.clientY
 True initialLeft = el.offsetLeft
 True initialTop = el.offsetTop
 True el.style.cursor = 'grabbing'
 True })
 True
 True document.addEventListener('mousemove', (e) => {
 True if (!isDragging) return
 True const deltaX = e.clientX - startX
 True const deltaY = e.clientY - startY
 True el.style.left = `${initialLeft + deltaX}px`
 True el.style.top = `${initialTop + deltaY}px`
 True })
 True
 True document.addEventListener('mouseup', () => {
 True isDragging = false
 True el.style.cursor = 'move'
 True })
 True }
 True})
 True</script>
 True```

 False## 5. 最佳实践
 False
 False### 5.1 指令的使用原则
 False
 False- **简洁明了**：指令应该专注于单一功能
 False- **可复用性**：设计指令时考虑复用性
 False- **性能优化**：避免在指令中执行复杂操作
 False- **类型安全**：使用 TypeScript 为指令添加类型
 False
 False### 5.2 内置指令的使用建议
 False
 False- **v-if vs v-show**：频繁切换使用 `v-show`，条件不常变化使用 `v-if`
 False- **v-for**：始终添加唯一的 `key`
 False- **v-model**：合理使用修饰符
 False- **v-bind**：使用简写形式 `:`
 False- **v-on**：使用简写形式 `@`
 False
 False### 5.3 自定义指令的使用建议
 False
 False- **命名规范**：使用 kebab-case 命名
 False- **参数传递**：合理使用 binding 参数
 False- **生命周期**：在适当的生命周期钩子中执行操作
 False- **事件监听**：在 `unmounted` 中清理事件监听
 False
 False## 6. 常见问题
 False
 False### 6.1 指令不生效
 False
 False**问题**：自定义指令没有生效
 False
 False**解决方案**：
 False
 False- 检查指令名称是否正确
 False- 检查指令注册方式是否正确
 False- 检查指令的生命周期钩子是否正确实现
 False
 False### 6.2 指令参数传递
 False
 False**问题**：无法正确传递参数给指令
 False
 False**解决方案**：
 False
 False- 使用 `binding.value` 获取指令值
 False- 使用 `binding.arg` 获取指令参数
 False- 使用 `binding.modifiers` 获取指令修饰符
 False
 False### 6.3 指令性能问题
 False
 False**问题**：指令导致性能下降
 False
 False**解决方案**：
 False
 False- 避免在指令中执行复杂操作
 False- 合理使用 `v-memo` 缓存渲染结果
 False- 在 `unmounted` 中清理资源
 False
 False## 7. 总结
 False
 FalseVue3 的指令系统提供了丰富的功能，从基本的条件渲染、列表渲染到复杂的表单处理和自定义指令，为开发者提供了强大的工具。通过本教程的学习，你应该已经掌握了 Vue3 指令系统的基本使用方法和最佳实践，可以在实际项目中灵活运用。
 False