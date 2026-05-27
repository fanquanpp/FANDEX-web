# 异常处理机制 (Exception Handling)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 异常体系结构、捕获处理、抛出异常及自定义异常。 | Exception hierarchy, try-catch-finally, throw/throws, and custom exceptions.
 False
 False---
 False
 False## 目录
 False
 False1. [异常体系](#异常体系)
 False2. [异常处理](#异常处理)
 False3. [抛出异常](#抛出异常)
 False4. [自定义异常](#自定义异常)
 False5. [Try-with-resources](#try-with-resources)
 False6. [异常处理的实际应用](#异常处理的实际应用)
 False7. [异常处理的最佳实践](#异常处理的最佳实践)
 False8. [常见陷阱](#常见陷阱)
 False9. [异常处理的性能考虑](#异常处理的性能考虑)
 False
 False---
 False
 False## 1. 异常体系 (Exception Hierarchy)
 False
 False### 1.1 异常的层次结构
 False
 FalseJava 中的异常体系以 `Throwable` 为顶级父类，分为两大类：
 False
```
 TrueThrowable
 True├── Error
 True│ ├── VirtualMachineError
 True│ │ ├── StackOverflowError
 True│ │ └── OutOfMemoryError
 True│ └── ...
 True└── Exception
 True ├── Checked Exception
 True │ ├── IOException
 True │ ├── SQLException
 True │ └── ...
 True └── Unchecked Exception (RuntimeException)
 True ├── NullPointerException
 True ├── ArithmeticException
 True ├── ArrayIndexOutOfBoundsException
 True └── ...
 True```

 False### 1.2 异常的分类
 False
 False- **Error**: 严重错误，如 `StackOverflowError`、`OutOfMemoryError`，程序无法恢复
 False- **Exception**: 应用程序可捕获并处理的异常
 False - **检查型异常 (Checked Exception)**: 编译时强制要求处理，如 `IOException`、`SQLException`
 False - **运行时异常 (Runtime / Unchecked Exception)**: 逻辑错误，不强制要求捕获，如 `NullPointerException`、`ArithmeticException`
 False
 False### 1.3 常见异常类型
 False
 False#### 1.3.1 运行时异常
 False
 False- **NullPointerException**: 空指针异常
 False- **ArithmeticException**: 算术异常（如除零）
 False- **ArrayIndexOutOfBoundsException**: 数组下标越界异常
 False- **ClassCastException**: 类型转换异常
 False- **IllegalArgumentException**: 非法参数异常
 False- **IllegalStateException**: 非法状态异常
 False
 False#### 1.3.2 检查型异常
 False
 False- **IOException**: IO 操作异常
 False- **SQLException**: 数据库操作异常
 False- **ClassNotFoundException**: 类未找到异常
 False- **InterruptedException**: 线程中断异常
 False
 False## 2. 异常处理 (Try-Catch-Finally)
 False
 False### 2.1 基本语法
 False
```java
 Truetry {
 True // 可能抛出异常的代码
 True} catch (SpecificException e) {
 True // 处理特定异常
 True} catch (AnotherException e) {
 True // 处理另一种异常
 True} catch (Exception e) {
 True // 捕获所有其他异常
 True} finally {
 True // 无论是否发生异常，都会执行的代码
 True}
 True```

 False### 2.2 异常处理的执行流程
 False
 False1. 执行 try 块中的代码
 False2. 如果发生异常，寻找匹配的 catch 块
 False3. 执行匹配的 catch 块
 False4. 执行 finally 块
 False5. 继续执行后续代码
 False
 False### 2.3 异常对象的常用方法
 False
 False- **getMessage()**: 获取异常信息
 False- **printStackTrace()**: 打印异常堆栈信息
 False- **getCause()**: 获取导致当前异常的原因
 False- **getStackTrace()**: 获取异常堆栈跟踪信息
 False
 False### 2.4 异常捕获的顺序
 False
 False- 先捕获具体的异常，再捕获通用的异常
 False- 如果先捕获通用异常，后面的具体异常捕获块永远不会执行
 False
```java
 True// 正确的顺序
 Truetry {
 True // 可能抛出异常的代码
 True} catch (ArithmeticException e) {
 True // 处理算术异常
 True} catch (Exception e) {
 True // 处理其他异常
 True}
 True
 True// 错误的顺序（ArithmeticException 捕获块永远不会执行）
 Truetry {
 True // 可能抛出异常的代码
 True} catch (Exception e) {
 True // 处理所有异常
 True} catch (ArithmeticException e) {
 True // 永远不会执行
 True}
 True```

 False## 3. 抛出异常 (Throw & Throws)
 False
 False### 3.1 throw 关键字
 False
 False用于在方法体内抛出一个具体的异常对象。
 False
```java
 Truepublic void validateAge(int age) {
 True if (age < 0) {
 True throw new IllegalArgumentException("Age cannot be negative");
 True }
 True if (age > 150) {
 True throw new IllegalArgumentException("Age cannot be greater than 150");
 True }
 True}
 True```

 False### 3.2 throws 关键字
 False
 False用于在方法签名处声明该方法可能抛出的异常类型。
 False
```java
 Truepublic void readFile(String path) throws IOException, FileNotFoundException {
 True if (path == null) {
 True throw new NullPointerException("Path cannot be null");
 True }
 True // 可能抛出 IOException 的代码
 True}
 True```

 False### 3.3 throw 与 throws 的区别
 False
 False| 特性 | throw | throws |
 False|------|-------|--------|
 False| **位置** | 方法体内 | 方法签名处 |
 False| **作用** | 抛出具体异常对象 | 声明方法可能抛出的异常类型 |
 False| **数量** | 一次只能抛出一个异常 | 可以声明多个异常 |
 False| **语法** | throw new Exception(); | throws Exception1, Exception2 |
 False
 False## 4. 自定义异常 (Custom Exception)
 False
 False### 4.1 自定义异常的创建
 False
 False继承 `Exception` (检查型) 或 `RuntimeException` (非检查型)。
 False
 False#### 4.1.1 自定义检查型异常
 False
```java
 Truepublic class BusinessException extends Exception {
 True private int errorCode;
 True 
 True public BusinessException() {
 True super();
 True }
 True 
 True public BusinessException(String message) {
 True super(message);
 True }
 True 
 True public BusinessException(String message, int errorCode) {
 True super(message);
 True this.errorCode = errorCode;
 True }
 True 
 True public BusinessException(String message, Throwable cause) {
 True super(message, cause);
 True }
 True 
 True public int getErrorCode() {
 True return errorCode;
 True }
 True}
 True```

 False#### 4.1.2 自定义运行时异常
 False
```java
 Truepublic class ValidationException extends RuntimeException {
 True private String fieldName;
 True 
 True public ValidationException(String message) {
 True super(message);
 True }
 True 
 True public ValidationException(String message, String fieldName) {
 True super(message);
 True this.fieldName = fieldName;
 True }
 True 
 True public String getFieldName() {
 True return fieldName;
 True }
 True}
 True```

 False### 4.2 自定义异常的使用
 False
```java
 Truepublic void registerUser(String username, String password) throws BusinessException {
 True if (username == null || username.isEmpty()) {
 True throw new BusinessException("Username cannot be empty", 400);
 True }
 True if (password == null || password.length() < 6) {
 True throw new BusinessException("Password must be at least 6 characters", 400);
 True }
 True // 注册用户的逻辑
 True}
 True
 True// 使用自定义异常
 Truetry {
 True registerUser("", "123");
 True} catch (BusinessException e) {
 True System.out.println("Error code: " + e.getErrorCode());
 True System.out.println("Error message: " + e.getMessage());
 True}
 True```

 False## 5. Try-with-resources (Java 7+)
 False
 False### 5.1 基本语法
 False
 False自动管理实现了 `AutoCloseable` 接口的资源，无需手动关闭。
 False
```java
 Truetry (BufferedReader br = new BufferedReader(new FileReader("file.txt"));
 True BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
 True // 使用资源
 True String line;
 True while ((line = br.readLine()) != null) {
 True bw.write(line);
 True bw.newLine();
 True }
 True} catch (IOException e) {
 True // 处理异常
 True e.printStackTrace();
 True} // 自动关闭资源
 True```

 False### 5.2 实现 AutoCloseable 接口
 False
```java
 Truepublic class CustomResource implements AutoCloseable {
 True public CustomResource() {
 True System.out.println("Resource created");
 True }
 True 
 True public void use() {
 True System.out.println("Resource used");
 True }
 True 
 True @Override
 True public void close() throws Exception {
 True System.out.println("Resource closed");
 True }
 True}
 True
 True// 使用自定义资源
 Truetry (CustomResource resource = new CustomResource()) {
 True resource.use();
 True} catch (Exception e) {
 True e.printStackTrace();
 True}
 True```

 False### 5.3 Try-with-resources 的优势
 False
 False- **自动关闭资源**: 无需在 finally 块中手动关闭资源
 False- **异常抑制**: 如果关闭资源时发生异常，会被抑制，不会影响原始异常
 False- **代码简洁**: 减少样板代码，提高可读性
 False
 False## 6. 异常处理的实际应用
 False
 False### 6.1 分层异常处理
 False
 False#### 6.1.1 数据访问层
 False
```java
 Truepublic class UserDao {
 True public User findById(int id) throws SQLException {
 True try (Connection conn = getConnection();
 True PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {
 True stmt.setInt(1, id);
 True try (ResultSet rs = stmt.executeQuery()) {
 True if (rs.next()) {
 True return new User(rs.getInt("id"), rs.getString("name"));
 True }
 True return null;
 True }
 True }
 True }
 True}
 True```

 False#### 6.1.2 业务逻辑层
 False
```java
 Truepublic class UserService {
 True private UserDao userDao = new UserDao();
 True 
 True public User getUser(int id) throws BusinessException {
 True try {
 True User user = userDao.findById(id);
 True if (user == null) {
 True throw new BusinessException("User not found", 404);
 True }
 True return user;
 True } catch (SQLException e) {
 True throw new BusinessException("Database error", 500, e);
 True }
 True }
 True}
 True```

 False#### 6.1.3 表现层
 False
```java
 Truepublic class UserController {
 True private UserService userService = new UserService();
 True 
 True public void handleGetUser(int id) {
 True try {
 True User user = userService.getUser(id);
 True System.out.println("User found: " + user);
 True } catch (BusinessException e) {
 True System.out.println("Error: " + e.getMessage());
 True // 可以根据错误码进行不同的处理
 True }
 True }
 True}
 True```

 False### 6.2 异常链
 False
 False将底层异常包装为上层异常，保留原始异常信息。
 False
```java
 Truetry {
 True // 可能抛出 SQLException 的代码
 True} catch (SQLException e) {
 True // 包装为业务异常，保留原始异常
 True throw new BusinessException("Database operation failed", e);
 True}
 True```

 False## 7. 异常处理的最佳实践
 False
 False### 7.1 基本原则
 False
 False- **不要捕获所有异常**: 应该捕获具体的异常类型
 False- **不要忽略异常**: 至少应该记录异常信息
 False- **不要在 finally 中抛出异常**: 会覆盖原始异常
 False- **使用 try-with-resources 管理资源**: 避免资源泄漏
 False- **合理使用自定义异常**: 提供更具体的错误信息
 False
 False### 7.2 异常处理的最佳实践
 False
 False1. **只捕获可以处理的异常**
 False2. **对不同的异常进行不同的处理**
 False3. **记录异常信息**
 False4. **向上层传递不能处理的异常**
 False5. **使用 finally 块释放资源**
 False6. **使用 try-with-resources 管理资源**
 False7. **合理设计异常层次结构**
 False8. **在合适的层次处理异常**
 False
 False### 7.3 异常处理的反模式
 False
 False- **空 catch 块**: 捕获异常但不做任何处理
 False- **过度使用异常**: 用异常控制流程
 False- **捕获并重新抛出相同的异常**: 没有添加任何信息
 False- **抛出异常过于宽泛**: 如直接抛出 Exception
 False- **在 finally 块中修改返回值**: 会覆盖 try 或 catch 中的返回值
 False
 False## 8. 常见陷阱
 False
 False### 8.1 异常捕获顺序错误
 False
```java
 True// 错误的顺序
 Truetry {
 True // 代码
 True} catch (Exception e) {
 True // 处理所有异常
 True} catch (ArithmeticException e) {
 True // 永远不会执行
 True}
 True```

 False### 8.2 资源泄漏
 False
```java
 True// 错误：没有关闭资源
 TrueBufferedReader br = null;
 Truetry {
 True br = new BufferedReader(new FileReader("file.txt"));
 True // 使用 br
 True} catch (IOException e) {
 True e.printStackTrace();
 True} // 没有关闭 br
 True
 True// 正确：使用 try-with-resources
 Truetry (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
 True // 使用 br
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False### 8.3 异常信息不完整
 False
```java
 True// 错误：没有传递原始异常
 Truecatch (SQLException e) {
 True throw new BusinessException("Database error");
 True}
 True
 True// 正确：传递原始异常
 Truecatch (SQLException e) {
 True throw new BusinessException("Database error", e);
 True}
 True```

 False### 8.4 过度使用异常
 False
```java
 True// 错误：用异常控制流程
 Truepublic int divide(int a, int b) {
 True try {
 True return a / b;
 True } catch (ArithmeticException e) {
 True return 0;
 True }
 True}
 True
 True// 正确：先检查
 Truepublic int divide(int a, int b) {
 True if (b == 0) {
 True return 0;
 True }
 True return a / b;
 True}
 True```

 False## 9. 异常处理的性能考虑
 False
 False### 9.1 异常的性能开销
 False
 False- **创建异常对象**: 会捕获当前堆栈信息，开销较大
 False- **抛出异常**: 会中断正常的执行流程
 False- **异常处理**: 会影响代码的执行效率
 False
 False### 9.2 性能优化建议
 False
 False- **只在真正异常的情况下使用异常**
 False- **避免在循环中抛出异常**
 False- **使用检查型异常处理可恢复的错误**
 False- **使用运行时异常处理编程错误**
 False- **合理设计异常层次结构**
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充 Try-with-resources 与异常处理最佳实践。
 False- 2026-05-03: 扩展内容，添加异常体系的深入介绍、异常处理的具体实现、自定义异常的详细使用、try-with-resources的深入应用、实际案例和最佳实践。
 False