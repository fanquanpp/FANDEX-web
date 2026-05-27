# JavaScript 练习题
 False
 False> @Module: javascript
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 以下代码输出什么？
 False
```javascript
 Truefor (var i = 0; i < 3; i++) {
 True setTimeout(() => console.log(i), 100);
 True}
 True```

 FalseA. 0, 1, 2
 FalseB. 3, 3, 3
 FalseC. undefined, undefined, undefined
 FalseD. 报错
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `var` 声明的 `i` 是函数作用域，循环结束后 `i` 为 3。三个 `setTimeout` 回调共享同一个 `i`，因此都输出 3。若用 `let` 声明，每次迭代有独立的绑定，会输出 0, 1, 2。
 False</details>
 False
 False### 2. 关于原型链，以下说法正确的是？
 False
```javascript
 Truefunction Foo() {}
 TrueFoo.prototype.x = 1;
 Trueconst f = new Foo();
 True```

 FalseA. `f.hasOwnProperty('x')` 返回 `true`
 FalseB. `Foo.prototype.isPrototypeOf(f)` 返回 `true`
 FalseC. `f.__proto__ === Foo` 返回 `true`
 FalseD. `Object.getPrototypeOf(f) === Object.prototype` 返回 `true`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `x` 定义在原型上而非实例自身，所以 `hasOwnProperty('x')` 返回 `false`。`f.__proto__` 指向 `Foo.prototype` 而非 `Foo`，所以 C 错。`Object.getPrototypeOf(f)` 返回 `Foo.prototype`，不是 `Object.prototype`，所以 D 错。B 正确，`Foo.prototype` 确实在 `f` 的原型链上。
 False</details>
 False
 False### 3. 以下代码的输出顺序是？
 False
```javascript
 Trueconsole.log(1);
 TruePromise.resolve().then(() => console.log(2));
 TruesetTimeout(() => console.log(3), 0);
 Trueconsole.log(4);
 True```

 FalseA. 1, 2, 3, 4
 FalseB. 1, 4, 2, 3
 FalseC. 1, 4, 3, 2
 FalseD. 1, 2, 4, 3
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: 同步代码先执行（1, 4）。微任务（Promise.then）优先于宏任务（setTimeout），所以 2 在 3 之前。完整顺序：1 → 4 → 2 → 3。
 False</details>
 False
 False### 4. 以下 ES6+ 特性中，哪个不能在运行时改变？
 False
 FalseA. `const` 声明的对象的属性
 FalseB. `let` 声明的变量的值
 FalseC. `const` 声明的变量的绑定
 FalseD. `Symbol` 作为属性键
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `const` 保证变量的绑定不可变，但对象属性仍可修改。`let` 变量可重新赋值。`Symbol` 作为属性键完全合法。只有 `const` 的绑定本身不可重新赋值。
 False</details>
 False
 False### 5. 以下哪个方法不会触发重排（reflow）？
 False
 FalseA. `element.style.width = '100px'`
 FalseB. `element.classList.add('active')`
 FalseC. `element.textContent = 'hello'`
 FalseD. `element.getAttribute('data-id')`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: D
 False
 False**解析**: `getAttribute` 只是读取属性值，不涉及 DOM 渲染变更。修改样式、类名、文本内容都可能触发重排或重绘。
 False</details>
 False
 False## 编程题
 False
 False### 1. 防抖函数
 False
 False实现 `debounce(fn, delay)` 函数，在最后一次调用后延迟 `delay` 毫秒才执行。
 False
 False**输入**: 连续快速调用 `log()` 5 次，delay 为 300ms
 False**输出**: 仅在最后一次调用后 300ms 执行一次
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Truefunction debounce(fn, delay) {
 True let timer = null;
 True return function (...args) {
 True clearTimeout(timer);
 True timer = setTimeout(() => {
 True fn.apply(this, args);
 True }, delay);
 True };
 True}
 True```
</details>
 False
 False### 2. 深拷贝
 False
 False实现 `deepClone(obj)` 函数，支持对象、数组、Date、RegExp 和基本类型的深拷贝，处理循环引用。
 False
 False**输入**: `{ a: 1, b: { c: 2 }, d: [3, 4] }`
 False**输出**: 结构相同但引用不同的新对象
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Truefunction deepClone(obj, cache = new WeakMap()) {
 True if (obj === null || typeof obj !== 'object') return obj;
 True if (cache.has(obj)) return cache.get(obj);
 True
 True if (obj instanceof Date) return new Date(obj);
 True if (obj instanceof RegExp) return new RegExp(obj);
 True
 True const clone = Array.isArray(obj) ? [] : {};
 True cache.set(obj, clone);
 True
 True for (const key of Object.keys(obj)) {
 True clone[key] = deepClone(obj[key], cache);
 True }
 True return clone;
 True}
 True```
</details>
 False
 False### 3. Promise 并发控制
 False
 False实现 `limitConcurrency(tasks, limit)` 函数，`tasks` 是返回 Promise 的函数数组，`limit` 是最大并发数。所有任务完成后返回结果数组。
 False
 False**输入**: 6 个异步任务，并发限制为 2
 False**输出**: 6 个任务的结果数组，按原始顺序排列
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```javascript
 Trueasync function limitConcurrency(tasks, limit) {
 True const results = new Array(tasks.length);
 True let nextIndex = 0;
 True
 True async function worker() {
 True while (nextIndex < tasks.length) {
 True const index = nextIndex++;
 True results[index] = await tasks[index]();
 True }
 True }
 True
 True const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
 True await Promise.all(workers);
 True return results;
 True}
 True```
</details>
 False