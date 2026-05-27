# Git 基本操作 (Git Basic Operations)
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Git Basics
 False> @Description: Git 基本操作：工作区、暂存区、提交、历史查看、标签管理与撤销操作。 | Git basic operations: working directory, staging, commits, history, tags, and undo.
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [Git 工作区、暂存区和本地仓库](#1-git-工作区暂存区和本地仓库)
 False2. [状态管理](#2-状态管理)
 False3. [暂存与提交](#3-暂存与提交)
 False4. [查看历史](#4-查看历史)
 False5. [标签管理](#5-标签管理)
 False6. [撤销操作](#6-撤销操作)
 False7. [远程仓库操作](#7-远程仓库操作)
 False8. [日常开发流程](#8-日常开发流程)
 False9. [最佳实践](#9-最佳实践)
 False
 False---
 False
 False## 1. Git 工作区、暂存区和本地仓库
 False
 False### 1.1 概念解释
 False
 False- **工作区（Working Directory）**：项目目录下用户直接编辑的文件区域
 False- **暂存区（Staging Area）**：位于 `.git/index` 文件中，用于保存即将提交的文件列表
 False- **本地仓库（Local Repository）**：位于 `.git` 目录中，包含了完整的项目历史
 False
 False### 1.2 文件状态
 False
 FalseGit 中的文件有两种状态：
 False
 False- **已追踪（Tracked）**：已被纳入版本控制的文件
 False - 未修改（Unmodified）
 False - 已修改（Modified）
 False - 已暂存（Staged）
 False- **未追踪（Untracked）**：不在版本控制中的新文件
 False
 False### 1.3 文件状态流转
 False
```
 True未追踪 ──git add──> 已暂存 ──git commit──> 未修改
 True ^ |
 True | v
 True └── rm / 删除文件 <── 已修改 <── 编辑文件 ──┘
 True```

 False## 2. 状态管理
 False
 False### 2.1 查看状态
 False
```bash
 Truegit status
 True```

 False输出说明：
 False
 False- `Changes to be committed`：暂存区中的文件（已暂存）
 False- `Changes not staged for commit`：工作区中已修改但未暂存的文件
 False- `Untracked files`：未追踪的新文件
 False
 False### 2.2 简略格式
 False
```bash
 Truegit status -s
 True```

 False输出标记：
 False
 False- `??`：未追踪的文件
 False- `A`：新添加到暂存区的文件
 False- `M`：已修改的文件
 False- `D`：已删除的文件
 False
 False## 3. 暂存与提交
 False
 False### 3.1 暂存操作
 False
```bash
 True# 暂存单个文件
 Truegit add <file>
 True
 True# 暂存所有文件
 Truegit add .
 True
 True# 暂存所有已追踪文件的修改
 Truegit add -u
 True
 True# 交互式暂存
 Truegit add -p
 True```

 False### 3.2 提交操作
 False
```bash
 True# 提交暂存区的文件
 Truegit commit -m "commit message"
 True
 True# 提交所有已追踪文件的修改（跳过暂存）
 Truegit commit -a -m "commit message"
 True
 True# 修改最后一次提交
 Truegit commit --amend -m "new message"
 True
 True# 提交空目录（需要在里面添加 .gitkeep）
 Truegit add directory/.gitkeep
 Truegit commit -m "add directory"
 True```

 False### 3.3 提交信息规范
 False
 False推荐格式：
 False
```text
 True<type>: <subject>
 True
 True<body>
 True
 True<footer>
 True```

 False类型（type）：
 False
 False- `feat`：新功能
 False- `fix`：bug 修复
 False- `docs`：文档更新
 False- `style`：格式调整
 False- `refactor`：重构
 False- `test`：测试相关
 False- `chore`：构建/工具相关
 False
 False## 4. 查看历史
 False
 False### 4.1 查看提交历史
 False
```bash
 True# 查看完整提交历史
 Truegit log
 True
 True# 查看简洁的提交历史
 Truegit log --oneline
 True
 True# 查看最近 N 次提交
 Truegit log -n 5
 True
 True# 查看分支合并历史
 Truegit log --graph --oneline --all
 True
 True# 查看特定文件的修改历史
 Truegit log <file>
 True
 True# 查看某次提交的详细信息
 Truegit show <commit-hash>
 True```

 False### 4.2 查看差异
 False
```bash
 True# 查看工作区与暂存区的差异
 Truegit diff
 True
 True# 查看暂存区与上次提交的差异
 Truegit diff --cached
 True
 True# 查看两个分支的差异
 Truegit diff <branch1>..<branch2>
 True
 True# 查看特定文件的差异
 Truegit diff <file>
 True```

 False## 5. 标签管理
 False
 False### 5.1 创建标签
 False
```bash
 True# 创建轻量标签
 Truegit tag <tag-name>
 True
 True# 创建附注标签
 Truegit tag -a <tag-name> -m "tag message"
 True
 True# 为特定提交创建标签
 Truegit tag -a <tag-name> <commit-hash> -m "tag message"
 True```

 False### 5.2 查看和操作标签
 False
```bash
 True# 查看所有标签
 Truegit tag
 True
 True# 查看标签详细信息
 Truegit show <tag-name>
 True
 True# 删除标签
 Truegit tag -d <tag-name>
 True
 True# 推送标签到远程
 Truegit push <remote-name> <tag-name>
 True
 True# 推送所有标签到远程
 Truegit push <remote-name> --tags
 True
 True# 检出到特定标签
 Truegit checkout <tag-name>
 True```

 False## 6. 撤销操作
 False
 False### 6.1 撤销工作区修改
 False
```bash
 True# 撤销单个文件的修改
 Truegit checkout -- <file>
 True
 True# 撤销所有文件的修改
 Truegit checkout -- .
 True
 True# 使用 git restore（Git 2.23+）
 Truegit restore <file>
 Truegit restore .
 True```

 False### 6.2 撤销暂存
 False
```bash
 True# 撤销暂存（保留工作区修改）
 Truegit reset HEAD <file>
 True
 True# 使用 git restore（Git 2.23+）
 Truegit restore --staged <file>
 True```

 False### 6.3 撤销提交
 False
```bash
 True# 软回退：撤销提交，保留修改在暂存区
 Truegit reset --soft HEAD~1
 True
 True# 混合回退：撤销提交，保留修改在工作区
 Truegit reset --mixed HEAD~1
 True
 True# 硬回退：撤销提交，丢弃所有修改
 Truegit reset --hard HEAD~1
 True```

 False### 6.4 使用 git revert
 False
```bash
 True# 创建一个新提交来撤销指定提交
 Truegit revert <commit-hash>
 True
 True# 撤销多个提交
 Truegit revert <commit-hash1> <commit-hash2>
 True```

 False**注意**：`git reset` 会改写历史，已推送到远程的提交不建议使用；`git revert` 是安全的撤销方式，会创建新的提交。
 False
 False## 7. 远程仓库操作
 False
 False### 7.1 添加和查看远程仓库
 False
```bash
 True# 添加远程仓库
 Truegit remote add origin <url>
 True
 True# 查看远程仓库
 Truegit remote -v
 True
 True# 修改远程仓库 URL
 Truegit remote set-url origin <new-url>
 True
 True# 删除远程仓库
 Truegit remote remove origin
 True```

 False### 7.2 推送和拉取
 False
```bash
 True# 推送到远程仓库
 Truegit push origin main
 True
 True# 拉取远程仓库的更新
 Truegit pull origin main
 True
 True# 获取远程仓库的更新（不合并）
 Truegit fetch origin
 True```

 False## 8. 日常开发流程
 False
 False### 8.1 标准开发流程
 False
```bash
 True# 1. 拉取最新代码
 Truegit pull origin main
 True
 True# 2. 创建功能分支
 Truegit checkout -b feature/new-feature
 True
 True# 3. 开发并提交
 Truegit add .
 Truegit commit -m "feat: add new feature"
 True
 True# 4. 推送到远程
 Truegit push origin feature/new-feature
 True
 True# 5. 合并到主分支
 Truegit checkout main
 Truegit merge feature/new-feature
 Truegit push origin main
 True
 True# 6. 删除功能分支
 Truegit branch -d feature/new-feature
 True```

 False### 8.2 紧急修复流程
 False
```bash
 True# 1. 创建修复分支
 Truegit checkout -b hotfix/fix-bug
 True
 True# 2. 修复并提交
 Truegit add .
 Truegit commit -m "fix: fix critical bug"
 True
 True# 3. 合并到主分支和开发分支
 Truegit checkout main
 Truegit merge hotfix/fix-bug
 Truegit checkout develop
 Truegit merge hotfix/fix-bug
 True
 True# 4. 删除修复分支
 Truegit branch -d hotfix/fix-bug
 True```

 False## 9. 最佳实践
 False
 False### 9.1 提交规范
 False
 False- **频繁提交**：小步快跑，每次提交只做一件事
 False- **有意义的提交信息**：使用规范的提交信息格式
 False- **不要提交半成品**：确保每次提交都是可运行的
 False
 False### 9.2 分支管理
 False
 False- **主分支保持稳定**：main 分支始终可部署
 False- **功能分支开发**：每个功能在独立分支上开发
 False- **及时合并和删除**：合并后及时删除功能分支
 False
 False### 9.3 常用快捷命令
 False
 False| 命令 | 说明 |
 False|------|------|
 False| `git stash` | 暂存当前修改 |
 False| `git stash pop` | 恢复暂存的修改 |
 False| `git stash list` | 查看暂存列表 |
 False| `git cherry-pick <hash>` | 选择性合并某个提交 |
 False| `git rebase main` | 变基到 main 分支 |
 False| `git bisect` | 二分查找引入 bug 的提交 |
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-03: 重新格式化并扩写内容，补充文件状态流转图、撤销操作详解、远程仓库操作和日常开发流程
 False