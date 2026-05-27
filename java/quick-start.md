# 00-快速入门 (Java)
 False
 False> @Author: fanquanpp
 False> @Category: Java Basics
 False> @Description: 00-快速入门
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [引言](#引言)
 False2. [环境搭建](#环境搭建)
 False3. [Hello World 示例](#hello-world-示例)
 False4. [核心工作流](#核心工作流)
 False5. [延伸阅读](#延伸阅读)
 False6. [更新日志](#更新日志)
 False
 False---
 False
 False## 1. 引言
 False
 FalseJava 是一种面向对象的编程语言，具有跨平台、分布式、多线程等特点。它是企业级应用开发的首选语言，广泛用于后端开发、安卓应用和大数据处理。
 False
 False## 2. 环境搭建
 False
 False### 2.1 JDK 安装
 False
 False- 下载并安装 [OpenJDK](https://openjdk.org/) (推荐 JDK 17 或 21)。
 False- 配置环境变量: `JAVA_HOME`, `PATH`。
 False- 验证安装: `java -version`, `javac -version`。
 False
 False### 2.2 IDE 配置
 False
 False- **IntelliJ IDEA**: 最流行的 Java IDE。
 False- **Eclipse**: 经典的开源 IDE。
 False- **VS Code**: 安装 Java Extension Pack。
 False
 False## 3. Hello World 示例
 False
 False创建一个名为 `Hello.java` 的文件：
 False
```java
 Truepublic class Hello {
 True public static void main(String[] args) {
 True System.out.println("Hello, Java!");
 True }
 True}
 True```

 False**编译与运行**:
 False
```bash
 Truejavac Hello.java
 Truejava Hello
 True```

 False## 4. 核心工作流
 False
 False1. **编写**: 使用 `.java` 后缀。
 False2. **构建**: 使用 `Maven` 或 `Gradle` 管理项目。
 False3. **测试**: 使用 `JUnit` 编写单元测试。
 False
 False## 5. 延伸阅读
 False
 False- [toBeBetterJavaer (二哥的 Java 进阶之路)](https://github.com/itwanger/toBeBetterJavaer)
 False- [CS-Books (Java 部分)](https://github.com/forthespada/CS-Books)
 False
 False## 6. 更新日志
 False
 False- **2026-04-05**: 初始创建，涵盖环境搭建与 Hello World 示例。
 False