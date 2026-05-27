# Markdown 代码块与语法高亮 (Code Blocks and Syntax Highlighting)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Markdown Basics
 False> @Description: Markdown 中的代码块和语法高亮功能。 | Code blocks and syntax highlighting in Markdown.
 False
 False---
 False
 False## 目录
 False
 False1. [行内代码](#行内代码)
 False2. [代码块](#代码块)
 False3. [代码块的高级功能](#代码块的高级功能)
 False4. [支持的编程语言](#支持的编程语言)
 False5. [最佳实践](#最佳实践)
 False6. [常见问题与解决方案](#常见问题与解决方案)
 False7. [扩展语法](#扩展语法)
 False8. [总结](#总结)
 False
 False---
 False
 False## 1. 行内代码 (Inline Code)
 False
 False**语法**：使用反引号 `` ` `` 包围代码
 False
 False**示例**：
 False
```markdown
 True在 Markdown 中，行内代码使用 `` ` `` 包围，例如 `console.log('Hello, World!');`
 True```

 False**渲染效果**：
 False在 Markdown 中，行内代码使用 `` ` `` 包围，例如 `console.log('Hello, World!');`
 False
 False## 2. 代码块 (Code Blocks)
 False
 False### 2.1 基本代码块
 False
 False**语法**：使用三个反引号 ``` 包围代码块
 False
 False**示例**：
 False
````markdown
 True```
function hello() {
 False console.log('Hello, World!');
 False}
 False
 Falsehello();
```
 True````

 False**渲染效果**：
 False
```
 Truefunction hello() {
 True console.log('Hello, World!');
 True}
 True
 Truehello();
 True```

 False### 2.2 语法高亮
 False
 False**语法**：在三个反引号后指定语言名称
 False
 False**示例**：
 False
````markdown
 True```javascript
function hello() {
 False console.log('Hello, World!');
 False}
 False
 Falsehello();
```
 True
 True```python
def hello():
 False print('Hello, World!')
 False
 Falsehello()
```
 True
 True```java
public class Hello {
 False public static void main(String[] args) {
 False System.out.println("Hello, World!");
 False }
 False}
```
 True
 True```c
#include <stdio.h>
 False
 Falseint main() {
 False printf("Hello, World!\n");
 False return 0;
 False}
```
 True
 True```css
body {
 False font-family: Arial, sans-serif;
 False background-color: #f0f0f0;
 False}
 False
 Falseh1 {
 False color: #333;
 False}
```
 True
 True```html
<!DOCTYPE html>
 False<html lang="zh-CN">
 False<head>
 False <meta charset="UTF-8">
 False <title>Hello</title>
 False</head>
 False<body>
 False <h1>Hello, World!</h1>
 False</body>
 False</html>
```
 True
 True```sql
SELECT * FROM users WHERE age > 18;
```
 True
 True```json
{
 False "name": "John",
 False "age": 30,
 False "city": "New York"
 False}
```
 True
 True```yaml
server:
 False port: 8080
 Falsespring:
 False datasource:
 False url: jdbc:mysql://localhost:3306/db
```
 True````

 False**渲染效果**：
 False
```javascript
 Truefunction hello() {
 True console.log('Hello, World!');
 True}
 True
 Truehello();
 True```

```python
 Truedef hello():
 True print('Hello, World!')
 True
 Truehello()
 True```

```java
 Truepublic class Hello {
 True public static void main(String[] args) {
 True System.out.println("Hello, World!");
 True }
 True}
 True```

```c
 True#include <stdio.h>
 True
 Trueint main() {
 True printf("Hello, World!\n");
 True return 0;
 True}
 True```

```css
 Truebody {
 True font-family: Arial, sans-serif;
 True background-color: #f0f0f0;
 True}
 True
 Trueh1 {
 True color: #333;
 True}
 True```

```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <title>Hello</title>
 True</head>
 True<body>
 True <h1>Hello, World!</h1>
 True</body>
 True</html>
 True```

```sql
 TrueSELECT * FROM users WHERE age > 18;
 True```

```json
 True{
 True "name": "John",
 True "age": 30,
 True "city": "New York"
 True}
 True```

```yaml
 Trueserver:
 True port: 8080
 Truespring:
 True datasource:
 True url: jdbc:mysql://localhost:3306/db
 True```

 False### 2.3 代码块中的换行和缩进
 False
 False**示例**：
 False
````markdown
 True```javascript
// 代码块中的换行和缩进会被保留
 Falsefunction formatText(text) {
 False return text
 False .split(' ')
 False .map(word => word.charAt(0).toUpperCase() + word.slice(1))
 False .join(' ');
 False}
```
 True````

 False**渲染效果**：
 False
```javascript
 True// 代码块中的换行和缩进会被保留
 Truefunction formatText(text) {
 True return text
 True .split(' ')
 True .map(word => word.charAt(0).toUpperCase() + word.slice(1))
 True .join(' ');
 True}
 True```

 False## 3. 代码块的高级功能
 False
 False### 3.1 行号
 False
 False**语法**：在一些 Markdown 渲染器中，可以通过添加 `{linenos}` 选项来显示行号
 False
 False**示例**：
 False
````markdown
 True```javascript {linenos}
function hello() {
 False console.log('Hello, World!');
 False}
 False
 Falsehello();
```
 True````

 False**渲染效果**：
 False
```javascript {linenos}
 Truefunction hello() {
 True console.log('Hello, World!');
 True}
 True
 Truehello();
 True```

 False### 3.2 代码高亮特定行
 False
 False**语法**：在一些 Markdown 渲染器中，可以通过添加 `{hl_lines=[1,3]}` 选项来高亮特定行
 False
 False**示例**：
 False
````markdown
 True```javascript {hl_lines=[2,4]}
function hello() {
 False console.log('Hello, World!');
 False}
 False
 Falsehello();
```
 True````

 False**渲染效果**：
 False
```javascript {hl_lines=[2,4]}
 Truefunction hello() {
 True console.log('Hello, World!');
 True}
 True
 Truehello();
 True```

 False### 3.3 代码块标题
 False
 False**语法**：在代码块前添加标题
 False
 False**示例**：
 False
````markdown
 True### 示例代码：hello.js
 True
 True```javascript
function hello() {
 False console.log('Hello, World!');
 False}
 False
 Falsehello();
```
 True````

 False**渲染效果**：
 False
 False### 示例代码：hello.js
 False
```javascript
 Truefunction hello() {
 True console.log('Hello, World!');
 True}
 True
 Truehello();
 True```

 False## 4. 支持的编程语言
 False
 False常见的支持语法高亮的编程语言包括：
 False
 False| 语言 | 标识符 | 示例 |
 False|------|--------|------|
 False| JavaScript | javascript, js | ` ```javascript ` |
 False| Python | python, py | ` ```python ` |
 False| Java | java | ` ```java ` |
 False| C | c | ` ```c ` |
 False| C++ | cpp, c++ | ` ```cpp ` |
 False| C# | csharp, cs | ` ```csharp ` |
 False| HTML | html | ` ```html ` |
 False| CSS | css | ` ```css ` |
 False| SQL | sql | ` ```sql ` |
 False| JSON | json | ` ```json ` |
 False| YAML | yaml, yml | ` ```yaml ` |
 False| Markdown | markdown, md | ` ```markdown ` |
 False| Shell | shell, bash | ` ```shell ` |
 False| PowerShell | powershell | ` ```powershell ` |
 False| PHP | php | ` ```php ` |
 False| Ruby | ruby, rb | ` ```ruby ` |
 False| Go | go | ` ```go ` |
 False| Rust | rust | ` ```rust ` |
 False| Swift | swift | ` ```swift ` |
 False| Kotlin | kotlin | ` ```kotlin ` |
 False
 False## 5. 最佳实践
 False
 False### 5.1 代码块最佳实践
 False
 False1. **使用语法高亮**：为代码块指定正确的语言，提高代码可读性
 False2. **保持代码整洁**：确保代码格式正确，缩进一致
 False3. **添加必要的注释**：解释复杂代码的逻辑
 False4. **控制代码长度**：过长的代码块可能影响文档可读性，考虑只展示关键部分
 False5. **提供上下文**：在代码块前添加简短的说明，解释代码的用途
 False
 False### 5.2 代码示例最佳实践
 False
 False1. **可运行的示例**：确保代码示例可以正常运行
 False2. **完整的示例**：提供完整的代码示例，包括必要的导入和初始化
 False3. **有意义的变量名**：使用描述性的变量名，提高代码可读性
 False4. **处理边界情况**：在示例中展示如何处理边界情况
 False5. **添加输出示例**：对于有输出的代码，展示预期的输出结果
 False
 False## 6. 常见问题与解决方案
 False
 False### 6.1 语法高亮不工作
 False
 False**问题**：代码块没有显示语法高亮
 False
 False**解决方案**：
 False
 False- 确保正确指定了语言标识符
 False- 检查 Markdown 渲染器是否支持语法高亮
 False- 尝试使用更常见的语言标识符（如 `js` 代替 `javascript`）
 False
 False### 6.2 代码块中的反引号
 False
 False**问题**：代码块中包含反引号，导致代码块提前结束
 False
 False**解决方案**：
 False
 False- 使用更多的反引号来包围代码块，例如使用四个反引号包围包含三个反引号的代码
 False- 或者使用 HTML 的 `<pre>` 和 `<code>` 标签
 False
 False### 6.3 代码缩进问题
 False
 False**问题**：代码块中的缩进显示不正确
 False
 False**解决方案**：
 False
 False- 确保代码块中的缩进使用空格或制表符一致
 False- 避免混合使用空格和制表符
 False- 检查 Markdown 编辑器的缩进设置
 False
 False## 7. 扩展语法
 False
 False### 7.1 GitHub Flavored Markdown (GFM)
 False
 False**示例**：
 False
````markdown
 True```javascript
// GitHub Flavored Markdown 支持语法高亮
 Falsefunction githubExample() {
 False console.log('Hello, GitHub!');
 False}
```
 True````

 False**渲染效果**：
 False
```javascript
 True// GitHub Flavored Markdown 支持语法高亮
 Truefunction githubExample() {
 True console.log('Hello, GitHub!');
 True}
 True```

 False### 7.2 代码块中的数学公式
 False
 False**示例**：
 False
````markdown
 True```math
E = mc^2
```
 True````

 False**渲染效果**：
 False
```math
 TrueE = mc^2
 True```

 False## 8. 总结
 False
 FalseMarkdown 代码块和语法高亮功能使文档中的代码更加清晰易读，有助于更好地展示和解释代码。通过掌握这些功能，你可以创建包含各种编程语言代码的专业文档。
 False
 False在使用代码块时，遵循最佳实践可以确保代码的可读性和可维护性。同时，了解常见问题的解决方案可以帮助你快速解决在使用过程中遇到的问题。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 整合 Markdown 代码块与语法高亮知识
 False- 2026-04-05: 扩写内容，增加详细的代码块类型、语法高亮、高级功能和最佳实践
 False