# Python 专有名词查阅表 - 核心语言概念 | Python

> @Version: v4.0.0
> @Module: python
> @Author: fanquanpp
> @Category: Python Basics
> @Description: Python 核心语言概念名词注释查阅表（基础概念、数据类型、数据结构、语法结构）
> @Updated: 2026-05-27

---

## 目录

1. [基础概念类](#基础概念类)
2. [数据类型类](#数据类型类)
3. [数据结构类](#数据结构类)
4. [语法结构类](#语法结构类)

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

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
- 2026-05-27：从 V03_101 拆分为独立文件，v4.0.0
