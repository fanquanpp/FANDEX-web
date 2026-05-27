# Issues 模板、标签、里程碑与自动化
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: GitHub Advanced
 False> @Description: Issues 模板配置、Labels、Milestones、自动化关闭关键词与项目板衔接。 | Issue templates, labels, milestones, auto-close keywords, and project board integration.
 False
 False---
 False
 False## 目录
 False
 False1. [背景](#背景)
 False2. [Issue 模板详解](#issue-模板详解)
 False3. [标签管理](#标签管理)
 False4. [里程碑管理](#里程碑管理)
 False5. [自动化工具](#自动化工具)
 False6. [项目板与 Issues 集成](#项目板与-issues-集成)
 False7. [常见问题与解决方案](#常见问题与解决方案)
 False8. [最佳实践](#最佳实践)
 False9. [实际应用案例](#实际应用案例)
 False10. [延伸阅读](#延伸阅读)
 False
 False---
 False
 False## 1. 背景
 False
 False**Issue（议题）** 用于跟踪缺陷、功能请求与讨论。**模板（template）** 统一报告格式，降低沟通成本；**Labels（标签）** 分类与筛选；**Milestones（里程碑）** 聚合版本目标与进度。
 False
 False## 2. Issue 模板详解
 False
 False### 2.1 模板类型
 False
 FalseGitHub 支持多种类型的 Issue 模板：
 False
 False- **Bug 报告**：用于报告软件缺陷
 False- **功能请求**：用于提出新功能建议
 False- **问题讨论**：用于一般性讨论
 False- **文档更新**：用于文档相关的问题
 False- **自定义模板**：根据项目需求创建特定模板
 False
 False### 2.2 模板配置
 False
 False#### 2.2.1 文件结构
 False
 False在仓库根目录创建 `.github/ISSUE_TEMPLATE/` 目录，然后添加相应的模板文件：
 False
```
 True.github/
 True└── ISSUE_TEMPLATE/
 True ├── bug_report.md
 True ├── feature_request.md
 True ├── question.md
 True └── config.yml
 True```

 False#### 2.2.2 YAML 前置元数据
 False
 False每个模板文件都需要包含 YAML 前置元数据：
 False
```markdown
 True---
 Truename: 模板名称
 Trueabout: 模板用途
 Truetitle: "[前缀] 标题"
 Truelabels: 标签1, 标签2
 Trueassignees: 处理人
 True---
 True```

 False#### 2.2.3 完整模板示例
 False
 False##### 2.2.3.1 Bug 报告模板
 False
```markdown
 True---
 Truename: Bug 报告
 Trueabout: 报告可复现的缺陷
 Truetitle: "[BUG] "
 Truelabels: bug
 Truetemplates: bug_report.md
 Trueassignees: ""
 True---
 True
 True## 环境
 True- OS：例如 Windows 11, macOS 14, Ubuntu 22.04
 True- 版本：例如 v1.2.3
 True- 浏览器（如果适用）：例如 Chrome 100, Firefox 98
 True
 True## 复现步骤
 True1. 打开应用
 True2. 点击 X 按钮
 True3. 输入 Y
 True4. 观察结果
 True
 True## 期望行为
 True描述你期望看到的结果
 True
 True## 实际行为
 True描述实际发生的情况
 True
 True## 截图
 True如果适用，请添加截图来帮助解释问题
 True
 True## 额外信息
 True任何其他相关信息
 True```

 False##### 2.2.3.2 功能请求模板
 False
```markdown
 True---
 Truename: 功能请求
 Trueabout: 建议新功能
 Truetitle: "[FEATURE] "
 Truelabels: enhancement
 Truetemplates: feature_request.md
 Trueassignees: ""
 True---
 True
 True## 功能描述
 True简要描述你希望添加的功能
 True
 True## 问题背景
 True解释为什么需要这个功能，它解决了什么问题
 True
 True## 实现建议
 True描述你希望如何实现这个功能
 True
 True## 额外信息
 True任何其他相关信息
 True```

 False### 2.3 模板配置文件
 False
 False使用 `config.yml` 文件可以自定义 Issue 模板选择界面：
 False
```yaml
 Trueblank_issues_enabled: false
 Truecontact_links:
 True - name: 社区支持
 True url: https://github.com/org/repo/discussions
 True about: 对于一般问题，请使用讨论区
 True - name: 文档
 True url: https://docs.example.com
 True about: 查看官方文档
 True```

 False## 3. 标签管理
 False
 False### 3.1 标签类型
 False
 False常见的标签类型包括：
 False
 False- **类型标签**：`bug`、`enhancement`、`documentation`、`question`
 False- **优先级标签**：`high-priority`、`medium-priority`、`low-priority`
 False- **状态标签**：`needs-triage`、`in-progress`、`review-needed`、`fixed`
 False- **难度标签**：`good-first-issue`、`help-wanted`、`difficult`
 False- **模块标签**：`frontend`、`backend`、`database`、`api`
 False
 False### 3.2 标签最佳实践
 False
 False- **命名规范**：使用小写字母，单词之间用连字符连接
 False- **颜色一致性**：为同类标签使用相似的颜色
 False- **描述清晰**：为每个标签添加描述，说明其用途
 False- **数量控制**：保持标签数量合理，避免过多标签
 False- **团队统一**：在组织内统一标签命名和使用规范
 False
 False### 3.3 标签管理工具
 False
 False- **GitHub 网页界面**：在仓库的 Issues 页面管理标签
 False- **GitHub CLI**：使用 `gh label` 命令管理标签
 False- **GitHub Actions**：使用自动化工具自动管理标签
 False
 False## 4. 里程碑管理
 False
 False### 4.1 里程碑创建
 False
 False1. 访问仓库的 Issues 页面
 False2. 点击 **Milestones** 选项卡
 False3. 点击 **New milestone** 按钮
 False4. 填写里程碑名称、描述和截止日期
 False5. 点击 **Create milestone** 按钮
 False
 False### 4.2 里程碑使用
 False
 False- **关联 Issue**：在创建或编辑 Issue 时，选择相应的里程碑
 False- **关联 PR**：在创建或编辑 PR 时，选择相应的里程碑
 False- **跟踪进度**：里程碑页面会显示完成百分比
 False- **管理截止日期**：定期更新里程碑的截止日期
 False
 False### 4.3 里程碑最佳实践
 False
 False- **命名规范**：使用版本号（如 `v1.0.0`）或迭代名称（如 `Sprint 1`）
 False- **合理范围**：每个里程碑包含适量的 Issue，避免过多或过少
 False- **明确目标**：为每个里程碑设置明确的目标和交付物
 False- **定期检查**：定期检查里程碑进度，及时调整计划
 False
 False## 5. 自动化工具
 False
 False### 5.1 GitHub Actions 自动化
 False
 False#### 5.1.1 自动打标签
 False
```yaml
 Truename: Label issues and PRs
 Trueon:
 True issues:
 True types: [opened, edited]
 True pull_request:
 True types: [opened, edited]
 Truejobs:
 True label:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/labeler@v5
 True with:
 True repo-token: "${{ secrets.GITHUB_TOKEN }}"
 True```

 False#### 5.1.2 自动分配 Issue
 False
```yaml
 Truename: Auto assign issues
 Trueon:
 True issues:
 True types: [opened]
 Truejobs:
 True assign:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/assign@v1
 True with:
 True repo-token: "${{ secrets.GITHUB_TOKEN }}"
 True assignees: "username1, username2"
 True```

 False### 5.2 第三方工具
 False
 False- **Dependabot**：自动检测和更新依赖
 False- **CodeQL**：自动代码质量检查
 False- **Probot**：可自定义的 GitHub 机器人
 False- **ZenHub**：增强的项目管理功能
 False
 False## 6. 项目板与 Issues 集成
 False
 False### 6.1 项目板创建
 False
 False1. 访问仓库的 Projects 页面
 False2. 点击 **New project** 按钮
 False3. 选择模板或创建空白项目
 False4. 配置项目板列（如 To Do, In Progress, Review, Done）
 False
 False### 6.2 工作流程
 False
 False- **添加 Issue**：将 Issue 拖放到相应的列
 False- **设置状态**：通过移动卡片来更新 Issue 状态
 False- **跟踪进度**：查看项目板上的整体进度
 False- **团队协作**：团队成员可以实时看到项目状态
 False
 False## 7. 常见问题与解决方案
 False
 False### 7.1 Issue 模板问题
 False
 False#### 7.1.1 模板不显示
 False
 False- **问题**：创建 Issue 时看不到模板选项
 False- **解决方案**：
 False 1. 检查模板文件路径是否正确（`.github/ISSUE_TEMPLATE/`）
 False 2. 检查模板文件的 YAML 前置元数据是否正确
 False 3. 确认仓库的 Issues 功能是否已启用
 False 4. 尝试使用 GitHub 网页向导重新设置模板
 False
 False#### 7.1.2 模板内容不完整
 False
 False- **问题**：模板缺少必要的字段
 False- **解决方案**：
 False 1. 检查模板文件内容是否完整
 False 2. 根据项目需求添加或修改字段
 False 3. 测试模板是否能正常使用
 False
 False### 7.2 标签与里程碑问题
 False
 False#### 7.2.1 标签过多
 False
 False- **问题**：仓库中标签数量过多，难以管理
 False- **解决方案**：
 False 1. 清理冗余或不常用的标签
 False 2. 合并相似的标签
 False 3. 建立标签使用规范
 False
 False#### 7.2.2 里程碑进度不准确
 False
 False- **问题**：里程碑的完成百分比与实际情况不符
 False- **解决方案**：
 False 1. 确保所有相关 Issue 都已关联到里程碑
 False 2. 及时更新 Issue 状态
 False 3. 定期检查里程碑进度
 False
 False### 7.3 自动化问题
 False
 False#### 7.3.1 GitHub Actions 失败
 False
 False- **问题**：自动打标签或分配 Issue 的 Actions 失败
 False- **解决方案**：
 False 1. 检查 Actions 日志，了解失败原因
 False 2. 确认 GITHUB_TOKEN 权限是否正确
 False 3. 检查 workflow 文件语法是否正确
 False
 False#### 7.3.2 自动关闭 Issue 不生效
 False
 False- **问题**：使用关键词后 Issue 没有自动关闭
 False- **解决方案**：
 False 1. 确认关键词格式是否正确
 False 2. 确认 PR 是否合并到默认分支
 False 3. 对于 fork 仓库，确认是否使用了正确的跨仓库引用格式
 False
 False## 8. 最佳实践
 False
 False### 8.1 Issue 管理
 False
 False- **搜索先于创建**：创建新 Issue 前，先搜索是否已有相关 Issue
 False- **清晰描述**：提供详细、准确的 Issue 描述
 False- **及时更新**：定期更新 Issue 状态和进展
 False- **合理分类**：使用标签和里程碑对 Issue 进行分类
 False- **关闭策略**：定期清理已解决或过时的 Issue
 False
 False### 8.2 团队协作
 False
 False- **CONTRIBUTING.md**：提供贡献指南，说明如何报告 Issue
 False- **模板标准化**：使用统一的 Issue 模板
 False- **标签规范**：建立团队统一的标签使用规范
 False- **里程碑规划**：合理规划里程碑，避免过度承诺
 False- **定期回顾**：定期回顾 Issue 处理情况，改进流程
 False
 False### 8.3 安全与隐私
 False
 False- **安全漏洞**：使用 Security advisories 而非公开 Issue
 False- **敏感信息**：避免在 Issue 中包含敏感信息
 False- **隐私保护**：尊重用户隐私，不公开用户信息
 False- **访问控制**：合理设置仓库访问权限
 False
 False## 9. 实际应用案例
 False
 False### 9.1 开源项目案例
 False
 False#### 9.1.1 案例描述
 False
 False- **项目**：一个流行的开源库
 False- **规模**： hundreds of contributors
 False- **Issue 管理**：使用多种模板和标签
 False
 False#### 9.1.2 实践
 False
 False1. **模板**：使用 bug 报告、功能请求、文档更新等模板
 False2. **标签**：使用类型、优先级、状态等标签
 False3. **里程碑**：按版本号设置里程碑
 False4. **自动化**：使用 GitHub Actions 自动打标签和分配 Issue
 False5. **项目板**：使用项目板跟踪开发进度
 False
 False### 9.2 企业项目案例
 False
 False#### 9.2.1 案例描述
 False
 False- **项目**：企业内部应用
 False- **团队**：10 人开发团队
 False- **流程**：敏捷开发
 False
 False#### 9.2.2 实践
 False
 False1. **模板**：定制化的 Issue 模板，包含项目特定字段
 False2. **标签**：与企业流程对应的标签
 False3. **里程碑**：按 sprint 设置里程碑
 False4. **自动化**：集成企业内部工具
 False5. **项目板**：与敏捷流程对应，包含 To Do, In Progress, Review, Done 等列
 False
 False## 10. 延伸阅读
 False
 False- [Configuring issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests) <!-- nofollow -->
 False- [Managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) <!-- nofollow -->
 False- [Managing milestones](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones) <!-- nofollow -->
 False- [About project boards](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/about-project-boards) <!-- nofollow -->
 False- [GitHub Actions documentation](https://docs.github.com/en/actions) <!-- nofollow -->
 False
 False## 更新日志
 False
 False- **2026-04-05**：初版。
 False- **2026-05-03**：扩展内容，添加 Issue 模板的详细配置和类型、标签的最佳实践和管理、里程碑的创建和使用、自动化工具和工作流、项目板集成、实际应用案例、更多最佳实践和常见问题的解决方案。
 False