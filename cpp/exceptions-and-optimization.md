# C++ 异常处理与性能优化 (Exceptions & Performance)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: 异常捕获机制、性能分析、内联函数及编译器优化。 | Exception handling, profiling, inline, and optimization.
 False
 False---
 False
 False## 目录
 False
 False1. [异常处理](#异常处理)
 False2. [性能优化](#性能优化)
 False3. [性能分析与调试工具](#性能分析与调试工具)
 False4. [性能优化最佳实践](#性能优化最佳实践)
 False5. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 异常处理 (Exceptions)
 False
 False异常是 C++ 中处理错误的一种机制，允许程序在遇到错误时跳转到相应的处理代码。
 False
 False### 1.1 基本异常处理
 False
 False使用 `try-catch` 块捕获和处理异常。
 False
```cpp
 True#include <iostream>
 True#include <stdexcept>
 True
 Trueint main() {
 True try {
 True // 可能抛出异常的代码
 True int divisor = 0;
 True if (divisor == 0) {
 True throw std::runtime_error("Division by zero");
 True }
 True int result = 10 / divisor;
 True } catch (const std::exception& e) {
 True // 异常处理代码
 True std::cerr << "Exception caught: " << e.what() << std::endl;
 True }
 True 
 True return 0;
 True}
 True```

 False### 1.2 异常类型
 False
 FalseC++ 标准库提供了多种异常类型，位于 `<stdexcept>` 头文件中。
 False
 False| 异常类型 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `std::exception` | 所有标准异常的基类 | 基类，通常不直接使用 |
 False| `std::runtime_error` | 运行时错误 | `throw std::runtime_error("Runtime error");` |
 False| `std::logic_error` | 逻辑错误 | `throw std::logic_error("Logic error");` |
 False| `std::bad_alloc` | 内存分配失败 | 由 `new` 操作符抛出 |
 False| `std::out_of_range` | 越界访问 | `throw std::out_of_range("Out of range");` |
 False| `std::invalid_argument` | 无效参数 | `throw std::invalid_argument("Invalid argument");` |
 False
 False### 1.3 自定义异常
 False
 False可以通过继承 `std::exception` 或其子类来创建自定义异常。
 False
```cpp
 True#include <iostream>
 True#include <stdexcept>
 True
 Trueclass MyException : public std::exception {
 Trueprivate:
 True std::string message;
 True 
 Truepublic:
 True explicit MyException(const std::string& msg) : message(msg) {}
 True 
 True const char* what() const noexcept override {
 True return message.c_str();
 True }
 True};
 True
 Truevoid function_that_throws() {
 True throw MyException("Custom exception occurred");
 True}
 True
 Trueint main() {
 True try {
 True function_that_throws();
 True } catch (const MyException& e) {
 True std::cerr << "Custom exception caught: " << e.what() << std::endl;
 True } catch (const std::exception& e) {
 True std::cerr << "Standard exception caught: " << e.what() << std::endl;
 True }
 True 
 True return 0;
 True}
 True```

 False### 1.4 异常处理最佳实践
 False
 False- **只在特殊情况下使用异常**: 异常用于处理意外情况，而不是常规控制流。
 False- **捕获具体异常类型**: 优先捕获具体的异常类型，而不是通用的 `std::exception`。
 False- **保持异常处理代码简洁**: 异常处理代码应该简洁明了，只处理必要的逻辑。
 False- **析构函数不抛异常**: 析构函数抛出异常会导致程序终止。
 False- **使用 RAII 管理资源**: 利用 RAII 机制确保资源在异常发生时正确释放。
 False- **异常规范 (C++11 前)**: 使用 `throw()` 或 `throw(type)` 声明函数可能抛出的异常类型（C++11 后推荐使用 `noexcept`）。
 False
 False### 1.5 noexcept 说明符 (C++11)
 False
 False`noexcept` 说明符用于声明函数不会抛出异常，帮助编译器优化。
 False
```cpp
 True// 声明函数不会抛出异常
 Truevoid function_noexcept() noexcept {
 True // 函数体
 True}
 True
 True// 条件 noexcept
 Truevoid function_conditionally_noexcept() noexcept(noexcept(expression)) {
 True // 函数体
 True}
 True
 True// 检查函数是否会抛出异常
 Truetemplate <typename T>
 Truevoid check_noexcept() {
 True static_assert(noexcept(std::declval<T>().some_method()), 
 True "some_method() must be noexcept");
 True}
 True```

 False### 1.6 异常与构造函数/析构函数
 False
 False- **构造函数**: 可以抛出异常，但需要确保已分配的资源被正确释放。
 False- **析构函数**: 严禁抛出异常，否则会导致程序终止。
 False
```cpp
 Trueclass Resource {
 Trueprivate:
 True int* data;
 True 
 Truepublic:
 True Resource(int size) {
 True data = new int[size];
 True // 如果分配失败，new 会抛出 std::bad_alloc
 True }
 True 
 True ~Resource() noexcept { // 析构函数应标记为 noexcept
 True delete[] data;
 True // 析构函数中不应抛出异常
 True }
 True};
 True```

 False## 2. 性能优化 (Performance)
 False
 False性能优化是 C++ 编程中的重要环节，涉及代码设计、编译器优化、内存管理等多个方面。
 False
 False### 2.1 代码级优化
 False
 False#### 2.1.1 内联函数
 False
 False内联函数可以减少函数调用开销，适用于短小频繁调用的函数。
 False
```cpp
 True// 内联函数声明
 Trueinline int max(int a, int b) {
 True return a > b ? a : b;
 True}
 True
 True// 类内定义的成员函数默认内联
 Trueclass MyClass {
 Truepublic:
 True int getValue() const { // 默认内联
 True return value;
 True }
 True 
 Trueprivate:
 True int value;
 True};
 True```

 False#### 2.1.2 常量优化
 False
 False使用 `const` 可以帮助编译器进行优化，同时提高代码安全性。
 False
```cpp
 True// 常量引用参数，避免拷贝
 Truevoid printValue(const std::string& str) {
 True std::cout << str << std::endl;
 True}
 True
 True// 常量成员函数，保证不修改对象状态
 Trueclass MyClass {
 Truepublic:
 True int getValue() const { // 常量成员函数
 True return value;
 True }
 True 
 Trueprivate:
 True int value;
 True};
 True
 True// 编译期常量
 Trueconstexpr int square(int x) {
 True return x * x;
 True}
 True
 Trueconstexpr int SQUARE_OF_5 = square(5); // 编译期计算
 True```

 False#### 2.1.3 移动语义 (C++11)
 False
 False移动语义可以避免昂贵的深拷贝，提高性能。
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <string>
 True
 Trueclass MyClass {
 Trueprivate:
 True std::string data;
 True 
 Truepublic:
 True // 构造函数
 True MyClass(const std::string& d) : data(d) {
 True std::cout << "Copy constructor called" << std::endl;
 True }
 True 
 True // 移动构造函数
 True MyClass(std::string&& d) : data(std::move(d)) {
 True std::cout << "Move constructor called" << std::endl;
 True }
 True 
 True // 移动赋值运算符
 True MyClass& operator=(std::string&& d) {
 True data = std::move(d);
 True std::cout << "Move assignment called" << std::endl;
 True return *this;
 True }
 True};
 True
 Trueint main() {
 True // 使用移动语义
 True MyClass obj1("Hello"); // 拷贝构造
 True MyClass obj2(std::move(std::string("World"))); // 移动构造
 True 
 True std::string s = "Test";
 True MyClass obj3(std::move(s)); // 移动构造，s 现在为空
 True 
 True return 0;
 True}
 True```

 False#### 2.1.4 避免不必要的拷贝
 False
 False使用引用、指针或移动语义避免不必要的拷贝操作。
 False
```cpp
 True// 不好的做法：拷贝参数
 Truestd::vector<int> process_vector(std::vector<int> v) {
 True // 处理 v
 True return v; // 返回时再次拷贝
 True}
 True
 True// 好的做法：使用引用
 Truevoid process_vector(const std::vector<int>& v) {
 True // 处理 v（只读）
 True}
 True
 True// 好的做法：使用移动语义
 Truestd::vector<int> create_vector() {
 True std::vector<int> v = {1, 2, 3, 4, 5};
 True return v; // 编译器会进行返回值优化 (RVO)
 True}
 True```

 False#### 2.1.5 预分配内存
 False
 False对于容器，预先分配内存可以减少动态内存分配的次数。
 False
```cpp
 Truestd::vector<int> v;
 Truev.reserve(1000); // 预先分配 1000 个元素的空间
 True
 Truefor (int i = 0; i < 1000; i++) {
 True v.push_back(i); // 不需要频繁重新分配内存
 True}
 True```

 False### 2.2 编译器优化
 False
 False#### 2.2.1 优化级别
 False
 False不同的编译器优化级别会对代码性能产生显著影响。
 False
 False| 优化级别 | 描述 | 适用场景 |
 False| :--- | :--- | :--- |
 False| `-O0` | 无优化 | 调试阶段 |
 False| `-O1` | 基本优化 | 平衡调试和性能 |
 False| `-O2` | 更高级别优化 | 生产环境 |
 False| `-O3` | 最高级别优化 | 对性能要求高的场景 |
 False| `-Os` | 优化代码大小 | 内存受限环境 |
 False
 False#### 2.2.2 编译器特定优化
 False
 False不同编译器有特定的优化选项。
 False
 False- **GCC**: `-march=native` (使用本地 CPU 架构), `-ffast-math` (快速数学运算)
 False- **Clang**: `-Weverything` (开启所有警告), `-fsanitize=address` (地址 sanitizer)
 False- **MSVC**: `/O2` (优化速度), `/Oi` (内联函数)
 False
 False### 2.3 内存管理优化
 False
 False#### 2.3.1 智能指针
 False
 False使用智能指针管理内存，避免内存泄漏。
 False
```cpp
 True#include <memory>
 True
 True// 推荐使用 make_unique 和 make_shared
 Truestd::unique_ptr<int> up = std::make_unique<int>(42);
 Truestd::shared_ptr<int> sp = std::make_shared<int>(100);
 True
 True// 避免循环引用
 Trueclass A {
 Truepublic:
 True std::weak_ptr<B> b; // 使用 weak_ptr 打破循环
 True};
 True
 Trueclass B {
 Truepublic:
 True std::shared_ptr<A> a;
 True};
 True```

 False#### 2.3.2 内存池
 False
 False对于频繁分配和释放小对象的场景，使用内存池可以提高性能。
 False
```cpp
 True// 简单的内存池实现
 Trueclass MemoryPool {
 Trueprivate:
 True std::vector<void*> blocks;
 True size_t blockSize;
 True size_t currentBlockIndex;
 True size_t currentPosition;
 True 
 Truepublic:
 True MemoryPool(size_t blockSize, size_t initialBlocks = 10) 
 True : blockSize(blockSize), currentBlockIndex(0), currentPosition(0) {
 True for (size_t i = 0; i < initialBlocks; i++) {
 True blocks.push_back(std::malloc(blockSize));
 True }
 True }
 True 
 True ~MemoryPool() {
 True for (void* block : blocks) {
 True std::free(block);
 True }
 True }
 True 
 True void* allocate() {
 True if (currentBlockIndex >= blocks.size() || currentPosition >= blockSize) {
 True blocks.push_back(std::malloc(blockSize));
 True currentBlockIndex = blocks.size() - 1;
 True currentPosition = 0;
 True }
 True 
 True void* result = static_cast<char*>(blocks[currentBlockIndex]) + currentPosition;
 True currentPosition += sizeof(int); // 假设分配 int 大小的内存
 True return result;
 True }
 True 
 True void deallocate(void* ptr) {
 True // 简单实现，不做实际释放
 True }
 True};
 True```

 False### 2.4 算法与数据结构优化
 False
 False选择合适的算法和数据结构对性能至关重要。
 False
 False| 场景 | 推荐数据结构 | 时间复杂度 |
 False| :--- | :--- | :--- |
 False| 随机访问 | `std::vector` | O(1) |
 False| 频繁插入/删除 | `std::list` | O(1) |
 False| 查找操作 | `std::unordered_map` | O(1) 平均 |
 False| 有序集合 | `std::set` | O(log n) |
 False| 优先级队列 | `std::priority_queue` | O(log n) |
 False
 False### 2.5 并行计算
 False
 False利用多核处理器进行并行计算可以显著提高性能。
 False
 False#### 2.5.1 标准库并行算法 (C++17)
 False
```cpp
 True#include <algorithm>
 True#include <execution>
 True#include <vector>
 True
 Trueint main() {
 True std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
 True 
 True // 并行排序
 True std::sort(std::execution::par, v.begin(), v.end());
 True 
 True // 并行变换
 True std::transform(std::execution::par, v.begin(), v.end(), v.begin(),
 True [](int x) { return x * 2; });
 True 
 True return 0;
 True}
 True```

 False#### 2.5.2 线程库 (C++11)
 False
```cpp
 True#include <thread>
 True#include <vector>
 True#include <iostream>
 True
 Truevoid process_chunk(const std::vector<int>& data, size_t start, size_t end) {
 True for (size_t i = start; i < end; i++) {
 True // 处理数据
 True std::cout << data[i] << " ";
 True }
 True}
 True
 Trueint main() {
 True std::vector<int> data(1000);
 True for (int i = 0; i < 1000; i++) {
 True data[i] = i;
 True }
 True 
 True // 创建线程
 True std::vector<std::thread> threads;
 True size_t chunk_size = data.size() / 4;
 True 
 True for (size_t i = 0; i < 4; i++) {
 True size_t start = i * chunk_size;
 True size_t end = (i == 3) ? data.size() : (i + 1) * chunk_size;
 True threads.emplace_back(process_chunk, std::ref(data), start, end);
 True }
 True 
 True // 等待所有线程完成
 True for (auto& t : threads) {
 True t.join();
 True }
 True 
 True return 0;
 True}
 True```

 False## 3. 性能分析与调试工具
 False
 False### 3.1 性能分析工具
 False
 False#### 3.1.1 Google Benchmark
 False
 FalseGoogle Benchmark 是一个用于基准测试的框架，可以测量代码的执行性能。
 False
```cpp
 True#include <benchmark/benchmark.h>
 True
 Truestatic void BM_Square(benchmark::State& state) {
 True for (auto _ : state) {
 True int result = 0;
 True for (int i = 0; i < 1000; i++) {
 True result += i * i;
 True }
 True benchmark::DoNotOptimize(result);
 True }
 True}
 TrueBENCHMARK(BM_Square);
 True
 TrueBENCHMARK_MAIN();
 True```

 False#### 3.1.2 gprof
 False
 False`gprof` 是 GCC 提供的性能分析工具，可以分析函数调用次数和执行时间。
 False
```bash
 True# 编译时添加 -pg 选项
 Trueg++ -pg -O2 program.cpp -o program
 True
 True# 运行程序，生成 gmon.out 文件
 True./program
 True
 True# 分析结果
 Truegprof program gmon.out > analysis.txt
 True```

 False#### 3.1.3 perf
 False
 False`perf` 是 Linux 系统下的性能分析工具，可以分析 CPU 使用率、缓存命中率等。
 False
```bash
 True# 记录性能数据
 Trueperf record ./program
 True
 True# 查看分析结果
 Trueperf report
 True
 True# 查看热点函数
 Trueperf top -p <pid>
 True```

 False### 3.2 内存分析工具
 False
 False#### 3.2.1 Valgrind
 False
 FalseValgrind 是一个内存调试和内存泄漏检测工具。
 False
```bash
 True# 检测内存泄漏
 Truevalgrind --leak-check=full ./program
 True
 True# 检测内存访问错误
 Truevalgrind --tool=memcheck ./program
 True
 True# 检测缓存使用情况
 Truevalgrind --tool=cachegrind ./program
 True```

 False#### 3.2.2 AddressSanitizer
 False
 FalseAddressSanitizer (ASan) 是一个内存错误检测工具，集成在 GCC 和 Clang 中。
 False
```bash
 True# 编译时添加 -fsanitize=address 选项
 Trueg++ -fsanitize=address -g program.cpp -o program
 True
 True# 运行程序
 True./program
 True```

 False### 3.3 调试工具
 False
 False#### 3.3.1 GDB
 False
 FalseGDB 是一个强大的命令行调试器。
 False
```bash
 True# 编译时添加 -g 选项
 Trueg++ -g program.cpp -o program
 True
 True# 启动 GDB
 Truegdb ./program
 True
 True# 常用命令
 True# break main # 在 main 函数处设置断点
 True# run # 运行程序
 True# print variable # 打印变量值
 True# step # 单步执行
 True# continue # 继续执行
 True# backtrace # 查看调用栈
 True```

 False#### 3.3.2 LLDB
 False
 FalseLLDB 是 LLVM 项目的调试器，功能类似于 GDB。
 False
```bash
 True# 编译时添加 -g 选项
 Trueclang++ -g program.cpp -o program
 True
 True# 启动 LLDB
 Truelldb ./program
 True
 True# 常用命令
 True# breakpoint set --name main # 在 main 函数处设置断点
 True# run # 运行程序
 True# print variable # 打印变量值
 True# step # 单步执行
 True# continue # 继续执行
 True# thread backtrace # 查看调用栈
 True```

 False#### 3.3.3 可视化调试器
 False
 False- **Visual Studio**: Windows 平台的集成开发环境，提供强大的可视化调试功能。
 False- **CLion**: JetBrains 开发的跨平台 IDE，集成了 GDB/LLDB 调试器。
 False- **VS Code**: 轻量级编辑器，通过插件支持调试功能。
 False
 False## 4. 性能优化最佳实践
 False
 False### 4.1 分析先行
 False
 False- **使用性能分析工具**：在优化前，先使用性能分析工具找出性能瓶颈。
 False- **建立基准测试**：创建基准测试用例，用于评估优化效果。
 False- **测量而不是猜测**：基于实际测量结果进行优化，而不是凭感觉。
 False
 False### 4.2 代码优化
 False
 False- **优先优化热点代码**：重点优化执行频率高的代码。
 False- **避免过早优化**：先确保代码正确，再进行优化。
 False- **保持代码可读性**：优化不应以牺牲代码可读性为代价。
 False- **使用适当的数据结构**：根据具体场景选择合适的数据结构。
 False- **减少内存分配**：避免频繁的动态内存分配和释放。
 False
 False### 4.3 编译优化
 False
 False- **选择合适的优化级别**：根据实际需求选择适当的编译器优化级别。
 False- **启用架构特定优化**：使用 `-march=native` 等选项利用 CPU 特性。
 False- **使用链接时优化**：启用 `-flto` (Link Time Optimization) 进行全局优化。
 False
 False### 4.4 内存管理
 False
 False- **使用智能指针**：避免内存泄漏和悬空指针。
 False- **合理使用内存池**：对于频繁分配的小对象，使用内存池提高性能。
 False- **注意内存对齐**：合理安排数据结构，提高缓存命中率。
 False
 False### 4.5 并行计算
 False
 False- **利用多线程**：对于计算密集型任务，使用多线程并行处理。
 False- **避免线程竞争**：使用互斥锁、原子操作等同步机制避免线程竞争。
 False- **使用标准库并行算法**：优先使用 C++17 提供的并行算法。
 False
 False## 5. 代码示例
 False
 False### 5.1 异常处理示例
 False
```cpp
 True#include <iostream>
 True#include <stdexcept>
 True#include <string>
 True
 True// 自定义异常类
 Trueclass FileException : public std::runtime_error {
 Truepublic:
 True explicit FileException(const std::string& message) 
 True : std::runtime_error(message) {}
 True};
 True
 True// 文件操作类
 Trueclass FileHandler {
 Trueprivate:
 True std::string filename;
 True 
 Truepublic:
 True FileHandler(const std::string& name) : filename(name) {
 True // 模拟文件打开失败
 True if (name.empty()) {
 True throw FileException("Empty filename");
 True }
 True std::cout << "File " << name << " opened" << std::endl;
 True }
 True 
 True ~FileHandler() noexcept {
 True // 析构函数不应抛出异常
 True std::cout << "File " << filename << " closed" << std::endl;
 True }
 True 
 True void read() {
 True // 模拟读取失败
 True if (filename == "error.txt") {
 True throw FileException("Failed to read file");
 True }
 True std::cout << "Reading from file " << filename << std::endl;
 True }
 True};
 True
 Trueint main() {
 True try {
 True // 测试正常情况
 True FileHandler file1("data.txt");
 True file1.read();
 True 
 True // 测试异常情况
 True FileHandler file2("");
 True } catch (const FileException& e) {
 True std::cerr << "File exception: " << e.what() << std::endl;
 True } catch (const std::exception& e) {
 True std::cerr << "Standard exception: " << e.what() << std::endl;
 True } catch (...) {
 True std::cerr << "Unknown exception" << std::endl;
 True }
 True 
 True try {
 True FileHandler file3("error.txt");
 True file3.read();
 True } catch (const FileException& e) {
 True std::cerr << "File exception: " << e.what() << std::endl;
 True }
 True 
 True return 0;
 True}
 True```

 False### 5.2 性能优化示例
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <chrono>
 True#include <algorithm>
 True#include <execution>
 True
 True// 测量函数执行时间的模板函数
 Truetemplate <typename Func>
 Truedouble measure_time(Func&& func) {
 True auto start = std::chrono::high_resolution_clock::now();
 True func();
 True auto end = std::chrono::high_resolution_clock::now();
 True return std::chrono::duration<double, std::milli>(end - start).count();
 True}
 True
 True// 普通排序
 Truevoid regular_sort(std::vector<int>& v) {
 True std::sort(v.begin(), v.end());
 True}
 True
 True// 并行排序
 Truevoid parallel_sort(std::vector<int>& v) {
 True std::sort(std::execution::par, v.begin(), v.end());
 True}
 True
 True// 不使用 reserve
 Truevoid without_reserve() {
 True std::vector<int> v;
 True for (int i = 0; i < 1000000; i++) {
 True v.push_back(i);
 True }
 True}
 True
 True// 使用 reserve
 Truevoid with_reserve() {
 True std::vector<int> v;
 True v.reserve(1000000);
 True for (int i = 0; i < 1000000; i++) {
 True v.push_back(i);
 True }
 True}
 True
 Trueint main() {
 True // 测试排序性能
 True std::vector<int> v1(1000000);
 True std::generate(v1.begin(), v1.end(), []() { return rand(); });
 True std::vector<int> v2 = v1;
 True 
 True double time_regular = measure_time([&]() { regular_sort(v1); });
 True double time_parallel = measure_time([&]() { parallel_sort(v2); });
 True 
 True std::cout << "Regular sort: " << time_regular << " ms" << std::endl;
 True std::cout << "Parallel sort: " << time_parallel << " ms" << std::endl;
 True std::cout << "Speedup: " << time_regular / time_parallel << "x" << std::endl;
 True 
 True // 测试 reserve 性能
 True double time_without_reserve = measure_time(without_reserve);
 True double time_with_reserve = measure_time(with_reserve);
 True 
 True std::cout << "Without reserve: " << time_without_reserve << " ms" << std::endl;
 True std::cout << "With reserve: " << time_with_reserve << " ms" << std::endl;
 True std::cout << "Speedup: " << time_without_reserve / time_with_reserve << "x" << std::endl;
 True 
 True return 0;
 True}
 True```

 False### 5.3 内存管理示例
 False
```cpp
 True#include <iostream>
 True#include <memory>
 True#include <vector>
 True
 True// 自定义删除器
 Truestruct CustomDeleter {
 True void operator()(int* p) {
 True std::cout << "Custom deleter called" << std::endl;
 True delete p;
 True }
 True};
 True
 Trueint main() {
 True // 智能指针示例
 True std::cout << "=== Unique_ptr ===" << std::endl;
 True {
 True std::unique_ptr<int> up1(new int(42));
 True std::cout << "up1 value: " << *up1 << std::endl;
 True 
 True // 转移所有权
 True std::unique_ptr<int> up2 = std::move(up1);
 True if (!up1) {
 True std::cout << "up1 is null" << std::endl;
 True }
 True std::cout << "up2 value: " << *up2 << std::endl;
 True } // up2 超出作用域，自动释放
 True 
 True std::cout << "\n=== Shared_ptr ===" << std::endl;
 True {
 True std::shared_ptr<int> sp1 = std::make_shared<int>(100);
 True std::cout << "sp1 use count: " << sp1.use_count() << std::endl;
 True 
 True {
 True std::shared_ptr<int> sp2 = sp1;
 True std::cout << "After sp2 creation, use count: " << sp1.use_count() << std::endl;
 True } // sp2 超出作用域，引用计数减 1
 True 
 True std::cout << "After sp2 destruction, use count: " << sp1.use_count() << std::endl;
 True } // sp1 超出作用域，引用计数为 0，自动释放
 True 
 True std::cout << "\n=== Weak_ptr ===" << std::endl;
 True {
 True std::shared_ptr<int> sp = std::make_shared<int>(200);
 True std::weak_ptr<int> wp = sp;
 True 
 True std::cout << "sp use count: " << sp.use_count() << std::endl;
 True std::cout << "wp expired: " << wp.expired() << std::endl;
 True 
 True if (auto locked = wp.lock()) {
 True std::cout << "Locked value: " << *locked << std::endl;
 True std::cout << "Locked use count: " << locked.use_count() << std::endl;
 True }
 True 
 True sp.reset(); // 释放 shared_ptr
 True std::cout << "After sp.reset(), wp expired: " << wp.expired() << std::endl;
 True 
 True if (auto locked = wp.lock()) {
 True std::cout << "Locked value: " << *locked << std::endl;
 True } else {
 True std::cout << "wp is expired, cannot lock" << std::endl;
 True }
 True }
 True 
 True std::cout << "\n=== Custom deleter ===" << std::endl;
 True {
 True std::unique_ptr<int, CustomDeleter> up(new int(300));
 True std::cout << "up value: " << *up << std::endl;
 True } // 自动调用自定义删除器
 True 
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 整合 C++ 异常处理与基础优化技巧。
 False- 2026-04-05: 扩写内容，增加详细的异常处理机制、性能优化技术、调试工具、最佳实践和代码示例等内容。
 False