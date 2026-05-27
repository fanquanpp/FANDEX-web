# 函数详解 (Functions In-depth)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 函数定义、参数传递、匿名函数、装饰器及作用域。 | Function definitions, parameters, lambda, decorators, and scope.
 False
 False---
 False
 False## 目录
 False
 False1. [函数基本语法](#函数基本语法)
 False2. [参数类型](#参数类型)
 False3. [匿名函数](#匿名函数)
 False4. [装饰器](#装饰器)
 False5. [高阶函数](#高阶函数)
 False6. [函数作用域](#函数作用域)
 False7. [递归函数](#递归函数)
 False8. [函数式编程](#函数式编程)
 False9. [函数最佳实践](#函数最佳实践)
 False
 False---
 False
 False## 1. 函数基本语法 (Basic Syntax)
 False
 False函数是封装逻辑的可重用代码块，用于组织和简化代码。
 False
 False### 1.1 定义与调用 (Definition & Invocation)
 False
```python
 True# 基本函数定义
 Truedef greet(name, msg="Hello"):
 True """
 True 函数文档字符串 | Docstring
 True 
 True Args:
 True name (str): 用户名
 True msg (str): 问候消息，默认为 "Hello"
 True 
 True Returns:
 True str: 格式化的问候消息
 True """
 True return f"{msg}, {name}!"
 True
 True# 调用函数
 Trueprint(greet("Alice")) # 输出: Hello, Alice!
 Trueprint(greet("Bob", "Hi")) # 输出: Hi, Bob!
 True
 True# 无返回值的函数
 Truedef print_message(message):
 True """打印消息"""
 True print(f"Message: {message}")
 True
 Trueprint_message("Hello, World!") # 输出: Message: Hello, World!
 True
 True# 多返回值函数
 Truedef get_user_info():
 True """返回用户信息"""
 True name = "Alice"
 True age = 30
 True city = "New York"
 True return name, age, city # 返回元组
 True
 Trueuser_name, user_age, user_city = get_user_info()
 Trueprint(f"Name: {user_name}, Age: {user_age}, City: {user_city}")
 True
 True# 空函数
 Truedef placeholder():
 True """占位函数"""
 True pass # 空语句
 True```

 False### 1.2 参数传递 (Parameter Passing)
 False
 FalsePython 中采用**引用传递** (Pass by Object Reference) 的方式传递参数：
 False
 False- **不可变对象 (int, str, tuple)**: 修改形参不会影响实参
 False- **可变对象 (list, dict, set)**: 修改形参的内容会影响实参
 False
```python
 True# 不可变对象示例
 Truedef modify_immutable(x):
 True x = x + 1
 True print(f"Inside function: x = {x}")
 True
 Truenum = 10
 Truemodify_immutable(num)
 Trueprint(f"Outside function: num = {num}") # 输出: 10（实参未改变）
 True
 True# 可变对象示例
 Truedef modify_mutable(lst):
 True lst.append(4)
 True print(f"Inside function: lst = {lst}")
 True
 Truemy_list = [1, 2, 3]
 Truemodify_mutable(my_list)
 Trueprint(f"Outside function: my_list = {my_list}") # 输出: [1, 2, 3, 4]（实参被修改）
 True
 True# 重新绑定可变对象
 Truedef rebind_mutable(lst):
 True lst = [4, 5, 6] # 重新绑定局部变量
 True print(f"Inside function: lst = {lst}")
 True
 Truemy_list = [1, 2, 3]
 Truerebind_mutable(my_list)
 Trueprint(f"Outside function: my_list = {my_list}") # 输出: [1, 2, 3]（实参未改变）
 True```

 False## 2. 参数类型 (Parameter Types)
 False
 FalsePython 支持多种类型的函数参数：
 False
 False### 2.1 位置参数 (Positional Parameters)
 False
 False位置参数是最基本的参数类型，必须按顺序传递：
 False
```python
 Truedef add(a, b):
 True return a + b
 True
 Trueprint(add(3, 5)) # 输出: 8
 True# print(add(3)) # 错误: 缺少位置参数 b
 True```

 False### 2.2 关键字参数 (Keyword Parameters)
 False
 False关键字参数允许通过参数名指定值，顺序可以任意：
 False
```python
 Truedef greet(name, age):
 True return f"Hello, {name}! You are {age} years old."
 True
 Trueprint(greet(name="Alice", age=30)) # 输出: Hello, Alice! You are 30 years old.
 Trueprint(greet(age=25, name="Bob")) # 输出: Hello, Bob! You are 25 years old.
 True```

 False### 2.3 默认参数 (Default Parameters)
 False
 False默认参数为参数提供默认值，当调用时未提供该参数时使用：
 False
```python
 Truedef greet(name, msg="Hello", age=None):
 True if age:
 True return f"{msg}, {name}! You are {age} years old."
 True return f"{msg}, {name}!"
 True
 Trueprint(greet("Alice")) # 输出: Hello, Alice!
 Trueprint(greet("Bob", "Hi")) # 输出: Hi, Bob!
 Trueprint(greet("Charlie", age=25)) # 输出: Hello, Charlie! You are 25 years old.
 True
 True# 陷阱: 不要使用可变对象作为默认参数
 Truedef add_item(item, items=[]): # 危险：默认参数在函数定义时只计算一次
 True items.append(item)
 True return items
 True
 Trueprint(add_item(1)) # 输出: [1]
 Trueprint(add_item(2)) # 输出: [1, 2]（意外：使用了同一个列表）
 True
 True# 正确的做法
 Truedef add_item_safe(item, items=None):
 True if items is None:
 True items = []
 True items.append(item)
 True return items
 True
 Trueprint(add_item_safe(1)) # 输出: [1]
 Trueprint(add_item_safe(2)) # 输出: [2]（正确：每次创建新列表）
 True```

 False### 2.4 可变参数 (*args)
 False
 False可变参数允许接收任意数量的位置参数，会将这些参数打包成一个元组：
 False
```python
 Truedef sum_numbers(*args):
 True """计算任意数量数字的和"""
 True total = 0
 True for num in args:
 True total += num
 True return total
 True
 Trueprint(sum_numbers(1, 2, 3)) # 输出: 6
 Trueprint(sum_numbers(1, 2, 3, 4, 5)) # 输出: 15
 Trueprint(sum_numbers()) # 输出: 0
 True
 True# 解包序列作为可变参数
 Truenumbers = [1, 2, 3, 4, 5]
 Trueprint(sum_numbers(*numbers)) # 输出: 15
 True```

 False### 2.5 关键字可变参数 (**kwargs)
 False
 False关键字可变参数允许接收任意数量的关键字参数，会将这些参数打包成一个字典：
 False
```python
 Truedef print_person(**kwargs):
 True """打印人物信息"""
 True for key, value in kwargs.items():
 True print(f"{key}: {value}")
 True
 Trueprint_person(name="Alice", age=30, city="New York")
 True# 输出:
 True# name: Alice
 True# age: 30
 True# city: New York
 True
 True# 解包字典作为关键字可变参数
 Trueperson_info = {"name": "Bob", "age": 25, "city": "London"}
 Trueprint_person(**person_info)
 True```

 False### 2.6 混合使用不同类型的参数
 False
 False参数定义的顺序必须是：位置参数 → 默认参数 → 可变参数 → 关键字可变参数
 False
```python
 Truedef mixed_params(a, b, c=10, *args, **kwargs):
 True print(f"a: {a}, b: {b}, c: {c}")
 True print(f"args: {args}")
 True print(f"kwargs: {kwargs}")
 True
 Truemixed_params(1, 2, 3, 4, 5, 6, name="Alice", age=30)
 True# 输出:
 True# a: 1, b: 2, c: 3
 True# args: (4, 5, 6)
 True# kwargs: {'name': 'Alice', 'age': 30}
 True```

 False## 3. 匿名函数 (Lambda)
 False
 FalseLambda 函数是一种小型的匿名函数，使用 `lambda` 关键字定义：
 False
 False### 3.1 基本语法
 False
```python
 True# 基本语法: lambda arguments: expression
 Trueadd = lambda x, y: x + y
 Trueprint(add(5, 5)) # 输出: 10
 True
 True# 无参数
 Truegreet = lambda: "Hello, World!"
 Trueprint(greet()) # 输出: Hello, World!
 True
 True# 单个参数
 Truesquare = lambda x: x ** 2
 Trueprint(square(4)) # 输出: 16
 True
 True# 多个参数
 Truemax_num = lambda x, y: x if x > y else y
 Trueprint(max_num(10, 20)) # 输出: 20
 True```

 False### 3.2 Lambda 函数的应用场景
 False
 FalseLambda 函数常用于需要简短函数的场景，如作为高阶函数的参数：
 False
```python
 True# 与 map() 结合
 Truenumbers = [1, 2, 3, 4, 5]
 Truesquared = list(map(lambda x: x ** 2, numbers))
 Trueprint(squared) # 输出: [1, 4, 9, 16, 25]
 True
 True# 与 filter() 结合
 Trueeven_numbers = list(filter(lambda x: x % 2 == 0, numbers))
 Trueprint(even_numbers) # 输出: [2, 4]
 True
 True# 与 sorted() 结合
 Truestudents = [
 True {"name": "Alice", "grade": 85},
 True {"name": "Bob", "grade": 92},
 True {"name": "Charlie", "grade": 78}
 True]
 True
 True# 按分数排序
 Truesorted_by_grade = sorted(students, key=lambda student: student["grade"], reverse=True)
 Trueprint(sorted_by_grade)
 True
 True# 与 reduce() 结合
 Truefrom functools import reduce
 Trueproduct = reduce(lambda x, y: x * y, numbers)
 Trueprint(product) # 输出: 120
 True
 True# 作为返回值
 Truedef make_adder(n):
 True return lambda x: x + n
 True
 Trueadd5 = make_adder(5)
 Trueprint(add5(10)) # 输出: 15
 True```

 False## 4. 装饰器 (Decorators)
 False
 False装饰器是一种特殊的函数，用于修改其他函数的行为，而不改变其源代码：
 False
 False### 4.1 基本装饰器
 False
```python
 Truedef timer(func):
 True """计算函数执行时间的装饰器"""
 True import time
 True 
 True def wrapper(*args, **kwargs):
 True start_time = time.time()
 True result = func(*args, **kwargs)
 True end_time = time.time()
 True print(f"{func.__name__} 执行时间: {end_time - start_time:.4f} 秒")
 True return result
 True 
 True return wrapper
 True
 True@timer # 等价于: slow_function = timer(slow_function)
 Truedef slow_function():
 True """模拟耗时操作"""
 True import time
 True time.sleep(1)
 True print("Function executed")
 True
 Trueslow_function()
 True```

 False### 4.2 带参数的装饰器
 False
```python
 Truedef repeat(n):
 True """重复执行函数 n 次的装饰器"""
 True def decorator(func):
 True def wrapper(*args, **kwargs):
 True for i in range(n):
 True result = func(*args, **kwargs)
 True return result
 True return wrapper
 True return decorator
 True
 True@repeat(3) # 传递参数给装饰器
 Truedef say_hello(name):
 True print(f"Hello, {name}!")
 True
 Truesay_hello("Alice")
 True# 输出:
 True# Hello, Alice!
 True# Hello, Alice!
 True# Hello, Alice!
 True```

 False### 4.3 保留原函数信息
 False
 False使用 `functools.wraps` 保留原函数的元数据：
 False
```python
 Trueimport functools
 True
 Truedef my_decorator(func):
 True @functools.wraps(func) # 保留原函数信息
 True def wrapper(*args, **kwargs):
 True print("Before function execution")
 True result = func(*args, **kwargs)
 True print("After function execution")
 True return result
 True return wrapper
 True
 True@my_decorator
 Truedef example():
 True """示例函数"""
 True print("Function executed")
 True
 Trueexample()
 Trueprint(f"Function name: {example.__name__}")
 Trueprint(f"Function docstring: {example.__doc__}")
 True```

 False### 4.4 装饰器链
 False
 False多个装饰器可以同时应用于一个函数：
 False
```python
 Truedef decorator1(func):
 True def wrapper(*args, **kwargs):
 True print("Decorator 1 before")
 True result = func(*args, **kwargs)
 True print("Decorator 1 after")
 True return result
 True return wrapper
 True
 Truedef decorator2(func):
 True def wrapper(*args, **kwargs):
 True print("Decorator 2 before")
 True result = func(*args, **kwargs)
 True print("Decorator 2 after")
 True return result
 True return wrapper
 True
 True@decorator1
 True@decorator2
 Truedef my_function():
 True print("Function executed")
 True
 Truemy_function()
 True# 输出顺序:
 True# Decorator 1 before
 True# Decorator 2 before
 True# Function executed
 True# Decorator 2 after
 True# Decorator 1 after
 True```

 False## 5. 高阶函数 (Higher-Order Functions)
 False
 False高阶函数是指接收函数作为参数或返回函数的函数：
 False
 False### 5.1 接收函数作为参数
 False
```python
 Truedef apply_function(func, value):
 True """应用函数到值"""
 True return func(value)
 True
 Truedef square(x):
 True return x ** 2
 True
 Truedef cube(x):
 True return x ** 3
 True
 Trueprint(apply_function(square, 5)) # 输出: 25
 Trueprint(apply_function(cube, 5)) # 输出: 125
 Trueprint(apply_function(lambda x: x + 1, 5)) # 输出: 6
 True```

 False### 5.2 返回函数
 False
```python
 Truedef make_multiplier(n):
 True """返回一个乘以 n 的函数"""
 True def multiplier(x):
 True return x * n
 True return multiplier
 True
 Truedouble = make_multiplier(2)
 Truetriple = make_multiplier(3)
 True
 Trueprint(double(5)) # 输出: 10
 Trueprint(triple(5)) # 输出: 15
 True```

 False### 5.3 内置高阶函数
 False
 False#### 5.3.1 `map()`
 False
 False`map()` 函数对序列中的每个元素应用一个函数：
 False
```python
 True# 基本用法
 Truenumbers = [1, 2, 3, 4, 5]
 Truesquared = list(map(lambda x: x ** 2, numbers))
 Trueprint(squared) # 输出: [1, 4, 9, 16, 25]
 True
 True# 多个序列
 Truenumbers1 = [1, 2, 3]
 Truenumbers2 = [4, 5, 6]
 Truesummed = list(map(lambda x, y: x + y, numbers1, numbers2))
 Trueprint(summed) # 输出: [5, 7, 9]
 True
 True# 自定义函数
 Truedef to_upper(s):
 True return s.upper()
 True
 Truewords = ["hello", "world", "python"]
 Trueupper_words = list(map(to_upper, words))
 Trueprint(upper_words) # 输出: ['HELLO', 'WORLD', 'PYTHON']
 True```

 False#### 5.3.2 `filter()`
 False
 False`filter()` 函数根据函数结果过滤序列中的元素：
 False
```python
 True# 基本用法
 Truenumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 Trueeven_numbers = list(filter(lambda x: x % 2 == 0, numbers))
 Trueprint(even_numbers) # 输出: [2, 4, 6, 8, 10]
 True
 True# 过滤非空字符串
 Truewords = ["hello", "", "world", "", "python"]
 Truenon_empty = list(filter(lambda s: s, words))
 Trueprint(non_empty) # 输出: ['hello', 'world', 'python']
 True
 True# 自定义函数
 Truedef is_positive(n):
 True return n > 0
 True
 Truenumbers = [-5, -3, 0, 2, 7, -1]
 Truepositive_numbers = list(filter(is_positive, numbers))
 Trueprint(positive_numbers) # 输出: [2, 7]
 True```

 False#### 5.3.3 `reduce()`
 False
 False`reduce()` 函数对序列中的元素进行累积计算：
 False
```python
 Truefrom functools import reduce
 True
 True# 基本用法
 Truenumbers = [1, 2, 3, 4, 5]
 Truesum_result = reduce(lambda x, y: x + y, numbers)
 Trueprint(sum_result) # 输出: 15
 True
 True# 带初始值
 Trueproduct_result = reduce(lambda x, y: x * y, numbers, 10) # 初始值为 10
 Trueprint(product_result) # 输出: 1200 (10 * 1 * 2 * 3 * 4 * 5)
 True
 True# 连接字符串
 Truewords = ["Hello", " ", "World", "!"]
 Truesentence = reduce(lambda x, y: x + y, words)
 Trueprint(sentence) # 输出: Hello World!
 True
 True# 查找最大值
 Truenumbers = [3, 1, 4, 1, 5, 9, 2, 6]
 Truemax_value = reduce(lambda x, y: x if x > y else y, numbers)
 Trueprint(max_value) # 输出: 9
 True```

 False## 6. 函数作用域 (Function Scope)
 False
 FalsePython 中的变量作用域遵循 LEGB 规则：
 False
 False1. **Local (L)**: 局部作用域，在函数内部定义的变量
 False2. **Enclosing (E)**: 嵌套作用域，在嵌套函数的外层函数中定义的变量
 False3. **Global (G)**: 全局作用域，在模块级别定义的变量
 False4. **Built-in (B)**: 内置作用域，Python 内置的变量和函数
 False
 False### 6.1 局部作用域
 False
```python
 Truedef my_function():
 True local_var = "local"
 True print(local_var) # 可以访问局部变量
 True
 Truemy_function()
 True# print(local_var) # 错误: 无法访问局部变量
 True```

 False### 6.2 全局作用域
 False
```python
 Trueglobal_var = "global"
 True
 Truedef my_function():
 True print(global_var) # 可以访问全局变量
 True
 Truemy_function()
 Trueprint(global_var) # 可以访问全局变量
 True```

 False### 6.3 修改全局变量
 False
```python
 Trueglobal_var = "global"
 True
 Truedef my_function():
 True global global_var # 声明要修改全局变量
 True global_var = "modified global"
 True print(global_var)
 True
 Truemy_function()
 Trueprint(global_var) # 输出: modified global
 True```

 False### 6.4 嵌套作用域
 False
```python
 Truedef outer_function():
 True outer_var = "outer"
 True 
 True def inner_function():
 True nonlocal outer_var # 声明要修改嵌套作用域变量
 True outer_var = "modified outer"
 True print(outer_var)
 True 
 True inner_function()
 True print(outer_var) # 输出: modified outer
 True
 Trueouter_function()
 True```

 False## 7. 递归函数 (Recursive Functions)
 False
 False递归函数是调用自身的函数，用于解决可以分解为相同子问题的问题：
 False
 False### 7.1 基本递归
 False
```python
 Truedef factorial(n):
 True """计算阶乘"""
 True if n <= 1:
 True return 1
 True return n * factorial(n - 1)
 True
 Trueprint(factorial(5)) # 输出: 120
 True
 True# 斐波那契数列
 Truedef fibonacci(n):
 True """计算斐波那契数列第 n 项"""
 True if n <= 1:
 True return n
 True return fibonacci(n - 1) + fibonacci(n - 2)
 True
 Trueprint(fibonacci(10)) # 输出: 55
 True```

 False### 7.2 递归的注意事项
 False
 False- **基线条件**: 必须有一个明确的终止条件
 False- **递归深度**: Python 默认递归深度限制为 1000
 False- **性能**: 某些递归实现可能效率低下，可考虑使用记忆化或迭代
 False
```python
 True# 记忆化优化斐波那契
 Truefrom functools import lru_cache
 True
 True@lru_cache(maxsize=None)
 Truedef fibonacci_memo(n):
 True if n <= 1:
 True return n
 True return fibonacci_memo(n - 1) + fibonacci_memo(n - 2)
 True
 Trueprint(fibonacci_memo(100)) # 快速计算大值
 True
 True# 迭代实现斐波那契
 Truedef fibonacci_iterative(n):
 True if n <= 1:
 True return n
 True a, b = 0, 1
 True for _ in range(2, n + 1):
 True a, b = b, a + b
 True return b
 True
 Trueprint(fibonacci_iterative(100)) # 更高效
 True```

 False## 8. 函数式编程 (Functional Programming)
 False
 False函数式编程是一种编程范式，强调使用纯函数、不可变数据和高阶函数：
 False
 False### 8.1 纯函数
 False
 False纯函数是指没有副作用且相同输入总是产生相同输出的函数：
 False
```python
 True# 纯函数
 Truedef add(a, b):
 True return a + b
 True
 True# 非纯函数（有副作用）
 Truetotal = 0
 Truedef add_to_total(x):
 True global total
 True total += x
 True return total
 True```

 False### 8.2 不可变数据
 False
 False函数式编程鼓励使用不可变数据，避免修改现有数据：
 False
```python
 True# 不可变操作
 Truenumbers = [1, 2, 3]
 True# 创建新列表而不是修改原列表
 Truenew_numbers = [x * 2 for x in numbers]
 Trueprint(numbers) # 原列表不变: [1, 2, 3]
 Trueprint(new_numbers) # 新列表: [2, 4, 6]
 True
 True# 使用元组（不可变）
 Truepoint = (1, 2)
 True# point[0] = 3 # 错误: 元组不可修改
 True```

 False### 8.3 函数式编程工具
 False
```python
 Truefrom functools import reduce
 True
 True# 组合函数
 Truedef compose(f, g):
 True return lambda x: f(g(x))
 True
 Truedef add_one(x):
 True return x + 1
 True
 Truedef multiply_by_two(x):
 True return x * 2
 True
 True# 先加 1，再乘以 2
 Trueadd_one_then_multiply_by_two = compose(multiply_by_two, add_one)
 Trueprint(add_one_then_multiply_by_two(5)) # 输出: 12
 True
 True# 管道操作
 Truefrom functools import reduce
 True
 Truedef pipe(data, *functions):
 True return reduce(lambda x, func: func(x), functions, data)
 True
 Trueresult = pipe(
 True 5,
 True lambda x: x + 1, # 6
 True lambda x: x * 2, # 12
 True lambda x: x - 3 # 9
 True)
 Trueprint(result) # 输出: 9
 True```

 False## 9. 函数最佳实践
 False
 False### 9.1 函数设计
 False
 False- **单一职责**: 每个函数应该只做一件事情
 False- **函数长度**: 保持函数简洁，通常不超过 50 行
 False- **命名规范**: 使用小写字母和下划线，函数名应该描述其功能
 False- **文档字符串**: 为函数添加详细的文档字符串
 False- **参数数量**: 尽量减少参数数量，通常不超过 5 个
 False
 False### 9.2 性能优化
 False
 False- **避免重复计算**: 使用缓存或记忆化
 False- **避免不必要的全局变量**: 优先使用函数参数和返回值
 False- **使用适当的数据结构**: 选择合适的数据结构提高性能
 False- **生成器**: 对于大型数据集，使用生成器节省内存
 False
 False### 9.3 代码风格
 False
 False- **缩进**: 使用 4 个空格进行缩进
 False- **空行**: 在函数定义之间使用空行
 False- **注释**: 为复杂的逻辑添加注释
 False- **类型提示**: 使用类型提示提高代码可读性
 False
```python
 True# 使用类型提示
 Truedef greet(name: str, age: int) -> str:
 True """问候函数"""
 True return f"Hello, {name}! You are {age} years old."
 True
 True# 类型提示的好处
 True# 1. 提高代码可读性
 True# 2. 支持静态类型检查
 True# 3. 提供更好的代码补全
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化装饰器与参数传递细节。
 False- 2026-04-05: 扩写内容，增加详细的函数定义、参数类型、Lambda函数应用、装饰器实现、高阶函数、作用域、递归函数和函数式编程等内容。
 False