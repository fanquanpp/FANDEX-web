# Markdown-专有名词注释查阅表 | Markdown
 False
 False> @Author: fanquanpp
 False> @Category: Markdown Basics
 False> @Description: Markdown-专有名词注释查阅表 | Markdown
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [基础概念类](#基础概念类)
 False2. [基础语法类](#基础语法类)
 False3. [列表语法类](#列表语法类)
 False4. [代码语法类](#代码语法类)
 False5. [链接与图片类](#链接与图片类)
 False6. [表格语法类](#表格语法类)
 False7. [GFM 扩展类](#gfm-扩展类)
 False8. [高级语法类](#高级语法类)
 False9. [工具与生态类](#工具与生态类)
 False10. [最佳实践类](#最佳实践类)
 False
 False---
 False
 False## 1. 基础概念类
 False
 False### 1.1 Markdown
 False
 False**名称**：Markdown 标记语言（Markdown）
 False
 False**首次出现位置**：C09_101-Markdown概述.md 第1章
 False
 False**定义**：
 FalseMarkdown 是 John Gruber 于 2004 年创建的轻量级标记语言，使用简洁的语法编写格式化文本，可转换为 HTML 或其他格式。
 False
 False**详解**：
 False设计哲学：可读性优先，标记语言应如同普通文本般易读。应用场景：README 文档、博客文章、论坛帖子、笔记软件、在线文档。优势：纯文本编写、无需专有软件、容易学习、广泛支持。变体：CommonMark（标准化）、GitHub Flavored Markdown（GFM）、MultiMarkdown、Pandoc Markdown。工具支持：VS Code、Typora、Markdown Here、作业部落、有道云笔记。
 False
 False---
 False
 False### 1.2 John Gruber（约翰·格鲁伯）
 False
 False**名称**：约翰·格鲁伯（John Gruber）
 False
 False**首次出现位置**：C09_101-Markdown概述.md 第1章
 False
 False**定义**：
 FalseJohn Gruber 是美国程序员和作家，Markdown 的创始人，与 Aaron Swartz 共同创建了该语言。
 False
 False**详解**：
 False2004 年与 Aaron Swartz 共同设计 Markdown。博客：Daring Fireball（苹果相关科技博客）。语法设计原则：Markdown 标记应尽可能类似其表示的格式。
 False
 False---
 False
 False### 1.3 轻量级标记语言
 False
 False**名称**：轻量级标记语言（Lightweight Markup Language）
 False
 False**首次出现位置**：C09_101-Markdown概述.md 第1章
 False
 False**定义**：
 False轻量级标记语言使用简单直观的语法，比 XML/HTML 等传统标记语言更易于人类读写。
 False
 False**详解**：
 False特点：语法简洁、学习曲线平缓、转换灵活。常见语言：Markdown、reStructuredText、AsciiDoc、Textile。对比 HTML：HTML 标签冗长，Markdown 简洁优雅。转换：Markdown 可转换为 HTML、PDF、DOCX、LaTeX 等格式。
 False
 False---
 False
 False### 1.4 纯文本
 False
 False**名称**：纯文本（Plain Text）
 False
 False**首次出现位置**：C09_101-Markdown概述.md 第1章
 False
 False**定义**：
 False纯文本是只包含标准字符集（字母、数字、标点、符号）的文本文件，不包含任何格式信息。
 False
 False**详解**：
 False文件格式：.txt、.md、.markdown。优势：通用性强、任何编辑器可打开、版本控制友好、跨平台兼容。Markdown 的纯文本可读性：即使不渲染，也能大致了解文档结构。
 False
 False---
 False
 False## 2. 基础语法类
 False
 False### 2.1 标题（Heading）
 False
 False**名称**：标题（Heading）
 False
 False**首次出现位置**：C09_102-标题语法.md 第1章
 False
 False**定义**：
 False标题用于创建文档的层级结构，Markdown 使用 # 符号表示不同级别的标题。
 False
 False**详解**：
 False语法：# 一级标题、## 二级标题、### 三级标题、#### 四级标题、##### 五级标题、###### 六级标题。推荐写法：标题前后留空行。ATX 风格：`# 标题` 行首 # 加空格。闭合标签：Setext 风格用下划线表示（已较少使用）。SEO 重要性：搜索引擎重视 H1-H6 标题层级。
 False
 False---
 False
 False### 2.2 段落（Paragraph）
 False
 False**名称**：段落（Paragraph）
 False
 False**首次出现位置**：C09_103-段落与换行.md 第1章
 False
 False**定义**：
 False段落是文本的基本组成单位，Markdown 中以空行分隔的连续文本被视为一个段落。
 False
 False**详解**：
 False创建：连续文本以空行分隔即构成段落。换行：行末两个空格 + 换行，或使用 `<br>` 标签。缩进：Markdown 不支持段落首行缩进（可用 HTML `<p style="text-indent: 2em;">`）。多段落：段落间用空行分隔。
 False
 False---
 False
 False### 2.3 换行（Line Break）
 False
 False**名称**：换行（Line Break）
 False
 False**首次出现位置**：C09_103-段落与换行.md 第2章
 False
 False**定义**：
 FalseMarkdown 中的换行表示文本在同一段落内另起一行。
 False
 False**详解**：
 False方法一：行末加两个空格。方法二：使用 `<br>` HTML 标签。方法三：直接回车（部分解析器支持）。硬换行 vs 软换行：部分渲染器区分。支持情况：各 Markdown 处理器支持程度不同，建议使用两个空格。
 False
 False---
 False
 False### 2.4 强调（Emphasis）
 False
 False**名称**：强调（Emphasis）
 False
 False**首次出现位置**：C09_104-文本格式.md 第1章
 False
 False**定义**：
 FalseMarkdown 使用 * 或 _ 创建斜体，使用 ** 或 __ 创建粗体，使用 ~~ 创建删除线。
 False
 False**详解**：
 False斜体：`*italic*` 或 `_italic_`。粗体：`**bold**` 或 `__bold__`。粗斜体：`***bold italic***` 或 `___bold italic___`。删除线：GFM 支持，`~~strikethrough~~`。嵌套规则：可以混合使用，但需正确嵌套。转义：使用反斜杠 `\*` 显示星号。
 False
 False---
 False
 False### 2.5 引用（Blockquote）
 False
 False**名称**：引用块（Blockquote）
 False
 False**首次出现位置**：C09_104-文本格式.md 第2章
 False
 False**定义**：
 False引用块用于标注引用的文本，Markdown 使用 > 符号创建引用块。
 False
 False**详解**：
 False语法：`> 引用的文本`。多行：每行前加 > 或只在第一行加 >。嵌套引用：多层 `>>` 嵌套。包含其他元素：引用块内可包含其他 Markdown 元素（标题、列表、代码块）。样式：通常有左侧竖线和缩进。学术引用：常用于引用文献或他人言论。
 False
 False---
 False
 False### 2.6 水平线（Horizontal Rule）
 False
 False**名称**：水平线（Horizontal Rule）
 False
 False**首次出现位置**：C09_104-文本格式.md 第3章
 False
 False**定义**：
 False水平线用于分隔文档内容，Markdown 使用三个以上的 -、* 或 _ 创建水平线。
 False
 False**详解**：
 False语法：三个或更多 `-`、`*`、`_`，可加空格。示例：`---`、`***`、`___`。推荐：使用 `-` 作为标准。注意：与标题区分，`-` 后需接空格或文本。渲染：通常显示为细水平线。
 False
 False---
 False
 False## 3. 列表语法类
 False
 False### 3.1 无序列表（Unordered List）
 False
 False**名称**：无序列表（Unordered List）
 False
 False**首次出现位置**：C09_105-列表语法.md 第1章
 False
 False**定义**：
 False无序列表使用 -、* 或 + 创建项目符号列表。
 False
 False**详解**：
 False语法：`- 项目`、`* 项目`、`+ 项目`。推荐：建议统一使用一种符号。嵌套：使用四个空格或一个 Tab 创建子列表。列表内换行：行末两空格或使用 `<br>`。空行：列表前后可加空行增加可读性。
 False
 False---
 False
 False### 3.2 有序列表（Ordered List）
 False
 False**名称**：有序列表（Ordered List）
 False
 False**首次出现位置**：C09_105-列表语法.md 第1章
 False
 False**定义**：
 False有序列表使用数字加句点创建带顺序编号的列表。
 False
 False**详解**：
 False语法：`1. 第一项`、`2. 第二项`。编号：Markdown 会自动计算，即使写成 `1. 1. 1.` 也会正确渲染。起始编号：部分解析器支持指定起始数字。嵌套：与无序列表相同的嵌套规则。
 False
 False---
 False
 False### 3.3 任务列表（Task List）
 False
 False**名称**：任务列表（Task List / Todo List）
 False
 False**首次出现位置**：C09_105-列表语法.md 第2章
 False
 False**定义**：
 False任务列表（Todo List）是 GFM 扩展，支持创建可勾选的任务项。
 False
 False**详解**：
 False语法：`- [ ] 未完成`、`- [x] 已完成`。方括号内：空格或 x 表示状态。大小写：部分解析器大小写敏感。应用：项目规划、待办事项追踪。样式：渲染后通常显示为复选框。
 False
 False---
 False
 False### 3.4 嵌套列表
 False
 False**名称**：嵌套列表（Nested List）
 False
 False**首次出现位置**：C09_105-列表语法.md 第1章
 False
 False**定义**：
 False列表可以嵌套以创建层级结构，子列表比父列表缩进更深。
 False
 False**详解**：
 False缩进：四个空格或一个 Tab。混合嵌套：无序列表和有序列表可相互嵌套。列表内容：嵌套列表内可包含段落、代码块等。深度：可多级嵌套，但过深会影响可读性。
 False
 False---
 False
 False## 4. 代码语法类
 False
 False### 4.1 行内代码（Inline Code）
 False
 False**名称**：行内代码（Inline Code）
 False
 False**首次出现位置**：C09_107-代码块与语法高亮.md 第1章
 False
 False**定义**：
 False行内代码用于在段落中标记简短的代码或命令，使用反引号 ` 包裹。
 False
 False**详解**：
 False语法：`` `code` ``。转义：代码中包含反引号可用双反引号包裹。空白：行内代码首尾空格会被保留。应用：文件名、函数名、命令行、环境变量。
 False
 False---
 False
 False### 4.2 代码块（Code Block/Fenced Code Block）
 False
 False**名称**：代码块（Code Block）
 False
 False**首次出现位置**：C09_107-代码块与语法高亮.md 第2章
 False
 False**定义**：
 False代码块用于标记多行代码或文本，GFM 使用三个反引号创建围栏代码块。
 False
 False**详解**：
 False围栏代码块：```language 开始，``` 结束。缩进代码块：四个空格缩进的文本（已不推荐）。语言标识：```后指定语言如```javascript。语法高亮：支持语法高亮的渲染器会高亮代码。空白：围栏代码块内首行尾行可空行。
 False
 False---
 False
 False### 4.3 语法高亮（Syntax Highlighting）
 False
 False**名称**：语法高亮（Syntax Highlighting）
 False
 False**首次出现位置**：C09_107-代码块与语法高亮.md 第2章
 False
 False**定义**：
 False语法高亮是根据代码语言对代码块进行着色，提高可读性。
 False
 False**详解**：
 False实现：依赖 Prism.js、highlight.js 等库。常用语言：javascript、python、java、cpp、html、css、sql、bash。通用标识：使用 ` ```text ` 或 ` ```plain ` 无高亮。高亮主题：不同主题影响颜色方案。GFM 支持：GitHub 支持多种语言的语法高亮。
 False
 False---
 False
 False### 4.4 转义字符（Escape Character）
 False
 False**名称**：转义字符（Escape Character）
 False
 False**首次出现位置**：C09_107-代码块与语法高亮.md 第3章
 False
 False**定义**：
 False转义字符用于在 Markdown 中显示被语法占用的特殊字符。
 False
 False**详解**：
 False反斜杠：`\*` 显示 `*`。星号：显示星号不产生强调。数字序号：列表中 `1986\.` 不触发有序列表。方括号：链接中 `\[text\]` 不触发链接语法。反引号：``绕反引号包围的代码`。
 False
 False---
 False
 False## 5. 链接与图片类
 False
 False### 5.1 链接（Link）
 False
 False**名称**：链接（Link）
 False
 False**首次出现位置**：C09_106-链接与图片.md 第1章
 False
 False**定义**：
 FalseMarkdown 链接用于创建可点击的链接，链接目标可以是 URL、文件路径或锚点。
 False
 False**详解**：
 False行内链接：`[text](url)`。自动链接：`<url>` 自动转换为可点击链接。相对路径：`[text](./path/to/file)`。链接标题：悬停显示的提示文字 `[text](url "title")`。Email 链接：`<email@example.com>`。
 False
 False---
 False
 False### 5.2 图片（Image）
 False
 False**名称**：图片（Image）
 False
 False**首次出现位置**：C09_106-链接与图片.md 第2章
 False
 False**定义**：
 FalseMarkdown 图片语法与链接类似，但前方加 !，图片不会内联显示而是渲染为图片。
 False
 False**详解**：
 False语法：`![alt](url)`。Alt 文本：图片无法显示时的替代文本。标题：与链接相同的标题语法 `![alt](url "title")`。引用式：`![alt][ref]` + `[ref]: url`。本地图片：使用相对路径 `![img](./images/photo.jpg)`。
 False
 False---
 False
 False### 5.3 引用式链接
 False
 False**名称**：引用式链接（Reference-style Link）
 False
 False**首次出现位置**：C09_106-链接与图片.md 第1章
 False
 False**定义**：
 False引用式链接将 URL 定义在文档其他位置，链接处使用引用标记。
 False
 False**详解**：
 False定义：`[ref]: url "title"`。使用：`[text][ref]` 或 `[text][]`（隐式引用）。优势：URL 集中管理、文档更整洁、便于批量修改。放置位置：通常放在文档末尾或脚注区域。
 False
 False---
 False
 False### 5.4 锚点（Anchor）
 False
 False**名称**：锚点（Anchor）
 False
 False**首次出现位置**：C09_106-链接与图片.md 第3章
 False
 False**定义**：
 False锚点用于链接到页面内的特定位置，常用于长文档的目录导航。
 False
 False**详解**：
 False创建锚点：`## Title {#custom-id}`（部分解析器支持）。自动生成：多数解析器自动为标题生成 ID。链接到锚点：`[text](#section-name)` 或 `[text](#custom-id)`。特殊字符：空格用 - 替代、大小写通常转小写。跨页锚点：`[text](./other.md#section)`。
 False
 False---
 False
 False## 6. 表格语法类
 False
 False### 6.1 表格（Table）
 False
 False**名称**：表格（Table）
 False
 False**首次出现位置**：C09_108-表格.md 第1章
 False
 False**定义**：
 False表格是 GFM 扩展功能，使用管道符 | 和横杠 - 创建表格结构。
 False
 False**详解**：
 False语法：
 False
```
 True| Header | Header |
 True|--------|--------|
 True| Cell | Cell |
 True```

 False对齐：`|:---|` 左对齐、`|---:|` 右对齐、`|:---:|` 居中。列数匹配：每行列数必须一致。表头分隔：第二行决定列数和格式。
 False
 False---
 False
 False### 6.2 单元格
 False
 False**名称**：单元格（Cell）
 False
 False**首次出现位置**：C09_108-表格.md 第1章
 False
 False**定义**：
 False单元格是表格的基本单元，每行用 | 分隔的文本构成单元格。
 False
 False**详解**：
 False内容：对齐文本、链接、行内代码等。引用样式：`||` 可创建空单元格。转义：在单元格内显示 | 用 `\|`。合并单元格：Markdown 原生不支持，通常用 HTML 实现。
 False
 False---
 False
 False### 6.3 对齐
 False
 False**名称**：表格对齐（Alignment）
 False
 False**首次出现位置**：C09_108-表格.md 第2章
 False
 False**定义**：
 False表格支持左对齐、居中对齐、右对齐三种对齐方式。
 False
 False**详解**：
 False左对齐：`:---`。居中：`:---:`。右对齐：`---:`。默认：一般左对齐。分隔行：`|---|---|` 表示全左对齐。
 False
 False---
 False
 False## 7. GFM 扩展类
 False
 False### 7.1 GFM（GitHub Flavored Markdown）
 False
 False**名称**：GitHub 风格 Markdown（GitHub Flavored Markdown）
 False
 False**缩写**：GFM
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第1章
 False
 False**定义**：
 FalseGFM 是 GitHub 对标准 Markdown 的扩展，增加了任务列表、围栏代码块、表格、自动链接等特性。
 False
 False**详解**：
 False主要扩展：任务列表、围栏代码块、表格、删除线、自动链接、锚点 ID。规范文档：GitHub 官方 GFM 规范文档。兼容 Markdown：GFM 兼容标准 Markdown。广泛应用：GitHub、GitLab 等平台均支持。
 False
 False---
 False
 False### 7.2 自动链接（Autolink）
 False
 False**名称**：自动链接（Autolink）
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第1章
 False
 False**定义**：
 FalseGFM 自动将 URL 和邮箱地址转换为可点击链接，无需使用方括号语法。
 False
 False**详解**：
 FalseURL 自动链接：`<https://example.com>` 自动转换为链接。邮箱自动链接：`<email@example.com>` 自动转换为mailto链接。禁止自动链接：部分环境出于安全考虑禁用。优势：简化 URL 书写。
 False
 False---
 False
 False### 7.3 删除线（Strikethrough）
 False
 False**名称**：删除线（Strikethrough）
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第1章
 False
 False**定义**：
 False删除线是 GFM 扩展，使用 ~~ 包裹文本显示删除线效果。
 False
 False**详解**：
 False语法：`~~deleted text~~`。渲染效果：文字中间有横线。用途：表示已废弃内容、修正错误。Markdown 原生不支持：标准 Markdown 没有删除线语法。
 False
 False---
 False
 False## 8. 高级语法类
 False
 False### 8.1 脚注（Footnote）
 False
 False**名称**：脚注（Footnote）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第1章
 False
 False**定义**：
 False脚注用于在文档中添加注释或引用说明，在页面底部显示。
 False
 False**详解**：
 False语法：创建脚注 `[^1]`，在文档某处定义 `[^1]: footnote content`。Pandoc Markdown 风格。渲染效果：脚注通常显示在页面底部或右侧。部分解析器支持：需要扩展支持的渲染器。
 False
 False---
 False
 False### 8.2 定义列表
 False
 False**名称**：定义列表（Definition List）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第1章
 False
 False**定义**：
 False定义列表用于展示术语及其定义，常见于词典或术语表。
 False
 False**详解**：
 False语法：Pandoc Markdown 支持。术语独占一行，下一行以 : 开头接定义。适用场景：术语解释、词汇表。渲染效果：术语加粗，定义缩进。
 False
 False---
 False
 False### 8.3 数学公式
 False
 False**名称**：数学公式（Mathematical Formula）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第2章
 False
 False**定义**：
 FalseMarkdown 可通过 MathJax、KaTeX 等渲染器支持数学公式。
 False
 False**详解**：
 False行内公式：`$equation$`。块级公式：`$$equation$$`。LaTeX 语法：支持 LaTeX 数学表达式。渲染器：MathJax（Web）、KaTeX（更快）。应用：学术文档、技术博客、统计报告。
 False
 False---
 False
 False### 8.4 UML 图
 False
 False**名称**：UML 图（UML Diagram）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第3章
 False
 False**定义**：
 FalseMarkdown 可嵌入 Mermaid、PlantUML 等工具绘制 UML 类图、流程图等。
 False
 False**详解**：
 FalseMermaid：` ```mermaid ` 代码块内写 Mermaid 语法。PlantUML：` ```plantuml ` 代码块内写 PlantUML 语法。图表类型：流程图、时序图、类图、状态图、甘特图。应用：架构文档、技术设计文档。
 False
 False---
 False
 False### 8.5 目录生成
 False
 False**名称**：目录生成（Table of Contents）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第4章
 False
 False**定义**：
 FalseMarkdown 文档工具可以自动从标题生成目录导航。
 False
 False**详解**：
 FalseVS Code 插件：Markdown All in One 可自动生成目录。Pandoc：使用 `--toc` 选项生成目录。GitHub：GitHub 仓库根目录的 README 自动生成目录（部分情况）。手动目录：使用链接和锚点手动创建目录。
 False
 False---
 False
 False## 9. 工具与生态类
 False
 False### 9.1 CommonMark
 False
 False**名称**：通用 Markdown（CommonMark）
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第1章
 False
 False**定义**：
 FalseCommonMark 是 Markdown 的标准化实现，由 John MacFarlane 发起，旨在消除 Markdown 实现的混乱。
 False
 False**详解**：
 False规范文档：详细的语法规范和测试用例。参考实现：C 参考实现可用于测试。Markdown 变体：许多实现基于 CommonMark 规范。官方网站：commonmark.org。
 False
 False---
 False
 False### 9.2 Pandoc
 False
 False**名称**：Pandoc 文档转换器（Pandoc）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第4章
 False
 False**定义**：
 FalsePandoc 是强大的文档格式转换器，支持 Markdown、HTML、LaTeX、DOCX、PDF 等多种格式互转。
 False
 False**详解**：
 False安装：Haskell 平台，可下载预编译版本。用法：`pandoc input.md -o output.docx`。参数：`-s` 生成完整文档、`--toc` 生成目录。模板：可自定义输出模板。扩展支持：支持比标准 Markdown 更多的扩展语法。
 False
 False---
 False
 False### 9.3 VS Code Markdown 扩展
 False
 False**名称**：VS Code Markdown 扩展（VS Code Markdown Extensions）
 False
 False**首次出现位置**：G09_202-Markdown高级语法与文档自动化.md 第4章
 False
 False**定义**：
 FalseVS Code 提供丰富的 Markdown 扩展，支持预览、目录生成、拼写检查等功能。
 False
 False**详解**：
 FalseMarkdown All in One：自动目录、公式支持、快捷键。Markdown Preview Enhanced：增强预览、幻灯片、导出。Markdownlint：代码风格检查和规范。Prettier：格式化 Markdown 文件。
 False
 False---
 False
 False## 10. 最佳实践类
 False
 False### 10.1 Markdown 风格指南
 False
 False**名称**：Markdown 风格指南（Markdown Style Guide）
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第2章
 False
 False**定义**：
 FalseMarkdown 风格指南提供一致性和可读性的写作规范。
 False
 False**详解**：
 False标题层级：避免跳级（如 H1 后直接 H3）。列表嵌套：建议不超过三层。代码块：始终指定语言。链接：优先使用引用式链接提高可维护性。空格：标记与文本间加空格。
 False
 False---
 False
 False### 10.2 可移植性
 False
 False**名称**：可移植性（Portability）
 False
 False**首次出现位置**：G09_201-核心语法汇总.md 第2章
 False
 False**定义**：
 FalseMarkdown 的可移植性指 Markdown 文件在不同工具和平台间的兼容程度。
 False
 False**详解**：
 False标准语法：仅使用标准 Markdown 确保最大兼容性。GFM 扩展：了解 GFM 与标准 Markdown 的差异。图片路径：相对路径增强可移植性。平台差异：GitHub、GitLab、Bitbucket 支持略有不同。
 False
 False---
 False
 False## 更新日志
 False
 False- 2026-04-30：创建专有名词解释文档，v1.0.0
 False