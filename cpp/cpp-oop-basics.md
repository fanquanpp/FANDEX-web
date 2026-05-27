# C++ 面向对象基础 (C++ OOP Basics)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: 类与对象、封装、继承、多态及虚函数原理。 | Class, Object, Encapsulation, Inheritance, Polymorphism, and VTable.
 False
 False---
 False
 False## 目录
 False
 False1. [类与对象](#类与对象)
 False2. [封装](#封装)
 False3. [继承](#继承)
 False4. [多态](#多态)
 False5. [虚函数与虚函数表](#虚函数与虚函数表)
 False
 False---
 False
 False## 1. 类与对象 (Class & Object)
 False
 False### 1.1 类的定义
 False
 False类是面向对象编程的基本单位，它封装了数据和操作数据的方法。
 False
```cpp
 Trueclass Person {
 Trueprivate:
 True // 私有成员变量
 True std::string name;
 True int age;
 True
 Truepublic:
 True // 构造函数
 True Person() : name(""), age(0) {}
 True Person(std::string n, int a) : name(n), age(a) {}
 True
 True // 成员方法
 True void setName(std::string n) { name = n; }
 True void setAge(int a) { age = a; }
 True std::string getName() const { return name; }
 True int getAge() const { return age; }
 True
 True // 成员方法
 True void introduce() const {
 True std::cout << "My name is " << name << " and I am " << age << " years old." << std::endl;
 True }
 True};
 True```

 False### 1.2 对象的创建与使用
 False
```cpp
 Trueint main() {
 True // 栈上创建对象
 True Person person1; // 默认构造函数
 True person1.setName("Alice");
 True person1.setAge(25);
 True person1.introduce();
 True
 True // 栈上创建对象（带参数）
 True Person person2("Bob", 30);
 True person2.introduce();
 True
 True // 堆上创建对象
 True Person* person3 = new Person("Charlie", 35);
 True person3->introduce();
 True delete person3; // 释放堆内存
 True
 True return 0;
 True}
 True```

 False### 1.3 类的成员
 False
 False| 成员类型 | 描述 | 访问权限 |
 False| :--- | :--- | :--- |
 False| **成员变量** | 存储对象状态 | public, private, protected |
 False| **成员函数** | 操作对象状态 | public, private, protected |
 False| **构造函数** | 初始化对象 | public |
 False| **析构函数** | 清理对象资源 | public |
 False| **静态成员** | 属于类，而非对象 | public, private, protected |
 False| **友元** | 允许外部访问私有成员 | - |
 False
 False## 2. 封装 (Encapsulation)
 False
 False封装是将数据和操作数据的方法捆绑在一起，对外部隐藏实现细节。
 False
 False### 2.1 访问修饰符
 False
 False| 修饰符 | 访问权限 | 描述 |
 False| :--- | :--- | :--- |
 False| `public` | 公共 | 外部可访问 |
 False| `private` | 私有 | 仅类内访问 |
 False| `protected` | 保护 | 类及派生类访问 |
 False
 False### 2.2 封装示例
 False
```cpp
 Trueclass BankAccount {
 Trueprivate:
 True // 私有成员变量，外部不可直接访问
 True std::string accountNumber;
 True double balance;
 True
 Truepublic:
 True // 构造函数
 True BankAccount(std::string accNum, double initialBalance) :
 True accountNumber(accNum), balance(initialBalance) {}
 True
 True // 公共接口
 True void deposit(double amount) {
 True if (amount > 0) {
 True balance += amount;
 True std::cout << "Deposited: $" << amount << std::endl;
 True }
 True }
 True
 True void withdraw(double amount) {
 True if (amount > 0 && amount <= balance) {
 True balance -= amount;
 True std::cout << "Withdrawn: $" << amount << std::endl;
 True } else {
 True std::cout << "Insufficient funds" << std::endl;
 True }
 True }
 True
 True double getBalance() const {
 True return balance;
 True }
 True
 True std::string getAccountNumber() const {
 True return accountNumber;
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True BankAccount acc("123456", 1000.0);
 True acc.deposit(500.0);
 True acc.withdraw(200.0);
 True std::cout << "Balance: $" << acc.getBalance() << std::endl;
 True return 0;
 True}
 True```

 False## 3. 继承 (Inheritance)
 False
 False继承是一种创建新类的方式，新类继承现有类的属性和方法。
 False
 False### 3.1 继承的基本语法
 False
```cpp
 True// 基类
 Trueclass Animal {
 Trueprotected:
 True std::string name;
 True
 Truepublic:
 True Animal(std::string n) : name(n) {}
 True virtual void makeSound() {
 True std::cout << "Generic animal sound" << std::endl;
 True }
 True virtual ~Animal() {}
 True};
 True
 True// 派生类
 Trueclass Dog : public Animal {
 Truepublic:
 True Dog(std::string n) : Animal(n) {}
 True
 True // 覆盖基类方法
 True void makeSound() override {
 True std::cout << name << " barks: Woof! Woof!" << std::endl;
 True }
 True};
 True
 True// 派生类
 Trueclass Cat : public Animal {
 Truepublic:
 True Cat(std::string n) : Animal(n) {}
 True
 True // 覆盖基类方法
 True void makeSound() override {
 True std::cout << name << " meows: Meow! Meow!" << std::endl;
 True }
 True};
 True```

 False### 3.2 继承类型
 False
 False| 继承类型 | 基类成员在派生类中的访问权限 |
 False| :--- | :--- |
 False| `public` | 保持基类成员的访问权限 |
 False| `protected` | 基类的 public 和 protected 成员变为 protected |
 False| `private` | 基类的所有成员变为 private |
 False
 False### 3.3 多继承
 False
 FalseC++ 支持多继承，一个类可以从多个基类继承。
 False
```cpp
 True// 基类 1
 Trueclass Printable {
 Truepublic:
 True virtual void print() const = 0; // 纯虚函数
 True};
 True
 True// 基类 2
 Trueclass Serializable {
 Truepublic:
 True virtual std::string serialize() const = 0; // 纯虚函数
 True};
 True
 True// 派生类，多继承
 Trueclass Person : public Printable, public Serializable {
 Trueprivate:
 True std::string name;
 True int age;
 True
 Truepublic:
 True Person(std::string n, int a) : name(n), age(a) {}
 True
 True // 实现 Printable 接口
 True void print() const override {
 True std::cout << "Name: " << name << ", Age: " << age << std::endl;
 True }
 True
 True // 实现 Serializable 接口
 True std::string serialize() const override {
 True return "{\"name\": \"" + name + "\", \"age\": " + std::to_string(age) + "}";
 True }
 True};
 True```

 False### 3.4 菱形继承问题
 False
 False菱形继承是多继承中的一个问题，当两个派生类继承自同一个基类，而另一个类又同时继承这两个派生类时，会导致基类成员的重复。
 False
```cpp
 True// 基类
 Trueclass Animal {
 Truepublic:
 True Animal() { std::cout << "Animal constructor" << std::endl; }
 True ~Animal() { std::cout << "Animal destructor" << std::endl; }
 True};
 True
 True// 派生类 1
 Trueclass Mammal : public Animal {
 Truepublic:
 True Mammal() { std::cout << "Mammal constructor" << std::endl; }
 True ~Mammal() { std::cout << "Mammal destructor" << std::endl; }
 True};
 True
 True// 派生类 2
 Trueclass Bird : public Animal {
 Truepublic:
 True Bird() { std::cout << "Bird constructor" << std::endl; }
 True ~Bird() { std::cout << "Bird destructor" << std::endl; }
 True};
 True
 True// 派生类 3，多继承
 Trueclass Bat : public Mammal, public Bird {
 Truepublic:
 True Bat() { std::cout << "Bat constructor" << std::endl; }
 True ~Bat() { std::cout << "Bat destructor" << std::endl; }
 True};
 True
 True// 问题：Bat 会有两个 Animal 子对象
 True// 解决方案：使用虚继承
 True```

 False### 3.5 虚继承
 False
 False虚继承可以解决菱形继承问题，确保基类只被继承一次。
 False
```cpp
 True// 基类
 Trueclass Animal {
 Truepublic:
 True Animal() { std::cout << "Animal constructor" << std::endl; }
 True ~Animal() { std::cout << "Animal destructor" << std::endl; }
 True};
 True
 True// 派生类 1，虚继承
 Trueclass Mammal : virtual public Animal {
 Truepublic:
 True Mammal() { std::cout << "Mammal constructor" << std::endl; }
 True ~Mammal() { std::cout << "Mammal destructor" << std::endl; }
 True};
 True
 True// 派生类 2，虚继承
 Trueclass Bird : virtual public Animal {
 Truepublic:
 True Bird() { std::cout << "Bird constructor" << std::endl; }
 True ~Bird() { std::cout << "Bird destructor" << std::endl; }
 True};
 True
 True// 派生类 3，多继承
 Trueclass Bat : public Mammal, public Bird {
 Truepublic:
 True Bat() { std::cout << "Bat constructor" << std::endl; }
 True ~Bat() { std::cout << "Bat destructor" << std::endl; }
 True};
 True
 True// 现在 Bat 只有一个 Animal 子对象
 True```

 False## 4. 多态 (Polymorphism)
 False
 False多态是指同一操作作用于不同的对象时，会产生不同的行为。C++ 支持两种类型的多态：静态多态和动态多态。
 False
 False### 4.1 静态多态
 False
 False静态多态是在编译时确定的，通过函数重载和模板实现。
 False
 False#### 4.1.1 函数重载
 False
 False函数重载是指在同一作用域内定义多个同名函数，但它们的参数列表不同（参数类型、参数个数或参数顺序不同）。
 False
```cpp
 Trueclass Calculator {
 Truepublic:
 True // 重载：参数类型不同
 True int add(int a, int b) {
 True return a + b;
 True }
 True
 True double add(double a, double b) {
 True return a + b;
 True }
 True
 True // 重载：参数个数不同
 True int add(int a, int b, int c) {
 True return a + b + c;
 True }
 True
 True // 重载：参数顺序不同
 True void print(int a, double b) {
 True std::cout << "int: " << a << ", double: " << b << std::endl;
 True }
 True
 True void print(double a, int b) {
 True std::cout << "double: " << a << ", int: " << b << std::endl;
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True Calculator calc;
 True std::cout << "add(int, int): " << calc.add(1, 2) << std::endl;
 True std::cout << "add(double, double): " << calc.add(1.5, 2.5) << std::endl;
 True std::cout << "add(int, int, int): " << calc.add(1, 2, 3) << std::endl;
 True
 True calc.print(1, 2.5);
 True calc.print(1.5, 2);
 True
 True return 0;
 True}
 True```

 False#### 4.1.2 模板
 False
 False模板是 C++ 支持泛型编程的核心机制，通过模板可以编写通用的函数和类。
 False
```cpp
 True// 函数模板
 Truetemplate <typename T>
 TrueT add(T a, T b) {
 True return a + b;
 True}
 True
 True// 类模板
 Truetemplate <typename T>
 Trueclass Stack {
 Trueprivate:
 True std::vector<T> elements;
 True
 Truepublic:
 True void push(T element) {
 True elements.push_back(element);
 True }
 True
 True T pop() {
 True if (elements.empty()) {
 True throw std::runtime_error("Stack is empty");
 True }
 True T top = elements.back();
 True elements.pop_back();
 True return top;
 True }
 True
 True bool empty() const {
 True return elements.empty();
 True }
 True
 True size_t size() const {
 True return elements.size();
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True // 使用函数模板
 True int i = add(10, 20);
 True double d = add(3.14, 2.71);
 True std::string s = add(std::string("Hello"), std::string(" World"));
 True
 True std::cout << "add(int, int): " << i << std::endl;
 True std::cout << "add(double, double): " << d << std::endl;
 True std::cout << "add(string, string): " << s << std::endl;
 True
 True // 使用类模板
 True Stack<int> intStack;
 True intStack.push(1);
 True intStack.push(2);
 True intStack.push(3);
 True
 True while (!intStack.empty()) {
 True std::cout << intStack.pop() << " ";
 True }
 True std::cout << std::endl;
 True
 True Stack<std::string> stringStack;
 True stringStack.push("Hello");
 True stringStack.push("World");
 True
 True while (!stringStack.empty()) {
 True std::cout << stringStack.pop() << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 4.2 动态多态
 False
 False动态多态是在运行时确定的，通过虚函数实现。
 False
```cpp
 True// 基类
 Trueclass Shape {
 Truepublic:
 True virtual void draw() const {
 True std::cout << "Drawing a shape" << std::endl;
 True }
 True
 True virtual double area() const = 0; // 纯虚函数
 True
 True virtual ~Shape() {}
 True};
 True
 True// 派生类
 Trueclass Circle : public Shape {
 Trueprivate:
 True double radius;
 True
 Truepublic:
 True Circle(double r) : radius(r) {}
 True
 True void draw() const override {
 True std::cout << "Drawing a circle" << std::endl;
 True }
 True
 True double area() const override {
 True return M_PI * radius * radius;
 True }
 True};
 True
 True// 派生类
 Trueclass Rectangle : public Shape {
 Trueprivate:
 True double width;
 True double height;
 True
 Truepublic:
 True Rectangle(double w, double h) : width(w), height(h) {}
 True
 True void draw() const override {
 True std::cout << "Drawing a rectangle" << std::endl;
 True }
 True
 True double area() const override {
 True return width * height;
 True }
 True};
 True
 True// 派生类
 Trueclass Triangle : public Shape {
 Trueprivate:
 True double base;
 True double height;
 True
 Truepublic:
 True Triangle(double b, double h) : base(b), height(h) {}
 True
 True void draw() const override {
 True std::cout << "Drawing a triangle" << std::endl;
 True }
 True
 True double area() const override {
 True return 0.5 * base * height;
 True }
 True};
 True
 True// 使用多态
 Truevoid printShapeInfo(const Shape& shape) {
 True shape.draw();
 True std::cout << "Area: " << shape.area() << std::endl;
 True}
 True
 Trueint main() {
 True Circle circle(5.0);
 True Rectangle rectangle(4.0, 6.0);
 True Triangle triangle(3.0, 8.0);
 True
 True printShapeInfo(circle); // 传递 Circle 对象
 True printShapeInfo(rectangle); // 传递 Rectangle 对象
 True printShapeInfo(triangle); // 传递 Triangle 对象
 True
 True // 使用基类指针数组
 True Shape* shapes[3];
 True shapes[0] = new Circle(2.0);
 True shapes[1] = new Rectangle(3.0, 4.0);
 True shapes[2] = new Triangle(5.0, 6.0);
 True
 True for (int i = 0; i < 3; i++) {
 True printShapeInfo(*shapes[i]);
 True delete shapes[i];
 True }
 True
 True return 0;
 True}
 True```

 False### 4.3 虚函数与纯虚函数
 False
 False#### 4.3.1 虚函数
 False
 False虚函数是在基类中声明的，允许派生类覆盖的函数。
 False
```cpp
 Trueclass Base {
 Truepublic:
 True virtual void func() {
 True std::cout << "Base::func()" << std::endl;
 True }
 True
 True virtual ~Base() {}
 True};
 True
 Trueclass Derived : public Base {
 Truepublic:
 True void func() override {
 True std::cout << "Derived::func()" << std::endl;
 True }
 True};
 True
 Trueint main() {
 True Base* b = new Derived();
 True b->func(); // 调用 Derived::func()
 True delete b;
 True return 0;
 True}
 True```

 False#### 4.3.2 纯虚函数
 False
 False纯虚函数是在基类中声明的，没有实现的虚函数，派生类必须实现它。
 False
```cpp
 Trueclass AbstractShape {
 Truepublic:
 True virtual void draw() const = 0; // 纯虚函数
 True virtual double area() const = 0; // 纯虚函数
 True virtual ~AbstractShape() {}
 True};
 True
 Trueclass Square : public AbstractShape {
 Trueprivate:
 True double side;
 True
 Truepublic:
 True Square(double s) : side(s) {}
 True
 True void draw() const override {
 True std::cout << "Drawing a square" << std::endl;
 True }
 True
 True double area() const override {
 True return side * side;
 True }
 True};
 True
 Trueint main() {
 True // AbstractShape shape; // 错误：不能实例化抽象类
 True Square square(5.0);
 True square.draw();
 True std::cout << "Area: " << square.area() << std::endl;
 True
 True return 0;
 True}
 True```

 False### 4.4 多态的实现原理
 False
 False多态的实现依赖于虚函数表（VTable）和虚指针（vptr）。
 False
 False1. **虚函数表（VTable）**：每个包含虚函数的类都有一个虚函数表，存储了该类所有虚函数的地址。
 False2. **虚指针（vptr）**：每个对象都有一个虚指针，指向该类的虚函数表。
 False3. **运行时绑定**：当通过基类指针或引用调用虚函数时，会通过虚指针找到虚函数表，然后调用相应的函数。
 False
```cpp
 True// 基类
 Trueclass Base {
 Truepublic:
 True virtual void func1() { std::cout << "Base::func1()" << std::endl; }
 True virtual void func2() { std::cout << "Base::func2()" << std::endl; }
 True void nonVirtual() { std::cout << "Base::nonVirtual()" << std::endl; }
 True};
 True
 True// 派生类
 Trueclass Derived : public Base {
 Truepublic:
 True void func1() override { std::cout << "Derived::func1()" << std::endl; }
 True // func2() 继承自 Base
 True void nonVirtual() { std::cout << "Derived::nonVirtual()" << std::endl; }
 True};
 True
 Trueint main() {
 True Base* b = new Derived();
 True b->func1(); // 调用 Derived::func1()（多态，运行时绑定）
 True b->func2(); // 调用 Base::func2()（多态，运行时绑定）
 True b->nonVirtual(); // 调用 Base::nonVirtual()（非虚函数，编译时绑定）
 True delete b;
 True return 0;
 True}
 True```

 False## 5. 虚函数与虚函数表 (VTable)
 False
 False### 5.1 虚函数
 False
 False虚函数是在基类中声明的，允许派生类覆盖的函数。虚函数是实现动态多态的核心机制。
 False
```cpp
 Trueclass Base {
 Truepublic:
 True virtual void func() {
 True std::cout << "Base::func()" << std::endl;
 True }
 True
 True virtual void anotherFunc() {
 True std::cout << "Base::anotherFunc()" << std::endl;
 True }
 True
 True virtual ~Base() {}
 True};
 True
 Trueclass Derived : public Base {
 Truepublic:
 True void func() override {
 True std::cout << "Derived::func()" << std::endl;
 True }
 True // anotherFunc() 继承自 Base
 True};
 True
 Trueclass Derived2 : public Base {
 Truepublic:
 True void func() override {
 True std::cout << "Derived2::func()" << std::endl;
 True }
 True
 True void anotherFunc() override {
 True std::cout << "Derived2::anotherFunc()" << std::endl;
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True Base* b1 = new Base();
 True Base* b2 = new Derived();
 True Base* b3 = new Derived2();
 True
 True b1->func(); // Base::func()
 True b1->anotherFunc(); // Base::anotherFunc()
 True
 True b2->func(); // Derived::func()
 True b2->anotherFunc(); // Base::anotherFunc()
 True
 True b3->func(); // Derived2::func()
 True b3->anotherFunc(); // Derived2::anotherFunc()
 True
 True delete b1;
 True delete b2;
 True delete b3;
 True
 True return 0;
 True}
 True```

 False### 5.2 虚函数表
 False
 False虚函数表（VTable）是实现动态多态的关键机制。
 False
 False- **虚函数表**：每个包含虚函数的类都有一个虚函数表，存储了该类所有虚函数的地址。
 False- **虚指针（vptr）**：每个对象都有一个虚指针，指向该类的虚函数表。
 False- **运行时绑定**：当通过基类指针或引用调用虚函数时，会通过虚指针找到虚函数表，然后调用相应的函数。
 False
 False### 5.3 虚函数表原理
 False
```cpp
 True// 基类
 Trueclass Base {
 Truepublic:
 True virtual void func1() { std::cout << "Base::func1()" << std::endl; }
 True virtual void func2() { std::cout << "Base::func2()" << std::endl; }
 True void nonVirtual() { std::cout << "Base::nonVirtual()" << std::endl; }
 True};
 True
 True// 派生类
 Trueclass Derived : public Base {
 Truepublic:
 True void func1() override { std::cout << "Derived::func1()" << std::endl; }
 True // func2() 继承自 Base
 True void nonVirtual() { std::cout << "Derived::nonVirtual()" << std::endl; }
 True};
 True
 Trueint main() {
 True Base* b = new Derived();
 True b->func1(); // 调用 Derived::func1()（多态，运行时绑定）
 True b->func2(); // 调用 Base::func2()（多态，运行时绑定）
 True b->nonVirtual(); // 调用 Base::nonVirtual()（非虚函数，编译时绑定）
 True delete b;
 True return 0;
 True}
 True```

 False### 5.4 虚函数表的结构
 False
 False虚函数表是一个函数指针数组，存储了类的虚函数地址。当派生类覆盖基类的虚函数时，会在自己的虚函数表中替换对应的函数指针。
 False
```cpp
 True// 基类虚函数表
 True// Base VTable:
 True// [0] -> Base::func1()
 True// [1] -> Base::func2()
 True
 True// 派生类虚函数表
 True// Derived VTable:
 True// [0] -> Derived::func1() // 覆盖基类的func1()
 True// [1] -> Base::func2() // 继承基类的func2()
 True```

 False### 5.5 虚函数的性能影响
 False
 False虚函数调用比普通函数调用慢，因为需要通过虚指针和虚函数表进行间接调用。但这种开销通常很小，对于大多数应用来说可以忽略不计。
 False
 False### 5.6 虚函数的使用注意事项
 False
 False1. **虚析构函数**：基类的析构函数应该声明为虚函数，以确保派生类的析构函数被正确调用。
 False2. **虚函数与构造函数**：构造函数不能是虚函数，因为在构造对象时，虚函数表还未完全建立。
 False3. **虚函数与内联函数**：虚函数通常不能被内联，因为需要运行时绑定。
 False4. **虚函数与静态函数**：静态函数不能是虚函数，因为静态函数属于类而不是对象。
 False5. **虚函数与私有成员**：私有虚函数也可以被派生类覆盖，但派生类无法直接调用基类的私有虚函数。
 False
```cpp
 Trueclass Base {
 Trueprivate:
 True virtual void privateFunc() {
 True std::cout << "Base::privateFunc()" << std::endl;
 True }
 True
 Truepublic:
 True void publicFunc() {
 True privateFunc(); // 可以调用私有虚函数
 True }
 True};
 True
 Trueclass Derived : public Base {
 Trueprivate:
 True void privateFunc() override {
 True std::cout << "Derived::privateFunc()" << std::endl;
 True }
 True};
 True
 Trueint main() {
 True Base* b = new Derived();
 True b->publicFunc(); // 调用 Derived::privateFunc()
 True delete b;
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_104 拆分，专注于面向对象基础（类与对象、封装、继承、多态、虚函数）。
 False