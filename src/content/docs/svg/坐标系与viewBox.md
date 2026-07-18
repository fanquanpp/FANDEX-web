---
order: 30
title: 'SVG 坐标系与 viewBox'
module: svg
category: 'SVG Basics'
difficulty: beginner
description: '视口、viewBox、preserveAspectRatio、坐标系变换原理与适配技巧。'
author: fanquanpp
updated: '2026-07-18'
related:
  - svg/基础语法与文档结构
  - svg/基本图形详解
  - svg/变换transform
prerequisites:
  - svg/基础语法与文档结构
---

## 1. 视口（viewport）与视图框（viewBox）

SVG 有两套坐标系：**视口**决定画布物理尺寸，**视图框**决定内部坐标映射。

### 1.1 视口 viewport

`<svg>` 的 `width` 和 `height` 定义视口尺寸，类似画布大小。

```html
<svg width="400" height="300">
  <!-- 视口为 400×300 像素 -->
</svg>
```

### 1.2 viewBox 语法

`viewBox="min-x min-y width height"` 定义内部坐标系，与视口分离。

```html
<svg width="400" height="300" viewBox="0 0 200 150">
  <!-- 内部坐标 200×150，缩放到视口 400×300，等比放大 2 倍 -->
  <rect x="0" y="0" width="100" height="75" fill="#4f5bd5" />
</svg>
```

### 1.3 viewBox 的核心价值

| 价值 | 说明 |
|------|------|
| **响应式适配** | 视口变化时图形按比例缩放，无需重写坐标 |
| **坐标归一化** | 可用 0-100 或 0-1 等任意范围描述图形 |
| **局部裁剪** | 通过调整 min-x/min-y 可显示图形局部 |
| **独立于尺寸** | 同一 SVG 可用作 16px 图标或 1920px 横幅 |

## 2. 坐标系方向

SVG 坐标系原点在**左上角**，X 轴向右、Y 轴**向下**（与数学坐标系 Y 轴相反）。

```
(0,0) ──────→ X+
  │
  │
  ↓
  Y+
```

```html
<svg viewBox="0 0 100 100">
  <!-- 圆心 (50,50)：在画布正中央 -->
  <circle cx="50" cy="50" r="40" fill="#4f5bd5" />
  <!-- (0,0) 在左上角 -->
  <rect x="0" y="0" width="20" height="20" fill="#d63031" />
</svg>
```

## 3. preserveAspectRatio 宽高比策略

当 viewBox 与视口宽高比不一致时，`preserveAspectRatio` 控制如何适配。

### 3.1 语法

```
preserveAspectRatio="<align> <meetOrSlice>"
```

### 3.2 对齐方式 align

| 值 | 含义 |
|----|------|
| `xMinYMin` | 左上对齐 |
| `xMidYMid` | 居中对齐（默认） |
| `xMaxYMax` | 右下对齐 |
| `xMinYMid` | 左中对齐 |
| `xMidYMin` | 上中对齐 |

### 3.3 适配模式 meetOrSlice

| 值 | 行为 |
|----|------|
| `meet` | 完整显示 viewBox，留白（默认） |
| `slice` | 填满视口，可能裁剪 |
| `none` | 拉伸变形，不保持比例 |

### 3.4 示例对比

```html
<!-- viewBox 4:3，视口 1:1 -->
<svg width="100" height="100" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
  <rect width="400" height="300" fill="#4f5bd5" />
</svg>
<!-- meet：矩形等比缩小居中，上下留白 -->

<svg width="100" height="100" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
  <rect width="400" height="300" fill="#00b894" />
</svg>
<!-- slice：矩形等比放大填满，左右被裁 -->

<svg width="100" height="100" viewBox="0 0 400 300" preserveAspectRatio="none">
  <rect width="400" height="300" fill="#d63031" />
</svg>
<!-- none：拉伸为正方形，变形 -->
```

## 4. viewBox 实战技巧

### 4.1 响应式图标

图标 SVG 通常只声明 viewBox，不指定 width/height，由外层 CSS 控制。

```html
<svg viewBox="0 0 24 24" class="icon">
  <path d="M12 2 L22 22 L2 22 Z" fill="currentColor" />
</svg>
```

```css
.icon {
  width: 24px;
  height: 24px;
}
.icon-lg {
  width: 48px;
  height: 48px;
}
```

### 4.2 负坐标与偏移

viewBox 的 min-x/min-y 可为负数，便于以原点为中心描述图形。

```html
<svg viewBox="-50 -50 100 100" width="100" height="100">
  <!-- 坐标系 -50 到 50，原点 (0,0) 居中 -->
  <circle cx="0" cy="0" r="40" fill="#4f5bd5" />
  <line x1="-50" y1="0" x2="50" y2="0" stroke="#333" />
  <line x1="0" y1="-50" x2="0" y2="50" stroke="#333" />
</svg>
```

### 4.3 局部放大

通过缩小 viewBox 范围实现局部放大。

```html
<svg viewBox="0 0 400 300" width="400" height="300">
  <!-- 完整图 -->
</svg>

<svg viewBox="100 75 100 75" width="400" height="300">
  <!-- 放大显示原图中央 100×75 区域 -->
</svg>
```

### 4.4 嵌套 svg 建立子坐标系

```html
<svg viewBox="0 0 400 200" width="400" height="200">
  <svg x="0" y="0" width="200" height="200" viewBox="0 0 100 100">
    <!-- 左侧子坐标系 100×100 映射到 200×200 -->
    <circle cx="50" cy="50" r="40" fill="#4f5bd5" />
  </svg>
  <svg x="200" y="0" width="200" height="200" viewBox="0 0 50 50">
    <!-- 右侧子坐标系 50×50 映射到 200×200，放大 4 倍 -->
    <circle cx="25" cy="25" r="20" fill="#00b894" />
  </svg>
</svg>
```

## 5. 坐标系与变换

`transform` 属性在坐标系层面应用变换，影响后续所有子元素。

```html
<svg viewBox="0 0 200 200">
  <g transform="translate(100, 100) rotate(45)">
    <!-- 此组以 (100,100) 为原点，旋转 45° -->
    <rect x="-25" y="-25" width="50" height="50" fill="#d63031" />
  </g>
</svg>
```

变换的顺序**不可交换**：`translate(100,0) rotate(45)` 与 `rotate(45) translate(100,0)` 结果不同。

## 6. 常见陷阱

### 6.1 viewBox 与视口比例不一致导致留白

```html
<!-- 错误：viewBox 4:3 视口 16:9，默认 meet 会留白 -->
<svg width="640" height="360" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#4f5bd5" />
</svg>
```

解决：使用 `slice` 填满，或调整 viewBox 比例匹配视口。

### 6.2 小数坐标导致抗锯齿模糊

```html
<!-- 模糊：1px 描边落在 .5 坐标 -->
<line x1="0" y1="10.5" x2="100" y2="10.5" stroke="#000" />

<!-- 清晰：整数坐标 + 0.5 偏移技巧 -->
<line x1="0" y1="10" x2="100" y2="10" stroke="#000" />
```

### 6.3 忘记设置 viewBox 导致图标无法缩放

```html
<!-- 错误：仅有 width/height，CSS 缩放后变形 -->
<svg width="24" height="24">
  <circle cx="12" cy="12" r="10" />
</svg>

<!-- 正确：声明 viewBox，由 CSS 控制尺寸 -->
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" />
</svg>
```

## 7. viewBox 调试技巧

浏览器开发者工具中可实时编辑 viewBox 观察效果：

```html
<svg viewBox="0 0 100 100" width="200" height="200" style="border:1px solid #ccc">
  <rect x="10" y="10" width="80" height="80" fill="#4f5bd5" />
  <circle cx="50" cy="50" r="40" fill="none" stroke="#d63031" stroke-width="2" />
</svg>
```

调整 viewBox 为 `0 0 50 50` 可看到只渲染左上 50×50 区域并放大到 200×200 视口。

下一篇介绍 rect、circle、ellipse、line、polyline、polygon 六大基本图形。
