# 数据类型与运算符 (Data Types & Operators)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: JS Basics
 False> @Description: JS 原始类型、引用类型、类型检测及运算符优先级。 | Primitive, Reference types, type checking, and operators.
 False
 False---
 False
 False## 目录
 False
 False1. [数据类型](#数据类型)
 False2. [类型检测](#类型检测)
 False3. [核心运算符](#核心运算符)
 False4. [类型转换](#类型转换)
 False5. [实战示例](#实战示例)
 False6. [常见问题与解决方案](#常见问题与解决方案)
 False7. [总结](#总结)
 False
 False---
 False
 False## 1. 数据类型 (Data Types)
 False
 FalseJavaScript 是一种动态类型语言，变量的类型会在运行时自动推断。JavaScript 中的数据类型分为两大类：原始类型（Primitive Types）和引用类型（Reference Types）。
 False
 False### 1.1 原始类型 (Primitives - 栈存储)
 False
 False原始类型是不可变的值，存储在栈内存中。JavaScript 有 7 种原始类型：
 False
 False#### 1.1.1 number (数值类型)
 False
 False**描述**: 表示整数和浮点数，包括特殊值 `NaN` (Not a Number)、`Infinity` (正无穷) 和 `-Infinity` (负无穷)。
 False
 False**特点**:
 False
 False- 使用 IEEE 754 标准表示
 False- 整数和浮点数都是 64 位双精度浮点数
 False- 存在精度问题
 False
 False**示例**:
 False
```javascript
 True// 整数
 Truelet integer = 42;
 True
 True// 浮点数
 Truelet float = 3.14;
 True
 True// 科学记数法
 Truelet sciNotation = 1.23e5; // 123000
 True
 True// 特殊值
 Truelet notANumber = NaN;
 Truelet positiveInfinity = Infinity;
 Truelet negativeInfinity = -Infinity;
 True
 True// 精度问题
 Trueconsole.log(0.1 + 0.2); // 输出: 0.30000000000000004
 True```

 False**常用方法**:
 False
 False- `Number.isNaN()`: 检测是否为 NaN
 False- `Number.isFinite()`: 检测是否为有限数
 False- `Number.isInteger()`: 检测是否为整数
 False- `Number.parseFloat()`: 解析字符串为浮点数
 False- `Number.parseInt()`: 解析字符串为整数
 False
 False#### 1.1.2 string (字符串类型)
 False
 False**描述**: 表示文本数据，由零个或多个字符组成。
 False
 False**特点**:
 False
 False- 不可变
 False- 支持单引号、双引号和模板字符串
 False- 可以使用索引访问单个字符
 False- 长度由 `length` 属性表示
 False
 False**示例**:
 False
```javascript
 True// 单引号
 Truelet singleQuotes = 'Hello';
 True
 True// 双引号
 Truelet doubleQuotes = "World";
 True
 True// 模板字符串
 Truelet templateString = `Hello, ${doubleQuotes}!`;
 True
 True// 字符串长度
 Trueconsole.log(templateString.length); // 输出: 12
 True
 True// 字符串索引
 Trueconsole.log(templateString[0]); // 输出: H
 True
 True// 字符串方法
 Truelet str = "JavaScript";
 Trueconsole.log(str.toUpperCase()); // 输出: JAVASCRIPT
 Trueconsole.log(str.substring(0, 4)); // 输出: Java
 True```

 False**常用方法**:
 False
 False- `length`: 获取字符串长度
 False- `charAt()`: 获取指定位置的字符
 False- `substring()`: 提取子字符串
 False- `slice()`: 提取子字符串
 False- `indexOf()`: 查找子字符串位置
 False- `includes()`: 检查是否包含子字符串
 False- `split()`: 分割字符串为数组
 False- `trim()`: 去除首尾空白
 False
 False#### 1.1.3 boolean (布尔类型)
 False
 False**描述**: 表示逻辑值，只有两个值：`true` 和 `false`。
 False
 False**特点**:
 False
 False- 用于条件判断
 False- 其他类型可以转换为布尔类型
 False
 False**示例**:
 False
```javascript
 Truelet isTrue = true;
 Truelet isFalse = false;
 True
 True// 布尔转换
 Trueconsole.log(Boolean(0)); // 输出: false
 Trueconsole.log(Boolean(1)); // 输出: true
 Trueconsole.log(Boolean('')); // 输出: false
 Trueconsole.log(Boolean('Hello')); // 输出: true
 Trueconsole.log(Boolean(null)); // 输出: false
 Trueconsole.log(Boolean(undefined)); // 输出: false
 Trueconsole.log(Boolean({})); // 输出: true
 Trueconsole.log(Boolean([])); // 输出: true
 True```

 False**布尔转换规则**:
 False
 False- **falsy 值**: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`
 False- **truthy 值**: 除了 falsy 值之外的所有值
 False
 False#### 1.1.4 undefined (未定义类型)
 False
 False**描述**: 表示变量已声明但未赋值。
 False
 False**特点**:
 False
 False- 只有一个值：`undefined`
 False- 函数没有返回值时默认返回 `undefined`
 False- 访问对象不存在的属性时返回 `undefined`
 False
 False**示例**:
 False
```javascript
 True// 声明但未赋值的变量
 Truelet undefinedVar;
 Trueconsole.log(undefinedVar); // 输出: undefined
 True
 True// 函数默认返回值
 Truefunction noReturn() {
 True // 没有 return 语句
 True}
 Trueconsole.log(noReturn()); // 输出: undefined
 True
 True// 访问不存在的属性
 Truelet obj = { name: 'Alice' };
 Trueconsole.log(obj.age); // 输出: undefined
 True```

 False#### 1.1.5 null (空值类型)
 False
 False**描述**: 表示空对象指针。
 False
 False**特点**:
 False
 False- 只有一个值：`null`
 False- 用于表示有意的空值
 False- `typeof null` 返回 `"object"` (历史遗留问题)
 False
 False**示例**:
 False
```javascript
 True// 表示空对象
 Truelet emptyObject = null;
 Trueconsole.log(emptyObject); // 输出: null
 True
 True// 清空变量
 Truelet user = { name: 'Alice' };
 Trueuser = null; // 现在 user 是 null
 True
 True// 注意: typeof null 返回 "object"
 Trueconsole.log(typeof null); // 输出: object
 True```

 False#### 1.1.6 symbol (符号类型) - ES6+
 False
 False**描述**: 表示唯一的标识符。
 False
 False**特点**:
 False
 False- 每个 symbol 值都是唯一的
 False- 用于对象的唯一属性键
 False- 不能与其他类型进行比较
 False
 False**示例**:
 False
```javascript
 True// 创建 symbol
 Truelet sym1 = Symbol();
 Truelet sym2 = Symbol('description');
 Truelet sym3 = Symbol('description');
 True
 True// 每个 symbol 都是唯一的
 Trueconsole.log(sym2 === sym3); // 输出: false
 True
 True// 用作对象属性
 Trueconst obj = {
 True [sym1]: 'value1',
 True [sym2]: 'value2'
 True};
 True
 Trueconsole.log(obj[sym1]); // 输出: value1
 True```

 False**常用方法**:
 False
 False- `Symbol.for()`: 创建或获取全局 symbol
 False- `Symbol.keyFor()`: 获取全局 symbol 的键
 False
 False#### 1.1.7 bigint (大整数类型) - ES2020+
 False
 False**描述**: 表示任意精度的整数。
 False
 False**特点**:
 False
 False- 用于表示超出 Number 范围的整数
 False- 在数字后面添加 `n` 表示
 False- 不能与 Number 类型直接运算
 False
 False**示例**:
 False
```javascript
 True// 创建 bigint
 Truelet bigInt1 = 9007199254740991n; // 最大的 Number 值 + 1
 Truelet bigInt2 = BigInt(9007199254740991);
 True
 True// 运算
 Trueconsole.log(bigInt1 + 1n); // 输出: 9007199254740992n
 True
 True// 注意: 不能与 Number 直接运算
 True// console.log(bigInt1 + 1); // 报错: Cannot mix BigInt and other types
 True
 True// 转换
 Trueconsole.log(Number(bigInt1)); // 输出: 9007199254740991
 True```

 False### 1.2 引用类型 (Reference - 堆存储)
 False
 False引用类型是可变的值，存储在堆内存中，栈内存中存储的是指向堆内存的引用。
 False
 False#### 1.2.1 Object (对象)
 False
 False**描述**: 表示键值对的集合。
 False
 False**特点**:
 False
 False- 可以动态添加和删除属性
 False- 引用传递
 False- 可以使用字面量、构造函数或 `Object.create()` 创建
 False
 False**示例**:
 False
```javascript
 True// 字面量创建
 Truelet obj1 = {
 True name: 'Alice',
 True age: 30,
 True address: {
 True street: '123 Main St',
 True city: 'New York'
 True }
 True};
 True
 True// 构造函数创建
 Truelet obj2 = new Object();
 Trueobj2.name = 'Bob';
 True
 True// Object.create() 创建
 Truelet obj3 = Object.create(obj1);
 Trueconsole.log(obj3.name); // 输出: Alice (继承自 obj1)
 True
 True// 引用传递
 Truelet obj4 = obj1;
 Trueobj4.name = 'Charlie';
 Trueconsole.log(obj1.name); // 输出: Charlie (因为 obj4 和 obj1 指向同一个对象)
 True```

 False**常用方法**:
 False
 False- `Object.keys()`: 获取对象的键数组
 False- `Object.values()`: 获取对象的值数组
 False- `Object.entries()`: 获取对象的键值对数组
 False- `Object.assign()`: 合并对象
 False- `Object.freeze()`: 冻结对象
 False- `Object.seal()`: 密封对象
 False
 False#### 1.2.2 Array (数组)
 False
 False**描述**: 表示有序的数据集合。
 False
 False**特点**:
 False
 False- 可以存储不同类型的数据
 False- 长度可变
 False- 索引从 0 开始
 False- 继承自 Object
 False
 False**示例**:
 False
```javascript
 True// 字面量创建
 Truelet arr1 = [1, 'Hello', true, null];
 True
 True// 构造函数创建
 Truelet arr2 = new Array(5); // 创建长度为 5 的空数组
 Truelet arr3 = new Array(1, 2, 3); // 创建包含元素的数组
 True
 True// 数组方法
 Truelet arr = [1, 2, 3, 4, 5];
 Trueconsole.log(arr.length); // 输出: 5
 Trueconsole.log(arr.push(6)); // 输出: 6 (新长度)
 Trueconsole.log(arr.pop()); // 输出: 6 (删除并返回最后一个元素)
 Trueconsole.log(arr.map(x => x * 2)); // 输出: [2, 4, 6, 8, 10]
 True```

 False**常用方法**:
 False
 False- `length`: 获取数组长度
 False- `push()`: 添加元素到末尾
 False- `pop()`: 删除并返回末尾元素
 False- `shift()`: 删除并返回第一个元素
 False- `unshift()`: 添加元素到开头
 False- `slice()`: 提取子数组
 False- `splice()`: 添加/删除元素
 False- `map()`: 映射数组
 False- `filter()`: 过滤数组
 False- `reduce()`: 归约数组
 False- `forEach()`: 遍历数组
 False- `sort()`: 排序数组
 False
 False#### 1.2.3 Function (函数)
 False
 False**描述**: 表示可执行的代码块。
 False
 False**特点**:
 False
 False- 可以作为参数传递
 False- 可以作为返回值
 False- 可以存储在变量中
 False- 继承自 Object
 False
 False**示例**:
 False
```javascript
 True// 函数声明
 Truefunction add(a, b) {
 True return a + b;
 True}
 True
 True// 函数表达式
 Trueconst multiply = function(a, b) {
 True return a * b;
 True};
 True
 True// 箭头函数
 Trueconst divide = (a, b) => a / b;
 True
 True// 作为参数
 Truefunction calculate(a, b, operation) {
 True return operation(a, b);
 True}
 True
 Trueconsole.log(calculate(10, 5, add)); // 输出: 15
 True```

 False**常用方法**:
 False
 False- `call()`: 调用函数，指定 `this` 值和参数
 False- `apply()`: 调用函数，指定 `this` 值和参数数组
 False- `bind()`: 创建绑定了 `this` 值的新函数
 False
 False## 2. 类型检测 (Type Checking)
 False
 FalseJavaScript 提供了多种方法来检测变量的类型。
 False
 False### 2.1 typeof 运算符
 False
 False**描述**: 用于检测变量的类型，返回一个字符串。
 False
 False**特点**:
 False
 False- 适用于检测原始类型
 False- `typeof null` 返回 `"object"` (历史遗留问题)
 False- 函数返回 `"function"`
 False- 数组和对象返回 `"object"`
 False
 False**示例**:
 False
```javascript
 Trueconsole.log(typeof 42); // 输出: "number"
 Trueconsole.log(typeof "Hello"); // 输出: "string"
 Trueconsole.log(typeof true); // 输出: "boolean"
 Trueconsole.log(typeof undefined); // 输出: "undefined"
 Trueconsole.log(typeof null); // 输出: "object" (历史遗留问题)
 Trueconsole.log(typeof Symbol()); // 输出: "symbol"
 Trueconsole.log(typeof 1n); // 输出: "bigint"
 Trueconsole.log(typeof {}); // 输出: "object"
 Trueconsole.log(typeof []); // 输出: "object"
 Trueconsole.log(typeof function() {}); // 输出: "function"
 True```

 False### 2.2 instanceof 运算符
 False
 False**描述**: 用于检测对象是否为某个构造函数的实例。
 False
 False**特点**:
 False
 False- 适用于检测引用类型
 False- 检查原型链
 False- 不能用于检测原始类型
 False
 False**示例**:
 False
```javascript
 Truelet arr = [];
 Truelet obj = {};
 Truelet func = function() {};
 True
 Trueconsole.log(arr instanceof Array); // 输出: true
 Trueconsole.log(arr instanceof Object); // 输出: true (因为 Array 继承自 Object)
 Trueconsole.log(obj instanceof Object); // 输出: true
 Trueconsole.log(func instanceof Function); // 输出: true
 Trueconsole.log(func instanceof Object); // 输出: true (因为 Function 继承自 Object)
 True
 True// 不能用于原始类型
 Trueconsole.log(42 instanceof Number); // 输出: false
 Trueconsole.log("Hello" instanceof String); // 输出: false
 True```

 False### 2.3 Array.isArray() 方法
 False
 False**描述**: 用于检测变量是否为数组。
 False
 False**特点**:
 False
 False- 专门用于检测数组
 False- 比 `instanceof` 更可靠，因为它不受原型链影响
 False
 False**示例**:
 False
```javascript
 Trueconsole.log(Array.isArray([])); // 输出: true
 Trueconsole.log(Array.isArray({})); // 输出: false
 Trueconsole.log(Array.isArray("Hello")); // 输出: false
 Trueconsole.log(Array.isArray(null)); // 输出: false
 True```

 False### 2.4 Object.prototype.toString.call() 方法
 False
 False**描述**: 用于获取对象的内部 `[[Class]]` 属性，返回一个格式化的字符串。
 False
 False**特点**:
 False
 False- 可以准确检测所有类型
 False- 返回格式为 `"[object Type]"`
 False
 False**示例**:
 False
```javascript
 Truefunction getType(value) {
 True return Object.prototype.toString.call(value).slice(8, -1);
 True}
 True
 Trueconsole.log(getType(42)); // 输出: "Number"
 Trueconsole.log(getType("Hello")); // 输出: "String"
 Trueconsole.log(getType(true)); // 输出: "Boolean"
 Trueconsole.log(getType(undefined)); // 输出: "Undefined"
 Trueconsole.log(getType(null)); // 输出: "Null"
 Trueconsole.log(getType(Symbol())); // 输出: "Symbol"
 Trueconsole.log(getType(1n)); // 输出: "BigInt"
 Trueconsole.log(getType({})); // 输出: "Object"
 Trueconsole.log(getType([])); // 输出: "Array"
 Trueconsole.log(getType(function() {})); // 输出: "Function"
 Trueconsole.log(getType(new Date())); // 输出: "Date"
 Trueconsole.log(getType(/regex/)); // 输出: "RegExp"
 True```

 False## 3. 核心运算符 (Operators)
 False
 FalseJavaScript 提供了丰富的运算符，用于执行各种操作。
 False
 False### 3.1 算术运算符
 False
 False**描述**: 用于执行数学运算。
 False
 False| 运算符 | 描述 | 示例 |
 False|--------|------|------|
 False| `+` | 加法 | `1 + 2 // 3` |
 False| `-` | 减法 | `5 - 3 // 2` |
 False| `*` | 乘法 | `2 * 3 // 6` |
 False| `/` | 除法 | `10 / 2 // 5` |
 False| `%` | 取余 | `10 % 3 // 1` |
 False| `**` | 幂运算 | `2 ** 3 // 8` |
 False| `++` | 自增 | `let a = 1; a++; // a 变为 2` |
 False| `--` | 自减 | `let a = 1; a--; // a 变为 0` |
 False
 False**示例**:
 False
```javascript
 True// 基本算术
 Trueconsole.log(1 + 2); // 输出: 3
 Trueconsole.log(5 - 3); // 输出: 2
 Trueconsole.log(2 * 3); // 输出: 6
 Trueconsole.log(10 / 2); // 输出: 5
 Trueconsole.log(10 % 3); // 输出: 1
 Trueconsole.log(2 ** 3); // 输出: 8
 True
 True// 自增和自减
 Truelet a = 1;
 Trueconsole.log(a++); // 输出: 1 (先使用后自增)
 Trueconsole.log(a); // 输出: 2
 True
 Truelet b = 1;
 Trueconsole.log(++b); // 输出: 2 (先自增后使用)
 Trueconsole.log(b); // 输出: 2
 True
 True// 字符串连接
 Trueconsole.log("Hello" + " " + "World"); // 输出: "Hello World"
 Trueconsole.log(1 + "2"); // 输出: "12" (隐式类型转换)
 True```

 False### 3.2 比较运算符
 False
 False**描述**: 用于比较两个值，返回布尔值。
 False
 False| 运算符 | 描述 | 示例 |
 False|--------|------|------|
 False| `==` | 相等（强制类型转换） | `1 == "1" // true` |
 False| `===` | 严格相等（不强制类型转换） | `1 === "1" // false` |
 False| `!=` | 不相等（强制类型转换） | `1 != "1" // false` |
 False| `!==` | 严格不相等（不强制类型转换） | `1 !== "1" // true` |
 False| `>` | 大于 | `5 > 3 // true` |
 False| `<` | 小于 | `5 < 3 // false` |
 False| `>=` | 大于等于 | `5 >= 5 // true` |
 False| `<=` | 小于等于 | `5 <= 3 // false` |
 False
 False**示例**:
 False
```javascript
 True// 相等 vs 严格相等
 Trueconsole.log(1 == "1"); // 输出: true (强制类型转换)
 Trueconsole.log(1 === "1"); // 输出: false (类型不同)
 True
 Trueconsole.log(0 == false); // 输出: true (强制类型转换)
 Trueconsole.log(0 === false); // 输出: false (类型不同)
 True
 Trueconsole.log(null == undefined); // 输出: true (特殊情况)
 Trueconsole.log(null === undefined); // 输出: false (类型不同)
 True
 True// 其他比较
 Trueconsole.log(5 > 3); // 输出: true
 Trueconsole.log(5 < 3); // 输出: false
 Trueconsole.log(5 >= 5); // 输出: true
 Trueconsole.log(5 <= 3); // 输出: false
 True
 True// 字符串比较（按字典序）
 Trueconsole.log("apple" > "banana"); // 输出: false
 Trueconsole.log("apple" < "banana"); // 输出: true
 True```

 False**推荐**: 优先使用严格相等运算符 `===` 和严格不相等运算符 `!==`，避免隐式类型转换带来的意外行为。
 False
 False### 3.3 逻辑运算符
 False
 False**描述**: 用于执行逻辑运算，返回布尔值或操作数。
 False
 False| 运算符 | 描述 | 示例 |
 False|--------|------|------|
 False| `&&` | 逻辑与（短路） | `true && false // false` |
 False| `||` | 逻辑或（短路） | `true || false // true` |
 False| `!` | 逻辑非 | `!true // false` |
 False| `??` | 空值合并（ES2020+） | `null ?? "default" // "default"` |
 False
 False**示例**:
 False
```javascript
 True// 逻辑与
 Trueconsole.log(true && false); // 输出: false
 Trueconsole.log(true && true); // 输出: true
 Trueconsole.log(false && true); // 输出: false (短路)
 True
 True// 逻辑或
 Trueconsole.log(true || false); // 输出: true (短路)
 Trueconsole.log(false || true); // 输出: true
 Trueconsole.log(false || false); // 输出: false
 True
 True// 逻辑非
 Trueconsole.log(!true); // 输出: false
 Trueconsole.log(!false); // 输出: true
 Trueconsole.log(!0); // 输出: true
 Trueconsole.log(!"" ); // 输出: true
 Trueconsole.log(!null); // 输出: true
 Trueconsole.log(!undefined); // 输出: true
 Trueconsole.log(!{}); // 输出: false
 Trueconsole.log(![]); // 输出: false
 True
 True// 空值合并
 Trueconsole.log(null ?? "default"); // 输出: "default"
 Trueconsole.log(undefined ?? "default"); // 输出: "default"
 Trueconsole.log(false ?? "default"); // 输出: false (不是 null 或 undefined)
 Trueconsole.log(0 ?? "default"); // 输出: 0 (不是 null 或 undefined)
 Trueconsole.log("" ?? "default"); // 输出: "" (不是 null 或 undefined)
 True```

 False**短路求值**:
 False
 False- `&&` 运算符：如果第一个操作数为 falsy，则返回第一个操作数，否则返回第二个操作数
 False- `||` 运算符：如果第一个操作数为 truthy，则返回第一个操作数，否则返回第二个操作数
 False- `??` 运算符：如果第一个操作数为 null 或 undefined，则返回第二个操作数，否则返回第一个操作数
 False
 False### 3.4 三元运算符
 False
 False**描述**: 条件运算符，根据条件返回不同的值。
 False
 False**语法**: `condition ? expr1 : expr2`
 False
 False**示例**:
 False
```javascript
 Truelet age = 18;
 Truelet status = age >= 18 ? "成年人" : "未成年人";
 Trueconsole.log(status); // 输出: "成年人"
 True
 True// 嵌套三元运算符
 Truelet score = 85;
 Truelet grade = score >= 90 ? "A" : 
 True score >= 80 ? "B" : 
 True score >= 70 ? "C" : 
 True score >= 60 ? "D" : "F";
 Trueconsole.log(grade); // 输出: "B"
 True```

 False### 3.5 赋值运算符
 False
 False**描述**: 用于给变量赋值。
 False
 False| 运算符 | 描述 | 示例 |
 False|--------|------|------|
 False| `=` | 基本赋值 | `let a = 1;` |
 False| `+=` | 加法赋值 | `a += 2; // 等价于 a = a + 2` |
 False| `-=` | 减法赋值 | `a -= 2; // 等价于 a = a - 2` |
 False| `*=` | 乘法赋值 | `a *= 2; // 等价于 a = a * 2` |
 False| `/=` | 除法赋值 | `a /= 2; // 等价于 a = a / 2` |
 False| `%=` | 取余赋值 | `a %= 2; // 等价于 a = a % 2` |
 False| `**=` | 幂赋值 | `a **= 2; // 等价于 a = a ** 2` |
 False| `&&=` | 逻辑与赋值 | `a &&= b; // 等价于 a = a && b` |
 False| `||=` | 逻辑或赋值 | `a ||= b; // 等价于 a = a || b` |
 False| `??=` | 空值合并赋值 | `a ??= b; // 等价于 a = a ?? b` |
 False
 False**示例**:
 False
```javascript
 Truelet a = 10;
 True
 True// 加法赋值
 Truea += 5; // a = 15
 Trueconsole.log(a); // 输出: 15
 True
 True// 乘法赋值
 Truea *= 2; // a = 30
 Trueconsole.log(a); // 输出: 30
 True
 True// 逻辑或赋值
 Truelet b = null;
 Trueb ||= "default"; // b = "default"
 Trueconsole.log(b); // 输出: "default"
 True
 True// 空值合并赋值
 Truelet c = null;
 Truec ??= "default"; // c = "default"
 Trueconsole.log(c); // 输出: "default"
 True
 Truelet d = 0;
 Trued ??= "default"; // d = 0 (不是 null 或 undefined)
 Trueconsole.log(d); // 输出: 0
 True```

 False### 3.6 其他运算符
 False
 False#### 3.6.1 展开运算符 (`...`)
 False
 False**描述**: 用于展开数组或对象。
 False
 False**示例**:
 False
```javascript
 True// 展开数组
 Truelet arr1 = [1, 2, 3];
 Truelet arr2 = [4, 5, 6];
 Truelet combined = [...arr1, ...arr2];
 Trueconsole.log(combined); // 输出: [1, 2, 3, 4, 5, 6]
 True
 True// 展开对象
 Truelet obj1 = { a: 1, b: 2 };
 Truelet obj2 = { c: 3, d: 4 };
 Truelet merged = { ...obj1, ...obj2 };
 Trueconsole.log(merged); // 输出: { a: 1, b: 2, c: 3, d: 4 }
 True
 True// 函数参数
 Truefunction sum(...numbers) {
 True return numbers.reduce((acc, curr) => acc + curr, 0);
 True}
 True
 Trueconsole.log(sum(1, 2, 3, 4, 5)); // 输出: 15
 True```

 False#### 3.6.2 可选链运算符 (`?.`)
 False
 False**描述**: 用于安全地访问对象的嵌套属性。
 False
 False**示例**:
 False
```javascript
 Truelet user = {
 True name: 'Alice',
 True address: {
 True street: '123 Main St'
 True // 没有 city 属性
 True }
 True};
 True
 True// 传统方式
 Trueconsole.log(user.address && user.address.city); // 输出: undefined
 True
 True// 可选链
 Trueconsole.log(user.address?.city); // 输出: undefined
 Trueconsole.log(user.address?.street); // 输出: "123 Main St"
 Trueconsole.log(user.contact?.phone); // 输出: undefined
 True```

 False#### 3.6.3 逗号运算符 (`,`)
 False
 False**描述**: 用于分隔表达式，返回最后一个表达式的值。
 False
 False**示例**:
 False
```javascript
 Truelet a = (1, 2, 3); // a = 3
 Trueconsole.log(a); // 输出: 3
 True
 Truelet b;
 Truelet c = (b = 1, b + 1); // 先执行 b = 1，再执行 b + 1
 Trueconsole.log(c); // 输出: 2
 True```

 False### 3.7 运算符优先级
 False
 False运算符优先级决定了表达式中运算的执行顺序。优先级高的运算符先执行，优先级低的运算符后执行。
 False
 False| 优先级 | 运算符 | 描述 |
 False|--------|--------|------|
 False| 1 | `()` | 括号 |
 False| 2 | `**` | 幂运算 |
 False| 3 | `++`, `--`, `!`, `~`, `typeof`, `void`, `delete` | 一元运算符 |
 False| 4 | `*`, `/`, `%` | 乘法、除法、取余 |
 False| 5 | `+`, `-` | 加法、减法 |
 False| 6 | `<<`, `>>`, `>>>` | 位运算 |
 False| 7 | `<`, `<=`, `>`, `>=`, `in`, `instanceof` | 比较运算符 |
 False| 8 | `==`, `!=`, `===`, `!==` | 相等运算符 |
 False| 9 | `&` | 按位与 |
 False| 10 | `^` | 按位异或 |
 False| 11 | `|` | 按位或 |
 False| 12 | `&&` | 逻辑与 |
 False| 13 | `||` | 逻辑或 |
 False| 14 | `??` | 空值合并 |
 False| 15 | `?:` | 三元运算符 |
 False| 16 | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, `&=`, `^=`, `|=`,`<<=`,`>>=`,`>>>=`,`&&=`,`||=`,`??=` | 赋值运算符 |
 False| 17 | `,` | 逗号运算符 |
 False
 False**示例**:
 False
```javascript
 True// 优先级示例
 Trueconsole.log(2 + 3 * 4); // 输出: 14 (乘法优先于加法)
 Trueconsole.log((2 + 3) * 4); // 输出: 20 (括号优先级最高)
 Trueconsole.log(2 ** 3 * 4); // 输出: 32 (幂运算优先于乘法)
 Trueconsole.log(true || false && false); // 输出: true (逻辑与优先于逻辑或)
 Trueconsole.log(1 == 2 || 3 == 3); // 输出: true (相等运算符优先于逻辑或)
 True```

 False## 4. 类型转换 (Coercion)
 False
 FalseJavaScript 是一种弱类型语言，会在某些情况下自动进行类型转换。
 False
 False### 4.1 隐式类型转换
 False
 False**描述**: JavaScript 自动进行的类型转换。
 False
 False**常见场景**:
 False
 False#### 4.1.1 字符串拼接
 False
```javascript
 Trueconsole.log(1 + "2"); // 输出: "12" (数字转换为字符串)
 Trueconsole.log("Hello" + 1); // 输出: "Hello1" (数字转换为字符串)
 Trueconsole.log(true + " world"); // 输出: "true world" (布尔值转换为字符串)
 True```

 False#### 4.1.2 数学运算
 False
```javascript
 Trueconsole.log("10" - 5); // 输出: 5 (字符串转换为数字)
 Trueconsole.log("10" * 2); // 输出: 20 (字符串转换为数字)
 Trueconsole.log("10" / 2); // 输出: 5 (字符串转换为数字)
 Trueconsole.log("10" % 3); // 输出: 1 (字符串转换为数字)
 Trueconsole.log(+"10"); // 输出: 10 (字符串转换为数字)
 Trueconsole.log(+true); // 输出: 1 (布尔值转换为数字)
 Trueconsole.log(+false); // 输出: 0 (布尔值转换为数字)
 Trueconsole.log(+null); // 输出: 0 (null 转换为数字)
 Trueconsole.log(+undefined); // 输出: NaN (undefined 转换为数字)
 True```

 False#### 4.1.3 比较运算
 False
```javascript
 Trueconsole.log(1 == "1"); // 输出: true (字符串转换为数字)
 Trueconsole.log(0 == false); // 输出: true (布尔值转换为数字)
 Trueconsole.log(null == undefined); // 输出: true (特殊情况)
 Trueconsole.log("" == false); // 输出: true (字符串和布尔值都转换为数字)
 True```

 False#### 4.1.4 逻辑运算
 False
```javascript
 Trueconsole.log(Boolean(0)); // 输出: false
 Trueconsole.log(Boolean("")); // 输出: false
 Trueconsole.log(Boolean(null)); // 输出: false
 Trueconsole.log(Boolean(undefined)); // 输出: false
 Trueconsole.log(Boolean(NaN)); // 输出: false
 Trueconsole.log(Boolean({})); // 输出: true
 Trueconsole.log(Boolean([])); // 输出: true
 Trueconsole.log(Boolean("Hello")); // 输出: true
 Trueconsole.log(Boolean(1)); // 输出: true
 True```

 False### 4.2 显式类型转换
 False
 False**描述**: 手动进行的类型转换。
 False
 False#### 4.2.1 转换为数字
 False
```javascript
 True// Number() 函数
 Trueconsole.log(Number("10")); // 输出: 10
 Trueconsole.log(Number("10.5")); // 输出: 10.5
 Trueconsole.log(Number("")); // 输出: 0
 Trueconsole.log(Number("Hello")); // 输出: NaN
 Trueconsole.log(Number(true)); // 输出: 1
 Trueconsole.log(Number(false)); // 输出: 0
 Trueconsole.log(Number(null)); // 输出: 0
 Trueconsole.log(Number(undefined)); // 输出: NaN
 True
 True// parseInt() 函数
 Trueconsole.log(parseInt("10")); // 输出: 10
 Trueconsole.log(parseInt("10.5")); // 输出: 10
 Trueconsole.log(parseInt("10px")); // 输出: 10
 Trueconsole.log(parseInt("Hello")); // 输出: NaN
 True
 True// parseFloat() 函数
 Trueconsole.log(parseFloat("10")); // 输出: 10
 Trueconsole.log(parseFloat("10.5")); // 输出: 10.5
 Trueconsole.log(parseFloat("10.5px")); // 输出: 10.5
 True```

 False#### 4.2.2 转换为字符串
 False
```javascript
 True// String() 函数
 Trueconsole.log(String(10)); // 输出: "10"
 Trueconsole.log(String(10.5)); // 输出: "10.5"
 Trueconsole.log(String(true)); // 输出: "true"
 Trueconsole.log(String(false)); // 输出: "false"
 Trueconsole.log(String(null)); // 输出: "null"
 Trueconsole.log(String(undefined)); // 输出: "undefined"
 True
 True// toString() 方法
 Trueconsole.log((10).toString()); // 输出: "10"
 Trueconsole.log((10.5).toString()); // 输出: "10.5"
 Trueconsole.log(true.toString()); // 输出: "true"
 Trueconsole.log(false.toString()); // 输出: "false"
 True// 注意: null 和 undefined 没有 toString() 方法
 True```

 False#### 4.2.3 转换为布尔值
 False
```javascript
 True// Boolean() 函数
 Trueconsole.log(Boolean(1)); // 输出: true
 Trueconsole.log(Boolean(0)); // 输出: false
 Trueconsole.log(Boolean("Hello")); // 输出: true
 Trueconsole.log(Boolean("")); // 输出: false
 Trueconsole.log(Boolean({})); // 输出: true
 Trueconsole.log(Boolean([])); // 输出: true
 Trueconsole.log(Boolean(null)); // 输出: false
 Trueconsole.log(Boolean(undefined)); // 输出: false
 Trueconsole.log(Boolean(NaN)); // 输出: false
 True
 True// 双重否定运算符 !!
 Trueconsole.log(!!1); // 输出: true
 Trueconsole.log(!!0); // 输出: false
 Trueconsole.log(!!"Hello"); // 输出: true
 Trueconsole.log(!!""); // 输出: false
 True```

 False### 4.3 类型转换最佳实践
 False
 False- **使用严格相等运算符** (`===` 和 `!==`) 避免隐式类型转换
 False- **显式转换** 以提高代码可读性和可维护性
 False- **注意 falsy 值**，特别是 `0`, `''`, `null`, `undefined`, `NaN`
 False- **使用 `Number.isNaN()`** 而不是 `isNaN()`，因为 `isNaN()` 会进行类型转换
 False- **使用 `parseInt()` 时指定基数**，例如 `parseInt("10", 10)`
 False
 False## 5. 实战示例
 False
 False### 5.1 类型检测工具函数
 False
```javascript
 True/**
 True * 检测变量类型
 True * @param {*} value - 要检测类型的变量
 True * @returns {string} 变量的类型
 True */
 Truefunction getType(value) {
 True if (value === null) {
 True return 'null';
 True }
 True 
 True if (typeof value === 'object') {
 True if (Array.isArray(value)) {
 True return 'array';
 True }
 True if (value instanceof Date) {
 True return 'date';
 True }
 True if (value instanceof RegExp) {
 True return 'regexp';
 True }
 True return 'object';
 True }
 True 
 True return typeof value;
 True}
 True
 True// 测试
 Trueconsole.log(getType(42)); // 输出: "number"
 Trueconsole.log(getType("Hello")); // 输出: "string"
 Trueconsole.log(getType(true)); // 输出: "boolean"
 Trueconsole.log(getType(undefined)); // 输出: "undefined"
 Trueconsole.log(getType(null)); // 输出: "null"
 Trueconsole.log(getType(Symbol())); // 输出: "symbol"
 Trueconsole.log(getType(1n)); // 输出: "bigint"
 Trueconsole.log(getType({})); // 输出: "object"
 Trueconsole.log(getType([])); // 输出: "array"
 Trueconsole.log(getType(function() {})); // 输出: "function"
 Trueconsole.log(getType(new Date())); // 输出: "date"
 Trueconsole.log(getType(/regex/)); // 输出: "regexp"
 True```

 False### 5.2 安全的对象属性访问
 False
```javascript
 True/**
 True * 安全地访问对象的嵌套属性
 True * @param {Object} obj - 要访问的对象
 True * @param {string} path - 属性路径，如 "user.address.city"
 True * @param {*} defaultValue - 默认值
 True * @returns {*} 属性值或默认值
 True */
 Truefunction safeGet(obj, path, defaultValue = undefined) {
 True return path.split('.').reduce((current, key) => {
 True if (current === null || current === undefined) {
 True return defaultValue;
 True }
 True return current[key];
 True }, obj);
 True}
 True
 True// 测试
 Trueconst user = {
 True name: 'Alice',
 True address: {
 True street: '123 Main St',
 True // 没有 city 属性
 True }
 True};
 True
 Trueconsole.log(safeGet(user, 'name')); // 输出: "Alice"
 Trueconsole.log(safeGet(user, 'address.street')); // 输出: "123 Main St"
 Trueconsole.log(safeGet(user, 'address.city', 'Unknown')); // 输出: "Unknown"
 Trueconsole.log(safeGet(user, 'contact.phone', 'Not provided')); // 输出: "Not provided"
 True
 True// 使用可选链运算符
 Trueconsole.log(user?.address?.city ?? 'Unknown'); // 输出: "Unknown"
 True```

 False### 5.3 类型转换工具函数
 False
```javascript
 True/**
 True * 转换为数字
 True * @param {*} value - 要转换的值
 True * @param {number} defaultValue - 默认值
 True * @returns {number} 转换后的数字或默认值
 True */
 Truefunction toNumber(value, defaultValue = 0) {
 True const num = Number(value);
 True return Number.isNaN(num) ? defaultValue : num;
 True}
 True
 True/**
 True * 转换为字符串
 True * @param {*} value - 要转换的值
 True * @param {string} defaultValue - 默认值
 True * @returns {string} 转换后的字符串或默认值
 True */
 Truefunction toString(value, defaultValue = '') {
 True if (value === null || value === undefined) {
 True return defaultValue;
 True }
 True return String(value);
 True}
 True
 True/**
 True * 转换为布尔值
 True * @param {*} value - 要转换的值
 True * @returns {boolean} 转换后的布尔值
 True */
 Truefunction toBoolean(value) {
 True return Boolean(value);
 True}
 True
 True// 测试
 Trueconsole.log(toNumber("10")); // 输出: 10
 Trueconsole.log(toNumber("Hello", 0)); // 输出: 0
 Trueconsole.log(toString(10)); // 输出: "10"
 Trueconsole.log(toString(null, "N/A")); // 输出: "N/A"
 Trueconsole.log(toBoolean(0)); // 输出: false
 Trueconsole.log(toBoolean("Hello")); // 输出: true
 True```

 False## 6. 常见问题与解决方案
 False
 False### 6.1 类型检测问题
 False
 False**问题**: `typeof null` 返回 `"object"`
 False
 False**解决方案**: 使用 `value === null` 来检测 null 值
 False
 False**示例**:
 False
```javascript
 Truefunction isNull(value) {
 True return value === null;
 True}
 True
 Trueconsole.log(isNull(null)); // 输出: true
 Trueconsole.log(isNull({})); // 输出: false
 True```

 False### 6.2 精度问题
 False
 False**问题**: 浮点数运算存在精度问题，如 `0.1 + 0.2 !== 0.3`
 False
 False**解决方案**: 使用 `Number.EPSILON` 或转换为整数进行运算
 False
 False**示例**:
 False
```javascript
 Truefunction areEqual(a, b) {
 True return Math.abs(a - b) < Number.EPSILON;
 True}
 True
 Trueconsole.log(areEqual(0.1 + 0.2, 0.3)); // 输出: true
 True
 True// 或转换为整数
 Truefunction add(a, b, precision = 10) {
 True const multiplier = Math.pow(10, precision);
 True return (Math.round(a * multiplier) + Math.round(b * multiplier)) / multiplier;
 True}
 True
 Trueconsole.log(add(0.1, 0.2)); // 输出: 0.3
 True```

 False### 6.3 隐式类型转换问题
 False
 False**问题**: 隐式类型转换导致意外的结果
 False
 False**解决方案**: 使用严格相等运算符 `===`，或显式转换
 False
 False**示例**:
 False
```javascript
 True// 问题
 Trueconsole.log(1 == "1"); // 输出: true
 Trueconsole.log(0 == false); // 输出: true
 True
 True// 解决方案
 Trueconsole.log(1 === "1"); // 输出: false
 Trueconsole.log(0 === false); // 输出: false
 True
 True// 显式转换
 Trueconsole.log(Number("1") === 1); // 输出: true
 Trueconsole.log(Boolean(0) === false); // 输出: true
 True```

 False### 6.4 数组与对象的类型检测
 False
 False**问题**: `typeof []` 和 `typeof {}` 都返回 `"object"`
 False
 False**解决方案**: 使用 `Array.isArray()` 检测数组，使用 `Object.prototype.toString.call()` 检测对象类型
 False
 False**示例**:
 False
```javascript
 Trueconsole.log(Array.isArray([])); // 输出: true
 Trueconsole.log(Array.isArray({})); // 输出: false
 True
 Truefunction isObject(value) {
 True return Object.prototype.toString.call(value) === '[object Object]';
 True}
 True
 Trueconsole.log(isObject({})); // 输出: true
 Trueconsole.log(isObject([])); // 输出: false
 True```

 False## 7. 总结
 False
 FalseJavaScript 的数据类型和运算符是构建 JavaScript 程序的基础。通过理解原始类型和引用类型的区别，掌握类型检测的方法，以及熟练使用各种运算符，你可以编写更加健壮和高效的 JavaScript 代码。
 False
 False- **数据类型**: 了解 7 种原始类型和引用类型的特点和使用方法
 False- **类型检测**: 使用适当的方法检测变量类型，如 `typeof`、`instanceof`、`Array.isArray()` 和 `Object.prototype.toString.call()`
 False- **运算符**: 掌握各种运算符的用法和优先级，特别是严格相等运算符 `===` 和现代运算符如可选链 `?.` 和空值合并 `??`
 False- **类型转换**: 理解隐式类型转换的规则，尽量使用显式类型转换以提高代码可读性
 False- **最佳实践**: 遵循类型转换的最佳实践，避免常见的类型相关问题
 False
 False通过不断练习和实践，你将能够更熟练地使用 JavaScript 的数据类型和运算符，构建出更加优雅和高效的应用。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化 JS 数据类型与现代运算符
 False- 2026-04-05: 扩写内容，增加详细的数据类型介绍、类型检测方法、运算符用法、类型转换规则和实战示例
 False