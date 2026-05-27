# I/O 流与文件操作 (I/O Streams & File Ops)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: Java Basics
 False> @Description: 字节流、字符流、缓冲流、对象序列化及 NIO 简介。 | Byte, Character, Buffered streams, Serialization, and NIO overview.
 False
 False---
 False
 False## 目录
 False
 False1. [I/O 流分类](#i/o-流分类)
 False2. [字节流](#字节流)
 False3. [字符流](#字符流)
 False4. [转换流](#转换流)
 False5. [对象序列化](#对象序列化)
 False6. [文件操作](#文件操作)
 False7. [NIO](#nio)
 False8. [实际应用案例](#实际应用案例)
 False9. [最佳实践](#最佳实践)
 False10. [常见陷阱](#常见陷阱)
 False
 False---
 False
 False## 1. I/O 流分类 (Classification)
 False
 False### 1.1 按流向分类
 False
 False- **输入流 (Input Stream)**: 从外部设备读取数据到程序
 False- **输出流 (Output Stream)**: 从程序写入数据到外部设备
 False
 False### 1.2 按数据单位分类
 False
 False- **字节流 (Byte Stream)**: 以字节为单位处理数据，可处理所有类型的文件
 False - 顶级类: `InputStream` (输入), `OutputStream` (输出)
 False- **字符流 (Character Stream)**: 以字符为单位处理数据，专门用于处理文本文件
 False - 顶级类: `Reader` (输入), `Writer` (输出)
 False
 False### 1.3 按功能分类
 False
 False- **节点流**: 直接与数据源相连，如 `FileInputStream`
 False- **处理流**: 对节点流进行包装，提供额外功能，如 `BufferedInputStream`
 False
 False### 1.4 IO 流的层次结构
 False
```
 True┌─────────────────────────────────────────────────────────┐
 True│ 字节流 │
 True├───────────────────────────────┬───────────────────────┤
 True│ InputStream │ OutputStream │
 True├──────────┬──────────┬────────┼──────────┬──────────┬─────┤
 True│FileInput │ByteArray│Buffered│FileOutput│ByteArray│Buffered│
 True│Stream │InputStream│InputStream│Stream │OutputStream│OutputStream│
 True└──────────┴──────────┴────────┴──────────┴──────────┴─────┘
 True
 True┌─────────────────────────────────────────────────────────┐
 True│ 字符流 │
 True├───────────────────────────────┬───────────────────────┤
 True│ Reader │ Writer │
 True├──────────┬──────────┬────────┼──────────┬──────────┬─────┤
 True│FileReader│CharArray│Buffered│FileWriter│CharArray│Buffered│
 True│ │Reader │Reader │ │Writer │Writer │
 True└──────────┴──────────┴────────┴──────────┴──────────┴─────┘
 True
 True┌─────────────────────────────────────────────────────────┐
 True│ 转换流 │
 True├───────────────────────────────┬───────────────────────┤
 True│ InputStreamReader │ OutputStreamWriter│
 True└───────────────────────────────┴───────────────────────┘
 True
 True┌─────────────────────────────────────────────────────────┐
 True│ 对象流 │
 True├───────────────────────────────┬───────────────────────┤
 True│ ObjectInputStream │ ObjectOutputStream│
 True└───────────────────────────────┴───────────────────────┘
 True```

 False## 2. 字节流 (Byte Stream)
 False
 False### 2.1 基本字节流
 False
 False#### 2.1.1 FileInputStream
 False
 False用于从文件读取字节数据。
 False
```java
 True// 读取文件
 Truetry (FileInputStream fis = new FileInputStream("input.txt")) {
 True int data;
 True while ((data = fis.read()) != -1) {
 True System.out.print((char) data);
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 2.1.2 FileOutputStream
 False
 False用于向文件写入字节数据。
 False
```java
 True// 写入文件
 Truetry (FileOutputStream fos = new FileOutputStream("output.txt")) {
 True String content = "Hello, FileOutputStream!";
 True fos.write(content.getBytes());
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False### 2.2 缓冲字节流
 False
 False#### 2.2.1 BufferedInputStream
 False
 False带缓冲区的输入流，提高读取性能。
 False
```java
 True// 使用缓冲流读取
 Truetry (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("input.txt"))) {
 True byte[] buffer = new byte[1024];
 True int bytesRead;
 True while ((bytesRead = bis.read(buffer)) != -1) {
 True System.out.print(new String(buffer, 0, bytesRead));
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 2.2.2 BufferedOutputStream
 False
 False带缓冲区的输出流，提高写入性能。
 False
```java
 True// 使用缓冲流写入
 Truetry (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("output.txt"))) {
 True String content = "Hello, BufferedOutputStream!";
 True bos.write(content.getBytes());
 True bos.flush(); // 刷新缓冲区
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False## 3. 字符流 (Character Stream)
 False
 False### 3.1 基本字符流
 False
 False#### 3.1.1 FileReader
 False
 False用于从文件读取字符数据。
 False
```java
 True// 读取文本文件
 Truetry (FileReader fr = new FileReader("input.txt")) {
 True int data;
 True while ((data = fr.read()) != -1) {
 True System.out.print((char) data);
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 3.1.2 FileWriter
 False
 False用于向文件写入字符数据。
 False
```java
 True// 写入文本文件
 Truetry (FileWriter fw = new FileWriter("output.txt")) {
 True String content = "Hello, FileWriter!";
 True fw.write(content);
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False### 3.2 缓冲字符流
 False
 False#### 3.2.1 BufferedReader
 False
 False带缓冲区的字符输入流，提供按行读取功能。
 False
```java
 True// 使用缓冲流按行读取
 Truetry (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
 True String line;
 True while ((line = br.readLine()) != null) {
 True System.out.println(line);
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 3.2.2 BufferedWriter
 False
 False带缓冲区的字符输出流，提供写入换行功能。
 False
```java
 True// 使用缓冲流写入
 Truetry (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
 True bw.write("Hello, BufferedWriter!");
 True bw.newLine(); // 写入换行
 True bw.write("This is a new line.");
 True bw.flush(); // 刷新缓冲区
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False## 4. 转换流
 False
 False### 4.1 InputStreamReader
 False
 False将字节流转换为字符流，指定字符编码。
 False
```java
 True// 使用转换流读取，指定编码
 Truetry (InputStreamReader isr = new InputStreamReader(new FileInputStream("input.txt"), "UTF-8")) {
 True int data;
 True while ((data = isr.read()) != -1) {
 True System.out.print((char) data);
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False### 4.2 OutputStreamWriter
 False
 False将字符流转换为字节流，指定字符编码。
 False
```java
 True// 使用转换流写入，指定编码
 Truetry (OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("output.txt"), "UTF-8")) {
 True String content = "Hello, OutputStreamWriter!";
 True osw.write(content);
 True osw.flush();
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False## 5. 对象序列化 (Serialization)
 False
 False### 5.1 序列化的概念
 False
 False将对象的状态转换为字节序列，以便存储或传输。
 False
 False### 5.2 序列化的条件
 False
 False- 类必须实现 `Serializable` 接口
 False- 类的所有非瞬态字段必须可序列化
 False
 False### 5.3 序列化示例
 False
 False#### 5.3.1 可序列化的类
 False
```java
 Trueimport java.io.Serializable;
 True
 Truepublic class Person implements Serializable {
 True private static final long serialVersionUID = 1L;
 True 
 True private String name;
 True private int age;
 True private transient String password; // 不参与序列化
 True 
 True // 构造器、getter、setter 方法
 True}
 True```

 False#### 5.3.2 对象序列化
 False
```java
 True// 序列化对象到文件
 Truetry (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.dat"))) {
 True Person person = new Person("Alice", 25, "123456");
 True oos.writeObject(person);
 True System.out.println("对象序列化成功");
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 5.3.3 对象反序列化
 False
```java
 True// 从文件反序列化对象
 Truetry (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.dat"))) {
 True Person person = (Person) ois.readObject();
 True System.out.println("姓名: " + person.getName());
 True System.out.println("年龄: " + person.getAge());
 True System.out.println("密码: " + person.getPassword()); // 输出 null，因为 password 是 transient
 True System.out.println("对象反序列化成功");
 True} catch (IOException | ClassNotFoundException e) {
 True e.printStackTrace();
 True}
 True```

 False### 5.4 序列化的注意事项
 False
 False- **serialVersionUID**: 建议显式声明，确保版本兼容性
 False- **transient**: 标记不需要序列化的字段
 False- **静态字段**: 静态字段不会被序列化
 False- **循环引用**: 序列化会自动处理循环引用
 False- **安全性**: 序列化可能导致安全问题，需要注意
 False
 False## 6. 文件操作 (java.io.File)
 False
 False### 6.1 File 类的常用方法
 False
 False#### 6.1.1 文件检查方法
 False
 False- **exists()**: 检查文件或目录是否存在
 False- **isFile()**: 检查是否为文件
 False- **isDirectory()**: 检查是否为目录
 False- **canRead()**: 检查是否可读
 False- **canWrite()**: 检查是否可写
 False- **isHidden()**: 检查是否隐藏
 False
 False#### 6.1.2 文件操作方法
 False
 False- **createNewFile()**: 创建新文件
 False- **delete()**: 删除文件或目录
 False- **renameTo(File dest)**: 重命名文件或目录
 False- **mkdir()**: 创建目录
 False- **mkdirs()**: 创建多级目录
 False- **deleteOnExit()**: JVM 退出时删除文件
 False
 False#### 6.1.3 文件信息方法
 False
 False- **getName()**: 获取文件名
 False- **getPath()**: 获取文件路径
 False- **getAbsolutePath()**: 获取绝对路径
 False- **getCanonicalPath()**: 获取规范路径
 False- **length()**: 获取文件长度
 False- **lastModified()**: 获取最后修改时间
 False
 False#### 6.1.4 目录操作方法
 False
 False- **list()**: 获取目录下的文件和目录名
 False- **listFiles()**: 获取目录下的文件和目录对象
 False- **listFiles(FileFilter filter)**: 获取符合过滤条件的文件和目录
 False
 False### 6.2 File 操作示例
 False
 False#### 6.2.1 创建文件
 False
```java
 TrueFile file = new File("test.txt");
 Truetry {
 True if (file.createNewFile()) {
 True System.out.println("文件创建成功");
 True } else {
 True System.out.println("文件已存在");
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False#### 6.2.2 创建目录
 False
```java
 True// 创建单个目录
 TrueFile dir = new File("mydir");
 Trueif (dir.mkdir()) {
 True System.out.println("目录创建成功");
 True} else {
 True System.out.println("目录创建失败");
 True}
 True
 True// 创建多级目录
 TrueFile multiDir = new File("dir1/dir2/dir3");
 Trueif (multiDir.mkdirs()) {
 True System.out.println("多级目录创建成功");
 True} else {
 True System.out.println("多级目录创建失败");
 True}
 True```

 False#### 6.2.3 列出目录内容
 False
```java
 TrueFile dir = new File(".");
 TrueString[] files = dir.list();
 TrueSystem.out.println("目录内容:");
 Truefor (String file : files) {
 True System.out.println(file);
 True}
 True
 True// 使用 FileFilter
 TrueFile[] javaFiles = dir.listFiles((f) -> f.getName().endsWith(".java"));
 TrueSystem.out.println("Java 文件:");
 Truefor (File file : javaFiles) {
 True System.out.println(file.getName());
 True}
 True```

 False## 7. NIO (Non-blocking I/O)
 False
 False### 7.1 NIO 的核心组件
 False
 False- **Buffer**: 缓冲区，用于存储数据
 False- **Channel**: 通道，用于数据传输
 False- **Selector**: 选择器，用于监控多个通道的事件
 False
 False### 7.2 Buffer
 False
 False#### 7.2.1 Buffer 的类型
 False
 False- **ByteBuffer**
 False- **CharBuffer**
 False- **ShortBuffer**
 False- **IntBuffer**
 False- **LongBuffer**
 False- **FloatBuffer**
 False- **DoubleBuffer**
 False
 False#### 7.2.2 Buffer 的使用
 False
```java
 True// 创建缓冲区
 TrueByteBuffer buffer = ByteBuffer.allocate(1024);
 True
 True// 写入数据
 Truebuffer.put("Hello, NIO!".getBytes());
 True
 True// 切换到读模式
 Truebuffer.flip();
 True
 True// 读取数据
 Truebyte[] data = new byte[buffer.limit()];
 Truebuffer.get(data);
 TrueSystem.out.println(new String(data));
 True
 True// 清空缓冲区
 Truebuffer.clear();
 True```

 False### 7.3 Channel
 False
 False#### 7.3.1 Channel 的类型
 False
 False- **FileChannel**: 文件通道
 False- **SocketChannel**: 套接字通道
 False- **ServerSocketChannel**: 服务器套接字通道
 False- **DatagramChannel**: 数据报通道
 False
 False#### 7.3.2 FileChannel 的使用
 False
```java
 True// 读取文件
 Truetry (FileChannel channel = new FileInputStream("input.txt").getChannel()) {
 True ByteBuffer buffer = ByteBuffer.allocate(1024);
 True while (channel.read(buffer) != -1) {
 True buffer.flip();
 True byte[] data = new byte[buffer.limit()];
 True buffer.get(data);
 True System.out.print(new String(data));
 True buffer.clear();
 True }
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True
 True// 写入文件
 Truetry (FileChannel channel = new FileOutputStream("output.txt").getChannel()) {
 True ByteBuffer buffer = ByteBuffer.wrap("Hello, FileChannel!".getBytes());
 True channel.write(buffer);
 True} catch (IOException e) {
 True e.printStackTrace();
 True}
 True```

 False### 7.4 NIO 2.0 (Java 7+)
 False
 False#### 7.4.1 Path 接口
 False
```java
 True// 创建 Path
 TruePath path = Paths.get("test.txt");
 True
 True// 获取路径信息
 TrueSystem.out.println("文件名: " + path.getFileName());
 TrueSystem.out.println("父路径: " + path.getParent());
 TrueSystem.out.println("绝对路径: " + path.toAbsolutePath());
 True```

 False#### 7.4.2 Files 类
 False
```java
 True// 读取文件
 TrueList<String> lines = Files.readAllLines(Paths.get("input.txt"), StandardCharsets.UTF_8);
 Truefor (String line : lines) {
 True System.out.println(line);
 True}
 True
 True// 写入文件
 TrueList<String> content = Arrays.asList("Hello, Files!", "This is a test.");
 TrueFiles.write(Paths.get("output.txt"), content, StandardCharsets.UTF_8);
 True
 True// 复制文件
 TrueFiles.copy(Paths.get("input.txt"), Paths.get("copy.txt"), StandardCopyOption.REPLACE_EXISTING);
 True
 True// 删除文件
 TrueFiles.deleteIfExists(Paths.get("temp.txt"));
 True```

 False## 8. 实际应用案例
 False
 False### 8.1 文件复制
 False
 False#### 8.1.1 使用字节流复制
 False
```java
 Truepublic static void copyFileUsingStream(File source, File dest) throws IOException {
 True try (InputStream is = new FileInputStream(source);
 True OutputStream os = new FileOutputStream(dest)) {
 True byte[] buffer = new byte[1024];
 True int length;
 True while ((length = is.read(buffer)) > 0) {
 True os.write(buffer, 0, length);
 True }
 True }
 True}
 True```

 False#### 8.1.2 使用缓冲流复制
 False
```java
 Truepublic static void copyFileUsingBufferedStream(File source, File dest) throws IOException {
 True try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(source));
 True BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dest))) {
 True byte[] buffer = new byte[1024];
 True int length;
 True while ((length = bis.read(buffer)) > 0) {
 True bos.write(buffer, 0, length);
 True }
 True }
 True}
 True```

 False#### 8.1.3 使用 NIO 复制
 False
```java
 Truepublic static void copyFileUsingNIO(File source, File dest) throws IOException {
 True try (FileChannel sourceChannel = new FileInputStream(source).getChannel();
 True FileChannel destChannel = new FileOutputStream(dest).getChannel()) {
 True destChannel.transferFrom(sourceChannel, 0, sourceChannel.size());
 True }
 True}
 True```

 False### 8.2 文本文件读写
 False
 False#### 8.2.1 读取文本文件
 False
```java
 Truepublic static List<String> readTextFile(String filePath) throws IOException {
 True List<String> lines = new ArrayList<>();
 True try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
 True String line;
 True while ((line = br.readLine()) != null) {
 True lines.add(line);
 True }
 True }
 True return lines;
 True}
 True```

 False#### 8.2.2 写入文本文件
 False
```java
 Truepublic static void writeTextFile(String filePath, List<String> lines) throws IOException {
 True try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
 True for (String line : lines) {
 True bw.write(line);
 True bw.newLine();
 True }
 True }
 True}
 True```

 False### 8.3 目录遍历
 False
```java
 Truepublic static void listFilesRecursively(File directory) {
 True if (!directory.isDirectory()) {
 True return;
 True }
 True 
 True File[] files = directory.listFiles();
 True if (files != null) {
 True for (File file : files) {
 True if (file.isDirectory()) {
 True System.out.println("目录: " + file.getAbsolutePath());
 True listFilesRecursively(file);
 True } else {
 True System.out.println("文件: " + file.getAbsolutePath());
 True }
 True }
 True }
 True}
 True```

 False## 9. 最佳实践
 False
 False### 9.1 资源管理
 False
 False- **使用 try-with-resources**: 自动关闭资源，避免资源泄漏
 False- **显式关闭资源**: 在 try-with-resources 不可用的情况下，使用 finally 块关闭资源
 False
 False### 9.2 性能优化
 False
 False- **使用缓冲流**: 提高读写性能
 False- **合理设置缓冲区大小**: 根据实际情况调整缓冲区大小
 False- **使用 NIO**: 对于大文件操作，考虑使用 NIO 提高性能
 False- **批量操作**: 减少 I/O 操作次数
 False
 False### 9.3 编码处理
 False
 False- **指定字符编码**: 避免默认编码导致的问题
 False- **使用 UTF-8**: 推荐使用 UTF-8 编码
 False- **使用转换流**: 在字节流和字符流之间转换时指定编码
 False
 False### 9.4 文件操作
 False
 False- **检查文件存在性**: 在操作文件前检查文件是否存在
 False- **处理异常**: 妥善处理 I/O 异常
 False- **使用 Files 类**: Java 7+ 推荐使用 Files 类进行文件操作
 False- **路径处理**: 使用 Path 接口处理路径
 False
 False### 9.5 序列化
 False
 False- **显式声明 serialVersionUID**: 确保版本兼容性
 False- **谨慎使用 transient**: 只对不需要序列化的字段使用
 False- **注意序列化的安全性**: 避免序列化敏感信息
 False
 False## 10. 常见陷阱
 False
 False### 10.1 资源泄漏
 False
 False- **忘记关闭资源**: 导致文件句柄泄漏
 False- **在 finally 块中关闭资源时发生异常**: 掩盖原始异常
 False
 False### 10.2 编码问题
 False
 False- **使用默认编码**: 可能导致跨平台问题
 False- **字节与字符转换错误**: 导致乱码
 False
 False### 10.3 文件操作陷阱
 False
 False- **路径分隔符**: 不同操作系统的路径分隔符不同
 False- **文件权限**: 没有足够的权限操作文件
 False- **文件名长度**: 超过系统限制
 False
 False### 10.4 序列化陷阱
 False
 False- **serialVersionUID 不匹配**: 导致反序列化失败
 False- **序列化循环引用**: 可能导致栈溢出
 False- **序列化大对象**: 可能导致内存问题
 False
 False### 10.5 性能陷阱
 False
 False- **频繁的小 I/O 操作**: 降低性能
 False- **不使用缓冲流**: 导致频繁的磁盘操作
 False- **大文件一次性读入内存**: 可能导致内存溢出
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 补充序列化与缓冲流细节。
 False- 2026-05-03: 扩展内容，添加IO流的详细分类、各种流的具体使用方法、缓冲流的性能优势、序列化的详细实现、文件操作的详细方法、NIO的详细介绍、实际应用案例和最佳实践。
 False