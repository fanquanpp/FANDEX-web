# C++ 引用 (C++ References)
 False
 False> @Version: v4.0.0
 False> @Module: cpp
 False
 False> @Author: Anonymous
 False> @Category: C++ Basics
 False> @Description: C++ 引用基础、引用与函数、常量引用及指针与引用的区别。 | C++ reference basics, functions, const references, and pointer vs reference.
 False
 False---
 False
 False## 目录
 False
 False1. [引用基础](#引用基础)
 False2. [引用的特性](#引用的特性)
 False3. [引用与函数](#引用与函数)
 False4. [常量引用](#常量引用)
 False5. [指针与引用的区别](#指针与引用的区别)
 False
 False---
 False
 False## 1. 引用基础
 False
 False引用是变量的别名，必须在声明时初始化，且一旦绑定就不能重新绑定到其他变量。
 False
```cpp
 Trueint x = 10;
 Trueint& r = x; // 声明对 x 的引用
 Truer = 20; // 修改 r 就是修改 x
 Truestd::cout << x; // 输出 20
 True```

 False## 2. 引用的特性
 False
 False- **必须初始化**: 声明时必须绑定到一个变量
 False- **不可重绑定**: 一旦绑定，不能改变指向
 False- **不能为空**: 引用必须指向有效对象
 False- **不能建立引用的引用**: 不能有引用的引用
 False- **不能建立数组的引用**: 不能直接引用数组
 False
 False## 3. 引用与函数
 False
```cpp
 True// 引用作为函数参数（传引用）
 Truevoid swap(int& a, int& b) {
 True int temp = a;
 True a = b;
 True b = temp;
 True}
 True
 Trueint main() {
 True int x = 10, y = 20;
 True swap(x, y);
 True std::cout << x << " " << y; // 输出 20 10
 True return 0;
 True}
 True
 True// 引用作为函数返回值
 Trueint& get_element(int arr[], int index) {
 True return arr[index];
 True}
 True
 Trueint main() {
 True int arr[] = {1, 2, 3, 4, 5};
 True get_element(arr, 2) = 10; // 修改数组元素
 True std::cout << arr[2]; // 输出 10
 True return 0;
 True}
 True```

 False## 4. 常量引用
 False
```cpp
 True// 常量引用可以绑定到常量或临时值
 Trueconst int& cr = 10; // 合法，临时值会被延长生命周期
 True
 True// 常量引用可以绑定到不同类型（隐式转换）
 Truedouble d = 3.14;
 Trueconst int& cr2 = d; // 合法，d 会被转换为 int
 True
 True// 非常量引用不能绑定到临时值
 True// int& r = 10; // 错误
 True
 True// 非常量引用不能绑定到不同类型
 True// int& r2 = d; // 错误
 True```

 False## 5. 指针与引用的区别
 False
 False| 特性 | 指针 | 引用 |
 False| :--- | :--- | :--- |
 False| 空值 | 可以为空 | 不能为空 |
 False| 重绑定 | 可以改变指向 | 不能改变绑定 |
 False| 内存开销 | 占用内存空间 | 不占用额外内存 |
 False| 操作符 | 使用 `*` 解引用 | 直接使用 |
 False| 算术运算 | 支持指针算术 | 不支持 |
 False| 多级 | 支持多级指针 | 不支持引用的引用 |
 False
 False---
 False
 False### 更新日志 (Changelog)
 False- 2026-05-27: 从 C13_103 拆分，专注于引用相关内容。
 False