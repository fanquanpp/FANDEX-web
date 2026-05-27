# 运算符与表达式 (Operators & Expressions)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 算术、逻辑、位运算及成员/身份运算符详解。 | Detailed guide on Python operators, logic, bitwise, and membership.
 False
 False---
 False
 False## 目录
 False
 False1. [运算符分类](#运算符分类)
 False2. [海象运算符](#海象运算符)
 False3. [赋值运算符](#赋值运算符)
 False4. [运算符优先级](#运算符优先级)
 False5. [表达式](#表达式)
 False6. [最佳实践](#最佳实践)
 False
 False---
 False
 False## 1. 运算符分类 (Operator Categories)
 False
 False### 1.1 算术运算符 (Arithmetic)
 False
 False算术运算符用于执行基本的数学运算：
 False
 False| 运算符 | 描述 | 示例 (a=10, b=3) |
 False|---|---|---|
 False| `+` | 加法 | `a + b = 13` |
 False| `-` | 减法 | `a - b = 7` |
 False| `*` | 乘法 | `a * b = 30` |
 False| `/` | 除法 | `a / b = 3.333...` |
 False| `//` | 整除（向下取整） | `a // b = 3` |
 False| `%` | 取模（求余数） | `a % b = 1` |
 False| `**` | 幂运算 | `a ** b = 1000` |
 False
 False#### 1.1.1 算术运算符示例
 False
```python
 True# 基本算术运算
 Truea = 10
 Trueb = 3
 True
 Trueprint(f"a + b = {a + b}") # 13
 Trueprint(f"a - b = {a - b}") # 7
 Trueprint(f"a * b = {a * b}") # 30
 Trueprint(f"a / b = {a / b}") # 3.3333333333333335
 Trueprint(f"a // b = {a // b}") # 3
 Trueprint(f"a % b = {a % b}") # 1
 Trueprint(f"a ** b = {a ** b}") # 1000
 True
 True# 负数运算
 Truec = -5
 Trueprint(f"-c = {-c}") # 5
 True
 True# 浮点数运算
 Trued = 3.14
 Truee = 2.71
 Trueprint(f"d + e = {d + e}") # 5.85
 Trueprint(f"d * e = {d * e}") # 8.5094
 True
 True# 混合类型运算
 Truef = 5
 Trueg = 2.5
 Trueprint(f"f + g = {f + g}") # 7.5（结果为浮点数）
 True```

 False#### 1.1.2 算术运算符的特殊用法
 False
```python
 True# 字符串拼接
 Truefirst_name = "Alice"
 Truelast_name = "Smith"
 Truefull_name = first_name + " " + last_name
 Trueprint(full_name) # "Alice Smith"
 True
 True# 字符串重复
 Trueprint("Hello" * 3) # "HelloHelloHello"
 True
 True# 列表拼接
 Truelist1 = [1, 2, 3]
 Truelist2 = [4, 5, 6]
 Truecombined = list1 + list2
 Trueprint(combined) # [1, 2, 3, 4, 5, 6]
 True
 True# 列表重复
 Trueprint([0] * 5) # [0, 0, 0, 0, 0]
 True```

 False### 1.2 比较运算符 (Relational)
 False
 False比较运算符用于比较两个值的关系，返回布尔值 `True` 或 `False`：
 False
 False| 运算符 | 描述 | 示例 |
 False|---|---|---|
 False| `==` | 等于 | `5 == 5` → `True` |
 False| `!=` | 不等于 | `5 != 3` → `True` |
 False| `>` | 大于 | `5 > 3` → `True` |
 False| `<` | 小于 | `5 < 3` → `False` |
 False| `>=` | 大于等于 | `5 >= 5` → `True` |
 False| `<=` | 小于等于 | `5 <= 3` → `False` |
 False
 False#### 1.2.1 比较运算符示例
 False
```python
 True# 基本比较
 Truex = 10
 Truey = 5
 True
 Trueprint(f"x == y: {x == y}") # False
 Trueprint(f"x != y: {x != y}") # True
 Trueprint(f"x > y: {x > y}") # True
 Trueprint(f"x < y: {x < y}") # False
 Trueprint(f"x >= y: {x >= y}") # True
 Trueprint(f"x <= y: {x <= y}") # False
 True
 True# 字符串比较（按字典序）
 Trues1 = "apple"
 Trues2 = "banana"
 Trueprint(f"s1 < s2: {s1 < s2}") # True（"apple" 在字典序中小于 "banana"）
 True
 True# 列表比较（按元素顺序）
 Truelst1 = [1, 2, 3]
 Truelst2 = [1, 2, 4]
 Trueprint(f"lst1 < lst2: {lst1 < lst2}") # True（第三个元素 3 < 4）
 True
 True# 链式比较
 Trueage = 25
 Trueprint(f"18 <= age <= 65: {18 <= age <= 65}") # True
 True```

 False### 1.3 逻辑运算符 (Logical)
 False
 False逻辑运算符用于组合多个布尔表达式：
 False
 False| 运算符 | 描述 | 短路特性 | 示例 |
 False|---|---|---|---|
 False| `and` | 逻辑与 | 如果左侧为 `False`，右侧不执行 | `True and False` → `False` |
 False| `or` | 逻辑或 | 如果左侧为 `True`，右侧不执行 | `True or False` → `True` |
 False| `not` | 逻辑非 | 取反布尔值 | `not True` → `False` |
 False
 False#### 1.3.1 逻辑运算符示例
 False
```python
 True# 基本逻辑运算
 Truea = True
 Trueb = False
 True
 Trueprint(f"a and b: {a and b}") # False
 Trueprint(f"a or b: {a or b}") # True
 Trueprint(f"not a: {not a}") # False
 Trueprint(f"not b: {not b}") # True
 True
 True# 短路特性
 True# and: 左侧为 False 时，右侧不执行
 Truedef func():
 True print("Function executed")
 True return True
 True
 Trueprint(f"False and func(): {False and func()}") # 输出: False（func 未执行）
 Trueprint(f"True and func(): {True and func()}") # 输出: Function executed
 True # True
 True
 True# or: 左侧为 True 时，右侧不执行
 Trueprint(f"True or func(): {True or func()}") # 输出: True（func 未执行）
 Trueprint(f"False or func(): {False or func()}") # 输出: Function executed
 True # True
 True
 True# 实际应用
 Trueage = 20
 Trueis_student = True
 True
 Trueif age >= 18 and is_student:
 True print("Eligible for student discount")
 True
 True# 非布尔值的逻辑运算
 True# 0, None, "", [], {}, set() 等被视为 False
 Trueprint(f"0 and 5: {0 and 5}") # 0（False）
 Trueprint(f"5 and 10: {5 and 10}") # 10（最后一个真值）
 Trueprint(f"0 or 5: {0 or 5}") # 5（第一个真值）
 Trueprint(f"5 or 10: {5 or 10}") # 5（第一个真值）
 Trueprint(f"not 0: {not 0}") # True
 Trueprint(f"not 'hello': {not 'hello'}") # False
 True```

 False### 1.4 位运算符 (Bitwise)
 False
 False位运算符用于对整数的二进制位进行操作：
 False
 False| 运算符 | 描述 | 示例 (a=6 (0110), b=3 (0011)) |
 False|---|---|---|
 False| `&` | 按位与 | `a & b = 2 (0010)` |
 False| `|` | 按位或 | `a | b = 7 (0111)` |
 False| `^` | 按位异或 | `a ^ b = 5 (0101)` |
 False| `~` | 按位取反 | `~a = -7 (补码表示)` |
 False| `<<` | 左移 | `a << 1 = 12 (1100)` |
 False| `>>` | 右移 | `a >> 1 = 3 (0011)` |
 False
 False#### 1.4.1 位运算符示例
 False
```python
 True# 位运算符示例
 Truea = 6 # 二进制: 0110
 Trueb = 3 # 二进制: 0011
 True
 Trueprint(f"a = {a} (0b{bin(a)[2:]})")
 Trueprint(f"b = {b} (0b{bin(b)[2:]})")
 Trueprint(f"a & b = {a & b} (0b{bin(a & b)[2:]})") # 2 (0010)
 Trueprint(f"a | b = {a | b} (0b{bin(a | b)[2:]})") # 7 (0111)
 Trueprint(f"a ^ b = {a ^ b} (0b{bin(a ^ b)[2:]})") # 5 (0101)
 Trueprint(f"~a = {~a} (0b{bin(~a)[2:]})") # -7
 Trueprint(f"a << 1 = {a << 1} (0b{bin(a << 1)[2:]})") # 12 (1100)
 Trueprint(f"a >> 1 = {a >> 1} (0b{bin(a >> 1)[2:]})") # 3 (0011)
 True
 True# 应用：检查奇偶数
 Truenum = 7
 Trueif num & 1:
 True print(f"{num} 是奇数")
 Trueelse:
 True print(f"{num} 是偶数")
 True
 True# 应用：交换两个数（不使用临时变量）
 Truex = 10
 Truey = 20
 Trueprint(f"交换前: x={x}, y={y}")
 Truex ^= y
 Truey ^= x
 Truex ^= y
 Trueprint(f"交换后: x={x}, y={y}")
 True```

 False### 1.5 成员运算符 (Membership)
 False
 False成员运算符用于检查一个值是否存在于序列或集合中：
 False
 False| 运算符 | 描述 | 示例 |
 False|---|---|---|
 False| `in` | 检查值是否在序列中 | `3 in [1, 2, 3]` → `True` |
 False| `not in` | 检查值是否不在序列中 | `4 not in [1, 2, 3]` → `True` |
 False
 False#### 1.5.1 成员运算符示例
 False
```python
 True# 字符串
 Truetext = "Hello, World!"
 Trueprint(f"'H' in text: {'H' in text}") # True
 Trueprint(f"'z' in text: {'z' in text}") # False
 Trueprint(f"'World' in text: {'World' in text}") # True
 True
 True# 列表
 Truenumbers = [1, 2, 3, 4, 5]
 Trueprint(f"3 in numbers: {3 in numbers}") # True
 Trueprint(f"6 in numbers: {6 in numbers}") # False
 True
 True# 元组
 Truecoordinates = (10, 20, 30)
 Trueprint(f"10 in coordinates: {10 in coordinates}") # True
 True
 True# 集合
 Truefruits = {"apple", "banana", "orange"}
 Trueprint(f"'apple' in fruits: {'apple' in fruits}") # True
 True
 True# 字典（检查键）
 Trueperson = {"name": "Alice", "age": 30}
 Trueprint(f"'name' in person: {'name' in person}") # True
 Trueprint(f"'Alice' in person: {'Alice' in person}") # False（检查的是键）
 Trueprint(f"'Alice' in person.values(): {'Alice' in person.values()}") # True
 True```

 False### 1.6 身份运算符 (Identity)
 False
 False身份运算符用于比较两个对象的内存地址：
 False
 False| 运算符 | 描述 | 示例 |
 False|---|---|---|
 False| `is` | 检查两个对象是否为同一个对象 | `a is b` |
 False| `is not` | 检查两个对象是否不是同一个对象 | `a is not b` |
 False
 False**注意**: `is` 与 `==` 的区别：
 False
 False- `is` 比较的是对象的身份（内存地址）
 False- `==` 比较的是对象的值
 False
 False#### 1.6.1 身份运算符示例
 False
```python
 True# 身份运算符示例
 Truea = [1, 2, 3]
 Trueb = a # b 指向同一个对象
 Truec = [1, 2, 3] # c 是一个新对象
 True
 Trueprint(f"a is b: {a is b}") # True（指向同一个对象）
 Trueprint(f"a == b: {a == b}") # True（值相同）
 Trueprint(f"a is c: {a is c}") # False（不同对象）
 Trueprint(f"a == c: {a == c}") # True（值相同）
 True
 True# 小整数池
 Truex = 100
 Truey = 100
 Trueprint(f"x is y: {x is y}") # True（小整数被缓存）
 True
 Truex = 1000
 Truey = 1000
 Trueprint(f"x is y: {x is y}") # False（大整数不被缓存）
 True
 True# None 的比较
 Truevalue = None
 Trueprint(f"value is None: {value is None}") # True（推荐方式）
 Trueprint(f"value == None: {value == None}") # True（不推荐）
 True
 True# 布尔值
 Truep = True
 Trueq = True
 Trueprint(f"p is q: {p is q}") # True（布尔值被缓存）
 True```

 False## 2. 海象运算符 (Walrus Operator - `:=`)
 False
 FalsePython 3.8 引入的海象运算符允许在表达式内部进行赋值，简化代码结构。
 False
 False### 2.1 基本用法
 False
```python
 True# 基本用法
 Trueitems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 True
 True# 传统方式
 Truen = len(items)
 Trueif n > 10:
 True print(f"Total items: {n}")
 True
 True# 使用海象运算符
 Trueif (n := len(items)) > 10:
 True print(f"Total items: {n}")
 True
 True# 在循环中使用
 Truewhile (line := input("Enter a line (or 'quit' to exit): ")) != "quit":
 True print(f"You entered: {line}")
 True
 True# 在列表推导式中使用
 Truevalues = [1, 2, 3, 4, 5]
 Truesquared = [x*x for x in values if (x := x*2) > 5]
 Trueprint(squared) # [16, 25]（x 先被乘以 2，然后检查是否大于 5）
 True```

 False### 2.2 应用场景
 False
```python
 True# 读取文件时使用
 Truewith open("example.txt", "r") as f:
 True while (line := f.readline()):
 True print(line.strip())
 True
 True# 正则表达式匹配
 Trueimport re
 Truetext = "Contact: john@example.com"
 Trueif match := re.search(r"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})", text):
 True print(f"Found email: {match.group(1)}")
 True
 True# 复杂条件判断
 Trueuser = {"name": "Alice", "age": 30, "active": True}
 Trueif (name := user.get("name")) and (age := user.get("age")) > 18:
 True print(f"Welcome, {name}! You are {age} years old.")
 True```

 False## 3. 赋值运算符 (Assignment Operators)
 False
 False赋值运算符用于将值赋给变量，包括复合赋值运算符：
 False
 False| 运算符 | 描述 | 示例 |
 False|---|---|---|
 False| `=` | 简单赋值 | `x = 5` |
 False| `+=` | 加法赋值 | `x += 3` → `x = x + 3` |
 False| `-=` | 减法赋值 | `x -= 3` → `x = x - 3` |
 False| `*=` | 乘法赋值 | `x *= 3` → `x = x * 3` |
 False| `/=` | 除法赋值 | `x /= 3` → `x = x / 3` |
 False| `//=` | 整除赋值 | `x //= 3` → `x = x // 3` |
 False| `%=` | 取模赋值 | `x %= 3` → `x = x % 3` |
 False| `**=` | 幂运算赋值 | `x **= 3` → `x = x ** 3` |
 False| `&=` | 按位与赋值 | `x &= 3` → `x = x & 3` |
 False| `|=` | 按位或赋值 | `x |= 3` → `x = x | 3` |
 False| `^=` | 按位异或赋值 | `x ^= 3` → `x = x ^ 3` |
 False| `<<=` | 左移赋值 | `x <<= 1` → `x = x << 1` |
 False| `>>=` | 右移赋值 | `x >>= 1` → `x = x >> 1` |
 False
 False### 3.1 赋值运算符示例
 False
```python
 True# 赋值运算符示例
 Truex = 10
 Trueprint(f"初始 x = {x}")
 True
 Truex += 5 # x = x + 5
 Trueprint(f"x += 5 → x = {x}") # 15
 True
 Truex -= 3 # x = x - 3
 Trueprint(f"x -= 3 → x = {x}") # 12
 True
 Truex *= 2 # x = x * 2
 Trueprint(f"x *= 2 → x = {x}") # 24
 True
 Truex /= 4 # x = x / 4
 Trueprint(f"x /= 4 → x = {x}") # 6.0
 True
 Truex //= 2 # x = x // 2
 Trueprint(f"x //= 2 → x = {x}") # 3.0
 True
 Truex %= 2 # x = x % 2
 Trueprint(f"x %= 2 → x = {x}") # 1.0
 True
 Truex **= 3 # x = x ** 3
 Trueprint(f"x **= 3 → x = {x}") # 1.0
 True
 True# 位运算赋值
 Truey = 6 # 0110
 Trueprint(f"初始 y = {y} (0b{bin(y)[2:]})")
 True
 Truey <<= 1 # y = y << 1
 Trueprint(f"y <<= 1 → y = {y} (0b{bin(y)[2:]})") # 12 (1100)
 True
 Truey >>= 1 # y = y >> 1
 Trueprint(f"y >>= 1 → y = {y} (0b{bin(y)[2:]})") # 6 (0110)
 True
 Truey &= 3 # y = y & 3
 Trueprint(f"y &= 3 → y = {y} (0b{bin(y)[2:]})") # 2 (0010)
 True```

 False## 4. 运算符优先级 (Precedence)
 False
 False运算符优先级决定了表达式中运算的执行顺序，优先级高的运算符先执行：
 False
 False| 优先级 | 运算符 | 描述 |
 False|---|---|---|
 False| 1 | `()` | 括号（最高优先级） |
 False| 2 | `**` | 幂运算 |
 False| 3 | `~` | 按位取反 |
 False| 4 | `*`, `/`, `//`, `%` | 乘除、整除、取模 |
 False| 5 | `+`, `-` | 加减 |
 False| 6 | `<<`, `>>` | 位移运算 |
 False| 7 | `&` | 按位与 |
 False| 8 | `^` | 按位异或 |
 False| 9 | `|` | 按位或 |
 False| 10 | `==`, `!=`, `>`, `<`, `>=`, `<=`, `is`, `is not`, `in`, `not in` | 比较运算符 |
 False| 11 | `not` | 逻辑非 |
 False| 12 | `and` | 逻辑与 |
 False| 13 | `or` | 逻辑或 |
 False| 14 | `=` | 赋值运算符（最低优先级） |
 False
 False### 4.1 优先级示例
 False
```python
 True# 优先级示例
 True# 1. 括号优先
 Trueprint((2 + 3) * 4) # 20（先计算括号内的加法）
 True
 True# 2. 幂运算优先
 Trueprint(2 ** 3 * 4) # 32（先计算 2**3 = 8，再乘以 4）
 Trueprint(2 ** (3 * 4)) # 4096（括号改变优先级）
 True
 True# 3. 乘除优先于加减
 Trueprint(10 + 5 * 2) # 20（先计算 5*2 = 10，再加 10）
 Trueprint((10 + 5) * 2) # 30（括号改变优先级）
 True
 True# 4. 逻辑运算符优先级
 Trueprint(True or False and False) # True（and 优先于 or）
 Trueprint((True or False) and False) # False（括号改变优先级）
 True
 True# 5. 比较运算符与逻辑运算符
 Trueprint(5 > 3 and 2 < 4) # True（比较运算符优先于 and）
 Trueprint(5 > (3 and 2) < 4) # True（括号改变优先级）
 True```

 False## 5. 表达式 (Expressions)
 False
 False表达式是由变量、常量、运算符和函数调用组成的代码片段，它会被计算并返回一个值。
 False
 False### 5.1 基本表达式
 False
```python
 True# 算术表达式
 Trueresult = 10 + 5 * 2 # 20
 True
 True# 比较表达式
 Trueis_greater = 10 > 5 # True
 True
 True# 逻辑表达式
 Trueis_valid = True and not False # True
 True
 True# 成员表达式
 Trueis_present = 3 in [1, 2, 3] # True
 True
 True# 身份表达式
 Trueis_same = (a is b) # 取决于 a 和 b 是否指向同一对象
 True```

 False### 5.2 复杂表达式
 False
```python
 True# 复杂表达式
 Truea = 10
 Trueb = 5
 Truec = 3
 True
 True# 混合运算符
 Trueresult = (a + b) * c / 2 # 22.5
 True
 True# 条件表达式（三元运算符）
 Truestatus = "Adult" if a >= 18 else "Minor"
 True
 True# 嵌套表达式
 Trueresult = ((a + b) * c) ** 2 # 225
 True
 True# 函数调用表达式
 Trueresult = len("Hello") + sum([1, 2, 3]) # 5 + 6 = 11
 True```

 False### 5.3 表达式求值
 False
 FalsePython 表达式的求值遵循运算符优先级和结合性规则：
 False
 False- **结合性**: 大多数运算符从左到右结合，除了幂运算符（从右到左）
 False
```python
 True# 结合性示例
 Trueprint(10 - 5 - 3) # 2（从左到右：(10-5)-3）
 Trueprint(2 ** 3 ** 2) # 512（从右到左：2**(3**2)）
 Trueprint(10 / 5 * 2) # 4.0（从左到右：(10/5)*2）
 True```

 False## 6. 最佳实践
 False
 False### 6.1 运算符使用
 False
 False- **括号使用**: 当表达式复杂时，使用括号提高可读性，即使括号不是必需的
 False- **短路特性**: 利用 `and` 和 `or` 的短路特性优化代码
 False- **身份比较**: 对于 `None`、`True`、`False` 等单例对象，使用 `is` 进行比较
 False- **成员检查**: 使用 `in` 运算符检查成员关系，它比手动遍历更高效
 False
 False### 6.2 表达式编写
 False
 False- **可读性**: 保持表达式简洁明了，避免过于复杂的单行表达式
 False- **格式化**: 对于长表达式，适当换行和缩进以提高可读性
 False- **优先级**: 了解运算符优先级，避免因优先级问题导致的错误
 False- **类型一致性**: 确保表达式中的操作数类型兼容
 False
 False### 6.3 性能考虑
 False
 False- **短路评估**: 利用逻辑运算符的短路特性减少不必要的计算
 False- **位运算**: 在处理位级操作时，位运算符比算术运算符更高效
 False- **成员检查**: 在大型集合中，`in` 运算符对 `set` 和 `dict` 的检查比 `list` 和 `tuple` 更快
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充海象运算符与身份/成员运算细节。
 False- 2026-04-05: 扩写内容，增加详细的运算符示例、海象运算符应用、赋值运算符、优先级示例和表达式最佳实践等内容。
 False