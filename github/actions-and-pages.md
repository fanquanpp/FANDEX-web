# GitHub Actions 语法、市场与 CI/CD 完整示例
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Advanced
 False> @Description: GitHub Actions workflow 语法、市场使用、CI/CD 示例（Node/Java/Python）。 | GitHub Actions workflow syntax, marketplace usage, CI/CD examples.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [GitHub Actions 核心概念](#github-actions-核心概念)
 False3. [工作流配置详解](#工作流配置详解)
 False4. [GitHub Marketplace 指南](#github-marketplace-指南)
 False5. [完整 CI/CD 示例](#完整-ci/cd-示例)
 False6. [环境变量与密钥管理](#环境变量与密钥管理)
 False7. [常见问题与解决方案](#常见问题与解决方案)
 False8. [最佳实践](#最佳实践)
 False9. [实际应用案例](#实际应用案例)
 False10. [与其他 CI/CD 工具对比](#与其他-ci/cd-工具对比)
 False11. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 背景
 False
 False**GitHub Actions** 是内置于仓库的 **CI/CD（持续集成/持续交付）** 引擎：用 **YAML** 描述 **workflow（工作流）**，在 **runner（运行器）** 上执行 **job（任务）**。**GitHub Marketplace** 提供可复用的 **Action（动作）** 封装常见步骤。
 False
 False核心概念：**on** 触发条件、**jobs** 并行或依赖、**steps** 顺序执行、**${{ secrets.XXX }}** 读取密钥。
 False
 False## 2. GitHub Actions 核心概念
 False
 False### 2.1 工作流（Workflow）
 False
 False工作流是一个可配置的自动化流程，由一个或多个任务（jobs）组成，定义在 `.github/workflows/` 目录下的 YAML 文件中。
 False
 False### 2.2 任务（Job）
 False
 False任务是工作流中的一个独立单元，包含一系列步骤（steps）。任务默认并行执行，但可以通过 `needs` 关键字定义依赖关系。
 False
 False### 2.3 步骤（Step）
 False
 False步骤是任务中的一个操作，可以是：
 False
 False- 使用市场中的 Action（`uses`）
 False- 执行 shell 命令（`run`）
 False
 False### 2.4 运行器（Runner）
 False
 False运行器是执行工作流的服务器，可以是：
 False
 False- GitHub 托管的运行器（如 `ubuntu-latest`、`windows-latest`、`macos-latest`）
 False- 自托管运行器（自己搭建的服务器）
 False
 False### 2.5 动作（Action）
 False
 False动作是可复用的代码单元，封装了常见的步骤，可在 GitHub Marketplace 中找到。
 False
 False## 3. 工作流配置详解
 False
 False### 3.1 触发条件（on）
 False
```yaml
 True# 基本触发条件
 Trueon:
 True push:
 True branches: [main, develop]
 True paths-ignore: ['README.md', 'docs/**']
 True pull_request:
 True branches: [main]
 True # 定时触发
 True schedule:
 True - cron: '0 0 * * *' # 每天 UTC 时间 00:00 触发
 True # 手动触发
 True workflow_dispatch:
 True inputs:
 True environment:
 True description: '环境'
 True required: true
 True default: 'staging'
 True # 其他工作流触发
 True workflow_run:
 True workflows: ['Build']
 True types: [completed]
 True```

 False### 3.2 任务配置（jobs）
 False
```yaml
 Truejobs:
 True # 任务名称
 True build:
 True # 运行器环境
 True runs-on: ubuntu-latest
 True # 环境变量
 True env:
 True NODE_ENV: production
 True # 矩阵策略
 True strategy:
 True matrix:
 True node-version: [18.x, 20.x]
 True os: [ubuntu-latest, windows-latest]
 True # 快速失败
 True fail-fast: true
 True # 任务依赖
 True needs: [lint, test]
 True # 步骤
 True steps:
 True - name: Checkout code
 True uses: actions/checkout@v4
 True with:
 True fetch-depth: 0 # 完整克隆，包括标签
 True - name: Setup Node.js
 True uses: actions/setup-node@v4
 True with:
 True node-version: ${{ matrix.node-version }}
 True cache: npm
 True - name: Install dependencies
 True run: npm ci
 True - name: Build
 True run: npm run build
 True```

 False### 3.3 步骤配置（steps）
 False
```yaml
 Truesteps:
 True # 使用市场中的 Action
 True - name: Checkout code
 True uses: actions/checkout@v4
 True # 带参数的 Action
 True - name: Setup Python
 True uses: actions/setup-python@v5
 True with:
 True python-version: '3.11'
 True # 执行 shell 命令
 True - name: Install dependencies
 True run: |
 True python -m pip install --upgrade pip
 True pip install -r requirements.txt
 True # 条件执行
 True - name: Deploy to production
 True if: github.ref == 'refs/heads/main'
 True run: ./deploy.sh
 True # 上传 artifact
 True - name: Upload build artifacts
 True uses: actions/upload-artifact@v4
 True with:
 True name: build
 True path: dist/
 True```

 False## 4. GitHub Marketplace 指南
 False
 False### 4.1 查找 Action
 False
 False1. 访问 [GitHub Marketplace](https://github.com/marketplace?type=actions)
 False2. 使用搜索功能找到需要的 Action
 False3. 查看 Action 的文档和使用示例
 False
 False### 4.2 常用 Action
 False
 False- **actions/checkout**：检出代码仓库
 False- **actions/setup-node**：设置 Node.js 环境
 False- **actions/setup-java**：设置 Java 环境
 False- **actions/setup-python**：设置 Python 环境
 False- **actions/upload-artifact**：上传构建产物
 False- **actions/download-artifact**：下载构建产物
 False- **actions/cache**：缓存依赖
 False- **peaceiris/actions-gh-pages**：部署到 GitHub Pages
 False- **docker/login-action**：登录 Docker 仓库
 False- **docker/build-push-action**：构建和推送 Docker 镜像
 False
 False### 4.3 自定义 Action
 False
 False可以创建自己的 Action：
 False
 False1. 在仓库中创建 `action.yml` 文件
 False2. 定义 Action 的输入、输出和运行环境
 False3. 发布到 GitHub Marketplace
 False
 False## 5. 完整 CI/CD 示例
 False
 False### 5.1 Node.js 项目完整 CI/CD
 False
```yaml
 Truename: Node.js CI/CD
 True
 Trueon:
 True push:
 True branches: [main, develop]
 True pull_request:
 True branches: [main, develop]
 True
 Truejobs:
 True lint:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-node@v4
 True with:
 True node-version: '20.x'
 True cache: npm
 True - run: npm ci
 True - run: npm run lint
 True
 True test:
 True runs-on: ubuntu-latest
 True strategy:
 True matrix:
 True node-version: [18.x, 20.x]
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-node@v4
 True with:
 True node-version: ${{ matrix.node-version }}
 True cache: npm
 True - run: npm ci
 True - run: npm test
 True
 True build:
 True runs-on: ubuntu-latest
 True needs: [lint, test]
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-node@v4
 True with:
 True node-version: '20.x'
 True cache: npm
 True - run: npm ci
 True - run: npm run build
 True - uses: actions/upload-artifact@v4
 True with:
 True name: build
 True path: dist/
 True
 True deploy:
 True runs-on: ubuntu-latest
 True needs: build
 True if: github.ref == 'refs/heads/main'
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/download-artifact@v4
 True with:
 True name: build
 True path: dist/
 True - name: Deploy to GitHub Pages
 True uses: peaceiris/actions-gh-pages@v4
 True with:
 True github_token: ${{ secrets.GITHUB_TOKEN }}
 True publish_dir: ./dist
 True```

 False### 5.2 Java 项目完整 CI/CD
 False
```yaml
 Truename: Java CI/CD
 True
 Trueon:
 True push:
 True branches: [main, develop]
 True pull_request:
 True branches: [main, develop]
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-java@v4
 True with:
 True distribution: temurin
 True java-version: '17'
 True cache: maven
 True - name: Build with Maven
 True run: mvn -B package --file pom.xml
 True - uses: actions/upload-artifact@v4
 True with:
 True name: jar
 True path: target/*.jar
 True
 True deploy:
 True runs-on: ubuntu-latest
 True needs: build
 True if: github.ref == 'refs/heads/main'
 True steps:
 True - uses: actions/download-artifact@v4
 True with:
 True name: jar
 True path: target/
 True - name: Deploy to server
 True run: |
 True # 部署脚本
 True echo "Deploying to production server"
 True # scp target/*.jar user@server:/path/to/deploy/
 True```

 False### 5.3 Python 项目完整 CI/CD
 False
```yaml
 Truename: Python CI/CD
 True
 Trueon:
 True push:
 True branches: [main, develop]
 True pull_request:
 True branches: [main, develop]
 True
 Truejobs:
 True lint:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-python@v5
 True with:
 True python-version: '3.11'
 True - run: |
 True python -m pip install --upgrade pip
 True pip install flake8
 True flake8 .
 True
 True test:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-python@v5
 True with:
 True python-version: '3.11'
 True - run: |
 True python -m pip install --upgrade pip
 True pip install pytest
 True if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
 True pytest
 True
 True deploy:
 True runs-on: ubuntu-latest
 True needs: [lint, test]
 True if: github.ref == 'refs/heads/main'
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/setup-python@v5
 True with:
 True python-version: '3.11'
 True - run: |
 True python -m pip install --upgrade pip
 True pip install setuptools wheel twine
 True python setup.py sdist bdist_wheel
 True twine upload --repository pypi dist/* -u ${{ secrets.PYPI_USERNAME }} -p ${{ secrets.PYPI_PASSWORD }}
 True```

 False## 6. 环境变量与密钥管理
 False
 False### 6.1 环境变量
 False
```yaml
 True# 工作流级环境变量
 Trueenv:
 True NODE_ENV: production
 True API_URL: https://api.example.com
 True
 Truejobs:
 True build:
 True # 任务级环境变量
 True env:
 True BUILD_VERSION: 1.0.0
 True steps:
 True - name: Print environment variables
 True run: |
 True echo "NODE_ENV: $NODE_ENV"
 True echo "API_URL: $API_URL"
 True echo "BUILD_VERSION: $BUILD_VERSION"
 True # 使用 GitHub 上下文
 True echo "Repository: ${{ github.repository }}"
 True echo "Branch: ${{ github.ref }}"
 True```

 False### 6.2 密钥管理
 False
 False1. **Repository secrets**：在仓库的 **Settings → Secrets and variables → Actions** 中设置
 False2. **Environment secrets**：在环境的设置中设置，更安全
 False3. **使用密钥**：
 False
```yaml
 Truesteps:
 True - name: Deploy
 True run: ./deploy.sh
 True env:
 True API_KEY: ${{ secrets.API_KEY }}
 True DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
 True```

 False## 7. 常见问题与解决方案
 False
 False### 7.1 构建失败
 False
 False#### 7.1.1 依赖安装失败
 False
 False- **问题**：依赖安装超时或失败
 False- **解决方案**：
 False 1. 使用缓存减少依赖安装时间
 False 2. 检查网络连接
 False 3. 确认依赖源是否可用
 False 4. 增加超时时间
 False
 False#### 7.1.2 测试失败
 False
 False- **问题**：测试用例失败
 False- **解决方案**：
 False 1. 查看测试日志，了解失败原因
 False 2. 修复代码中的问题
 False 3. 确保测试环境与开发环境一致
 False
 False### 7.2 性能问题
 False
 False#### 7.2.1 构建时间过长
 False
 False- **问题**：构建时间超过限制或影响开发效率
 False- **解决方案**：
 False 1. 使用缓存
 False 2. 并行执行任务
 False 3. 优化构建脚本
 False 4. 使用自托管运行器
 False
 False#### 7.2.2 缓存失效
 False
 False- **问题**：依赖变更后缓存未更新
 False- **解决方案**：
 False 1. 使用动态缓存键
 False 2. 定期清理缓存
 False 3. 依赖变更时更新缓存键
 False
 False### 7.3 权限问题
 False
 False#### 7.3.1 密钥权限不足
 False
 False- **问题**：构建过程中无法访问密钥
 False- **解决方案**：
 False 1. 确认密钥已正确设置
 False 2. 检查 workflow 权限设置
 False 3. 确保密钥名称正确
 False
 False#### 7.3.2 访问外部服务失败
 False
 False- **问题**：无法访问外部 API 或服务
 False- **解决方案**：
 False 1. 检查网络连接
 False 2. 确认 API 密钥有效
 False 3. 检查外部服务状态
 False
 False## 8. 最佳实践
 False
 False### 8.1 工作流设计
 False
 False- **模块化**：将不同功能拆分为多个工作流
 False- **并行执行**：利用矩阵策略和并行任务提高效率
 False- **依赖管理**：使用 `needs` 明确任务依赖关系
 False- **条件执行**：使用 `if` 条件控制任务执行
 False
 False### 8.2 安全性
 False
 False- **密钥管理**：使用 Repository secrets 或 Environment secrets
 False- **权限控制**：最小化 workflow 权限
 False- **代码扫描**：集成 CodeQL 等代码扫描工具
 False- **安全依赖**：使用 Dependabot 自动更新依赖
 False
 False### 8.3 可维护性
 False
 False- **版本固定**：固定 Action 版本，避免意外变更
 False- **注释**：为复杂工作流添加注释
 False- **文档**：记录工作流的用途和维护指南
 False- **测试**：测试工作流的各个部分
 False
 False### 8.4 性能优化
 False
 False- **缓存**：缓存依赖和构建产物
 False- **并行**：并行执行测试和构建
 False- **最小化**：只执行必要的步骤
 False- **自托管运行器**：对于大型项目使用自托管运行器
 False
 False## 9. 实际应用案例
 False
 False### 9.1 开源项目案例
 False
 False#### 9.1.1 案例描述
 False
 False- **项目**：一个前端库
 False- **需求**：自动测试、构建和发布
 False
 False#### 9.1.2 实现
 False
 False1. **测试**：在 PR 时运行单元测试和集成测试
 False2. **构建**：合并到 main 分支时构建
 False3. **发布**：打标签时自动发布到 npm
 False
 False### 9.2 企业项目案例
 False
 False#### 9.2.1 案例描述
 False
 False- **项目**：企业内部应用
 False- **需求**：自动测试、构建、部署到多环境
 False
 False#### 9.2.2 实现
 False
 False1. **测试**：PR 时运行测试
 False2. **构建**：合并到 develop 分支时构建
 False3. **部署**：
 False - 合并到 develop 分支：部署到开发环境
 False - 合并到 main 分支：部署到测试环境
 False - 打标签：部署到生产环境
 False
 False## 10. GitHub Pages 部署
 False
 False### 10.1 启用 GitHub Pages
 False
 False1. 进入仓库 **Settings** > **Pages**
 False2. 选择源分支（通常是 `gh-pages` 或 `main`）
 False3. 选择目录（通常是 `/` 或 `/docs`）
 False4. 点击 **Save**
 False
 False### 10.2 自动部署到 GitHub Pages
 False
```yaml
 Truename: Deploy to GitHub Pages
 True
 Trueon:
 True push:
 True branches: [ main ]
 True
 Truejobs:
 True deploy:
 True runs-on: ubuntu-latest
 True permissions:
 True contents: write
 True
 True steps:
 True - uses: actions/checkout@v4
 True
 True - name: Set up Node.js
 True uses: actions/setup-node@v4
 True with:
 True node-version: 20
 True cache: 'npm'
 True
 True - name: Install dependencies
 True run: npm install
 True
 True - name: Build
 True run: npm run build
 True
 True - name: Deploy to GitHub Pages
 True uses: peaceiris/actions-gh-pages@v4
 True with:
 True github_token: ${{ secrets.GITHUB_TOKEN }}
 True publish_dir: ./dist
 True```

 False### 10.3 使用 GitHub Actions 官方 Pages 部署
 False
```yaml
 Truename: Deploy Pages
 True
 Trueon:
 True push:
 True branches: [ main ]
 True
 Truepermissions:
 True contents: read
 True pages: write
 True id-token: write
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v4
 True - uses: actions/configure-pages@v5
 True - uses: actions/upload-pages-artifact@v3
 True with:
 True path: ./dist
 True
 True deploy:
 True needs: build
 True runs-on: ubuntu-latest
 True environment:
 True name: github-pages
 True url: ${{ steps.deployment.outputs.page_url }}
 True steps:
 True - uses: actions/deploy-pages@v4
 True id: deployment
 True```

 False## 11. 与其他 CI/CD 工具对比
 False
 False| 工具 | 优势 | 劣势 |
 False|------|------|------|
 False| GitHub Actions | 与 GitHub 集成紧密、易于配置、市场丰富 | 私有仓库有分钟数限制 |
 False| Jenkins | 高度可定制、插件丰富、无限制 | 搭建和维护成本高 |
 False| GitLab CI/CD | 与 GitLab 集成紧密、功能强大 | 学习曲线较陡 |
 False| CircleCI | 速度快、配置简单、支持 Docker | 价格较高 |
 False| Travis CI | 配置简单、历史悠久 | 功能相对有限 |
 False
 False## 11. 延伸阅读
 False
 False- [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) <!-- nofollow -->
 False- [GitHub Actions documentation](https://docs.github.com/en/actions) <!-- nofollow -->
 False- [GitHub Marketplace](https://github.com/marketplace?type=actions) <!-- nofollow -->
 False- [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-05-03**：扩展内容，添加 GitHub Actions 的核心概念和组件、工作流触发条件的详细配置、任务的高级配置、步骤的详细配置、市场中的 Actions 使用指南、更多的 CI/CD 示例、环境变量与密钥管理、常见问题的详细解决方案、最佳实践的更详细说明、实际应用案例和与其他 CI/CD 工具的对比。
 False