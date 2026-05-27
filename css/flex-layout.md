# CSS3 Flexbox 弹性布局 (Flexbox Layout)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: CSS Basics
 False> @Description: 弹性盒子模型核心概念、容器属性及项目属性全解析。 | Flexbox core concepts, container, and item properties.
 False
 False---
 False
 False## 目录
 False
 False1. [目录](#目录)
 False1. [核心概念](#核心概念)
 False1. [容器属性](#容器属性)
 False1. [项目属性](#项目属性)
 False1. [常见应用场景](#常见应用场景)
 False1. [响应式设计](#响应式设计)
 False1. [性能优化](#性能优化)
 False1. [浏览器兼容性](#浏览器兼容性)
 False1. [最佳实践](#最佳实践)
 False1. [实际应用示例](#实际应用示例)
 False1. [总结](#总结)
 False
 False---
 False
 False## 1. 目录
 False
 False- [1. 核心概念](#1-核心概念)
 False - [1.1 Flex Container](#11-flex-container)
 False - [1.2 Flex Item](#12-flex-item)
 False - [1.3 主轴与侧轴](#13-主轴与侧轴)
 False - [1.4 弹性容器的创建](#14-弹性容器的创建)
 False- [2. 容器属性](#2-容器属性)
 False - [2.1 flex-direction](#21-flex-direction)
 False - [2.2 justify-content](#22-justify-content)
 False - [2.3 align-items](#23-align-items)
 False - [2.4 flex-wrap](#24-flex-wrap)
 False - [2.5 flex-flow](#25-flex-flow)
 False - [2.6 align-content](#26-align-content)
 False- [3. 项目属性](#3-项目属性)
 False - [3.1 flex-grow](#31-flex-grow)
 False - [3.2 flex-shrink](#32-flex-shrink)
 False - [3.3 flex-basis](#33-flex-basis)
 False - [3.4 flex](#34-flex)
 False - [3.5 align-self](#35-align-self)
 False - [3.6 order](#36-order)
 False- [4. 常见应用场景](#4-常见应用场景)
 False - [4.1 垂直水平居中](#41-垂直水平居中)
 False - [4.2 等高布局](#42-等高布局)
 False - [4.3 导航菜单](#43-导航菜单)
 False - [4.4 卡片布局](#44-卡片布局)
 False - [4.5 响应式布局](#45-响应式布局)
 False - [4.6 表单布局](#46-表单布局)
 False - [4.7 网格系统](#47-网格系统)
 False- [5. 响应式设计](#5-响应式设计)
 False - [5.1 媒体查询与 Flexbox](#51-媒体查询与-flexbox)
 False - [5.2 响应式导航示例](#52-响应式导航示例)
 False- [6. 性能优化](#6-性能优化)
 False - [6.1 减少重排](#61-减少重排)
 False - [6.2 合理使用属性](#62-合理使用属性)
 False- [7. 浏览器兼容性](#7-浏览器兼容性)
 False - [7.1 支持情况](#71-支持情况)
 False - [7.2 前缀使用](#72-前缀使用)
 False- [8. 最佳实践](#8-最佳实践)
 False - [8.1 代码组织](#81-代码组织)
 False - [8.2 命名规范](#82-命名规范)
 False - [8.3 常见问题与解决方案](#83-常见问题与解决方案)
 False- [9. 实际应用示例](#9-实际应用示例)
 False- [10. 总结](#10-总结)
 False
 False## 1. 核心概念
 False
 FalseFlexbox（弹性盒子）是一种一维布局模型，旨在提供一种更高效的方式来布局、对齐和分配容器中项目之间的空间。
 False
 False### 1.1 Flex Container
 False
 FalseFlex Container（弹性容器）是通过设置 `display: flex` 或 `display: inline-flex` 创建的元素。它是所有 Flex Item（弹性项目）的直接父元素。
 False
```css
 True/* 创建块级弹性容器 */
 True.container {
 True display: flex;
 True}
 True
 True/* 创建内联弹性容器 */
 True.inline-container {
 True display: inline-flex;
 True}
 True```

 False### 1.2 Flex Item
 False
 FalseFlex Item（弹性项目）是弹性容器的直接子元素。即使是文本节点也会被视为弹性项目。
 False
```html
 True<div class="container">
 True <div class="item">Item 1</div> <!-- 弹性项目 -->
 True <div class="item">Item 2</div> <!-- 弹性项目 -->
 True <div class="item">Item 3</div> <!-- 弹性项目 -->
 True</div>
 True```

 False### 1.3 主轴与侧轴
 False
 False- **主轴 (Main Axis)**：弹性项目排列的主要方向，默认为水平方向（从左到右）。
 False- **侧轴 (Cross Axis)**：与主轴垂直的轴，默认为垂直方向（从上到下）。
 False
 False主轴和侧轴的方向由 `flex-direction` 属性决定。
 False
 False### 1.4 弹性容器的创建
 False
 False通过设置 `display: flex` 或 `display: inline-flex` 来创建弹性容器。
 False
```css
 True/* 块级弹性容器 */
 True.flex-container {
 True display: flex;
 True /* 其他容器属性 */
 True}
 True
 True/* 内联弹性容器 */
 True.inline-flex-container {
 True display: inline-flex;
 True /* 其他容器属性 */
 True}
 True```

 False## 2. 容器属性
 False
 False### 2.1 flex-direction
 False
 False`flex-direction` 属性定义了弹性容器的主轴方向。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `row` | 主轴为水平方向，从左到右（默认） |
 False| `row-reverse` | 主轴为水平方向，从右到左 |
 False| `column` | 主轴为垂直方向，从上到下 |
 False| `column-reverse` | 主轴为垂直方向，从下到上 |
 False
```css
 True/* 水平方向（默认） */
 True.container {
 True display: flex;
 True flex-direction: row;
 True}
 True
 True/* 垂直方向 */
 True.container {
 True display: flex;
 True flex-direction: column;
 True}
 True
 True/* 水平反向 */
 True.container {
 True display: flex;
 True flex-direction: row-reverse;
 True}
 True
 True/* 垂直反向 */
 True.container {
 True display: flex;
 True flex-direction: column-reverse;
 True}
 True```

 False### 2.2 justify-content
 False
 False`justify-content` 属性定义了弹性项目在主轴上的对齐方式。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `flex-start` | 项目对齐到主轴的起始位置（默认） |
 False| `flex-end` | 项目对齐到主轴的结束位置 |
 False| `center` | 项目在主轴上居中对齐 |
 False| `space-between` | 项目之间均匀分布，两端对齐 |
 False| `space-around` | 项目之间均匀分布，两端有间距 |
 False| `space-evenly` | 项目之间和两端都均匀分布 |
 False
```css
 True/* 主轴起始对齐 */
 True.container {
 True display: flex;
 True justify-content: flex-start;
 True}
 True
 True/* 主轴居中对齐 */
 True.container {
 True display: flex;
 True justify-content: center;
 True}
 True
 True/* 项目均匀分布 */
 True.container {
 True display: flex;
 True justify-content: space-between;
 True}
 True
 True/* 项目均匀分布，两端有间距 */
 True.container {
 True display: flex;
 True justify-content: space-around;
 True}
 True
 True/* 项目均匀分布，两端和中间间距相等 */
 True.container {
 True display: flex;
 True justify-content: space-evenly;
 True}
 True```

 False### 2.3 align-items
 False
 False`align-items` 属性定义了弹性项目在侧轴上的对齐方式。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `stretch` | 项目拉伸以填充容器（默认） |
 False| `flex-start` | 项目对齐到侧轴的起始位置 |
 False| `flex-end` | 项目对齐到侧轴的结束位置 |
 False| `center` | 项目在侧轴上居中对齐 |
 False| `baseline` | 项目以基线对齐 |
 False
```css
 True/* 侧轴拉伸对齐（默认） */
 True.container {
 True display: flex;
 True align-items: stretch;
 True}
 True
 True/* 侧轴起始对齐 */
 True.container {
 True display: flex;
 True align-items: flex-start;
 True}
 True
 True/* 侧轴居中对齐 */
 True.container {
 True display: flex;
 True align-items: center;
 True}
 True
 True/* 侧轴结束对齐 */
 True.container {
 True display: flex;
 True align-items: flex-end;
 True}
 True
 True/* 基线对齐 */
 True.container {
 True display: flex;
 True align-items: baseline;
 True}
 True```

 False### 2.4 flex-wrap
 False
 False`flex-wrap` 属性定义了弹性项目是否换行。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `nowrap` | 不换行，项目在同一行（默认） |
 False| `wrap` | 换行，项目在多行显示 |
 False| `wrap-reverse` | 换行，项目在多行显示，但顺序相反 |
 False
```css
 True/* 不换行（默认） */
 True.container {
 True display: flex;
 True flex-wrap: nowrap;
 True}
 True
 True/* 换行 */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True}
 True
 True/* 反向换行 */
 True.container {
 True display: flex;
 True flex-wrap: wrap-reverse;
 True}
 True```

 False### 2.5 flex-flow
 False
 False`flex-flow` 是 `flex-direction` 和 `flex-wrap` 的复合属性。
 False
```css
 True/* 水平方向，不换行（默认） */
 True.container {
 True display: flex;
 True flex-flow: row nowrap;
 True}
 True
 True/* 垂直方向，换行 */
 True.container {
 True display: flex;
 True flex-flow: column wrap;
 True}
 True```

 False### 2.6 align-content
 False
 False`align-content` 属性定义了多行弹性项目在侧轴上的对齐方式。仅在 `flex-wrap: wrap` 或 `flex-wrap: wrap-reverse` 时有效。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `stretch` | 多行拉伸以填充容器（默认） |
 False| `flex-start` | 多行对齐到侧轴的起始位置 |
 False| `flex-end` | 多行对齐到侧轴的结束位置 |
 False| `center` | 多行在侧轴上居中对齐 |
 False| `space-between` | 多行之间均匀分布，两端对齐 |
 False| `space-around` | 多行之间均匀分布，两端有间距 |
 False
```css
 True/* 多行拉伸对齐（默认） */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True align-content: stretch;
 True}
 True
 True/* 多行居中对齐 */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True align-content: center;
 True}
 True
 True/* 多行均匀分布 */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True align-content: space-between;
 True}
 True```

 False## 3. 项目属性
 False
 False### 3.1 flex-grow
 False
 False`flex-grow` 属性定义了弹性项目的放大比例，默认为 0。
 False
```css
 True/* 项目不放大（默认） */
 True.item {
 True flex-grow: 0;
 True}
 True
 True/* 项目放大比例为 1 */
 True.item {
 True flex-grow: 1;
 True}
 True
 True/* 不同项目的放大比例 */
 True.item-1 {
 True flex-grow: 1;
 True}
 True
 True.item-2 {
 True flex-grow: 2;
 True}
 True
 True.item-3 {
 True flex-grow: 1;
 True}
 True```

 False### 3.2 flex-shrink
 False
 False`flex-shrink` 属性定义了弹性项目的缩小比例，默认为 1。
 False
```css
 True/* 项目可以缩小（默认） */
 True.item {
 True flex-shrink: 1;
 True}
 True
 True/* 项目不可缩小 */
 True.item {
 True flex-shrink: 0;
 True}
 True
 True/* 不同项目的缩小比例 */
 True.item-1 {
 True flex-shrink: 1;
 True}
 True
 True.item-2 {
 True flex-shrink: 2;
 True}
 True
 True.item-3 {
 True flex-shrink: 1;
 True}
 True```

 False### 3.3 flex-basis
 False
 False`flex-basis` 属性定义了弹性项目的初始大小，默认为 `auto`。
 False
```css
 True/* 初始大小为 auto（默认） */
 True.item {
 True flex-basis: auto;
 True}
 True
 True/* 初始大小为 200px */
 True.item {
 True flex-basis: 200px;
 True}
 True
 True/* 初始大小为 50% */
 True.item {
 True flex-basis: 50%;
 True}
 True```

 False### 3.4 flex
 False
 False`flex` 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的复合属性。
 False
```css
 True/* 默认值：0 1 auto */
 True.item {
 True flex: 0 1 auto;
 True}
 True
 True/* 推荐使用：等比分配空间 */
 True.item {
 True flex: 1;
 True}
 True
 True/* 不缩小，初始大小为 200px */
 True.item {
 True flex: 0 0 200px;
 True}
 True
 True/* 放大比例为 2，缩小比例为 1，初始大小为 100px */
 True.item {
 True flex: 2 1 100px;
 True}
 True```

 False### 3.5 align-self
 False
 False`align-self` 属性定义了单个弹性项目在侧轴上的对齐方式，覆盖容器的 `align-items` 属性。
 False
 False| 值 | 描述 |
 False|----|------|
 False| `auto` | 继承容器的 `align-items` 属性（默认） |
 False| `stretch` | 项目拉伸以填充容器 |
 False| `flex-start` | 项目对齐到侧轴的起始位置 |
 False| `flex-end` | 项目对齐到侧轴的结束位置 |
 False| `center` | 项目在侧轴上居中对齐 |
 False| `baseline` | 项目以基线对齐 |
 False
```css
 True/* 继承容器的 align-items 属性（默认） */
 True.item {
 True align-self: auto;
 True}
 True
 True/* 单个项目在侧轴上居中对齐 */
 True.item {
 True align-self: center;
 True}
 True
 True/* 单个项目在侧轴上起始对齐 */
 True.item {
 True align-self: flex-start;
 True}
 True
 True/* 单个项目在侧轴上结束对齐 */
 True.item {
 True align-self: flex-end;
 True}
 True```

 False### 3.6 order
 False
 False`order` 属性定义了弹性项目的排列顺序，默认为 0。值越小，排列越靠前。
 False
```css
 True/* 默认顺序 */
 True.item {
 True order: 0;
 True}
 True
 True/* 不同项目的顺序 */
 True.item-1 {
 True order: 3;
 True}
 True
 True.item-2 {
 True order: 1;
 True}
 True
 True.item-3 {
 True order: 2;
 True}
 True```

 False## 4. 常见应用场景
 False
 False### 4.1 垂直水平居中
 False
```css
 True/* 垂直水平居中 */
 True.container {
 True display: flex;
 True justify-content: center;
 True align-items: center;
 True height: 300px;
 True}
 True
 True.item {
 True width: 100px;
 True height: 100px;
 True background-color: #3498db;
 True}
 True```

 False### 4.2 等高布局
 False
```css
 True/* 等高布局 */
 True.container {
 True display: flex;
 True}
 True
 True.item {
 True flex: 1;
 True padding: 20px;
 True border: 1px solid #ddd;
 True margin: 10px;
 True}
 True```

 False### 4.3 导航菜单
 False
```css
 True/* 导航菜单 */
 True.nav {
 True display: flex;
 True justify-content: space-between;
 True background-color: #333;
 True padding: 10px;
 True}
 True
 True.nav__logo {
 True color: white;
 True font-size: 20px;
 True font-weight: bold;
 True}
 True
 True.nav__menu {
 True display: flex;
 True list-style: none;
 True margin: 0;
 True padding: 0;
 True}
 True
 True.nav__item {
 True margin-left: 20px;
 True}
 True
 True.nav__link {
 True color: white;
 True text-decoration: none;
 True padding: 5px 10px;
 True transition: color 0.3s ease;
 True}
 True
 True.nav__link:hover {
 True color: #3498db;
 True}
 True```

 False### 4.4 卡片布局
 False
```css
 True/* 卡片布局 */
 True.card-container {
 True display: flex;
 True flex-wrap: wrap;
 True gap: 20px;
 True padding: 20px;
 True}
 True
 True.card {
 True flex: 1 1 300px;
 True background-color: white;
 True border-radius: 8px;
 True box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 True padding: 20px;
 True}
 True
 True.card__title {
 True font-size: 18px;
 True font-weight: bold;
 True margin-bottom: 10px;
 True}
 True
 True.card__content {
 True color: #666;
 True line-height: 1.5;
 True}
 True```

 False### 4.5 响应式布局
 False
```css
 True/* 响应式布局 */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True}
 True
 True.item {
 True flex: 1 1 200px;
 True margin: 10px;
 True padding: 20px;
 True background-color: #f0f0f0;
 True border-radius: 4px;
 True}
 True
 True@media (max-width: 768px) {
 True .item {
 True flex: 1 1 100%;
 True }
 True}
 True```

 False### 4.6 表单布局
 False
```css
 True/* 表单布局 */
 True.form {
 True display: flex;
 True flex-direction: column;
 True gap: 15px;
 True max-width: 500px;
 True margin: 0 auto;
 True padding: 20px;
 True background-color: #f8f9fa;
 True border-radius: 8px;
 True}
 True
 True.form__group {
 True display: flex;
 True flex-direction: column;
 True gap: 5px;
 True}
 True
 True.form__label {
 True font-weight: bold;
 True color: #333;
 True}
 True
 True.form__input {
 True padding: 10px;
 True border: 1px solid #ddd;
 True border-radius: 4px;
 True font-size: 16px;
 True}
 True
 True.form__button {
 True padding: 10px 20px;
 True background-color: #3498db;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True font-size: 16px;
 True cursor: pointer;
 True transition: background-color 0.3s ease;
 True}
 True
 True.form__button:hover {
 True background-color: #2980b9;
 True}
 True```

 False### 4.7 网格系统
 False
```css
 True/* 网格系统 */
 True.grid {
 True display: flex;
 True flex-wrap: wrap;
 True margin: -10px;
 True}
 True
 True.grid__item {
 True flex: 1 1 25%;
 True padding: 10px;
 True box-sizing: border-box;
 True}
 True
 True.grid__content {
 True background-color: #f0f0f0;
 True padding: 20px;
 True border-radius: 4px;
 True height: 100%;
 True}
 True
 True@media (max-width: 992px) {
 True .grid__item {
 True flex: 1 1 33.333%;
 True }
 True}
 True
 True@media (max-width: 768px) {
 True .grid__item {
 True flex: 1 1 50%;
 True }
 True}
 True
 True@media (max-width: 480px) {
 True .grid__item {
 True flex: 1 1 100%;
 True }
 True}
 True```

 False## 5. 响应式设计
 False
 False### 5.1 媒体查询与 Flexbox
 False
 FalseFlexbox 与媒体查询结合使用，可以创建响应式布局。
 False
```css
 True/* 基础布局 */
 True.container {
 True display: flex;
 True flex-wrap: wrap;
 True gap: 20px;
 True}
 True
 True.item {
 True flex: 1 1 300px;
 True}
 True
 True/* 响应式调整 */
 True@media (max-width: 992px) {
 True .item {
 True flex: 1 1 250px;
 True }
 True}
 True
 True@media (max-width: 768px) {
 True .item {
 True flex: 1 1 100%;
 True }
 True}
 True
 True@media (max-width: 480px) {
 True .container {
 True flex-direction: column;
 True }
 True 
 True .item {
 True flex: 1 1 auto;
 True }
 True}
 True```

 False### 5.2 响应式导航示例
 False
```css
 True/* 响应式导航 */
 True.nav {
 True display: flex;
 True justify-content: space-between;
 True align-items: center;
 True background-color: #333;
 True padding: 10px 20px;
 True}
 True
 True.nav__logo {
 True color: white;
 True font-size: 20px;
 True font-weight: bold;
 True}
 True
 True.nav__menu {
 True display: flex;
 True list-style: none;
 True margin: 0;
 True padding: 0;
 True}
 True
 True.nav__item {
 True margin-left: 20px;
 True}
 True
 True.nav__link {
 True color: white;
 True text-decoration: none;
 True padding: 5px 10px;
 True transition: color 0.3s ease;
 True}
 True
 True.nav__link:hover {
 True color: #3498db;
 True}
 True
 True/* 移动端菜单按钮 */
 True.nav__toggle {
 True display: none;
 True color: white;
 True font-size: 24px;
 True cursor: pointer;
 True}
 True
 True/* 响应式调整 */
 True@media (max-width: 768px) {
 True .nav__toggle {
 True display: block;
 True }
 True 
 True .nav__menu {
 True position: absolute;
 True top: 60px;
 True left: 0;
 True width: 100%;
 True background-color: #333;
 True flex-direction: column;
 True align-items: center;
 True padding: 20px 0;
 True display: none;
 True }
 True 
 True .nav__menu.active {
 True display: flex;
 True }
 True 
 True .nav__item {
 True margin: 10px 0;
 True }
 True}
 True```

 False## 6. 性能优化
 False
 False### 6.1 减少重排
 False
 False- **避免频繁修改布局属性**：尽量一次性修改多个属性，减少浏览器重排次数。
 False- **使用 transform 代替 top/left**：transform 不会触发重排，性能更好。
 False- **使用 will-change**：提前告知浏览器元素可能发生变化，优化渲染。
 False
```css
 True/* 优化前 */
 True.item {
 True position: relative;
 True left: 0;
 True transition: left 0.3s ease;
 True}
 True
 True.item:hover {
 True left: 10px;
 True}
 True
 True/* 优化后 */
 True.item {
 True will-change: transform;
 True transition: transform 0.3s ease;
 True}
 True
 True.item:hover {
 True transform: translateX(10px);
 True}
 True```

 False### 6.2 合理使用属性
 False
 False- **优先使用 flex 复合属性**：`flex: 1` 比单独设置 `flex-grow`, `flex-shrink`, `flex-basis` 更简洁。
 False- **避免过度嵌套**：减少 flex 容器的嵌套层级，提高渲染性能。
 False- **合理设置 flex-basis**：使用百分比或固定值，避免使用 `auto` 导致的计算开销。
 False
 False## 7. 浏览器兼容性
 False
 False### 7.1 支持情况
 False
 FalseFlexbox 在现代浏览器中得到了广泛支持，但在一些旧版本浏览器中可能需要使用前缀。
 False
 False| 浏览器 | 支持情况 |
 False|--------|----------|
 False| Chrome | 29+ |
 False| Firefox | 28+ |
 False| Safari | 9+ |
 False| Edge | 12+ |
 False| IE | 10+ (部分支持) |
 False
 False### 7.2 前缀使用
 False
 False在一些旧版本浏览器中，需要使用厂商前缀。
 False
```css
 True/* 带前缀的 Flexbox */
 True.container {
 True display: -webkit-flex; /* Safari */
 True display: flex;
 True 
 True -webkit-flex-direction: row; /* Safari */
 True flex-direction: row;
 True 
 True -webkit-justify-content: center; /* Safari */
 True justify-content: center;
 True 
 True -webkit-align-items: center; /* Safari */
 True align-items: center;
 True}
 True
 True.item {
 True -webkit-flex: 1; /* Safari */
 True flex: 1;
 True}
 True```

 False## 8. 最佳实践
 False
 False### 8.1 代码组织
 False
 False- **按功能组织**：将相关的样式放在一起。
 False- **使用注释**：为不同的部分添加注释。
 False- **模块化**：将样式按模块分离。
 False
 False### 8.2 命名规范
 False
 False推荐使用 BEM (Block, Element, Modifier) 命名规范：
 False
```css
 True/* Block */
 True.nav {
 True display: flex;
 True /* 导航样式 */
 True}
 True
 True/* Element */
 True.nav__menu {
 True display: flex;
 True /* 菜单样式 */
 True}
 True
 True/* Modifier */
 True.nav--responsive {
 True /* 响应式导航样式 */
 True}
 True```

 False### 8.3 常见问题与解决方案
 False
 False#### 问题 1：Flex 项目溢出容器
 False
 False**解决方案**：使用 `flex-wrap: wrap` 或设置合理的 `flex-basis`。
 False
 False#### 问题 2：IE 浏览器兼容性
 False
 False**解决方案**：使用厂商前缀，避免使用一些高级特性。
 False
 False#### 问题 3：垂直居中对齐问题
 False
 False**解决方案**：使用 `align-items: center` 或 `align-self: center`。
 False
 False#### 问题 4：Flex 项目大小不一致
 False
 False**解决方案**：使用 `flex: 1` 或设置相同的 `flex-basis`。
 False
 False## 9. 实际应用示例
 False
 False### 9.1 示例 1：网站头部布局
 False
```html
 True<header class="header">
 True <div class="header__logo">Logo</div>
 True <nav class="header__nav">
 True <ul class="nav__menu">
 True <li class="nav__item"><a href="#" class="nav__link">首页</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">关于我们</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">产品</a></li>
 True <li class="nav__item"><a href="#" class="nav__link">联系我们</a></li>
 True </ul>
 True </nav>
 True <div class="header__actions">
 True <button class="button">登录</button>
 True <button class="button button--primary">注册</button>
 True </div>
 True</header>
 True```

```css
 True.header {
 True display: flex;
 True justify-content: space-between;
 True align-items: center;
 True padding: 10px 20px;
 True background-color: #f8f9fa;
 True box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 True}
 True
 True.header__logo {
 True font-size: 24px;
 True font-weight: bold;
 True color: #3498db;
 True}
 True
 True.nav__menu {
 True display: flex;
 True list-style: none;
 True margin: 0;
 True padding: 0;
 True}
 True
 True.nav__item {
 True margin-left: 20px;
 True}
 True
 True.nav__link {
 True color: #333;
 True text-decoration: none;
 True padding: 5px 10px;
 True transition: color 0.3s ease;
 True}
 True
 True.nav__link:hover {
 True color: #3498db;
 True}
 True
 True.header__actions {
 True display: flex;
 True gap: 10px;
 True}
 True
 True.button {
 True padding: 8px 16px;
 True border: 1px solid #ddd;
 True border-radius: 4px;
 True background-color: white;
 True cursor: pointer;
 True transition: all 0.3s ease;
 True}
 True
 True.button--primary {
 True background-color: #3498db;
 True color: white;
 True border-color: #3498db;
 True}
 True
 True.button:hover {
 True opacity: 0.9;
 True}
 True
 True@media (max-width: 768px) {
 True .header {
 True flex-direction: column;
 True align-items: flex-start;
 True gap: 10px;
 True }
 True 
 True .nav__menu {
 True flex-direction: column;
 True width: 100%;
 True }
 True 
 True .nav__item {
 True margin: 5px 0;
 True }
 True 
 True .header__actions {
 True width: 100%;
 True justify-content: space-between;
 True }
 True}
 True```

 False### 9.2 示例 2：产品卡片网格
 False
```html
 True<div class="products">
 True <div class="product-card">
 True <div class="product-card__image">
 True <img src="product1.jpg" alt="Product 1">
 True </div>
 True <div class="product-card__content">
 True <h3 class="product-card__title">产品 1</h3>
 True <p class="product-card__description">这是产品 1 的描述</p>
 True <div class="product-card__footer">
 True <span class="product-card__price">¥100</span>
 True <button class="product-card__button">加入购物车</button>
 True </div>
 True </div>
 True </div>
 True <div class="product-card">
 True <div class="product-card__image">
 True <img src="product2.jpg" alt="Product 2">
 True </div>
 True <div class="product-card__content">
 True <h3 class="product-card__title">产品 2</h3>
 True <p class="product-card__description">这是产品 2 的描述</p>
 True <div class="product-card__footer">
 True <span class="product-card__price">¥200</span>
 True <button class="product-card__button">加入购物车</button>
 True </div>
 True </div>
 True </div>
 True <div class="product-card">
 True <div class="product-card__image">
 True <img src="product3.jpg" alt="Product 3">
 True </div>
 True <div class="product-card__content">
 True <h3 class="product-card__title">产品 3</h3>
 True <p class="product-card__description">这是产品 3 的描述</p>
 True <div class="product-card__footer">
 True <span class="product-card__price">¥300</span>
 True <button class="product-card__button">加入购物车</button>
 True </div>
 True </div>
 True </div>
 True <div class="product-card">
 True <div class="product-card__image">
 True <img src="product4.jpg" alt="Product 4">
 True </div>
 True <div class="product-card__content">
 True <h3 class="product-card__title">产品 4</h3>
 True <p class="product-card__description">这是产品 4 的描述</p>
 True <div class="product-card__footer">
 True <span class="product-card__price">¥400</span>
 True <button class="product-card__button">加入购物车</button>
 True </div>
 True </div>
 True </div>
 True</div>
 True```

```css
 True.products {
 True display: flex;
 True flex-wrap: wrap;
 True gap: 20px;
 True padding: 20px;
 True}
 True
 True.product-card {
 True flex: 1 1 250px;
 True background-color: white;
 True border-radius: 8px;
 True box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 True overflow: hidden;
 True transition: transform 0.3s ease, box-shadow 0.3s ease;
 True}
 True
 True.product-card:hover {
 True transform: translateY(-5px);
 True box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
 True}
 True
 True.product-card__image {
 True height: 200px;
 True overflow: hidden;
 True}
 True
 True.product-card__image img {
 True width: 100%;
 True height: 100%;
 True object-fit: cover;
 True transition: transform 0.3s ease;
 True}
 True
 True.product-card:hover .product-card__image img {
 True transform: scale(1.05);
 True}
 True
 True.product-card__content {
 True padding: 20px;
 True}
 True
 True.product-card__title {
 True font-size: 18px;
 True font-weight: bold;
 True margin-bottom: 10px;
 True color: #333;
 True}
 True
 True.product-card__description {
 True color: #666;
 True line-height: 1.5;
 True margin-bottom: 15px;
 True}
 True
 True.product-card__footer {
 True display: flex;
 True justify-content: space-between;
 True align-items: center;
 True}
 True
 True.product-card__price {
 True font-size: 20px;
 True font-weight: bold;
 True color: #e74c3c;
 True}
 True
 True.product-card__button {
 True padding: 8px 16px;
 True background-color: #3498db;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True transition: background-color 0.3s ease;
 True}
 True
 True.product-card__button:hover {
 True background-color: #2980b9;
 True}
 True
 True@media (max-width: 768px) {
 True .product-card {
 True flex: 1 1 100%;
 True }
 True}
 True```

 False### 9.3 示例 3：页脚布局
 False
```html
 True<footer class="footer">
 True <div class="footer__container">
 True <div class="footer__section">
 True <h3 class="footer__title">关于我们</h3>
 True <p class="footer__text">这是关于我们的描述，介绍公司的历史、使命和愿景。</p>
 True </div>
 True <div class="footer__section">
 True <h3 class="footer__title">快速链接</h3>
 True <ul class="footer__links">
 True <li><a href="#" class="footer__link">首页</a></li>
 True <li><a href="#" class="footer__link">关于我们</a></li>
 True <li><a href="#" class="footer__link">产品</a></li>
 True <li><a href="#" class="footer__link">联系我们</a></li>
 True </ul>
 True </div>
 True <div class="footer__section">
 True <h3 class="footer__title">联系我们</h3>
 True <ul class="footer__contact">
 True <li>电话：123-456-7890</li>
 True <li>邮箱：info@example.com</li>
 True <li>地址：北京市朝阳区</li>
 True </ul>
 True </div>
 True </div>
 True <div class="footer__bottom">
 True <p class="footer__copyright"> 2026 公司名称. 保留所有权利.</p>
 True </div>
 True</footer>
 True```

```css
 True.footer {
 True background-color: #333;
 True color: white;
 True padding: 40px 20px;
 True}
 True
 True.footer__container {
 True display: flex;
 True flex-wrap: wrap;
 True gap: 40px;
 True max-width: 1200px;
 True margin: 0 auto;
 True}
 True
 True.footer__section {
 True flex: 1 1 250px;
 True}
 True
 True.footer__title {
 True font-size: 18px;
 True font-weight: bold;
 True margin-bottom: 20px;
 True color: #3498db;
 True}
 True
 True.footer__text {
 True line-height: 1.5;
 True margin-bottom: 20px;
 True}
 True
 True.footer__links {
 True list-style: none;
 True margin: 0;
 True padding: 0;
 True}
 True
 True.footer__links li {
 True margin-bottom: 10px;
 True}
 True
 True.footer__link {
 True color: white;
 True text-decoration: none;
 True transition: color 0.3s ease;
 True}
 True
 True.footer__link:hover {
 True color: #3498db;
 True}
 True
 True.footer__contact {
 True list-style: none;
 True margin: 0;
 True padding: 0;
 True}
 True
 True.footer__contact li {
 True margin-bottom: 10px;
 True line-height: 1.5;
 True}
 True
 True.footer__bottom {
 True margin-top: 40px;
 True padding-top: 20px;
 True border-top: 1px solid #555;
 True text-align: center;
 True}
 True
 True.footer__copyright {
 True font-size: 14px;
 True color: #999;
 True}
 True
 True@media (max-width: 768px) {
 True .footer__section {
 True flex: 1 1 100%;
 True }
 True}
 True```

 False## 10. 总结
 False
 FalseFlexbox 是一种强大的一维布局模型，具有以下优势：
 False
 False- **简单易用**：通过简洁的属性即可实现复杂的布局。
 False- **灵活响应**：轻松创建响应式布局，适应不同屏幕尺寸。
 False- **对齐方便**：提供多种对齐方式，解决传统布局的对齐问题。
 False- **空间分配**：智能分配项目之间的空间，实现均匀分布。
 False- **等高布局**：默认实现等高效果，无需额外设置。
 False
 FalseFlexbox 的核心概念包括：
 False
 False- **弹性容器**：通过 `display: flex` 创建。
 False- **弹性项目**：容器的直接子元素。
 False- **主轴与侧轴**：控制项目的排列方向。
 False- **容器属性**：控制整体布局，如 `flex-direction`, `justify-content`, `align-items` 等。
 False- **项目属性**：控制单个项目的行为，如 `flex-grow`, `flex-shrink`, `flex-basis` 等。
 False
 False通过掌握 Flexbox，开发者可以更加灵活地控制页面布局，创建美观、响应式的网页设计。Flexbox 不仅简化了布局代码，还提高了开发效率，是现代前端开发中不可或缺的布局工具。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 体系化整合 Flexbox 布局属性与实战技巧。
 False- 2026-04-06: 扩写详细内容，增加响应式设计、性能优化、浏览器兼容性、实际应用示例等章节。
 False