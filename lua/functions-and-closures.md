# 04-函数与闭包 | Functions and Closures
 False
 False> @Author: fanquanpp
 False> @Category: Lua Basics
 False> @Description: 04-函数与闭包 | Functions and Closures
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [函数基础 | Function Basics](#函数基础-|-function-basics)
 False2. [闭包 | Closures](#闭包-|-closures)
 False3. [高阶函数 | Higher-Order Functions](#高阶函数-|-higher-order-functions)
 False4. [尾调用优化 | Tail Call Optimization](#尾调用优化-|-tail-call-optimization)
 False5. [实践案例 | Practical Examples](#实践案例-|-practical-examples)
 False6. [总结 | Summary](#总结-|-summary)
 False
 False---
 False
 False## 1. 函数基础 | Function Basics
 False
 False### 1.1 函数定义与调用
 False
 False在 Lua 中，函数是一种值，可以像其他值一样存储、传递和返回。函数定义有两种方式：
 False
```lua
 True-- 方式一：标准函数定义
 Truefunction add(a, b)
 True return a + b
 Trueend
 True
 True-- 方式二：函数表达式
 Truelocal multiply = function(a, b)
 True return a * b
 Trueend
 True
 True-- 调用函数
 Trueprint(add(1, 2)) -- 输出 3
 Trueprint(multiply(3, 4)) -- 输出 12
 True```

 False### 1.2 多返回值
 False
 FalseLua 函数可以返回多个值，这是 Lua 的一个重要特性：
 False
```lua
 Truefunction getMinMax(a, b, c)
 True local min = math.min(a, b, c)
 True local max = math.max(a, b, c)
 True return min, max
 Trueend
 True
 Truelocal minVal, maxVal = getMinMax(10, 5, 8)
 Trueprint("最小值:", minVal) -- 输出 5
 Trueprint("最大值:", maxVal) -- 输出 10
 True```

 False### 1.3 可变参数
 False
 False使用 `...` 表示可变参数：
 False
```lua
 Truefunction sum(...) 
 True local total = 0
 True for i, v in ipairs({...}) do
 True total = total + v
 True end
 True return total
 Trueend
 True
 Trueprint(sum(1, 2, 3, 4, 5)) -- 输出 15
 True```

 False## 2. 闭包 | Closures
 False
 False### 2.1 闭包的概念
 False
 False闭包是一个函数，它可以访问其定义环境中的变量，即使在定义环境不存在的情况下：
 False
```lua
 Truefunction createCounter()
 True local count = 0
 True return function()
 True count = count + 1
 True return count
 True end
 Trueend
 True
 Truelocal counter1 = createCounter()
 Truelocal counter2 = createCounter()
 True
 Trueprint(counter1()) -- 输出 1
 Trueprint(counter1()) -- 输出 2
 Trueprint(counter2()) -- 输出 1（独立的计数器）
 True```

 False### 2.2 闭包的应用
 False
 False闭包在 Lua 中非常常用，特别是在以下场景：
 False
 False- **封装私有变量**：通过闭包创建私有变量，实现信息隐藏
 False- **回调函数**：创建带有上下文的回调函数
 False- **函数工厂**：根据参数创建不同行为的函数
 False
```lua
 True-- 封装私有变量
 Truefunction createPerson(name)
 True local age = 0
 True return {
 True setAge = function(newAge)
 True age = newAge
 True end,
 True getAge = function()
 True return age
 True end,
 True getName = function()
 True return name
 True end
 True }
 Trueend
 True
 Truelocal person = createPerson("张三")
 Trueperson.setAge(30)
 Trueprint(person.getName(), "的年龄是", person.getAge()) -- 输出 张三 的年龄是 30
 True```

 False## 3. 高阶函数 | Higher-Order Functions
 False
 False高阶函数是指接受函数作为参数或返回函数的函数：
 False
```lua
 True-- 接受函数作为参数
 Truefunction apply(func, value)
 True return func(value)
 Trueend
 True
 True-- 返回函数
 Truefunction createMultiplier(factor)
 True return function(n)
 True return n * factor
 True end
 Trueend
 True
 Truelocal double = createMultiplier(2)
 Truelocal triple = createMultiplier(3)
 True
 Trueprint(apply(double, 5)) -- 输出 10
 Trueprint(apply(triple, 5)) -- 输出 15
 True```

 False## 4. 尾调用优化 | Tail Call Optimization
 False
 FalseLua 支持尾调用优化，当函数的最后一个动作是调用另一个函数时，不会创建新的栈帧：
 False
```lua
 Truefunction factorial(n, acc)
 True acc = acc or 1
 True if n <= 1 then
 True return acc
 True end
 True -- 尾调用：函数最后一个动作是调用自身
 True return factorial(n - 1, n * acc)
 Trueend
 True
 Trueprint(factorial(10000)) -- 不会栈溢出，因为使用了尾调用优化
 True```

 False## 5. 实践案例 | Practical Examples
 False
 False### 5.1 事件处理器
 False
```lua
 Truefunction createEventHandler()
 True local listeners = {}
 True 
 True return {
 True on = function(event, callback)
 True if not listeners[event] then
 True listeners[event] = {}
 True end
 True table.insert(listeners[event], callback)
 True end,
 True 
 True emit = function(event, ...)
 True if listeners[event] then
 True for _, callback in ipairs(listeners[event]) do
 True callback(...)
 True end
 True end
 True end
 True }
 Trueend
 True
 True-- 使用示例
 Truelocal eventBus = createEventHandler()
 True
 TrueeventBus.on("userLoggedIn", function(username)
 True print("用户登录:", username)
 Trueend)
 True
 TrueeventBus.emit("userLoggedIn", "admin") -- 输出 用户登录: admin
 True```

 False### 5.2 函数记忆化
 False
```lua
 Truefunction memoize(func)
 True local cache = {}
 True return function(...) 
 True local key = table.concat({...}, "_")
 True if not cache[key] then
 True cache[key] = func(...)
 True end
 True return cache[key]
 True end
 Trueend
 True
 True-- 计算斐波那契数列（使用记忆化）
 Truelocal fib = memoize(function(n)
 True if n <= 1 then
 True return n
 True end
 True return fib(n - 1) + fib(n - 2)
 Trueend)
 True
 Trueprint(fib(40)) -- 快速计算，因为结果被缓存了
 True```

 False## 6. 总结 | Summary
 False
 False- 函数是 Lua 中的一等公民，可以像其他值一样处理
 False- 多返回值是 Lua 的一个重要特性，方便函数返回多个结果
 False- 闭包允许函数访问其定义环境中的变量，实现信息隐藏和状态保持
 False- 高阶函数使代码更加灵活和模块化
 False- 尾调用优化避免了递归函数的栈溢出问题
 False
 False通过掌握函数和闭包的使用，可以编写更加优雅、模块化的 Lua 代码，特别是在游戏开发和嵌入式系统中。
 False