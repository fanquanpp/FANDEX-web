# 控制流 (Control Flow)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: JS Basics
 False> @Description: 条件分支、循环结构、异常处理及现代迭代器。 | Conditionals, loops, error handling, and iterators.
 False
 False---
 False
 False## 目录
 False
 False1. [条件分支](#条件分支)
 False2. [循环结构](#循环结构)
 False3. [跳转语句](#跳转语句)
 False4. [异常处理](#异常处理)
 False5. [现代迭代方法](#现代迭代方法)
 False6. [最佳实践](#最佳实践)
 False7. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 条件分支 (Conditionals)
 False
 False### 1.1 if-else 语句
 False
 False**基本语法**：
 False
```javascript
 Trueif (condition) {
 True // 条件为真时执行
 True} else if (anotherCondition) {
 True // 另一个条件为真时执行
 True} else {
 True // 所有条件都为假时执行
 True}
 True```

 False**示例**：
 False
```javascript
 Trueconst score = 85;
 True
 Trueif (score >= 90) {
 True console.log('优秀');
 True} else if (score >= 80) {
 True console.log('良好');
 True} else if (score >= 60) {
 True console.log('及格');
 True} else {
 True console.log('不及格');
 True}
 True// 输出: 良好
 True```

 False### 1.2 三元运算符
 False
 False**语法**：`condition ? expression1 : expression2`
 False
 False**示例**：
 False
```javascript
 Trueconst age = 18;
 Trueconst canVote = age >= 18 ? '可以投票' : '不能投票';
 Trueconsole.log(canVote); // 输出: 可以投票
 True```

 False### 1.3 switch 语句
 False
 False**基本语法**：
 False
```javascript
 Trueswitch (expression) {
 True case value1:
 True // 当 expression === value1 时执行
 True break;
 True case value2:
 True // 当 expression === value2 时执行
 True break;
 True default:
 True // 当没有匹配的 case 时执行
 True}
 True```

 False**示例**：
 False
```javascript
 Trueconst day = new Date().getDay();
 Truelet dayName;
 True
 Trueswitch (day) {
 True case 0:
 True dayName = '星期日';
 True break;
 True case 1:
 True dayName = '星期一';
 True break;
 True case 2:
 True dayName = '星期二';
 True break;
 True case 3:
 True dayName = '星期三';
 True break;
 True case 4:
 True dayName = '星期四';
 True break;
 True case 5:
 True dayName = '星期五';
 True break;
 True case 6:
 True dayName = '星期六';
 True break;
 True default:
 True dayName = '无效的日期';
 True}
 True
 Trueconsole.log(dayName);
 True```

 False**注意**：switch 语句使用严格相等 (`===`) 进行比较，且每个 case 语句后需要使用 `break` 语句来避免穿透。
 False
 False## 2. 循环结构 (Loops)
 False
 False### 2.1 for 循环
 False
 False**基本语法**：
 False
```javascript
 Truefor (initialization; condition; increment) {
 True // 循环体
 True}
 True```

 False**示例**：
 False
```javascript
 True// 计算 1 到 10 的和
 Truelet sum = 0;
 Truefor (let i = 1; i <= 10; i++) {
 True sum += i;
 True}
 Trueconsole.log(sum); // 输出: 55
 True
 True// 遍历数组
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Truefor (let i = 0; i < fruits.length; i++) {
 True console.log(fruits[i]);
 True}
 True// 输出:
 True// apple
 True// banana
 True// orange
 True```

 False### 2.2 while 循环
 False
 False**基本语法**：
 False
```javascript
 Truewhile (condition) {
 True // 循环体
 True}
 True```

 False**示例**：
 False
```javascript
 True// 计算 1 到 10 的和
 Truelet sum = 0;
 Truelet i = 1;
 Truewhile (i <= 10) {
 True sum += i;
 True i++;
 True}
 Trueconsole.log(sum); // 输出: 55
 True```

 False### 2.3 do-while 循环
 False
 False**基本语法**：
 False
```javascript
 Truedo {
 True // 循环体
 True} while (condition);
 True```

 False**示例**：
 False
```javascript
 True// 至少执行一次循环
 Truelet count = 0;
 Truedo {
 True console.log(`计数: ${count}`);
 True count++;
 True} while (count < 3);
 True// 输出:
 True// 计数: 0
 True// 计数: 1
 True// 计数: 2
 True```

 False### 2.4 for-in 循环
 False
 False**基本语法**：
 False
```javascript
 Truefor (variable in object) {
 True // 循环体
 True}
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
 Truefor (let key in person) {
 True console.log(`${key}: ${person[key]}`);
 True}
 True// 输出:
 True// name: 张三
 True// age: 30
 True// city: 北京
 True```

 False**注意**：for-in 循环会遍历对象的所有可枚举属性，包括继承的属性。
 False
 False### 2.5 for-of 循环 (ES6+)
 False
 False**基本语法**：
 False
```javascript
 Truefor (variable of iterable) {
 True // 循环体
 True}
 True```

 False**示例**：
 False
```javascript
 True// 遍历数组
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Truefor (let fruit of fruits) {
 True console.log(fruit);
 True}
 True// 输出:
 True// apple
 True// banana
 True// orange
 True
 True// 遍历字符串
 Trueconst str = 'Hello';
 Truefor (let char of str) {
 True console.log(char);
 True}
 True// 输出:
 True// H
 True// e
 True// l
 True// l
 True// o
 True
 True// 遍历 Map
 Trueconst map = new Map([
 True ['name', '张三'],
 True ['age', 30]
 True]);
 Truefor (let [key, value] of map) {
 True console.log(`${key}: ${value}`);
 True}
 True// 输出:
 True// name: 张三
 True// age: 30
 True```

 False## 3. 跳转语句 (Jumps)
 False
 False### 3.1 break 语句
 False
 False**作用**：跳出循环或 switch 语句。
 False
 False**示例**：
 False
```javascript
 True// 跳出循环
 Truefor (let i = 0; i < 10; i++) {
 True if (i === 5) {
 True break; // 当 i 等于 5 时跳出循环
 True }
 True console.log(i);
 True}
 True// 输出: 0 1 2 3 4
 True
 True// 跳出 switch 语句
 Trueconst fruit = 'apple';
 Trueswitch (fruit) {
 True case 'apple':
 True console.log('这是苹果');
 True break;
 True case 'banana':
 True console.log('这是香蕉');
 True break;
 True default:
 True console.log('未知水果');
 True}
 True// 输出: 这是苹果
 True```

 False### 3.2 continue 语句
 False
 False**作用**：跳过当前迭代，继续下一次循环。
 False
 False**示例**：
 False
```javascript
 True// 跳过奇数
 Truefor (let i = 0; i < 10; i++) {
 True if (i % 2 !== 0) {
 True continue; // 跳过奇数
 True }
 True console.log(i);
 True}
 True// 输出: 0 2 4 6 8
 True```

 False### 3.3 return 语句
 False
 False**作用**：从函数中返回值，并终止函数执行。
 False
 False**示例**：
 False
```javascript
 Truefunction add(a, b) {
 True return a + b; // 返回 a + b 的值
 True}
 True
 Trueconst result = add(2, 3);
 Trueconsole.log(result); // 输出: 5
 True
 True// 提前返回
 Truefunction checkAge(age) {
 True if (age < 18) {
 True return '未成年';
 True }
 True return '成年';
 True}
 True
 Trueconsole.log(checkAge(16)); // 输出: 未成年
 Trueconsole.log(checkAge(20)); // 输出: 成年
 True```

 False## 4. 异常处理 (Error Handling)
 False
 False### 4.1 try-catch-finally 语句
 False
 False**基本语法**：
 False
```javascript
 Truetry {
 True // 可能抛出异常的代码
 True} catch (error) {
 True // 捕获并处理异常
 True} finally {
 True // 无论是否发生异常都会执行的代码
 True}
 True```

 False**示例**：
 False
```javascript
 Truetry {
 True const result = 10 / 0;
 True console.log(result);
 True} catch (error) {
 True console.error('发生错误:', error.message);
 True} finally {
 True console.log('无论是否发生错误，都会执行这里');
 True}
 True// 输出:
 True// 发生错误: Division by zero
 True// 无论是否发生错误，都会执行这里
 True```

 False### 4.2 自定义异常
 False
 False**示例**：
 False
```javascript
 Trueclass ValidationError extends Error {
 True constructor(message) {
 True super(message);
 True this.name = 'ValidationError';
 True }
 True}
 True
 Truefunction validateEmail(email) {
 True if (!email.includes('@')) {
 True throw new ValidationError('邮箱格式不正确');
 True }
 True return true;
 True}
 True
 Truetry {
 True validateEmail('invalid-email');
 True console.log('邮箱验证通过');
 True} catch (error) {
 True if (error instanceof ValidationError) {
 True console.error('验证错误:', error.message);
 True } else {
 True console.error('其他错误:', error.message);
 True }
 True}
 True// 输出: 验证错误: 邮箱格式不正确
 True```

 False## 5. 现代迭代方法
 False
 False### 5.1 forEach 方法
 False
 False**作用**：遍历数组的每个元素。
 False
 False**示例**：
 False
```javascript
 Trueconst fruits = ['apple', 'banana', 'orange'];
 Truefruits.forEach((fruit, index) => {
 True console.log(`${index}: ${fruit}`);
 True});
 True// 输出:
 True// 0: apple
 True// 1: banana
 True// 2: orange
 True```

 False### 5.2 map 方法
 False
 False**作用**：创建一个新数组，其中包含对原始数组每个元素调用函数的结果。
 False
 False**示例**：
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst doubled = numbers.map(num => num * 2);
 Trueconsole.log(doubled); // 输出: [2, 4, 6, 8, 10]
 True```

 False### 5.3 filter 方法
 False
 False**作用**：创建一个新数组，其中包含通过测试函数的元素。
 False
 False**示例**：
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst evenNumbers = numbers.filter(num => num % 2 === 0);
 Trueconsole.log(evenNumbers); // 输出: [2, 4]
 True```

 False### 5.4 reduce 方法
 False
 False**作用**：对数组中的所有元素执行一个 reducer 函数，将其简化为单个值。
 False
 False**示例**：
 False
```javascript
 Trueconst numbers = [1, 2, 3, 4, 5];
 Trueconst sum = numbers.reduce((accumulator, currentValue) => {
 True return accumulator + currentValue;
 True}, 0);
 Trueconsole.log(sum); // 输出: 15
 True```

 False## 6. 最佳实践
 False
 False### 6.1 条件分支最佳实践
 False
 False1. **使用卫语句**：对于复杂的条件逻辑，使用卫语句可以提高代码可读性。
 False
 ```javascript
 True // 不好的做法
 True function processUser(user) {
 True if (user) {
 True if (user.isActive) {
 True if (user.age >= 18) {
 True // 处理逻辑
 True }
 True }
 True }
 True }
 True
 True // 好的做法
 True function processUser(user) {
 True if (!user) return;
 True if (!user.isActive) return;
 True if (user.age < 18) return;
 True // 处理逻辑
 True }
 True ```

 False2. **使用三元运算符**：对于简单的条件赋值，使用三元运算符可以使代码更简洁。
 False
 False3. **使用 switch 语句**：对于多个互斥的条件，使用 switch 语句比多个 if-else 语句更清晰。
 False
 False### 6.2 循环最佳实践
 False
 False1. **优先使用 for-of 循环**：对于数组、字符串等可迭代对象，使用 for-of 循环比传统的 for 循环更简洁。
 False
 False2. **使用现代数组方法**：对于数组操作，优先使用 forEach、map、filter 等现代数组方法，它们更具可读性。
 False
 False3. **避免无限循环**：确保循环条件最终会变为 false，避免无限循环。
 False
 False4. **注意循环性能**：对于大型数组，要注意循环的性能，避免在循环内部进行复杂的计算。
 False
 False### 6.3 异常处理最佳实践
 False
 False1. **只捕获预期的异常**：不要捕获所有异常，只捕获你能够处理的异常。
 False
 False2. **使用具体的异常类型**：创建和使用具体的异常类型，以便更精确地处理不同类型的错误。
 False
 False3. **保持 try 块小**：try 块应该只包含可能抛出异常的代码，这样可以更精确地定位错误。
 False
 False4. **使用 finally 清理资源**：对于需要清理的资源（如文件句柄、网络连接等），使用 finally 块确保它们被正确清理。
 False
 False## 7. 实际应用示例
 False
 False### 7.1 示例 1：用户输入验证
 False
```javascript
 Truefunction validateUserInput(input) {
 True try {
 True if (!input) {
 True throw new Error('输入不能为空');
 True }
 True 
 True if (input.length < 3) {
 True throw new Error('输入长度不能少于 3 个字符');
 True }
 True 
 True if (!/^[a-zA-Z0-9]+$/.test(input)) {
 True throw new Error('输入只能包含字母和数字');
 True }
 True 
 True console.log('输入验证通过');
 True return true;
 True } catch (error) {
 True console.error('验证错误:', error.message);
 True return false;
 True }
 True}
 True
 True// 测试
 TruevalidateUserInput(''); // 输入不能为空
 TruevalidateUserInput('ab'); // 输入长度不能少于 3 个字符
 TruevalidateUserInput('abc123'); // 输入验证通过
 TruevalidateUserInput('abc@123'); // 输入只能包含字母和数字
 True```

 False### 7.2 示例 2：数据处理
 False
```javascript
 Trueconst data = [
 True { name: '张三', age: 25, score: 85 },
 True { name: '李四', age: 30, score: 92 },
 True { name: '王五', age: 22, score: 78 },
 True { name: '赵六', age: 28, score: 95 }
 True];
 True
 True// 过滤出分数大于 90 的用户
 Trueconst highScorers = data.filter(user => user.score > 90);
 Trueconsole.log('高分用户:', highScorers);
 True
 True// 计算平均年龄
 Trueconst averageAge = data.reduce((sum, user) => sum + user.age, 0) / data.length;
 Trueconsole.log('平均年龄:', averageAge);
 True
 True// 生成用户名称列表
 Trueconst names = data.map(user => user.name);
 Trueconsole.log('用户名称:', names);
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 整合 JS 控制流与异常处理细节。
 False- 2026-04-05: 扩写内容，增加详细的控制流语句、示例和最佳实践。
 False