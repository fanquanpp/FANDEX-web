# 分支模型与分支保护规则
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: GitHub Basics
 False> @Description: 分支模型与分支保护规则
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 2. 分支模型详解
 False
 False### 2.1 Git Flow 分支模型
 False
 FalseGit Flow 是一种较为复杂的分支模型，适合有明确发布周期的软件项目。
 False
 False#### 2.1.1 核心分支
 False
 False- **main/master**：生产环境分支，存放稳定的已发布代码
 False- **develop**：开发集成分支，存放最新的开发代码
 False- **feature/**\*：功能分支，从 develop 分支创建，完成后合并回 develop
 False- **release/**\*：发布分支，从 develop 分支创建，用于预发布准备
 False- **hotfix/**\*：热修复分支，从 main/master 分支创建，用于紧急修复生产问题
 False
 False#### 2.1.2 Git Flow 工作流程
 False
 False1. 从 develop 分支创建 feature 分支
 False2. 在 feature 分支上进行开发
 False3. 完成开发后，将 feature 分支合并回 develop
 False4. 当 develop 分支积累了足够的功能，创建 release 分支
 False5. 在 release 分支上进行测试和修复
 False6. 完成后，将 release 分支合并回 main/master 和 develop
 False7. 如有生产问题，从 main/master 创建 hotfix 分支
 False8. 修复完成后，将 hotfix 分支合并回 main/master 和 develop
 False
 False### 2.2 GitHub Flow 分支模型
 False
 FalseGitHub Flow 是一种简化的分支模型，适合持续交付和 Web 服务项目。
 False
 False#### 2.2.1 核心分支
 False
 False- **main**：默认分支，始终保持可部署状态
 False- **feature 分支**：从 main 分支创建，用于开发新功能或修复问题
 False
 False#### 2.2.2 GitHub Flow 工作流程
 False
 False1. 从 main 分支创建 feature 分支
 False2. 在 feature 分支上进行开发
 False3. 提交代码并推送到远程仓库
 False4. 打开 Pull Request 进行代码审查
 False5. 通过审查后，将 feature 分支合并回 main
 False6. 合并后立即部署到生产环境
 False
 False### 2.3 分支模型对比
 False
 False| 特性 | Git Flow | GitHub Flow |
 False| ---- | ------------------------------------------ | ---------------- |
 False| 分支数量 | 多（main, develop, feature, release, hotfix） | 少（main, feature） |
 False| 适合项目 | 有明确发布周期的软件 | 持续交付的 Web 服务 |
 False| 学习成本 | 高 | 低 |
 False| 部署频率 | 较低 | 较高 |
 False| 复杂度 | 复杂 | 简单 |
 False
 False## 3. GitHub 分支保护规则配置
 False
 False### 3.1 配置路径
 False
 False路径：**Settings → Branches → Branch protection rules → Add rule**
 False
 False### 3.2 详细配置选项
 False
 False#### 3.2.1 基本设置
 False
 False- **Branch name pattern**：分支名称模式，如 `main`、`release/*` 等
 False- **Protect matching branches**：启用分支保护
 False
 False#### 3.2.2 合并规则
 False
 False- **Require a pull request before merging**：禁止直接推送，强制通过 PR 合并
 False- **Require approvals**：设置最少审查人数，可选择是否需要 CODEOWNERS 批准
 False- **Dismiss stale pull request approvals when new commits are pushed**：当有新提交时，撤销之前的批准
 False- **Require review from Code Owners**：要求代码所有者审查
 False- **Restrict who can dismiss pull request reviews**：限制谁可以撤销 PR 审查
 False
 False#### 3.2.3 状态检查
 False
 False- **Require status checks to pass before merging**：要求状态检查通过才能合并
 False- **Require branches to be up to date before merging**：要求分支在合并前与基础分支同步
 False- **Status checks that are required**：选择需要通过的状态检查
 False
 False#### 3.2.4 分支操作限制
 False
 False- **Restrict who can push to matching branches**：限制谁可以向匹配的分支推送
 False- **Allow force pushes**：是否允许强制推送
 False- **Allow deletions**：是否允许删除分支
 False- **Include administrators**：是否对管理员同样生效
 False
 False### 3.3 配置示例
 False
 False#### 3.3.1 生产分支（main/master）配置
 False
 False- \[支持] Require a pull request before merging
 False- \[支持] Require approvals (2 人)
 False- \[支持] Require status checks to pass before merging
 False- \[支持] Require branches to be up to date before merging
 False- \[支持] Include administrators
 False- \[不支持] Allow force pushes
 False- \[不支持] Allow deletions
 False
 False#### 3.3.2 开发分支（develop）配置
 False
 False- \[支持] Require a pull request before merging
 False- \[支持] Require approvals (1 人)
 False- \[支持] Require status checks to pass before merging
 False- \[支持] Require branches to be up to date before merging
 False- \[支持] Include administrators
 False- \[不支持] Allow force pushes
 False- \[不支持] Allow deletions
 False
 False#### 3.3.3 功能分支（feature/\*）配置
 False
 False- \[不支持] Require a pull request before merging
 False- \[不支持] Require approvals
 False- \[不支持] Require status checks to pass before merging
 False- \[不支持] Include administrators
 False- \[支持] Allow force pushes
 False- \[支持] Allow deletions
 False
 False## 4. CODEOWNERS 配置
 False
 False### 4.1 CODEOWNERS 文件位置
 False
 FalseCODEOWNERS 文件可以放在以下位置：
 False
 False- 仓库根目录：`.github/CODEOWNERS`
 False- 仓库根目录：`CODEOWNERS`
 False- `docs/` 目录：`docs/CODEOWNERS`
 False
 False### 4.2 CODEOWNERS 语法
 False
```gitignore
 True# 语法：模式 @团队或用户
 True
 True# 整个仓库的所有者
 True* @owner
 True
 True# 特定目录的所有者
 True/docs/ @doc-team # /docs/ 下变更需要 doc-team 成员审查
 True/src/ @dev-team # /src/ 下变更需要 dev-team 成员审查
 True
 True# 特定文件类型的所有者
 True*.js @frontend-owner # 所有 .js 文件变更需要指定审查者
 True*.java @backend-owner # 所有 .java 文件变更需要指定审查者
 True
 True# 特定文件的所有者
 TrueREADME.md @maintainer # README.md 文件变更需要 maintainer 审查
 True```

 False### 4.3 CODEOWNERS 匹配规则
 False
 False- 匹配顺序：从上到下，找到第一个匹配的规则即生效
 False- 更具体的模式优先于更通用的模式
 False- 以 `#` 开头的行是注释
 False- 空行被忽略
 False
 False## 5. 分支操作实战
 False
 False### 5.1 GitHub Flow 分支操作
 False
```bash
 True# 1. 确保本地 main 分支是最新的
 Truegit checkout main
 Truegit pull origin main
 True
 True# 2. 创建并切换到 feature 分支
 Truegit checkout -b feature/add-login
 True
 True# 3. 进行开发并提交代码
 Truegit add .
 Truegit commit -m "Add login functionality"
 True
 True# 4. 推送到远程仓库（首次推送）
 Truegit push -u origin feature/add-login
 True
 True# 5. 后续推送
 Truegit push
 True
 True# 6. 完成开发后，在 GitHub 上打开 PR
 True# 7. 通过审查后，合并 PR
 True# 8. 清理本地分支
 Truegit checkout main
 Truegit pull origin main
 Truegit branch -d feature/add-login
 True```

 False### 5.2 Git Flow 分支操作
 False
```bash
 True# 1. 从 develop 分支创建 feature 分支
 Truegit checkout develop
 Truegit pull origin develop
 Truegit checkout -b feature/add-login
 True
 True# 2. 开发完成后，合并回 develop
 Truegit checkout develop
 Truegit merge feature/add-login
 True
 True# 3. 创建 release 分支
 Truegit checkout -b release/v1.0.0
 True
 True# 4. 完成发布准备后，合并到 main 和 develop
 Truegit checkout main
 Truegit merge release/v1.0.0
 Truegit tag v1.0.0
 Truegit checkout develop
 Truegit merge release/v1.0.0
 True
 True# 5. 处理热修复
 Truegit checkout main
 Truegit checkout -b hotfix/security-patch
 Truegit checkout main
 Truegit merge hotfix/security-patch
 Truegit tag v1.0.1
 Truegit checkout develop
 Truegit merge hotfix/security-patch
 True```

 False## 6. 常见问题与解决方案
 False
 False### 6.1 状态检查问题
 False
 False#### 6.1.1 状态检查名称错误
 False
 False- **问题**：Actions job 改名后，保护规则里的旧名称不生效，导致 PR 永远等不到「绿灯」
 False- **解决方案**：
 False 1. 在 GitHub 上查看最新的状态检查名称
 False 2. 更新分支保护规则中的状态检查名称
 False 3. 重新运行 CI 检查
 False
 False#### 6.1.2 状态检查超时
 False
 False- **问题**：CI 检查超时，导致 PR 无法合并
 False- **解决方案**：
 False 1. 检查 CI 配置，优化构建时间
 False 2. 增加 CI 超时时间
 False 3. 考虑将大型测试拆分为多个任务
 False
 False### 6.2 分支操作问题
 False
 False#### 6.2.1 强制推送被禁止
 False
 False- **问题**：尝试强制推送时收到错误
 False- **解决方案**：
 False 1. 对于保护的分支，避免使用强制推送
 False 2. 如果确实需要，联系仓库管理员临时允许强制推送
 False 3. 考虑使用 `git push --force-with-lease` 代替 `git push --force`
 False
 False#### 6.2.2 分支合并冲突
 False
 False- **问题**：PR 合并时出现冲突
 False- **解决方案**：
 False 1. 在本地解决冲突：
 False
 ```bash
 True git checkout feature-branch
 True git pull origin main
 True # 解决冲突
 True git add .
 True git commit -m "Resolve merge conflicts"
 True git push
 True ```

 False 2. 使用 GitHub 网页界面解决冲突
 False
 False### 6.3 权限问题
 False
 False#### 6.3.1 无法推送至保护分支
 False
 False- **问题**：收到「You are not allowed to push code to this branch」错误
 False- **解决方案**：
 False 1. 确认是否有推送权限
 False 2. 对于保护的分支，使用 PR 流程而不是直接推送
 False 3. 联系仓库管理员调整权限
 False
 False#### 6.3.2 无法批准自己的 PR
 False
 False- **问题**：GitHub 不允许作者批准自己的 PR
 False- **解决方案**：
 False 1. 邀请团队成员审查 PR
 False 2. 确保 CODEOWNERS 配置正确
 False
 False## 7. 最佳实践
 False
 False### 7.1 分支命名规范
 False
 False- **feature 分支**：`feature/功能描述`，如 `feature/add-login`
 False- **bugfix 分支**：`bugfix/问题描述`，如 `bugfix/fix-login-error`
 False- **hotfix 分支**：`hotfix/问题描述`，如 `hotfix/security-patch`
 False- **release 分支**：`release/版本号`，如 `release/v1.0.0`
 False
 False### 7.2 合并策略
 False
 False- **默认分支**：选择一种合并策略并保持一致
 False - **Squash merge**：将多个提交压缩为一个，保持历史简洁
 False - **Merge commit**：保留所有提交历史
 False - **Rebase and merge**：将提交重新基于目标分支，创建线性历史
 False
 False### 7.3 分支保护策略
 False
 False- **生产分支（main/master）**：最严格的保护，要求多人审查和所有状态检查通过
 False- **开发分支（develop）**：中等保护，要求至少一人审查和状态检查通过
 False- **功能分支（feature/\*）**：最少保护，允许开发者自由操作
 False
 False### 7.4 CI/CD 集成
 False
 False- **状态检查**：配置必要的 CI 检查，如代码质量、单元测试、构建等
 False- **部署流水线**：设置自动化部署流程，确保合并到 main 分支后自动部署
 False- **环境隔离**：使用不同的环境（开发、测试、生产）进行部署
 False
 False### 7.5 团队协作
 False
 False- **CODEOWNERS**：为不同模块设置明确的代码所有者
 False- **PR 模板**：使用 PR 模板，确保 PR 包含必要的信息
 False- **分支清理**：定期清理已合并的分支，保持仓库整洁
 False- **文档**：记录分支模型和工作流程，确保团队成员理解并遵循
 False
 False## 8. 实际应用案例
 False
 False### 8.1 大型开源项目
 False
 False#### 8.1.1 案例描述
 False
 False- **项目**：一个大型前端框架
 False- **分支模型**：Git Flow
 False- **保护规则**：
 False - `main` 分支：要求 2 人审查，所有 CI 检查通过
 False - `develop` 分支：要求 1 人审查，所有 CI 检查通过
 False - `release/*` 分支：要求 2 人审查，所有 CI 检查通过
 False
 False#### 8.1.2 工作流程
 False
 False1. 贡献者从 `develop` 分支创建 feature 分支
 False2. 完成开发后，打开 PR 到 `develop` 分支
 False3. 经过审查和 CI 检查后，合并到 `develop`
 False4. 当准备发布时，从 `develop` 创建 `release/*` 分支
 False5. 在 `release/*` 分支上进行测试和修复
 False6. 完成后，合并到 `main` 和 `develop`
 False7. 如有紧急问题，从 `main` 创建 hotfix 分支
 False
 False### 8.2 中小型团队项目
 False
 False#### 8.2.1 案例描述
 False
 False- **项目**：一个 Web 应用
 False- **分支模型**：GitHub Flow
 False- **保护规则**：
 False - `main` 分支：要求 1 人审查，所有 CI 检查通过
 False
 False#### 8.2.2 工作流程
 False
 False1. 开发者从 `main` 分支创建 feature 分支
 False2. 完成开发后，打开 PR 到 `main` 分支
 False3. 经过审查和 CI 检查后，合并到 `main`
 False4. 合并后自动部署到生产环境
 False
 False## 9. 延伸阅读
 False
 False- [GitHub Flow 指南](https://docs.github.com/en/get-started/using-github/github-flow) <!-- nofollow -->
 False- [Git Flow 工作流](https://nvie.com/posts/a-successful-git-branching-model/) <!-- nofollow -->
 False- [GitHub 分支保护规则文档](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) <!-- nofollow -->
 False- [CODEOWNERS 文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-10-20**：扩展内容，添加分支模型的详细工作流程、分支保护规则的详细配置选项、实际应用案例、更多最佳实践和常见问题的解决方案。
 False