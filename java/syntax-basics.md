# 程序结构与基本语法 (Program Structure & Basic Syntax)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: Java 程序的组成、注释规范、标识符命名及键盘录入。 | Components of Java programs, comments, naming conventions, and Scanner.
 False
 False---
 False
 False## 目录
 False
 False1. [Java 程序结构](#java-程序结构)
 False2. [注释规范](#注释规范)
 False3. [标识符](#标识符)
 False4. [关键字](#关键字)
 False5. [键盘录入](#键盘录入)
 False6. [代码风格与最佳实践](#代码风格与最佳实践)
 False7. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. Java 程序结构
 False
 False### 1.1 源文件结构
 False
 False一个典型的 Java 源文件包含以下部分：
 False
 False1. **包声明 (Package Declaration)**：指定源文件所属的包。
 False2. **导入语句 (Import Statements)**：导入需要使用的类。
 False3. **类定义 (Class Definition)**：定义一个或多个类。
 False4. **方法定义 (Method Definition)**：在类中定义方法，包括主方法。
 False5. **执行语句 (Statements)**：在方法中编写具体的代码逻辑。
 False
 False**示例**：
 False
```java
 True/*
 True * 包声明
 True */
 Truepackage com.example;
 True
 True/*
 True * 导入语句
 True */
 Trueimport java.util.Scanner;
 Trueimport java.util.Date;
 True
 True/*
 True * 类定义
 True */
 Truepublic class HelloWorld {
 True 
 True /*
 True * 主方法
 True * 程序的入口点
 True */
 True public static void main(String[] args) {
 True // 执行语句
 True System.out.println("Hello, Java!");
 True 
 True // 创建 Date 对象
 True Date now = new Date();
 True System.out.println("当前时间: " + now);
 True }
 True}
 True```

 False### 1.2 类的结构
 False
 False一个 Java 类通常包含以下部分：
 False
 False1. **修饰符 (Modifiers)**：如 `public`, `private`, `protected` 等。
 False2. **类名 (Class Name)**：遵循大驼峰命名法。
 False3. **继承关系 (Inheritance)**：使用 `extends` 关键字继承父类。
 False4. **实现接口 (Interface Implementation)**：使用 `implements` 关键字实现接口。
 False5. **成员变量 (Member Variables)**：类的属性。
 False6. **构造方法 (Constructor)**：用于创建对象。
 False7. **成员方法 (Member Methods)**：类的行为。
 False
 False**示例**：
 False
```java
 Truepackage com.example;
 True
 Truepublic class Student extends Person implements Serializable {
 True // 成员变量
 True private String studentId;
 True private String major;
 True 
 True // 构造方法
 True public Student() {
 True }
 True 
 True public Student(String name, int age, String studentId, String major) {
 True super(name, age);
 True this.studentId = studentId;
 True this.major = major;
 True }
 True 
 True // 成员方法
 True public String getStudentId() {
 True return studentId;
 True }
 True 
 True public void setStudentId(String studentId) {
 True this.studentId = studentId;
 True }
 True 
 True public String getMajor() {
 True return major;
 True }
 True 
 True public void setMajor(String major) {
 True this.major = major;
 True }
 True 
 True public void study() {
 True System.out.println(getName() + " is studying " + major);
 True }
 True}
 True```

 False### 1.3 主方法
 False
 False主方法是 Java 程序的入口点，具有以下特点：
 False
 False- 修饰符：`public static void`
 False- 方法名：`main`
 False- 参数：`String[] args`
 False
 False**示例**：
 False
```java
 Truepublic static void main(String[] args) {
 True // 程序从这里开始执行
 True System.out.println("Hello, World!");
 True 
 True // 处理命令行参数
 True for (int i = 0; i < args.length; i++) {
 True System.out.println("Argument " + i + ": " + args[i]);
 True }
 True}
 True```

 False## 2. 注释规范
 False
 False### 2.1 单行注释
 False
 False**语法**：`// 注释内容`
 False
 False**示例**：
 False
```java
 True// 这是一个单行注释
 Trueint age = 18; // 定义年龄变量
 True```

 False### 2.2 多行注释
 False
 False**语法**：`/* 注释内容 */`
 False
 False**示例**：
 False
```java
 True/*
 True * 这是一个多行注释
 True * 可以跨越多行
 True */
 Trueint sum = 0;
 Truefor (int i = 1; i <= 100; i++) {
 True sum += i; // 累加
 True}
 True```

 False### 2.3 文档注释
 False
 False**语法**：`/** 注释内容 */`
 False
 False**示例**：
 False
```java
 True/**
 True * 计算两个数的和
 True * @param a 第一个加数
 True * @param b 第二个加数
 True * @return 两个数的和
 True */
 Truepublic int add(int a, int b) {
 True return a + b;
 True}
 True```

 False**常用的 Javadoc 标签**：
 False
 False| 标签 | 描述 | 示例 |
 False|------|------|------|
 False| `@author` | 作者 | `@author John Doe` |
 False| `@param` | 参数说明 | `@param name 用户名` |
 False| `@return` | 返回值说明 | `@return 计算结果` |
 False| `@throws` | 异常说明 | `@throws IllegalArgumentException 参数错误时抛出` |
 False| `@version` | 版本 | `@version 1.0` |
 False| `@since` | 从哪个版本开始 | `@since 1.5` |
 False| `@see` | 参考其他类或方法 | `@see java.util.ArrayList` |
 False
 False## 3. 标识符
 False
 False### 3.1 标识符的规则
 False
 False标识符是用于命名类、方法、变量、常量等的名称，必须遵循以下规则：
 False
 False1. **组成字符**：字母 (A-Z, a-z)、数字 (0-9)、下划线 (_)、美元符号 ($)。
 False2. **开头字符**：不能以数字开头。
 False3. **关键字**：不能使用 Java 关键字作为标识符。
 False4. **大小写敏感**：Java 是大小写敏感的，因此 `myVar` 和 `MyVar` 是不同的标识符。
 False
 False### 3.2 命名规范
 False
 False#### 3.2.1 类名和接口名
 False
 False- **命名规则**：大驼峰命名法 (Upper Camel Case)
 False- **示例**：`HelloWorld`, `StudentInfo`, `UserService`
 False
 False#### 3.2.2 方法名和变量名
 False
 False- **命名规则**：小驼峰命名法 (Lower Camel Case)
 False- **示例**：`getUserName`, `ageCount`, `calculateTotal`
 False
 False#### 3.2.3 包名
 False
 False- **命名规则**：全小写，使用点 (.) 分隔
 False- **示例**：`com.example.util`, `org.apache.commons.io`
 False
 False#### 3.2.4 常量名
 False
 False- **命名规则**：全大写，使用下划线 (_) 分隔
 False- **示例**：`MAX_VALUE`, `DEFAULT_TIMEOUT`, `PI`
 False
 False#### 3.2.5 枚举常量
 False
 False- **命名规则**：全大写，使用下划线 (_) 分隔
 False- **示例**：`RED`, `GREEN`, `BLUE`
 False
 False### 3.3 命名最佳实践
 False
 False1. **含义明确**：标识符应该能够清晰地表达其用途。
 False2. **避免缩写**：除非是广为人知的缩写（如 `URL`, `HTTP`），否则应使用完整的单词。
 False3. **一致性**：在整个项目中保持命名风格的一致性。
 False4. **长度适中**：标识符应该足够长以表达其含义，但也不应过长。
 False
 False**示例**：
 False
```java
 True// 不好的命名
 Trueint a; // 含义不明确
 Trueint cnt; // 使用了缩写
 Trueint user_name; // 不符合小驼峰命名法
 True
 True// 好的命名
 Trueint age; // 含义明确
 Trueint count; // 使用完整单词
 Trueint userName; // 符合小驼峰命名法
 True```

 False## 4. 关键字
 False
 False### 4.1 常用关键字
 False
 FalseJava 有 50 多个关键字，以下是一些常用的关键字：
 False
 False| 关键字 | 描述 |
 False|--------|------|
 False| `public` | 公共访问修饰符 |
 False| `private` | 私有访问修饰符 |
 False| `protected` | 受保护的访问修饰符 |
 False| `class` | 定义类 |
 False| `interface` | 定义接口 |
 False| `extends` | 继承类 |
 False| `implements` | 实现接口 |
 False| `static` | 静态修饰符 |
 False| `final` | 最终修饰符 |
 False| `void` | 无返回值 |
 False| `return` | 返回值 |
 False| `if` | 条件语句 |
 False| `else` | 条件语句的分支 |
 False| `for` | 循环语句 |
 False| `while` | 循环语句 |
 False| `do` | 循环语句 |
 False| `switch` | 开关语句 |
 False| `case` | 开关语句的分支 |
 False| `default` | 开关语句的默认分支 |
 False| `break` | 跳出循环或开关语句 |
 False| `continue` | 跳过当前循环迭代 |
 False| `try` | 异常处理的开始 |
 False| `catch` | 捕获异常 |
 False| `finally` | 异常处理的最终块 |
 False| `throw` | 抛出异常 |
 False| `throws` | 声明方法可能抛出的异常 |
 False| `new` | 创建对象 |
 False| `this` | 当前对象的引用 |
 False| `super` | 父类的引用 |
 False| `package` | 包声明 |
 False| `import` | 导入类 |
 False
 False### 4.2 保留字和字面量
 False
 False除了关键字外，Java 还有一些保留字和字面量：
 False
 False- **保留字**：`true`, `false`, `null`
 False- **字面量**：
 False - 整数字面量：`123`, `0x1A`
 False - 浮点数字面量：`3.14`, `2.5e3`
 False - 布尔字面量：`true`, `false`
 False - 字符字面量：`'A'`, `'\n'`
 False - 字符串字面量：`"Hello"`
 False - null 字面量：`null`
 False
 False## 5. 键盘录入
 False
 False### 5.1 使用 Scanner 类
 False
 False`java.util.Scanner` 是 Java 中用于获取控制台输入的常用类。
 False
 False**基本用法**：
 False
```java
 Trueimport java.util.Scanner;
 True
 Truepublic class InputTest {
 True public static void main(String[] args) {
 True // 1. 创建 Scanner 对象
 True Scanner sc = new Scanner(System.in);
 True 
 True // 2. 获取不同类型的输入
 True System.out.print("请输入整数: ");
 True int num = sc.nextInt();
 True 
 True System.out.print("请输入浮点数: ");
 True double d = sc.nextDouble();
 True 
 True System.out.print("请输入布尔值: ");
 True boolean b = sc.nextBoolean();
 True 
 True // 注意：next() 会遇到空格停止
 True System.out.print("请输入字符串 (next()): ");
 True String str1 = sc.next();
 True 
 True // 读取换行符
 True sc.nextLine();
 True 
 True // nextLine() 会读取整行
 True System.out.print("请输入字符串 (nextLine()): ");
 True String str2 = sc.nextLine();
 True 
 True // 3. 输出结果
 True System.out.println("整数: " + num);
 True System.out.println("浮点数: " + d);
 True System.out.println("布尔值: " + b);
 True System.out.println("字符串 (next()): " + str1);
 True System.out.println("字符串 (nextLine()): " + str2);
 True 
 True // 4. 关闭 Scanner
 True sc.close();
 True }
 True}
 True```

 False### 5.2 Scanner 类的常用方法
 False
 False| 方法 | 描述 |
 False|------|------|
 False| `next()` | 读取一个单词（遇到空格停止） |
 False| `nextLine()` | 读取一整行 |
 False| `nextInt()` | 读取一个整数 |
 False| `nextDouble()` | 读取一个双精度浮点数 |
 False| `nextBoolean()` | 读取一个布尔值 |
 False| `nextByte()` | 读取一个字节 |
 False| `nextShort()` | 读取一个短整数 |
 False| `nextLong()` | 读取一个长整数 |
 False| `nextFloat()` | 读取一个单精度浮点数 |
 False| `hasNext()` | 检查是否还有输入 |
 False| `hasNextInt()` | 检查下一个输入是否是整数 |
 False
 False### 5.3 注意事项
 False
 False1. **输入缓冲区问题**：当使用 `nextInt()`, `nextDouble()` 等方法后，输入缓冲区中会留下换行符，此时使用 `nextLine()` 会读取到空字符串。解决方案是在使用 `nextLine()` 前先调用一次 `nextLine()` 来消耗换行符。
 False
 False2. **资源关闭**：使用完 Scanner 后，应该调用 `close()` 方法关闭资源，以避免资源泄漏。
 False
 False3. **异常处理**：当输入的数据类型与期望的类型不匹配时，会抛出 `InputMismatchException`，应该使用 try-catch 进行处理。
 False
 False**示例**：
 False
```java
 Trueimport java.util.InputMismatchException;
 Trueimport java.util.Scanner;
 True
 Truepublic class SafeInputTest {
 True public static void main(String[] args) {
 True Scanner sc = new Scanner(System.in);
 True 
 True int num = 0;
 True boolean valid = false;
 True 
 True while (!valid) {
 True System.out.print("请输入整数: ");
 True try {
 True num = sc.nextInt();
 True valid = true;
 True } catch (InputMismatchException e) {
 True System.out.println("输入错误，请重新输入整数!");
 True sc.next(); // 消耗错误的输入
 True }
 True }
 True 
 True System.out.println("输入的整数是: " + num);
 True sc.close();
 True }
 True}
 True```

 False## 6. 代码风格与最佳实践
 False
 False### 6.1 缩进与空格
 False
 False- **缩进**：使用 4 个空格进行缩进，不要使用制表符 (Tab)。
 False- **空格**：
 False - 在运算符两侧添加空格：`a = b + c;`
 False - 在逗号后添加空格：`method(a, b, c);`
 False - 在大括号前添加空格：`if (condition) {`
 False - 在小括号内侧不添加空格：`if(condition)` 应该写成 `if (condition)`
 False
 False### 6.2 代码块
 False
 False- **大括号**：使用 K&R 风格，即左大括号放在行尾，右大括号放在新行，与对应的控制语句对齐。
 False
 False**示例**：
 False
```java
 True// 好的风格
 Trueif (condition) {
 True // 代码块
 True} else {
 True // 代码块
 True}
 True
 True// 不好的风格
 Trueif (condition)
 True{
 True // 代码块
 True}
 Trueelse
 True{
 True // 代码块
 True}
 True```

 False### 6.3 行长度
 False
 False- **行长度**：每行代码的长度不应超过 80 个字符，超过时应换行。
 False- **换行**：在逗号后或运算符前换行，缩进 8 个空格。
 False
 False**示例**：
 False
```java
 True// 好的风格
 Trueint result = calculateValue(a, b, c, d)
 True + calculateValue(e, f, g, h)
 True - calculateValue(i, j, k, l);
 True
 True// 不好的风格
 Trueint result = calculateValue(a, b, c, d) + calculateValue(e, f, g, h) - calculateValue(i, j, k, l);
 True```

 False### 6.4 命名约定
 False
 False- **类名**：使用大驼峰命名法，每个单词的首字母大写。
 False- **方法名**：使用小驼峰命名法，第一个单词小写，后续单词首字母大写。
 False- **变量名**：使用小驼峰命名法，应具有描述性。
 False- **常量名**：使用全大写，单词之间用下划线分隔。
 False- **包名**：使用全小写，单词之间用点分隔。
 False
 False### 6.5 注释
 False
 False- **单行注释**：用于解释单行代码的功能。
 False- **多行注释**：用于解释代码块的功能。
 False- **文档注释**：用于生成 API 文档，应包含类、方法的功能、参数、返回值等信息。
 False
 False### 6.6 其他最佳实践
 False
 False1. **避免使用魔术数字**：将常量定义为具名常量。
 False2. **保持方法简洁**：每个方法应只做一件事，长度不应超过 50 行。
 False3. **使用有意义的变量名**：变量名应能够清晰地表达其用途。
 False4. **避免冗余代码**：不要重复编写相同的代码，应提取为方法。
 False5. **使用 try-with-resources**：对于需要关闭的资源，使用 try-with-resources 语句。
 False
 False**示例**：
 False
```java
 True// 不好的风格
 Truefor (int i = 0; i < 10; i++) {
 True // 代码
 True}
 True
 True// 好的风格
 Trueprivate static final int MAX_ITERATIONS = 10;
 True
 Truefor (int i = 0; i < MAX_ITERATIONS; i++) {
 True // 代码
 True}
 True
 True// 使用 try-with-resources
 Truetry (Scanner sc = new Scanner(System.in)) {
 True // 使用 sc
 True} // 自动关闭 sc
 True```

 False## 7. 实际应用示例
 False
 False### 7.1 示例 1：简单的计算器
 False
```java
 Trueimport java.util.Scanner;
 True
 Truepublic class Calculator {
 True public static void main(String[] args) {
 True Scanner sc = new Scanner(System.in);
 True 
 True System.out.print("请输入第一个数: ");
 True double num1 = sc.nextDouble();
 True 
 True System.out.print("请输入运算符 (+, -, *, /): ");
 True char operator = sc.next().charAt(0);
 True 
 True System.out.print("请输入第二个数: ");
 True double num2 = sc.nextDouble();
 True 
 True double result = 0;
 True boolean valid = true;
 True 
 True switch (operator) {
 True case '+':
 True result = num1 + num2;
 True break;
 True case '-':
 True result = num1 - num2;
 True break;
 True case '*':
 True result = num1 * num2;
 True break;
 True case '/':
 True if (num2 != 0) {
 True result = num1 / num2;
 True } else {
 True System.out.println("错误：除数不能为零!");
 True valid = false;
 True }
 True break;
 True default:
 True System.out.println("错误：无效的运算符!");
 True valid = false;
 True }
 True 
 True if (valid) {
 True System.out.println(num1 + " " + operator + " " + num2 + " = " + result);
 True }
 True 
 True sc.close();
 True }
 True}
 True```

 False### 7.2 示例 2：学生信息管理
 False
```java
 Trueimport java.util.Scanner;
 True
 Truepublic class StudentManager {
 True public static void main(String[] args) {
 True Scanner sc = new Scanner(System.in);
 True 
 True // 存储学生信息
 True String[] names = new String[5];
 True int[] ages = new int[5];
 True double[] scores = new double[5];
 True 
 True // 输入学生信息
 True for (int i = 0; i < names.length; i++) {
 True System.out.println("请输入第 " + (i + 1) + " 个学生的信息:");
 True 
 True System.out.print("姓名: ");
 True names[i] = sc.next();
 True 
 True System.out.print("年龄: ");
 True ages[i] = sc.nextInt();
 True 
 True System.out.print("成绩: ");
 True scores[i] = sc.nextDouble();
 True }
 True 
 True // 输出学生信息
 True System.out.println("\n学生信息列表:");
 True System.out.println("姓名\t年龄\t成绩");
 True System.out.println("------------------------");
 True 
 True for (int i = 0; i < names.length; i++) {
 True System.out.println(names[i] + "\t" + ages[i] + "\t" + scores[i]);
 True }
 True 
 True // 计算平均成绩
 True double sum = 0;
 True for (double score : scores) {
 True sum += score;
 True }
 True double average = sum / scores.length;
 True System.out.println("\n平均成绩: " + average);
 True 
 True sc.close();
 True }
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分并细化 Java 基础语法知识点。
 False- 2026-04-05: 扩写内容，增加详细的程序结构、注释规范、标识符命名、关键字和键盘录入的概念、示例和最佳实践。
 False