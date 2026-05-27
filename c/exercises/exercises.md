# C 语言练习题
 False
 False> @Module: c
 False> @Total: 8
 False> @Difficulty: 进阶
 False
 False## 选择题
 False
 False### 1. 以下代码输出什么？
 False
```c
 Trueint a = 5;
 Trueint *p = &a;
 Trueprintf("%d", *p + 1);
 True```

 FalseA. 5
 FalseB. 6
 FalseC. 编译错误
 FalseD. 未定义行为
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `*p` 解引用得到 `a` 的值 5，`*p + 1` 等价于 `5 + 1 = 6`。注意 `*p + 1` 与 `*(p + 1)` 不同，后者才是指针偏移。
 False</details>
 False
 False### 2. 关于 `int arr[5]`，以下说法正确的是？
 False
 FalseA. `arr` 和 `&arr` 类型相同
 FalseB. `arr + 1` 偏移 `sizeof(int)` 字节
 FalseC. `&arr + 1` 偏移 `sizeof(int)` 字节
 FalseD. `arr` 可以重新赋值指向其他地址
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: `arr` 在大多数表达式中退化为 `int*`，`arr + 1` 偏移一个 `int` 的大小。而 `&arr` 的类型是 `int (*)[5]`，`&arr + 1` 偏移整个数组的大小（`5 * sizeof(int)`）。数组名不可赋值。
 False</details>
 False
 False### 3. 以下结构体在 64 位系统上（默认对齐）的大小是多少？
 False
```c
 Truestruct S {
 True char c;
 True int i;
 True double d;
 True};
 True```

 FalseA. 13 字节
 FalseB. 16 字节
 FalseC. 24 字节
 FalseD. 8 字节
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: B
 False
 False**解析**: 内存对齐规则：`char c` 占 1 字节（偏移 0），填充 3 字节后 `int i` 在偏移 4（对齐到 4），占 4 字节；`double d` 在偏移 8（对齐到 8），占 8 字节。总大小需为最大对齐数 8 的倍数，16 已满足。
 False</details>
 False
 False### 4. 使用 `fopen` 以 `"ab"` 模式打开文件，以下描述正确的是？
 False
 FalseA. 以只读方式打开二进制文件
 FalseB. 以追加方式打开文本文件
 FalseC. 以追加方式打开二进制文件，写入时在文件末尾添加
 FalseD. 以读写方式打开二进制文件
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `"a"` 表示追加（append），`"b"` 表示二进制模式（binary）。`"ab"` 组合即为以二进制追加模式打开文件，所有写入操作都在文件末尾进行。
 False</details>
 False
 False### 5. 以下代码存在什么问题？
 False
```c
 Trueint *p = (int *)malloc(sizeof(int) * 10);
 Truep[0] = 42;
 Truefree(p);
 Trueprintf("%d", p[0]);
 True```

 FalseA. 没有问题
 FalseB. 编译错误
 FalseC. 使用已释放的内存（悬空指针）
 FalseD. 内存泄漏
 False
 False<details>
 False<summary>查看答案</summary>
 False
 False**答案**: C
 False
 False**解析**: `free(p)` 后 `p` 成为悬空指针（dangling pointer），访问已释放内存是未定义行为。正确做法是 `free` 后将指针置为 `NULL`：`free(p); p = NULL;`。
 False</details>
 False
 False## 编程题
 False
 False### 1. 反转字符串
 False
 False编写函数 `void reverse_string(char *str)`，原地反转以 `\0` 结尾的字符串。
 False
 False**输入**: `char str[] = "hello"`
 False**输出**: `str` 变为 `"olleh"`
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```c
 Truevoid reverse_string(char *str) {
 True if (str == NULL) return;
 True char *left = str;
 True char *right = str + strlen(str) - 1;
 True while (left < right) {
 True char tmp = *left;
 True *left = *right;
 True *right = tmp;
 True left++;
 True right--;
 True }
 True}
 True```
</details>
 False
 False### 2. 动态数组实现
 False
 False实现一个简单的动态整数数组，支持 `push_back` 操作。当容量不足时，将容量翻倍。
 False
 False**输入**: 依次添加 1, 2, 3, 4, 5
 False**输出**: 数组内容为 [1, 2, 3, 4, 5]
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```c
 True#include <stdio.h>
 True#include <stdlib.h>
 True#include <string.h>
 True
 Truetypedef struct {
 True int *data;
 True size_t size;
 True size_t capacity;
 True} DynArray;
 True
 TrueDynArray *dyn_array_create(size_t initial_cap) {
 True DynArray *arr = (DynArray *)malloc(sizeof(DynArray));
 True arr->data = (int *)malloc(sizeof(int) * initial_cap);
 True arr->size = 0;
 True arr->capacity = initial_cap;
 True return arr;
 True}
 True
 Truevoid dyn_array_push(DynArray *arr, int value) {
 True if (arr->size == arr->capacity) {
 True arr->capacity *= 2;
 True arr->data = (int *)realloc(arr->data, sizeof(int) * arr->capacity);
 True }
 True arr->data[arr->size++] = value;
 True}
 True
 Truevoid dyn_array_free(DynArray *arr) {
 True free(arr->data);
 True free(arr);
 True}
 True
 Trueint main(void) {
 True DynArray *arr = dyn_array_create(2);
 True for (int i = 1; i <= 5; i++) {
 True dyn_array_push(arr, i);
 True }
 True for (size_t i = 0; i < arr->size; i++) {
 True printf("%d ", arr->data[i]);
 True }
 True dyn_array_free(arr);
 True return 0;
 True}
 True```
</details>
 False
 False### 3. 文件行计数器
 False
 False编写程序，读取文本文件并统计总行数、非空行数和包含特定关键字的行数。
 False
 False**输入**: 文件路径和关键字字符串
 False**输出**: 总行数、非空行数、含关键字的行数
 False
 False<details>
 False<summary>查看参考答案</summary>
 False
```c
 True#include <stdio.h>
 True#include <string.h>
 True#include <ctype.h>
 True
 Truetypedef struct {
 True int total;
 True int non_empty;
 True int keyword_matches;
 True} LineCount;
 True
 Trueint is_empty_line(const char *line) {
 True while (*line) {
 True if (!isspace((unsigned char)*line)) return 0;
 True line++;
 True }
 True return 1;
 True}
 True
 TrueLineCount count_lines(const char *filepath, const char *keyword) {
 True LineCount cnt = {0, 0, 0};
 True FILE *fp = fopen(filepath, "r");
 True if (!fp) {
 True perror("fopen failed");
 True return cnt;
 True }
 True char buf[1024];
 True while (fgets(buf, sizeof(buf), fp)) {
 True cnt.total++;
 True if (!is_empty_line(buf)) {
 True cnt.non_empty++;
 True }
 True if (keyword && strstr(buf, keyword)) {
 True cnt.keyword_matches++;
 True }
 True }
 True fclose(fp);
 True return cnt;
 True}
 True
 Trueint main(int argc, char *argv[]) {
 True if (argc < 2) {
 True fprintf(stderr, "Usage: %s <file> [keyword]\n", argv[0]);
 True return 1;
 True }
 True const char *kw = (argc >= 3) ? argv[2] : NULL;
 True LineCount c = count_lines(argv[1], kw);
 True printf("Total: %d\nNon-empty: %d\nKeyword matches: %d\n",
 True c.total, c.non_empty, c.keyword_matches);
 True return 0;
 True}
 True```
</details>
 False