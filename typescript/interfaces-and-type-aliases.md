# 接口与类型别名 (Interfaces vs. Type Aliases)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: TS Advanced
 False> @Description: 接口定义、只读/可选属性、接口继承及与 Type 的对比。 | Interface, Readonly, Optional, Inheritance, and Type comparison.
 False
 False---
 False
 False## 目录
 False
 False1. [接口](#接口)
 False2. [接口继承](#接口继承)
 False3. [类型别名](#类型别名)
 False4. [接口与类型别名的对比](#接口与类型别名的对比)
 False5. [最佳实践](#最佳实践)
 False6. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 接口 (Interface)
 False
 False接口是 TypeScript 中用于定义对象结构的重要工具，它描述了对象应该具有的属性和方法。
 False
 False### 1.1 基本接口定义
 False
```typescript
 True// 基本接口定义
 Trueinterface Person {
 True name: string;
 True age: number;
 True}
 True
 True// 使用接口
 Trueconst person: Person = {
 True name: "Alice",
 True age: 30
 True};
 True
 True// 错误示例：缺少属性
 True// const invalidPerson: Person = {
 True// name: "Bob" // 缺少 age 属性
 True// };
 True```

 False### 1.2 可选属性
 False
 False使用 `?` 标记可选属性。
 False
```typescript
 Trueinterface User {
 True id: number;
 True name: string;
 True age?: number; // 可选属性
 True email?: string; // 可选属性
 True}
 True
 True// 正确：只提供必需属性
 Trueconst user1: User = {
 True id: 1,
 True name: "Alice"
 True};
 True
 True// 正确：提供所有属性
 Trueconst user2: User = {
 True id: 2,
 True name: "Bob",
 True age: 25,
 True email: "bob@example.com"
 True};
 True```

 False### 1.3 只读属性
 False
 False使用 `readonly` 标记只读属性，这些属性只能在初始化时赋值，之后不能修改。
 False
```typescript
 Trueinterface Product {
 True readonly id: number;
 True name: string;
 True price: number;
 True}
 True
 Trueconst product: Product = {
 True id: 1001,
 True name: "Laptop",
 True price: 999.99
 True};
 True
 True// 错误：不能修改只读属性
 True// product.id = 1002; // 编译错误
 True
 Trueproduct.price = 899.99; // 可以修改非只读属性
 True```

 False### 1.4 函数接口
 False
 False接口可以定义函数的类型。
 False
```typescript
 True// 函数接口
 Trueinterface GreetFunction {
 True (name: string, age?: number): string;
 True}
 True
 True// 实现函数接口
 Trueconst greet: GreetFunction = (name, age) => {
 True if (age) {
 True return `Hello, ${name}! You are ${age} years old.`;
 True }
 True return `Hello, ${name}!`;
 True};
 True
 Trueconsole.log(greet("Alice")); // Hello, Alice!
 Trueconsole.log(greet("Bob", 25)); // Hello, Bob! You are 25 years old.
 True```

 False### 1.5 索引签名
 False
 False使用索引签名定义任意属性。
 False
```typescript
 True// 字符串索引签名
 Trueinterface StringMap {
 True [key: string]: string;
 True}
 True
 Trueconst colors: StringMap = {
 True red: "#FF0000",
 True green: "#00FF00",
 True blue: "#0000FF"
 True};
 True
 True// 数字索引签名
 Trueinterface NumberArray {
 True [index: number]: number;
 True}
 True
 Trueconst numbers: NumberArray = [1, 2, 3, 4, 5];
 True
 True// 混合索引签名
 Trueinterface MixedMap {
 True [key: string]: string | number;
 True length: number; // 具体属性类型必须与索引签名兼容
 True}
 True
 Trueconst mixed: MixedMap = {
 True name: "Alice",
 True age: 30,
 True length: 2
 True};
 True```

 False### 1.6 类实现接口
 False
 False类可以实现一个或多个接口。
 False
```typescript
 Trueinterface Printable {
 True print(): void;
 True}
 True
 Trueinterface Loggable {
 True log(message: string): void;
 True}
 True
 True// 实现单个接口
 Trueclass Document implements Printable {
 True print(): void {
 True console.log("Printing document...");
 True }
 True}
 True
 True// 实现多个接口
 Trueclass AdvancedDocument implements Printable, Loggable {
 True print(): void {
 True console.log("Printing advanced document...");
 True }
 True 
 True log(message: string): void {
 True console.log(`Logging: ${message}`);
 True }
 True}
 True
 Trueconst doc = new AdvancedDocument();
 Truedoc.print(); // Printing advanced document...
 Truedoc.log("Document created"); // Logging: Document created
 True```

 False## 2. 接口继承
 False
 False接口可以继承其他接口，实现代码复用。
 False
 False### 2.1 单继承
 False
```typescript
 Trueinterface Person {
 True name: string;
 True age: number;
 True}
 True
 Trueinterface Employee extends Person {
 True employeeId: number;
 True department: string;
 True}
 True
 Trueconst employee: Employee = {
 True name: "Alice",
 True age: 30,
 True employeeId: 1001,
 True department: "Engineering"
 True};
 True```

 False### 2.2 多继承
 False
 False接口可以同时继承多个接口。
 False
```typescript
 Trueinterface Readable {
 True read(): string;
 True}
 True
 Trueinterface Writeable {
 True write(content: string): void;
 True}
 True
 Trueinterface ReadWriteable extends Readable, Writeable {
 True readWrite(): void;
 True}
 True
 Trueclass File implements ReadWriteable {
 True read(): string {
 True return "File content";
 True }
 True 
 True write(content: string): void {
 True console.log(`Writing: ${content}`);
 True }
 True 
 True readWrite(): void {
 True console.log("Reading and writing...");
 True }
 True}
 True
 Trueconst file = new File();
 Trueconsole.log(file.read()); // File content
 Truefile.write("Hello"); // Writing: Hello
 Truefile.readWrite(); // Reading and writing...
 True```

 False### 2.3 继承与扩展
 False
 False接口继承后可以添加新的属性和方法。
 False
```typescript
 Trueinterface BaseConfig {
 True host: string;
 True port: number;
 True}
 True
 Trueinterface DatabaseConfig extends BaseConfig {
 True database: string;
 True username: string;
 True password: string;
 True ssl?: boolean; // 新增可选属性
 True}
 True
 Trueconst dbConfig: DatabaseConfig = {
 True host: "localhost",
 True port: 5432,
 True database: "mydb",
 True username: "admin",
 True password: "password"
 True};
 True```

 False## 3. 类型别名 (Type Aliases)
 False
 False类型别名使用 `type` 关键字定义，可以为任何类型创建别名，包括原始类型、联合类型、元组等。
 False
 False### 3.1 基本类型别名
 False
```typescript
 True// 原始类型别名
 Truetype Age = number;
 Truetype Name = string;
 Truetype IsActive = boolean;
 True
 True// 使用类型别名
 Trueconst age: Age = 30;
 Trueconst name: Name = "Alice";
 Trueconst isActive: IsActive = true;
 True
 True// 对象类型别名
 Truetype Person = {
 True name: string;
 True age: number;
 True email?: string;
 True};
 True
 Trueconst person: Person = {
 True name: "Bob",
 True age: 25
 True};
 True```

 False### 3.2 联合类型别名
 False
```typescript
 True// 联合类型别名
 Truetype Status = "active" | "inactive" | "pending";
 Truetype Result = string | number | boolean;
 True
 True// 使用联合类型
 Trueconst userStatus: Status = "active";
 Trueconst result1: Result = "Success";
 Trueconst result2: Result = 42;
 Trueconst result3: Result = true;
 True
 True// 错误示例：不在联合类型中
 True// const invalidStatus: Status = "deleted"; // 编译错误
 True```

 False### 3.3 元组类型别名
 False
```typescript
 True// 元组类型别名
 Truetype Coordinates = [number, number];
 Truetype RGB = [number, number, number];
 Truetype PersonInfo = [string, number, boolean];
 True
 True// 使用元组类型
 Trueconst point: Coordinates = [10, 20];
 Trueconst color: RGB = [255, 0, 0];
 Trueconst personInfo: PersonInfo = ["Alice", 30, true];
 True
 True// 访问元组成员
 Trueconsole.log(point[0]); // 10
 Trueconsole.log(color[1]); // 0
 Trueconsole.log(personInfo[2]); // true
 True```

 False### 3.4 函数类型别名
 False
```typescript
 True// 函数类型别名
 Truetype AddFunction = (a: number, b: number) => number;
 Truetype Callback = () => void;
 Truetype ProcessFunction = (data: any, callback: Callback) => void;
 True
 True// 使用函数类型别名
 Trueconst add: AddFunction = (a, b) => a + b;
 Trueconst greet: Callback = () => console.log("Hello!");
 True
 Trueconst process: ProcessFunction = (data, callback) => {
 True console.log("Processing data...", data);
 True callback();
 True};
 True
 Trueconsole.log(add(5, 3)); // 8
 Truegreet(); // Hello!
 Trueprocess({ id: 1 }, greet); // Processing data... { id: 1 }
 True // Hello!
 True```

 False### 3.5 交叉类型
 False
 False使用 `&` 创建交叉类型，组合多个类型的特性。
 False
```typescript
 True// 交叉类型
 Truetype Person = {
 True name: string;
 True age: number;
 True};
 True
 Truetype Employee = {
 True employeeId: number;
 True department: string;
 True};
 True
 True// 交叉类型：同时具有 Person 和 Employee 的属性
 Truetype EmployeePerson = Person & Employee;
 True
 Trueconst employee: EmployeePerson = {
 True name: "Alice",
 True age: 30,
 True employeeId: 1001,
 True department: "Engineering"
 True};
 True```

 False### 3.6 条件类型
 False
 False使用条件类型根据其他类型创建新类型。
 False
```typescript
 True// 条件类型
 Truetype IsString<T> = T extends string ? true : false;
 Truetype IsNumber<T> = T extends number ? true : false;
 True
 True// 使用条件类型
 Truetype A = IsString<string>; // true
 Truetype B = IsString<number>; // false
 Truetype C = IsNumber<number>; // true
 Truetype D = IsNumber<string>; // false
 True
 True// 复杂条件类型
 Truetype ExtractString<T> = T extends string ? T : never;
 Truetype StringsOnly<T> = T extends Array<infer U> ? ExtractString<U>[] : ExtractString<T>;
 True
 True// 使用复杂条件类型
 Truetype E = StringsOnly<string>; // string
 Truetype F = StringsOnly<number>; // never
 Truetype G = StringsOnly<string[]>; // string[]
 Truetype H = StringsOnly<(string | number)[]>; // string[]
 True```

 False## 4. 接口与类型别名的对比
 False
 False### 4.1 核心差异
 False
 False| 特性 | Interface | Type Alias |
 False| :--- | :--- | :--- |
 False| **定义范围** | 主要用于定义对象结构 | 可以定义任何类型（原始类型、联合类型、元组等） |
 False| **声明合并** | 支持（多个同名接口会自动合并） | 不支持（同名类型别名会导致编译错误） |
 False| **扩展方式** | 使用 `extends` 关键字 | 使用交叉类型 `&` |
 False| **计算属性** | 不支持 | 支持 |
 False| **类型参数** | 支持泛型 | 支持泛型 |
 False| **使用场景** | 定义对象结构、类接口 | 定义联合类型、元组类型、复杂类型组合 |
 False
 False### 4.2 声明合并
 False
 False接口支持声明合并，多个同名接口会自动合并为一个。
 False
```typescript
 True// 声明合并示例
 Trueinterface User {
 True id: number;
 True name: string;
 True}
 True
 True// 自动合并到上面的 User 接口
 Trueinterface User {
 True age?: number;
 True email?: string;
 True}
 True
 True// 使用合并后的接口
 Trueconst user: User = {
 True id: 1,
 True name: "Alice",
 True age: 30,
 True email: "alice@example.com"
 True};
 True```

 False类型别名不支持声明合并。
 False
```typescript
 True// 错误：类型别名不能重复声明
 True// type User = {
 True// id: number;
 True// name: string;
 True// };
 True
 True// 编译错误：重复的标识符 'User'
 True// type User = {
 True// age?: number;
 True// };
 True```

 False### 4.3 扩展方式
 False
 False接口使用 `extends` 扩展。
 False
```typescript
 Trueinterface Person {
 True name: string;
 True age: number;
 True}
 True
 Trueinterface Employee extends Person {
 True employeeId: number;
 True department: string;
 True}
 True```

 False类型别名使用交叉类型 `&` 扩展。
 False
```typescript
 Truetype Person = {
 True name: string;
 True age: number;
 True};
 True
 Truetype Employee = Person & {
 True employeeId: number;
 True department: string;
 True};
 True```

 False### 4.4 计算属性
 False
 False类型别名支持计算属性。
 False
```typescript
 True// 计算属性示例
 Truetype Keys = "a" | "b" | "c";
 Truetype StringMap = {
 True [K in Keys]: string;
 True};
 True
 True// 等价于
 True// type StringMap = {
 True// a: string;
 True// b: string;
 True// c: string;
 True// };
 True
 Trueconst map: StringMap = {
 True a: "value1",
 True b: "value2",
 True c: "value3"
 True};
 True```

 False接口不支持计算属性。
 False
 False### 4.5 泛型支持
 False
 False两者都支持泛型。
 False
```typescript
 True// 泛型接口
 Trueinterface GenericInterface<T> {
 True value: T;
 True getValue(): T;
 True}
 True
 True// 泛型类型别名
 Truetype GenericType<T> = {
 True value: T;
 True getValue(): T;
 True};
 True
 True// 使用泛型
 Trueconst numInterface: GenericInterface<number> = {
 True value: 42,
 True getValue: () => 42
 True};
 True
 Trueconst stringType: GenericType<string> = {
 True value: "Hello",
 True getValue: () => "Hello"
 True};
 True```

 False## 5. 最佳实践
 False
 False### 5.1 选择原则
 False
 False- **优先使用接口**：当定义对象结构、类接口时，优先使用 `interface`。
 False- **使用类型别名**：当需要定义联合类型、元组类型、交叉类型或其他复杂类型时，使用 `type`。
 False
 False### 5.2 具体场景
 False
 False| 场景 | 推荐使用 | 原因 |
 False| :--- | :--- | :--- |
 False| 定义对象结构 | `interface` | 支持声明合并，更符合面向对象思维 |
 False| 定义类接口 | `interface` | 类可以使用 `implements` 实现接口 |
 False| 定义联合类型 | `type` | 接口不支持联合类型 |
 False| 定义元组类型 | `type` | 接口不支持元组类型 |
 False| 定义交叉类型 | `type` | 使用 `&` 更简洁 |
 False| 定义条件类型 | `type` | 接口不支持条件类型 |
 False| 定义原始类型别名 | `type` | 接口只能定义对象结构 |
 False
 False### 5.3 实际应用建议
 False
 False1. **保持一致性**：在项目中保持使用接口和类型别名的一致性。
 False2. **清晰命名**：为接口和类型别名使用清晰、描述性的名称。
 False3. **合理使用**：根据具体场景选择合适的方式，不要过度使用其中一种。
 False4. **文档化**：对于复杂的类型定义，添加注释说明其用途。
 False
 False## 6. 代码示例
 False
 False### 6.1 接口的综合使用
 False
```typescript
 True// 基本接口
 Trueinterface User {
 True readonly id: number;
 True name: string;
 True age?: number;
 True email?: string;
 True}
 True
 True// 函数接口
 Trueinterface UserService {
 True getUser(id: number): User;
 True createUser(user: Omit<User, 'id'>): User;
 True updateUser(id: number, user: Partial<User>): User;
 True deleteUser(id: number): boolean;
 True}
 True
 True// 实现接口
 Trueclass UserServiceImpl implements UserService {
 True private users: User[] = [
 True { id: 1, name: "Alice", age: 30, email: "alice@example.com" },
 True { id: 2, name: "Bob", age: 25 }
 True ];
 True
 True getUser(id: number): User {
 True const user = this.users.find(u => u.id === id);
 True if (!user) {
 True throw new Error(`User with id ${id} not found`);
 True }
 True return user;
 True }
 True
 True createUser(user: Omit<User, 'id'>): User {
 True const newUser: User = {
 True id: this.users.length + 1,
 True ...user
 True };
 True this.users.push(newUser);
 True return newUser;
 True }
 True
 True updateUser(id: number, user: Partial<User>): User {
 True const index = this.users.findIndex(u => u.id === id);
 True if (index === -1) {
 True throw new Error(`User with id ${id} not found`);
 True }
 True this.users[index] = { ...this.users[index], ...user };
 True return this.users[index];
 True }
 True
 True deleteUser(id: number): boolean {
 True const initialLength = this.users.length;
 True this.users = this.users.filter(u => u.id !== id);
 True return this.users.length < initialLength;
 True }
 True}
 True
 True// 使用示例
 Trueconst userService = new UserServiceImpl();
 True
 Trueconsole.log("Get user 1:", userService.getUser(1));
 True
 Trueconst newUser = userService.createUser({ name: "Charlie", age: 35 });
 Trueconsole.log("Created user:", newUser);
 True
 Trueconst updatedUser = userService.updateUser(1, { age: 31, email: "alice.updated@example.com" });
 Trueconsole.log("Updated user:", updatedUser);
 True
 Trueconst deleted = userService.deleteUser(2);
 Trueconsole.log("Deleted user 2:", deleted);
 Trueconsole.log("All users:", userService);
 True```

 False### 6.2 类型别名的综合使用
 False
```typescript
 True// 基本类型别名
 Truetype UserId = number;
 Truetype UserName = string;
 Truetype Email = string;
 True
 True// 联合类型
 Truetype UserRole = "admin" | "user" | "guest";
 Truetype Status = "active" | "inactive" | "pending";
 True
 True// 元组类型
 Truetype UserCredentials = [UserName, string]; // [username, password]
 Truetype Coordinates = [number, number]; // [x, y]
 True
 True// 对象类型
 Truetype User = {
 True id: UserId;
 True name: UserName;
 True email: Email;
 True role: UserRole;
 True status: Status;
 True lastLogin?: Date;
 True};
 True
 True// 交叉类型
 Truetype AdminPermissions = {
 True canManageUsers: boolean;
 True canManageSettings: boolean;
 True};
 True
 Truetype AdminUser = User & AdminPermissions;
 True
 True// 函数类型
 Truetype UserValidator = (user: User) => boolean;
 Truetype AsyncCallback = (error: Error | null, result: any) => void;
 True
 True// 使用示例
 Trueconst validateUser: UserValidator = (user) => {
 True return !!user.name && !!user.email && !!user.role;
 True};
 True
 Trueconst adminUser: AdminUser = {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com",
 True role: "admin",
 True status: "active",
 True canManageUsers: true,
 True canManageSettings: true
 True};
 True
 Trueconst credentials: UserCredentials = ["alice", "password123"];
 Trueconst position: Coordinates = [10, 20];
 True
 Trueconsole.log("Admin user:", adminUser);
 Trueconsole.log("Credentials:", credentials);
 Trueconsole.log("Position:", position);
 Trueconsole.log("Is valid user:", validateUser(adminUser));
 True```

 False### 6.3 接口与类型别名的混合使用
 False
```typescript
 True// 接口定义核心结构
 Trueinterface BaseEntity {
 True id: number;
 True createdAt: Date;
 True updatedAt: Date;
 True}
 True
 True// 类型别名定义复杂类型
 Truetype EntityType = "user" | "product" | "order";
 Truetype EntityStatus = "active" | "inactive" | "deleted";
 True
 True// 接口继承并使用类型别名
 Trueinterface User extends BaseEntity {
 True name: string;
 True email: string;
 True type: Extract<EntityType, "user">;
 True status: EntityStatus;
 True}
 True
 Trueinterface Product extends BaseEntity {
 True name: string;
 True price: number;
 True type: Extract<EntityType, "product">;
 True status: EntityStatus;
 True}
 True
 True// 类型别名创建联合类型
 Truetype Entity = User | Product;
 True
 True// 类型守卫函数
 Truetype EntityGuard<T extends EntityType> = (entity: Entity) => entity is Extract<Entity, { type: T }>;
 True
 Trueconst isUser: EntityGuard<"user"> = (entity): entity is User => {
 True return entity.type === "user";
 True};
 True
 Trueconst isProduct: EntityGuard<"product"> = (entity): entity is Product => {
 True return entity.type === "product";
 True};
 True
 True// 使用示例
 Trueconst user: User = {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com",
 True type: "user",
 True status: "active",
 True createdAt: new Date(),
 True updatedAt: new Date()
 True};
 True
 Trueconst product: Product = {
 True id: 1001,
 True name: "Laptop",
 True price: 999.99,
 True type: "product",
 True status: "active",
 True createdAt: new Date(),
 True updatedAt: new Date()
 True};
 True
 Trueconst processEntity = (entity: Entity) => {
 True console.log(`Processing entity ${entity.id} (${entity.type})`);
 True 
 True if (isUser(entity)) {
 True console.log(`User: ${entity.name}, Email: ${entity.email}`);
 True } else if (isProduct(entity)) {
 True console.log(`Product: ${entity.name}, Price: $${entity.price}`);
 True }
 True};
 True
 TrueprocessEntity(user);
 TrueprocessEntity(product);
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入对比 Interface 与 Type。
 False- 2026-04-05: 扩写内容，增加详细的接口定义、类型别名、对比分析、最佳实践和代码示例等内容。
 False