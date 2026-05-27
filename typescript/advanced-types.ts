/*
 * @Author:      Anonymous
 * @Algorithm:   泛型与条件类型 (Generics & Conditional Types)
 * @Language:    TypeScript 5.0+
 * @Time Compl.: N/A
 * @Description: 演示 TypeScript 的高级类型，包括泛型约束、条件类型、Infer 关键字和映射类型。 | Demonstrate advanced TypeScript types including generic constraints, conditional types, Infer keyword, and mapped types.
 * @Teaching:    掌握类型编程是进阶 TS 的必经之路。 | Mastering type programming is essential for TS advancement.
 */

// 1. 泛型约束 | Generic Constraints
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): T {
    console.log(`Length: ${arg.length}`);
    return arg;
}

// 2. 条件类型与 Infer | Conditional Types & Infer
type UnpackArray<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type UnpackedString = UnpackArray<StringArray>; // string
type NotAnArray = number;
type UnpackedNumber = UnpackArray<NotAnArray>; // number

// 3. 映射类型 | Mapped Types
type ReadonlyObject<T> = {
    readonly [P in keyof T]: T[P];
};

interface User {
    id: number;
    name: string;
}

type ReadonlyUser = ReadonlyObject<User>;

// 4. 示例代码 | Example usage
const user: ReadonlyUser = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

logLength("Hello TS");
logLength([1, 2, 3]);

console.log("TypeScript Advanced Types example finished! | TypeScript 高级类型示例完成！");

// Online Preview: https://www.typescriptlang.org/play
