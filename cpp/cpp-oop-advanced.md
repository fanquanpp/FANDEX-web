# C++ 面向对象进阶 (C++ OOP Advanced)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: 构造/析构函数、操作符重载、模板与泛型编程、STL 概览及 OOP 最佳实践。 | Constructors, destructors, operator overloading, templates, STL overview, and OOP best practices.
 False
 False---
 False
 False## 目录
 False
 False1. [构造函数与析构函数](#构造函数与析构函数)
 False2. [操作符重载](#操作符重载)
 False3. [模板与泛型编程](#模板与泛型编程)
 False4. [标准模板库](#标准模板库)
 False5. [面向对象编程最佳实践](#面向对象编程最佳实践)
 False6. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 构造函数与析构函数
 False
 False### 1.1 构造函数
 False
 False构造函数用于初始化对象，与类同名，无返回类型。
 False
```cpp
 Trueclass Person {
 Trueprivate:
 True std::string name;
 True int age;
 True
 Truepublic:
 True // 默认构造函数
 True Person() : name(""), age(0) {
 True std::cout << "Default constructor" << std::endl;
 True }
 True
 True // 带参数的构造函数
 True Person(std::string n, int a) : name(n), age(a) {
 True std::cout << "Parameterized constructor" << std::endl;
 True }
 True
 True // 复制构造函数
 True Person(const Person& other) : name(other.name), age(other.age) {
 True std::cout << "Copy constructor" << std::endl;
 True }
 True
 True // 移动构造函数 (C++11)
 True Person(Person&& other) noexcept : name(std::move(other.name)), age(other.age) {
 True std::cout << "Move constructor" << std::endl;
 True }
 True};
 True```

 False### 1.2 析构函数
 False
 False析构函数用于清理对象资源，与类同名，前面加波浪号，无参数，无返回类型。
 False
```cpp
 Trueclass Resource {
 Trueprivate:
 True int* data;
 True
 Truepublic:
 True Resource(int size) {
 True data = new int[size];
 True std::cout << "Resource allocated" << std::endl;
 True }
 True
 True ~Resource() {
 True delete[] data;
 True std::cout << "Resource deallocated" << std::endl;
 True }
 True};
 True```

 False### 1.3 构造函数初始化列表
 False
 False构造函数初始化列表用于初始化成员变量，比在构造函数体内赋值更高效。
 False
```cpp
 Trueclass Point {
 Trueprivate:
 True int x;
 True int y;
 True const int z; // 常量成员必须在初始化列表中初始化
 True
 Truepublic:
 True // 使用初始化列表
 True Point(int x_, int y_, int z_) : x(x_), y(y_), z(z_) {
 True // 构造函数体
 True }
 True};
 True```

 False## 2. 操作符重载
 False
 False操作符重载允许自定义类型使用标准操作符。
 False
 False### 2.1 成员函数重载
 False
```cpp
 Trueclass Vector2D {
 Trueprivate:
 True double x;
 True double y;
 True
 Truepublic:
 True Vector2D(double x_ = 0, double y_ = 0) : x(x_), y(y_) {}
 True
 True // 重载 + 操作符
 True Vector2D operator+(const Vector2D& other) const {
 True return Vector2D(x + other.x, y + other.y);
 True }
 True
 True // 重载 - 操作符
 True Vector2D operator-(const Vector2D& other) const {
 True return Vector2D(x - other.x, y - other.y);
 True }
 True
 True // 重载 * 操作符（标量乘法）
 True Vector2D operator*(double scalar) const {
 True return Vector2D(x * scalar, y * scalar);
 True }
 True
 True // 重载 == 操作符
 True bool operator==(const Vector2D& other) const {
 True return x == other.x && y == other.y;
 True }
 True
 True // 重载 << 操作符（友元函数）
 True friend std::ostream& operator<<(std::ostream& os, const Vector2D& vec);
 True};
 True
 True// 友元函数实现
 Truestd::ostream& operator<<(std::ostream& os, const Vector2D& vec) {
 True os << "(" << vec.x << ", " << vec.y << ")";
 True return os;
 True}
 True
 True// 使用示例
 Trueint main() {
 True Vector2D v1(1, 2);
 True Vector2D v2(3, 4);
 True Vector2D v3 = v1 + v2;
 True Vector2D v4 = v1 * 2;
 True
 True std::cout << "v1: " << v1 << std::endl;
 True std::cout << "v2: " << v2 << std::endl;
 True std::cout << "v1 + v2: " << v3 << std::endl;
 True std::cout << "v1 * 2: " << v4 << std::endl;
 True
 True return 0;
 True}
 True```

 False## 3. 模板与泛型编程
 False
 False模板是 C++ 支持泛型编程的核心机制，允许编写独立于数据类型的代码。
 False
 False### 3.1 函数模板
 False
 False函数模板允许定义通用的函数，适用于不同类型的参数。
 False
```cpp
 True// 函数模板
 Truetemplate <typename T>
 TrueT max(T a, T b) {
 True return a > b ? a : b;
 True}
 True
 True// 特化版本
 Truetemplate <>
 Trueconst char* max<const char*>(const char* a, const char* b) {
 True return strcmp(a, b) > 0 ? a : b;
 True}
 True
 True// 重载函数模板
 Truetemplate <typename T>
 TrueT max(const T& a, const T& b) {
 True return a > b ? a : b;
 True}
 True
 True// 多个模板参数
 Truetemplate <typename T1, typename T2>
 Trueauto max(T1 a, T2 b) -> decltype(a > b ? a : b) {
 True return a > b ? a : b;
 True}
 True
 True// 使用示例
 Trueint main() {
 True int i = max(10, 20);
 True double d = max(3.14, 2.71);
 True const char* s = max("hello", "world");
 True auto mixed = max(10, 3.14); // 自动推导返回类型
 True
 True std::cout << "Max int: " << i << std::endl;
 True std::cout << "Max double: " << d << std::endl;
 True std::cout << "Max string: " << s << std::endl;
 True std::cout << "Max mixed: " << mixed << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.2 类模板
 False
 False类模板允许定义通用的类，适用于不同类型的成员。
 False
```cpp
 True// 类模板
 Truetemplate <typename T, typename Allocator = std::allocator<T>>
 Trueclass MyVector {
 Trueprivate:
 True std::vector<T, Allocator> data;
 True
 Truepublic:
 True void push_back(const T& value) {
 True data.push_back(value);
 True }
 True
 True void push_back(T&& value) {
 True data.push_back(std::move(value));
 True }
 True
 True T& operator[](size_t index) {
 True return data[index];
 True }
 True
 True const T& operator[](size_t index) const {
 True return data[index];
 True }
 True
 True size_t size() const {
 True return data.size();
 True }
 True
 True // 模板成员函数
 True template <typename U>
 True void assign(const MyVector<U>& other) {
 True data.clear();
 True for (size_t i = 0; i < other.size(); i++) {
 True data.push_back(static_cast<T>(other[i]));
 True }
 True }
 True};
 True
 True// 类模板特化
 Truetemplate <>
 Trueclass MyVector<bool> {
 Trueprivate:
 True std::vector<bool> data;
 True
 Truepublic:
 True void push_back(bool value) {
 True data.push_back(value);
 True }
 True
 True bool operator[](size_t index) const {
 True return data[index];
 True }
 True
 True size_t size() const {
 True return data.size();
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True MyVector<int> v;
 True v.push_back(1);
 True v.push_back(2);
 True v.push_back(3);
 True
 True for (size_t i = 0; i < v.size(); i++) {
 True std::cout << v[i] << " ";
 True }
 True std::cout << std::endl;
 True
 True MyVector<bool> bv;
 True bv.push_back(true);
 True bv.push_back(false);
 True bv.push_back(true);
 True
 True for (size_t i = 0; i < bv.size(); i++) {
 True std::cout << (bv[i] ? "true" : "false") << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.3 可变参数模板 (C++11)
 False
 False可变参数模板允许接受任意数量的参数。
 False
```cpp
 True// 递归终止条件
 Truevoid print() {
 True std::cout << std::endl;
 True}
 True
 True// 可变参数模板
 Truetemplate <typename T, typename... Args>
 Truevoid print(T first, Args... rest) {
 True std::cout << first << " ";
 True print(rest...); // 递归调用
 True}
 True
 True// 可变参数模板求和
 Truetemplate <typename T>
 TrueT sum(T value) {
 True return value;
 True}
 True
 Truetemplate <typename T, typename... Args>
 TrueT sum(T first, Args... rest) {
 True return first + sum(rest...);
 True}
 True
 True// 使用折叠表达式 (C++17)
 Truetemplate <typename... Args>
 Trueauto sum_fold(Args... args) {
 True return (args + ...);
 True}
 True
 True// 使用示例
 Trueint main() {
 True print(1, 2.5, "hello", true);
 True
 True int s1 = sum(1, 2, 3, 4, 5);
 True double s2 = sum(1.5, 2.5, 3.5);
 True std::cout << "Sum 1-5: " << s1 << std::endl;
 True std::cout << "Sum 1.5+2.5+3.5: " << s2 << std::endl;
 True
 True int s3 = sum_fold(1, 2, 3, 4, 5);
 True std::cout << "Sum fold 1-5: " << s3 << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.4 模板元编程
 False
 False模板元编程是一种在编译时执行计算的技术。
 False
```cpp
 True// 模板元编程：计算阶乘
 Truetemplate <int N>
 Truestruct Factorial {
 True static const int value = N * Factorial<N-1>::value;
 True};
 True
 True// 特化：终止条件
 Truetemplate <>
 Truestruct Factorial<0> {
 True static const int value = 1;
 True};
 True
 True// 模板元编程：检查类型是否相同
 Truetemplate <typename T, typename U>
 Truestruct IsSame {
 True static const bool value = false;
 True};
 True
 Truetemplate <typename T>
 Truestruct IsSame<T, T> {
 True static const bool value = true;
 True};
 True
 True// 使用示例
 Trueint main() {
 True std::cout << "Factorial of 5: " << Factorial<5>::value << std::endl; // 120
 True std::cout << "Factorial of 10: " << Factorial<10>::value << std::endl; // 3628800
 True
 True std::cout << "Is int same as int? " << IsSame<int, int>::value << std::endl; // true
 True std::cout << "Is int same as double? " << IsSame<int, double>::value << std::endl; // false
 True
 True return 0;
 True}
 True```

 False### 3.5 模板的最佳实践
 False
 False1. **使用模板参数推导**：让编译器自动推导模板参数类型，减少代码冗余。
 False2. **避免过度特化**：只在必要时使用模板特化。
 False3. **使用概念 (C++20)**：使用概念约束模板参数，提高代码可读性和错误信息的清晰度。
 False4. **考虑模板的编译时间**：模板会增加编译时间，避免过度使用复杂的模板。
 False5. **使用 typename 和 template 关键字**：在模板中正确使用这些关键字来消除歧义。
 False
 False### 3.6 模板与 STL
 False
 FalseSTL 广泛使用模板，了解模板有助于更好地理解和使用 STL。
 False
```cpp
 True// 使用 STL 模板
 Trueint main() {
 True // 向量
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True
 True // 映射
 True std::map<std::string, int> map = {"one", 1, {"two", 2}, {"three", 3}};
 True
 True // 算法
 True std::sort(vec.begin(), vec.end(), std::greater<int>());
 True
 True // 迭代器
 True for (auto it = vec.begin(); it != vec.end(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 函数对象
 True std::for_each(vec.begin(), vec.end(), [](int n) {
 True std::cout << n * 2 << " ";
 True });
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False## 4. 标准模板库 (STL)
 False
 FalseSTL 是 C++ 标准库的重要组成部分，提供了各种容器、算法和迭代器。
 False
 False### 4.1 容器
 False
 False| 容器类型 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **序列容器** | | |
 False| `std::vector` | 动态数组 | `std::vector<int> vec = {1, 2, 3};` |
 False| `std::list` | 双向链表 | `std::list<int> lst = {1, 2, 3};` |
 False| `std::deque` | 双端队列 | `std::deque<int> dq = {1, 2, 3};` |
 False| `std::array` | 固定大小数组 (C++11) | `std::array<int, 3> arr = {1, 2, 3};` |
 False| `std::forward_list` | 单向链表 (C++11) | `std::forward_list<int> flist = {1, 2, 3};` |
 False| **关联容器** | | |
 False| `std::set` | 有序集合 | `std::set<int> s = {3, 1, 2};` |
 False| `std::map` | 有序键值对 | `std::map<std::string, int> m = {{"a", 1}, {"b", 2}};` |
 False| `std::unordered_set` | 无序集合 (C++11) | `std::unordered_set<int> us = {3, 1, 2};` |
 False| `std::unordered_map` | 无序键值对 (C++11) | `std::unordered_map<std::string, int> um = {{"a", 1}, {"b", 2}};` |
 False| **容器适配器** | | |
 False| `std::stack` | 栈 | `std::stack<int> st; st.push(1);` |
 False| `std::queue` | 队列 | `std::queue<int> q; q.push(1);` |
 False| `std::priority_queue` | 优先队列 | `std::priority_queue<int> pq; pq.push(1);` |
 False
 False### 4.2 算法
 False
```cpp
 True#include <algorithm>
 True#include <vector>
 True
 Trueint main() {
 True std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
 True
 True // 排序
 True std::sort(vec.begin(), vec.end());
 True
 True // 查找
 True auto it = std::find(vec.begin(), vec.end(), 5);
 True if (it != vec.end()) {
 True std::cout << "Found: " << *it << std::endl;
 True }
 True
 True // 计数
 True int count = std::count(vec.begin(), vec.end(), 1);
 True std::cout << "Count of 1: " << count << std::endl;
 True
 True // 最大值
 True auto max_it = std::max_element(vec.begin(), vec.end());
 True std::cout << "Max: " << *max_it << std::endl;
 True
 True // 最小值
 True auto min_it = std::min_element(vec.begin(), vec.end());
 True std::cout << "Min: " << *min_it << std::endl;
 True
 True return 0;
 True}
 True```

 False### 4.3 迭代器
 False
```cpp
 True#include <vector>
 True#include <list>
 True
 Trueint main() {
 True // 向量迭代器
 True std::vector<int> vec = {1, 2, 3, 4, 5};
 True std::cout << "Vector elements: ";
 True for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 列表迭代器
 True std::list<int> lst = {1, 2, 3, 4, 5};
 True std::cout << "List elements: ";
 True for (std::list<int>::const_iterator it = lst.cbegin(); it != lst.cend(); ++it) {
 True std::cout << *it << " ";
 True }
 True std::cout << std::endl;
 True
 True // 范围 for 循环 (C++11)
 True std::cout << "Range for: ";
 True for (int num : vec) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False## 5. 面向对象编程最佳实践
 False
 False### 5.1 设计原则
 False
 False- **单一职责原则**: 一个类应该只有一个引起它变化的原因
 False- **开放封闭原则**: 类应该对扩展开放，对修改封闭
 False- **里氏替换原则**: 子类应该能够替换父类
 False- **依赖倒置原则**: 依赖抽象，而不是具体实现
 False- **接口隔离原则**: 客户端不应该依赖它不使用的接口
 False
 False### 5.2 代码风格
 False
 False- **命名规范**:
 False - 类名: `PascalCase`
 False - 成员变量: `camelCase` 或 `m_camelCase`
 False - 成员函数: `camelCase`
 False - 常量: `UPPER_CASE`
 False
 False- **代码组织**:
 False - 头文件 (.h) 包含类声明
 False - 源文件 (.cpp) 包含类实现
 False - 使用命名空间避免命名冲突
 False
 False### 5.3 性能考虑
 False
 False- **避免不必要的拷贝**: 使用移动语义和引用
 False- **合理使用虚函数**: 虚函数调用有开销
 False- **内存管理**: 使用智能指针和 RAII
 False- **容器选择**: 根据使用场景选择合适的容器
 False
 False## 6. 代码示例
 False
 False### 6.1 类与对象的综合使用
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <vector>
 True
 Trueclass Student {
 Trueprivate:
 True std::string name;
 True int id;
 True double gpa;
 True
 Truepublic:
 True // 构造函数
 True Student(std::string n, int i, double g) : name(n), id(i), gpa(g) {}
 True
 True // 成员方法
 True std::string getName() const { return name; }
 True int getId() const { return id; }
 True double getGpa() const { return gpa; }
 True
 True void setGpa(double g) {
 True if (g >= 0.0 && g <= 4.0) {
 True gpa = g;
 True }
 True }
 True
 True void display() const {
 True std::cout << "Name: " << name << ", ID: " << id << ", GPA: " << gpa << std::endl;
 True }
 True};
 True
 Trueclass Course {
 Trueprivate:
 True std::string name;
 True std::vector<Student> students;
 True
 Truepublic:
 True Course(std::string n) : name(n) {}
 True
 True void addStudent(const Student& student) {
 True students.push_back(student);
 True }
 True
 True void displayStudents() const {
 True std::cout << "Course: " << name << std::endl;
 True std::cout << "Students:" << std::endl;
 True for (const auto& student : students) {
 True student.display();
 True }
 True }
 True
 True double getAverageGpa() const {
 True if (students.empty()) return 0.0;
 True
 True double total = 0.0;
 True for (const auto& student : students) {
 True total += student.getGpa();
 True }
 True return total / students.size();
 True }
 True};
 True
 Trueint main() {
 True // 创建学生
 True Student s1("Alice", 101, 3.8);
 True Student s2("Bob", 102, 3.5);
 True Student s3("Charlie", 103, 4.0);
 True
 True // 创建课程
 True Course math("Mathematics");
 True math.addStudent(s1);
 True math.addStudent(s2);
 True math.addStudent(s3);
 True
 True // 显示学生信息
 True math.displayStudents();
 True
 True // 计算平均GPA
 True std::cout << "Average GPA: " << math.getAverageGpa() << std::endl;
 True
 True return 0;
 True}
 True```

 False### 6.2 继承与多态
 False
```cpp
 True#include <iostream>
 True#include <string>
 True
 True// 基类
 Trueclass Employee {
 Trueprivate:
 True std::string name;
 True int id;
 True
 Trueprotected:
 True double salary;
 True
 Truepublic:
 True Employee(std::string n, int i, double s) : name(n), id(i), salary(s) {}
 True
 True virtual ~Employee() {}
 True
 True // 虚函数
 True virtual double calculateBonus() const {
 True return salary * 0.1; // 默认奖金 10%
 True }
 True
 True virtual void display() const {
 True std::cout << "Name: " << name << ", ID: " << id << ", Salary: $" << salary << std::endl;
 True }
 True};
 True
 True// 派生类：经理
 Trueclass Manager : public Employee {
 Trueprivate:
 True double bonusPercentage;
 True
 Truepublic:
 True Manager(std::string n, int i, double s, double bp) :
 True Employee(n, i, s), bonusPercentage(bp) {}
 True
 True double calculateBonus() const override {
 True return salary * (bonusPercentage / 100);
 True }
 True
 True void display() const override {
 True Employee::display();
 True std::cout << "Position: Manager, Bonus: $" << calculateBonus() << std::endl;
 True }
 True};
 True
 True// 派生类：工程师
 Trueclass Engineer : public Employee {
 Trueprivate:
 True std::string specialization;
 True
 Truepublic:
 True Engineer(std::string n, int i, double s, std::string spec) :
 True Employee(n, i, s), specialization(spec) {}
 True
 True double calculateBonus() const override {
 True return salary * 0.15; // 工程师奖金 15%
 True }
 True
 True void display() const override {
 True Employee::display();
 True std::cout << "Position: Engineer, Specialization: " << specialization << ", Bonus: $" << calculateBonus() << std::endl;
 True }
 True};
 True
 True// 使用多态
 Truevoid printEmployeeInfo(const Employee& emp) {
 True emp.display();
 True std::cout << "------------------------" << std::endl;
 True}
 True
 Trueint main() {
 True Manager m("John", 101, 80000, 15); // 15% 奖金
 True Engineer e("Alice", 102, 60000, "Software");
 True
 True std::cout << "Employee Information:" << std::endl;
 True std::cout << "------------------------" << std::endl;
 True
 True printEmployeeInfo(m);
 True printEmployeeInfo(e);
 True
 True return 0;
 True}
 True```

 False### 6.3 模板与STL
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <algorithm>
 True#include <string>
 True
 True// 函数模板：打印容器
 True template <typename Container>
 Truevoid printContainer(const Container& container, const std::string& name) {
 True std::cout << name << ": ";
 True for (const auto& item : container) {
 True std::cout << item << " ";
 True }
 True std::cout << std::endl;
 True}
 True
 True// 类模板：简单的包装器
 Truetemplate <typename T>
 Trueclass Wrapper {
 Trueprivate:
 True T value;
 True
 Truepublic:
 True Wrapper(T v) : value(v) {}
 True
 True T get() const { return value; }
 True void set(T v) { value = v; }
 True
 True void display() const {
 True std::cout << "Value: " << value << std::endl;
 True }
 True};
 True
 Trueint main() {
 True // 使用 STL 容器
 True std::vector<int> numbers = {5, 2, 8, 1, 9};
 True printContainer(numbers, "Original vector");
 True
 True // 排序
 True std::sort(numbers.begin(), numbers.end());
 True printContainer(numbers, "Sorted vector");
 True
 True // 使用类模板
 True Wrapper<int> intWrapper(42);
 True Wrapper<std::string> stringWrapper("Hello, Templates!");
 True
 True intWrapper.display();
 True stringWrapper.display();
 True
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_104 拆分，专注于面向对象进阶（构造/析构、操作符重载、模板、STL 概览、最佳实践）。
 False