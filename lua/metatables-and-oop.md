# 元表与面向对象编程 (Metatables & OOP)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Lua Advanced
 False> @Description: 元表、元方法、面向对象模拟及协程。 | Metatables, Metamethods, OOP simulation, and Coroutines.
 False
 False---
 False
 False## 目录
 False
 False1. [元表](#元表)
 False2. [面向对象编程](#面向对象编程)
 False3. [协程](#协程)
 False4. [高级特性](#高级特性)
 False5. [实战案例](#实战案例)
 False6. [最佳实践](#最佳实践)
 False7. [延伸阅读](#延伸阅读)
 False8. [更新日志](#更新日志)
 False
 False---
 False
 False## 1. 元表 (Metatables)
 False
 False### 1.1 元表基础
 False
 False元表允许我们改变 Table 的行为，通过定义元方法来重载运算符、控制访问等。
 False
```lua
 True-- 创建元表
 Truelocal meta = {
 True -- 重载加法运算符
 True __add = function(a, b)
 True return a.value + b.value
 True end,
 True -- 重载乘法运算符
 True __mul = function(a, b)
 True return a.value * b.value
 True end,
 True -- 重载字符串转换
 True __tostring = function(self)
 True return "Value: " .. self.value
 True end
 True}
 True
 True-- 创建表并设置元表
 Truelocal t1 = { value = 10 }
 Truelocal t2 = { value = 20 }
 Truesetmetatable(t1, meta)
 Truesetmetatable(t2, meta)
 True
 True-- 使用重载的运算符
 Trueprint(t1 + t2) -- 30
 Trueprint(t1 * t2) -- 200
 Trueprint(t1) -- Value: 10
 True```

 False### 1.2 常用元方法
 False
 False| 元方法 | 描述 | 示例 |
 False|--------|------|------|
 False| `__add` | 加法运算符 `+` | `a + b` |
 False| `__sub` | 减法运算符 `-` | `a - b` |
 False| `__mul` | 乘法运算符 `*` | `a * b` |
 False| `__div` | 除法运算符 `/` | `a / b` |
 False| `__mod` | 取模运算符 `%` | `a % b` |
 False| `__pow` | 幂运算符 `^` | `a ^ b` |
 False| `__unm` | 一元负号 `-` | `-a` |
 False| `__concat` | 连接运算符 `..` | `a .. b` |
 False| `__eq` | 等于运算符 `==` | `a == b` |
 False| `__lt` | 小于运算符 `<` | `a < b` |
 False| `__le` | 小于等于运算符 `<=` | `a <= b` |
 False| `__index` | 访问不存在的键时调用 | `t[key]` |
 False| `__newindex` | 赋值不存在的键时调用 | `t[key] = value` |
 False| `__call` | 调用表作为函数时调用 | `t()` |
 False| `__tostring` | 转换为字符串时调用 | `tostring(t)` |
 False| `__len` | 获取长度时调用 | `#t` |
 False
 False### 1.3 高级元表技巧
 False
 False#### 1.3.1 保护表
 False
```lua
 Truefunction readonly(table)
 True return setmetatable({}, {
 True __index = table,
 True __newindex = function(self, key, value)
 True error("Attempt to modify read-only table", 2)
 True end,
 True __metatable = false -- 防止获取元表
 True })
 Trueend
 True
 Truelocal original = { value = 10 }
 Truelocal readonly_table = readonly(original)
 Trueprint(readonly_table.value) -- 10
 True-- readonly_table.value = 20 -- 会报错
 True```

 False#### 1.3.2 自动创建表
 False
```lua
 Truefunction autotable()
 True return setmetatable({}, {
 True __index = function(self, key)
 True local value = autotable()
 True rawset(self, key, value)
 True return value
 True end
 True })
 Trueend
 True
 Truelocal t = autotable()
 Truet.a.b.c.d = 10
 Trueprint(t.a.b.c.d) -- 10
 True```

 False## 2. 面向对象编程 (OOP)
 False
 False### 2.1 基础类实现
 False
```lua
 True-- 定义类
 Truelocal Person = {}
 TruePerson.__index = Person
 True
 True-- 构造函数
 Truefunction Person:new(name, age)
 True local o = {}
 True setmetatable(o, self)
 True o.name = name
 True o.age = age
 True return o
 Trueend
 True
 True-- 方法
 Truefunction Person:greet()
 True return "Hello, my name is " .. self.name .. " and I'm " .. self.age .. " years old"
 Trueend
 True
 True-- 创建实例
 Truelocal alice = Person:new("Alice", 30)
 Trueprint(alice:greet()) -- Hello, my name is Alice and I'm 30 years old
 True```

 False### 2.2 继承
 False
```lua
 True-- 基类
 Truelocal Animal = {}
 TrueAnimal.__index = Animal
 True
 Truefunction Animal:new(name)
 True local o = {}
 True setmetatable(o, self)
 True o.name = name
 True return o
 Trueend
 True
 Truefunction Animal:speak()
 True return "Some generic sound"
 Trueend
 True
 True-- 派生类
 Truelocal Dog = {}
 Truesetmetatable(Dog, { __index = Animal })
 TrueDog.__index = Dog
 True
 Truefunction Dog:new(name, breed)
 True local o = Animal:new(name)
 True setmetatable(o, self)
 True o.breed = breed
 True return o
 Trueend
 True
 Truefunction Dog:speak()
 True return "Woof!"
 Trueend
 True
 True-- 创建实例
 Truelocal rover = Dog:new("Rover", "Labrador")
 Trueprint(rover:speak()) -- Woof!
 Trueprint(rover.name) -- Rover
 Trueprint(rover.breed) -- Labrador
 True```

 False### 2.3 多继承
 False
```lua
 Truefunction createClass(...) 
 True local class = {}
 True local parents = { ... }
 True 
 True -- 设置元表，实现多继承
 True setmetatable(class, {
 True __index = function(self, key)
 True for _, parent in ipairs(parents) do
 True local value = parent[key]
 True if value then
 True return value
 True end
 True end
 True end
 True })
 True 
 True class.__index = class
 True 
 True function class:new(o)
 True o = o or {}
 True setmetatable(o, self)
 True return o
 True end
 True 
 True return class
 Trueend
 True
 True-- 定义父类
 Truelocal A = {}
 TrueA.__index = A
 Truefunction A:methodA() return "Method A" end
 True
 Truelocal B = {}
 TrueB.__index = B
 Truefunction B:methodB() return "Method B" end
 True
 True-- 创建子类
 Truelocal C = createClass(A, B)
 True
 True-- 创建实例
 Truelocal c = C:new()
 Trueprint(c:methodA()) -- Method A
 Trueprint(c:methodB()) -- Method B
 True```

 False### 2.4 访问控制
 False
```lua
 Truelocal Account = {}
 TrueAccount.__index = Account
 True
 Truefunction Account:new(balance)
 True local o = {}
 True setmetatable(o, self)
 True o._balance = balance or 0 -- 私有变量
 True return o
 Trueend
 True
 Truefunction Account:deposit(amount)
 True self._balance = self._balance + amount
 Trueend
 True
 Truefunction Account:withdraw(amount)
 True if amount <= self._balance then
 True self._balance = self._balance - amount
 True return true
 True else
 True return false
 True end
 Trueend
 True
 Truefunction Account:getBalance()
 True return self._balance
 Trueend
 True
 True-- 创建实例
 Truelocal account = Account:new(1000)
 Trueaccount:deposit(500)
 Trueprint(account:getBalance()) -- 1500
 Trueprint(account._balance) -- 1500 (注意：Lua 没有真正的私有变量)
 True```

 False## 3. 协程 (Coroutines)
 False
 False### 3.1 基础使用
 False
```lua
 True-- 创建协程
 Truelocal co = coroutine.create(function(name)
 True print("Hello, " .. name)
 True local value = coroutine.yield("Yielding...")
 True print("Received: " .. value)
 True return "Done"
 Trueend)
 True
 True-- 启动协程
 Truelocal status, result = coroutine.resume(co, "Alice")
 Trueprint(status, result) -- true Yielding...
 True
 True-- 继续协程
 Truestatus, result = coroutine.resume(co, "World")
 Trueprint(status, result) -- true Done
 True
 True-- 再次启动协程（已经结束）
 Truestatus, result = coroutine.resume(co)
 Trueprint(status, result) -- false cannot resume dead coroutine
 True```

 False### 3.2 协程状态
 False
```lua
 Truelocal co = coroutine.create(function()
 True print("Starting")
 True coroutine.yield()
 True print("Resumed")
 Trueend)
 True
 Trueprint(coroutine.status(co)) -- suspended
 Truecoroutine.resume(co) -- Starting
 Trueprint(coroutine.status(co)) -- suspended
 Truecoroutine.resume(co) -- Resumed
 Trueprint(coroutine.status(co)) -- dead
 True```

 False### 3.3 生产者-消费者模式
 False
```lua
 Truefunction producer()
 True return coroutine.create(function()
 True local i = 0
 True while true do
 True i = i + 1
 True coroutine.yield(i)
 True end
 True end)
 Trueend
 True
 Truefunction consumer(prod)
 True while true do
 True local status, value = coroutine.resume(prod)
 True if status then
 True print("Received: " .. value)
 True if value >= 5 then break end
 True else
 True break
 True end
 True end
 Trueend
 True
 Truelocal prod = producer()
 Trueconsumer(prod)
 True```

 False### 3.4 协程池
 False
```lua
 Truelocal function createCoroutinePool(size, func)
 True local pool = {}
 True for i = 1, size do
 True pool[i] = coroutine.create(func)
 True end
 True return pool
 Trueend
 True
 Truelocal function worker()
 True while true do
 True local task = coroutine.yield()
 True print("Processing task: " .. task)
 True end
 Trueend
 True
 Truelocal pool = createCoroutinePool(3, worker)
 True
 True-- 分配任务
 Truefor i, co in ipairs(pool) do
 True coroutine.resume(co, "Task " .. i)
 Trueend
 True
 True-- 再次分配任务
 Truefor i, co in ipairs(pool) do
 True coroutine.resume(co, "Task " .. (i + 3))
 Trueend
 True```

 False## 4. 高级特性
 False
 False### 4.1 闭包
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
 Truelocal counter = createCounter()
 Trueprint(counter()) -- 1
 Trueprint(counter()) -- 2
 Trueprint(counter()) -- 3
 True```

 False### 4.2 模块系统
 False
```lua
 True-- mymodule.lua
 Truelocal M = {}
 True
 Truefunction M.add(a, b)
 True return a + b
 Trueend
 True
 Truefunction M.sub(a, b)
 True return a - b
 Trueend
 True
 Truereturn M
 True
 True-- 使用模块
 Truelocal math = require("mymodule")
 Trueprint(math.add(10, 5)) -- 15
 Trueprint(math.sub(10, 5)) -- 5
 True```

 False### 4.3 元编程
 False
```lua
 Truefunction createAccessor(obj, name)
 True return function(value)
 True if value ~= nil then
 True obj[name] = value
 True end
 True return obj[name]
 True end
 Trueend
 True
 Truelocal person = {}
 Truelocal name = createAccessor(person, "name")
 Truelocal age = createAccessor(person, "age")
 True
 Truename("Alice")
 Trueage(30)
 Trueprint(name()) -- Alice
 Trueprint(age()) -- 30
 True```

 False### 4.4 垃圾回收
 False
```lua
 True-- 弱表
 Truelocal weakTable = setmetatable({}, { __mode = "k" })
 True
 Truelocal key = {}
 TrueweakTable[key] = "value"
 Trueprint(weakTable[key]) -- value
 True
 Truekey = nil -- 释放引用
 Truecollectgarbage() -- 强制垃圾回收
 Trueprint(weakTable[key]) -- nil
 True```

 False## 5. 实战案例
 False
 False### 5.1 事件系统
 False
```lua
 Truelocal EventSystem = {}
 TrueEventSystem.__index = EventSystem
 True
 Truefunction EventSystem:new()
 True local o = {}
 True setmetatable(o, self)
 True o.events = {}
 True return o
 Trueend
 True
 Truefunction EventSystem:on(event, callback)
 True if not self.events[event] then
 True self.events[event] = {}
 True end
 True table.insert(self.events[event], callback)
 Trueend
 True
 Truefunction EventSystem:emit(event, ...)
 True if self.events[event] then
 True for _, callback in ipairs(self.events[event]) do
 True callback(...)
 True end
 True end
 Trueend
 True
 Truefunction EventSystem:off(event, callback)
 True if self.events[event] then
 True for i, cb in ipairs(self.events[event]) do
 True if cb == callback then
 True table.remove(self.events[event], i)
 True break
 True end
 True end
 True end
 Trueend
 True
 True-- 使用事件系统
 Truelocal events = EventSystem:new()
 True
 True-- 注册事件
 Truelocal function onUserLoggedIn(username)
 True print("User logged in: " .. username)
 Trueend
 True
 Trueevents:on("userLoggedIn", onUserLoggedIn)
 True
 True-- 触发事件
 Trueevents:emit("userLoggedIn", "Alice") -- User logged in: Alice
 True
 True-- 移除事件
 Trueevents:off("userLoggedIn", onUserLoggedIn)
 Trueevents:emit("userLoggedIn", "Bob") -- 无输出
 True```

 False### 5.2 简单的类库
 False
```lua
 True-- 定义类
 Truelocal Vector2 = {}
 TrueVector2.__index = Vector2
 True
 Truefunction Vector2:new(x, y)
 True local o = {}
 True setmetatable(o, self)
 True o.x = x or 0
 True o.y = y or 0
 True return o
 Trueend
 True
 Truefunction Vector2:add(other)
 True return Vector2:new(self.x + other.x, self.y + other.y)
 Trueend
 True
 Truefunction Vector2:sub(other)
 True return Vector2:new(self.x - other.x, self.y - other.y)
 Trueend
 True
 Truefunction Vector2:mul(scalar)
 True return Vector2:new(self.x * scalar, self.y * scalar)
 Trueend
 True
 Truefunction Vector2:mag()
 True return math.sqrt(self.x * self.x + self.y * self.y)
 Trueend
 True
 Truefunction Vector2:__tostring()
 True return "Vector2(" .. self.x .. ", " .. self.y .. ")"
 Trueend
 True
 True-- 重载运算符
 TrueVector2.__add = Vector2.add
 TrueVector2.__sub = Vector2.sub
 TrueVector2.__mul = Vector2.mul
 True
 True-- 使用向量
 Truelocal v1 = Vector2:new(1, 2)
 Truelocal v2 = Vector2:new(3, 4)
 Truelocal v3 = v1 + v2
 Trueprint(v3) -- Vector2(4, 6)
 Trueprint(v3:mag()) -- 7.211102550928
 True```

 False## 6. 最佳实践
 False
 False### 6.1 代码组织
 False
 False- **模块化**: 将相关功能组织到模块中
 False- **命名规范**: 使用一致的命名约定
 False- **代码风格**: 保持一致的缩进和代码风格
 False- **注释**: 为复杂代码添加注释
 False
 False### 6.2 性能优化
 False
 False- **避免全局变量**: 使用局部变量提高访问速度
 False- **表操作**: 预分配表大小，避免频繁扩容
 False- **字符串操作**: 避免频繁字符串连接，使用 table.concat
 False- **垃圾回收**: 合理使用弱表，避免内存泄漏
 False
 False### 6.3 错误处理
 False
 False- **断言**: 使用 assert 检查参数
 False- **错误处理**: 使用 pcall 捕获错误
 False- **错误消息**: 提供清晰的错误消息
 False
 False### 6.4 调试技巧
 False
 False- **打印调试**: 使用 print 或 io.write 输出调试信息
 False- **调试器**: 使用 Lua 调试器
 False- **日志系统**: 实现简单的日志系统
 False
 False## 7. 延伸阅读
 False
 False- [Programming in Lua](https://www.lua.org/pil/)
 False- [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/)
 False- [Lua Wiki](http://lua-users.org/wiki/)
 False- [Lua Performance Tips](http://lua-users.org/wiki/PerformanceTips)
 False
 False## 8. 更新日志
 False
 False- **2026-04-05**: 细化元表机制与协程原理
 False- **2026-04-05**: 扩展内容，增加面向对象编程、高级特性和实战案例
 False