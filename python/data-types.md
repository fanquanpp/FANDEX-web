# 基础数据类型 (Basic Data Types)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: Python 核心内置类型：数字、字符串、布尔及 None。 | Core built-in types: Numbers, Strings, Booleans, and None.
 False
 False---
 False
 False## 目录
 False
 False1. [数字](#数字)
 False2. [字符串](#字符串)
 False3. [布尔](#布尔)
 False4. [空值](#空值)
 False5. [类型转换](#类型转换)
 False6. [类型检查](#类型检查)
 False7. [最佳实践](#最佳实践)
 False
 False---
 False
 False## 1. 数字 (Numbers)
 False
 FalsePython 3 提供了三种数值类型：
 False
 False- **`int` (整型)**: 任意精度整数，在 Python 3 中不再有 `long` 类型。
 False- **`float` (浮点型)**: 双精度浮点数（64位）。
 False- **`complex` (复数)**: 形如 `3 + 4j`，其中 `j` 表示虚数单位。
 False
 False### 1.1 整数类型
 False
 False#### 1.1.1 整数表示
 False
```python
 True# 十进制整数
 Truex = 123
 True
 True# 二进制整数（以 0b 或 0B 开头）
 Truey = 0b1010 # 10
 True
 True# 八进制整数（以 0o 或 0O 开头）
 Truez = 0o123 # 83
 True
 True# 十六进制整数（以 0x 或 0X 开头）
 Truep = 0x1A # 26
 True```

 False#### 1.1.2 整数操作
 False
```python
 True# 基本算术运算
 Trueaddition = 10 + 5 # 15
 Truesubtraction = 10 - 5 # 5
 Truemultiplication = 10 * 5 # 50
 Truedivision = 10 / 5 # 2.0（总是返回浮点数）
 Truefloor_division = 10 // 3 # 3（整除，向下取整）
 Truemodulo = 10 % 3 # 1（取模/余数）
 Truepower = 2 ** 3 # 8（幂运算）
 True
 True# 复合赋值运算符
 Truex = 10
 Truex += 5 # x = x + 5 → 15
 Truex -= 3 # x = x - 3 → 12
 Truex *= 2 # x = x * 2 → 24
 Truex /= 4 # x = x / 4 → 6.0
 Truex //= 2 # x = x // 2 → 3.0（注意：结果是浮点数）
 True```

 False### 1.2 浮点数类型
 False
 False#### 1.2.1 浮点数表示
 False
```python
 True# 普通浮点数
 Truepi = 3.14159
 True
 True# 科学记数法
 Trueavogadro = 6.022e23 # 6.022 × 10²³
 Truesmall = 1.23e-4 # 1.23 × 10⁻⁴
 True```

 False#### 1.2.2 浮点数操作
 False
```python
 True# 基本算术运算
 Truef1 = 3.14 + 2.71 # 5.85
 Truef2 = 10.0 - 3.5 # 6.5
 Truef3 = 2.5 * 4.0 # 10.0
 Truef4 = 10.0 / 3.0 # 3.3333333333333335
 True
 True# 浮点数精度问题
 True0.1 + 0.2 # 0.30000000000000004（注意：浮点数精度限制）
 True```

 False### 1.3 复数类型
 False
```python
 True# 复数定义
 Truec1 = 3 + 4j
 Truec2 = complex(2, 5) # 2 + 5j
 True
 True# 复数运算
 Truec3 = c1 + c2 # 5 + 9j
 Truec4 = c1 * c2 # (3*2 - 4*5) + (3*5 + 4*2)j → -14 + 23j
 True
 True# 复数属性
 Trueprint(c1.real) # 3.0（实部）
 Trueprint(c1.imag) # 4.0（虚部）
 Trueprint(c1.conjugate()) # 3 - 4j（共轭复数）
 True```

 False### 1.4 数学函数
 False
 FalsePython 提供了 `math` 模块来支持更复杂的数学运算：
 False
```python
 Trueimport math
 True
 True# 基本数学函数
 Trueprint(math.pi) # π ≈ 3.141592653589793
 Trueprint(math.e) # e ≈ 2.718281828459045
 True
 True# 三角函数
 Trueprint(math.sin(math.pi/2)) # sin(π/2) = 1.0
 Trueprint(math.cos(math.pi)) # cos(π) = -1.0
 True
 True# 指数和对数
 Trueprint(math.exp(1)) # e¹ ≈ 2.71828
 Trueprint(math.log(math.e)) # ln(e) = 1.0
 Trueprint(math.log10(100)) # log₁₀(100) = 2.0
 True
 True# 取整函数
 Trueprint(math.floor(3.9)) # 3（向下取整）
 Trueprint(math.ceil(3.1)) # 4（向上取整）
 Trueprint(round(3.5)) # 4（四舍五入）
 True
 True# 其他函数
 Trueprint(math.sqrt(16)) # 4.0（平方根）
 Trueprint(math.factorial(5)) # 120（阶乘）
 True```

 False## 2. 字符串 (Strings - `str`)
 False
 False字符串是不可变的序列类型，用于存储 Unicode 字符。
 False
 False### 2.1 字符串定义
 False
```python
 True# 单引号字符串
 Trues1 = 'Hello, World!'
 True
 True# 双引号字符串
 Trues2 = "Hello, World!"
 True
 True# 三引号字符串（支持多行）
 Trues3 = '''Hello,
 TrueWorld!'''
 True
 True# 原始字符串（不转义）
 Trues4 = r'C:\\path\\to\\file' # 输出: C:\path\to\file
 True
 True# 字节字符串（Python 3）
 Trues5 = b'Hello' # 字节字符串，类型为 bytes
 True```

 False### 2.2 字符串操作
 False
 False#### 2.2.1 字符串拼接
 False
```python
 True# 使用 + 运算符
 Truefirst_name = "Alice"
 Truelast_name = "Smith"
 Truefull_name = first_name + " " + last_name # "Alice Smith"
 True
 True# 使用 * 运算符重复
 Trueprint("Hello" * 3) # "HelloHelloHello"
 True
 True# 使用 f-string（Python 3.6+）
 Trueage = 30
 Truemessage = f"My name is {full_name} and I am {age} years old."
 True```

 False#### 2.2.2 字符串切片
 False
 False字符串切片使用 `s[start:stop:step]` 语法：
 False
```python
 Trues = "Hello, World!"
 True
 True# 获取单个字符
 Trueprint(s[0]) # 'H'
 Trueprint(s[-1]) # '!'
 True
 True# 切片操作
 Trueprint(s[0:5]) # 'Hello'（从索引 0 到 4）
 Trueprint(s[7:]) # 'World!'（从索引 7 到末尾）
 Trueprint(s[:5]) # 'Hello'（从开头到索引 4）
 Trueprint(s[::2]) # 'Hlo ol!'（步长为 2）
 Trueprint(s[::-1]) # '!dlroW ,olleH'（反转字符串）
 True```

 False#### 2.2.3 字符串方法
 False
 FalsePython 提供了丰富的字符串方法：
 False
```python
 Trues = "Hello, World!"
 True
 True# 大小写转换
 Trueprint(s.upper()) # 'HELLO, WORLD!'
 Trueprint(s.lower()) # 'hello, world!'
 Trueprint(s.title()) # 'Hello, World!'
 Trueprint(s.capitalize()) # 'Hello, world!'
 True
 True# 查找和替换
 Trueprint(s.find("World")) # 7（首次出现的索引）
 Trueprint(s.replace("World", "Python")) # 'Hello, Python!'
 True
 True# 分割和连接
 Trueprint(s.split(", ")) # ['Hello', 'World!']
 Trueprint(", ".join(["Hello", "Python"])) # 'Hello, Python'
 True
 True# 去除空白
 Trueprint(" Hello ".strip()) # 'Hello'
 Trueprint(" Hello ".lstrip()) # 'Hello '
 Trueprint(" Hello ".rstrip()) # ' Hello'
 True
 True# 检查方法
 Trueprint(s.startswith("Hello")) # True
 Trueprint(s.endswith("!")) # True
 Trueprint(s.isalpha()) # False（包含非字母字符）
 Trueprint("123".isdigit()) # True
 Trueprint("Hello123".isalnum()) # True
 True```

 False### 2.3 字符串格式化
 False
 FalsePython 提供了多种字符串格式化方法：
 False
 False#### 2.3.1 f-string（推荐，Python 3.6+）
 False
```python
 Truename = "Alice"
 Trueage = 30
 True
 True# 基本用法
 Trueprint(f"My name is {name} and I am {age} years old.")
 True
 True# 表达式
 Trueprint(f"Next year I will be {age + 1} years old.")
 True
 True# 格式化选项
 Truepi = 3.14159
 Trueprint(f"Pi is approximately {pi:.2f}") # 3.14
 Trueprint(f"Age: {age:03d}") # 030
 Trueprint(f"Name: {name:>10}") # ' Alice'
 Trueprint(f"Name: {name:<10}") # 'Alice '
 Trueprint(f"Name: {name:^10}") # ' Alice '
 True```

 False#### 2.3.2 format() 方法
 False
```python
 True# 基本用法
 Trueprint("My name is {} and I am {} years old.".format(name, age))
 True
 True# 位置参数
 Trueprint("{0} {1}".format("Hello", "World")) # 'Hello World'
 Trueprint("{1} {0}".format("Hello", "World")) # 'World Hello'
 True
 True# 关键字参数
 Trueprint("My name is {name} and I am {age} years old.".format(name="Bob", age=25))
 True
 True# 格式化选项
 Trueprint("Pi is approximately {:.2f}".format(pi)) # 3.14
 True```

 False#### 2.3.3 % 运算符
 False
```python
 True# 基本用法
 Trueprint("My name is %s and I am %d years old." % (name, age))
 True
 True# 格式化选项
 Trueprint("Pi is approximately %.2f" % pi) # 3.14
 Trueprint("Age: %03d" % age) # 030
 Trueprint("Name: %10s" % name) # ' Alice'
 True```

 False## 3. 布尔 (Booleans - `bool`)
 False
 False布尔类型只有两个值：`True` 和 `False`。
 False
 False### 3.1 布尔运算
 False
```python
 True# 逻辑运算符
 Trueprint(True and False) # False
 Trueprint(True or False) # True
 Trueprint(not True) # False
 True
 True# 比较运算符
 Trueprint(5 > 3) # True
 Trueprint(5 == 3) # False
 Trueprint(5 != 3) # True
 Trueprint(5 >= 3) # True
 Trueprint(5 <= 3) # False
 True```

 False### 3.2 布尔上下文
 False
 False在 Python 中，所有对象都可以在布尔上下文中使用（如 `if` 语句）：
 False
```python
 True# 布尔上下文中的评估
 Trueif "Hello":
 True print("非空字符串为真")
 True
 Trueif [1, 2, 3]:
 True print("非空列表为真")
 True
 Trueif 0:
 True print("0 为假")
 Trueelse:
 True print("0 为假")
 True
 Trueif None:
 True print("None 为假")
 Trueelse:
 True print("None 为假")
 True```

 False### 3.3 Falsy 值
 False
 False以下值在布尔上下文中被视为 `False`：
 False
 False- `None`
 False- `False`
 False- 数字：`0`, `0.0`, `0j`（复数）
 False- 序列和集合：`""`（空字符串）, `[]`（空列表）, `()`（空元组）, `{}`（空字典）, `set()`（空集合）
 False
 False所有其他值都被视为 `True`。
 False
 False## 4. 空值 (NoneType - `None`)
 False
 False`None` 是 Python 中的特殊值，表示「无」或「空」。
 False
 False### 4.1 基本用法
 False
```python
 True# 赋值
 Truex = None
 Trueprint(x) # None
 True
 True# 函数默认参数
 Truedef greet(name=None):
 True if name is None:
 True print("Hello, Guest!")
 True else:
 True print(f"Hello, {name}!")
 True
 Truegreet() # Hello, Guest!
 Truegreet("Alice") # Hello, Alice!
 True
 True# 函数返回值（如果没有显式返回值）
 Truedef no_return():
 True pass
 True
 Trueprint(no_return()) # None
 True```

 False### 4.2 注意事项
 False
```python
 True# None 不等于 0、False 或空字符串
 Trueprint(None == 0) # False
 Trueprint(None == False) # False
 Trueprint(None == "") # False
 True
 True# 使用 is 运算符检查 None（推荐）
 Truex = None
 Trueprint(x is None) # True
 Trueprint(x is not None) # False
 True```

 False## 5. 类型转换 (Type Casting)
 False
 FalsePython 提供了内置函数来进行类型转换：
 False
 False### 5.1 基本类型转换
 False
```python
 True# 转换为整数
 Trueprint(int("123")) # 123
 Trueprint(int(3.9)) # 3（向下取整）
 Trueprint(int(True)) # 1
 Trueprint(int(False)) # 0
 True
 True# 转换为浮点数
 Trueprint(float("3.14")) # 3.14
 Trueprint(float(10)) # 10.0
 Trueprint(float(True)) # 1.0
 True
 True# 转换为字符串
 Trueprint(str(123)) # "123"
 Trueprint(str(3.14)) # "3.14"
 Trueprint(str(True)) # "True"
 Trueprint(str(None)) # "None"
 True
 True# 转换为布尔值
 Trueprint(bool(1)) # True
 Trueprint(bool(0)) # False
 Trueprint(bool("Hello")) # True
 Trueprint(bool("")) # False
 Trueprint(bool([])) # False
 Trueprint(bool(None)) # False
 True```

 False### 5.2 高级类型转换
 False
```python
 True# 转换为列表
 Trueprint(list("Hello")) # ['H', 'e', 'l', 'l', 'o']
 Trueprint(list((1, 2, 3))) # [1, 2, 3]
 True
 True# 转换为元组
 Trueprint(tuple([1, 2, 3])) # (1, 2, 3)
 Trueprint(tuple("Hello")) # ('H', 'e', 'l', 'l', 'o')
 True
 True# 转换为集合
 Trueprint(set([1, 2, 3, 2, 1])) # {1, 2, 3}（去重）
 True
 True# 转换为字典
 Trueprint(dict([("a", 1), ("b", 2)])) # {'a': 1, 'b': 2}
 True```

 False## 6. 类型检查
 False
 False使用 `type()` 函数检查对象的类型：
 False
```python
 Trueprint(type(42)) # <class 'int'>
 Trueprint(type(3.14)) # <class 'float'>
 Trueprint(type("Hello")) # <class 'str'>
 Trueprint(type(True)) # <class 'bool'>
 Trueprint(type(None)) # <class 'NoneType'>
 Trueprint(type([1, 2, 3])) # <class 'list'>
 Trueprint(type((1, 2, 3))) # <class 'tuple'>
 Trueprint(type({"a": 1})) # <class 'dict'>
 True
 True# 使用 isinstance() 检查类型
 Trueprint(isinstance(42, int)) # True
 Trueprint(isinstance(3.14, float)) # True
 Trueprint(isinstance("Hello", str)) # True
 Trueprint(isinstance([1, 2, 3], list)) # True
 True
 True# 检查是否为多种类型之一
 Trueprint(isinstance(42, (int, float))) # True
 True```

 False## 7. 最佳实践
 False
 False### 7.1 数字类型
 False
 False- **整数**：使用 `int` 类型存储整数，Python 会自动处理大整数。
 False- **浮点数**：注意浮点数精度问题，如需精确计算，考虑使用 `decimal` 模块。
 False- **复数**：仅在需要时使用复数类型。
 False
 False### 7.2 字符串
 False
 False- **定义**：优先使用单引号或双引号，多行字符串使用三引号。
 False- **格式化**：优先使用 f-string（Python 3.6+），它更简洁易读。
 False- **操作**：字符串是不可变的，频繁修改字符串会创建新对象，考虑使用 `list` 或 `io.StringIO`。
 False
 False### 7.3 布尔和 None
 False
 False- **布尔**：直接使用布尔值，避免使用 `== True` 或 `== False`。
 False- **None**：使用 `is None` 和 `is not None` 检查 None 值，而不是 `== None`。
 False
 False### 7.4 类型转换
 False
 False- **安全转换**：在转换前检查值是否有效，避免运行时错误。
 False- **显式转换**：当类型不明确时，使用显式类型转换提高代码可读性。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 细化 Python 基本数据类型及常用操作。
 False- 2026-04-05: 扩写内容，增加详细的数字类型操作、字符串方法、布尔运算、None 使用场景、类型转换和最佳实践等内容。
 False