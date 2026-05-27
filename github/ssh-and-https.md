# SSH 与 HTTPS 远程配置
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Basics
 False> @Description: SSH 与 HTTPS 远程配置对比、公钥配置、HTTPS+PAT 配置指南。 | Comparison of SSH vs HTTPS, public key configuration, HTTPS+PAT setup guide.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [原理对比](#原理对比)
 False3. [SSH：生成密钥与配置](#ssh：生成密钥与配置)
 False4. [HTTPS：PAT 与凭据管理](#https：pat-与凭据管理)
 False5. [常见问题与解决方案](#常见问题与解决方案)
 False6. [最佳实践](#最佳实践)
 False7. [高级配置](#高级配置)
 False
 False---
 False
 False## 1. 背景
 False
 False与远程 **GitHub 仓库（repository）** 通信是日常开发中不可或缺的操作，主要有两种认证方式：
 False
 False- **SSH（Secure Shell）**：使用非对称密钥对进行认证
 False- **HTTPS**：使用 **PAT（个人访问令牌）** 作为密码替代
 False
 False选择哪种方式取决于多种因素，如团队规范、网络环境、安全性要求等。本指南将详细介绍两种方式的配置和使用方法。
 False
 False## 2. 原理对比
 False
 False| 特性 | SSH | HTTPS |
 False|------|-----|-------|
 False| 认证方式 | 非对称密钥对（公钥/私钥） | 用户名 + PAT |
 False| 端口 | 22 | 443 |
 False| 安全性 | 高（私钥本地存储） | 中（PAT 需要妥善保管） |
 False| 网络兼容性 | 可能被防火墙阻止 | 几乎所有网络都支持 |
 False| 配置复杂度 | 稍高（需要生成和管理密钥） | 简单（只需生成 PAT） |
 False| 适用场景 | 高频推送、多设备开发 | 偶尔操作、受限网络环境 |
 False
 False## 3. SSH：生成密钥与配置
 False
 False### 3.1 生成 SSH 密钥
 False
 False#### 3.1.1 使用 Ed25519 算法（推荐）
 False
```bash
 True# Windows 系统
 Truessh-keygen -t ed25519 -C "you@example.com" -f "%USERPROFILE%\.ssh\id_ed25519_github" -N ""
 True
 True# macOS/Linux 系统
 Truessh-keygen -t ed25519 -C "you@example.com" -f "~/.ssh/id_ed25519_github" -N ""
 True
 True# 参数说明：
 True# -t ed25519：使用 Ed25519 算法，更安全且密钥文件更小
 True# -C "you@example.com"：添加注释，通常使用邮箱
 True# -f：指定密钥文件路径和名称
 True# -N ""：设置空密码短语，生产环境建议设置密码短语
 True```

 False#### 3.1.2 使用 RSA 算法（兼容性更好）
 False
```bash
 True# Windows 系统
 Truessh-keygen -t rsa -b 4096 -C "you@example.com" -f "%USERPROFILE%\.ssh\id_rsa_github" -N ""
 True
 True# macOS/Linux 系统
 Truessh-keygen -t rsa -b 4096 -C "you@example.com" -f "~/.ssh/id_rsa_github" -N ""
 True
 True# 参数说明：
 True# -t rsa：使用 RSA 算法
 True# -b 4096：密钥长度为 4096 位
 True```

 False### 3.2 查看和复制公钥
 False
```bash
 True# Windows 系统
 Truetype %USERPROFILE%\.ssh\id_ed25519_github.pub
 True
 True# macOS/Linux 系统
 Truecat ~/.ssh/id_ed25519_github.pub
 True
 True# 复制输出的公钥内容，包括 ssh-ed25519 前缀和邮箱后缀
 True```

 False### 3.3 在 GitHub 上添加公钥
 False
 False1. 登录 GitHub，点击头像 → Settings → SSH and GPG keys
 False2. 点击 "New SSH key" 按钮
 False3. 在 "Title" 字段中输入密钥名称（如 "My Laptop"）
 False4. 在 "Key" 字段中粘贴复制的公钥内容
 False5. 点击 "Add SSH key" 按钮完成添加
 False
 False**截图占位**：`[图 02-1] SSH 公钥已添加列表`
 False
 False### 3.4 测试 SSH 连接
 False
```bash
 True# 测试默认 GitHub 连接
 Truessh -T git@github.com
 True
 True# 测试指定密钥文件的连接
 Truessh -i "%USERPROFILE%\.ssh\id_ed25519_github" -T git@github.com # Windows
 Truessh -i "~/.ssh/id_ed25519_github" -T git@github.com # macOS/Linux
 True
 True# 首次连接会提示验证主机指纹，确认后输入 yes
 True# 成功时显示：Hi username! You've successfully authenticated...
 True```

 False### 3.5 配置 ssh-agent 管理密钥
 False
```bash
 True# 启动 ssh-agent
 True# Windows 系统
 TrueStart-Service ssh-agent # PowerShell
 True# 或
 Truessh-agent cmd.exe # CMD
 True
 True# macOS/Linux 系统
 Trueeval "$(ssh-agent -s)"
 True
 True# 添加私钥到 ssh-agent
 True# Windows 系统
 Truessh-add "%USERPROFILE%\.ssh\id_ed25519_github"
 True
 True# macOS/Linux 系统
 Truessh-add ~/.ssh/id_ed25519_github
 True
 True# 查看已添加的密钥
 Truessh-add -l
 True```

 False### 3.6 多账户配置：SSH config
 False
```sshconfig
 True# 文件路径：~/.ssh/config（Windows 同路径）
 True
 True# 个人 GitHub 账户
 TrueHost github.com-personal
 True HostName github.com
 True User git
 True IdentityFile ~/.ssh/id_ed25519_personal
 True IdentitiesOnly yes # 只使用指定的密钥
 True
 True# 工作 GitHub 账户
 TrueHost github.com-work
 True HostName github.com
 True User git
 True IdentityFile ~/.ssh/id_ed25519_work
 True IdentitiesOnly yes
 True
 True# 配置说明：
 True# Host：自定义主机别名
 True# HostName：实际主机名
 True# User：登录用户名，GitHub 固定为 git
 True# IdentityFile：指定使用的私钥文件
 True# IdentitiesOnly：只使用配置中指定的密钥
 True```

 False### 3.7 使用 SSH 克隆和推送
 False
```bash
 True# 使用默认 SSH 配置克隆
 Truegit clone git@github.com:username/repository.git
 True
 True# 使用指定账户克隆
 Truegit clone git@github.com-personal:username/personal-repo.git
 Truegit clone git@github.com-work:company/work-repo.git
 True
 True# 推送代码
 Truecd repository
 Truegit add .
 Truegit commit -m "Update files"
 Truegit push origin main
 True```

 False## 4. HTTPS：PAT 与凭据管理
 False
 False### 4.1 生成个人访问令牌 (PAT)
 False
 False#### 4.1.1 生成 Fine-grained token（推荐）
 False
 False1. 登录 GitHub，点击头像 → Settings → Developer settings → Personal access tokens → Fine-grained tokens
 False2. 点击 "Generate new token" 按钮
 False3. 填写以下信息：
 False - Token name：令牌名称（如 "My Laptop HTTPS"）
 False - Expiration：过期时间（建议 30-90 天）
 False - Repository access：选择访问权限（可选择特定仓库或所有仓库）
 False - Permissions：根据需要选择具体权限
 False4. 点击 "Generate token" 按钮
 False5. 复制生成的令牌，离开页面后将无法再次查看
 False
 False#### 4.1.2 生成 Classic token
 False
 False1. 登录 GitHub，点击头像 → Settings → Developer settings → Personal access tokens → Tokens (classic)
 False2. 点击 "Generate new token" → "Generate new token (classic)"
 False3. 填写以下信息：
 False - Note：令牌名称
 False - Expiration：过期时间
 False - Scopes：选择所需权限（如 `repo`、`gist` 等）
 False4. 点击 "Generate token" 按钮
 False5. 复制生成的令牌
 False
 False**截图占位**：`[图 02-2] Fine-grained token 权限勾选界面`
 False
 False### 4.2 配置 Git 凭据管理
 False
```bash
 True# Windows 系统：使用 Git Credential Manager
 Truegit config --global credential.helper manager
 True
 True# macOS 系统：使用 osxkeychain
 Truegit config --global credential.helper osxkeychain
 True
 True# Linux 系统：使用 libsecret
 Truegit config --global credential.helper libsecret
 True
 True# 验证配置
 Truegit config --global --get credential.helper
 True```

 False### 4.3 使用 HTTPS 克隆和推送
 False
```bash
 True# 克隆仓库
 Truegit clone https://github.com/username/repository.git
 True
 True# 首次推送时，系统会提示输入用户名和密码：
 True# 用户名：GitHub 用户名
 True# 密码：粘贴生成的 PAT
 True
 True# 查看远程配置
 Truegit remote -v
 True
 True# 更改远程 URL 从 SSH 到 HTTPS
 Truegit remote set-url origin https://github.com/username/repository.git
 True
 True# 更改远程 URL 从 HTTPS 到 SSH
 Truegit remote set-url origin git@github.com:username/repository.git
 True```

 False### 4.4 管理 PAT
 False
 False- **定期轮换**：设置合理的过期时间，到期前生成新令牌
 False- **最小权限**：只授予必要的权限范围
 False- **安全存储**：使用密码管理器存储 PAT，避免明文存储
 False- **撤销令牌**：当设备丢失或令牌泄露时，及时在 GitHub 上撤销
 False
 False## 5. 常见问题与解决方案
 False
 False| 问题 | 原因 | 解决方案 |
 False|------|------|----------|
 False| Permission denied (publickey) | 公钥未添加到 GitHub、私钥未加载到 ssh-agent、SSH config 配置错误 | 检查公钥是否已添加、使用 ssh-add 加载私钥、检查 SSH config 配置 |
 False| Host key verification failed | 主机指纹不匹配，可能是中间人攻击 | 确认 GitHub 官方指纹后再连接 |
 False| PAT 过期 | Classic token 设置了有效期 | 生成新的 PAT 并更新凭据 |
 False| HTTPS 连接失败 | 网络问题、代理设置、企业 MITM | 检查网络连接、配置代理、信任企业根证书 |
 False| 多账户认证冲突 | 多个 SSH 密钥或 PAT 管理混乱 | 使用 SSH config 配置多账户、为不同账户使用不同 PAT |
 False
 False### 5.1 故障诊断脚本
 False
```bash
 True# 检查 SSH 配置
 Truessh -v git@github.com # 详细输出 SSH 连接过程
 True
 True# 检查 Git 远程配置
 Truegit remote -v
 True
 True# 检查 Git 凭据配置
 Truegit config --list | grep credential
 True
 True# 测试 HTTPS 连接
 Truegit ls-remote https://github.com/username/repository.git
 True
 True# 测试 SSH 连接
 Truegit ls-remote git@github.com:username/repository.git
 True```

 False## 6. 最佳实践
 False
 False### 6.1 SSH 最佳实践
 False
 False- **使用 Ed25519 算法**：更安全且密钥文件更小
 False- **设置密码短语**：为私钥设置密码短语，增加安全性
 False- **合理命名密钥**：为不同用途的密钥使用明确的命名（如 id_ed25519_personal、id_ed25519_work）
 False- **权限设置**：
 False - Linux/macOS：`chmod 600 ~/.ssh/id_ed25519_*`
 False - Windows：使用 OpenSSH 默认权限
 False- **定期备份**：备份私钥文件到安全位置
 False- **使用 ssh-agent**：避免每次操作都输入密码短语
 False
 False### 6.2 HTTPS 最佳实践
 False
 False- **使用 Fine-grained token**：提供更精细的权限控制
 False- **设置合理过期时间**：建议 30-90 天
 False- **最小权限原则**：只授予必要的权限
 False- **使用凭据管理器**：避免每次操作都输入 PAT
 False- **定期轮换**：到期前生成新令牌
 False- **CI/CD 环境**：使用 GitHub Actions 提供的 `GITHUB_TOKEN`，不使用个人 PAT
 False
 False### 6.3 团队协作最佳实践
 False
 False- **统一认证方式**：团队内统一使用 SSH 或 HTTPS
 False- **文档化配置**：创建团队配置文档，包含认证方式和步骤
 False- **密钥管理**：建立密钥轮换和备份策略
 False- **安全审计**：定期检查已添加的 SSH 密钥和 PAT
 False
 False## 7. 高级配置
 False
 False### 7.1 使用 SSH 代理
 False
```bash
 True# 配置 SSH 通过代理连接
 True# ~/.ssh/config
 TrueHost github.com
 True HostName github.com
 True User git
 True ProxyCommand nc -X 5 -x proxy.example.com:1080 %h %p
 True IdentityFile ~/.ssh/id_ed25519_github
 True```

 False### 7.2 自动加载 SSH 密钥
 False
```bash
 True# Windows：在 PowerShell 配置文件中添加
 True# ~/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1
 TrueStart-Service ssh-agent
 Truessh-add ~/.ssh/id_ed25519_github
 True
 True# macOS/Linux：在 ~/.bashrc 或 ~/.zshrc 中添加
 Trueif [ -z "$SSH_AUTH_SOCK" ]; then
 True eval "$(ssh-agent -s)"
 True ssh-add ~/.ssh/id_ed25519_github
 Truefi
 True```

 False### 7.3 多仓库配置示例
 False
```bash
 True# 个人仓库使用 SSH
 Truegit remote set-url origin git@github.com-personal:username/personal-repo.git
 True
 True# 工作仓库使用 HTTPS
 Truegit remote set-url origin https://github.com/company/work-repo.git
 True
 True# 检查配置
 Truegit remote -v
 True```

 False## 延伸阅读
 False
 False- [GitHub：SSH 密钥](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) <!-- nofollow -->
 False- [GitHub：创建个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) <!-- nofollow -->
 False- [GitHub：使用 SSH 代理](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding) <!-- nofollow -->
 False- [Git 官方文档：凭据存储](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版
 False- **2026-04-05**：扩写内容，增加详细的操作步骤、代码示例、故障诊断和高级配置
 False