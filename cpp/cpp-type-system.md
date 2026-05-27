# C++ 类型系统 (C++ Type System)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: C++ 常量、类型推导、类型别名、最佳实践及代码示例。 | C++ constants, type deduction, type aliases, best practices, and code examples.
 False
 False---
 False
 False## 目录
 False
 False1. [常量](#常量)
 False2. [类型推导](#类型推导)
 False3. [类型别名](#类型别名)
 False4. [最佳实践](#最佳实践)
 False5. [代码示例](#代码示例)
 False
 False---
 False
 False## 1. 常量 (Constants)
 False
 False### 1.1 const 常量
 False
```cpp
 True// 全局常量
 Trueconst int MAX_VALUE = 100;
 True
 Trueint main() {
 True // 局部常量
 True const double PI = 3.14159;
 True
 True // 常量指针
 True const int* p = &MAX_VALUE;
 True // *p = 200; // 错误：不能修改 const 指针指向的值
 True
 True // 指针常量
 True int x = 10;
 True int* const q = &x;
 True *q = 20; // 可以修改指针指向的值
 True // q = &MAX_VALUE; // 错误：不能修改指针本身
 True
 True // const 引用
 True const int& ref = x;
 True // ref = 30; // 错误：不能修改 const 引用
 True
 True return 0;
 True}
 True```

 False### 1.2 constexpr 常量 (C++11)
 False
```cpp
 True// 编译期常量
 Trueconstexpr int factorial(int n) {
 True return n <= 1 ? 1 : n * factorial(n - 1);
 True}
 True
 Trueint main() {
 True constexpr int fact5 = factorial(5); // 编译期计算
 True std::cout << "5! = " << fact5 << std::endl;
 True
 True return 0;
 True}
 True```

 False## 2. 类型推导
 False
 False### 2.1 auto 类型推导 (C++11)
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True
 Trueint main() {
 True // 基本类型推导
 True auto i = 10; // int
 True auto d = 3.14; // double
 True auto s = "Hello"; // const char*
 True auto b = true; // bool
 True
 True // 容器类型推导
 True std::vector<int> v = {1, 2, 3};
 True auto it = v.begin(); // 迭代器类型
 True
 True // 函数返回类型推导
 True auto add = [](int a, int b) { return a + b; }; // lambda 表达式
 True
 True std::cout << "add(5, 3) = " << add(5, 3) << std::endl;
 True
 True return 0;
 True}
 True```

 False### 2.2 decltype 类型推导 (C++11)
 False
```cpp
 True#include <iostream>
 True
 Trueint main() {
 True int x = 10;
 True decltype(x) y = 20; // y 的类型是 int
 True
 True double z = 3.14;
 True decltype(x + z) w = x + z; // w 的类型是 double
 True
 True std::cout << "y = " << y << ", w = " << w << std::endl;
 True
 True return 0;
 True}
 True```

 False## 3. 类型别名
 False
 False### 3.1 typedef
 False
```cpp
 True#include <iostream>
 True
 True// 类型别名
 Truetypedef unsigned int uint;
 Truetypedef std::vector<int> IntVector;
 True
 Trueint main() {
 True uint x = 100;
 True IntVector v = {1, 2, 3};
 True
 True std::cout << "x = " << x << std::endl;
 True for (auto num : v) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.2 using 别名 (C++11)
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True
 True// 使用 using 定义类型别名
 Trueusing uint = unsigned int;
 Trueusing IntVector = std::vector<int>;
 True
 Trueint main() {
 True uint x = 100;
 True IntVector v = {1, 2, 3};
 True
 True std::cout << "x = " << x << std::endl;
 True for (auto num : v) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False## 4. 最佳实践
 False
 False### 4.1 代码风格
 False
 False#### 4.1.1 命名规范
 False
 False- **变量和函数**：`camelCase` 或 `snake_case`
 False - 示例：`int studentCount;` 或 `int student_count;`
 False - 示例：`void calculateTotal();` 或 `void calculate_total();`
 False
 False- **类和结构体**：`PascalCase`
 False - 示例：`class StudentRecord;`
 False - 示例：`struct Point3D;`
 False
 False- **常量**：`UPPER_CASE`
 False - 示例：`const int MAX_SIZE = 100;`
 False - 示例：`constexpr double PI = 3.14159;`
 False
 False- **命名空间**：`lowercase`
 False - 示例：`namespace utils;`
 False - 示例：`namespace math_helpers;`
 False
 False- **类型别名**：`PascalCase` 或 `camelCase`
 False - 示例：`using IntVector = std::vector<int>;`
 False - 示例：`typedef std::map<std::string, int> StringIntMap;`
 False
 False#### 4.1.2 缩进和格式
 False
 False- **缩进**：使用 4 个空格或 1 个制表符
 False- **大括号**：使用 K&R 风格（左大括号在同一行）
 False
 ```cpp
 True if (condition) {
 True // 代码
 True }
 True ```

 False- **行长度**：每行不超过 80-100 个字符
 False- **空行**：适当使用空行分隔代码块
 False- **空格**：在操作符前后、逗号后添加空格
 False
 ```cpp
 True int result = a + b;
 True func(a, b, c);
 True ```

 False#### 4.1.3 注释
 False
 False- **文档注释**：函数前添加文档注释
 False
 ```cpp
 True /**
 True * @brief 计算两个数的和
 True * @param a 第一个数
 True * @param b 第二个数
 True * @return 两数之和
 True */
 True int add(int a, int b) {
 True return a + b;
 True }
 True ```

 False- **代码注释**：为复杂代码添加注释
 False
 ```cpp
 True // 使用二分查找算法
 True int binary_search(const std::vector<int>& arr, int target) {
 True // 初始化左右边界
 True int left = 0, right = arr.size() - 1;
 True // 循环查找
 True while (left <= right) {
 True int mid = left + (right - left) / 2; // 避免整数溢出
 True if (arr[mid] == target) {
 True return mid;
 True } else if (arr[mid] < target) {
 True left = mid + 1;
 True } else {
 True right = mid - 1;
 True }
 True }
 True return -1;
 True }
 True ```

 False### 4.2 类型使用建议
 False
 False#### 4.2.1 基本类型
 False
 False- **优先使用 auto**：简化代码，提高可维护性
 False
 ```cpp
 True auto result = calculate(); // 自动推导返回类型
 True auto it = container.begin(); // 简化迭代器类型
 True ```

 False- **使用 constexpr**：对于编译期常量，提高性能
 False
 ```cpp
 True constexpr int MAX_SIZE = 100; // 编译期常量
 True constexpr int factorial(int n) { return n <= 1 ? 1 : n * factorial(n-1); }
 True ```

 False- **合理使用 const**：提高代码安全性和可读性
 False
 ```cpp
 True const int& get_value() const; // 常量成员函数，不修改对象状态
 True void process(const std::string& str); // 避免复制，且不修改参数
 True ```

 False- **注意类型转换**：避免隐式类型转换导致的问题
 False
 ```cpp
 True // 显式转换
 True double d = 3.14;
 True int i = static_cast<int>(d); // 明确转换意图
 True ```

 False#### 4.2.2 复合类型
 False
 False- **使用 STL 容器**：优先使用标准库容器
 False
 ```cpp
 True std::vector<int> numbers; // 动态数组
 True std::map<std::string, int> scores; // 键值对
 True std::unordered_set<int> unique_values; // 哈希集合
 True ```

 False- **智能指针**：使用智能指针管理内存
 False
 ```cpp
 True std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
 True std::shared_ptr<MyClass> shared_ptr = std::make_shared<MyClass>();
 True ```

 False- **引用传递**：对于大对象，使用引用传递避免复制
 False
 ```cpp
 True void process_large_object(const LargeObject& obj); // 常量引用
 True ```

 False### 4.3 控制流建议
 False
 False- **避免使用 goto**：使用结构化控制流
 False- **使用范围 for 循环**：简化容器遍历
 False
 ```cpp
 True for (const auto& item : container) {
 True // 处理 item
 True }
 True ```

 False- **合理使用 switch**：对于多分支条件
 False- **异常处理**：使用 try-catch 处理异常
 False
 False### 4.4 输入输出建议
 False
 False- **使用 std::cout 和 std::cin**：标准库提供的输入输出功能
 False- **格式化输出**：使用 iomanip 库进行格式化
 False
 ```cpp
 True std::cout << std::fixed << std::setprecision(2) << value << std::endl;
 True ```

 False- **错误处理**：检查输入是否成功
 False
 ```cpp
 True if (!(std::cin >> value)) {
 True std::cerr << "Invalid input" << std::endl;
 True std::cin.clear();
 True std::cin.ignore();
 True }
 True ```

 False- **避免使用 C 风格 I/O**：如 printf 和 scanf
 False
 False### 4.5 性能优化建议
 False
 False- **减少复制**：使用移动语义和引用
 False- **预分配内存**：对于容器，提前分配足够的空间
 False
 ```cpp
 True std::vector<int> vec;
 True vec.reserve(1000); // 预分配空间
 True ```

 False- **避免频繁的内存分配**：使用对象池或内存池
 False- **内联函数**：对于小函数，使用 inline 关键字
 False
 ```cpp
 True inline int min(int a, int b) {
 True return a < b ? a : b;
 True }
 True ```

 False## 5. 代码示例
 False
 False### 5.1 温度转换
 False
```cpp
 True#include <iostream>
 True#include <iomanip>
 True
 True// 摄氏度转华氏度
 Truedouble celsius_to_fahrenheit(double celsius) {
 True return (celsius * 9.0 / 5.0) + 32.0;
 True}
 True
 True// 华氏度转摄氏度
 Truedouble fahrenheit_to_celsius(double fahrenheit) {
 True return (fahrenheit - 32.0) * 5.0 / 9.0;
 True}
 True
 True// 温度单位转换类
 Trueclass TemperatureConverter {
 Truepublic:
 True static double celsius_to_fahrenheit(double celsius) {
 True return (celsius * 9.0 / 5.0) + 32.0;
 True }
 True
 True static double fahrenheit_to_celsius(double fahrenheit) {
 True return (fahrenheit - 32.0) * 5.0 / 9.0;
 True }
 True
 True static double celsius_to_kelvin(double celsius) {
 True return celsius + 273.15;
 True }
 True
 True static double kelvin_to_celsius(double kelvin) {
 True return kelvin - 273.15;
 True }
 True};
 True
 Trueint main() {
 True double c, f, k;
 True
 True std::cout << "输入摄氏度: ";
 True std::cin >> c;
 True f = TemperatureConverter::celsius_to_fahrenheit(c);
 True k = TemperatureConverter::celsius_to_kelvin(c);
 True std::cout << std::fixed << std::setprecision(2);
 True std::cout << c << "°C = " << f << "°F = " << k << "K" << std::endl;
 True
 True std::cout << "输入华氏度: ";
 True std::cin >> f;
 True c = TemperatureConverter::fahrenheit_to_celsius(f);
 True k = TemperatureConverter::celsius_to_kelvin(c);
 True std::cout << f << "°F = " << c << "°C = " << k << "K" << std::endl;
 True
 True return 0;
 True}
 True```

 False### 5.2 素数判断
 False
```cpp
 True#include <iostream>
 True#include <cmath>
 True#include <vector>
 True
 True// 单个素数判断
 Truebool is_prime(int n) {
 True if (n <= 1) return false;
 True if (n == 2) return true;
 True if (n % 2 == 0) return false;
 True
 True int sqrt_n = sqrt(n);
 True for (int i = 3; i <= sqrt_n; i += 2) {
 True if (n % i == 0) return false;
 True }
 True
 True return true;
 True}
 True
 True// 埃拉托斯特尼筛法生成素数列表
 Truestd::vector<int> sieve_of_eratosthenes(int max) {
 True std::vector<bool> is_prime(max + 1, true);
 True std::vector<int> primes;
 True
 True is_prime[0] = is_prime[1] = false;
 True
 True for (int i = 2; i <= max; ++i) {
 True if (is_prime[i]) {
 True primes.push_back(i);
 True for (int j = i * 2; j <= max; j += i) {
 True is_prime[j] = false;
 True }
 True }
 True }
 True
 True return primes;
 True}
 True
 True// 素数工具类
 Trueclass PrimeUtils {
 Truepublic:
 True static bool is_prime(int n) {
 True if (n <= 1) return false;
 True if (n == 2) return true;
 True if (n % 2 == 0) return false;
 True
 True int sqrt_n = sqrt(n);
 True for (int i = 3; i <= sqrt_n; i += 2) {
 True if (n % i == 0) return false;
 True }
 True
 True return true;
 True }
 True
 True static std::vector<int> sieve_of_eratosthenes(int max) {
 True std::vector<bool> is_prime(max + 1, true);
 True std::vector<int> primes;
 True
 True is_prime[0] = is_prime[1] = false;
 True
 True for (int i = 2; i <= max; ++i) {
 True if (is_prime[i]) {
 True primes.push_back(i);
 True for (int j = i * 2; j <= max; j += i) {
 True is_prime[j] = false;
 True }
 True }
 True }
 True
 True return primes;
 True }
 True
 True static int count_primes(int max) {
 True auto primes = sieve_of_eratosthenes(max);
 True return primes.size();
 True }
 True};
 True
 Trueint main() {
 True int n;
 True std::cout << "输入一个整数: ";
 True std::cin >> n;
 True
 True if (PrimeUtils::is_prime(n)) {
 True std::cout << n << " 是素数" << std::endl;
 True } else {
 True std::cout << n << " 不是素数" << std::endl;
 True }
 True
 True int max;
 True std::cout << "输入最大值，生成素数列表: ";
 True std::cin >> max;
 True
 True auto primes = PrimeUtils::sieve_of_eratosthenes(max);
 True std::cout << "小于等于 " << max << " 的素数有 " << primes.size() << " 个: " << std::endl;
 True for (int prime : primes) {
 True std::cout << prime << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 5.3 数组操作
 False
```cpp
 True#include <iostream>
 True#include <vector>
 True#include <algorithm>
 True#include <numeric>
 True
 True// 计算数组和
 Trueint sum_array(const std::vector<int>& arr) {
 True int sum = 0;
 True for (int num : arr) {
 True sum += num;
 True }
 True return sum;
 True}
 True
 True// 使用标准库计算数组和
 Trueint sum_array_std(const std::vector<int>& arr) {
 True return std::accumulate(arr.begin(), arr.end(), 0);
 True}
 True
 True// 查找最大值
 Trueint find_max(const std::vector<int>& arr) {
 True if (arr.empty()) {
 True throw std::runtime_error("Array is empty");
 True }
 True
 True int max = arr[0];
 True for (int num : arr) {
 True if (num > max) {
 True max = num;
 True }
 True }
 True return max;
 True}
 True
 True// 使用标准库查找最大值
 Trueint find_max_std(const std::vector<int>& arr) {
 True if (arr.empty()) {
 True throw std::runtime_error("Array is empty");
 True }
 True return *std::max_element(arr.begin(), arr.end());
 True}
 True
 True// 数组排序
 Truevoid sort_array(std::vector<int>& arr) {
 True std::sort(arr.begin(), arr.end());
 True}
 True
 True// 数组去重
 Truestd::vector<int> remove_duplicates(const std::vector<int>& arr) {
 True std::vector<int> result = arr;
 True std::sort(result.begin(), result.end());
 True auto last = std::unique(result.begin(), result.end());
 True result.erase(last, result.end());
 True return result;
 True}
 True
 True// 数组工具类
 Trueclass ArrayUtils {
 Truepublic:
 True static int sum(const std::vector<int>& arr) {
 True return std::accumulate(arr.begin(), arr.end(), 0);
 True }
 True
 True static int max(const std::vector<int>& arr) {
 True if (arr.empty()) {
 True throw std::runtime_error("Array is empty");
 True }
 True return *std::max_element(arr.begin(), arr.end());
 True }
 True
 True static int min(const std::vector<int>& arr) {
 True if (arr.empty()) {
 True throw std::runtime_error("Array is empty");
 True }
 True return *std::min_element(arr.begin(), arr.end());
 True }
 True
 True static double average(const std::vector<int>& arr) {
 True if (arr.empty()) {
 True throw std::runtime_error("Array is empty");
 True }
 True int sum = std::accumulate(arr.begin(), arr.end(), 0);
 True return static_cast<double>(sum) / arr.size();
 True }
 True
 True static void sort(std::vector<int>& arr, bool ascending = true) {
 True if (ascending) {
 True std::sort(arr.begin(), arr.end());
 True } else {
 True std::sort(arr.begin(), arr.end(), std::greater<int>());
 True }
 True }
 True
 True static std::vector<int> reverse(const std::vector<int>& arr) {
 True std::vector<int> result = arr;
 True std::reverse(result.begin(), result.end());
 True return result;
 True }
 True};
 True
 Trueint main() {
 True std::vector<int> numbers = {1, 5, 3, 9, 2, 5, 8, 3};
 True
 True std::cout << "原始数组: ";
 True for (int num : numbers) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True std::cout << "数组和: " << ArrayUtils::sum(numbers) << std::endl;
 True std::cout << "最大值: " << ArrayUtils::max(numbers) << std::endl;
 True std::cout << "最小值: " << ArrayUtils::min(numbers) << std::endl;
 True std::cout << "平均值: " << ArrayUtils::average(numbers) << std::endl;
 True
 True // 排序
 True ArrayUtils::sort(numbers);
 True std::cout << "排序后: ";
 True for (int num : numbers) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 去重
 True auto unique_numbers = remove_duplicates(numbers);
 True std::cout << "去重后: ";
 True for (int num : unique_numbers) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True // 反转
 True auto reversed = ArrayUtils::reverse(numbers);
 True std::cout << "反转后: ";
 True for (int num : reversed) {
 True std::cout << num << " ";
 True }
 True std::cout << std::endl;
 True
 True return 0;
 True}
 True```

 False### 5.4 字符串操作
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <algorithm>
 True#include <cctype>
 True
 True// 字符串工具类
 Trueclass StringUtils {
 Truepublic:
 True // 字符串反转
 True static std::string reverse(const std::string& str) {
 True std::string result = str;
 True std::reverse(result.begin(), result.end());
 True return result;
 True }
 True
 True // 字符串转大写
 True static std::string to_upper(const std::string& str) {
 True std::string result = str;
 True std::transform(result.begin(), result.end(), result.begin(),
 True [](unsigned char c) { return std::toupper(c); });
 True return result;
 True }
 True
 True // 字符串转小写
 True static std::string to_lower(const std::string& str) {
 True std::string result = str;
 True std::transform(result.begin(), result.end(), result.begin(),
 True [](unsigned char c) { return std::tolower(c); });
 True return result;
 True }
 True
 True // 去除首尾空格
 True static std::string trim(const std::string& str) {
 True size_t start = str.find_first_not_of(" \t\n\r");
 True if (start == std::string::npos) return "";
 True
 True size_t end = str.find_last_not_of(" \t\n\r");
 True return str.substr(start, end - start + 1);
 True }
 True
 True // 检查是否是回文
 True static bool is_palindrome(const std::string& str) {
 True std::string cleaned;
 True for (char c : str) {
 True if (std::isalnum(c)) {
 True cleaned += std::tolower(c);
 True }
 True }
 True
 True std::string reversed = cleaned;
 True std::reverse(reversed.begin(), reversed.end());
 True return cleaned == reversed;
 True }
 True
 True // 统计单词数量
 True static int count_words(const std::string& str) {
 True int count = 0;
 True bool in_word = false;
 True
 True for (char c : str) {
 True if (std::isspace(c)) {
 True in_word = false;
 True } else if (!in_word) {
 True in_word = true;
 True count++;
 True }
 True }
 True
 True return count;
 True }
 True};
 True
 Trueint main() {
 True std::string text = " Hello, World! ";
 True
 True std::cout << "原始字符串: '" << text << "'" << std::endl;
 True std::cout << "去除空格: '" << StringUtils::trim(text) << "'" << std::endl;
 True std::cout << "大写: '" << StringUtils::to_upper(text) << "'" << std::endl;
 True std::cout << "小写: '" << StringUtils::to_lower(text) << "'" << std::endl;
 True std::cout << "反转: '" << StringUtils::reverse(text) << "'" << std::endl;
 True
 True std::string palindrome = "A man a plan a canal Panama";
 True std::cout << "是否回文: '" << palindrome << "' -> "
 True << (StringUtils::is_palindrome(palindrome) ? "是" : "否") << std::endl;
 True
 True std::string sentence = "This is a test sentence";
 True std::cout << "单词数量: '" << sentence << "' -> "
 True << StringUtils::count_words(sentence) << std::endl;
 True
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_102 拆分，专注于类型系统（常量、类型推导、类型别名、最佳实践、代码示例）。
 False