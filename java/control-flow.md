# 控制流 (Control Flow)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 条件分支、循环结构、跳转语句及 Java 12+ 新特性。 | Conditional branches, loops, jumps, and Java 12+ Switch features.
 False
 False---
 False
 False## 目录
 False
 False1. [条件分支](#条件分支)
 False2. [循环结构](#循环结构)
 False3. [跳转语句](#跳转语句)
 False4. [实际应用案例](#实际应用案例)
 False5. [最佳实践](#最佳实践)
 False6. [常见陷阱](#常见陷阱)
 False
 False---
 False
 False## 1. 条件分支 (Selection)
 False
 False### 1.1 `if-else` 结构
 False
 False#### 1.1.1 基本用法
 False
```java
 Trueif (condition) {
 True // 条件为真时执行
 True} else if (anotherCondition) {
 True // 另一个条件为真时执行
 True} else {
 True // 所有条件都为假时执行
 True}
 True```

 False#### 1.1.2 嵌套 `if-else`
 False
```java
 Trueif (score >= 90) {
 True if (score >= 95) {
 True System.out.println("A+");
 True } else {
 True System.out.println("A");
 True }
 True} else if (score >= 60) {
 True System.out.println("B");
 True} else {
 True System.out.println("C");
 True}
 True```

 False#### 1.1.3 卫语句 (Guard Clause)
 False
 False对于复杂的条件判断，使用卫语句可以提高代码可读性：
 False
```java
 Truepublic void processOrder(Order order) {
 True if (order == null) {
 True return;
 True }
 True if (!order.isValid()) {
 True System.out.println("Invalid order");
 True return;
 True }
 True if (order.getAmount() > MAX_AMOUNT) {
 True System.out.println("Amount too large");
 True return;
 True }
 True // 处理订单逻辑
 True}
 True```

 False### 1.2 `switch` 结构
 False
 False#### 1.2.1 传统 `switch` 语句
 False
 False- 必须使用 `break` 防止穿透
 False- 可以使用 `default` 处理默认情况
 False
```java
 Trueswitch (day) {
 True case 1:
 True System.out.println("Monday");
 True break;
 True case 2:
 True System.out.println("Tuesday");
 True break;
 True case 3:
 True case 4:
 True case 5:
 True System.out.println("Weekday");
 True break;
 True case 6:
 True case 7:
 True System.out.println("Weekend");
 True break;
 True default:
 True System.out.println("Invalid day");
 True}
 True```

 False#### 1.2.2 Java 12+ `switch` 表达式
 False
 False- 使用 `->` 箭头语法，无需 `break`
 False- 可以直接返回值
 False- 支持 `yield` 关键字返回复杂表达式
 False
```java
 True// 基本用法
 TrueString dayName = switch (day) {
 True case 1 -> "Monday";
 True case 2 -> "Tuesday";
 True case 3, 4, 5 -> "Weekday";
 True case 6, 7 -> "Weekend";
 True default -> "Invalid day";
 True};
 True
 True// 使用 yield 返回复杂表达式
 Trueint result = switch (operation) {
 True case "add" -> {
 True yield a + b;
 True }
 True case "subtract" -> {
 True yield a - b;
 True }
 True default -> {
 True System.out.println("Invalid operation");
 True yield 0;
 True }
 True};
 True```

 False#### 1.2.3 Java 17+ `switch` 模式匹配
 False
```java
 True// 模式匹配示例
 TrueObject obj = "Hello";
 TrueString result = switch (obj) {
 True case Integer i -> "Integer: " + i;
 True case String s -> "String: " + s;
 True case null -> "null";
 True default -> "Other";
 True};
 True```

 False## 2. 循环结构 (Iteration)
 False
 False### 2.1 `for` 循环
 False
 False#### 2.1.1 标准 `for` 循环
 False
```java
 Truefor (int i = 0; i < 10; i++) {
 True System.out.println(i);
 True}
 True```

 False#### 2.1.2 增强型 `for` 循环 (for-each)
 False
 False用于遍历数组、集合等可迭代对象：
 False
```java
 True// 遍历数组
 Trueint[] numbers = {1, 2, 3, 4, 5};
 Truefor (int number : numbers) {
 True System.out.println(number);
 True}
 True
 True// 遍历集合
 TrueList<String> names = List.of("Alice", "Bob", "Charlie");
 Truefor (String name : names) {
 True System.out.println(name);
 True}
 True```

 False#### 2.1.3 带标签的 `for` 循环
 False
```java
 Trueouter: for (int i = 0; i < 3; i++) {
 True inner: for (int j = 0; j < 3; j++) {
 True if (j == 1) {
 True continue outer; // 跳过外层循环的当前迭代
 True }
 True System.out.println(i + ", " + j);
 True }
 True}
 True```

 False### 2.2 `while` 循环
 False
 False- 先判断条件，后执行循环体
 False- 适用于循环次数不确定的场景
 False
```java
 Trueint i = 0;
 Truewhile (i < 10) {
 True System.out.println(i);
 True i++;
 True}
 True```

 False### 2.3 `do-while` 循环
 False
 False- 先执行循环体，后判断条件
 False- 保证循环体至少执行一次
 False
```java
 Trueint i = 0;
 Truedo {
 True System.out.println(i);
 True i++;
 True} while (i < 10);
 True```

 False### 2.4 循环控制
 False
 False#### 2.4.1 `break` 语句
 False
 False- 跳出当前循环
 False- 配合标签使用可以跳出多层循环
 False
```java
 Truefor (int i = 0; i < 10; i++) {
 True if (i == 5) {
 True break; // 跳出循环
 True }
 True System.out.println(i);
 True}
 True```

 False#### 2.4.2 `continue` 语句
 False
 False- 跳过当前迭代，进入下一次循环
 False- 配合标签使用可以跳过外层循环的当前迭代
 False
```java
 Truefor (int i = 0; i < 10; i++) {
 True if (i % 2 == 0) {
 True continue; // 跳过偶数
 True }
 True System.out.println(i);
 True}
 True```

 False## 3. 跳转语句 (Jumps)
 False
 False### 3.1 `return` 语句
 False
 False- 结束当前方法的执行
 False- 可以返回一个值（对于非 void 方法）
 False
```java
 Truepublic int add(int a, int b) {
 True return a + b; // 返回计算结果
 True}
 True
 Truepublic void validate(int value) {
 True if (value < 0) {
 True return; // 提前结束方法
 True }
 True // 继续执行
 True}
 True```

 False### 3.2 标签 (Labels)
 False
 False- 用于标识代码块
 False- 配合 `break` 和 `continue` 使用可以控制多层循环
 False
```java
 TrueouterLoop: for (int i = 0; i < 5; i++) {
 True for (int j = 0; j < 5; j++) {
 True if (i * j > 6) {
 True System.out.println("Breaking outer loop");
 True break outerLoop;
 True }
 True System.out.println(i + ", " + j);
 True }
 True}
 True```

 False## 4. 实际应用案例
 False
 False### 4.1 菜单选择
 False
```java
 TrueScanner scanner = new Scanner(System.in);
 TrueSystem.out.println("1. Add");
 TrueSystem.out.println("2. Subtract");
 TrueSystem.out.println("3. Exit");
 TrueSystem.out.print("Enter your choice: ");
 Trueint choice = scanner.nextInt();
 True
 Trueswitch (choice) {
 True case 1 -> System.out.println("Add operation");
 True case 2 -> System.out.println("Subtract operation");
 True case 3 -> System.out.println("Exiting");
 True default -> System.out.println("Invalid choice");
 True}
 True```

 False### 4.2 查找元素
 False
```java
 Trueint[] numbers = {10, 20, 30, 40, 50};
 Trueint target = 30;
 Trueb boolean found = false;
 True
 Truefor (int number : numbers) {
 True if (number == target) {
 True found = true;
 True break;
 True }
 True}
 True
 TrueSystem.out.println(found ? "Found" : "Not found");
 True```

 False### 4.3 计算阶乘
 False
```java
 Truepublic int factorial(int n) {
 True int result = 1;
 True for (int i = 1; i <= n; i++) {
 True result *= i;
 True }
 True return result;
 True}
 True```

 False## 5. 最佳实践 (Best Practices)
 False
 False### 5.1 条件分支最佳实践
 False
 False1. **避免深层嵌套**：`if-else` 嵌套不要超过 3 层
 False2. **使用卫语句**：对于简单的条件检查，使用卫语句提前返回
 False3. **使用 `switch` 替代多个 `if-else`**：当条件是离散值时，使用 `switch` 更清晰
 False4. **使用枚举**：对于固定的选项集合，使用枚举类型
 False
 False### 5.2 循环最佳实践
 False
 False1. **选择合适的循环类型**：
 False - 已知循环次数：使用 `for` 循环
 False - 未知循环次数：使用 `while` 循环
 False - 至少执行一次：使用 `do-while` 循环
 False - 遍历集合：使用增强型 `for` 循环
 False
 False2. **避免无限循环**：确保循环条件最终会变为 false
 False3. **注意循环变量**：避免在循环体内修改循环变量
 False4. **使用 `break` 和 `continue` 提高效率**：及时跳出或跳过不需要的迭代
 False
 False### 5.3 性能考虑
 False
 False1. **循环不变量外提**：将循环内不变的计算移到循环外
 False2. **避免在循环中创建对象**：尽量在循环外创建对象
 False3. **使用 `StringBuilder` 处理字符串拼接**：在循环中拼接字符串时使用 `StringBuilder`
 False
 False## 6. 常见陷阱
 False
 False1. **`switch` 语句的穿透效应**：传统 `switch` 语句如果没有 `break` 会导致穿透
 False2. **浮点数比较**：避免在条件中直接比较浮点数
 False3. **空指针异常**：在条件判断前检查对象是否为 null
 False4. **死循环**：确保循环条件最终会变为 false
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化控制流，引入 Java 12+ Switch 新特性。
 False- 2026-05-03: 扩展内容，添加实际应用案例、最佳实践和常见陷阱。
 False