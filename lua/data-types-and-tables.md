# 数据类型与 Table 详解 (Data Types & Tables)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Lua Basics
 False> @Description: Lua 8 种基础类型及核心数据结构 Table 的深度解析。 | Lua's 8 basic types and in-depth look at Tables.
 False
 False---
 False
 False## 目录
 False
 False1. [基础数据类型](#基础数据类型)
 False2. [Table 核心](#table-核心)
 False3. [数据类型的特殊特性](#数据类型的特殊特性)
 False4. [最佳实践](#最佳实践)
 False5. [代码示例](#代码示例)
 False6. [总结](#总结)
 False
 False---
 False
 False## 1. 基础数据类型 (8 种)
 False
 FalseLua 是动态类型语言，变量的类型在运行时确定。Lua 有 8 种基础数据类型：
 False
 False| 类型 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **`nil`** | 无效值，表示"不存在" | `local x = nil` |
 False| **`boolean`** | 布尔值，只有 `true` 和 `false` | `local flag = true` |
 False| **`number`** | 数值，默认是双精度浮点数 (Lua 5.3+ 引入整型子类型) | `local num = 10`, `local int = 42`, `local float = 3.14` |
 False| **`string`** | 字符串，支持单引号、双引号和多行字符串 | `local str = "Hello"`, `local multiline = [[Line 1
 FalseLine 2]]` |
 False| **`function`** | 函数，是一等公民 | `local add = function(a, b) return a + b end` |
 False| **`table`** | 表，Lua 唯一的容器类型 | `local t = {1, 2, 3}` |
 False| **`thread`** | 线程，主要用于协程 | `local co = coroutine.create(function() end)` |
 False| **`userdata`** | 用户数据，用于 C 语言扩展 | `local ud = ffi.new("int[10]")` |
 False
 False### 1.1 类型判断
 False
 False使用 `type()` 函数可以判断变量的类型：
 False
```lua
 Trueprint(type(nil)) -- nil
 Trueprint(type(true)) -- boolean
 Trueprint(type(10)) -- number
 Trueprint(type("hello")) -- string
 Trueprint(type(function() end)) -- function
 Trueprint(type({})) -- table
 Trueprint(type(coroutine.create(function() end))) -- thread
 True```

 False### 1.2 类型转换
 False
 False#### 1.2.1 数值与字符串转换
 False
```lua
 True-- 数值转字符串
 Truelocal num = 10
 Truelocal str = tostring(num) -- "10"
 True
 True-- 字符串转数值
 Truelocal str = "123"
 Truelocal num1 = tonumber(str) -- 123
 Truelocal num2 = tonumber("3.14") -- 3.14
 Truelocal num3 = tonumber("abc") -- nil
 True
 True-- 自动转换
 Trueprint("10" + 5) -- 15 (字符串转数值)
 Trueprint(10 .. "5") -- "105" (数值转字符串)
 True```

 False#### 1.2.2 布尔值转换
 False
```lua
 True-- 其他类型转布尔值
 True-- 只有 false 和 nil 为假，其他都为真
 Trueprint(Boolean(0)) -- true
 Trueprint(Boolean("")) -- true
 Trueprint(Boolean({})) -- true
 Trueprint(Boolean(nil)) -- false
 Trueprint(Boolean(false)) -- false
 True```

 False## 2. Table 核心 (Tables)
 False
 FalseTable 是 Lua 唯一的容器类型，可以表示数组、字典、对象等各种数据结构。Table 是引用类型，所有 Table 都是匿名的，通过引用来访问。
 False
 False### 2.1 Table 的创建
 False
```lua
 True-- 空表
 Truelocal t1 = {}
 True
 True-- 数组式表
 Truelocal t2 = {1, 2, 3, 4, 5}
 True
 True-- 字典式表
 Truelocal t3 = {name = "Lua", version = 5.4}
 True
 True-- 混合式表
 Truelocal t4 = {
 True "apple",
 True "banana",
 True name = "fruit",
 True count = 2
 True}
 True
 True-- 计算式键
 Truelocal t5 = {
 True ["name"] = "Lua",
 True [10] = "ten",
 True [{}] = "table"
 True}
 True```

 False### 2.2 Table 作为数组
 False
 False**注意**: Lua 数组索引**从 1 开始**。
 False
```lua
 Truelocal arr = {10, 20, 30, 40, 50}
 True
 True-- 访问元素
 Trueprint(arr[1]) -- 10
 Trueprint(arr[3]) -- 30
 True
 True-- 修改元素
 Truearr[2] = 25
 Trueprint(arr[2]) -- 25
 True
 True-- 添加元素
 Truearr[6] = 60
 Trueprint(arr[6]) -- 60
 True
 True-- 获取长度
 Trueprint(#arr) -- 6
 True```

 False### 2.3 Table 作为字典
 False
```lua
 Truelocal dict = {
 True name = "John",
 True age = 30,
 True city = "New York"
 True}
 True
 True-- 访问元素（点语法）
 Trueprint(dict.name) -- John
 True
 True-- 访问元素（方括号语法）
 Trueprint(dict["age"]) -- 30
 True
 True-- 使用变量作为键
 Truelocal key = "city"
 Trueprint(dict[key]) -- New York
 True
 True-- 添加新键值对
 Truedict.email = "john@example.com"
 Trueprint(dict.email) -- john@example.com
 True
 True-- 删除键值对
 Truedict.age = nil
 Trueprint(dict.age) -- nil
 True```

 False### 2.4 Table 的常用操作
 False
 False#### 2.4.1 表的遍历
 False
```lua
 True-- 遍历数组部分
 Truelocal arr = {1, 2, 3, 4, 5}
 Truefor i = 1, #arr do
 True print(i, arr[i])
 Trueend
 True
 True-- 使用 ipairs 遍历数组
 Truefor index, value in ipairs(arr) do
 True print(index, value)
 Trueend
 True
 True-- 使用 pairs 遍历所有键值对
 Truelocal dict = {name = "John", age = 30, city = "New York"}
 Truefor key, value in pairs(dict) do
 True print(key, value)
 Trueend
 True```

 False#### 2.4.2 表的操作函数
 False
 False| 函数 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `table.insert(t, pos, value)` | 在指定位置插入元素 | `table.insert(arr, 2, 15)` |
 False| `table.remove(t, pos)` | 删除指定位置的元素 | `table.remove(arr, 2)` |
 False| `table.concat(t, sep, i, j)` | 连接表中的字符串元素 | `table.concat({"a", "b", "c"}, ",")` |
 False| `table.sort(t, comp)` | 对表进行排序 | `table.sort(arr)` |
 False| `table.unpack(t, i, j)` | 解压表为多个值 | `local a, b, c = table.unpack({1, 2, 3})` |
 False
```lua
 True-- 示例
 Truelocal arr = {10, 30, 20, 50, 40}
 True
 True-- 排序
 Truetable.sort(arr)
 Trueprint(table.concat(arr, ", ")) -- 10, 20, 30, 40, 50
 True
 True-- 插入元素
 Truetable.insert(arr, 3, 25)
 Trueprint(table.concat(arr, ", ")) -- 10, 20, 25, 30, 40, 50
 True
 True-- 删除元素
 Truetable.remove(arr, 3)
 Trueprint(table.concat(arr, ", ")) -- 10, 20, 30, 40, 50
 True
 True-- 连接字符串
 Truelocal strs = {"Hello", "Lua", "World"}
 Trueprint(table.concat(strs, " ")) -- Hello Lua World
 True
 True-- 解压表
 Truelocal values = {10, 20, 30}
 Truelocal a, b, c = table.unpack(values)
 Trueprint(a, b, c) -- 10 20 30
 True```

 False### 2.5 Table 的高级特性
 False
 False#### 2.5.1 嵌套表
 False
```lua
 Truelocal person = {
 True name = "John",
 True age = 30,
 True address = {
 True street = "Main St",
 True city = "New York",
 True zipcode = 10001
 True },
 True hobbies = {"reading", "coding", "gaming"}
 True}
 True
 True-- 访问嵌套表
 Trueprint(person.address.city) -- New York
 Trueprint(person.hobbies[2]) -- coding
 True
 True-- 修改嵌套表
 Trueperson.address.street = "Broadway"
 Trueprint(person.address.street) -- Broadway
 True```

 False#### 2.5.2 表的引用
 False
```lua
 Truelocal t1 = {1, 2, 3}
 Truelocal t2 = t1 -- t2 引用 t1
 True
 Truet2[1] = 10
 Trueprint(t1[1]) -- 10 (t1 和 t2 指向同一个表)
 True
 True-- 复制表（浅拷贝）
 Truelocal function shallow_copy(t)
 True local copy = {}
 True for k, v in pairs(t) do
 True copy[k] = v
 True end
 True return copy
 Trueend
 True
 Truelocal t3 = shallow_copy(t1)
 Truet3[1] = 20
 Trueprint(t1[1]) -- 10 (t1 不受影响)
 Trueprint(t3[1]) -- 20
 True
 True-- 深拷贝
 Truelocal function deep_copy(t)
 True if type(t) ~= "table" then
 True return t
 True end
 True local copy = {}
 True for k, v in pairs(t) do
 True copy[k] = deep_copy(v)
 True end
 True return copy
 Trueend
 True```

 False#### 2.5.3 元表 (Metatable)
 False
 False元表允许我们修改表的行为，例如定义表的加法、比较等操作。
 False
```lua
 True-- 创建元表
 Truelocal mt = {
 True -- __add 元方法：定义加法操作
 True __add = function(a, b)
 True local result = {}
 True for i, v in ipairs(a) do
 True result[i] = v
 True end
 True for i, v in ipairs(b) do
 True result[#result + 1] = v
 True end
 True return result
 True end,
 True 
 True -- __tostring 元方法：定义字符串表示
 True __tostring = function(t)
 True return "[" .. table.concat(t, ", ") .. "]"
 True end
 True}
 True
 True-- 设置元表
 Truelocal t1 = {1, 2, 3}
 Truelocal t2 = {4, 5, 6}
 Truesetmetatable(t1, mt)
 Truesetmetatable(t2, mt)
 True
 True-- 使用加法操作
 Truelocal t3 = t1 + t2
 Trueprint(t3) -- [1, 2, 3, 4, 5, 6]
 True
 True-- 使用字符串表示
 Trueprint(t1) -- [1, 2, 3]
 True```

 False### 2.6 Table 与面向对象编程
 False
 FalseLua 可以使用 Table 和元表来模拟面向对象编程。
 False
 False#### 2.6.1 类的定义
 False
```lua
 True-- 定义类
 Truelocal Person = {}
 TruePerson.__index = Person
 True
 True-- 构造函数
 Truefunction Person:new(name, age)
 True local self = setmetatable({}, self)
 True self.name = name
 True self.age = age
 True return self
 Trueend
 True
 True-- 方法
 Truefunction Person:greet()
 True print("Hello, my name is " .. self.name)
 Trueend
 True
 Truefunction Person:get_age()
 True return self.age
 Trueend
 True
 True-- 使用类
 Truelocal john = Person:new("John", 30)
 Truejohn:greet() -- Hello, my name is John
 Trueprint(john:get_age()) -- 30
 True```

 False#### 2.6.2 继承
 False
```lua
 True-- 定义子类
 Truelocal Student = setmetatable({}, Person)
 TrueStudent.__index = Student
 True
 True-- 构造函数
 Truefunction Student:new(name, age, grade)
 True local self = Person:new(name, age)
 True setmetatable(self, Student)
 True self.grade = grade
 True return self
 Trueend
 True
 True-- 重写方法
 Truefunction Student:greet()
 True print("Hello, my name is " .. self.name .. " and I'm in grade " .. self.grade)
 Trueend
 True
 True-- 新方法
 Truefunction Student:study()
 True print(self.name .. " is studying")
 Trueend
 True
 True-- 使用子类
 Truelocal alice = Student:new("Alice", 15, 9)
 Truealice:greet() -- Hello, my name is Alice and I'm in grade 9
 Truealice:study() -- Alice is studying
 Trueprint(alice:get_age()) -- 15 (继承自 Person)
 True```

 False## 3. 数据类型的特殊特性
 False
 False### 3.1 nil
 False
 False- `nil` 表示"不存在"或"无效值"
 False- 当从表中删除一个键时，只需将其值设为 `nil`
 False- 未初始化的变量默认值为 `nil`
 False- `nil` 与任何值比较都返回 `false`，除了与自身比较
 False
 False### 3.2 boolean
 False
 False- 只有 `true` 和 `false` 两个值
 False- 在条件判断中，只有 `false` 和 `nil` 被视为假，其他所有值都被视为真
 False- 布尔值可以与其他类型进行运算
 False
 False### 3.3 number
 False
 False- Lua 5.3+ 支持整数和浮点数
 False- 整数和浮点数可以自动转换
 False- 支持科学计数法：`1e3` (1000), `1e-3` (0.001)
 False- 特殊数值：`math.huge` (无穷大), `math.pi` (π)
 False
 False### 3.4 string
 False
 False- 字符串是不可变的
 False- 支持单引号、双引号和多行字符串 (`[[...]]`)
 False- 字符串可以使用 `..` 运算符连接
 False- 字符串可以使用索引访问单个字符（从 1 开始）
 False- 字符串长度使用 `#` 运算符获取
 False
```lua
 Truelocal str = "Hello Lua"
 Trueprint(#str) -- 8
 Trueprint(str:sub(1, 5)) -- Hello
 Trueprint(str:upper()) -- HELLO LUA
 Trueprint(str:lower()) -- hello lua
 Trueprint(str:find("Lua")) -- 7 9
 True```

 False### 3.5 function
 False
 False- 函数是一等公民，可以作为变量、参数和返回值
 False- 支持闭包
 False- 支持匿名函数
 False- 支持可变参数
 False
```lua
 True-- 可变参数
 Truefunction sum(...)
 True local total = 0
 True for _, v in ipairs({...}) do
 True total = total + v
 True end
 True return total
 Trueend
 True
 Trueprint(sum(1, 2, 3, 4, 5)) -- 15
 True
 True-- 函数作为参数
 Truefunction map(t, f)
 True local result = {}
 True for i, v in ipairs(t) do
 True result[i] = f(v)
 True end
 True return result
 Trueend
 True
 Truelocal numbers = {1, 2, 3, 4, 5}
 Truelocal squared = map(numbers, function(x) return x * x end)
 Trueprint(table.concat(squared, ", ")) -- 1, 4, 9, 16, 25
 True```

 False### 3.6 thread
 False
 False- 主要用于协程 (coroutine)
 False- 协程是一种非抢占式的多任务处理方式
 False- 常用函数：`coroutine.create`, `coroutine.resume`, `coroutine.yield`
 False
```lua
 True-- 协程示例
 Truelocal co = coroutine.create(function()
 True print("协程开始")
 True local value = coroutine.yield(10)
 True print("协程继续", value)
 True return 20
 Trueend)
 True
 Trueprint("主程序")
 Truelocal status, result = coroutine.resume(co)
 Trueprint("第一次 resume:", status, result) -- 第一次 resume: true 10
 True
 Truestatus, result = coroutine.resume(co, "Hello")
 Trueprint("第二次 resume:", status, result) -- 第二次 resume: true 20
 True```

 False### 3.7 userdata
 False
 False- 用于 C 语言扩展
 False- 可以存储任意 C 语言数据结构
 False- 通常通过 Lua/C API 或 FFI 库创建
 False
 False## 4. 最佳实践
 False
 False### 4.1 Table 使用技巧
 False
 False#### 4.1.1 表的初始化
 False
```lua
 True-- 预分配表大小（提高性能）
 Truelocal t = {}
 Truefor i = 1, 1000 do
 True t[i] = 0
 Trueend
 True
 True-- 或者使用 table.new (需要 luajit)
 True-- local t = table.new(1000, 0)
 True```

 False#### 4.1.2 表的遍历
 False
 False- 遍历数组：使用 `ipairs` 或数值 for 循环
 False- 遍历字典：使用 `pairs`
 False- 遍历有序字典：需要手动排序键
 False
```lua
 True-- 有序遍历字典
 Truelocal dict = {b = 2, a = 1, c = 3}
 Truelocal keys = {}
 Truefor k in pairs(dict) do
 True keys[#keys + 1] = k
 Trueend
 Truetable.sort(keys)
 True
 Truefor _, k in ipairs(keys) do
 True print(k, dict[k])
 Trueend
 True```

 False#### 4.1.3 表的内存管理
 False
 False- 避免循环引用，否则会导致垃圾回收器无法回收
 False- 当表不再使用时，将其设为 `nil`
 False- 对于大表，考虑使用弱表 (weak table)
 False
 False### 4.2 数据类型使用建议
 False
 False- **nil**: 只用于表示"不存在"，不要将其作为普通值使用
 False- **boolean**: 只用于逻辑判断，不要与其他类型混用
 False- **number**: 注意整数和浮点数的精度问题
 False- **string**: 对于大量字符串操作，使用 `table.concat` 提高性能
 False- **function**: 合理使用闭包，避免内存泄漏
 False- **table**: 合理设计表结构，避免过深的嵌套
 False- **thread**: 谨慎使用协程，避免死锁
 False- **userdata**: 仅在需要与 C 语言交互时使用
 False
 False## 5. 代码示例
 False
 False### 5.1 实现栈数据结构
 False
```lua
 True-- stack.lua
 Truelocal Stack = {}
 TrueStack.__index = Stack
 True
 Truefunction Stack:new()
 True return setmetatable({items = {}}, self)
 Trueend
 True
 Truefunction Stack:push(item)
 True table.insert(self.items, item)
 Trueend
 True
 Truefunction Stack:pop()
 True return table.remove(self.items)
 Trueend
 True
 Truefunction Stack:peek()
 True return self.items[#self.items]
 Trueend
 True
 Truefunction Stack:isEmpty()
 True return #self.items == 0
 Trueend
 True
 Truefunction Stack:size()
 True return #self.items
 Trueend
 True
 True-- 测试
 Truelocal stack = Stack:new()
 Truestack:push(1)
 Truestack:push(2)
 Truestack:push(3)
 Trueprint(stack:peek()) -- 3
 Trueprint(stack:pop()) -- 3
 Trueprint(stack:size()) -- 2
 Trueprint(stack:isEmpty()) -- false
 Truestack:pop()
 Truestack:pop()
 Trueprint(stack:isEmpty()) -- true
 True```

 False### 5.2 实现队列数据结构
 False
```lua
 True-- queue.lua
 Truelocal Queue = {}
 TrueQueue.__index = Queue
 True
 Truefunction Queue:new()
 True return setmetatable({items = {}}, self)
 Trueend
 True
 Truefunction Queue:enqueue(item)
 True table.insert(self.items, item)
 Trueend
 True
 Truefunction Queue:dequeue()
 True return table.remove(self.items, 1)
 Trueend
 True
 Truefunction Queue:front()
 True return self.items[1]
 Trueend
 True
 Truefunction Queue:isEmpty()
 True return #self.items == 0
 Trueend
 True
 Truefunction Queue:size()
 True return #self.items
 Trueend
 True
 True-- 测试
 Truelocal queue = Queue:new()
 Truequeue:enqueue(1)
 Truequeue:enqueue(2)
 Truequeue:enqueue(3)
 Trueprint(queue:front()) -- 1
 Trueprint(queue:dequeue()) -- 1
 Trueprint(queue:size()) -- 2
 Trueprint(queue:isEmpty()) -- false
 Truequeue:dequeue()
 Truequeue:dequeue()
 Trueprint(queue:isEmpty()) -- true
 True```

 False### 5.3 实现集合数据结构
 False
```lua
 True-- set.lua
 Truelocal Set = {}
 TrueSet.__index = Set
 True
 Truefunction Set:new(values)
 True local self = setmetatable({elements = {}}, self)
 True if values then
 True for _, v in ipairs(values) do
 True self:add(v)
 True end
 True end
 True return self
 Trueend
 True
 Truefunction Set:add(value)
 True self.elements[value] = true
 Trueend
 True
 Truefunction Set:remove(value)
 True self.elements[value] = nil
 Trueend
 True
 Truefunction Set:contains(value)
 True return self.elements[value] == true
 Trueend
 True
 Truefunction Set:size()
 True local count = 0
 True for _ in pairs(self.elements) do
 True count = count + 1
 True end
 True return count
 Trueend
 True
 Truefunction Set:isEmpty()
 True return self:size() == 0
 Trueend
 True
 Truefunction Set:toTable()
 True local result = {}
 True for v in pairs(self.elements) do
 True table.insert(result, v)
 True end
 True return result
 Trueend
 True
 True-- 测试
 Truelocal set = Set:new({1, 2, 3})
 Trueset:add(4)
 Trueprint(set:contains(3)) -- true
 Trueprint(set:contains(5)) -- false
 Trueset:remove(2)
 Trueprint(set:size()) -- 3
 Trueprint(table.concat(set:toTable(), ", ")) -- 1, 3, 4
 True```

 False### 5.4 实现链表数据结构
 False
```lua
 True-- linked_list.lua
 Truelocal Node = {}
 TrueNode.__index = Node
 True
 Truefunction Node:new(value)
 True return setmetatable({value = value, next = nil}, self)
 Trueend
 True
 Truelocal LinkedList = {}
 TrueLinkedList.__index = LinkedList
 True
 Truefunction LinkedList:new()
 True return setmetatable({head = nil, tail = nil, size = 0}, self)
 Trueend
 True
 Truefunction LinkedList:add(value)
 True local node = Node:new(value)
 True if not self.head then
 True self.head = node
 True self.tail = node
 True else
 True self.tail.next = node
 True self.tail = node
 True end
 True self.size = self.size + 1
 Trueend
 True
 Truefunction LinkedList:removeAt(index)
 True if index < 1 or index > self.size then
 True return nil
 True end
 True 
 True local node
 True if index == 1 then
 True node = self.head
 True self.head = self.head.next
 True if not self.head then
 True self.tail = nil
 True end
 True else
 True local prev = self.head
 True for i = 2, index - 1 do
 True prev = prev.next
 True end
 True node = prev.next
 True prev.next = node.next
 True if index == self.size then
 True self.tail = prev
 True end
 True end
 True 
 True self.size = self.size - 1
 True return node.value
 Trueend
 True
 Truefunction LinkedList:get(index)
 True if index < 1 or index > self.size then
 True return nil
 True end
 True 
 True local node = self.head
 True for i = 2, index do
 True node = node.next
 True end
 True return node.value
 Trueend
 True
 Truefunction LinkedList:isEmpty()
 True return self.size == 0
 Trueend
 True
 Truefunction LinkedList:toTable()
 True local result = {}
 True local node = self.head
 True while node do
 True table.insert(result, node.value)
 True node = node.next
 True end
 True return result
 Trueend
 True
 True-- 测试
 Truelocal list = LinkedList:new()
 Truelist:add(1)
 Truelist:add(2)
 Truelist:add(3)
 Truelist:add(4)
 Trueprint(table.concat(list:toTable(), ", ")) -- 1, 2, 3, 4
 Trueprint(list:get(2)) -- 2
 Truelist:removeAt(2)
 Trueprint(table.concat(list:toTable(), ", ")) -- 1, 3, 4
 Trueprint(list:size()) -- 3
 True```

 False## 6. 总结
 False
 FalseLua 的数据类型系统简洁而强大，特别是 Table 作为唯一的容器类型，提供了极大的灵活性。通过 Table 和元表，Lua 可以模拟各种数据结构和面向对象编程范式。
 False
 False### 6.1 关键要点
 False
 False- **8 种基础数据类型**：nil, boolean, number, string, function, table, thread, userdata
 False- **Table 是核心**：可以表示数组、字典、对象等各种数据结构
 False- **元表**：允许修改表的行为，实现运算符重载等功能
 False- **面向对象**：通过 Table 和元表模拟面向对象编程
 False- **动态类型**：变量类型在运行时确定，无需声明
 False
 False### 6.2 学习建议
 False
 False- **掌握 Table 操作**：Table 是 Lua 的核心，需要熟练掌握其各种操作
 False- **理解元表**：元表是 Lua 的高级特性，掌握它可以解锁更多功能
 False- **实践数据结构**：通过实现栈、队列、链表等数据结构，加深对 Lua 数据类型的理解
 False- **注意性能**：合理使用 Table，避免不必要的内存开销
 False- **遵循最佳实践**：使用局部变量、合理设计表结构、避免循环引用
 False
 FalseLua 的数据类型设计体现了其"简单而强大"的设计哲学，通过少量的基础类型和灵活的 Table 结构，Lua 能够适应各种编程需求，特别是在嵌入式脚本、游戏开发和高性能 Web 服务等领域。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化 Lua Table 机制与常用方法。
 False- 2026-04-05: 扩写内容，增加详细的数据类型说明、Table 操作、元表、OOP 模拟、数据结构实现和最佳实践等内容。
 False