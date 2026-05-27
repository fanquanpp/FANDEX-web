# C++ 模板 (C++ Templates)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: 函数模板、类模板、可变参数模板、模板元编程及类型 traits。 | Function templates, class templates, variadic templates, template metaprogramming, and type traits.
 False
 False---
 False
 False## 目录
 False
 False1. [函数模板](#函数模板)
 False2. [类模板](#类模板)
 False3. [可变参数模板](#可变参数模板)
 False4. [模板元编程](#模板元编程)
 False5. [模板的最佳实践](#模板的最佳实践)
 False
 False---
 False
 False## 1. 函数模板
 False
 False函数模板允许定义可适用于不同类型的函数。
 False
```cpp
 True// 基本函数模板
 Truetemplate <typename T>
 TrueT max(T a, T b) {
 True return a > b ? a : b;
 True}
 True
 True// 使用示例
 Trueint main() {
 True int i = max(10, 20); // T = int
 True double d = max(3.14, 2.71); // T = double
 True std::string s = max(std::string("hello"), std::string("world")); // T = std::string
 True return 0;
 True}
 True```

 False### 1.1 模板参数推导
 False
 False编译器会根据函数参数自动推导模板参数类型。
 False
```cpp
 Truetemplate <typename T>
 Truevoid print(T value) {
 True std::cout << value << std::endl;
 True}
 True
 Trueint main() {
 True print(42); // T = int
 True print(3.14); // T = double
 True print("Hello"); // T = const char*
 True return 0;
 True}
 True```

 False### 1.2 显式模板参数
 False
 False可以显式指定模板参数类型。
 False
```cpp
 Truetemplate <typename T>
 TrueT add(T a, T b) {
 True return a + b;
 True}
 True
 Trueint main() {
 True // 显式指定模板参数
 True int result = add<int>(10, 20);
 True double result2 = add<double>(10.5, 20.5);
 True
 True // 类型转换
 True double result3 = add<double>(10, 20.5); // 显式指定为 double
 True return 0;
 True}
 True```

 False### 1.3 模板重载
 False
 False可以为特定类型提供重载版本。
 False
```cpp
 True// 通用版本
 Truetemplate <typename T>
 TrueT max(T a, T b) {
 True std::cout << "Template version" << std::endl;
 True return a > b ? a : b;
 True}
 True
 True// 针对 const char* 的重载
 Trueconst char* max(const char* a, const char* b) {
 True std::cout << "Overload version" << std::endl;
 True return strcmp(a, b) > 0 ? a : b;
 True}
 True
 True// 特化版本
 Truetemplate <>
 Trueint max<int>(int a, int b) {
 True std::cout << "Specialized version" << std::endl;
 True return a > b ? a : b;
 True}
 True
 True// 使用示例
 Trueint main() {
 True max(10, 20); // 特化版本
 True max(3.14, 2.71); // 模板版本
 True max("hello", "world"); // 重载版本
 True return 0;
 True}
 True```

 False### 1.4 多个模板参数
 False
 False函数模板可以有多个模板参数。
 False
```cpp
 True// 多个模板参数
 Truetemplate <typename T1, typename T2, typename T3>
 Truetypename std::common_type<T1, T2, T3>::type max(T1 a, T2 b, T3 c) {
 True return max(max(a, b), c);
 True}
 True
 True// 使用示例
 Trueint main() {
 True auto result = max(10, 20.5, 15); // 返回 double 类型
 True std::cout << "Max: " << result << std::endl;
 True return 0;
 True}
 True```

 False## 2. 类模板
 False
 False类模板允许定义可适用于不同类型的类。
 False
```cpp
 True// 基本类模板
 Truetemplate <typename T>
 Trueclass Stack {
 Trueprivate:
 True std::vector<T> elements;
 True
 Truepublic:
 True void push(const T& item) {
 True elements.push_back(item);
 True }
 True
 True void push(T&& item) {
 True elements.push_back(std::move(item));
 True }
 True
 True T pop() {
 True if (elements.empty()) {
 True throw std::runtime_error("Stack is empty");
 True }
 True T top = std::move(elements.back());
 True elements.pop_back();
 True return top;
 True }
 True
 True bool empty() const {
 True return elements.empty();
 True }
 True
 True size_t size() const {
 True return elements.size();
 True }
 True
 True T& top() {
 True if (elements.empty()) {
 True throw std::runtime_error("Stack is empty");
 True }
 True return elements.back();
 True }
 True
 True const T& top() const {
 True if (elements.empty()) {
 True throw std::runtime_error("Stack is empty");
 True }
 True return elements.back();
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True Stack<int> intStack;
 True intStack.push(1);
 True intStack.push(2);
 True std::cout << intStack.pop() << std::endl; // 输出 2
 True
 True Stack<std::string> stringStack;
 True stringStack.push("hello");
 True stringStack.push("world");
 True std::cout << stringStack.pop() << std::endl; // 输出 world
 True
 True return 0;
 True}
 True```

 False### 2.1 模板参数默认值
 False
 False可以为模板参数提供默认值。
 False
```cpp
 Truetemplate <typename T, typename Allocator = std::allocator<T>>
 Trueclass MyVector {
 Trueprivate:
 True std::vector<T, Allocator> data;
 True
 Truepublic:
 True MyVector() = default;
 True
 True explicit MyVector(size_t size) : data(size) {}
 True
 True MyVector(size_t size, const T& value) : data(size, value) {}
 True
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
 True};
 True
 True// 使用默认分配器
 TrueMyVector<int> v1;
 True
 True// 使用自定义分配器
 True// MyVector<int, CustomAllocator<int>> v2;
 True```

 False### 2.2 类模板特化
 False
 False可以为特定类型提供特化版本。
 False
```cpp
 True// 主模板
 Truetemplate <typename T>
 Trueclass MyType {
 Truepublic:
 True static void print() {
 True std::cout << "General template" << std::endl;
 True }
 True};
 True
 True// 特化版本
 Truetemplate <>
 Trueclass MyType<int> {
 Truepublic:
 True static void print() {
 True std::cout << "Specialized for int" << std::endl;
 True }
 True};
 True
 True// 部分特化
 Truetemplate <typename T>
 Trueclass MyType<T*> {
 Truepublic:
 True static void print() {
 True std::cout << "Specialized for pointer" << std::endl;
 True }
 True};
 True
 True// 使用示例
 Trueint main() {
 True MyType<double>::print(); // 输出 General template
 True MyType<int>::print(); // 输出 Specialized for int
 True MyType<int*>::print(); // 输出 Specialized for pointer
 True return 0;
 True}
 True```

 False## 3. 可变参数模板 (C++11)
 False
 False可变参数模板允许接受任意数量的模板参数。
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
 True// 使用示例
 Trueint main() {
 True print(1, 2.5, "hello", true); // 输出 1 2.5 hello 1
 True return 0;
 True}
 True```

 False### 3.1 折叠表达式 (C++17)
 False
 False折叠表达式是一种简化可变参数模板使用的语法。
 False
```cpp
 True// 使用折叠表达式求和
 Truetemplate <typename... Args>
 Trueauto sum(Args... args) {
 True return (args + ...);
 True}
 True
 True// 使用折叠表达式打印
 Truetemplate <typename... Args>
 Truevoid print_fold(Args... args) {
 True (std::cout << ... << args) << std::endl;
 True}
 True
 True// 使用示例
 Trueint main() {
 True std::cout << "Sum: " << sum(1, 2, 3, 4, 5) << std::endl; // 15
 True print_fold(1, " ", 2.5, " ", "hello"); // 1 2.5 hello
 True return 0;
 True}
 True```

 False### 3.2 转发引用与完美转发
 False
 False可变参数模板常与转发引用一起使用，实现完美转发。
 False
```cpp
 True// 完美转发函数
 Truetemplate <typename... Args>
 Truevoid forward_args(Args&&... args) {
 True print(std::forward<Args>(args)...);
 True}
 True
 True// 使用示例
 Trueint main() {
 True int x = 10;
 True forward_args(1, "hello", std::move(x));
 True return 0;
 True}
 True```

 False## 4. 模板元编程
 False
 False模板元编程是一种在编译时执行计算的技术。
 False
```cpp
 True// 编译期计算阶乘
 Truetemplate <int N>
 Truestruct Factorial {
 True static constexpr int value = N * Factorial<N-1>::value;
 True};
 True
 True// 特化版本作为递归终止条件
 Truetemplate <>
 Truestruct Factorial<0> {
 True static constexpr int value = 1;
 True};
 True
 True// 编译期计算斐波那契数列
 Truetemplate <int N>
 Truestruct Fibonacci {
 True static constexpr int value = Fibonacci<N-1>::value + Fibonacci<N-2>::value;
 True};
 True
 True// 特化版本
 Truetemplate <>
 Truestruct Fibonacci<0> {
 True static constexpr int value = 0;
 True};
 True
 Truetemplate <>
 Truestruct Fibonacci<1> {
 True static constexpr int value = 1;
 True};
 True
 True// 使用示例
 Trueint main() {
 True constexpr int fact5 = Factorial<5>::value; // 编译期计算 120
 True std::cout << "5! = " << fact5 << std::endl;
 True
 True constexpr int fib10 = Fibonacci<10>::value; // 编译期计算 55
 True std::cout << "Fibonacci(10) = " << fib10 << std::endl;
 True
 True return 0;
 True}
 True```

 False### 4.1 类型 traits
 False
 False类型 traits 是模板元编程的重要应用，用于在编译时获取类型信息。
 False
```cpp
 True// 自定义类型 trait
 Truetemplate <typename T>
 Truestruct IsIntegral {
 True static constexpr bool value = false;
 True};
 True
 True// 特化
 Truetemplate <>
 Truestruct IsIntegral<int> {
 True static constexpr bool value = true;
 True};
 True
 Truetemplate <>
 Truestruct IsIntegral<long> {
 True static constexpr bool value = true;
 True};
 True
 True// 使用示例
 Truetemplate <typename T>
 Truevoid process(T value) {
 True if constexpr (IsIntegral<T>::value) {
 True std::cout << "Processing integral type: " << value << std::endl;
 True } else {
 True std::cout << "Processing non-integral type" << std::endl;
 True }
 True}
 True
 Trueint main() {
 True process(42); // 处理整型
 True process(3.14); // 处理非整型
 True return 0;
 True}
 True```

 False## 5. 模板的最佳实践
 False
 False1. **使用 `auto` 推导模板参数**：减少代码冗余，提高可读性。
 False2. **使用概念 (C++20)**：约束模板参数，提供更清晰的错误信息。
 False3. **避免过度特化**：只在必要时使用模板特化。
 False4. **考虑编译时间**：复杂的模板会增加编译时间。
 False5. **使用 `typename` 和 `template` 关键字**：在模板中正确使用这些关键字消除歧义。
 False6. **合理使用默认模板参数**：简化模板的使用。
 False7. **使用 SFINAE 技术**：在编译时选择合适的函数重载。
 False
 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_105 拆分，专注于模板（函数模板、类模板、可变参数模板、模板元编程）。
 False