# MySQL 快速查阅 (Quick Reference)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: MySQL Reference
 False> @Description: MySQL 常用指令速查手册 | Quick reference for common MySQL commands.
 False
 False---
 False
 False---
 False
 False## 目录
 False
 False1. [数据库操作](#数据库操作)
 False2. [表操作](#表操作)
 False3. [数据类型](#数据类型)
 False4. [约束类型](#约束类型)
 False5. [数据操作](#数据操作)
 False6. [数据查询](#数据查询)
 False7. [索引操作](#索引操作)
 False8. [用户与权限](#用户与权限)
 False9. [事务管理](#事务管理)
 False10. [常用函数](#常用函数)
 False
 False---
 False
 False## 1. 数据库操作
 False
 False### 创建数据库
 False
```sql
 TrueCREATE DATABASE dbname;
 TrueCREATE DATABASE IF NOT EXISTS dbname;
 True```

 False### 创建数据库（指定字符集）
 False
```sql
 TrueCREATE DATABASE dbname
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True
 True-- 示例：创建电商数据库
 TrueCREATE DATABASE ecommerce
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True```

 False### 修改数据库字符集
 False
```sql
 TrueALTER DATABASE dbname
 True CHARACTER SET gbk
 True COLLATE gbk_chinese_ci;
 True```

 False### 查看数据库
 False
```sql
 TrueSHOW DATABASES;
 TrueSHOW CREATE DATABASE dbname;
 True
 True-- 查看数据库大小
 TrueSELECT table_schema AS '数据库',
 True SUM(data_length + index_length) / 1024 / 1024 AS '大小(MB)'
 TrueFROM information_schema.tables
 TrueGROUP BY table_schema;
 True```

 False### 使用数据库
 False
```sql
 TrueUSE dbname;
 True```

 False### 删除数据库
 False
```sql
 TrueDROP DATABASE dbname;
 TrueDROP DATABASE IF EXISTS dbname;
 True```

 False---
 False
 False## 2. 表操作
 False
 False### 创建表
 False
```sql
 TrueCREATE TABLE tablename (
 True id INT PRIMARY KEY AUTO_INCREMENT,
 True name VARCHAR(50) NOT NULL,
 True age INT,
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 True);
 True
 True-- 示例：创建用户表
 TrueCREATE TABLE users (
 True id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
 True username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
 True email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
 True password VARCHAR(255) NOT NULL COMMENT '密码',
 True age TINYINT UNSIGNED COMMENT '年龄',
 True status TINYINT DEFAULT 1 COMMENT '状态: 0禁用, 1启用',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 True updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
 True) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
 True```

 False### 查看表
 False
```sql
 TrueSHOW TABLES;
 TrueDESC tablename;
 TrueSHOW COLUMNS FROM tablename;
 TrueSHOW CREATE TABLE tablename;
 True
 True-- 查看表大小
 TrueSELECT table_name AS '表名',
 True data_length / 1024 / 1024 AS '数据大小(MB)',
 True index_length / 1024 / 1024 AS '索引大小(MB)'
 TrueFROM information_schema.tables
 TrueWHERE table_schema = DATABASE();
 True```

 False### 修改表结构
 False
```sql
 True-- 添加列
 TrueALTER TABLE tablename ADD COLUMN colname type;
 TrueALTER TABLE tablename ADD COLUMN colname type AFTER another_col;
 True
 True-- 修改列
 TrueALTER TABLE tablename MODIFY COLUMN colname new_type;
 TrueALTER TABLE tablename CHANGE COLUMN oldname newname new_type;
 True
 True-- 删除列
 TrueALTER TABLE tablename DROP COLUMN colname;
 True
 True-- 重命名表
 TrueALTER TABLE oldname RENAME TO newname;
 True
 True-- 示例：修改用户表
 TrueALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;
 TrueALTER TABLE users MODIFY COLUMN age SMALLINT UNSIGNED;
 TrueALTER TABLE users CHANGE COLUMN phone mobile VARCHAR(20);
 TrueALTER TABLE users DROP COLUMN age;
 True```

 False### 删除表
 False
```sql
 TrueDROP TABLE tablename;
 TrueDROP TABLE IF EXISTS tablename;
 True```

 False### 清空表
 False
```sql
 TrueTRUNCATE TABLE tablename;
 True```

 False### 复制表
 False
```sql
 True-- 复制结构
 TrueCREATE TABLE newtable LIKE oldtable;
 True
 True-- 复制结构和数据
 TrueCREATE TABLE newtable AS SELECT * FROM oldtable;
 True
 True-- 复制部分数据
 TrueCREATE TABLE active_users AS SELECT * FROM users WHERE status = 1;
 True```

 False---
 False
 False## 3. 数据类型
 False
 False### 字符型
 False
 False- CHAR(n) - 定长字符串，最多255字符
 False- VARCHAR(n) - 变长字符串，最多65535字符
 False- TEXT - 长文本，最多65535字符
 False- MEDIUMTEXT - 中等文本，最多16MB
 False- LONGTEXT - 超长文本，最多4GB
 False- ENUM - 枚举类型
 False- SET - 集合类型
 False- BLOB - 二进制大对象
 False
 False### 数值型
 False
 False- TINYINT - 微整数 (-128~127)
 False- SMALLINT - 小整数 (-32768~32767)
 False- MEDIUMINT - 中等整数
 False- INT - 整数 (-21亿~21亿)
 False- BIGINT - 大整数
 False- FLOAT - 单精度浮点
 False- DOUBLE - 双精度浮点
 False- DECIMAL(M,D) - 定点数
 False
 False### 日期时间型
 False
 False- DATE - 日期 (YYYY-MM-DD)
 False- TIME - 时间 (HH:MM:SS)
 False- DATETIME - 日期时间
 False- TIMESTAMP - 时间戳
 False- YEAR - 年份
 False
 False---
 False
 False## 4. 约束类型
 False
 False### 常用约束
 False
```sql
 TrueCREATE TABLE tablename (
 True id INT PRIMARY KEY AUTO_INCREMENT, -- 主键 + 自增
 True name VARCHAR(50) NOT NULL, -- 非空
 True email VARCHAR(100) UNIQUE, -- 唯一
 True status TINYINT DEFAULT 1, -- 默认值
 True age INT CHECK (age > 0), -- 检查约束
 True user_id INT,
 True FOREIGN KEY (user_id) REFERENCES users(id) -- 外键
 True);
 True```

 False### 外键约束选项
 False
```sql
 TrueFOREIGN KEY (col) REFERENCES parent_table(col)
 True ON DELETE CASCADE -- 级联删除
 True ON UPDATE CASCADE -- 级联更新
 True ON DELETE SET NULL -- 删除时设为NULL
 True ON DELETE RESTRICT -- 限制删除
 True```

 False---
 False
 False## 5. 数据操作
 False
 False### 插入数据
 False
```sql
 True-- 单行插入
 TrueINSERT INTO table(col1, col2) VALUES(val1, val2);
 True
 True-- 多行插入
 TrueINSERT INTO table(col1, col2) VALUES
 True (v1, v2),
 True (v3, v4),
 True (v5, v6);
 True
 True-- 插入或更新
 TrueINSERT INTO table(cols) VALUES(vals)
 TrueON DUPLICATE KEY UPDATE col = new_val;
 True
 True-- 替换插入
 TrueREPLACE INTO table(cols) VALUES(vals);
 True
 True-- 示例：插入用户数据
 TrueINSERT INTO users(username, email, password) 
 TrueVALUES ('zhangsan', 'zhang@example.com', '123456');
 True
 True-- 示例：批量插入用户
 TrueINSERT INTO users(username, email, password) VALUES
 True ('lisi', 'li@example.com', '654321'),
 True ('wangwu', 'wang@example.com', 'abc123'),
 True ('zhaoliu', 'zhao@example.com', 'xyz789');
 True
 True-- 示例：插入或更新（根据唯一键）
 TrueINSERT INTO users(id, username, email)
 TrueVALUES (1, 'zhangsan_new', 'zhang_new@example.com')
 TrueON DUPLICATE KEY UPDATE username = VALUES(username), email = VALUES(email);
 True```

 False### 更新数据
 False
```sql
 TrueUPDATE table SET col = val WHERE condition;
 TrueUPDATE table SET col1 = val1, col2 = val2 WHERE condition;
 True
 True-- 示例：更新用户状态
 TrueUPDATE users SET status = 0 WHERE id = 1;
 True
 True-- 示例：批量更新
 TrueUPDATE users SET status = 1 WHERE created_at > '2024-01-01';
 True
 True-- 示例：根据另一表更新
 TrueUPDATE orders o
 TrueJOIN users u ON o.user_id = u.id
 TrueSET o.user_name = u.username
 TrueWHERE o.user_name IS NULL;
 True```

 False### 删除数据
 False
```sql
 TrueDELETE FROM table WHERE condition; -- 按条件删除
 TrueDELETE FROM table; -- 删除所有行
 TrueTRUNCATE TABLE table; -- 清空表（重置自增ID）
 True
 True-- 示例：删除指定用户
 TrueDELETE FROM users WHERE id = 1;
 True
 True-- 示例：删除过期数据
 TrueDELETE FROM logs WHERE created_at < '2024-01-01';
 True
 True-- 示例：多表删除
 TrueDELETE o FROM orders o
 TrueJOIN users u ON o.user_id = u.id
 TrueWHERE u.status = 0;
 True```

 False---
 False
 False## 6. 数据查询
 False
 False### 基础查询
 False
```sql
 TrueSELECT * FROM table;
 TrueSELECT col1, col2 FROM table;
 TrueSELECT col1 AS alias FROM table;
 TrueSELECT DISTINCT col FROM table;
 True
 True-- 示例：查询活跃用户
 TrueSELECT id, username, email FROM users WHERE status = 1;
 True
 True-- 示例：查询用户数量
 TrueSELECT COUNT(*) AS user_count FROM users;
 True```

 False### 条件查询
 False
```sql
 True-- 比较运算
 TrueSELECT * FROM table WHERE col = value;
 TrueSELECT * FROM table WHERE col > value;
 TrueSELECT * FROM table WHERE col != value;
 True
 True-- 逻辑运算
 TrueSELECT * FROM table WHERE col1 = v1 AND col2 = v2;
 TrueSELECT * FROM table WHERE col1 = v1 OR col2 = v2;
 TrueSELECT * FROM table WHERE NOT col = value;
 True
 True-- 范围查询
 TrueSELECT * FROM table WHERE col BETWEEN val1 AND val2;
 TrueSELECT * FROM table WHERE col IN (val1, val2, val3);
 True
 True-- 模糊查询
 TrueSELECT * FROM table WHERE col LIKE '%pattern%';
 TrueSELECT * FROM table WHERE col LIKE 'pattern%';
 TrueSELECT * FROM table WHERE col LIKE '_pattern';
 True
 True-- 空值判断
 TrueSELECT * FROM table WHERE col IS NULL;
 TrueSELECT * FROM table WHERE col IS NOT NULL;
 True
 True-- 示例：查询年龄在18-30之间的用户
 TrueSELECT * FROM users WHERE age BETWEEN 18 AND 30;
 True
 True-- 示例：查询特定城市的用户
 TrueSELECT * FROM users WHERE city IN ('北京', '上海', '广州');
 True
 True-- 示例：模糊搜索用户名
 TrueSELECT * FROM users WHERE username LIKE '%zhang%';
 True
 True-- 示例：查询未填写手机号的用户
 TrueSELECT * FROM users WHERE phone IS NULL;
 True```

 False### 排序与分页
 False
```sql
 True-- 排序
 TrueSELECT * FROM table ORDER BY col ASC;
 TrueSELECT * FROM table ORDER BY col DESC;
 TrueSELECT * FROM table ORDER BY col1 ASC, col2 DESC;
 True
 True-- 分页
 TrueSELECT * FROM table LIMIT 10;
 TrueSELECT * FROM table LIMIT 10 OFFSET 20;
 TrueSELECT * FROM table LIMIT 20, 10;
 True
 True-- 示例：按创建时间倒序查询用户
 TrueSELECT * FROM users ORDER BY created_at DESC;
 True
 True-- 示例：分页查询（第3页，每页10条）
 TrueSELECT * FROM users ORDER BY created_at DESC LIMIT 20, 10;
 True```

 False### 分组查询
 False
```sql
 True-- 基本分组
 TrueSELECT col, COUNT(*) FROM table GROUP BY col;
 True
 True-- 分组过滤
 TrueSELECT col, AVG(price) FROM table 
 TrueGROUP BY col 
 TrueHAVING AVG(price) > 100;
 True
 True-- 示例：统计每个城市的用户数
 TrueSELECT city, COUNT(*) AS user_count 
 TrueFROM users 
 TrueGROUP BY city 
 TrueORDER BY user_count DESC;
 True
 True-- 示例：统计每月注册用户数
 TrueSELECT DATE_FORMAT(created_at, '%Y-%m') AS month, 
 True COUNT(*) AS register_count
 TrueFROM users 
 TrueGROUP BY month 
 TrueORDER BY month;
 True
 True-- 示例：统计订单金额大于1000的用户
 TrueSELECT user_id, SUM(amount) AS total_amount
 TrueFROM orders
 TrueGROUP BY user_id
 TrueHAVING total_amount > 1000;
 True```

 False### 聚合函数
 False
```sql
 TrueSELECT 
 True COUNT(*) AS total, -- 统计行数
 True SUM(price) AS sum, -- 求和
 True AVG(price) AS avg, -- 平均值
 True MAX(price) AS max, -- 最大值
 True MIN(price) AS min -- 最小值
 TrueFROM table;
 True
 True-- 示例：统计订单数据
 TrueSELECT 
 True COUNT(*) AS order_count,
 True SUM(amount) AS total_amount,
 True AVG(amount) AS avg_amount,
 True MAX(amount) AS max_amount,
 True MIN(amount) AS min_amount
 TrueFROM orders
 TrueWHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';
 True```

 False### 多表连接
 False
```sql
 True-- 内连接
 TrueSELECT * FROM a INNER JOIN b ON a.id = b.id;
 True
 True-- 左连接
 TrueSELECT * FROM a LEFT JOIN b ON a.id = b.id;
 True
 True-- 右连接
 TrueSELECT * FROM a RIGHT JOIN b ON a.id = b.id;
 True
 True-- 全连接（MySQL需用UNION模拟）
 TrueSELECT * FROM a LEFT JOIN b ON a.id = b.id
 TrueUNION
 TrueSELECT * FROM a RIGHT JOIN b ON a.id = b.id;
 True
 True-- 自连接
 TrueSELECT e1.name, e2.name AS manager
 TrueFROM employees e1
 TrueJOIN employees e2 ON e1.manager_id = e2.id;
 True
 True-- 示例：查询订单及用户信息
 TrueSELECT o.id, o.amount, o.created_at, 
 True u.username, u.email
 TrueFROM orders o
 TrueJOIN users u ON o.user_id = u.id
 TrueWHERE o.created_at > '2024-01-01';
 True
 True-- 示例：查询所有用户及其订单（包括无订单用户）
 TrueSELECT u.username, COUNT(o.id) AS order_count
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id
 TrueGROUP BY u.id;
 True```

 False---
 False
 False## 7. 索引操作
 False
 False### 创建索引
 False
```sql
 True-- 普通索引
 TrueCREATE INDEX idx_name ON table(col);
 True
 True-- 唯一索引
 TrueCREATE UNIQUE INDEX idx_name ON table(col);
 True
 True-- 复合索引
 TrueCREATE INDEX idx_name ON table(col1, col2);
 True
 True-- 全文索引
 TrueALTER TABLE table ADD FULLTEXT INDEX ft_idx(col);
 True
 True-- 示例：为用户表创建索引
 TrueCREATE INDEX idx_users_email ON users(email);
 TrueCREATE INDEX idx_users_status ON users(status);
 TrueCREATE INDEX idx_users_created_at ON users(created_at);
 TrueCREATE UNIQUE INDEX idx_users_username ON users(username);
 True
 True-- 示例：创建复合索引
 TrueCREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
 True```

 False### 查看索引
 False
```sql
 TrueSHOW INDEX FROM table;
 True
 True-- 查看表的索引情况
 TrueSELECT index_name, column_name 
 TrueFROM information_schema.statistics 
 TrueWHERE table_schema = DATABASE() AND table_name = 'users';
 True```

 False### 删除索引
 False
```sql
 TrueDROP INDEX idx_name ON table;
 True
 True-- 示例：删除索引
 TrueDROP INDEX idx_users_email ON users;
 True```

 False---
 False
 False## 8. 用户与权限
 False
 False### 用户管理
 False
```sql
 True-- 创建用户
 TrueCREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
 TrueCREATE USER 'username'@'%' IDENTIFIED BY 'password'; -- 允许远程
 True
 True-- 修改密码
 TrueALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';
 True
 True-- 删除用户
 TrueDROP USER 'username'@'localhost';
 True
 True-- 查看用户
 TrueSELECT user, host FROM mysql.user;
 True
 True-- 示例：创建只读用户
 TrueCREATE USER 'readonly'@'%' IDENTIFIED BY 'read123';
 True
 True-- 示例：创建管理员用户
 TrueCREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
 True```

 False### 权限管理
 False
```sql
 True-- 授予权限
 TrueGRANT ALL PRIVILEGES ON dbname.* TO 'username'@'localhost';
 TrueGRANT SELECT, INSERT, UPDATE ON dbname.table TO 'username'@'localhost';
 True
 True-- 撤销权限
 TrueREVOKE ALL PRIVILEGES ON dbname.* FROM 'username'@'localhost';
 True
 True-- 查看权限
 TrueSHOW GRANTS FOR 'username'@'localhost';
 True
 True-- 刷新权限
 TrueFLUSH PRIVILEGES;
 True
 True-- 示例：授予只读权限
 TrueGRANT SELECT ON ecommerce.* TO 'readonly'@'%';
 True
 True-- 示例：授予读写权限
 TrueGRANT SELECT, INSERT, UPDATE, DELETE ON ecommerce.* TO 'appuser'@'%';
 True
 True-- 示例：授予管理员权限
 TrueGRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
 True```

 False### 常用权限
 False
 False- ALL PRIVILEGES - 所有权限
 False- SELECT, INSERT, UPDATE, DELETE - 基本操作
 False- CREATE, DROP - 创建/删除
 False- GRANT OPTION - 授权权限
 False- ALTER - 修改表结构
 False- INDEX - 创建索引
 False
 False---
 False
 False## 9. 事务管理
 False
 False### 基本操作
 False
```sql
 True-- 开始事务
 TrueSTART TRANSACTION;
 True-- 或
 TrueBEGIN;
 True
 True-- 提交事务
 TrueCOMMIT;
 True
 True-- 回滚事务
 TrueROLLBACK;
 True
 True-- 设置保存点
 TrueSAVEPOINT savepoint_name;
 True
 True-- 回滚到保存点
 TrueROLLBACK TO SAVEPOINT savepoint_name;
 True
 True-- 示例：转账事务
 TrueBEGIN;
 TrueUPDATE accounts SET balance = balance - 100 WHERE id = 1;
 TrueUPDATE accounts SET balance = balance + 100 WHERE id = 2;
 TrueCOMMIT;
 True
 True-- 示例：带保存点的事务
 TrueBEGIN;
 TrueINSERT INTO orders (...) VALUES (...);
 TrueSAVEPOINT order_saved;
 TrueINSERT INTO order_items (...) VALUES (...);
 TrueIF error THEN
 True ROLLBACK TO order_saved;
 TrueEND IF;
 TrueCOMMIT;
 True```

 False### 隔离级别
 False
```sql
 True-- 查看当前隔离级别
 TrueSELECT @@transaction_isolation;
 True
 True-- 设置隔离级别
 TrueSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
 TrueSET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
 True```

 False### 隔离级别说明
 False
 False- READ UNCOMMITTED - 最低级别，可能读取未提交数据
 False- READ COMMITTED - 读取已提交数据
 False- REPEATABLE READ - 可重复读（MySQL默认）
 False- SERIALIZABLE - 最高级别，串行执行
 False
 False---
 False
 False## 10. 常用函数
 False
 False### 字符串函数
 False
```sql
 TrueCONCAT('Hello', ' ', 'World') -- 拼接字符串
 TrueSUBSTRING('Hello', 1, 3) -- 截取字符串
 TrueLENGTH('Hello') -- 字节长度
 TrueCHAR_LENGTH('你好') -- 字符长度
 TrueLOWER('HELLO') -- 转小写
 TrueUPPER('hello') -- 转大写
 TrueTRIM(' hello ') -- 去除首尾空格
 TrueREPLACE('Hello', 'l', 'w') -- 替换字符串
 TrueLEFT('Hello', 2) -- 取左边字符
 TrueRIGHT('Hello', 2) -- 取右边字符
 TrueINSTR('Hello', 'll') -- 查找位置
 True
 True-- 示例：格式化用户全名
 TrueSELECT CONCAT(last_name, ' ', first_name) AS full_name FROM users;
 True
 True-- 示例：截取邮箱域名
 TrueSELECT SUBSTRING(email, INSTR(email, '@') + 1) AS domain FROM users;
 True
 True-- 示例：生成用户名
 TrueSELECT LOWER(CONCAT(SUBSTRING(first_name, 1, 1), last_name)) AS username FROM users;
 True```

 False### 日期函数
 False
```sql
 TrueNOW() -- 当前日期时间
 TrueCURDATE() -- 当前日期
 TrueCURTIME() -- 当前时间
 TrueYEAR(NOW()) -- 提取年份
 TrueMONTH(NOW()) -- 提取月份
 TrueDAY(NOW()) -- 提取日期
 TrueHOUR(NOW()) -- 提取小时
 TrueMINUTE(NOW()) -- 提取分钟
 TrueSECOND(NOW()) -- 提取秒
 TrueDATE_ADD(NOW(), INTERVAL 7 DAY) -- 日期加
 TrueDATE_SUB(NOW(), INTERVAL 1 MONTH) -- 日期减
 TrueDATEDIFF('2024-01-15', '2024-01-01') -- 日期差
 TrueDATE_FORMAT(NOW(), '%Y-%m-%d') -- 格式化日期
 TrueLAST_DAY(NOW()) -- 月份最后一天
 True
 True-- 示例：查询本月注册用户
 TrueSELECT * FROM users WHERE DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m');
 True
 True-- 示例：计算用户年龄
 TrueSELECT TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age FROM users;
 True
 True-- 示例：获取本周一日期
 TrueSELECT DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AS monday;
 True```

 False### 数值函数
 False
```sql
 TrueABS(-10) -- 绝对值
 TrueROUND(3.14159, 2) -- 四舍五入
 TrueCEIL(3.1) -- 向上取整
 TrueFLOOR(3.9) -- 向下取整
 TrueMOD(10, 3) -- 取模
 TruePOW(2, 3) -- 幂运算
 TrueSQRT(16) -- 平方根
 TrueRAND() -- 随机数
 TrueTRUNCATE(3.14159, 3) -- 截断
 TrueSIGN(-10) -- 符号
 True
 True-- 示例：计算平均评分并保留1位小数
 TrueSELECT ROUND(AVG(rating), 1) AS avg_rating FROM products;
 True
 True-- 示例：生成随机验证码
 TrueSELECT FLOOR(RAND() * 9000 + 1000) AS captcha;
 True
 True-- 示例：计算商品折扣后价格
 TrueSELECT price * 0.8 AS discounted_price FROM products;
 True```

 False### 条件函数
 False
```sql
 TrueIF(age >= 18, '成人', '未成年') -- 条件判断
 TrueIFNULL(email, '未填写') -- NULL替换
 TrueNULLIF(a, b) -- 相等返回NULL
 TrueCASE 
 True WHEN score >= 90 THEN '优秀'
 True WHEN score >= 60 THEN '及格'
 True ELSE '不及格'
 TrueEND -- 多条件判断
 True
 True-- 示例：根据状态显示文本
 TrueSELECT id, username, IF(status = 1, '活跃', '禁用') AS status_text FROM users;
 True
 True-- 示例：显示用户等级
 TrueSELECT 
 True username,
 True CASE 
 True WHEN points >= 1000 THEN 'VIP'
 True WHEN points >= 500 THEN '高级会员'
 True ELSE '普通会员'
 True END AS level
 TrueFROM users;
 True
 True-- 示例：处理空值
 TrueSELECT name, IFNULL(phone, '未填写') AS phone FROM customers;
 True```

 False---
 False
 False## 附录：常用命令
 False
 False### 服务器管理
 False
```bash
 True# 启动服务
 Truesystemctl start mysql # Linux
 Truenet start MySQL # Windows
 True
 True# 停止服务
 Truesystemctl stop mysql # Linux
 Truenet stop MySQL # Windows
 True
 True# 重启服务
 Truesystemctl restart mysql # Linux
 True
 True# 查看状态
 Truesystemctl status mysql # Linux
 True
 True# 登录
 Truemysql -u username -p
 Truemysql -u username -p -h host -P port
 True```

 False### 备份与恢复
 False
```bash
 True# 备份数据库
 Truemysqldump -u username -p dbname > backup.sql
 True
 True# 备份多个数据库
 Truemysqldump -u username -p --databases db1 db2 > backup.sql
 True
 True# 备份所有数据库
 Truemysqldump -u username -p --all-databases > all_backup.sql
 True
 True# 恢复数据库
 Truemysql -u username -p dbname < backup.sql
 True
 True# 压缩备份
 Truemysqldump -u username -p dbname | gzip > backup.sql.gz
 True
 True# 恢复压缩备份
 Truegunzip < backup.sql.gz | mysql -u username -p dbname
 True```

 False### 查看系统信息
 False
```sql
 TrueSELECT VERSION(); -- 版本
 TrueSELECT USER(); -- 当前用户
 TrueSELECT DATABASE(); -- 当前数据库
 TrueSHOW STATUS; -- 服务器状态
 TrueSHOW VARIABLES; -- 配置变量
 TrueSHOW PROCESSLIST; -- 进程列表
 TrueSHOW VARIABLES LIKE 'slow_query%'; -- 慢查询状态
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-30: 基于数据库常用指令.txt 创建快速查阅文档，使用文本+代码块格式
 False