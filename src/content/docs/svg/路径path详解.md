---
order: 50
title: 'SVG 路径 path 详解'
module: svg
category: 'SVG Basics'
difficulty: intermediate
description: 'path 命令、贝塞尔曲线、弧线、相对坐标与复杂路径绘制技巧。'
author: fanquanpp
updated: '2026-07-18'
related:
  - svg/基本图形详解
  - svg/变换transform
  - svg/符号与复用
prerequisites:
  - svg/基本图形详解
---

## 1. path 概述

`<path>` 是 SVG 中最强大的元素，通过 `d` 属性的命令序列描述任意形状。所有基本图形都可用 path 表达。

```html
<svg viewBox="0 0 200 100">
  <path d="M 10 10 L 190 10 L 190 90 L 10 90 Z" fill="#4f5bd5" />
</svg>
```

## 2. 命令总览

| 命令 | 含义 | 参数 | 大小写区别 |
|------|------|------|-----------|
| `M` | 移动到（moveTo） | x,y | 大写绝对，小写相对 |
| `L` | 直线到（lineTo） | x,y | 同上 |
| `H` | 水平线 | x | 同上 |
| `V` | 垂直线 | y | 同上 |
| `C` | 三次贝塞尔 | x1,y1 x2,y2 x,y | 同上 |
| `S` | 平滑三次贝塞尔 | x2,y2 x,y | 同上 |
| `Q` | 二次贝塞尔 | x1,y1 x,y | 同上 |
| `T` | 平滑二次贝塞尔 | x,y | 同上 |
| `A` | 弧线 | rx,ry rot large,sweep x,y | 同上 |
| `Z` | 闭合路径 | 无 | 大小写等价 |

> **绝对坐标**：以坐标系原点为参考；**相对坐标**：以前一命令终点为参考。

## 3. 直线命令

### 3.1 M / L

```html
<path d="M 10 10 L 100 10 L 100 50 L 10 50 Z" fill="#4f5bd5" />
```

绘制矩形：从 (10,10) → (100,10) → (100,50) → (10,50) → 闭合回起点。

### 3.2 H / V

```html
<path d="M 10 10 H 100 V 50 H 10 Z" fill="#00b894" />
```

`H 100` 等价于 `L 100 当前y`，`V 50` 等价于 `L 当前x 50`。

### 3.3 相对坐标

```html
<!-- 绝对 -->
<path d="M 10 10 L 100 10 L 100 50" />
<!-- 相对：等价效果 -->
<path d="M 10 10 l 90 0 l 0 40" />
```

相对命令 `l 90 0` 表示从前一点向右移动 90，y 不变。

## 4. 贝塞尔曲线

### 4.1 二次贝塞尔 Q

`Q x1,y1 x,y`：一个控制点 + 终点。

```html
<svg viewBox="0 0 200 100">
  <!-- 控制点 (100,10)，终点 (190,90) -->
  <path d="M 10 90 Q 100 10 190 90" fill="none" stroke="#4f5bd5" stroke-width="3" />
  <!-- 辅助线 -->
  <line x1="10" y1="90" x2="100" y2="10" stroke="#ccc" stroke-dasharray="3" />
  <line x1="100" y1="10" x2="190" y2="90" stroke="#ccc" stroke-dasharray="3" />
</svg>
```

### 4.2 平滑二次贝塞尔 T

`T x,y`：自动反射前一控制点，形成连续平滑曲线。

```html
<path d="M 10 90 Q 100 10 190 90 T 370 90" fill="none" stroke="#d63031" stroke-width="3" />
```

第二个控制点自动为 (280, 170)，形成波浪。

### 4.3 三次贝塞尔 C

`C x1,y1 x2,y2 x,y`：两个控制点 + 终点，可表达更复杂曲线。

```html
<svg viewBox="0 0 200 100">
  <path d="M 10 50 C 50 10 150 90 190 50" fill="none" stroke="#00b894" stroke-width="3" />
</svg>
```

### 4.4 平滑三次贝塞尔 S

`S x2,y2 x,y`：第二控制点自动反射，第一控制点需显式提供。

```html
<path d="M 10 50 C 50 10 100 90 150 50 S 250 10 290 50" fill="none" stroke="#d63031" />
```

## 5. 弧线命令 A

`A rx,ry x-axis-rotation large-arc-flag sweep-flag x,y`

| 参数 | 含义 |
|------|------|
| `rx,ry` | 椭圆半径 |
| `x-axis-rotation` | 椭圆 x 轴旋转角度 |
| `large-arc-flag` | 0 短弧 / 1 长弧 |
| `sweep-flag` | 0 逆时针 / 1 顺时针 |
| `x,y` | 终点 |

### 5.1 四种弧组合

```html
<svg viewBox="0 0 400 200">
  <!-- 从 (50,100) 到 (150,100)，半径 50 -->
  <path d="M 50 100 A 50 50 0 0 0 150 100" fill="none" stroke="#4f5bd5" />
  <path d="M 250 100 A 50 50 0 0 1 350 100" fill="none" stroke="#00b894" />
  <path d="M 50 50 A 50 50 0 1 0 150 50" fill="none" stroke="#d63031" />
  <path d="M 250 50 A 50 50 0 1 1 350 50" fill="none" stroke="#f9a825" />
</svg>
```

### 5.2 圆弧扇形

```html
<svg viewBox="0 0 200 200">
  <path d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z" fill="#4f5bd5" />
</svg>
```

绘制 1/4 扇形：从圆心 (100,100) → (100,20) → 顺时针弧到 (180,100) → 闭合。

## 6. 闭合路径 Z

`Z`（或 `z`）从当前点连回 `M` 起点形成闭合。

```html
<!-- 不闭合：不画最后一条边 -->
<path d="M 10 10 L 100 10 L 100 50" fill="none" stroke="#000" />
<!-- 闭合：自动连接终点到起点 -->
<path d="M 10 10 L 100 10 L 100 50 Z" fill="#4f5bd5" />
```

> 闭合后 `fill` 才能正确填充内部。

## 7. 路径填充规则 fill-rule

复杂路径（自相交或多子路径）的填充行为由 `fill-rule` 控制。

### 7.1 nonzero（默认）

```html
<path d="M 10 10 L 190 10 L 190 90 L 10 90 Z M 50 30 L 150 30 L 150 70 L 50 70 Z"
      fill="#4f5bd5" fill-rule="nonzero" />
```

外矩形 + 内矩形：nonzero 规则下内矩形被"挖空"（外顺时针 + 内逆时针 → 区域计数为 0）。

### 7.2 evenodd

```html
<path d="M 10 10 L 190 10 L 190 90 L 10 90 Z M 50 30 L 150 30 L 150 70 L 50 70 Z"
      fill="#00b894" fill-rule="evenodd" />
```

evenodd 规则下，无论方向，奇数次穿越绘制，偶数次不绘制 → 形成环带效果。

### 7.3 五角星示例

```html
<!-- nonzero：中心填充 -->
<path d="M 100 10 L 120 70 L 180 70 L 130 105 L 150 165 L 100 130 L 50 165 L 70 105 L 20 70 L 80 70 Z"
      fill="#d63031" fill-rule="nonzero" />

<!-- evenodd：中心镂空 -->
<path d="M 100 10 L 120 70 L 180 70 L 130 105 L 150 165 L 100 130 L 50 165 L 70 105 L 20 70 L 80 70 Z"
      fill="#f9a825" fill-rule="evenodd" />
```

## 8. 多子路径

单个 `<path>` 可包含多个 `M` 命令，形成多个独立子路径。

```html
<!-- 两个独立三角形 -->
<path d="M 10 10 L 90 10 L 50 90 Z M 110 10 L 190 10 L 150 90 Z" fill="#4f5bd5" />
```

## 9. 路径长度与测量

`pathLength` 属性将路径归一化到指定长度，便于 stroke-dasharray 动画。

```html
<path
  d="M 10 50 Q 100 10 190 50"
  fill="none" stroke="#4f5bd5" stroke-width="3"
  pathLength="100"
  stroke-dasharray="50 50"
/>
<!-- pathLength=100，dasharray 50 50 表示画一半留一半 -->
```

JavaScript 获取实际长度：

```javascript
const path = document.querySelector('path');
const length = path.getTotalLength();
console.log(length); // 例如 200
const point = path.getPointAtLength(100); // 路径中点坐标
```

## 10. 实战：手写心形

```html
<svg viewBox="0 0 100 100" width="200" height="200">
  <path
    d="M 50 30
       C 30 10 0 20 0 50
       C 0 70 30 90 50 100
       C 70 90 100 70 100 50
       C 100 20 70 10 50 30 Z"
    fill="#d63031"
  />
</svg>
```

**解析**：
- 起点 (50,30)：心形顶部凹陷
- C 到 (0,50)：左半弧
- C 到 (50,100)：底部尖角
- C 到 (100,50)：右半弧
- C 回 (50,30)：闭合

## 11. 路径优化技巧

| 技巧 | 说明 |
|------|------|
| **使用相对坐标** | 小写命令减少数字位数，文件更小 |
| **合并连续命令** | 多个 L 可省略命令字母：`L 10 10 20 20 30 30` |
| **使用 H/V** | 水平垂直线用 H/V 比 L 更短 |
| **复用路径** | 复杂路径用 `<defs>` + `<use>` |
| **SVGO 压缩** | 工具自动优化坐标精度与冗余 |

下一篇介绍 SVG 文本，包括 `<text>`、`<tspan>`、`<textPath>` 等排版能力。
