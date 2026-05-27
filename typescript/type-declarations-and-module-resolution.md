# TypeScript 类型声明与模块解析 (Declarations & Module Resolution)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: TypeScript Advanced
 False> @Description: 讲清 `.d.ts`、全局声明、第三方类型管理，以及 Node/打包器场景下的模块解析与 ESM/CJS 互操作。 | Declarations and module resolution in TypeScript.
 False
 False---
 False
 False## 目录
 False
 False1. [`.d.ts` 是什么](#`.d.ts`-是什么)
 False2. [全局声明](#全局声明)
 False3. [第三方类型管理](#第三方类型管理)
 False4. [模块解析策略](#模块解析策略)
 False5. [ESM/CJS 互操作](#esm/cjs-互操作)
 False6. [`package.json` 的 `exports` 与类型解析](#`package.json`-的-`exports`-与类型解析)
 False7. [常见排查清单](#常见排查清单)
 False
 False---
 False
 False## 1. `.d.ts` 是什么 (What is .d.ts)
 False
 False`.d.ts`（声明文件）用于描述 JavaScript 模块/全局变量的类型信息，让 TypeScript 能在不改动运行时代码的情况下进行类型检查与智能提示。
 False
 False典型场景：
 False
 False- 纯 JavaScript 库希望为使用者提供类型
 False- 工程里存在没有类型的脚本或全局变量
 False
 False## 2. 全局声明 (Global Declarations)
 False
 False### 2.1 `declare global`
 False
 False当你需要扩展全局类型（例如给 `Window` 加字段）：
 False
```ts
 Trueexport {}
 True
 Truedeclare global {
 True interface Window {
 True __APP_VERSION__: string
 True }
 True}
 True```

 False要点：
 False
 False- 文件必须是模块（加 `export {}`）否则会污染全局作用域解析方式
 False
 False### 2.2 `declare namespace`（仅在必要时）
 False
 False用于旧式全局库或脚本注入式变量。现代代码更推荐 ESM 导入导出。
 False
 False## 3. 第三方类型管理 (Managing 3rd-party Types)
 False
 False常见来源：
 False
 False- 包自带类型（`types` 字段或内置 `.d.ts`）
 False- `@types/*`（DefinitelyTyped）
 False
 False关键点：
 False
 False- `types`/`typeRoots` 会影响 TypeScript 在哪里找类型声明
 False- 过度配置 `typeRoots` 容易导致“找不到类型”
 False
 False## 4. 模块解析策略 (Module Resolution)
 False
 False`moduleResolution` 决定 TypeScript 如何从 `import` 语句推导目标文件与类型。
 False
 False常见选择：
 False
 False- `Bundler`：面向打包器的解析策略（适合前端与现代构建工具）
 False- `NodeNext`：对齐 Node ESM/CJS 的解析规则（适合 Node ESM 工程）
 False- `Node`：传统 Node 解析（偏旧）
 False
 False## 5. ESM/CJS 互操作 (Interop)
 False
 False常见问题：
 False
 False- 有的库是 CJS：`module.exports = ...`
 False- 你的工程是 ESM：`import ... from ...`
 False
 False常用配置：
 False
 False- `esModuleInterop: true`
 False- `allowSyntheticDefaultImports: true`
 False
 False但要理解：
 False
 False- 这些开关主要影响“类型层面”和“编译产物的导入形式”
 False- 运行时是否工作仍取决于 Node/打包器对 CJS/ESM 的支持
 False
 False## 6. `package.json` 的 `exports` 与类型解析
 False
 False现代包经常使用 `exports` 字段限制可导入路径，TypeScript 解析时也会尊重该字段。
 False
 False排查思路：
 False
 False- 确认包是否提供对应入口的 `.d.ts`
 False- 检查 `exports` 是否包含 `types` 条目或映射
 False- 若是 NodeNext 工程，确认文件扩展名与导入路径是否匹配（`.js`/`.ts` 的关系）
 False
 False## 7. 常见排查清单 (Checklist)
 False
 False- 导入路径是否与实际输出一致（NodeNext 下经常要求显式扩展名）
 False- `types`/`typeRoots` 是否覆盖了默认搜索路径
 False- `module`/`moduleResolution` 是否匹配你的运行环境
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-06: 新增「类型声明与模块解析」知识点，补充声明文件与 ESM/CJS 互操作要点
 False