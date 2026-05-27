# 控制流 (Control Flow)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 条件分支、循环结构、异常捕获及 Match-Case 特性。 | Conditional branches, loops, exceptions, and Match-Case features.
 False
 False---
 False
 False## 目录
 False
 False1. [条件分支](#条件分支)
 False2. [循环结构](#循环结构)
 False3. [异常处理](#异常处理)
 False4. [控制流的最佳实践](#控制流的最佳实践)
 False
 False---
 False
 False## 1. 条件分支 (Selection)
 False
 False条件分支用于根据不同的条件执行不同的代码块。
 False
 False### 1.1 `if-elif-else` 语句
 False
 False`if-elif-else` 语句是最基本的条件分支结构：
 False
```python
 True# 基本用法
 Truex = 7
 True
 Trueif x > 10:
 True print("Greater than 10")
 Trueelif x < 5:
 True print("Less than 5")
 Trueelse:
 True print("Between 5 and 10")
 True
 True# 多个 elif 条件
 Truetemperature = 25
 True
 Trueif temperature < 0:
 True print("Freezing")
 Trueelif 0 <= temperature < 10:
 True print("Cold")
 Trueelif 10 <= temperature < 20:
 True print("Mild")
 Trueelif 20 <= temperature < 30:
 True print("Warm")
 Trueelse:
 True print("Hot")
 True
 True# 嵌套 if 语句
 Truea = 10
 Trueb = 5
 True
 Trueif a > b:
 True print("a is greater than b")
 True if a > 20:
 True print("a is also greater than 20")
 True else:
 True print("a is not greater than 20")
 Trueelse:
 True print("a is not greater than b")
 True```

 False### 1.2 三元表达式 (Ternary Expression)
 False
 False三元表达式是一种简洁的条件表达式，用于在一行代码中实现简单的条件判断：
 False
```python
 True# 基本用法
 Truescore = 75
 Trueresult = "Pass" if score >= 60 else "Fail"
 Trueprint(result) # 输出: Pass
 True
 True# 嵌套三元表达式
 Truetemperature = 15
 Truestatus = "Hot" if temperature > 30 else "Warm" if temperature > 20 else "Mild" if temperature > 10 else "Cold"
 Trueprint(status) # 输出: Mild
 True
 True# 与函数结合
 Truedef get_grade(score):
 True return "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"
 True
 Trueprint(get_grade(85)) # 输出: B
 True
 True# 用于列表推导式
 Truenumbers = [1, 2, 3, 4, 5]
 Trueeven_odd = ["even" if num % 2 == 0 else "odd" for num in numbers]
 Trueprint(even_odd) # 输出: ['odd', 'even', 'odd', 'even', 'odd']
 True```

 False### 1.3 `match-case` 语句 (Python 3.10+)
 False
 False`match-case` 语句（模式匹配）是 Python 3.10 引入的新特性，类似于其他语言的 `switch-case`，但功能更强大：
 False
```python
 True# 基本用法
 Truestatus = 404
 True
 Truematch status:
 True case 200:
 True print("OK")
 True case 404:
 True print("Not Found")
 True case 500:
 True print("Internal Server Error")
 True case _:
 True print("Unknown Status")
 True
 True# 匹配不同类型
 Truevalue = "hello"
 True
 Truematch value:
 True case int(x):
 True print(f"Integer: {x}")
 True case str(x):
 True print(f"String: {x}")
 True case list(x):
 True print(f"List: {x}")
 True case _:
 True print("Other type")
 True
 True# 匹配序列
 Truepoint = (1, 2)
 True
 Truematch point:
 True case (0, 0):
 True print("Origin")
 True case (x, 0):
 True print(f"On x-axis: {x}")
 True case (0, y):
 True print(f"On y-axis: {y}")
 True case (x, y):
 True print(f"Point: ({x}, {y})")
 True
 True# 匹配字典
 Trueperson = {"name": "Alice", "age": 30}
 True
 Truematch person:
 True case {"name": name, "age": age}:
 True print(f"Name: {name}, Age: {age}")
 True case {"name": name}:
 True print(f"Name: {name}, Age unknown")
 True case _:
 True print("Invalid person data")
 True
 True# 匹配类实例
 Trueclass Point:
 True def __init__(self, x, y):
 True self.x = x
 True self.y = y
 True
 Truep = Point(3, 4)
 True
 Truematch p:
 True case Point(x=0, y=0):
 True print("Origin")
 True case Point(x=x, y=0):
 True print(f"On x-axis: {x}")
 True case Point(x=0, y=y):
 True print(f"On y-axis: {y}")
 True case Point(x=x, y=y):
 True print(f"Point: ({x}, {y})")
 True
 True# 组合模式匹配
 Truecommand = "quit"
 True
 Truematch command:
 True case "help" | "h" | "?":
 True print("Show help")
 True case "quit" | "q" | "exit":
 True print("Exit program")
 True case _:
 True print("Unknown command")
 True```

 False## 2. 循环结构 (Iteration)
 False
 False循环结构用于重复执行代码块，Python 提供了 `for` 循环和 `while` 循环两种主要的循环结构。
 False
 False### 2.1 `for` 循环
 False
 False`for` 循环用于遍历序列（如列表、元组、字符串等）或其他可迭代对象：
 False
 False#### 2.1.1 基本用法
 False
```python
 True# 遍历列表
 Truefruits = ["apple", "banana", "cherry"]
 Truefor fruit in fruits:
 True print(fruit)
 True
 True# 遍历字符串
 Truetext = "Hello"
 Truefor char in text:
 True print(char)
 True
 True# 遍历元组
 Truetuple_data = (1, 2, 3, 4, 5)
 Truefor num in tuple_data:
 True print(num)
 True
 True# 遍历字典
 Trueperson = {"name": "Alice", "age": 30, "city": "New York"}
 True
 True# 遍历键
 Truefor key in person:
 True print(key)
 True
 True# 遍历值
 Truefor value in person.values():
 True print(value)
 True
 True# 遍历键值对
 Truefor key, value in person.items():
 True print(f"{key}: {value}")
 True```

 False#### 2.1.2 使用 `range()` 函数
 False
 False`range()` 函数用于生成一个数值序列，常用于 `for` 循环：
 False
```python
 True# 基本用法
 Truefor i in range(5):
 True print(i) # 输出: 0, 1, 2, 3, 4
 True
 True# 指定起始值和结束值
 Truefor i in range(2, 7):
 True print(i) # 输出: 2, 3, 4, 5, 6
 True
 True# 指定步长
 Truefor i in range(0, 10, 2):
 True print(i) # 输出: 0, 2, 4, 6, 8
 True
 True# 倒序
 Truefor i in range(5, 0, -1):
 True print(i) # 输出: 5, 4, 3, 2, 1
 True
 True# 遍历列表的索引
 Truefruits = ["apple", "banana", "cherry"]
 Truefor i in range(len(fruits)):
 True print(f"Index {i}: {fruits[i]}")
 True```

 False#### 2.1.3 使用 `enumerate()` 函数
 False
 False`enumerate()` 函数用于同时获取索引和值：
 False
```python
 True# 基本用法
 Truefruits = ["apple", "banana", "cherry"]
 Truefor index, fruit in enumerate(fruits):
 True print(f"Index {index}: {fruit}")
 True
 True# 指定起始索引
 Truefor index, fruit in enumerate(fruits, start=1):
 True print(f"Position {index}: {fruit}")
 True
 True# 用于字符串
 Truetext = "Hello"
 Truefor index, char in enumerate(text):
 True print(f"Character at {index}: {char}")
 True```

 False#### 2.1.4 使用 `zip()` 函数
 False
 False`zip()` 函数用于同时遍历多个序列：
 False
```python
 True# 基本用法
 Truenames = ["Alice", "Bob", "Charlie"]
 Trueages = [30, 25, 35]
 Truecities = ["New York", "London", "Paris"]
 True
 Truefor name, age, city in zip(names, ages, cities):
 True print(f"{name} is {age} years old from {city}")
 True
 True# 处理不同长度的序列
 Trueshort_list = [1, 2, 3]
 Truelong_list = [10, 20, 30, 40, 50]
 True
 Truefor a, b in zip(short_list, long_list):
 True print(f"{a} - {b}") # 只遍历到最短序列的长度
 True
 True# 使用 zip(*) 解压缩
 Truepairs = [(1, 10), (2, 20), (3, 30)]
 Truea, b = zip(*pairs)
 Trueprint(a) # 输出: (1, 2, 3)
 Trueprint(b) # 输出: (10, 20, 30)
 True```

 False### 2.2 `while` 循环
 False
 False`while` 循环用于在条件为真时重复执行代码块：
 False
```python
 True# 基本用法
 Truecount = 0
 Truewhile count < 5:
 True print(count)
 True count += 1
 True
 True# 计算累加和
 Truesum = 0
 Truenumber = 1
 Truewhile number <= 10:
 True sum += number
 True number += 1
 Trueprint(f"Sum: {sum}") # 输出: 55
 True
 True# 无限循环（需要 break 退出）
 Truewhile True:
 True user_input = input("Enter 'quit' to exit: ")
 True if user_input == "quit":
 True break
 True print(f"You entered: {user_input}")
 True
 True# 使用 else 子句
 Truetry_count = 0
 Truemax_tries = 3
 True
 Truewhile try_count < max_tries:
 True print(f"Try {try_count + 1}")
 True try_count += 1
 Trueelse:
 True print("Maximum tries reached")
 True```

 False### 2.3 循环控制语句
 False
 False循环控制语句用于控制循环的执行流程：
 False
 False#### 2.3.1 `break` 语句
 False
 False`break` 语句用于立即退出当前循环：
 False
```python
 True# 在 for 循环中使用
 Truefruits = ["apple", "banana", "cherry", "date"]
 Truetarget = "cherry"
 True
 Truefor fruit in fruits:
 True if fruit == target:
 True print(f"Found {target}!")
 True break
 True print(f"Checking {fruit}")
 True
 True# 在 while 循环中使用
 Truenumber = 0
 Truewhile number < 10:
 True print(number)
 True if number == 5:
 True break
 True number += 1
 True```

 False#### 2.3.2 `continue` 语句
 False
 False`continue` 语句用于跳过本次循环，进入下一次迭代：
 False
```python
 True# 跳过偶数
 Truefor i in range(10):
 True if i % 2 == 0:
 True continue
 True print(i) # 输出: 1, 3, 5, 7, 9
 True
 True# 跳过空字符串
 Truewords = ["hello", "", "world", "", "python"]
 Truefor word in words:
 True if not word:
 True continue
 True print(word)
 True```

 False#### 2.3.3 `pass` 语句
 False
 False`pass` 语句是一个空语句，用于占位：
 False
```python
 True# 作为占位符
 Truefor i in range(5):
 True pass # 什么都不做，只是占位
 True
 True# 在条件语句中
 Trueif x > 10:
 True pass # 暂时不实现，留作以后补充
 Trueelse:
 True print("x is not greater than 10")
 True
 True# 在函数定义中
 Truedef future_function():
 True pass # 暂时不实现
 True```

 False### 2.4 `for-else` 和 `while-else` 语句
 False
 FalsePython 的循环结构支持 `else` 子句，当循环正常执行结束（没有被 `break` 中断）时，会执行 `else` 代码块：
 False
```python
 True# for-else
 Truefruits = ["apple", "banana", "cherry"]
 Truetarget = "date"
 True
 Truefor fruit in fruits:
 True if fruit == target:
 True print(f"Found {target}!")
 True break
 Trueelse:
 True print(f"{target} not found")
 True
 True# while-else
 Truenumber = 0
 Truetarget = 5
 True
 Truewhile number < 10:
 True if number == target:
 True print(f"Found {target}!")
 True break
 True number += 1
 Trueelse:
 True print(f"{target} not found in 0-9")
 True
 True# 应用：查找素数
 Truedef is_prime(n):
 True if n <= 1:
 True return False
 True for i in range(2, int(n**0.5) + 1):
 True if n % i == 0:
 True return False
 True else:
 True return True
 True
 Trueprint(is_prime(17)) # 输出: True
 Trueprint(is_prime(18)) # 输出: False
 True```

 False## 3. 异常处理 (Exception Handling)
 False
 False异常处理用于捕获和处理程序运行时的错误：
 False
```python
 True# 基本用法
 Truetry:
 True result = 10 / 0
 Trueexcept ZeroDivisionError:
 True print("Cannot divide by zero")
 True
 True# 捕获多种异常
 Truetry:
 True number = int(input("Enter a number: "))
 True result = 10 / number
 Trueexcept ValueError:
 True print("Invalid input, please enter a number")
 Trueexcept ZeroDivisionError:
 True print("Cannot divide by zero")
 True
 True# 捕获所有异常
 Truetry:
 True # 可能引发异常的代码
 True pass
 Trueexcept Exception as e:
 True print(f"An error occurred: {e}")
 True
 True# else 子句：当没有异常时执行
 Truetry:
 True result = 10 / 2
 Trueexcept ZeroDivisionError:
 True print("Cannot divide by zero")
 Trueelse:
 True print(f"Result: {result}")
 True
 True# finally 子句：无论是否有异常都执行
 Truetry:
 True file = open("example.txt", "r")
 True content = file.read()
 Trueexcept FileNotFoundError:
 True print("File not found")
 Truefinally:
 True if 'file' in locals():
 True file.close()
 True print("File closed")
 True
 True# 使用 with 语句（自动管理资源）
 Truetry:
 True with open("example.txt", "r") as file:
 True content = file.read()
 True print(content)
 Trueexcept FileNotFoundError:
 True print("File not found")
 True# 文件会自动关闭
 True```

 False## 4. 控制流的最佳实践
 False
 False### 4.1 条件分支最佳实践
 False
 False- **保持条件简洁**: 避免过于复杂的条件表达式
 False- **使用括号**: 当条件复杂时，使用括号提高可读性
 False- **避免嵌套过深**: 尽量减少 `if` 语句的嵌套层级
 False- **使用 `match-case`**: 对于多条件判断，优先使用 `match-case`（Python 3.10+）
 False- **使用常量**: 将魔法数字定义为常量，提高代码可读性
 False
 False### 4.2 循环最佳实践
 False
 False- **选择合适的循环类型**: 对于已知次数的循环使用 `for`，对于未知次数的循环使用 `while`
 False- **使用 `enumerate()`**: 当需要索引和值时，使用 `enumerate()` 函数
 False- **使用 `zip()`**: 当需要同时遍历多个序列时，使用 `zip()` 函数
 False- **避免无限循环**: 确保循环有明确的退出条件
 False- **使用 `for-else`**: 当需要检查循环是否正常完成时，使用 `for-else` 结构
 False
 False### 4.3 异常处理最佳实践
 False
 False- **捕获具体异常**: 尽量捕获具体的异常类型，而不是所有异常
 False- **保持 `try` 块简洁**: 只在 `try` 块中放置可能引发异常的代码
 False- **使用 `with` 语句**: 对于需要资源管理的操作，使用 `with` 语句
 False- **记录异常**: 对于重要的异常，使用日志记录而不是简单打印
 False- **避免过度使用异常**: 不要将异常用于正常的控制流
 False
 False### 4.4 代码风格
 False
 False- **缩进**: 使用 4 个空格进行缩进
 False- **空行**: 在不同的代码块之间使用空行分隔
 False- **注释**: 为复杂的条件和循环添加注释
 False- **命名**: 使用有意义的变量和函数名
 False- **长度**: 保持每行代码长度不超过 79 个字符
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化控制流，引入 Match-Case 与 For-Else 特性。
 False- 2026-04-05: 扩写内容，增加详细的条件分支示例、循环用法、异常处理和控制流最佳实践等内容。
 False