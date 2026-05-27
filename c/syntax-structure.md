# 程序结构与基本语法 (Program Structure & Basic Syntax)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: C Basics
 False> @Description: C 程序的组成部分、注释规范、标识符规则及关键字。 | Components of C programs, comments, identifiers, and keywords.
 False
 False---
 False
 False## 目录
 False
 False1. [程序结构](#程序结构)
 False2. [注释规范](#注释规范)
 False3. [标识符](#标识符)
 False4. [关键字](#关键字)
 False5. [编译过程](#编译过程)
 False6. [程序执行流程](#程序执行流程)
 False
 False---
 False
 False## 1. 程序结构 (Program Structure)
 False
 False### 1.1 源文件结构
 False
 False一个典型的 C 语言源文件 (`.c`) 通常包含以下部分：
 False
```c
 True/*
 True * 预处理器指令：包含头文件
 True * Preprocessor Directives: Include headers
 True */
 True#include <stdio.h>
 True
 True/*
 True * 宏定义与常量
 True * Macros and Constants
 True */
 True#define PI 3.14159
 True#define MAX_SIZE 100
 True
 True/*
 True * 类型定义
 True * Type Definitions
 True */
 Truetypedef unsigned int uint;
 Truetypedef struct {
 True int x;
 True int y;
 True} Point;
 True
 True/*
 True * 全局变量声明
 True * Global Variables
 True */
 Trueint global_count = 0;
 Trueconst double GRAVITY = 9.8;
 True
 True/*
 True * 函数原型声明
 True * Function Prototypes
 True */
 Truevoid print_hello();
 Truedouble calculate_area(double radius);
 True
 True/*
 True * 主函数：程序的入口
 True * Main Function: Entry point
 True */
 Trueint main() {
 True // 局部变量 | Local Variables
 True int local_val = 10;
 True double radius = 5.0;
 True 
 True // 执行语句 | Statements
 True printf("Hello C! Value: %d\n", local_val);
 True print_hello();
 True 
 True double area = calculate_area(radius);
 True printf("Area of circle: %.2f\n", area);
 True 
 True // 返回值 | Return value (0 means success)
 True return 0;
 True}
 True
 True/*
 True * 函数实现
 True * Function Implementation
 True */
 Truevoid print_hello() {
 True printf("Hello from function!\n");
 True}
 True
 Truedouble calculate_area(double radius) {
 True return PI * radius * radius;
 True}
 True```

 False### 1.2 头文件结构
 False
 False头文件 (`.h`) 通常包含：
 False
```c
 True/*
 True * 防止重复包含的头文件保护
 True * Header guard
 True */
 True#ifndef MY_HEADER_H
 True#define MY_HEADER_H
 True
 True/*
 True * 包含其他头文件
 True * Include other headers
 True */
 True#include <stdio.h>
 True
 True/*
 True * 宏定义
 True * Macros
 True */
 True#define VERSION "1.0"
 True
 True/*
 True * 类型定义
 True * Type definitions
 True */
 Truetypedef struct {
 True int id;
 True char name[50];
 True} Student;
 True
 True/*
 True * 函数原型
 True * Function prototypes
 True */
 Truevoid init_student(Student *s, int id, const char *name);
 Truevoid print_student(const Student *s);
 True
 True#endif /* MY_HEADER_H */
 True```

 False## 2. 注释规范 (Comments)
 False
 False### 2.1 注释类型
 False
 False- **单行注释**: 使用 `//` (C99+ 支持)，用于简短的说明。
 False
 ```c
 True // 这是一个单行注释
 True int x = 10; // 行尾注释
 True ```

 False- **多行注释**: 使用 `/* ... */`，用于较长的说明或注释掉代码块。
 False
 ```c
 True /*
 True * 这是一个多行注释
 True * 可以跨越多行
 True */
 True 
 True /* 注释掉的代码
 True int y = 20;
 True printf("%d\n", y);
 True */
 True ```

 False- **文档注释**: 采用 Doxygen 格式，用于生成文档。
 False
 ```c
 True /**
 True * @brief 计算圆的面积
 True * @param radius 圆的半径
 True * @return 圆的面积
 True */
 True double calculate_area(double radius) {
 True return PI * radius * radius;
 True }
 True ```

 False### 2.2 注释最佳实践
 False
 False- **适度注释**: 只注释难以理解的代码，避免过多注释。
 False- **清晰明了**: 注释应简洁明了，说明代码的意图而非实现细节。
 False- **保持更新**: 代码修改时，同步更新相关注释。
 False- **一致风格**: 团队内保持统一的注释风格。
 False
 False## 3. 标识符 (Identifiers)
 False
 False### 3.1 命名规则
 False
 False用于命名变量、函数、数组、结构体等。
 False
 False- **基本规则**:
 False - 只能由字母 (A-Z, a-z)、数字 (0-9) 和下划线 (_) 组成。
 False - 第一个字符必须是字母或下划线。
 False - 区分大小写 (`myVar` 和 `myvar` 是不同的)。
 False - 不能使用关键字或保留字。
 False - 长度通常限制为 31 个字符（不同编译器可能有差异）。
 False
 False### 3.2 命名约定
 False
 False- **变量名**: 通常使用 `snake_case`，如 `user_age`、`total_count`。
 False- **函数名**: 通常使用 `snake_case`，如 `calculate_area`、`print_student`。
 False- **常量名**: 通常使用全大写加下划线，如 `MAX_SIZE`、`PI`。
 False- **结构体名**: 通常使用 `PascalCase`，如 `Student`、`Point`。
 False- **类型定义**: 通常使用 `snake_case` 并加 `_t` 后缀，如 `uint8_t`、`size_t`。
 False
 False### 3.3 命名最佳实践
 False
 False- **描述性**: 变量名应清晰描述其用途，如 `user_name` 而非 `un`。
 False- **一致性**: 同一项目中保持命名风格一致。
 False- **避免缩写**: 除非是广为人知的缩写（如 `id`、`url`）。
 False- **避免单字母变量**: 除了循环计数器（如 `i`、`j`）和数学变量（如 `x`、`y`）。
 False
 False## 4. 关键字 (Keywords)
 False
 False### 4.1 基本关键字 (C89/90)
 False
 FalseC 语言共有 32 个基本关键字：
 False
 False| 分类 | 关键字 |
 False|------|--------|
 False| 类型 | `int`, `char`, `float`, `double`, `void`, `long`, `short`, `signed`, `unsigned` |
 False| 控制流 | `if`, `else`, `switch`, `case`, `default`, `for`, `while`, `do`, `break`, `continue`, `return`, `goto` |
 False| 存储类 | `auto`, `register`, `static`, `extern`, `const`, `volatile` |
 False| 复合类型 | `struct`, `union`, `enum`, `typedef` |
 False| 运算符相关 | `sizeof` |
 False
 False### 4.2 C99 新增关键字
 False
 False- `inline`, `restrict`, `_Bool`, `_Complex`, `_Imaginary`
 False
 False### 4.3 C11 新增关键字
 False
 False- `_Alignas`, `_Alignof`, `_Atomic`, `_Generic`, `_Noreturn`, `_Static_assert`, `_Thread_local`
 False
 False### 4.4 C23 新增关键字
 False
 False- `nullptr`, `typeof`, `__VA_OPT__`
 False
 False## 5. 编译过程 (Compilation Process)
 False
 False### 5.1 详细编译步骤
 False
 False1. **预处理 (Preprocessing)**:
 False - 处理 `#include` 指令，将头文件内容插入到源文件中
 False - 处理 `#define` 指令，替换宏定义
 False - 处理条件编译指令（如 `#if`, `#ifdef`, `#ifndef`）
 False - 删除注释
 False - 输出预处理后的文件（通常为 `.i` 文件）
 False
 False2. **编译 (Compilation)**:
 False - 将预处理后的代码转换为汇编代码
 False - 进行语法检查和语义分析
 False - 进行优化（根据编译选项）
 False - 输出汇编文件（通常为 `.s` 文件）
 False
 False3. **汇编 (Assembly)**:
 False - 将汇编代码转换为机器码
 False - 生成目标文件（通常为 `.o` 文件，Windows 下为 `.obj`）
 False
 False4. **链接 (Linking)**:
 False - 将多个目标文件合并
 False - 解析外部符号引用
 False - 链接标准库和第三方库
 False - 生成可执行文件（Linux 下无扩展名，Windows 下为 `.exe`）
 False
 False### 5.2 编译示例
 False
```bash
 True# 1. 预处理
 Truegcc -E hello.c -o hello.i
 True
 True# 2. 编译
 True gcc -S hello.i -o hello.s
 True
 True# 3. 汇编
 Truegcc -c hello.s -o hello.o
 True
 True# 4. 链接
 Truegcc hello.o -o hello
 True
 True# 一步完成所有步骤
 Truegcc hello.c -o hello
 True
 True# 启用优化
 Truegcc -O2 hello.c -o hello
 True
 True# 生成调试信息
 Truegcc -g hello.c -o hello
 True```

 False### 5.3 多文件编译
 False
```bash
 True# 编译多个源文件
 Truegcc file1.c file2.c -o program
 True
 True# 分别编译，然后链接
 Truegcc -c file1.c -o file1.o
 Truegcc -c file2.c -o file2.o
 Truegcc file1.o file2.o -o program
 True```

 False## 6. 程序执行流程
 False
 False### 6.1 主函数执行
 False
 False- 程序从 `main()` 函数开始执行
 False- `main()` 函数可以有参数：
 False
 ```c
 True // 无参数形式
 True int main() {
 True // 代码
 True return 0;
 True }
 True 
 True // 带命令行参数形式
 True int main(int argc, char *argv[]) {
 True // argc: 参数个数
 True // argv: 参数数组
 True for (int i = 0; i < argc; i++) {
 True printf("Argument %d: %s\n", i, argv[i]);
 True }
 True return 0;
 True }
 True ```

 False### 6.2 程序终止
 False
 False- 正常终止：执行 `return 0;` 或 `exit(0);`
 False- 异常终止：执行 `exit(n);` 其中 n ≠ 0
 False- `return` 语句会返回到调用者，而 `exit()` 会直接终止整个程序
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分并细化基础语法。
 False- 2026-04-05: 详细扩写内容，增加了头文件结构、注释最佳实践、命名约定、关键字分类、编译过程详解和程序执行流程。
 False