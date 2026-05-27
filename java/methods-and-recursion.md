# 方法详解 (Methods In-depth)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 方法定义、参数传递、重载、递归及可变参数。 | Method definitions, parameter passing, overloading, recursion, and variadic arguments.
 False
 False---
 False
 False## 目录
 False
 False1. [方法基本语法](#方法基本语法)
 False2. [参数传递](#参数传递)
 False3. [方法重载](#方法重载)
 False4. [递归](#递归)
 False5. [可变参数](#可变参数)
 False6. [方法的最佳实践](#方法的最佳实践)
 False7. [实际应用案例](#实际应用案例)
 False8. [常见陷阱](#常见陷阱)
 False
 False---
 False
 False## 1. 方法基本语法 (Basic Syntax)
 False
 False方法是执行特定任务的命名代码块，是Java中代码组织和复用的基本单位。
 False
 False### 1.1 方法定义
 False
```java
 True/*
 True * 修饰符 返回值类型 方法名(参数列表) {
 True * // 方法体
 True * return 返回值;
 True * }
 True */
 Truepublic int add(int a, int b) {
 True return a + b;
 True}
 True```

 False### 1.2 方法修饰符
 False
 False| 修饰符 | 说明 | 适用范围 |
 False|--------|------|----------|
 False| `public` | 公共访问，任何类都可以访问 | 类、方法、变量 |
 False| `protected` | 受保护访问，同一包内或子类可以访问 | 方法、变量 |
 False| `private` | 私有访问，只有本类可以访问 | 方法、变量 |
 False| `default` | 默认访问，同一包内可以访问 | 类、方法、变量 |
 False| `static` | 静态方法，属于类而不是实例 | 方法、变量 |
 False| `final` | 最终方法，不能被重写 | 方法 |
 False| `abstract` | 抽象方法，没有实现体 | 方法 |
 False| `synchronized` | 同步方法，线程安全 | 方法 |
 False
 False### 1.3 方法调用
 False
 False- **非静态方法**: 必须通过对象实例调用
 False
 ```java
 True MyClass obj = new MyClass();
 True int result = obj.add(1, 2);
 True ```

 False- **静态方法**: 通过类名直接调用
 False
 ```java
 True int result = Math.abs(-10);
 True ```

 False### 1.4 方法返回值
 False
 False- **有返回值**: 必须使用 `return` 语句返回对应类型的值
 False- **无返回值**: 使用 `void` 作为返回类型，可选使用 `return;` 提前结束方法
 False
 False## 2. 参数传递 (Parameter Passing)
 False
 FalseJava 中**只有值传递 (Pass by Value)**，但对于不同类型的参数，表现有所不同。
 False
 False### 2.1 基本类型参数
 False
 False- 传递值的副本
 False- 修改形参不影响实参
 False
```java
 Truepublic void modify(int x) {
 True x = 10; // 只修改局部变量
 True}
 True
 Trueint a = 5;
 Truemodify(a);
 TrueSystem.out.println(a); // 输出 5，实参不变
 True```

 False### 2.2 引用类型参数
 False
 False- 传递引用地址的副本
 False- 修改形参指向的对象属性**会影响**原对象
 False- 修改形参本身指向新对象**不会影响**原引用
 False
```java
 Truepublic void modifyArray(int[] arr) {
 True arr[0] = 100; // 修改数组元素，会影响原数组
 True arr = new int[5]; // 重新赋值，不会影响原引用
 True}
 True
 Trueint[] array = {1, 2, 3};
 TruemodifyArray(array);
 TrueSystem.out.println(array[0]); // 输出 100
 True```

 False### 2.3 方法参数类型
 False
 False- **基本类型**: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`
 False- **引用类型**: 类、接口、数组
 False- **包装类型**: `Integer`, `Double` 等
 False- **枚举类型**: `enum`
 False- **注解类型**: `@interface`
 False
 False## 3. 方法重载 (Overloading)
 False
 False在同一个类中，方法名相同，但**参数列表不同**的方法。
 False
 False### 3.1 重载规则
 False
 False1. **参数列表必须不同**: 个数、类型或顺序不同
 False2. **返回值类型可以不同**: 但不能作为重载的唯一依据
 False3. **修饰符可以不同**: 但不能作为重载的唯一依据
 False4. **异常类型可以不同**: 但不能作为重载的唯一依据
 False
 False### 3.2 重载示例
 False
```java
 True// 基本类型重载
 Truepublic int add(int a, int b) { return a + b; }
 Truepublic double add(double a, double b) { return a + b; }
 Truepublic int add(int a, int b, int c) { return a + b + c; }
 True
 True// 引用类型重载
 Truepublic void print(String s) { System.out.println(s); }
 Truepublic void print(int[] arr) {
 True for (int i : arr) System.out.print(i + " ");
 True System.out.println();
 True}
 True
 True// 参数顺序不同
 Truepublic void method(int a, String b) {}
 Truepublic void method(String a, int b) {}
 True```

 False### 3.3 重载的解析
 False
 FalseJava 编译器会根据实参的类型和数量选择最匹配的方法：
 False
 False1. 精确匹配
 False2. 基本类型自动转换
 False3. 向上转型
 False4. 可变参数
 False
 False## 4. 递归 (Recursion)
 False
 False方法调用自身的过程，是一种解决问题的有效方法。
 False
 False### 4.1 递归的基本结构
 False
```java
 Truepublic returnType recursiveMethod(parameters) {
 True // 基准情况 (Base Case)
 True if (baseCondition) {
 True return baseValue;
 True }
 True 
 True // 递归步 (Recursive Step)
 True return recursiveMethod(modifiedParameters);
 True}
 True```

 False### 4.2 递归示例
 False
 False#### 4.2.1 阶乘计算
 False
```java
 Truepublic int factorial(int n) {
 True if (n <= 1) return 1; // 基准情况
 True return n * factorial(n - 1); // 递归步
 True}
 True```

 False#### 4.2.2 斐波那契数列
 False
```java
 Truepublic int fibonacci(int n) {
 True if (n <= 1) return n; // 基准情况
 True return fibonacci(n - 1) + fibonacci(n - 2); // 递归步
 True}
 True```

 False#### 4.2.3 二分查找
 False
```java
 Truepublic int binarySearch(int[] arr, int target, int low, int high) {
 True if (low > high) return -1; // 基准情况：未找到
 True int mid = (low + high) / 2;
 True if (arr[mid] == target) return mid; // 基准情况：找到
 True if (arr[mid] > target) {
 True return binarySearch(arr, target, low, mid - 1); // 递归步：左半部分
 True } else {
 True return binarySearch(arr, target, mid + 1, high); // 递归步：右半部分
 True }
 True}
 True```

 False### 4.3 递归的优缺点
 False
 False#### 优点
 False
 False- **代码简洁**: 递归代码通常比迭代代码更简洁易读
 False- **问题分解**: 将复杂问题分解为相同的子问题
 False- **适用于树形结构**: 如文件系统、DOM 树等
 False
 False#### 缺点
 False
 False- **栈溢出风险**: 递归深度过大可能导致 StackOverflowError
 False- **性能开销**: 每次递归调用都会创建新的栈帧
 False- **内存消耗**: 递归调用会占用更多内存
 False
 False### 4.4 递归的优化
 False
 False- **尾递归**: 递归调用是方法的最后一个操作，某些语言会优化为迭代
 False- **记忆化**: 缓存中间结果，避免重复计算
 False- **递归转迭代**: 对于深度较大的问题，考虑使用迭代
 False
 False## 5. 可变参数 (Variadic Arguments)
 False
 FalseJava 5 引入的特性，允许方法接受任意数量的参数。
 False
 False### 5.1 基本语法
 False
```java
 Truepublic returnType methodName(ParameterType... parameterName) {
 True // 方法体
 True}
 True```

 False### 5.2 可变参数规则
 False
 False- **必须是最后一个参数**
 False- **每个方法只能有一个可变参数**
 False- **本质是数组**: 在方法内部，可变参数被当作数组处理
 False
 False### 5.3 可变参数示例
 False
```java
 True// 计算任意数量整数的和
 Truepublic int sum(int... numbers) {
 True int total = 0;
 True for (int num : numbers) {
 True total += num;
 True }
 True return total;
 True}
 True
 True// 打印任意数量的字符串
 Truepublic void printAll(String... messages) {
 True for (String msg : messages) {
 True System.out.println(msg);
 True }
 True}
 True```

 False### 5.4 可变参数与数组
 False
 False- 可以直接传递数组给可变参数
 False- 可变参数方法可以与数组参数方法重载
 False
```java
 Truepublic void process(int[] arr) {}
 Truepublic void process(int... nums) {}
 True
 True// 调用
 Trueint[] array = {1, 2, 3};
 Trueprocess(array); // 调用数组参数方法
 Trueprocess(1, 2, 3); // 调用可变参数方法
 True```

 False## 6. 方法的最佳实践
 False
 False### 6.1 命名规范
 False
 False- 方法名使用动词或动词短语
 False- 驼峰命名法（首字母小写，后续单词首字母大写）
 False- 方法名应清晰描述方法的功能
 False
 False### 6.2 代码风格
 False
 False- 方法体不宜过长，通常不超过 30-50 行
 False- 一个方法只做一件事
 False- 使用有意义的参数名和局部变量名
 False
 False### 6.3 异常处理
 False
 False- 对于可能的异常，要么捕获处理，要么在方法签名中声明
 False- 避免在方法中捕获所有异常而不做处理
 False
 False### 6.4 性能考虑
 False
 False- 避免在热点方法中创建不必要的对象
 False- 对于频繁调用的方法，考虑使用静态方法
 False- 对于大计算量的方法，考虑缓存结果
 False
 False## 7. 实际应用案例
 False
 False### 7.1 工具方法
 False
```java
 Truepublic class StringUtils {
 True // 检查字符串是否为空
 True public static boolean isEmpty(String str) {
 True return str == null || str.trim().isEmpty();
 True }
 True 
 True // 反转字符串
 True public static String reverse(String str) {
 True if (isEmpty(str)) return str;
 True StringBuilder sb = new StringBuilder(str);
 True return sb.reverse().toString();
 True }
 True}
 True```

 False### 7.2 数学计算
 False
```java
 Truepublic class MathUtils {
 True // 计算最大公约数
 True public static int gcd(int a, int b) {
 True if (b == 0) return a;
 True return gcd(b, a % b);
 True }
 True 
 True // 计算最小公倍数
 True public static int lcm(int a, int b) {
 True return a * b / gcd(a, b);
 True }
 True}
 True```

 False### 7.3 集合操作
 False
```java
 Truepublic class CollectionUtils {
 True // 检查集合是否为空
 True public static <T> boolean isEmpty(Collection<T> collection) {
 True return collection == null || collection.isEmpty();
 True }
 True 
 True // 安全地获取列表元素
 True public static <T> T getSafe(List<T> list, int index, T defaultValue) {
 True if (isEmpty(list) || index < 0 || index >= list.size()) {
 True return defaultValue;
 True }
 True return list.get(index);
 True }
 True}
 True```

 False## 8. 常见陷阱
 False
 False### 8.1 递归陷阱
 False
 False- **栈溢出**: 递归深度过大导致 StackOverflowError
 False- **无限递归**: 缺少基准情况或基准情况无法到达
 False- **重复计算**: 未使用记忆化导致性能问题
 False
 False### 8.2 方法重载陷阱
 False
 False- **模糊调用**: 多个重载方法都可能匹配，导致编译错误
 False- **自动装箱/拆箱**: 可能导致意外的重载选择
 False
 False### 8.3 参数传递陷阱
 False
 False- **引用类型修改**: 误以为修改形参引用会影响实参
 False- **不可变对象**: 对不可变对象的修改不会生效
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化方法重载与递归细节。
 False- 2026-05-03: 扩展内容，添加方法修饰符、参数类型、递归优化和实际应用案例。
 False