# 运算符与表达式 (Operators & Expressions)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 算术、关系、逻辑、位运算及三元运算符详解。 | Detailed guide on Java operators, logic, bitwise, and ternary.
 False
 False---
 False
 False## 目录
 False
 False1. [运算符分类](#运算符分类)
 False2. [表达式](#表达式)
 False3. [运算符优先级](#运算符优先级)
 False4. [常见陷阱与最佳实践](#常见陷阱与最佳实践)
 False5. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 运算符分类
 False
 False### 1.1 算术运算符
 False
 False算术运算符用于执行基本的数学运算，包括加法、减法、乘法、除法和取模等。
 False
 False| 运算符 | 描述 | 示例 (a=10, b=3) | 结果 |
 False|--------|------|------------------|------|
 False| `+` | 加法 | `a + b` | 13 |
 False| `-` | 减法 | `a - b` | 7 |
 False| `*` | 乘法 | `a * b` | 30 |
 False| `/` | 除法 | `a / b` | 3 (整数除法) |
 False| `%` | 取模（取余） | `a % b` | 1 |
 False| `++` | 自增 | `a++` (先用后加) | 10 (a 变为 11) |
 False| `++` | 自增 | `++a` (先加后用) | 11 (a 变为 11) |
 False| `--` | 自减 | `b--` (先用后减) | 3 (b 变为 2) |
 False| `--` | 自减 | `--b` (先减后用) | 2 (b 变为 2) |
 False
 False**特殊用法**：
 False
 False- `+` 运算符还可以用于字符串拼接：`"Hello" + "World"` 结果为 `"HelloWorld"`
 False- 当 `+` 运算符两边有一个是字符串时，会将另一个操作数转换为字符串进行拼接
 False
 False**示例**：
 False
```java
 True// 基本算术运算
 Trueint a = 10;
 Trueint b = 3;
 TrueSystem.out.println("a + b = " + (a + b)); // 13
 TrueSystem.out.println("a - b = " + (a - b)); // 7
 TrueSystem.out.println("a * b = " + (a * b)); // 30
 TrueSystem.out.println("a / b = " + (a / b)); // 3 (整数除法)
 TrueSystem.out.println("a % b = " + (a % b)); // 1
 True
 True// 自增和自减
 Trueint c = 5;
 TrueSystem.out.println("c++ = " + c++); // 5 (先用后加)
 TrueSystem.out.println("c = " + c); // 6
 TrueSystem.out.println("++c = " + ++c); // 7 (先加后用)
 True
 True// 字符串拼接
 TrueString str1 = "Hello";
 TrueString str2 = "World";
 TrueSystem.out.println(str1 + " " + str2); // "Hello World"
 TrueSystem.out.println("The answer is: " + 42); // "The answer is: 42"
 True```

 False### 1.2 关系运算符
 False
 False关系运算符用于比较两个值的大小关系，结果为 `boolean` 类型（`true` 或 `false`）。
 False
 False| 运算符 | 描述 | 示例 (a=10, b=3) | 结果 |
 False|--------|------|------------------|------|
 False| `==` | 等于 | `a == b` | false |
 False| `!=` | 不等于 | `a != b` | true |
 False| `>` | 大于 | `a > b` | true |
 False| `<` | 小于 | `a < b` | false |
 False| `>=` | 大于等于 | `a >= b` | true |
 False| `<=` | 小于等于 | `a <= b` | false |
 False
 False**注意**：
 False
 False- 对于引用类型，`==` 比较的是对象的引用（内存地址），而不是对象的内容。要比较对象的内容，应使用 `equals()` 方法。
 False
 False**示例**：
 False
```java
 True// 基本类型比较
 Trueint a = 10;
 Trueint b = 3;
 TrueSystem.out.println("a == b: " + (a == b)); // false
 TrueSystem.out.println("a != b: " + (a != b)); // true
 TrueSystem.out.println("a > b: " + (a > b)); // true
 TrueSystem.out.println("a < b: " + (a < b)); // false
 TrueSystem.out.println("a >= b: " + (a >= b)); // true
 TrueSystem.out.println("a <= b: " + (a <= b)); // false
 True
 True// 引用类型比较
 TrueString s1 = "Hello";
 TrueString s2 = "Hello";
 TrueString s3 = new String("Hello");
 TrueSystem.out.println("s1 == s2: " + (s1 == s2)); // true (字符串常量池)
 TrueSystem.out.println("s1 == s3: " + (s1 == s3)); // false (不同对象)
 TrueSystem.out.println("s1.equals(s3): " + s1.equals(s3)); // true (内容相同)
 True```

 False### 1.3 逻辑运算符
 False
 False逻辑运算符用于连接布尔表达式，结果为 `boolean` 类型。
 False
 False| 运算符 | 描述 | 短路特性 | 示例 (a=true, b=false) | 结果 |
 False|--------|------|----------|----------------------|------|
 False| `&&` | 短路与 | 有（第一个为假则不计算第二个） | `a && b` | false |
 False| `||` | 短路或 | 有（第一个为真则不计算第二个） | `a || b` | true |
 False| `!` | 逻辑非 | 无 | `!a` | false |
 False| `&` | 逻辑与（无短路） | 无（总是计算两个操作数） | `a & b` | false |
 False| `|` | 逻辑或（无短路） | 无（总是计算两个操作数） | `a | b` | true |
 False| `^` | 逻辑异或 | 无 | `a ^ b` | true |
 False
 False**短路特性**：
 False
 False- `&&`：如果第一个操作数为 `false`，则第二个操作数不会被计算
 False- `||`：如果第一个操作数为 `true`，则第二个操作数不会被计算
 False
 False**示例**：
 False
```java
 True// 短路与
 Trueint x = 5;
 Trueb boolean result1 = (x > 10) && (x++ > 0);
 TrueSystem.out.println("result1: " + result1); // false
 TrueSystem.out.println("x: " + x); // 5 (x++ 未执行)
 True
 True// 短路或
 Trueint y = 5;
 Trueb boolean result2 = (y < 10) || (y++ > 0);
 TrueSystem.out.println("result2: " + result2); // true
 TrueSystem.out.println("y: " + y); // 5 (y++ 未执行)
 True
 True// 逻辑非
 Trueboolean flag = true;
 TrueSystem.out.println("!flag: " + !flag); // false
 True
 True// 逻辑异或
 Trueboolean a = true;
 Trueb boolean b = false;
 TrueSystem.out.println("a ^ b: " + (a ^ b)); // true
 True```

 False### 1.4 位运算符
 False
 False位运算符用于对二进制位进行操作，适用于整数类型（`byte`, `short`, `int`, `long`）。
 False
 False| 运算符 | 描述 | 示例 (a=6, b=3) | 二进制 | 结果 |
 False|--------|------|----------------|--------|------|
 False| `&` | 按位与 | `a & b` | `110 & 011 = 010` | 2 |
 False| `|` | 按位或 | `a | b` | `110 | 011 = 111` | 7 |
 False| `^` | 按位异或 | `a ^ b` | `110 ^ 011 = 101` | 5 |
 False| `~` | 按位取反 | `~a` | `~00000110 = 11111001` | -7 |
 False| `<<` | 左移 | `a << 1` | `110 << 1 = 1100` | 12 |
 False| `>>` | 右移（带符号） | `a >> 1` | `110 >> 1 = 011` | 3 |
 False| `>>>` | 右移（无符号） | `a >>> 1` | `110 >>> 1 = 011` | 3 |
 False
 False**说明**：
 False
 False- `<<`：左移 n 位，相当于乘以 2 的 n 次方
 False- `>>`：右移 n 位，相当于除以 2 的 n 次方（带符号）
 False- `>>>`：无符号右移，高位补 0
 False
 False**示例**：
 False
```java
 Trueint a = 6; // 二进制: 110
 Trueint b = 3; // 二进制: 011
 True
 TrueSystem.out.println("a & b = " + (a & b)); // 2 (010)
 TrueSystem.out.println("a | b = " + (a | b)); // 7 (111)
 TrueSystem.out.println("a ^ b = " + (a ^ b)); // 5 (101)
 TrueSystem.out.println("~a = " + (~a)); // -7
 TrueSystem.out.println("a << 1 = " + (a << 1)); // 12 (1100)
 TrueSystem.out.println("a >> 1 = " + (a >> 1)); // 3 (011)
 TrueSystem.out.println("a >>> 1 = " + (a >>> 1)); // 3 (011)
 True
 True// 负数的位运算
 Trueint c = -6; // 二进制补码: 11111111111111111111111111111010
 TrueSystem.out.println("c >> 1 = " + (c >> 1)); // -3 (带符号右移)
 TrueSystem.out.println("c >>> 1 = " + (c >>> 1)); // 2147483645 (无符号右移)
 True```

 False### 1.5 赋值运算符
 False
 False赋值运算符用于给变量赋值，包括简单赋值和复合赋值。
 False
 False| 运算符 | 描述 | 示例 | 等价于 |
 False|--------|------|------|--------|
 False| `=` | 简单赋值 | `a = 10` | `a = 10` |
 False| `+=` | 加法赋值 | `a += 5` | `a = a + 5` |
 False| `-=` | 减法赋值 | `a -= 5` | `a = a - 5` |
 False| `*=` | 乘法赋值 | `a *= 5` | `a = a * 5` |
 False| `/=` | 除法赋值 | `a /= 5` | `a = a / 5` |
 False| `%=` | 取模赋值 | `a %= 5` | `a = a % 5` |
 False| `<<=` | 左移赋值 | `a <<= 2` | `a = a << 2` |
 False| `>>=` | 右移赋值 | `a >>= 2` | `a = a >> 2` |
 False| `>>>=` | 无符号右移赋值 | `a >>>= 2` | `a = a >>> 2` |
 False| `&=` | 按位与赋值 | `a &= 5` | `a = a & 5` |
 False| `|=` | 按位或赋值 | `a |= 5` | `a = a | 5` |
 False| `^=` | 按位异或赋值 | `a ^= 5` | `a = a ^ 5` |
 False
 False**示例**：
 False
```java
 Trueint a = 10;
 True
 True// 简单赋值
 Truea = 20;
 TrueSystem.out.println("a = " + a); // 20
 True
 True// 复合赋值
 Truea += 5; // 等价于 a = a + 5
 TrueSystem.out.println("a += 5: " + a); // 25
 True
 Truea -= 3; // 等价于 a = a - 3
 TrueSystem.out.println("a -= 3: " + a); // 22
 True
 Truea *= 2; // 等价于 a = a * 2
 TrueSystem.out.println("a *= 2: " + a); // 44
 True
 Truea /= 4; // 等价于 a = a / 4
 TrueSystem.out.println("a /= 4: " + a); // 11
 True
 Truea %= 3; // 等价于 a = a % 3
 TrueSystem.out.println("a %= 3: " + a); // 2
 True```

 False### 1.6 三元运算符
 False
 False三元运算符是 Java 中唯一的三目运算符，用于根据条件表达式的值选择执行两个表达式中的一个。
 False
 False**语法**：`条件表达式 ? 表达式1 : 表达式2`
 False
 False**说明**：
 False
 False- 如果条件表达式为 `true`，则执行表达式1并返回其结果
 False- 如果条件表达式为 `false`，则执行表达式2并返回其结果
 False
 False**示例**：
 False
```java
 True// 基本用法
 Trueint a = 10;
 Trueint b = 20;
 Trueint max = (a > b) ? a : b;
 TrueSystem.out.println("Max: " + max); // 20
 True
 True// 嵌套使用
 Trueint x = 5;
 Trueint y = 10;
 Trueint z = 15;
 Trueint largest = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z);
 TrueSystem.out.println("Largest: " + largest); // 15
 True
 True// 用于赋值
 TrueString result = (a > b) ? "a is larger" : "b is larger";
 TrueSystem.out.println(result); // "b is larger"
 True```

 False## 2. 表达式
 False
 False### 2.1 表达式的概念
 False
 False表达式是由运算符和操作数组成的代码片段，用于计算一个值。表达式可以是简单的（如 `5 + 3`），也可以是复杂的（如 `(a + b) * c / d`）。
 False
 False### 2.2 表达式的类型
 False
 False根据表达式的结果类型，表达式可以分为以下几类：
 False
 False1. **算术表达式**：结果为数值类型，如 `a + b`, `x * y`
 False2. **关系表达式**：结果为布尔类型，如 `a > b`, `x == y`
 False3. **逻辑表达式**：结果为布尔类型，如 `a && b`, `x || y`
 False4. **位表达式**：结果为整数类型，如 `a & b`, `x << y`
 False5. **赋值表达式**：结果为赋值后变量的值，如 `a = 5`, `x += 3`
 False6. **三元表达式**：结果为表达式1或表达式2的值，如 `(a > b) ? a : b`
 False
 False### 2.3 表达式的求值
 False
 False表达式的求值顺序取决于运算符的优先级和结合性。
 False
 False**结合性**：当多个运算符具有相同优先级时，表达式的求值顺序（从左到右或从右到左）。
 False
 False| 运算符 | 结合性 |
 False|--------|--------|
 False| 算术运算符 | 从左到右 |
 False| 关系运算符 | 从左到右 |
 False| 逻辑运算符 | 从左到右 |
 False| 赋值运算符 | 从右到左 |
 False| 三元运算符 | 从右到左 |
 False
 False**示例**：
 False
```java
 True// 结合性示例
 Trueint a = 10;
 Trueint b = 5;
 Trueint c = 3;
 True
 True// 算术运算符：从左到右
 Trueint result1 = a + b * c; // 等价于 a + (b * c) = 10 + 15 = 25
 TrueSystem.out.println("result1: " + result1);
 True
 True// 赋值运算符：从右到左
 Trueint x, y;
 Truex = y = 5; // 等价于 x = (y = 5)
 TrueSystem.out.println("x: " + x + ", y: " + y); // x: 5, y: 5
 True
 True// 三元运算符：从右到左
 Trueint a = 10;
 Trueint b = 20;
 Trueint c = 30;
 Trueint result2 = a > b ? a : b > c ? b : c;
 True// 等价于 a > b ? a : (b > c ? b : c)
 TrueSystem.out.println("result2: " + result2); // 30
 True```

 False## 3. 运算符优先级
 False
 False运算符优先级决定了表达式中不同运算符的执行顺序。优先级高的运算符先执行，优先级低的运算符后执行。
 False
 False| 优先级 | 运算符 | 结合性 |
 False|--------|--------|--------|
 False| 1 | `()` `[]` `.` | 从左到右 |
 False| 2 | `!` `~` `++` `--` `+` (一元) `-` (一元) | 从右到左 |
 False| 3 | `*` `/` `%` | 从左到右 |
 False| 4 | `+` (二元) `-` (二元) | 从左到右 |
 False| 5 | `<<` `>>` `>>>` | 从左到右 |
 False| 6 | `<` `<=` `>` `>=` `instanceof` | 从左到右 |
 False| 7 | `==` `!=` | 从左到右 |
 False| 8 | `&` | 从左到右 |
 False| 9 | `^` | 从左到右 |
 False| 10 | `|` | 从左到右 |
 False| 11 | `&&` | 从左到右 |
 False| 12 | `||` | 从左到右 |
 False| 13 | `? :` | 从右到左 |
 False| 14 | `=` `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` | 从右到左 |
 False
 False**示例**：
 False
```java
 True// 优先级示例
 Trueint a = 10;
 Trueint b = 5;
 Trueint c = 3;
 Trueint d = 2;
 True
 True// 运算顺序：先乘除后加减
 Trueint result1 = a + b * c - d;
 True// 等价于 a + (b * c) - d = 10 + 15 - 2 = 23
 TrueSystem.out.println("result1: " + result1);
 True
 True// 运算顺序：先括号内，后括号外
 Trueint result2 = (a + b) * (c - d);
 True// 等价于 (10 + 5) * (3 - 2) = 15 * 1 = 15
 TrueSystem.out.println("result2: " + result2);
 True
 True// 运算顺序：先关系运算，后逻辑运算
 Trueboolean result3 = a > b && c < d;
 True// 等价于 (a > b) && (c < d) = true && false = false
 TrueSystem.out.println("result3: " + result3);
 True```

 False## 4. 常见陷阱与最佳实践
 False
 False### 4.1 浮点精度问题
 False
 False**问题**：由于浮点数的存储方式（IEEE 754 标准），某些十进制小数无法精确表示，导致计算结果出现误差。
 False
 False**示例**：
 False
```java
 Truedouble a = 0.1;
 Truedouble b = 0.2;
 Truedouble c = a + b;
 TrueSystem.out.println(c); // 输出 0.30000000000000004，而不是 0.3
 True```

 False**解决方案**：
 False
 False- 使用 `BigDecimal` 类进行精确计算
 False- 对于货币等需要精确计算的场景，应使用 `BigDecimal`
 False
 False**示例**：
 False
```java
 Trueimport java.math.BigDecimal;
 True
 TrueBigDecimal a = new BigDecimal("0.1");
 TrueBigDecimal b = new BigDecimal("0.2");
 TrueBigDecimal c = a.add(b);
 TrueSystem.out.println(c); // 输出 0.3
 True```

 False### 4.2 整数溢出问题
 False
 False**问题**：当整数运算的结果超出其类型的取值范围时，会发生溢出，导致结果不正确。
 False
 False**示例**：
 False
```java
 Trueint max = Integer.MAX_VALUE; // 2147483647
 Trueint result = max + 1;
 TrueSystem.out.println(result); // 输出 -2147483648，发生溢出
 True```

 False**解决方案**：
 False
 False- 使用更大范围的整数类型（如 `long`）
 False- 在运算前检查是否会发生溢出
 False- 使用 `Math.addExact()` 等方法，在溢出时抛出异常
 False
 False**示例**：
 False
```java
 Truelong max = Integer.MAX_VALUE;
 Truelong result = max + 1;
 TrueSystem.out.println(result); // 输出 2147483648，正确
 True
 True// 使用 Math.addExact()
 Truetry {
 True int result2 = Math.addExact(Integer.MAX_VALUE, 1);
 True} catch (ArithmeticException e) {
 True System.out.println("发生溢出: " + e.getMessage());
 True}
 True```

 False### 4.3 字符串拼接的性能问题
 False
 False**问题**：使用 `+` 运算符进行大量字符串拼接时，会创建多个临时字符串对象，影响性能。
 False
 False**解决方案**：
 False
 False- 对于少量字符串拼接，使用 `+` 运算符是可以接受的
 False- 对于大量字符串拼接，应使用 `StringBuilder` 或 `StringBuffer`
 False
 False**示例**：
 False
```java
 True// 性能较差的方式
 TrueString result = "";
 Truefor (int i = 0; i < 1000; i++) {
 True result += " " + i;
 True}
 True
 True// 性能较好的方式
 TrueStringBuilder sb = new StringBuilder();
 Truefor (int i = 0; i < 1000; i++) {
 True sb.append(" ").append(i);
 True}
 TrueString result = sb.toString();
 True```

 False### 4.4 短路运算符的使用
 False
 False**最佳实践**：
 False
 False- 当第二个操作数可能会导致异常或有副作用时，应使用短路运算符 (`&&`, `||`)
 False- 当需要确保两个操作数都被计算时，应使用非短路运算符 (`&`, `|`)
 False
 False**示例**：
 False
```java
 True// 安全的空检查
 TrueString str = null;
 Trueif (str != null && str.length() > 0) {
 True // 只有当 str 不为 null 时，才会计算 str.length()
 True System.out.println("String length: " + str.length());
 True}
 True
 True// 确保两个条件都被检查
 Trueboolean condition1 = checkCondition1();
 Trueboolean condition2 = checkCondition2();
 Trueif (condition1 & condition2) {
 True // 无论 condition1 是什么，都会执行 checkCondition2()
 True System.out.println("Both conditions are true");
 True}
 True```

 False### 4.5 位运算符的应用
 False
 False**位运算符的常见应用**：
 False
 False- 位掩码：用于表示一组布尔标志
 False- 位操作：用于高效的数学运算
 False- 加密和哈希算法：使用位运算进行数据变换
 False
 False**示例**：
 False
```java
 True// 位掩码示例
 Trueint FLAG_READ = 1 << 0; // 0b0001
 Trueint FLAG_WRITE = 1 << 1; // 0b0010
 Trueint FLAG_EXECUTE = 1 << 2; // 0b0100
 True
 Trueint permissions = FLAG_READ | FLAG_WRITE; // 0b0011
 True
 True// 检查权限
 Trueif ((permissions & FLAG_READ) != 0) {
 True System.out.println("Read permission granted");
 True}
 True
 True// 高效的乘除运算
 Trueint a = 10;
 Trueint multiplyBy2 = a << 1; // 等价于 a * 2
 Trueint divideBy2 = a >> 1; // 等价于 a / 2
 TrueSystem.out.println("Multiply by 2: " + multiplyBy2); // 20
 TrueSystem.out.println("Divide by 2: " + divideBy2); // 5
 True```

 False## 5. 实际应用示例
 False
 False### 5.1 示例 1：计算BMI指数
 False
```java
 Trueimport java.util.Scanner;
 True
 Truepublic class BMICalculator {
 True public static void main(String[] args) {
 True Scanner sc = new Scanner(System.in);
 True 
 True System.out.print("请输入体重（公斤）: ");
 True double weight = sc.nextDouble();
 True 
 True System.out.print("请输入身高（米）: ");
 True double height = sc.nextDouble();
 True 
 True // 计算BMI
 True double bmi = weight / (height * height);
 True 
 True // 判断BMI等级
 True String level;
 True if (bmi < 18.5) {
 True level = "偏瘦";
 True } else if (bmi < 24) {
 True level = "正常";
 True } else if (bmi < 28) {
 True level = "偏胖";
 True } else {
 True level = "肥胖";
 True }
 True 
 True System.out.println("您的BMI指数: " + bmi);
 True System.out.println("体重等级: " + level);
 True 
 True sc.close();
 True }
 True}
 True```

 False### 5.2 示例 2：判断闰年
 False
```java
 Trueimport java.util.Scanner;
 True
 Truepublic class LeapYearChecker {
 True public static void main(String[] args) {
 True Scanner sc = new Scanner(System.in);
 True 
 True System.out.print("请输入年份: ");
 True int year = sc.nextInt();
 True 
 True // 判断闰年
 True boolean isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
 True 
 True if (isLeapYear) {
 True System.out.println(year + " 是闰年");
 True } else {
 True System.out.println(year + " 不是闰年");
 True }
 True 
 True sc.close();
 True }
 True}
 True```

 False### 5.3 示例 3：使用位运算实现权限管理
 False
```java
 Truepublic class PermissionManager {
 True // 权限标志
 True public static final int PERMISSION_READ = 1 << 0; // 0b0001
 True public static final int PERMISSION_WRITE = 1 << 1; // 0b0010
 True public static final int PERMISSION_EXECUTE = 1 << 2; // 0b0100
 True public static final int PERMISSION_DELETE = 1 << 3; // 0b1000
 True 
 True public static void main(String[] args) {
 True // 分配权限
 True int userPermissions = PERMISSION_READ | PERMISSION_WRITE;
 True 
 True // 检查权限
 True System.out.println("Read permission: " + hasPermission(userPermissions, PERMISSION_READ));
 True System.out.println("Write permission: " + hasPermission(userPermissions, PERMISSION_WRITE));
 True System.out.println("Execute permission: " + hasPermission(userPermissions, PERMISSION_EXECUTE));
 True System.out.println("Delete permission: " + hasPermission(userPermissions, PERMISSION_DELETE));
 True 
 True // 添加权限
 True userPermissions |= PERMISSION_EXECUTE;
 True System.out.println("\nAfter adding execute permission:");
 True System.out.println("Execute permission: " + hasPermission(userPermissions, PERMISSION_EXECUTE));
 True 
 True // 移除权限
 True userPermissions &= ~PERMISSION_WRITE;
 True System.out.println("\nAfter removing write permission:");
 True System.out.println("Write permission: " + hasPermission(userPermissions, PERMISSION_WRITE));
 True }
 True 
 True public static boolean hasPermission(int permissions, int permission) {
 True return (permissions & permission) != 0;
 True }
 True}
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充位运算细节与运算符陷阱。
 False- 2026-04-05: 扩写内容，增加详细的运算符分类、表达式概念、运算符优先级、常见陷阱与最佳实践，以及实际应用示例。
 False