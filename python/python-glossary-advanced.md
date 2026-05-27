# Python 专有名词查阅表 - 高级特性 | Python

> @Version: v4.0.0
> @Module: python
> @Author: fanquanpp
> @Category: Python Advanced
> @Description: Python 高级特性名词注释查阅表（函数、面向对象、异常处理、进阶特性）
> @Updated: 2026-05-27

---

## 目录

1. [函数类](#函数类)
2. [面向对象类](#面向对象类)
3. [异常处理类](#异常处理类)
4. [进阶特性类](#进阶特性类)

---

## 1. 函数类

### 1.1 函数定义

**名称**：函数定义（Function Definition）

**首次出现位置**：C03_107-函数与Lambda.md 第1章

**定义**：
函数是组织代码的可重用单元，使用 def 关键字定义，包含函数名、参数列表和函数体。

**详解**：
语法：`def function_name(parameters): body`。参数列表：位置参数、默认参数、可变参数（*args、**kwargs）。函数体：缩进的代码块。函数可以没有 return 语句，隐式返回 None。函数定义是执行语句，创建函数对象并绑定到函数名。文档字符串：`"""函数说明"""` 放在函数体第一行。

---

### 1.2 函数参数

**名称**：函数参数（Function Parameters）

**首次出现位置**：C03_107-函数与Lambda.md 第2章

**定义**：
函数参数包括：位置参数（必选）、默认参数（可省略）、可变参数（*args 接收元组、**kwargs 接收字典）、关键字参数。

**详解**：
位置参数：按顺序传递，如 `def f(a, b, c)`。默认参数：`def f(a, b=10)`，默认值必须是不可变对象或 None。可变位置参数：`def f(*args)` 接收元组。可变关键字参数：`def f(**kwargs)` 接收字典。关键字参数：`f(a=1, b=2)` 按名字传递。参数顺序：位置参数 → *args → 关键字参数 → **kwargs。

---

### 1.3 *args 和 **kwargs

**名称**：可变参数（Variable Arguments）

**首次出现位置**：C03_107-函数与Lambda.md 第2章

**定义**：
*args 接收任意数量的位置参数（打包为元组），**kwargs 接收任意数量的关键字参数（打包为字典）。

**详解**：
调用时解包：`func(*list, **dict)` 分别解包为位置和关键字参数。打包：`def f(*args):` args 是元组。字典解包：`def f(**kwargs):` kwargs 是字典。常见用法：`def printf(format, *args):` 灵活打印。配合默认参数：`def func(required, *args, **kwargs):`。

---

### 1.4 Lambda 函数

**名称**：Lambda 函数（Lambda Function）

**首次出现位置**：C03_107-函数与Lambda.md 第3章

**定义**：
Lambda 是 Python 的匿名函数关键字，创建单表达式小型函数，格式：`lambda parameters: expression`。

**详解**：
语法：`square = lambda x: x**2`。Lambda 限制：只能是单表达式，不能包含语句。用途：作为高阶函数参数（map、filter、sorted 的 key）、回调函数、即时创建简单函数。Lambda 捕获外部变量（闭包）。Lambda vs def：Lambda 创建函数对象但不绑定名字，def 创建函数对象并绑定名字。

---

### 1.5 闭包

**名称**：闭包（Closure）

**首次出现位置**：C03_107-函数与Lambda.md 第4章

**定义**：
闭包是引用了外部函数局部变量的函数，即使外部函数已返回，该函数仍能访问那些变量。

**详解**：
形成条件：嵌套函数、引用外部函数变量、外部函数返回内部函数。用途：工厂函数（创建带参数前缀的函数）、记忆化（缓存计算结果）、装饰器基础。示例：`def make_adder(n): return lambda x: x + n`。闭包中修改外部变量需使用 nonlocal 声明。

---

### 1.6 装饰器

**名称**：装饰器（Decorator）

**首次出现位置**：C03_107-函数与Lambda.md 第5章

**定义**：
装饰器是高阶函数，接受函数作为输入并返回增强后的函数，用于在不修改原函数代码的情况下添加功能。

**详解**：
语法：`@decorator` 放在函数定义上方。标准形式：`def decorator(func): def wrapper(*args, **kwargs): enhanced_result; return wrapper`。装饰器可叠加（按从下到上顺序执行）。functools.wraps 保留原函数元信息。常见装饰器：@property、@staticmethod、@classmethod、@lru_cache、@retry。

---

### 1.7 文档字符串

**名称**：文档字符串（Docstring）

**首次出现位置**：C03_107-函数与Lambda.md 第1章

**定义**：
Docstring 是放在函数、类、模块开头的字符串文字，用于说明其用途和使用方法，通过 **doc** 属性访问。

**详解**：
单行 docstring：`def foo(): """Do something."""`。多行 docstring：首行简述 + 空行 + 详细说明。三引号：`"""..."""` 或 `'''...'''`。规范：PEP 257。常用工具：help()、 Sphinx、 pydoc。docstring 是可执行文档，存储在 **doc** 属性中。

---

## 2. 面向对象类

### 2.1 类（class）

**名称**：类（Class）

**首次出现位置**：C03_110-面向对象.md 第1章

**定义**：
类是 Python 面向对象的核心，定义对象的结构和行为，是创建对象的模板或蓝图。

**详解**：
定义：`class ClassName: body`。类体包含属性（类属性、实例属性）和方法。实例通过调用类创建：`obj = ClassName()`。类属性：所有实例共享。实例属性：通过 self.xxx = xxx 定义。类可以继承：`class Derived(Base):`。新式类：`class ClassName(object):` 或 Python 3 默认。

---

### 2.2 对象（object）

**名称**：对象（Object）

**首次出现位置**：C03_110-面向对象.md 第1章

**定义**：
对象是类的实例，具有身份（唯一标识）、类型（决定行为）和状态（属性值）。

**详解**：
Python 中一切皆对象：整数、字符串、函数、类都是对象。对象存储在堆内存中，通过引用访问。is 运算符比较对象身份（id）。type() 返回对象类型。hasattr()、getattr()、setattr() 动态操作属性。对象可以被垃圾回收（无引用时）。

---

### 2.3 self

**名称**：self 参数（self）

**首次出现位置**：C03_110-面向对象.md 第2章

**定义**：
self 是类方法（除静态和类方法）的第一个参数，指向调用该方法的实例对象。

**详解**：
self 是惯例名称（可用其他名称，但强烈不建议）。self 指向当前实例，通过 self.xxx 访问实例属性。类方法中必须显式传递 self。构造方法 **init** 中的 self.xxx 创建实例属性。self 不是关键字，是方法收到的隐式参数。

---

### 2.4 **init** 方法

**名称**：构造方法（Constructor）

**首次出现位置**：C03_110-面向对象.md 第3章

**定义**：
**init** 是类的初始化方法，在创建实例时自动调用，用于设置对象的初始状态。

**详解**：
语法：`def __init__(self, params): self.xxx = value`。不是真正的构造器（**new** 才是），而是初始化器。**init** 可以有任意参数，除 self 外都需传入。子类继承父类时：调用父类 **init**：`super().__init__(params)`。可选：定义 **new** 真正创建实例。

---

### 2.5 继承

**名称**：继承（Inheritance）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
继承是面向对象的重要特性，允许定义一个新类（子类）继承现有类（父类）的属性和方法。

**详解**：
单继承：`class Derived(Base):`。多继承：`class Derived(Base1, Base2):`。方法解析顺序（MRO）：深度优先、从左到右。super() 函数：调用父类方法，正确处理多继承。子类可以重写（override）父类方法。抽象基类（ABC）：通过 ABC 或 @abstractmethod 定义抽象方法。

---

### 2.6 多态

**名称**：多态（Polymorphism）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
多态是面向对象的特性，相同的方法调用在不同对象上有不同行为，实现接口统一而实现各异。

**详解**：
Python 的多态是 Duck Typing（鸭子类型）："如果它走起来像鸭子并叫起来像鸭子，那么它就是鸭子"。不需要显式接口定义，只要对象有相应方法即可。示例：`len(obj)` 调用对象的 **len**() 方法。统一接口：sorted()、map() 等函数通过协议与对象交互。

---

### 2.7 封装

**名称**：封装（Encapsulation）

**首次出现位置**：C03_110-面向对象.md 第2章

**定义**：
封装是将数据和操作隐藏在类内部，对外提供统一接口，隐藏实现细节，防止外部直接访问内部状态。

**详解**：
Python 封装约定：属性名前加下划线 `_attr`（受保护）、`__attr`（名称改写为 `_ClassName__attr`，私有）。属性名前加 `__` 使属性名改写，实现"伪私有"。Property 装饰器：提供受控的属性访问接口。封装目的：保护数据完整性、提供清晰接口、允许内部实现改变。

---

### 2.8 多重继承

**名称**：多重继承（Multiple Inheritance）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
多重继承允许一个类继承自多个父类，获取多个父类的属性和方法。

**详解**：
语法：`class Child(Parent1, Parent2, Parent3):`。方法解析顺序（MRO）：C3 线性化算法决定。钻石问题：多个父类继承自同一祖先。MRO 顺序可用 `ClassName.__mro__` 或 `ClassName.mro()` 查看。Mixin 模式：纯提供方法的基类，用于代码复用。混合使用组合和继承通常优于过度使用多重继承。

---

## 3. 异常处理类

### 3.1 异常

**名称**：异常（Exception）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
异常是程序执行时发生的错误，Python 通过异常机制处理错误而非传统返回码。

**详解**：
异常对象：BaseException → Exception → 具体异常类型。常见异常：ZeroDivisionError、ValueError、TypeError、KeyError、IndexError、FileNotFoundError、AttributeError。异常是类，继承自 Exception。裸 except 子句捕获所有异常（包括 KeyboardInterrupt）。建议明确指定异常类型。

---

### 3.2 try-except 语句

**名称**：异常捕获（try-except Statement）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
try-except 是 Python 的异常处理结构，尝试执行代码，捕获并处理指定的异常。

**详解**：
语法：`try: risky_code except ExceptionType: handler`。多个 except：`except (Type1, Type2):`。获取异常对象：`except Exception as e:`。捕获所有：`except:` 或 `except BaseException:`。异常会向上传播，未捕获的异常导致程序终止。EAFP 风格：先尝试（LBYL vs EAFP）。

---

### 3.3 else 子句

**名称**：else 子句（else Clause）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
try-except 语句中的 else 子句在没有异常发生时执行。

**详解**：
语法：`try: ... except: ... else: ...`。else 在 try 成功执行后、except 之前执行。用途：放 try 块中不适合的代码，避免意外捕获后续代码的异常。让 try-except 结构更清晰：正常流程放 else，异常处理放 except。

---

### 3.4 finally 子句

**名称**：finally 子句（finally Clause）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
finally 子句中的代码无论是否发生异常都会执行，常用于清理资源。

**详解**：
语法：`try: ... finally: ... cleanup`。用途：关闭文件、释放锁、关闭网络连接。无论 try 是否异常、except 是否执行、是否有 return，finally 都会执行。典型模式：`try: f = open(file); process(f) finally: f.close()`。可与 except 和 else 同时使用。

---

### 3.5 raise 语句

**名称**：抛出异常（raise Statement）

**首次出现位置**：C03_111-异常处理.md 第2章

**定义**：
raise 语句主动抛出异常，中断程序执行流程。

**详解**：
语法：`raise ExType()`、`raise ExType(args)`、`raise ExType(args) from original_exc`。重新抛出：`raise`（不带参数）保留原始异常堆栈。raise from 原因：`raise ValueError("invalid") from TypeError` 链接异常。断言：`assert condition, message` 在条件为假时抛出 AssertionError。

---

### 3.6 自定义异常

**名称**：自定义异常（Custom Exception）

**首次出现位置**：C03_111-异常处理.md 第2章

**定义**：
通过继承 Exception 类创建自定义异常类型，用于表达特定领域错误。

**详解**：
定义：`class MyError(Exception): pass`。可添加额外属性和方法。建议异常名以 Error 结尾。标准异常继承树：`BaseException` → `Exception` → 自定义异常。常用模式：定义异常基类，具体异常继承它。示例：`class ValidationError(Exception): def __init__(self, field, message): self.field = field; super().__init__(message)`。

---

## 4. 进阶特性类

### 4.1 迭代器（iterator）

**名称**：迭代器（Iterator）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
迭代器是实现了 **iter**() 和 **next**() 方法的对象，支持惰性遍历，通过 next() 逐个获取元素。

**详解**：
迭代器协议：`__iter__()` 返回迭代器本身，`__next__()` 返回下一元素。StopIteration：迭代完毕时抛出。迭代器是一次性的，遍历后耗尽。可迭代对象：实现了 **iter**() 或有 **getitem**()。for 循环自动调用 **iter**() 获取迭代器。iter() 函数：从可迭代对象获取迭代器。

---

### 4.2 可迭代对象（iterable）

**名称**：可迭代对象（Iterable）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
可迭代对象是能够返回迭代器的对象，支持 for 循环和 iterator 协议，包括序列（list、tuple、str）、字典、集合、生成器等。

**详解**：
判断：`isinstance(obj, Iterable)` 通过 collections.abc.Iterable。实现 `__iter__()` 使类成为可迭代对象。集合类都实现了 **iter**()。文件对象也是可迭代对象：`for line in f:` 逐行读取。iter() 函数从可迭代对象获取迭代器：`it = iter(obj); next(it)`。

---

### 4.3 上下文管理器（context manager）

**名称**：上下文管理器（Context Manager）

**首次出现位置**：C03_112-文件IO与with.md 第2章

**定义**：
上下文管理器是实现了 **enter**() 和 **exit**() 方法的对象，配合 with 语句使用，自动管理资源获取和释放。

**详解**：
协议方法：`__enter__(self)` 进入上下文时调用，`__exit__(self, exc_type, exc_val, exc_tb)` 退出时调用。异常处理：**exit** 返回 True 可抑制异常，否则异常继续传播。contextlib 模块：@contextmanager 装饰器将生成器转为上下文管理器。contextlib 提供：closing()、suppress()、redirect_stdout() 等。

---

### 4.4 魔术方法（dunder methods）

**名称**：魔术方法（Magic Methods / Dunder Methods）

**首次出现位置**：C03_110-面向对象.md 第5章

**定义**：
魔术方法是以双下划线开头和结尾的特殊方法，如 **init**、**str**、**len**，用于实现语言特性和协议。

**详解**：
构造：`__new__`、`__init__`、`__del__`。属性访问：`__getattr__`、`__setattr__`、`__getattribute__`。容器：`__len__`、`__getitem__`、`__iter__`、`__contains__`。可调用：`__call__`。比较：`__eq__`、`__lt__`、`__le__`。数值运算：`__add__`、`__sub__`、`__mul__`。字符串表示：`__repr__`、`__str__`。

---

### 4.5 元类（metaclass）

**名称**：元类（Metaclass）

**首次出现位置**：C03_110-面向对象.md 第6章

**定义**：
元类是类的类，定义了类的创建和行为。默认元类是 type，通过 metaclass 参数自定义元类创建类。

**详解**：
type 作为元类：`type('ClassName', (Base,), {'attr': value})` 动态创建类。元类用途：自动注册类、修改类属性、实现 ORM、插件系统。**metaclass** 属性（Python 2）或 metaclass 参数（Python 3）。常见元类库：django.db.models.Model（ORM）、SQLAlchemy。复杂的元类使用场景通常可用类装饰器简化。

---

### 4.6 描述符（descriptor）

**名称**：描述符（Descriptor）

**首次出现位置**：C03_110-面向对象.md 第5章

**定义**：
描述符是实现了描述符协议（**get**、**set**、**delete**）的对象，作为类属性使用，控制属性访问行为。

**详解**：
描述符协议：`__get__(self, obj, type)`、`__set__(self, obj, value)`、`__delete__(self, obj)`。数据描述符：同时实现 **get** 和 **set**/**delete**，优先于实例字典。非数据描述符：只实现 **get**，如方法。property 装饰器：使用描述符实现。方法：函数是非数据描述符，`__get__` 将函数转为方法。常见用途：@property、@classmethod、@staticmethod、lazy properties。

---

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
- 2026-05-27：从 V03_101 拆分为独立文件，v4.0.0
