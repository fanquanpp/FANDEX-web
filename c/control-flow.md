# 控制流 (Control Flow)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: C Basics
 False> @Description: 条件判断、循环结构及其控制语句。 | Conditional branches, loop structures, and control statements.
 False
 False---
 False
 False## 目录
 False
 False1. [条件判断](#条件判断)
 False2. [循环结构](#循环结构)
 False3. [循环控制语句](#循环控制语句)
 False4. [控制流的最佳实践](#控制流的最佳实践)
 False5. [常见问题与解决方案](#常见问题与解决方案)
 False6. [控制流的高级应用](#控制流的高级应用)
 False7. [代码优化技巧](#代码优化技巧)
 False
 False---
 False
 False## 1. 条件判断 (Selection)
 False
 False### 1.1 `if-else` 结构
 False
 False#### 1.1.1 基本用法
 False
 False`if-else` 结构是最基本的条件控制语句，用于根据条件执行不同的代码块。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int score = 85;
 True 
 True if (score >= 90) {
 True printf("Excellent\n");
 True } else if (score >= 80) {
 True printf("Very Good\n");
 True } else if (score >= 60) {
 True printf("Pass\n");
 True } else {
 True printf("Fail\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 1.1.2 嵌套 `if-else`
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int age = 18;
 True int has_license = 1;
 True 
 True if (age >= 18) {
 True if (has_license) {
 True printf("You can drive\n");
 True } else {
 True printf("You need a license to drive\n");
 True }
 True } else {
 True printf("You are too young to drive\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 1.1.3 条件表达式的简写
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int a = 10, b = 20;
 True 
 True // 简单的条件判断可以使用三目运算符
 True int max = (a > b) ? a : b;
 True printf("Max: %d\n", max);
 True 
 True // 条件表达式作为函数参数
 True printf("Result: %s\n", (a > b) ? "a is larger" : "b is larger");
 True 
 True return 0;
 True}
 True```

 False### 1.2 `switch-case` 结构
 False
 False#### 1.2.1 基本用法
 False
 False`switch-case` 结构用于多分支选择，比嵌套的 `if-else` 更清晰。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True char grade = 'B';
 True 
 True switch (grade) {
 True case 'A':
 True printf("Great!\n");
 True break;
 True case 'B':
 True printf("Good!\n");
 True break;
 True case 'C':
 True printf("Average\n");
 True break;
 True case 'D':
 True printf("Below Average\n");
 True break;
 True case 'F':
 True printf("Fail\n");
 True break;
 True default:
 True printf("Unknown grade\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 1.2.2 整数类型的 `switch`
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int day = 3;
 True 
 True switch (day) {
 True case 1:
 True printf("Monday\n");
 True break;
 True case 2:
 True printf("Tuesday\n");
 True break;
 True case 3:
 True printf("Wednesday\n");
 True break;
 True case 4:
 True printf("Thursday\n");
 True break;
 True case 5:
 True printf("Friday\n");
 True break;
 True case 6:
 True case 7:
 True printf("Weekend\n");
 True break;
 True default:
 True printf("Invalid day\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 1.2.3 `switch` 中的穿透现象
 False
 False当 `case` 语句后没有 `break` 时，会发生穿透现象，继续执行下一个 `case`。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int month = 2;
 True int days;
 True 
 True switch (month) {
 True case 1:
 True case 3:
 True case 5:
 True case 7:
 True case 8:
 True case 10:
 True case 12:
 True days = 31;
 True break;
 True case 4:
 True case 6:
 True case 9:
 True case 11:
 True days = 30;
 True break;
 True case 2:
 True days = 28; // 简化处理，未考虑闰年
 True break;
 True default:
 True days = 0;
 True printf("Invalid month\n");
 True }
 True 
 True if (days > 0) {
 True printf("Month %d has %d days\n", month, days);
 True }
 True 
 True return 0;
 True}
 True```

 False## 2. 循环结构 (Iteration)
 False
 False### 2.1 `for` 循环
 False
 False#### 2.1.1 基本用法
 False
 False`for` 循环常用于已知循环次数的场景，结构清晰。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True // 基本 for 循环
 True for (int i = 0; i < 10; i++) {
 True printf("%d ", i);
 True }
 True printf("\n");
 True 
 True // 循环变量初始化、条件、增量都可以省略
 True int j = 0;
 True for (; j < 10;) {
 True printf("%d ", j);
 True j++;
 True }
 True printf("\n");
 True 
 True return 0;
 True}
 True```

 False#### 2.1.2 嵌套 `for` 循环
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True // 打印乘法表
 True for (int i = 1; i <= 9; i++) {
 True for (int j = 1; j <= i; j++) {
 True printf("%d*%d=%d\t", j, i, i*j);
 True }
 True printf("\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 2.1.3 特殊的 `for` 循环用法
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True // 使用多个循环变量
 True for (int i = 0, j = 10; i < j; i++, j--) {
 True printf("i=%d, j=%d\n", i, j);
 True }
 True 
 True // 无限循环
 True // for (;;) {
 True // // 循环体
 True // }
 True 
 True return 0;
 True}
 True```

 False### 2.2 `while` 循环
 False
 False#### 2.2.1 基本用法
 False
 False`while` 循环适用于循环次数不确定的场景，只要条件为真就继续执行。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int i = 0;
 True while (i < 10) {
 True printf("%d ", i);
 True i++;
 True }
 True printf("\n");
 True 
 True return 0;
 True}
 True```

 False#### 2.2.2 输入验证
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int age;
 True printf("Enter your age: ");
 True 
 True // 验证输入是否为有效年龄
 True while (1) {
 True scanf("%d", &age);
 True if (age >= 0 && age <= 120) {
 True break;
 True }
 True printf("Invalid age. Please enter again: ");
 True }
 True 
 True printf("Your age is %d\n", age);
 True 
 True return 0;
 True}
 True```

 False#### 2.2.3 无限循环
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int count = 0;
 True 
 True // 无限循环，直到满足条件跳出
 True while (1) {
 True printf("Count: %d\n", count);
 True count++;
 True 
 True if (count >= 5) {
 True break;
 True }
 True }
 True 
 True return 0;
 True}
 True```

 False### 2.3 `do-while` 循环
 False
 False#### 2.3.1 基本用法
 False
 False`do-while` 循环保证循环体至少执行一次，适用于需要先执行后判断的场景。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int i = 10;
 True do {
 True printf("Execute once\n");
 True i--;
 True } while (i < 5);
 True 
 True return 0;
 True}
 True```

 False#### 2.3.2 菜单驱动程序
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int choice;
 True 
 True do {
 True printf("\nMenu:\n");
 True printf("1. Option 1\n");
 True printf("2. Option 2\n");
 True printf("3. Exit\n");
 True printf("Enter your choice: ");
 True scanf("%d", &choice);
 True 
 True switch (choice) {
 True case 1:
 True printf("You selected Option 1\n");
 True break;
 True case 2:
 True printf("You selected Option 2\n");
 True break;
 True case 3:
 True printf("Exiting...\n");
 True break;
 True default:
 True printf("Invalid choice\n");
 True }
 True } while (choice != 3);
 True 
 True return 0;
 True}
 True```

 False## 3. 循环控制语句 (Control Statements)
 False
 False### 3.1 `break` 语句
 False
 False#### 3.1.1 基本用法
 False
 False`break` 语句用于立即退出当前循环，不再执行循环体中剩余的语句。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True for (int i = 0; i < 10; i++) {
 True if (i == 5) {
 True break; // 当 i 等于 5 时退出循环
 True }
 True printf("%d ", i);
 True }
 True printf("\nLoop exited\n");
 True 
 True return 0;
 True}
 True```

 False#### 3.1.2 跳出嵌套循环
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True for (int i = 0; i < 5; i++) {
 True for (int j = 0; j < 5; j++) {
 True printf("i=%d, j=%d\n", i, j);
 True if (i == 2 && j == 2) {
 True goto exit_loop; // 使用 goto 跳出多层循环
 True }
 True }
 True }
 True 
 True exit_loop:
 True printf("Exited nested loops\n");
 True 
 True return 0;
 True}
 True```

 False### 3.2 `continue` 语句
 False
 False#### 3.2.1 基本用法
 False
 False`continue` 语句用于跳过本次循环的剩余部分，直接进入下一次迭代。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True for (int i = 0; i < 10; i++) {
 True if (i % 2 == 0) {
 True continue; // 跳过偶数
 True }
 True printf("%d ", i);
 True }
 True printf("\n");
 True 
 True return 0;
 True}
 True```

 False#### 3.2.2 跳过特定条件
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int numbers[] = {1, 2, 3, 0, 4, 5, 0, 6};
 True int size = sizeof(numbers) / sizeof(numbers[0]);
 True 
 True for (int i = 0; i < size; i++) {
 True if (numbers[i] == 0) {
 True printf("Skipping zero\n");
 True continue;
 True }
 True printf("Number: %d\n", numbers[i]);
 True }
 True 
 True return 0;
 True}
 True```

 False### 3.3 `goto` 语句
 False
 False#### 3.3.1 基本用法
 False
 False`goto` 语句用于无条件跳转到指定的标签位置，一般不推荐使用，但在某些场景下可以简化代码。
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int i = 0;
 True 
 True start:
 True printf("i = %d\n", i);
 True i++;
 True 
 True if (i < 5) {
 True goto start;
 True }
 True 
 True printf("Loop completed\n");
 True 
 True return 0;
 True}
 True```

 False#### 3.3.2 跳过多层循环
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True for (int i = 0; i < 3; i++) {
 True for (int j = 0; j < 3; j++) {
 True for (int k = 0; k < 3; k++) {
 True printf("i=%d, j=%d, k=%d\n", i, j, k);
 True if (i == 1 && j == 1 && k == 1) {
 True goto end_of_loops;
 True }
 True }
 True }
 True }
 True 
 True end_of_loops:
 True printf("Exited all loops\n");
 True 
 True return 0;
 True}
 True```

 False#### 3.3.3 错误处理
 False
```c
 True#include <stdio.h>
 True#include <stdlib.h>
 True
 Trueint main() {
 True FILE *file;
 True 
 True file = fopen("nonexistent.txt", "r");
 True if (file == NULL) {
 True perror("Error opening file");
 True goto cleanup;
 True }
 True 
 True // 处理文件...
 True 
 True fclose(file);
 True 
 True cleanup:
 True printf("Program completed\n");
 True return 0;
 True}
 True```

 False## 4. 控制流的最佳实践
 False
 False### 4.1 代码风格建议
 False
 False- **缩进一致**: 使用 4 空格或 1 制表符的缩进
 False- **大括号使用**: 始终使用大括号包围循环体和条件块
 False- **命名规范**: 使用有意义的变量名
 False- **注释**: 为复杂的条件和循环添加注释
 False- **换行**: 在适当的地方换行，保持代码可读性
 False
 False### 4.2 性能优化建议
 False
 False- **循环不变量外提**: 将循环中不变的计算移到循环外
 False- **减少循环内操作**: 尽量减少循环体内的计算量
 False- **选择合适的循环类型**: 根据具体场景选择 `for`、`while` 或 `do-while`
 False- **避免死循环**: 确保循环条件最终能为假
 False- **使用 `break` 和 `continue`**: 合理使用这些语句提高循环效率
 False
 False### 4.3 常见错误避免
 False
 False- **无限循环**: 确保循环条件有终止的可能
 False- **嵌套过深**: 避免超过 3 层的嵌套，考虑重构为函数
 False- **条件判断错误**: 注意运算符优先级和逻辑关系
 False- **边界条件**: 处理好循环的边界情况
 False- **变量作用域**: 合理控制变量的作用域
 False
 False### 4.4 最佳实践示例
 False
```c
 True#include <stdio.h>
 True
 True// 计算斐波那契数列
 Truevoid fibonacci(int n) {
 True if (n <= 0) {
 True printf("Invalid input\n");
 True return;
 True }
 True 
 True int a = 0, b = 1;
 True printf("Fibonacci sequence: ");
 True 
 True for (int i = 0; i < n; i++) {
 True printf("%d ", a);
 True int next = a + b;
 True a = b;
 True b = next;
 True }
 True printf("\n");
 True}
 True
 True// 查找数组中的元素
 Trueint find_element(int arr[], int size, int target) {
 True for (int i = 0; i < size; i++) {
 True if (arr[i] == target) {
 True return i; // 找到元素，返回索引
 True }
 True }
 True return -1; // 未找到元素
 True}
 True
 Trueint main() {
 True // 调用斐波那契函数
 True fibonacci(10);
 True 
 True // 测试查找函数
 True int numbers[] = {10, 20, 30, 40, 50};
 True int size = sizeof(numbers) / sizeof(numbers[0]);
 True int target = 30;
 True int index = find_element(numbers, size, target);
 True 
 True if (index != -1) {
 True printf("Element %d found at index %d\n", target, index);
 True } else {
 True printf("Element %d not found\n", target);
 True }
 True 
 True return 0;
 True}
 True```

 False## 5. 常见问题与解决方案
 False
 False### 5.1 无限循环
 False
 False**问题**: 循环条件永远为真，导致程序陷入无限循环
 False**解决方案**: 确保循环条件最终能为假，或使用 `break` 语句退出循环
 False
```c
 True// 错误示例
 Truewhile (1) {
 True printf("This will run forever\n");
 True}
 True
 True// 正确示例
 Trueint count = 0;
 Truewhile (1) {
 True printf("Count: %d\n", count);
 True count++;
 True if (count >= 10) {
 True break;
 True }
 True}
 True```

 False### 5.2 循环条件错误
 False
 False**问题**: 循环条件设置错误，导致循环执行次数不符合预期
 False**解决方案**: 仔细检查循环条件，确保逻辑正确
 False
```c
 True// 错误示例：应该是 i < 10，而不是 i <= 10
 Truefor (int i = 0; i <= 10; i++) {
 True printf("%d ", i); // 会打印 0-10，共 11 个数
 True}
 True
 True// 正确示例
 Truefor (int i = 0; i < 10; i++) {
 True printf("%d ", i); // 打印 0-9，共 10 个数
 True}
 True```

 False### 5.3 边界条件处理
 False
 False**问题**: 循环的边界条件处理不当，导致数组越界或其他错误
 False**解决方案**: 确保循环变量在有效范围内
 False
```c
 True// 错误示例：可能导致数组越界
 Trueint arr[5] = {1, 2, 3, 4, 5};
 Truefor (int i = 0; i <= 5; i++) {
 True printf("%d ", arr[i]); // 访问 arr[5] 越界
 True}
 True
 True// 正确示例
 Trueint arr[5] = {1, 2, 3, 4, 5};
 Truefor (int i = 0; i < 5; i++) {
 True printf("%d ", arr[i]);
 True}
 True```

 False### 5.4 `switch` 语句缺少 `break`
 False
 False**问题**: `case` 语句后缺少 `break`，导致穿透现象
 False**解决方案**: 为每个 `case` 语句添加 `break`，除非需要穿透
 False
```c
 True// 错误示例：缺少 break
 Trueswitch (grade) {
 True case 'A':
 True printf("Great!\n");
 True case 'B':
 True printf("Good!\n"); // 当 grade 为 'A' 时也会执行
 True break;
 True}
 True
 True// 正确示例
 Trueswitch (grade) {
 True case 'A':
 True printf("Great!\n");
 True break;
 True case 'B':
 True printf("Good!\n");
 True break;
 True}
 True```

 False### 5.5 嵌套过深
 False
 False**问题**: 循环和条件嵌套过深，代码可读性差
 False**解决方案**: 将嵌套的代码重构为函数
 False
```c
 True// 嵌套过深的示例
 Truefor (int i = 0; i < 10; i++) {
 True if (i % 2 == 0) {
 True for (int j = 0; j < 5; j++) {
 True if (j > 2) {
 True // 处理逻辑
 True }
 True }
 True }
 True}
 True
 True// 重构为函数
 Truevoid process_even(int i) {
 True for (int j = 0; j < 5; j++) {
 True if (j > 2) {
 True // 处理逻辑
 True }
 True }
 True}
 True
 True// 主函数
 Truefor (int i = 0; i < 10; i++) {
 True if (i % 2 == 0) {
 True process_even(i);
 True }
 True}
 True```

 False## 6. 控制流的高级应用
 False
 False### 6.1 循环的替代方案
 False
 False#### 6.1.1 使用 `goto` 实现循环
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int i = 0;
 True 
 True loop:
 True if (i < 10) {
 True printf("%d ", i);
 True i++;
 True goto loop;
 True }
 True 
 True printf("\n");
 True return 0;
 True}
 True```

 False#### 6.1.2 使用递归代替循环
 False
```c
 True#include <stdio.h>
 True
 Truevoid print_numbers(int n) {
 True if (n < 0) {
 True return;
 True }
 True print_numbers(n - 1);
 True printf("%d ", n);
 True}
 True
 Trueint main() {
 True print_numbers(9);
 True printf("\n");
 True return 0;
 True}
 True```

 False### 6.2 复杂条件的处理
 False
 False#### 6.2.1 使用逻辑运算符组合条件
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True int age = 25;
 True int has_license = 1;
 True int has_car = 1;
 True 
 True // 复杂条件
 True if (age >= 18 && has_license && has_car) {
 True printf("You can drive\n");
 True } else if (age >= 18 && has_license) {
 True printf("You can drive if you have a car\n");
 True } else if (age >= 18) {
 True printf("You need a license to drive\n");
 True } else {
 True printf("You are too young to drive\n");
 True }
 True 
 True return 0;
 True}
 True```

 False#### 6.2.2 使用布尔函数简化条件
 False
```c
 True#include <stdio.h>
 True
 Trueint is_even(int n) {
 True return n % 2 == 0;
 True}
 True
 Trueint is_positive(int n) {
 True return n > 0;
 True}
 True
 Trueint main() {
 True int number = 4;
 True 
 True if (is_even(number) && is_positive(number)) {
 True printf("%d is a positive even number\n", number);
 True }
 True 
 True return 0;
 True}
 True```

 False### 6.3 状态机的实现
 False
```c
 True#include <stdio.h>
 True
 Trueint main() {
 True enum State {
 True STATE_START,
 True STATE_READING,
 True STATE_PROCESSING,
 True STATE_FINISHED
 True };
 True 
 True enum State current_state = STATE_START;
 True int data_processed = 0;
 True int max_data = 5;
 True 
 True while (current_state != STATE_FINISHED) {
 True switch (current_state) {
 True case STATE_START:
 True printf("Starting process\n");
 True current_state = STATE_READING;
 True break;
 True 
 True case STATE_READING:
 True printf("Reading data\n");
 True current_state = STATE_PROCESSING;
 True break;
 True 
 True case STATE_PROCESSING:
 True printf("Processing data %d\n", data_processed);
 True data_processed++;
 True 
 True if (data_processed >= max_data) {
 True current_state = STATE_FINISHED;
 True } else {
 True current_state = STATE_READING;
 True }
 True break;
 True 
 True case STATE_FINISHED:
 True printf("Process finished\n");
 True break;
 True }
 True }
 True 
 True return 0;
 True}
 True```

 False## 7. 代码优化技巧
 False
 False### 7.1 循环优化
 False
 False#### 7.1.1 减少循环内计算
 False
```c
 True// 优化前
 Truefor (int i = 0; i < strlen(s); i++) {
 True // 每次循环都计算 strlen(s)
 True}
 True
 True// 优化后
 Trueint len = strlen(s);
 Truefor (int i = 0; i < len; i++) {
 True // 只计算一次 strlen(s)
 True}
 True```

 False#### 7.1.2 使用递增而非递减
 False
```c
 True// 优化前
 Truefor (int i = n; i >= 0; i--) {
 True // 循环体
 True}
 True
 True// 优化后（某些架构上更高效）
 Truefor (int i = 0; i <= n; i++) {
 True // 循环体
 True}
 True```

 False#### 7.1.3 展开循环
 False
```c
 True// 优化前
 Truefor (int i = 0; i < 4; i++) {
 True process(i);
 True}
 True
 True// 优化后（展开循环）
 Trueprocess(0);
 Trueprocess(1);
 Trueprocess(2);
 Trueprocess(3);
 True```

 False### 7.2 条件优化
 False
 False#### 7.2.1 利用短路求值
 False
```c
 True// 优化前
 Trueif (ptr != NULL) {
 True if (ptr->value == 5) {
 True // 处理逻辑
 True }
 True}
 True
 True// 优化后
 Trueif (ptr != NULL && ptr->value == 5) {
 True // 处理逻辑
 True}
 True```

 False#### 7.2.2 条件顺序优化
 False
```c
 True// 优化前（假设 ptr == NULL 的概率较高）
 Trueif (ptr->value == 5 && ptr != NULL) {
 True // 可能会崩溃
 True}
 True
 True// 优化后
 Trueif (ptr != NULL && ptr->value == 5) {
 True // 更安全，利用短路求值
 True}
 True```

 False### 7.3 控制流优化示例
 False
```c
 True#include <stdio.h>
 True
 True// 优化前：多个 if-else 嵌套
 Trueint get_grade_point(char grade) {
 True if (grade == 'A') {
 True return 4;
 True } else if (grade == 'B') {
 True return 3;
 True } else if (grade == 'C') {
 True return 2;
 True } else if (grade == 'D') {
 True return 1;
 True } else {
 True return 0;
 True }
 True}
 True
 True// 优化后：使用 switch 语句
 Trueint get_grade_point_optimized(char grade) {
 True switch (grade) {
 True case 'A': return 4;
 True case 'B': return 3;
 True case 'C': return 2;
 True case 'D': return 1;
 True default: return 0;
 True }
 True}
 True
 Trueint main() {
 True char grade = 'B';
 True printf("Grade point: %d\n", get_grade_point(grade));
 True printf("Grade point (optimized): %d\n", get_grade_point_optimized(grade));
 True 
 True return 0;
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 拆分控制流详解
 False- 2026-04-05: 扩写内容，增加详细的代码示例、使用方法、最佳实践和常见问题解决方案
 False