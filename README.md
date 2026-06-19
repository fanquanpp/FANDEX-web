<div align="center">

# FANDEX

**零基础到本科毕业的完整自学路径** · 内容基准仓库

一份无需任何先修门槛的计算机自学教程，以系统化的知识组织方式，帮助自学者从第一行代码起步，逐步建立达到计算机专业本科毕业生水平的完整知识体系。六大领域环环相扣，51 个模块覆盖工具链、开发语言、数据库、计算机科学、工程基础设施与数据技术，1993 篇结构化文档陪伴每一位自学者走完从入门到精通的完整旅程。

[![在线阅读](https://img.shields.io/badge/在线阅读-fanquanpp.github.io%2FFANDEX-2563eb?style=for-the-badge&logo=github&logoColor=white)](https://fanquanpp.github.io/FANDEX/)
[![Astro 5](https://img.shields.io/badge/Astro-5-ff5d01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![文档数](https://img.shields.io/badge/文档-1993-0ea5e9?style=flat-square)](https://fanquanpp.github.io/FANDEX/)
[![模块数](https://img.shields.io/badge/模块-51-8b5cf6?style=flat-square)](https://fanquanpp.github.io/FANDEX/)
[![完全开源](https://img.shields.io/badge/开源-完全共享-22c55e?style=flat-square)](https://github.com/fanquanpp/FANDEX)

</div>

---

## 这是什么

FANDEX 是一份面向零基础学习者的计算机科学自学教程。它不假设任何编程经验，从环境搭建和 Markdown 写作起步，沿着精心设计的前置知识链路，逐步引导学习者进入编程世界、理解计算机原理、掌握工程实践，最终达到计算机专业本科毕业生的知识水平。

每一篇文档都经过结构化编排，包含概念讲解、代码示例与实践要点。模块之间通过前置知识关系自然衔接：工具链奠定操作基础，开发语言打开编程世界，数据库承载持久化能力，计算机科学构建理论根基，工程与基础设施连接理论与实践，数据技术与 AI 延伸至前沿应用。学习者可按需跳转，亦可循序渐进。

## 仓库特色

本仓库是 FANDEX 知识体系的**内容基准仓库**，承担以下独特角色：

| 特色维度 | 说明 |
| :--- | :--- |
| 内容基准 | 全部项目的根本内容源，所有文档、索引及数据均以此为唯一蓝本，其余仓库只读引用 |
| 文档完整 | 1993 篇文档覆盖 51 个模块，文档体系最为完善，是内容最齐全的版本 |
| 原始纯净 | 最早建立的仓库，保持单体 Astro 项目结构，无 monorepo 复杂度，易于理解和贡献 |
| 在线查阅 | 基于 GitHub Pages 构建的云端在线查阅平台，无需安装，浏览器直接访问 |
| 交互学习 | 内置进度追踪、术语悬浮、交互测验、知识地图、全文搜索等学习辅助功能 |
| 完全开源 | 所有内容完全开源共享，不主张知识产权保护，可自由获取、使用、修改和分发 |

## 关联项目

FANDEX 生态包含以下关联仓库，各仓库代码互相独立、内容互相关联，内容基准统一以本仓库为准：

| 仓库 | 定位 | 特色 |
| :--- | :--- | :--- |
| [FANDEX-Web](https://github.com/fanquanpp/FANDEX-Web) | AI 增强学习平台 | 在本仓库内容基础上引入五项 AI 能力（语义搜索/智能测验/学习推荐/路线规划/知识图谱问答），四层分离架构，提供 Web/桌面/离线三种交付形态 |
| [FANDEX-App](https://github.com/fanquanpp/FANDEX-App) | 离线移动速查应用 | Android 原生应用，完全离线，零基础学习者的语法速查伴侣，Kotlin + Jetpack Compose 原生渲染，支持中英日三语界面 |

## 模块总览

| 类别 | 模块 |
| :--- | :--- |
| 工具链 | 入门指南 · Markdown · Git · GitHub |
| 开发语言 | HTML5 · CSS · JavaScript · TypeScript · Vue 3 · React · C · C++ · Java · Kotlin · C# · Python · Go · Lua · HarmonyOS |
| 数据库 | SQL · MySQL · PostgreSQL · Redis |
| 计算机科学 | 算法与数据结构 · 计算机基础 · 高等数学 · 离散数学 · 线性代数 · 概率论与数理统计 · 英语 |
| 工程与基础设施 | 运维 · 网络技术 · 网络安全 · 云计算 · 物联网 · 软件测试 · AI Agent · 软件工程 · 软件架构 · 工程实践 |
| 数据技术 | 数据分析 · 大数据 · 机器学习 · 深度学习 · AI工程 · 计算机视觉 · 自然语言处理 · 大语言模型 · 生成式AI · 多模态AI · AI伦理与安全 |

> 1993 篇文档 · 51 个模块 · 27 篇术语表 · 交互式测验 · 知识地图

## 功能特性

| 特性 | 说明 |
| :--- | :--- |
| 进度追踪 | localStorage + IndexedDB 双存储备份，支持导出/导入 JSON |
| 术语悬浮 | 自动匹配文档中的专业术语并弹出解释，桌面端 tooltip / 移动端 modal |
| 交互测验 | 填空 / 选择 / 代码修正三种题型，即时反馈 |
| 知识地图 | Mermaid 可视化概念关联 |
| 前置知识 | 模块间依赖关系展示，自动渲染前置模块链接 |
| 全文搜索 | Pagefind 客户端搜索索引 + Fuse.js Web Worker，支持按模块/难度筛选 |
| 标签索引 | 跨模块知识检索，按模块/难度/相关度筛选 |
| 学习路线 | 10 条职业方向路径可视化（11 阶段递进） |
| 离线可用 | Service Worker 缓存（Cache First + Network First + SWR） |
| 暗色模式 | Dark / Light 主题切换，localStorage 持久化 + 闪烁防护 |
| 响应式 | 桌面端侧边栏 + 移动端抽屉导航 + 底部导航栏 |
| 代码运行 | JS/TS 代码块 Web Worker 沙箱执行，5 秒超时保护 |

## 技术栈

| 层级 | 技术 | 说明 |
| :--- | :--- | :--- |
| 框架 | Astro 5 | 静态站点生成 (SSG)，岛屿架构 |
| 交互 | Vue 3 | `client:load` / `client:visible` 按需水合 |
| 高亮 | Shiki | 双主题代码高亮 (github-light / github-dark)，构建时零 JS |
| 搜索 | Pagefind + Fuse.js | 构建后索引 + Web Worker 模糊搜索 |
| 图表 | Mermaid 11 | 知识地图渲染，CDN 按需加载 |
| SEO | JSON-LD + Sitemap | 结构化数据 + Open Graph + Twitter Card |
| 离线 | Service Worker | Cache First (哈希资源) + Network First (HTML/数据) + SWR (图片) |
| 测试 | Vitest | 单元测试 |
| 质量 | Husky + lint-staged + Prettier | Pre-commit 自动格式化 |
| CI/CD | GitHub Actions | 三阶段流水线 (setup -> build -> deploy) |

## 仅获取文档内容

如果你只需要文档 Markdown 源文件（`src/content/docs/`），无需克隆整个项目，可以使用 Git sparse-checkout：

```bash
# 初始化空仓库
git clone --no-checkout --filter=blob:none https://github.com/fanquanpp/FANDEX.git
cd FANDEX

# 启用 sparse-checkout 并指定路径
git sparse-checkout set src/content/docs

# 拉取内容
git checkout
```

> 每篇文档均为独立 Markdown 文件，包含 frontmatter 元数据（标题、模块、难度、标签等）和正文内容，可直接在任何 Markdown 阅读器中使用。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（端口 3000）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 运行测试
npm run test

# 预发布质量检查（需先构建）
npm run qa

# 内容质量审计（源码级）
node scripts/content-audit.mjs
```

> 开发模式下 Pagefind 搜索索引未生成，搜索功能不可用。需 `npm run build` 后 `npm run preview` 才能使用搜索。

## 项目结构

<details>
<summary>点击展开</summary>

```
FANDEX/
├── .github/workflows/     # GitHub Actions (部署 / CodeQL / 内容审计)
├── .husky/                # Git pre-commit 钩子
├── public/
│   ├── data/              # 搜索索引 + 术语索引 (构建生成)
│   ├── fonts/             # JetBrains Mono 字体
│   ├── sw.js              # Service Worker
│   └── robots.txt         # SEO
├── scripts/               # 工具脚本
│   ├── build-glossary-index.mjs   # 术语索引构建
│   ├── build-search-index.mjs     # 搜索索引构建
│   ├── generate-cheatsheet-highlights.js  # 速查表高亮生成
│   ├── add-doc-relations.mjs              # 文档关联生成
│   ├── content-audit.mjs          # 内容质量审计
│   └── qa-check.mjs               # 预发布质量检查
├── src/
│   ├── components/        # Astro 组件
│   ├── content/
│   │   ├── docs/{51 模块}/ # 文档内容 (1993 篇)
│   │   ├── glossary/      # 术语表 (27 篇)
│   │   └── config.ts      # Zod Schema 定义
│   ├── islands/           # Vue 岛屿组件
│   ├── lib/               # 工具函数
│   ├── pages/             # 路由页面
│   ├── styles/            # 全局样式
│   └── workers/           # Web Worker
├── astro.config.ts        # Astro 配置
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── vitest.config.ts        # 测试配置
```

</details>

## 部署

仓库已配置 GitHub Actions 自动部署（`.github/workflows/deploy.yml`），push 到 `main` 分支即自动构建发布。

**流水线三阶段：**

1. **setup** — 安装依赖，缓存 `node_modules`
2. **build** — 构建站点，运行 QA 检查，上传产物
3. **deploy** — 部署到 GitHub Pages

Settings -> Pages -> Source 选择 **GitHub Actions** 即可。

## 内容说明

本仓库为全部项目的根本内容源，所有文档、索引及数据均以此为唯一蓝本。本仓库仅允许只读引用，其余仓库如需变更内容，须从本仓库复制后在其独立仓库内进行适配与优化。

本仓库所有内容均由人工与人工智能（AI）共同编写、搜集、整理与编排。受限于编撰方式与知识更新速度，内容可能存在遗漏、过时或错误之处，使用者应结合官方文档与权威资料进行独立验证。

本仓库鼓励学习者在学习过程中培养自主运用 AI 工具进行自学与信息辨别的能力。在人工智能时代，学会高效检索、交叉验证与批判性思考，是每一位自学者应当重视和提升的核心素养。

## 更新日志规则

| 级别 | 版本号变化 | 说明 | 日志书写方式 |
| :--- | :--- | :--- | :--- |
| 大版本更新 | `1.x.x` -> `2.x.x` | 新模块、新功能、新页面增加及重构（前端布局、排版） | 独立作为更新版本，详细说明更新内容 |
| 小更新 | `1.0.x` -> `1.1.x` | 小 BUG 修复（文档纠错、按钮位置调整、颜色优化不改变 UI 风格） | 写在大版本更新日志内，简要书写 |
| 补丁修复 | `1.x.0` -> `1.x.1` | 同一问题或其所属范围内的多次修复 | 写在小更新日志内，写"修复了一些 BUG" |

> 前端页面底部信息区域须标注最新版本号与更新日期，不包含更新内容。

## 开源共享声明

本仓库所有内容以开放共享为目的，不主张知识产权保护。任何个人或机构均可自由获取、使用、修改和分发，包括但不限于学习、研究、修改、分发及商业用途。因使用本仓库内容所产生的一切后果，由使用者自行承担，与本仓库及其作者、维护者无关。

本仓库所有内容均由人工与 AI 共同编写、搜集、整理与编排，可能存在遗漏、过时或错误之处，使用者应结合官方文档与权威资料进行独立验证。
