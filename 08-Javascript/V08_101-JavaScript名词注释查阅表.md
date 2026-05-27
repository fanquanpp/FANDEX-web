# JavaScript-专有名词注释查阅表 | JavaScript

> @Author: fanquanpp
> @Category: JavaScript Basics
> @Description: JavaScript-专有名词注释查阅表 | JavaScript
> @Updated: 2026-05-03

---

## 目录

1. [基础概念类](#基础概念类)

---

## 1. 基础概念类

### 1.1 JavaScript

**名称**：JavaScript（网页脚本语言）

**首次出现位置**：C08_101-概述与环境.md 第1章

**定义**：
JavaScript 是 Netscape 于 1995 年创建的脚本语言，最初用于浏览器端交互控制，现已发展为全栈语言。

**详解**：
JavaScript 是 Web 三大核心技术之一（HTML + CSS + JavaScript）。核心特性：动态类型、基于原型继承、函数式编程支持、异步编程（Promise、async/await）。标准：ECMAScript（ES）是 JavaScript 的语言规范。执行环境：浏览器（V8）、Node.js（V8）、Deno。

---

### 1.2 ECMAScript

**名称**：ECMAScript（European Computer Manufacturers Association Script）

**缩写**：ES

**首次出现位置**：C08_101-概述与环境.md 第2章

**定义**：
ECMAScript 是 JavaScript 语言的官方标准，由 ECMA 国际组织制定，定义了语言的语法、数据类型、对象模型等核心规范。

**详解**：
版本历史：ES3（1999）、ES5（2009）、ES6/ES2015（重要更新）、ES2016+ 每年发布。ES6 新特性：let/const、箭头函数、Promise、Class、Module、Template Literals、Destructure。TC39：负责 ECMAScript 演进的委员会。

---

### 1.3 V8 引擎

**名称**：V8 JavaScript 引擎（V8 Engine）

**首次出现位置**：C08_101-概述与环境.md 第2章

**定义**：
V8 是 Google 开发的开源 JavaScript 引擎，使用 JIT（即时）编译技术，将 JavaScript 代码编译为机器码执行。

**详解**：
应用：Chrome 浏览器、Node.js、Deno。编译流程：源代码 → Parser → AST → Ignition（解释器）+ TurboFan（优化编译器）。JIT 编译：热点代码被识别后由解释器转为优化编译器生成高效机器码。

---

### 1.4 Node.js

**名称**：Node.js（Node.js）

**首次出现位置**：C08_101-概述与环境.md 第3章

**定义**：
Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时环境，允许在服务器端运行 JavaScript。

**详解**：
Ryan Dahl 于 2009 年创建。特点：事件驱动、非阻塞 I/O、适合高并发。npm：Node Package Manager，世界上最大的软件注册表。模块系统：CommonJS（require/module.exports）。

---

### 1.5 npm

**名称**：Node 包管理器（Node Package Manager）

**缩写**：npm

**首次出现位置**：C08_101-概述与环境.md 第3章

**定义**：
npm 是 Node.js 的默认包管理器，用于安装、分享、发布 JavaScript 包和依赖管理。

**详解**：
初始化项目：`npm init`。安装依赖：`npm install <package>`。package.json：项目配置文件。语义版本：~、^、* 控制版本范围。

---

### 1.6 typeof

**名称**：类型检查（typeof）

**首次出现位置**：C08_102-变量与数据类型.md 第1章

**定义**：
typeof 是 JavaScript 的一元运算符，返回表示数据类型的字符串。

**详解**：
返回值："undefined"、"object"、"boolean"、"number"、"string"、"function"、"symbol"、"bigint"。typeof null === "object"：历史 bug。

---

### 1.7 undefined / null

**名称**：未定义 / 空值（undefined / null）

**首次出现位置**：C08_102-变量与数据类型.md 第1章

**定义**：
undefined 表示变量已声明但未赋值，null 是开发者主动赋值的空值。

**详解**：
undefined：系统级的未初始化。null：开发者主动赋值表示空值。比较：null == undefined 为 true，null === undefined 为 false。

---

### 1.8 Symbol / BigInt

**名称**：符号 / 大整数（Symbol / BigInt）

**首次出现位置**：C08_102-变量与数据类型.md 第2章

**定义**：
Symbol 创建唯一标识符，BigInt 表示任意精度整数。

**详解**：
Symbol：`const sym = Symbol('description')`。BigInt：`const big = 9007199254740993n`。

---

### 1.9 类型转换

**名称**：类型转换（Type Coercion）

**首次出现位置**：C08_102-变量与数据类型.md 第3章

**定义**：
JavaScript 在运算时自动转换数据类型（隐式转换），或通过 Number()、String()、Boolean() 显式转换。

**详解**：
隐式转换："5" + 2 → "52"，"5" - 2 → 3。假值：0、""、null、undefined、NaN、false 转 false。

---

### 2.0 var / let / const

**名称**：变量声明关键字（var / let / const）

**首次出现位置**：C08_102-变量与数据类型.md 第1章

**定义**：
var 是 ES5 的变量声明，let/const 是 ES6 引入的块级变量/常量声明。

**详解**：
var：函数作用域、变量提升。let：块级作用域、暂时性死区。const：块级作用域、声明后不可重新赋值（基本类型）。

---

### 2.1 作用域（Scope）

**名称**：作用域（Scope）

**首次出现位置**：C08_106-函数与作用域.md 第1章

**定义**：
作用域是 JavaScript 中变量和函数的可访问范围。

**详解**：
全局作用域：函数外声明。函数作用域：函数内声明。块级作用域：let/const 在 `{}` 内有效。词法作用域：作用域在定义时决定。

---

### 2.2 变量提升（Hoisting）

**名称**：变量提升（Hoisting）

**首次出现位置**：C08_106-函数与作用域.md 第1章

**定义**：
变量提升是 JavaScript 引擎将变量和函数声明在编译阶段提升到当前作用域顶部的行为。

**详解**：
var 提升：声明提升到函数顶部。function 提升：整个函数体提升。let/const 提升但不初始化：访问会触发暂时性死区。

---

### 2.3 闭包（Closure）

**名称**：闭包（Closure）

**首次出现位置**：C08_106-函数与作用域.md 第3章

**定义**：
闭包是函数能够记住并访问其创建时的词法作用域，即使函数在作用域外执行。

**详解**：
形成条件：函数嵌套、引用外部变量、外部函数返回内部函数。应用：数据私有、工厂函数、记忆化、回调函数。

---

### 2.4 函数声明 / 表达式

**名称**：函数声明 / 表达式（Function Declaration / Expression）

**首次出现位置**：C08_106-函数与作用域.md 第2章

**定义**：
函数声明使用 function 关键字，函数表达式将函数赋值给变量。

**详解**：
函数声明：具有函数提升特性。函数表达式：不提升，可作为回调。IIFE：立即执行函数表达式 `(function() {})()`。

---

### 2.5 箭头函数

**名称**：箭头函数（Arrow Function）

**首次出现位置**：C08_106-函数与作用域.md 第4章

**定义**：
箭头函数是 ES6 引入的简洁函数语法，使用 `=>` 箭头定义，具有词法 this 绑定。

**详解**：
语法：`const f = x => x * 2`。this 词法：箭头函数的 this 指向定义时的外部 this。不能用作方法、不能用作构造器。

---

### 2.6 this 绑定

**名称**：this 绑定（this Binding）

**首次出现位置**：C08_106-函数与作用域.md 第5章

**定义**：
this 是函数内部的关键字，指向调用函数的对象或上下文。

**详解**：
默认绑定：独立函数调用，this 全局对象（严格模式下 undefined）。隐式绑定：对象方法调用，this 指向方法所属对象。显式绑定：call/apply/bind 显式指定。new 绑定：构造函数调用。箭头函数：this 词法绑定。

---

### 2.7 call / apply / bind

**名称**：显式 this 绑定方法（call / apply / bind）

**首次出现位置**：C08_106-函数与作用域.md 第5章

**定义**：
call、apply、bind 用于显式设置函数执行时的 this 值。

**详解**：
call：`fn.call(thisArg, arg1, arg2)`。apply：`fn.apply(thisArg, [argsArray])`。bind：`const boundFn = fn.bind(thisArg)` 返回绑定 this 的新函数。

---

### 2.8 参数默认值 / 剩余参数

**名称**：默认参数 / 剩余参数（Default Parameters / Rest Parameters）

**首次出现位置**：C08_106-函数与作用域.md 第2章

**定义**：
参数默认值在调用时未传递参数使用默认值，剩余参数将不定数量的参数收集为数组。

**详解**：
默认值：`function f(x = 10) {}`。剩余参数：`function f(...args) {}`。

---

### 2.9 解构赋值

**名称**：解构赋值（Destructuring Assignment）

**首次出现位置**：C08_107-对象与数组.md 第3章

**定义**：
解构赋值允许从数组或对象中提取值赋给变量。

**详解**：
数组解构：`const [a, b] = [1, 2]`。对象解构：`const {name, age} = person`。默认值：`const {x = 1} = {}`。

---

### 3.0 对象字面量

**名称**：对象字面量（Object Literal）

**首次出现位置**：C08_107-对象与数组.md 第1章

**定义**：
对象字面量是创建对象的简洁语法，使用花括号包裹属性名和属性值。

**详解**：
属性简写：`const obj = { name }`。方法简写：`const obj = { f() {} }`。计算属性名：`const obj = { [expr]: value }`。

---

### 3.1 原型链

**名称**：原型链（Prototype Chain）

**首次出现位置**：C08_109-原型与继承.md 第1章

**定义**：
原型链是 JavaScript 实现继承的机制，每个对象都有指向另一个对象的原型。

**详解**：
**proto**：对象到原型的引用。Object.prototype：原型链终点，值为 null。属性查找：对象本身 → 原型 → 原型的原型 → null。

---

### 3.2 原型继承

**名称**：原型继承（Prototype Inheritance）

**首次出现位置**：C08_109-原型与继承.md 第2章

**定义**：
原型继承是 JavaScript 的继承方式，通过设置对象的 prototype 实现属性和方法的复用。

**详解**：
Object.create()：创建以指定对象为原型的对象。ES6 class：extends 关键字实现更清晰的继承语法。

---

### 3.3 class

**名称**：类（class）

**首次出现位置**：C08_109-原型与继承.md 第3章

**定义**：
class 是 ES6 引入的类声明语法，基于原型继承，提供更简洁的面向对象编程方式。

**详解**：
声明：`class Person { constructor() {} methods() {} }`。extends：继承父类。super：调用父类构造函数或方法。static：静态方法。class 是语法糖。

---

### 3.4 数组

**名称**：数组（Array）

**首次出现位置**：C08_107-对象与数组.md 第2章

**定义**：
数组是有序的可迭代对象集合，每个位置有索引（0 开始），可存储任意类型元素。

**详解**：
创建：`const arr = [1, 2, 3]`、`new Array(5)`。常用方法：push/pop、shift/unshift、slice/splice、concat、join、map/filter/reduce。

---

### 3.5 Map / Set

**名称**：Map / Set 数据结构（Map / Set）

**首次出现位置**：C08_107-对象与数组.md 第5章

**定义**：
Map 是键值对集合，Set 是唯一值集合。

**详解**：
Map：`new Map()`、set/get/has/delete。Set：`new Set([1, 2])`、add/has/delete。WeakMap/WeakSet：弱引用，不阻止 GC。

---

### 3.6 回调函数

**名称**：回调函数（Callback Function）

**首次出现位置**：C08_108-异步编程.md 第1章

**定义**：
回调函数是作为参数传递给另一个函数的函数，在特定事件发生或操作完成后被调用。

**详解**：
回调地狱：多层嵌套回调导致代码难以维护。解决：Promise、async/await。

---

### 3.7 Promise

**名称**：Promise（Promise）

**首次出现位置**：C08_108-异步编程.md 第2章

**定义**：
Promise 是 ES6 引入的异步编程解决方案，代表一个异步操作的最终结果。

**详解**：
状态：pending、fulfilled、rejected。方法：then、catch、finally。静态方法：Promise.all、Promise.race、Promise.resolve、Promise.reject。

---

### 3.8 async / await

**名称**：异步函数（async / await）

**首次出现位置**：C08_108-异步编程.md 第3章

**定义**：
async/await 是 ES2017 引入的异步编程语法，让异步代码看起来像同步代码。

**详解**：
async 函数自动返回 Promise。await 暂停函数执行，等待 Promise resolve。错误处理：try...catch...。

---

### 3.9 事件循环

**名称**：事件循环（Event Loop）

**首次出现位置**：C08_108-异步编程.md 第4章

**定义**：
事件循环是 JavaScript 运行时处理异步代码的机制。

**详解**：
调用栈：执行同步代码。任务队列：待执行的异步回调（宏任务）。微任务队列：Promise 回调。执行顺序：调用栈清空 → 微任务队列全部 → 任务队列取一个 → 重复。

---

### 4.0 fetch API

**名称**：Fetch API（Fetch API）

**首次出现位置**：C08_108-异步编程.md 第2章

**定义**：
fetch 是现代浏览器提供的网络请求 API，基于 Promise。

**详解**：
`fetch(url).then(res => res.json())`。POST：`fetch(url, {method: 'POST', body: ...})`。AbortController 可取消请求。

---

### 4.1 DOM

**名称**：文档对象模型（Document Object Model）

**缩写**：DOM

**首次出现位置**：C08_111-DOM操作.md 第1章

**定义**：
DOM 是 HTML/XML 文档的编程接口，将文档表示为节点树结构。

**详解**：
DOM Tree：文档节点、元素节点、文本节点。节点类型：ELEMENT_NODE(1)、TEXT_NODE(3)。document 对象：DOM 入口。

---

### 4.2 选择器

**名称**：DOM 选择器（Selectors）

**首次出现位置**：C08_111-DOM操作.md 第2章

**定义**：
DOM 选择器 API 用于通过 CSS 选择器查找 DOM 元素。

**详解**：
querySelector：返回第一个匹配元素。querySelectorAll：返回 NodeList。getElementById：快速获取 ID。

---

### 4.3 事件

**名称**：DOM 事件（Event）

**首次出现位置**：C08_111-DOM操作.md 第3章

**定义**：
DOM 事件是用户操作或浏览器状态变化时产生的信号。

**详解**：
事件类型：鼠标事件（click）、键盘事件（keydown）、表单事件（submit）。addEventListener：添加事件监听。stopPropagation：阻止传播。preventDefault：阻止默认行为。

---

### 4.4 事件冒泡与捕获

**名称**：事件冒泡与捕获（Event Bubbling / Capturing）

**首次出现位置**：C08_111-DOM操作.md 第3章

**定义**：
事件传播的两个阶段，冒泡从目标向上传播，捕获从根向下传播到目标。

**详解**：
冒泡：事件从目标元素向上传播到祖先元素。捕获：事件从根元素向下传播到目标。addEventListener 第三个参数控制。

---

### 4.5 模块化

**名称**：模块化（Module）

**首次出现位置**：C08_110-模块化.md 第1章

**定义**：
模块化是将代码分割为独立模块，通过 import/export 组合使用。

**详解**：
ES Modules：`import/export`。CommonJS：`require/module.exports`。动态导入：`import()`。模块是单例。

---

### 4.6 export / import

**名称**：导出 / 导入（export / import）

**首次出现位置**：C08_110-模块化.md 第1章

**定义**：
export 导出模块的接口，import 导入其他模块的导出。

**详解**：
命名导出：`export const name = ...`。默认导出：`export default ...`。导入：`import name from './module'`。as 别名：`import { name as alias }`。

---

### 4.7 迭代器

**名称**：迭代器（Iterator）

**首次出现位置**：C08_107-对象与数组.md 第4章

**定义**：
迭代器是实现了 iterator protocol 的对象。

**详解**：
next() 方法返回 { value, done }。for...of 遍历可迭代对象。生成器：`function*`。

---

### 4.8 Generator

**名称**：生成器（Generator）

**首次出现位置**：C08_107-对象与数组.md 第4章

**定义**：
生成器是 ES6 引入的可以暂停和恢复执行的函数。

**详解**：
function*：声明生成器函数。yield：暂停点。for...of 自动迭代。生成器函数返回迭代器。

---

### 4.9 Proxy

**名称**：代理（Proxy）

**首次出现位置**：C08_109-原型与继承.md 第4章

**定义**：
Proxy 用于创建一个对象的代理，从而可以在访问对象时进行拦截和修改。

**详解**：
`new Proxy(target, handler)`。handler：get、set、has、deleteProperty 等拦截器。Reflect：与 Proxy 配合使用的反射 API。

---

### 5.0 Reflect

**名称**：反射（Reflect）

**首次出现位置**：C08_109-原型与继承.md 第4章

**定义**：
Reflect 是 ES6 提供的对象操作 API，与 Proxy 配合使用。

**详解**：
Reflect.get()、Reflect.set()、Reflect.has()、Reflect.deleteProperty() 等。与 Proxy handler 方法一一对应。

---

### 5.1 垃圾回收

**名称**：垃圾回收（Garbage Collection）

**首次出现位置**：C08_106-函数与作用域.md 第6章

**定义**：
JavaScript 引擎自动回收不再使用的对象所占用的内存。

**详解**：
引用计数：无法处理循环引用。标记清除：主流算法。分代回收：年轻代/老年代。内存泄漏：闭包、全局变量、DOM 引用。

---

### 5.2 防抖与节流

**名称**：防抖与节流（Debounce / Throttle）

**首次出现位置**：G08_201-调试与性能优化.md 第3章

**定义**：
防抖是事件触发 n 秒后执行，节流是事件触发后 n 秒内只执行一次。

**详解**：
防抖：最后一次触发有效。节流：固定时间间隔执行。应用：搜索输入、滚动事件、按钮点击。

---

### 5.3 柯里化

**名称**：柯里化（Currying）

**首次出现位置**：C08_106-函数与作用域.md 第6章

**定义**：
柯里化是将接受多个参数的函数转换为接受一个参数的函数序列。

**详解**：
`const curried = (a) => (b) => a + b`。部分应用：`curried(1)(2)`。应用：函数复用、参数预置。

---

### 5.4 组合函数

**名称**：组合函数（Function Composition）

**首次出现位置**：C08_106-函数与作用域.md 第6章

**定义**：
组合函数是将多个函数组合成一个函数，依次执行。

**详解**：
`const compose = (f, g) => x => f(g(x))`。从右到左执行。Pipeline：`pipe` 从左到右。应用：数据处理流程。

---

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
