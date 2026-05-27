# CSS Canvas 绘图 | Canvas Drawing
 False
 False> @Author: fanquanpp
 False> @Category: CSS Basics
 False> @Description: CSS Canvas 绘图 | Canvas Drawing
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [Canvas 概述 | Canvas Overview](#canvas-概述-|-canvas-overview)
 False2. [Canvas 基础 | Canvas Basics](#canvas-基础-|-canvas-basics)
 False3. [Canvas 进阶 | Canvas Advanced](#canvas-进阶-|-canvas-advanced)
 False4. [Canvas 动画 | Canvas Animation](#canvas-动画-|-canvas-animation)
 False5. [Canvas 实战示例 | Canvas Practical Examples](#canvas-实战示例-|-canvas-practical-examples)
 False6. [Canvas 性能优化 | Canvas Performance Optimization](#canvas-性能优化-|-canvas-performance-optimization)
 False7. [Canvas 最佳实践 | Canvas Best Practices](#canvas-最佳实践-|-canvas-best-practices)
 False8. [总结 | Summary](#总结-|-summary)
 False
 False---
 False
 False## 1. Canvas 概述 | Canvas Overview
 False
 FalseCanvas 是 HTML5 提供的一个绘图 API，通过 JavaScript 可以在网页上绘制各种图形、动画和交互效果。Canvas 元素提供了一个矩形区域，我们可以使用各种绘图命令在这个区域内绘制内容。
 False
 False### 1.1 Canvas 的特点
 False
 False- **像素级控制**：可以精确控制每个像素的颜色和位置
 False- **丰富的绘图 API**：支持绘制路径、形状、文本、图像等
 False- **动画支持**：可以通过 JavaScript 实现复杂的动画效果
 False- **交互性**：可以响应鼠标和键盘事件，实现交互效果
 False- **性能优势**：对于复杂的图形和动画，Canvas 通常比 DOM 操作更高效
 False
 False### 1.2 Canvas 与 SVG 的区别
 False
 False| 特性 | Canvas | SVG |
 False|------|--------|-----|
 False| 绘制方式 | 基于像素 | 基于矢量 |
 False| 缩放效果 | 放大后可能失真 | 放大后不失真 |
 False| 事件处理 | 不支持元素级事件 | 支持元素级事件 |
 False| 性能 | 适合绘制大量图形和动画 | 适合绘制少量复杂图形 |
 False| 存储方式 | 存储为像素数据 | 存储为 XML 结构 |
 False
 False## 2. Canvas 基础 | Canvas Basics
 False
 False### 2.1 创建 Canvas 元素
 False
```html
 True<canvas id="myCanvas" width="400" height="300"></canvas>
 True```

 False### 2.2 获取 Canvas 上下文
 False
 False要在 Canvas 上绘图，首先需要获取 Canvas 的 2D 上下文：
 False
```javascript
 Trueconst canvas = document.getElementById('myCanvas');
 Trueconst ctx = canvas.getContext('2d');
 True```

 False### 2.3 基本绘图操作
 False
 False#### 2.3.1 绘制矩形
 False
```javascript
 True// 填充矩形
 Truectx.fillStyle = 'red';
 Truectx.fillRect(10, 10, 100, 50);
 True
 True// 描边矩形
 Truectx.strokeStyle = 'blue';
 Truectx.lineWidth = 2;
 Truectx.strokeRect(120, 10, 100, 50);
 True
 True// 清除矩形
 Truectx.clearRect(230, 10, 100, 50);
 True```

 False#### 2.3.2 绘制路径
 False
```javascript
 True// 开始路径
 Truectx.beginPath();
 True
 True// 移动到起始点
 Truectx.moveTo(50, 100);
 True
 True// 绘制线条
 Truectx.lineTo(150, 100);
 Truectx.lineTo(100, 150);
 True
 True// 闭合路径
 Truectx.closePath();
 True
 True// 填充路径
 Truectx.fillStyle = 'green';
 Truectx.fill();
 True
 True// 描边路径
 Truectx.strokeStyle = 'black';
 Truectx.lineWidth = 2;
 Truectx.stroke();
 True```

 False#### 2.3.3 绘制圆形
 False
```javascript
 Truectx.beginPath();
 Truectx.arc(200, 125, 50, 0, Math.PI * 2);
 Truectx.fillStyle = 'yellow';
 Truectx.fill();
 Truectx.strokeStyle = 'black';
 Truectx.lineWidth = 2;
 Truectx.stroke();
 True```

 False#### 2.3.4 绘制文本
 False
```javascript
 Truectx.font = '24px Arial';
 Truectx.fillStyle = 'black';
 Truectx.textAlign = 'center';
 Truectx.fillText('Hello Canvas!', 200, 250);
 True
 True// 描边文本
 Truectx.strokeStyle = 'red';
 Truectx.lineWidth = 1;
 Truectx.strokeText('Hello Canvas!', 200, 280);
 True```

 False## 3. Canvas 进阶 | Canvas Advanced
 False
 False### 3.1 渐变效果
 False
 False#### 3.1.1 线性渐变
 False
```javascript
 True// 创建线性渐变
 Trueconst linearGradient = ctx.createLinearGradient(0, 0, 400, 0);
 TruelinearGradient.addColorStop(0, 'red');
 TruelinearGradient.addColorStop(0.5, 'yellow');
 TruelinearGradient.addColorStop(1, 'green');
 True
 True// 使用渐变
 Truectx.fillStyle = linearGradient;
 Truectx.fillRect(0, 0, 400, 300);
 True```

 False#### 3.1.2 径向渐变
 False
```javascript
 True// 创建径向渐变
 Trueconst radialGradient = ctx.createRadialGradient(200, 150, 0, 200, 150, 150);
 TrueradialGradient.addColorStop(0, 'white');
 TrueradialGradient.addColorStop(1, 'blue');
 True
 True// 使用渐变
 Truectx.fillStyle = radialGradient;
 Truectx.fillRect(0, 0, 400, 300);
 True```

 False### 3.2 图案填充
 False
```javascript
 True// 创建图案
 Trueconst patternCanvas = document.createElement('canvas');
 TruepatternCanvas.width = 20;
 TruepatternCanvas.height = 20;
 Trueconst patternCtx = patternCanvas.getContext('2d');
 TruepatternCtx.fillStyle = 'red';
 TruepatternCtx.fillRect(0, 0, 10, 10);
 TruepatternCtx.fillRect(10, 10, 10, 10);
 True
 True// 创建重复图案
 Trueconst pattern = ctx.createPattern(patternCanvas, 'repeat');
 True
 True// 使用图案
 Truectx.fillStyle = pattern;
 Truectx.fillRect(0, 0, 400, 300);
 True```

 False### 3.3 图像处理
 False
 False#### 3.3.1 绘制图像
 False
```javascript
 Trueconst img = new Image();
 Trueimg.src = 'image.jpg';
 Trueimg.onload = function() {
 True // 绘制完整图像
 True ctx.drawImage(img, 0, 0);
 True 
 True // 绘制缩放后的图像
 True ctx.drawImage(img, 0, 150, 200, 100);
 True 
 True // 绘制图像的一部分
 True ctx.drawImage(img, 100, 100, 200, 100, 200, 150, 200, 100);
 True};
 True```

 False#### 3.3.2 图像变换
 False
```javascript
 Trueconst img = new Image();
 Trueimg.src = 'image.jpg';
 Trueimg.onload = function() {
 True // 保存当前状态
 True ctx.save();
 True 
 True // 平移
 True ctx.translate(100, 50);
 True 
 True // 旋转
 True ctx.rotate(Math.PI / 4);
 True 
 True // 缩放
 True ctx.scale(0.5, 0.5);
 True 
 True // 绘制图像
 True ctx.drawImage(img, 0, 0);
 True 
 True // 恢复之前的状态
 True ctx.restore();
 True};
 True```

 False### 3.4 合成模式
 False
```javascript
 True// 绘制第一个矩形
 Truectx.fillStyle = 'red';
 Truectx.fillRect(50, 50, 100, 100);
 True
 True// 设置合成模式
 Truectx.globalCompositeOperation = 'source-over'; // 默认
 True// ctx.globalCompositeOperation = 'source-in';
 True// ctx.globalCompositeOperation = 'source-out';
 True// ctx.globalCompositeOperation = 'destination-over';
 True// ctx.globalCompositeOperation = 'destination-in';
 True// ctx.globalCompositeOperation = 'destination-out';
 True// ctx.globalCompositeOperation = 'lighter';
 True// ctx.globalCompositeOperation = 'copy';
 True// ctx.globalCompositeOperation = 'xor';
 True
 True// 绘制第二个矩形
 Truectx.fillStyle = 'blue';
 Truectx.fillRect(100, 100, 100, 100);
 True```

 False## 4. Canvas 动画 | Canvas Animation
 False
 False### 4.1 基本动画循环
 False
```javascript
 Truefunction animate() {
 True // 清除画布
 True ctx.clearRect(0, 0, canvas.width, canvas.height);
 True 
 True // 绘制动画内容
 True // ...
 True 
 True // 请求下一帧
 True requestAnimationFrame(animate);
 True}
 True
 True// 开始动画
 Trueanimate();
 True```

 False### 4.2 移动动画
 False
```javascript
 Truelet x = 0;
 Truelet y = 150;
 Truelet dx = 2;
 Truelet dy = 2;
 True
 Truefunction animate() {
 True // 清除画布
 True ctx.clearRect(0, 0, canvas.width, canvas.height);
 True 
 True // 绘制圆形
 True ctx.beginPath();
 True ctx.arc(x, y, 20, 0, Math.PI * 2);
 True ctx.fillStyle = 'red';
 True ctx.fill();
 True 
 True // 更新位置
 True x += dx;
 True y += dy;
 True 
 True // 边界检测
 True if (x + 20 > canvas.width || x - 20 < 0) {
 True dx = -dx;
 True }
 True if (y + 20 > canvas.height || y - 20 < 0) {
 True dy = -dy;
 True }
 True 
 True // 请求下一帧
 True requestAnimationFrame(animate);
 True}
 True
 True// 开始动画
 Trueanimate();
 True```

 False### 4.3 交互动画
 False
```javascript
 Truelet isDrawing = false;
 Truelet lastX = 0;
 Truelet lastY = 0;
 True
 True// 鼠标按下事件
 Truecanvas.addEventListener('mousedown', (e) => {
 True isDrawing = true;
 True [lastX, lastY] = [e.offsetX, e.offsetY];
 True});
 True
 True// 鼠标移动事件
 Truecanvas.addEventListener('mousemove', (e) => {
 True if (!isDrawing) return;
 True 
 True ctx.beginPath();
 True ctx.moveTo(lastX, lastY);
 True ctx.lineTo(e.offsetX, e.offsetY);
 True ctx.strokeStyle = 'black';
 True ctx.lineWidth = 2;
 True ctx.stroke();
 True 
 True [lastX, lastY] = [e.offsetX, e.offsetY];
 True});
 True
 True// 鼠标释放事件
 Truecanvas.addEventListener('mouseup', () => {
 True isDrawing = false;
 True});
 True
 True// 鼠标离开事件
 Truecanvas.addEventListener('mouseout', () => {
 True isDrawing = false;
 True});
 True```

 False## 5. Canvas 实战示例 | Canvas Practical Examples
 False
 False### 5.1 简单的绘图应用
 False
```html
 True<!DOCTYPE html>
 True<html>
 True<head>
 True <title>Canvas Drawing App</title>
 True <style>
 True canvas {
 True border: 1px solid black;
 True cursor: crosshair;
 True }
 True .controls {
 True margin-bottom: 10px;
 True }
 True </style>
 True</head>
 True<body>
 True <div class="controls">
 True <label for="color">Color:</label>
 True <input type="color" id="color" value="#000000">
 True <label for="size">Size:</label>
 True <input type="range" id="size" min="1" max="20" value="2">
 True <button id="clear">Clear</button>
 True </div>
 True <canvas id="canvas" width="600" height="400"></canvas>
 True 
 True <script>
 True const canvas = document.getElementById('canvas');
 True const ctx = canvas.getContext('2d');
 True const colorInput = document.getElementById('color');
 True const sizeInput = document.getElementById('size');
 True const clearButton = document.getElementById('clear');
 True 
 True let isDrawing = false;
 True let lastX = 0;
 True let lastY = 0;
 True 
 True // 鼠标按下事件
 True canvas.addEventListener('mousedown', (e) => {
 True isDrawing = true;
 True [lastX, lastY] = [e.offsetX, e.offsetY];
 True });
 True 
 True // 鼠标移动事件
 True canvas.addEventListener('mousemove', (e) => {
 True if (!isDrawing) return;
 True 
 True ctx.beginPath();
 True ctx.moveTo(lastX, lastY);
 True ctx.lineTo(e.offsetX, e.offsetY);
 True ctx.strokeStyle = colorInput.value;
 True ctx.lineWidth = sizeInput.value;
 True ctx.stroke();
 True 
 True [lastX, lastY] = [e.offsetX, e.offsetY];
 True });
 True 
 True // 鼠标释放事件
 True canvas.addEventListener('mouseup', () => {
 True isDrawing = false;
 True });
 True 
 True // 鼠标离开事件
 True canvas.addEventListener('mouseout', () => {
 True isDrawing = false;
 True });
 True 
 True // 清除按钮点击事件
 True clearButton.addEventListener('click', () => {
 True ctx.clearRect(0, 0, canvas.width, canvas.height);
 True });
 True </script>
 True</body>
 True</html>
 True```

 False### 5.2 粒子效果
 False
```html
 True<!DOCTYPE html>
 True<html>
 True<head>
 True <title>Canvas Particle Effect</title>
 True <style>
 True body {
 True margin: 0;
 True overflow: hidden;
 True }
 True canvas {
 True display: block;
 True }
 True </style>
 True</head>
 True<body>
 True <canvas id="canvas"></canvas>
 True 
 True <script>
 True const canvas = document.getElementById('canvas');
 True const ctx = canvas.getContext('2d');
 True 
 True // 设置画布大小
 True canvas.width = window.innerWidth;
 True canvas.height = window.innerHeight;
 True 
 True // 粒子数组
 True const particles = [];
 True const particleCount = 100;
 True 
 True // 创建粒子
 True for (let i = 0; i < particleCount; i++) {
 True particles.push({
 True x: Math.random() * canvas.width,
 True y: Math.random() * canvas.height,
 True size: Math.random() * 5 + 1,
 True speedX: Math.random() * 3 - 1.5,
 True speedY: Math.random() * 3 - 1.5,
 True color: `hsl(${Math.random() * 360}, 50%, 50%)`
 True });
 True }
 True 
 True // 动画函数
 True function animate() {
 True // 清除画布
 True ctx.clearRect(0, 0, canvas.width, canvas.height);
 True 
 True // 更新和绘制粒子
 True for (let i = 0; i < particles.length; i++) {
 True const p = particles[i];
 True 
 True // 绘制粒子
 True ctx.beginPath();
 True ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
 True ctx.fillStyle = p.color;
 True ctx.fill();
 True 
 True // 更新粒子位置
 True p.x += p.speedX;
 True p.y += p.speedY;
 True 
 True // 边界检测
 True if (p.x + p.size > canvas.width || p.x - p.size < 0) {
 True p.speedX = -p.speedX;
 True }
 True if (p.y + p.size > canvas.height || p.y - p.size < 0) {
 True p.speedY = -p.speedY;
 True }
 True 
 True // 连接粒子
 True for (let j = i; j < particles.length; j++) {
 True const p2 = particles[j];
 True const dx = p.x - p2.x;
 True const dy = p.y - p2.y;
 True const distance = Math.sqrt(dx * dx + dy * dy);
 True 
 True if (distance < 100) {
 True ctx.beginPath();
 True ctx.strokeStyle = p.color;
 True ctx.lineWidth = 0.2;
 True ctx.moveTo(p.x, p.y);
 True ctx.lineTo(p2.x, p2.y);
 True ctx.stroke();
 True }
 True }
 True }
 True 
 True // 请求下一帧
 True requestAnimationFrame(animate);
 True }
 True 
 True // 开始动画
 True animate();
 True 
 True // 窗口大小改变时调整画布大小
 True window.addEventListener('resize', () => {
 True canvas.width = window.innerWidth;
 True canvas.height = window.innerHeight;
 True });
 True </script>
 True</body>
 True</html>
 True```

 False### 5.3 时钟效果
 False
```html
 True<!DOCTYPE html>
 True<html>
 True<head>
 True <title>Canvas Clock</title>
 True <style>
 True canvas {
 True display: block;
 True margin: 50px auto;
 True border: 1px solid black;
 True border-radius: 50%;
 True }
 True </style>
 True</head>
 True<body>
 True <canvas id="canvas" width="400" height="400"></canvas>
 True 
 True <script>
 True const canvas = document.getElementById('canvas');
 True const ctx = canvas.getContext('2d');
 True const centerX = canvas.width / 2;
 True const centerY = canvas.height / 2;
 True const radius = 180;
 True 
 True // 绘制时钟
 True function drawClock() {
 True // 清除画布
 True ctx.clearRect(0, 0, canvas.width, canvas.height);
 True 
 True // 获取当前时间
 True const now = new Date();
 True const hours = now.getHours();
 True const minutes = now.getMinutes();
 True const seconds = now.getSeconds();
 True 
 True // 绘制表盘
 True ctx.beginPath();
 True ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
 True ctx.fillStyle = 'white';
 True ctx.fill();
 True ctx.strokeStyle = 'black';
 True ctx.lineWidth = 2;
 True ctx.stroke();
 True 
 True // 绘制刻度
 True for (let i = 0; i < 12; i++) {
 True const angle = (i / 12) * Math.PI * 2;
 True const x1 = centerX + Math.cos(angle) * (radius - 20);
 True const y1 = centerY + Math.sin(angle) * (radius - 20);
 True const x2 = centerX + Math.cos(angle) * (radius - 10);
 True const y2 = centerY + Math.sin(angle) * (radius - 10);
 True 
 True ctx.beginPath();
 True ctx.moveTo(x1, y1);
 True ctx.lineTo(x2, y2);
 True ctx.strokeStyle = 'black';
 True ctx.lineWidth = 2;
 True ctx.stroke();
 True 
 True // 绘制数字
 True const text = (i === 0) ? '12' : i.toString();
 True ctx.font = '20px Arial';
 True ctx.fillStyle = 'black';
 True ctx.textAlign = 'center';
 True ctx.textBaseline = 'middle';
 True const textX = centerX + Math.cos(angle) * (radius - 40);
 True const textY = centerY + Math.sin(angle) * (radius - 40);
 True ctx.fillText(text, textX, textY);
 True }
 True 
 True // 绘制时针
 True const hourAngle = ((hours % 12) / 12) * Math.PI * 2 + (minutes / 60) * (Math.PI * 2 / 12);
 True const hourX = centerX + Math.cos(hourAngle) * (radius - 80);
 True const hourY = centerY + Math.sin(hourAngle) * (radius - 80);
 True ctx.beginPath();
 True ctx.moveTo(centerX, centerY);
 True ctx.lineTo(hourX, hourY);
 True ctx.strokeStyle = 'black';
 True ctx.lineWidth = 4;
 True ctx.stroke();
 True 
 True // 绘制分针
 True const minuteAngle = (minutes / 60) * Math.PI * 2 + (seconds / 60) * (Math.PI * 2 / 60);
 True const minuteX = centerX + Math.cos(minuteAngle) * (radius - 60);
 True const minuteY = centerY + Math.sin(minuteAngle) * (radius - 60);
 True ctx.beginPath();
 True ctx.moveTo(centerX, centerY);
 True ctx.lineTo(minuteX, minuteY);
 True ctx.strokeStyle = 'black';
 True ctx.lineWidth = 2;
 True ctx.stroke();
 True 
 True // 绘制秒针
 True const secondAngle = (seconds / 60) * Math.PI * 2;
 True const secondX = centerX + Math.cos(secondAngle) * (radius - 40);
 True const secondY = centerY + Math.sin(secondAngle) * (radius - 40);
 True ctx.beginPath();
 True ctx.moveTo(centerX, centerY);
 True ctx.lineTo(secondX, secondY);
 True ctx.strokeStyle = 'red';
 True ctx.lineWidth = 1;
 True ctx.stroke();
 True 
 True // 绘制中心点
 True ctx.beginPath();
 True ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
 True ctx.fillStyle = 'black';
 True ctx.fill();
 True }
 True 
 True // 绘制时钟并每秒更新
 True drawClock();
 True setInterval(drawClock, 1000);
 True </script>
 True</body>
 True</html>
 True```

 False## 6. Canvas 性能优化 | Canvas Performance Optimization
 False
 False### 6.1 减少绘制操作
 False
 False- **批量绘制**：将多个绘制操作合并为一个路径
 False- **避免频繁清除**：只清除需要更新的区域
 False- **使用离屏 Canvas**：对于复杂的绘制，使用离屏 Canvas 预渲染
 False
 False### 6.2 优化图像操作
 False
 False- **使用适当的图像格式**：根据需要选择 JPEG、PNG 或 WebP
 False- **压缩图像**：减少图像文件大小
 False- **使用 CSS 缩放**：在绘制前使用 CSS 缩放图像
 False
 False### 6.3 优化动画
 False
 False- **使用 requestAnimationFrame**：代替 setTimeout 或 setInterval
 False- **限制帧率**：对于不需要 60fps 的动画，限制帧率
 False- **使用 transforms**：使用 translate、rotate、scale 等变换代替重新绘制
 False
 False### 6.4 内存管理
 False
 False- **释放不再使用的资源**：及时释放图像、路径等资源
 False- **避免内存泄漏**：注意事件监听器的移除
 False
 False## 7. Canvas 最佳实践 | Canvas Best Practices
 False
 False### 7.1 代码组织
 False
 False- **模块化设计**：将 Canvas 相关代码封装为模块
 False- **使用面向对象**：使用类和对象组织代码
 False- **注释**：添加适当的注释，说明代码的功能和逻辑
 False
 False### 7.2 兼容性
 False
 False- **检测 Canvas 支持**：在使用 Canvas 前检测浏览器是否支持
 False- **提供替代方案**：为不支持 Canvas 的浏览器提供替代内容
 False
 False### 7.3 安全性
 False
 False- **验证用户输入**：对于用户输入的坐标和尺寸，进行验证
 False- **防止 XSS**：对于从用户输入生成的 Canvas 内容，进行适当的过滤
 False
 False### 7.4 可访问性
 False
 False- **提供替代文本**：为 Canvas 元素添加 alt 属性
 False- **使用 ARIA 标签**：为 Canvas 元素添加适当的 ARIA 标签
 False- **支持键盘导航**：对于交互式 Canvas，支持键盘导航
 False
 False## 8. 总结 | Summary
 False
 FalseCanvas 是 HTML5 提供的强大绘图 API，通过 JavaScript 可以在网页上创建各种图形、动画和交互效果。Canvas 具有像素级控制、丰富的绘图 API、动画支持和交互性等特点，适用于创建游戏、数据可视化、图像处理等应用。
 False
 False通过学习 Canvas 的基础操作、进阶特性和性能优化技巧，你可以创建各种复杂的图形和动画效果。在实际开发中，应根据具体需求选择合适的技术方案，并遵循相关的最佳实践，以创建高性能、可维护的 Canvas 应用。
 False