# 更新日志

## v1.1.0（2026-06-24）

### 正式发行版

FANDEX 线上学习平台，内容基准仓库，基于 Astro 5 + Vue 3 构建。

#### 新增

- 首页改造为 FANDEX 生态门户，新增"FANDEX 生态"区域
- 三项目联动入口：FANDEX-web（线上平台）、FANDEX-exe（桌面端）、FANDEX-App（移动端）
- 导航栏新增"桌面端"下载链接
- 页脚新增三项目联动链接
- 程序图标字母 F（favicon.svg + logo-mark 方块样式）
- 51 模块 1993 篇文档，浏览器直接访问
- 交互测验、知识地图、全文搜索、学习路线、标签索引
- 进度追踪、术语悬浮、暗色模式、响应式布局

#### 技术栈

- Astro 5 静态站点生成（SSG），岛屿架构
- Vue 3 按需水合（client:load / client:visible）
- Shiki 双主题代码高亮，构建时零 JS
- Pagefind + Fuse.js 搜索引擎
- Service Worker 离线缓存
- Husky + lint-staged + Prettier 代码质量
