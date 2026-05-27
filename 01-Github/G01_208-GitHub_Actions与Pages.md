# GitHub Actions 与 Pages | GitHub Actions and Pages

> @Author: fanquanpp
> @Category: GitHub Basics
> @Description: GitHub Actions 与 Pages | GitHub Actions and Pages
> @Updated: 2026-05-03

---

## 目录

1. [GitHub Actions 概述](#github-actions-概述)
2. [创建第一个工作流](#创建第一个工作流)
3. [常用动作](#常用动作)
4. [环境变量与密钥](#环境变量与密钥)
5. [GitHub Pages](#github-pages)
6. [高级工作流示例](#高级工作流示例)
7. [最佳实践](#最佳实践)
8. [故障排除](#故障排除)
9. [项目实战](#项目实战)
10. [延伸阅读](#延伸阅读)

---

## 1. GitHub Actions 概述

GitHub Actions 是 GitHub 提供的持续集成和持续部署 (CI/CD) 服务，允许你在 GitHub 仓库中自动化软件工作流程。

### 1.1 核心概念

- **工作流 (Workflow)**：自动化流程的定义文件，存放在 `.github/workflows/` 目录
- **事件 (Event)**：触发工作流的事件，如推送代码、创建 PR 等
- **作业 (Job)**：工作流中的一个独立任务，包含一个或多个步骤
- **步骤 (Step)**：作业中的一个具体操作，如运行命令、使用动作等
- **动作 (Action)**：可重用的步骤，由 GitHub 或第三方提供

## 2. 创建第一个工作流

### 2.1 基本工作流文件

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
```

### 2.2 工作流触发事件

```yaml
# 触发事件示例
on:
  # 推送事件
  push:
    branches: [ main, develop ]
    paths-ignore:
      - 'README.md'
  
  # PR 事件
  pull_request:
    branches: [ main ]
  
  # 定时触发
  schedule:
    - cron: '0 0 * * *'  # 每天午夜运行
  
  # 手动触发
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
```

## 3. 常用动作

### 3.1 检出代码

```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0  # 检出完整历史
```

### 3.2 设置 Node.js

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: 16
    cache: 'npm'  # 缓存依赖
```

### 3.3 设置 Python

```yaml
- uses: actions/setup-python@v4
  with:
    python-version: '3.10'
    cache: 'pip'  # 缓存依赖
```

### 3.4 部署到 GitHub Pages

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

## 4. 环境变量与密钥

### 4.1 环境变量

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
      API_URL: ${{ secrets.API_URL }}
    
    steps:
    - name: Print environment variable
      run: echo "NODE_ENV is $NODE_ENV"
```

### 4.2 密钥管理

1. 在 GitHub 仓库中，进入 **Settings** > **Secrets and variables** > **Actions**
2. 点击 **New repository secret** 创建新密钥
3. 在工作流中使用 `${{ secrets.SECRET_NAME }}` 引用

## 5. GitHub Pages

### 5.1 启用 GitHub Pages

1. 进入仓库 **Settings** > **Pages**
2. 选择源分支（通常是 `gh-pages` 或 `main`）
3. 选择目录（通常是 `/` 或 `/docs`）
4. 点击 **Save**

### 5.2 自动部署到 GitHub Pages

**工作流文件**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 6. 高级工作流示例

### 6.1 多环境部署

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        environment: [staging, production]
      fail-fast: false
    
    environment:
      name: ${{ matrix.environment }}
      url: ${{ matrix.environment == 'production' ? 'https://example.com' : 'https://staging.example.com' }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to ${{ matrix.environment }}
      run: |
        echo "Deploying to ${{ matrix.environment }} environment"
        # 部署命令
```

### 6.2 测试矩阵

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14, 16, 18]
      fail-fast: false
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
```

## 7. 最佳实践

### 7.1 工作流组织

1. **模块化**：将不同功能的工作流分开
2. **命名规范**：使用清晰的工作流名称
3. **注释**：为复杂的工作流添加注释
4. **版本控制**：固定动作的版本号

### 7.2 性能优化

1. **缓存依赖**：使用 `cache` 动作缓存依赖
2. **并行执行**：使用 `strategy.matrix` 并行运行测试
3. **选择性触发**：使用 `paths-ignore` 避免不必要的触发
4. **工作流调度**：合理安排工作流的触发时间

### 7.3 安全最佳实践

1. **保护密钥**：使用 GitHub Secrets 存储敏感信息
2. **最小权限**：为工作流设置最小必要的权限
3. **代码审查**：审查工作流文件的安全性
4. **第三方动作**：仅使用可信的第三方动作

## 8. 故障排除

### 8.1 常见问题

| 问题 | 原因 | 解决方案 |
| :--- | :--- | :--- |
| 工作流不触发 | 触发条件不正确 | 检查 `on` 部分的配置 |
| 依赖安装失败 | 网络问题或版本冲突 | 检查依赖版本，使用缓存 |
| 部署失败 | 权限不足 | 确保工作流有写入权限 |
| 测试失败 | 代码问题或环境问题 | 检查测试代码和环境配置 |

### 8.2 调试技巧

1. **启用详细日志**：在工作流中添加 `set -x` 启用详细输出
2. **使用 `echo` 命令**：打印变量和状态信息
3. **手动触发工作流**：使用 `workflow_dispatch` 手动触发
4. **检查工作流日志**：在 GitHub 界面查看详细日志

## 9. 项目实战

### 9.1 完整的前端项目工作流

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run lint
      run: npm run lint
    
    - name: Run tests
      run: npm run test
    
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: write
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 9.2 后端项目工作流

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: 'maven'
    
    - name: Build with Maven
      run: mvn clean package
    
    - name: Run tests
      run: mvn test
    
    - name: Upload build artifact
      uses: actions/upload-artifact@v3
      with:
        name: application
        path: target/*.jar
```

## 10. 延伸阅读

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 市场](https://github.com/marketplace/actions)
- [GitHub Actions 示例](https://github.com/actions/starter-workflows)

通过本教程，你已经了解了 GitHub Actions 和 GitHub Pages 的核心概念和实践技巧。在实际项目中，你可以使用这些工具来自动化构建、测试和部署流程，提高开发效率和代码质量。
