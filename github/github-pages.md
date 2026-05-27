# GitHub Pages 多站点方案（Jekyll、VitePress、Hugo）
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Advanced
 False> @Description: GitHub Pages 静态站点部署方案：Jekyll、VitePress、Hugo 构建与发布。 | Static site deployment on GitHub Pages with Jekyll, VitePress, Hugo.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [GitHub Pages 概述](#github-pages-概述)
 False3. [静态站点生成器对比](#静态站点生成器对比)
 False4. [部署方式](#部署方式)
 False5. [方案 A：Jekyll](#方案-a：jekyll)
 False6. [方案 B：VitePress](#方案-b：vitepress)
 False7. [方案 C：Hugo](#方案-c：hugo)
 False8. [自定义域名设置](#自定义域名设置)
 False9. [常见问题与解决方案](#常见问题与解决方案)
 False10. [最佳实践](#最佳实践)
 False11. [实际应用案例](#实际应用案例)
 False12. [与其他静态站点托管服务对比](#与其他静态站点托管服务对比)
 False13. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 背景
 False
 False**GitHub Pages** 可从分支或 **GitHub Actions** 发布静态文件到 `*.github.io` 或自定义域名。常见生成器：**Jekyll（Ruby）**、**VitePress（Vite + Vue 文档框架）**、**Hugo（Go）**。三者均输出 HTML/CSS/JS，差异在 **模板语言**、**构建速度** 与 **生态**。
 False
 False## 2. GitHub Pages 概述
 False
 False### 2.1 类型
 False
 False- **用户/组织站点**：`username.github.io` 或 `orgname.github.io`，从 `main` 分支构建
 False- **项目站点**：`username.github.io/repo`，从 `gh-pages` 分支或 `main` 分支的 `docs` 目录构建
 False
 False### 2.2 特点
 False
 False- **免费**：GitHub Pages 是免费的静态站点托管服务
 False- **自动 HTTPS**：为所有站点提供免费的 HTTPS 证书
 False- **集成 GitHub**：与 GitHub 仓库无缝集成
 False- **支持自定义域名**：可以使用自己的域名
 False- **静态内容**：只支持静态文件，不支持服务器端脚本
 False
 False## 3. 静态站点生成器对比
 False
 False| 特性 | Jekyll | VitePress | Hugo |
 False|------|--------|-----------|------|
 False| 语言 | Ruby | JavaScript (Vue) | Go |
 False| 构建速度 | 中等 | 快 | 极快 |
 False| 模板语言 | Liquid | Vue 模板 | Go 模板 |
 False| 生态系统 | 丰富（GitHub 官方支持） | 现代（Vue 生态） | 快速（Go 生态） |
 False| 学习曲线 | 中等 | 中等（熟悉 Vue 者快） | 中等 |
 False| 适用场景 | 博客、个人网站 | 技术文档 | 博客、文档、企业网站 |
 False
 False## 4. 部署方式
 False
 False### 4.1 从分支部署
 False
 False1. **设置分支**：在仓库的 **Settings → Pages → Build and deployment** 中选择：
 False - **Source**：`Deploy from a branch`
 False - **Branch**：选择分支（如 `main` 或 `gh-pages`）和目录（如 `/` 或 `/docs`）
 False
 False2. **推送代码**：将静态文件推送到选定的分支
 False
 False3. **等待构建**：GitHub 会自动构建并部署站点
 False
 False### 4.2 使用 GitHub Actions 部署
 False
 False1. **设置 Pages**：在仓库的 **Settings → Pages → Build and deployment** 中选择：
 False - **Source**：`GitHub Actions`
 False
 False2. **创建 workflow**：在 `.github/workflows/` 目录下创建部署 workflow 文件
 False
 False3. **运行 workflow**：推送代码后，Actions 会自动构建并部署站点
 False
 False## 5. 方案 A：Jekyll
 False
 False### 5.1 环境搭建
 False
```bash
 True# 安装 Ruby 和 Bundler
 True# Windows：使用 RubyInstaller
 True# macOS：使用 Homebrew: brew install ruby
 True# Linux：使用包管理器
 True
 True# 安装 Jekyll 和 Bundler
 Truegem install jekyll bundler
 True
 True# 检查安装
 Truejekyll -v
 True```

 False### 5.2 创建站点
 False
```bash
 True# 创建新站点
 Truejekyll new my-site
 Truecd my-site
 True
 True# 安装依赖
 Truebundle install
 True
 True# 本地预览
 Truebundle exec jekyll serve
 True# 访问 http://localhost:4000
 True```

 False### 5.3 配置文件
 False
 False`_config.yml`：
 False
```yaml
 Truetitle: My Site
 Trueemail: your-email@example.com
 Truedescription: >- # this means to ignore newlines until "baseurl":
 True Write an awesome description for your new site here. You can edit this
 True line in _config.yml. It will appear in your document head meta (for
 True Google search results) and in your feed.xml site description.
 Truebaseurl: "" # the subpath of your site, e.g. /blog
 Trueurl: "https://yourusername.github.io" # the base hostname & protocol for your site, e.g. http://example.com
 Truetwitter_username: jekyllrb
 Truegithub_username: jekyll
 True
 True# Build settings
 Truetheme: minima
 Trueplugins:
 True - jekyll-feed
 True
 True# Exclude from processing.
 True# The following items will not be processed, by default. Create a custom list
 True# to override the default setting.
 Trueexclude:
 True - Gemfile
 True - Gemfile.lock
 True - node_modules
 True - vendor/bundle/
 True - vendor/cache/
 True - vendor/gems/
 True - vendor/ruby/
 True```

 False### 5.4 目录结构
 False
```
 Truemy-site/
 True├── _config.yml
 True├── _data/
 True├── _drafts/
 True├── _includes/
 True├── _layouts/
 True├── _posts/
 True├── _sass/
 True├── assets/
 True├── Gemfile
 True├── Gemfile.lock
 True└── index.md
 True```

 False### 5.5 GitHub Actions 部署
 False
 False`.github/workflows/jekyll.yml`：
 False
```yaml
 Truename: Deploy Jekyll site to Pages
 True
 Trueon:
 True push:
 True branches: [main]
 True workflow_dispatch:
 True
 Truepermissions:
 True contents: read
 True pages: write
 True id-token: write
 True
 Trueconcurrency:
 True group: "pages"
 True cancel-in-progress: true
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - name: Checkout
 True uses: actions/checkout@v4
 True - name: Setup Ruby
 True uses: ruby/setup-ruby@v1
 True with:
 True ruby-version: '3.1'
 True bundler-cache: true
 True - name: Build with Jekyll
 True run: bundle exec jekyll build
 True env:
 True JEKYLL_ENV: production
 True - name: Upload artifact
 True uses: actions/upload-pages-artifact@v2
 True
 True deploy:
 True needs: build
 True runs-on: ubuntu-latest
 True environment:
 True name: github-pages
 True url: ${{ steps.deployment.outputs.page_url }}
 True steps:
 True - name: Deploy to GitHub Pages
 True id: deployment
 True uses: actions/deploy-pages@v2
 True```

 False## 6. 方案 B：VitePress
 False
 False### 6.1 环境搭建
 False
```bash
 True# 安装 Node.js（推荐 16+）
 True# 检查安装
 Truenode -v
 Truenpm -v
 True```

 False### 6.2 创建站点
 False
```bash
 True# 创建 VitePress 站点
 Truenpm create vitepress@latest docs
 True
 True# 进入目录
 Truecd docs
 True
 True# 安装依赖
 Truenpm install
 True
 True# 本地预览
 Truenpm run docs:dev
 True# 访问 http://localhost:5173
 True
 True# 构建
 Truenpm run docs:build
 True# 构建产物在 .vitepress/dist 目录
 True```

 False### 6.3 配置文件
 False
 False`.vitepress/config.ts`：
 False
```typescript
 Trueimport { defineConfig } from 'vitepress'
 True
 Trueexport default defineConfig({
 True title: 'My Site',
 True description: 'A VitePress site',
 True base: '/repo/', // 项目站点需要设置
 True themeConfig: {
 True nav: [
 True { text: 'Home', link: '/' },
 True { text: 'Guide', link: '/guide/' },
 True { text: 'API', link: '/api/' }
 True ],
 True sidebar: {
 True '/guide/': [
 True { text: 'Introduction', link: '/guide/' },
 True { text: 'Getting Started', link: '/guide/getting-started' }
 True ],
 True '/api/': [
 True { text: 'Overview', link: '/api/' },
 True { text: 'Reference', link: '/api/reference' }
 True ]
 True }
 True }
 True})
 True```

 False### 6.4 目录结构
 False
```
 Truedocs/
 True├── .vitepress/
 True│ ├── config.ts
 True│ └── dist/
 True├── guide/
 True│ ├── index.md
 True│ └── getting-started.md
 True├── api/
 True│ ├── index.md
 True│ └── reference.md
 True└── index.md
 True```

 False### 6.5 GitHub Actions 部署
 False
 False`.github/workflows/vitepress.yml`：
 False
```yaml
 Truename: Deploy VitePress site to Pages
 True
 Trueon:
 True push:
 True branches: [main]
 True workflow_dispatch:
 True
 Truepermissions:
 True contents: read
 True pages: write
 True id-token: write
 True
 Trueconcurrency:
 True group: "pages"
 True cancel-in-progress: true
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - name: Checkout
 True uses: actions/checkout@v4
 True with:
 True fetch-depth: 0
 True - name: Setup Node.js
 True uses: actions/setup-node@v4
 True with:
 True node-version: '18'
 True cache: npm
 True - name: Install dependencies
 True run: npm ci
 True - name: Build
 True run: npm run docs:build
 True - name: Upload artifact
 True uses: actions/upload-pages-artifact@v2
 True with:
 True path: docs/.vitepress/dist
 True
 True deploy:
 True needs: build
 True runs-on: ubuntu-latest
 True environment:
 True name: github-pages
 True url: ${{ steps.deployment.outputs.page_url }}
 True steps:
 True - name: Deploy to GitHub Pages
 True id: deployment
 True uses: actions/deploy-pages@v2
 True```

 False## 7. 方案 C：Hugo
 False
 False### 7.1 环境搭建
 False
```bash
 True# 安装 Hugo（推荐 Extended 版本）
 True# Windows：使用 Chocolatey: choco install hugo-extended
 True# macOS：使用 Homebrew: brew install hugo
 True# Linux：使用包管理器或二进制文件
 True
 True# 检查安装
 Truehugo version
 True```

 False### 7.2 创建站点
 False
```bash
 True# 创建新站点
 Truehugo new site my-site --format yaml
 Truecd my-site
 True
 True# 添加主题（使用 git submodule）
 Truegit init
 Truegit submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
 True
 True# 配置主题
 Trueecho 'theme: ananke' >> config.yaml
 True
 True# 创建内容
 Truehugo new posts/my-first-post.md
 True
 True# 本地预览
 Truehugo server -D
 True# 访问 http://localhost:1313
 True
 True# 构建
 Truehugo --minify
 True# 构建产物在 public 目录
 True```

 False### 7.3 配置文件
 False
 False`config.yaml`：
 False
```yaml
 TruebaseURL: https://yourusername.github.io/repo/ # 项目站点需要设置
 TruelanguageCode: en-us
 Truetitle: My New Hugo Site
 Truetheme: ananke
 True
 Trueparams:
 True description: "My Hugo site"
 True author: "Your Name"
 True social:
 True twitter: "yourusername"
 True github: "yourusername"
 True```

 False### 7.4 目录结构
 False
```
 Truemy-site/
 True├── archetypes/
 True├── content/
 True│ └── posts/
 True│ └── my-first-post.md
 True├── data/
 True├── layouts/
 True├── static/
 True├── themes/
 True│ └── ananke/
 True├── config.yaml
 True└── go.mod
 True```

 False### 7.5 GitHub Actions 部署
 False
 False`.github/workflows/hugo.yml`：
 False
```yaml
 Truename: Deploy Hugo site to Pages
 True
 Trueon:
 True push:
 True branches: [main]
 True workflow_dispatch:
 True
 Truepermissions:
 True contents: read
 True pages: write
 True id-token: write
 True
 Trueconcurrency:
 True group: "pages"
 True cancel-in-progress: true
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - name: Checkout
 True uses: actions/checkout@v4
 True with:
 True submodules: true
 True fetch-depth: 0
 True - name: Setup Hugo
 True uses: peaceiris/actions-hugo@v2
 True with:
 True hugo-version: 'latest'
 True extended: true
 True - name: Build
 True run: hugo --minify
 True - name: Upload artifact
 True uses: actions/upload-pages-artifact@v2
 True
 True deploy:
 True needs: build
 True runs-on: ubuntu-latest
 True environment:
 True name: github-pages
 True url: ${{ steps.deployment.outputs.page_url }}
 True steps:
 True - name: Deploy to GitHub Pages
 True id: deployment
 True uses: actions/deploy-pages@v2
 True```

 False## 8. 自定义域名设置
 False
 False### 8.1 配置 DNS
 False
 False1. **A 记录**：指向 GitHub Pages 的 IP 地址
 False - 185.199.108.153
 False - 185.199.109.153
 False - 185.199.110.153
 False - 185.199.111.153
 False
 False2. **CNAME 记录**：指向 `username.github.io`
 False
 False### 8.2 仓库设置
 False
 False1. 在仓库的 **Settings → Pages → Custom domain** 中输入自定义域名
 False2. 点击 **Save**
 False3. 等待 GitHub 验证域名
 False4. 启用 **Enforce HTTPS** 选项
 False
 False### 8.3 验证配置
 False
```bash
 True# 验证 DNS 配置
 Truedig yourdomain.com +noall +answer
 True
 True# 验证 HTTPS
 Truecurl -I https://yourdomain.com
 True```

 False## 9. 常见问题与解决方案
 False
 False### 9.1 资源 404 错误
 False
 False- **问题**：静态资源（CSS、JS、图片）无法加载
 False- **解决方案**：
 False 1. 检查 base URL 配置是否正确
 False 2. 确保资源路径使用相对路径
 False 3. 检查构建输出目录结构
 False
 False### 9.2 CNAME 文件被覆盖
 False
 False- **问题**：构建后 CNAME 文件被删除
 False- **解决方案**：
 False 1. 在静态目录中添加 CNAME 文件
 False 2. 配置构建工具保留 CNAME 文件
 False 3. 在 CI 流程中重新创建 CNAME 文件
 False
 False### 9.3 构建失败
 False
 False- **问题**：GitHub Actions 构建失败
 False- **解决方案**：
 False 1. 查看 Actions 日志，了解失败原因
 False 2. 确保依赖安装正确
 False 3. 检查配置文件语法
 False 4. 确认主题或插件正确安装
 False
 False### 9.4 部署权限不足
 False
 False- **问题**：GitHub Actions 部署失败，提示权限不足
 False- **解决方案**：
 False 1. 在 workflow 文件中添加正确的权限配置
 False 2. 确保 `GITHUB_TOKEN` 有足够的权限
 False 3. 检查仓库的 Pages 设置
 False
 False## 10. 最佳实践
 False
 False### 10.1 性能优化
 False
 False- **压缩资源**：启用 minify 选项
 False- **缓存策略**：设置合理的缓存头
 False- **图片优化**：使用适当的图片格式和尺寸
 False- **CDN**：使用 CDN 加速静态资源
 False- **按需加载**：实现代码分割和按需加载
 False
 False### 10.2 SEO 优化
 False
 False- **元标签**：设置合适的 title、description 和其他元标签
 False- **站点地图**：生成并提交 sitemap.xml
 False- **robots.txt**：配置 robots.txt 文件
 False- **结构化数据**：添加 JSON-LD 结构化数据
 False- **canonical URL**：设置规范 URL
 False
 False### 10.3 维护与更新
 False
 False- **定期更新**：定期更新依赖和主题
 False- **备份**：定期备份站点内容
 False- **监控**：监控站点状态和性能
 False- **测试**：在部署前进行本地测试
 False- **版本控制**：使用 Git 管理站点源码
 False
 False### 10.4 安全
 False
 False- **HTTPS**：启用 HTTPS
 False- **依赖扫描**：使用 Dependabot 扫描安全漏洞
 False- **访问控制**：合理设置仓库访问权限
 False- **输入验证**：确保用户输入安全
 False
 False## 11. 实际应用案例
 False
 False### 11.1 个人博客
 False
 False- **生成器**：Jekyll 或 Hugo
 False- **主题**：选择适合博客的主题
 False- **内容**：定期更新博客文章
 False- **部署**：使用 GitHub Actions 自动部署
 False
 False### 11.2 技术文档
 False
 False- **生成器**：VitePress
 False- **结构**：清晰的文档结构和导航
 False- **搜索**：启用文档搜索功能
 False- **版本**：支持多版本文档
 False
 False### 11.3 企业网站
 False
 False- **生成器**：Hugo
 False- **设计**：定制化主题和设计
 False- **内容**：公司介绍、产品信息、联系方式
 False- **集成**：集成表单和其他服务
 False
 False## 12. 与其他静态站点托管服务对比
 False
 False| 服务 | 优势 | 劣势 |
 False|------|------|------|
 False| GitHub Pages | 免费、与 GitHub 集成、自动 HTTPS | 构建时间限制、功能有限 |
 False| Netlify | 功能丰富、CI/CD 集成、自定义域名 | 免费计划有流量限制 |
 False| Vercel | 速度快、Next.js 优化、自动 HTTPS | 免费计划有项目数量限制 |
 False| GitLab Pages | 免费、与 GitLab 集成、CI/CD | 界面不如 GitHub 友好 |
 False| Cloudflare Pages | 速度快、CDN 集成、免费 | 功能相对有限 |
 False
 False## 13. 延伸阅读
 False
 False- [GitHub Pages 文档](https://docs.github.com/en/pages) <!-- nofollow -->
 False- [Jekyll 文档](https://jekyllrb.com/docs/) <!-- nofollow -->
 False- [VitePress 文档](https://vitepress.dev/) <!-- nofollow -->
 False- [Hugo 文档](https://gohugo.io/documentation/) <!-- nofollow -->
 False- [静态站点生成器对比](https://jamstack.org/generators/) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-05-03**：扩展内容，添加 GitHub Pages 的详细介绍和特点、三种静态站点生成器的详细对比、每种生成器的详细配置和使用指南、GitHub Actions 部署的详细配置、自定义域名的详细设置步骤、常见问题的详细解决方案、更多最佳实践和实际应用案例、性能优化和SEO建议、与其他静态站点托管服务的对比。
 False