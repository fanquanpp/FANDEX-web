# C++ 基础语法 (C++ Syntax Basics)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: C++ 基础数据类型、控制流、输入输出、命名空间及作用域。 | C++ primitive types, control flow, I/O, namespace, and scope.
 False
 False---
 False
 False## 目录
 False
 False1. [数据类型](#数据类型)
 False2. [控制流](#控制流)
 False3. [输入输出](#输入输出)
 False4. [命名空间](#命名空间)
 False5. [作用域](#作用域)
 False
 False---
 False
 False## 1. 数据类型 (Data Types)
 False
 FalseC++ 具有丰富的类型系统，分为基本类型和复合类型。
 False
 False### 1.1 基本数据类型
 False
 False| 类型 | 描述 | 大小 (字节) | 示例 |
 False| :--- | :--- | :--- | :--- |
 False| **整数类型** | | | |
 False| `char` | 字符 | 1 | `char c = 'A';` |
 False| `unsigned char` | 无符号字符 | 1 | `unsigned char uc = 255;` |
 False| `short` | 短整数 | 2 | `short s = 32767;` |
 False| `unsigned short` | 无符号短整数 | 2 | `unsigned short us = 65535;` |
 False| `int` | 整数 | 4 | `int x = 10;` |
 False| `unsigned int` | 无符号整数 | 4 | `unsigned int ux = 4294967295;` |
 False| `long` | 长整数 | 4 或 8 | `long l = 1000000;` |
 False| `unsigned long` | 无符号长整数 | 4 或 8 | `unsigned long ul = 1000000;` |
 False| `long long` | 长长整数 (C++11) | 8 | `long long ll = 10000000000;` |
 False| `unsigned long long` | 无符号长长整数 (C++11) | 8 | `unsigned long long ull = 18446744073709551615;` |
 False| **浮点类型** | | | |
 False| `float` | 单精度浮点数 | 4 | `float f = 3.14f;` |
 False| `double` | 双精度浮点数 | 8 | `double d = 3.1415926535;` |
 False| `long double` | 长双精度浮点数 | 8 或 16 | `long double ld = 3.14159265358979323846;` |
 False| **布尔类型** | | | |
 False| `bool` | 布尔值 | 1 | `bool is_valid = true;` |
 False| **空类型** | | | |
 False| `void` | 无类型 | - | 用于函数返回或通用指针 |
 False
 False### 1.2 复合数据类型
 False
 False| 类型 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| **数组** | 相同类型元素的集合 | `int arr[5] = {1, 2, 3, 4, 5};` |
 False| **字符串** | 字符序列 | `std::string s = "Hello C++";` |
 False| **指针** | 存储内存地址 | `int* p = &x;` |
 False| **引用** | 变量的别名 | `int& ref = x;` |
 False| **结构体** | 不同类型成员的集合 | `struct Person { std::string name; int age; };` |
 False| **联合体** | 共用内存的不同类型 | `union Data { int i; float f; char c; };` |
 False| **枚举** | 命名常量集合 | `enum Color { RED, GREEN, BLUE };` |
 False| **类** | 面向对象的类型 | `class MyClass { /* ... */ };` |
 False
 False### 1.3 类型修饰符
 False
 False| 修饰符 | 描述 | 示例 |
 False| :--- | :--- | :--- |
 False| `signed` | 有符号类型 (默认) | `signed int x = -10;` |
 False| `unsigned` | 无符号类型 | `unsigned int y = 10;` |
 False| `short` | 短类型 | `short s = 100;` |
 False| `long` | 长类型 | `long l = 1000000;` |
 False| `const` | 常量类型 | `const int MAX = 100;` |
 False| `volatile` | 易变类型 | `volatile int flag = 0;` |
 False| `constexpr` | 编译期常量 (C++11) | `constexpr int factorial(int n) { return n <= 1 ? 1 : n * factorial(n-1); }` |
 False| `auto` | 自动类型推断 (C++11) | `auto i = 10;` |
 False| `decltype` | 类型推导 (C++11) | `decltype(i) j = 20;` |
 False
 False### 1.4 类型转换
 False
 False#### 1.4.1 隐式类型转换
 False
```cpp
 Trueint i = 10;
 Truedouble d = i; // 隐式转换：int -> double
 True
 Truechar c = 'A';
 Truei = c; // 隐式转换：char -> int
 True```

 False#### 1.4.2 显式类型转换
 False
```cpp
 True// C 风格转换
 Truedouble d = 3.14;
 Trueint i = (int)d; // 截断小数部分
 True
 True// C++ 风格转换
 True// static_cast: 静态类型转换
 Truei = static_cast<int>(d);
 True
 True// dynamic_cast: 动态类型转换（用于多态）
 TrueBase* base = new Derived();
 TrueDerived* derived = dynamic_cast<Derived*>(base);
 True
 True// const_cast: 移除 const 修饰
 Trueconst int& const_ref = i;
 Trueint& ref = const_cast<int&>(const_ref);
 True
 True// reinterpret_cast: 重新解释类型
 Trueint* p = &i;
 Truelong addr = reinterpret_cast<long>(p);
 True```

 False## 2. 控制流 (Control Flow)
 False
 False### 2.1 条件判断
 False
 False#### 2.1.1 if 语句
 False
```cpp
 True// 基本 if 语句
 Trueint score = 85;
 True
 Trueif (score >= 90) {
 True std::cout << "优秀" << std::endl;
 True} else if (score >= 80) {
 True std::cout << "良好" << std::endl;
 True} else if (score >= 60) {
 True std::cout << "及格" << std::endl;
 True} else {
 True std::cout << "不及格" << std::endl;
 True}
 True
 True// 嵌套 if 语句
 Trueint x = 10, y = 20;
 Trueif (x > 0) {
 True if (y > 0) {
 True std::cout << "x 和 y 都是正数" << std::endl;
 True } else {
 True std::cout << "x 是正数，y 不是正数" << std::endl;
 True }
 True}
 True
 True// 使用逻辑运算符
 Trueint a = 5, b = 10, c = 15;
 Trueif (a > 0 && b > 0 && c > 0) {
 True std::cout << "所有数都是正数" << std::endl;
 True}
 True
 Trueif (a > 10 || b > 10 || c > 10) {
 True std::cout << "至少有一个数大于 10" << std::endl;
 True}
 True```

 False#### 2.1.2 switch 语句
 False
```cpp
 True// 基本 switch 语句
 Trueint day = 3;
 True
 Trueswitch (day) {
 True case 1:
 True std::cout << "星期一" << std::endl;
 True break;
 True case 2:
 True std::cout << "星期二" << std::endl;
 True break;
 True case 3:
 True std::cout << "星期三" << std::endl;
 True break;
 True case 4:
 True std::cout << "星期四" << std::endl;
 True break;
 True case 5:
 True std::cout << "星期五" << std::endl;
 True break;
 True case 6:
 True case 7:
 True std::cout << "周末" << std::endl;
 True break;
 True default:
 True std::cout << "无效的日期" << std::endl;
 True break;
 True}
 True
 True// 使用枚举的 switch 语句
 Trueenum Color { RED, GREEN, BLUE };
 TrueColor color = GREEN;
 True
 Trueswitch (color) {
 True case RED:
 True std::cout << "红色" << std::endl;
 True break;
 True case GREEN:
 True std::cout << "绿色" << std::endl;
 True break;
 True case BLUE:
 True std::cout << "蓝色" << std::endl;
 True break;
 True default:
 True std::cout << "未知颜色" << std::endl;
 True break;
 True}
 True
 True// 使用枚举类的 switch 语句 (C++11)
 Trueenum class Direction { UP, DOWN, LEFT, RIGHT };
 TrueDirection dir = Direction::UP;
 True
 Trueswitch (dir) {
 True case Direction::UP:
 True std::cout << "向上" << std::endl;
 True break;
 True case Direction::DOWN:
 True std::cout << "向下" << std::endl;
 True break;
 True case Direction::LEFT:
 True std::cout << "向左" << std::endl;
 True break;
 True case Direction::RIGHT:
 True std::cout << "向右" << std::endl;
 True break;
 True}
 True```

 False### 2.2 循环结构
 False
 False#### 2.2.1 for 循环
 False
```cpp
 True// 传统 for 循环
 Truefor (int i = 0; i < 10; ++i) {
 True std::cout << i << " ";
 True}
 Truestd::cout << std::endl;
 True
 True// 循环变量作用域控制
 True{
 True for (int i = 0; i < 5; ++i) {
 True std::cout << i << " ";
 True }
 True // i 在这里不可见
 True}
 True
 True// 多变量 for 循环
 Truefor (int i = 0, j = 10; i < 5 && j > 5; ++i, --j) {
 True std::cout << "i: " << i << ", j: " << j << std::endl;
 True}
 True
 True// 范围 for 循环 (C++11)
 Truestd::vector<int> numbers = {1, 2, 3, 4, 5};
 Truefor (int num : numbers) {
 True std::cout << num << " ";
 True}
 Truestd::cout << std::endl;
 True
 True// 使用 auto 的范围 for 循环 (C++11)
 Truefor (auto num : numbers) {
 True std::cout << num << " ";
 True}
 Truestd::cout << std::endl;
 True
 True// 使用 const 引用的范围 for 循环（避免复制）
 Truefor (const auto& num : numbers) {
 True std::cout << num << " ";
 True}
 Truestd::cout << std::endl;
 True
 True// 使用引用的范围 for 循环（可以修改元素）
 Truefor (auto& num : numbers) {
 True num *= 2; // 每个元素都乘以 2
 True}
 True
 True// 遍历数组
 Trueint arr[] = {10, 20, 30, 40, 50};
 Truefor (int x : arr) {
 True std::cout << x << " ";
 True}
 Truestd::cout << std::endl;
 True```

 False#### 2.2.2 while 循环
 False
```cpp
 True// 基本 while 循环
 Trueint i = 0;
 Truewhile (i < 10) {
 True std::cout << i << " ";
 True ++i;
 True}
 Truestd::cout << std::endl;
 True
 True// 无限循环（需要内部 break）
 Truei = 0;
 Truewhile (true) {
 True std::cout << i << " ";
 True ++i;
 True if (i >= 10) {
 True break;
 True }
 True}
 Truestd::cout << std::endl;
 True
 True// 基于条件的 while 循环
 Truestd::string input;
 Truewhile (true) {
 True std::cout << "输入 'quit' 退出: ";
 True std::cin >> input;
 True if (input == "quit") {
 True break;
 True }
 True std::cout << "你输入了: " << input << std::endl;
 True}
 True```

 False#### 2.2.3 do-while 循环
 False
```cpp
 True// 基本 do-while 循环
 Trueint i = 0;
 Truedo {
 True std::cout << i << " ";
 True ++i;
 True} while (i < 10);
 Truestd::cout << std::endl;
 True
 True// 至少执行一次的情况
 Truestd::string password;
 Truedo {
 True std::cout << "请输入密码: ";
 True std::cin >> password;
 True} while (password != "123456");
 Truestd::cout << "密码正确！" << std::endl;
 True```

 False### 2.3 跳转语句
 False
 False#### 2.3.1 break 语句
 False
```cpp
 True// 在 for 循环中使用 break
 Truefor (int i = 0; i < 10; ++i) {
 True if (i == 5) {
 True break; // 跳出循环
 True }
 True std::cout << i << " ";
 True}
 True// 输出: 0 1 2 3 4
 True
 True// 在 while 循环中使用 break
 Trueint j = 0;
 Truewhile (j < 10) {
 True if (j == 5) {
 True break;
 True }
 True std::cout << j << " ";
 True ++j;
 True}
 True
 True// 在 switch 语句中使用 break
 Trueint value = 2;
 Trueswitch (value) {
 True case 1:
 True std::cout << "值为 1" << std::endl;
 True break;
 True case 2:
 True std::cout << "值为 2" << std::endl;
 True break; // 没有这个 break 会继续执行下一个 case
 True case 3:
 True std::cout << "值为 3" << std::endl;
 True break;
 True}
 True```

 False#### 2.3.2 continue 语句
 False
```cpp
 True// 在 for 循环中使用 continue
 Truefor (int i = 0; i < 10; ++i) {
 True if (i % 2 == 0) {
 True continue; // 跳过当前迭代
 True }
 True std::cout << i << " ";
 True}
 True// 输出: 1 3 5 7 9
 True
 True// 在 while 循环中使用 continue
 Trueint j = 0;
 Truewhile (j < 10) {
 True ++j;
 True if (j % 2 == 0) {
 True continue;
 True }
 True std::cout << j << " ";
 True}
 True
 True// 在范围 for 循环中使用 continue
 Truestd::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
 Truefor (auto num : nums) {
 True if (num % 3 == 0) {
 True continue;
 True }
 True std::cout << num << " ";
 True}
 True```

 False#### 2.3.3 return 语句
 False
```cpp
 True// 基本 return 语句
 Trueint add(int a, int b) {
 True return a + b; // 返回值并结束函数
 True}
 True
 True// 提前返回
 Truebool is_even(int n) {
 True if (n % 2 == 0) {
 True return true; // 提前返回
 True }
 True return false;
 True}
 True
 True// 返回引用
 Trueint& get_largest(int& a, int& b) {
 True if (a > b) {
 True return a;
 True }
 True return b;
 True}
 True
 True// 返回空
 Truevoid print_hello() {
 True std::cout << "Hello!" << std::endl;
 True return; // 可选
 True}
 True
 Trueint main() {
 True int result = add(5, 3);
 True std::cout << "5 + 3 = " << result << std::endl;
 True
 True int x = 10, y = 20;
 True int& largest = get_largest(x, y);
 True largest = 100; // 修改返回的引用
 True std::cout << "x: " << x << ", y: " << y << std::endl;
 True
 True return 0; // 结束主函数
 True}
 True```

 False#### 2.3.4 goto 语句（不推荐使用）
 False
```cpp
 True// 基本 goto 语句
 Trueint main() {
 True int i = 0;
 Trueloop:
 True std::cout << i << " ";
 True ++i;
 True if (i < 10) {
 True goto loop; // 跳转到标签处
 True }
 True return 0;
 True}
 True
 True// 使用 goto 跳出多层循环
 Truevoid nested_loops() {
 True for (int i = 0; i < 10; ++i) {
 True for (int j = 0; j < 10; ++j) {
 True if (i * j > 20) {
 True goto exit_loops; // 跳出所有循环
 True }
 True std::cout << "i: " << i << ", j: " << j << std::endl;
 True }
 True }
 Trueexit_loops:
 True std::cout << "跳出循环" << std::endl;
 True}
 True
 True// 使用 goto 进行错误处理
 Truebool process_data() {
 True // 模拟错误
 True bool error = true;
 True if (error) {
 True goto error_handler;
 True }
 True // 正常处理
 True return true;
 True
 Trueerror_handler:
 True std::cout << "处理错误" << std::endl;
 True return false;
 True}
 True```

 False## 3. 输入输出 (I/O)
 False
 False### 3.1 标准输入输出
 False
 False#### 3.1.1 输出
 False
```cpp
 True#include <iostream>
 True
 Trueint main() {
 True // 基本输出
 True std::cout << "Hello, C++!" << std::endl;
 True
 True // 多个值输出
 True int x = 10;
 True double y = 3.14;
 True std::cout << "x = " << x << ", y = " << y << std::endl;
 True
 True // 使用 endl 换行并刷新缓冲区
 True std::cout << "Line 1" << std::endl;
 True std::cout << "Line 2" << std::endl;
 True
 True // 使用 \n 仅换行
 True std::cout << "Line 1\nLine 2" << std::endl;
 True
 True // 输出布尔值
 True bool flag = true;
 True std::cout << "Flag: " << flag << std::endl; // 输出 1
 True std::cout << std::boolalpha << "Flag: " << flag << std::endl; // 输出 true
 True
 True // 输出字符和字符串
 True char c = 'A';
 True std::string s = "Hello";
 True std::cout << "Character: " << c << std::endl;
 True std::cout << "String: " << s << std::endl;
 True
 True return 0;
 True}
 True```

 False#### 3.1.2 输入
 False
```cpp
 True#include <iostream>
 True#include <string>
 True
 Trueint main() {
 True // 输入整数
 True int x;
 True std::cout << "Enter an integer: ";
 True std::cin >> x;
 True std::cout << "You entered: " << x << std::endl;
 True
 True // 输入浮点数
 True double y;
 True std::cout << "Enter a double: ";
 True std::cin >> y;
 True std::cout << "You entered: " << y << std::endl;
 True
 True // 输入布尔值
 True bool flag;
 True std::cout << "Enter a boolean (0 or 1): ";
 True std::cin >> flag;
 True std::cout << "You entered: " << std::boolalpha << flag << std::endl;
 True
 True // 输入字符
 True char c;
 True std::cout << "Enter a character: ";
 True std::cin >> c;
 True std::cout << "You entered: " << c << std::endl;
 True
 True // 输入字符串（遇到空格停止）
 True std::string name;
 True std::cout << "Enter your name: ";
 True std::cin >> name;
 True std::cout << "Hello, " << name << "!" << std::endl;
 True
 True // 输入一行字符串
 True std::string line;
 True std::cout << "Enter a line: ";
 True std::cin.ignore(); // 忽略之前的换行符
 True std::getline(std::cin, line);
 True std::cout << "You entered: " << line << std::endl;
 True
 True // 输入多个值
 True int a, b;
 True std::cout << "Enter two integers: ";
 True std::cin >> a >> b;
 True std::cout << "You entered: " << a << " and " << b << std::endl;
 True
 True return 0;
 True}
 True```

 False#### 3.1.3 输入验证
 False
```cpp
 True#include <iostream>
 True#include <limits>
 True
 Trueint main() {
 True int age;
 True
 True // 验证输入是否为整数
 True while (true) {
 True std::cout << "Enter your age: ";
 True if (std::cin >> age) {
 True // 输入成功
 True break;
 True } else {
 True // 输入失败，清除错误状态
 True std::cin.clear();
 True // 忽略无效输入
 True std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
 True std::cout << "Invalid input. Please enter a number." << std::endl;
 True }
 True }
 True
 True std::cout << "Your age is: " << age << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.2 格式化输出
 False
```cpp
 True#include <iostream>
 True#include <iomanip>
 True
 Trueint main() {
 True // 设置输出宽度
 True std::cout << std::setw(10) << "Name" << std::setw(10) << "Age" << std::endl;
 True std::cout << std::setw(10) << "Alice" << std::setw(10) << 25 << std::endl;
 True std::cout << std::setw(10) << "Bob" << std::setw(10) << 30 << std::endl;
 True
 True // 设置填充字符
 True std::cout << std::setw(10) << std::setfill('*') << "Hello" << std::endl;
 True
 True // 设置精度
 True double pi = 3.1415926535;
 True std::cout << "Pi: " << std::setprecision(5) << pi << std::endl;
 True
 True // 固定精度
 True std::cout << "Pi (fixed): " << std::fixed << std::setprecision(2) << pi << std::endl;
 True
 True // 科学计数法
 True double large_num = 123456789.123456;
 True std::cout << "Large number: " << std::scientific << large_num << std::endl;
 True
 True // 十六进制输出
 True int x = 255;
 True std::cout << "Hex: " << std::hex << x << std::endl;
 True std::cout << "Hex (uppercase): " << std::hex << std::uppercase << x << std::endl;
 True
 True // 八进制输出
 True std::cout << "Octal: " << std::oct << x << std::endl;
 True
 True // 重置为十进制
 True std::cout << "Decimal: " << std::dec << x << std::endl;
 True
 True // 显示正负号
 True int positive = 10;
 True int negative = -10;
 True std::cout << "Positive: " << std::showpos << positive << std::endl;
 True std::cout << "Negative: " << negative << std::endl;
 True std::cout << std::noshowpos; // 关闭显示正负号
 True
 True // 显示前导零
 True int num = 42;
 True std::cout << "With leading zeros: " << std::setw(5) << std::setfill('0') << num << std::endl;
 True
 True return 0;
 True}
 True```

 False### 3.3 文件输入输出
 False
```cpp
 True#include <iostream>
 True#include <fstream>
 True#include <string>
 True
 Trueint main() {
 True // 写入文件
 True std::ofstream outfile("example.txt");
 True if (outfile.is_open()) {
 True outfile << "Hello, File!" << std::endl;
 True outfile << "This is a test." << std::endl;
 True outfile << "Number: " << 42 << std::endl;
 True outfile.close();
 True std::cout << "File written successfully." << std::endl;
 True } else {
 True std::cerr << "Unable to open file for writing." << std::endl;
 True }
 True
 True // 读取文件
 True std::ifstream infile("example.txt");
 True if (infile.is_open()) {
 True std::string line;
 True std::cout << "File contents:" << std::endl;
 True while (std::getline(infile, line)) {
 True std::cout << line << std::endl;
 True }
 True infile.close();
 True } else {
 True std::cerr << "Unable to open file for reading." << std::endl;
 True }
 True
 True return 0;
 True}
 True```

 False### 3.4 字符串流
 False
```cpp
 True#include <iostream>
 True#include <sstream>
 True#include <string>
 True
 Trueint main() {
 True // 输出字符串流
 True std::stringstream ss;
 True ss << "Name: " << "Alice" << ", Age: " << 25 << ", Score: " << 95.5;
 True std::string result = ss.str();
 True std::cout << "String stream result: " << result << std::endl;
 True
 True // 输入字符串流
 True std::string data = "10 3.14 Hello";
 True std::stringstream input_ss(data);
 True
 True int i;
 True double d;
 True std::string s;
 True
 True input_ss >> i >> d >> s;
 True std::cout << "Parsed values: " << i << ", " << d << ", " << s << std::endl;
 True
 True // 格式化数字为字符串
 True std::stringstream format_ss;
 True format_ss << std::fixed << std::setprecision(2) << 3.14159;
 True std::string pi_str = format_ss.str();
 True std::cout << "Formatted pi: " << pi_str << std::endl;
 True
 True return 0;
 True}
 True```

 False## 4. 命名空间 (Namespace)
 False
 False### 4.1 命名空间的定义
 False
```cpp
 True// 定义命名空间
 Truenamespace MyNamespace {
 True int add(int a, int b) {
 True return a + b;
 True }
 True
 True namespace Nested {
 True int multiply(int a, int b) {
 True return a * b;
 True }
 True }
 True}
 True
 Trueint main() {
 True // 使用命名空间
 True int result1 = MyNamespace::add(5, 3);
 True int result2 = MyNamespace::Nested::multiply(5, 3);
 True
 True std::cout << "5 + 3 = " << result1 << std::endl;
 True std::cout << "5 * 3 = " << result2 << std::endl;
 True
 True return 0;
 True}
 True```

 False### 4.2 using 声明
 False
```cpp
 True#include <iostream>
 True
 True// 使用命名空间中的特定成员
 Trueusing std::cout;
 Trueusing std::endl;
 True
 Trueint main() {
 True cout << "Hello, C++!" << endl;
 True return 0;
 True}
 True```

 False### 4.3 using 指令
 False
```cpp
 True#include <iostream>
 True
 True// 使用整个命名空间
 Trueusing namespace std;
 True
 Trueint main() {
 True cout << "Hello, C++!" << endl;
 True return 0;
 True}
 True```

 False### 4.4 命名空间别名
 False
```cpp
 True#include <iostream>
 True
 Truenamespace long_namespace_name {
 True void func() {
 True std::cout << "Function in long namespace" << std::endl;
 True }
 True}
 True
 True// 命名空间别名
 Truenamespace lnn = long_namespace_name;
 True
 Trueint main() {
 True lnn::func();
 True return 0;
 True}
 True```

 False## 5. 作用域 (Scope)
 False
 False### 5.1 块作用域
 False
```cpp
 Trueint main() {
 True // 全局作用域
 True int global_var = 10;
 True
 True if (true) {
 True // 块作用域
 True int local_var = 20;
 True std::cout << "local_var: " << local_var << std::endl;
 True std::cout << "global_var: " << global_var << std::endl;
 True }
 True
 True // 这里无法访问 local_var
 True std::cout << "global_var: " << global_var << std::endl;
 True
 True return 0;
 True}
 True```

 False### 5.2 函数作用域
 False
```cpp
 Truevoid func() {
 True // 函数作用域
 True int func_var = 100;
 True std::cout << "func_var: " << func_var << std::endl;
 True}
 True
 Trueint main() {
 True // 这里无法访问 func_var
 True func();
 True return 0;
 True}
 True```

 False### 5.3 类作用域
 False
```cpp
 Trueclass MyClass {
 Truepublic:
 True int public_var; // 类作用域
 Trueprivate:
 True int private_var; // 类作用域
 True};
 True
 Trueint main() {
 True MyClass obj;
 True obj.public_var = 10; // 可以访问
 True // obj.private_var = 20; // 无法访问，private 成员
 True return 0;
 True}
 True```

 False### 5.4 命名空间作用域
 False
```cpp
 Truenamespace MyNS {
 True int ns_var = 1000; // 命名空间作用域
 True}
 True
 Trueint main() {
 True std::cout << MyNS::ns_var << std::endl;
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_102 拆分，专注于基础语法（数据类型、控制流、I/O、命名空间、作用域）。
 False