# Python 专有名词查阅表 - 标准库与语言工具 | Python

> @Version: v4.0.0
> @Module: python
> @Author: fanquanpp
> @Category: Python Standard Library
> @Description: Python 标准库与语言工具名词注释查阅表（运算符、控制流、文件与模块、标准库）
> @Updated: 2026-05-27

---

## 目录

1. [运算符类](#运算符类)
2. [控制流类](#控制流类)
3. [文件与模块类](#文件与模块类)
4. [标准库类](#标准库类)

---

## 1. 运算符类

### 1.1 算术运算符

**名称**：算术运算符（Arithmetic Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
算术运算符包括：+（加）、-（减）、*（乘）、/（除）、//（整除）、%（取模）、**（幂）。

**详解**：
`/` 总是返回 float：`5 / 2 = 2.5`。`//` 整除向下取整：`-5 // 2 = -3`。`%` 结果与除数同号：`7 % -3 = -2`（Python 独有）。`**` 幂运算符：`2 ** 3 = 8`，支持分数指数：`4 ** 0.5 = 2.0`。支持复数运算：`(1+2j) ** 2 = (-3+4j)`。

---

### 1.2 比较运算符

**名称**：比较运算符（Comparison Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
比较运算符包括：==（等于）、!=（不等于）、<（小于）、>（大于）、<=（小于等于）、>=（大于等于）。

**详解**：
比较结果返回 True 或 False。可以链式比较：`0 < x < 10` 等价于 `0 < x and x < 10`。字符串比较：按字典序逐字符比较。列表/元组比较：从左到右逐元素比较。is 与 == 区别：is 比较身份（内存地址），== 比较值。浮点数比较用 tolerance：`abs(a - b) < 1e-9`。

---

### 1.3 逻辑运算符

**名称**：逻辑运算符（Logical Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
逻辑运算符包括：and（逻辑与）、or（逻辑或）、not（逻辑非）。

**详解**：
短路求值：and 左边为假则不计算右边直接返回假值，or 左边为真则不计算右边直接返回真值。返回实际值而非布尔：`(1 and 5)` 返回 5（最后一个被计算的表达式的值）。not 返回布尔：`not 1` 返回 False。布尔优先级：not > and > or。

---

### 1.4 位运算符

**名称**：位运算符（Bitwise Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
位运算符直接操作整数的二进制位：&（按位与）、|（按位或）、^（按位异或）、~（按位取反）、<<（左移）、>>（右移）。

**详解**：
`~n = -(n+1)`（按位取反公式）。左移：`x << n` 等价于 `x * 2**n`。右移：`x >> n` 等价于 `x // 2**n`（整数除法）。负数右移：算术右移，高位补符号位。常用技巧：设置位 `flags | BIT`、清除位 `flags & ~BIT`、测试位 `flags & BIT`。

---

### 1.5 成员运算符

**名称**：成员运算符（Membership Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
成员运算符用于测试值是否在序列（列表、元组、字符串、字典等）中：in（在）、not in（不在）。

**详解**：
序列：`x in ['a', 'b', 'c']` 返回 True/False。字典：检查键而非值：`'name' in {'name': 'Tom'}` 为 True。字符串：`'sub' in 'substring'` 支持子串测试。字典的 values()、items()：需明确使用。性能：list 是 O(n)，set 和 dict 是 O(1)。

---

### 1.6 身份运算符

**名称**：身份运算符（Identity Operators）

**首次出现位置**：C03_105-运算符与表达式.md 第1章

**定义**：
身份运算符 is 和 is not 用于比较两个对象的内存地址，判断是否是同一对象。

**详解**：
`is`：检查是否是同一个对象（id 相同）。`is not`：检查是否不是同一对象。小整数池：Python 缓存 -5 到 256 的整数，这些整数比较时用 is 也返回 True。但不建议用 is 比较整数。适用场景：判断 None（`x is None`）、单例模式、类型判断（但用 isinstance 更好）。

---

## 2. 控制流类

### 2.1 if-elif-else 语句

**名称**：条件语句（if-elif-else Statement）

**首次出现位置**：C03_106-控制流.md 第1章

**定义**：
if-elif-else 是 Python 的条件分支结构，根据条件真假决定执行哪个代码块。

**详解**：
语法：`if condition1: ... elif condition2: ... else: ...`。elif 是 else if 的缩写。条件可以是任意表达式，结果转为布尔。else 可省略。if 可嵌套。唯一假值：None、False、0、0.0、''、()、[]、{}、set()、range(0)。match-case（Python 3.10+）是更强大的模式匹配语法。

---

### 2.2 while 循环

**名称**：while 循环（while Loop）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
while 是 Python 的前测试循环，当条件为真时重复执行循环体，可能一次都不执行。

**详解**：
语法：`while condition: loop_body`。必须有改变条件的语句，否则死循环。else 子句：循环正常结束（非 break）时执行 `while ... else: ...`。break：跳出循环。continue：跳过本次迭代。示例：`while True: user_input = input('>'); if user_input == 'quit': break`。

---

### 2.3 for 循环

**名称**：for 循环（for Loop）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
for 是 Python 的遍历循环，用于迭代序列（列表、元组、字符串、字典、文件等）或可迭代对象。

**详解**：
语法：`for item in iterable: loop_body`。range() 生成数字序列：`for i in range(5):` 迭代 0-4。enumerate() 同时获取索引和值：`for i, v in enumerate(list):`。zip() 并行迭代多个序列：`for a, b in zip(list1, list2):`。字典迭代：`for key in d:`（键）、`for value in d.values():`、`for k, v in d.items():`。

---

### 2.4 range 对象

**名称**：range 对象（Range Object）

**首次出现位置**：C03_106-控制流.md 第2章

**定义**：
range 是 Python 3 的不可变序列类型，生成算术序列的惰性对象，占用内存极小，常用于循环计数。

**详解**：
语法：`range(start, stop, step)`，包含 start、不包含 stop。创建：`range(5)`（0-4）、`range(1, 6)`（1-5）、`range(0, 10, 2)`（0,2,4,6,8）。range 对象不支持切片（Python 3.12+ 支持部分切片）。优点：不占用大量内存：`list(range(10**6))` 会创建大列表，但 `range(10**6)` 几乎不占内存。

---

### 2.5 break 语句

**名称**：break 语句（break Statement）

**首次出现位置**：C03_106-控制流.md 第3章

**定义**：
break 用于立即终止 while 或 for 循环，跳到循环体之外的下一条语句。

**详解**：
break 只终止最内层循环（多层嵌套时）。for-else：循环正常结束（非 break 终止）时执行 else 块。常见模式：搜索：`for item in items: if match: result = item; break`。无限循环+break：`while True: if condition: break`。

---

### 2.6 continue 语句

**名称**：continue 语句（continue Statement）

**首次出现位置**：C03_106-控制流.md 第3章

**定义**：
continue 跳过本次循环剩余语句，立即开始下一次迭代。

**详解**：
continue 跳回循环条件判断（while）或下一个元素迭代（for）。用于跳过不需要处理的元素：`for i in range(10): if i % 2 == 0: continue; process_odd(i)`。减少嵌套层级，使代码更清晰。

---

### 2.7 列表推导式

**名称**：列表推导式（List Comprehension）

**首次出现位置**：C03_109-推导式与生成器.md 第1章

**定义**：
列表推导式是 Python 的简洁语法，从可迭代对象快速创建列表，格式：`[expr for item in iterable if condition]`。

**详解**：
基本形式：`[x*2 for x in range(5)]` 生成 [0, 2, 4, 6, 8]。带条件：`[x for x in range(10) if x % 2 == 0]` 筛选偶数。嵌套：`[x+y for x in [1,2] for y in [3,4]]` 产生 [4,5,5,6]。生成器表达式：`gen = (x*2 for x in range(5))` 用圆括号，省内存。字典/集合推导式：{k:v for ...}、{x for x ...}。

---

### 2.8 生成器

**名称**：生成器（Generator）

**首次出现位置**：C03_109-推导式与生成器.md 第3章

**定义**：
生成器是惰性求值的迭代器，通过 yield 语句逐个产生元素，不一次性生成所有元素，节省内存。

**详解**：
生成器函数：用 yield 关键字返回值的函数。调用生成器函数返回生成器对象，而非执行函数体。逐次迭代：`next(gen)` 获取下一个值。生成器用尽后抛出 StopIteration。生成器优势：处理大数据流、无需全部加载到内存。示例：`def count(n): for i in range(n): yield i`。

---

### 2.9 yield

**名称**：yield 语句（yield）

**首次出现位置**：C03_109-推导式与生成器.md 第3章

**定义**：
yield 是 Python 的关键字，用于生成器函数中向调用者返回一个值，并暂停函数状态，下次迭代时从 yield 处继续。

**详解**：
yield 与 return：return 终止函数并返回值，yield 暂停函数并返回值。生成器函数：包含 yield 的函数。send()：生成器支持 send(value) 向生成器内部发送值，恢复并传递值给 yield 表达式。yield from：委托给子迭代器（Python 3.3+）。

---

## 3. 文件与模块类

### 3.1 文件 I/O

**名称**：文件输入输出（File I/O）

**首次出现位置**：C03_112-文件IO与with.md 第1章

**定义**：
Python 通过内置 open() 函数操作文件，返回文件对象，支持文本和二进制模式读写。

**详解**：
打开：`f = open('file.txt', 'r')`（文本读）、`f = open('file.bin', 'rb')`（二进制读）。模式：r/w/a（文本）、rb/wb/ab（二进制）、r+/w+（读写）。读取：read()（全部）、readline()（一行）、readlines()（所有行到列表）。写入：write()、writelines()。关闭：`f.close()` 或 with 语句自动关闭。

---

### 3.2 with 语句

**名称**：上下文管理器（with Statement）

**首次出现位置**：C03_112-文件IO与with.md 第2章

**定义**：
with 语句用于资源管理，确保资源在使用后正确释放，执行清理代码（调用 **exit**）。

**详解**：
语法：`with expression as target: body`。替代 try-finally 模式：`with open('file') as f: data = f.read()` 自动关闭文件。上下文管理器协议：实现 `__enter__` 和 `__exit__` 方法。contextlib 模块：@contextmanager 装饰器将生成器转为上下文管理器。常用场景：文件、锁、数据库连接、网络连接。

---

### 3.3 模块（module）

**名称**：模块（Module）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
模块是包含 Python 代码的 .py 文件，是代码组织的基本单元，可以定义函数、类、变量供其他模块导入使用。

**详解**：
导入：`import module_name`、`from module_name import name`。模块搜索路径：sys.path（当前目录 → 环境变量 PYTHONPATH → 安装目录）。模块只加载一次，再次 import 不会重新加载。模块属性：`__name__`（模块名，当前执行时为 '**main**'）、`__file__`（文件路径）。标准库：Python 自带的模块集合（os、sys、math 等）。

---

### 3.4 包（package）

**名称**：包（Package）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
包是包含 **init**.py 文件的目录，用于组织多个模块，形成层次化的命名空间。

**详解**：
结构：`package/__init__.py`、`package/module.py`。导入：`from package import module` 或 `from package.module import func`。**init**.py：包初始化文件，Python 3.3+ 可省略但仍建议存在。相对导入：`from . import submodule`（当前包）、`from .. import sibling`（上级包）。`__all__` 列表控制 `from package import *` 的行为。

---

### 3.5 import 语句

**名称**：导入语句（import Statement）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
import 语句用于导入模块、包或其中的成员，使被导入的内容在当前模块中可用。

**详解**：
形式：`import module`、`from module import name`、`import module as alias`。导入顺序：标准库 → 第三方库 → 本地应用。PEP 8：每组 import 之间用空行分隔，按字母顺序排列。推荐：`import numpy as np`（约定俗成的别名）。导入时模块顶层代码会被执行。

---

### 3.6 **name** 属性

**名称**：模块名称（**name** Attribute）

**首次出现位置**：C03_113-模块与包.md 第1章

**定义**：
**name** 是模块的内置属性，当模块直接运行时值为 '**main**'，被导入时值为模块名。

**详解**：
用于模块自测：`if __name__ == '__main__': test_code()`。执行脚本 vs 导入模块的区分。常见模式：测试代码、条件执行。顶层代码：import 时不执行的条件代码。

---

## 4. 标准库类

### 4.1 os 模块

**名称**：操作系统模块（os Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
os 模块提供与操作系统交互的功能，处理文件路径、目录、环境变量、进程管理等任务。

**详解**：
路径操作：os.path.join()、os.path.exists()、os.path.isfile()、os.path.dirname()。目录操作：os.mkdir()、os.makedirs()、os.rmdir()、os.remove()。环境变量：os.getenv()、os.environ['VAR']。其他：os.getcwd()（当前目录）、os.listdir()（目录列表）、os.system()（执行命令）。

---

### 4.2 sys 模块

**名称**：系统模块（sys Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
sys 模块提供访问 Python 解释器相关变量和函数，与 Python 运行时环境交互。

**详解**：
命令行参数：sys.argv（列表）。模块搜索路径：sys.path。标准流：sys.stdin、sys.stdout、sys.stderr。版本信息：sys.version、sys.version_info。退出程序：sys.exit()。Python 实现：sys.implementation、sys.platform（操作系统平台）。

---

### 4.3 re 模块

**名称**：正则表达式模块（re Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
re 模块提供 Perl 风格的正则表达式功能，用于文本模式匹配、搜索、替换等任务。

**详解**：
编译：`re.compile(pattern)` 预编译正则表达式提高效率。匹配函数：match()（从头匹配）、search()（任意位置搜索）、findall()（返回所有匹配列表）、finditer()（返回迭代器）。分组：`()` 捕获分组，`(?:)` 非捕获分组。标志：re.IGNORECASE、re.MULTILINE、re.DOTALL。替换：`re.sub(pattern, replacement, string)`。

---

### 4.4 json 模块

**名称**：JSON 编码解码模块（json Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
json 模块实现 JSON 数据格式的序列化（编码）和反序列化（解码），用于数据交换和存储。

**详解**：
编码：`json.dumps(obj)` Python 对象转 JSON 字符串。解码：`json.loads(json_str)` JSON 字符串转 Python 对象。文件操作：json.dump(obj, f)、json.load(f)。自定义编码：自定义 JSONEncoder 处理特殊类型。常用场景：API 数据交换、配置文件、NoSQL 数据库。

---

### 4.5 datetime 模块

**名称**：日期时间模块（datetime Module）

**首次出现位置**：C03_101-概述与环境.md 第4章

**定义**：
datetime 模块提供日期和时间操作，包括 date、time、datetime、timedelta、tzinfo 等类。

**详解**：
datetime 类：`dt = datetime.now()`、`dt = datetime(2024, 1, 1)`。日期时间操作：dt.year、dt.month、dt.day、dt.hour。格式化：`dt.strftime('%Y-%m-%d %H:%M:%S')`。解析：`datetime.strptime('2024-01-01', '%Y-%m-%d')`。时间差：`timedelta(days=7)` 用于日期加减。时间戳：`datetime.fromtimestamp(ts)`。

---

### 4.6 collections 模块

**名称**：容器数据类型模块（collections Module）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
collections 模块提供 Python 内置容器类型（dict、list、set、tuple）的替代实现，以及创建特殊容器类型的工厂函数。

**详解**：
容器类型：namedtuple、deque、ChainMap、Counter、OrderedDict、defaultdict。 defaultdict：`d = defaultdict(int)`，访问不存在的键返回默认值（int 返回 0）。OrderedDict：Python 3.7+ 普通 dict 已保证顺序，但 OrderedDict 保留特定 API。ChainMap：链接多个字典，按顺序搜索。

---

### 4.7 itertools 模块

**名称**：迭代器工具模块（itertools Module）

**首次出现位置**：C03_108-内置数据结构.md 第4章

**定义**：
itertools 提供高效迭代器函数，用于创建和操作迭代器，支持无限迭代器、组合、排列等操作。

**详解**：
无限迭代器：count()（计数器）、cycle()（循环）、repeat()（重复）。有限迭代器：chain()（连接）、islice()（切片）、takewhile()（取条件为真）、dropwhile()。组合生成：product()（笛卡尔积）、permutations()（排列）、combinations()（组合）。函数式工具：reduce() 在 functools 模块。

---

### 4.8 functools 模块

**名称**：函数式编程工具模块（functools Module）

**首次出现位置**：C03_107-函数与Lambda.md 第5章

**定义**：
functools 模块提供高阶函数和可调用对象的操作工具，支持函数装饰、缓存、偏函数等。

**详解**：
@ lru_cache(maxsize=128)：装饰器，为函数结果提供缓存。partial()：偏函数，固定函数部分参数。reduce()：对序列进行累计操作。total_ordering：类装饰器，自动实现比较方法。wraps()：装饰器，复制被装饰函数的元数据。cmp_to_key()：将比较函数转为 key 函数。

---

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
- 2026-05-27：从 V03_101 拆分为独立文件，v4.0.0
