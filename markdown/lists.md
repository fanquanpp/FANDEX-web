# Markdown 列表语法 (Markdown List Syntax)
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Markdown Basics
 False> @Description: Markdown 列表语法：无序列表、有序列表、任务列表及嵌套列表。 | Markdown list syntax: unordered, ordered, task lists, and nested lists.
 False> @Updated: 2026-04-06
 False
 False---
 False
 False## 目录
 False
 False1. [无序列表](#无序列表)
 False2. [有序列表](#有序列表)
 False3. [任务列表](#任务列表)
 False4. [嵌套列表](#嵌套列表)
 False5. [列表与其他元素的结合](#列表与其他元素的结合)
 False6. [不同 Markdown 解析器的兼容性](#不同-markdown-解析器的兼容性)
 False7. [常见问题与解决方案](#常见问题与解决方案)
 False8. [总结与最佳实践](#总结与最佳实践)
 False
 False---
 False
 False## 1. 无序列表 (Unordered Lists)
 False
 False### 1.1 语法
 False
 False使用 `-`、`*` 或 `+` 加空格开头，三者效果完全一致，推荐统一使用 `-` 以保持一致性。
 False
```markdown
 True- 无序列表项 1
 True- 无序列表项 2
 True- 无序列表项 3
 True```

 False### 1.2 渲染效果
 False
 False- 无序列表项 1
 False- 无序列表项 2
 False- 无序列表项 3
 False
 False### 1.3 高级用法
 False
 False#### 1.3.1 列表项换行
 False
 False如果列表项内容较长，需要换行时，第二行及以后的内容需要与第一行文本对齐，而不是与标记符对齐：
 False
```markdown
 True- 这是一个很长的列表项，
 True 换行后需要与第一行文本对齐，
 True 而不是与标记符对齐
 True- 另一个列表项
 True```

 False渲染效果：
 False
 False- 这是一个很长的列表项，
 False 换行后需要与第一行文本对齐，
 False 而不是与标记符对齐
 False- 另一个列表项
 False
 False#### 1.3.2 列表项中的空行
 False
 False列表项之间可以添加空行，提高可读性：
 False
```markdown
 True- 列表项 1
 True
 True- 列表项 2
 True
 True- 列表项 3
 True```

 False渲染效果：
 False
 False- 列表项 1
 False
 False- 列表项 2
 False
 False- 列表项 3
 False
 False## 2. 有序列表 (Ordered Lists)
 False
 False### 2.1 语法
 False
 False使用 `数字 + 英文句号 + 空格` 开头，数字顺序不影响最终渲染结果，推荐按顺序书写以保持代码的可读性。
 False
```markdown
 True1. 有序列表项 1
 True2. 有序列表项 2
 True3. 有序列表项 3
 True```

 False### 2.2 渲染效果
 False
 False1. 有序列表项 1
 False2. 有序列表项 2
 False3. 有序列表项 3
 False
 False### 2.3 高级用法
 False
 False#### 2.3.1 序号自动调整
 False
 False即使使用非连续的数字，渲染时也会自动调整为连续序号：
 False
```markdown
 True1. 第一项
 True3. 第二项（使用了数字 3）
 True2. 第三项（使用了数字 2）
 True```

 False渲染效果：
 False
 False1. 第一项
 False2. 第二项（使用了数字 3）
 False3. 第三项（使用了数字 2）
 False
 False#### 2.3.2 多级有序列表
 False
 False多级有序列表的序号会自动递增：
 False
```markdown
 True1. 一级列表项
 True 1. 二级列表项
 True 1. 三级列表项
 True 2. 另一个二级列表项
 True2. 另一个一级列表项
 True```

 False渲染效果：
 False
 False1. 一级列表项
 False 1. 二级列表项
 False 1. 三级列表项
 False 2. 另一个二级列表项
 False2. 另一个一级列表项
 False
 False## 3. 任务列表 (Task Lists)
 False
 False### 3.1 语法
 False
 False待办清单专用语法（GFM 扩展），`[ ]` 表示未完成，`[x]` 表示已完成，符号后必须加空格。
 False
```markdown
 True- [ ] 未完成的待办任务
 True- [x] 已完成的待办任务
 True- [ ] 可嵌套待办
 True - [x] 子任务 1
 True - [ ] 子任务 2
 True```

 False### 3.2 渲染效果
 False
 False- [ ] 未完成的待办任务
 False- [x] 已完成的待办任务
 False- [ ] 可嵌套待办
 False - [x] 子任务 1
 False - [ ] 子任务 2
 False
 False### 3.3 高级用法
 False
 False#### 3.3.1 任务列表与描述
 False
 False可以在任务列表项后添加描述文本：
 False
```markdown
 True- [ ] 完成项目提案
 True 详细描述：需要包含项目背景、目标、计划和预算
 True- [x] 召开团队会议
 True 详细描述：讨论项目进度和下一步计划
 True```

 False渲染效果：
 False
 False- [ ] 完成项目提案
 False 详细描述：需要包含项目背景、目标、计划和预算
 False- [x] 召开团队会议
 False 详细描述：讨论项目进度和下一步计划
 False
 False## 4. 嵌套列表 (Nested Lists)
 False
 False### 4.1 语法
 False
 False嵌套列表需要使用**4 个空格或 1 个制表符**进行缩进。
 False
 False#### 4.1.1 无序列表嵌套
 False
```markdown
 True- 一级无序列表项
 True - 二级无序列表项
 True - 三级无序列表项
 True- 另一个一级无序列表项
 True```

 False#### 4.1.2 有序列表嵌套
 False
```markdown
 True1. 一级有序列表项
 True 1. 二级有序列表项
 True 1. 三级有序列表项
 True2. 另一个一级有序列表项
 True```

 False#### 4.1.3 混合嵌套
 False
```markdown
 True- 无序列表项
 True 1. 有序列表项
 True - 无序列表项
 True 1. 有序列表项
 True```

 False### 4.2 渲染效果
 False
 False- 一级无序列表项
 False - 二级无序列表项
 False - 三级无序列表项
 False- 另一个一级无序列表项
 False
 False1. 一级有序列表项
 False 1. 二级有序列表项
 False 1. 三级有序列表项
 False2. 另一个一级有序列表项
 False
 False- 无序列表项
 False 1. 有序列表项
 False - 无序列表项
 False 1. 有序列表项
 False
 False### 4.3 嵌套列表的最佳实践
 False
 False- **控制嵌套层级**：一般不超过 3 层，过深的嵌套会降低可读性
 False- **保持缩进一致**：使用统一的缩进方式（4 个空格或 1 个制表符）
 False- **添加空行**：在不同层级的列表之间添加空行，提高可读性
 False- **使用不同类型**：根据内容需要选择合适的列表类型进行嵌套
 False
 False## 5. 列表与其他元素的结合
 False
 False### 5.1 列表中使用代码块
 False
```markdown
 True- 列表项 1
 True ```python
 print("Hello, World!")
 ```
 True
 True- 列表项 2
 True
 True ```javascript
 console.log("Hello, World!");
 ```
 True
 True```

 False渲染效果：
 False
 False- 列表项 1
 ```python
 True print("Hello, World!")
 True ```

 False- 列表项 2
 False
 ```javascript
 True console.log("Hello, World!");
 True ```

 False### 5.2 列表中使用引用
 False
```markdown
 True- 列表项 1
 True > 这是一个引用
 True > 可以跨越多行
 True- 列表项 2
 True > 另一个引用
 True```

 False渲染效果：
 False
 False- 列表项 1
 False > 这是一个引用
 False > 可以跨越多行
 False- 列表项 2
 False > 另一个引用
 False
 False### 5.3 列表中使用图片和链接
 False
```markdown
 True- 列表项 1：[Markdown 指南](https://www.markdownguide.org)
 True- 列表项 2：![示例图片](https://via.placeholder.com/100)
 True```

 False渲染效果：
 False
 False- 列表项 1：[Markdown 指南](https://www.markdownguide.org)
 False- 列表项 2：![示例图片](https://via.placeholder.com/100)
 False
 False## 6. 不同 Markdown 解析器的兼容性
 False
 False不同的 Markdown 解析器对列表语法的支持可能略有差异：
 False
 False| 解析器 | 无序列表 | 有序列表 | 任务列表 | 嵌套列表 |
 False|--------|----------|----------|----------|----------|
 False| GitHub Flavored Markdown | 支持 | 支持 | 支持 | 支持 |
 False| CommonMark | 支持 | 支持 | 不支持 | 支持 |
 False| Markdown.pl | 支持 | 支持 | 不支持 | 支持 |
 False| MultiMarkdown | 支持 | 支持 | 不支持 | 支持 |
 False
 False**注意**：任务列表是 GitHub Flavored Markdown (GFM) 的扩展特性，在其他解析器中可能不被支持。
 False
 False## 7. 常见问题与解决方案
 False
 False### 7.1 列表项不显示
 False
 False**问题描述**：列表项不显示为列表，显示为普通文本。
 False
 False**原因分析**：标记符后缺少空格。
 False
 False**解决方案**：在标记符后添加一个空格，如 `- 列表项`、`1. 列表项`。
 False
 False### 7.2 嵌套列表显示异常
 False
 False**问题描述**：嵌套列表显示为一级列表，没有正确缩进。
 False
 False**原因分析**：嵌套列表的缩进不正确。
 False
 False**解决方案**：使用 4 个空格或 1 个制表符进行缩进。
 False
 False### 7.3 任务列表不生效
 False
 False**问题描述**：任务列表显示为普通无序列表，没有复选框。
 False
 False**原因分析**：使用了不支持 GFM 扩展的 Markdown 解析器。
 False
 False**解决方案**：使用支持 GFM 扩展的 Markdown 解析器，如 GitHub、VSCode 等。
 False
 False### 7.4 列表项换行后对齐问题
 False
 False**问题描述**：列表项换行后文本没有正确对齐。
 False
 False**原因分析**：换行后的文本没有与第一行文本对齐。
 False
 False**解决方案**：确保换行后的文本与第一行文本的起始位置对齐，而不是与列表标记符对齐。
 False
 False## 8. 总结与最佳实践
 False
 False### 8.1 核心概念
 False
 False- **无序列表**：使用 `-`、`*` 或 `+` 加空格开头
 False- **有序列表**：使用 `数字 + 英文句号 + 空格` 开头
 False- **任务列表**：使用 `[ ]` 或 `[x]` 加空格开头（GFM 扩展）
 False- **嵌套列表**：使用 4 个空格或 1 个制表符进行缩进
 False
 False### 8.2 最佳实践
 False
 False1. **列表使用**
 False - 无序列表：用于不需要特定顺序的项目
 False - 有序列表：用于需要特定顺序的项目
 False - 任务列表：用于待办事项或任务跟踪
 False
 False2. **格式规范**
 False - 统一使用一种无序列表标记符，推荐使用 `-`
 False - 保持列表项的缩进一致
 False - 列表项之间可以添加空行，提高可读性
 False - 长列表项换行时，确保文本对齐
 False
 False3. **嵌套列表**
 False - 避免过深的嵌套，一般不超过 3 层
 False - 确保缩进正确，使用 4 个空格或 1 个制表符
 False - 在不同层级之间添加空行，提高可读性
 False
 False4. **兼容性考虑**
 False - 任务列表仅在支持 GFM 的解析器中生效
 False - 避免使用过于复杂的嵌套结构，以确保在不同解析器中都能正确显示
 False
 False5. **与其他元素结合**
 False - 合理使用列表与代码块、引用、图片和链接的结合
 False - 确保这些元素的缩进正确，以保持列表结构的完整性
 False
 False### 8.3 个人实践总结
 False
 False- 选择合适的列表类型，根据内容的性质和顺序要求
 False- 保持列表格式的一致性和缩进的正确性
 False- 合理使用嵌套列表，提高内容的层次感
 False- 注意标记符后必须加空格，确保列表语法生效
 False- 考虑不同 Markdown 解析器的兼容性，尤其是任务列表等扩展特性
 False- 结合其他 Markdown 元素时，注意保持正确的缩进和格式
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-06: 初版，涵盖无序列表、有序列表、任务列表、嵌套列表及最佳实践
 False- 2026-05-03: 更新至 v3.5.0 格式，移除 HTML 锚点和 emoji，统一标题层级
 False