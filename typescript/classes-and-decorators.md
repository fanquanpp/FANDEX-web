# 类与装饰器 (Classes & Decorators)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: TS Advanced
 False> @Description: 类成员访问修饰符、抽象类、静态成员及装饰器原理。 | Access modifiers, Abstract classes, Statics, and Decorators.
 False
 False---
 False
 False## 目录
 False
 False1. [类成员修饰符](#类成员修饰符)
 False2. [构造函数简写](#构造函数简写)
 False3. [抽象类](#抽象类)
 False4. [静态成员](#静态成员)
 False5. [类的存取器](#类的存取器)
 False6. [装饰器](#装饰器)
 False7. [类的继承与多态](#类的继承与多态)
 False8. [类的高级特性](#类的高级特性)
 False9. [最佳实践](#最佳实践)
 False10. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 类成员修饰符 (Access Modifiers)
 False
 FalseTypeScript 提供了四种访问修饰符，用于控制类成员的访问权限：
 False
 False### 1.1 访问修饰符详解
 False
 False| 修饰符 | 说明 | 可访问范围 |
 False| :--- | :--- | :--- |
 False| **`public`** | 默认修饰符，公共成员 | 任何位置都可以访问 |
 False| **`private`** | 私有成员 | 仅在类内部可以访问 |
 False| **`protected`** | 受保护成员 | 类内部和子类中可以访问 |
 False| **`readonly`** | 只读成员 | 仅在构造函数中初始化，之后不可修改 |
 False
 False### 1.2 访问修饰符使用示例
 False
```typescript
 Trueclass Person {
 True // 公共成员
 True public name: string;
 True 
 True // 私有成员
 True private age: number;
 True 
 True // 受保护成员
 True protected gender: string;
 True 
 True // 只读成员
 True readonly id: number;
 True 
 True constructor(name: string, age: number, gender: string, id: number) {
 True this.name = name;
 True this.age = age;
 True this.gender = gender;
 True this.id = id;
 True }
 True 
 True // 类内部可以访问所有成员
 True public getInfo(): string {
 True return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ID: ${this.id}`;
 True }
 True 
 True // 私有方法
 True private calculateBirthYear(): number {
 True const currentYear = new Date().getFullYear();
 True return currentYear - this.age;
 True }
 True 
 True // 公共方法访问私有方法
 True public getBirthYear(): number {
 True return this.calculateBirthYear();
 True }
 True}
 True
 True// 使用示例
 Trueconst person = new Person("Alice", 30, "female", 12345);
 Trueconsole.log(person.name); // 可以访问，输出: Alice
 True// console.log(person.age); // 编译错误，私有成员不能在类外部访问
 True// console.log(person.gender); // 编译错误，受保护成员不能在类外部访问
 Trueconsole.log(person.id); // 可以访问，输出: 12345
 True// person.id = 67890; // 编译错误，只读成员不能修改
 Trueconsole.log(person.getInfo()); // 可以访问，输出: Name: Alice, Age: 30, Gender: female, ID: 12345
 Trueconsole.log(person.getBirthYear()); // 可以访问，输出: 1994（假设当前年份为2024）
 True
 True// 子类继承
 Trueclass Employee extends Person {
 True constructor(name: string, age: number, gender: string, id: number, public position: string) {
 True super(name, age, gender, id);
 True }
 True 
 True // 子类可以访问受保护成员
 True public getEmployeeInfo(): string {
 True return `${this.getInfo()}, Position: ${this.position}, Gender: ${this.gender}`;
 True }
 True 
 True // 子类不能访问私有成员
 True // public getAge(): number {
 True // return this.age; // 编译错误
 True // }
 True}
 True
 Trueconst employee = new Employee("Bob", 25, "male", 67890, "Developer");
 Trueconsole.log(employee.name); // 可以访问
 Trueconsole.log(employee.position); // 可以访问
 Trueconsole.log(employee.getEmployeeInfo()); // 可以访问，输出包含 gender
 True// console.log(employee.gender); // 编译错误，受保护成员不能在类外部访问
 True```

 False### 1.3 访问修饰符的最佳实践
 False
 False- **最小权限原则**: 尽量使用最严格的访问修饰符，只暴露必要的成员。
 False- **封装性**: 使用 `private` 修饰符隐藏内部实现细节。
 False- **继承设计**: 使用 `protected` 修饰符允许子类访问必要的成员。
 False- **不可变性**: 使用 `readonly` 修饰符确保成员在初始化后不被修改。
 False- **代码可读性**: 明确指定访问修饰符，提高代码可读性。
 False
 False## 2. 构造函数简写
 False
 FalseTypeScript 提供了构造函数简写语法，可以在构造函数参数中直接声明类成员，简化代码。
 False
 False### 2.1 基本用法
 False
```typescript
 True// 传统写法
 Trueclass User {
 True public name: string;
 True private age: number;
 True 
 True constructor(name: string, age: number) {
 True this.name = name;
 True this.age = age;
 True }
 True}
 True
 True// 构造函数简写
 Trueclass User {
 True constructor(public name: string, private age: number) {}
 True}
 True
 True// 使用示例
 Trueconst user = new User("Alice", 30);
 Trueconsole.log(user.name); // 输出: Alice
 True// console.log(user.age); // 编译错误，私有成员
 True```

 False### 2.2 构造函数简写与访问修饰符
 False
```typescript
 Trueclass Product {
 True constructor(
 True public id: number,
 True public name: string,
 True private price: number,
 True protected stock: number,
 True readonly category: string
 True ) {}
 True 
 True public getPrice(): number {
 True return this.price;
 True }
 True 
 True public getStock(): number {
 True return this.stock;
 True }
 True}
 True
 True// 使用示例
 Trueconst product = new Product(1, "Laptop", 999.99, 50, "Electronics");
 Trueconsole.log(product.id); // 输出: 1
 Trueconsole.log(product.name); // 输出: Laptop
 Trueconsole.log(product.category); // 输出: Electronics
 True// product.category = "Computers"; // 编译错误，只读
 Trueconsole.log(product.getPrice()); // 输出: 999.99
 Trueconsole.log(product.getStock()); // 输出: 50
 True```

 False### 2.3 构造函数简写与默认值
 False
```typescript
 Trueclass Person {
 True constructor(
 True public name: string,
 True public age: number = 18,
 True private isActive: boolean = true
 True ) {}
 True 
 True public getStatus(): string {
 True return this.isActive ? "Active" : "Inactive";
 True }
 True}
 True
 True// 使用示例
 Trueconst person1 = new Person("Alice", 30);
 Trueconsole.log(person1.name); // 输出: Alice
 Trueconsole.log(person1.age); // 输出: 30
 Trueconsole.log(person1.getStatus()); // 输出: Active
 True
 Trueconst person2 = new Person("Bob");
 Trueconsole.log(person2.name); // 输出: Bob
 Trueconsole.log(person2.age); // 输出: 18（使用默认值）
 Trueconsole.log(person2.getStatus()); // 输出: Active（使用默认值）
 True```

 False## 3. 抽象类 (Abstract Classes)
 False
 False抽象类是一种不能直接实例化的类，主要用于作为其他类的基类，定义共同的接口和行为。
 False
 False### 3.1 基本概念
 False
 False- **抽象类**: 使用 `abstract` 关键字声明，不能直接实例化。
 False- **抽象方法**: 使用 `abstract` 关键字声明，没有具体实现，必须在子类中实现。
 False- **具体方法**: 抽象类中可以包含具体实现的方法。
 False
 False### 3.2 抽象类使用示例
 False
```typescript
 True// 抽象基类
 Trueabstract class Shape {
 True // 抽象方法
 True abstract getArea(): number;
 True 
 True // 抽象方法
 True abstract getPerimeter(): number;
 True 
 True // 具体方法
 True public printInfo(): void {
 True console.log(`Area: ${this.getArea()}, Perimeter: ${this.getPerimeter()}`);
 True }
 True}
 True
 True// 实现抽象类
 Trueclass Circle extends Shape {
 True constructor(private radius: number) {
 True super();
 True }
 True 
 True // 实现抽象方法
 True getArea(): number {
 True return Math.PI * this.radius * this.radius;
 True }
 True 
 True // 实现抽象方法
 True getPerimeter(): number {
 True return 2 * Math.PI * this.radius;
 True }
 True}
 True
 Trueclass Rectangle extends Shape {
 True constructor(private width: number, private height: number) {
 True super();
 True }
 True 
 True // 实现抽象方法
 True getArea(): number {
 True return this.width * this.height;
 True }
 True 
 True // 实现抽象方法
 True getPerimeter(): number {
 True return 2 * (this.width + this.height);
 True }
 True}
 True
 True// 使用示例
 Trueconst circle = new Circle(5);
 Trueconsole.log(circle.getArea()); // 输出: 78.53981633974483
 Trueconsole.log(circle.getPerimeter()); // 输出: 31.41592653589793
 Truecircle.printInfo(); // 输出: Area: 78.53981633974483, Perimeter: 31.41592653589793
 True
 Trueconst rectangle = new Rectangle(4, 6);
 Trueconsole.log(rectangle.getArea()); // 输出: 24
 Trueconsole.log(rectangle.getPerimeter()); // 输出: 20
 Truerectangle.printInfo(); // 输出: Area: 24, Perimeter: 20
 True
 True// 错误示例：抽象类不能直接实例化
 True// const shape = new Shape(); // 编译错误
 True```

 False### 3.3 抽象类与接口的区别
 False
 False| 特性 | 抽象类 | 接口 |
 False| :--- | :--- | :--- |
 False| **实现** | 可以包含具体实现 | 只能定义方法签名，不能包含实现 |
 False| **访问修饰符** | 可以使用访问修饰符 | 所有成员默认为 public |
 False| **构造函数** | 可以有构造函数 | 不能有构造函数 |
 False| **继承** | 只能继承一个抽象类 | 可以实现多个接口 |
 False| **字段** | 可以包含实例字段 | 不能包含实例字段（TypeScript 2.7+ 可以定义 readonly 字段） |
 False
 False### 3.4 抽象类的最佳实践
 False
 False- **定义共同行为**: 使用抽象类定义一组相关类的共同行为和接口。
 False- **强制实现**: 通过抽象方法强制子类实现特定功能。
 False- **代码复用**: 在抽象类中实现共同的逻辑，子类可以直接使用。
 False- **层次结构**: 使用抽象类创建清晰的类层次结构。
 False
 False## 4. 静态成员
 False
 False静态成员属于类本身，而不是类的实例，可以通过类名直接访问。
 False
 False### 4.1 静态属性和方法
 False
```typescript
 Trueclass MathUtils {
 True // 静态属性
 True static PI: number = 3.14159;
 True 
 True // 静态方法
 True static add(a: number, b: number): number {
 True return a + b;
 True }
 True 
 True static multiply(a: number, b: number): number {
 True return a * b;
 True }
 True 
 True // 静态方法调用静态属性
 True static calculateCircleArea(radius: number): number {
 True return this.PI * radius * radius;
 True }
 True}
 True
 True// 使用示例
 Trueconsole.log(MathUtils.PI); // 输出: 3.14159
 Trueconsole.log(MathUtils.add(5, 3)); // 输出: 8
 Trueconsole.log(MathUtils.multiply(4, 6)); // 输出: 24
 Trueconsole.log(MathUtils.calculateCircleArea(5)); // 输出: 78.53975
 True
 True// 错误示例：静态成员不能通过实例访问
 True// const math = new MathUtils();
 True// console.log(math.PI); // 编译错误
 True```

 False### 4.2 静态成员与实例成员
 False
```typescript
 Trueclass Counter {
 True // 静态属性
 True static count: number = 0;
 True 
 True // 实例属性
 True private id: number;
 True 
 True constructor() {
 True // 访问静态属性
 True Counter.count++;
 True this.id = Counter.count;
 True }
 True 
 True // 实例方法
 True public getId(): number {
 True return this.id;
 True }
 True 
 True // 静态方法
 True static getTotalCount(): number {
 True return Counter.count;
 True }
 True}
 True
 True// 使用示例
 Trueconst counter1 = new Counter();
 Trueconsole.log(counter1.getId()); // 输出: 1
 Trueconsole.log(Counter.getTotalCount()); // 输出: 1
 True
 Trueconst counter2 = new Counter();
 Trueconsole.log(counter2.getId()); // 输出: 2
 Trueconsole.log(Counter.getTotalCount()); // 输出: 2
 True
 Trueconst counter3 = new Counter();
 Trueconsole.log(counter3.getId()); // 输出: 3
 Trueconsole.log(Counter.getTotalCount()); // 输出: 3
 True```

 False### 4.3 静态成员的最佳实践
 False
 False- **工具方法**: 使用静态方法实现不依赖实例状态的工具函数。
 False- **常量定义**: 使用静态属性定义类级别的常量。
 False- **共享状态**: 使用静态属性在类的所有实例之间共享状态。
 False- **命名空间**: 使用静态成员创建命名空间，组织相关功能。
 False
 False## 5. 类的存取器 (Getters & Setters)
 False
 False存取器允许我们控制对类属性的访问和修改，提供了一种封装属性的方式。
 False
 False### 5.1 基本用法
 False
```typescript
 Trueclass Person {
 True private _name: string;
 True private _age: number;
 True 
 True constructor(name: string, age: number) {
 True this._name = name;
 True this._age = age;
 True }
 True 
 True // getter
 True get name(): string {
 True return this._name;
 True }
 True 
 True // setter
 True set name(value: string) {
 True if (value.length > 0) {
 True this._name = value;
 True } else {
 True throw new Error("Name cannot be empty");
 True }
 True }
 True 
 True // getter
 True get age(): number {
 True return this._age;
 True }
 True 
 True // setter
 True set age(value: number) {
 True if (value >= 0 && value <= 120) {
 True this._age = value;
 True } else {
 True throw new Error("Age must be between 0 and 120");
 True }
 True }
 True}
 True
 True// 使用示例
 Trueconst person = new Person("Alice", 30);
 Trueconsole.log(person.name); // 输出: Alice
 Trueconsole.log(person.age); // 输出: 30
 True
 True// 使用 setter 修改属性
 Trueperson.name = "Bob";
 Trueperson.age = 25;
 Trueconsole.log(person.name); // 输出: Bob
 Trueconsole.log(person.age); // 输出: 25
 True
 True// 错误示例：无效的输入
 True// person.name = ""; // 抛出错误: Name cannot be empty
 True// person.age = 150; // 抛出错误: Age must be between 0 and 120
 True```

 False### 5.2 存取器与访问修饰符
 False
```typescript
 Trueclass Product {
 True private _price: number;
 True 
 True constructor(private _id: number, private _name: string, price: number) {
 True this._price = price;
 True }
 True 
 True // 只读属性（只有 getter）
 True get id(): number {
 True return this._id;
 True }
 True 
 True // 只读属性（只有 getter）
 True get name(): string {
 True return this._name;
 True }
 True 
 True // 可读写属性（有 getter 和 setter）
 True get price(): number {
 True return this._price;
 True }
 True 
 True set price(value: number) {
 True if (value > 0) {
 True this._price = value;
 True } else {
 True throw new Error("Price must be positive");
 True }
 True }
 True}
 True
 True// 使用示例
 Trueconst product = new Product(1, "Laptop", 999.99);
 Trueconsole.log(product.id); // 输出: 1
 Trueconsole.log(product.name); // 输出: Laptop
 Trueconsole.log(product.price); // 输出: 999.99
 True
 True// 修改价格
 Trueproduct.price = 899.99;
 Trueconsole.log(product.price); // 输出: 899.99
 True
 True// 错误示例：尝试修改只读属性
 True// product.id = 2; // 编译错误
 True// product.name = "Desktop"; // 编译错误
 True```

 False### 5.3 存取器的最佳实践
 False
 False- **数据验证**: 在 setter 中添加数据验证逻辑，确保属性值的有效性。
 False- **封装性**: 使用存取器封装内部状态，只暴露必要的接口。
 False- **只读属性**: 对于不需要修改的属性，只提供 getter。
 False- **计算属性**: 使用 getter 实现计算属性，根据其他属性动态计算值。
 False
 False## 6. 装饰器 (Decorators)
 False
 False装饰器是 TypeScript 的一个实验性特性，允许我们修改类、方法、属性和参数的行为。
 False
 False### 6.1 装饰器的基本概念
 False
 False- **装饰器**是一个函数，用于修改类、方法、属性或参数的行为。
 False- **装饰器语法**使用 `@` 符号，后面跟着装饰器函数名。
 False- **装饰器执行时机**：在类定义时执行，而不是在实例化时执行。
 False- **启用装饰器**：需要在 tsconfig.json 中开启 `experimentalDecorators` 选项。
 False
 False### 6.2 装饰器的类型
 False
 FalseTypeScript 支持四种类型的装饰器：
 False
 False1. **类装饰器**：应用于类声明
 False2. **方法装饰器**：应用于类方法
 False3. **属性装饰器**：应用于类属性
 False4. **参数装饰器**：应用于方法参数
 False
 False### 6.3 类装饰器
 False
 False类装饰器接收一个参数：目标类的构造函数。
 False
```typescript
 True// 类装饰器
 Truefunction sealed(constructor: Function) {
 True Object.seal(constructor);
 True Object.seal(constructor.prototype);
 True console.log(`Class ${constructor.name} has been sealed`);
 True}
 True
 True// 带参数的类装饰器
 Truefunction logClass(prefix: string) {
 True return function(constructor: Function) {
 True console.log(`${prefix}: ${constructor.name} class defined`);
 True };
 True}
 True
 True// 使用类装饰器
 True@logClass("INFO")
 True@sealed
 Trueclass Person {
 True constructor(public name: string, public age: number) {}
 True 
 True public greet(): string {
 True return `Hello, my name is ${this.name}`;
 True }
 True}
 True
 True// 使用示例
 Trueconst person = new Person("Alice", 30);
 Trueconsole.log(person.greet()); // 输出: Hello, my name is Alice
 True
 True// 尝试修改类（由于 sealed 装饰器，会失败）
 True// Person.prototype.newMethod = function() {}; // 在严格模式下会抛出错误
 True```

 False### 6.4 方法装饰器
 False
 False方法装饰器接收三个参数：
 False
 False1. 目标对象（对于静态方法是类构造函数，对于实例方法是类原型）
 False2. 方法名
 False3. 方法的属性描述符
 False
```typescript
 True// 方法装饰器
 Truefunction logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
 True const originalMethod = descriptor.value;
 True 
 True descriptor.value = function(...args: any[]) {
 True console.log(`Method ${key} called with args: ${JSON.stringify(args)}`);
 True const result = originalMethod.apply(this, args);
 True console.log(`Method ${key} returned: ${JSON.stringify(result)}`);
 True return result;
 True };
 True 
 True return descriptor;
 True}
 True
 True// 带参数的方法装饰器
 Truefunction measureTime(unit: "ms" | "s" = "ms") {
 True return function(target: any, key: string, descriptor: PropertyDescriptor) {
 True const originalMethod = descriptor.value;
 True 
 True descriptor.value = function(...args: any[]) {
 True const start = performance.now();
 True const result = originalMethod.apply(this, args);
 True const end = performance.now();
 True const duration = end - start;
 True const formattedDuration = unit === "s" ? duration / 1000 : duration;
 True console.log(`Method ${key} took ${formattedDuration} ${unit}`);
 True return result;
 True };
 True 
 True return descriptor;
 True };
 True}
 True
 Trueclass Calculator {
 True @logMethod
 True add(a: number, b: number): number {
 True return a + b;
 True }
 True 
 True @measureTime("s")
 True fibonacci(n: number): number {
 True if (n <= 1) return n;
 True return this.fibonacci(n - 1) + this.fibonacci(n - 2);
 True }
 True}
 True
 True// 使用示例
 Trueconst calculator = new Calculator();
 Trueconsole.log(calculator.add(5, 3)); // 输出: 8
 Trueconsole.log(calculator.fibonacci(30)); // 输出斐波那契数并显示执行时间
 True```

 False### 6.5 属性装饰器
 False
 False属性装饰器接收两个参数：
 False
 False1. 目标对象（对于静态属性是类构造函数，对于实例属性是类原型）
 False2. 属性名
 False
```typescript
 True// 属性装饰器
 Truefunction logProperty(target: any, key: string) {
 True let value = target[key];
 True 
 True // 定义 getter
 True const getter = function() {
 True console.log(`Getting ${key}: ${value}`);
 True return value;
 True };
 True 
 True // 定义 setter
 True const setter = function(newValue: any) {
 True console.log(`Setting ${key} from ${value} to ${newValue}`);
 True value = newValue;
 True };
 True 
 True // 重新定义属性
 True Object.defineProperty(target, key, {
 True get: getter,
 True set: setter,
 True enumerable: true,
 True configurable: true
 True });
 True}
 True
 Trueclass Person {
 True @logProperty
 True public name: string;
 True 
 True @logProperty
 True public age: number;
 True 
 True constructor(name: string, age: number) {
 True this.name = name;
 True this.age = age;
 True }
 True}
 True
 True// 使用示例
 Trueconst person = new Person("Alice", 30);
 Trueconsole.log(person.name); // 输出: Getting name: Alice
 Trueperson.name = "Bob"; // 输出: Setting name from Alice to Bob
 Trueconsole.log(person.age); // 输出: Getting age: 30
 Trueperson.age = 25; // 输出: Setting age from 30 to 25
 True```

 False### 6.6 参数装饰器
 False
 False参数装饰器接收三个参数：
 False
 False1. 目标对象（对于静态方法是类构造函数，对于实例方法是类原型）
 False2. 方法名
 False3. 参数在方法参数列表中的索引
 False
```typescript
 True// 参数装饰器
 Truefunction logParameter(target: any, key: string, index: number) {
 True console.log(`Parameter decorator applied to ${key} at index ${index}`);
 True}
 True
 Trueclass UserService {
 True getUser(@logParameter id: number, @logParameter name: string): string {
 True return `User: ${name} (ID: ${id})`;
 True }
 True}
 True
 True// 使用示例
 Trueconst userService = new UserService();
 Trueconsole.log(userService.getUser(1, "Alice")); // 输出: User: Alice (ID: 1)
 True```

 False### 6.7 装饰器的执行顺序
 False
 False多个装饰器应用于同一个声明时，执行顺序如下：
 False
 False1. **参数装饰器**：从左到右执行
 False2. **方法装饰器**：从右到左执行
 False3. **属性装饰器**：从右到左执行
 False4. **类装饰器**：从右到左执行
 False
```typescript
 Truefunction decorator1() {
 True console.log("Decorator 1 applied");
 True return function(target: any, key?: string, descriptor?: PropertyDescriptor) {
 True console.log("Decorator 1 executed");
 True };
 True}
 True
 Truefunction decorator2() {
 True console.log("Decorator 2 applied");
 True return function(target: any, key?: string, descriptor?: PropertyDescriptor) {
 True console.log("Decorator 2 executed");
 True };
 True}
 True
 True@decorator1()
 True@decorator2()
 Trueclass Example {
 True @decorator1()
 True @decorator2()
 True public property: string;
 True 
 True @decorator1()
 True @decorator2()
 True public method(@decorator1() @decorator2() param: string): void {
 True }
 True 
 True constructor() {
 True this.property = "test";
 True }
 True}
 True
 True// 执行顺序：
 True// Decorator 2 applied
 True// Decorator 1 applied
 True// Decorator 2 applied
 True// Decorator 1 applied
 True// Decorator 2 applied
 True// Decorator 1 applied
 True// Parameter decorator applied to method at index 0 (decorator2)
 True// Parameter decorator applied to method at index 0 (decorator1)
 True// Decorator 2 executed (method)
 True// Decorator 1 executed (method)
 True// Decorator 2 executed (property)
 True// Decorator 1 executed (property)
 True// Decorator 2 executed (class)
 True// Decorator 1 executed (class)
 True```

 False### 6.8 装饰器的应用场景
 False
 False装饰器在以下场景中特别有用：
 False
 False1. **日志记录**：记录方法调用、参数和返回值
 False2. **性能监控**：测量方法执行时间
 False3. **权限控制**：检查用户权限
 False4. **数据验证**：验证方法参数和属性值
 False5. **依赖注入**：自动注入依赖项
 False6. **缓存**：缓存方法结果
 False7. **错误处理**：统一处理方法执行过程中的错误
 False
 False### 6.9 装饰器的最佳实践
 False
 False- **明确目的**：装饰器应该有明确的职责，不要过度使用。
 False- **保持简洁**：装饰器逻辑应该简洁明了，避免复杂的实现。
 False- **可组合性**：设计装饰器时考虑可组合性，允许多个装饰器一起使用。
 False- **性能考虑**：装饰器在类定义时执行，避免在装饰器中执行耗时操作。
 False- **文档化**：为装饰器添加清晰的文档，说明其用途和使用方法。
 False
 False## 7. 类的继承与多态
 False
 FalseTypeScript 支持类的继承，允许子类继承父类的属性和方法。
 False
 False### 7.1 基本继承
 False
```typescript
 Trueclass Animal {
 True constructor(public name: string) {}
 True 
 True public makeSound(): void {
 True console.log(`${this.name} makes a sound`);
 True }
 True 
 True public move(): void {
 True console.log(`${this.name} moves`);
 True }
 True}
 True
 Trueclass Dog extends Animal {
 True constructor(name: string, public breed: string) {
 True super(name); // 调用父类构造函数
 True }
 True 
 True // 重写父类方法
 True public makeSound(): void {
 True console.log(`${this.name} barks`);
 True }
 True 
 True // 新增方法
 True public fetch(): void {
 True console.log(`${this.name} fetches a ball`);
 True }
 True}
 True
 Trueclass Cat extends Animal {
 True constructor(name: string, public color: string) {
 True super(name);
 True }
 True 
 True // 重写父类方法
 True public makeSound(): void {
 True console.log(`${this.name} meows`);
 True }
 True 
 True // 新增方法
 True public climb(): void {
 True console.log(`${this.name} climbs a tree`);
 True }
 True}
 True
 True// 使用示例
 Trueconst dog = new Dog("Buddy", "Golden Retriever");
 Truedog.makeSound(); // 输出: Buddy barks
 Truedog.move(); // 输出: Buddy moves
 Truedog.fetch(); // 输出: Buddy fetches a ball
 True
 Trueconst cat = new Cat("Whiskers", "Tabby");
 Truecat.makeSound(); // 输出: Whiskers meows
 Truecat.move(); // 输出: Whiskers moves
 Truecat.climb(); // 输出: Whiskers climbs a tree
 True
 True// 多态
 Trueconst animals: Animal[] = [dog, cat];
 Trueanimals.forEach(animal => {
 True animal.makeSound(); // 调用各自子类的实现
 True animal.move();
 True});
 True```

 False### 7.2 方法重写与 super 关键字
 False
```typescript
 Trueclass Vehicle {
 True constructor(public brand: string, public model: string) {}
 True 
 True public start(): void {
 True console.log(`${this.brand} ${this.model} starts`);
 True }
 True 
 True public drive(): void {
 True console.log(`${this.brand} ${this.model} drives`);
 True }
 True}
 True
 Trueclass Car extends Vehicle {
 True constructor(brand: string, model: string, public numberOfDoors: number) {
 True super(brand, model);
 True }
 True 
 True // 重写父类方法并调用父类实现
 True public start(): void {
 True super.start(); // 调用父类的 start 方法
 True console.log(`Car with ${this.numberOfDoors} doors is ready`);
 True }
 True 
 True // 新增方法
 True public honk(): void {
 True console.log(`${this.brand} ${this.model} honks`);
 True }
 True}
 True
 True// 使用示例
 Trueconst car = new Car("Toyota", "Corolla", 4);
 Truecar.start(); // 输出: Toyota Corolla starts, Car with 4 doors is ready
 Truecar.drive(); // 输出: Toyota Corolla drives
 Truecar.honk(); // 输出: Toyota Corolla honks
 True```

 False### 7.3 多态的应用
 False
```typescript
 Trueinterface Shape {
 True getArea(): number;
 True}
 True
 Trueclass Circle implements Shape {
 True constructor(private radius: number) {}
 True 
 True getArea(): number {
 True return Math.PI * this.radius * this.radius;
 True }
 True}
 True
 Trueclass Rectangle implements Shape {
 True constructor(private width: number, private height: number) {}
 True 
 True getArea(): number {
 True return this.width * this.height;
 True }
 True}
 True
 Trueclass Triangle implements Shape {
 True constructor(private base: number, private height: number) {}
 True 
 True getArea(): number {
 True return 0.5 * this.base * this.height;
 True }
 True}
 True
 True// 使用多态
 Truefunction calculateTotalArea(shapes: Shape[]): number {
 True return shapes.reduce((total, shape) => total + shape.getArea(), 0);
 True}
 True
 True// 使用示例
 Trueconst shapes: Shape[] = [
 True new Circle(5),
 True new Rectangle(4, 6),
 True new Triangle(3, 8)
 True];
 True
 Trueconsole.log(`Total area: ${calculateTotalArea(shapes)}`); // 输出: Total area: 78.53981633974483 + 24 + 12 = 114.53981633974483
 True```

 False## 8. 类的高级特性
 False
 False### 8.1 类的混入 (Mixins)
 False
 False混入是一种在 TypeScript 中实现多重继承的方式，允许我们将多个类的功能组合到一个类中。
 False
```typescript
 True// 定义混入
 Truefunction CanEat<T extends new (...args: any[]) => {}>(Base: T) {
 True return class extends Base {
 True eat(): void {
 True console.log("Eating");
 True }
 True };
 True}
 True
 Truefunction CanSleep<T extends new (...args: any[]) => {}>(Base: T) {
 True return class extends Base {
 True sleep(): void {
 True console.log("Sleeping");
 True }
 True };
 True}
 True
 True// 基础类
 Trueclass Animal {
 True constructor(public name: string) {}
 True}
 True
 True// 应用混入
 Trueconst LivingAnimal = CanSleep(CanEat(Animal));
 True
 True// 使用示例
 Trueconst animal = new LivingAnimal("Buddy");
 Trueconsole.log(animal.name); // 输出: Buddy
 Trueanimal.eat(); // 输出: Eating
 Trueanimal.sleep(); // 输出: Sleeping
 True```

 False### 8.2 类的静态工厂方法
 False
 False静态工厂方法是一种创建类实例的设计模式，提供了一种更灵活的创建对象的方式。
 False
```typescript
 Trueclass Person {
 True private constructor(public name: string, public age: number) {}
 True 
 True // 静态工厂方法
 True static createAdult(name: string): Person {
 True return new Person(name, 18);
 True }
 True 
 True // 静态工厂方法
 True static createChild(name: string, age: number): Person {
 True if (age < 18) {
 True return new Person(name, age);
 True }
 True throw new Error("Child must be under 18");
 True }
 True 
 True // 静态工厂方法
 True static fromObject(obj: { name: string; age: number }): Person {
 True return new Person(obj.name, obj.age);
 True }
 True}
 True
 True// 使用示例
 Trueconst adult = Person.createAdult("Alice");
 Trueconsole.log(adult.name, adult.age); // 输出: Alice 18
 True
 Trueconst child = Person.createChild("Bob", 10);
 Trueconsole.log(child.name, child.age); // 输出: Bob 10
 True
 Trueconst personFromObject = Person.fromObject({ name: "Charlie", age: 25 });
 Trueconsole.log(personFromObject.name, personFromObject.age); // 输出: Charlie 25
 True
 True// 错误示例：私有构造函数不能直接调用
 True// const person = new Person("Dave", 30); // 编译错误
 True```

 False### 8.3 类的单例模式
 False
 False单例模式确保一个类只有一个实例，并提供一个全局访问点。
 False
```typescript
 Trueclass Singleton {
 True private static instance: Singleton;
 True 
 True // 私有构造函数
 True private constructor() {}
 True 
 True // 静态方法获取实例
 True static getInstance(): Singleton {
 True if (!Singleton.instance) {
 True Singleton.instance = new Singleton();
 True }
 True return Singleton.instance;
 True }
 True 
 True public doSomething(): void {
 True console.log("Doing something...");
 True }
 True}
 True
 True// 使用示例
 Trueconst instance1 = Singleton.getInstance();
 Trueconst instance2 = Singleton.getInstance();
 True
 Trueconsole.log(instance1 === instance2); // 输出: true（两个变量引用同一个实例）
 True
 Trueinstance1.doSomething(); // 输出: Doing something...
 Trueinstance2.doSomething(); // 输出: Doing something...
 True
 True// 错误示例：私有构造函数不能直接调用
 True// const instance = new Singleton(); // 编译错误
 True```

 False## 9. 最佳实践
 False
 False### 9.1 类的设计原则
 False
 False- **单一职责原则**: 一个类应该只负责一项功能。
 False- **开放封闭原则**: 类应该对扩展开放，对修改封闭。
 False- **里氏替换原则**: 子类应该能够替换父类，而不影响程序的正确性。
 False- **依赖倒置原则**: 依赖于抽象，而不是具体实现。
 False- **接口隔离原则**: 客户端不应该依赖于它不使用的接口。
 False
 False### 9.2 代码风格建议
 False
 False- **命名规范**: 类名使用 PascalCase，属性和方法使用 camelCase。
 False- **访问修饰符**: 明确指定访问修饰符，不要依赖默认值。
 False- **构造函数**: 使用构造函数简写语法，减少样板代码。
 False- **方法长度**: 保持方法简短，每个方法只负责一项功能。
 False- **注释**: 为复杂的类和方法添加注释，说明其用途和实现细节。
 False
 False### 9.3 性能优化
 False
 False- **避免过度继承**: 继承层次不宜过深，避免钻石继承问题。
 False- **合理使用抽象类**: 只在需要强制子类实现特定方法时使用抽象类。
 False- **静态成员**: 对于不依赖实例状态的方法和属性，使用静态成员。
 False- **装饰器性能**: 避免在装饰器中执行耗时操作，因为装饰器在类定义时执行。
 False- **内存管理**: 注意及时释放不再使用的对象，避免内存泄漏。
 False
 False## 10. 代码示例
 False
 False### 10.1 完整的类实现示例
 False
```typescript
 True// 抽象基类
 Trueabstract class Vehicle {
 True constructor(
 True public brand: string,
 True public model: string,
 True protected year: number
 True ) {}
 True 
 True abstract start(): void;
 True abstract stop(): void;
 True 
 True public getInfo(): string {
 True return `${this.brand} ${this.model} (${this.year})`;
 True }
 True 
 True protected getYear(): number {
 True return this.year;
 True }
 True}
 True
 True// 实现类
 Trueclass Car extends Vehicle {
 True constructor(
 True brand: string,
 True model: string,
 True year: number,
 True public numberOfDoors: number
 True ) {
 True super(brand, model, year);
 True }
 True 
 True start(): void {
 True console.log(`${this.getInfo()} starts`);
 True }
 True 
 True stop(): void {
 True console.log(`${this.getInfo()} stops`);
 True }
 True 
 True public honk(): void {
 True console.log(`${this.getInfo()} honks`);
 True }
 True}
 True
 Trueclass Motorcycle extends Vehicle {
 True constructor(
 True brand: string,
 True model: string,
 True year: number,
 True public hasSidecar: boolean
 True ) {
 True super(brand, model, year);
 True }
 True 
 True start(): void {
 True console.log(`${this.getInfo()} starts`);
 True }
 True 
 True stop(): void {
 True console.log(`${this.getInfo()} stops`);
 True }
 True 
 True public wheelie(): void {
 True console.log(`${this.getInfo()} does a wheelie`);
 True }
 True}
 True
 True// 装饰器
 Truefunction logVehicle(target: any) {
 True const originalConstructor = target;
 True 
 True function newConstructor(...args: any[]) {
 True console.log(`Creating a new ${originalConstructor.name}`);
 True return new originalConstructor(...args);
 True }
 True 
 True newConstructor.prototype = originalConstructor.prototype;
 True return newConstructor;
 True}
 True
 True// 应用装饰器
 True@logVehicle
 Trueclass Truck extends Vehicle {
 True constructor(
 True brand: string,
 True model: string,
 True year: number,
 True public payloadCapacity: number
 True ) {
 True super(brand, model, year);
 True }
 True 
 True start(): void {
 True console.log(`${this.getInfo()} starts`);
 True }
 True 
 True stop(): void {
 True console.log(`${this.getInfo()} stops`);
 True }
 True 
 True public loadCargo(weight: number): void {
 True if (weight <= this.payloadCapacity) {
 True console.log(`${this.getInfo()} loads ${weight}kg of cargo`);
 True } else {
 True console.log(`${this.getInfo()} cannot load ${weight}kg, maximum capacity is ${this.payloadCapacity}kg`);
 True }
 True }
 True}
 True
 True// 使用示例
 Trueconst car = new Car("Toyota", "Corolla", 2020, 4);
 Truecar.start();
 Truecar.honk();
 Truecar.stop();
 Trueconsole.log(car.getInfo());
 True
 Trueconst motorcycle = new Motorcycle("Harley-Davidson", "Sportster", 2019, false);
 Truemotorcycle.start();
 Truemotorcycle.wheelie();
 Truemotorcycle.stop();
 Trueconsole.log(motorcycle.getInfo());
 True
 Trueconst truck = new Truck("Ford", "F-150", 2021, 1000);
 Truetruck.start();
 Truetruck.loadCargo(800);
 Truetruck.loadCargo(1200);
 Truetruck.stop();
 Trueconsole.log(truck.getInfo());
 True```

 False### 10.2 装饰器的综合应用
 False
```typescript
 True// 日志装饰器
 Truefunction log(target: any, key: string, descriptor: PropertyDescriptor) {
 True const originalMethod = descriptor.value;
 True 
 True descriptor.value = function(...args: any[]) {
 True console.log(`[${new Date().toISOString()}] ${key} called with:`, args);
 True const result = originalMethod.apply(this, args);
 True console.log(`[${new Date().toISOString()}] ${key} returned:`, result);
 True return result;
 True };
 True 
 True return descriptor;
 True}
 True
 True// 缓存装饰器
 Truefunction cache() {
 True const cacheMap = new Map<string, any>();
 True 
 True return function(target: any, key: string, descriptor: PropertyDescriptor) {
 True const originalMethod = descriptor.value;
 True 
 True descriptor.value = function(...args: any[]) {
 True const cacheKey = `${key}:${JSON.stringify(args)}`;
 True 
 True if (cacheMap.has(cacheKey)) {
 True console.log(`Cache hit for ${key}`);
 True return cacheMap.get(cacheKey);
 True }
 True 
 True console.log(`Cache miss for ${key}`);
 True const result = originalMethod.apply(this, args);
 True cacheMap.set(cacheKey, result);
 True return result;
 True };
 True 
 True return descriptor;
 True };
 True}
 True
 True// 错误处理装饰器
 Truefunction handleError(defaultValue: any) {
 True return function(target: any, key: string, descriptor: PropertyDescriptor) {
 True const originalMethod = descriptor.value;
 True 
 True descriptor.value = function(...args: any[]) {
 True try {
 True return originalMethod.apply(this, args);
 True } catch (error) {
 True console.error(`Error in ${key}:`, error);
 True return defaultValue;
 True }
 True };
 True 
 True return descriptor;
 True };
 True}
 True
 Trueclass Calculator {
 True @log
 True @cache()
 True add(a: number, b: number): number {
 True console.log("Performing addition...");
 True return a + b;
 True }
 True 
 True @log
 True @cache()
 True multiply(a: number, b: number): number {
 True console.log("Performing multiplication...");
 True return a * b;
 True }
 True 
 True @log
 True @handleError(0)
 True divide(a: number, b: number): number {
 True if (b === 0) {
 True throw new Error("Division by zero");
 True }
 True return a / b;
 True }
 True 
 True @log
 True @handleError([])
 True getNumbers(n: number): number[] {
 True if (n < 0) {
 True throw new Error("n must be non-negative");
 True }
 True return Array.from({ length: n }, (_, i) => i);
 True }
 True}
 True
 True// 使用示例
 Trueconst calculator = new Calculator();
 True
 True// 第一次调用（缓存 miss）
 Trueconsole.log(calculator.add(5, 3)); // 输出: 8
 True
 True// 第二次调用（缓存 hit）
 Trueconsole.log(calculator.add(5, 3)); // 输出: 8
 True
 True// 不同参数（缓存 miss）
 Trueconsole.log(calculator.add(10, 20)); // 输出: 30
 True
 True// 乘法
 Trueconsole.log(calculator.multiply(4, 6)); // 输出: 24
 Trueconsole.log(calculator.multiply(4, 6)); // 缓存 hit
 True
 True// 错误处理 - 除以零
 Trueconsole.log(calculator.divide(10, 0)); // 输出: 0（默认值）
 True
 True// 错误处理 - 负数
 Trueconsole.log(calculator.getNumbers(-5)); // 输出: []（默认值）
 True
 True// 正常调用
 Trueconsole.log(calculator.getNumbers(5)); // 输出: [0, 1, 2, 3, 4]
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化 TS 装饰器与类访问控制。
 False- 2026-04-05: 扩写内容，增加详细的类成员访问修饰符、构造函数简写、抽象类、静态成员、类的存取器、装饰器、类的继承与多态、类的高级特性、最佳实践和代码示例等内容。
 False