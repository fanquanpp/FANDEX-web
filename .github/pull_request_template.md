<!--
  FANDEX-web Pull Request 模板
  请按以下结构完整填写，未涉及的部分可删除对应章节。
  提交前请确保已通过本地 `npm run type-check`、`npm run test`、`npm run format:check`。
-->

## 变更类型

<!-- 勾选本次 PR 的变更类型，可多选 -->

- [ ] feat — 新功能 / 新文档模块
- [ ] fix — 错误修复
- [ ] docs — 仅文档变更
- [ ] style — 代码风格调整（不影响功能）
- [ ] refactor — 重构（不新增功能、不修复错误）
- [ ] perf — 性能优化
- [ ] test — 测试相关变更
- [ ] build — 构建系统或依赖变更
- [ ] ci — CI 配置变更
- [ ] chore — 杂项（不修改源码或测试）
- [ ] revert — 回滚此前提交

## 变更说明

<!-- 简要描述本次变更的内容、目的与动机。如果是新功能，说明使用场景；如果是修复，说明问题现象。 -->

## 关联 Issue

<!-- 列出本次 PR 关联的 Issue 编号，使用 `Closes #123` / `Fixes #123` / `Ref #123` 语法 -->

- Closes #
- Ref #

## 测试清单

### 自学保障检查（文档类 PR 必填）

- [ ] 代码块都已标注语言类型（如 `sql`、`bash`、`python`）
- [ ] 每个非简单代码块都附带预期输出注释
- [ ] 至少包含一个常见错误的示例与解决方法
- [ ] 包含至少 1 个自测题或嵌入式自检点，并提供答案
- [ ] 中英文之间有半角空格，文档未使用 emoji
- [ ] 标题层级连续（无跳级），正文无 H4
- [ ] 文档末尾包含"下一步"相关教程链接
- [ ] frontmatter 字段完整（title / description / category / module / difficulty / prerequisites / tags）

### 代码质量检查（代码类 PR 必填）

- [ ] 已通过 `npm run format:check`（Prettier 格式）
- [ ] 已通过 `npm run type-check`（astro check 类型检查）
- [ ] 已通过 `npm run test`（Vitest 单元测试）
- [ ] 已通过 `npm run lint:docs`（remark 文档规范，文档类 PR）
- [ ] 遵循三层架构（UI / Service / Data），业务逻辑未散落到 UI 或 Data 层
- [ ] TypeScript 代码未使用 `any` / `unknown` 类型
- [ ] 所有异步函数已通过 `try-catch` 包裹异常处理
- [ ] 未硬编码 Token、密钥等敏感信息
- [ ] 新增函数已补充完整中文注释（输入参数 / 返回值 / 执行流程）
- [ ] 未引入未被引用的冗余变量、函数或文件

### Changeset 检查（影响发布版本的 PR 必填）

- [ ] 已通过 `npm run changeset` 添加 `.changeset/*.md` 声明文件
- [ ] 变更级别正确（patch / minor / major）
- [ ] 变更摘要使用简体中文，一句话描述

## 截图

<!-- 如涉及 UI 变更，请附上变更前后的对比截图。无 UI 变更可删除此节 -->

### 变更前

（粘贴截图）

### 变更后

（粘贴截图）

## 影响范围

<!-- 简要说明本次变更影响的模块、页面或功能，便于审查者评估回归风险 -->

- 影响模块：
- 影响页面：
- 破坏性变更：无 / 有（请说明）

## 部署注意事项

<!-- 如有特殊的部署步骤、环境变量、依赖升级或数据迁移，请在此说明。无则删除此节 -->
