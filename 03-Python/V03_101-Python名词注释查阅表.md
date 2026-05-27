# Python-专有名词注释查阅表 | Python

> @Author: fanquanpp
> @Category: Python Basics
> @Description: Python-专有名词注释查阅表 | Python
> @Updated: 2026-05-03

---

## 目录

1. [基础概念类](#基础概念类)
2. [数据类型类](#数据类型类)
3. [数据结构类](#数据结构类)
4. [语法结构类](#语法结构类)
5. [运算符类](#运算符类)
6. [控制流类](#控制流类)
7. [函数类](#函数类)
8. [面向对象类](#面向对象类)
9. [异常处理类](#异常处理类)
10. [文件与模块类](#文件与模块类)
11. [标准库类](#标准库类)
12. [进阶特性类](#进阶特性类)

---

## 1. 基础概念类

### 1.1 Python

**名称**：Python（蟒蛇）

**首次出现位置**：C03_101-概述与环境.md 第1章

**定义**：
Python 是由 Guido van Rossum 于 1991 年创建的解释型高级通用编程语言，以简洁清晰的语法、强大的标准库和丰富的第三方生态著称。

**详解**：
Python 的设计哲学强调代码可读性和简洁性（"There should be one—and preferably only one—obvious way to do it"）。Python 使用缩进表示代码块。主要版本：Python 2（2020年停止维护）、Python 3（当前主流）。应用领域：Web开发、数据科学、人工智能、自动化脚本、爬虫、游戏后端等。Python 拥有全球最大的开源包索引 PyPI，涵盖几乎所有领域。

---

### 1.2 Guido van Rossum（吉多·范罗苏姆）

**名称**：吉多·范罗苏姆（Guido van Rossum）

**首次出现位置**：C03_101-概述与环境.md 第1章

**定义**：
Guido van Rossum 是荷兰程序员，Python 语言的创始人，被称为 Python 的"仁慈的独裁者"（BDFL），直到 2018 年卸任。

**详解**：
Guido 在 1989 年圣诞节期间为了打发时间开始编写 Python 语言的解释器。Python 的名字来源于 BBC 的喜剧节目《Monty Python's Flying Circus》，而非爬虫。Guido 主导 Python 设计数十年，其设计理念深深影响了 Python 的简洁和一致性。

---

### 1.3 解释器

**名称**：解释器（Interpreter）

**首次出现位置**：C03_101-概述与环境.md 第3章

**定义**：
Python 解释器是执行 Python 代码的程序，将 Python 源代码逐行转换为机器码并执行。CPython 是 Python 的官方参考实现。

**详解**：
常见 Python 实现：CPython（官方 C 语言实现）、PyPy（ JIT 编译，速度更快）、Jython（运行在 JVM 上）、IronPython（运行在 .NET 上）。启动方式：命令行输入 `python` 进入交互模式，`python script.py` 执行脚本。解释器读取代码、解析语法、编译成字节码（.pyc 文件）、执行。

---

### 1.4 虚拟环境

**名称**：虚拟环境（Virtual Environment）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
虚拟环境是 Python 项目的独立运行环境，包含独立的 Python 解释器副本和依赖包，避免项目间依赖冲突。

**详解**：
创建命令：`python -m venv myenv`（标准库）或 `virtualenv myenv`（第三方）。激活：Windows 下 `myenv\Scripts\activate`，Linux/Mac 下 `source myenv/bin/activate`。激活后 `python` 和 `pip` 使用虚拟环境内的版本。常用工具：pip（包管理器）、requirements.txt（依赖清单）、Pipenv/ Poetry（现代依赖管理）。

---

### 1.5 PEP（Python 增强提案）

**名称**：Python 增强提案（Python Enhancement Proposal）

**缩写**：PEP

**首次出现位置**：C03_101-概述与环境.md 第5章

**定义**：
PEP 是 Python 社区提出新功能、改进或设计决策的正式文档。PEP 8 是 Python 代码风格指南。

**详解**：
PEP 类型：Standards（标准库新功能）、Index（信息性文档）、Process（流程规范）。重要 PEP：PEP 8（代码风格）、PEP 20（Python 之禅）、PEP 257（文档字符串规范）、PEP 484（类型提示）、PEP 498（ f-string）。通过 PEP 提案确保 Python 发展的透明和社区参与。

---

### 1.6 PyPI（Python 包索引）

**名称**：Python 包索引（Python Package Index）

**缩写**：PyPI

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
PyPI 是 Python 官方中央仓库，托管超过 40 万个第三方包，通过 pip 命令行工具安装。

**详解**：
常用命令：`pip install package`（安装）、`pip uninstall package`（卸载）、`pip list`（列出已安装）、`pip freeze > requirements.txt`（导出依赖）。PyPI 镜像：国内常用豆瓣、清华、阿里云镜像加速下载。国内配置镜像：`pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package`。

---

## 2. 数据类型类

### 2.1 整数（int）

**名称**：整数（Integer）

**缩写**：int

**首次出现位置**：C03_103-基础数据类型.md 第1章

**定义**：
整数是 Python 的基本数据类型，表示没有小数部分的数值。Python 3 的整数没有大小限制（受限于内存）。

**详解**：
整数表示：十进制（10）、二进制（0b10）、八进制（0o10）、十六进制（0x10）。下划线分隔符（Python 3.6+）：`1_000_000` 等于 1000000。算术运算：+、-、*、/（浮点除）、//（整除）、%（取模）、**（幂）。整数对象方法：bit_length()、to_bytes()、from_bytes()。

---

### 2.2 浮点数（float）

**名称**：浮点数（Floating-point Number）

**缩写**：float

**首次出现位置**：C03_103-基础数据类型.md 第1章

**定义**：
浮点数是带小数部分的数值，采用 IEEE 754 双精度标准，约 15-17 位十进制精度。

**详解**：
表示：`3.14`、`-0.5`、`1e10`（科学计数法）。精度问题：`0.1 + 0.2 != 0.3`（二进制浮点误差）。解决方案：使用 decimal 模块（`from decimal import Decimal`）进行精确计算，或用分数（fractions 模块）。math 模块提供：math.pi、math.e、math.sqrt()、math.floor()、math.ceil()。

---

### 2.3 复数（complex）

**名称**：复数（Complex Number）

**首次出现位置**：C03_103-基础数据类型.md 第1章

**定义**：
复数由实部和虚部组成，格式为 `a + bj`，其中 j 是虚数单位。

**详解**：
创建：`complex(1, 2)` 或 `1 + 2j`。属性：real（实部）、imag（虚部）、conjugate()（共轭复数）。复数运算支持加、减、乘、除、幂。cmath 模块提供复数版本的数学函数。复数在科学计算和信号处理中常用。

---

### 2.4 字符串（str）

**名称**：字符串（String）

**缩写**：str

**首次出现位置**：C03_103-基础数据类型.md 第2章

**定义**：
字符串是 Python 的文本数据类型，由 Unicode 字符序列组成，不可变。

**详解**：
创建：单引号、双引号、三引号（多行）。前缀：r（原始字符串）、b（字节串）、f（格式化字符串）。不可变：不能直接修改字符，如需修改创建新字符串。常用操作：索引 `s[0]`、切片 `s[1:3]`、连接 `+`、`len()`、`in` 成员测试。编码：Python 3 字符串默认 Unicode，`encode()` 转字节，`decode()` 转字符串。

---

### 2.5 布尔值（bool）

**名称**：布尔值（Boolean）

**缩写**：bool

**首次出现位置**：C03_103-基础数据类型.md 第1章

**定义**：
布尔值只有两个：True 和 False，布尔类型是 int 的子类，True=1，False=0。

**详解**：
布尔转换：`bool(x)` 将任意值转为布尔。假值：None、False、0、0.0、''、()、[]、{}、set()、range(0)。布尔运算：and、or、not（优先级 not > and > or）。短路求值：and 左边为假则不计算右边，or 左边为真则不计算右边。布尔类型在条件判断和逻辑运算中至关重要。

---

### 2.6 字节（bytes）

**名称**：字节（Bytes）

**首次出现位置**：C03_103-基础数据类型.md 第2章

**定义**：
字节是不可变的二进制数据序列，用于处理网络协议、文件读写、加密等场景。

**详解**：
创建：`b'hello'`、`bytes([1, 2, 3])`、`'字符串'.encode('utf-8')`。字节切片操作与字符串类似：`b'hello'[1]` 返回 101（int）。bytes 与 str 区别：str 是 Unicode 文本，bytes 是原始字节。编解码：`'hello'.encode('utf-8')` 将 str 转 bytes，`b'hello'.decode('utf-8')` 反之。

---

### 2.7 None

**名称**：空值（None）

**首次出现位置**：C03_103-基础数据类型.md 第1章

**定义**：
None 是 Python 的空值对象，表示"没有值"或"未知"，类型为 NoneType。

**详解**：
用途：变量初始化（尚未赋值）、函数默认参数（未指定时）、函数无返回值（返回 None）、占位符。判断：`x is None`（使用 is 而非 ==，因为 None 是单例）。None 在布尔上下文中为 False。打印 None 默认不显示：`print(None)` 输出 "None"。

---

### 2.8 类型注解

**名称**：类型注解（Type Hints / Type Annotations）

**首次出现位置**：C03_103-基础数据类型.md 第3章

**定义**：
类型注解是 Python 3.5+ 引入的语法，用于标注变量、函数参数和返回值的预期类型，是一种可选的类型提示。

**详解**：
变量注解：`x: int = 10`。函数注解：`def func(a: int, b: str) -> bool: ...`。typing 模块提供复杂类型：List[int]、Dict[str, int]、Optional[str]、Union[int, str]、Callable[[int], int]。类型注解不强制执行，仅作为文档和 IDE 支持。mypy 是官方类型检查工具。

---

## 3. 数据结构类

### 3.1 列表（list）

**名称**：列表（List）

**首次出现位置**：C03_108-内置数据结构.md 第1章

**定义**：
列表是 Python 的有序可变序列，可存储任意类型元素，支持索引、切片、嵌套。

**详解**：
创建：`[1, 2, 3]`、`list()`（空列表）、`list(range(5))`。索引：`lst[0]` 首元素、`lst[-1]` 末元素。切片：`lst[1:4]`、`lst[::2]`（步长2）。常用方法：append()（末尾添加）、insert()（插入）、pop()（弹出）、remove()（删除值）、sort()（排序）、reverse()（反转）。列表推导式：`[x*2 for x in range(5)]`。

---

### 3.2 元组（tuple）

**名称**：元组（Tuple）

**首次出现位置**：C03_108-内置数据结构.md 第1章

**定义**：
元组是有序不可变序列，与列表类似但创建后不能修改。用于保护数据、作为字典键、函数多返回值。

**详解**：
创建：`(1, 2, 3)` 或 `tuple([1, 2, 3])`。单元素元组必须加逗号：`(42,)`。不可变性：不能 append、remove、pop、切片赋值。元组解包：`a, b, c = (1, 2, 3)`。命名元组：`collections.namedtuple()` 创建带字段名的元组。namedtuple 常用于替代简单的类。

---

### 3.3 字典（dict）

**名称**：字典（Dictionary）

**首次出现位置**：C03_108-内置数据结构.md 第2章

**定义**：
字典是 Python 的键值对容器，通过键（key）快速访问值（value），键必须是可哈希的类型。

**详解**：
创建：`{'name': 'Tom', 'age': 20}`、`dict([('a', 1), ('b', 2)])`、`{k: v for k, v in items}`（推导式）。访问：`d['name']`（键不存在抛出 KeyError）、`d.get('name', 'default')`（安全访问）。常用方法：keys()、values()、items()、update()、pop()、setdefault()。键要求：可哈希（int、str、tuple 等），不可哈希的类型（list、dict）不能作为键。

---

### 3.4 集合（set）

**名称**：集合（Set）

**首次出现位置**：C03_108-内置数据结构.md 第3章

**定义**：
集合是无序不重复元素的容器，支持数学集合运算（并集、交集、差集、对称差集）。

**详解**：
创建：`{1, 2, 3}`、`set([1, 2, 2, 3])`（从可迭代对象创建，自动去重）。常用操作：add()（添加）、remove()（删除，不存在抛异常）、discard()（删除，不存在不抛错）、pop()（随机弹出）。集合运算：|（并集）、&（交集）、-（差集）、^（对称差集）。集合常用于去重和成员测试（in 操作比 list 快）。

---

### 3.5 frozenset

**名称**：不可变集合（Frozen Set）

**首次出现位置**：C03_108-内置数据结构.md 第3章

**定义**：
frozenset 是不可变版本的集合，创建后不能添加或删除元素，可以作为字典键或集合元素。

**详解**：
创建：`frozenset([1, 2, 3])`。特性：不可变因此可哈希，可作为 dict 的键或 set 的元素。其他操作与 set 相同，但没有 add、remove、pop 等修改方法。适用场景：需要将集合作为字典键时、固定不变的集合数据。

---

### 3.6 deque（双端队列）

**名称**：双端队列（Double-ended Queue）

**缩写**：deque

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
deque 是 collections 模块提供的双端队列，支持从两端高效添加和删除元素，比 list 的头尾操作效率更高。

**详解**：
创建：`from collections import deque`。优势：append/popleft 是 O(1)，而 list 的 insert(0, x)/pop() 是 O(n)。常用方法：append()、appendleft()、pop()、popleft()、extend()、extendleft()、rotate()（循环移动）。用途：队列（Queue）、栈（Stack）、消息队列、 breadth-first search。

---

### 3.7 namedtuple（命名元组）

**名称**：命名元组（Named Tuple）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
namedtuple 是工厂函数，创建类似元组的子类，可以用字段名访问元素，兼具元组的不可变特性和类的命名属性。

**详解**：
创建：`from collections import namedtuple; Point = namedtuple('Point', ['x', 'y']); p = Point(1, 2)`。访问：`p.x`、`p[0]`（两种方式均可）。方法：_replace()（创建修改后的副本）、_asdict()（转为字典）。namedtuple 替代简单类，减少内存开销。适用：坐标点、数据库记录、游戏坐标等固定字段的对象。

---

### 3.8 Counter（计数器）

**名称**：计数器（Counter）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
Counter 是 dict 的子类，用于统计可哈希对象出现的次数，是 Python 3.1+ 新增的容器。

**详解**：
创建：`from collections import Counter; c = Counter(['red', 'blue', 'red', 'green'])`。常用方法：elements()（返回所有元素）、most_common(n)（返回前 n 个最常见元素）、subtract()（相减）。运算：+、-（只保留正数）、&（交）、|（并）。常用于：文本词频统计、投票计数、元素出现次数分析。

---

## 4. 语法结构类

### 4.1 变量

**名称**：变量（Variable）

**首次出现位置**：C03_104-变量与常量.md 第1章

**定义**：
变量是绑定到对象的命名标识符，存储在命名空间中，通过变量名访问对象。

**详解**：
赋值：`x = 10`（创建或绑定）。动态类型：变量类型由绑定的对象决定，无需声明类型。多重赋值：`a, b = 1, 2`（元组解包）、`a = b = c = 0`（链式赋值）。交换：`a, b = b, a`（无需临时变量）。命名规则：字母或下划线开头，后跟字母、数字、下划线，不能使用关键字。

---

### 4.2 常量

**名称**：常量（Constant）

**首次出现位置**：C03_104-变量与常量.md 第2章

**定义**：
常量是值不变的量，Python 没有真正的常量机制，通常使用全大写变量名约定表示常量，如 `MAX_SIZE = 100`。

**详解**：
Python 常量约定：全大写字母 + 下划线分隔（如 `PI = 3.14159`、`MAX_RETRIES = 3`）。const 关键字：Python 不支持，真正的常量需要通过类或第三方库实现。常用常量模块：`math`（math.pi、math.e）、`sys`（sys.maxsize）、`float`（float('inf')、float('-inf')）。不变性：Python 不强制常量不可变，需靠程序员自觉遵守约定。

---

### 4.3 表达式

**名称**：表达式（Expression）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
表达式是由运算符和操作数组成的代码片段，计算后产生一个值。

**详解**：
表达式类型：算术表达式（1 + 2）、比较表达式（x > 0）、逻辑表达式（a and b）、赋值表达式（:=，Python 3.8+ 海象运算符）。所有表达式都有返回值。表达式可嵌套：`max = x if x > y else y`。表达式不能单独作为语句（除赋值表达式），需配合语句使用。

---

### 4.4 语句

**名称**：语句（Statement）

**首次出现位置**：C03_102-程序结构与基础语法.md 第3章

**定义**：
语句是 Python 程序的执行单元，每条语句占据一行或用分号分隔，控制程序流程或执行具体操作。

**详解**：
语句类型：赋值语句、条件语句（if/elif/else）、循环语句（while/for）、跳转语句（break/continue/return）、异常语句（try/except/finally）、函数定义（def）、类定义（class）、with 语句、pass 语句、空语句、import 语句。复合语句以冒号结尾，后跟缩进的代码块。

---

### 4.5 缩进

**名称**：缩进（Indentation）

**首次出现位置**：C03_102-程序结构与基础语法.md 第1章

**定义**：
Python 使用缩进（通常 4 个空格）来界定代码块（if、for、def、class 等），是 Python 语法的重要组成部分。

**详解**：
PEP 8 推荐：4 空格缩进。同一代码块缩进必须一致。IDLE 和多数 IDE 会自动处理缩进。常见错误：Tab 与空格混用会导致 IndentationError 或隐蔽的逻辑错误。建议设置 IDE：Tab 转换为空格。if/for/def 等关键字后的代码块必须缩进。

---

### 4.6 注释

**名称**：注释（Comment）

**首次出现位置**：C03_102-程序结构与基础语法.md 第2章

**定义**：
注释是代码中供人阅读的说明文字，Python 解释器会忽略注释内容。

**详解**：
单行注释：`# 这是一行注释`。多行注释/文档字符串：使用三引号 `"""..."""` 或 `'''...'''`。注释规范：解释"为什么"而非"是什么"、保持更新、避免显而易见的注释。特殊注释：`#!/usr/bin/env python`（shebang，指定解释器）、`# type: ignore`（类型检查忽略）。

---

### 4.7 pass 语句

**名称**：pass 空语句（pass Statement）

**首次出现位置**：C03_102-程序结构与基础语法.md 第3章

**定义**：
pass 是 Python 的空语句，不执行任何操作，常用作占位符保持代码结构完整。

**详解**：
使用场景：定义空函数 `def foo(): pass`、空类 `class Empty: pass`、空循环 `while condition: pass`、if 分支暂不实现。作用：保持语法正确，避免"Expected indented block"错误。相当于其他语言的空语句（`{}` 或 `;`）。

---

## 5. 运算符类

### 5.1 算术运算符

**名称**：算术运算符（Arithmetic Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
算术运算符包括：+（加）、-（减）、*（乘）、/（除）、//（整除）、%（取模）、**（幂）。

**详解**：
`/` 总是返回 float：`5 / 2 = 2.5`。`//` 整除向下取整：`-5 // 2 = -3`。`%` 结果与除数同号：`7 % -3 = -2`（Python 独有）。`**` 幂运算符：`2 ** 3 = 8`，支持分数指数：`4 ** 0.5 = 2.0`。支持复数运算：`(1+2j) ** 2 = (-3+4j)`。

---

### 5.2 比较运算符

**名称**：比较运算符（Comparison Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
比较运算符包括：==（等于）、!=（不等于）、<（小于）、>（大于）、<=（小于等于）、>=（大于等于）。

**详解**：
比较结果返回 True 或 False。可以链式比较：`0 < x < 10` 等价于 `0 < x and x < 10`。字符串比较：按字典序逐字符比较。列表/元组比较：从左到右逐元素比较。is 与 == 区别：is 比较身份（内存地址），== 比较值。浮点数比较用 tolerance：`abs(a - b) < 1e-9`。

---

### 5.3 逻辑运算符

**名称**：逻辑运算符（Logical Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
逻辑运算符包括：and（逻辑与）、or（逻辑或）、not（逻辑非）。

**详解**：
短路求值：and 左边为假则不计算右边直接返回假值，or 左边为真则不计算右边直接返回真值。返回实际值而非布尔：`(1 and 5)` 返回 5（最后一个被计算的表达式的值）。not 返回布尔：`not 1` 返回 False。布尔优先级：not > and > or。

---

### 5.4 位运算符

**名称**：位运算符（Bitwise Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
位运算符直接操作整数的二进制位：&（按位与）、|（按位或）、^（按位异或）、~（按位取反）、<<（左移）、>>（右移）。

**详解**：
`~n = -(n+1)`（按位取反公式）。左移：`x << n` 等价于 `x * 2**n`。右移：`x >> n` 等价于 `x // 2**n`（整数除法）。负数右移：算术右移，高位补符号位。常用技巧：设置位 `flags | BIT`、清除位 `flags & ~BIT`、测试位 `flags & BIT`。

---

### 5.5 成员运算符

**名称**：成员运算符（Membership Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
成员运算符用于测试值是否在序列（列表、元组、字符串、字典等）中：in（在）、not in（不在）。

**详解**：
序列：`x in ['a', 'b', 'c']` 返回 True/False。字典：检查键而非值：`'name' in {'name': 'Tom'}` 为 True。字符串：`'sub' in 'substring'` 支持子串测试。字典的 values()、items()：需明确使用。性能：list 是 O(n)，set 和 dict 是 O(1)。

---

### 5.6 身份运算符

**名称**：身份运算符（Identity Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
身份运算符 is 和 is not 用于比较两个对象的内存地址，判断是否是同一对象。

**详解**：
`is`：检查是否是同一个对象（id 相同）。`is not`：检查是否不是同一对象。小整数池：Python 缓存 -5 到 256 的整数，这些整数比较时用 is 也返回 True。但不建议用 is 比较整数。适用场景：判断 None（`x is None`）、单例模式、类型判断（但用 isinstance 更好）。

---

## 6. 控制流类

### 6.1 if-elif-else 语句

**名称**：条件语句（if-elif-else Statement）

**首次出现位置**：C03_106-控制流.md 第1章

**定义**：
if-elif-else 是 Python 的条件分支结构，根据条件真假决定执行哪个代码块。

**详解**：
语法：`if condition1: ... elif condition2: ... else: ...`。elif 是 else if 的缩写。条件可以是任意表达式，结果转为布尔。else 可省略。if 可嵌套。唯一假值：None、False、0、0.0、''、()、[]、{}、set()、range(0)。match-case（Python 3.10+）是更强大的模式匹配语法。

---

### 6.2 while 循环

**名称**：while 循环（while Loop）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
while 是 Python 的前测试循环，当条件为真时重复执行循环体，可能一次都不执行。

**详解**：
语法：`while condition: loop_body`。必须有改变条件的语句，否则死循环。else 子句：循环正常结束（非 break）时执行 `while ... else: ...`。break：跳出循环。continue：跳过本次迭代。示例：`while True: user_input = input('>'); if user_input == 'quit': break`。

---

### 6.3 for 循环

**名称**：for 循环（for Loop）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
for 是 Python 的遍历循环，用于迭代序列（列表、元组、字符串、字典、文件等）或可迭代对象。

**详解**：
语法：`for item in iterable: loop_body`。range() 生成数字序列：`for i in range(5):` 迭代 0-4。enumerate() 同时获取索引和值：`for i, v in enumerate(list):`。zip() 并行迭代多个序列：`for a, b in zip(list1, list2):`。字典迭代：`for key in d:`（键）、`for value in d.values():`、`for k, v in d.items():`。

---

### 6.4 range 对象

**名称**：range 对象（Range Object）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
range 是 Python 3 的不可变序列类型，生成算术序列的惰性对象，占用内存极小，常用于循环计数。

**详解**：
语法：`range(start, stop, step)`，包含 start、不包含 stop。创建：`range(5)`（0-4）、`range(1, 6)`（1-5）、`range(0, 10, 2)`（0,2,4,6,8）。range 对象不支持切片（Python 3.12+ 支持部分切片）。优点：不占用大量内存：`list(range(10**6))` 会创建大列表，但 `range(10**6)` 几乎不占内存。

---

### 6.5 break 语句

**名称**：break 语句（break Statement）

**首次出现位置**：C03_106-控制流.md 第3章

**定义**：
break 用于立即终止 while 或 for 循环，跳到循环体之外的下一条语句。

**详解**：
break 只终止最内层循环（多层嵌套时）。for-else：循环正常结束（非 break 终止）时执行 else 块。常见模式：搜索：`for item in items: if match: result = item; break`。无限循环+break：`while True: if condition: break`。

---

### 6.6 continue 语句

**名称**：continue 语句（continue Statement）

**首次出现位置**：C03_106-控制流.md 第3章

**定义**：
continue 跳过本次循环剩余语句，立即开始下一次迭代。

**详解**：
continue 跳回循环条件判断（while）或下一个元素迭代（for）。用于跳过不需要处理的元素：`for i in range(10): if i % 2 == 0: continue; process_odd(i)`。减少嵌套层级，使代码更清晰。

---

### 6.7 列表推导式

**名称**：列表推导式（List Comprehension）

**首次出现位置**：C03_109-推导式与生成器.md 第1章

**定义**：
列表推导式是 Python 的简洁语法，从可迭代对象快速创建列表，格式：`[expr for item in iterable if condition]`。

**详解**：
基本形式：`[x*2 for x in range(5)]` 生成 [0, 2, 4, 6, 8]。带条件：`[x for x in range(10) if x % 2 == 0]` 筛选偶数。嵌套：`[x+y for x in [1,2] for y in [3,4]]` 产生 [4,5,5,6]。生成器表达式：`gen = (x*2 for x in range(5))` 用圆括号，省内存。字典/集合推导式：{k:v for ...}、{x for x ...}。

---

### 6.8 生成器

**名称**：生成器（Generator）

**首次出现位置**：C03_109-推导式与生成器.md 第3章

**定义**：
生成器是惰性求值的迭代器，通过 yield 语句逐个产生元素，不一次性生成所有元素，节省内存。

**详解**：
生成器函数：用 yield 关键字返回值的函数。调用生成器函数返回生成器对象，而非执行函数体。逐次迭代：`next(gen)` 获取下一个值。生成器用尽后抛出 StopIteration。生成器优势：处理大数据流、无需全部加载到内存。示例：`def count(n): for i in range(n): yield i`。

---

### 6.9 yield

**名称**：yield 语句（yield）

**首次出现位置**：C03_109-推导式与生成器.md 第3章

**定义**：
yield 是 Python 的关键字，用于生成器函数中向调用者返回一个值，并暂停函数状态，下次迭代时从 yield 处继续。

**详解**：
yield 与 return：return 终止函数并返回值，yield 暂停函数并返回值。生成器函数：包含 yield 的函数。send()：生成器支持 send(value) 向生成器内部发送值，恢复并传递值给 yield 表达式。yield from：委托给子迭代器（Python 3.3+）。

---

## 7. 函数类

### 7.1 函数定义

**名称**：函数定义（Function Definition）

**首次出现位置**：C03_107-函数与Lambda.md 第1章

**定义**：
函数是组织代码的可重用单元，使用 def 关键字定义，包含函数名、参数列表和函数体。

**详解**：
语法：`def function_name(parameters): body`。参数列表：位置参数、默认参数、可变参数（*args、**kwargs）。函数体：缩进的代码块。函数可以没有 return 语句，隐式返回 None。函数定义是执行语句，创建函数对象并绑定到函数名。文档字符串：`"""函数说明"""` 放在函数体第一行。

---

### 7.2 函数参数

**名称**：函数参数（Function Parameters）

**首次出现位置**：C03_107-函数与Lambda.md 第2章

**定义**：
函数参数包括：位置参数（必选）、默认参数（可省略）、可变参数（*args 接收元组、**kwargs 接收字典）、关键字参数。

**详解**：
位置参数：按顺序传递，如 `def f(a, b, c)`。默认参数：`def f(a, b=10)`，默认值必须是不可变对象或 None。可变位置参数：`def f(*args)` 接收元组。可变关键字参数：`def f(**kwargs)` 接收字典。关键字参数：`f(a=1, b=2)` 按名字传递。参数顺序：位置参数 → *args → 关键字参数 → **kwargs。

---

### 7.3 *args 和 **kwargs

**名称**：可变参数（Variable Arguments）

**首次出现位置**：C03_107-函数与Lambda.md 第2章

**定义**：
*args 接收任意数量的位置参数（打包为元组），**kwargs 接收任意数量的关键字参数（打包为字典）。

**详解**：
调用时解包：`func(*list, **dict)` 分别解包为位置和关键字参数。打包：`def f(*args):` args 是元组。字典解包：`def f(**kwargs):` kwargs 是字典。常见用法：`def printf(format, *args):` 灵活打印。配合默认参数：`def func(required, *args, **kwargs):`。

---

### 7.4 Lambda 函数

**名称**：Lambda 函数（Lambda Function）

**首次出现位置**：C03_107-函数与Lambda.md 第3章

**定义**：
Lambda 是 Python 的匿名函数关键字，创建单表达式小型函数，格式：`lambda parameters: expression`。

**详解**：
语法：`square = lambda x: x**2`。Lambda 限制：只能是单表达式，不能包含语句。用途：作为高阶函数参数（map、filter、sorted 的 key）、回调函数、即时创建简单函数。Lambda 捕获外部变量（闭包）。Lambda vs def：Lambda 创建函数对象但不绑定名字，def 创建函数对象并绑定名字。

---

### 7.5 闭包

**名称**：闭包（Closure）

**首次出现位置**：C03_107-函数与Lambda.md 第4章

**定义**：
闭包是引用了外部函数局部变量的函数，即使外部函数已返回，该函数仍能访问那些变量。

**详解**：
形成条件：嵌套函数、引用外部函数变量、外部函数返回内部函数。用途：工厂函数（创建带参数前缀的函数）、记忆化（缓存计算结果）、装饰器基础。示例：`def make_adder(n): return lambda x: x + n`。闭包中修改外部变量需使用 nonlocal 声明。

---

### 7.6 装饰器

**名称**：装饰器（Decorator）

**首次出现位置**：C03_107-函数与Lambda.md 第5章

**定义**：
装饰器是高阶函数，接受函数作为输入并返回增强后的函数，用于在不修改原函数代码的情况下添加功能。

**详解**：
语法：`@decorator` 放在函数定义上方。标准形式：`def decorator(func): def wrapper(*args, **kwargs): enhanced_result; return wrapper`。装饰器可叠加（按从下到上顺序执行）。functools.wraps 保留原函数元信息。常见装饰器：@property、@staticmethod、@classmethod、@lru_cache、@retry。

---

### 7.7 文档字符串

**名称**：文档字符串（Docstring）

**首次出现位置**：C03_107-函数与Lambda.md 第1章

**定义**：
Docstring 是放在函数、类、模块开头的字符串文字，用于说明其用途和使用方法，通过 **doc** 属性访问。

**详解**：
单行 docstring：`def foo(): """Do something."""`。多行 docstring：首行简述 + 空行 + 详细说明。三引号：`"""..."""` 或 `'''...'''`。规范：PEP 257。常用工具：help()、 Sphinx、 pydoc。docstring 是可执行文档，存储在 **doc** 属性中。

---

## 8. 面向对象类

### 8.1 类（class）

**名称**：类（Class）

**首次出现位置**：C03_110-面向对象.md 第1章

**定义**：
类是 Python 面向对象的核心，定义对象的结构和行为，是创建对象的模板或蓝图。

**详解**：
定义：`class ClassName: body`。类体包含属性（类属性、实例属性）和方法。实例通过调用类创建：`obj = ClassName()`。类属性：所有实例共享。实例属性：通过 self.xxx = xxx 定义。类可以继承：`class Derived(Base):`。新式类：`class ClassName(object):` 或 Python 3 默认。

---

### 8.2 对象（object）

**名称**：对象（Object）

**首次出现位置**：C03_110-面向对象.md 第1章

**定义**：
对象是类的实例，具有身份（唯一标识）、类型（决定行为）和状态（属性值）。

**详解**：
Python 中一切皆对象：整数、字符串、函数、类都是对象。对象存储在堆内存中，通过引用访问。is 运算符比较对象身份（id）。type() 返回对象类型。hasattr()、getattr()、setattr() 动态操作属性。对象可以被垃圾回收（无引用时）。

---

### 8.3 self

**名称**：self 参数（self）

**首次出现位置**：C03_110-面向对象.md 第2章

**定义**：
self 是类方法（除静态和类方法）的第一个参数，指向调用该方法的实例对象。

**详解**：
self 是惯例名称（可用其他名称，但强烈不建议）。self 指向当前实例，通过 self.xxx 访问实例属性。类方法中必须显式传递 self。构造方法 **init** 中的 self.xxx 创建实例属性。self 不是关键字，是方法收到的隐式参数。

---

### 8.4 **init** 方法

**名称**：构造方法（Constructor）

**首次出现位置**：C03_110-面向对象.md 第3章

**定义**：
**init** 是类的初始化方法，在创建实例时自动调用，用于设置对象的初始状态。

**详解**：
语法：`def __init__(self, params): self.xxx = value`。不是真正的构造器（**new** 才是），而是初始化器。**init** 可以有任意参数，除 self 外都需传入。子类继承父类时：调用父类 **init**：`super().__init__(params)`。可选：定义 **new** 真正创建实例。

---

### 8.5 继承

**名称**：继承（Inheritance）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
继承是面向对象的重要特性，允许定义一个新类（子类）继承现有类（父类）的属性和方法。

**详解**：
单继承：`class Derived(Base):`。多继承：`class Derived(Base1, Base2):`。方法解析顺序（MRO）：深度优先、从左到右。super() 函数：调用父类方法，正确处理多继承。子类可以重写（override）父类方法。抽象基类（ABC）：通过 ABC 或 @abstractmethod 定义抽象方法。

---

### 8.6 多态

**名称**：多态（Polymorphism）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
多态是面向对象的特性，相同的方法调用在不同对象上有不同行为，实现接口统一而实现各异。

**详解**：
Python 的多态是 Duck Typing（鸭子类型）："如果它走起来像鸭子并叫起来像鸭子，那么它就是鸭子"。不需要显式接口定义，只要对象有相应方法即可。示例：`len(obj)` 调用对象的 **len**() 方法。统一接口：sorted()、map() 等函数通过协议与对象交互。

---

### 8.7 封装

**名称**：封装（Encapsulation）

**首次出现位置**：C03_110-面向对象.md 第2章

**定义**：
封装是将数据和操作隐藏在类内部，对外提供统一接口，隐藏实现细节，防止外部直接访问内部状态。

**详解**：
Python 封装约定：属性名前加下划线 `_attr`（受保护）、`__attr`（名称改写为 `_ClassName__attr`，私有）。属性名前加 `__` 使属性名改写，实现"伪私有"。Property 装饰器：提供受控的属性访问接口。封装目的：保护数据完整性、提供清晰接口、允许内部实现改变。

---

### 8.8 多重继承

**名称**：多重继承（Multiple Inheritance）

**首次出现位置**：C03_110-面向对象.md 第4章

**定义**：
多重继承允许一个类继承自多个父类，获取多个父类的属性和方法。

**详解**：
语法：`class Child(Parent1, Parent2, Parent3):`。方法解析顺序（MRO）：C3 线性化算法决定。钻石问题：多个父类继承自同一祖先。MRO 顺序可用 `ClassName.__mro__` 或 `ClassName.mro()` 查看。Mixin 模式：纯提供方法的基类，用于代码复用。混合使用组合和继承通常优于过度使用多重继承。

---

## 9. 异常处理类

### 9.1 异常

**名称**：异常（Exception）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
异常是程序执行时发生的错误，Python 通过异常机制处理错误而非传统返回码。

**详解**：
异常对象：BaseException → Exception → 具体异常类型。常见异常：ZeroDivisionError、ValueError、TypeError、KeyError、IndexError、FileNotFoundError、AttributeError。异常是类，继承自 Exception。裸 except 子句捕获所有异常（包括 KeyboardInterrupt）。建议明确指定异常类型。

---

### 9.2 try-except 语句

**名称**：异常捕获（try-except Statement）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
try-except 是 Python 的异常处理结构，尝试执行代码，捕获并处理指定的异常。

**详解**：
语法：`try: risky_code except ExceptionType: handler`。多个 except：`except (Type1, Type2):`。获取异常对象：`except Exception as e:`。捕获所有：`except:` 或 `except BaseException:`。异常会向上传播，未捕获的异常导致程序终止。EAFP 风格：先尝试（LBYL vs EAFP）。

---

### 9.3 else 子句

**名称**：else 子句（else Clause）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
try-except 语句中的 else 子句在没有异常发生时执行。

**详解**：
语法：`try: ... except: ... else: ...`。else 在 try 成功执行后、except 之前执行。用途：放 try 块中不适合的代码，避免意外捕获后续代码的异常。让 try-except 结构更清晰：正常流程放 else，异常处理放 except。

---

### 9.4 finally 子句

**名称**：finally 子句（finally Clause）

**首次出现位置**：C03_111-异常处理.md 第1章

**定义**：
finally 子句中的代码无论是否发生异常都会执行，常用于清理资源。

**详解**：
语法：`try: ... finally: ... cleanup`。用途：关闭文件、释放锁、关闭网络连接。无论 try 是否异常、except 是否执行、是否有 return，finally 都会执行。典型模式：`try: f = open(file); process(f) finally: f.close()`。可与 except 和 else 同时使用。

---

### 9.5 raise 语句

**名称**：抛出异常（raise Statement）

**首次出现位置**：C03_111-异常处理.md 第2章

**定义**：
raise 语句主动抛出异常，中断程序执行流程。

**详解**：
语法：`raise ExType()`、`raise ExType(args)`、`raise ExType(args) from original_exc`。重新抛出：`raise`（不带参数）保留原始异常堆栈。raise from 原因：`raise ValueError("invalid") from TypeError` 链接异常。断言：`assert condition, message` 在条件为假时抛出 AssertionError。

---

### 9.6 自定义异常

**名称**：自定义异常（Custom Exception）

**首次出现位置**：C03_111-异常处理.md 第2章

**定义**：
通过继承 Exception 类创建自定义异常类型，用于表达特定领域错误。

**详解**：
定义：`class MyError(Exception): pass`。可添加额外属性和方法。建议异常名以 Error 结尾。标准异常继承树：`BaseException` → `Exception` → 自定义异常。常用模式：定义异常基类，具体异常继承它。示例：`class ValidationError(Exception): def __init__(self, field, message): self.field = field; super().__init__(message)`。

---

## 10. 文件与模块类

### 10.1 文件 I/O

**名称**：文件输入输出（File I/O）

**首次出现位置**：C03_112-文件IO与with.md 第1章

**定义**：
Python 通过内置 open() 函数操作文件，返回文件对象，支持文本和二进制模式读写。

**详解**：
打开：`f = open('file.txt', 'r')`（文本读）、`f = open('file.bin', 'rb')`（二进制读）。模式：r/w/a（文本）、rb/wb/ab（二进制）、r+/w+（读写）。读取：read()（全部）、readline()（一行）、readlines()（所有行到列表）。写入：write()、writelines()。关闭：`f.close()` 或 with 语句自动关闭。

---

### 10.2 with 语句

**名称**：上下文管理器（with Statement）

**首次出现位置**：C03_112-文件IO与with.md 第2章

**定义**：
with 语句用于资源管理，确保资源在使用后正确释放，执行清理代码（调用 **exit**）。

**详解**：
语法：`with expression as target: body`。替代 try-finally 模式：`with open('file') as f: data = f.read()` 自动关闭文件。上下文管理器协议：实现 `__enter__` 和 `__exit__` 方法。contextlib 模块：@contextmanager 装饰器将生成器转为上下文管理器。常用场景：文件、锁、数据库连接、网络连接。

---

### 10.3 模块（module）

**名称**：模块（Module）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
模块是包含 Python 代码的 .py 文件，是代码组织的基本单元，可以定义函数、类、变量供其他模块导入使用。

**详解**：
导入：`import module_name`、`from module_name import name`。模块搜索路径：sys.path（当前目录 → 环境变量 PYTHONPATH → 安装目录）。模块只加载一次，再次 import 不会重新加载。模块属性：`__name__`（模块名，当前执行时为 '**main**'）、`__file__`（文件路径）。标准库：Python 自带的模块集合（os、sys、math 等）。

---

### 10.4 包（package）

**名称**：包（Package）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
包是包含 **init**.py 文件的目录，用于组织多个模块，形成层次化的命名空间。

**详解**：
结构：`package/__init__.py`、`package/module.py`。导入：`from package import module` 或 `from package.module import func`。**init**.py：包初始化文件，Python 3.3+ 可省略但仍建议存在。相对导入：`from . import submodule`（当前包）、`from .. import sibling`（上级包）。`__all__` 列表控制 `from package import *` 的行为。

---

### 10.5 import 语句

**名称**：导入语句（import Statement）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
import 语句用于导入模块、包或其中的成员，使被导入的内容在当前模块中可用。

**详解**：
形式：`import module`、`from module import name`、`import module as alias`。导入顺序：标准库 → 第三方库 → 本地应用。PEP 8：每组 import 之间用空行分隔，按字母顺序排列。推荐：`import numpy as np`（约定俗成的别名）。导入时模块顶层代码会被执行。

---

### 10.6 **name** 属性

**名称**：模块名称（**name** Attribute）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
**name** 是模块的内置属性，当模块直接运行时值为 '**main**'，被导入时值为模块名。

**详解**：
用于模块自测：`if __name__ == '__main__': test_code()`。执行脚本 vs 导入模块的区分。常见模式：测试代码、条件执行。顶层代码：import 时不执行的条件代码。

---

## 11. 标准库类

### 11.1 os 模块

**名称**：操作系统模块（os Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
os 模块提供与操作系统交互的功能，处理文件路径、目录、环境变量、进程管理等任务。

**详解**：
路径操作：os.path.join()、os.path.exists()、os.path.isfile()、os.path.dirname()。目录操作：os.mkdir()、os.makedirs()、os.rmdir()、os.remove()。环境变量：os.getenv()、os.environ['VAR']。其他：os.getcwd()（当前目录）、os.listdir()（目录列表）、os.system()（执行命令）。

---

### 11.2 sys 模块

**名称**：系统模块（sys Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
sys 模块提供访问 Python 解释器相关变量和函数，与 Python 运行时环境交互。

**详解**：
命令行参数：sys.argv（列表）。模块搜索路径：sys.path。标准流：sys.stdin、sys.stdout、sys.stderr。版本信息：sys.version、sys.version_info。退出程序：sys.exit()。Python 实现：sys.implementation、sys.platform（操作系统平台）。

---

### 11.3 re 模块

**名称**：正则表达式模块（re Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
re 模块提供 Perl 风格的正则表达式功能，用于文本模式匹配、搜索、替换等任务。

**详解**：
编译：`re.compile(pattern)` 预编译正则表达式提高效率。匹配函数：match()（从头匹配）、search()（任意位置搜索）、findall()（返回所有匹配列表）、finditer()（返回迭代器）。分组：`()` 捕获分组，`(?:)` 非捕获分组。标志：re.IGNORECASE、re.MULTILINE、re.DOTALL。替换：`re.sub(pattern, replacement, string)`。

---

### 11.4 json 模块

**名称**：JSON 编码解码模块（json Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
json 模块实现 JSON 数据格式的序列化（编码）和反序列化（解码），用于数据交换和存储。

**详解**：
编码：`json.dumps(obj)` Python 对象转 JSON 字符串。解码：`json.loads(json_str)` JSON 字符串转 Python 对象。文件操作：json.dump(obj, f)、json.load(f)。自定义编码：自定义 JSONEncoder 处理特殊类型。常用场景：API 数据交换、配置文件、NoSQL 数据库。

---

### 11.5 datetime 模块

**名称**：日期时间模块（datetime Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
datetime 模块提供日期和时间操作，包括 date、time、datetime、timedelta、tzinfo 等类。

**详解**：
datetime 类：`dt = datetime.now()`、`dt = datetime(2024, 1, 1)`。日期时间操作：dt.year、dt.month、dt.day、dt.hour。格式化：`dt.strftime('%Y-%m-%d %H:%M:%S')`。解析：`datetime.strptime('2024-01-01', '%Y-%m-%d')`。时间差：`timedelta(days=7)` 用于日期加减。时间戳：`datetime.fromtimestamp(ts)`。

---

### 11.6 collections 模块

**名称**：容器数据类型模块（collections Module）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
collections 模块提供 Python 内置容器类型（dict、list、set、tuple）的替代实现，以及创建特殊容器类型的工厂函数。

**详解**：
容器类型：namedtuple、deque、ChainMap、Counter、OrderedDict、defaultdict。 defaultdict：`d = defaultdict(int)`，访问不存在的键返回默认值（int 返回 0）。OrderedDict：Python 3.7+ 普通 dict 已保证顺序，但 OrderedDict 保留特定 API。ChainMap：链接多个字典，按顺序搜索。

---

### 11.7 itertools 模块

**名称**：迭代器工具模块（itertools Module）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
itertools 提供高效迭代器函数，用于创建和操作迭代器，支持无限迭代器、组合、排列等操作。

**详解**：
无限迭代器：count()（计数器）、cycle()（循环）、repeat()（重复）。有限迭代器：chain()（连接）、islice()（切片）、takewhile()（取条件为真）、dropwhile()。组合生成：product()（笛卡尔积）、permutations()（排列）、combinations()（组合）。函数式工具：reduce() 在 functools 模块。

---

### 11.8 functools 模块

**名称**：函数式编程工具模块（functools Module）

**首次出现位置**：C03_107-函数与Lambda.md 第5章

**定义**：
functools 模块提供高阶函数和可调用对象的操作工具，支持函数装饰、缓存、偏函数等。

**详解**：
@ lru_cache(maxsize=128)：装饰器，为函数结果提供缓存。partial()：偏函数，固定函数部分参数。reduce()：对序列进行累计操作。total_ordering：类装饰器，自动实现比较方法。wraps()：装饰器，复制被装饰函数的元数据。cmp_to_key()：将比较函数转为 key 函数。

---

## 12. 进阶特性类

### 12.1 迭代器（iterator）

**名称**：迭代器（Iterator）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
迭代器是实现了 **iter**() 和 **next**() 方法的对象，支持惰性遍历，通过 next() 逐个获取元素。

**详解**：
迭代器协议：`__iter__()` 返回迭代器本身，`__next__()` 返回下一元素。StopIteration：迭代完毕时抛出。迭代器是一次性的，遍历后耗尽。可迭代对象：实现了 **iter**() 或有 **getitem**()。for 循环自动调用 **iter**() 获取迭代器。iter() 函数：从可迭代对象获取迭代器。

---

### 12.2 可迭代对象（iterable）

**名称**：可迭代对象（Iterable）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
可迭代对象是能够返回迭代器的对象，支持 for 循环和 iterator 协议，包括序列（list、tuple、str）、字典、集合、生成器等。

**详解**：
判断：`isinstance(obj, Iterable)` 通过 collections.abc.Iterable。实现 `__iter__()` 使类成为可迭代对象。集合类都实现了 **iter**()。文件对象也是可迭代对象：`for line in f:` 逐行读取。iter() 函数从可迭代对象获取迭代器：`it = iter(obj); next(it)`。

---

### 12.3 上下文管理器（context manager）

**名称**：上下文管理器（Context Manager）

**首次出现位置**：C03_112-文件IO与with.md 第2章

**定义**：
上下文管理器是实现了 **enter**() 和 **exit**() 方法的对象，配合 with 语句使用，自动管理资源获取和释放。

**详解**：
协议方法：`__enter__(self)` 进入上下文时调用，`__exit__(self, exc_type, exc_val, exc_tb)` 退出时调用。异常处理：**exit** 返回 True 可抑制异常，否则异常继续传播。contextlib 模块：@contextmanager 装饰器将生成器转为上下文管理器。contextlib 提供：closing()、suppress()、redirect_stdout() 等。

---

### 12.4 魔术方法（dunder methods）

**名称**：魔术方法（Magic Methods / Dunder Methods）

**首次出现位置**：C03_110-面向对象.md 第5章

**定义**：
魔术方法是以双下划线开头和结尾的特殊方法，如 **init**、**str**、**len**，用于实现语言特性和协议。

**详解**：
构造：`__new__`、`__init__`、`__del__`。属性访问：`__getattr__`、`__setattr__`、`__getattribute__`。容器：`__len__`、`__getitem__`、`__iter__`、`__contains__`。可调用：`__call__`。比较：`__eq__`、`__lt__`、`__le__`。数值运算：`__add__`、`__sub__`、`__mul__`。字符串表示：`__repr__`、`__str__`。

---

### 12.5 元类（metaclass）

**名称**：元类（Metaclass）

**首次出现位置**：C03_110-面向对象.md 第6章

**定义**：
元类是类的类，定义了类的创建和行为。默认元类是 type，通过 metaclass 参数自定义元类创建类。

**详解**：
type 作为元类：`type('ClassName', (Base,), {'attr': value})` 动态创建类。元类用途：自动注册类、修改类属性、实现 ORM、插件系统。**metaclass** 属性（Python 2）或 metaclass 参数（Python 3）。常见元类库：django.db.models.Model（ORM）、SQLAlchemy。复杂的元类使用场景通常可用类装饰器简化。

---

### 12.6 描述符（descriptor）

**名称**：描述符（Descriptor）

**首次出现位置**：C03_110-面向对象.md 第5章

**定义**：
描述符是实现了描述符协议（**get**、**set**、**delete**）的对象，作为类属性使用，控制属性访问行为。

**详解**：
描述符协议：`__get__(self, obj, type)`、`__set__(self, obj, value)`、`__delete__(self, obj)`。数据描述符：同时实现 **get** 和 **set**/**delete**，优先于实例字典。非数据描述符：只实现 **get**，如方法。property 装饰器：使用描述符实现。方法：函数是非数据描述符，`__get__` 将函数转为方法。常见用途：@property、@classmethod、@staticmethod、lazy properties。

---

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
