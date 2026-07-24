<div align="center">

# FANDEX-web

**零基础到本科毕业的完整自学路径** · 线上学习平台

</div>

> **内容更新公告（2026-07）**
>
> FANDEX-Web 仓库内容（含文档）已暂停更新与维护，后续本仓库仅保留对美术风格、UI/UX 设计的探索性更新。FANDEX 体系项目正在进行整体整合与重构，后续将以全新仓库形式重新发布，且所有更新与维护工作将仅针对新仓库开展。
>
> 线上站点会在首页与文档页通过弹窗展示本公告，关闭后不再重复弹出。

---

一份无需任何先修门槛的计算机自学教程，以系统化的知识组织方式，帮助零基础自学者从第一行代码起步，逐步建立达到计算机专业本科毕业生水平的完整知识体系。六大领域环环相扣，51 个模块覆盖工具链、开发语言、数据库、计算机科学、工程基础设施与数据技术，近 2000 篇结构化文档陪伴每一位自学者走完从入门到精通的完整旅程。

[![在线阅读](https://img.shields.io/badge/在线阅读-fanquanpp.github.io%2FFANDEX--web-2563eb?style=for-the-badge&logo=github&logoColor=white)](https://fanquanpp.github.io/FANDEX-web/)
[![Astro 7](https://img.shields.io/badge/Astro-7-ff5d01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](./LICENSE)

## 核心特性

- **零基础友好**：不预设任何编程经验，模块间通过前置知识自然衔接
- **完整知识体系**：近 2000 篇文档覆盖 51 个模块，从工具链到 AI 工程的完整学习路径
- **交互学习**：内置进度追踪、术语悬浮、交互测验、知识地图、全文搜索等学习辅助功能
- **PWA 离线访问**：Service Worker 多策略缓存，支持添加到主屏幕
- **双主题响应式**：Dark / Light 主题切换，桌面端侧边栏 + 移动端抽屉导航 + 底部导航栏
- **AI 辅助理念**：不内置 AI 功能，鼓励学习者使用外部 AI 工具自主学习，文档结构适配 AI 检索与问答

## 快速开始

**环境要求**：Node.js 22 LTS + npm（或 pnpm / yarn）

```bash
npm install       # 安装依赖
npm run dev       # 本地开发（端口 3000）
npm run build     # 构建生产版本
npm run preview   # 预览构建结果（搜索功能需先 build）
npm run type-check
npm run test
```

> 开发模式下 Pagefind 搜索索引未生成，搜索功能不可用。需 `npm run build` 后 `npm run preview` 才能使用搜索。

仓库已配置 GitHub Actions 自动部署（`.github/workflows/deploy.yml`），push 到 `main` 分支即自动构建并部署至 GitHub Pages。

## 技术栈

Astro 7（SSG + 岛屿架构）· Vue 3（按需水合）· Tailwind CSS v4 · shadcn-vue (radix-vue) · Shiki 双主题高亮 · Pagefind + Fuse.js 双引擎搜索 · Mermaid 11 知识地图 · Pyodide 浏览器内 Python 执行 · IndexedDB + localStorage 进度双存储 · Service Worker 多策略缓存 · JSON-LD + Sitemap SEO。

## 关联项目

FANDEX 生态包含以下关联仓库，各仓库代码互相独立、内容互相关联，内容基准统一以本仓库为准：

| 仓库                                                  | 定位                                             |
| :---------------------------------------------------- | :----------------------------------------------- |
| [FANDEX-exe](https://github.com/fanquanpp/FANDEX-exe) | 跨平台桌面端（Tauri 2，Windows / macOS / Linux） |
| [FANDEX-App](https://github.com/fanquanpp/FANDEX-App) | Android 离线速查应用（Kotlin + Jetpack Compose） |

## 内容说明与免责

本仓库为全部项目的根本内容源，所有文档、索引及数据均以此为唯一蓝本，仅允许只读引用。内容均由人工与人工智能协同编撰，可能存在遗漏、过时或错误之处，使用者应结合官方文档与权威资料独立验证。

完整免责条款见 [DISCLAIMER.md](./DISCLAIMER.md)，贡献指南见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 许可证

本仓库所有内容基于 [MIT 许可证](./LICENSE) 完全开源。
