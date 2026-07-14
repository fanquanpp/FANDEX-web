# 更新日志

## v2.0.0（2026-07-14）

### 架构重构（跨项目统一重构）

本次为大版本更新，落地三层架构（UI/Service/Data）、强化类型安全、重写代码运行沙箱，并建立测试基线。

#### 架构重构

- 落地三层架构（UI 层 / Service 层 / Data 层），新增 Service 层骨架 6 个文件：
  - `src/services/doc-service.ts` 文档查询与导航服务
  - `src/services/module-service.ts` 模块查询服务
  - `src/services/tag-service.ts` 标签聚合服务
  - `src/services/glossary-service.ts` 术语查询服务
  - `src/services/progress-service.ts` 学习进度服务
  - `src/services/index.ts` 服务层统一导出（UI 层唯一入口）
- 改造 10 个 UI 层文件移除直接 `getCollection` 调用，统一通过 Service 层访问数据层
- 新增 `src/components/BaseLayout.astro` 基础布局，`HomeLayout` 与 `Layout` 继承共享代码，消除重复样式与脚本

#### 去重与类型安全

- 统一 `docSlug` 函数定义至 `src/lib/modules.ts`，消除 4 处重复定义
- 抽取 `src/lib/external-loader.ts`（Mermaid 与 DOMPurify 异步加载缓存）、`src/lib/mermaid-renderer.ts`（Mermaid 初始化与渲染）、`src/lib/reading-time.ts`（阅读时长计算），消除多处重复加载逻辑
- 将 `roadmap.astro` 内联的 11 个 Phase 与 10 个职业路径数据外置为 `src/data/roadmap.json`
- 新增类型声明文件：`src/types/mermaid.d.ts`、`src/types/dompurify.d.ts`、`src/types/pagefind.d.ts`
- 消除全项目 `any` 类型（`search-worker.ts`、`rehype-lazy-images.ts`、`remark-admonition.ts`、`tags/index.astro`、`map.astro` 等）
- `tsconfig.json` 严格模式实际生效，`astro check` 全量通过无 `any` 警告

#### code-runner 沙箱重写

- 重写 `src/lib/code-runner.ts` 为 iframe sandbox 模式（`sandbox="allow-scripts"` 不带 `allow-same-origin`）
- 移除 `UNSAFE_PATTERNS` 黑名单机制，改用跨域隔离
- 实现 5 秒超时机制（`setTimeout` + iframe 清理）
- `console.log/info/warn/error` 通过 `postMessage` 上报至父页面
- 沙箱内执行 `window.parent.document.body.innerHTML = ''` 与 `globalThis.eval('fetch("/")')` 均被隔离

#### 配置集中化

- 新增 `src/config/runtime.ts`，集中管理 `SITE.url`、Mermaid CDN URL、DOMPurify CDN URL、code-runner 超时时长、FUSE 阈值
- 配置项优先从 `import.meta.env` 读取，回退到默认值，可通过环境变量覆盖

#### CI 质量门禁修复

- 移除 `.github/workflows/ci.yml` 中 lint Job 的 `continue-on-error: true`
- 新增 `type-check` Job 执行 `astro check`，作为 deploy Job 的前置依赖
- `.github/workflows/deploy.yml` 在 Pagefind 构建前显式安装 `@pagefind/linux-x64`
- 补充 `prettier-plugin-astro` 依赖，`lint-staged` 配置增加 `astro check` 与 `tsc --noEmit` 钩子
- 完善 `.gitignore`（`.env`、`coverage/`、`*.log`、`.DS_Store`、`Thumbs.db` 等）

#### 测试基线建立

- 新增 99 个单元测试，覆盖核心模块：
  - `src/lib/modules.test.ts` 模块查询与分类逻辑
  - `src/lib/code-runner.test.ts` 沙箱执行、超时、console 捕获、错误捕获、沙箱逃逸场景
  - `src/lib/progress.test.ts` 学习进度持久化
  - `scripts/build-search-index.test.mjs` 搜索索引生成
  - `scripts/build-glossary-index.test.mjs` 术语索引生成
- CI 中新增 test Job 执行 `npm run test`，作为 deploy Job 的前置依赖

---

## v1.1.0（2026-06-24）

### 正式发行版

FANDEX 线上学习平台，内容基准仓库，基于 Astro 5 + Vue 3 构建。

#### 新增

- 首页改造为 FANDEX 生态门户，新增"FANDEX 生态"区域
- 三项目联动入口：FANDEX-web（线上平台）、FANDEX-exe（桌面端）、FANDEX-App（移动端）
- 导航栏新增"桌面端"下载链接
- 页脚新增三项目联动链接
- 程序图标字母 F（favicon.svg + logo-mark 方块样式）
- 51 模块 1995 篇文档，浏览器直接访问
- 交互测验、知识地图、全文搜索、学习路线、标签索引
- 进度追踪、术语悬浮、暗色模式、响应式布局

#### 技术栈

- Astro 5 静态站点生成（SSG），岛屿架构
- Vue 3 按需水合（client:load / client:visible）
- Shiki 双主题代码高亮，构建时零 JS
- Pagefind + Fuse.js 搜索引擎
- Service Worker 离线缓存
- Husky + lint-staged + Prettier 代码质量
