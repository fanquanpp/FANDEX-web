# HTML5 离线存储与 Web API (Storage & Web APIs)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: HTML5 Basics
 False> @Description: Web Storage、Geolocation、Web Worker 及 Fetch API。 | Web Storage, Geolocation, Workers, and Fetch.
 False
 False---
 False
 False## 目录
 False
 False1. [Web 存储](#web-存储)
 False2. [地理定位](#地理定位)
 False3. [Web Workers](#web-workers)
 False4. [离线应用](#离线应用)
 False5. [Fetch API](#fetch-api)
 False6. [其他 Web API](#其他-web-api)
 False7. [实际应用示例](#实际应用示例)
 False8. [最佳实践](#最佳实践)
 False
 False---
 False
 False## 1. Web 存储 (Web Storage)
 False
 FalseWeb Storage 提供了一种在浏览器中存储键值对数据的机制，相比 Cookie 具有更大的容量 (通常为 5MB+) 和更简单的 API。
 False
 False### 1.1 localStorage
 False
 False**特点**：
 False
 False- 数据永久存储，除非手动清除
 False- 同一域名下的所有页面共享数据
 False- 数据不会随 HTTP 请求发送到服务器
 False
 False**操作方法**：
 False
```javascript
 True// 存储数据
 TruelocalStorage.setItem("name", "Alice");
 TruelocalStorage.setItem("age", "30");
 True
 True// 读取数据
 Trueconst name = localStorage.getItem("name");
 Trueconst age = localStorage.getItem("age");
 Trueconsole.log(name, age); // 输出: Alice 30
 True
 True// 删除数据
 TruelocalStorage.removeItem("age");
 True
 True// 清除所有数据
 TruelocalStorage.clear();
 True
 True// 遍历所有键值对
 Truefor (let i = 0; i < localStorage.length; i++) {
 True const key = localStorage.key(i);
 True const value = localStorage.getItem(key);
 True console.log(`${key}: ${value}`);
 True}
 True```

 False**存储对象**：
 False
 FalselocalStorage 只能存储字符串，存储对象需要先序列化：
 False
```javascript
 True// 存储对象
 Trueconst user = { name: "Bob", age: 25, email: "bob@example.com" };
 TruelocalStorage.setItem("user", JSON.stringify(user));
 True
 True// 读取对象
 Trueconst storedUser = JSON.parse(localStorage.getItem("user"));
 Trueconsole.log(storedUser.name); // 输出: Bob
 True```

 False### 1.2 sessionStorage
 False
 False**特点**：
 False
 False- 数据仅在当前会话 (标签页) 有效，关闭标签页即失效
 False- 不同标签页之间的数据不共享
 False- 刷新页面数据仍然保留
 False
 False**操作方法**：
 False
```javascript
 True// 存储数据
 TruesessionStorage.setItem("token", "abc123");
 True
 True// 读取数据
 Trueconst token = sessionStorage.getItem("token");
 True
 True// 删除数据
 TruesessionStorage.removeItem("token");
 True
 True// 清除所有数据
 TruesessionStorage.clear();
 True```

 False### 1.3 Web Storage 与 Cookie 对比
 False
 False| 特性 | localStorage | sessionStorage | Cookie |
 False|------|-------------|---------------|--------|
 False| 存储容量 | 约 5MB | 约 5MB | 约 4KB |
 False| 存储时间 | 永久 | 会话期间 | 可设置过期时间 |
 False| 服务器发送 | 否 | 否 | 是 (随请求发送) |
 False| 作用域 | 同一域名 | 同一标签页 | 可设置路径 |
 False| API 复杂度 | 简单 | 简单 | 复杂 |
 False
 False### 1.4 使用场景
 False
 False- **localStorage**：存储用户偏好设置、主题选择、登录状态等需要长期保存的数据
 False- **sessionStorage**：存储临时会话数据、表单数据、购物车内容等仅在当前会话有效的数据
 False
 False## 2. 地理定位 (Geolocation API)
 False
 FalseGeolocation API 允许网页获取用户的地理位置信息，可用于地图应用、位置服务等场景。
 False
 False### 2.1 基本用法
 False
```javascript
 True// 获取当前位置
 Truenavigator.geolocation.getCurrentPosition(
 True (position) => {
 True console.log("纬度: " + position.coords.latitude);
 True console.log("经度: " + position.coords.longitude);
 True console.log("精度: " + position.coords.accuracy + " 米");
 True },
 True (error) => {
 True console.error("获取位置失败:", error.message);
 True }
 True);
 True```

 False### 2.2 监听位置变化
 False
```javascript
 True// 监听位置变化
 Trueconst watchId = navigator.geolocation.watchPosition(
 True (position) => {
 True console.log("当前位置:", position.coords.latitude, position.coords.longitude);
 True },
 True (error) => {
 True console.error("获取位置失败:", error.message);
 True },
 True {
 True enableHighAccuracy: true, // 启用高精度模式
 True timeout: 5000, // 超时时间
 True maximumAge: 0 // 不使用缓存
 True }
 True);
 True
 True// 停止监听
 True// navigator.geolocation.clearWatch(watchId);
 True```

 False### 2.3 位置对象属性
 False
 False| 属性 | 描述 |
 False|------|------|
 False| `coords.latitude` | 纬度 |
 False| `coords.longitude` | 经度 |
 False| `coords.accuracy` | 位置精度 (米) |
 False| `coords.altitude` | 海拔高度 (米) |
 False| `coords.altitudeAccuracy` | 海拔高度精度 (米) |
 False| `coords.heading` | 方向 (度，从正北开始顺时针计算) |
 False| `coords.speed` | 速度 (米/秒) |
 False| `timestamp` | 获取位置的时间戳 |
 False
 False### 2.4 错误处理
 False
 False| 错误代码 | 描述 |
 False|---------|------|
 False| 0 | 未知错误 |
 False| 1 | 用户拒绝了位置请求 |
 False| 2 | 位置不可用 |
 False| 3 | 请求超时 |
 False
 False### 2.5 使用场景
 False
 False- 地图应用：显示用户当前位置
 False- 位置服务：附近的餐厅、商店等
 False- 导航应用：提供路线规划
 False- 社交应用：分享位置信息
 False
 False## 3. Web Workers
 False
 FalseWeb Workers 允许在后台线程运行脚本，不阻塞 UI 渲染，适合处理大量计算任务。
 False
 False### 3.1 基本用法
 False
 False**创建 Worker**：
 False
```javascript
 True// main.js
 Trueconst worker = new Worker('worker.js');
 True
 True// 发送消息给 Worker
 Trueworker.postMessage({ type: 'calculate', data: 1000000 });
 True
 True// 接收 Worker 消息
 Trueworker.onmessage = function(event) {
 True console.log('计算结果:', event.data);
 True};
 True
 True// 处理错误
 Trueworker.onerror = function(error) {
 True console.error('Worker 错误:', error);
 True};
 True```

 False**Worker 脚本 (worker.js)**：
 False
```javascript
 True// 接收消息
 Trueself.onmessage = function(event) {
 True const { type, data } = event.data;
 True 
 True if (type === 'calculate') {
 True // 执行密集计算
 True let result = 0;
 True for (let i = 0; i < data; i++) {
 True result += i;
 True }
 True 
 True // 发送结果
 True self.postMessage(result);
 True }
 True};
 True```

 False### 3.2 终止 Worker
 False
```javascript
 True// 终止 Worker
 Trueworker.terminate();
 True```

 False### 3.3 类型
 False
 False- **Dedicated Workers**：专用 Worker，只能被创建它的脚本使用
 False- **Shared Workers**：共享 Worker，可以被多个脚本使用
 False- **Service Workers**：用于离线缓存和后台同步
 False
 False### 3.4 使用场景
 False
 False- 密集计算：数学运算、图像处理
 False- 数据处理：大数据集分析、排序
 False- 后台任务：文件上传、数据同步
 False
 False## 4. 离线应用 (Service Workers)
 False
 FalseService Workers 是一种特殊的 Web Worker，用于拦截网络请求、实现离线缓存，是 Progressive Web App (PWA) 的核心技术。
 False
 False### 4.1 注册 Service Worker
 False
```javascript
 True// 注册 Service Worker
 Trueif ('serviceWorker' in navigator) {
 True window.addEventListener('load', async () => {
 True try {
 True const registration = await navigator.serviceWorker.register('/sw.js');
 True console.log('Service Worker 注册成功:', registration.scope);
 True } catch (error) {
 True console.error('Service Worker 注册失败:', error);
 True }
 True });
 True}
 True```

 False### 4.2 Service Worker 脚本 (sw.js)
 False
```javascript
 True// 缓存名称
 Trueconst CACHE_NAME = 'my-cache-v1';
 True
 True// 需要缓存的资源
 Trueconst urlsToCache = [
 True '/',
 True '/index.html',
 True '/styles.css',
 True '/script.js',
 True '/images/logo.png'
 True];
 True
 True// 安装事件 - 缓存资源
 Trueself.addEventListener('install', (event) => {
 True event.waitUntil(
 True caches.open(CACHE_NAME)
 True .then((cache) => {
 True console.log('打开缓存');
 True return cache.addAll(urlsToCache);
 True })
 True );
 True});
 True
 True// 激活事件 - 清理旧缓存
 Trueself.addEventListener('activate', (event) => {
 True const cacheWhitelist = [CACHE_NAME];
 True event.waitUntil(
 True caches.keys().then((cacheNames) => {
 True return Promise.all(
 True cacheNames.map((cacheName) => {
 True if (cacheWhitelist.indexOf(cacheName) === -1) {
 True return caches.delete(cacheName);
 True }
 True })
 True );
 True })
 True );
 True});
 True
 True// fetch 事件 - 拦截网络请求
 Trueself.addEventListener('fetch', (event) => {
 True event.respondWith(
 True caches.match(event.request)
 True .then((response) => {
 True // 如果缓存中有响应，则返回缓存
 True if (response) {
 True return response;
 True }
 True 
 True // 否则发起网络请求
 True return fetch(event.request)
 True .then((response) => {
 True // 检查响应是否有效
 True if (!response || response.status !== 200 || response.type !== 'basic') {
 True return response;
 True }
 True 
 True // 克隆响应
 True const responseToCache = response.clone();
 True 
 True // 将响应添加到缓存
 True caches.open(CACHE_NAME)
 True .then((cache) => {
 True cache.put(event.request, responseToCache);
 True });
 True 
 True return response;
 True });
 True })
 True );
 True});
 True```

 False### 4.3 缓存策略
 False
 False- **Cache First**：优先从缓存获取，无缓存再请求网络
 False- **Network First**：优先从网络获取，网络失败再从缓存获取
 False- **Cache Only**：只从缓存获取
 False- **Network Only**：只从网络获取
 False- **Stale While Revalidate**：先从缓存获取，同时请求网络更新缓存
 False
 False### 4.4 使用场景
 False
 False- 离线应用：即使没有网络也能访问应用
 False- 性能优化：缓存静态资源，提高加载速度
 False- 后台同步：在网络可用时同步数据
 False- 推送通知：即使应用未打开也能收到通知
 False
 False## 5. Fetch API
 False
 FalseFetch API 是现代化的异步网络请求方案，替代原生的 `XMLHttpRequest`，提供了更简洁、灵活的 API。
 False
 False### 5.1 基本用法
 False
```javascript
 True// GET 请求
 Truefetch('https://api.example.com/data')
 True .then((response) => {
 True if (!response.ok) {
 True throw new Error('网络响应失败');
 True }
 True return response.json();
 True })
 True .then((data) => {
 True console.log('数据:', data);
 True })
 True .catch((error) => {
 True console.error('错误:', error);
 True });
 True```

 False### 5.2 POST 请求
 False
```javascript
 True// POST 请求
 Truefetch('https://api.example.com/users', {
 True method: 'POST',
 True headers: {
 True 'Content-Type': 'application/json'
 True },
 True body: JSON.stringify({
 True name: 'John Doe',
 True email: 'john@example.com'
 True })
 True})
 True .then((response) => response.json())
 True .then((data) => {
 True console.log('创建用户成功:', data);
 True })
 True .catch((error) => {
 True console.error('错误:', error);
 True });
 True```

 False### 5.3 请求选项
 False
```javascript
 Trueconst options = {
 True method: 'GET', // GET, POST, PUT, DELETE, etc.
 True headers: {
 True 'Content-Type': 'application/json',
 True 'Authorization': 'Bearer token123'
 True },
 True body: JSON.stringify(data), // POST 请求时使用
 True mode: 'cors', // cors, no-cors, same-origin
 True credentials: 'include', // include, same-origin, omit
 True cache: 'default', // default, no-store, reload, no-cache, force-cache, only-if-cached
 True redirect: 'follow', // follow, error, manual
 True referrer: 'no-referrer', // no-referrer, client
 True referrerPolicy: 'no-referrer',
 True integrity: 'sha256-abc123',
 True keepalive: false,
 True signal: abortController.signal // 用于取消请求
 True};
 True
 Truefetch('https://api.example.com/data', options)
 True .then((response) => response.json())
 True .then((data) => console.log(data));
 True```

 False### 5.4 取消请求
 False
```javascript
 True// 创建 AbortController
 Trueconst abortController = new AbortController();
 True
 True// 发送请求
 Truefetch('https://api.example.com/data', {
 True signal: abortController.signal
 True})
 True .then((response) => response.json())
 True .then((data) => console.log(data))
 True .catch((error) => {
 True if (error.name === 'AbortError') {
 True console.log('请求已取消');
 True } else {
 True console.error('错误:', error);
 True }
 True });
 True
 True// 取消请求
 TruesetTimeout(() => {
 True abortController.abort();
 True}, 5000);
 True```

 False### 5.5 与 async/await 结合
 False
```javascript
 Trueasync function fetchData() {
 True try {
 True const response = await fetch('https://api.example.com/data');
 True if (!response.ok) {
 True throw new Error('网络响应失败');
 True }
 True const data = await response.json();
 True console.log('数据:', data);
 True return data;
 True } catch (error) {
 True console.error('错误:', error);
 True throw error;
 True }
 True}
 True
 True// 调用函数
 TruefetchData();
 True```

 False## 6. 其他 Web API
 False
 False### 6.1 Notification API
 False
 False用于向用户显示通知：
 False
```javascript
 True// 请求通知权限
 Trueif ('Notification' in window) {
 True Notification.requestPermission().then((permission) => {
 True if (permission === 'granted') {
 True // 发送通知
 True new Notification('通知标题', {
 True body: '通知内容',
 True icon: '/images/icon.png'
 True });
 True }
 True });
 True}
 True```

 False### 6.2 Intersection Observer API
 False
 False用于检测元素是否进入视口：
 False
```javascript
 True// 创建 Intersection Observer
 Trueconst observer = new IntersectionObserver((entries) => {
 True entries.forEach((entry) => {
 True if (entry.isIntersecting) {
 True // 元素进入视口
 True console.log('元素进入视口');
 True entry.target.classList.add('visible');
 True } else {
 True // 元素离开视口
 True console.log('元素离开视口');
 True entry.target.classList.remove('visible');
 True }
 True });
 True});
 True
 True// 观察元素
 Trueconst element = document.querySelector('.target');
 Trueobserver.observe(element);
 True```

 False### 6.3 File API
 False
 False用于处理文件上传和读取：
 False
```javascript
 True// 监听文件选择
 Trueconst fileInput = document.querySelector('input[type="file"]');
 TruefileInput.addEventListener('change', (event) => {
 True const file = event.target.files[0];
 True 
 True // 检查文件类型
 True if (file.type.startsWith('image/')) {
 True // 读取文件
 True const reader = new FileReader();
 True reader.onload = (e) => {
 True // 显示图片
 True const img = document.createElement('img');
 True img.src = e.target.result;
 True document.body.appendChild(img);
 True };
 True reader.readAsDataURL(file);
 True }
 True});
 True```

 False### 6.4 Canvas API
 False
 False用于绘制图形：
 False
```javascript
 Trueconst canvas = document.getElementById('myCanvas');
 Trueconst ctx = canvas.getContext('2d');
 True
 True// 绘制矩形
 Truectx.fillStyle = 'red';
 Truectx.fillRect(10, 10, 100, 50);
 True
 True// 绘制圆形
 Truectx.beginPath();
 Truectx.arc(150, 100, 30, 0, Math.PI * 2);
 Truectx.fillStyle = 'blue';
 Truectx.fill();
 True```

 False## 7. 实际应用示例
 False
 False### 7.1 示例 1：本地存储用户偏好
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>本地存储用户偏好</title>
 True <style>
 True body {
 True font-family: Arial, sans-serif;
 True line-height: 1.6;
 True margin: 0;
 True padding: 2rem;
 True transition: background-color 0.3s, color 0.3s;
 True }
 True .container {
 True max-width: 600px;
 True margin: 0 auto;
 True background-color: white;
 True padding: 2rem;
 True border-radius: 5px;
 True box-shadow: 0 2px 5px rgba(0,0,0,0.1);
 True }
 True h1 {
 True text-align: center;
 True margin-bottom: 2rem;
 True }
 True .theme-toggle {
 True display: flex;
 True align-items: center;
 True margin-bottom: 2rem;
 True }
 True .theme-toggle label {
 True margin-right: 1rem;
 True }
 True .dark-theme {
 True background-color: #333;
 True color: white;
 True }
 True .dark-theme .container {
 True background-color: #444;
 True }
 True </style>
 True</head>
 True<body>
 True <div class="container">
 True <h1>本地存储用户偏好</h1>
 True <div class="theme-toggle">
 True <label for="darkMode">深色模式:</label>
 True <input type="checkbox" id="darkMode">
 True </div>
 True <p>此示例展示如何使用 localStorage 存储用户的主题偏好。</p>
 True <p>当你切换主题时，偏好会被保存到本地存储，下次打开页面时会自动应用。</p>
 True </div>
 True 
 True <script>
 True const darkModeToggle = document.getElementById('darkMode');
 True const body = document.body;
 True 
 True // 加载保存的主题偏好
 True const savedTheme = localStorage.getItem('darkMode');
 True if (savedTheme === 'true') {
 True body.classList.add('dark-theme');
 True darkModeToggle.checked = true;
 True }
 True 
 True // 监听主题切换
 True darkModeToggle.addEventListener('change', function() {
 True if (this.checked) {
 True body.classList.add('dark-theme');
 True localStorage.setItem('darkMode', 'true');
 True } else {
 True body.classList.remove('dark-theme');
 True localStorage.setItem('darkMode', 'false');
 True }
 True });
 True </script>
 True</body>
 True</html>
 True```

 False### 7.2 示例 2：地理定位应用
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>地理定位应用</title>
 True <style>
 True body {
 True font-family: Arial, sans-serif;
 True line-height: 1.6;
 True margin: 0;
 True padding: 2rem;
 True background-color: #f4f4f4;
 True }
 True .container {
 True max-width: 600px;
 True margin: 0 auto;
 True background-color: white;
 True padding: 2rem;
 True border-radius: 5px;
 True box-shadow: 0 2px 5px rgba(0,0,0,0.1);
 True }
 True h1 {
 True text-align: center;
 True margin-bottom: 2rem;
 True }
 True .location-info {
 True margin-top: 2rem;
 True padding: 1rem;
 True background-color: #f9f9f9;
 True border-radius: 5px;
 True }
 True button {
 True padding: 0.5rem 1rem;
 True background-color: #4CAF50;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True }
 True button:hover {
 True background-color: #45a049;
 True }
 True .error {
 True color: red;
 True margin-top: 1rem;
 True }
 True </style>
 True</head>
 True<body>
 True <div class="container">
 True <h1>地理定位应用</h1>
 True <button id="getLocation">获取当前位置</button>
 True <div class="location-info" id="locationInfo"></div>
 True <div class="error" id="errorMessage"></div>
 True </div>
 True 
 True <script>
 True const getLocationBtn = document.getElementById('getLocation');
 True const locationInfo = document.getElementById('locationInfo');
 True const errorMessage = document.getElementById('errorMessage');
 True 
 True getLocationBtn.addEventListener('click', function() {
 True if ('geolocation' in navigator) {
 True locationInfo.innerHTML = '<p>正在获取位置...</p>';
 True errorMessage.textContent = '';
 True 
 True navigator.geolocation.getCurrentPosition(
 True (position) => {
 True const { latitude, longitude, accuracy } = position.coords;
 True locationInfo.innerHTML = `
 True <h3>当前位置</h3>
 True <p>纬度: ${latitude.toFixed(6)}</p>
 True <p>经度: ${longitude.toFixed(6)}</p>
 True <p>精度: ${accuracy.toFixed(2)} 米</p>
 True <p>时间: ${new Date(position.timestamp).toLocaleString()}</p>
 True `;
 True },
 True (error) => {
 True let errorText = '';
 True switch (error.code) {
 True case error.PERMISSION_DENIED:
 True errorText = '用户拒绝了位置请求';
 True break;
 True case error.POSITION_UNAVAILABLE:
 True errorText = '位置信息不可用';
 True break;
 True case error.TIMEOUT:
 True errorText = '获取位置超时';
 True break;
 True default:
 True errorText = '获取位置时发生未知错误';
 True }
 True errorMessage.textContent = errorText;
 True locationInfo.innerHTML = '';
 True },
 True {
 True enableHighAccuracy: true,
 True timeout: 10000,
 True maximumAge: 0
 True }
 True );
 True } else {
 True errorMessage.textContent = '您的浏览器不支持地理定位';
 True }
 True });
 True </script>
 True</body>
 True</html>
 True```

 False### 7.3 示例 3：使用 Fetch API 获取数据
 False
```html
 True<!DOCTYPE html>
 True<html lang="zh-CN">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>Fetch API 示例</title>
 True <style>
 True body {
 True font-family: Arial, sans-serif;
 True line-height: 1.6;
 True margin: 0;
 True padding: 2rem;
 True background-color: #f4f4f4;
 True }
 True .container {
 True max-width: 800px;
 True margin: 0 auto;
 True background-color: white;
 True padding: 2rem;
 True border-radius: 5px;
 True box-shadow: 0 2px 5px rgba(0,0,0,0.1);
 True }
 True h1 {
 True text-align: center;
 True margin-bottom: 2rem;
 True }
 True button {
 True padding: 0.5rem 1rem;
 True background-color: #008CBA;
 True color: white;
 True border: none;
 True border-radius: 4px;
 True cursor: pointer;
 True margin-bottom: 1rem;
 True }
 True button:hover {
 True background-color: #007B9E;
 True }
 True .posts {
 True margin-top: 2rem;
 True }
 True .post {
 True padding: 1rem;
 True border-bottom: 1px solid #ddd;
 True }
 True .post:last-child {
 True border-bottom: none;
 True }
 True .post h3 {
 True margin-top: 0;
 True }
 True .loading {
 True text-align: center;
 True padding: 2rem;
 True }
 True .error {
 True color: red;
 True text-align: center;
 True padding: 2rem;
 True }
 True </style>
 True</head>
 True<body>
 True <div class="container">
 True <h1>Fetch API 示例</h1>
 True <button id="fetchPosts">获取帖子</button>
 True <div class="posts" id="postsContainer"></div>
 True </div>
 True 
 True <script>
 True const fetchPostsBtn = document.getElementById('fetchPosts');
 True const postsContainer = document.getElementById('postsContainer');
 True 
 True fetchPostsBtn.addEventListener('click', async function() {
 True try {
 True postsContainer.innerHTML = '<div class="loading">加载中...</div>';
 True 
 True // 使用 Fetch API 获取数据
 True const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
 True 
 True if (!response.ok) {
 True throw new Error('网络响应失败');
 True }
 True 
 True const posts = await response.json();
 True 
 True // 渲染帖子
 True postsContainer.innerHTML = posts.map(post => `
 True <div class="post">
 True <h3>${post.title}</h3>
 True <p>${post.body}</p>
 True </div>
 True `).join('');
 True } catch (error) {
 True postsContainer.innerHTML = `<div class="error">错误: ${error.message}</div>`;
 True }
 True });
 True </script>
 True</body>
 True</html>
 True```

 False## 8. 最佳实践
 False
 False### 8.1 Web Storage 最佳实践
 False
 False- **数据类型**：localStorage 和 sessionStorage 只能存储字符串，存储对象时需要使用 JSON.stringify() 和 JSON.parse()
 False- **存储容量**：不要存储过大的数据，避免超出存储限制
 False- **敏感数据**：不要存储敏感数据（如密码），这些数据应该存储在服务器端
 False- **性能**：频繁读写 localStorage 可能影响性能，建议批量操作
 False- **兼容性**：虽然现代浏览器都支持 Web Storage，但仍需考虑旧浏览器的兼容性
 False
 False### 8.2 Geolocation API 最佳实践
 False
 False- **权限请求**：在需要时才请求位置权限，不要在页面加载时就请求
 False- **错误处理**：妥善处理位置获取失败的情况
 False- **精度设置**：根据实际需求设置精度，高精度模式会消耗更多电量
 False- **用户隐私**：尊重用户隐私，明确告知用户位置信息的使用目的
 False
 False### 8.3 Web Workers 最佳实践
 False
 False- **适用场景**：只在需要处理大量计算时使用 Web Workers，避免过度使用
 False- **通信开销**：注意 Worker 与主线程之间的通信开销，避免频繁通信
 False- **资源管理**：在不需要时及时终止 Worker，避免资源浪费
 False- **错误处理**：妥善处理 Worker 中的错误
 False
 False### 8.4 Service Workers 最佳实践
 False
 False- **缓存策略**：根据资源类型选择合适的缓存策略
 False- **缓存版本**：合理管理缓存版本，避免缓存过期问题
 False- **网络请求**：正确处理网络请求，避免无限循环
 False- **调试**：使用 Chrome DevTools 进行 Service Worker 调试
 False- **更新**：正确处理 Service Worker 的更新流程
 False
 False### 8.5 Fetch API 最佳实践
 False
 False- **错误处理**：始终处理 fetch 请求的错误，包括网络错误和 HTTP 错误
 False- **请求配置**：根据实际需求配置请求选项，如 headers、credentials 等
 False- **响应处理**：根据响应类型选择合适的处理方法，如 response.json()、response.text() 等
 False- **取消请求**：在需要时使用 AbortController 取消请求
 False- **超时处理**：实现请求超时处理，避免长时间等待
 False
 False### 8.6 通用最佳实践
 False
 False- **特性检测**：在使用 Web API 前进行特性检测，确保浏览器支持
 False- **性能优化**：注意 API 的性能影响，避免过度使用
 False- **安全性**：遵循安全最佳实践，避免 XSS、CSRF 等攻击
 False- **可访问性**：确保应用对所有用户可访问，包括使用辅助技术的用户
 False- **测试**：在不同浏览器和设备上测试应用，确保兼容性
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 整合 Web 存储与现代 Web API。
 False- 2026-04-05: 扩写内容，增加详细的 Web 存储、地理定位、Web Workers、Service Workers、Fetch API 的概念、示例和最佳实践，以及其他常用 Web API 和实际应用示例。
 False