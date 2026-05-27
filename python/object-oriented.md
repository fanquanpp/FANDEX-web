# 面向对象编程 (OOP Basics)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Python Basics
 False> @Description: 类与对象、属性/方法、继承、多态及特殊方法 (Magic Methods)。 | Class, Object, Properties, Methods, Inheritance, and Magic Methods.
 False
 False---
 False
 False## 目录
 False
 False1. [类与实例](#类与实例)
 False2. [属性与方法](#属性与方法)
 False3. [继承与多态](#继承与多态)
 False4. [特殊方法](#特殊方法)
 False5. [高级面向对象特性](#高级面向对象特性)
 False6. [面向对象编程的最佳实践](#面向对象编程的最佳实践)
 False7. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 类与实例 (Class & Instance)
 False
 FalsePython 是一门纯粹的面向对象语言，几乎所有的东西都是对象。
 False
 False### 1.1 类的定义
 False
```python
 Trueclass Person:
 True # 类属性 | Class attribute
 True species = "Human"
 True 
 True # 构造方法 | Constructor
 True def __init__(self, name, age):
 True self.name = name # 实例属性 | Instance attribute
 True self.age = age
 True 
 True # 实例方法 | Instance method
 True def greet(self):
 True return f"Hello, I am {self.name}"
 True
 True# 实例化
 Truep = Person("Alice", 30)
 Trueprint(p.name) # 输出: Alice
 Trueprint(p.age) # 输出: 30
 Trueprint(p.greet()) # 输出: Hello, I am Alice
 True
 True# 访问类属性
 Trueprint(Person.species) # 输出: Human
 Trueprint(p.species) # 输出: Human（实例也可以访问类属性）
 True
 True# 修改类属性
 TruePerson.species = "Homo sapiens"
 Trueprint(Person.species) # 输出: Homo sapiens
 Trueprint(p.species) # 输出: Homo sapiens（实例的类属性也会改变）
 True
 True# 修改实例的类属性（只会影响该实例）
 Truep.species = "Human"
 Trueprint(Person.species) # 输出: Homo sapiens
 Trueprint(p.species) # 输出: Human
 True```

 False### 1.2 类的文档字符串
 False
```python
 Trueclass Person:
 True """人类类"""
 True 
 True def __init__(self, name, age):
 True """初始化方法"""
 True self.name = name
 True self.age = age
 True 
 True def greet(self):
 True """打招呼方法"""
 True return f"Hello, I am {self.name}"
 True
 True# 访问文档字符串
 Trueprint(Person.__doc__) # 输出: 人类类
 Trueprint(Person.__init__.__doc__) # 输出: 初始化方法
 Trueprint(Person.greet.__doc__) # 输出: 打招呼方法
 True```

 False## 2. 属性与方法 (Properties & Methods)
 False
 False### 2.1 实例方法
 False
 False实例方法是最常见的方法类型，它接收 `self` 作为第一个参数，指向当前实例。
 False
```python
 Trueclass Circle:
 True def __init__(self, radius):
 True self.radius = radius
 True 
 True def area(self):
 True """计算圆的面积"""
 True return 3.14159 * self.radius ** 2
 True 
 True def circumference(self):
 True """计算圆的周长"""
 True return 2 * 3.14159 * self.radius
 True
 True# 使用实例方法
 Truec = Circle(5)
 Trueprint(c.area()) # 输出: 78.53975
 Trueprint(c.circumference()) # 输出: 31.4159
 True```

 False### 2.2 类方法
 False
 False类方法使用 `@classmethod` 装饰器，接收 `cls` 作为第一个参数，指向类本身。
 False
```python
 Trueclass Person:
 True species = "Human"
 True 
 True def __init__(self, name, age):
 True self.name = name
 True self.age = age
 True 
 True @classmethod
 True def get_species(cls):
 True """获取物种信息"""
 True return cls.species
 True 
 True @classmethod
 True def create_adult(cls, name):
 True """创建一个成年人实例"""
 True return cls(name, 18)
 True
 True# 使用类方法
 Trueprint(Person.get_species()) # 输出: Human
 True
 True# 使用类方法创建实例
 Trueadult = Person.create_adult("Bob")
 Trueprint(adult.name) # 输出: Bob
 Trueprint(adult.age) # 输出: 18
 True```

 False### 2.3 静态方法
 False
 False静态方法使用 `@staticmethod` 装饰器，不接收 `self` 或 `cls` 参数，是类的纯工具函数。
 False
```python
 Trueclass Math:
 True @staticmethod
 True def add(a, b):
 True """加法运算"""
 True return a + b
 True 
 True @staticmethod
 True def multiply(a, b):
 True """乘法运算"""
 True return a * b
 True
 True# 使用静态方法
 Trueprint(Math.add(2, 3)) # 输出: 5
 Trueprint(Math.multiply(2, 3)) # 输出: 6
 True
 True# 也可以通过实例调用静态方法
 Truem = Math()
 Trueprint(m.add(4, 5)) # 输出: 9
 True```

 False### 2.4 私有属性和方法
 False
 False在 Python 中，使用双下划线 `__` 开头的属性和方法被视为私有的，外部无法直接访问。
 False
```python
 Trueclass Person:
 True def __init__(self, name, age):
 True self.name = name # 公开属性
 True self.__age = age # 私有属性
 True 
 True def __private_method(self):
 True """私有方法"""
 True return f"This is a private method"
 True 
 True def get_age(self):
 True """获取年龄（通过公开方法访问私有属性）"""
 True return self.__age
 True 
 True def set_age(self, age):
 True """设置年龄（通过公开方法修改私有属性）"""
 True if age > 0:
 True self.__age = age
 True
 True# 使用
 Truep = Person("Alice", 30)
 Trueprint(p.name) # 输出: Alice
 True# print(p.__age) # 错误: 'Person' object has no attribute '__age'
 True# print(p.__private_method()) # 错误: 'Person' object has no attribute '__private_method'
 True
 True# 通过公开方法访问私有属性
 Trueprint(p.get_age()) # 输出: 30
 Truep.set_age(31)
 Trueprint(p.get_age()) # 输出: 31
 True
 True# 注意: Python 实际上是通过名称修饰来实现私有性的
 True# 可以通过 _ClassName__private 来访问私有属性（不推荐）
 Trueprint(p._Person__age) # 输出: 31
 Trueprint(p._Person__private_method()) # 输出: This is a private method
 True```

 False### 2.5 装饰器属性 (`@property`)
 False
 False`@property` 装饰器可以将方法伪装成属性，使得可以像访问属性一样访问方法。
 False
```python
 Trueclass Person:
 True def __init__(self, first_name, last_name):
 True self.first_name = first_name
 True self.last_name = last_name
 True 
 True @property
 True def full_name(self):
 True """获取全名"""
 True return f"{self.first_name} {self.last_name}"
 True 
 True @full_name.setter
 True def full_name(self, name):
 True """设置全名"""
 True first_name, last_name = name.split()
 True self.first_name = first_name
 True self.last_name = last_name
 True 
 True @full_name.deleter
 True def full_name(self):
 True """删除全名"""
 True self.first_name = None
 True self.last_name = None
 True
 True# 使用属性装饰器
 Truep = Person("Alice", "Smith")
 Trueprint(p.full_name) # 输出: Alice Smith
 True
 True# 设置属性
 Truep.full_name = "Bob Johnson"
 Trueprint(p.first_name) # 输出: Bob
 Trueprint(p.last_name) # 输出: Johnson
 Trueprint(p.full_name) # 输出: Bob Johnson
 True
 True# 删除属性
 Truedel p.full_name
 Trueprint(p.first_name) # 输出: None
 Trueprint(p.last_name) # 输出: None
 True# print(p.full_name) # 输出: None None
 True```

 False## 3. 继承与多态 (Inheritance & Polymorphism)
 False
 False### 3.1 单继承
 False
```python
 Trueclass Animal:
 True def __init__(self, name):
 True self.name = name
 True 
 True def speak(self):
 True return "Some generic sound"
 True
 Trueclass Dog(Animal):
 True def speak(self):
 True return "Woof!"
 True
 Trueclass Cat(Animal):
 True def speak(self):
 True return "Meow!"
 True
 True# 使用
 Trueanimal = Animal("Generic Animal")
 Truedog = Dog("Rex")
 Truecat = Cat("Whiskers")
 True
 Trueprint(animal.speak()) # 输出: Some generic sound
 Trueprint(dog.speak()) # 输出: Woof!
 Trueprint(cat.speak()) # 输出: Meow!
 True
 True# 检查继承关系
 Trueprint(isinstance(dog, Animal)) # 输出: True
 Trueprint(issubclass(Dog, Animal)) # 输出: True
 True```

 False### 3.2 多继承
 False
 FalsePython 支持多继承，一个子类可以继承多个父类。
 False
```python
 Trueclass A:
 True def method(self):
 True return "A.method()"
 True
 Trueclass B:
 True def method(self):
 True return "B.method()"
 True 
 True def other_method(self):
 True return "B.other_method()"
 True
 Trueclass C(A, B):
 True pass
 True
 True# 使用
 Truec = C()
 Trueprint(c.method()) # 输出: A.method()（按照 MRO 顺序，先 A 后 B）
 Trueprint(c.other_method()) # 输出: B.other_method()
 True
 True# 查看方法解析顺序 (MRO)
 Trueprint(C.__mro__) # 输出: (<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class 'object'>)
 True```

 False### 3.3 `super()` 函数
 False
 False`super()` 函数用于调用父类的方法，在继承中非常有用。
 False
```python
 Trueclass Parent:
 True def __init__(self, name):
 True self.name = name
 True 
 True def greet(self):
 True return f"Hello from {self.name}"
 True
 Trueclass Child(Parent):
 True def __init__(self, name, age):
 True super().__init__(name) # 调用父类的 __init__ 方法
 True self.age = age
 True 
 True def greet(self):
 True parent_greeting = super().greet() # 调用父类的 greet 方法
 True return f"{parent_greeting}, I'm {self.age} years old"
 True
 True# 使用
 Truechild = Child("Bob", 10)
 Trueprint(child.greet()) # 输出: Hello from Bob, I'm 10 years old
 True```

 False### 3.4 多态
 False
 False多态是指不同类型的对象可以使用相同的接口。
 False
```python
 Truedef make_speak(animal):
 True """让动物发声"""
 True print(animal.speak())
 True
 True# 使用
 Truemake_speak(Dog("Rex")) # 输出: Woof!
 Truemake_speak(Cat("Whiskers")) # 输出: Meow!
 Truemake_speak(Animal("Generic")) # 输出: Some generic sound
 True```

 False### 3.5 鸭子类型
 False
 FalsePython 采用鸭子类型，不关注对象的具体类型，只关注对象是否具有所需的方法或属性。
 False
```python
 Trueclass Duck:
 True def quack(self):
 True return "Quack!"
 True
 Trueclass Person:
 True def quack(self):
 True return "I'm quacking like a duck!"
 True
 Truedef make_quack(obj):
 True """让对象发出鸭叫声"""
 True if hasattr(obj, 'quack'):
 True print(obj.quack())
 True else:
 True print("This object can't quack")
 True
 True# 使用
 Truemake_quack(Duck()) # 输出: Quack!
 Truemake_quack(Person()) # 输出: I'm quacking like a duck!
 True```

 False## 4. 特殊方法 (Magic Methods)
 False
 False特殊方法（也称为魔术方法或双下划线方法）是 Python 中具有特殊功能的方法，它们以双下划线开头和结尾。
 False
 False### 4.1 基本特殊方法
 False
```python
 Trueclass Person:
 True def __init__(self, name, age):
 True """初始化方法"""
 True self.name = name
 True self.age = age
 True 
 True def __str__(self):
 True """字符串表示（对用户友好）"""
 True return f"Person(name='{self.name}', age={self.age})"
 True 
 True def __repr__(self):
 True """字符串表示（对开发者友好）"""
 True return f"Person('{self.name}', {self.age})"
 True 
 True def __eq__(self, other):
 True """相等性比较"""
 True if not isinstance(other, Person):
 True return NotImplemented
 True return self.name == other.name and self.age == other.age
 True 
 True def __lt__(self, other):
 True """小于比较"""
 True if not isinstance(other, Person):
 True return NotImplemented
 True return self.age < other.age
 True
 True# 使用
 Truep1 = Person("Alice", 30)
 Truep2 = Person("Bob", 25)
 Truep3 = Person("Alice", 30)
 True
 Trueprint(str(p1)) # 输出: Person(name='Alice', age=30)
 Trueprint(repr(p1)) # 输出: Person('Alice', 30)
 Trueprint(p1 == p2) # 输出: False
 Trueprint(p1 == p3) # 输出: True
 Trueprint(p1 < p2) # 输出: False
 Trueprint(p2 < p1) # 输出: True
 True```

 False### 4.2 容器相关的特殊方法
 False
```python
 Trueclass MyList:
 True def __init__(self, items):
 True self.items = items
 True 
 True def __len__(self):
 True """获取长度"""
 True return len(self.items)
 True 
 True def __getitem__(self, index):
 True """获取元素"""
 True return self.items[index]
 True 
 True def __setitem__(self, index, value):
 True """设置元素"""
 True self.items[index] = value
 True 
 True def __contains__(self, item):
 True """检查元素是否存在"""
 True return item in self.items
 True
 True# 使用
 Truemy_list = MyList([1, 2, 3, 4, 5])
 Trueprint(len(my_list)) # 输出: 5
 Trueprint(my_list[0]) # 输出: 1
 Truemy_list[0] = 10
 Trueprint(my_list[0]) # 输出: 10
 Trueprint(3 in my_list) # 输出: True
 Trueprint(100 in my_list) # 输出: False
 True
 True# 支持迭代
 Truefor item in my_list:
 True print(item, end=" ") # 输出: 10 2 3 4 5
 True```

 False### 4.3 算术运算符特殊方法
 False
```python
 Trueclass Vector:
 True def __init__(self, x, y):
 True self.x = x
 True self.y = y
 True 
 True def __add__(self, other):
 True """加法运算"""
 True if not isinstance(other, Vector):
 True return NotImplemented
 True return Vector(self.x + other.x, self.y + other.y)
 True 
 True def __sub__(self, other):
 True """减法运算"""
 True if not isinstance(other, Vector):
 True return NotImplemented
 True return Vector(self.x - other.x, self.y - other.y)
 True 
 True def __mul__(self, scalar):
 True """乘法运算"""
 True return Vector(self.x * scalar, self.y * scalar)
 True 
 True def __str__(self):
 True return f"Vector({self.x}, {self.y})"
 True
 True# 使用
 Truev1 = Vector(1, 2)
 Truev2 = Vector(3, 4)
 True
 Trueprint(v1 + v2) # 输出: Vector(4, 6)
 Trueprint(v1 - v2) # 输出: Vector(-2, -2)
 Trueprint(v1 * 2) # 输出: Vector(2, 4)
 True```

 False## 5. 高级面向对象特性
 False
 False### 5.1 抽象基类
 False
 False抽象基类（Abstract Base Class, ABC）用于定义接口，强制子类实现特定的方法。
 False
```python
 Truefrom abc import ABC, abstractmethod
 True
 Trueclass Animal(ABC):
 True @abstractmethod
 True def speak(self):
 True """动物发声"""
 True pass
 True 
 True @abstractmethod
 True def move(self):
 True """动物移动"""
 True pass
 True
 Trueclass Dog(Animal):
 True def speak(self):
 True return "Woof!"
 True 
 True def move(self):
 True return "Running"
 True
 Trueclass Cat(Animal):
 True def speak(self):
 True return "Meow!"
 True 
 True def move(self):
 True return "Walking"
 True
 True# 使用
 Truedog = Dog()
 Trueprint(dog.speak()) # 输出: Woof!
 Trueprint(dog.move()) # 输出: Running
 True
 Truecat = Cat()
 Trueprint(cat.speak()) # 输出: Meow!
 Trueprint(cat.move()) # 输出: Walking
 True
 True# 不能实例化抽象基类
 True# animal = Animal() # 错误: Can't instantiate abstract class Animal with abstract methods move, speak
 True```

 False### 5.2 混入类 (Mixins)
 False
 False混入类是一种特殊的类，用于为其他类提供功能，而不是作为独立的类使用。
 False
```python
 Trueclass SwimMixin:
 True def swim(self):
 True return "Swimming"
 True
 Trueclass FlyMixin:
 True def fly(self):
 True return "Flying"
 True
 Trueclass Duck(SwimMixin, FlyMixin):
 True def quack(self):
 True return "Quack!"
 True
 Trueclass Penguin(SwimMixin):
 True def walk(self):
 True return "Walking"
 True
 True# 使用
 Trueduck = Duck()
 Trueprint(duck.quack()) # 输出: Quack!
 Trueprint(duck.swim()) # 输出: Swimming
 Trueprint(duck.fly()) # 输出: Flying
 True
 Truepenguin = Penguin()
 Trueprint(penguin.swim()) # 输出: Swimming
 Trueprint(penguin.walk()) # 输出: Walking
 True# print(penguin.fly()) # 错误: 'Penguin' object has no attribute 'fly'
 True```

 False### 5.3 单例模式
 False
 False单例模式确保一个类只有一个实例。
 False
```python
 Trueclass Singleton:
 True _instance = None
 True 
 True def __new__(cls, *args, **kwargs):
 True if not cls._instance:
 True cls._instance = super().__new__(cls)
 True return cls._instance
 True 
 True def __init__(self, value=None):
 True if value is not None:
 True self.value = value
 True
 True# 使用
 Trues1 = Singleton("First")
 Trueprint(s1.value) # 输出: First
 True
 True# 第二次创建会返回同一个实例
 Trues2 = Singleton("Second")
 Trueprint(s2.value) # 输出: Second
 Trueprint(s1 is s2) # 输出: True
 Trueprint(s1.value) # 输出: Second（因为 s1 和 s2 是同一个实例）
 True```

 False### 5.4 类装饰器
 False
 False类装饰器用于修改类的行为。
 False
```python
 Truedef debug(cls):
 True """类装饰器：为类的所有方法添加调试信息"""
 True for name, method in list(cls.__dict__.items()):
 True if callable(method) and not name.startswith('__'):
 True def wrapper(*args, **kwargs):
 True print(f"Calling {name} with args: {args}, kwargs: {kwargs}")
 True result = method(*args, **kwargs)
 True print(f"{name} returned: {result}")
 True return result
 True setattr(cls, name, wrapper)
 True return cls
 True
 True@debug
 Trueclass Calculator:
 True def add(self, a, b):
 True return a + b
 True 
 True def multiply(self, a, b):
 True return a * b
 True
 True# 使用
 Truecalc = Calculator()
 Truecalc.add(2, 3) # 输出: Calling add with args: (<__main__.Calculator object at 0x...>, 2, 3), kwargs: {}
 True # add returned: 5
 Truecalc.multiply(4, 5) # 输出: Calling multiply with args: (<__main__.Calculator object at 0x...>, 4, 5), kwargs: {}
 True # multiply returned: 20
 True```

 False## 6. 面向对象编程的最佳实践
 False
 False### 6.1 设计原则
 False
 False- **单一职责原则**: 一个类应该只有一个引起它变化的原因
 False- **开放-封闭原则**: 对扩展开放，对修改封闭
 False- **里氏替换原则**: 子类应该能够替换父类
 False- **依赖倒置原则**: 依赖于抽象，而不是具体实现
 False- **接口隔离原则**: 客户端不应该依赖它不需要的接口
 False
 False### 6.2 代码风格
 False
 False- **命名约定**: 类名使用驼峰命名法（如 `MyClass`），方法和属性使用蛇形命名法（如 `my_method`）
 False- **文档**: 为类、方法和属性添加文档字符串
 False- **缩进**: 使用 4 个空格进行缩进
 False- **行长**: 每行代码不超过 79 个字符
 False- **导入**: 按标准库、第三方库、本地模块的顺序导入
 False
 False### 6.3 常见陷阱
 False
 False- **可变默认参数**: 避免使用可变对象作为默认参数
 False- **循环引用**: 注意避免循环引用导致的内存泄漏
 False- **过度继承**: 避免深层继承层次结构
 False- **过度使用继承**: 考虑使用组合而不是继承
 False- **魔法方法滥用**: 只在必要时使用魔法方法
 False
 False## 7. 实际应用示例
 False
 False### 7.1 学生管理系统
 False
```python
 Trueclass Student:
 True def __init__(self, id, name, age, grade):
 True self.id = id
 True self.name = name
 True self.age = age
 True self.grade = grade
 True 
 True def __str__(self):
 True return f"Student(id={self.id}, name='{self.name}', age={self.age}, grade={self.grade})"
 True
 Trueclass StudentManager:
 True def __init__(self):
 True self.students = []
 True 
 True def add_student(self, student):
 True """添加学生"""
 True self.students.append(student)
 True 
 True def remove_student(self, student_id):
 True """移除学生"""
 True self.students = [s for s in self.students if s.id != student_id]
 True 
 True def get_student(self, student_id):
 True """获取学生"""
 True for student in self.students:
 True if student.id == student_id:
 True return student
 True return None
 True 
 True def get_all_students(self):
 True """获取所有学生"""
 True return self.students
 True
 True# 使用
 Truemanager = StudentManager()
 True
 True# 添加学生
 Truemanager.add_student(Student(1, "Alice", 18, 90))
 Truemanager.add_student(Student(2, "Bob", 17, 85))
 Truemanager.add_student(Student(3, "Charlie", 19, 95))
 True
 True# 获取所有学生
 Truefor student in manager.get_all_students():
 True print(student)
 True
 True# 获取特定学生
 Truestudent = manager.get_student(2)
 Trueprint(f"Found student: {student}")
 True
 True# 移除学生
 Truemanager.remove_student(2)
 Trueprint("After removing student 2:")
 Truefor student in manager.get_all_students():
 True print(student)
 True```

 False### 7.2 形状计算
 False
```python
 Truefrom abc import ABC, abstractmethod
 True
 Trueclass Shape(ABC):
 True @abstractmethod
 True def area(self):
 True """计算面积"""
 True pass
 True 
 True @abstractmethod
 True def perimeter(self):
 True """计算周长"""
 True pass
 True
 Trueclass Rectangle(Shape):
 True def __init__(self, width, height):
 True self.width = width
 True self.height = height
 True 
 True def area(self):
 True return self.width * self.height
 True 
 True def perimeter(self):
 True return 2 * (self.width + self.height)
 True
 Trueclass Circle(Shape):
 True def __init__(self, radius):
 True self.radius = radius
 True 
 True def area(self):
 True return 3.14159 * self.radius ** 2
 True 
 True def perimeter(self):
 True return 2 * 3.14159 * self.radius
 True
 Trueclass Triangle(Shape):
 True def __init__(self, a, b, c):
 True self.a = a
 True self.b = b
 True self.c = c
 True 
 True def area(self):
 True # 使用海伦公式计算面积
 True s = (self.a + self.b + self.c) / 2
 True return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5
 True 
 True def perimeter(self):
 True return self.a + self.b + self.c
 True
 True# 使用
 Trueshapes = [
 True Rectangle(5, 4),
 True Circle(3),
 True Triangle(3, 4, 5)
 True]
 True
 Truefor shape in shapes:
 True print(f"{type(shape).__name__}: Area = {shape.area():.2f}, Perimeter = {shape.perimeter():.2f}")
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 体系化整合 Python 面向对象基础与特殊方法。
 False- 2026-04-05: 扩写内容，增加详细的类与实例、属性与方法、继承与多态、特殊方法、高级面向对象特性和实际示例等内容。
 False