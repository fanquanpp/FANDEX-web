# Git 分支管理
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Git Basics
 False> @Description: Git 分支管理
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 1 目录
 False
 False- [1. 分支概述](#1-分支概述)
 False- [2. 分支操作基础](#2-分支操作基础)
 False - [2.1 查看分支](#21-查看分支)
 False - [2.2 创建分支](#22-创建分支)
 False - [2.3 切换分支](#23-切换分支)
 False - [2.4 创建并切换分支](#24-创建并切换分支)
 False - [2.5 合并分支](#25-合并分支)
 False - [2.6 删除分支](#26-删除分支)
 False - [2.7 重命名分支](#27-重命名分支)
 False - [2.8 设置上游分支](#28-设置上游分支)
 False- [3. 分支命名规范](#3-分支命名规范)
 False- [4. 分支管理策略](#4-分支管理策略)
 False - [4.1 集中式工作流](#41-集中式工作流)
 False - [4.2 功能分支工作流](#42-功能分支工作流)
 False - [4.3 GitFlow 工作流](#43-gitflow 工作流)
 False - [4.4 Forking 工作流](#44-forking 工作流)
 False- [5. 解决分支冲突](#5-解决分支冲突)
 False- [6. 分支最佳实践](#6-分支最佳实践)
 False- [7. 总结](#7-总结)
 False
 False<a id="2"></a>
 False
 False## 2 . 分支概述
 False
 False分支是 Git 中非常重要的概念，它允许你在独立的环境中开发新功能或修复 bug，而不影响主分支的稳定性。
 False
 False分支的核心特点：
 False
 False- 分支是指向特定提交的指针
 False- 默认分支为 `master` 或 `main`
 False- 分支操作轻量快速
 False- 支持并行开发
 False- 便于代码审查和测试
 False
 False<a id="3"></a>
 False
 False## 3 . 分支操作基础
 False
 False<a id="3.1"></a>
 False
 False### 3.1 查看分支
 False
```bash
 True# 查看本地分支
 Truegit branch
 True
 True# 查看远程分支
 Truegit branch -r
 True
 True# 查看所有分支（本地和远程）
 Truegit branch -a
 True
 True# 查看分支及其最后一次提交
 Truegit branch -v
 True```

 False<a id="3.2"></a>
 False
 False### 3.2 创建分支
 False
```bash
 True# 创建新分支
 Truegit branch <分支名>
 True```

 False<a id="3.3"></a>
 False
 False### 3.3 切换分支
 False
```bash
 True# 切换分支
 Truegit checkout <分支名>
 True# 或 Git 2.23+ 推荐
 Truegit switch <分支名>
 True```

 False<a id="3.4"></a>
 False
 False### 3.4 创建并切换分支
 False
```bash
 True# 创建并切换分支
 Truegit checkout -b <分支名>
 True# 或 Git 2.23+ 推荐
 Truegit switch -c <分支名>
 True```

 False<a id="3.5"></a>
 False
 False### 3.5 合并分支
 False
```bash
 True# 合并分支到当前分支
 Truegit merge <分支名>
 True
 True# 快速合并（Fast-forward）
 True# 当主分支没有新提交时，会执行快速合并
 Truegit checkout main
 Truegit merge feature/login
 True
 True# 三方合并（3-way merge）
 True# 当主分支有新提交时，会执行三方合并
 Truegit checkout main
 Truegit merge feature/payment
 True```

 False#### 3.5.1 合并策略
 False
```bash
 True# 使用策略合并
 Truegit merge --strategy-option theirs feature/branch # 优先使用对方分支的修改
 Truegit merge --strategy-option ours feature/branch # 优先使用当前分支的修改
 True
 True# 递归策略（默认）
 Truegit merge --strategy recursive feature/branch
 True
 True# 章鱼策略（适合合并多个分支）
 Truegit merge --strategy octopus feature1 feature2 feature3
 True```

 False<a id="3.6"></a>
 False
 False### 3.6 删除分支
 False
```bash
 True# 删除分支（仅当分支已合并）
 Truegit branch -d <分支名>
 True
 True# 强制删除分支（无论是否合并）
 Truegit branch -D <分支名>
 True
 True# 删除远程分支
 Truegit push <远程仓库名> --delete <分支名>
 True```

 False<a id="3.7"></a>
 False
 False### 3.7 重命名分支
 False
```bash
 True# 重命名分支
 Truegit branch -m <旧分支名> <新分支名>
 True```

 False<a id="3.8"></a>
 False
 False### 3.8 设置上游分支
 False
```bash
 True# 设置分支的上游分支
 Truegit branch --set-upstream-to=origin/<远程分支名> <本地分支名>
 True
 True# 首次推送时设置上游分支
 Truegit push -u <远程仓库名> <本地分支名>
 True```

 False<a id="4"></a>
 False
 False## 4 . 分支命名规范
 False
 False| 分支类型 | 命名格式 | 示例 | 说明 |
 False|---------|---------|------|------|
 False| 功能分支 | feature/功能名 | feature/login | 用于开发新功能 |
 False| Bug 修复分支 | bugfix/问题描述 | bugfix/login-error | 用于修复 bug |
 False| 紧急修复分支 | hotfix/紧急修复 | hotfix/security-patch | 用于紧急修复生产环境问题 |
 False| 发布分支 | release/版本号 | release/v1.0.0 | 用于准备发布 |
 False| 开发分支 | develop | develop | 用于集成新功能 |
 False| 主分支 | main/master | main | 保持稳定，只用于发布 |
 False
 False<a id="5"></a>
 False
 False## 5 . 分支管理策略
 False
 False<a id="5.1"></a>
 False
 False### 5.1 集中式工作流
 False
 False- 所有开发者直接在主分支上工作
 False- 适合小型团队和简单项目
 False- 优点：简单直接
 False- 缺点：容易产生冲突，不利于代码审查
 False
 False<a id="5.2"></a>
 False
 False### 5.2 功能分支工作流
 False
 False- 为每个功能创建单独的分支
 False- 完成后合并到主分支
 False- 适合大多数项目
 False- 优点：隔离开发，便于代码审查
 False- 缺点：需要更多的分支管理
 False
 False<a id="5.3"></a>
 False
 False### 5.3 GitFlow 工作流
 False
 FalseGitFlow 是一种详细的分支管理策略，适合大型项目和复杂的发布周期。
 False
 False#### 5.3.1 GitFlow 分支结构
 False
 False- **main/master**：主分支，保持稳定，只用于发布
 False- **develop**：开发分支，集成所有功能分支
 False- **feature/**：功能分支，从 develop 分支创建
 False- **release/**：发布分支，从 develop 分支创建
 False- **hotfix/**：热修复分支，从 main 分支创建
 False
 False#### 5.3.2 GitFlow 工作流程
 False
 False1. **初始化**：创建 main 和 develop 分支
 False2. **功能开发**：从 develop 创建 feature 分支，完成后合并回 develop
 False3. **发布准备**：从 develop 创建 release 分支，进行测试和修复
 False4. **发布**：将 release 分支合并到 main 和 develop
 False5. **热修复**：从 main 创建 hotfix 分支，完成后合并到 main 和 develop
 False
 False#### 5.3.3 GitFlow 示例
 False
```bash
 True# 初始化 GitFlow
 Truegit flow init
 True
 True# 创建功能分支
 Truegit flow feature start login
 True
 True# 完成功能分支
 Truegit flow feature finish login
 True
 True# 创建发布分支
 Truegit flow release start v1.0.0
 True
 True# 完成发布分支
 Truegit flow release finish v1.0.0
 True
 True# 创建热修复分支
 Truegit flow hotfix start security-patch
 True
 True# 完成热修复分支
 Truegit flow hotfix finish security-patch
 True```

 False<a id="5.4"></a>
 False
 False### 5.4 Forking 工作流
 False
 False- 开发者 fork 远程仓库
 False- 在自己的 fork 中工作
 False- 通过 Pull Request 贡献代码
 False- 适合开源项目
 False- 优点：适合多人协作，权限管理简单
 False- 缺点：流程相对复杂
 False
 False<a id="6"></a>
 False
 False## 6 . 解决分支冲突
 False
 False当合并分支时，如果两个分支对同一文件的同一部分进行了不同修改，就会产生冲突。
 False
 False解决冲突的步骤：
 False
 False1. **查看冲突文件**：
 False
 ```bash
 True git diff
 True ```

 False2. **手动编辑冲突文件**：
 False 冲突文件中会包含以下标记：
 False
 ```
 True <<<<<<<< HEAD
 True 当前分支的内容
 True =======
 True 要合并的分支的内容
 True >>>>>>> 分支名
 True ```

 False 手动编辑文件，保留需要的内容，删除冲突标记。
 False
 False3. **添加解决后的文件**：
 False
 ```bash
 True git add .
 True ```

 False4. **完成合并**：
 False
 ```bash
 True git commit
 True ```

 False5. **放弃合并**（如果需要）：
 False
 ```bash
 True git merge --abort
 True ```

 False<a id="7"></a>
 False
 False## 7 . 分支最佳实践
 False
 False### 7.1 分支管理最佳实践
 False
 False1. **主分支保持稳定**：
 False - 主分支只用于发布
 False - 不直接在主分支上开发
 False - 所有修改通过分支合并
 False
 False2. **使用功能分支**：
 False - 为每个功能创建单独的分支
 False - 分支名清晰描述功能
 False - 分支生命周期与功能开发周期一致
 False
 False3. **定期同步**：
 False - 定期将主分支合并到功能分支
 False - 减少冲突概率
 False - 确保功能分支包含最新代码
 False
 False4. **及时清理**：
 False - 功能完成后删除对应的分支
 False - 保持分支列表整洁
 False - 定期清理远程分支
 False
 False5. **分支策略选择**：
 False - 小型项目：集中式或功能分支工作流
 False - 中型项目：功能分支工作流
 False - 大型项目：GitFlow 工作流
 False - 开源项目：Forking 工作流
 False
 False6. **代码审查**：
 False - 使用 Pull Request 进行代码审查
 False - 确保代码质量
 False - 多人参与审查
 False
 False### 7.2 实际项目案例
 False
 False#### 7.2.1 小型项目（个人或小团队）
 False
```bash
 True# 初始化仓库
 Truegit init
 True
 True# 创建并切换到功能分支
 Truegit checkout -b feature/login
 True
 True# 开发完成后合并到主分支
 Truegit checkout main
 Truegit merge feature/login
 True
 True# 删除功能分支
 Truegit branch -d feature/login
 True```

 False#### 7.2.2 中型项目（团队协作）
 False
```bash
 True# 从远程仓库克隆
 Truegit clone <远程仓库URL>
 True
 True# 创建功能分支
 Truegit checkout -b feature/payment
 True
 True# 定期同步主分支
 Truegit checkout feature/payment
 Truegit pull origin main
 True
 True# 完成后推送到远程
 Truegit push origin feature/payment
 True
 True# 创建 Pull Request 进行代码审查
 True# 合并后删除本地分支
 Truegit branch -d feature/payment
 True```

 False#### 7.2.3 大型项目（GitFlow）
 False
```bash
 True# 初始化 GitFlow
 Truegit flow init
 True
 True# 创建功能分支
 Truegit flow feature start user-profile
 True
 True# 开发完成
 Truegit flow feature finish user-profile
 True
 True# 创建发布分支
 Truegit flow release start v2.0.0
 True
 True# 完成发布
 Truegit flow release finish v2.0.0
 True
 True# 紧急修复
 Truegit flow hotfix start critical-bug
 True```

 False<a id="8"></a>
 False
 False## 8 . 总结
 False
 False分支管理是 Git 的核心功能之一，通过合理的分支管理，可以提高开发效率，减少冲突，确保代码质量。
 False
 False- **分支操作**：掌握创建、切换、合并、删除分支的基本操作
 False- **分支命名**：遵循规范的分支命名约定
 False- **分支策略**：根据项目特点选择合适的分支管理策略
 False- **冲突解决**：掌握解决分支冲突的方法
 False- **最佳实践**：遵循分支管理的最佳实践
 False
 False通过熟练掌握分支管理，可以更好地组织代码开发流程，提高团队协作效率。
 False