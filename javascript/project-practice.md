# 04-典型项目实战 (JavaScript)
 False
 False> @Author: fanquanpp
 False> @Category: JavaScript Basics
 False> @Description: 04-典型项目实战
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [项目实战案例](#项目实战案例)
 False2. [项目结构与组织](#项目结构与组织)
 False3. [测试](#测试)
 False4. [部署](#部署)
 False5. [性能优化](#性能优化)
 False6. [安全最佳实践](#安全最佳实践)
 False7. [实际应用案例](#实际应用案例)
 False8. [常见问题与解决方案](#常见问题与解决方案)
 False9. [最佳实践](#最佳实践)
 False10. [延伸阅读](#延伸阅读)
 False11. [更新日志](#更新日志)
 False
 False---
 False
 False## 1. 项目实战案例
 False
 False### 1.1 待办事项应用 (To-Do App)
 False
 False#### 1.1.1 功能需求
 False
 False- 添加任务
 False- 标记任务完成/未完成
 False- 删除任务
 False- 编辑任务
 False- 任务过滤（全部/已完成/未完成）
 False- 本地存储
 False
 False#### 1.1.2 技术栈
 False
 False- HTML5
 False- CSS3 (Tailwind CSS)
 False- JavaScript (ES6+)
 False- LocalStorage
 False
 False#### 1.1.3 项目结构
 False
```
 Truetodo-app/
 True├── index.html
 True├── style.css
 True├── script.js
 True└── README.md
 True```

 False#### 1.1.4 完整实现
 False
 False**index.html**
 False
```html
 True<!DOCTYPE html>
 True<html lang="en">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>To-Do App</title>
 True <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
 True <link rel="stylesheet" href="style.css">
 True</head>
 True<body class="bg-gray-100 min-h-screen flex items-center justify-center">
 True <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
 True <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">To-Do App</h1>
 True 
 True <div class="flex mb-4">
 True <input type="text" id="task-input" class="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a new task...">
 True <button id="add-task" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">Add</button>
 True </div>
 True 
 True <div class="flex mb-4">
 True <button class="filter-btn active flex-1 py-2 text-center" data-filter="all">All</button>
 True <button class="filter-btn flex-1 py-2 text-center" data-filter="active">Active</button>
 True <button class="filter-btn flex-1 py-2 text-center" data-filter="completed">Completed</button>
 True </div>
 True 
 True <ul id="task-list" class="space-y-2 mb-4">
 True <!-- Tasks will be added here -->
 True </ul>
 True 
 True <div class="flex justify-between items-center text-sm text-gray-600">
 True <span id="task-count">0 items left</span>
 True <button id="clear-completed" class="hover:text-red-500">Clear completed</button>
 True </div>
 True </div>
 True <script src="script.js"></script>
 True</body>
 True</html>
 True```

 False**style.css**
 False
```css
 True.filter-btn {
 True border-bottom: 2px solid transparent;
 True}
 True
 True.filter-btn.active {
 True border-bottom: 2px solid blue;
 True font-weight: bold;
 True}
 True
 True.task-item {
 True transition: all 0.3s ease;
 True}
 True
 True.task-item.completed {
 True text-decoration: line-through;
 True opacity: 0.6;
 True}
 True```

 False**script.js**
 False
```javascript
 Trueclass ToDoApp {
 True constructor() {
 True this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 True this.currentFilter = 'all';
 True this.init();
 True }
 True
 True init() {
 True this.bindEvents();
 True this.renderTasks();
 True this.updateTaskCount();
 True }
 True
 True bindEvents() {
 True // Add task event
 True document.getElementById('add-task').addEventListener('click', () => this.addTask());
 True document.getElementById('task-input').addEventListener('keypress', (e) => {
 True if (e.key === 'Enter') this.addTask();
 True });
 True
 True // Filter events
 True document.querySelectorAll('.filter-btn').forEach(btn => {
 True btn.addEventListener('click', (e) => {
 True this.currentFilter = e.target.dataset.filter;
 True this.updateFilterButtons();
 True this.renderTasks();
 True });
 True });
 True
 True // Clear completed event
 True document.getElementById('clear-completed').addEventListener('click', () => this.clearCompleted());
 True }
 True
 True addTask() {
 True const input = document.getElementById('task-input');
 True const text = input.value.trim();
 True 
 True if (text) {
 True this.tasks.push({ id: Date.now(), text, completed: false });
 True this.save();
 True this.renderTasks();
 True this.updateTaskCount();
 True input.value = '';
 True }
 True }
 True
 True toggleTask(id) {
 True this.tasks = this.tasks.map(task => 
 True task.id === id ? { ...task, completed: !task.completed } : task
 True );
 True this.save();
 True this.renderTasks();
 True this.updateTaskCount();
 True }
 True
 True deleteTask(id) {
 True this.tasks = this.tasks.filter(task => task.id !== id);
 True this.save();
 True this.renderTasks();
 True this.updateTaskCount();
 True }
 True
 True editTask(id, newText) {
 True this.tasks = this.tasks.map(task => 
 True task.id === id ? { ...task, text: newText } : task
 True );
 True this.save();
 True this.renderTasks();
 True }
 True
 True clearCompleted() {
 True this.tasks = this.tasks.filter(task => !task.completed);
 True this.save();
 True this.renderTasks();
 True this.updateTaskCount();
 True }
 True
 True save() {
 True localStorage.setItem('tasks', JSON.stringify(this.tasks));
 True }
 True
 True renderTasks() {
 True const taskList = document.getElementById('task-list');
 True const filteredTasks = this.getFilteredTasks();
 True
 True taskList.innerHTML = '';
 True
 True filteredTasks.forEach(task => {
 True const li = document.createElement('li');
 True li.className = `task-item ${task.completed ? 'completed' : ''} flex items-center p-2 border border-gray-200 rounded-md`;
 True li.innerHTML = `
 True <input type="checkbox" class="task-checkbox mr-3" ${task.completed ? 'checked' : ''} data-id="${task.id}">
 True <span class="task-text flex-1">${task.text}</span>
 True <button class="delete-task text-red-500 hover:text-red-700" data-id="${task.id}">×</button>
 True `;
 True taskList.appendChild(li);
 True });
 True
 True // Bind events for new tasks
 True document.querySelectorAll('.task-checkbox').forEach(checkbox => {
 True checkbox.addEventListener('change', (e) => {
 True const id = parseInt(e.target.dataset.id);
 True this.toggleTask(id);
 True });
 True });
 True
 True document.querySelectorAll('.delete-task').forEach(button => {
 True button.addEventListener('click', (e) => {
 True const id = parseInt(e.target.dataset.id);
 True this.deleteTask(id);
 True });
 True });
 True
 True // Add double-click to edit
 True document.querySelectorAll('.task-text').forEach(text => {
 True text.addEventListener('dblclick', (e) => {
 True const li = e.target.closest('.task-item');
 True const id = parseInt(li.querySelector('.task-checkbox').dataset.id);
 True const currentText = e.target.textContent;
 True 
 True const input = document.createElement('input');
 True input.type = 'text';
 True input.value = currentText;
 True input.className = 'w-full border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500';
 True 
 True e.target.replaceWith(input);
 True input.focus();
 True 
 True input.addEventListener('blur', () => {
 True const newText = input.value.trim();
 True if (newText) {
 True this.editTask(id, newText);
 True }
 True });
 True 
 True input.addEventListener('keypress', (e) => {
 True if (e.key === 'Enter') {
 True const newText = input.value.trim();
 True if (newText) {
 True this.editTask(id, newText);
 True }
 True }
 True });
 True });
 True });
 True }
 True
 True getFilteredTasks() {
 True switch (this.currentFilter) {
 True case 'active':
 True return this.tasks.filter(task => !task.completed);
 True case 'completed':
 True return this.tasks.filter(task => task.completed);
 True default:
 True return this.tasks;
 True }
 True }
 True
 True updateFilterButtons() {
 True document.querySelectorAll('.filter-btn').forEach(btn => {
 True btn.classList.remove('active');
 True if (btn.dataset.filter === this.currentFilter) {
 True btn.classList.add('active');
 True }
 True });
 True }
 True
 True updateTaskCount() {
 True const activeTasks = this.tasks.filter(task => !task.completed).length;
 True document.getElementById('task-count').textContent = `${activeTasks} item${activeTasks !== 1 ? 's' : ''} left`;
 True }
 True}
 True
 True// Initialize the app
 Truenew ToDoApp();
 True```

 False### 1.2 天气应用
 False
 False#### 1.2.1 功能需求
 False
 False- 显示当前天气
 False- 5天天气预报
 False- 搜索城市
 False- 响应式设计
 False
 False#### 1.2.2 技术栈
 False
 False- HTML5
 False- CSS3 (Tailwind CSS)
 False- JavaScript (ES6+)
 False- OpenWeather API
 False
 False#### 1.2.3 项目结构
 False
```
 Trueweather-app/
 True├── index.html
 True├── style.css
 True├── script.js
 True└── README.md
 True```

 False#### 1.2.4 完整实现
 False
 False**index.html**
 False
```html
 True<!DOCTYPE html>
 True<html lang="en">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>Weather App</title>
 True <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
 True <link rel="stylesheet" href="style.css">
 True</head>
 True<body class="bg-gray-100 min-h-screen">
 True <div class="container mx-auto px-4 py-8">
 True <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Weather App</h1>
 True 
 True <div class="max-w-md mx-auto mb-8">
 True <div class="flex">
 True <input type="text" id="city-input" class="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter city name...">
 True <button id="search-btn" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">Search</button>
 True </div>
 True </div>
 True 
 True <div id="weather-container" class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 hidden">
 True <div class="flex flex-col md:flex-row justify-between items-center mb-8">
 True <div>
 True <h2 id="city-name" class="text-2xl font-bold text-gray-800">City Name</h2>
 True <p id="date" class="text-gray-600">Date</p>
 True </div>
 True <div class="flex items-center mt-4 md:mt-0">
 True <img id="weather-icon" src="" alt="Weather icon" class="w-16 h-16 mr-4">
 True <div>
 True <p id="weather-description" class="text-gray-600 capitalize">Weather Description</p>
 True <p id="temperature" class="text-4xl font-bold text-gray-800">0°C</p>
 True </div>
 True </div>
 True </div>
 True 
 True <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
 True <!-- Forecast items will be added here -->
 True </div>
 True </div>
 True 
 True <div id="error-message" class="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 hidden">
 True <strong class="font-bold">Error:</strong> <span id="error-text">City not found</span>
 True </div>
 True </div>
 True <script src="script.js"></script>
 True</body>
 True</html>
 True```

 False**style.css**
 False
```css
 Truebody {
 True background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 True min-height: 100vh;
 True}
 True
 True#weather-container {
 True background: rgba(255, 255, 255, 0.95);
 True backdrop-filter: blur(10px);
 True}
 True
 True.forecast-item {
 True transition: transform 0.3s ease;
 True}
 True
 True.forecast-item:hover {
 True transform: translateY(-5px);
 True}
 True```

 False**script.js**
 False
```javascript
 Trueclass WeatherApp {
 True constructor() {
 True this.apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
 True this.init();
 True }
 True
 True init() {
 True this.bindEvents();
 True // Default city
 True this.getWeather('New York');
 True }
 True
 True bindEvents() {
 True document.getElementById('search-btn').addEventListener('click', () => {
 True const city = document.getElementById('city-input').value.trim();
 True if (city) {
 True this.getWeather(city);
 True }
 True });
 True
 True document.getElementById('city-input').addEventListener('keypress', (e) => {
 True if (e.key === 'Enter') {
 True const city = e.target.value.trim();
 True if (city) {
 True this.getWeather(city);
 True }
 True }
 True });
 True }
 True
 True async getWeather(city) {
 True try {
 True // Get current weather
 True const currentWeatherResponse = await fetch(
 True `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
 True );
 True
 True if (!currentWeatherResponse.ok) {
 True throw new Error('City not found');
 True }
 True
 True const currentWeather = await currentWeatherResponse.json();
 True
 True // Get forecast
 True const forecastResponse = await fetch(
 True `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
 True );
 True
 True const forecast = await forecastResponse.json();
 True
 True this.displayWeather(currentWeather, forecast);
 True this.hideError();
 True } catch (error) {
 True this.showError(error.message);
 True }
 True }
 True
 True displayWeather(currentWeather, forecast) {
 True // Update current weather
 True document.getElementById('city-name').textContent = currentWeather.name;
 True document.getElementById('date').textContent = this.formatDate(new Date());
 True document.getElementById('weather-description').textContent = currentWeather.weather[0].description;
 True document.getElementById('temperature').textContent = `${Math.round(currentWeather.main.temp)}°C`;
 True document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
 True
 True // Update forecast
 True const forecastContainer = document.querySelector('.grid');
 True forecastContainer.innerHTML = '';
 True
 True // Get daily forecast (every 8 hours)
 True const dailyForecast = [];
 True for (let i = 0; i < forecast.list.length; i += 8) {
 True dailyForecast.push(forecast.list[i]);
 True }
 True
 True dailyForecast.forEach(day => {
 True const forecastItem = document.createElement('div');
 True forecastItem.className = 'forecast-item bg-gray-50 rounded-lg p-4 text-center';
 True forecastItem.innerHTML = `
 True <p class="font-medium text-gray-800">${this.formatDay(new Date(day.dt * 1000))}</p>
 True <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon" class="w-12 h-12 mx-auto my-2">
 True <p class="text-gray-600">${Math.round(day.main.temp)}°C</p>
 True `;
 True forecastContainer.appendChild(forecastItem);
 True });
 True
 True // Show weather container
 True document.getElementById('weather-container').classList.remove('hidden');
 True }
 True
 True formatDate(date) {
 True const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 True return date.toLocaleDateString('en-US', options);
 True }
 True
 True formatDay(date) {
 True const options = { weekday: 'short' };
 True return date.toLocaleDateString('en-US', options);
 True }
 True
 True showError(message) {
 True document.getElementById('error-text').textContent = message;
 True document.getElementById('error-message').classList.remove('hidden');
 True document.getElementById('weather-container').classList.add('hidden');
 True }
 True
 True hideError() {
 True document.getElementById('error-message').classList.add('hidden');
 True }
 True}
 True
 True// Initialize the app
 Truenew WeatherApp();
 True```

 False### 1.3 电商购物车
 False
 False#### 1.3.1 功能需求
 False
 False- 产品列表
 False- 添加到购物车
 False- 购物车管理
 False- 结算功能
 False
 False#### 1.3.2 技术栈
 False
 False- HTML5
 False- CSS3 (Tailwind CSS)
 False- JavaScript (ES6+)
 False- LocalStorage
 False
 False#### 1.3.3 项目结构
 False
```
 Trueshopping-cart/
 True├── index.html
 True├── style.css
 True├── script.js
 True└── README.md
 True```

 False#### 1.3.4 完整实现
 False
 False**index.html**
 False
```html
 True<!DOCTYPE html>
 True<html lang="en">
 True<head>
 True <meta charset="UTF-8">
 True <meta name="viewport" content="width=device-width, initial-scale=1.0">
 True <title>Shopping Cart</title>
 True <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
 True <link rel="stylesheet" href="style.css">
 True</head>
 True<body class="bg-gray-100 min-h-screen">
 True <header class="bg-white shadow-md">
 True <div class="container mx-auto px-4 py-4 flex justify-between items-center">
 True <h1 class="text-2xl font-bold text-gray-800">Shopping Cart</h1>
 True <div class="relative">
 True <button id="cart-btn" class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
 True <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 True <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
 True </svg>
 True Cart <span id="cart-count" class="ml-2 bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center">0</span>
 True </button>
 True <div id="cart-dropdown" class="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 hidden">
 True <h3 class="font-bold text-gray-800 mb-4">Your Cart</h3>
 True <div id="cart-items" class="space-y-4 mb-4">
 True <!-- Cart items will be added here -->
 True </div>
 True <div class="border-t pt-4">
 True <div class="flex justify-between font-bold mb-4">
 True <span>Total:</span>
 True <span id="cart-total">$0.00</span>
 True </div>
 True <button id="checkout-btn" class="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Checkout</button>
 True </div>
 True </div>
 True </div>
 True </div>
 True </header>
 True
 True <main class="container mx-auto px-4 py-8">
 True <h2 class="text-2xl font-bold text-gray-800 mb-6">Products</h2>
 True <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 True <!-- Products will be added here -->
 True </div>
 True </main>
 True
 True <script src="script.js"></script>
 True</body>
 True</html>
 True```

 False**style.css**
 False
```css
 True.product-card {
 True transition: transform 0.3s ease, box-shadow 0.3s ease;
 True}
 True
 True.product-card:hover {
 True transform: translateY(-5px);
 True box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
 True}
 True
 True#cart-dropdown {
 True z-index: 1000;
 True}
 True```

 False**script.js**
 False
```javascript
 Trueclass ShoppingCart {
 True constructor() {
 True this.products = [
 True { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 5, name: 'Product 5', price: 59.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 6, name: 'Product 6', price: 69.99, image: 'https://via.placeholder.com/300x200' }
 True ];
 True this.cart = JSON.parse(localStorage.getItem('cart')) || [];
 True this.init();
 True }
 True
 True init() {
 True this.renderProducts();
 True this.updateCart();
 True this.bindEvents();
 True }
 True
 True bindEvents() {
 True // Cart dropdown toggle
 True document.getElementById('cart-btn').addEventListener('click', () => {
 True document.getElementById('cart-dropdown').classList.toggle('hidden');
 True });
 True
 True // Close dropdown when clicking outside
 True document.addEventListener('click', (e) => {
 True const cartBtn = document.getElementById('cart-btn');
 True const cartDropdown = document.getElementById('cart-dropdown');
 True if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
 True cartDropdown.classList.add('hidden');
 True }
 True });
 True
 True // Checkout button
 True document.getElementById('checkout-btn').addEventListener('click', () => {
 True alert('Checkout functionality would be implemented here');
 True });
 True }
 True
 True renderProducts() {
 True const productsContainer = document.querySelector('.grid');
 True productsContainer.innerHTML = '';
 True
 True this.products.forEach(product => {
 True const productCard = document.createElement('div');
 True productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
 True productCard.innerHTML = `
 True <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
 True <div class="p-4">
 True <h3 class="font-bold text-gray-800 mb-2">${product.name}</h3>
 True <p class="text-blue-600 font-bold mb-4">$${product.price.toFixed(2)}</p>
 True <button class="add-to-cart w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors" data-id="${product.id}">Add to Cart</button>
 True </div>
 True `;
 True productsContainer.appendChild(productCard);
 True });
 True
 True // Bind add to cart events
 True document.querySelectorAll('.add-to-cart').forEach(button => {
 True button.addEventListener('click', (e) => {
 True const productId = parseInt(e.target.dataset.id);
 True this.addToCart(productId);
 True });
 True });
 True }
 True
 True addToCart(productId) {
 True const product = this.products.find(p => p.id === productId);
 True if (product) {
 True const existingItem = this.cart.find(item => item.id === productId);
 True if (existingItem) {
 True existingItem.quantity++;
 True } else {
 True this.cart.push({ ...product, quantity: 1 });
 True }
 True this.saveCart();
 True this.updateCart();
 True // Show success message
 True alert('Product added to cart!');
 True }
 True }
 True
 True removeFromCart(productId) {
 True this.cart = this.cart.filter(item => item.id !== productId);
 True this.saveCart();
 True this.updateCart();
 True }
 True
 True updateQuantity(productId, change) {
 True const item = this.cart.find(item => item.id === productId);
 True if (item) {
 True item.quantity += change;
 True if (item.quantity <= 0) {
 True this.removeFromCart(productId);
 True } else {
 True this.saveCart();
 True this.updateCart();
 True }
 True }
 True }
 True
 True saveCart() {
 True localStorage.setItem('cart', JSON.stringify(this.cart));
 True }
 True
 True updateCart() {
 True // Update cart count
 True const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
 True document.getElementById('cart-count').textContent = cartCount;
 True
 True // Update cart items
 True const cartItemsContainer = document.getElementById('cart-items');
 True cartItemsContainer.innerHTML = '';
 True
 True if (this.cart.length === 0) {
 True cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty</p>';
 True } else {
 True this.cart.forEach(item => {
 True const cartItem = document.createElement('div');
 True cartItem.className = 'flex items-center justify-between';
 True cartItem.innerHTML = `
 True <div class="flex items-center">
 True <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
 True <div class="ml-3">
 True <h4 class="font-medium text-gray-800">${item.name}</h4>
 True <p class="text-gray-600">$${item.price.toFixed(2)}</p>
 True </div>
 True </div>
 True <div class="flex items-center">
 True <button class="quantity-btn bg-gray-200 text-gray-800 w-6 h-6 flex items-center justify-center rounded-l-md" data-id="${item.id}" data-change="-1">-</button>
 True <span class="bg-gray-100 text-gray-800 w-8 h-6 flex items-center justify-center">${item.quantity}</span>
 True <button class="quantity-btn bg-gray-200 text-gray-800 w-6 h-6 flex items-center justify-center rounded-r-md" data-id="${item.id}" data-change="1">+</button>
 True <button class="remove-btn ml-2 text-red-500 hover:text-red-700" data-id="${item.id}">×</button>
 True </div>
 True `;
 True cartItemsContainer.appendChild(cartItem);
 True });
 True
 True // Bind quantity buttons
 True document.querySelectorAll('.quantity-btn').forEach(button => {
 True button.addEventListener('click', (e) => {
 True const productId = parseInt(e.target.dataset.id);
 True const change = parseInt(e.target.dataset.change);
 True this.updateQuantity(productId, change);
 True });
 True });
 True
 True // Bind remove buttons
 True document.querySelectorAll('.remove-btn').forEach(button => {
 True button.addEventListener('click', (e) => {
 True const productId = parseInt(e.target.dataset.id);
 True this.removeFromCart(productId);
 True });
 True });
 True }
 True
 True // Update cart total
 True const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
 True document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
 True }
 True}
 True
 True// Initialize the app
 Truenew ShoppingCart();
 True```

 False## 2. 项目结构与组织
 False
 False### 2.1 模块化设计
 False
 False#### 2.1.1 模块划分
 False
 False- **核心模块**：业务逻辑
 False- **UI 模块**：界面渲染
 False- **服务模块**：API 调用
 False- **工具模块**：通用功能
 False
 False#### 2.1.2 代码组织
 False
```
 Trueproject/
 True├── src/
 True│ ├── components/ # UI 组件
 True│ ├── services/ # API 服务
 True│ ├── utils/ # 工具函数
 True│ ├── store/ # 状态管理
 True│ ├── styles/ # 样式文件
 True│ └── main.js # 入口文件
 True├── public/ # 静态资源
 True├── package.json # 项目配置
 True└── README.md # 项目说明
 True```

 False### 2.2 依赖管理
 False
 False#### 2.2.1 package.json 示例
 False
```json
 True{
 True "name": "my-project",
 True "version": "1.0.0",
 True "description": "My JavaScript project",
 True "main": "src/main.js",
 True "scripts": {
 True "dev": "vite",
 True "build": "vite build",
 True "preview": "vite preview",
 True "test": "jest",
 True "lint": "eslint src"
 True },
 True "dependencies": {
 True "axios": "^0.27.2",
 True "tailwindcss": "^3.1.8"
 True },
 True "devDependencies": {
 True "vite": "^3.1.0",
 True "eslint": "^8.23.1",
 True "jest": "^28.1.3"
 True }
 True}
 True```

 False### 2.3 前端构建工具
 False
 False#### 2.3.1 Vite
 False
 False- **快速的开发服务器**
 False- **优化的构建过程**
 False- **支持 ES 模块**
 False
 False#### 2.3.2 Webpack
 False
 False- **强大的打包能力**
 False- **丰富的插件生态**
 False- **适合大型项目**
 False
 False## 3. 测试
 False
 False### 3.1 单元测试
 False
 False#### 3.1.1 Jest 配置
 False
```json
 True{
 True "testEnvironment": "jsdom",
 True "transform": {
 True "^.+\.js$": "babel-jest"
 True }
 True}
 True```

 False#### 3.1.2 测试示例
 False
```javascript
 True// utils.test.js
 Trueconst { sum, multiply } = require('./utils');
 True
 Truetest('sum adds two numbers', () => {
 True expect(sum(1, 2)).toBe(3);
 True});
 True
 Truetest('multiply multiplies two numbers', () => {
 True expect(multiply(2, 3)).toBe(6);
 True});
 True```

 False### 3.2 集成测试
 False
 False#### 3.2.1 Cypress 配置
 False
```json
 True{
 True "baseUrl": "http://localhost:3000",
 True "viewportWidth": 1280,
 True "viewportHeight": 720
 True}
 True```

 False#### 3.2.2 测试示例
 False
```javascript
 True// cypress/integration/home.spec.js
 Truedescribe('Home page', () => {
 True it('should load the home page', () => {
 True cy.visit('/');
 True cy.contains('Welcome to My App');
 True });
 True
 True it('should display products', () => {
 True cy.visit('/');
 True cy.get('.product-card').should('have.length.greaterThan', 0);
 True });
 True});
 True```

 False## 4. 部署
 False
 False### 4.1 静态网站部署
 False
 False#### 4.1.1 GitHub Pages
 False
 False- **步骤**：
 False 1. 构建项目：`npm run build`
 False 2. 推送 dist 目录到 gh-pages 分支
 False 3. 在 GitHub 仓库设置中启用 Pages
 False
 False#### 4.1.2 Netlify
 False
 False- **步骤**：
 False 1. 连接 GitHub 仓库
 False 2. 配置构建命令：`npm run build`
 False 3. 配置发布目录：`dist`
 False 4. 部署
 False
 False#### 4.1.3 Vercel
 False
 False- **步骤**：
 False 1. 连接 GitHub 仓库
 False 2. 配置构建命令：`npm run build`
 False 3. 配置发布目录：`dist`
 False 4. 部署
 False
 False### 4.2 容器化部署
 False
 False#### 4.2.1 Dockerfile 示例
 False
```dockerfile
 TrueFROM node:16-alpine
 True
 TrueWORKDIR /app
 True
 TrueCOPY package*.json ./
 TrueRUN npm install
 True
 TrueCOPY . .
 True
 TrueRUN npm run build
 True
 TrueEXPOSE 3000
 True
 TrueCMD ["npm", "start"]
 True```

 False#### 4.2.2 docker-compose.yml 示例
 False
```yaml
 Trueversion: '3'
 Trueservices:
 True app:
 True build: .
 True ports:
 True - "3000:3000"
 True environment:
 True - NODE_ENV=production
 True```

 False### 4.3 CI/CD 配置
 False
 False#### 4.3.1 GitHub Actions 示例
 False
```yaml
 Truename: CI/CD
 True
 Trueon:
 True push:
 True branches: [ main ]
 True pull_request:
 True branches: [ main ]
 True
 Truejobs:
 True build:
 True runs-on: ubuntu-latest
 True steps:
 True - uses: actions/checkout@v3
 True - name: Setup Node.js
 True uses: actions/setup-node@v3
 True with:
 True node-version: '16'
 True - name: Install dependencies
 True run: npm install
 True - name: Run tests
 True run: npm test
 True - name: Build
 True run: npm run build
 True - name: Deploy to GitHub Pages
 True if: github.ref == 'refs/heads/main'
 True uses: peaceiris/actions-gh-pages@v3
 True with:
 True github_token: ${{ secrets.GITHUB_TOKEN }}
 True publish_dir: ./dist
 True```

 False## 5. 性能优化
 False
 False### 5.1 代码优化
 False
 False#### 5.1.1 代码分割
 False
 False- **按需加载**：使用动态导入
 False- **减少初始包大小**：分割 vendor 和 app 代码
 False
 False#### 5.1.2 懒加载
 False
 False- **图片懒加载**：使用 `loading="lazy"` 属性
 False- **组件懒加载**：使用动态导入
 False
 False#### 5.1.3 缓存策略
 False
 False- **浏览器缓存**：设置合理的缓存头
 False- **Service Worker**：离线缓存
 False
 False### 5.2 网络优化
 False
 False#### 5.2.1 资源压缩
 False
 False- **Gzip/Brotli 压缩**
 False- **代码压缩**
 False- **图片压缩**
 False
 False#### 5.2.2 CDN
 False
 False- **使用内容分发网络**
 False- **减少网络延迟**
 False
 False#### 5.2.3 资源提示
 False
 False- **preload**：预加载关键资源
 False- **prefetch**：预加载未来可能使用的资源
 False- **dns-prefetch**：预解析 DNS
 False
 False## 6. 安全最佳实践
 False
 False### 6.1 XSS 防护
 False
 False- **输入验证**：验证用户输入
 False- **输出编码**：编码输出到页面的内容
 False- **Content Security Policy**：设置 CSP 头
 False
 False### 6.2 CSRF 防护
 False
 False- **CSRF 令牌**：使用 CSRF 令牌
 False- **SameSite Cookie**：设置 SameSite 属性
 False
 False### 6.3 数据验证
 False
 False- **前端验证**：客户端验证
 False- **后端验证**：服务器端验证
 False- **使用验证库**：如 Joi、Yup
 False
 False## 7. 实际应用案例
 False
 False### 7.1 完整项目示例
 False
 False#### 7.1.1 项目结构
 False
```
 Truemy-app/
 True├── src/
 True│ ├── components/
 True│ │ ├── Header.js
 True│ │ ├── Footer.js
 True│ │ └── ProductCard.js
 True│ ├── services/
 True│ │ └── api.js
 True│ ├── utils/
 True│ │ └── helpers.js
 True│ ├── styles/
 True│ │ └── main.css
 True│ └── main.js
 True├── public/
 True│ └── index.html
 True├── package.json
 True└── README.md
 True```

 False#### 7.1.2 核心文件
 False
 False**src/main.js**
 False
```javascript
 Trueimport './styles/main.css';
 Trueimport { initApp } from './app';
 True
 TrueinitApp();
 True```

 False**src/app.js**
 False
```javascript
 Trueimport { fetchProducts } from './services/api';
 Trueimport { renderProducts } from './components/ProductCard';
 True
 Trueexport function initApp() {
 True // Initialize the app
 True console.log('App initialized');
 True 
 True // Fetch and render products
 True fetchProducts()
 True .then(products => {
 True renderProducts(products);
 True })
 True .catch(error => {
 True console.error('Error fetching products:', error);
 True });
 True}
 True```

 False**src/services/api.js**
 False
```javascript
 Trueexport async function fetchProducts() {
 True try {
 True const response = await fetch('https://api.example.com/products');
 True if (!response.ok) {
 True throw new Error('Failed to fetch products');
 True }
 True return await response.json();
 True } catch (error) {
 True console.error('Error fetching products:', error);
 True // Return mock data for demonstration
 True return [
 True { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/300x200' },
 True { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/300x200' }
 True ];
 True }
 True}
 True```

 False**src/components/ProductCard.js**
 False
```javascript
 Trueexport function renderProducts(products) {
 True const container = document.querySelector('.products-container');
 True container.innerHTML = '';
 True 
 True products.forEach(product => {
 True const card = document.createElement('div');
 True card.className = 'product-card';
 True card.innerHTML = `
 True <img src="${product.image}" alt="${product.name}">
 True <h3>${product.name}</h3>
 True <p>$${product.price.toFixed(2)}</p>
 True <button class="add-to-cart">Add to Cart</button>
 True `;
 True container.appendChild(card);
 True });
 True}
 True```

 False## 8. 常见问题与解决方案
 False
 False### 8.1 项目构建问题
 False
 False**问题**：构建失败
 False**解决方案**：
 False
 False- 检查依赖是否正确安装
 False- 检查构建配置
 False- 查看错误信息并修复
 False
 False**问题**：构建产物过大
 False**解决方案**：
 False
 False- 代码分割
 False- 树摇（Tree Shaking）
 False- 压缩资源
 False
 False### 8.2 运行时问题
 False
 False**问题**：页面加载缓慢
 False**解决方案**：
 False
 False- 优化资源加载
 False- 懒加载
 False- 缓存策略
 False
 False**问题**：JavaScript 错误
 False**解决方案**：
 False
 False- 检查控制台错误
 False- 使用 try-catch 处理异常
 False- 调试代码
 False
 False### 8.3 部署问题
 False
 False**问题**：部署失败
 False**解决方案**：
 False
 False- 检查部署配置
 False- 查看部署日志
 False- 确保构建产物正确
 False
 False**问题**：网站无法访问
 False**解决方案**：
 False
 False- 检查域名配置
 False- 检查服务器状态
 False- 查看网络连接
 False
 False## 9. 最佳实践
 False
 False### 9.1 代码规范
 False
 False- **使用 ESLint**：保持代码风格一致
 False- **使用 Prettier**：自动格式化代码
 False- **遵循命名规范**：使用驼峰命名法
 False- **添加注释**：解释复杂代码
 False
 False### 9.2 项目管理
 False
 False- **使用 Git**：版本控制
 False- **使用 GitHub Issues**：任务管理
 False- **使用 Pull Requests**：代码审查
 False- **编写 README**：项目文档
 False
 False### 9.3 性能优化
 False
 False- **监控性能**：使用 Chrome DevTools
 False- **优化渲染**：减少重排和重绘
 False- **优化网络**：减少请求和响应大小
 False- **优化 JavaScript**：避免长任务
 False
 False### 9.4 安全性
 False
 False- **输入验证**：验证所有用户输入
 False- **使用 HTTPS**：加密传输
 False- **保护敏感数据**：避免暴露敏感信息
 False- **定期更新依赖**：修复安全漏洞
 False
 False## 10. 延伸阅读
 False
 False- [MDN Web 开发文档](https://developer.mozilla.org/en-US/docs/Web) <!-- nofollow -->
 False- [JavaScript.info](https://javascript.info/) <!-- nofollow -->
 False- [Frontend Masters](https://frontendmasters.com/) <!-- nofollow -->
 False- [CSS-Tricks](https://css-tricks.com/) <!-- nofollow -->
 False- [Smashing Magazine](https://www.smashingmagazine.com/) <!-- nofollow -->
 False
 False## 11. 更新日志
 False
 False- **2026-04-05**: 初始化项目实战，涵盖简易待办事项应用的设计与核心实现。
 False- **2026-05-03**: 扩展内容，添加更完整的项目实战案例、项目结构和组织、前端构建工具、测试、部署、性能优化、安全最佳实践等内容。
 False