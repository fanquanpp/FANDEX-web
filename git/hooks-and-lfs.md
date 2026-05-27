# Git 钩子与 Git LFS | Git Hooks and Git LFS
 False
 False> @Author: fanquanpp
 False> @Category: Git Basics
 False> @Description: Git 钩子与 Git LFS | Git Hooks and Git LFS
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [目录](#目录)
 False2. [Git 钩子概述](#git-钩子概述)
 False3. [客户端钩子](#客户端钩子)
 False4. [服务器端钩子](#服务器端钩子)
 False5. [Git LFS](#git-lfs)
 False6. [钩子最佳实践](#钩子最佳实践)
 False7. [Git LFS 最佳实践](#git-lfs-最佳实践)
 False8. [高级钩子示例](#高级钩子示例)
 False9. [常见问题与解决方案](#常见问题与解决方案)
 False10. [工具与集成](#工具与集成)
 False11. [项目实战](#项目实战)
 False12. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 目录
 False
 False- [1. Git 钩子概述](#1-git-钩子概述)
 False- [2. 客户端钩子](#2-客户端钩子)
 False- [3. 服务器端钩子](#3-服务器端钩子)
 False- [4. Git LFS](#4-git-lfs)
 False- [5. 钩子最佳实践](#5-钩子最佳实践)
 False- [6. Git LFS 最佳实践](#6-git-lfs-最佳实践)
 False- [7. 高级钩子示例](#7-高级钩子示例)
 False- [8. 常见问题与解决方案](#8-常见问题与解决方案)
 False- [9. 工具与集成](#9-工具与集成)
 False- [10. 项目实战](#10-项目实战)
 False- [11. 延伸阅读](#11-延伸阅读)
 False
 False## 2. Git 钩子概述
 False
 FalseGit 钩子是 Git 仓库中的脚本，在特定 Git 事件发生时自动执行。它们可以用于自动化工作流程、强制执行代码规范、运行测试等。
 False
 False### 钩子类型
 False
 False- **客户端钩子**：在本地操作时触发
 False- **服务器端钩子**：在服务器端操作时触发
 False
 False## 3. 客户端钩子
 False
 False### 2.1 常见客户端钩子
 False
 False| 钩子名称 | 触发时机 | 用途 |
 False| :--- | :--- | :--- |
 False| `pre-commit` | 提交前 | 代码检查、格式化、测试 |
 False| `prepare-commit-msg` | 提交消息编辑器前 | 自动生成提交消息 |
 False| `commit-msg` | 提交消息编辑后 | 验证提交消息格式 |
 False| `post-commit` | 提交后 | 通知、触发构建 |
 False| `pre-push` | 推送前 | 运行测试、检查 |
 False
 False### 2.2 创建 pre-commit 钩子
 False
```bash
 True# 进入 Git 仓库
 Truecd /path/to/repo
 True
 True# 创建 pre-commit 钩子
 Truecat > .git/hooks/pre-commit << 'EOF'
 True#!/bin/bash
 True
 True# 运行代码检查
 Trueecho "Running code linting..."
 Truenpm run lint
 True
 True# 运行测试
 Trueecho "Running tests..."
 Truenpm test
 True
 True# 检查结果
 Trueif [ $? -ne 0 ]; then
 True echo "Tests failed, commit aborted"
 True exit 1
 Truefi
 True
 Trueecho "Pre-commit checks passed"
 TrueEOF
 True
 True# 使钩子可执行
 Truechmod +x .git/hooks/pre-commit
 True```

 False### 2.3 创建 commit-msg 钩子
 False
```bash
 True# 创建 commit-msg 钩子
 Truecat > .git/hooks/commit-msg << 'EOF'
 True#!/bin/bash
 True
 True# 检查提交消息格式
 Truecommit_msg=$(cat "$1")
 True
 True# 正则表达式检查提交消息格式
 Trueif ! echo "$commit_msg" | grep -qE '^(feat|fix|docs|style|refactor|test|chore): .+'; then
 True echo "Error: Invalid commit message format"
 True echo "Commit message should start with: feat|fix|docs|style|refactor|test|chore:"
 True exit 1
 Truefi
 True
 Trueecho "Commit message format is valid"
 TrueEOF
 True
 True# 使钩子可执行
 Truechmod +x .git/hooks/commit-msg
 True```

 False## 4. 服务器端钩子
 False
 False### 3.1 常见服务器端钩子
 False
 False| 钩子名称 | 触发时机 | 用途 |
 False| :--- | :--- | :--- |
 False| `pre-receive` | 推送接收前 | 拒绝不符合规则的推送 |
 False| `update` | 分支更新时 | 对特定分支进行检查 |
 False| `post-receive` | 推送接收后 | 部署、通知 |
 False
 False### 3.2 创建 post-receive 钩子
 False
```bash
 True# 在服务器仓库中创建 post-receive 钩子
 Truecat > /path/to/repo.git/hooks/post-receive << 'EOF'
 True#!/bin/bash
 True
 True# 部署应用
 Trueecho "Deploying application..."
 True
 True# 切换到部署目录
 Truecd /path/to/deploy
 True
 True# 拉取最新代码
 Truegit pull origin main
 True
 True# 安装依赖
 Truenpm install
 True
 True# 构建应用
 Truenpm run build
 True
 True# 重启服务
 Trueecho "Restarting service..."
 Truesystemctl restart my-app
 True
 Trueecho "Deployment completed successfully"
 TrueEOF
 True
 True# 使钩子可执行
 Truechmod +x /path/to/repo.git/hooks/post-receive
 True```

 False## 5. Git LFS (Large File Storage)
 False
 False### 4.1 Git LFS 概述
 False
 FalseGit LFS 是 Git 的扩展，用于管理大文件，通过将大文件存储在外部服务器上，只在 Git 仓库中存储引用，从而减小仓库体积。
 False
 False### 4.2 安装 Git LFS
 False
```bash
 True# 安装 Git LFS
 True# Windows
 Truedownload from https://git-lfs.github.com/
 True
 True# macOS
 Truebrew install git-lfs
 True
 True# Linux
 Truesudo apt install git-lfs
 True
 True# 初始化 Git LFS
 Truegit lfs install
 True```

 False### 4.3 配置 Git LFS
 False
```bash
 True# 跟踪大文件
 Truegit lfs track "*.psd"
 Truegit lfs track "*.jpg"
 Truegit lfs track "*.mp4"
 True
 True# 查看跟踪的文件类型
 Truegit lfs track
 True
 True# 提交 .gitattributes 文件
 Truegit add .gitattributes
 Truegit commit -m "Add Git LFS tracking"
 True```

 False### 4.4 使用 Git LFS
 False
```bash
 True# 正常添加和提交文件
 Truegit add large-file.psd
 Truegit commit -m "Add large file"
 Truegit push origin main
 True
 True# 拉取 LFS 文件
 Truegit lfs pull
 True
 True# 查看 LFS 文件
 Truegit lfs ls-files
 True
 True# 验证 LFS 文件
 Truegit lfs verify
 True```

 False## 6. 钩子最佳实践
 False
 False1. **版本控制钩子**：将钩子存储在仓库中，使用脚本安装
 False2. **错误处理**：在钩子中添加适当的错误处理
 False3. **性能考虑**：确保钩子执行时间不会过长
 False4. **可配置性**：允许通过配置文件自定义钩子行为
 False5. **文档**：为钩子添加注释和文档
 False
 False### 5.1 钩子管理脚本
 False
```bash
 True#!/bin/bash
 True# hooks/install.sh
 True
 True# 安装钩子
 Truecp hooks/* .git/hooks/
 Truechmod +x .git/hooks/*
 True
 Trueecho "Hooks installed successfully"
 True```

 False## 7. Git LFS 最佳实践
 False
 False1. **合理选择跟踪文件**：只跟踪真正的大文件
 False2. **设置合理的文件大小阈值**：根据项目需求设置
 False3. **定期清理**：使用 `git lfs prune` 清理过期文件
 False4. **备份 LFS 存储**：确保 LFS 文件的安全性
 False5. **监控存储使用**：定期检查 LFS 存储使用情况
 False
 False### 6.1 Git LFS 配置示例
 False
```bash
 True# .gitattributes 文件
 True*.psd filter=lfs diff=lfs merge=lfs -text
 True*.jpg filter=lfs diff=lfs merge=lfs -text
 True*.mp4 filter=lfs diff=lfs merge=lfs -text
 True```

 False## 8. 高级钩子示例
 False
 False### 7.1 自动更新版本号
 False
```bash
 True# pre-commit 钩子
 True#!/bin/bash
 True
 True# 自动更新版本号
 Trueif [ -f package.json ]; then
 True current_version=$(jq -r '.version' package.json)
 True # 简单的版本号递增逻辑
 True new_version=$(echo $current_version | awk -F. '{print $1"."$2"."$3+1}')
 True jq ".version = \"$new_version\"" package.json > package.json.tmp && mv package.json.tmp package.json
 True git add package.json
 True echo "Updated version to $new_version"
 Truefi
 True```

 False### 7.2 自动生成 CHANGELOG
 False
```bash
 True# post-commit 钩子
 True#!/bin/bash
 True
 True# 自动生成 CHANGELOG
 Trueif [ ! -f CHANGELOG.md ]; then
 True echo "# Changelog\n" > CHANGELOG.md
 Truefi
 True
 True# 获取最新提交信息
 Truelatest_commit=$(git log -1 --pretty=%B)
 True
 True# 提取提交类型和信息
 Trueif echo "$latest_commit" | grep -qE '^(feat|fix|docs|style|refactor|test|chore):'; then
 True commit_type=$(echo "$latest_commit" | cut -d: -f1)
 True commit_msg=$(echo "$latest_commit" | cut -d: -f2 | sed 's/^ //')
 True
 True # 获取当前日期
 True current_date=$(date +"%Y-%m-%d")
 True
 True # 添加到 CHANGELOG
 True echo "## $current_date\n\n- **$commit_type**: $commit_msg\n" | cat - CHANGELOG.md > CHANGELOG.md.tmp && mv CHANGELOG.md.tmp CHANGELOG.md
 True git add CHANGELOG.md
 True git commit --amend --no-edit
 True echo "Updated CHANGELOG.md"
 Truefi
 True```

 False## 9. 常见问题与解决方案
 False
 False### 8.1 钩子不执行
 False
 False**问题**：钩子脚本没有执行
 False**解决方案**：确保钩子文件可执行 `chmod +x .git/hooks/hook-name`
 False
 False### 8.2 Git LFS 文件下载失败
 False
 False**问题**：Git LFS 文件无法下载
 False**解决方案**：检查网络连接，运行 `git lfs pull` 手动拉取
 False
 False### 8.3 钩子执行时间过长
 False
 False**问题**：钩子执行时间过长，影响开发效率
 False**解决方案**：优化钩子逻辑，考虑使用后台执行
 False
 False### 8.4 Git LFS 存储不足
 False
 False**问题**：Git LFS 存储空间不足
 False**解决方案**：清理过期文件 `git lfs prune`，增加存储配置
 False
 False## 10. 工具与集成
 False
 False### 9.1 钩子管理工具
 False
 False- **husky**：现代 Git 钩子管理工具
 False- **lint-staged**：配合 husky 使用，只对暂存文件运行检查
 False
 False### 9.2 Git LFS 托管服务
 False
 False- **GitHub**：内置 Git LFS 支持
 False- **GitLab**：内置 Git LFS 支持
 False- **Bitbucket**：内置 Git LFS 支持
 False- **自托管**：使用 Git LFS 服务器
 False
 False## 11. 项目实战
 False
 False### 10.1 完整的钩子配置
 False
```
 Trueproject/
 True├── .git/
 True│ └── hooks/
 True│ ├── pre-commit
 True│ ├── commit-msg
 True│ └── pre-push
 True├── hooks/
 True│ ├── pre-commit
 True│ ├── commit-msg
 True│ ├── pre-push
 True│ └── install.sh
 True├── .gitattributes
 True└── package.json
 True```

 False### 10.2 使用 husky 管理钩子
 False
 False**安装 husky**
 False
```bash
 Truenpm install husky --save-dev
 Truenpx husky install
 Truenpm set-script prepare "husky install"
 True```

 False**添加钩子**
 False
```bash
 Truenpx husky add .husky/pre-commit "npm run lint"
 Truenpx husky add .husky/commit-msg "npx commitlint --edit $1"
 Truenpx husky add .husky/pre-push "npm test"
 True```

 False## 12. 延伸阅读
 False
 False- [Git 官方钩子文档](https://git-scm.com/docs/githooks)
 False- [Git LFS 官方文档](https://git-lfs.github.com/)
 False- [husky 文档](https://typicode.github.io/husky/)
 False- [commitlint 文档](https://commitlint.js.org/)
 False
 False通过本教程，你已经了解了 Git 钩子和 Git LFS 的核心概念和实践技巧。在实际项目中，你可以使用这些工具来自动化工作流程、管理大文件，提高开发效率和代码质量
 False