# 协作开发规范：Commit Message、PR 模板、Code Review、CLA 与 DCO
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Advanced
 False> @Description: 协作开发规范：Commit Message、PR 模板、代码审查清单、CLA/DCO 合规。 | Collaboration guidelines: commit messages, PR templates, code review, CLA/DCO compliance.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [Commit Message 约定](#commit-message-约定)
 False3. [PR 模板配置](#pr-模板配置)
 False4. [Code Review 流程](#code-review-流程)
 False5. [CLA 与 DCO](#cla-与-dco)
 False6. [团队协作规范](#团队协作规范)
 False7. [常见问题与解决方案](#常见问题与解决方案)
 False8. [实际应用案例](#实际应用案例)
 False9. [工具集成](#工具集成)
 False10. [最佳实践总结](#最佳实践总结)
 False11. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 背景
 False
 False规模化协作依赖 **可检索的提交历史**、**可执行的审查流程** 与 **法律层面的贡献授权**。**Conventional Commits（约定式提交）** 广泛用于生成 **CHANGELOG**；**PR 模板** 减少来回询问；**CLA（贡献者许可协议）** 与 **DCO（开发者来源证书）** 用于明确 **IP（知识产权）** 归属。
 False
 False## 2. Commit Message 约定
 False
 False### 2.1 标准格式
 False
```
 True<type>(<scope>): <subject>
 True
 True<body>
 True
 True<footer>
 True```

 False### 2.2 类型说明
 False
 False| 类型 | 描述 | 示例 |
 False|------|------|------|
 False| feat | 新功能 | `feat(auth): add refresh token rotation` |
 False| fix | 修复 bug | `fix(api): handle 429 from upstream` |
 False| docs | 文档更新 | `docs(readme): clarify install steps` |
 False| style | 代码风格（格式调整，不影响功能） | `style: format code with prettier` |
 False| refactor | 代码重构（不添加功能，不修复 bug） | `refactor: extract common utility functions` |
 False| test | 测试相关 | `test: add unit tests for auth module` |
 False| chore | 构建过程或辅助工具变动 | `chore: update dependencies` |
 False| perf | 性能优化 | `perf: optimize database query` |
 False| revert | 回滚更改 | `revert: revert commit abc123` |
 False
 False### 2.3 作用域（Scope）
 False
 False- 可选，用于指定变更的模块或组件
 False- 建议使用语义化的模块名称，如 `auth`、`api`、`ui` 等
 False
 False### 2.4 主题（Subject）
 False
 False- 简短描述变更内容（不超过 50 个字符）
 False- 使用祈使句（如 "add" 而非 "added"）
 False- 英文小写开头（团队可统一使用中文）
 False- 结尾不要加句号
 False
 False### 2.5 正文（Body）
 False
 False- 可选，详细描述变更内容
 False- 每行不超过 72 个字符
 False- 说明变更的原因和影响
 False
 False### 2.6 页脚（Footer）
 False
 False- 可选，包含以下信息：
 False - **Breaking Change**：使用 `BREAKING CHANGE:` 前缀说明破坏性变更
 False - **关联 Issue**：使用 `Closes #123` 或 `Resolves #123` 关联相关 Issue
 False - **DCO 签名**：使用 `Signed-off-by: Name <email@example.com>` 进行 DCO 签名
 False
 False### 2.7 示例
 False
```text
 Truefeat(auth): add refresh token rotation
 True
 TrueImplement refresh token rotation to improve security.
 TrueThis change requires clients to handle token rotation properly.
 True
 TrueBREAKING CHANGE: Clients must now handle refresh token rotation.
 TrueCloses #456
 TrueSigned-off-by: John Doe <john@example.com>
 True```

 False### 2.8 工具支持
 False
 False- **commitizen**：交互式提交信息生成工具
 False- **commitlint**：提交信息验证工具
 False- **standard-version**：基于提交信息生成 CHANGELOG
 False
 False## 3. PR 模板配置
 False
 False### 3.1 创建 PR 模板
 False
 False在仓库根目录创建 `.github/pull_request_template.md` 文件：
 False
```markdown
 True## 背景
 True
 True简要描述本次 PR 的背景和目的。
 True
 True## 关联 Issue
 True
 True- Closes #123
 True- Relates to #456
 True
 True## 变更说明
 True
 True- 实现了什么功能
 True- 解决了什么问题
 True- 使用了什么技术
 True
 True## 实现细节
 True
 True- 关键代码变更
 True- 架构设计
 True- 技术选型
 True
 True## 测试
 True
 True- [ ] 单元测试
 True- [ ] 集成测试
 True- [ ] 手动验证步骤：
 True 1. 步骤 1
 True 2. 步骤 2
 True
 True## 检查清单
 True
 True- [ ] 已更新文档
 True- [ ] 无敏感信息/密钥
 True- [ ] 代码符合风格规范
 True- [ ] 测试覆盖充分
 True- [ ] 性能无劣化
 True
 True## 其他说明
 True
 True如有其他需要说明的内容，请在此处补充。
 True```

 False### 3.2 分支命名规范
 False
```
 True<type>/<description>
 True```

 False- **type**：feat、fix、docs、refactor 等
 False- **description**：简短描述分支目的
 False
 False示例：
 False
 False- `feat/add-login`
 False- `fix/api-error-handling`
 False- `docs/update-readme`
 False
 False### 3.3 PR 标题规范
 False
```
 True<type>(<scope>): <subject>
 True```

 False与 Commit Message 格式一致，便于自动生成 CHANGELOG。
 False
 False### 3.4 PR 描述最佳实践
 False
 False- 清晰描述变更内容和原因
 False- 提供测试步骤和预期结果
 False- 如有破坏性变更，明确说明
 False- 关联相关 Issue
 False- 如有需要，提供截图或演示链接
 False
 False## 4. Code Review 流程
 False
 False### 4.1 审查者职责
 False
 False- 理解 PR 的目的和实现
 False- 检查代码质量和安全性
 False- 提供建设性反馈
 False- 确保测试覆盖充分
 False- 验证变更符合项目规范
 False
 False### 4.2 审查清单
 False
 False#### 4.2.1 正确性
 False
 False- [ ] 代码逻辑正确
 False- [ ] 边界情况处理
 False- [ ] 错误处理完善
 False- [ ] 并发安全
 False- [ ] 事务一致性
 False
 False#### 4.2.2 安全性
 False
 False- [ ] 无注入漏洞
 False- [ ] 无路径遍历
 False- [ ] 无敏感信息泄露
 False- [ ] 依赖无安全漏洞（使用 Dependabot）
 False- [ ] 权限控制正确
 False
 False#### 4.2.3 可维护性
 False
 False- [ ] 代码风格一致
 False- [ ] 命名规范
 False- [ ] 注释充分
 False- [ ] 无重复代码
 False- [ ] 模块化设计
 False
 False#### 4.2.4 性能
 False
 False- [ ] 无性能瓶颈
 False- [ ] 无 N+1 查询
 False- [ ] 资源使用合理
 False- [ ] 缓存策略适当
 False
 False#### 4.2.5 测试
 False
 False- [ ] 单元测试覆盖
 False- [ ] 集成测试覆盖
 False- [ ] 测试用例合理
 False
 False### 4.3 审查反馈类型
 False
 False- **必须修改**：代码存在严重问题，必须修复
 False- **建议修改**：代码可以改进，建议优化
 False- **疑问**：对代码有疑问，需要作者解释
 False- **赞赏**：代码写得好，值得肯定
 False
 False### 4.4 审查流程
 False
 False1. **分配审查者**：使用 CODEOWNERS 自动分配或手动指定
 False2. **初步审查**：检查 PR 描述和变更范围
 False3. **代码审查**：逐行审查代码
 False4. **测试验证**：运行测试确保无回归
 False5. **反馈沟通**：提供反馈并等待作者修改
 False6. **最终批准**：确认所有问题已解决
 False7. **合并 PR**：选择合适的合并策略
 False
 False## 5. CLA 与 DCO
 False
 False### 5.1 CLA（贡献者许可协议）
 False
 False#### 5.1.1 什么是 CLA
 False
 FalseCLA 是贡献者与项目所有者之间的法律协议，明确贡献的知识产权归属，保护项目和贡献者双方的权益。
 False
 False#### 5.1.2 类型
 False
 False- **个人 CLA**：适用于个人贡献者
 False- **企业 CLA**：适用于企业员工代表公司贡献
 False
 False#### 5.1.3 配置
 False
 False1. **选择 CLA 工具**：
 False - **CLA Assistant**：GitHub App，自动管理 CLA 签署
 False - **CLA Hub**：另一个流行的 CLA 管理工具
 False
 False2. **配置步骤**：
 False - 安装 CLA Assistant GitHub App
 False - 创建 CLA 文档
 False - 在仓库中配置 CLA 检查
 False
 False### 5.2 DCO（开发者来源证书）
 False
 False#### 5.2.1 什么是 DCO
 False
 FalseDCO 是一种轻量级的贡献者协议，通过在提交信息中添加 `Signed-off-by` 行来确认贡献者有权提交代码。
 False
 False#### 5.2.2 配置
 False
 False1. **启用 DCO 检查**：
 False - 使用 `actions/dco` GitHub Action
 False - 在 `.github/workflows/dco.yml` 中配置
 False
 False2. **DCO 工作流**：
 False - 贡献者使用 `git commit -s` 签署提交
 False - DCO Action 验证每个提交是否有签名
 False - 无签名的提交将导致 CI 失败
 False
 False### 5.3 CLA 与 DCO 对比
 False
 False| 特性 | CLA | DCO |
 False|------|------|------|
 False| 复杂度 | 高 | 低 |
 False| 法律约束力 | 强 | 中等 |
 False| 实施难度 | 中等 | 低 |
 False| 适用场景 | 大型项目、企业项目 | 开源项目、小型项目 |
 False
 False## 6. 团队协作规范
 False
 False### 6.1 分支管理
 False
 False- **main/master**：主分支，保持稳定可发布状态
 False- **develop**：开发分支，集成新功能
 False- **feature/**：功能分支，开发新功能
 False- **fix/**：修复分支，修复 bug
 False- **release/**：发布分支，准备发布
 False- **hotfix/**：热修复分支，紧急修复生产问题
 False
 False### 6.2 代码风格
 False
 False- **统一代码风格**：使用 ESLint、Prettier 等工具
 False- **编码规范**：制定团队编码规范文档
 False- **代码审查**：确保代码符合风格要求
 False
 False### 6.3 文档规范
 False
 False- **README.md**：项目概述、安装、使用说明
 False- **CONTRIBUTING.md**：贡献指南
 False- **CODE_OF_CONDUCT.md**：行为准则
 False- **SECURITY.md**：安全漏洞上报流程
 False- **API 文档**：使用 JSDoc、Swagger 等工具生成
 False
 False### 6.4 会议规范
 False
 False- **站会**：每日 15 分钟，同步进度和问题
 False- **评审会**：定期代码评审会议
 False- **规划会**： Sprint 规划和回顾
 False- **技术分享**：定期技术分享会议
 False
 False## 7. 常见问题与解决方案
 False
 False### 7.1 Commit Message 问题
 False
 False- **问题**：提交信息不规范
 False- **解决方案**：
 False 1. 使用 commitizen 工具生成规范的提交信息
 False 2. 配置 commitlint 进行提交信息验证
 False 3. 定期代码审查时检查提交信息
 False
 False### 7.2 PR 审核延迟
 False
 False- **问题**：PR 审核不及时
 False- **解决方案**：
 False 1. 明确审核责任和时间要求
 False 2. 使用 CODEOWNERS 自动分配审核者
 False 3. 建立审核优先级机制
 False
 False### 7.3 DCO 签名缺失
 False
 False- **问题**：提交缺少 DCO 签名导致 CI 失败
 False- **解决方案**：
 False 1. 使用 `git commit -s` 重新提交
 False 2. 对历史提交使用 `git rebase --signoff` 签名
 False 3. 配置 Git 客户端默认使用 `-s` 选项
 False
 False### 7.4 合并冲突
 False
 False- **问题**：PR 合并时出现冲突
 False- **解决方案**：
 False 1. 及时同步上游分支
 False 2. 使用 `git rebase` 解决冲突
 False 3. 小批量提交减少冲突概率
 False
 False### 7.5 代码质量问题
 False
 False- **问题**：代码质量不符合要求
 False- **解决方案**：
 False 1. 建立代码质量标准
 False 2. 使用静态代码分析工具
 False 3. 加强代码审查力度
 False
 False## 8. 实际应用案例
 False
 False### 8.1 开源项目
 False
 False- **Vue.js**：使用 Conventional Commits 和 DCO
 False- **React**：使用 PR 模板和 CODEOWNERS
 False- **Node.js**：使用 CLA 和严格的代码审查
 False
 False### 8.2 企业项目
 False
 False- **大型电商平台**：使用 Git Flow 分支管理和 CLA
 False- **SaaS 产品**：使用 GitHub Actions 自动化测试和部署
 False- **金融系统**：使用严格的代码审查和安全检查
 False
 False## 9. 工具集成
 False
 False### 9.1 GitHub 工具
 False
 False- **GitHub Actions**：自动化测试、构建和部署
 False- **Dependabot**：自动更新依赖
 False- **Code Scanning**：代码安全扫描
 False- **Secret Scanning**：敏感信息扫描
 False
 False### 9.2 第三方工具
 False
 False- **SonarQube**：代码质量分析
 False- **Snyk**：依赖安全扫描
 False- **Jira**：项目管理和 Issue 跟踪
 False- **Slack**：团队沟通和通知
 False
 False## 10. 最佳实践总结
 False
 False- **统一规范**：制定并执行统一的协作规范
 False- **自动化**：使用工具自动化流程和检查
 False- **透明沟通**：保持团队沟通透明和及时
 False- **持续改进**：定期回顾和优化协作流程
 False- **尊重贡献者**：感谢和尊重每一位贡献者
 False
 False## 11. 延伸阅读
 False
 False- [Conventional Commits](https://www.conventionalcommits.org/) <!-- nofollow -->
 False- [GitHub 协作指南](https://docs.github.com/en/github/collaborating-with-pull-requests) <!-- nofollow -->
 False- [Code Review 最佳实践](https://google.github.io/eng-practices/review/) <!-- nofollow -->
 False- [CLA 与 DCO 比较](https://opensource.guide/legal/#contributor-license-agreements) <!-- nofollow -->
 False- [Git 分支管理策略](https://nvie.com/posts/a-successful-git-branching-model/) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-05-03**：扩展内容，添加更详细的 Commit Message 约定、PR 模板的详细配置和使用指南、Code Review 的详细流程和最佳实践、CLA 和 DCO 的详细说明和配置、团队协作的其他规范、常见问题的详细解决方案、实际应用案例和与其他协作工具的集成。
 False