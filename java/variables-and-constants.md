# 变量与常量 (Variables & Constants)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 变量定义、生命周期、作用域、存储类及常量。 | Definitions, lifecycle, scope of variables, and constants.
 False
 False---
 False
 False## 目录
 False
 False1. [变量的概念与分类](#变量的概念与分类)
 False2. [变量的定义与初始化](#变量的定义与初始化)
 False3. [变量的作用域与生命周期](#变量的作用域与生命周期)
 False4. [常量](#常量)
 False5. [var 类型推断](#var-类型推断)
 False6. [变量与常量的最佳实践](#变量与常量的最佳实践)
 False7. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 变量的概念与分类
 False
 False### 1.1 变量的概念
 False
 False变量是内存中存储数据的容器，其值可以在程序运行期间改变。变量具有以下特性：
 False
 False- **类型**：每个变量都有一个类型，决定了变量可以存储的数据种类和范围。
 False- **名称**：变量的标识符，用于在程序中引用变量。
 False- **值**：变量存储的具体数据。
 False- **作用域**：变量可被访问的代码范围。
 False- **生命周期**：变量从创建到销毁的时间段。
 False
 False### 1.2 变量的分类
 False
 False根据变量的定义位置和作用域，Java 中的变量可以分为以下几类：
 False
 False| 类型 | 定义位置 | 作用域 | 生命周期 | 默认值 |
 False|------|----------|--------|----------|--------|
 False| **局部变量** | 方法、构造器或代码块内部 | 从定义处到所在块结束 | 从定义处到所在块结束 | 无默认值，必须初始化 |
 False| **成员变量** | 类中，方法之外 | 整个类 | 随对象的创建而存在，随对象的销毁而消失 | 有默认值 |
 False| **静态变量** | 类中，使用 static 修饰 | 整个类 | 随类的加载而存在，随类的卸载而消失 | 有默认值 |
 False
 False## 2. 变量的定义与初始化
 False
 False### 2.1 变量的声明
 False
 False**语法**：`类型 变量名;`
 False
 False**示例**：
 False
```java
 Trueint age; // 声明一个整型变量
 Truedouble salary; // 声明一个双精度浮点型变量
 TrueString name; // 声明一个字符串变量
 Trueboolean isActive; // 声明一个布尔型变量
 True```

 False### 2.2 变量的赋值
 False
 False**语法**：`变量名 = 值;`
 False
 False**示例**：
 False
```java
 Trueage = 18; // 给整型变量赋值
 Truesalary = 5000.50; // 给双精度浮点型变量赋值
 Truename = "John"; // 给字符串变量赋值
 TrueisActive = true; // 给布尔型变量赋值
 True```

 False### 2.3 变量的声明与初始化
 False
 False**语法**：`类型 变量名 = 值;`
 False
 False**示例**：
 False
```java
 Trueint age = 18; // 声明并初始化整型变量
 Truedouble salary = 5000.50; // 声明并初始化双精度浮点型变量
 TrueString name = "John"; // 声明并初始化字符串变量
 Trueboolean isActive = true; // 声明并初始化布尔型变量
 True```

 False### 2.4 多个变量的声明与初始化
 False
 False**语法**：`类型 变量名1, 变量名2 = 值, 变量名3;`
 False
 False**示例**：
 False
```java
 True// 声明多个相同类型的变量
 Trueint x, y = 5, z; // x 和 z 未初始化，y 初始化为 5
 True
 True// 建议：为了代码可读性，最好每行只声明一个变量
 Trueint a;
 Trueint b = 10;
 Trueint c;
 True```

 False## 3. 变量的作用域与生命周期
 False
 False### 3.1 局部变量
 False
 False**定义**：在方法、构造器或代码块内部定义的变量。
 False
 False**特点**：
 False
 False- **作用域**：从定义处开始，到所在代码块结束。
 False- **生命周期**：从定义处开始创建，到所在代码块结束时销毁。
 False- **默认值**：没有默认值，必须显式初始化后才能使用。
 False- **存储位置**：存储在栈内存中。
 False
 False**示例**：
 False
```java
 Truepublic void method() {
 True int localVariable = 10; // 局部变量
 True 
 True if (localVariable > 5) {
 True int ifVariable = 20; // 局部变量，作用域在 if 块内
 True System.out.println(ifVariable); // 可以访问
 True }
 True 
 True // System.out.println(ifVariable); // 错误：ifVariable 超出作用域
 True System.out.println(localVariable); // 可以访问
 True}
 True```

 False### 3.2 成员变量
 False
 False**定义**：在类中定义，方法之外的变量，也称为实例变量。
 False
 False**特点**：
 False
 False- **作用域**：整个类。
 False- **生命周期**：随对象的创建而存在，随对象的销毁而消失。
 False- **默认值**：有默认值，根据类型不同而不同。
 False- **存储位置**：存储在堆内存中。
 False
 False**默认值表**：
 False
 False| 类型 | 默认值 |
 False|------|--------|
 False| `byte`, `short`, `int`, `long` | 0 |
 False| `float`, `double` | 0.0 |
 False| `char` | '\u0000' |
 False| `boolean` | false |
 False| 引用类型 | null |
 False
 False**示例**：
 False
```java
 Truepublic class Person {
 True // 成员变量
 True String name; // 默认值为 null
 True int age; // 默认值为 0
 True boolean isAdult; // 默认值为 false
 True 
 True public void display() {
 True System.out.println("Name: " + name);
 True System.out.println("Age: " + age);
 True System.out.println("Is Adult: " + isAdult);
 True }
 True}
 True
 True// 使用
 TruePerson person = new Person();
 Trueperson.display(); // 输出默认值
 True
 Trueperson.name = "John";
 Trueperson.age = 30;
 Trueperson.isAdult = true;
 Trueperson.display(); // 输出赋值后的值
 True```

 False### 3.3 静态变量
 False
 False**定义**：在类中定义，使用 `static` 关键字修饰的变量，也称为类变量。
 False
 False**特点**：
 False
 False- **作用域**：整个类。
 False- **生命周期**：随类的加载而存在，随类的卸载而消失。
 False- **默认值**：有默认值，与成员变量相同。
 False- **存储位置**：存储在方法区的静态存储区。
 False- **共享性**：所有对象共享同一个静态变量。
 False
 False**示例**：
 False
```java
 Truepublic class Counter {
 True // 静态变量
 True public static int count = 0;
 True 
 True // 构造方法
 True public Counter() {
 True count++; // 每次创建对象时，count 加 1
 True }
 True 
 True public static void main(String[] args) {
 True Counter c1 = new Counter();
 True System.out.println("Count: " + Counter.count); // 输出 1
 True 
 True Counter c2 = new Counter();
 True System.out.println("Count: " + Counter.count); // 输出 2
 True 
 True Counter c3 = new Counter();
 True System.out.println("Count: " + Counter.count); // 输出 3
 True }
 True}
 True```

 False## 4. 常量
 False
 False### 4.1 常量的概念
 False
 False常量是指在程序运行期间其值不可更改的量。常量可以提高代码的可读性和可维护性。
 False
 False### 4.2 字面常量
 False
 False字面常量是直接在代码中出现的常量值，包括以下类型：
 False
 False| 类型 | 示例 | 说明 |
 False|------|------|------|
 False| **整数常量** | `100`, `123L`, `0xFF` | 十进制、长整型、十六进制 |
 False| **浮点常量** | `3.14`, `3.14F`, `2.5e3` | 双精度、单精度、科学计数法 |
 False| **字符常量** | `'A'`, `'\n'`, `'\u0041'` | 普通字符、转义字符、Unicode 字符 |
 False| **字符串常量** | `"Hello"`, `"Java 17"` | 字符串 |
 False| **布尔常量** | `true`, `false` | 布尔值 |
 False| **空常量** | `null` | 空引用 |
 False
 False### 4.3 final 常量
 False
 False使用 `final` 关键字修饰的变量，一旦赋值，其值不可更改。
 False
 False**特点**：
 False
 False- **不可修改**：一旦赋值，就不能再修改。
 False- **命名规范**：全大写，单词之间用下划线分隔。
 False- **初始化**：必须在声明时或构造方法中初始化。
 False
 False**示例**：
 False
```java
 True// 类级别的 final 常量
 Truepublic static final double PI = 3.1415926535;
 Truepublic static final int MAX_SIZE = 100;
 True
 True// 实例级别的 final 常量
 Truepublic final int ID;
 True
 True// 构造方法中初始化
 Truepublic class Student {
 True public final int ID;
 True public final String NAME;
 True 
 True public Student(int id, String name) {
 True this.ID = id;
 True this.NAME = name;
 True }
 True}
 True
 True// 局部 final 常量
 Truepublic void method() {
 True final int LOCAL_CONSTANT = 100;
 True // LOCAL_CONSTANT = 200; // 错误：final 变量不能修改
 True}
 True```

 False### 4.4 枚举常量
 False
 False枚举是一种特殊的类，用于定义一组常量。
 False
 False**示例**：
 False
```java
 Truepublic enum Day {
 True MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
 True}
 True
 True// 使用
 TrueDay today = Day.MONDAY;
 TrueSystem.out.println("Today is " + today);
 True```

 False## 5. var 类型推断
 False
 False### 5.1 var 的概念
 False
 FalseJava 10 引入了 `var` 关键字，用于局部变量的类型推断。编译器会根据变量的初始值自动推断变量的类型。
 False
 False### 5.2 var 的使用
 False
 False**语法**：`var 变量名 = 值;`
 False
 False**特点**：
 False
 False- **仅限局部变量**：只能在方法、构造器或代码块内部使用。
 False- **必须初始化**：声明时必须初始化，否则编译器无法推断类型。
 False- **不可修改类型**：一旦推断出类型，就不能再更改。
 False- **可读性**：应在类型明确的情况下使用，避免降低代码可读性。
 False
 False**示例**：
 False
```java
 True// 基本类型
 Truevar count = 10; // 推断为 int
 Truevar price = 3.14; // 推断为 double
 Truevar flag = true; // 推断为 boolean
 Truevar ch = 'A'; // 推断为 char
 True
 True// 引用类型
 Truevar name = "Java"; // 推断为 String
 Truevar list = new ArrayList<String>(); // 推断为 ArrayList<String>
 Truevar map = new HashMap<String, Integer>(); // 推断为 HashMap<String, Integer>
 True
 True// 数组
 Truevar numbers = new int[]{1, 2, 3, 4, 5}; // 推断为 int[]
 True
 True// 方法返回值
 Truevar result = calculate(); // 推断为方法返回值的类型
 True```

 False### 5.3 var 的注意事项
 False
 False1. **不能用于成员变量**：`var` 只能用于局部变量，不能用于成员变量。
 False2. **不能用于方法参数**：`var` 不能用于方法参数。
 False3. **不能用于返回类型**：`var` 不能用于方法的返回类型。
 False4. **不能用于数组声明**：`var[] arr = {1, 2, 3};` 是错误的，应该使用 `var arr = new int[]{1, 2, 3};`。
 False5. **类型推断的局限性**：对于复杂的表达式，类型推断可能不够明确，影响代码可读性。
 False
 False**示例**：
 False
```java
 True// 错误用法
 True// public var name = "John"; // 不能用于成员变量
 True
 True// 错误用法
 True// public void method(var param) { ... } // 不能用于方法参数
 True
 True// 错误用法
 True// public var method() { return 10; } // 不能用于返回类型
 True
 True// 错误用法
 True// var[] arr = {1, 2, 3}; // 不能这样声明数组
 True
 True// 正确用法
 Truevar arr = new int[]{1, 2, 3}; // 正确的数组声明方式
 True```

 False## 6. 变量与常量的最佳实践
 False
 False### 6.1 变量的命名规范
 False
 False- **局部变量**：使用小驼峰命名法，如 `userName`、`ageCount`。
 False- **成员变量**：使用小驼峰命名法，如 `name`、`salary`。
 False- **静态变量**：使用大驼峰命名法或全大写加下划线，如 `MAX_VALUE`、`DEFAULT_TIMEOUT`。
 False- **命名原则**：
 False - 变量名应具有描述性，能够清晰表达变量的用途。
 False - 避免使用单个字母作为变量名（除了循环变量）。
 False - 避免使用缩写，除非是广为人知的缩写。
 False - 保持命名风格的一致性。
 False
 False### 6.2 常量的命名规范
 False
 False- **final 常量**：使用全大写，单词之间用下划线分隔，如 `PI`、`MAX_SIZE`。
 False- **枚举常量**：使用全大写，单词之间用下划线分隔，如 `MONDAY`、`SUNDAY`。
 False- **命名原则**：
 False - 常量名应具有描述性，能够清晰表达常量的用途。
 False - 避免使用魔法数字，应将常量定义为具名常量。
 False - 保持命名风格的一致性。
 False
 False### 6.3 变量的使用建议
 False
 False1. **最小作用域原则**：变量的作用域应尽可能小，只在需要的地方定义。
 False2. **初始化**：局部变量必须初始化后才能使用。
 False3. **避免使用 null**：尽量避免将变量初始化为 `null`，可以使用空对象或默认值。
 False4. **合理使用 var**：在类型明确的情况下使用 `var`，提高代码简洁性。
 False5. **避免变量遮蔽**：避免在内部作用域中定义与外部作用域同名的变量。
 False
 False### 6.4 常量的使用建议
 False
 False1. **使用 final**：对于不需要修改的值，应使用 `final` 修饰。
 False2. **集中管理**：将相关的常量集中定义在一个类中，便于管理和维护。
 False3. **使用枚举**：对于一组相关的常量，应使用枚举类型。
 False4. **避免硬编码**：避免在代码中直接使用字面常量，应定义为具名常量。
 False
 False## 7. 实际应用示例
 False
 False### 7.1 示例 1：学生信息管理
 False
```java
 Truepublic class Student {
 True // 成员变量
 True private String name;
 True private int age;
 True private double score;
 True 
 True // 构造方法
 True public Student(String name, int age, double score) {
 True this.name = name;
 True this.age = age;
 True this.score = score;
 True }
 True 
 True // 方法
 True public void display() {
 True System.out.println("Name: " + name);
 True System.out.println("Age: " + age);
 True System.out.println("Score: " + score);
 True }
 True 
 True public static void main(String[] args) {
 True // 创建学生对象
 True Student student1 = new Student("John", 18, 95.5);
 True Student student2 = new Student("Jane", 17, 92.0);
 True 
 True // 显示学生信息
 True System.out.println("Student 1:");
 True student1.display();
 True 
 True System.out.println("\nStudent 2:");
 True student2.display();
 True }
 True}
 True```

 False### 7.2 示例 2：使用常量和枚举
 False
```java
 Truepublic class ConstantsDemo {
 True // 常量定义
 True public static final double PI = 3.1415926535;
 True public static final int MAX_STUDENTS = 50;
 True public static final String SCHOOL_NAME = "ABC School";
 True 
 True // 枚举定义
 True public enum Grade {
 True A, B, C, D, F
 True }
 True 
 True public static void main(String[] args) {
 True // 使用常量
 True System.out.println("PI: " + PI);
 True System.out.println("Max Students: " + MAX_STUDENTS);
 True System.out.println("School Name: " + SCHOOL_NAME);
 True 
 True // 使用枚举
 True Grade studentGrade = Grade.A;
 True System.out.println("Student Grade: " + studentGrade);
 True 
 True // 计算圆的面积
 True double radius = 5.0;
 True double area = PI * radius * radius;
 True System.out.println("Circle Area: " + area);
 True }
 True}
 True```

 False### 7.3 示例 3：使用 var 类型推断
 False
```java
 Trueimport java.util.ArrayList;
 Trueimport java.util.HashMap;
 True
 Truepublic class VarDemo {
 True public static void main(String[] args) {
 True // 基本类型
 True var count = 10;
 True var price = 3.14;
 True var flag = true;
 True var name = "Java";
 True 
 True System.out.println("Count: " + count);
 True System.out.println("Price: " + price);
 True System.out.println("Flag: " + flag);
 True System.out.println("Name: " + name);
 True 
 True // 引用类型
 True var list = new ArrayList<String>();
 True list.add("Apple");
 True list.add("Banana");
 True list.add("Orange");
 True 
 True System.out.println("\nFruits:");
 True for (var fruit : list) {
 True System.out.println(fruit);
 True }
 True 
 True // 映射
 True var map = new HashMap<String, Integer>();
 True map.put("John", 25);
 True map.put("Jane", 30);
 True map.put("Bob", 35);
 True 
 True System.out.println("\nAges:");
 True for (var entry : map.entrySet()) {
 True System.out.println(entry.getKey() + ": " + entry.getValue());
 True }
 True }
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分变量作用域与常量详解。
 False- 2026-04-05: 扩写内容，增加详细的变量概念与分类、变量的定义与初始化、作用域与生命周期、常量的使用、var类型推断的使用，以及最佳实践和实际应用示例。
 False