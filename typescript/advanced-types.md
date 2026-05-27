# 高级类型与类型演算 (Advanced Types & Manipulation)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: TS Advanced
 False> @Description: 条件类型、映射类型、类型断言、非空断言及类型守卫。 | Conditional types, Mapping, Assertions, and Type Guards.
 False
 False---
 False
 False## 目录
 False
 False1. [类型断言](#类型断言)
 False2. [非空断言](#非空断言)
 False3. [类型守卫](#类型守卫)
 False4. [映射类型](#映射类型)
 False5. [条件类型](#条件类型)
 False6. [高级类型组合](#高级类型组合)
 False7. [类型工具](#类型工具)
 False8. [类型编程](#类型编程)
 False9. [最佳实践](#最佳实践)
 False10. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 类型断言 (Type Assertions)
 False
 False类型断言允许我们手动告诉编译器一个值的具体类型，当我们比编译器更了解变量的类型时非常有用。
 False
 False### 1.1 基本语法
 False
 FalseTypeScript 提供了两种类型断言语法：
 False
```typescript
 True// 推荐语法：as 语法
 Truelet someValue: unknown = "this is a string";
 Truelet strLength: number = (someValue as string).length;
 True
 True// 角括号语法（在 JSX 中不推荐使用）
 Truelet someValue: unknown = "this is a string";
 Truelet strLength: number = (<string>someValue).length;
 True```

 False### 1.2 类型断言的使用场景
 False
 False#### 1.2.1 从 unknown 类型断言为具体类型
 False
```typescript
 Truefunction processValue(value: unknown): void {
 True // 类型断言为 string
 True if (typeof value === "string") {
 True console.log((value as string).toUpperCase());
 True }
 True 
 True // 类型断言为 number
 True if (typeof value === "number") {
 True console.log((value as number).toFixed(2));
 True }
 True}
 True
 TrueprocessValue("hello"); // 输出: HELLO
 TrueprocessValue(42); // 输出: 42.00
 True```

 False#### 1.2.2 从联合类型断言为具体类型
 False
```typescript
 Trueinterface Cat {
 True meow(): void;
 True}
 True
 Trueinterface Dog {
 True bark(): void;
 True}
 True
 Truetype Animal = Cat | Dog;
 True
 Truefunction makeSound(animal: Animal): void {
 True // 类型断言为 Cat
 True if ((animal as Cat).meow) {
 True (animal as Cat).meow();
 True } else {
 True // 类型断言为 Dog
 True (animal as Dog).bark();
 True }
 True}
 True
 Trueconst cat: Cat = { meow: () => console.log("Meow!") };
 Trueconst dog: Dog = { bark: () => console.log("Woof!") };
 True
 TruemakeSound(cat); // 输出: Meow!
 TruemakeSound(dog); // 输出: Woof!
 True```

 False#### 1.2.3 断言为更具体的类型
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
 Truefunction getEmployeeInfo(person: Person): void {
 True // 断言为 Employee 类型
 True const employee = person as Employee;
 True console.log(`Name: ${employee.name}, ID: ${employee.employeeId}`);
 True}
 True
 Trueconst employee: Employee = {
 True name: "Alice",
 True age: 30,
 True employeeId: 12345,
 True department: "Engineering"
 True};
 True
 TruegetEmployeeInfo(employee); // 输出: Name: Alice, ID: 12345
 True```

 False### 1.3 类型断言的最佳实践
 False
 False- **只在必要时使用**: 类型断言会绕过 TypeScript 的类型检查，应谨慎使用。
 False- **结合类型守卫**: 在使用类型断言前，最好先进行类型检查。
 False- **使用 as 语法**: 优先使用 `as` 语法，特别是在 JSX 代码中。
 False- **避免过度断言**: 不要使用类型断言来掩盖真正的类型问题。
 False
 False## 2. 非空断言 (`!`)
 False
 False非空断言操作符 `!` 告诉编译器一个值不为 `null` 或 `undefined`，当我们确定一个值不会是 `null` 或 `undefined` 时使用。
 False
 False### 2.1 基本用法
 False
```typescript
 True// 非空断言
 Truelet maybeNull: string | null = "Hello";
 Truelet definitelyString: string = maybeNull!; // 告诉编译器 maybeNull 不为 null
 True
 True// 访问可能为 null 的对象属性
 Trueinterface User {
 True name: string;
 True email?: string;
 True}
 True
 Trueconst user: User = { name: "Alice" };
 Trueconst email: string = user.email!; // 告诉编译器 user.email 存在
 True
 True// 调用可能为 undefined 的方法
 Trueinterface Greeter {
 True greet?: () => void;
 True}
 True
 Trueconst greeter: Greeter = { greet: () => console.log("Hello!") };
 Truegreeter.greet!(); // 告诉编译器 greet 方法存在
 True```

 False### 2.2 非空断言的使用场景
 False
 False#### 2.2.1 初始化后肯定存在的值
 False
```typescript
 Trueclass User {
 True private name: string | null = null;
 True 
 True constructor(name: string) {
 True this.setName(name);
 True }
 True 
 True private setName(name: string): void {
 True this.name = name;
 True }
 True 
 True public getName(): string {
 True // 构造函数中已初始化，肯定不为 null
 True return this.name!;
 True }
 True}
 True
 Trueconst user = new User("Alice");
 Trueconsole.log(user.getName()); // 输出: Alice
 True```

 False#### 2.2.2 经过类型检查后的值
 False
```typescript
 Truefunction processValue(value: string | null | undefined): void {
 True if (value) {
 True // 经过检查后，value 肯定不为 null 或 undefined
 True console.log(value!.length); // 非空断言
 True }
 True}
 True
 TrueprocessValue("Hello"); // 输出: 5
 TrueprocessValue(null); // 无输出
 TrueprocessValue(undefined); // 无输出
 True```

 False### 2.3 非空断言的注意事项
 False
 False- **运行时风险**: 非空断言只在编译时有效，运行时如果值为 `null` 或 `undefined`，会导致运行时错误。
 False- **谨慎使用**: 只在确定值不为 `null` 或 `undefined` 时使用。
 False- **替代方案**: 优先使用类型守卫或可选链操作符 (`?.`) 来处理可能为 `null` 或 `undefined` 的值。
 False
 False## 3. 类型守卫 (Type Guards)
 False
 False类型守卫是一种运行时检查，用于确定变量的具体类型，帮助编译器进行类型缩小。
 False
 False### 3.1 内置类型守卫
 False
 False#### 3.1.1 typeof 类型守卫
 False
```typescript
 Truefunction processValue(value: string | number | boolean): void {
 True if (typeof value === "string") {
 True // 类型缩小为 string
 True console.log(value.toUpperCase());
 True } else if (typeof value === "number") {
 True // 类型缩小为 number
 True console.log(value.toFixed(2));
 True } else if (typeof value === "boolean") {
 True // 类型缩小为 boolean
 True console.log(value ? "true" : "false");
 True }
 True}
 True
 TrueprocessValue("hello"); // 输出: HELLO
 TrueprocessValue(42); // 输出: 42.00
 TrueprocessValue(true); // 输出: true
 True```

 False#### 3.1.2 instanceof 类型守卫
 False
```typescript
 Trueclass Animal {
 True move(): void {
 True console.log("Moving...");
 True }
 True}
 True
 Trueclass Dog extends Animal {
 True bark(): void {
 True console.log("Woof!");
 True }
 True}
 True
 Trueclass Cat extends Animal {
 True meow(): void {
 True console.log("Meow!");
 True }
 True}
 True
 Truefunction makeSound(animal: Animal): void {
 True if (animal instanceof Dog) {
 True // 类型缩小为 Dog
 True animal.bark();
 True } else if (animal instanceof Cat) {
 True // 类型缩小为 Cat
 True animal.meow();
 True } else {
 True animal.move();
 True }
 True}
 True
 Trueconst dog = new Dog();
 Trueconst cat = new Cat();
 Trueconst animal = new Animal();
 True
 TruemakeSound(dog); // 输出: Woof!
 TruemakeSound(cat); // 输出: Meow!
 TruemakeSound(animal); // 输出: Moving...
 True```

 False#### 3.1.3 in 操作符类型守卫
 False
```typescript
 Trueinterface Cat {
 True meow: () => void;
 True}
 True
 Trueinterface Dog {
 True bark: () => void;
 True}
 True
 Truetype Animal = Cat | Dog;
 True
 Truefunction makeSound(animal: Animal): void {
 True if ("meow" in animal) {
 True // 类型缩小为 Cat
 True animal.meow();
 True } else if ("bark" in animal) {
 True // 类型缩小为 Dog
 True animal.bark();
 True }
 True}
 True
 Trueconst cat: Cat = { meow: () => console.log("Meow!") };
 Trueconst dog: Dog = { bark: () => console.log("Woof!") };
 True
 TruemakeSound(cat); // 输出: Meow!
 TruemakeSound(dog); // 输出: Woof!
 True```

 False### 3.2 自定义类型守卫
 False
 False自定义类型守卫使用 `is` 关键字来定义一个函数，该函数返回一个布尔值，用于确定变量的类型。
 False
```typescript
 True// 自定义类型守卫
 Truefunction isString(value: any): value is string {
 True return typeof value === "string";
 True}
 True
 Truefunction isNumber(value: any): value is number {
 True return typeof value === "number";
 True}
 True
 Truefunction isBoolean(value: any): value is boolean {
 True return typeof value === "boolean";
 True}
 True
 Truefunction processValue(value: unknown): void {
 True if (isString(value)) {
 True // 类型缩小为 string
 True console.log(value.toUpperCase());
 True } else if (isNumber(value)) {
 True // 类型缩小为 number
 True console.log(value.toFixed(2));
 True } else if (isBoolean(value)) {
 True // 类型缩小为 boolean
 True console.log(value ? "true" : "false");
 True } else {
 True console.log("Unknown type");
 True }
 True}
 True
 TrueprocessValue("hello"); // 输出: HELLO
 TrueprocessValue(42); // 输出: 42.00
 TrueprocessValue(true); // 输出: true
 TrueprocessValue(null); // 输出: Unknown type
 True```

 False### 3.3 类型守卫的最佳实践
 False
 False- **明确类型检查**: 类型守卫应该明确检查变量的类型，避免模糊的检查。
 False- **组合使用**: 可以组合使用多种类型守卫来处理复杂的类型场景。
 False- **可读性**: 自定义类型守卫函数应该有清晰的名称，说明其检查的类型。
 False- **性能考虑**: 类型守卫在运行时执行，应避免过于复杂的检查逻辑。
 False
 False## 4. 映射类型 (Mapped Types)
 False
 False映射类型允许我们根据现有类型创建新类型，通过遍历现有类型的属性并应用转换。
 False
 False### 4.1 基本映射类型
 False
```typescript
 True// 基本映射类型
 Trueinterface Person {
 True name: string;
 True age: number;
 True email: string;
 True}
 True
 True// 只读映射类型
 Truetype Readonly<T> = {
 True readonly [P in keyof T]: T[P];
 True};
 True
 True// 可选映射类型
 Truetype Partial<T> = {
 True [P in keyof T]?: T[P];
 True};
 True
 True// 必需映射类型
 Truetype Required<T> = {
 True [P in keyof T]-?: T[P];
 True};
 True
 True// 使用示例
 Trueconst readonlyPerson: Readonly<Person> = {
 True name: "Alice",
 True age: 30,
 True email: "alice@example.com"
 True};
 True// readonlyPerson.name = "Bob"; // 编译错误
 True
 Trueconst partialPerson: Partial<Person> = {
 True name: "Bob"
 True};
 True
 Trueconst requiredPerson: Required<Partial<Person>> = {
 True name: "Charlie",
 True age: 25,
 True email: "charlie@example.com"
 True};
 True```

 False### 4.2 映射类型修饰符
 False
 FalseTypeScript 提供了三种映射类型修饰符：
 False
 False1. **`readonly`**: 使属性变为只读
 False2. **`?`**: 使属性变为可选
 False3. **`-`**: 移除修饰符（如 `-readonly` 或 `-?`）
 False
```typescript
 Trueinterface Person {
 True readonly name: string;
 True age?: number;
 True email: string;
 True}
 True
 True// 移除 readonly 修饰符
 Truetype Mutable<T> = {
 True -readonly [P in keyof T]: T[P];
 True};
 True
 True// 移除可选修饰符
 Truetype Required<T> = {
 True [P in keyof T]-?: T[P];
 True};
 True
 True// 同时移除 readonly 和可选修饰符
 Truetype MutableRequired<T> = {
 True -readonly [P in keyof T]-?: T[P];
 True};
 True
 True// 使用示例
 Trueconst mutablePerson: Mutable<Person> = {
 True name: "Alice",
 True email: "alice@example.com"
 True};
 TruemutablePerson.name = "Bob"; // 现在可以修改
 True
 Trueconst requiredPerson: Required<Person> = {
 True name: "Charlie",
 True age: 30, // 现在必需
 True email: "charlie@example.com"
 True};
 True```

 False### 4.3 键重映射
 False
 FalseTypeScript 4.1+ 支持键重映射，允许我们在映射类型中修改属性键。
 False
```typescript
 Trueinterface Person {
 True name: string;
 True age: number;
 True email: string;
 True}
 True
 True// 键重映射：添加前缀
 Truetype Prefixed<T, Prefix extends string> = {
 True [K in keyof T as `${Prefix}${Capitalize<string & K>}`]: T[K];
 True};
 True
 True// 键重映射：过滤属性
 Truetype OmitByType<T, U> = {
 True [K in keyof T as T[K] extends U ? never : K]: T[K];
 True};
 True
 True// 使用示例
 Trueconst prefixedPerson: Prefixed<Person, "user"> = {
 True userName: "Alice",
 True userAge: 30,
 True userEmail: "alice@example.com"
 True};
 True
 Trueconst noNumbers: OmitByType<Person, number> = {
 True name: "Bob",
 True email: "bob@example.com"
 True};
 True```

 False### 4.4 映射类型的应用场景
 False
 False#### 4.4.1 创建 API 响应类型
 False
```typescript
 Trueinterface User {
 True id: number;
 True name: string;
 True email: string;
 True password: string;
 True}
 True
 True// API 响应类型（移除敏感字段）
 Truetype UserResponse = Omit<User, "password">;
 True
 True// API 请求类型（可选字段）
 Truetype UserRequest = Partial<Omit<User, "id">>;
 True
 True// 使用示例
 Trueconst userResponse: UserResponse = {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com"
 True};
 True
 Trueconst userRequest: UserRequest = {
 True name: "Bob",
 True email: "bob@example.com"
 True};
 True```

 False#### 4.4.2 创建配置类型
 False
```typescript
 Trueinterface Config {
 True apiUrl: string;
 True timeout: number;
 True debug: boolean;
 True}
 True
 True// 只读配置类型
 Truetype ReadonlyConfig = Readonly<Config>;
 True
 True// 部分配置类型
 Truetype PartialConfig = Partial<Config>;
 True
 True// 使用示例
 Trueconst defaultConfig: ReadonlyConfig = {
 True apiUrl: "https://api.example.com",
 True timeout: 5000,
 True debug: false
 True};
 True
 Trueconst customConfig: PartialConfig = {
 True apiUrl: "https://api.custom.com",
 True timeout: 10000
 True};
 True```

 False### 4.5 映射类型的最佳实践
 False
 False- **复用现有类型**: 利用映射类型基于现有类型创建新类型，减少重复定义。
 False- **清晰命名**: 为映射类型选择清晰、描述性的名称。
 False- **合理使用修饰符**: 根据需要使用 `readonly`、`?` 和 `-` 修饰符。
 False- **键重映射**: 在需要修改属性键时使用键重映射功能。
 False
 False## 5. 条件类型 (Conditional Types)
 False
 False条件类型允许我们根据类型之间的关系创建新类型，语法为 `T extends U ? X : Y`。
 False
 False### 5.1 基本条件类型
 False
```typescript
 True// 基本条件类型
 Truetype IsString<T> = T extends string ? true : false;
 True
 Truetype A = IsString<string>; // true
 Truetype B = IsString<number>; // false
 Truetype C = IsString<string | number>; // boolean (true | false)
 True
 True// 条件类型与泛型
 Truefunction processValue<T>(value: T): T extends string ? string : number {
 True if (typeof value === "string") {
 True return value.toUpperCase() as any;
 True } else {
 True return 42 as any;
 True }
 True}
 True
 Trueconst result1 = processValue("hello"); // 类型为 string
 Trueconst result2 = processValue(42); // 类型为 number
 True```

 False### 5.2 条件类型与 infer 关键字
 False
 False`infer` 关键字允许我们在条件类型中推断类型，通常用于从复杂类型中提取部分类型。
 False
```typescript
 True// 推断函数返回类型
 Truetype ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
 True
 True// 推断数组元素类型
 Truetype ElementType<T> = T extends Array<infer E> ? E : T;
 True
 True// 推断元组类型
 Truetype First<T> = T extends [infer U, ...any[]] ? U : never;
 Truetype Last<T> = T extends [...any[], infer U] ? U : never;
 True
 True// 使用示例
 Truefunction add(a: number, b: number): number {
 True return a + b;
 True}
 True
 Truetype AddReturnType = ReturnType<typeof add>; // number
 True
 Truetype ArrayElement = ElementType<string[]>; // string
 Truetype NonArrayElement = ElementType<number>; // number
 True
 Truetype FirstElement = First<[string, number, boolean]>; // string
 Truetype LastElement = Last<[string, number, boolean]>; // boolean
 True```

 False### 5.3 条件类型的分发特性
 False
 False当条件类型的左侧是一个联合类型时，条件类型会自动分发到联合类型的每个成员上。
 False
```typescript
 True// 分发条件类型
 Truetype IsString<T> = T extends string ? true : false;
 True
 Truetype D = IsString<string | number | boolean>; // true | false | false
 True
 True// 阻止分发（使用方括号）
 Truetype IsStringNoDistribute<T> = [T] extends [string] ? true : false;
 True
 Truetype E = IsStringNoDistribute<string | number | boolean>; // false
 True```

 False### 5.4 条件类型的应用场景
 False
 False#### 5.4.1 类型过滤
 False
```typescript
 True// 从联合类型中过滤出指定类型
 Truetype Filter<T, U> = T extends U ? T : never;
 True
 Truetype Numbers = Filter<number | string | boolean, number>; // number
 Truetype Strings = Filter<number | string | boolean, string>; // string
 True
 True// 从联合类型中排除指定类型
 Truetype Exclude<T, U> = T extends U ? never : T;
 True
 Truetype NonNumbers = Exclude<number | string | boolean, number>; // string | boolean
 True```

 False#### 5.4.2 类型转换
 False
```typescript
 True// 类型转换
 Truetype ToArray<T> = T extends any ? T[] : never;
 True
 Truetype NumberArray = ToArray<number>; // number[]
 Truetype StringArray = ToArray<string>; // string[]
 Truetype UnionArray = ToArray<number | string>; // number[] | string[]
 True
 True// 递归类型转换
 Truetype DeepArray<T> = T extends Array<infer U> ? DeepArray<U>[] : T;
 True
 Truetype DeepNumberArray = DeepArray<number>; // number
 Truetype DeepArrayOfArrays = DeepArray<number[][]>; // number[][][]
 True```

 False### 5.5 条件类型的最佳实践
 False
 False- **类型推断**: 使用 `infer` 关键字从复杂类型中提取信息。
 False- **类型过滤**: 使用条件类型过滤联合类型中的成员。
 False- **类型转换**: 使用条件类型将一种类型转换为另一种类型。
 False- **递归类型**: 使用条件类型创建递归类型定义。
 False- **分发特性**: 利用条件类型的分发特性处理联合类型。
 False
 False## 6. 高级类型组合
 False
 False### 6.1 交叉类型 (Intersection Types)
 False
 False交叉类型使用 `&` 符号，将多个类型合并为一个类型。
 False
```typescript
 Trueinterface Person {
 True name: string;
 True age: number;
 True}
 True
 Trueinterface Employee {
 True employeeId: number;
 True department: string;
 True}
 True
 True// 交叉类型
 Truetype EmployeePerson = Person & Employee;
 True
 True// 使用示例
 Trueconst employee: EmployeePerson = {
 True name: "Alice",
 True age: 30,
 True employeeId: 12345,
 True department: "Engineering"
 True};
 True
 Trueconsole.log(employee.name); // 输出: Alice
 Trueconsole.log(employee.employeeId); // 输出: 12345
 True```

 False### 6.2 联合类型 (Union Types)
 False
 False联合类型使用 `|` 符号，表示一个值可以是多种类型中的一种。
 False
```typescript
 True// 联合类型
 Truetype StringOrNumber = string | number;
 Truetype BooleanOrNull = boolean | null;
 Truetype ComplexUnion = string | number | boolean | null | undefined;
 True
 True// 使用示例
 Truefunction processValue(value: StringOrNumber): void {
 True if (typeof value === "string") {
 True console.log(value.toUpperCase());
 True } else {
 True console.log(value.toFixed(2));
 True }
 True}
 True
 TrueprocessValue("hello"); // 输出: HELLO
 TrueprocessValue(42); // 输出: 42.00
 True```

 False### 6.3 类型别名与接口的结合
 False
```typescript
 True// 接口定义
 Trueinterface Base {
 True id: number;
 True name: string;
 True}
 True
 True// 类型别名与接口结合
 Truetype WithTimestamp = Base & {
 True createdAt: Date;
 True updatedAt: Date;
 True};
 True
 Truetype OptionalBase = Partial<Base>;
 True
 Truetype ReadonlyBase = Readonly<Base>;
 True
 True// 使用示例
 Trueconst withTimestamp: WithTimestamp = {
 True id: 1,
 True name: "Alice",
 True createdAt: new Date(),
 True updatedAt: new Date()
 True};
 True
 Trueconst optionalBase: OptionalBase = {
 True name: "Bob"
 True};
 True
 Trueconst readonlyBase: ReadonlyBase = {
 True id: 2,
 True name: "Charlie"
 True};
 True// readonlyBase.name = "David"; // 编译错误
 True```

 False## 7. 类型工具
 False
 FalseTypeScript 提供了许多内置的类型工具，用于常见的类型操作。
 False
 False### 7.1 常用内置类型工具
 False
 False| 类型工具 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **`Partial<T>`** | 将 T 中所有属性变为可选 | `Partial<{ a: number; b: string }>` → `{ a?: number; b?: string }` |
 False| **`Required<T>`** | 将 T 中所有属性变为必需 | `Required<{ a?: number; b?: string }>` → `{ a: number; b: string }` |
 False| **`Readonly<T>`** | 将 T 中所有属性变为只读 | `Readonly<{ a: number; b: string }>` → `{ readonly a: number; readonly b: string }` |
 False| **`Record<K, T>`** | 构建键为 K 类型，值为 T 类型的对象类型 | `Record<string, number>` → `{ [key: string]: number }` |
 False| **`Pick<T, K>`** | 从 T 中选取指定的属性 K | `Pick<{ a: number; b: string; c: boolean }, "a" | "b">` → `{ a: number; b: string }` |
 False| **`Omit<T, K>`** | 从 T 中排除指定的属性 K | `Omit<{ a: number; b: string; c: boolean }, "c">` → `{ a: number; b: string }` |
 False| **`Exclude<T, U>`** | 从 T 中排除可以赋值给 U 的类型 | `Exclude<"a" | "b" | "c", "a">` → `"b" | "c"` |
 False| **`Extract<T, U>`** | 从 T 中提取可以赋值给 U 的类型 | `Extract<"a" | "b" | "c", "a" | "b">` → `"a" | "b"` |
 False| **`NonNullable<T>`** | 从 T 中排除 null 和 undefined | `NonNullable<string | null | undefined>` → `string` |
 False| **`Parameters<T>`** | 提取函数 T 的参数类型为元组 | `Parameters<(a: number, b: string) => void>` → `[number, string]` |
 False| **`ReturnType<T>`** | 提取函数 T 的返回类型 | `ReturnType<() => string>` → `string` |
 False| **`InstanceType<T>`** | 提取构造函数 T 的实例类型 | `InstanceType<typeof Date>` → `Date` |
 False| **`ThisParameterType<T>`** | 提取函数 T 的 this 参数类型 | `ThisParameterType<(this: { x: number }, y: number) => void>` → `{ x: number }` |
 False| **`OmitThisParameter<T>`** | 从函数 T 中移除 this 参数 | `OmitThisParameter<(this: { x: number }, y: number) => void>` → `(y: number) => void` |
 False
 False### 7.2 自定义类型工具
 False
```typescript
 True// 自定义类型工具
 True
 True// 深度只读
 Truetype DeepReadonly<T> = T extends object
 True ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
 True : T;
 True
 True// 深度可选
 Truetype DeepPartial<T> = T extends object
 True ? { [P in keyof T]?: DeepPartial<T[P]> }
 True : T;
 True
 True// 深度必填
 Truetype DeepRequired<T> = T extends object
 True ? { [P in keyof T]-?: DeepRequired<T[P]> }
 True : T;
 True
 True// 类型是否为联合类型
 Truetype IsUnion<T> = [T] extends [infer U] ? U extends T ? false : true : false;
 True
 True// 获取对象的键类型
 Truetype Keys<T> = keyof T;
 True
 True// 获取对象的值类型
 Truetype Values<T> = T[keyof T];
 True
 True// 使用示例
 Trueinterface ComplexObject {
 True name: string;
 True age: number;
 True address: {
 True street: string;
 True city: string;
 True country: string;
 True };
 True hobbies: string[];
 True}
 True
 Trueconst deepReadonly: DeepReadonly<ComplexObject> = {
 True name: "Alice",
 True age: 30,
 True address: {
 True street: "123 Main St",
 True city: "New York",
 True country: "USA"
 True },
 True hobbies: ["reading", "coding"]
 True};
 True// deepReadonly.address.city = "Boston"; // 编译错误
 True
 Trueconst deepPartial: DeepPartial<ComplexObject> = {
 True name: "Bob",
 True address: {
 True city: "London"
 True }
 True};
 True
 Trueconst deepRequired: DeepRequired<DeepPartial<ComplexObject>> = {
 True name: "Charlie",
 True age: 25,
 True address: {
 True street: "456 Oak Ave",
 True city: "Paris",
 True country: "France"
 True },
 True hobbies: []
 True};
 True
 Truetype TestUnion = IsUnion<string | number>; // true
 Truetype TestNonUnion = IsUnion<string>; // false
 True
 Truetype ComplexKeys = Keys<ComplexObject>; // "name" | "age" | "address" | "hobbies"
 Truetype ComplexValues = Values<ComplexObject>; // string | number | { street: string; city: string; country: string; } | string[]
 True```

 False## 8. 类型编程
 False
 False类型编程是使用 TypeScript 的类型系统来执行编译时计算和类型操作的技术。
 False
 False### 8.1 类型级别的计算
 False
```typescript
 True// 类型级别的计算
 True
 True// 数字类型的计算
 Truetype Add<T extends number, U extends number> = T extends 0 ? U : U extends 0 ? T : never;
 Truetype Multiply<T extends number, U extends number> = T extends 0 ? 0 : U extends 0 ? 0 : never;
 True
 True// 字符串类型的操作
 Truetype Concat<T extends string, U extends string> = `${T}${U}`;
 Truetype Uppercase<T extends string> = T extends `${infer L}${infer R}` 
 True ? `${Uppercase<L>}${Uppercase<R>}` 
 True : T;
 True
 True// 数组类型的操作
 Truetype Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : [];
 Truetype Length<T extends any[]> = T['length'];
 True
 True// 使用示例
 Truetype Result1 = Concat<"Hello", " World">; // "Hello World"
 Truetype Result2 = Reverse<[1, 2, 3, 4, 5]>; // [5, 4, 3, 2, 1]
 Truetype Result3 = Length<[1, 2, 3]>; // 3
 True```

 False### 8.2 类型级别的逻辑
 False
```typescript
 True// 类型级别的逻辑
 True
 True// 类型相等性检查
 Truetype IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false;
 True
 True// 类型包含性检查
 Truetype Includes<T extends any[], U> = T extends [infer F, ...infer R]
 True ? IsEqual<F, U> extends true
 True ? true
 True : Includes<R, U>
 True : false;
 True
 True// 类型条件逻辑
 Truetype If<C extends boolean, T, F> = C extends true ? T : F;
 True
 True// 使用示例
 Truetype TestEqual1 = IsEqual<string, string>; // true
 Truetype TestEqual2 = IsEqual<string, number>; // false
 True
 Truetype TestIncludes1 = Includes<[1, 2, 3, 4, 5], 3>; // true
 Truetype TestIncludes2 = Includes<[1, 2, 3, 4, 5], 6>; // false
 True
 Truetype TestIf1 = If<true, string, number>; // string
 Truetype TestIf2 = If<false, string, number>; // number
 True```

 False## 9. 最佳实践
 False
 False### 9.1 类型设计原则
 False
 False- **类型安全**: 优先考虑类型安全，避免使用 `any` 类型。
 False- **可读性**: 设计清晰、易于理解的类型。
 False- **可维护性**: 复用类型定义，避免重复。
 False- **性能考虑**: 注意复杂类型可能导致编译时间增加。
 False- **渐进式类型**: 从简单类型开始，逐步添加复杂度。
 False
 False### 9.2 类型断言与非空断言
 False
 False- **谨慎使用**: 只在确定类型时使用类型断言和非空断言。
 False- **结合类型守卫**: 在使用断言前进行类型检查。
 False- **替代方案**: 优先使用可选链 (`?.`) 和空值合并 (`??`) 操作符。
 False
 False### 9.3 类型守卫
 False
 False- **明确检查**: 类型守卫应该明确检查变量的类型。
 False- **自定义守卫**: 为复杂类型创建自定义类型守卫。
 False- **组合使用**: 组合多种类型守卫来处理复杂场景。
 False
 False### 9.4 映射类型与条件类型
 False
 False- **复用现有类型**: 使用映射类型基于现有类型创建新类型。
 False- **类型推断**: 使用 `infer` 关键字从复杂类型中提取信息。
 False- **类型过滤**: 使用条件类型过滤和转换类型。
 False- **递归类型**: 合理使用递归类型处理嵌套结构。
 False
 False### 9.5 类型工具
 False
 False- **熟悉内置工具**: 充分利用 TypeScript 提供的内置类型工具。
 False- **创建自定义工具**: 根据项目需求创建自定义类型工具。
 False- **组合使用**: 灵活组合多个类型工具以满足复杂需求。
 False
 False## 10. 代码示例
 False
 False### 10.1 类型断言与非空断言
 False
```typescript
 True// 类型断言示例
 Truefunction processUnknown(value: unknown): void {
 True // 类型断言为 string
 True if (typeof value === "string") {
 True const str = value as string;
 True console.log(`String length: ${str.length}`);
 True }
 True 
 True // 类型断言为 number
 True if (typeof value === "number") {
 True const num = value as number;
 True console.log(`Number squared: ${num * num}`);
 True }
 True 
 True // 类型断言为对象
 True if (typeof value === "object" && value !== null) {
 True const obj = value as { name: string; age: number };
 True console.log(`Object: ${obj.name}, ${obj.age}`);
 True }
 True}
 True
 True// 非空断言示例
 Trueinterface User {
 True id: number;
 True name: string;
 True email?: string;
 True address?: {
 True street: string;
 True city: string;
 True };
 True}
 True
 Truefunction getUserEmail(user: User): string {
 True // 非空断言
 True return user.email!;
 True}
 True
 Truefunction getStreet(user: User): string {
 True // 链式非空断言
 True return user.address!.street!;
 True}
 True
 True// 使用示例
 Trueconst user: User = {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com",
 True address: {
 True street: "123 Main St",
 True city: "New York"
 True }
 True};
 True
 TrueprocessUnknown("Hello"); // 输出: String length: 5
 TrueprocessUnknown(42); // 输出: Number squared: 1764
 TrueprocessUnknown(user); // 输出: Object: Alice, 1
 True
 Trueconsole.log(getUserEmail(user)); // 输出: alice@example.com
 Trueconsole.log(getStreet(user)); // 输出: 123 Main St
 True```

 False### 10.2 类型守卫
 False
```typescript
 True// 类型守卫示例
 True
 True// 自定义类型守卫
 Truefunction isString(value: any): value is string {
 True return typeof value === "string";
 True}
 True
 Truefunction isNumber(value: any): value is number {
 True return typeof value === "number";
 True}
 True
 Truefunction isBoolean(value: any): value is boolean {
 True return typeof value === "boolean";
 True}
 True
 Truefunction isObject(value: any): value is object {
 True return typeof value === "object" && value !== null;
 True}
 True
 Truefunction isArray(value: any): value is any[] {
 True return Array.isArray(value);
 True}
 True
 True// 接口类型守卫
 Trueinterface Person {
 True name: string;
 True age: number;
 True}
 True
 Truefunction isPerson(value: any): value is Person {
 True return (
 True isObject(value) &&
 True isString((value as Person).name) &&
 True isNumber((value as Person).age)
 True );
 True}
 True
 True// 使用示例
 Truefunction processValue(value: unknown): void {
 True if (isString(value)) {
 True console.log(`String: ${value.toUpperCase()}`);
 True } else if (isNumber(value)) {
 True console.log(`Number: ${value.toFixed(2)}`);
 True } else if (isBoolean(value)) {
 True console.log(`Boolean: ${value}`);
 True } else if (isArray(value)) {
 True console.log(`Array length: ${value.length}`);
 True } else if (isPerson(value)) {
 True console.log(`Person: ${value.name}, ${value.age}`);
 True } else {
 True console.log(`Unknown type`);
 True }
 True}
 True
 TrueprocessValue("Hello"); // 输出: String: HELLO
 TrueprocessValue(42); // 输出: Number: 42.00
 TrueprocessValue(true); // 输出: Boolean: true
 TrueprocessValue([1, 2, 3]); // 输出: Array length: 3
 TrueprocessValue({ name: "Alice", age: 30 }); // 输出: Person: Alice, 30
 TrueprocessValue(null); // 输出: Unknown type
 True```

 False### 10.3 映射类型与条件类型
 False
```typescript
 True// 映射类型与条件类型示例
 True
 True// 基础接口
 Trueinterface Product {
 True id: number;
 True name: string;
 True price: number;
 True description: string;
 True inStock: boolean;
 True}
 True
 True// 映射类型
 True
 True// 只读产品
 Truetype ReadonlyProduct = Readonly<Product>;
 True
 True// 可选产品
 Truetype OptionalProduct = Partial<Product>;
 True
 True// 产品ID和名称
 Truetype ProductInfo = Pick<Product, "id" | "name">;
 True
 True// 产品不含描述
 Truetype ProductWithoutDescription = Omit<Product, "description">;
 True
 True// 条件类型
 True
 True// 提取字符串属性
 Truetype StringProperties<T> = {
 True [K in keyof T as T[K] extends string ? K : never]: T[K];
 True};
 True
 True// 提取数字属性
 Truetype NumberProperties<T> = {
 True [K in keyof T as T[K] extends number ? K : never]: T[K];
 True};
 True
 True// 提取布尔属性
 Truetype BooleanProperties<T> = {
 True [K in keyof T as T[K] extends boolean ? K : never]: T[K];
 True};
 True
 True// 使用示例
 Trueconst readonlyProduct: ReadonlyProduct = {
 True id: 1,
 True name: "Laptop",
 True price: 999.99,
 True description: "A powerful laptop",
 True inStock: true
 True};
 True// readonlyProduct.price = 899.99; // 编译错误
 True
 Trueconst optionalProduct: OptionalProduct = {
 True id: 2,
 True name: "Mouse"
 True};
 True
 Trueconst productInfo: ProductInfo = {
 True id: 3,
 True name: "Keyboard"
 True};
 True
 Trueconst productWithoutDescription: ProductWithoutDescription = {
 True id: 4,
 True name: "Monitor",
 True price: 199.99,
 True inStock: false
 True};
 True
 Trueconst stringProps: StringProperties<Product> = {
 True name: "Laptop",
 True description: "A powerful laptop"
 True};
 True
 Trueconst numberProps: NumberProperties<Product> = {
 True id: 1,
 True price: 999.99
 True};
 True
 Trueconst booleanProps: BooleanProperties<Product> = {
 True inStock: true
 True};
 True
 Trueconsole.log(readonlyProduct);
 Trueconsole.log(optionalProduct);
 Trueconsole.log(productInfo);
 Trueconsole.log(productWithoutDescription);
 Trueconsole.log(stringProps);
 Trueconsole.log(numberProps);
 Trueconsole.log(booleanProps);
 True```

 False### 10.4 高级类型组合
 False
```typescript
 True// 高级类型组合示例
 True
 True// 基础类型
 Trueinterface User {
 True id: number;
 True name: string;
 True email: string;
 True}
 True
 Trueinterface Address {
 True street: string;
 True city: string;
 True country: string;
 True}
 True
 Trueinterface Order {
 True id: number;
 True userId: number;
 True total: number;
 True items: OrderItem[];
 True}
 True
 Trueinterface OrderItem {
 True productId: number;
 True quantity: number;
 True price: number;
 True}
 True
 True// 高级类型
 True
 True// 带地址的用户
 Truetype UserWithAddress = User & { address: Address };
 True
 True// 订单详情（包含用户信息）
 Truetype OrderWithUser = Order & {
 True user: User;
 True};
 True
 True// 可选订单项
 Truetype OptionalOrderItem = Partial<OrderItem>;
 True
 True// 只读订单
 Truetype ReadonlyOrder = Readonly<Order>;
 True
 True// 条件类型：提取订单中的产品ID
 Truetype ProductIdsFromOrder<T extends Order> = T['items'][number]['productId'];
 True
 True// 使用示例
 Trueconst userWithAddress: UserWithAddress = {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com",
 True address: {
 True street: "123 Main St",
 True city: "New York",
 True country: "USA"
 True }
 True};
 True
 Trueconst orderWithUser: OrderWithUser = {
 True id: 101,
 True userId: 1,
 True total: 1299.98,
 True items: [
 True { productId: 1, quantity: 1, price: 999.99 },
 True { productId: 2, quantity: 2, price: 149.995 }
 True ],
 True user: {
 True id: 1,
 True name: "Alice",
 True email: "alice@example.com"
 True }
 True};
 True
 Trueconst optionalOrderItem: OptionalOrderItem = {
 True productId: 3,
 True quantity: 1
 True};
 True
 Trueconst readonlyOrder: ReadonlyOrder = {
 True id: 102,
 True userId: 2,
 True total: 499.99,
 True items: [
 True { productId: 4, quantity: 1, price: 499.99 }
 True ]
 True};
 True// readonlyOrder.total = 399.99; // 编译错误
 True
 True// 类型级别提取产品ID
 Truetype ProductIds = ProductIdsFromOrder<Order>; // number
 True
 Trueconsole.log(userWithAddress);
 Trueconsole.log(orderWithUser);
 Trueconsole.log(optionalOrderItem);
 Trueconsole.log(readonlyOrder);
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化 TS 类型演算与条件类型机制。
 False- 2026-04-05: 扩写内容，增加详细的类型断言、非空断言、类型守卫、映射类型、条件类型、高级类型组合、类型工具、类型编程、最佳实践和代码示例等内容。
 False