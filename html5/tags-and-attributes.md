# HTML5 基础标签与全局属性 (Basic Tags & Global Attributes)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: HTML5 Basics
 False> @Description: 常用 HTML 标签、超链接、图像及全局属性详解。 | Common tags, links, images, and global attributes.
 False
 False---
 False
 False## 目录
 False
 False1. [基础文本标签](#基础文本标签)
 False2. [列表标签](#列表标签)
 False3. [超链接与多媒体](#超链接与多媒体)
 False4. [全局属性](#全局属性)
 False5. [语义化标签](#语义化标签)
 False6. [实际应用示例](#实际应用示例)
 False7. [最佳实践](#最佳实践)
 False
 False---
 False
 False## 1. 基础文本标签
 False
 False基础文本标签用于定义和格式化网页中的文本内容，是构建网页结构的基础。
 False
 False### 1.1 标题标签
 False
 False标题标签用于定义网页中的标题，从 `<h1>` 到 `<h6>`，级别依次递减。
 False
 False| 标签 | 描述 | 语义 |
 False|------|------|------|
 False| `<h1>` | 一级标题 | 最重要的标题，通常用于页面主标题 |
 False| `<h2>` | 二级标题 | 次要标题，通常用于章节标题 |
 False| `<h3>` | 三级标题 | 子章节标题 |
 False| `<h4>` | 四级标题 | 更小的子章节标题 |
 False| `<h5>` | 五级标题 | 更次要的标题 |
 False| `<h6>` | 六级标题 | 最次要的标题 |
 False
 False**示例**：
 False
```html
 True<h1>网站主标题</h1>
 True<h2>章节标题</h2>
 True<h3>子章节标题</h3>
 True<h4>子子章节标题</h4>
 True```

 False**最佳实践**：
 False
 False- 每个页面应该只有一个 `<h1>` 标签，用于页面的主标题
 False- 标题应该按照层级顺序使用，不要跳过层级
 False- 标题内容应该简洁明了，能够准确反映章节内容
 False
 False### 1.2 段落标签
 False
 False`<p>` 标签用于定义段落，是最常用的文本容器之一。
 False
 False**示例**：
 False
```html
 True<p>这是一个段落。段落是网页中最基本的文本单位，用于组织和展示文本内容。</p>
 True<p>这是另一个段落。每个段落都会自动在前后添加空白，使文本更易于阅读。</p>
 True```

 False### 1.3 行内文本容器
 False
 False`<span>` 标签是一个行内元素，用于对文本的一部分进行样式设置或标记。
 False
 False**示例**：
 False
```html
 True<p>这是一段文本，其中 <span style="color: red;">红色部分</span> 是使用 span 标签标记的。</p>
 True```

 False### 1.4 强调标签
 False
 False用于对文本进行强调，具有语义含义。
 False
 False| 标签 | 描述 | 语义 |
 False|------|------|------|
 False| `<strong>` | 加粗 | 表示重要内容 |
 False| `<em>` | 倾斜 | 表示强调内容 |
 False| `<mark>` | 标记 | 表示突出显示的内容 |
 False| `<small>` | 小号字体 | 表示辅助性内容 |
 False| `<del>` | 删除线 | 表示已删除的内容 |
 False| `<ins>` | 下划线 | 表示已插入的内容 |
 False| `<sub>` | 下标 | 表示下标文本 |
 False| `<sup>` | 上标 | 表示上标文本 |
 False
 False**示例**：
 False
```html
 True<p>这是 <strong>重要内容</strong>，这是 <em>强调内容</em>。</p>
 True<p>这是 <mark>突出显示</mark> 的内容。</p>
 True<p>这是 <small>辅助性内容</small>。</p>
 True<p>这是 <del>已删除</del> 的内容，这是 <ins>已插入</ins> 的内容。</p>
 True<p>水的化学式是 H<sub>2</sub>O，2 的平方是 2<sup>2</sup>。</p>
 True```

 False### 1.5 换行和分割线
 False
 False| 标签 | 描述 |
 False|------|------|
 False| `<br>` | 换行标签，用于在文本中插入换行 |
 False| `<hr>` | 分割线标签，用于在页面中插入水平分割线 |
 False
 False**示例**：
 False
```html
 True<p>这是第一行<br>这是第二行</p>
 True<hr>
 True<p>这是分割线下面的内容</p>
 True```

 False## 2. 列表标签
 False
 False列表标签用于组织和展示一系列相关的项目。
 False
 False### 2.1 无序列表
 False
 False无序列表使用 `<ul>` 标签定义，列表项使用 `<li>` 标签定义，默认使用圆点作为列表项标记。
 False
 False**示例**：
 False
```html
 True<h3>购物清单</h3>
 True<ul>
 True <li>苹果</li>
 True <li>香蕉</li>
 True <li>橙子</li>
 True <li>牛奶</li>
 True</ul>
 True```

 False### 2.2 有序列表
 False
 False有序列表使用 `<ol>` 标签定义，列表项使用 `<li>` 标签定义，默认使用数字作为列表项标记。
 False
 False**属性**：
 False
 False- `start`: 指定列表的起始编号
 False- `reversed`: 倒序列表
 False- `type`: 指定编号类型（1, A, a, I, i）
 False
 False**示例**：
 False
```html
 True<h3>步骤说明</h3>
 True<ol>
 True <li>准备材料</li>
 True <li>混合 ingredients</li>
 True <li>加热</li>
 True <li>冷却</li>
 True</ol>
 True
 True<h3>倒序列表</h3>
 Trueol reversed>
 True <li>第四步</li>
 True <li>第三步</li>
 True <li>第二步</li>
 True <li>第一步</li>
 True</ol>
 True
 True<h3>字母编号列表</h3>
 True<ol type="A">
 True <li>选项 A</li>
 True <li>选项 B</li>
 True <li>选项 C</li>
 True</ol>
 True```

 False### 2.3 定义列表
 False
 False定义列表使用 `<dl>` 标签定义，术语使用 `<dt>` 标签定义，描述使用 `<dd>` 标签定义。
 False
 False**示例**：
 False
```html
 True<h3>术语解释</h3>
 Truedl>
 True <dt>HTML</dt>
 True <dd>超文本标记语言，用于创建网页结构</dd>
 True <dt>CSS</dt>
 True <dd>层叠样式表，用于美化网页</dd>
 True <dt>JavaScript</dt>
 True <dd>脚本语言，用于实现网页交互</dd>
 Truedl>
 True```

 False### 2.4 嵌套列表
 False
 False列表可以嵌套使用，创建层次结构。
 False
 False**示例**：
 False
```html
 True<h3>课程大纲</h3>
 Trueul>
 True <li>HTML 基础
 True ul>
 True <li>标签语法</li>
 True <li>语义化标签</li>
 True <li>表单元素</li>
 True </ul>
 True </li>
 True <li>CSS 基础
 True ul>
 True <li>选择器</li>
 True <li>盒模型</li>
 True <li>布局技巧</li>
 True </ul>
 True </li>
 True <li>JavaScript 基础
 True ul>
 True <li>变量和数据类型</li>
 True <li>控制流</li>
 True <li>函数</li>
 True </ul>
 True </li>
 Trueul>
 True```

 False## 3. 超链接与多媒体
 False
 False### 3.1 超链接
 False
 False超链接使用 `<a>` 标签定义，用于链接到其他网页、文件或位置。
 False
 False**属性**：
 False
 False- `href`: 指定链接目标
 False- `target`: 指定打开链接的方式
 False - `_self`: 在当前窗口打开（默认）
 False - `_blank`: 在新窗口打开
 False - `_parent`: 在父框架打开
 False - `_top`: 在整个窗口打开
 False- `title`: 指定悬停提示文字
 False- `rel`: 指定链接与当前页面的关系
 False
 False**示例**：
 False
```html
 True<!-- 链接到外部网站 -->
 Truea href="https://www.example.com" target="_blank">访问示例网站</a>
 True
 True<!-- 链接到同一网站的其他页面 -->
 Truea href="about.html">关于我们</a>
 True
 True<!-- 链接到页面内的锚点 -->
 Truea href="#section1">跳转到第一部分</a>
 True
 True<!-- 链接到电子邮件 -->
 Truea href="mailto:info@example.com">发送邮件</a>
 True
 True<!-- 链接到电话 -->
 Truea href="tel:+1234567890">拨打电话</a>
 True```

 False### 3.2 图像
 False
 False图像使用 `<img>` 标签定义，用于在网页中插入图片。
 False
 False**属性**：
 False
 False- `src`: 指定图像源文件路径
 False- `alt`: 指定图像的替代文本（对 SEO 和无障碍至关重要）
 False- `width`: 指定图像宽度
 False- `height`: 指定图像高度
 False- `title`: 指定悬停提示文字
 False- `loading`: 指定图像加载方式（`lazy` 用于延迟加载）
 False
 False**示例**：
 False
```html
 True<!-- 基本图像 -->
 Trueimg src="images/photo.jpg" alt="美丽的风景" width="400" height="300">
 True
 True<!-- 带有标题的图像 -->
 Trueimg src="images/logo.png" alt="网站标志" title="网站标志">
 True
 True<!-- 延迟加载的图像 -->
 Trueimg src="images/large-image.jpg" alt="大型图像" loading="lazy">
 True```

 False### 3.3 其他多媒体标签
 False
 False| 标签 | 描述 |
 False|------|------|
 False| `<audio>` | 用于播放音频文件 |
 False| `<video>` | 用于播放视频文件 |
 False| `<iframe>` | 用于嵌入其他网页 |
 False
 False**示例**：
 False
```html
 True<!-- 音频播放器 -->
 Trueaudio controls>
 True <source src="audio/song.mp3" type="audio/mpeg">
 True 您的浏览器不支持音频元素。
 Trueaudio>
 True
 True<!-- 视频播放器 -->
 Truevideo controls width="600">
 True <source src="video/movie.mp4" type="video/mp4">
 True 您的浏览器不支持视频元素。
 Truevideo>
 True
 True<!-- 嵌入网页 -->
 Trueiframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950146!2d-74.0061380845947!3d40.71277577933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy">
 Trueiframe>
 True```

 False## 4. 全局属性
 False
 False全局属性是几乎所有 HTML 元素都支持的属性，用于提供额外的信息或功能。
 False
 False### 4.1 基本全局属性
 False
 False| 属性 | 描述 | 示例 |
 False|------|------|------|
 False| `id` | 唯一标识符，用于通过 JavaScript 或 CSS 选择元素 | `id="header"` |
 False| `class` | 样式类名，用于为元素应用 CSS 样式 | `class="container main"` |
 False| `style` | 行内样式，直接在元素上定义样式 | `style="color: red; font-size: 16px;"` |
 False| `title` | 悬停提示文字，当鼠标悬停在元素上时显示 | `title="这是一个提示"` |
 False| `hidden` | 隐藏元素，使其不显示在页面上 | `hidden` |
 False| `contenteditable` | 使元素内容可编辑 | `contenteditable="true"` |
 False| `spellcheck` | 启用或禁用拼写检查 | `spellcheck="true"` |
 False| `tabindex` | 指定元素在 Tab 键顺序中的位置 | `tabindex="1"` |
 False| `accesskey` | 指定访问元素的快捷键 | `accesskey="k"` |
 False
 False**示例**：
 False
```html
 True<!-- 使用 id 和 class -->
 Truediv id="header" class="container">
 True <h1>网站标题</h1>
 True</div>
 True
 True<!-- 使用行内样式 -->
 Truep style="color: blue; font-weight: bold;">这是蓝色粗体文本</p>
 True
 True<!-- 使用 title 属性 -->
 Truea href="#" title="点击这里">链接</a>
 True
 True<!-- 使用 hidden 属性 -->
 Truediv hidden>这个元素是隐藏的</div>
 True
 True<!-- 使用 contenteditable 属性 -->
 Truediv contenteditable="true">点击此处编辑内容</div>
 True```

 False### 4.2 自定义数据属性
 False
 False`data-*` 属性用于存储自定义数据，这些数据可以通过 JavaScript 访问。
 False
 False**语法**：`data-属性名="值"`
 False
 False**示例**：
 False
```html
 True<!-- 存储产品信息 -->
 Truediv class="product" data-id="123" data-name="iPhone 13" data-price="799">
 True <h3>iPhone 13</h3>
 True <p>价格: $799</p>
 True</div>
 True
 True<!-- 通过 JavaScript 访问 -->
 True<script>
 True const product = document.querySelector('.product');
 True const productId = product.dataset.id;
 True const productName = product.dataset.name;
 True const productPrice = product.dataset.price;
 True console.log(`产品 ID: ${productId}, 名称: ${productName}, 价格: $${productPrice}`);
 True</script>
 True```

 False### 4.3 其他全局属性
 False
 False| 属性 | 描述 | 示例 |
 False|------|------|------|
 False| `lang` | 指定元素内容的语言 | `lang="zh-CN"` |
 False| `dir` | 指定文本方向 | `dir="ltr"` (从左到右) 或 `dir="rtl"` (从右到左) |
 False| `translate` | 指定是否翻译元素内容 | `translate="no"` |
 False| `draggable` | 指定元素是否可拖动 | `draggable="true"` |
 False| `dropzone` | 指定元素作为放置目标时的行为 | `dropzone="copy"` |
 False
 False**示例**：
 False
```html
 True<!-- 指定语言 -->
 Truediv lang="en">This is English text</div>
 Truediv lang="zh-CN">这是中文文本</div>
 True
 True<!-- 指定文本方向 -->
 Truediv dir="rtl">مرحبا بالعالم</div> <!-- 阿拉伯语，从右到左 -->
 True
 True<!-- 指定不可翻译 -->
 Truediv translate="no">品牌名称: Apple</div>
 True
 True<!-- 指定可拖动 -->
 Truediv draggable="true">可拖动元素</div>
 True```

 False## 5. 语义化标签
 False
 FalseHTML5 引入了一系列语义化标签，用于更清晰地描述网页结构。
 False
 False| 标签 | 描述 |
 False|------|------|
 False| `<header>` | 页面或section的头部 |
 False| `<nav>` | 导航链接区域 |
 False| `<main>` | 页面的主要内容 |
 False| `<section>` | 文档中的节 |
 False| `<article>` | 独立的内容块 |
 False| `<aside>` | 侧边栏或附加内容 |
 False| `<footer>` | 页面或section的底部 |
 False| `<figure>` | 图表、图像等 |
 False| `<figcaption>` | 图表的标题 |
 False
 False**示例**：
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>语义化标签示例</title>
 True</head>
 True<body>
 True <header>
 True <h1>网站标题</h1>
 True <nav>
 True <ul>
 True <li><a href="#">首页</a></li>
 True <li><a href="#">关于</a></li>
 True <li><a href="#">服务</a></li>
 True <li><a href="#">联系</a></li>
 True </ul>
 True </nav>
 True </header>
 True 
 True <main>
 True <section>
 True <h2>新闻</h2>
 True <article>
 True <h3>最新新闻标题</h3>
 True <p>新闻内容...</p>
 True </article>
 True <article>
 True <h3>另一则新闻</h3>
 True <p>新闻内容...</p>
 True </article>
 True </section>
 True 
 True <aside>
 True <h3>侧边栏</h3>
 True <p>侧边栏内容...</p>
 True </aside>
 True </main>
 True 
 True <footer>
 True <p> 2026 网站名称. 保留所有权利.</p>
 True </footer>
 True</body>
 True</html>
 True```

 False## 6. 实际应用示例
 False
 False### 6.1 示例 1：基本网页结构
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>基本网页结构</title>
 True <style>
 True body {
 True font-family: Arial, sans-serif;
 True line-height: 1.6;
 True margin: 0;
 True padding: 0;
 True }
 True header {
 True background-color: #333;
 True color: white;
 True padding: 1rem;
 True }
 True nav ul {
 True list-style: none;
 True padding: 0;
 True }
 True nav ul li {
 True display: inline;
 True margin-right: 1rem;
 True }
 True nav ul li a {
 True color: white;
 True text-decoration: none;
 True }
 True main {
 True padding: 2rem;
 True }
 True footer {
 True background-color: #333;
 True color: white;
 True text-align: center;
 True padding: 1rem;
 True position: fixed;
 True bottom: 0;
 True width: 100%;
 True }
 True </style>
 True</head>
 True<body>
 True <header>
 True <h1>我的网站</h1>
 True <nav>
 True <ul>
 True <li><a href="#">首页</a></li>
 True <li><a href="#">关于</a></li>
 True <li><a href="#">服务</a></li>
 True <li><a href="#">联系</a></li>
 True </ul>
 True </nav>
 True </header>
 True 
 True <main>
 True <section>
 True <h2>欢迎访问我的网站</h2>
 True <p>这是一个使用 HTML5 基础标签构建的网页。</p>
 True <p>HTML5 提供了丰富的标签和属性，用于创建结构清晰、语义化的网页。</p>
 True </section>
 True 
 True <section>
 True <h2>服务列表</h2>
 True <ul>
 True <li>网站设计</li>
 True <li>前端开发</li>
 True <li>后端开发</li>
 True <li>移动应用开发</li>
 True </ul>
 True </section>
 True 
 True <section>
 True <h2>联系我们</h2>
 True <p>邮箱: <a href="mailto:info@example.com">info@example.com</a></p>
 True <p>电话: <a href="tel:+1234567890">123-456-7890</a></p>
 True </section>
 True </main>
 True 
 True <footer>
 True <p> 2026 我的网站. 保留所有权利.</p>
 True </footer>
 True</body>
 True</html>
 True```

 False### 6.2 示例 2：产品展示页面
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>产品展示</title>
 True <style>
 True body {
 True font-family: Arial, sans-serif;
 True line-height: 1.6;
 True margin: 0;
 True padding: 0;
 True }
 True .container {
 True max-width: 1200px;
 True margin: 0 auto;
 True padding: 2rem;
 True }
 True h1 {
 True text-align: center;
 True }
 True .product-grid {
 True display: grid;
 True grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 True gap: 2rem;
 True margin-top: 2rem;
 True }
 True .product {
 True border: 1px solid #ddd;
 True border-radius: 5px;
 True padding: 1rem;
 True text-align: center;
 True }
 True .product img {
 True max-width: 100%;
 True height: auto;
 True border-radius: 5px;
 True }
 True .product h3 {
 True margin-top: 1rem;
 True }
 True .product p {
 True color: #666;
 True }
 True .price {
 True font-weight: bold;
 True color: #e63946;
 True font-size: 1.2rem;
 True }
 True </style>
 True</head>
 True<body>
 True <div class="container">
 True <h1>产品展示</h1>
 True 
 True <div class="product-grid">
 True <div class="product" data-id="1" data-name="智能手机" data-price="2999">
 True <img src="https://via.placeholder.com/300" alt="智能手机">
 True <h3>智能手机</h3>
 True <p>6.5英寸屏幕，128GB存储，4800万像素摄像头</p>
 True <p class="price">¥2999</p>
 True <a href="#" class="btn">查看详情</a>
 True </div>
 True 
 True <div class="product" data-id="2" data-name="笔记本电脑" data-price="5999">
 True <img src="https://via.placeholder.com/300" alt="笔记本电脑">
 True <h3>笔记本电脑</h3>
 True <p>14英寸屏幕，8GB内存，512GB固态硬盘</p>
 True <p class="price">¥5999</p>
 True <a href="#" class="btn">查看详情</a>
 True </div>
 True 
 True <div class="product" data-id="3" data-name="平板电脑" data-price="1999">
 True <img src="https://via.placeholder.com/300" alt="平板电脑">
 True <h3>平板电脑</h3>
 True <p>10.5英寸屏幕，64GB存储，支持手写笔</p>
 True <p class="price">¥1999</p>
 True <a href="#" class="btn">查看详情</a>
 True </div>
 True </div>
 True </div>
 True 
 True <script>
 True // 为产品添加点击事件
 True document.querySelectorAll('.product').forEach(product => {
 True product.addEventListener('click', function() {
 True const id = this.dataset.id;
 True const name = this.dataset.name;
 True const price = this.dataset.price;
 True alert(`产品 ID: ${id}\n名称: ${name}\n价格: ¥${price}`);
 True });
 True });
 True </script>
 True</body>
 True</html>
 True```

 False## 7. 最佳实践
 False
 False### 7.1 语义化标签的使用
 False
 False- **使用语义化标签**：优先使用语义化标签（如 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`）来构建网页结构，而不是使用通用的 `<div>` 标签。
 False- **正确嵌套**：确保标签的嵌套顺序正确，例如 `<li>` 必须在 `<ul>` 或 `<ol>` 内部。
 False- **避免过度使用**：不要为了使用语义化标签而过度使用，应该根据内容的实际含义选择合适的标签。
 False
 False### 7.2 全局属性的使用
 False
 False- **id 的唯一性**：确保每个元素的 `id` 属性值在页面中是唯一的。
 False- **class 的复用**：使用 `class` 属性来为多个元素应用相同的样式，提高代码的可维护性。
 False- **避免行内样式**：尽量避免使用 `style` 属性直接在元素上定义样式，应该使用 CSS 文件或 `<style>` 标签。
 False- **合理使用 data-* 属性**：使用 `data-*` 属性来存储与元素相关的自定义数据，而不是使用 `id` 或 `class` 来存储数据。
 False
 False### 7.3 链接和图像的最佳实践
 False
 False- **链接的可访问性**：为链接添加 `title` 属性，提供额外的上下文信息。
 False- **图像的 alt 属性**：为所有图像添加 `alt` 属性，描述图像的内容，这对 SEO 和无障碍访问都很重要。
 False- **图像的尺寸**：为图像指定 `width` 和 `height` 属性，这样浏览器可以在加载图像之前预留空间，避免页面布局跳动。
 False- **图像的延迟加载**：对于大型图像，使用 `loading="lazy"` 属性来延迟加载，提高页面加载速度。
 False
 False### 7.4 代码风格
 False
 False- **缩进**：使用一致的缩进（通常是 2 或 4 个空格）来提高代码的可读性。
 False- **大小写**：HTML 标签和属性通常使用小写。
 False- **引号**：属性值应该使用双引号包围。
 False- **注释**：为复杂的代码添加注释，提高代码的可维护性。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化基础标签与全局属性用法。
 False- 2026-04-05: 扩写内容，增加详细的基础文本标签、列表标签、超链接与多媒体、全局属性、语义化标签的概念、示例和最佳实践，以及实际应用示例。
 False