# 对象与数组 (Objects & Arrays)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: JS Basics
 False> @Description: 对象字面量、原型链、数组常用方法及解构赋值。 | Object literals, prototype, array methods, and destructuring.
 False
 False---
 False
 False## 目录
 False
 False1. [对象](#对象)
 False2. [数组](#数组)
 False3. [解构赋值](#解构赋值)
 False4. [展开/剩余运算符](#展开/剩余运算符)
 False5. [最佳实践](#最佳实践)
 False6. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 对象 (Objects)
 False
 False### 1.1 对象的创建
 False
 False#### 1.1.1 对象字面量
 False
 False**语法**：
 False
```javascript
 Trueconst obj = {
 True property1: value1,
 True property2: value2,
 True method() {
 True // 方法体
 True }
 True};
 True```

 False**示例**：
 False
```javascript
 Trueconst person = {
 True name: '张三',
 True age: 30,
 True city: '北京',
 True greet() {
 True return `Hello, my name is ${this.name}`;
 True }
 True};
 True
 Trueconsole.log(person.name); // 输出: 张三
 Trueconsole.log(person.greet()); // 输出: Hello, my name is 张三
 True```

 False#### 1.1.2 构造函数
 False
 False**语法**：
 False
```javascript
 Truefunction Person(name, age) {
 True this.name = name;
 True this.age = age;
 True this.greet = function() {
 True return `Hello, my name is ${this.name}`;
 True };
 True}
 True
 Trueconst person = new Person('张三', 30);
 True```

 False**示例**：
 False
```javascript
 Truefunction Car(make, model, year) {
 True this.make = make;
 True this.model = model;
 True this.year = year;
 True this.getDescription = function() {
 True return `${this.year} ${this.make} ${this.model}`;
 True };
 True}
 True
 Trueconst car = new Car('Toyota', 'Camry', 2020);
 Trueconsole.log(car.getDescription()); // 输出: 2020 Toyota Camry
 True```

 False#### 1.1.3 Object.create()
 False
 False**语法**：
 False
```javascript
 Trueconst obj = Object.create(prototype, propertiesObject);
 True```

 False**示例**：
 False
```javascript
 Trueconst personPrototype = {
 True greet() {
 True return `Hello, my name is ${this.name}`;
 True }
 True};
 True
 Trueconst person = Object.create(personPrototype);
 Trueperson.name = '张三';
 Trueperson.age = 30;
 True
 Trueconsole.log(person.greet()); // 输出: Hello, my name is 张三
 True```

 False#### 1.1.4 ES6 类
 False
 False**语法**：
 False
```javascript
 Trueclass Person {
 True constructor(name, age) {
 True this.name = name;
 True this.age = age;
 True }
 True 
 True greet() {
 True return `Hello, my name is ${this.name}`;
 True }
 True}
 True
 Trueconst person = new Person('张三', 30);
 True```

 False**示例**：
 False
```javascript
 Trueclass Student extends Person {
 True constructor(name, age, grade) {
 True super(name, age);
 True this.grade = grade;
 True }
 True 
 True study() {
 True return `${this.name} is studying in grade ${this.grade}`;
 True }
 True}
 True
 Trueconst student = new Student('李四', 15, 9);
 Trueconsole.log(student.greet()); // 输出: Hello, my name is 李四
 Trueconsole.log(student.study()); // 输出: 李四 is studying in grade 9
 True```

 False### 1.2 对象的属性操作
 False
 False#### 1.2.1 访问属性
 False
```javascript
 True// 点表示法
 Trueconst name = person.name;
 True
 True// 方括号表示法
 Trueconst age = person['age'];
 True
 True// 动态属性名
 Trueconst propName = 'city';
 Trueconst city = person[propName];
 True```

 False#### 1.2.2 修改属性
 False
```javascript
 Trueperson.name = '王五'; // 修改现有属性
 Trueperson.city = '上海'; // 添加新属性
 True```

 False#### 1.2.3 删除属性
 False
```javascript
 Truedelete person.city;
 True```

 False#### 1.2.4 检查属性
 False
```javascript
 True// 检查属性是否存在
 Trueconsole.log('name' in person); // 输出: true
 True
 True// 检查属性是否是对象自身的
 Trueconsole.log(person.hasOwnProperty('name')); // 输出: true
 True```

 False### 1.3 原型与原型链
 False
 False#### 1.3.1 原型的概念
 False
 False**定义**：每个对象都有一个原型对象，对象可以从原型继承属性和方法。
 False
 False**示例**：
 False
```javascript
 Truefunction Person(name) {
 True this.name = name;
 True}
 True
 True// 在原型上添加方法
 TruePerson.prototype.greet = function() {
 True return `Hello, my name is ${this.name}`;
 True};
 True
 Trueconst person1 = new Person('张三');
 Trueconst person2 = new Person('李四');
 True
 Trueconsole.log(person1.greet()); // 输出: Hello, my name is 张三
 Trueconsole.log(person2.greet()); // 输出: Hello, my name is 李四
 True
 True// 检查原型
 Trueconsole.log(Object.getPrototypeOf(person1) === Person.prototype); // 输出: true
 True```

 False#### 1.3.2 原型链
 False
 False**定义**：当访问一个对象的属性时，如果该对象没有这个属性，JavaScript 会沿着原型链向上查找，直到找到该属性或到达原型链的末端（null）。
 False
 False**示例**：
 False
```javascript
 Truefunction Person(name) {
 True this.name = name;
 True}
 True
 TruePerson.prototype.greet = function() {
 True return `Hello, my name is ${this.name}`;
 True};
 True
 Truefunction Student(name, grade) {
 True Person.call(this, name);
 True this.grade = grade;
 True}
 True
 True// 继承 Person 的原型
 TrueStudent.prototype = Object.create(Person.prototype);
 TrueStudent.prototype.constructor = Student;
 True
 TrueStudent.prototype.study = function() {
 True return `${this.name} is studying`;
 True};
 True
 Trueconst student = new Student('王五', 9);
 Trueconsole.log(student.greet()); // 输出: Hello, my name is 王五 (继承自 Person)
 Trueconsole.log(student.study()); // 输出: 王五 is studying (Student 自身的方法)
 True```

 False### 1.4 对象的方法
 False
 False#### 1.4.1 Object.keys()
 False
 False**作用**：返回对象自身的可枚举属性的键数组。
 False
```javascript
 Trueconst person = { name: '张三', age: 30, city: '北京' };
 Trueconst keys = Object.keys(person);
 Trueconsole.log(keys); // 输出: ['name', 'age', 'city']
 True```

 False#### 1.4.2 Object.values()
 False
 False**作用**：返回对象自身的可枚举属性的值数组。
 False
```javascript
 Trueconst person = { name: '张三', age: 30, city: '北京' };
 Trueconst values = Object.values(person);
 Trueconsole.log(values); // 输出: ['张三', 30, '北京']
 True```

 False#### 1.4.3 Object.entries()
 False
 False**作用**：返回对象自身的可枚举属性的键值对数组。
 False
```javascript
 Trueconst person = { name: '张三', age: 30, city: '北京' };
 Trueconst entries = Object.entries(person);
 Trueconsole.log(entries); // 输出: [['name', '张三'], ['age', 30], ['city', '北京']]
 True```

 False#### 1.4.4 Object.assign()
 False
 False**作用**：将一个或多个源对象的属性复制到目标对象。
 False
```javascript
 Trueconst target = { a: 1 };
 Trueconst source1 = { b: 2 };
 Trueconst source2 = { c: 3 };
 True
 TrueObject.assign(target, source1, source2);
 Trueconsole.log(target); // 输出: { a: 1, b: 2, c: 3 }
 True```

 False## 2. 数组 (Arrays)
 False
 False### 2.1 数组的创建
 False
 False#### 2.1.1 数组字面量
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 True```

 False#### 2.1.2 Array 构造函数
 False
```javascript
 Trueconst numbers = new Array(1, 2, 3, 4, 5);
 Trueconst emptyArray = new Array(5); // 创建长度为 5 的空数组
 True```

 False#### 2.1.3 Array.from()
 False
 False**作用**：从类数组对象或可迭代对象创建一个新的数组实例。
 False
```javascript
 Trueconst str = 'hello';
 Trueconst arr = Array.from(str);
 Trueconsole.log(arr); // 输出: ['h', 'e', 'l', 'l', 'o']
 True
 Trueconst set = new Set([1, 2, 3]);
 Trueconst arrFromSet = Array.from(set);
 Trueconsole.log(arrFromSet); // 输出: [1, 2, 3]
 True```

 False#### 2.1.4 Array.of()
 False
 False**作用**：创建一个包含任意数量参数的新数组实例，无论参数的数量或类型。
 False
```javascript
 Trueconst arr = Array.of(1, 2, 3, 4, 5);
 Trueconsole.log(arr); // 输出: [1, 2, 3, 4, 5]
 True```

 False### 2.2 数组的基础操作
 False
 False#### 2.2.1 增删操作
 False
 False| 方法 | 描述 | 示例 |
 False|------|------|------|
 False| push() | 向数组末尾添加一个或多个元素 | `fruits.push('grape')` |
 False| pop() | 移除并返回数组的最后一个元素 | `const last = fruits.pop()` |
 False| unshift() | 向数组开头添加一个或多个元素 | `fruits.unshift('strawberry')` |
 False| shift() | 移除并返回数组的第一个元素 | `const first = fruits.shift()` |
 False| splice() | 从数组中添加或删除元素 | `fruits.splice(1, 1, 'pear')` |
 False
 False**示例**：
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 True
 True// push
 Truefruits.push('grape');
 Trueconsole.log(fruits); // 输出: ['apple', 'banana', 'orange', 'grape']
 True
 True// pop
 Trueconst lastFruit = fruits.pop();
 Trueconsole.log(lastFruit); // 输出: grape
 Trueconsole.log(fruits); // 输出: ['apple', 'banana', 'orange']
 True
 True// unshift
 Truefruits.unshift('strawberry');
 Trueconsole.log(fruits); // 输出: ['strawberry', 'apple', 'banana', 'orange']
 True
 True// shift
 Trueconst firstFruit = fruits.shift();
 Trueconsole.log(firstFruit); // 输出: strawberry
 Trueconsole.log(fruits); // 输出: ['apple', 'banana', 'orange']
 True
 True// splice
 Truefruits.splice(1, 1, 'pear');
 Trueconsole.log(fruits); // 输出: ['apple', 'pear', 'orange']
 True```

 False#### 2.2.2 访问和修改元素
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 True
 True// 访问元素
 Trueconsole.log(fruits[0]); // 输出: apple
 True
 True// 修改元素
 Truefruits[1] = 'pear';
 Trueconsole.log(fruits); // 输出: ['apple', 'pear', 'orange']
 True```

 False#### 2.2.3 数组长度
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Trueconsole.log(fruits.length); // 输出: 3
 True
 True// 修改长度
 Truefruits.length = 2;
 Trueconsole.log(fruits); // 输出: ['apple', 'banana']
 True```

 False### 2.3 数组的迭代方法
 False
 False#### 2.3.1 forEach()
 False
 False**作用**：遍历数组的每个元素，并对每个元素执行回调函数。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Truenumbers.forEach((num, index) => {
 True console.log(`Index ${index}: ${num}`);
 True});
 True// 输出:
 True// Index 0: 1
 True// Index 1: 2
 True// Index 2: 3
 True// Index 3: 4
 True// Index 4: 5
 True```

 False#### 2.3.2 map()
 False
 False**作用**：创建一个新数组，其中包含对原始数组每个元素调用回调函数的结果。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst doubled = numbers.map(num => num * 2);
 Trueconsole.log(doubled); // 输出: [2, 4, 6, 8, 10]
 True```

 False#### 2.3.3 filter()
 False
 False**作用**：创建一个新数组，其中包含通过测试函数的元素。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst evenNumbers = numbers.filter(num => num % 2 === 0);
 Trueconsole.log(evenNumbers); // 输出: [2, 4]
 True```

 False#### 2.3.4 reduce()
 False
 False**作用**：对数组中的所有元素执行一个 reducer 函数，将其简化为单个值。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst sum = numbers.reduce((accumulator, currentValue) => {
 True return accumulator + currentValue;
 True}, 0);
 Trueconsole.log(sum); // 输出: 15
 True```

 False#### 2.3.5 find()
 False
 False**作用**：返回数组中第一个通过测试函数的元素。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst firstEven = numbers.find(num => num % 2 === 0);
 Trueconsole.log(firstEven); // 输出: 2
 True```

 False#### 2.3.6 findIndex()
 False
 False**作用**：返回数组中第一个通过测试函数的元素的索引。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
 Trueconsole.log(firstEvenIndex); // 输出: 1
 True```

 False#### 2.3.7 some()
 False
 False**作用**：检查数组中是否至少有一个元素通过测试函数。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst hasEven = numbers.some(num => num % 2 === 0);
 Trueconsole.log(hasEven); // 输出: true
 True```

 False#### 2.3.8 every()
 False
 False**作用**：检查数组中是否所有元素都通过测试函数。
 False
```javascript
 Trueconst numbers = [2, 4, 6, 8, 10];
 Trueconst allEven = numbers.every(num => num % 2 === 0);
 Trueconsole.log(allEven); // 输出: true
 True```

 False#### 2.3.9 includes()
 False
 False**作用**：检查数组是否包含指定的元素。
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Trueconst hasApple = fruits.includes('apple');
 Trueconsole.log(hasApple); // 输出: true
 True```

 False#### 2.3.10 indexOf()
 False
 False**作用**：返回数组中指定元素的第一个索引，如果不存在则返回 -1。
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Trueconst bananaIndex = fruits.indexOf('banana');
 Trueconsole.log(bananaIndex); // 输出: 1
 True```

 False#### 2.3.11 lastIndexOf()
 False
 False**作用**：返回数组中指定元素的最后一个索引，如果不存在则返回 -1。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 2, 1];
 Trueconst lastTwoIndex = numbers.lastIndexOf(2);
 Trueconsole.log(lastTwoIndex); // 输出: 3
 True```

 False### 2.4 数组的转换方法
 False
 False#### 2.4.1 join()
 False
 False**作用**：将数组的所有元素连接成一个字符串。
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Trueconst fruitsString = fruits.join(', ');
 Trueconsole.log(fruitsString); // 输出: apple, banana, orange
 True```

 False#### 2.4.2 toString()
 False
 False**作用**：将数组转换为字符串。
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Trueconst fruitsString = fruits.toString();
 Trueconsole.log(fruitsString); // 输出: apple,banana,orange
 True```

 False#### 2.4.3 slice()
 False
 False**作用**：返回数组的一个子集，不会修改原数组。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst subset = numbers.slice(1, 4); // 从索引 1 到 3（不包括 4）
 Trueconsole.log(subset); // 输出: [2, 3, 4]
 Trueconsole.log(numbers); // 输出: [1, 2, 3, 4, 5]（原数组不变）
 True```

 False#### 2.4.4 concat()
 False
 False**作用**：连接两个或多个数组，返回一个新数组。
 False
```javascript
 Trueconst arr1 = [1, 2, 3];
 Trueconst arr2 = [4, 5, 6];
 Trueconst combined = arr1.concat(arr2);
 Trueconsole.log(combined); // 输出: [1, 2, 3, 4, 5, 6]
 True```

 False#### 2.4.5 reverse()
 False
 False**作用**：反转数组的顺序，会修改原数组。
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Truenumbers.reverse();
 Trueconsole.log(numbers); // 输出: [5, 4, 3, 2, 1]
 True```

 False#### 2.4.6 sort()
 False
 False**作用**：对数组元素进行排序，会修改原数组。
 False
```javascript
 Trueconst numbers = [3, 1, 4, 1, 5, 9, 2, 6];
 Truenumbers.sort((a, b) => a - b); // 升序排序
 Trueconsole.log(numbers); // 输出: [1, 1, 2, 3, 4, 5, 6, 9]
 True
 Trueconst fruits = ['banana', 'apple', 'orange'];
 Truefruits.sort(); // 按字母顺序排序
 Trueconsole.log(fruits); // 输出: ['apple', 'banana', 'orange']
 True```

 False## 3. 解构赋值 (Destructuring)
 False
 False### 3.1 数组解构
 False
 False**语法**：
 False
```javascript
 Trueconst [a, b, c] = [1, 2, 3];
 True```

 False**示例**：
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 True
 True// 基本解构
 Trueconst [first, second] = numbers;
 Trueconsole.log(first, second); // 输出: 1 2
 True
 True// 跳过元素
 Trueconst [, , third] = numbers;
 Trueconsole.log(third); // 输出: 3
 True
 True// 剩余元素
 Trueconst [firstNum, ...rest] = numbers;
 Trueconsole.log(firstNum); // 输出: 1
 Trueconsole.log(rest); // 输出: [2, 3, 4, 5]
 True
 True// 默认值
 Trueconst [x, y, z = 10] = [1, 2];
 Trueconsole.log(x, y, z); // 输出: 1 2 10
 True```

 False### 3.2 对象解构
 False
 False**语法**：
 False
```javascript
 Trueconst { property1, property2 } = object;
 True```

 False**示例**：
 False
```javascript
 Trueconst person = {
 True name: '张三',
 True age: 30,
 True city: '北京'
 True};
 True
 True// 基本解构
 Trueconst { name, age } = person;
 Trueconsole.log(name, age); // 输出: 张三 30
 True
 True// 重命名属性
 Trueconst { name: personName, city: personCity } = person;
 Trueconsole.log(personName, personCity); // 输出: 张三 北京
 True
 True// 默认值
 Trueconst { name, gender = '男' } = person;
 Trueconsole.log(name, gender); // 输出: 张三 男
 True
 True// 剩余属性
 Trueconst { name, ...rest } = person;
 Trueconsole.log(name); // 输出: 张三
 Trueconsole.log(rest); // 输出: { age: 30, city: '北京' }
 True```

 False### 3.3 嵌套解构
 False
 False**示例**：
 False
```javascript
 Trueconst user = {
 True name: '张三',
 True address: {
 True city: '北京',
 True district: '朝阳区'
 True },
 True hobbies: ['读书', '旅行', '运动']
 True};
 True
 True// 嵌套对象解构
 Trueconst { name, address: { city } } = user;
 Trueconsole.log(name, city); // 输出: 张三 北京
 True
 True// 嵌套数组解构
 Trueconst { hobbies: [firstHobby, secondHobby] } = user;
 Trueconsole.log(firstHobby, secondHobby); // 输出: 读书 旅行
 True```

 False### 3.4 函数参数解构
 False
 False**示例**：
 False
```javascript
 True// 对象解构作为函数参数
 Truefunction printUser({ name, age }) {
 True console.log(`Name: ${name}, Age: ${age}`);
 True}
 True
 Trueconst user = { name: '张三', age: 30 };
 TrueprintUser(user); // 输出: Name: 张三, Age: 30
 True
 True// 数组解构作为函数参数
 Truefunction sum([a, b, c]) {
 True return a + b + c;
 True}
 True
 Trueconst numbers = [1, 2, 3];
 Trueconsole.log(sum(numbers)); // 输出: 6
 True```

 False## 4. 展开/剩余运算符 (`...`)
 False
 False### 4.1 展开运算符
 False
 False**作用**：将可迭代对象（如数组、字符串）展开为单个元素。
 False
 False#### 4.1.1 数组展开
 False
```javascript
 Trueconst arr1 = [1, 2, 3];
 Trueconst arr2 = [4, 5, 6];
 Trueconst combined = [...arr1, ...arr2];
 Trueconsole.log(combined); // 输出: [1, 2, 3, 4, 5, 6]
 True
 True// 复制数组
 Trueconst original = [1, 2, 3];
 Trueconst copy = [...original];
 Trueconsole.log(copy); // 输出: [1, 2, 3]
 True```

 False#### 4.1.2 对象展开
 False
```javascript
 Trueconst obj1 = { a: 1, b: 2 };
 Trueconst obj2 = { c: 3, d: 4 };
 Trueconst combined = { ...obj1, ...obj2 };
 Trueconsole.log(combined); // 输出: { a: 1, b: 2, c: 3, d: 4 }
 True
 True// 复制对象
 Trueconst original = { a: 1, b: 2 };
 Trueconst copy = { ...original };
 Trueconsole.log(copy); // 输出: { a: 1, b: 2 }
 True
 True// 合并对象并覆盖属性
 Trueconst obj1 = { a: 1, b: 2 };
 Trueconst obj2 = { b: 3, c: 4 };
 Trueconst combined = { ...obj1, ...obj2 };
 Trueconsole.log(combined); // 输出: { a: 1, b: 3, c: 4 }
 True```

 False#### 4.1.3 字符串展开
 False
```javascript
 Trueconst str = 'hello';
 Trueconst arr = [...str];
 Trueconsole.log(arr); // 输出: ['h', 'e', 'l', 'l', 'o']
 True```

 False### 4.2 剩余运算符
 False
 False**作用**：收集剩余的参数或属性。
 False
 False#### 4.2.1 函数参数中的剩余运算符
 False
```javascript
 Truefunction sum(...numbers) {
 True return numbers.reduce((total, num) => total + num, 0);
 True}
 True
 Trueconsole.log(sum(1, 2, 3, 4, 5)); // 输出: 15
 True```

 False#### 4.2.2 解构中的剩余运算符
 False
```javascript
 True// 数组解构
 Trueconst [first, ...rest] = [1, 2, 3, 4, 5];
 Trueconsole.log(first); // 输出: 1
 Trueconsole.log(rest); // 输出: [2, 3, 4, 5]
 True
 True// 对象解构
 Trueconst { a, ...rest } = { a: 1, b: 2, c: 3 };
 Trueconsole.log(a); // 输出: 1
 Trueconsole.log(rest); // 输出: { b: 2, c: 3 }
 True```

 False## 5. 最佳实践
 False
 False### 5.1 对象最佳实践
 False
 False1. **使用对象字面量**：对于简单对象，优先使用对象字面量创建。
 False
 False2. **使用 ES6 类**：对于复杂对象，优先使用 ES6 类语法。
 False
 False3. **使用 Object.keys()/values()/entries()**：遍历对象时，优先使用这些方法。
 False
 False4. **使用解构赋值**：从对象中提取属性时，使用解构赋值使代码更简洁。
 False
 False5. **使用展开运算符**：复制或合并对象时，使用展开运算符。
 False
 False6. **避免使用 **proto****：直接操作原型链可能导致性能问题，应使用 Object.getPrototypeOf() 和 Object.setPrototypeOf()。
 False
 False### 5.2 数组最佳实践
 False
 False1. **使用数组字面量**：创建数组时，优先使用数组字面量。
 False
 False2. **使用现代迭代方法**：遍历数组时，优先使用 forEach、map、filter 等现代方法。
 False
 False3. **使用解构赋值**：从数组中提取元素时，使用解构赋值。
 False
 False4. **使用展开运算符**：复制或合并数组时，使用展开运算符。
 False
 False5. **注意数组方法的副作用**：有些数组方法会修改原数组（如 push、pop、splice、reverse、sort），使用时要注意。
 False
 False6. **使用 includes() 检查元素**：检查数组是否包含某个元素时，优先使用 includes() 而不是 indexOf()。
 False
 False7. **使用 map() 转换数组**：当需要转换数组的每个元素时，使用 map() 方法。
 False
 False8. **使用 reduce() 进行累积计算**：当需要将数组简化为单个值时，使用 reduce() 方法。
 False
 False## 6. 实际应用示例
 False
 False### 6.1 示例 1：对象操作
 False
```javascript
 True// 合并多个对象
 Trueconst defaults = {
 True color: 'red',
 True size: 'medium'
 True};
 True
 Trueconst options = {
 True color: 'blue',
 True quantity: 5
 True};
 True
 Trueconst finalConfig = { ...defaults, ...options };
 Trueconsole.log(finalConfig); // 输出: { color: 'blue', size: 'medium', quantity: 5 }
 True
 True// 提取对象属性
 Trueconst user = {
 True id: 1,
 True name: '张三',
 True age: 30,
 True email: 'zhangsan@example.com'
 True};
 True
 Trueconst { id, name, ...rest } = user;
 Trueconsole.log(id, name); // 输出: 1 张三
 Trueconsole.log(rest); // 输出: { age: 30, email: 'zhangsan@example.com' }
 True```

 False### 6.2 示例 2：数组操作
 False
```javascript
 True// 数据处理
 Trueconst users = [
 True { id: 1, name: '张三', age: 30, active: true },
 True { id: 2, name: '李四', age: 25, active: false },
 True { id: 3, name: '王五', age: 35, active: true },
 True { id: 4, name: '赵六', age: 28, active: true }
 True];
 True
 True// 过滤活跃用户
 Trueconst activeUsers = users.filter(user => user.active);
 Trueconsole.log('活跃用户:', activeUsers);
 True
 True// 提取用户名
 Trueconst userNames = users.map(user => user.name);
 Trueconsole.log('用户名:', userNames);
 True
 True// 计算平均年龄
 Trueconst averageAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
 Trueconsole.log('平均年龄:', averageAge);
 True
 True// 查找年龄大于 30 的用户
 Trueconst olderUser = users.find(user => user.age > 30);
 Trueconsole.log('年龄大于 30 的用户:', olderUser);
 True```

 False### 6.3 示例 3：解构与展开运算符
 False
```javascript
 True// 函数参数解构
 Truefunction createUser({ name, age, email = 'unknown@example.com' }) {
 True return {
 True id: Math.random().toString(36).substr(2, 9),
 True name,
 True age,
 True email,
 True createdAt: new Date()
 True };
 True}
 True
 Trueconst userData = { name: '张三', age: 30 };
 Trueconst newUser = createUser(userData);
 Trueconsole.log('新用户:', newUser);
 True
 True// 数组展开与解构
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst [first, second, ...rest] = numbers;
 Trueconst newNumbers = [...rest, 6, 7];
 Trueconsole.log('原数组:', numbers);
 Trueconsole.log('第一个元素:', first);
 Trueconsole.log('第二个元素:', second);
 Trueconsole.log('剩余元素:', rest);
 Trueconsole.log('新数组:', newNumbers);
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化原型链与常用数组高阶函数。
 False- 2026-04-05: 扩写内容，增加详细的对象和数组操作、示例和最佳实践。
 False