# 程序结构与基本语法 (Program Structure & Basic Syntax)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Lua Basics
 False> @Description: Lua 的变量声明、注释、作用域及控制流。 | Variable declarations, comments, scope, and control flow in Lua.
 False
 False---
 False
 False## 目录
 False
 False1. [变量与赋值](#变量与赋值)
 False2. [注释规范](#注释规范)
 False3. [控制流](#控制流)
 False4. [运算符](#运算符)
 False5. [程序结构](#程序结构)
 False6. [错误处理](#错误处理)
 False7. [最佳实践](#最佳实践)
 False8. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 变量与赋值 (Variables)
 False
 FalseLua 是动态类型语言，变量无需声明类型，类型在运行时确定。
 False
 False### 1.1 变量类型
 False
 False| 类型 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **全局变量** | 默认所有变量都是全局的，存储在全局表 `_G` 中 | `name = "Lua"` |
 False| **局部变量** | 使用 `local` 关键字声明，作用域有限 | `local count = 10` |
 False| **表字段** | 存储在表中的变量 | `person.name = "John"` |
 False
 False### 1.2 赋值操作
 False
 False#### 1.2.1 基本赋值
 False
```lua
 True-- 单个赋值
 Truelocal name = "Lua"
 Truelocal version = 5.4
 True
 True-- 多重赋值
 Truelocal a, b = 10, 20
 Trueprint(a, b) -- 10 20
 True
 True-- 交换变量
 Truelocal x, y = 1, 2
 Truex, y = y, x
 Trueprint(x, y) -- 2 1
 True
 True-- 忽略值
 Truelocal _, value = string.find("Hello Lua", "Lua")
 Trueprint(value) -- 7
 True```

 False#### 1.2.2 表赋值
 False
```lua
 True-- 表构造器赋值
 Truelocal person = {
 True name = "John",
 True age = 30,
 True address = {
 True street = "Main St",
 True city = "New York"
 True }
 True}
 True
 True-- 访问表字段
 Trueprint(person.name) -- John
 Trueprint(person["age"]) -- 30
 Trueprint(person.address.city) -- New York
 True```

 False### 1.3 作用域
 False
 False#### 1.3.1 局部变量作用域
 False
```lua
 True-- 全局作用域
 Trueglobal_var = "global"
 True
 Truefunction test()
 True -- 函数作用域
 True local local_var = "local"
 True print(local_var) -- local
 True print(global_var) -- global
 Trueend
 True
 Truetest()
 Trueprint(global_var) -- global
 True-- print(local_var) -- 错误：local_var 未定义
 True```

 False#### 1.3.2 块作用域
 False
```lua
 Truelocal x = 10
 Trueprint(x) -- 10
 True
 Trueif true then
 True local x = 20
 True print(x) -- 20
 Trueend
 True
 Trueprint(x) -- 10
 True```

 False### 1.4 变量查找规则
 False
 False1. 首先在当前作用域查找局部变量
 False2. 然后在包含当前作用域的外部作用域查找
 False3. 最后在全局表 `_G` 中查找
 False4. 如果都找不到，返回 `nil`
 False
 False## 2. 注释规范 (Comments)
 False
 False### 2.1 单行注释
 False
```lua
 True-- 这是单行注释
 Truelocal x = 10 -- 行尾注释
 True```

 False### 2.2 多行注释
 False
```lua
 True--[[
 True这是多行注释
 True可以跨越多行
 True--]]
 True
 True--[[ 也可以写在一行 ]]
 True```

 False### 2.3 文档注释
 False
```lua
 True--[[
 True 函数名称: add
 True 功能描述: 计算两个数的和
 True 参数: a (number) - 第一个数
 True b (number) - 第二个数
 True 返回值: (number) - 两个数的和
 True--]]
 Truefunction add(a, b)
 True return a + b
 Trueend
 True```

 False## 3. 控制流 (Control Flow)
 False
 False### 3.1 条件分支
 False
 False#### 3.1.1 if 语句
 False
```lua
 Truelocal score = 85
 True
 Trueif score >= 90 then
 True print("优秀")
 Trueelseif score >= 80 then
 True print("良好")
 Trueelseif score >= 60 then
 True print("及格")
 Trueelse
 True print("不及格")
 Trueend
 True```

 False#### 3.1.2 嵌套 if
 False
```lua
 Truelocal age = 25
 Truelocal gender = "male"
 True
 Trueif age >= 18 then
 True if gender == "male" then
 True print("成年男性")
 True else
 True print("成年女性")
 True end
 Trueelse
 True print("未成年人")
 Trueend
 True```

 False### 3.2 循环结构
 False
 False#### 3.2.1 while 循环
 False
```lua
 Truelocal i = 1
 Truewhile i <= 5 do
 True print(i)
 True i = i + 1
 Trueend
 True-- 输出: 1 2 3 4 5
 True```

 False#### 3.2.2 repeat-until 循环
 False
```lua
 Truelocal i = 1
 Truerepeat
 True print(i)
 True i = i + 1
 Trueuntil i > 5
 True-- 输出: 1 2 3 4 5
 True```

 False#### 3.2.3 数值 for 循环
 False
```lua
 True-- 基本语法: for var = start, end, step do ... end
 True
 True-- 从 1 到 5，步长 1
 Truefor i = 1, 5 do
 True print(i)
 Trueend
 True-- 输出: 1 2 3 4 5
 True
 True-- 从 5 到 1，步长 -1
 Truefor i = 5, 1, -1 do
 True print(i)
 Trueend
 True-- 输出: 5 4 3 2 1
 True
 True-- 步长为 2
 Truefor i = 1, 10, 2 do
 True print(i)
 Trueend
 True-- 输出: 1 3 5 7 9
 True```

 False#### 3.2.4 泛型 for 循环
 False
```lua
 True-- 遍历表
 Truelocal fruits = {"apple", "banana", "orange"}
 Truefor index, value in ipairs(fruits) do
 True print(index, value)
 Trueend
 True-- 输出: 1 apple
 True-- 2 banana
 True-- 3 orange
 True
 True-- 遍历键值对
 Truelocal person = {name = "John", age = 30, city = "New York"}
 Truefor key, value in pairs(person) do
 True print(key, value)
 Trueend
 True-- 输出: name John
 True-- age 30
 True-- city New York
 True```

 False### 3.3 流程控制语句
 False
 False#### 3.3.1 break 语句
 False
```lua
 Truefor i = 1, 10 do
 True if i == 5 then
 True break -- 跳出循环
 True end
 True print(i)
 Trueend
 True-- 输出: 1 2 3 4
 True```

 False#### 3.3.2 goto 语句 (Lua 5.2+)
 False
```lua
 True::start::
 Truelocal i = 1
 Truewhile i <= 3 do
 True print(i)
 True i = i + 1
 True if i > 3 then
 True goto end_loop
 True end
 Trueend
 True::end_loop::
 Trueprint("循环结束")
 True-- 输出: 1 2 3
 True-- 循环结束
 True```

 False## 4. 运算符
 False
 False### 4.1 算术运算符
 False
 False| 运算符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `+` | 加法 | `1 + 2 = 3` |
 False| `-` | 减法 | `5 - 3 = 2` |
 False| `*` | 乘法 | `2 * 3 = 6` |
 False| `/` | 除法 | `10 / 2 = 5` |
 False| `^` | 幂运算 | `2 ^ 3 = 8` |
 False| `%` | 取模 | `10 % 3 = 1` |
 False| `-` | 负号 | `-5` |
 False
 False### 4.2 关系运算符
 False
 False| 运算符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `==` | 等于 | `1 == 1` → `true` |
 False| `~=` | 不等于 | `1 ~= 2` → `true` |
 False| `<` | 小于 | `1 < 2` → `true` |
 False| `>` | 大于 | `2 > 1` → `true` |
 False| `<=` | 小于等于 | `1 <= 1` → `true` |
 False| `>=` | 大于等于 | `2 >= 1` → `true` |
 False
 False### 4.3 逻辑运算符
 False
 False| 运算符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `and` | 逻辑与 | `true and false` → `false` |
 False| `or` | 逻辑或 | `true or false` → `true` |
 False| `not` | 逻辑非 | `not true` → `false` |
 False
 False**注意**: `0` 和 `""` (空字符串) 在 Lua 中都视为 **True**。只有 `false` 和 `nil` 为假。
 False
 False#### 4.3.1 短路求值
 False
```lua
 True-- and 运算符: 如果第一个操作数为假，返回第一个操作数，否则返回第二个操作数
 Trueprint(nil and "hello") -- nil
 Trueprint(false and "hello") -- false
 Trueprint("hello" and "world") -- world
 True
 True-- or 运算符: 如果第一个操作数为真，返回第一个操作数，否则返回第二个操作数
 Trueprint(nil or "hello") -- hello
 Trueprint(false or "hello") -- hello
 Trueprint("hello" or "world") -- hello
 True
 True-- 常用技巧: 设置默认值
 Truelocal name = input_name or "Guest"
 True```

 False### 4.4 字符串连接运算符
 False
 False| 运算符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `..` | 字符串连接 | `"Hello" .. " Lua"` → `"Hello Lua"` |
 False
```lua
 Truelocal str1 = "Hello"
 Truelocal str2 = "Lua"
 Truelocal result = str1 .. " " .. str2
 Trueprint(result) -- Hello Lua
 True```

 False### 4.5 表访问运算符
 False
 False| 运算符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `.` | 点运算符 | `person.name` |
 False| `[]` | 方括号运算符 | `person["name"]` |
 False
```lua
 Truelocal person = {name = "John", age = 30}
 Trueprint(person.name) -- John
 Trueprint(person["age"]) -- 30
 True
 Truelocal key = "name"
 Trueprint(person[key]) -- John
 True```

 False## 5. 程序结构
 False
 False### 5.1 脚本文件结构
 False
```lua
 True-- 模块声明
 Truelocal module = {}
 True
 True-- 局部变量
 Truelocal private_var = "private"
 True
 True-- 函数定义
 Truefunction module.public_function()
 True -- 函数体
 Trueend
 True
 True-- 局部函数
 Truelocal function private_function()
 True -- 函数体
 Trueend
 True
 True-- 返回模块
 Truereturn module
 True```

 False### 5.2 主程序结构
 False
```lua
 True-- 导入模块
 Truelocal math = require("math")
 True
 True-- 全局变量
 TrueAPP_VERSION = "1.0.0"
 True
 True-- 主函数
 Truefunction main()
 True print("Hello, Lua!")
 True -- 程序逻辑
 Trueend
 True
 True-- 执行主函数
 Trueif arg and arg[0] == debug.getinfo(1, "S").source:sub(2) then
 True main()
 Trueend
 True```

 False## 6. 错误处理
 False
 False### 6.1 错误抛出
 False
```lua
 True-- 手动抛出错误
 Trueerror("发生错误")
 True
 True-- 条件错误
 Trueif not value then
 True error("值不能为空")
 Trueend
 True```

 False### 6.2 错误捕获
 False
```lua
 True-- pcall: 保护调用
 Truelocal success, result = pcall(function()
 True return 10 / 0
 Trueend)
 True
 Trueif success then
 True print("成功:", result)
 Trueelse
 True print("错误:", result)
 Trueend
 True
 True-- xpcall: 带错误处理函数的保护调用
 Truelocal function error_handler(err)
 True return "错误处理: " .. err
 Trueend
 True
 Truelocal success, result = xpcall(function()
 True return 10 / 0
 Trueend, error_handler)
 True
 Trueprint(success, result)
 True```

 False## 7. 最佳实践
 False
 False### 7.1 代码风格
 False
 False- **缩进**: 使用 4 个空格或 1 个制表符
 False- **命名规范**:
 False - 变量名: 小写字母，单词间用下划线分隔 (`local user_name`)
 False - 函数名: 小写字母，单词间用下划线分隔 (`function calculate_total()`)
 False - 常量: 大写字母，单词间用下划线分隔 (`local MAX_SIZE = 100`)
 False - 模块名: 小写字母，单词间用下划线分隔 (`local utils = require("utils")`)
 False
 False- **代码组织**:
 False - 相关代码放在一起
 False - 使用空行分隔不同逻辑块
 False - 函数不要过长，保持单一职责
 False
 False### 7.2 性能优化
 False
 False- **使用局部变量**:
 False
 ```lua
 True local print = print
 True local math = math
 True local table = table
 True ```

 False- **避免全局变量**:
 False - 全局变量访问速度较慢
 False - 容易造成命名冲突
 False
 False- **字符串连接**:
 False - 对于大量字符串连接，使用 `table.concat`
 False
 ```lua
 True local parts = {}
 True for i = 1, 1000 do
 True parts[#parts + 1] = tostring(i)
 True end
 True local result = table.concat(parts, ", ")
 True ```

 False### 7.3 常见陷阱
 False
 False- **变量作用域**:
 False - 忘记使用 `local` 关键字，导致变量泄漏到全局作用域
 False - 局部变量在块结束后不可访问
 False
 False- **类型判断**:
 False - Lua 是动态类型语言，注意类型检查
 False - 使用 `type()` 函数检查变量类型
 False
 False- **表索引**:
 False - Lua 表索引从 1 开始，不是 0
 False - 避免使用 nil 作为表索引
 False
 False- **逻辑判断**:
 False - 只有 `false` 和 `nil` 为假，其他值都为真
 False - 空字符串 `""` 和数字 `0` 都是真
 False
 False## 8. 代码示例
 False
 False### 8.1 温度转换
 False
```lua
 True-- temperature.lua
 True-- 摄氏度转华氏度
 Truefunction celsius_to_fahrenheit(celsius)
 True return (celsius * 9/5) + 32
 Trueend
 True
 True-- 华氏度转摄氏度
 Truefunction fahrenheit_to_celsius(fahrenheit)
 True return (fahrenheit - 32) * 5/9
 Trueend
 True
 True-- 测试
 Truelocal c = 25
 Truelocal f = celsius_to_fahrenheit(c)
 Trueprint(c .. "°C = " .. f .. "°F")
 True
 Truef = 77
 Truec = fahrenheit_to_celsius(f)
 Trueprint(f .. "°F = " .. c .. "°C")
 True```

 False### 8.2 阶乘计算
 False
```lua
 True-- factorial.lua
 True-- 递归计算阶乘
 Truefunction factorial(n)
 True if n == 0 or n == 1 then
 True return 1
 True else
 True return n * factorial(n - 1)
 True end
 Trueend
 True
 True-- 测试
 Truefor i = 0, 10 do
 True print(i .. "! = " .. factorial(i))
 Trueend
 True```

 False### 8.3 斐波那契数列
 False
```lua
 True-- fibonacci.lua
 True-- 计算斐波那契数列
 Truefunction fibonacci(n)
 True if n == 0 then
 True return 0
 True elseif n == 1 then
 True return 1
 True else
 True return fibonacci(n - 1) + fibonacci(n - 2)
 True end
 Trueend
 True
 True-- 迭代计算斐波那契数列（更高效）
 Truefunction fibonacci_iterative(n)
 True if n == 0 then
 True return 0
 True elseif n == 1 then
 True return 1
 True end
 True 
 True local a, b = 0, 1
 True for i = 2, n do
 True a, b = b, a + b
 True end
 True return b
 Trueend
 True
 True-- 测试
 Trueprint("递归方法:")
 Truefor i = 0, 10 do
 True print("fib(" .. i .. ") = " .. fibonacci(i))
 Trueend
 True
 Trueprint("迭代方法:")
 Truefor i = 0, 10 do
 True print("fib(" .. i .. ") = " .. fibonacci_iterative(i))
 Trueend
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分并细化 Lua 基础语法细节。
 False- 2026-04-05: 扩写内容，增加详细的变量、注释、控制流、运算符、程序结构、错误处理、最佳实践和代码示例等内容。
 False