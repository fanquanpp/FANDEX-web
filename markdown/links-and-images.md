# Markdown 链接与图片 (Links and Images)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Markdown Basics
 False> @Description: Markdown 中的链接和图片语法。 | Links and images syntax in Markdown.
 False
 False---
 False
 False## 目录
 False
 False1. [链接](#链接)
 False2. [图片](#图片)
 False3. [最佳实践](#最佳实践)
 False4. [常见问题与解决方案](#常见问题与解决方案)
 False5. [扩展语法](#扩展语法)
 False6. [总结](#总结)
 False
 False---
 False
 False## 1. 链接 (Links)
 False
 False### 1.1 行内链接 (Inline Links)
 False
 False**语法**：`[链接文本](URL "可选的标题")`
 False
 False**示例**：
 False
```markdown
 True[GitHub](https://github.com "GitHub 官方网站")
 True[Markdown 指南](https://www.markdownguide.org)
 True```

 False**渲染效果**：
 False[GitHub](https://github.com "GitHub 官方网站")
 False[Markdown 指南](https://www.markdownguide.org)
 False
 False### 1.2 引用链接 (Reference Links)
 False
 False**语法**：
 False
```markdown
 True[链接文本][引用标识符]
 True
 True[引用标识符]: URL "可选的标题"
 True```

 False**示例**：
 False
```markdown
 True[GitHub][github]
 True[Markdown 指南][md-guide]
 True
 True[github]: https://github.com "GitHub 官方网站"
 True[md-guide]: https://www.markdownguide.org "Markdown 官方指南"
 True```

 False**渲染效果**：
 False[GitHub][github]
 False[Markdown 指南][md-guide]
 False
 False[github]: https://github.com "GitHub 官方网站"
 False[md-guide]: https://www.markdownguide.org "Markdown 官方指南"
 False
 False### 1.3 自动链接 (Auto Links)
 False
 False**语法**：`<URL>` 或 `<电子邮件地址>`
 False
 False**示例**：
 False
```markdown
 True<https://github.com>
 True<example@example.com>
 True```

 False**渲染效果**：
 False<https://github.com>
 False<example@example.com>
 False
 False### 1.4 相对链接 (Relative Links)
 False
 False**语法**：使用相对路径指向本地文件或目录
 False
 False**示例**：
 False
```markdown
 True[README 文件](./README.md)
 True[图片目录](../assets/)
 True```

 False**渲染效果**：
 False[README 文件](../README.md)
 False[图片目录](../)
 False
 False## 2. 图片 (Images)
 False
 False### 2.1 基本语法
 False
 False**语法**：`![替代文本](图片URL "可选的标题")`
 False
 False**示例**：
 False
```markdown
 True![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png "GitHub Logo")
 True```

 False**渲染效果**：
 False![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png "GitHub Logo")
 False
 False### 2.2 引用图片
 False
 False**语法**：
 False
```markdown
 True![替代文本][图片引用标识符]
 True
 True[图片引用标识符]: 图片URL "可选的标题"
 True```

 False**示例**：
 False
```markdown
 True![GitHub Logo][github-logo]
 True
 True[github-logo]: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png "GitHub Logo"
 True```

 False**渲染效果**：
 False![GitHub Logo][github-logo]
 False
 False[github-logo]: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png "GitHub Logo"
 False
 False### 2.3 本地图片
 False
 False**语法**：使用相对路径指向本地图片文件
 False
 False**示例**：
 False
```markdown
 True![本地图片](./assets/image.png)
 True```

 False### 2.4 图片链接
 False
 False**语法**：将图片嵌套在链接中
 False
 False**示例**：
 False
```markdown
 True[![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)](https://github.com)
 True```

 False**渲染效果**：
 False[![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)](https://github.com)
 False
 False## 3. 最佳实践
 False
 False### 3.1 链接最佳实践
 False
 False1. **使用描述性的链接文本**：链接文本应该清晰地描述链接的目标，避免使用"点击这里"等模糊描述
 False2. **添加标题属性**：对于重要的链接，添加标题属性可以提供更多上下文信息
 False3. **使用引用链接**：对于重复使用的链接，使用引用链接可以使代码更整洁
 False4. **检查链接有效性**：定期检查链接是否仍然有效
 False
 False### 3.2 图片最佳实践
 False
 False1. **添加替代文本**：为图片添加有意义的替代文本，提高可访问性
 False2. **优化图片大小**：确保图片大小适中，避免影响页面加载速度
 False3. **使用相对路径**：对于本地图片，使用相对路径可以确保在不同环境中都能正确显示
 False4. **添加图片标题**：对于复杂图片，添加标题可以提供更多信息
 False
 False### 3.3 组织图片资源
 False
 False1. **创建专门的图片目录**：如 `assets/` 或 `images/` 目录
 False2. **使用一致的命名规范**：如 `feature-image.png` 或 `step-1-screenshot.png`
 False3. **分类存储**：根据用途或主题对图片进行分类存储
 False
 False## 4. 常见问题与解决方案
 False
 False### 4.1 图片不显示
 False
 False**问题**：图片无法正常显示
 False
 False**解决方案**：
 False
 False- 检查图片路径是否正确
 False- 确保图片文件存在
 False- 检查网络连接是否正常
 False- 对于本地图片，确保使用正确的相对路径
 False
 False### 4.2 链接失效
 False
 False**问题**：链接点击后无法访问目标页面
 False
 False**解决方案**：
 False
 False- 检查 URL 是否正确
 False- 确保目标网站仍然存在
 False- 对于本地文件，确保文件路径正确
 False- 检查是否需要添加 `http://` 或 `https://` 前缀
 False
 False### 4.3 图片大小控制
 False
 False**问题**：图片显示过大或过小
 False
 False**解决方案**：
 False
 False- 在 Markdown 中，基本语法不支持直接控制图片大小
 False- 可以使用 HTML 标签来控制图片大小：
 False
 ```html
 True <img src="image.png" alt="描述" width="300" height="200">
 True ```

 False- 或者在 CSS 中设置图片样式
 False
 False## 5. 扩展语法
 False
 False### 5.1 GitHub Flavored Markdown (GFM)
 False
 False**任务列表**：
 False
```markdown
 True- [x] 完成任务 1
 True- [ ] 完成任务 2
 True- [ ] 完成任务 3
 True```

 False**渲染效果**：
 False
 False- [x] 完成任务 1
 False- [ ] 完成任务 2
 False- [ ] 完成任务 3
 False
 False### 5.2 表格中的链接和图片
 False
 False**示例**：
 False
```markdown
 True| 名称 | 链接 | 图标 |
 True|------|------|------|
 True| GitHub | [GitHub](https://github.com) | ![GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png) |
 True| Google | [Google](https://google.com) | ![Google](https://www.google.com/favicon.ico) |
 True```

 False**渲染效果**：
 False
 False| 名称 | 链接 | 图标 |
 False|------|------|------|
 False| GitHub | [GitHub](https://github.com) | ![GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png) |
 False| Google | [Google](https://google.com) | ![Google](https://www.google.com/favicon.ico) |
 False
 False## 6. 总结
 False
 FalseMarkdown 提供了简洁而强大的语法来添加链接和图片，使文档更加丰富和有吸引力。通过掌握这些语法，你可以创建包含外部链接、内部链接、图片和图片链接的文档。
 False
 False在使用链接和图片时，遵循最佳实践可以确保文档的可访问性、可靠性和美观度。同时，了解常见问题的解决方案可以帮助你快速解决在使用过程中遇到的问题。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 整合 Markdown 链接与图片知识
 False- 2026-04-05: 扩写内容，增加详细的链接类型、图片语法、最佳实践和常见问题
 False