# 常见问题排查：Permission denied、大文件、LF/CRLF、Submodule、GPG、Actions
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Advanced
 False> @Description: GitHub 常见问题排查：权限问题、大文件、换行符、子模块、GPG 签名、Actions 配额。 | Troubleshooting GitHub issues: permission, large files, line endings, submodules, GPG, Actions.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [认证问题](#认证问题)
 False3. [大文件问题](#大文件问题)
 False4. [换行符问题](#换行符问题)
 False5. [子模块问题](#子模块问题)
 False6. [提交签名问题](#提交签名问题)
 False7. [GitHub Actions 问题](#github-actions-问题)
 False8. [其他常见问题](#其他常见问题)
 False9. [综合诊断与预防](#综合诊断与预防)
 False10. [实际案例分析](#实际案例分析)
 False11. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 背景
 False
 False本地与 CI 常见问题多与 **认证**、**历史中的二进制大文件**、**跨平台换行**、**子模块未初始化**、**签名密钥** 与 **配额** 相关。本节给出 **可复制的诊断命令** 与 **修复方向**。
 False
 False## 2. 认证问题
 False
 False### 2.1 Permission denied (publickey)
 False
 False**现象**：`git push` 或 `ssh -T git@github.com` 失败，提示 `Permission denied (publickey)`。
 False
 False**诊断**：
 False
```bash
 True# 检查 SSH 连接详细信息
 Truessh -vT git@github.com
 True
 True# 检查 SSH 密钥列表
 Truessh-add -l
 True
 True# 检查 SSH 配置
 Truecat ~/.ssh/config
 True```

 False**修复**：
 False
 False1. **生成新的 SSH 密钥**（如果没有）：
 False
 ```bash
 True ssh-keygen -t ed25519 -C "your_email@example.com"
 True ```

 False2. **添加 SSH 密钥到 ssh-agent**：
 False
 ```bash
 True eval "$(ssh-agent -s)"
 True ssh-add ~/.ssh/id_ed25519
 True ```

 False3. **将公钥添加到 GitHub**：
 False - 复制公钥内容：`cat ~/.ssh/id_ed25519.pub`
 False - 登录 GitHub，进入 **Settings → SSH and GPG keys → New SSH key**
 False - 粘贴公钥并保存
 False
 False4. **检查 SSH 配置**：
 False
 ```bash
 True # 编辑 ~/.ssh/config
 True Host github.com
 True HostName github.com
 True User git
 True IdentityFile ~/.ssh/id_ed25519
 True ```

 False### 2.2 HTTPS 认证失败
 False
 False**现象**：`git push` 失败，提示输入用户名和密码，但输入后仍然失败。
 False
 False**诊断**：
 False
```bash
 True# 检查远程仓库 URL
 Truegit remote -v
 True
 True# 检查 Git 凭据缓存
 Truegit credential-cache status
 True```

 False**修复**：
 False
 False1. **使用个人访问令牌（PAT）**：
 False - 登录 GitHub，进入 **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
 False - 创建新令牌，设置适当的权限
 False - 使用令牌作为密码进行认证
 False
 False2. **配置 Git 凭据缓存**：
 False
 ```bash
 True # 缓存凭据 1 小时
 True git config --global credential.helper 'cache --timeout=3600'
 True ```

 False3. **更新远程仓库 URL**：
 False
 ```bash
 True # 使用 HTTPS URL 并包含令牌
 True git remote set-url origin https://<token>@github.com/username/repo.git
 True ```

 False## 3. 大文件问题
 False
 False### 3.1 推送被拒（超过 100MB）
 False
 False**现象**：`git push` 失败，提示文件超过 100MB 限制。
 False
 False**诊断**：
 False
```bash
 True# 查找仓库中的大文件
 Truegit lfs ls-files
 True
 True# 查找历史中的大文件
 Truegit rev-list --objects --all | grep -E "^[0-9a-f]{40} .{10,}$" | sort -k 2 -n -r | head -20
 True```

 False**修复**：
 False
 False1. **使用 Git LFS** 跟踪大文件：
 False
 ```bash
 True # 安装 Git LFS
 True git lfs install
 True 
 True # 跟踪大文件类型
 True git lfs track "*.psd"
 True git lfs track "*.zip"
 True 
 True # 提交 .gitattributes 文件
 True git add .gitattributes
 True git commit -m "Add Git LFS tracking"
 True ```

 False2. **移除历史中的大文件**：
 False - 使用 `git filter-repo`：
 False
 ```bash
 True # 安装 git-filter-repo
 True # 过滤大文件
 True git filter-repo --path LARGE_FILE.bin --invert-paths
 True 
 True # 强制推送
 True git push --force origin main
 True ```

 False - 使用 BFG Repo-Cleaner：
 False
 ```bash
 True # 下载 BFG
 True java -jar bfg.jar --strip-blobs-bigger-than 100M
 True git reflog expire --expire=now --all
 True git gc --prune=now --aggressive
 True ```

 False### 3.2 Git LFS 相关问题
 False
 False**现象**：Git LFS 跟踪的文件无法正确推送或拉取。
 False
 False**诊断**：
 False
```bash
 True# 检查 Git LFS 状态
 Truegit lfs status
 True
 True# 检查 Git LFS 配置
 Truegit lfs config --list
 True```

 False**修复**：
 False
 False1. **确保 Git LFS 已安装**：
 False
 ```bash
 True git lfs install
 True ```

 False2. **重新推送 LFS 对象**：
 False
 ```bash
 True git lfs push --all origin
 True ```

 False3. **拉取 LFS 对象**：
 False
 ```bash
 True git lfs pull
 True ```

 False## 4. 换行符问题
 False
 False### 4.1 LF / CRLF 冲突
 False
 False**现象**：Windows 下整文件 **CRLF** 导致 diff 噪声或脚本 **shebang** 失败。
 False
 False**诊断**：
 False
```bash
 True# 检查 Git 换行符配置
 Truegit config --get core.autocrlf
 True
 True# 检查文件换行符类型
 Truefile -k file.txt
 True```

 False**修复**：
 False
 False1. **配置 Git 换行符处理**：
 False - Windows：`git config --global core.autocrlf true`
 False - macOS/Linux：`git config --global core.autocrlf input`
 False
 False2. **使用 .gitattributes 文件**：
 False
 ```gitattributes
 True # 自动处理文本文件
 True * text=auto
 True 
 True # 强制使用 LF
 True *.sh text eol=lf
 True *.py text eol=lf
 True *.js text eol=lf
 True 
 True # 强制使用 CRLF
 True *.bat text eol=crlf
 True *.cmd text eol=crlf
 True 
 True # 二进制文件
 True *.png binary
 True *.jpg binary
 True *.zip binary
 True ```

 False3. **重新规范化所有文件**：
 False
 ```bash
 True git add --renormalize .
 True git commit -m "Normalize line endings"
 True ```

 False## 5. 子模块问题
 False
 False### 5.1 子模块未初始化
 False
 False**现象**：克隆后子目录空或旧版本。
 False
 False**诊断**：
 False
```bash
 True# 检查子模块状态
 Truegit submodule status
 True```

 False**修复**：
 False
 False1. **初始化并更新子模块**：
 False
 ```bash
 True # 初始化子模块
 True git submodule init
 True 
 True # 更新子模块
 True git submodule update
 True 
 True # 递归初始化和更新（包含嵌套子模块）
 True git submodule update --init --recursive
 True ```

 False2. **克隆时直接初始化子模块**：
 False
 ```bash
 True git clone --recursive https://github.com/username/repo.git
 True ```

 False### 5.2 子模块版本更新
 False
 False**现象**：子模块有新的提交，但主仓库未更新。
 False
 False**修复**：
 False
 False1. **更新子模块到最新版本**：
 False
 ```bash
 True cd submodule_directory
 True git pull origin main
 True cd ..
 True git add submodule_directory
 True git commit -m "Update submodule to latest version"
 True ```

 False2. **批量更新所有子模块**：
 False
 ```bash
 True git submodule foreach git pull origin main
 True git add .
 True git commit -m "Update all submodules"
 True ```

 False## 6. 提交签名问题
 False
 False### 6.1 GPG 签名失败
 False
 False**现象**：`git commit` 失败，提示 GPG 签名错误。
 False
 False**诊断**：
 False
```bash
 True# 检查 GPG 密钥
 True gpg --list-secret-keys --keyid-format LONG
 True
 True# 检查 Git GPG 配置
 True git config --get user.signingkey
 True git config --get commit.gpgsign
 True```

 False**修复**：
 False
 False1. **生成 GPG 密钥**（如果没有）：
 False
 ```bash
 True gpg --full-generate-key
 True ```

 False2. **配置 Git 使用 GPG 密钥**：
 False
 ```bash
 True # 获取 GPG 密钥 ID
 True gpg --list-secret-keys --keyid-format LONG
 True 
 True # 配置 Git
 True git config --global user.signingkey <GPG_KEY_ID>
 True git config --global commit.gpgsign true
 True ```

 False3. **将 GPG 公钥添加到 GitHub**：
 False
 ```bash
 True # 导出公钥
 True gpg --armor --export <GPG_KEY_ID>
 True ```

 False - 复制公钥内容
 False - 登录 GitHub，进入 **Settings → SSH and GPG keys → New GPG key**
 False - 粘贴公钥并保存
 False
 False4. **解决 TTY 问题**：
 False
 ```bash
 True # 在 ~/.bashrc 或 ~/.zshrc 中添加
 True export GPG_TTY=$(tty)
 True ```

 False### 6.2 SSH 签名
 False
 False**现象**：使用 SSH 密钥进行提交签名。
 False
 False**配置**：
 False
 False1. **设置 Git 使用 SSH 签名**：
 False
 ```bash
 True git config --global gpg.format ssh
 True git config --global user.signingkey ~/.ssh/id_ed25519.pub
 True git config --global commit.gpgsign true
 True ```

 False2. **将 SSH 公钥添加到 GitHub**：
 False - 确保 SSH 公钥已添加到 GitHub
 False - 进入 **Settings → SSH and GPG keys** 确认
 False
 False## 7. GitHub Actions 问题
 False
 False### 7.1 Actions 分钟数耗尽
 False
 False**现象**：私有库 workflow **排队/失败**，账单显示 **minutes** 用尽。
 False
 False**诊断**：
 False
```bash
 True# 查看 Actions 使用情况
 True# 在 GitHub 仓库 → Settings → Billing and plans → Actions
 True```

 False**修复**：
 False
 False1. **优化 workflow**：
 False - 使用 **矩阵构建** 时合理设置组合
 False - 添加 **缓存** 减少依赖安装时间
 False - 限制 **并发** 运行的 workflow
 False - 使用 **条件执行** 减少不必要的运行
 False
 False2. **使用自托管 runner**：
 False - 在 GitHub 仓库 → Settings → Actions → Runners → New self-hosted runner
 False - 按照说明安装和配置自托管 runner
 False
 False3. **考虑开源仓库**：
 False - 公共仓库有更多的免费分钟数
 False
 False### 7.2 Actions 权限问题
 False
 False**现象**：Actions 运行失败，提示权限不足。
 False
 False**诊断**：
 False
```yaml
 True# 检查 workflow 文件中的权限配置
 Truepermissions:
 True contents: read
 True packages: write
 True # 其他需要的权限
 True```

 False**修复**：
 False
 False1. **在 workflow 文件中设置正确的权限**：
 False
 ```yaml
 True permissions:
 True contents: write
 True pull-requests: write
 True # 根据需要添加其他权限
 True ```

 False2. **使用 `GITHUB_TOKEN`**：
 False - Actions 自动提供 `GITHUB_TOKEN` 环境变量
 False - 确保 workflow 中正确使用 `secrets.GITHUB_TOKEN`
 False
 False3. **检查仓库设置**：
 False - 进入 GitHub 仓库 → Settings → Actions → General
 False - 确保 **Workflow permissions** 设置正确
 False
 False### 7.3 Actions 构建失败
 False
 False**现象**：Actions 构建过程中失败。
 False
 False**诊断**：
 False
 False1. **查看 Actions 日志**：
 False - 进入 GitHub 仓库 → Actions
 False - 点击失败的 workflow → 查看详细日志
 False
 False2. **常见失败原因**：
 False - 依赖安装失败
 False - 测试失败
 False - 构建命令错误
 False - 环境配置问题
 False
 False**修复**：
 False
 False1. **修复依赖问题**：
 False - 检查 `package.json`、`requirements.txt` 等依赖文件
 False - 确保依赖版本兼容
 False
 False2. **修复测试问题**：
 False - 检查测试代码和测试数据
 False - 确保测试环境配置正确
 False
 False3. **修复构建命令**：
 False - 检查构建脚本和命令
 False - 确保构建环境正确
 False
 False4. **添加调试信息**：
 False
 ```yaml
 True steps:
 True - name: Debug information
 True run: |
 True echo "Node version: $(node -v)"
 True echo "npm version: $(npm -v)"
 True echo "Current directory: $(pwd)"
 True ls -la
 True ```

 False## 8. 其他常见问题
 False
 False### 8.1 分支保护规则导致推送失败
 False
 False**现象**：`git push` 失败，提示分支受保护。
 False
 False**诊断**：
 False
 False- 检查 GitHub 仓库 → Settings → Branches → Branch protection rules
 False
 False**修复**：
 False
 False1. **创建 PR**：
 False - 推送到新分支
 False - 创建 PR 并请求审核
 False
 False2. **临时禁用分支保护**（仅维护者）：
 False - 进入分支保护规则设置
 False - 临时禁用相关规则
 False - 推送后重新启用
 False
 False### 8.2 合并冲突
 False
 False**现象**：合并 PR 时出现冲突。
 False
 False**修复**：
 False
 False1. **本地解决冲突**：
 False
 ```bash
 True # 拉取最新代码
 True git pull origin main
 True 
 True # 解决冲突
 True # 编辑冲突文件
 True 
 True # 标记冲突已解决
 True git add .
 True 
 True # 继续合并
 True git commit
 True 
 True # 推送
 True git push
 True ```

 False2. **使用 GitHub 网页界面解决冲突**：
 False - 进入 PR 页面
 False - 点击 "Resolve conflicts"
 False - 在网页编辑器中解决冲突
 False - 提交解决后的代码
 False
 False### 8.3 标签推送失败
 False
 False**现象**：`git push --tags` 失败。
 False
 False**修复**：
 False
 False1. **检查权限**：确保有推送标签的权限
 False
 False2. **强制推送标签**：
 False
 ```bash
 True git push --tags --force
 True ```

 False3. **单独推送特定标签**：
 False
 ```bash
 True git push origin <tag_name>
 True ```

 False## 9. 综合诊断与预防
 False
 False### 9.1 综合诊断脚本
 False
```bash
 True#!/usr/bin/env bash
 Trueset -euo pipefail
 True
 True# 基本信息
 Trueecho "== 系统信息 =="
 Trueuname -a
 Trueecho "== Git 版本 =="
 Truegit --version
 True
 True# 仓库信息
 Trueecho "== 远程仓库 =="
 Truegit remote -v
 Trueecho "== 当前分支 =="
 Truegit branch -vv
 Trueecho "== 最近提交 =="
 Truegit log -1 --oneline
 True
 True# 配置信息
 Trueecho "== Git 配置 =="
 Truegit config --list
 Trueecho "== SSH 配置 =="
 Truecat ~/.ssh/config 2>/dev/null || echo "No SSH config"
 True
 True# 子模块信息
 Trueecho "== 子模块状态 =="
 Truegit submodule status 2>/dev/null || echo "No submodules"
 True
 True# LFS 信息
 Trueecho "== LFS 状态 =="
 Truecommand -v git-lfs && git lfs version || echo "LFS not installed"
 Truecommand -v git-lfs && git lfs status 2>/dev/null || echo "No LFS status"
 True
 True# 换行符配置
 Trueecho "== 换行符配置 =="
 Truegit config --get core.autocrlf
 Truels -la .gitattributes 2>/dev/null || echo "No .gitattributes"
 True
 True# GPG 信息
 Trueecho "== GPG 状态 =="
 Truegpg --list-secret-keys --keyid-format LONG 2>/dev/null || echo "No GPG keys"
 Truegit config --get user.signingkey 2>/dev/null || echo "No signing key configured"
 True
 True# 网络测试
 Trueecho "== 网络测试 =="
 Trueping -c 3 github.com 2>/dev/null || echo "Ping failed"
 Truessh -T git@github.com 2>&1 || echo "SSH test failed"
 True```

 False### 9.2 预防措施
 False
 False1. **使用 Git hooks**：
 False - **pre-commit**：检查提交信息、代码风格、大文件等
 False - **pre-push**：检查推送前的状态
 False
 False2. **配置模板**：
 False - 提交信息模板
 False - PR 模板
 False - Issue 模板
 False
 False3. **自动化工具**：
 False - **Dependabot**：自动更新依赖
 False - **Code Scanning**：自动代码安全扫描
 False - **Secret Scanning**：自动敏感信息扫描
 False
 False4. **文档**：
 False - **CONTRIBUTING.md**：贡献指南
 False - **README.md**：项目说明
 False - **SECURITY.md**：安全漏洞上报流程
 False
 False5. **培训**：
 False - 团队 Git 最佳实践培训
 False - 定期代码审查
 False - 常见问题分享会
 False
 False## 10. 实际案例分析
 False
 False### 10.1 案例一：SSH 认证失败
 False
 False**问题**：开发者在新机器上克隆仓库时，提示 `Permission denied (publickey)`。
 False
 False**原因**：新机器没有配置 SSH 密钥，或者密钥未添加到 GitHub。
 False
 False**解决方案**：
 False
 False1. 生成新的 SSH 密钥
 False2. 添加密钥到 ssh-agent
 False3. 将公钥添加到 GitHub
 False4. 验证连接
 False
 False### 10.2 案例二：大文件导致推送失败
 False
 False**问题**：开发者尝试推送包含大文件的提交，提示文件超过 100MB 限制。
 False
 False**原因**：GitHub 限制单个文件大小为 100MB。
 False
 False**解决方案**：
 False
 False1. 使用 Git LFS 跟踪大文件
 False2. 移除历史中的大文件
 False3. 重新推送
 False
 False### 10.3 案例三：Actions 构建失败
 False
 False**问题**：GitHub Actions 构建失败，提示依赖安装失败。
 False
 False**原因**：依赖版本不兼容，或者网络问题导致依赖下载失败。
 False
 False**解决方案**：
 False
 False1. 检查依赖文件
 False2. 配置缓存
 False3. 添加重试机制
 False4. 检查网络连接
 False
 False## 11. 延伸阅读
 False
 False- [Troubleshooting connectivity](https://docs.github.com/en/authentication/troubleshooting-ssh) <!-- nofollow -->
 False- [Working with large files](https://docs.github.com/en/repositories/working-with-files/managing-large-files) <!-- nofollow -->
 False- [Configuring Git to handle line endings](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings) <!-- nofollow -->
 False- [Working with submodules](https://docs.github.com/en/repositories/working-with-files/submodules) <!-- nofollow -->
 False- [About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) <!-- nofollow -->
 False- [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-05-03**：扩展内容，添加更多常见问题的详细解决方案、更全面的诊断命令、更详细的修复步骤、更多的预防措施、实际案例分析、与其他工具的集成等。
 False