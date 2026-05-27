# CSS3 选择器系统 (Selectors System)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: CSS Basics
 False> @Description: 基础选择器、组合选择器、伪类与伪元素深度解析。 | Basic, combinator, pseudo-class, and pseudo-element selectors.
 False
 False---
 False
 False## 目录
 False
 False1. [目录](#目录)
 False1. [基础选择器](#基础选择器)
 False1. [组合选择器](#组合选择器)
 False1. [伪类选择器](#伪类选择器)
 False1. [伪元素选择器](#伪元素选择器)
 False1. [选择器优先级](#选择器优先级)
 False1. [选择器性能](#选择器性能)
 False1. [最佳实践](#最佳实践)
 False1. [实际应用示例](#实际应用示例)
 False1. [总结](#总结)
 False
 False---
 False
 False## 1. 目录
 False
 False- [1. 基础选择器](#1-基础选择器)
 False - [1.1 通配符选择器](#11-通配符选择器)
 False - [1.2 标签选择器](#12-标签选择器)
 False - [1.3 类选择器](#13-类选择器)
 False - [1.4 ID 选择器](#14-id-选择器)
 False - [1.5 属性选择器](#15-属性选择器)
 False- [2. 组合选择器](#2-组合选择器)
 False - [2.1 后代选择器](#21-后代选择器)
 False - [2.2 子代选择器](#22-子代选择器)
 False - [2.3 相邻兄弟选择器](#23-相邻兄弟选择器)
 False - [2.4 通用兄弟选择器](#24-通用兄弟选择器)
 False- [3. 伪类选择器](#3-伪类选择器)
 False - [3.1 状态伪类](#31-状态伪类)
 False - [3.2 结构伪类](#32-结构伪类)
 False - [3.3 表单伪类](#33-表单伪类)
 False - [3.4 其他伪类](#34-其他伪类)
 False- [4. 伪元素选择器](#4-伪元素选择器)
 False - [4.1 `::before` 和 `::after`](#41-before-和-after)
 False - [4.2 `::first-letter` 和 `::first-line`](#42-first-letter-和-first-line)
 False - [4.3 `::selection`](#43-selection)
 False - [4.4 `::placeholder`](#44-placeholder)
 False - [4.5 其他伪元素](#45-其他伪元素)
 False- [5. 选择器优先级](#5-选择器优先级)
 False - [5.1 优先级计算规则](#51-优先级计算规则)
 False - [5.2 优先级示例](#52-优先级示例)
 False- [6. 选择器性能](#6-选择器性能)
 False - [6.1 性能影响因素](#61-性能影响因素)
 False - [6.2 性能优化建议](#62-性能优化建议)
 False- [7. 最佳实践](#7-最佳实践)
 False - [7.1 命名规范](#71-命名规范)
 False - [7.2 代码组织](#72-代码组织)
 False - [7.3 可读性](#73-可读性)
 False- [8. 实际应用示例](#8-实际应用示例)
 False- [9. 总结](#9-总结)
 False
 False## 1. 基础选择器
 False
 False基础选择器是 CSS 中最基本的选择器类型，用于选择 HTML 元素。
 False
 False### 1.1 通配符选择器
 False
 False通配符选择器 (`*`) 匹配文档中的所有元素：
 False
```css
 True/* 匹配所有元素 */
 True* {
 True margin: 0;
 True padding: 0;
 True box-sizing: border-box;
 True}
 True
 True/* 匹配特定元素内的所有元素 */
 True.container * {
 True color: #333;
 True}
 True```

 False**使用场景**：
 False
 False- 重置默认样式
 False- 对特定容器内的所有元素应用通用样式
 False
 False**注意**：通配符选择器的性能较低，应谨慎使用。
 False
 False### 1.2 标签选择器
 False
 False标签选择器匹配指定类型的 HTML 元素：
 False
```css
 True/* 匹配所有 <p> 元素 */
 Truep {
 True font-size: 16px;
 True line-height: 1.5;
 True}
 True
 True/* 匹配所有 <div> 元素 */
 Truediv {
 True margin-bottom: 20px;
 True}
 True
 True/* 匹配所有 <h1> 到 <h6> 元素 */
 Trueh1, h2, h3, h4, h5, h6 {
 True font-weight: bold;
 True color: #333;
 True}
 True```

 False**使用场景**：
 False
 False- 对特定类型的元素应用通用样式
 False- 重置或覆盖浏览器默认样式
 False
 False### 1.3 类选择器
 False
 False类选择器 (`.*`) 匹配具有指定类名的元素：
 False
```css
 True/* 匹配所有带有 .container 类的元素 */
 True.container {
 True width: 100%;
 True max-width: 1200px;
 True margin: 0 auto;
 True}
 True
 True/* 匹配所有带有 .button 类的元素 */
 True.button {
 True padding: 10px 20px;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True}
 True
 True/* 匹配同时带有 .button 和 .primary 类的元素 */
 True.button.primary {
 True background-color: #3498db;
 True color: white;
 True}
 True```

 False**使用场景**：
 False
 False- 对多个不同类型的元素应用相同的样式
 False- 为元素添加特定的样式类
 False
 False### 1.4 ID 选择器
 False
 FalseID 选择器 (`#*`) 匹配具有指定 ID 的元素：
 False
```css
 True/* 匹配 ID 为 header 的元素 */
 True#header {
 True background-color: #f8f9fa;
 True padding: 20px;
 True box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 True}
 True
 True/* 匹配 ID 为 main-content 的元素 */
 True#main-content {
 True padding: 30px;
 True background-color: white;
 True}
 True```

 False**使用场景**：
 False
 False- 选择页面中唯一的元素
 False- 为特定元素应用独特的样式
 False
 False**注意**：ID 选择器的权重较高，应谨慎使用，避免过度使用导致样式难以覆盖。
 False
 False### 1.5 属性选择器
 False
 False属性选择器匹配具有指定属性或属性值的元素：
 False
```css
 True/* 匹配具有 href 属性的元素 */
 True[a] {
 True color: #3498db;
 True text-decoration: none;
 True}
 True
 True/* 匹配 href 属性值为 "https://example.com" 的元素 */
 True[a="https://example.com"] {
 True font-weight: bold;
 True}
 True
 True/* 匹配 href 属性值以 "https" 开头的元素 */
 True[a^="https"] {
 True color: #27ae60;
 True}
 True
 True/* 匹配 href 属性值以 ".com" 结尾的元素 */
 True[a$=".com"] {
 True font-style: italic;
 True}
 True
 True/* 匹配 href 属性值包含 "example" 的元素 */
 True[a*="example"] {
 True text-decoration: underline;
 True}
 True
 True/* 匹配 class 属性值包含 "button" 的元素 */
 True[class~="button"] {
 True padding: 10px;
 True}
 True
 True/* 匹配 lang 属性值为 "en" 或以 "en-" 开头的元素 */
 True[lang|="en"] {
 True font-family: Arial, sans-serif;
 True}
 True```

 False**使用场景**：
 False
 False- 为具有特定属性的元素应用样式
 False- 为具有特定属性值的元素应用样式
 False- 表单元素的样式化
 False
 False## 2. 组合选择器
 False
 False组合选择器用于选择具有特定关系的元素。
 False
 False### 2.1 后代选择器
 False
 False后代选择器 (` `) 匹配指定元素的所有后代元素：
 False
```css
 True/* 匹配 .container 内的所有 <p> 元素 */
 True.container p {
 True margin-bottom: 10px;
 True}
 True
 True/* 匹配 .nav 内的所有 <a> 元素 */
 True.nav a {
 True color: #333;
 True text-decoration: none;
 True}
 True
 True/* 多层后代选择 */
 True.header .nav .menu-item {
 True display: inline-block;
 True margin-right: 20px;
 True}
 True```

 False**使用场景**：
 False
 False- 为特定容器内的元素应用样式
 False- 实现嵌套样式
 False
 False### 2.2 子代选择器
 False
 False子代选择器 (`>`) 匹配指定元素的直接子元素：
 False
```css
 True/* 匹配 .container 的直接子元素 <div> */
 True.container > div {
 True padding: 20px;
 True border: 1px solid #ddd;
 True}
 True
 True/* 匹配 .nav 的直接子元素 <ul> */
 True.nav > ul {
 True list-style: none;
 True padding: 0;
 True}
 True
 True/* 匹配 .menu 的直接子元素 <li> */
 True.menu > li {
 True display: inline-block;
 True}
 True```

 False**使用场景**：
 False
 False- 为元素的直接子元素应用样式
 False- 避免样式影响深层嵌套的元素
 False
 False### 2.3 相邻兄弟选择器
 False
 False相邻兄弟选择器 (`+`) 匹配紧跟在指定元素后的第一个兄弟元素：
 False
```css
 True/* 匹配紧跟在 <h1> 后的第一个 <p> 元素 */
 Trueh1 + p {
 True font-size: 18px;
 True color: #666;
 True}
 True
 True/* 匹配紧跟在 .button 后的第一个 .message 元素 */
 True.button + .message {
 True margin-top: 10px;
 True padding: 10px;
 True background-color: #f0f0f0;
 True}
 True```

 False**使用场景**：
 False
 False- 为特定元素后的第一个兄弟元素应用样式
 False- 创建元素间的特定间距或样式关系
 False
 False### 2.4 通用兄弟选择器
 False
 False通用兄弟选择器 (`~`) 匹配指定元素后的所有兄弟元素：
 False
```css
 True/* 匹配 <h1> 后的所有 <p> 元素 */
 Trueh1 ~ p {
 True margin-left: 20px;
 True}
 True
 True/* 匹配 .active 后的所有 .item 元素 */
 True.active ~ .item {
 True opacity: 0.7;
 True}
 True```

 False**使用场景**：
 False
 False- 为特定元素后的所有兄弟元素应用样式
 False- 创建元素组的样式关系
 False
 False## 3. 伪类选择器
 False
 False伪类选择器用于选择处于特定状态或位置的元素。
 False
 False### 3.1 状态伪类
 False
 False状态伪类匹配元素的特定状态：
 False
```css
 True/* 链接未访问状态 */
 Truea:link {
 True color: #3498db;
 True}
 True
 True/* 链接已访问状态 */
 Truea:visited {
 True color: #9b59b6;
 True}
 True
 True/* 鼠标悬停状态 */
 Truea:hover {
 True color: #e74c3c;
 True text-decoration: underline;
 True}
 True
 True/* 元素激活状态 */
 Truea:active {
 True color: #c0392b;
 True}
 True
 True/* 元素获得焦点状态 */
 Trueinput:focus {
 True outline: 2px solid #3498db;
 True border-color: #3498db;
 True}
 True
 True/* 元素禁用状态 */
 Truebutton:disabled {
 True background-color: #bdc3c7;
 True cursor: not-allowed;
 True}
 True
 True/* 元素启用状态 */
 Truebutton:enabled {
 True background-color: #3498db;
 True cursor: pointer;
 True}
 True
 True/* 元素checked状态 */
 Trueinput:checked {
 True accent-color: #3498db;
 True}
 True```

 False**使用场景**：
 False
 False- 为链接的不同状态应用样式
 False- 为表单元素的不同状态应用样式
 False- 为元素的交互状态应用样式
 False
 False### 3.2 结构伪类
 False
 False结构伪类匹配元素在文档结构中的特定位置：
 False
```css
 True/* 匹配第一个子元素 */
 True.container > :first-child {
 True margin-top: 0;
 True}
 True
 True/* 匹配最后一个子元素 */
 True.container > :last-child {
 True margin-bottom: 0;
 True}
 True
 True/* 匹配第 n 个子元素 */
 True.list > li:nth-child(2) {
 True background-color: #f0f0f0;
 True}
 True
 True/* 匹配偶数位置的子元素 */
 True.list > li:nth-child(even) {
 True background-color: #f9f9f9;
 True}
 True
 True/* 匹配奇数位置的子元素 */
 True.list > li:nth-child(odd) {
 True background-color: #ffffff;
 True}
 True
 True/* 匹配 3 的倍数位置的子元素 */
 True.list > li:nth-child(3n) {
 True border-bottom: 2px solid #ddd;
 True}
 True
 True/* 匹配倒数第 n 个子元素 */
 True.list > li:nth-last-child(2) {
 True font-weight: bold;
 True}
 True
 True/* 匹配第一个特定类型的子元素 */
 True.container > p:first-of-type {
 True font-size: 18px;
 True}
 True
 True/* 匹配最后一个特定类型的子元素 */
 True.container > p:last-of-type {
 True margin-bottom: 0;
 True}
 True
 True/* 匹配第 n 个特定类型的子元素 */
 True.container > p:nth-of-type(2) {
 True color: #666;
 True}
 True
 True/* 匹配唯一的子元素 */
 True.container > :only-child {
 True width: 100%;
 True}
 True
 True/* 匹配唯一的特定类型的子元素 */
 True.container > p:only-of-type {
 True font-style: italic;
 True}
 True
 True/* 匹配空元素 */
 True.element:empty {
 True display: none;
 True}
 True
 True/* 匹配根元素 */
 True:root {
 True --primary-color: #3498db;
 True --secondary-color: #2ecc71;
 True}
 True
 True/* 排除特定元素 */
 True.list > li:not(.special) {
 True color: #666;
 True}
 True
 True/* 排除多个元素 */
 True.container > *:not(p):not(div) {
 True margin: 10px 0;
 True}
 True```

 False**使用场景**：
 False
 False- 为列表的奇偶项应用不同样式
 False- 为特定位置的元素应用样式
 False- 排除特定元素
 False- 为根元素定义全局变量
 False
 False### 3.3 表单伪类
 False
 False表单伪类匹配表单元素的特定状态：
 False
```css
 True/* 匹配必填表单元素 */
 Trueinput:required {
 True border: 1px solid #e74c3c;
 True}
 True
 True/* 匹配可选表单元素 */
 Trueinput:optional {
 True border: 1px solid #bdc3c7;
 True}
 True
 True/* 匹配有效的表单元素 */
 Trueinput:valid {
 True border: 1px solid #27ae60;
 True}
 True
 True/* 匹配无效的表单元素 */
 Trueinput:invalid {
 True border: 1px solid #e74c3c;
 True}
 True
 True/* 匹配输入范围的最小值 */
 Trueinput[type="range"]:min {
 True background-color: #e74c3c;
 True}
 True
 True/* 匹配输入范围的最大值 */
 Trueinput[type="range"]:max {
 True background-color: #27ae60;
 True}
 True
 True/* 匹配输入范围的中间值 */
 Trueinput[type="range"]:in-range {
 True background-color: #3498db;
 True}
 True
 True/* 匹配输入范围的超出值 */
 Trueinput[type="range"]:out-of-range {
 True background-color: #e74c3c;
 True}
 True
 True/* 匹配只读表单元素 */
 Trueinput:read-only {
 True background-color: #f5f5f5;
 True cursor: not-allowed;
 True}
 True
 True/* 匹配可读写表单元素 */
 Trueinput:read-write {
 True background-color: white;
 True}
 True```

 False**使用场景**：
 False
 False- 为表单元素的不同状态应用样式
 False- 提供视觉反馈，指示表单元素的有效性
 False
 False### 3.4 其他伪类
 False
```css
 True/* 匹配当前激活的元素 */
 True:target {
 True background-color: #f0f8ff;
 True padding: 10px;
 True border-radius: 4px;
 True}
 True
 True/* 匹配语言为英语的元素 */
 True:lang(en) {
 True font-family: Arial, sans-serif;
 True}
 True
 True/* 匹配语言为中文的元素 */
 True:lang(zh) {
 True font-family: "SimSun", serif;
 True}
 True
 True/* 匹配包含指定文本的元素 */
 True:contains("关键词") {
 True background-color: yellow;
 True}
 True
 True/* 匹配具有指定父元素的元素 */
 True.parent > .child:has(> .grandchild) {
 True border: 1px solid #ddd;
 True}
 True```

 False**使用场景**：
 False
 False- 为当前激活的锚点目标应用样式
 False- 为不同语言的元素应用不同样式
 False- 为包含特定文本的元素应用样式
 False- 为具有特定子元素的元素应用样式
 False
 False## 4. 伪元素选择器
 False
 False伪元素选择器用于选择元素的特定部分。
 False
 False### 4.1 `::before` 和 `::after`
 False
 False`::before` 和 `::after` 用于在元素内容前后插入装饰性内容：
 False
```css
 True/* 在元素前插入内容 */
 True.button::before {
 True content: "→";
 True margin-right: 5px;
 True}
 True
 True/* 在元素后插入内容 */
 True.button::after {
 True content: "←";
 True margin-left: 5px;
 True}
 True
 True/* 使用伪元素创建清除浮动 */
 True.clearfix::after {
 True content: "";
 True display: table;
 True clear: both;
 True}
 True
 True/* 使用伪元素创建箭头 */
 True.arrow::after {
 True content: "";
 True border-width: 10px;
 True border-style: solid;
 True border-color: transparent transparent transparent #333;
 True position: absolute;
 True right: -20px;
 True top: 50%;
 True transform: translateY(-50%);
 True}
 True
 True/* 使用伪元素创建自定义列表标记 */
 True.custom-list li::before {
 True content: "•";
 True color: #3498db;
 True font-size: 18px;
 True margin-right: 10px;
 True}
 True```

 False**使用场景**：
 False
 False- 添加装饰性内容
 False- 创建自定义图标和箭头
 False- 清除浮动
 False- 创建自定义列表标记
 False
 False### 4.2 `::first-letter` 和 `::first-line`
 False
 False`::first-letter` 和 `::first-line` 用于选择元素的首字母和首行：
 False
```css
 True/* 选择首字母 */
 True.article p::first-letter {
 True font-size: 2em;
 True font-weight: bold;
 True color: #3498db;
 True float: left;
 True margin-right: 10px;
 True}
 True
 True/* 选择首行 */
 True.article p::first-line {
 True font-weight: bold;
 True color: #2c3e50;
 True}
 True```

 False**使用场景**：
 False
 False- 创建首字母大写效果
 False- 为段落首行应用特殊样式
 False
 False### 4.3 `::selection`
 False
 False`::selection` 用于选择用户选中的文本：
 False
```css
 True/* 为选中的文本应用样式 */
 True::selection {
 True background-color: #3498db;
 True color: white;
 True}
 True
 True/* 为特定元素内选中的文本应用样式 */
 True.article ::selection {
 True background-color: #2ecc71;
 True color: white;
 True}
 True```

 False**使用场景**：
 False
 False- 为用户选中的文本提供视觉反馈
 False- 增强用户体验
 False
 False### 4.4 `::placeholder`
 False
 False`::placeholder` 用于选择表单元素的占位符文本：
 False
```css
 True/* 为占位符文本应用样式 */
 Trueinput::placeholder {
 True color: #95a5a6;
 True font-style: italic;
 True}
 True
 True/* 为特定类型的输入框占位符应用样式 */
 Trueinput[type="email"]::placeholder {
 True color: #e74c3c;
 True}
 True```

 False**使用场景**：
 False
 False- 为表单占位符文本应用样式
 False- 提高表单的可读性
 False
 False### 4.5 其他伪元素
 False
```css
 True/* 选择进度条的填充部分 */
 Trueprogress::progress-bar {
 True background-color: #3498db;
 True}
 True
 True/* 选择进度条的轨道部分 */
 Trueprogress::progress-value {
 True background-color: #2ecc71;
 True}
 True
 True/* 选择滑动条的拇指 */
 Trueinput[type="range"]::thumb {
 True background-color: #3498db;
 True border: none;
 True border-radius: 50%;
 True width: 16px;
 True height: 16px;
 True cursor: pointer;
 True}
 True
 True/* 选择滑动条的轨道 */
 Trueinput[type="range"]::track {
 True background-color: #bdc3c7;
 True height: 4px;
 True border-radius: 2px;
 True}
 True```

 False**使用场景**：
 False
 False- 为表单控件的特定部分应用样式
 False- 创建自定义表单控件
 False
 False## 5. 选择器优先级
 False
 False选择器优先级决定了多个样式规则应用时的顺序。
 False
 False### 5.1 优先级计算规则
 False
 False选择器的优先级由以下因素决定，按从高到低的顺序：
 False
 False1. **!important** 声明（最高优先级）
 False2. 行内样式（权重：1000）
 False3. ID 选择器（权重：100）
 False4. 类选择器、伪类选择器、属性选择器（权重：10）
 False5. 元素选择器、伪元素选择器（权重：1）
 False6. 通配符选择器、后代选择器、相邻兄弟选择器（权重：0）
 False
 False### 5.2 优先级示例
 False
```css
 True/* 权重：1 (元素选择器) */
 Truediv {
 True color: blue;
 True}
 True
 True/* 权重：10 (类选择器) */
 True.container {
 True color: red;
 True}
 True
 True/* 权重：100 (ID 选择器) */
 True#main {
 True color: green;
 True}
 True
 True/* 权重：101 (ID 选择器 + 元素选择器) */
 True#main div {
 True color: purple;
 True}
 True
 True/* 权重：20 (两个类选择器) */
 True.container .box {
 True color: orange;
 True}
 True
 True/* 行内样式：权重 1000 */
 True/* <div style="color: black;"> */
 True
 True/* !important：最高优先级 */
 Truediv {
 True color: yellow !important;
 True}
 True```

 False**使用场景**：
 False
 False- 理解样式覆盖的规则
 False- 避免样式冲突
 False- 合理组织样式代码
 False
 False## 6. 选择器性能
 False
 False选择器的性能影响页面的渲染速度，应注意优化。
 False
 False### 6.1 性能影响因素
 False
 False- **选择器复杂度**：复杂的选择器需要更多的计算时间
 False- **选择器特异性**：更具体的选择器性能更好
 False- **选择器匹配顺序**：CSS 选择器从右到左匹配
 False
 False### 6.2 性能优化建议
 False
```css
 True/* 不良实践：复杂的后代选择器 */
 True.header .nav .menu .menu-item .link {
 True color: #333;
 True}
 True
 True/* 良好实践：简单的类选择器 */
 True.menu-link {
 True color: #333;
 True}
 True
 True/* 不良实践：使用通配符选择器 */
 True* {
 True margin: 0;
 True padding: 0;
 True}
 True
 True/* 良好实践：针对性选择 */
 Truebody, html, div, p, h1, h2, h3, h4, h5, h6, ul, ol, li {
 True margin: 0;
 True padding: 0;
 True}
 True
 True/* 不良实践：使用属性选择器进行复杂匹配 */
 Trueinput[type="text"][class~="form-control"] {
 True border: 1px solid #ddd;
 True}
 True
 True/* 良好实践：使用类选择器 */
 True.form-control {
 True border: 1px solid #ddd;
 True}
 True```

 False**性能优化技巧**：
 False
 False- 尽量使用简单的选择器
 False- 避免过度使用后代选择器
 False- 避免使用通配符选择器
 False- 合理使用类选择器
 False- 避免使用复杂的属性选择器
 False
 False## 7. 最佳实践
 False
 False### 7.1 命名规范
 False
 False推荐使用 BEM (Block, Element, Modifier) 命名规范：
 False
```css
 True/* Block */
 True.button {
 True padding: 10px 20px;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True}
 True
 True/* Element */
 True.button__icon {
 True margin-right: 8px;
 True font-size: 16px;
 True}
 True
 True/* Modifier */
 True.button--primary {
 True background-color: #3498db;
 True color: white;
 True}
 True
 True.button--secondary {
 True background-color: #95a5a6;
 True color: white;
 True}
 True
 True.button--large {
 True padding: 12px 24px;
 True font-size: 16px;
 True}
 True
 True.button--small {
 True padding: 8px 16px;
 True font-size: 14px;
 True}
 True```

 False**BEM 命名规则**：
 False
 False- Block：独立的、可重用的组件
 False- Element：Block 的一部分，不能独立存在
 False- Modifier：修改 Block 或 Element 的样式
 False
 False### 7.2 代码组织
 False
 False- **按功能组织**：将相关的样式放在一起
 False- **使用注释**：为不同的部分添加注释
 False- **模块化**：将样式按模块分离
 False
```css
 True/* 重置样式 */
 True* {
 True margin: 0;
 True padding: 0;
 True box-sizing: border-box;
 True}
 True
 True/* 全局变量 */
 True:root {
 True --primary-color: #3498db;
 True --secondary-color: #2ecc71;
 True --text-color: #333;
 True --background-color: #f8f9fa;
 True}
 True
 True/* 布局样式 */
 True.container {
 True width: 100%;
 True max-width: 1200px;
 True margin: 0 auto;
 True padding: 0 20px;
 True}
 True
 True/* 组件样式 */
 True.button {
 True /* 按钮样式 */
 True}
 True
 True.card {
 True /* 卡片样式 */
 True}
 True
 True/* 响应式样式 */
 True@media (max-width: 768px) {
 True .container {
 True padding: 0 10px;
 True }
 True 
 True .button {
 True padding: 8px 16px;
 True }
 True}
 True```

 False### 7.3 可读性
 False
 False- **缩进**：使用一致的缩进
 False- **空格**：在选择器和大括号之间添加空格
 False- **换行**：每个属性占一行
 False- **注释**：为复杂的样式添加注释
 False
```css
 True/* 良好的可读性 */
 True.header {
 True background-color: #f8f9fa;
 True padding: 20px;
 True box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 True}
 True
 True.header__logo {
 True font-size: 24px;
 True font-weight: bold;
 True color: var(--primary-color);
 True}
 True
 True.header__nav {
 True display: flex;
 True gap: 20px;
 True}
 True
 True/* 不良的可读性 */
 True.header{background-color:#f8f9fa;padding:20px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}
 True.header__logo{font-size:24px;font-weight:bold;color:var(--primary-color);}
 True.header__nav{display:flex;gap:20px;}
 True```

 False## 8. 实际应用示例
 False
 False### 8.1 示例 1：导航菜单
 False
```html
 True<nav class="nav">
 True <ul class="nav__list">
 True <li class="nav__item"><a href="#" class="nav__link">首页</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">关于我们</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">产品</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">联系我们</a></li>
 True </ul>
 True</nav>
 True```

```css
 True.nav {
 True background-color: #333;
 True padding: 10px 0;
 True}
 True
 True.nav__list {
 True list-style: none;
 True display: flex;
 True justify-content: center;
 True gap: 20px;
 True}
 True
 True.nav__item {
 True position: relative;
 True}
 True
 True.nav__link {
 True color: white;
 True text-decoration: none;
 True padding: 10px 15px;
 True display: block;
 True transition: color 0.3s ease;
 True}
 True
 True.nav__link:hover {
 True color: #3498db;
 True}
 True
 True/* 为第一个和最后一个链接添加特殊样式 */
 True.nav__item:first-child .nav__link {
 True font-weight: bold;
 True}
 True
 True.nav__item:last-child .nav__link {
 True background-color: #3498db;
 True border-radius: 4px;
 True}
 True
 True/* 为激活的链接添加样式 */
 True.nav__link.active {
 True color: #3498db;
 True border-bottom: 2px solid #3498db;
 True}
 True```

 False### 8.2 示例 2：表单样式
 False
```html
 True<form class="form">
 True <div class="form__group">
 True <label for="name" class="form__label">姓名</label>
 True <input type="text" id="name" class="form__input" required>
 True </div>
 True <div class="form__group">
 True <label for="email" class="form__label">邮箱</label>
 True <input type="email" id="email" class="form__input" required>
 True </div>
 True <div class="form__group">
 True <label for="message" class="form__label">留言</label>
 True <textarea id="message" class="form__textarea" required></textarea>
 True </div>
 True <button type="submit" class="form__button">提交</button>
 True</form>
 True```

```css
 True.form {
 True max-width: 600px;
 True margin: 0 auto;
 True padding: 20px;
 True background-color: #f8f9fa;
 True border-radius: 8px;
 True}
 True
 True.form__group {
 True margin-bottom: 20px;
 True}
 True
 True.form__label {
 True display: block;
 True margin-bottom: 5px;
 True font-weight: bold;
 True color: #333;
 True}
 True
 True.form__input,
 True.form__textarea {
 True width: 100%;
 True padding: 10px;
 True border: 1px solid #ddd;
 True border-radius: 4px;
 True font-size: 16px;
 True transition: border-color 0.3s ease;
 True}
 True
 True.form__input:focus,
 True.form__textarea:focus {
 True outline: none;
 True border-color: #3498db;
 True box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
 True}
 True
 True.form__input:required,
 True.form__textarea:required {
 True border-left: 3px solid #e74c3c;
 True}
 True
 True.form__input:valid,
 True.form__textarea:valid {
 True border-left: 3px solid #27ae60;
 True}
 True
 True.form__button {
 True background-color: #3498db;
 True color: white;
 True border: none;
 True padding: 12px 24px;
 True border-radius: 4px;
 True font-size: 16px;
 True cursor: pointer;
 True transition: background-color 0.3s ease;
 True}
 True
 True.form__button:hover {
 True background-color: #2980b9;
 True}
 True
 True.form__button:active {
 True background-color: #1f618d;
 True}
 True```

 False### 8.3 示例 3：卡片布局
 False
```html
 True<div class="card-container">
 True <div class="card">
 True <div class="card__image">
 True <img src="image1.jpg" alt="Card Image">
 True </div>
 True <div class="card__content">
 True <h3 class="card__title">卡片标题 1</h3>
 True <p class="card__text">这是卡片内容，描述卡片的详细信息。</p>
 True <a href="#" class="card__link">查看详情</a>
 True </div>
 True </div>
 True <div class="card">
 True <div class="card__image">
 True <img src="image2.jpg" alt="Card Image">
 True </div>
 True <div class="card__content">
 True <h3 class="card__title">卡片标题 2</h3>
 True <p class="card__text">这是卡片内容，描述卡片的详细信息。</p>
 True <a href="#" class="card__link">查看详情</a>
 True </div>
 True </div>
 True <div class="card">
 True <div class="card__image">
 True <img src="image3.jpg" alt="Card Image">
 True </div>
 True <div class="card__content">
 True <h3 class="card__title">卡片标题 3</h3>
 True <p class="card__text">这是卡片内容，描述卡片的详细信息。</p>
 True <a href="#" class="card__link">查看详情</a>
 True </div>
 True </div>
 True</div>
 True```

```css
 True.card-container {
 True display: grid;
 True grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 True gap: 20px;
 True padding: 20px;
 True}
 True
 True.card {
 True background-color: white;
 True border-radius: 8px;
 True overflow: hidden;
 True box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 True transition: transform 0.3s ease, box-shadow 0.3s ease;
 True}
 True
 True.card:hover {
 True transform: translateY(-5px);
 True box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
 True}
 True
 True.card__image {
 True height: 200px;
 True overflow: hidden;
 True}
 True
 True.card__image img {
 True width: 100%;
 True height: 100%;
 True object-fit: cover;
 True transition: transform 0.3s ease;
 True}
 True
 True.card:hover .card__image img {
 True transform: scale(1.05);
 True}
 True
 True.card__content {
 True padding: 20px;
 True}
 True
 True.card__title {
 True margin-bottom: 10px;
 True font-size: 20px;
 True color: #333;
 True}
 True
 True.card__text {
 True margin-bottom: 15px;
 True color: #666;
 True line-height: 1.5;
 True}
 True
 True.card__link {
 True display: inline-block;
 True color: #3498db;
 True text-decoration: none;
 True font-weight: bold;
 True transition: color 0.3s ease;
 True}
 True
 True.card__link:hover {
 True color: #2980b9;
 True text-decoration: underline;
 True}
 True
 True/* 为第一个卡片添加特殊样式 */
 True.card:first-child {
 True border: 2px solid #3498db;
 True}
 True
 True/* 为最后一个卡片添加特殊样式 */
 True.card:last-child {
 True background-color: #f8f9fa;
 True}
 True```

 False## 9. 总结
 False
 FalseCSS 选择器系统是 CSS 的核心组成部分，提供了强大的元素选择能力：
 False
 False- **基础选择器**：通配符、标签、类、ID 和属性选择器，用于选择基本元素。
 False- **组合选择器**：后代、子代、相邻兄弟和通用兄弟选择器，用于选择具有特定关系的元素。
 False- **伪类选择器**：状态、结构、表单等伪类，用于选择处于特定状态或位置的元素。
 False- **伪元素选择器**：`::before`、`::after`、`::first-letter` 等，用于选择元素的特定部分。
 False- **选择器优先级**：基于权重计算，决定样式的应用顺序。
 False- **选择器性能**：合理使用选择器，优化页面渲染速度。
 False- **最佳实践**：使用 BEM 命名规范，组织代码结构，提高可读性。
 False
 False通过掌握 CSS 选择器系统，开发者可以更加灵活地控制页面样式，创建美观、响应式的网页设计。选择器的合理使用不仅可以提高代码的可维护性，还可以优化页面的性能。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化选择器分类与 BEM 命名规范。
 False- 2026-04-06: 扩写详细内容，增加选择器优先级、性能优化、实际应用示例等章节。
 False