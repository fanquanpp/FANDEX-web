# 变量与常量 (Variables & Constants)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 变量定义、动态类型、作用域、生命周期及常量约定。 | Definitions, dynamic typing, scope, lifecycle, and constants.
 False
 False---
 False
 False## 目录
 False
 False1. [变量](#变量)
 False2. [常量](#常量)
 False3. [变量交换](#变量交换)
 False4. [变量命名规范](#变量命名规范)
 False5. [最佳实践](#最佳实践)
 False
 False---
 False
 False## 1. 变量 (Variables)
 False
 False变量是内存中存储数据的标签，用于引用和操作数据。
 False
 False### 1.1 定义与赋值 (Assignment)
 False
 FalsePython 是动态类型语言，变量不需要预先声明类型，可以直接赋值。
 False
 False#### 1.1.1 基本赋值
 False
```python
 True# 基本赋值
 Truex = 10
 Truename = "Alice"
 Trueis_valid = True
 True
 True# 改变变量类型（动态类型）
 Truex = "Hello" # 变量 x 现在指向字符串
 Trueprint(x) # 输出: Hello
 True
 True# 链式赋值
 Truea = b = c = 100
 Trueprint(a, b, c) # 输出: 100 100 100
 True
 True# 多重赋值（解包）
 Truex, y = 1, 2
 Trueprint(x, y) # 输出: 1 2
 True
 True# 解包列表或元组
 Truevalues = [3, 4, 5]
 Truex, y, z = values
 Trueprint(x, y, z) # 输出: 3 4 5
 True
 True# 解包时使用 * 收集剩余值
 Truefirst, *rest = [1, 2, 3, 4, 5]
 Trueprint(first) # 输出: 1
 Trueprint(rest) # 输出: [2, 3, 4, 5]
 True
 True# 解包字典
 Trueperson = {"name": "Bob", "age": 30}
 Truename, age = person.items()
 Trueprint(name, age) # 输出: ('name', 'Bob') ('age', 30)
 True
 True# 同时解包键值对
 Truefor key, value in person.items():
 True print(f"{key}: {value}")
 True```

 False#### 1.1.2 内存地址与引用
 False
```python
 True# 查看变量的内存地址
 Truex = 10
 Trueprint(id(x)) # 输出: 内存地址（如 140703324934240）
 True
 True# 多个变量指向同一个对象
 Truea = 42
 Trueb = a
 Trueprint(id(a) == id(b)) # 输出: True
 True
 True# 不可变对象的行为
 Truex = 10
 Truey = x
 Truex = 20 # 创建新对象
 Trueprint(y) # 输出: 10（y 仍然指向原来的对象）
 True
 True# 可变对象的行为
 Truelst1 = [1, 2, 3]
 Truelst2 = lst1
 Truelst1.append(4) # 修改原对象
 Trueprint(lst2) # 输出: [1, 2, 3, 4]（lst2 指向同一个对象）
 True```

 False### 1.2 变量的作用域 (Scope - LEGB)
 False
 FalsePython 中变量的作用域遵循 LEGB 规则，即变量查找顺序为：
 False
 False1. **Local (L)**: 局部作用域，在函数内部定义的变量
 False2. **Enclosing (E)**: 嵌套作用域，在嵌套函数的外层函数中定义的变量
 False3. **Global (G)**: 全局作用域，在模块级别定义的变量
 False4. **Built-in (B)**: 内置作用域，Python 内置的变量和函数
 False
 False#### 1.2.1 局部作用域
 False
```python
 Truedef my_function():
 True # 局部变量
 True local_var = "local"
 True print(local_var) # 输出: local
 True
 Truemy_function()
 True# print(local_var) # 错误: NameError: name 'local_var' is not defined
 True```

 False#### 1.2.2 全局作用域
 False
```python
 True# 全局变量
 Trueglobal_var = "global"
 True
 Truedef my_function():
 True # 访问全局变量
 True print(global_var) # 输出: global
 True
 Truemy_function()
 Trueprint(global_var) # 输出: global
 True```

 False#### 1.2.3 修改全局变量
 False
```python
 True# 全局变量
 Truecount = 0
 True
 Truedef increment():
 True # 声明要修改全局变量
 True global count
 True count += 1
 True print(count) # 输出: 1
 True
 Trueincrement()
 Trueprint(count) # 输出: 1
 True```

 False#### 1.2.4 嵌套作用域
 False
```python
 Truedef outer_function():
 True # 嵌套作用域变量
 True outer_var = "outer"
 True 
 True def inner_function():
 True # 访问嵌套作用域变量
 True print(outer_var) # 输出: outer
 True 
 True inner_function()
 True
 Trueouter_function()
 True# print(outer_var) # 错误: NameError: name 'outer_var' is not defined
 True```

 False#### 1.2.5 修改嵌套作用域变量
 False
```python
 Truedef outer_function():
 True count = 0
 True 
 True def inner_function():
 True # 声明要修改嵌套作用域变量
 True nonlocal count
 True count += 1
 True print(count) # 输出: 1
 True 
 True inner_function()
 True print(count) # 输出: 1
 True
 Trueouter_function()
 True```

 False#### 1.2.6 内置作用域
 False
```python
 True# 使用内置函数
 Trueprint(len([1, 2, 3])) # 输出: 3
 Trueprint(max(1, 2, 3)) # 输出: 3
 True
 True# 查看内置作用域
 Trueaimport builtins
 Trueprint(dir(builtins)) # 列出所有内置变量和函数
 True```

 False### 1.3 变量的生命周期
 False
 False变量的生命周期指变量从创建到被回收的过程：
 False
 False1. **创建**: 当变量被赋值时创建
 False2. **使用**: 变量被引用和操作
 False3. **销毁**: 当变量不再被引用时，由垃圾回收器回收
 False
 False#### 1.3.1 引用计数
 False
 FalsePython 使用引用计数来跟踪对象的引用情况：
 False
```python
 Trueimport sys
 True
 Truex = [1, 2, 3]
 Trueprint(sys.getrefcount(x)) # 输出: 2（x 本身是一个引用，getrefcount 又创建了一个临时引用）
 True
 Truey = x
 Trueprint(sys.getrefcount(x)) # 输出: 3（y 又增加了一个引用）
 True
 Truey = None
 Trueprint(sys.getrefcount(x)) # 输出: 2（y 不再引用 x）
 True
 Truex = None
 True# 此时引用计数为 0，对象可能被回收
 True```

 False#### 1.3.2 垃圾回收
 False
 FalsePython 的垃圾回收机制包括：
 False
 False1. **引用计数**: 当引用计数为 0 时，对象被立即回收
 False2. **循环引用收集**: 处理循环引用的情况
 False
```python
 True# 循环引用示例
 Trueclass Node:
 True def __init__(self, value):
 True self.value = value
 True self.next = None
 True
 True# 创建循环引用
 Truenode1 = Node(1)
 Truenode2 = Node(2)
 Truenode1.next = node2
 Truenode2.next = node1
 True
 True# 移除外部引用
 Truenode1 = None
 Truenode2 = None
 True# 此时两个节点形成循环引用，但会被垃圾回收器检测并回收
 True```

 False## 2. 常量 (Constants)
 False
 FalsePython 中没有内置的常量机制，但可以通过约定和技术手段实现。
 False
 False### 2.1 常量命名约定
 False
 False按照 Python 社区的约定，使用全大写字母和下划线来命名常量：
 False
```python
 True# 常量命名约定
 TrueMAX_CONNECTIONS = 100
 TrueDEFAULT_TIMEOUT = 30
 TruePI = 3.14159265359
 True
 True# 注意：这只是约定，仍然可以修改
 TrueMAX_CONNECTIONS = 200 # 不会报错，但不推荐
 True```

 False### 2.2 实现真正的常量
 False
 False可以通过类或模块级别的实现来创建真正的常量：
 False
 False#### 2.2.1 使用类实现常量
 False
```python
 Trueclass Constants:
 True """常量类"""
 True MAX_CONNECTIONS = 100
 True DEFAULT_TIMEOUT = 30
 True PI = 3.14159265359
 True 
 True # 禁止修改
 True def __setattr__(self, name, value):
 True raise AttributeError("Constants cannot be modified")
 True
 True# 使用
 Trueconst = Constants()
 Trueprint(const.PI) # 输出: 3.14159265359
 True# const.PI = 3.14 # 错误: AttributeError: Constants cannot be modified
 True```

 False#### 2.2.2 使用模块级实现
 False
```python
 True# const.py
 Trueclass _Const:
 True class ConstError(TypeError):
 True """常量错误"""
 True pass
 True 
 True def __setattr__(self, name, value):
 True if name in self.__dict__:
 True raise self.ConstError(f"Can't rebind const ({name})")
 True self.__dict__[name] = value
 True
 Trueimport sys
 Truesys.modules[__name__] = _Const()
 True
 True# 使用
 True# 在其他文件中
 Trueimport const
 Trueconst.MAX_CONNECTIONS = 100
 Trueconst.DEFAULT_TIMEOUT = 30
 True
 Trueprint(const.MAX_CONNECTIONS) # 输出: 100
 True# const.MAX_CONNECTIONS = 200 # 错误: ConstError: Can't rebind const (MAX_CONNECTIONS)
 True```

 False### 2.3 枚举常量
 False
 False对于一组相关的常量，可以使用 `enum` 模块：
 False
```python
 Truefrom enum import Enum, auto
 True
 Trueclass Color(Enum):
 True RED = 1
 True GREEN = 2
 True BLUE = 3
 True
 Trueclass Direction(Enum):
 True NORTH = auto()
 True SOUTH = auto()
 True EAST = auto()
 True WEST = auto()
 True
 True# 使用
 Trueprint(Color.RED) # 输出: Color.RED
 Trueprint(Color.RED.value) # 输出: 1
 Trueprint(Direction.NORTH.value) # 输出: 1
 True
 True# 遍历枚举
 Truefor color in Color:
 True print(color.name, color.value)
 True```

 False## 3. 变量交换 (Swapping)
 False
 FalsePython 提供了简洁的变量交换方式：
 False
 False### 3.1 基本交换
 False
```python
 True# Pythonic 方式（推荐）
 Truea, b = 1, 2
 Truea, b = b, a
 Trueprint(a, b) # 输出: 2 1
 True
 True# 传统方式（不推荐）
 Truetemp = a
 Truea = b
 Trueb = temp
 Trueprint(a, b) # 输出: 2 1
 True```

 False### 3.2 多变量交换
 False
```python
 True# 三个变量交换
 Truex, y, z = 1, 2, 3
 Truex, y, z = z, x, y
 Trueprint(x, y, z) # 输出: 3 1 2
 True
 True# 列表元素交换
 Truelst = [1, 2, 3, 4]
 Truelst[0], lst[1] = lst[1], lst[0]
 Trueprint(lst) # 输出: [2, 1, 3, 4]
 True```

 False### 3.3 高级交换技巧
 False
```python
 True# 使用算术运算交换（不推荐，仅作了解）
 Truea, b = 10, 20
 Truea = a + b # a = 30
 Trueb = a - b # b = 10
 Truea = a - b # a = 20
 Trueprint(a, b) # 输出: 20 10
 True
 True# 使用位运算交换（不推荐，仅作了解）
 Truea, b = 10, 20
 Truea = a ^ b
 Trueb = a ^ b
 Truea = a ^ b
 Trueprint(a, b) # 输出: 20 10
 True```

 False## 4. 变量命名规范
 False
 FalsePython 中的变量命名应遵循以下规范：
 False
 False### 4.1 命名规则
 False
 False- **只能包含字母、数字和下划线**
 False- **不能以数字开头**
 False- **区分大小写**
 False- **不能使用 Python 关键字**（如 `def`, `class`, `if` 等）
 False
 False### 4.2 命名约定
 False
 False- **变量和函数**: 使用小写字母和下划线（snake_case）
 False- **常量**: 使用全大写字母和下划线（UPPER_CASE）
 False- **类名**: 使用驼峰命名法（CamelCase）
 False- **模块名**: 使用小写字母，尽量简短
 False- **包名**: 使用小写字母，尽量简短
 False
```python
 True# 变量和函数
 Trueuser_name = "Alice"
 Truedef calculate_total():
 True pass
 True
 True# 常量
 TrueMAX_VALUE = 100
 True
 True# 类名
 Trueclass UserProfile:
 True pass
 True
 True# 模块名: user_utils.py
 True# 包名: utils
 True```

 False## 5. 最佳实践
 False
 False### 5.1 变量使用
 False
 False- **有意义的变量名**: 使用描述性的变量名，避免使用单字母变量（除非是循环计数器等简单场景）
 False- **避免全局变量**: 尽量减少全局变量的使用，优先使用函数参数和返回值
 False- **合理的作用域**: 将变量定义在最小必要的作用域内
 False- **避免变量遮蔽**: 不要在嵌套作用域中使用与外部作用域相同的变量名
 False
 False### 5.2 常量使用
 False
 False- **使用命名约定**: 常量使用全大写字母和下划线
 False- **集中管理**: 将相关常量集中在一个模块或类中
 False- **使用枚举**: 对于一组相关的常量，使用 `enum` 模块
 False- **文档化**: 为常量添加注释，说明其用途和取值范围
 False
 False### 5.3 性能考虑
 False
 False- **避免频繁创建大对象**: 对于频繁使用的大对象，考虑缓存
 False- **注意可变对象**: 理解可变对象和不可变对象的行为差异
 False- **合理使用引用**: 避免不必要的引用，以减少内存使用
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分变量作用域 LEGB 规则。
 False- 2026-04-05: 扩写内容，增加详细的变量赋值方式、作用域示例、生命周期、常量实现、变量交换技巧和命名规范等内容。
 False