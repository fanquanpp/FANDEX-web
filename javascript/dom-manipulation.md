# DOM 操作与事件 (DOM Manipulation & Events)
 False
 False> @Version: v4.0.0
 False> @Module: C08-DOM操作
 False
 False> @Author: Anonymous
 False> @Category: JS Basics
 False> @Description: 讲解 DOM 树、查询/创建/插入节点、事件模型与事件委托，并覆盖性能与安全要点。 | DOM APIs, events, delegation, performance and security notes.
 False
 False---
 False
 False## 目录
 False
 False1. [DOM 基础](#dom-基础)
 False2. [查询与遍历](#查询与遍历)
 False3. [创建与插入节点](#创建与插入节点)
 False4. [属性操作](#属性操作)
 False5. [样式操作](#样式操作)
 False6. [事件系统](#事件系统)
 False7. [性能优化](#性能优化)
 False8. [安全要点](#安全要点)
 False
 False---
 False
 False## 1. DOM 基础 (DOM Basics)
 False
 False### 1.1 DOM 树结构
 False
 FalseDOM（Document Object Model）把 HTML 文档表示为一棵节点树。浏览器解析 HTML 后，会构建如下结构：
 False
```
 TrueDocument
 True└── html
 True ├── head
 True │ ├── meta
 True │ ├── title
 True │ └── link
 True └── body
 True ├── header
 True │ └── nav
 True ├── main
 True │ ├── section
 True │ └── article
 True └── footer
 True```

 False每个 HTML 标签对应一个**元素节点**，标签内的文本对应**文本节点**。
 False
 False### 1.2 节点类型
 False
 FalseDOM 中有 12 种节点类型，最常用的有：
 False
 False| 节点类型 | `nodeType` 值 | 说明 | 示例 |
 False|:--|:--|:--|:--|
 False| `Element` | 1 | 元素节点 | `<div>`, `<p>` |
 False| `Text` | 3 | 文本节点 | 标签间的文字 |
 False| `Comment` | 8 | 注释节点 | `<!-- comment -->` |
 False| `Document` | 9 | 文档节点 | `document` |
 False| `DocumentType` | 10 | 文档类型 | `<!DOCTYPE html>` |
 False| `DocumentFragment` | 11 | 文档片段 | 轻量级容器 |
 False
```js
 Trueconst el = document.querySelector('div')
 Trueel.nodeType
 Trueel.nodeName
 True
 Trueconst text = el.firstChild
 Truetext.nodeType
 Truetext.nodeName
 True```

 False### 1.3 节点关系
 False
```
 TrueparentElement
 True├── firstChild / firstElementChild
 True├── child1
 True├── child2 (previousSibling ← → nextSibling)
 True├── child3
 True└── lastChild / lastElementChild
 True```

 False**节点导航属性**：
 False
```js
 Trueconst el = document.querySelector('li')
 True
 Trueel.parentNode
 Trueel.parentElement
 Trueel.childNodes
 Trueel.children
 Trueel.firstChild
 Trueel.firstElementChild
 Trueel.lastChild
 Trueel.lastElementChild
 Trueel.previousSibling
 Trueel.previousElementSibling
 Trueel.nextSibling
 Trueel.nextElementSibling
 True```

 False**`Node` vs `Element` 属性区别**：
 False
 False- `childNodes` / `firstChild` / `nextSibling`：包含所有节点类型（文本、注释等）
 False- `children` / `firstElementChild` / `nextElementSibling`：只包含元素节点
 False
```html
 True<ul id="list">
 True <li>A</li>
 True <li>B</li>
 True</ul>
 True```

```js
 Trueconst list = document.getElementById('list')
 Truelist.childNodes.length
 Truelist.children.length
 True```

 False---
 False
 False## 2. 查询与遍历 (Query & Traverse)
 False
 False### 2.1 常用查询 API
 False
```js
 Trueconst app = document.getElementById('app')
 Trueconst firstBtn = document.querySelector('button')
 Trueconst items = document.querySelectorAll('.item')
 True```

 False| API | 返回类型 | 动态/静态 | 兼容性 |
 False|:--|:--|:--|:--|
 False| `getElementById` | Element / null | — | IE6+ |
 False| `getElementsByClassName` | HTMLCollection | 动态 | IE9+ |
 False| `getElementsByTagName` | HTMLCollection | 动态 | IE6+ |
 False| `querySelector` | Element / null | — | IE8+ |
 False| `querySelectorAll` | NodeList（静态） | 静态 | IE8+ |
 False
 False### 2.2 节点集合差异
 False
 False- `NodeList` 可能是静态也可能是动态（取决于来源）
 False- `HTMLCollection` 通常是动态集合（会随 DOM 变化）
 False
```js
 Trueconst liveList = document.getElementsByClassName('item')
 Trueconst staticList = document.querySelectorAll('.item')
 True
 Truedocument.body.append(document.createElement('div'))
 TrueliveList.length
 TruestaticList.length
 True```

 False工程实践里，若要数组方法：
 False
```js
 Trueconst arr = Array.from(document.querySelectorAll('.item'))
 Trueconst arr2 = [...document.querySelectorAll('.item')]
 True```

 False### 2.3 `closest()` 与 `matches()`
 False
```js
 Trueconst btn = document.querySelector('button')
 True
 Truebtn.closest('.card')
 Truebtn.closest('.card').querySelector('.title')
 True
 Truebtn.matches('.primary')
 Truebtn.matches('button')
 True```

 False- `closest(selector)`：从自身开始向上查找，返回最近的匹配祖先（或自身）
 False- `matches(selector)`：检查元素是否匹配选择器，返回 `boolean`
 False
 False### 2.4 遍历 DOM 树
 False
```js
 Truefunction walkDOM(node, callback) {
 True callback(node)
 True node = node.firstChild
 True while (node) {
 True walkDOM(node, callback)
 True node = node.nextSibling
 True }
 True}
 True
 TruewalkDOM(document.body, (node) => {
 True if (node.nodeType === 1) {
 True console.log(node.tagName)
 True }
 True})
 True```

 False---
 False
 False## 3. 创建与插入节点 (Create & Insert)
 False
 False### 3.1 创建元素与文本
 False
```js
 Trueconst li = document.createElement('li')
 Trueli.className = 'item'
 Trueli.textContent = 'hello'
 True
 Trueconst text = document.createTextNode('world')
 True```

 False优先使用 `textContent` 来设置文本，避免把不可信内容当作 HTML 解析。
 False
 False### 3.2 插入与移动
 False
 False- `parent.append(child)`：追加（可追加多个参数）
 False- `parent.prepend(child)`：头部插入
 False- `node.before(x)` / `node.after(x)`：在节点前后插入
 False- `parent.replaceChild(newNode, oldNode)`：替换
 False- `node.replaceWith(newNode)`：替换自身
 False
 False节点插入时会发生"移动"，不会复制：
 False
```js
 Trueconst a = document.querySelector('#a')
 Trueconst b = document.querySelector('#b')
 Trueconst x = document.querySelector('#x')
 Trueb.append(x)
 True```

 False### 3.3 复制节点
 False
```js
 Trueconst original = document.querySelector('.card')
 Trueconst copy = original.cloneNode(true)
 Truedocument.body.append(copy)
 True```

 False- `cloneNode(false)`（默认）：浅克隆，只复制元素本身
 False- `cloneNode(true)`：深克隆，复制元素及其所有子节点
 False
 False[警告] **注意**：克隆不会复制事件监听器和 `data-*` 属性中通过 JS 设置的值。
 False
 False### 3.4 删除节点
 False
```js
 Trueconst el = document.querySelector('.item')
 Trueel.remove()
 True
 Trueconst parent = document.querySelector('.list')
 Trueconst child = parent.querySelector('.item')
 Trueparent.removeChild(child)
 True```

 False- `el.remove()`：现代 API，直接删除自身
 False- `parent.removeChild(child)`：经典 API，返回被删除的节点
 False
 False### 3.5 批量更新：DocumentFragment
 False
 False批量创建并一次性插入可减少重排重绘：
 False
```js
 Trueconst frag = document.createDocumentFragment()
 Truefor (let i = 0; i < 1000; i++) {
 True const div = document.createElement('div')
 True div.textContent = String(i)
 True frag.append(div)
 True}
 Truedocument.body.append(frag)
 True```

 FalseFragment 插入时，其子节点会被插入，Fragment 本身不会成为 DOM 的一部分。
 False
 False**现代替代方案**：直接构建 HTML 字符串
 False
```js
 Trueconst html = Array.from({ length: 1000 }, (_, i) => `<div>${i}</div>`).join('')
 Truecontainer.innerHTML = html
 True```

 False在大量简单元素场景下，`innerHTML` 可能比逐个 `createElement` 更快，但需注意 XSS 风险。
 False
 False---
 False
 False## 4. 属性操作 (Attribute Operations)
 False
 False### 4.1 HTML 属性 vs DOM 属性
 False
```html
 True<input id="name" type="text" value="hello" class="input-field" data-role="username">
 True```

```js
 Trueconst input = document.getElementById('name')
 True
 Trueinput.getAttribute('type')
 Trueinput.getAttribute('value')
 Trueinput.getAttribute('class')
 True
 Trueinput.type
 Trueinput.value
 Trueinput.className
 True```

 False**关键区别**：
 False
 False| 对比项 | HTML 属性 (`getAttribute`) | DOM 属性 (`obj.prop`) |
 False|:--|:--|:--|
 False| 来源 | HTML 标签上的属性 | DOM 对象的属性 |
 False| 值类型 | 始终是字符串 | 可以是任意类型 |
 False| 同步性 | 初始值，不随用户输入变化 | 实时值（如 `input.value`） |
 False| 自定义属性 | `getAttribute('data-x')` | `dataset.x` |
 False
```js
 Trueinput.value = 'changed'
 Trueinput.getAttribute('value')
 Trueinput.value
 Trueinput.setAttribute('value', 'new default')
 Trueinput.getAttribute('value')
 True```

 False### 4.2 `setAttribute` / `getAttribute` / `removeAttribute`
 False
```js
 Trueconst img = document.querySelector('img')
 True
 Trueimg.setAttribute('src', 'photo.jpg')
 Trueimg.setAttribute('alt', 'A photo')
 Trueimg.getAttribute('src')
 Trueimg.removeAttribute('alt')
 Trueimg.hasAttribute('alt')
 True```

 False### 4.3 `dataset`（自定义数据属性）
 False
```html
 True<div id="user" data-user-id="42" data-role="admin" data-last-login="2026-01-01">
 True User Info
 True</div>
 True```

```js
 Trueconst el = document.getElementById('user')
 True
 Trueel.dataset.userId
 Trueel.dataset.role
 Trueel.dataset.lastLogin
 True
 Trueel.dataset.status = 'active'
 True
 Trueel.dataset.newField = 'value'
 True```

 False**命名规则**：
 False- HTML 中 `data-user-id` → JS 中 `dataset.userId`（短横线转驼峰）
 False- `dataset` 的值始终是字符串
 False- 设置新属性时驼峰会自动转为短横线
 False
 False### 4.4 布尔属性
 False
```html
 True<input type="checkbox" checked disabled>
 True<button disabled>Click</button>
 True```

```js
 Trueconst checkbox = document.querySelector('input[type="checkbox"]')
 True
 Truecheckbox.hasAttribute('checked')
 Truecheckbox.checked
 Truecheckbox.getAttribute('checked')
 True
 Truecheckbox.checked = true
 Truecheckbox.setAttribute('checked', '')
 True```

 False布尔属性（`checked`、`disabled`、`selected`、`readonly`）推荐使用 DOM 属性而非 `setAttribute`。
 False
 False---
 False
 False## 5. 样式操作 (Style Operations)
 False
 False### 5.1 `style` 属性（行内样式）
 False
```js
 Trueconst el = document.querySelector('.box')
 True
 Trueel.style.width = '200px'
 Trueel.style.backgroundColor = 'red'
 Trueel.style.fontSize = '16px'
 Trueel.style.display = 'none'
 Trueel.style.display = ''
 True```

 False**注意**：
 False- `style` 只能读写行内样式，无法获取 CSS 类或 `<style>` 中的样式
 False- CSS 属性名需转为驼峰：`background-color` → `backgroundColor`
 False- 设置空字符串 `''` 可移除行内样式
 False
 False### 5.2 `classList`（类名操作）
 False
```js
 Trueconst el = document.querySelector('.box')
 True
 Trueel.classList.add('active')
 Trueel.classList.remove('hidden')
 Trueel.classList.toggle('dark-mode')
 Trueel.classList.toggle('visible', window.innerWidth > 768)
 Trueel.classList.contains('active')
 Trueel.classList.replace('old-class', 'new-class')
 True
 Trueel.className = 'box active dark-mode'
 True```

 False| 方法 | 说明 |
 False|:--|:--|
 False| `add(...tokens)` | 添加一个或多个类名 |
 False| `remove(...tokens)` | 移除一个或多个类名 |
 False| `toggle(token, force?)` | 切换类名，`force` 为 `true` 添加，`false` 移除 |
 False| `contains(token)` | 是否包含指定类名 |
 False| `replace(old, new)` | 替换类名 |
 False
 False**`className` vs `classList`**：
 False
```js
 Trueel.className = 'box active'
 Trueel.className += ' dark-mode'
 True
 Trueel.classList.add('active', 'dark-mode')
 True```

 False推荐使用 `classList`，语义更清晰且不会意外覆盖已有类名。
 False
 False### 5.3 `getComputedStyle`（计算样式）
 False
 False获取元素最终应用的样式（包括 CSS 继承、层叠、默认值）：
 False
```js
 Trueconst el = document.querySelector('.box')
 Trueconst styles = window.getComputedStyle(el)
 True
 Truestyles.width
 Truestyles.height
 Truestyles.backgroundColor
 Truestyles.fontSize
 Truestyles.marginTop
 True
 Truestyles.getPropertyValue('margin-top')
 True```

 False**注意**：
 False- 返回的是**只读**的 `CSSStyleDeclaration` 对象
 False- 返回的值是**计算值**（如 `font-size: 2em` 可能返回 `32px`）
 False- 简写属性（如 `margin`）可能返回空字符串，需查具体子属性（如 `marginTop`）
 False
 False### 5.4 获取元素尺寸与位置
 False
```js
 Trueconst el = document.querySelector('.box')
 True
 Trueel.offsetWidth
 Trueel.offsetHeight
 Trueel.clientWidth
 Trueel.clientHeight
 Trueel.scrollWidth
 Trueel.scrollHeight
 True
 Trueel.offsetTop
 Trueel.offsetLeft
 Trueel.offsetParent
 True
 Trueel.scrollTop
 Trueel.scrollLeft
 True```

 False**尺寸属性对比**：
 False
 False| 属性 | 包含 padding | 包含 border | 包含 scrollbar | 包含溢出内容 |
 False|:--|:--|:--|:--|:--|
 False| `clientWidth/Height` | [完成] | [错误] | [错误] | [错误] |
 False| `offsetWidth/Height` | [完成] | [完成] | [完成] | [错误] |
 False| `scrollWidth/Height` | [完成] | [错误] | [错误] | [完成] |
 False
 False**获取精确位置**：
 False
```js
 Trueconst rect = el.getBoundingClientRect()
 Truerect.top
 Truerect.right
 Truerect.bottom
 Truerect.left
 Truerect.width
 Truerect.height
 Truerect.x
 Truerect.y
 True```

 False`getBoundingClientRect()` 返回相对于**视口**的位置，随滚动变化。
 False
 False---
 False
 False## 6. 事件系统 (Events)
 False
 False### 6.1 监听与移除
 False
```js
 Truefunction onClick(e) {
 True console.log('clicked', e.target)
 True}
 True
 Trueconst btn = document.querySelector('#btn')
 Truebtn.addEventListener('click', onClick)
 Truebtn.removeEventListener('click', onClick)
 True```

 False移除监听必须使用同一个函数引用，因此匿名函数不便于移除。
 False
 False**`addEventListener` 第三个参数**：
 False
```js
 Truebtn.addEventListener('click', handler, {
 True capture: false,
 True once: true,
 True passive: true
 True})
 True```

 False| 选项 | 说明 |
 False|:--|:--|
 False| `capture` | 在捕获阶段触发（默认 `false`，冒泡阶段） |
 False| `once` | 触发一次后自动移除（默认 `false`） |
 False| `passive` | 声明不会调用 `preventDefault`，优化滚动性能（默认 `false`） |
 False
 False### 6.2 捕获与冒泡
 False
 FalseDOM 事件传播的三个阶段：
 False
```
 True1. 捕获阶段（Capture）：window → document → ... → 目标父元素
 True2. 目标阶段（Target）：目标元素本身
 True3. 冒泡阶段（Bubble）：目标父元素 → ... → document → window
 True```

```html
 True<div id="outer">
 True <div id="inner">
 True <button id="btn">Click</button>
 True </div>
 True</div>
 True```

```js
 Truedocument.getElementById('outer').addEventListener('click', (e) => {
 True console.log('outer capture', e.eventPhase)
 True}, true)
 True
 Truedocument.getElementById('outer').addEventListener('click', (e) => {
 True console.log('outer bubble', e.eventPhase)
 True})
 True
 Truedocument.getElementById('inner').addEventListener('click', (e) => {
 True console.log('inner capture', e.eventPhase)
 True}, true)
 True
 Truedocument.getElementById('inner').addEventListener('click', (e) => {
 True console.log('inner bubble', e.eventPhase)
 True})
 True
 Truedocument.getElementById('btn').addEventListener('click', (e) => {
 True console.log('btn target', e.eventPhase)
 True})
 True```

 False点击按钮后输出顺序：
 False
```
 Trueouter capture 1
 Trueinner capture 1
 Truebtn target 2
 Trueinner bubble 3
 Trueouter bubble 3
 True```

 False**`eventPhase` 值**：1 = 捕获，2 = 目标，3 = 冒泡
 False
 False### 6.3 事件对象常用属性与方法
 False
```js
 Truebtn.addEventListener('click', (e) => {
 True e.target
 True e.currentTarget
 True e.type
 True e.bubbles
 True e.cancelable
 True e.timeStamp
 True e.isTrusted
 True
 True e.preventDefault()
 True e.stopPropagation()
 True e.stopImmediatePropagation()
 True})
 True```

 False| 属性/方法 | 说明 |
 False|:--|:--|
 False| `target` | 触发事件的元素（最内层） |
 False| `currentTarget` | 绑定事件监听的元素（等于 `this`） |
 False| `preventDefault()` | 阻止默认行为（如表单提交、链接跳转） |
 False| `stopPropagation()` | 阻止事件继续传播（捕获/冒泡） |
 False| `stopImmediatePropagation()` | 阻止传播 + 阻止同元素上的后续监听器 |
 False
 False### 6.4 事件委托 (Event Delegation)
 False
 False当列表项动态增删时，把监听挂在父元素上更稳：
 False
```js
 Trueconst list = document.querySelector('#list')
 Truelist.addEventListener('click', (e) => {
 True const item = e.target.closest('.item')
 True if (!item) return
 True console.log('item clicked', item.dataset.id)
 True})
 True```

 False**事件委托的优势**：
 False
 False1. **减少内存**：不需要为每个子元素绑定监听器
 False2. **动态元素**：新增子元素自动拥有事件处理
 False3. **统一管理**：代码更集中、更易维护
 False
 False**适用场景**：
 False
```js
 Truedocument.addEventListener('click', (e) => {
 True if (e.target.matches('.modal-overlay')) {
 True closeModal()
 True }
 True})
 True
 Truedocument.addEventListener('keydown', (e) => {
 True if (e.key === 'Escape') {
 True closeModal()
 True }
 True})
 True```

 False**不适合委托的场景**：
 False
 False- `focus`/`blur` 事件（不冒泡，需用 `focusin`/`focusout` 替代）
 False- `mousemove`/`touchmove` 等高频事件（委托反而增加判断开销）
 False- 需要精确 `currentTarget` 的场景
 False
 False### 6.5 自定义事件
 False
```js
 Trueconst event = new CustomEvent('userLogin', {
 True bubbles: true,
 True detail: { userId: 42, username: 'alice' }
 True})
 True
 Truedocument.dispatchEvent(event)
 True
 Truedocument.addEventListener('userLogin', (e) => {
 True console.log('User logged in:', e.detail.username)
 True})
 True```

 False**应用场景**：
 False
```js
 Trueclass TodoList extends HTMLElement {
 True addTodo(text) {
 True const todo = { id: Date.now(), text }
 True this.dispatchEvent(new CustomEvent('todo-added', {
 True bubbles: true,
 True detail: todo
 True }))
 True }
 True}
 True
 Truedocument.querySelector('todo-list').addEventListener('todo-added', (e) => {
 True console.log('New todo:', e.detail.text)
 True})
 True```

 False### 6.6 常用事件类型汇总
 False
 False| 分类 | 事件 | 说明 |
 False|:--|:--|:--|
 False| 鼠标 | `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove` | 鼠标交互 |
 False| 鼠标 | `mouseenter`, `mouseleave`, `mouseover`, `mouseout` | 鼠标悬停 |
 False| 键盘 | `keydown`, `keyup`, `keypress`(已废弃) | 键盘输入 |
 False| 表单 | `input`, `change`, `submit`, `focus`, `blur` | 表单交互 |
 False| 滚动 | `scroll`, `wheel` | 滚动行为 |
 False| 触摸 | `touchstart`, `touchmove`, `touchend` | 移动端 |
 False| 拖拽 | `dragstart`, `drag`, `dragend`, `drop` | 拖放操作 |
 False| 资源 | `load`, `error`, `DOMContentLoaded` | 资源加载 |
 False| 视口 | `resize`, `scroll`, `visibilitychange` | 视口变化 |
 False
 False---
 False
 False## 7. 性能优化 (Performance)
 False
 False### 7.1 避免布局抖动 (Layout Thrashing)
 False
 False读布局信息（如 `offsetHeight`）会触发布局计算；写样式会使布局失效。交替读写会导致反复布局。
 False
```js
 Trueconst items = document.querySelectorAll('.item')
 Trueitems.forEach((item) => {
 True const height = item.offsetHeight
 True item.style.height = (height * 2) + 'px'
 True})
 True```

 False优化：批量读取，再批量写入：
 False
```js
 Trueconst items = document.querySelectorAll('.item')
 Trueconst heights = Array.from(items, (item) => item.offsetHeight)
 Trueitems.forEach((item, i) => {
 True item.style.height = (heights[i] * 2) + 'px'
 True})
 True```

 False或使用 `requestAnimationFrame`：
 False
```js
 Truefunction updateLayout() {
 True const height = el.offsetHeight
 True requestAnimationFrame(() => {
 True el.style.height = (height * 2) + 'px'
 True })
 True}
 True```

 False### 7.2 `innerHTML` 的取舍
 False
 False- 优点：构建复杂结构时省代码
 False- 风险：容易引入 XSS；会重建子树导致事件丢失
 False
 False当内容来自不可信输入时，不要直接拼接 `innerHTML`。
 False
 False### 7.3 DocumentFragment 与批量操作
 False
```js
 Trueconst frag = document.createDocumentFragment()
 Truefor (let i = 0; i < 100; i++) {
 True const li = document.createElement('li')
 True li.textContent = `Item ${i}`
 True frag.append(li)
 True}
 Truelist.append(frag)
 True```

 FalseFragment 的优势：
 False- 不触发重排（不在 DOM 中）
 False- 插入时 Fragment 自身不进入 DOM 树
 False- 一次重排代替 N 次重排
 False
 False### 7.4 事件节流与防抖
 False
 False高频事件（`scroll`、`resize`、`input`、`mousemove`）需要节流或防抖：
 False
```js
 Truefunction debounce(fn, delay) {
 True let timer = null
 True return function (...args) {
 True clearTimeout(timer)
 True timer = setTimeout(() => fn.apply(this, args), delay)
 True }
 True}
 True
 Truefunction throttle(fn, interval) {
 True let lastTime = 0
 True return function (...args) {
 True const now = Date.now()
 True if (now - lastTime >= interval) {
 True lastTime = now
 True fn.apply(this, args)
 True }
 True }
 True}
 True
 Truewindow.addEventListener('resize', debounce(() => {
 True console.log('Resized:', window.innerWidth)
 True}, 200))
 True
 Truewindow.addEventListener('scroll', throttle(() => {
 True console.log('Scrolled:', window.scrollY)
 True}, 100))
 True```

 False**防抖 vs 节流**：
 False
 False| 对比项 | 防抖 (Debounce) | 节流 (Throttle) |
 False|:--|:--|:--|
 False| 触发时机 | 停止操作后延迟触发 | 按固定间隔触发 |
 False| 类比 | 电梯等人 | 红绿灯 |
 False| 适用场景 | 搜索输入、窗口调整 | 滚动事件、拖拽 |
 False
 False### 7.5 虚拟 DOM 概念
 False
 False直接操作 DOM 的代价高（重排重绘），现代框架引入虚拟 DOM 来优化：
 False
```js
 Trueconst vnode = {
 True tag: 'div',
 True props: { className: 'container' },
 True children: [
 True { tag: 'h1', children: 'Hello' },
 True { tag: 'p', children: 'World' }
 True ]
 True}
 True```

 False**虚拟 DOM 的工作流程**：
 False
 False1. 用 JS 对象描述 UI 结构（虚拟 DOM 树）
 False2. 状态变化时，创建新的虚拟 DOM 树
 False3. Diff 算法比较新旧虚拟 DOM 树差异
 False4. 只将差异部分更新到真实 DOM（最小化 DOM 操作）
 False
 False**虚拟 DOM 的优势**：
 False
 False- 批量更新：多次状态变更合并为一次 DOM 更新
 False- 最小化操作：只更新变化的部分
 False- 跨平台：虚拟 DOM 可以渲染到不同目标（DOM、Canvas、Native）
 False
 False**何时直接操作 DOM**：
 False
 False- 简单交互（不需要框架时）
 False- 性能极端敏感的场景（如动画、Canvas）
 False- 与框架配合的底层操作（如 D3.js 与 React 结合）
 False
 False### 7.6 `passive` 事件监听器
 False
```js
 Truedocument.addEventListener('touchstart', handler, { passive: true })
 Truedocument.addEventListener('wheel', handler, { passive: true })
 True```

 False`passive: true` 告诉浏览器该监听器不会调用 `preventDefault()`，浏览器可以立即开始滚动而不必等待 JS 执行完毕。
 False
 FalseChrome 对 `touchstart`/`touchmove` 默认使用 passive 监听器。
 False
 False---
 False
 False## 8. 安全要点 (Security)
 False
 False### 8.1 XSS 防护
 False
 False- 不可信文本：用 `textContent`
 False
```js
 Trueconst userInput = '<img src=x onerror=alert(1)>'
 Trueel.textContent = userInput
 Trueel.innerHTML = userInput
 True```

 False- 不可信 URL：校验协议（避免 `javascript:`）、限制域名
 False
```js
 Truefunction isSafeUrl(url) {
 True try {
 True const parsed = new URL(url, location.href)
 True return ['http:', 'https:'].includes(parsed.protocol)
 True } catch {
 True return false
 True }
 True}
 True```

 False### 8.2 `innerHTML` 安全
 False
```js
 Trueconst name = getUserInput()
 Trueel.innerHTML = `<p>Hello, ${name}</p>`
 True```

 False**安全替代方案**：
 False
```js
 Trueconst p = document.createElement('p')
 Truep.textContent = `Hello, ${name}`
 Trueel.append(p)
 True```

 False或使用 `DOMPurify` 库：
 False
```js
 Trueimport DOMPurify from 'dompurify'
 Trueel.innerHTML = DOMPurify.sanitize(untrustedHtml)
 True```

 False### 8.3 事件监听器泄漏
 False
```js
 Trueclass Modal {
 True constructor() {
 True this.onKeydown = this.onKeydown.bind(this)
 True }
 True
 True open() {
 True document.addEventListener('keydown', this.onKeydown)
 True }
 True
 True close() {
 True document.removeEventListener('keydown', this.onKeydown)
 True }
 True
 True onKeydown(e) {
 True if (e.key === 'Escape') this.close()
 True }
 True}
 True```

 False**常见泄漏场景**：
 False- SPA 路由切换时未移除全局事件监听
 False- 组件销毁时未清理 `setInterval`/`setTimeout`
 False- 闭包引用了已移除的 DOM 节点
 False
 False### 8.4 模板渲染安全
 False
 False优先使用成熟框架或做统一的转义/白名单策略：
 False
```js
 Truefunction escapeHtml(str) {
 True const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
 True return str.replace(/[&<>"']/g, (c) => map[c])
 True}
 True
 Trueel.innerHTML = `<p>${escapeHtml(userInput)}</p>`
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: v4.0.0 大幅扩充——新增节点类型与关系详解、属性操作(dataset/getAttribute)、样式操作(classList/getComputedStyle/getBoundingClientRect)、自定义事件、事件节流防抖、虚拟DOM概念、passive监听器、XSS防护与事件泄漏
 False- 2026-04-06: 新增「DOM 操作与事件」知识点，补充事件委托、性能与安全实践
 False