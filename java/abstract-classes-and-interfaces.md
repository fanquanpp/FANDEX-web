# 抽象类与接口 (Abstract Classes & Interfaces)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 抽象类、接口定义、默认方法、静态方法及二者对比。 | Abstract classes, interfaces, default methods, static methods, and comparison.
 False
 False---
 False
 False## 目录
 False
 False1. [抽象类](#抽象类)
 False2. [接口](#接口)
 False3. [实现与继承的规则](#实现与继承的规则)
 False4. [抽象类 vs. 接口](#抽象类-vs.-接口)
 False5. [实际应用案例](#实际应用案例)
 False6. [最佳实践](#最佳实践)
 False7. [常见陷阱](#常见陷阱)
 False8. [设计模式中的应用](#设计模式中的应用)
 False
 False---
 False
 False## 1. 抽象类 (Abstract Class)
 False
 False### 1.1 抽象类的定义
 False
 False抽象类是使用 `abstract` 修饰的类，不能直接实例化，用于定义子类的共同行为。
 False
```java
 Truepublic abstract class Animal {
 True // 成员变量
 True protected String name;
 True 
 True // 构造器
 True public Animal(String name) {
 True this.name = name;
 True }
 True 
 True // 抽象方法（无方法体）
 True public abstract void makeSound();
 True 
 True // 普通方法（有方法体）
 True public void eat() {
 True System.out.println(name + " is eating.");
 True }
 True}
 True```

 False### 1.2 抽象类的特点
 False
 False- **不能实例化**: 不能使用 `new` 关键字创建抽象类的实例
 False- **可以包含抽象方法**: 抽象方法没有方法体，使用 `abstract` 修饰
 False- **可以包含普通方法**: 抽象类可以有实现了的方法
 False- **可以有构造器**: 供子类调用
 False- **子类必须实现所有抽象方法**: 如果子类不实现所有抽象方法，子类也必须是抽象类
 False
 False### 1.3 抽象类的继承
 False
```java
 True// 子类实现抽象类
 Truepublic class Dog extends Animal {
 True public Dog(String name) {
 True super(name);
 True }
 True 
 True @Override
 True public void makeSound() {
 True System.out.println(name + " barks.");
 True }
 True}
 True
 Truepublic class Cat extends Animal {
 True public Cat(String name) {
 True super(name);
 True }
 True 
 True @Override
 True public void makeSound() {
 True System.out.println(name + " meows.");
 True }
 True}
 True```

 False### 1.4 抽象类的使用场景
 False
 False- **模板方法模式**: 定义算法的骨架，子类实现具体步骤
 False- **代码复用**: 提取子类的共同代码到抽象类
 False- **层次结构**: 表示类之间的 "is-a" 关系
 False
 False## 2. 接口 (Interface)
 False
 False### 2.1 接口的定义
 False
 False接口是使用 `interface` 关键字定义的，是一组行为规范的集合。
 False
```java
 Truepublic interface Shape {
 True // 常量（默认 public static final）
 True double PI = 3.14159;
 True 
 True // 抽象方法（默认 public abstract）
 True double calculateArea();
 True double calculatePerimeter();
 True}
 True```

 False### 2.2 接口的成员规则
 False
 False- **属性**: 默认 `public static final`，必须初始化
 False- **方法**:
 False - Java 8 前：默认 `public abstract`
 False - Java 8+：可以有默认方法和静态方法
 False - Java 9+：可以有私有方法
 False
 False### 2.3 Java 8+ 接口新特性
 False
 False#### 2.3.1 默认方法
 False
 False默认方法使用 `default` 修饰，提供方法的默认实现。
 False
```java
 Truepublic interface Vehicle {
 True void start();
 True void stop();
 True 
 True // 默认方法
 True default void honk() {
 True System.out.println("Beep beep!");
 True }
 True}
 True```

 False#### 2.3.2 静态方法
 False
 False静态方法使用 `static` 修饰，提供工具方法。
 False
```java
 Truepublic interface MathUtils {
 True // 静态方法
 True static int add(int a, int b) {
 True return a + b;
 True }
 True 
 True static int subtract(int a, int b) {
 True return a - b;
 True }
 True}
 True```

 False#### 2.3.3 私有方法
 False
 FalseJava 9+ 支持私有方法，供接口内部使用。
 False
```java
 Truepublic interface StringUtils {
 True default String reverse(String str) {
 True return reverseImpl(str);
 True }
 True 
 True default boolean isPalindrome(String str) {
 True String reversed = reverseImpl(str);
 True return str.equals(reversed);
 True }
 True 
 True // 私有方法
 True private String reverseImpl(String str) {
 True return new StringBuilder(str).reverse().toString();
 True }
 True}
 True```

 False### 2.4 接口的实现
 False
```java
 Truepublic class Circle implements Shape {
 True private double radius;
 True 
 True public Circle(double radius) {
 True this.radius = radius;
 True }
 True 
 True @Override
 True public double calculateArea() {
 True return PI * radius * radius;
 True }
 True 
 True @Override
 True public double calculatePerimeter() {
 True return 2 * PI * radius;
 True }
 True}
 True
 Truepublic class Rectangle implements Shape {
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
 True```

 False### 2.5 接口的多继承
 False
 False接口可以继承多个接口。
 False
```java
 Truepublic interface Movable {
 True void move();
 True}
 True
 Truepublic interface Flyable {
 True void fly();
 True}
 True
 True// 多继承接口
 Truepublic interface Bird extends Movable, Flyable {
 True void sing();
 True}
 True```

 False## 3. 实现与继承的规则
 False
 False### 3.1 类的继承与实现
 False
 False- **单继承**: 一个类只能继承一个父类
 False- **多实现**: 一个类可以实现多个接口
 False
```java
 True// 继承一个类，实现多个接口
 Truepublic class Eagle extends Animal implements Bird, Predator {
 True // 实现所有抽象方法
 True}
 True```

 False### 3.2 接口的继承
 False
 False- **多继承**: 接口可以继承多个接口
 False- **接口链**: 形成接口的继承链
 False
 False## 4. 抽象类 vs. 接口 (详细对比)
 False
 False| 特性 | 抽象类 (Abstract Class) | 接口 (Interface) |
 False|------|------------------------|------------------|
 False| **关键字** | `abstract class` | `interface` |
 False| **实例化** | 不能直接实例化 | 不能实例化 |
 False| **继承关系** | 单继承 | 多实现 |
 False| **接口继承** | 可以实现多个接口 | 可以继承多个接口 |
 False| **成员变量** | 任意访问修饰符，非 final | 只能是 `public static final` |
 False| **构造器** | 有构造器 | 无构造器 |
 False| **方法类型** | 抽象方法、普通方法、静态方法 | 抽象方法、默认方法、静态方法、私有方法 |
 False| **访问修饰符** | 任意访问修饰符 | 方法默认 `public`，属性默认 `public static final` |
 False| **设计意图** | "is-a" 关系（本质） | "like-a" / "has-a" 关系（能力） |
 False| **使用场景** | 代码复用、模板方法 | 行为规范、多态、解耦 |
 False
 False## 5. 实际应用案例
 False
 False### 5.1 抽象类的应用 - 模板方法模式
 False
```java
 Truepublic abstract class AbstractProcessor {
 True // 模板方法
 True public final void process() {
 True initialize();
 True doProcess();
 True cleanup();
 True }
 True 
 True // 抽象方法，由子类实现
 True protected abstract void doProcess();
 True 
 True // 普通方法，子类可以覆盖
 True protected void initialize() {
 True System.out.println("Initializing...");
 True }
 True 
 True protected void cleanup() {
 True System.out.println("Cleaning up...");
 True }
 True}
 True
 Truepublic class FileProcessor extends AbstractProcessor {
 True @Override
 True protected void doProcess() {
 True System.out.println("Processing file...");
 True }
 True}
 True
 Truepublic class DatabaseProcessor extends AbstractProcessor {
 True @Override
 True protected void doProcess() {
 True System.out.println("Processing database...");
 True }
 True 
 True @Override
 True protected void initialize() {
 True System.out.println("Connecting to database...");
 True }
 True}
 True```

 False### 5.2 接口的应用 - 策略模式
 False
```java
 Truepublic interface PaymentStrategy {
 True void pay(double amount);
 True}
 True
 Truepublic class CreditCardPayment implements PaymentStrategy {
 True private String cardNumber;
 True 
 True public CreditCardPayment(String cardNumber) {
 True this.cardNumber = cardNumber;
 True }
 True 
 True @Override
 True public void pay(double amount) {
 True System.out.println("Paying " + amount + " with credit card: " + cardNumber);
 True }
 True}
 True
 Truepublic class PayPalPayment implements PaymentStrategy {
 True private String email;
 True 
 True public PayPalPayment(String email) {
 True this.email = email;
 True }
 True 
 True @Override
 True public void pay(double amount) {
 True System.out.println("Paying " + amount + " with PayPal: " + email);
 True }
 True}
 True
 Truepublic class ShoppingCart {
 True private PaymentStrategy paymentStrategy;
 True 
 True public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
 True this.paymentStrategy = paymentStrategy;
 True }
 True 
 True public void checkout(double amount) {
 True paymentStrategy.pay(amount);
 True }
 True}
 True```

 False### 5.3 接口默认方法的应用
 False
```java
 Truepublic interface Collection {
 True void add(Object item);
 True int size();
 True 
 True // 默认方法
 True default void clear() {
 True // 实现清空集合的逻辑
 True }
 True 
 True default boolean isEmpty() {
 True return size() == 0;
 True }
 True}
 True```

 False## 6. 最佳实践
 False
 False### 6.1 抽象类的最佳实践
 False
 False- **提取共性**: 将子类的共同代码提取到抽象类
 False- **模板方法**: 使用模板方法模式定义算法骨架
 False- **层次设计**: 合理设计类的继承层次，避免过深
 False- **有限使用**: 不要为了使用抽象类而创建抽象类，只有当确实需要时才使用
 False
 False### 6.2 接口的最佳实践
 False
 False- **单一职责**: 一个接口只定义一组相关的行为
 False- **命名规范**: 接口名使用形容词或动词形式（如 `Runnable`, `Serializable`）
 False- **默认方法**: 谨慎使用默认方法，避免破坏接口的契约
 False- **静态方法**: 使用静态方法提供工具函数，提高接口的实用性
 False
 False### 6.3 抽象类与接口的选择
 False
 False- **使用抽象类**:
 False - 需要代码复用
 False - 定义模板方法
 False - 表示 "is-a" 关系
 False - 需要构造器和实例变量
 False
 False- **使用接口**:
 False - 定义行为规范
 False - 实现多态
 False - 表示 "has-a" 能力
 False - 需要多继承
 False - 解耦设计
 False
 False## 7. 常见陷阱
 False
 False### 7.1 抽象类的陷阱
 False
 False- **继承层次过深**: 导致代码难以维护
 False- **过度使用**: 为了代码复用而滥用抽象类
 False- **构造器调用**: 子类构造器必须调用父类构造器
 False
 False### 7.2 接口的陷阱
 False
 False- **默认方法冲突**: 实现多个接口时，默认方法可能冲突
 False- **接口膨胀**: 接口定义过多方法，导致实现类负担过重
 False- **版本兼容性**: 修改接口会影响所有实现类
 False
 False### 7.3 默认方法冲突的解决
 False
```java
 Truepublic interface A {
 True default void method() {
 True System.out.println("A.method()");
 True }
 True}
 True
 Truepublic interface B {
 True default void method() {
 True System.out.println("B.method()");
 True }
 True}
 True
 True// 解决冲突：重写默认方法
 Truepublic class C implements A, B {
 True @Override
 True public void method() {
 True // 可以选择调用其中一个接口的默认方法
 True A.super.method();
 True // 或提供自己的实现
 True System.out.println("C.method()");
 True }
 True}
 True```

 False## 8. 设计模式中的应用
 False
 False### 8.1 抽象类的应用
 False
 False- **模板方法模式**: 定义算法骨架
 False- **工厂方法模式**: 创建对象的接口
 False- **适配器模式**: 转换接口
 False
 False### 8.2 接口的应用
 False
 False- **策略模式**: 定义算法族
 False- **观察者模式**: 定义对象间的依赖关系
 False- **命令模式**: 封装请求
 False- **迭代器模式**: 遍历集合
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充 Java 8+ 接口新特性与二者详细对比。
 False- 2026-05-03: 扩展内容，添加抽象类与接口的具体实现、实际应用案例、最佳实践和常见陷阱。
 False