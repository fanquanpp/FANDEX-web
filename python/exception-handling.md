# 异常处理 (Error & Exception Handling)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 异常体系结构、Try-Except-Finally 捕获及自定义异常。 | Exception hierarchy, try-except-finally, and custom exceptions.
 False
 False---
 False
 False## 目录
 False
 False1. [异常体系](#异常体系)
 False2. [捕获处理](#捕获处理)
 False3. [抛出异常](#抛出异常)
 False4. [断言](#断言)
 False5. [自定义异常](#自定义异常)
 False6. [异常处理的最佳实践](#异常处理的最佳实践)
 False7. [上下文管理器与异常处理](#上下文管理器与异常处理)
 False8. [实际应用示例](#实际应用示例)
 False9. [异常处理的性能考虑](#异常处理的性能考虑)
 False
 False---
 False
 False## 1. 异常体系 (Exception Hierarchy)
 False
 FalsePython 中的所有异常都派生自 `BaseException` 类，形成了一个层次结构。
 False
 False### 1.1 异常层次结构
 False
```
 TrueBaseException
 True├── SystemExit
 True├── KeyboardInterrupt
 True├── GeneratorExit
 True└── Exception
 True ├── ArithmeticError
 True │ ├── FloatingPointError
 True │ ├── OverflowError
 True │ └── ZeroDivisionError
 True ├── AssertionError
 True ├── AttributeError
 True ├── EOFError
 True ├── ImportError
 True ├── LookupError
 True │ ├── IndexError
 True │ └── KeyError
 True ├── NameError
 True ├── OSError
 True │ ├── FileNotFoundError
 True │ └── PermissionError
 True ├── SyntaxError
 True ├── TypeError
 True └── ValueError
 True```

 False### 1.2 常见异常类型
 False
 False| 异常类型 | 描述 | 示例 |
 False|---------|------|------|
 False| `ZeroDivisionError` | 除数为零 | `1 / 0` |
 False| `TypeError` | 类型错误 | `"2" + 2` |
 False| `ValueError` | 值错误 | `int("abc")` |
 False| `IndexError` | 索引越界 | `[1, 2, 3][5]` |
 False| `KeyError` | 字典键不存在 | `{"a": 1}["b"]` |
 False| `FileNotFoundError` | 文件未找到 | `open("non_existent.txt")` |
 False| `PermissionError` | 权限错误 | `open("/etc/passwd", "w")` |
 False| `NameError` | 名称未定义 | `print(undefined_variable)` |
 False| `SyntaxError` | 语法错误 | `if True print("Hello")` |
 False| `AttributeError` | 属性不存在 | `"string".undefined_method()` |
 False
 False## 2. 捕获处理 (Try-Except)
 False
 False### 2.1 基本语法
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True result = 10 / 0
 Trueexcept ZeroDivisionError as e:
 True # 捕获特定异常
 True print(f"Error: {e}")
 Trueelse:
 True # 无异常时执行
 True print("Success!")
 Truefinally:
 True # 无论是否有异常都执行
 True print("Cleanup done.")
 True```

 False### 2.2 捕获多种异常
 False
```python
 Truetry:
 True # 可能引发多种异常的代码
 True value = int(input("Enter a number: "))
 True result = 10 / value
 Trueexcept ValueError as e:
 True # 捕获值错误
 True print(f"Invalid input: {e}")
 Trueexcept ZeroDivisionError as e:
 True # 捕获除零错误
 True print(f"Cannot divide by zero: {e}")
 Trueexcept Exception as e:
 True # 捕获其他所有异常
 True print(f"An error occurred: {e}")
 True```

 False### 2.3 捕获异常的元组
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True value = int(input("Enter a number: "))
 True result = 10 / value
 Trueexcept (ValueError, ZeroDivisionError) as e:
 True # 捕获多种异常
 True print(f"Error: {e}")
 True```

 False### 2.4 无异常时执行 (else 子句)
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True result = 10 / 2
 Trueexcept ZeroDivisionError:
 True print("Cannot divide by zero")
 Trueelse:
 True # 无异常时执行
 True print(f"Result: {result}")
 Truefinally:
 True print("Execution completed")
 True```

 False### 2.5 无论是否有异常都执行 (finally 子句)
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True file = open("data.txt", "r")
 True content = file.read()
 Trueexcept FileNotFoundError:
 True print("File not found")
 Truefinally:
 True # 无论是否有异常都执行，用于清理资源
 True if 'file' in locals():
 True file.close()
 True print("File handling completed")
 True```

 False## 3. 抛出异常 (Raise)
 False
 False### 3.1 基本用法
 False
```python
 Truedef divide(a, b):
 True if b == 0:
 True raise ZeroDivisionError("Cannot divide by zero")
 True return a / b
 True
 True# 使用
 Truetry:
 True result = divide(10, 0)
 Trueexcept ZeroDivisionError as e:
 True print(f"Error: {e}")
 True```

 False### 3.2 重新抛出异常
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True result = 10 / 0
 Trueexcept ZeroDivisionError as e:
 True print(f"Caught an error: {e}")
 True # 重新抛出异常
 True raise
 True```

 False### 3.3 抛出异常并指定原因
 False
```python
 Truetry:
 True # 可能引发异常的代码
 True value = int("abc")
 Trueexcept ValueError as e:
 True # 抛出新异常并指定原因
 True raise ValueError("Invalid input") from e
 True```

 False## 4. 断言 (Assert)
 False
 False断言用于调试和内部检查，当条件为 False 时会引发 `AssertionError` 异常。
 False
 False### 4.1 基本用法
 False
```python
 Truedef calculate_discount(price, discount):
 True # 断言折扣必须在 0 到 1 之间
 True assert 0 <= discount < 1, "Discount must be between 0 and 1"
 True return price * (1 - discount)
 True
 True# 使用
 Trueprint(calculate_discount(100, 0.2)) # 输出: 80.0
 True# print(calculate_discount(100, 1.5)) # 引发 AssertionError: Discount must be between 0 and 1
 True```

 False### 4.2 断言的使用场景
 False
 False- **调试**：在开发阶段检查条件是否满足
 False- **代码文档**：明确函数的前置条件
 False- **内部检查**：确保代码逻辑的正确性
 False
 False### 4.3 注意事项
 False
 False- 断言可以通过 `-O` 选项禁用，因此不应该用于处理运行时错误
 False- 断言失败会直接终止程序，因此应该只用于开发和测试阶段
 False
 False## 5. 自定义异常 (Custom Exception)
 False
 False### 5.1 基本自定义异常
 False
```python
 Trueclass MyError(Exception):
 True """自定义异常类"""
 True pass
 True
 True# 使用
 Truetry:
 True raise MyError("This is a custom error")
 Trueexcept MyError as e:
 True print(f"Caught custom error: {e}")
 True```

 False### 5.2 带额外属性的自定义异常
 False
```python
 Trueclass BusinessError(Exception):
 True """业务异常类"""
 True def __init__(self, message, error_code):
 True super().__init__(message)
 True self.error_code = error_code
 True
 True# 使用
 Truetry:
 True raise BusinessError("Insufficient funds", 4001)
 Trueexcept BusinessError as e:
 True print(f"Error: {e}")
 True print(f"Error code: {e.error_code}")
 True```

 False### 5.3 异常层次结构
 False
```python
 Trueclass BaseError(Exception):
 True """基础异常类"""
 True pass
 True
 Trueclass AuthenticationError(BaseError):
 True """认证异常"""
 True pass
 True
 Trueclass AuthorizationError(BaseError):
 True """授权异常"""
 True pass
 True
 Trueclass NotFoundError(BaseError):
 True """资源未找到异常"""
 True pass
 True
 True# 使用
 Truetry:
 True raise AuthenticationError("Invalid credentials")
 Trueexcept BaseError as e:
 True print(f"Base error: {e}")
 Trueexcept Exception as e:
 True print(f"Other error: {e}")
 True```

 False## 6. 异常处理的最佳实践
 False
 False### 6.1 只捕获必要的异常
 False
```python
 True# 不好的做法
 Truetry:
 True # 可能引发多种异常的代码
 True value = int(input("Enter a number: "))
 True result = 10 / value
 Trueexcept:
 True # 捕获所有异常，包括系统退出等
 True print("An error occurred")
 True
 True# 好的做法
 Truetry:
 True value = int(input("Enter a number: "))
 True result = 10 / value
 Trueexcept ValueError:
 True print("Invalid input")
 Trueexcept ZeroDivisionError:
 True print("Cannot divide by zero")
 True```

 False### 6.2 提供具体的错误信息
 False
```python
 True# 不好的做法
 Truetry:
 True file = open("data.txt", "r")
 Trueexcept FileNotFoundError:
 True print("Error")
 True
 True# 好的做法
 Truetry:
 True file = open("data.txt", "r")
 Trueexcept FileNotFoundError as e:
 True print(f"Error opening file: {e}")
 True```

 False### 6.3 使用 finally 或 with 语句清理资源
 False
```python
 True# 使用 finally
 Truetry:
 True file = open("data.txt", "r")
 True content = file.read()
 Trueexcept FileNotFoundError:
 True print("File not found")
 Truefinally:
 True if 'file' in locals():
 True file.close()
 True
 True# 使用 with 语句（更简洁）
 Truetry:
 True with open("data.txt", "r") as file:
 True content = file.read()
 Trueexcept FileNotFoundError:
 True print("File not found")
 True# 文件会自动关闭
 True```

 False### 6.4 避免过度使用异常
 False
```python
 True# 不好的做法
 Truetry:
 True value = int(input("Enter a number: "))
 Trueexcept ValueError:
 True print("Invalid input")
 True
 True# 好的做法（对于简单的输入验证）
 Trueuser_input = input("Enter a number: ")
 Trueif user_input.isdigit():
 True value = int(user_input)
 Trueelse:
 True print("Invalid input")
 True```

 False### 6.5 合理使用异常层次结构
 False
```python
 Truedef process_data(data):
 True try:
 True # 处理数据
 True pass
 True except AuthenticationError:
 True # 处理认证错误
 True pass
 True except AuthorizationError:
 True # 处理授权错误
 True pass
 True except BaseError as e:
 True # 处理其他业务错误
 True pass
 True except Exception as e:
 True # 处理系统错误
 True pass
 True```

 False## 7. 上下文管理器与异常处理
 False
 False### 7.1 使用 `with` 语句
 False
 False`with` 语句用于管理资源，确保资源在使用后被正确释放，即使发生异常。
 False
```python
 True# 使用 with 语句打开文件
 Truewith open("data.txt", "r") as file:
 True content = file.read()
 True print(content)
 True# 文件会自动关闭
 True
 True# 使用 with 语句处理多个资源
 Truewith open("input.txt", "r") as infile, open("output.txt", "w") as outfile:
 True content = infile.read()
 True outfile.write(content)
 True# 两个文件都会自动关闭
 True```

 False### 7.2 自定义上下文管理器
 False
```python
 Trueclass MyContextManager:
 True def __enter__(self):
 True """进入上下文时执行"""
 True print("Entering context")
 True return self
 True 
 True def __exit__(self, exc_type, exc_val, exc_tb):
 True """退出上下文时执行"""
 True print("Exiting context")
 True if exc_type:
 True print(f"An exception occurred: {exc_val}")
 True # 返回 True 表示异常已处理，返回 False 表示异常需要继续传播
 True return False
 True
 True# 使用自定义上下文管理器
 Truewith MyContextManager() as cm:
 True print("Inside context")
 True # 引发异常
 True raise ValueError("Test error")
 True# 输出:
 True# Entering context
 True# Inside context
 True# Exiting context
 True# An exception occurred: Test error
 True# Traceback (most recent call last):
 True# ...
 True# ValueError: Test error
 True```

 False## 8. 实际应用示例
 False
 False### 8.1 文件操作
 False
```python
 Truedef read_file(file_path):
 True """读取文件内容"""
 True try:
 True with open(file_path, "r", encoding="utf-8") as file:
 True content = file.read()
 True return content
 True except FileNotFoundError:
 True print(f"Error: File '{file_path}' not found")
 True return None
 True except PermissionError:
 True print(f"Error: Permission denied for '{file_path}'")
 True return None
 True except UnicodeDecodeError:
 True print(f"Error: Unable to decode file '{file_path}'")
 True return None
 True
 True# 使用
 Truecontent = read_file("data.txt")
 Trueif content:
 True print(f"File content: {content[:100]}...")
 True```

 False### 8.2 网络请求
 False
```python
 Trueimport requests
 True
 Truedef fetch_data(url):
 True """获取网络数据"""
 True try:
 True response = requests.get(url, timeout=5)
 True response.raise_for_status() # 引发 HTTP 错误
 True return response.json()
 True except requests.exceptions.Timeout:
 True print("Error: Request timed out")
 True return None
 True except requests.exceptions.HTTPError as e:
 True print(f"Error: HTTP error - {e}")
 True return None
 True except requests.exceptions.ConnectionError:
 True print("Error: Connection error")
 True return None
 True except ValueError:
 True print("Error: Invalid JSON response")
 True return None
 True
 True# 使用
 Truedata = fetch_data("https://api.example.com/data")
 Trueif data:
 True print(f"Data received: {data}")
 True```

 False### 8.3 数据库操作
 False
```python
 Trueimport sqlite3
 True
 Truedef get_user(user_id):
 True """从数据库获取用户信息"""
 True try:
 True conn = sqlite3.connect("users.db")
 True cursor = conn.cursor()
 True cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
 True user = cursor.fetchone()
 True return user
 True except sqlite3.Error as e:
 True print(f"Database error: {e}")
 True return None
 True finally:
 True if 'conn' in locals():
 True conn.close()
 True
 True# 使用
 Trueuser = get_user(1)
 Trueif user:
 True print(f"User: {user}")
 True```

 False### 8.4 业务逻辑
 False
```python
 Trueclass InsufficientFundsError(Exception):
 True """余额不足异常"""
 True pass
 True
 Trueclass Account:
 True def __init__(self, balance):
 True self.balance = balance
 True 
 True def withdraw(self, amount):
 True if amount > self.balance:
 True raise InsufficientFundsError(f"Insufficient funds. Balance: {self.balance}, Requested: {amount}")
 True self.balance -= amount
 True return self.balance
 True
 True# 使用
 Truetry:
 True account = Account(1000)
 True new_balance = account.withdraw(1500)
 True print(f"New balance: {new_balance}")
 Trueexcept InsufficientFundsError as e:
 True print(f"Error: {e}")
 True```

 False## 9. 异常处理的性能考虑
 False
 False### 9.1 异常的开销
 False
 False异常处理会带来一定的性能开销，尤其是在频繁发生异常的情况下。因此，对于预期可能发生的情况，应该使用条件检查而不是异常处理。
 False
```python
 True# 性能较差的做法（频繁引发异常）
 Truedef process_values(values):
 True results = []
 True for value in values:
 True try:
 True results.append(1 / value)
 True except ZeroDivisionError:
 True results.append(0)
 True return results
 True
 True# 性能较好的做法（使用条件检查）
 Truedef process_values(values):
 True results = []
 True for value in values:
 True if value != 0:
 True results.append(1 / value)
 True else:
 True results.append(0)
 True return results
 True```

 False### 9.2 异常处理的最佳实践
 False
 False- 只在真正意外的情况下使用异常
 False- 对于预期的错误情况，使用条件检查
 False- 保持异常处理代码简洁
 False- 避免在循环中频繁引发异常
 False- 合理使用异常层次结构，便于维护
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充异常体系与自定义异常细节。
 False- 2026-04-05: 扩写内容，增加详细的异常体系、捕获处理、抛出异常、断言、自定义异常、最佳实践和实际示例等内容。
 False