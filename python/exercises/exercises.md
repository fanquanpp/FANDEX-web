# Python 练习题
 False
 False> @Module: python
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 以下代码输出什么？
 False
```python
 Truea = [1, 2, 3]
 Trueb = a
 Trueb.append(4)
 Trueprint(len(a))
 True```

 FalseA. 3
 FalseB. 4
 FalseC. 报错
 FalseD. 1
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: Python 中列表赋值 `b = a` 是引用赋值，`a` 和 `b` 指向同一个列表对象。对 `b` 的修改会反映到 `a` 上，因此 `a` 变为 `[1, 2, 3, 4]`，长度为 4。若需独立副本，应使用 `b = a.copy()` 或 `b = a[:]`。
 False</details>
 False
 False### 2. 关于 Python 函数参数，以下说法错误的是？
 False
 FalseA. 默认参数在函数定义时求值，而非调用时
 FalseB. 可变默认参数（如列表）会在多次调用间共享
 FalseC. `*args` 接收关键字参数
 FalseD. `**kwargs` 接收多余的关键字参数并组成字典
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `*args` 接收的是位置参数（组成元组），`**kwargs` 接收关键字参数（组成字典）。这是常见的混淆点。
 False</details>
 False
 False### 3. 以下代码的输出是？
 False
```python
 Trueclass Parent:
 True x = 1
 True
 Trueclass Child(Parent):
 True pass
 True
 TrueParent.x = 2
 Trueprint(Child.x)
 True```

 FalseA. 1
 FalseB. 2
 FalseC. AttributeError
 FalseD. None
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `Child` 继承自 `Parent`，自身没有 `x` 属性，因此通过 MRO 查找到 `Parent.x`。当 `Parent.x` 被修改为 2 时，`Child.x` 也返回 2。如果 `Child.x = 3` 先执行，则 `Child` 会有自己的 `x` 属性。
 False</details>
 False
 False### 4. 以下推导式的结果是？
 False
```python
 Trueresult = [x**2 for x in range(6) if x % 2 == 0]
 True```

 FalseA. [0, 4, 16]
 FalseB. [0, 2, 4]
 FalseC. [4, 16]
 FalseD. [0, 4, 16, 36]
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: A
 False
 False**解析**: `range(6)` 产生 0,1,2,3,4,5；`x % 2 == 0` 筛选偶数 0,2,4；对每个取平方得 0,4,16。
 False</details>
 False
 False### 5. 使用 `with open('f.txt', 'r') as f` 的优势是？
 False
 FalseA. 读取速度更快
 FalseB. 自动关闭文件，即使发生异常
 FalseC. 支持并发读取
 FalseD. 自动处理编码问题
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `with` 语句是上下文管理器，保证在代码块退出时（包括异常情况）自动调用 `f.close()`，避免资源泄漏。
 False</details>
 False
 False## 编程题
 False
 False### 1. 词频统计
 False
 False编写函数 `word_count(text: str) -> dict`，统计字符串中每个单词出现的次数，忽略大小写和标点。
 False
 False**输入**: `"Hello, hello! World. world? Python; python."`
 False**输出**: `{'hello': 2, 'world': 2, 'python': 2}`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueimport re
 Truefrom collections import Counter
 True
 Truedef word_count(text: str) -> dict:
 True words = re.findall(r'[a-zA-Z]+', text.lower())
 True return dict(Counter(words))
 True```
</details>
 False
 False### 2. 实现一个简单的栈类
 False
 False用面向对象方式实现一个栈 `Stack`，支持 `push`、`pop`、`peek`、`is_empty` 和 `size` 操作。
 False
 False**输入**: 依次 push(1), push(2), pop()
 False**输出**: pop 返回 2，栈中剩余 [1]
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueclass Stack:
 True def __init__(self):
 True self._items = []
 True
 True def push(self, item):
 True self._items.append(item)
 True
 True def pop(self):
 True if self.is_empty():
 True raise IndexError("pop from empty stack")
 True return self._items.pop()
 True
 True def peek(self):
 True if self.is_empty():
 True raise IndexError("peek from empty stack")
 True return self._items[-1]
 True
 True def is_empty(self):
 True return len(self._items) == 0
 True
 True def size(self):
 True return len(self._items)
 True```
</details>
 False
 False### 3. CSV 文件处理
 False
 False编写函数 `process_csv(filepath: str) -> dict`，读取 CSV 文件（含表头），返回每列的平均值（仅处理数值列）。
 False
 False**输入**: CSV 文件内容：
```
 Truename,age,score
 TrueAlice,25,90
 TrueBob,30,85
 TrueCharlie,28,95
 True```

 False**输出**: `{'age': 27.67, 'score': 90.0}`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```python
 Trueimport csv
 True
 Truedef process_csv(filepath: str) -> dict:
 True with open(filepath, 'r', encoding='utf-8') as f:
 True reader = csv.DictReader(f)
 True columns = reader.fieldnames
 True numeric_data = {col: [] for col in columns}
 True for row in reader:
 True for col in columns:
 True try:
 True numeric_data[col].append(float(row[col]))
 True except (ValueError, TypeError):
 True pass
 True return {
 True col: round(sum(vals) / len(vals), 2)
 True for col, vals in numeric_data.items()
 True if vals
 True }
 True```
</details>
 False