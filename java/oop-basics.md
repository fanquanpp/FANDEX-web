# 面向对象编程 (OOP Concepts)
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Java Basics
 False> @Description: 面向对象编程
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 1. 类与对象 (Class & Object)
 False
 False### 1.1 类的定义
 False
 False类是对象的模板，定义了对象的属性和行为。
 False
```java
 Truepublic class Student {
 True // 属性 (成员变量)
 True private String name;
 True private int age;
 True private String major;
 True 
 True // 行为 (方法)
 True public void study() {
 True System.out.println(name + " is studying.");
 True }
 True 
 True public void introduce() {
 True System.out.println("I'm " + name + ", " + age + " years old, major in " + major);
 True }
 True}
 True```

 False### 1.2 类的结构
 False
 False- **成员变量** (Fields): 类的属性，存储对象的状态
 False- **方法** (Methods): 类的行为，定义对象的操作
 False- **构造器** (Constructors): 用于创建对象的特殊方法
 False- **代码块** (Blocks): 静态代码块和实例代码块
 False- **内部类** (Inner Classes): 类中定义的类
 False
 False### 1.3 对象的创建与使用
 False
 False#### 1.3.1 对象的创建
 False
 False使用 `new` 关键字创建对象。
 False
```java
 True// 创建对象
 TrueStudent student = new Student();
 True
 True// 访问对象的属性和方法
 Truestudent.setName("Alice");
 Truestudent.setAge(20);
 Truestudent.setMajor("Computer Science");
 Truestudent.study();
 Truestudent.introduce();
 True```

 False#### 1.3.2 对象的内存布局
 False
 False- **栈 (Stack)**: 存放对象引用变量
 False- **堆 (Heap)**: 存放对象的实际数据
 False
```
 True栈 堆
 True┌──────────┐ ┌────────────┐
 True│ student │─────→│ name: null │
 True└──────────┘ │ age: 0 │
 True │ major: null│
 True └────────────┘
 True```

 False### 1.4 构造器 (Constructors)
 False
 False构造器用于初始化对象，与类同名，无返回值。
 False
 False#### 1.4.1 默认构造器
 False
 False如果类中没有定义构造器，编译器会自动生成一个无参构造器。
 False
```java
 Truepublic class Student {
 True // 默认构造器（由编译器生成）
 True public Student() {
 True }
 True}
 True```

 False#### 1.4.2 自定义构造器
 False
 False可以定义多个构造器，实现方法重载。
 False
```java
 Truepublic class Student {
 True private String name;
 True private int age;
 True private String major;
 True 
 True // 无参构造器
 True public Student() {
 True }
 True 
 True // 带参数的构造器
 True public Student(String name, int age) {
 True this.name = name;
 True this.age = age;
 True }
 True 
 True // 全参构造器
 True public Student(String name, int age, String major) {
 True this.name = name;
 True this.age = age;
 True this.major = major;
 True }
 True}
 True```

 False#### 1.4.3 构造器的调用
 False
```java
 True// 使用无参构造器
 TrueStudent student1 = new Student();
 True
 True// 使用带参数的构造器
 TrueStudent student2 = new Student("Bob", 21);
 True
 True// 使用全参构造器
 TrueStudent student3 = new Student("Charlie", 22, "Software Engineering");
 True```

 False## 2. 封装 (Encapsulation)
 False
 False### 2.1 封装的概念
 False
 False封装是指将对象的状态和行为封装起来，只暴露必要的接口，隐藏实现细节。
 False
 False### 2.2 访问修饰符
 False
 False| 修饰符 | 类内 | 同包 | 子类 | 任意位置 |
 False|--------|------|------|------|----------|
 False| `private` | | | | |
 False| `default` | | | | |
 False| `protected` | | | | |
 False| `public` | | | | |
 False
 False### 2.3 封装的实现
 False
 False使用 `private` 修饰符隐藏属性，通过 getter/setter 方法暴露接口。
 False
```java
 Truepublic class Student {
 True // 私有属性
 True private String name;
 True private int age;
 True private String major;
 True 
 True // Getter 方法
 True public String getName() {
 True return name;
 True }
 True 
 True public int getAge() {
 True return age;
 True }
 True 
 True public String getMajor() {
 True return major;
 True }
 True 
 True // Setter 方法
 True public void setName(String name) {
 True this.name = name;
 True }
 True 
 True public void setAge(int age) {
 True if (age >= 0 && age <= 150) {
 True this.age = age;
 True } else {
 True System.out.println("Invalid age");
 True }
 True }
 True 
 True public void setMajor(String major) {
 True this.major = major;
 True }
 True}
 True```

 False### 2.4 封装的优点
 False
 False- **安全性**: 防止外部直接修改对象状态
 False- **可维护性**: 内部实现可以自由修改，不影响外部使用
 False- **可读性**: 明确对象的接口和职责
 False- **灵活性**: 可以在 setter 中添加验证逻辑
 False
 False## 3. 继承 (Inheritance)
 False
 False### 3.1 继承的概念
 False
 False继承是指一个类（子类）继承另一个类（父类）的属性和方法，实现代码复用。
 False
 False### 3.2 继承的语法
 False
 False使用 `extends` 关键字。
 False
```java
 True// 父类
 Truepublic class Animal {
 True protected String name;
 True 
 True public void eat() {
 True System.out.println(name + " is eating.");
 True }
 True 
 True public void sleep() {
 True System.out.println(name + " is sleeping.");
 True }
 True}
 True
 True// 子类
 Truepublic class Dog extends Animal {
 True public void bark() {
 True System.out.println(name + " is barking.");
 True }
 True}
 True```

 False### 3.3 继承的特性
 False
 False- **单继承**: Java 只支持单继承，一个类只能有一个直接父类
 False- **传递性**: 如果 A 继承 B，B 继承 C，则 A 间接继承 C
 False- **方法重写**: 子类可以重写父类的方法
 False- **super 关键字**: 用于访问父类的成员和构造器
 False
 False### 3.4 super 关键字的使用
 False
 False#### 3.4.1 访问父类的成员变量
 False
```java
 Truepublic class Dog extends Animal {
 True private String breed;
 True 
 True public Dog(String name, String breed) {
 True super.name = name; // 访问父类的成员变量
 True this.breed = breed;
 True }
 True}
 True```

 False#### 3.4.2 调用父类的方法
 False
```java
 Truepublic class Dog extends Animal {
 True @Override
 True public void eat() {
 True super.eat(); // 调用父类的 eat 方法
 True System.out.println("Dog eats bones.");
 True }
 True}
 True```

 False#### 3.4.3 调用父类的构造器
 False
```java
 Truepublic class Animal {
 True protected String name;
 True 
 True public Animal(String name) {
 True this.name = name;
 True }
 True}
 True
 Truepublic class Dog extends Animal {
 True private String breed;
 True 
 True public Dog(String name, String breed) {
 True super(name); // 调用父类的构造器
 True this.breed = breed;
 True }
 True}
 True```

 False### 3.5 方法重写 (Override)
 False
 False#### 3.5.1 方法重写的规则
 False
 False- **方法名相同**
 False- **参数列表相同**
 False- **返回类型相同或为子类类型** (协变返回类型)
 False- **访问修饰符不能更严格**
 False- **不能抛出比父类方法更多的异常**
 False
 False#### 3.5.2 方法重写的示例
 False
```java
 Truepublic class Animal {
 True public void makeSound() {
 True System.out.println("Animal makes sound.");
 True }
 True}
 True
 Truepublic class Cat extends Animal {
 True @Override
 True public void makeSound() {
 True System.out.println("Cat meows.");
 True }
 True}
 True
 Truepublic class Dog extends Animal {
 True @Override
 True public void makeSound() {
 True System.out.println("Dog barks.");
 True }
 True}
 True```

 False## 4. 多态 (Polymorphism)
 False
 False### 4.1 多态的概念
 False
 False多态是指同一行为在不同对象上有不同的表现形式。
 False
 False### 4.2 多态的必要条件
 False
 False1. **继承关系**
 False2. **方法重写**
 False3. **父类引用指向子类对象**
 False
 False### 4.3 多态的示例
 False
```java
 True// 父类引用指向子类对象
 TrueAnimal animal1 = new Cat();
 Trueanimal1.makeSound(); // 输出: Cat meows.
 True
 TrueAnimal animal2 = new Dog();
 Trueanimal2.makeSound(); // 输出: Dog barks.
 True```

 False### 4.4 多态的原理
 False
 False- **编译时类型**: 变量声明的类型（父类类型）
 False- **运行时类型**: 变量实际指向的对象类型（子类类型）
 False- **方法调用**: 编译时检查父类是否有该方法，运行时执行子类重写的方法
 False
 False### 4.5 多态的优点
 False
 False- **可扩展性**: 新增子类不影响现有代码
 False- **代码复用**: 统一使用父类引用处理不同子类对象
 False- **灵活性**: 运行时动态绑定方法实现
 False
 False## 5. this 关键字
 False
 False### 5.1 this 关键字的作用
 False
 False- **指向当前对象**
 False- **区分成员变量和局部变量**
 False- **调用本类的其他构造器**
 False- **返回当前对象**
 False
 False### 5.2 this 关键字的使用
 False
 False#### 5.2.1 区分成员变量和局部变量
 False
```java
 Truepublic class Student {
 True private String name;
 True 
 True public void setName(String name) {
 True this.name = name; // this.name 指成员变量，name 指局部变量
 True }
 True}
 True```

 False#### 5.2.2 调用本类的其他构造器
 False
```java
 Truepublic class Student {
 True private String name;
 True private int age;
 True 
 True public Student() {
 True this("Unknown", 0); // 调用带两个参数的构造器
 True }
 True 
 True public Student(String name) {
 True this(name, 0); // 调用带两个参数的构造器
 True }
 True 
 True public Student(String name, int age) {
 True this.name = name;
 True this.age = age;
 True }
 True}
 True```

 False#### 5.2.3 返回当前对象
 False
```java
 Truepublic class Student {
 True private String name;
 True private int age;
 True 
 True public Student setName(String name) {
 True this.name = name;
 True return this; // 返回当前对象，支持链式调用
 True }
 True 
 True public Student setAge(int age) {
 True this.age = age;
 True return this; // 返回当前对象，支持链式调用
 True }
 True}
 True
 True// 链式调用
 TrueStudent student = new Student().setName("Alice").setAge(20);
 True```

 False## 6. 面向对象的设计原则
 False
 False### 6.1 单一职责原则 (SRP)
 False
 False一个类应该只负责一项职责。
 False
 False### 6.2 开放-封闭原则 (OCP)
 False
 False软件实体应该对扩展开放，对修改封闭。
 False
 False### 6.3 里氏替换原则 (LSP)
 False
 False子类应该能够替换父类而不影响程序的正确性。
 False
 False### 6.4 依赖倒置原则 (DIP)
 False
 False高层模块不应该依赖低层模块，两者都应该依赖抽象。
 False
 False### 6.5 接口隔离原则 (ISP)
 False
 False客户端不应该依赖它不需要的接口。
 False
 False## 7. 实际应用案例
 False
 False### 7.1 简单的学生管理系统
 False
```java
 True// 基类
 Truepublic class Person {
 True private String name;
 True private int age;
 True 
 True // 构造器、getter/setter 方法
 True}
 True
 True// 子类
 Truepublic class Student extends Person {
 True private String studentId;
 True private String major;
 True 
 True // 构造器、getter/setter 方法
 True 
 True public void study() {
 True System.out.println(getName() + " is studying " + major);
 True }
 True}
 True
 True// 子类
 Truepublic class Teacher extends Person {
 True private String teacherId;
 True private String subject;
 True 
 True // 构造器、getter/setter 方法
 True 
 True public void teach() {
 True System.out.println(getName() + " is teaching " + subject);
 True }
 True}
 True
 True// 测试
 Truepublic class Test {
 True public static void main(String[] args) {
 True Student student = new Student();
 True student.setName("Alice");
 True student.setAge(20);
 True student.setStudentId("S12345");
 True student.setMajor("Computer Science");
 True student.study();
 True 
 True Teacher teacher = new Teacher();
 True teacher.setName("Mr. Smith");
 True teacher.setAge(35);
 True teacher.setTeacherId("T67890");
 True teacher.setSubject("Java Programming");
 True teacher.teach();
 True }
 True}
 True```

 False### 7.2 形状类的多态示例
 False
```java
 True// 抽象基类
 Truepublic abstract class Shape {
 True public abstract double calculateArea();
 True public abstract double calculatePerimeter();
 True}
 True
 True// 子类
 Truepublic class Circle extends Shape {
 True private double radius;
 True 
 True public Circle(double radius) {
 True this.radius = radius;
 True }
 True 
 True @Override
 True public double calculateArea() {
 True return Math.PI * radius * radius;
 True }
 True 
 True @Override
 True public double calculatePerimeter() {
 True return 2 * Math.PI * radius;
 True }
 True}
 True
 True// 子类
 Truepublic class Rectangle extends Shape {
 True private double width;
 True private double height;
 True 
 True public Rectangle(double width, double height) {
 True this.width = width;
 True this.height = height;
 True }
 True 
 True @Override
 True public double calculateArea() {
 True return width * height;
 True }
 True 
 True @Override
 True public double calculatePerimeter() {
 True return 2 * (width + height);
 True }
 True}
 True
 True// 测试
 Truepublic class Test {
 True public static void main(String[] args) {
 True Shape[] shapes = new Shape[2];
 True shapes[0] = new Circle(5);
 True shapes[1] = new Rectangle(4, 6);
 True 
 True for (Shape shape : shapes) {
 True System.out.println("Area: " + shape.calculateArea());
 True System.out.println("Perimeter: " + shape.calculatePerimeter());
 True System.out.println();
 True }
 True }
 True}
 True```

 False## 8. 常见陷阱
 False
 False### 8.1 构造器调用顺序
 False
 False- 父类构造器总是在子类构造器之前执行
 False- 如果子类构造器没有显式调用父类构造器，会自动调用父类的无参构造器
 False- 如果父类没有无参构造器，子类必须显式调用父类的有参构造器
 False
 False### 8.2 方法重写与方法重载的区别
 False
 False- **方法重写**：发生在父子类之间，方法名、参数列表相同
 False- **方法重载**：发生在同一类中，方法名相同，参数列表不同
 False
 False### 8.3 多态的局限性
 False
 False- 多态只适用于方法，不适用于属性
 False- 父类引用不能直接调用子类特有的方法，需要强制类型转换
 False
 False### 8.4 继承的滥用
 False
 False- 不要为了代码复用而滥用继承
 False- 优先考虑组合关系而不是继承关系
 False- 遵循里氏替换原则
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 体系化整合 Java 面向对象三大特性。
 False- 2026-10-20: 扩展内容，添加类的结构、构造器、封装实现、继承机制、多态深入理解和实际应用案例。
 False