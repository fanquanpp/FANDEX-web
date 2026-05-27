# TypeScript 工程化配置 (Engineering Configuration)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: TypeScript Advanced
 False> @Description: 以 tsconfig 为核心，梳理编译目标、模块系统、严格模式、增量构建与项目分层的工程化配置实践。 | Practical tsconfig and build configuration for real projects.
 False
 False---
 False
 False## 目录
 False
 False1. [配置的核心：tsconfig.json](#配置的核心：tsconfig.json)
 False2. [常见关键选项](#常见关键选项)
 False3. [分层 tsconfig（多配置拆分）](#分层-tsconfig（多配置拆分）)
 False4. [增量编译与项目引用](#增量编译与项目引用)
 False5. [路径别名](#路径别名)
 False6. [常见坑](#常见坑)
 False
 False---
 False
 False## 1. 配置的核心：tsconfig.json
 False
 False`tsconfig.json` 决定 TypeScript 的编译输入、输出与类型检查策略。工程化配置的目标不是“开满所有选项”，而是：
 False
 False- 提升类型检查质量（减少隐式 any 与不一致）
 False- 控制构建产物（目标语法、模块格式、输出目录）
 False- 兼顾构建速度（增量编译、项目引用）
 False
 False## 2. 常见关键选项 (Key Options)
 False
 False### 2.1 编译目标与标准库
 False
 False- `target`：输出 JavaScript 的语法级别（如 `ES2020`）
 False- `lib`：选择类型声明的标准库（如 `DOM`、`ES2020`）
 False
 False### 2.2 模块相关
 False
 False- `module`：模块格式（`ESNext`、`CommonJS` 等）
 False- `moduleResolution`：模块解析策略（`Bundler`/`NodeNext`/`Node`）
 False- `esModuleInterop`：CJS/ESM 互操作常用开关
 False
 False实践建议：
 False
 False- 前端/打包器项目通常 `module: ESNext` + `moduleResolution: Bundler`
 False- Node ESM 项目常用 `module: NodeNext` + `moduleResolution: NodeNext`
 False
 False### 2.3 严格模式与检查质量
 False
 False强烈建议开启：
 False
 False- `strict: true`
 False
 False在迁移期可分阶段打开：
 False
 False- `noImplicitAny`
 False- `strictNullChecks`
 False- `noUncheckedIndexedAccess`
 False
 False### 2.4 输出与目录
 False
 False- `outDir`：输出目录（避免污染源码目录）
 False- `rootDir`：源码根目录
 False- `declaration`：是否生成 `.d.ts`
 False
 False## 3. 分层 tsconfig（多配置拆分）
 False
 False常见做法：
 False
 False- `tsconfig.json`：基础配置（被继承）
 False- `tsconfig.build.json`：生产构建配置（关闭测试/脚本目录，开启输出）
 False- `tsconfig.test.json`：测试相关配置
 False
 False示例：
 False
```json
 True{
 True "extends": "./tsconfig.json",
 True "compilerOptions": {
 True "outDir": "dist",
 True "declaration": true
 True },
 True "include": ["src"]
 True}
 True```

 False## 4. 增量编译与项目引用 (Incremental & Project References)
 False
 False在大型仓库中，推荐使用项目引用：
 False
 False- `composite: true`
 False- `references: [...]`
 False
 False收益：
 False
 False- 缓存类型检查结果，显著提升二次构建速度
 False- 支持模块化拆分与边界治理
 False
 False## 5. 路径别名 (paths)
 False
 False`baseUrl` + `paths` 可以让导入更清晰：
 False
```json
 True{
 True "compilerOptions": {
 True "baseUrl": ".",
 True "paths": {
 True "@/*": ["src/*"]
 True }
 True }
 True}
 True```

 False注意：
 False
 False- TypeScript 只负责“类型层面”解析，运行时还需打包器/Node 支持同样的别名规则
 False
 False## 6. 常见坑 (Pitfalls)
 False
 False- `skipLibCheck` 会隐藏第三方类型问题，建议仅在构建速度瓶颈时谨慎开启
 False- `moduleResolution` 与 `module` 不匹配会导致导入解析异常
 False- `paths` 配置后如果运行时没同步配置，会出现“类型通过但运行报错”
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-06: 新增「工程化配置」知识点，补充 tsconfig 分层与大型项目实践
 False