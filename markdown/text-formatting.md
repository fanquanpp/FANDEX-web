# Markdown 基础文本格式
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Markdown Basics
 False> @Description: Markdown 基础文本格式：斜体、粗体、删除线等。 | Markdown text formatting: italic, bold, strikethrough.
 False> @Updated: 2026-04-05
 False
 False---
 False
 False## 目录
 False
 False1. [引言](#引言)
 False
 False---
 False
 False## 1. 引言
 False
 False基础文本格式是 Markdown 中用于强调和格式化文本的基本元素，包括斜体、粗体、删除线等。
 False
 False## 2 目录
 False
 False- [1. 斜体](#1-斜体)
 False- [2. 粗体](#2-粗体)
 False- [3. 粗斜体](#3-粗斜体)
 False- [4. 删除线](#4-删除线)
 False- [5. 下划线](#5-下划线)
 False- [6. 行内代码](#6-行内代码)
 False- [7. 常见问题与解决方案](#7-常见问题与解决方案)
 False- [8. 总结与最佳实践](#8-总结与最佳实践)
 False
 False## 3 . 斜体
 False
 False### 3.1 语法
 False
 False使用 `*` 或 `_` 包裹文本，实现斜体效果。
 False
```markdown
 True*斜体文本*
 True_斜体文本_
 True```

 False### 3.2 渲染效果
 False
 False*斜体文本*
 False*斜体文本*
 False
 False## 4 . 粗体
 False
 False### 4.1 语法
 False
 False使用 `**` 或 `__` 包裹文本，实现粗体效果。
 False
```markdown
 True**粗体文本**
 True__粗体文本__
 True```

 False### 4.2 渲染效果
 False
 False**粗体文本**
 False**粗体文本**
 False
 False## 5 . 粗斜体
 False
 False### 5.1 语法
 False
 False使用 `***` 或 `___` 包裹文本，实现粗斜体效果。
 False
```markdown
 True***粗斜体文本***
 True___粗斜体文本___
 True```

 False### 5.2 渲染效果
 False
 False***粗斜体文本***
 False***粗斜体文本***
 False
 False## 6 . 删除线
 False
 False### 6.1 语法
 False
 False使用 `~~` 包裹文本，实现删除线效果（GFM 扩展语法）。
 False
```markdown
 True~~删除线文本~~
 True```

 False### 6.2 渲染效果
 False
 False~~删除线文本~~
 False
 False## 7 . 下划线
 False
 False### 7.1 语法
 False
 FalseMarkdown 本身不支持下划线语法，但可以使用 HTML 的 `<u>` 标签实现。
 False
```markdown
 True<u>下划线文本</u>
 True```

 False### 7.2 渲染效果
 False
 False<u>下划线文本</u>
 False
 False## 8 . 上标与下标
 False
 False### 8.1 语法
 False
 FalseMarkdown 本身不支持上标和下标语法，但可以使用 HTML 标签实现：
 False
 False- 上标：使用 `<sup>` 标签
 False- 下标：使用 `<sub>` 标签
 False
```markdown
 True2<sup>2</sup> = 4
 TrueH<sub>2</sub>O
 True```

 False### 8.2 渲染效果
 False
 False2<sup>2</sup> = 4
 FalseH<sub>2</sub>O
 False
 False## 9 . 高亮文本
 False
 False### 9.1 语法
 False
 False高亮文本是 GitHub Flavored Markdown (GFM) 的扩展语法，使用 `==` 包裹文本：
 False
```markdown
 True==高亮文本==
 True```

 False### 9.2 渲染效果
 False
 False==高亮文本==
 False
 False## 10 . 脚注
 False
 False### 10.1 语法
 False
 False脚注用于为文本添加注释或参考信息：
 False
```markdown
 True这是一个带有脚注的文本[^1]。
 True
 True[^1]: 这是脚注的内容。
 True```

 False### 10.2 渲染效果
 False
 False这是一个带有脚注的文本[^1]。
 False
 False[^1]: 这是脚注的内容。
 False
 False## 9 . 行内代码
 False
 False### 9.1 语法
 False
 False使用 `` ` `` 包裹文本，实现行内代码效果。
 False
```markdown
 True`行内代码`
 True```

 False### 9.2 渲染效果
 False
 False`行内代码`
 False
 False## 10 . 常见问题与解决方案
 False
 False### 10.1 格式不生效
 False
 False**问题描述**：文本格式不生效，显示为普通文本。
 False
 False**原因分析**：标记符使用不正确或缺少标记符。
 False
 False**解决方案**：确保使用正确的标记符包裹文本，如 `*斜体*`、`**粗体**` 等。
 False
 False### 10.2 标记符冲突
 False
 False**问题描述**：当文本中包含 `*` 或 `_` 等特殊字符时，可能与格式标记符冲突。
 False
 False**解决方案**：使用反斜杠 `\` 转义特殊字符，如 `\*`、`\_`。
 False
 False### 10.3 嵌套格式
 False
 False**问题描述**：嵌套使用格式标记符时，可能导致格式混乱。
 False
 False**解决方案**：确保嵌套的标记符正确匹配，如 `***粗斜体***`。
 False
 False## 11 . 总结与最佳实践
 False
 False### 11.1 核心概念
 False
 False- **斜体**：使用 `*` 或 `_` 包裹文本
 False- **粗体**：使用 `**` 或 `__` 包裹文本
 False- **粗斜体**：使用 `***` 或 `___` 包裹文本
 False- **删除线**：使用 `~~` 包裹文本
 False- **下划线**：使用 HTML 的 `<u>` 标签
 False- **上标**：使用 HTML 的 `<sup>` 标签
 False- **下标**：使用 HTML 的 `<sub>` 标签
 False- **高亮文本**：使用 `==` 包裹文本（GFM 扩展）
 False- **脚注**：使用 `[^1]` 标记
 False- **行内代码**：使用 `` ` `` 包裹文本
 False
 False### 11.2 最佳实践
 False
 False1. **格式使用**
 False - 斜体：用于强调或突出显示
 False - 粗体：用于重点内容或标题
 False - 粗斜体：用于特别重要的内容
 False - 删除线：用于表示已删除或过时的内容
 False - 上标/下标：用于数学公式或化学符号
 False - 高亮文本：用于特别需要注意的内容
 False - 脚注：用于添加补充说明
 False - 行内代码：用于代码片段、命令或变量名
 False
 False2. **标记符选择**
 False - 统一使用一种标记符风格，如统一使用 `*` 而不是混合使用 `*` 和 `_`
 False - 保持标记符与文本之间没有空格，如 `*斜体*` 而不是 `* 斜体 *`
 False - 对于扩展语法，确保使用支持该语法的 Markdown 处理器
 False
 False3. **使用场景**
 False - 技术文档：使用行内代码标记代码片段，使用脚注添加技术说明
 False - 教程：使用粗体强调重点内容，使用高亮标记关键步骤
 False - 文档更新：使用删除线标记已修改的内容
 False - 学术文档：使用上标/下标表示引用或公式
 False
 False### 11.3 个人实践总结
 False
 False- 合理使用文本格式，增强文档的可读性
 False- 保持格式使用的一致性
 False- 注意标记符的正确使用，确保格式生效
 False- 在需要时使用转义字符处理特殊情况
 False- 根据文档类型和目标受众选择合适的文本格式
 False