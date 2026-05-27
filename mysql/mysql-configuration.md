# MySQL 配置与运维 (MySQL Configuration & Operations)
 False
 False> @Version: v4.0.0
 False> @Module: mysql
 False
 False> @Author: Anonymous
 False> @Category: MySQL Basics
 False> @Description: MySQL 基本操作、性能优化、安全配置、常见问题及监控维护。 | MySQL basic operations, performance optimization, security, troubleshooting, and monitoring.
 False
 False---
 False
 False## 目录
 False
 False1. [基本操作](#基本操作)
 False2. [性能优化建议](#性能优化建议)
 False3. [安全配置详解](#安全配置详解)
 False4. [常见问题与解决方案](#常见问题与解决方案)
 False5. [监控与维护](#监控与维护)
 False
 False---
 False
 False## 1. 基本操作 (Basic Ops)
 False
 False### 1.1 数据库操作详解
 False
 False#### 1.1.1 创建数据库
 False
```sql
 True-- 查看所有数据库
 TrueSHOW DATABASES;
 True
 True-- 创建数据库（指定字符集和校对规则）
 TrueCREATE DATABASE mydb
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True
 True-- 创建数据库（如果不存在）
 TrueCREATE DATABASE IF NOT EXISTS mydb;
 True
 True-- 创建数据库（简写）
 TrueCREATE DATABASE mydb;
 True
 True-- 删除数据库
 TrueDROP DATABASE IF EXISTS mydb;
 True
 True-- 使用数据库
 TrueUSE mydb;
 True
 True-- 查看当前数据库
 TrueSELECT DATABASE();
 True
 True-- 查看数据库创建语句
 TrueSHOW CREATE DATABASE mydb;
 True
 True-- 修改数据库字符集
 TrueALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 True```

 False#### 1.1.2 字符集和排序规则详解
 False
 False**常用字符集**：
 False
 False- `utf8`（实际是 UTF-8 的 3 字节版本，不支持 emoji）
 False- `utf8mb4`（完整的 UTF-8，支持所有字符，包括 emoji）
 False- `latin1`（西欧字符集）
 False- `gbk`（中文扩展字符集）
 False
 False**常用排序规则**：
 False
 False- `utf8mb4_unicode_ci`：基于 Unicode 排序规则，较为准确
 False- `utf8mb4_general_ci`：通用排序规则，性能较好
 False- `utf8mb4_0900_ai_ci`：MySQL 8.0 新增，更准确的排序
 False
 False**推荐配置**：
 False
```sql
 TrueCREATE DATABASE mydb
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True```

 False### 1.2 表操作详解
 False
 False#### 1.2.1 创建表
 False
```sql
 True-- 创建用户表（包含多种约束）
 TrueCREATE TABLE users (
 True id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
 True username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
 True email VARCHAR(100) NOT NULL COMMENT '邮箱',
 True password VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
 True age INT UNSIGNED COMMENT '年龄',
 True status TINYINT DEFAULT 1 COMMENT '状态：1-正常，0-禁用',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 True updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
 True) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
 True
 True-- 查看表结构
 TrueDESCRIBE users;
 TrueSHOW COLUMNS FROM users;
 True
 True-- 查看表创建语句
 TrueSHOW CREATE TABLE users;
 True
 True-- 查看所有表
 TrueSHOW TABLES;
 True
 True-- 查看表状态
 TrueSHOW TABLE STATUS FROM mydb;
 True```

 False#### 1.2.2 修改表结构
 False
```sql
 True-- 添加列
 TrueALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;
 TrueALTER TABLE users ADD COLUMN last_login DATETIME AFTER updated_at;
 True
 True-- 修改列（类型、约束等）
 TrueALTER TABLE users MODIFY COLUMN age INT UNSIGNED NOT NULL DEFAULT 0;
 True
 True-- 修改列名和类型
 TrueALTER TABLE users CHANGE COLUMN username user_name VARCHAR(50) NOT NULL;
 True
 True-- 删除列
 TrueALTER TABLE users DROP COLUMN phone;
 True
 True-- 添加索引
 TrueALTER TABLE users ADD INDEX idx_email (email);
 TrueALTER TABLE users ADD UNIQUE INDEX idx_username (username);
 True
 True-- 添加外键
 TrueALTER TABLE orders ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);
 True
 True-- 重命名表
 TrueALTER TABLE users RENAME TO customers;
 TrueRENAME TABLE users TO customers, orders TO purchase_orders;
 True
 True-- 删除表
 TrueDROP TABLE IF EXISTS users;
 True
 True-- 清空表（重置自增ID）
 TrueTRUNCATE TABLE users;
 True```

 False#### 1.2.3 表结构设计示例
 False
```sql
 True-- 订单主表
 TrueCREATE TABLE orders (
 True order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 True order_no VARCHAR(32) NOT NULL UNIQUE COMMENT '订单编号',
 True user_id BIGINT NOT NULL COMMENT '用户ID',
 True total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '订单总额',
 True discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '优惠金额',
 True pay_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '实付金额',
 True pay_type TINYINT COMMENT '支付方式：1-微信 2-支付宝 3-银行卡',
 True status TINYINT NOT NULL DEFAULT 1 COMMENT '订单状态：1-待付款 2-已付款 3-已发货 4-已收货 5-已取消',
 True order_time DATETIME NOT NULL COMMENT '下单时间',
 True pay_time DATETIME COMMENT '支付时间',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 True updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 True INDEX idx_user_id (user_id),
 True INDEX idx_order_time (order_time),
 True INDEX idx_status (status)
 True) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';
 True
 True-- 订单明细表
 TrueCREATE TABLE order_items (
 True item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 True order_id BIGINT NOT NULL COMMENT '订单ID',
 True product_id BIGINT NOT NULL COMMENT '商品ID',
 True product_name VARCHAR(100) NOT NULL COMMENT '商品名称（冗余）',
 True sku_id BIGINT COMMENT 'SKU ID',
 True sku_name VARCHAR(100) COMMENT 'SKU名称（冗余）',
 True price DECIMAL(10,2) NOT NULL COMMENT '商品单价',
 True quantity INT NOT NULL DEFAULT 1 COMMENT '购买数量',
 True subtotal DECIMAL(10,2) NOT NULL COMMENT '小计金额',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 True FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
 True INDEX idx_order_id (order_id),
 True INDEX idx_product_id (product_id)
 True) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单明细表';
 True```

 False### 1.3 数据操作详解
 False
 False#### 1.3.1 插入数据
 False
```sql
 True-- 插入单条数据（所有字段）
 TrueINSERT INTO users (username, email, password, age) VALUES ('张三', 'zhangsan@example.com', 'encrypted_pass', 25);
 True
 True-- 插入单条数据（指定部分字段）
 TrueINSERT INTO users (username, email) VALUES ('李四', 'lisi@example.com');
 True
 True-- 插入多条数据
 TrueINSERT INTO users (username, email, password, age) VALUES
 True('王五', 'wangwu@example.com', 'pass1', 30),
 True('赵六', 'zhaoliu@example.com', 'pass2', 28),
 True('钱七', 'qianqi@example.com', 'pass3', 35);
 True
 True-- 插入查询结果
 TrueINSERT INTO users (username, email, age)
 TrueSELECT username, email, age FROM old_users WHERE status = 1;
 True
 True-- 使用 SET 语法
 TrueINSERT INTO users SET username='孙八', email='sunba@example.com', age=27;
 True
 True-- 插入或更新（存在则更新，不存在则插入）
 TrueINSERT INTO users (id, username, email) VALUES (1, '张三', 'new_email@example.com')
 TrueON DUPLICATE KEY UPDATE email='new_email@example.com', updated_at=NOW();
 True
 True-- 替换插入
 TrueREPLACE INTO users (id, username, email) VALUES (1, '张三', 'new_email@example.com');
 True
 True-- 查看最后插入的ID
 TrueSELECT LAST_INSERT_ID();
 True```

 False#### 1.3.2 查询数据
 False
```sql
 True-- 查询所有字段
 TrueSELECT * FROM users;
 True
 True-- 查询指定字段
 TrueSELECT id, username, email FROM users;
 True
 True-- 使用别名
 TrueSELECT id AS user_id, username AS name FROM users;
 True
 True-- 去重查询
 TrueSELECT DISTINCT status FROM users;
 TrueSELECT COUNT(DISTINCT status) FROM users;
 True
 True-- 限制查询结果
 TrueSELECT * FROM users LIMIT 10;
 TrueSELECT * FROM users LIMIT 10 OFFSET 20;
 TrueSELECT * FROM users LIMIT 20, 10;
 True
 True-- 查询并计算
 TrueSELECT username, price, quantity, price * quantity AS total FROM order_items;
 True
 True-- 条件查询
 TrueSELECT * FROM users WHERE age > 25 AND status = 1;
 TrueSELECT * FROM users WHERE age BETWEEN 20 AND 30;
 TrueSELECT * FROM users WHERE username LIKE '张%';
 TrueSELECT * FROM users WHERE email IN ('a@example.com', 'b@example.com');
 True
 True-- 排序查询
 TrueSELECT * FROM users ORDER BY created_at DESC;
 TrueSELECT * FROM users ORDER BY age ASC, created_at DESC;
 True
 True-- 分组查询
 TrueSELECT status, COUNT(*) AS count FROM users GROUP BY status;
 TrueSELECT status, AVG(age) AS avg_age FROM users GROUP BY status HAVING AVG(age) > 25;
 True
 True-- 连接查询
 TrueSELECT u.username, o.order_no, o.total_amount
 TrueFROM users u
 TrueINNER JOIN orders o ON u.id = o.user_id
 TrueWHERE o.status = 2;
 True```

 False#### 1.3.3 更新数据
 False
```sql
 True-- 更新单条数据
 TrueUPDATE users SET age = 26 WHERE id = 1;
 True
 True-- 更新多条数据
 TrueUPDATE users SET age = age + 1 WHERE age < 30;
 True
 True-- 更新多个字段
 TrueUPDATE users SET age = 27, email = 'new_email@example.com', updated_at = NOW() WHERE id = 1;
 True
 True-- 更新查询结果
 TrueUPDATE users SET status = 0 WHERE created_at < '2024-01-01';
 True
 True-- 事务中的更新
 TrueSTART TRANSACTION;
 TrueUPDATE accounts SET balance = balance - 100 WHERE id = 1;
 TrueUPDATE accounts SET balance = balance + 100 WHERE id = 2;
 TrueCOMMIT;
 True
 True-- 注意：更新前最好先查询确认
 TrueSELECT * FROM users WHERE id = 1 FOR UPDATE;
 TrueUPDATE users SET age = 26 WHERE id = 1;
 True```

 False#### 1.3.4 删除数据
 False
```sql
 True-- 删除单条数据
 TrueDELETE FROM users WHERE id = 1;
 True
 True-- 删除多条数据
 TrueDELETE FROM users WHERE status = 0 AND created_at < '2024-01-01';
 True
 True-- 删除所有数据（谨慎使用）
 TrueDELETE FROM users;
 True
 True-- 清空表（重置自增ID，性能更快）
 TrueTRUNCATE TABLE users;
 True
 True-- 删除表
 TrueDROP TABLE IF EXISTS users;
 True
 True-- 级联删除
 TrueDELETE FROM orders WHERE user_id = 1;
 True-- 或者设置外键级联删除
 TrueALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
 True
 True-- 删除前查询确认
 TrueSELECT * FROM users WHERE id = 1;
 TrueDELETE FROM users WHERE id = 1;
 True```

 False### 1.4 用户与权限详解
 False
 False#### 1.4.1 用户管理
 False
```sql
 True-- 创建用户
 TrueCREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
 TrueCREATE USER 'newuser'@'%' IDENTIFIED BY 'password'; -- 允许远程连接
 TrueCREATE USER 'newuser'@'192.168.1.%' IDENTIFIED BY 'password'; -- 允许特定网段
 True
 True-- 修改用户密码
 TrueALTER USER 'newuser'@'localhost' IDENTIFIED BY 'new_password';
 True
 True-- 使用 SET 修改密码
 TrueSET PASSWORD FOR 'newuser'@'localhost' = 'new_password';
 True
 True-- 删除用户
 TrueDROP USER 'newuser'@'localhost';
 True
 True-- 查看所有用户
 TrueSELECT user, host FROM mysql.user;
 True
 True-- 查看用户权限
 TrueSHOW GRANTS FOR 'newuser'@'localhost';
 True
 True-- 重命名用户
 TrueRENAME USER 'olduser'@'localhost' TO 'newuser'@'localhost';
 True```

 False#### 1.4.2 权限管理
 False
```sql
 True-- 授予所有权限
 TrueGRANT ALL PRIVILEGES ON mydb.* TO 'newuser'@'localhost';
 TrueFLUSH PRIVILEGES;
 True
 True-- 授予特定权限
 TrueGRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'newuser'@'localhost';
 True
 True-- 授予所有数据库的所有权限
 TrueGRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
 True
 True-- 授予管理权限
 TrueGRANT CREATE USER ON *.* TO 'admin'@'localhost';
 TrueGRANT RELOAD ON *.* TO 'admin'@'localhost';
 TrueGRANT BACKUP ADMIN ON *.* TO 'admin'@'localhost';
 True
 True-- 授予特定表的权限
 TrueGRANT SELECT, INSERT ON mydb.orders TO 'newuser'@'localhost';
 True
 True-- 授予存储过程执行权限
 TrueGRANT EXECUTE ON PROCEDURE mydb.sp_name TO 'newuser'@'localhost';
 True
 True-- 撤销权限
 TrueREVOKE ALL PRIVILEGES ON mydb.* FROM 'newuser'@'localhost';
 TrueREVOKE DELETE ON mydb.* FROM 'newuser'@'localhost';
 True
 True-- 查看权限层级
 True-- 全局层级：*.*
 True-- 数据库层级：db_name.*
 True-- 表层级：db_name.table_name
 True-- 列层级：需要单独授予每一列的权限
 True
 True-- 角色管理（MySQL 8.0+）
 TrueCREATE ROLE 'app_read', 'app_write';
 TrueGRANT SELECT ON mydb.* TO 'app_read';
 TrueGRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'app_write';
 TrueGRANT 'app_read' TO 'user1'@'localhost';
 TrueGRANT 'app_write' TO 'user2'@'localhost';
 TrueSET DEFAULT ROLE 'app_read' FOR 'user1'@'localhost';
 True```

 False#### 1.4.3 权限层级说明
 False
 False| 层级 | 范围 | 授予语法 |
 False| :--- | :--- | :--- |
 False| 全局 | 所有数据库的所有对象 | `GRANT ALL ON *.* TO user` |
 False| 数据库 | 指定数据库的所有表 | `GRANT ALL ON mydb.* TO user` |
 False| 表 | 指定表的所有列 | `GRANT ALL ON mydb.orders TO user` |
 False| 列 | 指定列 | `GRANT SELECT(col1, col2) ON mydb.orders TO user` |
 False| 存储过程 | 存储过程和函数 | `GRANT EXECUTE ON PROCEDURE mydb.sp TO user` |
 False
 False## 2. 性能优化建议
 False
 False### 2.1 服务器配置优化详解
 False
 False#### 2.1.1 内存配置
 False
 False| 参数 | 推荐值 | 说明 |
 False| :--- | :--- | :--- |
 False| innodb_buffer_pool_size | 服务器内存的 70-80% | 缓存数据和索引 |
 False| key_buffer_size | 内存的 10-20%（仅 MyISAM） | MyISAM 索引缓存 |
 False| query_cache_size | 不推荐（MySQL 8.0 已移除） | 查询缓存 |
 False| tmp_table_size | 64-256MB | 临时表大小 |
 False| max_heap_table_size | 64-256MB | Memory 表最大大小 |
 False
 False#### 2.1.2 连接配置
 False
```sql
 True-- 最大连接数
 TrueSET GLOBAL max_connections = 500;
 True
 True-- 连接超时时间
 TrueSET GLOBAL wait_timeout = 600;
 TrueSET GLOBAL interactive_timeout = 600;
 True
 True-- 查看当前连接数
 TrueSHOW STATUS LIKE 'Threads_connected';
 TrueSHOW VARIABLES LIKE 'max_connections';
 True```

 False#### 2.1.3 InnoDB 配置
 False
```ini
 True[mysqld]
 True# InnoDB 配置
 Trueinnodb_buffer_pool_size=4G # 建议为服务器内存的 70%
 Trueinnodb_log_file_size=1G # 建议 256MB-1GB
 Trueinnodb_log_buffer_size=64M
 Trueinnodb_flush_log_at_trx_commit=1 # 1-最安全，2-性能好，0-最快但可能丢数据
 Trueinnodb_flush_method=O_DIRECT # Linux 下推荐，减少系统缓存
 Trueinnodb_file_per_table=1 # 每个表独立的表空间
 Trueinnodb_io_capacity=4000 # 根据磁盘 IO 能力设置
 True```

 False### 2.2 查询优化详解
 False
 False#### 2.2.1 索引优化
 False
```sql
 True-- 创建合适的索引
 TrueCREATE INDEX idx_username ON users(username);
 TrueCREATE INDEX idx_email_status ON users(email, status);
 True
 True-- 复合索引设计原则
 True-- 1. 区分度高的列放前面
 True-- 2. 经常作为条件的列放前面
 True-- 3. 排序和分组的列应包含在索引中
 True
 True-- 示例：为常用查询创建索引
 True-- 查询：WHERE status = 1 AND created_at > '2024-01-01' ORDER BY created_at
 TrueCREATE INDEX idx_status_created ON users(status, created_at);
 True```

 False#### 2.2.2 SQL 语句优化
 False
```sql
 True-- 优化前
 TrueSELECT * FROM users WHERE YEAR(created_at) = 2024;
 True
 True-- 优化后
 TrueSELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
 True
 True-- 优化前（使用函数导致索引失效）
 TrueSELECT * FROM orders WHERE MONTH(order_time) = 1;
 True
 True-- 优化后（范围查询可以利用索引）
 TrueSELECT * FROM orders WHERE order_time >= '2024-01-01' AND order_time < '2024-02-01';
 True
 True-- 使用 EXPLAIN 分析查询
 TrueEXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
 True```

 False#### 2.2.3 慢查询优化示例
 False
```sql
 True-- 开启慢查询日志
 TrueSET GLOBAL slow_query_log = 'ON';
 TrueSET GLOBAL long_query_time = 1;
 TrueSET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
 True
 True-- 分析慢查询
 True-- 1. 查看慢查询
 TrueSHOW FULL PROCESSLIST;
 True
 True-- 2. 使用 EXPLAIN
 TrueEXPLAIN SELECT u.username, o.total_amount
 TrueFROM users u
 TrueINNER JOIN orders o ON u.id = o.user_id
 TrueWHERE o.created_at > '2024-01-01';
 True
 True-- 3. 优化建议
 True-- - 添加合适的索引
 True-- - 避免 SELECT *
 True-- - 使用 LIMIT 限制结果集
 True-- - 优化分页查询
 True```

 False### 2.3 存储引擎选择详解
 False
 False| 存储引擎 | 事务支持 | 锁粒度 | 外键支持 | 特点 | 适用场景 |
 False| :--- | :--- | :--- | :--- | :--- | :--- |
 False| **InnoDB** | 是 | 行级 | 是 | 支持事务、行级锁、MVCC | 大多数场景，特别是需要事务的系统 |
 False| **MyISAM** | 否 | 表级 | 否 | 全文索引、压缩表 | 读多写少、日志、静态网站 |
 False| **Memory** | 否 | 表级 | 否 | 内存存储，速度极快 | 临时表、缓存、会话数据 |
 False| **Archive** | 否 | 表级 | 否 | 高压缩比 | 归档数据、日志 |
 False| **CSV** | 否 | 表级 | 否 | CSV 格式 | 数据交换 |
 False
 False### 2.4 分区表详解
 False
```sql
 True-- 按日期范围分区
 TrueCREATE TABLE sales (
 True id BIGINT PRIMARY KEY AUTO_INCREMENT,
 True sale_date DATE NOT NULL,
 True amount DECIMAL(10,2) NOT NULL,
 True region VARCHAR(50)
 True) PARTITION BY RANGE (YEAR(sale_date)) (
 True PARTITION p2020 VALUES LESS THAN (2021),
 True PARTITION p2021 VALUES LESS THAN (2022),
 True PARTITION p2022 VALUES LESS THAN (2023),
 True PARTITION p2023 VALUES LESS THAN (2024),
 True PARTITION p2024 VALUES LESS THAN (2025),
 True PARTITION pmax VALUES LESS THAN MAXVALUE
 True);
 True
 True-- 按哈希分区
 TrueCREATE TABLE users (
 True id INT PRIMARY KEY,
 True name VARCHAR(50)
 True) PARTITION BY HASH(id) PARTITIONS 8;
 True
 True-- 按列表分区
 TrueCREATE TABLE products (
 True id INT PRIMARY KEY,
 True category_id INT,
 True name VARCHAR(50)
 True) PARTITION BY LIST (category_id) (
 True PARTITION p_electronics VALUES IN (1, 2, 3),
 True PARTITION p_clothing VALUES IN (4, 5, 6),
 True PARTITION p_other VALUES IN (NULL)
 True);
 True```

 False## 3. 安全配置详解
 False
 False### 3.1 基础安全配置
 False
```sql
 True-- 设置强密码（至少8位，包含大小写字母、数字、特殊字符）
 TrueALTER USER 'root'@'localhost' IDENTIFIED BY 'NewStrongPass@123';
 True
 True-- 删除匿名用户
 TrueDELETE FROM mysql.user WHERE User = '';
 True
 True-- 禁止 root 用户远程登录
 TrueDELETE FROM mysql.user WHERE User = 'root' AND Host != 'localhost';
 TrueFLUSH PRIVILEGES;
 True
 True-- 创建应用专用用户
 TrueCREATE USER 'app_user'@'%' IDENTIFIED BY 'AppPass@2024';
 TrueGRANT SELECT, INSERT, UPDATE, DELETE ON production_db.* TO 'app_user'@'%';
 TrueFLUSH PRIVILEGES;
 True
 True-- 限制用户只能从特定 IP 登录
 TrueCREATE USER 'app_user'@'192.168.1.%' IDENTIFIED BY 'AppPass@2024';
 TrueCREATE USER 'app_user'@'10.%.%.%' IDENTIFIED BY 'AppPass@2024';
 True```

 False### 3.2 SSL/TLS 配置
 False
```sql
 True-- 检查 SSL 状态
 TrueSHOW VARIABLES LIKE 'have_ssl';
 TrueSHOW VARIABLES LIKE 'have_openssl';
 True
 True-- 配置 SSL（需要在 my.cnf 中配置）
 True-- [mysqld]
 True-- ssl-ca=/path/to/ca.pem
 True-- ssl-cert=/path/to/server-cert.pem
 True-- ssl-key=/path/to/server-key.pem
 True
 True-- 强制用户使用 SSL 连接
 TrueALTER USER 'root'@'localhost' REQUIRE SSL;
 True
 True-- 查看用户是否使用 SSL
 TrueSELECT user, host, ssl_type FROM mysql.user;
 True```

 False### 3.3 审计和监控
 False
```sql
 True-- 开启审计日志（企业版）
 True-- 安装审计插件后配置
 True
 True-- 查看用户连接历史
 TrueSELECT * FROM mysql.general_log WHERE command_type='Connect' ORDER BY event_time DESC LIMIT 100;
 True
 True-- 监控长时间运行的查询
 TrueSELECT * FROM information_schema.processlist WHERE Command != 'Sleep' AND Time > 60;
 True
 True-- 查看锁等待
 TrueSELECT * FROM information_schema.innodb_lock_waits;
 True
 True-- 查看事务
 TrueSELECT * FROM information_schema.innodb_trx;
 True```

 False## 4. 常见问题与解决方案
 False
 False### 4.1 连接问题
 False
 False| 问题 | 原因 | 解决方案 |
 False| :--- | :--- | :--- |
 False| **无法连接到 MySQL 服务器** | 网络问题、防火墙、服务未启动 | 检查网络、防火墙、启动 MySQL 服务 |
 False| **连接被拒绝 (Access Denied)** | 用户名/密码错误、IP 不在允许范围内 | 检查凭据、查看用户允许的 host |
 False| **连接超时** | 网络延迟、服务器负载高 | 检查网络、服务器资源、优化查询 |
 False| **Too many connections** | 连接数超过最大限制 | 增加 max_connections、优化连接使用 |
 False| **Lost connection during query** | 查询返回数据过大、网络问题 | 增加 max_allowed_packet、优化查询 |
 False
 False### 4.2 权限问题
 False
 False| 问题 | 原因 | 解决方案 |
 False| :--- | :--- | :--- |
 False| **访问被拒绝** | 权限不足、主机限制 | 检查用户权限、修改授权 |
 False| **无法创建用户** | 缺少 CREATE USER 权限 | 使用 root 用户或授予 CREATE USER 权限 |
 False| **权限不生效** | 未刷新权限 | 执行 `FLUSH PRIVILEGES` |
 False| **外键约束失败** | 关联数据不存在 | 先插入/更新主表数据，再操作从表 |
 False
 False### 4.3 性能问题
 False
 False| 问题 | 原因 | 解决方案 |
 False| :--- | :--- | :--- |
 False| **查询速度慢** | 缺少索引、SQL 写法不当、服务器配置低 | 添加索引、重写 SQL、提升服务器配置 |
 False| **服务器负载高** | 并发过高、复杂查询、资源不足 | 使用连接池、优化查询、增加资源 |
 False| **内存使用过高** | buffer_pool 过大、连接数过多 | 调整配置、限制连接数 |
 False| **磁盘 IO 高** | 大量写入、缺少索引、缓冲池不足 | 优化索引、增加缓冲池、使用 SSD |
 False
 False### 4.4 数据问题
 False
 False| 问题 | 原因 | 解决方案 |
 False| :--- | :--- | :--- |
 False| **数据丢失** | 误删除、硬件故障、事务回滚 | 使用备份恢复、启用 binlog 恢复 |
 False| **数据不一致** | 事务处理不当、外键约束错误 | 检查事务逻辑、修复外键约束 |
 False| **表损坏** | 服务器异常关闭、磁盘故障 | 使用 `REPAIR TABLE` 修复或从备份恢复 |
 False| **字符集乱码** | 字符集不一致 | 统一使用 utf8mb4 |
 False
 False## 5. 监控与维护
 False
 False### 5.1 常用监控命令
 False
```sql
 True-- 查看服务器状态
 TrueSHOW STATUS; -- 所有状态变量
 TrueSHOW GLOBAL STATUS; -- 全局状态
 TrueSHOW VARIABLES; -- 所有配置变量
 TrueSHOW GLOBAL VARIABLES;
 True
 True-- 关键指标
 TrueSHOW STATUS LIKE 'Threads_connected'; -- 当前连接数
 TrueSHOW STATUS LIKE 'Max_used_connections'; -- 历史最大连接数
 TrueSHOW STATUS LIKE 'Slow_queries'; -- 慢查询数量
 TrueSHOW STATUS LIKE 'Innodb_row_lock%'; -- 锁等待情况
 TrueSHOW STATUS LIKE 'Com_select'; -- 查询次数
 TrueSHOW STATUS LIKE 'Com_insert'; -- 插入次数
 TrueSHOW STATUS LIKE 'Com_update'; -- 更新次数
 TrueSHOW STATUS LIKE 'Com_delete'; -- 删除次数
 True
 True-- 查看进程
 TrueSHOW PROCESSLIST;
 TrueSHOW FULL PROCESSLIST;
 True
 True-- 查看 InnoDB 状态
 TrueSHOW ENGINE INNODB STATUS;
 True
 True-- 查看所有表状态
 TrueSHOW TABLE STATUS FROM database_name;
 True
 True-- 查看索引使用情况
 TrueSHOW INDEX FROM table_name;
 True```

 False### 5.2 定期维护任务
 False
```sql
 True-- 分析表（更新统计信息）
 TrueANALYZE TABLE users;
 True
 True-- 检查表
 TrueCHECK TABLE users;
 True
 True-- 修复表
 TrueREPAIR TABLE users;
 True
 True-- 优化表（整理碎片）
 TrueOPTIMIZE TABLE users;
 True
 True-- 重新生成表统计
 TrueANALYZE TABLE users;
 True
 True-- 清理二进制日志
 TruePURGE BINARY LOGS BEFORE '2024-01-01 00:00:00';
 TruePURGE BINARY LOGS TO 'mysql-bin.000010';
 True
 True-- 查看表碎片
 TrueSELECT TABLE_NAME, Data_free FROM information_schema.tables WHERE Data_free > 0;
 True```

 False### 5.3 备份策略
 False
```bash
 True#!/bin/bash
 True# 每日备份脚本示例
 True
 TrueBACKUP_DIR="/backup/mysql"
 TrueDATE=$(date +%Y%m%d)
 TrueMYSQL_USER="backup_user"
 TrueMYSQL_PASS="backup_password"
 True
 True# 创建备份目录
 Truemkdir -p $BACKUP_DIR
 True
 True# 备份所有数据库
 Truemysqldump -u$MYSQL_USER -p$MYSQL_PASS --all-databases --routines --triggers --events > $BACKUP_DIR/all_db_$DATE.sql
 True
 True# 压缩备份
 Truegzip $BACKUP_DIR/all_db_$DATE.sql
 True
 True# 删除 7 天前的备份
 Truefind $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
 True
 True# 备份完成
 Trueecho "Backup completed: $DATE"
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
 False- 2026-04-30: 大幅细化内容，添加性能优化详细配置、安全配置、监控维护和常见问题解决方案等
 False- 2026-04-05: 扩写内容，增加详细的性能优化策略、安全配置、监控维护和常见问题解决方案
 False