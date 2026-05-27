# TypeScript 练习题
 False
 False> @Module: typescript
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 以下哪个类型声明是合法的？
 False
 FalseA. `type T = string | number extends string ? 'yes' : 'no'`
 FalseB. `interface I { name: string; } & { age: number }`
 FalseC. `type T = { name: string } & { name: number }`
 FalseD. 以上都是合法声明
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: D
 False
 False**解析**: A 是条件类型，合法；B 是接口交叉类型写法（需用 `type` 语法 `type I = IA & IB`，但作为类型表达式合法）；C 交叉后 `name` 类型为 `string & number` 即 `never`，语法合法但实际不可赋值。三者语法层面均合法。
 False</details>
 False
 False### 2. 关于泛型约束，以下写法正确的是？
 False
 FalseA. `function f<T extends string | number>(arg: T): T`
 FalseB. `function f<T super string>(arg: T): T`
 FalseC. `function f<T: string>(arg: T): T`
 FalseD. `function f<T implements string>(arg: T): T`
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: A
 False
 False**解析**: TypeScript 使用 `extends` 关键字进行泛型约束，不支持 `super`、`:`、`implements` 作为泛型约束语法。`T extends string | number` 表示 `T` 必须是 `string` 或 `number` 的子类型。
 False</details>
 False
 False### 3. 以下代码中 `type Result` 的类型是？
 False
```typescript
 Truetype Result = Pick<{ name: string; age: number; email: string }, 'name' | 'email'>;
 True```

 FalseA. `{ name: string; email: string }`
 FalseB. `{ name: string; age: number; email: string }`
 FalseC. `{ age: number }`
 FalseD. 编译错误
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: A
 False
 False**解析**: `Pick<T, K>` 从类型 `T` 中选取属性集合 `K` 组成新类型。选取 `'name'` 和 `'email'`，结果为 `{ name: string; email: string }`。
 False</details>
 False
 False### 4. 以下代码能否通过类型检查？
 False
```typescript
 Truelet x: string | number = 42;
 Truelet y: string = x;
 True```

 FalseA. 能，因为 42 是 string
 FalseB. 不能，因为 x 可能是 number
 FalseC. 能，因为 TypeScript 会自动收窄
 FalseD. 不能，因为 y 没有初始化
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `x` 的类型是 `string | number`，不能直接赋值给 `string` 类型的变量 `y`，因为 `x` 可能是 `number`。需要类型收窄（如 `typeof x === 'string'`）或类型断言。
 False</details>
 False
 False### 5. 关于 TypeScript 装饰器，以下说法正确的是？
 False
 FalseA. 装饰器只能用于类声明
 FalseB. 装饰器是 ES 标准的一部分（截至 ES2024）
 FalseC. 类装饰器接收的参数是类的构造函数
 FalseD. 装饰器不能修改类的行为
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: 类装饰器接收构造函数作为唯一参数，可以用来修改或替换类定义。装饰器可用于类、方法、属性和参数。TC39 装饰器提案仍在推进中。装饰器完全可以修改类的行为。
 False</details>
 False
 False## 编程题
 False
 False### 1. 类型安全的事件发射器
 False
 False使用泛型和接口实现一个类型安全的事件系统 `EventEmitter<Events>`，其中 `Events` 是事件名到载荷类型的映射。
 False
 False**输入**:
```typescript
 Trueinterface MyEvents {
 True click: { x: number; y: number };
 True message: string;
 True}
 Trueconst emitter = new EventEmitter<MyEvents>();
 True```

 False**输出**: `emitter.on('click', (e) => ...)` 中 `e` 自动推断为 `{ x: number; y: number }`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```typescript
 Truetype Handler<T> = (payload: T) => void;
 True
 Trueclass EventEmitter<Events extends Record<string, any>> {
 True private listeners = new Map<keyof Events, Set<Handler<any>>>();
 True
 True on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): () => void {
 True if (!this.listeners.has(event)) {
 True this.listeners.set(event, new Set());
 True }
 True this.listeners.get(event)!.add(handler);
 True return () => this.off(event, handler);
 True }
 True
 True off<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void {
 True this.listeners.get(event)?.delete(handler);
 True }
 True
 True emit<K extends keyof Events>(event: K, payload: Events[K]): void {
 True this.listeners.get(event)?.forEach((handler) => handler(payload));
 True }
 True}
 True```
</details>
 False
 False### 2. 实现 DeepPartial
 False
 False实现 `DeepPartial<T>` 工具类型，将对象类型 `T` 的所有属性（包括嵌套属性）变为可选。
 False
 False**输入**: `{ a: { b: { c: number } }; d: string }`
 False**输出**: `{ a?: { b?: { c?: number } }; d?: string }`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```typescript
 Truetype DeepPartial<T> = {
 True [P in keyof T]?: T[P] extends object
 True ? T[P] extends Function
 True ? T[P]
 True : DeepPartial<T[P]>
 True : T[P];
 True};
 True```
</details>
 False
 False### 3. 类型安全的状态机
 False
 False使用可辨识联合（Discriminated Union）和泛型实现一个类型安全的状态机，确保状态转换只能在合法路径上进行。
 False
 False**输入**: 状态 `idle` → `loading` → `success` | `error`
 False**输出**: `transition('idle', 'start')` 合法，`transition('idle', 'succeed')` 编译报错
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```typescript
 Truetype State =
 True | { status: 'idle' }
 True | { status: 'loading' }
 True | { status: 'success'; data: string }
 True | { status: 'error'; error: Error };
 True
 Truetype TransitionMap = {
 True idle: 'start';
 True loading: 'succeed' | 'fail';
 True success: 'reset';
 True error: 'retry' | 'reset';
 True};
 True
 Trueclass StateMachine {
 True private state: State = { status: 'idle' };
 True
 True transition<S extends State['status']>(
 True from: S,
 True event: TransitionMap[S]
 True ): void {
 True switch (event) {
 True case 'start':
 True this.state = { status: 'loading' };
 True break;
 True case 'succeed':
 True this.state = { status: 'success', data: '' };
 True break;
 True case 'fail':
 True this.state = { status: 'error', error: new Error() };
 True break;
 True case 'retry':
 True this.state = { status: 'loading' };
 True break;
 True case 'reset':
 True this.state = { status: 'idle' };
 True break;
 True }
 True }
 True
 True getState(): State {
 True return this.state;
 True }
 True}
 True```
</details>
 False