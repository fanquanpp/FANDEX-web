# 推导式与生成器 (Comprehensions & Generators)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 列表/字典推导式、迭代器、生成器及 Lazy Evaluation。 | Comprehensions, Iterators, Generators, and Lazy Evaluation.
 False
 False---
 False
 False## 目录
 False
 False1. [推导式](#推导式)
 False2. [迭代器](#迭代器)
 False3. [生成器](#生成器)
 False4. [惰性求值](#惰性求值)
 False5. [迭代工具](#迭代工具)
 False6. [最佳实践](#最佳实践)
 False7. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 推导式 (Comprehensions)
 False
 False推导式是一种简洁高效的方式，用于从现有的序列创建新的序列。
 False
 False### 1.1 列表推导式 (List Comprehensions)
 False
 False列表推导式使用方括号 `[]` 来创建新的列表：
 False
```python
 True# 基本语法: [expression for item in iterable if condition]
 True
 True# 生成平方数列表
 Truesquares = [x ** 2 for x in range(10)]
 Trueprint(squares) # 输出: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
 True
 True# 带条件的列表推导式
 Trueeven_squares = [x ** 2 for x in range(10) if x % 2 == 0]
 Trueprint(even_squares) # 输出: [0, 4, 16, 36, 64]
 True
 True# 嵌套的列表推导式
 Truematrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 Trueflattened = [num for row in matrix for num in row]
 Trueprint(flattened) # 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 True
 True# 复杂表达式的列表推导式
 Truenames = ["Alice", "Bob", "Charlie", "David"]
 Truename_lengths = [(name, len(name)) for name in names]
 Trueprint(name_lengths) # 输出: [('Alice', 5), ('Bob', 3), ('Charlie', 7), ('David', 5)]
 True
 True# 多层嵌套的列表推导式
 True# 生成 3x3 的乘法表
 Truemultiplication_table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
 Trueprint(multiplication_table) # 输出: [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
 True```

 False### 1.2 字典推导式 (Dictionary Comprehensions)
 False
 False字典推导式使用花括号 `{}` 来创建新的字典：
 False
```python
 True# 基本语法: {key_expression: value_expression for item in iterable if condition}
 True
 True# 从列表创建字典
 Truenames = ["Alice", "Bob", "Charlie"]
 Truename_lengths = {name: len(name) for name in names}
 Trueprint(name_lengths) # 输出: {'Alice': 5, 'Bob': 3, 'Charlie': 7}
 True
 True# 带条件的字典推导式
 Truenumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 Trueeven_squares = {num: num ** 2 for num in numbers if num % 2 == 0}
 Trueprint(even_squares) # 输出: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
 True
 True# 从现有字典创建新字典
 Trueperson = {"name": "Alice", "age": 30, "city": "New York"}
 Trueupper_case = {k.upper(): v for k, v in person.items()}
 Trueprint(upper_case) # 输出: {'NAME': 'Alice', 'AGE': 30, 'CITY': 'New York'}
 True
 True# 交换字典的键值对
 Trueoriginal = {"a": 1, "b": 2, "c": 3}
 Trueswapped = {v: k for k, v in original.items()}
 Trueprint(swapped) # 输出: {1: 'a', 2: 'b', 3: 'c'}
 True```

 False### 1.3 集合推导式 (Set Comprehensions)
 False
 False集合推导式使用花括号 `{}` 来创建新的集合：
 False
```python
 True# 基本语法: {expression for item in iterable if condition}
 True
 True# 生成平方数集合
 Truenumbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
 Truesquares = {x ** 2 for x in numbers}
 Trueprint(squares) # 输出: {1, 4, 9, 16, 25}（自动去重）
 True
 True# 带条件的集合推导式
 Truepositive_numbers = {x for x in range(-5, 6) if x > 0}
 Trueprint(positive_numbers) # 输出: {1, 2, 3, 4, 5}
 True
 True# 字符串去重
 Truetext = "hello world"
 Trueunique_chars = {char for char in text if char != " "}
 Trueprint(unique_chars) # 输出: {'d', 'e', 'h', 'l', 'o', 'r', 'w'}
 True```

 False### 1.4 推导式的性能
 False
 False推导式通常比传统的循环更高效，因为它们在 C 语言级别执行，减少了 Python 解释器的开销：
 False
```python
 Trueimport time
 True
 True# 使用传统循环
 Truestart = time.time()
 Truesquares = []
 Truefor i in range(1000000):
 True squares.append(i ** 2)
 Trueend = time.time()
 Trueprint(f"传统循环: {end - start:.4f} 秒")
 True
 True# 使用列表推导式
 Truestart = time.time()
 Truesquares = [i ** 2 for i in range(1000000)]
 Trueend = time.time()
 Trueprint(f"列表推导式: {end - start:.4f} 秒")
 True```

 False## 2. 迭代器 (Iterators)
 False
 False迭代器是实现了迭代协议的对象，它允许我们遍历容器中的元素。
 False
 False### 2.1 迭代器协议
 False
 False一个对象要成为迭代器，必须实现两个方法：
 False
 False- `__iter__()`: 返回迭代器本身
 False- `__next__()`: 返回下一个元素，当没有更多元素时抛出 `StopIteration` 异常
 False
```python
 True# 自定义迭代器
 Trueclass Countdown:
 True def __init__(self, start):
 True self.start = start
 True 
 True def __iter__(self):
 True return self
 True 
 True def __next__(self):
 True if self.start <= 0:
 True raise StopIteration
 True self.start -= 1
 True return self.start + 1
 True
 True# 使用自定义迭代器
 Truefor i in Countdown(5):
 True print(i) # 输出: 5, 4, 3, 2, 1
 True
 True# 手动使用迭代器
 Truecountdown = Countdown(3)
 Trueit = iter(countdown)
 Trueprint(next(it)) # 输出: 3
 Trueprint(next(it)) # 输出: 2
 Trueprint(next(it)) # 输出: 1
 True# print(next(it)) # 抛出 StopIteration 异常
 True```

 False### 2.2 内置迭代器
 False
 FalsePython 中的许多内置对象都是可迭代的，例如列表、元组、字符串、字典等：
 False
```python
 True# 列表是可迭代的
 Truenumbers = [1, 2, 3]
 Trueit = iter(numbers)
 Trueprint(next(it)) # 输出: 1
 Trueprint(next(it)) # 输出: 2
 Trueprint(next(it)) # 输出: 3
 True
 True# 字符串是可迭代的
 Truetext = "hello"
 Trueit = iter(text)
 Trueprint(next(it)) # 输出: 'h'
 Trueprint(next(it)) # 输出: 'e'
 True
 True# 字典是可迭代的（默认迭代键）
 Trued = {"a": 1, "b": 2}
 Trueit = iter(d)
 Trueprint(next(it)) # 输出: 'a'
 Trueprint(next(it)) # 输出: 'b'
 True
 True# 迭代字典的值
 Trueit = iter(d.values())
 Trueprint(next(it)) # 输出: 1
 Trueprint(next(it)) # 输出: 2
 True
 True# 迭代字典的键值对
 Trueit = iter(d.items())
 Trueprint(next(it)) # 输出: ('a', 1)
 Trueprint(next(it)) # 输出: ('b', 2)
 True```

 False### 2.3 `iter()` 和 `next()` 函数
 False
 False- `iter()`: 将可迭代对象转换为迭代器
 False- `next()`: 获取迭代器的下一个元素
 False
```python
 True# 使用 iter() 函数
 Truenumbers = [1, 2, 3]
 Trueit = iter(numbers)
 True
 True# 使用 next() 函数
 Trueprint(next(it)) # 输出: 1
 Trueprint(next(it)) # 输出: 2
 Trueprint(next(it)) # 输出: 3
 True# print(next(it)) # 抛出 StopIteration 异常
 True
 True# 为 next() 提供默认值
 Trueit = iter([])
 Trueprint(next(it, "No more elements")) # 输出: No more elements
 True```

 False## 3. 生成器 (Generators)
 False
 False生成器是一种特殊的迭代器，它使用 `yield` 关键字来生成值，实现了惰性求值。
 False
 False### 3.1 生成器表达式 (Generator Expressions)
 False
 False生成器表达式使用圆括号 `()` 来创建生成器，语法与列表推导式类似：
 False
```python
 True# 基本语法: (expression for item in iterable if condition)
 True
 True# 创建生成器
 Truegen = (x ** 2 for x in range(10))
 Trueprint(type(gen)) # 输出: <class 'generator'>
 True
 True# 遍历生成器
 Truefor num in gen:
 True print(num) # 输出: 0, 1, 4, 9, 16, 25, 36, 49, 64, 81
 True
 True# 生成器只能遍历一次
 Truegen = (x ** 2 for x in range(5))
 Trueprint(list(gen)) # 输出: [0, 1, 4, 9, 16]
 Trueprint(list(gen)) # 输出: []（生成器已耗尽）
 True
 True# 内存使用对比
 Trueimport sys
 True
 True# 列表占用的内存
 Truet_list = [x for x in range(1000000)]
 Trueprint(f"列表内存: {sys.getsizeof(t_list):,} 字节")
 True
 True# 生成器占用的内存
 Truet_gen = (x for x in range(1000000))
 Trueprint(f"生成器内存: {sys.getsizeof(t_gen):,} 字节")
 True```

 False### 3.2 生成器函数 (Generator Functions)
 False
 False生成器函数使用 `yield` 关键字来定义，当函数被调用时，它返回一个生成器对象：
 False
```python
 True# 基本语法
 Truedef generator_function():
 True yield value1
 True yield value2
 True # ...
 True
 True# 示例: 生成斐波那契数列
 Truedef fibonacci(n):
 True """生成前 n 个斐波那契数"""
 True a, b = 0, 1
 True for _ in range(n):
 True yield a
 True a, b = b, a + b
 True
 True# 使用生成器函数
 Truefor num in fibonacci(10):
 True print(num, end=" ") # 输出: 0 1 1 2 3 5 8 13 21 34
 True
 True# 手动使用生成器
 Truefib = fibonacci(3)
 Trueprint(next(fib)) # 输出: 0
 Trueprint(next(fib)) # 输出: 1
 Trueprint(next(fib)) # 输出: 1
 True# print(next(fib)) # 抛出 StopIteration 异常
 True
 True# 示例: 生成无限序列
 Truedef infinite_counter():
 True """生成无限递增的计数器"""
 True i = 0
 True while True:
 True yield i
 True i += 1
 True
 True# 使用无限生成器（需要手动停止）
 Truecounter = infinite_counter()
 Truefor _ in range(5):
 True print(next(counter)) # 输出: 0, 1, 2, 3, 4
 True```

 False### 3.3 生成器的高级特性
 False
 False#### 3.3.1 `send()` 方法
 False
 False生成器的 `send()` 方法允许向生成器发送值：
 False
```python
 Truedef echo():
 True while True:
 True received = yield
 True print(f"Received: {received}")
 True
 True# 使用 send() 方法
 Truegen = echo()
 Truenext(gen) # 启动生成器
 Truegen.send("Hello") # 输出: Received: Hello
 Truegen.send("World") # 输出: Received: World
 Truegen.close() # 关闭生成器
 True```

 False#### 3.3.2 `throw()` 方法
 False
 False生成器的 `throw()` 方法允许向生成器抛出异常：
 False
```python
 Truedef error_handling():
 True try:
 True while True:
 True yield "Normal operation"
 True except ValueError:
 True yield "Handling ValueError"
 True except Exception:
 True yield "Handling other exception"
 True
 True# 使用 throw() 方法
 Truegen = error_handling()
 Trueprint(next(gen)) # 输出: Normal operation
 Trueprint(gen.throw(ValueError)) # 输出: Handling ValueError
 Trueprint(next(gen)) # 输出: Normal operation
 Trueprint(gen.throw(TypeError)) # 输出: Handling other exception
 True```

 False#### 3.3.3 `close()` 方法
 False
 False生成器的 `close()` 方法用于关闭生成器：
 False
```python
 Truedef countdown(n):
 True while n > 0:
 True yield n
 True n -= 1
 True
 True# 使用 close() 方法
 Truegen = countdown(5)
 Trueprint(next(gen)) # 输出: 5
 Trueprint(next(gen)) # 输出: 4
 Truegen.close()
 True# print(next(gen)) # 抛出 StopIteration 异常
 True```

 False## 4. 惰性求值 (Lazy Evaluation)
 False
 False惰性求值是一种计算策略，它推迟计算直到真正需要结果的时候。
 False
 False### 4.1 惰性求值的优势
 False
 False- **节省内存**: 不需要一次性存储所有数据
 False- **提高性能**: 避免不必要的计算
 False- **处理无限序列**: 可以表示理论上无限的序列
 False- **流式处理**: 适合处理大型数据集
 False
 False### 4.2 惰性求值的应用
 False
```python
 True# 处理大型文件
 Truedef read_large_file(file_path):
 True """惰性读取大型文件"""
 True with open(file_path, 'r') as f:
 True for line in f:
 True yield line.strip()
 True
 True# 使用生成器处理大型文件
 Truefor line in read_large_file('large_file.txt'):
 True # 处理每一行，而不是一次性加载整个文件
 True pass
 True
 True# 链式生成器
 Truedef filter_lines(lines, keyword):
 True """过滤包含关键字的行"""
 True for line in lines:
 True if keyword in line:
 True yield line
 True
 Truedef process_lines(lines):
 True """处理行"""
 True for line in lines:
 True yield line.upper()
 True
 True# 链式使用生成器
 Truelines = read_large_file('large_file.txt')
 Truefiltered = filter_lines(lines, 'python')
 Trueprocessed = process_lines(filtered)
 True
 Truefor line in processed:
 True print(line)
 True```

 False## 5. 迭代工具
 False
 FalsePython 标准库提供了一些实用的迭代工具：
 False
 False### 5.1 `itertools` 模块
 False
 False`itertools` 模块提供了许多用于创建和操作迭代器的函数：
 False
```python
 Trueimport itertools
 True
 True# 无限迭代器
 True# count(): 从指定值开始无限计数
 Truefor i in itertools.count(5, 2):
 True print(i, end=" ")
 True if i > 10:
 True break # 输出: 5 7 9 11
 True
 True# cycle(): 无限循环迭代一个序列
 Truecount = 0
 Truefor item in itertools.cycle(['A', 'B', 'C']):
 True print(item, end=" ")
 True count += 1
 True if count > 5:
 True break # 输出: A B C A B C
 True
 True# repeat(): 重复一个值指定次数或无限次
 Truefor item in itertools.repeat('Hello', 3):
 True print(item) # 输出: Hello Hello Hello
 True
 True# 组合迭代器
 True# product(): 笛卡尔积
 Trueprint(list(itertools.product([1, 2], ['a', 'b'])))
 True# 输出: [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
 True
 True# permutations(): 排列
 Trueprint(list(itertools.permutations([1, 2, 3], 2)))
 True# 输出: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
 True
 True# combinations(): 组合
 Trueprint(list(itertools.combinations([1, 2, 3], 2)))
 True# 输出: [(1, 2), (1, 3), (2, 3)]
 True
 True# 其他有用的函数
 True# chain(): 连接多个迭代器
 Trueprint(list(itertools.chain([1, 2], [3, 4], [5, 6])))
 True# 输出: [1, 2, 3, 4, 5, 6]
 True
 True# groupby(): 分组
 Truefrom operator import itemgetter
 True
 Truedata = [
 True {'name': 'Alice', 'age': 25},
 True {'name': 'Bob', 'age': 30},
 True {'name': 'Charlie', 'age': 25},
 True {'name': 'David', 'age': 30}
 True]
 True
 True# 按年龄分组
 Truedata.sort(key=itemgetter('age'))
 Truefor age, group in itertools.groupby(data, key=itemgetter('age')):
 True print(f"Age {age}:")
 True for person in group:
 True print(f" {person['name']}")
 True```

 False### 5.2 `functools` 模块
 False
 False`functools` 模块中的 `reduce()` 函数可以与生成器结合使用：
 False
```python
 Truefrom functools import reduce
 True
 True# 使用 reduce() 计算生成器的和
 Truedef numbers():
 True for i in range(1, 6):
 True yield i
 True
 Trueresult = reduce(lambda x, y: x + y, numbers())
 Trueprint(result) # 输出: 15
 True```

 False## 6. 最佳实践
 False
 False### 6.1 推导式的最佳实践
 False
 False- **简洁性**: 推导式应该简洁明了，避免过于复杂的表达式
 False- **可读性**: 对于复杂的逻辑，考虑使用传统循环
 False- **性能**: 对于大型数据集，考虑使用生成器表达式
 False- **嵌套**: 避免过多的嵌套推导式，保持代码可读性
 False
 False### 6.2 生成器的最佳实践
 False
 False- **内存管理**: 对于大型数据集，优先使用生成器
 False- **无限序列**: 使用生成器表示无限序列
 False- **流式处理**: 使用生成器进行流式数据处理
 False- **组合使用**: 多个生成器可以组合使用，形成数据处理管道
 False- **异常处理**: 在生成器中适当处理异常
 False
 False### 6.3 迭代器的最佳实践
 False
 False- **理解迭代协议**: 了解 `__iter__` 和 `__next__` 方法的实现
 False- **避免修改**: 迭代过程中避免修改正在迭代的容器
 False- **使用内置函数**: 充分利用 `iter()`, `next()`, `enumerate()`, `zip()` 等内置函数
 False- **自定义迭代器**: 当需要特殊迭代行为时，考虑实现自定义迭代器
 False
 False## 7. 实际应用示例
 False
 False### 7.1 数据处理
 False
```python
 True# 处理日志文件
 Truedef parse_log(file_path):
 True """解析日志文件，提取关键信息"""
 True with open(file_path, 'r') as f:
 True for line in f:
 True if 'ERROR' in line:
 True parts = line.split()
 True timestamp = parts[0]
 True error_message = ' '.join(parts[3:])
 True yield {'timestamp': timestamp, 'error': error_message}
 True
 True# 使用生成器处理日志
 Truefor error in parse_log('app.log'):
 True print(f"[{error['timestamp']}] ERROR: {error['error']}")
 True```

 False### 7.2 数学计算
 False
```python
 True# 生成素数
 Truedef is_prime(n):
 True if n <= 1:
 True return False
 True for i in range(2, int(n**0.5) + 1):
 True if n % i == 0:
 True return False
 True return True
 True
 Truedef primes():
 True """生成无限素数序列"""
 True n = 2
 True while True:
 True if is_prime(n):
 True yield n
 True n += 1
 True
 True# 使用生成器获取前 10 个素数
 Trueprime_gen = primes()
 Truefor _ in range(10):
 True print(next(prime_gen), end=" ") # 输出: 2 3 5 7 11 13 17 19 23 29
 True```

 False### 7.3 网络爬虫
 False
```python
 Trueimport requests
 Truefrom bs4 import BeautifulSoup
 True
 Truedef crawl(url, max_depth=2):
 True """简单的网页爬虫"""
 True visited = set()
 True 
 True def _crawl(url, depth):
 True if depth > max_depth or url in visited:
 True return
 True 
 True visited.add(url)
 True yield url
 True 
 True try:
 True response = requests.get(url)
 True soup = BeautifulSoup(response.text, 'html.parser')
 True 
 True for link in soup.find_all('a', href=True):
 True next_url = link['href']
 True if next_url.startswith('http'):
 True yield from _crawl(next_url, depth + 1)
 True except Exception:
 True pass
 True 
 True yield from _crawl(url, 0)
 True
 True# 使用生成器爬取网页
 Truefor url in crawl('https://example.com', max_depth=1):
 True print(url)
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化生成器与惰性计算。
 False- 2026-04-05: 扩写内容，增加详细的推导式用法、迭代器实现、生成器高级特性、惰性求值应用和实际示例等内容。
 False