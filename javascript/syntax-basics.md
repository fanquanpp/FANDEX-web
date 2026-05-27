# 程序结构与基本语法 (Program Structure & Basic Syntax)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: JS Basics
 False> @Description: JS 引入方式、注释、标识符命名、变量声明及严格模式。 | JS inclusion, comments, naming, declarations, and Strict Mode.
 False
 False---
 False
 False## 目录
 False
 False1. [引入方式](#引入方式)
 False2. [语句与注释](#语句与注释)
 False3. [变量声明](#变量声明)
 False4. [标识符规范](#标识符规范)
 False5. [严格模式](#严格模式)
 False6. [代码风格](#代码风格)
 False7. [常见错误与解决方案](#常见错误与解决方案)
 False8. [实战示例](#实战示例)
 False9. [总结](#总结)
 False
 False---
 False
 False## 1. 引入方式 (Inclusion)
 False
 FalseJavaScript 可以通过多种方式引入到网页中，每种方式都有其适用场景和特点。
 False
 False### 1.1 内部脚本 (Inline Script)
 False
 False**语法**: 在 HTML 文件中使用 `<script>` 标签包裹 JavaScript 代码。
 False
 False**示例**:
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>内部脚本示例</title>
 True</head>
 True<body>
 True <h1>Hello, JavaScript!</h1>
 True 
 True <script>
 True // 内部脚本
 True console.log("Hello from inline script!");
 True 
 True // 定义函数
 True function greet() {
 True alert("Hello, world!");
 True }
 True 
 True // 调用函数
 True greet();
 True </script>
 True</body>
 True</html>
 True```

 False**特点**:
 False
 False- 简单直接，适合小型脚本
 False- 代码与 HTML 混合，不利于维护
 False- 页面加载时执行
 False
 False### 1.2 外部文件 (External Script)
 False
 False**语法**: 使用 `<script src="path/to/script.js"></script>` 引入外部 JavaScript 文件。
 False
 False**示例**:
 False
 False**HTML 文件**:
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>外部脚本示例</title>
 True</head>
 True<body>
 True <h1>Hello, JavaScript!</h1>
 True 
 True <script src="app.js"></script>
 True</body>
 True</html>
 True```

 False**app.js 文件**:
 False
```javascript
 True// 外部脚本
 Trueconsole.log("Hello from external script!");
 True
 Truefunction greet() {
 True alert("Hello, world!");
 True}
 True
 Truegreet();
 True```

 False**特点**:
 False
 False- 代码与 HTML 分离，便于维护
 False- 可重用性高
 False- 可以被浏览器缓存
 False- 页面加载时执行
 False
 False### 1.3 现代模块 (ESM - ES Modules)
 False
 False**语法**: 使用 `<script type="module" src="main.js"></script>` 引入 ES 模块。
 False
 False**示例**:
 False
 False**HTML 文件**:
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>ES 模块示例</title>
 True</head>
 True<body>
 True <h1>Hello, JavaScript!</h1>
 True 
 True <script type="module" src="main.js"></script>
 True</body>
 True</html>
 True```

 False**main.js 文件**:
 False
```javascript
 True// 导入模块
 Trueimport { greet } from './utils.js';
 True
 Trueconsole.log("Hello from ES module!");
 Truegreet();
 True```

 False**utils.js 文件**:
 False
```javascript
 True// 导出模块
 Trueexport function greet() {
 True alert("Hello from module!");
 True}
 True```

 False**特点**:
 False
 False- 支持模块化开发
 False- 变量默认是局部作用域
 False- 支持 `import` 和 `export` 语法
 False- 延迟执行 (defer)
 False- 跨域需要 CORS 支持
 False
 False### 1.4 脚本加载顺序
 False
 False**正常脚本** (`<script>`):
 False
 False- 页面解析到脚本标签时立即执行
 False- 执行过程中暂停 HTML 解析
 False
 False**延迟脚本** (`<script defer>`):
 False
 False- 脚本会在 HTML 解析完成后执行
 False- 多个 defer 脚本按顺序执行
 False- 适合外部脚本
 False
 False**异步脚本** (`<script async>`):
 False
 False- 脚本会在下载完成后立即执行
 False- 不阻塞 HTML 解析
 False- 多个 async 脚本执行顺序不确定
 False- 适合独立的脚本，如统计代码
 False
 False**示例**:
 False
```html
 True<!-- 正常脚本 -->
 True<script src="normal.js"></script>
 True
 True<!-- 延迟脚本 -->
 True<script src="deferred.js" defer></script>
 True
 True<!-- 异步脚本 -->
 True<script src="async.js" async></script>
 True
 True<!-- ES 模块默认延迟执行 -->
 True<script type="module" src="module.js"></script>
 True```

 False## 2. 语句与注释 (Statements & Comments)
 False
 False### 2.1 语句 (Statements)
 False
 FalseJavaScript 语句是执行特定操作的指令，通常以分号 (`;`) 结尾。
 False
 False**基本语句**:
 False
```javascript
 True// 变量声明语句
 Truelet x = 10;
 True
 True// 赋值语句
 Truex = 20;
 True
 True// 函数调用语句
 Trueconsole.log(x);
 True
 True// 条件语句
 Trueif (x > 15) {
 True console.log("x 大于 15");
 True}
 True
 True// 循环语句
 Truefor (let i = 0; i < 5; i++) {
 True console.log(i);
 True}
 True```

 False**分号使用**:
 False
 False- 分号在 JavaScript 中是可选的，但推荐使用
 False- 自动分号插入 (ASI) 会在某些情况下自动添加分号
 False- 为了代码的一致性和避免潜在问题，建议始终使用分号
 False
 False**代码块**:
 False
 False- 使用大括号 `{}` 包裹的语句集合
 False- 创建块级作用域
 False
```javascript
 True{
 True let blockVar = "只在块内可见";
 True console.log(blockVar); // 输出: 只在块内可见
 True}
 True
 Trueconsole.log(blockVar); // 报错: blockVar is not defined
 True```

 False### 2.2 注释 (Comments)
 False
 False注释是代码中不会被执行的文本，用于解释代码的功能和逻辑。
 False
 False**单行注释**:
 False
 False- 使用 `//` 开头
 False- 注释从 `//` 开始到行尾
 False
```javascript
 True// 这是一个单行注释
 Truelet x = 10; // 这也是一个单行注释
 True```

 False**多行注释**:
 False
 False- 使用 `/*` 开始，`*/` 结束
 False- 可以跨越多行
 False
```javascript
 True/*
 True这是一个
 True多行注释
 True*/
 Truelet y = 20;
 True```

 False**文档注释**:
 False
 False- 使用 `/**` 开始，`*/` 结束
 False- 用于生成 API 文档
 False- 支持 JSDoc 语法
 False
```javascript
 True/**
 True * 计算两个数的和
 True * @param {number} a - 第一个数
 True * @param {number} b - 第二个数
 True * @returns {number} 两个数的和
 True */
 Truefunction add(a, b) {
 True return a + b;
 True}
 True```

 False**注释最佳实践**:
 False
 False- 注释应该解释代码的"为什么"，而不是"是什么"
 False- 保持注释与代码同步
 False- 避免过多的注释，代码本身应该清晰易懂
 False- 使用文档注释记录函数、类和模块
 False
 False## 3. 变量声明 (Variable Declarations)
 False
 FalseJavaScript 提供了三种变量声明方式：`var`、`let` 和 `const`。
 False
 False### 3.1 var
 False
 False**特点**:
 False
 False- 函数作用域
 False- 存在变量提升 (Hoisting)
 False- 可以重复声明
 False- 可以在声明前使用
 False
 False**示例**:
 False
```javascript
 True// 变量提升 - 可以在声明前使用
 Trueconsole.log(x); // 输出: undefined
 True
 Truevar x = 10;
 True
 True// 函数作用域
 Truefunction test() {
 True var y = 20;
 True console.log(y); // 输出: 20
 True}
 True
 Truetest();
 Trueconsole.log(y); // 报错: y is not defined
 True
 True// 重复声明
 Truevar x = 30;
 Trueconsole.log(x); // 输出: 30
 True```

 False**注意**: `var` 由于其作用域和变量提升的特性，容易导致意外的行为，因此不推荐使用。
 False
 False### 3.2 let
 False
 False**特点**:
 False
 False- 块级作用域
 False- 不存在变量提升
 False- 不能重复声明
 False- 声明后可以修改值
 False
 False**示例**:
 False
```javascript
 True// 不存在变量提升
 Trueconsole.log(z); // 报错: z is not defined
 True
 Truelet z = 10;
 True
 True// 块级作用域
 Trueif (true) {
 True let z = 20;
 True console.log(z); // 输出: 20
 True}
 Trueconsole.log(z); // 输出: 10
 True
 True// 不能重复声明
 True// let z = 30; // 报错: Identifier 'z' has already been declared
 True
 True// 可以修改值
 Truez = 30;
 Trueconsole.log(z); // 输出: 30
 True```

 False**推荐**: `let` 适用于需要在作用域内修改值的变量。
 False
 False### 3.3 const
 False
 False**特点**:
 False
 False- 块级作用域
 False- 不存在变量提升
 False- 不能重复声明
 False- 必须初始化
 False- 不能修改值（但对象和数组的内容可以修改）
 False
 False**示例**:
 False
```javascript
 True// 必须初始化
 True// const PI; // 报错: Missing initializer in const declaration
 True
 Trueconst PI = 3.14159;
 True
 True// 块级作用域
 Trueif (true) {
 True const PI = 3.14;
 True console.log(PI); // 输出: 3.14
 True}
 Trueconsole.log(PI); // 输出: 3.14159
 True
 True// 不能修改值
 True// PI = 3.14; // 报错: Assignment to constant variable
 True
 True// 对象和数组的内容可以修改
 Trueconst person = { name: "Alice" };
 Trueperson.name = "Bob"; // 允许
 Trueconsole.log(person); // 输出: { name: "Bob" }
 True
 Trueconst numbers = [1, 2, 3];
 Truenumbers.push(4); // 允许
 Trueconsole.log(numbers); // 输出: [1, 2, 3, 4]
 True
 True// 但不能重新赋值
 True// person = { name: "Charlie" }; // 报错: Assignment to constant variable
 True// numbers = [4, 5, 6]; // 报错: Assignment to constant variable
 True```

 False**推荐**: `const` 适用于不需要修改值的常量，是默认的变量声明方式。
 False
 False### 3.4 变量提升 (Hoisting)
 False
 False变量提升是 JavaScript 的一种机制，其中变量和函数声明会被提升到作用域的顶部。
 False
 False**var 提升**:
 False
 False- 变量声明会被提升，但赋值不会
 False- 函数声明会被完全提升
 False
 False**示例**:
 False
```javascript
 True// var 变量提升
 Trueconsole.log(a); // 输出: undefined
 Truevar a = 10;
 Trueconsole.log(a); // 输出: 10
 True
 True// 函数声明提升
 Truefoo(); // 输出: Hello
 Truefunction foo() {
 True console.log("Hello");
 True}
 True
 True// 函数表达式不会提升
 Truebar(); // 报错: bar is not a function
 Truevar bar = function() {
 True console.log("Hello");
 True};
 True```

 False**let 和 const 提升**:
 False
 False- 声明会被提升，但处于"暂存死区" (Temporal Dead Zone, TDZ)
 False- 在声明前访问会报错
 False
 False**示例**:
 False
```javascript
 True// 暂存死区
 Trueconsole.log(b); // 报错: Cannot access 'b' before initialization
 Truelet b = 20;
 True
 Trueconsole.log(c); // 报错: Cannot access 'c' before initialization
 Trueconst c = 30;
 True```

 False## 4. 标识符规范 (Identifiers)
 False
 False标识符是变量、函数、类、属性等的名称。
 False
 False### 4.1 命名规则
 False
 False- **允许的字符**: 字母 (a-z, A-Z)、数字 (0-9)、下划线 (_)、美元符号 ($)
 False- **不能以数字开头**
 False- **区分大小写**: `myVar` 和 `myvar` 是不同的标识符
 False- **不能使用保留字** (如 `let`、`const`、`function` 等)
 False
 False### 4.2 命名约定
 False
 False**变量和函数**:
 False
 False- 使用小驼峰命名法 (lowerCamelCase)
 False- 变量名应该清晰表达其用途
 False
 False**示例**:
 False
```javascript
 Truelet userName = "Alice";
 Truelet userAge = 30;
 True
 Truefunction calculateTotalPrice(items) {
 True // 函数体
 True}
 True```

 False**常量**:
 False
 False- 使用大驼峰命名法 (UPPER_SNAKE_CASE)
 False- 常量名应该全大写，单词间用下划线分隔
 False
 False**示例**:
 False
```javascript
 Trueconst MAX_SIZE = 100;
 Trueconst API_URL = "https://api.example.com";
 True```

 False**类**:
 False
 False- 使用大驼峰命名法 (PascalCase)
 False- 类名应该是名词，首字母大写
 False
 False**示例**:
 False
```javascript
 Trueclass User {
 True constructor(name, age) {
 True this.name = name;
 True this.age = age;
 True }
 True}
 True```

 False**对象属性**:
 False
 False- 使用小驼峰命名法 (lowerCamelCase)
 False- 与变量命名一致
 False
 False**示例**:
 False
```javascript
 Trueconst user = {
 True firstName: "Alice",
 True lastName: "Smith",
 True emailAddress: "alice@example.com"
 True};
 True```

 False**函数参数**:
 False
 False- 使用小驼峰命名法 (lowerCamelCase)
 False- 参数名应该清晰表达其用途
 False
 False**示例**:
 False
```javascript
 Truefunction createUser(firstName, lastName, email) {
 True // 函数体
 True}
 True```

 False### 4.3 命名最佳实践
 False
 False- **语义化**: 变量名应该清晰表达其用途
 False- **简洁**: 变量名应该简洁但不失明确
 False- **一致**: 在整个项目中保持命名风格一致
 False- **避免缩写**: 除非是广为人知的缩写 (如 `API`、`URL`)
 False- **避免单个字符**: 除非是循环计数器或数学变量
 False
 False**好的命名示例**:
 False
 False- `userName` 而不是 `u` 或 `usrNm`
 False- `calculateTotalPrice` 而不是 `calc` 或 `total`
 False- `isActive` 而不是 `active` (布尔变量使用 `is` 或 `has` 前缀)
 False- `MAX_ITERATIONS` 而不是 `max`
 False
 False## 5. 严格模式 (Strict Mode)
 False
 False严格模式是 JavaScript 的一种执行模式，通过 `"use strict";` 指令开启。
 False
 False### 5.1 开启严格模式
 False
 False**全局严格模式**:
 False
 False- 在脚本的顶部添加 `"use strict";`
 False
 False**示例**:
 False
```javascript
 True"use strict";
 True
 True// 严格模式下的代码
 Truelet x = 10;
 True```

 False**函数严格模式**:
 False
 False- 在函数内部添加 `"use strict";`
 False
 False**示例**:
 False
```javascript
 Truefunction strictFunction() {
 True "use strict";
 True 
 True // 严格模式下的代码
 True let y = 20;
 True}
 True```

 False**ES 模块**:
 False
 False- ES 模块默认启用严格模式，无需添加 `"use strict";`
 False
 False### 5.2 严格模式的限制
 False
 False**严格模式禁止的行为**:
 False
 False1. **未声明的变量**: 不允许使用未声明的变量
 False
 ```javascript
 True "use strict";
 True x = 10; // 报错: x is not defined
 True ```

 False2. **重复的参数名**: 不允许函数有重复的参数名
 False
 ```javascript
 True "use strict";
 True function foo(a, a) { // 报错: Duplicate parameter name not allowed in this context
 True console.log(a);
 True }
 True ```

 False3. **删除变量、函数或参数**: 不允许使用 `delete` 操作符删除变量、函数或参数
 False
 ```javascript
 True "use strict";
 True let x = 10;
 True delete x; // 报错: Delete of an unqualified identifier in strict mode.
 True ```

 False4. **八进制字面量**: 不允许使用八进制字面量
 False
 ```javascript
 True "use strict";
 True let x = 010; // 报错: Octal literals are not allowed in strict mode.
 True ```

 False5. **with 语句**: 不允许使用 `with` 语句
 False
 ```javascript
 True "use strict";
 True with (Math) { // 报错: Strict mode code may not include a with statement
 True console.log(PI);
 True }
 True ```

 False6. **this 指向**: 在全局函数中，`this` 不再指向全局对象，而是 `undefined`
 False
 ```javascript
 True "use strict";
 True function foo() {
 True console.log(this); // 输出: undefined
 True }
 True foo();
 True ```

 False7. **eval 作用域**: `eval` 语句在严格模式下有自己的作用域，不会污染外部作用域
 False
 ```javascript
 True "use strict";
 True let x = 10;
 True eval("var x = 20; console.log(x);"); // 输出: 20
 True console.log(x); // 输出: 10
 True ```

 False### 5.3 严格模式的好处
 False
 False- **消除不合理的语法**: 禁止一些容易出错的语法
 False- **提高运行效率**: 某些操作在严格模式下执行更快
 False- **增强安全性**: 减少潜在的安全漏洞
 False- **提前发现错误**: 将静默错误变为显式错误
 False- **为未来的 JavaScript 版本做准备**: 严格模式的规则更接近未来的 JavaScript 标准
 False
 False## 6. 代码风格 (Code Style)
 False
 False一致的代码风格有助于提高代码的可读性和可维护性。
 False
 False### 6.1 缩进
 False
 False- 使用 2 或 4 个空格进行缩进
 False- 保持一致的缩进风格
 False
 False**示例**:
 False
```javascript
 True// 2 空格缩进
 Truefunction foo() {
 True if (true) {
 True console.log("Hello");
 True }
 True}
 True
 True// 4 空格缩进
 Truefunction bar() {
 True if (true) {
 True console.log("Hello");
 True }
 True}
 True```

 False### 6.2 空格
 False
 False- 操作符两边添加空格
 False- 逗号后添加空格
 False- 函数参数列表中，逗号后添加空格
 False- 花括号前后添加空格
 False
 False**示例**:
 False
```javascript
 True// 好的风格
 Truelet x = 10 + 5;
 Trueconst arr = [1, 2, 3];
 Truefunction foo(a, b) {
 True // 函数体
 True}
 True
 True// 不好的风格
 Truelet x=10+5;
 Trueconst arr=[1,2,3];
 Truefunction foo(a,b){
 True // 函数体
 True}
 True```

 False### 6.3 换行
 False
 False- 每行代码长度控制在 80-120 个字符以内
 False- 运算符后换行
 False- 长函数参数或对象字面量换行
 False
 False**示例**:
 False
```javascript
 True// 长表达式换行
 Trueconst result = a + b + c + d + e +
 True f + g + h;
 True
 True// 长函数参数换行
 Truefunction foo(
 True parameter1,
 True parameter2,
 True parameter3
 True) {
 True // 函数体
 True}
 True
 True// 长对象字面量换行
 Trueconst user = {
 True name: "Alice",
 True age: 30,
 True email: "alice@example.com",
 True address: {
 True street: "123 Main St",
 True city: "New York"
 True }
 True};
 True```

 False### 6.4 分号
 False
 False- 始终使用分号结束语句
 False- 避免依赖自动分号插入 (ASI)
 False
 False**示例**:
 False
```javascript
 True// 好的风格
 Truelet x = 10;
 Trueconsole.log(x);
 True
 True// 不好的风格
 Truelet x = 10
 Trueconsole.log(x)
 True```

 False### 6.5 引号
 False
 False- 选择单引号或双引号，保持一致
 False- 字符串中包含引号时，使用相反的引号或转义
 False
 False**示例**:
 False
```javascript
 True// 使用单引号
 Truelet name = 'Alice';
 Truelet message = 'She said, "Hello!"';
 True
 True// 使用双引号
 Truelet name = "Alice";
 Truelet message = "She said, 'Hello!'";
 True```

 False## 7. 常见错误与解决方案
 False
 False### 7.1 变量作用域错误
 False
 False**错误**: 变量泄露到全局作用域
 False
 False**原因**: 使用 `var` 或未声明的变量
 False
 False**解决方案**:
 False
 False- 使用 `let` 或 `const` 声明变量
 False- 封装代码到函数或模块中
 False
 False**示例**:
 False
```javascript
 True// 错误
 Truefunction test() {
 True x = 10; // 未声明的变量，会泄露到全局作用域
 True}
 True
 Truetest();
 Trueconsole.log(x); // 输出: 10
 True
 True// 正确
 Truefunction test() {
 True let x = 10; // 块级作用域变量
 True}
 True
 Truetest();
 Trueconsole.log(x); // 报错: x is not defined
 True```

 False### 7.2 变量提升错误
 False
 False**错误**: 在声明前使用变量
 False
 False**原因**: 不了解变量提升的机制
 False
 False**解决方案**:
 False
 False- 始终在使用变量前声明
 False- 使用 `let` 或 `const` 避免变量提升问题
 False
 False**示例**:
 False
```javascript
 True// 错误
 Trueconsole.log(x); // 输出: undefined
 Truevar x = 10;
 True
 True// 正确
 Truelet x = 10;
 Trueconsole.log(x); // 输出: 10
 True```

 False### 7.3 严格模式错误
 False
 False**错误**: 在严格模式下使用被禁止的语法
 False
 False**原因**: 不了解严格模式的限制
 False
 False**解决方案**:
 False
 False- 熟悉严格模式的规则
 False- 修复被禁止的语法
 False
 False**示例**:
 False
```javascript
 True"use strict";
 True
 True// 错误
 Truex = 10; // 未声明的变量
 True
 True// 正确
 Truelet x = 10;
 True```

 False### 7.4 命名错误
 False
 False**错误**: 使用无效的标识符
 False
 False**原因**: 不了解标识符的命名规则
 False
 False**解决方案**:
 False
 False- 遵循标识符命名规则
 False- 使用语义化的命名
 False
 False**示例**:
 False
```javascript
 True// 错误
 Truelet 123abc = 10; // 不能以数字开头
 Truelet let = 20; // 不能使用保留字
 True
 True// 正确
 Truelet abc123 = 10;
 Truelet myLet = 20;
 True```

 False## 8. 实战示例
 False
 False### 8.1 模块化开发
 False
 False**项目结构**:
 False
```
 Trueproject/
 True├── index.html
 True├── main.js
 True└── utils/
 True ├── math.js
 True └── string.js
 True```

 False**index.html**:
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>模块化开发示例</title>
 True</head>
 True<body>
 True <h1>模块化开发示例</h1>
 True <div id="result"></div>
 True 
 True <script type="module" src="main.js"></script>
 True</body>
 True</html>
 True```

 False**utils/math.js**:
 False
```javascript
 True/**
 True * 数学工具函数
 True */
 True
 True/**
 True * 计算两个数的和
 True * @param {number} a - 第一个数
 True * @param {number} b - 第二个数
 True * @returns {number} 两个数的和
 True */
 Trueexport function add(a, b) {
 True return a + b;
 True}
 True
 True/**
 True * 计算两个数的差
 True * @param {number} a - 被减数
 True * @param {number} b - 减数
 True * @returns {number} 两个数的差
 True */
 Trueexport function subtract(a, b) {
 True return a - b;
 True}
 True```

 False**utils/string.js**:
 False
```javascript
 True/**
 True * 字符串工具函数
 True */
 True
 True/**
 True * capitalize
 True * @param {string} str - 输入字符串
 True * @returns {string} 首字母大写的字符串
 True */
 Trueexport function capitalize(str) {
 True return str.charAt(0).toUpperCase() + str.slice(1);
 True}
 True
 True/**
 True * 字符串反转
 True * @param {string} str - 输入字符串
 True * @returns {string} 反转后的字符串
 True */
 Trueexport function reverse(str) {
 True return str.split('').reverse().join('');
 True}
 True```

 False**main.js**:
 False
```javascript
 True"use strict";
 True
 True// 导入模块
 Trueimport { add, subtract } from './utils/math.js';
 Trueimport { capitalize, reverse } from './utils/string.js';
 True
 True// 使用导入的函数
 Trueconst sum = add(10, 5);
 Trueconst difference = subtract(10, 5);
 Trueconst capitalized = capitalize('hello');
 Trueconst reversed = reverse('hello');
 True
 True// 显示结果
 Trueconst resultDiv = document.getElementById('result');
 TrueresultDiv.innerHTML = `
 True <p>10 + 5 = ${sum}</p>
 True <p>10 - 5 = ${difference}</p>
 True <p>capitalize('hello') = ${capitalized}</p>
 True <p>reverse('hello') = ${reversed}</p>
 True`;
 True
 Trueconsole.log('模块化开发示例执行完成');
 True```

 False### 8.2 严格模式应用
 False
 False**示例**:
 False
```javascript
 True"use strict";
 True
 True// 严格模式下的代码
 True
 True// 1. 必须声明变量
 Truelet userName = "Alice";
 Trueconst MAX_AGE = 120;
 True
 True// 2. 不能使用未声明的变量
 True// age = 30; // 报错: age is not defined
 True
 True// 3. 不能使用重复的参数名
 True// function foo(a, a) { // 报错: Duplicate parameter name not allowed in this context
 True// console.log(a);
 True// }
 True
 True// 4. 不能删除变量
 True// delete userName; // 报错: Delete of an unqualified identifier in strict mode.
 True
 True// 5. 不能使用八进制字面量
 True// let octal = 010; // 报错: Octal literals are not allowed in strict mode.
 True
 True// 6. 不能使用 with 语句
 True// with (Math) { // 报错: Strict mode code may not include a with statement
 True// console.log(PI);
 True// }
 True
 True// 7. this 指向 undefined
 Truefunction test() {
 True console.log(this); // 输出: undefined
 True}
 Truetest();
 True
 True// 8. eval 有自己的作用域
 Truelet x = 10;
 Trueeval("var x = 20; console.log('Inside eval:', x);"); // 输出: Inside eval: 20
 Trueconsole.log('Outside eval:', x); // 输出: 10
 True
 Trueconsole.log('严格模式示例执行完成');
 True```

 False## 9. 总结
 False
 FalseJavaScript 的程序结构和基本语法是学习 JavaScript 的基础。通过理解引入方式、语句与注释、变量声明、标识符规范和严格模式等概念，你可以编写更加规范、高效和安全的 JavaScript 代码。
 False
 False- **引入方式**: 选择适合的脚本引入方式，考虑加载顺序和性能
 False- **语句与注释**: 编写清晰的语句，使用适当的注释解释代码
 False- **变量声明**: 优先使用 `const` 和 `let`，避免使用 `var`
 False- **标识符规范**: 遵循命名规则和约定，提高代码可读性
 False- **严格模式**: 启用严格模式，减少错误，提高代码质量
 False- **代码风格**: 保持一致的代码风格，提高代码可维护性
 False
 False掌握这些基础概念后，你可以更深入地学习 JavaScript 的高级特性，如函数、对象、异步编程等，为构建复杂的应用打下坚实的基础。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分并细化 JS 基础语法规则
 False- 2026-04-05: 扩写内容，增加详细的引入方式、语句与注释、变量声明、标识符规范、严格模式、代码风格和实战示例
 False