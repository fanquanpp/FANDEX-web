# SQL 数据定义与高级对象 (SQL DDL & Advanced Objects)
 False
 False> @Version: v4.0.0
 False> @Module: mysql
 False
 False> @Author: Anonymous
 False> @Category: MySQL Basics
 False> @Description: DDL 数据定义语言、索引、约束、事务、视图、存储过程及触发器详解。 | DDL, indexes, constraints, transactions, views, stored procedures, and triggers.
 False
 False---
 False
 False## 目录
 False
 False1. [DDL (数据定义语言)](#ddl-数据定义语言)
 False2. [事务详解](#事务详解)
 False3. [视图详解](#视图详解)
 False4. [存储过程详解](#存储过程详解)
 False5. [触发器详解](#触发器详解)
 False
 False---
 False
 False## 1. DDL (数据定义语言) - Data Definition Language
 False
 FalseDDL 用于创建、修改和删除数据库对象，包括数据库、表、索引、视图等。
 False
 False### 1.1 数据库操作详解
 False
 False#### 1.1.1 创建数据库
 False
```sql
 True-- 基本创建
 TrueCREATE DATABASE mydb;
 True
 True-- 创建数据库（指定字符集和校对规则）
 TrueCREATE DATABASE mydb
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True
 True-- 如果不存在则创建（避免错误）
 TrueCREATE DATABASE IF NOT EXISTS mydb
 True CHARACTER SET utf8mb4
 True COLLATE utf8mb4_unicode_ci;
 True```

 False#### 1.1.2 查看数据库
 False
```sql
 True-- 查看所有数据库
 TrueSHOW DATABASES;
 True
 True-- 查看数据库创建信息
 TrueSHOW CREATE DATABASE mydb;
 True
 True-- 查看当前使用的数据库
 TrueSELECT DATABASE();
 True```

 False#### 1.1.3 选择数据库
 False
```sql
 TrueUSE mydb;
 True```

 False#### 1.1.4 删除数据库
 False
```sql
 True-- 删除数据库（谨慎使用）
 TrueDROP DATABASE mydb;
 True
 True-- 如果存在则删除
 TrueDROP DATABASE IF EXISTS mydb;
 True```

 False#### 1.1.5 修改数据库
 False
```sql
 True-- 修改数据库字符集
 TrueALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 True```

 False### 1.2 表操作详解
 False
 False#### 1.2.1 创建表
 False
```sql
 True-- 创建用户表（完整示例）
 TrueCREATE TABLE users (
 True id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
 True username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
 True email VARCHAR(100) NOT NULL COMMENT '邮箱',
 True password VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
 True phone VARCHAR(20) COMMENT '手机号',
 True age INT UNSIGNED COMMENT '年龄',
 True gender ENUM('男', '女', '保密') DEFAULT '保密' COMMENT '性别',
 True avatar VARCHAR(255) COMMENT '头像URL',
 True status TINYINT DEFAULT 1 COMMENT '状态：1-正常，0-禁用',
 True balance DECIMAL(10,2) DEFAULT 0.00 COMMENT '账户余额',
 True last_login_time DATETIME COMMENT '最后登录时间',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 True updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
 True INDEX idx_username (username),
 True INDEX idx_email (email),
 True INDEX idx_status (status)
 True) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
 True```

 False#### 1.2.2 表结构设计原则
 False
 False**设计要点**：
 False
 False- 主键：每个表必须有主键，推荐使用自增 INT 或 BIGINT
 False- 字段命名：使用有意义的名称，采用小写下划线命名法
 False- 数据类型：选择合适的数据类型，避免浪费存储空间
 False- 索引设计：为常用查询条件的字段创建索引
 False- 注释：为重要字段添加注释说明
 False
 False**字段类型选择指南**：
 False
 False| 场景 | 推荐类型 | 原因 |
 False| :--- | :--- | :--- |
 False| ID 主键 | INT/BIGINT AUTO_INCREMENT | 高效、自增、占用空间小 |
 False| 状态标志 | TINYINT | 占用空间最小 |
 False| 年龄 | TINYINT UNSIGNED | 范围 0-255，足够存储年龄 |
 False| 金额/价格 | DECIMAL(M,N) | 精确存储，避免浮点误差 |
 False| 手机号 | VARCHAR(20) | 可能有+86等前缀 |
 False| 文本描述 | VARCHAR/TEXT | 根据长度选择 |
 False| 日期时间 | DATETIME/TIMESTAMP | 根据是否需要时区选择 |
 False| UUID | VARCHAR(36) | 跨系统使用 |
 False
 False#### 1.2.3 查看表结构
 False
```sql
 True-- 查看表结构（DESCRIBE）
 TrueDESC users;
 True
 True-- 查看表结构（SHOW COLUMNS）
 TrueSHOW COLUMNS FROM users;
 True
 True-- 查看表的创建语句
 TrueSHOW CREATE TABLE users;
 True
 True-- 查看所有表
 TrueSHOW TABLES;
 True
 True-- 查看表状态
 TrueSHOW TABLE STATUS FROM mydb;
 True
 True-- 查看表是否存在
 TrueSHOW TABLES LIKE '%user%';
 True```

 False#### 1.2.4 修改表结构
 False
```sql
 True-- 添加新列
 TrueALTER TABLE users ADD COLUMN address VARCHAR(255) AFTER email;
 TrueALTER TABLE users ADD COLUMN is_verified TINYINT DEFAULT 0 AFTER status;
 True
 True-- 修改列（类型、约束）
 TrueALTER TABLE users MODIFY COLUMN phone VARCHAR(20) NOT NULL;
 True
 True-- 修改列名和类型
 TrueALTER TABLE users CHANGE COLUMN phone telephone VARCHAR(20) NOT NULL;
 True
 True-- 删除列
 TrueALTER TABLE users DROP COLUMN address;
 True
 True-- 添加索引
 TrueALTER TABLE users ADD INDEX idx_age (age);
 TrueALTER TABLE users ADD UNIQUE INDEX idx_phone (phone);
 TrueALTER TABLE users ADD INDEX idx_age_gender (age, gender);
 True
 True-- 添加外键
 TrueALTER TABLE orders ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);
 True
 True-- 删除外键
 TrueALTER TABLE orders DROP FOREIGN KEY fk_user_id;
 True
 True-- 修改表注释
 TrueALTER TABLE users COMMENT '用户信息表';
 True
 True-- 重命名表
 TrueALTER TABLE users RENAME TO user_info;
 TrueRENAME TABLE users TO user_info, orders TO order_info;
 True```

 False#### 1.2.5 删除表
 False
```sql
 True-- 删除表（删除表结构和所有数据）
 TrueDROP TABLE users;
 True
 True-- 如果表存在则删除
 TrueDROP TABLE IF EXISTS users;
 True
 True-- 删除多个表
 TrueDROP TABLE IF EXISTS users, orders, products;
 True
 True-- 清空表（保留表结构，重置自增ID）
 TrueTRUNCATE TABLE users;
 True```

 False#### 1.2.6 表复制
 False
```sql
 True-- 复制表结构（不复制数据）
 TrueCREATE TABLE users_copy LIKE users;
 True
 True-- 复制表结构和数据
 TrueCREATE TABLE users_copy AS SELECT * FROM users;
 True
 True-- 复制表结构（指定部分列）
 TrueCREATE TABLE users_copy AS SELECT id, username, email FROM users WHERE 1=0;
 True
 True-- 复制符合条件的数据
 TrueCREATE TABLE users_copy AS SELECT * FROM users WHERE status = 1;
 True```

 False### 1.3 索引操作详解
 False
 False#### 1.3.1 索引基础概念
 False
 False索引是一种特殊的数据结构，用于加速数据检索。类似于书籍的目录，索引可以快速定位数据，减少查询时间。
 False
 False**索引类型**：
 False
 False| 类型 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| 普通索引 | 最基本的索引 | `INDEX idx_name (name)` |
 False| 唯一索引 | 索引值唯一 | `UNIQUE INDEX idx_email (email)` |
 False| 主键索引 | 主键自动创建 | 主键列 |
 False| 复合索引 | 多列组合索引 | `INDEX idx_name_age (name, age)` |
 False| 全文索引 | 文本搜索 | `FULLTEXT INDEX ft_content (content)` |
 False| 空间索引 | 地理空间数据 | `SPATIAL INDEX sx_location (location)` |
 False
 False#### 1.3.2 创建索引
 False
```sql
 True-- 创建普通索引
 TrueCREATE INDEX idx_username ON users(username);
 True
 True-- 创建唯一索引
 TrueCREATE UNIQUE INDEX idx_email ON users(email);
 True
 True-- 创建复合索引
 TrueCREATE INDEX idx_name_status ON users(username, status);
 True
 True-- 创建复合唯一索引
 TrueCREATE UNIQUE INDEX idx_order_product ON order_items(order_id, product_id);
 True
 True-- 创建全文索引
 TrueALTER TABLE articles ADD FULLTEXT INDEX ft_title_content (title, content);
 True
 True-- 创建前缀索引（适用于长字符串）
 TrueCREATE INDEX idx_email_prefix ON users(email(10));
 True```

 False#### 1.3.3 查看索引
 False
```sql
 True-- 查看表的所有索引
 TrueSHOW INDEX FROM users;
 True
 True-- 查看索引详细信息
 TrueSHOW INDEX FROM users\G
 True
 True-- 查看查询是否使用索引
 TrueEXPLAIN SELECT * FROM users WHERE username = 'test';
 True```

 False#### 1.3.4 删除索引
 False
```sql
 True-- 删除索引
 TrueDROP INDEX idx_username ON users;
 True
 True-- 删除主键索引（需要先删除自增属性）
 TrueALTER TABLE users MODIFY id INT NOT NULL;
 TrueALTER TABLE users DROP PRIMARY KEY;
 True```

 False#### 1.3.5 索引设计原则
 False
 False**适合创建索引的场景**：
 False
 False- WHERE 子句中经常使用的列
 False- JOIN 操作中经常使用的列
 False- ORDER BY、GROUP BY 后面的列
 False- SELECT 中频繁查询的列
 False
 False**不适合创建索引的场景**：
 False
 False- 列中数据重复度很高（如性别只有男/女）
 False- 表数据量很小
 False- 经常更新的列
 False- 不出现在 WHERE 子句中的列
 False
 False**复合索引最左前缀原则**：
 False
```sql
 True-- 创建复合索引
 TrueCREATE INDEX idx_status_created ON users(status, created_at);
 True
 True-- 以下查询可以使用索引：
 TrueSELECT * FROM users WHERE status = 1;
 TrueSELECT * FROM users WHERE status = 1 AND created_at > '2024-01-01';
 True
 True-- 以下查询无法使用索引：
 TrueSELECT * FROM users WHERE created_at > '2024-01-01';
 True```

 False### 1.4 约束详解
 False
 False#### 1.4.1 约束类型
 False
 False| 约束类型 | 说明 | 关键字 |
 False| :--- | :--- | :--- |
 False| 主键约束 | 唯一标识每行记录 | PRIMARY KEY |
 False| 唯一约束 | 字段值唯一 | UNIQUE |
 False| 非空约束 | 字段值不能为空 | NOT NULL |
 False| 默认约束 | 字段默认值 | DEFAULT |
 False| 检查约束 | 字段值满足条件 | CHECK |
 False| 外键约束 | 表之间关联 | FOREIGN KEY |
 False| 自动增长 | 数值自动递增 | AUTO_INCREMENT |
 False
 False#### 1.4.2 约束示例
 False
```sql
 TrueCREATE TABLE orders (
 True id INT PRIMARY KEY AUTO_INCREMENT,
 True order_no VARCHAR(32) NOT NULL UNIQUE COMMENT '订单编号',
 True user_id INT NOT NULL COMMENT '用户ID',
 True total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '订单总额',
 True status TINYINT NOT NULL DEFAULT 1 COMMENT '状态',
 True created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 True -- 外键约束
 True FOREIGN KEY (user_id) REFERENCES users(id)
 True ON DELETE RESTRICT -- 限制删除
 True ON UPDATE CASCADE, -- 级联更新
 True -- 检查约束
 True CHECK (total_amount >= 0),
 True CHECK (status IN (1, 2, 3, 4, 5))
 True);
 True```

 False#### 1.4.3 外键约束行为
 False
 False| 行为 | 说明 |
 False| :--- | :--- |
 False| RESTRICT | 阻止删除/更新有外键关联的记录 |
 False| CASCADE | 级联删除/更新子表记录 |
 False| SET NULL | 将子表外键设为 NULL |
 False| NO ACTION | 拒绝删除/更新（与 RESTRICT 类似） |
 False
 False## 2. 事务详解
 False
 False### 2.1 事务概念
 False
 False事务是指一组操作，这些操作要么全部成功，要么全部失败，是一个不可分割的工作单元。
 False
 False**ACID 特性**：
 False
 False- Atomicity（原子性）：事务是最小执行单元，不可分割
 False- Consistency（一致性）：事务执行前后，数据保持一致
 False- Isolation（隔离性）：并发执行的事务相互隔离
 False- Durability（持久性）：事务提交后，修改永久保存
 False
 False### 2.2 事务基本语法
 False
```sql
 True-- 开始事务
 TrueSTART TRANSACTION;
 True-- 或
 TrueBEGIN;
 True
 True-- 执行操作
 TrueINSERT INTO users (username, email) VALUES ('张三', 'zhangsan@example.com');
 TrueUPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
 TrueUPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
 True
 True-- 提交事务
 TrueCOMMIT;
 True
 True-- 或回滚事务
 TrueROLLBACK;
 True
 True-- 设置保存点
 TrueSTART TRANSACTION;
 TrueINSERT INTO users (username) VALUES ('张三');
 TrueSAVEPOINT sp1;
 TrueINSERT INTO users (username) VALUES ('李四');
 TrueROLLBACK TO sp1; -- 回滚到保存点
 TrueCOMMIT;
 True```

 False### 2.3 事务隔离级别
 False
 False| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
 False| :--- | :--- | :--- | :--- |
 False| READ UNCOMMITTED | 可能 | 可能 | 可能 |
 False| READ COMMITTED | 不可能 | 可能 | 可能 |
 False| REPEATABLE READ (默认) | 不可能 | 不可能 | 可能 |
 False| SERIALIZABLE | 不可能 | 不可能 | 不可能 |
 False
```sql
 True-- 查看当前隔离级别
 TrueSELECT @@tx_isolation;
 TrueSELECT @@transaction_isolation;
 True
 True-- 设置隔离级别（会话级别）
 TrueSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
 True
 True-- 设置隔离级别（全局级别）
 TrueSET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
 True```

 False### 2.4 事务实战
 False
```sql
 True-- 转账事务
 TrueSTART TRANSACTION;
 TrueUPDATE accounts SET balance = balance - 1000 WHERE user_id = 1;
 TrueUPDATE accounts SET balance = balance + 1000 WHERE user_id = 2;
 True-- 检查是否成功
 TrueSELECT balance FROM accounts WHERE user_id IN (1, 2);
 True-- 如果余额为负则回滚
 TrueIF (SELECT balance FROM accounts WHERE user_id = 1) < 0 THEN
 True ROLLBACK;
 TrueELSE
 True COMMIT;
 TrueEND IF;
 True
 True-- 订单创建事务
 TrueSTART TRANSACTION;
 TrueINSERT INTO orders (user_id, total_amount) VALUES (1, 500);
 TrueSET @order_id = LAST_INSERT_ID();
 TrueINSERT INTO order_items (order_id, product_id, quantity, price) VALUES
 True(@order_id, 101, 2, 200),
 True(@order_id, 102, 1, 100);
 TrueUPDATE products SET stock = stock - 3 WHERE id IN (101, 102);
 TrueCOMMIT;
 True```

 False## 3. 视图详解
 False
 False### 3.1 视图概念
 False
 False视图是基于 SQL 查询结果的虚拟表，可以简化复杂查询、保护数据安全。
 False
 False### 3.2 创建视图
 False
```sql
 True-- 创建简单视图
 TrueCREATE VIEW active_users AS
 TrueSELECT id, username, email, status
 TrueFROM users
 TrueWHERE status = 1;
 True
 True-- 创建复杂视图（多表连接）
 TrueCREATE VIEW order_details AS
 TrueSELECT 
 True o.id AS order_id,
 True o.order_no,
 True u.username,
 True u.email,
 True o.total_amount,
 True o.status,
 True o.created_at
 TrueFROM orders o
 TrueINNER JOIN users u ON o.user_id = u.id;
 True
 True-- 创建聚合视图
 TrueCREATE VIEW user_stats AS
 TrueSELECT 
 True u.id,
 True u.username,
 True COUNT(o.id) AS order_count,
 True IFNULL(SUM(o.total_amount), 0) AS total_spent,
 True MAX(o.created_at) AS last_order_time
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id
 TrueGROUP BY u.id, u.username;
 True```

 False### 3.3 使用视图
 False
```sql
 True-- 查询视图（与表相同）
 TrueSELECT * FROM active_users WHERE username LIKE '张%';
 True
 True-- 视图与表连接
 TrueSELECT v.username, v.order_count, o.order_no
 TrueFROM user_stats v
 TrueLEFT JOIN orders o ON v.id = o.user_id
 TrueWHERE o.created_at > '2024-01-01';
 True
 True-- 物化视图（通过表实现）
 TrueCREATE TABLE monthly_sales AS
 TrueSELECT 
 True DATE_FORMAT(created_at, '%Y-%m') AS month,
 True COUNT(*) AS order_count,
 True SUM(total_amount) AS total_amount
 TrueFROM orders
 TrueGROUP BY DATE_FORMAT(created_at, '%Y-%m');
 True```

 False### 3.4 修改和删除视图
 False
```sql
 True-- 修改视图
 TrueCREATE OR REPLACE VIEW active_users AS
 TrueSELECT id, username, email, status, created_at
 TrueFROM users
 TrueWHERE status = 1;
 True
 True-- 删除视图
 TrueDROP VIEW IF EXISTS active_users;
 True
 True-- 查看视图定义
 TrueSHOW CREATE VIEW order_details;
 True```

 False### 3.5 视图限制
 False
```sql
 True-- 视图不能包含聚合函数（如 SUM、MAX）
 True-- 视图不能包含子查询（某些情况下）
 True-- 视图不能使用 LIMIT（某些 MySQL 版本）
 True-- 视图不能作为 UPDATE/DELETE 的目标（某些情况下）
 True```

 False## 4. 存储过程详解
 False
 False### 4.1 存储过程概念
 False
 False存储过程是预编译的 SQL 代码块，可以接收参数、返回值，用于实现复杂的业务逻辑。
 False
 False### 4.2 创建存储过程
 False
```sql
 TrueDELIMITER //
 True
 TrueCREATE PROCEDURE get_user_by_age(IN min_age INT, IN max_age INT)
 TrueBEGIN
 True SELECT * FROM users 
 True WHERE age BETWEEN min_age AND max_age 
 True ORDER BY age;
 TrueEND //
 True
 TrueCREATE PROCEDURE count_users_by_status(OUT active_count INT, OUT inactive_count INT)
 TrueBEGIN
 True SELECT COUNT(*) INTO active_count FROM users WHERE status = 1;
 True SELECT COUNT(*) INTO inactive_count FROM users WHERE status = 0;
 TrueEND //
 True
 TrueCREATE PROCEDURE update_user_status(IN user_id INT, IN new_status INT)
 TrueBEGIN
 True UPDATE users SET status = new_status, updated_at = NOW() WHERE id = user_id;
 TrueEND //
 True
 TrueDELIMITER ;
 True```

 False### 4.3 调用存储过程
 False
```sql
 True-- 调用无参数存储过程
 TrueCALL get_all_users();
 True
 True-- 调用有输入参数存储过程
 TrueCALL get_user_by_age(20, 30);
 True
 True-- 调用有输出参数存储过程
 TrueCALL count_users_by_status(@active, @inactive);
 TrueSELECT @active AS active_users, @inactive AS inactive_users;
 True
 True-- 调用有输入输出参数存储过程
 TrueSET @user_id = 1;
 TrueCALL update_user_status(@user_id, 0);
 True```

 False### 4.4 删除存储过程
 False
```sql
 TrueDROP PROCEDURE IF EXISTS get_user_by_age;
 True```

 False## 5. 触发器详解
 False
 False### 5.1 触发器概念
 False
 False触发器是在表发生特定事件（INSERT、UPDATE、DELETE）时自动执行的代码块。
 False
 False### 5.2 创建触发器
 False
```sql
 TrueDELIMITER //
 True
 True-- INSERT 触发器
 TrueCREATE TRIGGER before_user_insert
 TrueBEFORE INSERT ON users
 TrueFOR EACH ROW
 TrueBEGIN
 True SET NEW.created_at = NOW();
 True SET NEW.updated_at = NOW();
 True IF NEW.status IS NULL THEN
 True SET NEW.status = 1;
 True END IF;
 TrueEND //
 True
 True-- UPDATE 触发器
 TrueCREATE TRIGGER after_order_update
 TrueAFTER UPDATE ON orders
 TrueFOR EACH ROW
 TrueBEGIN
 True IF OLD.status != NEW.status THEN
 True INSERT INTO order_status_log (order_id, old_status, new_status, changed_at)
 True VALUES (OLD.id, OLD.status, NEW.status, NOW());
 True END IF;
 TrueEND //
 True
 True-- DELETE 触发器
 TrueCREATE TRIGGER after_user_delete
 TrueAFTER DELETE ON users
 TrueFOR EACH ROW
 TrueBEGIN
 True INSERT INTO user_delete_log (user_id, username, deleted_at)
 True VALUES (OLD.id, OLD.username, NOW());
 TrueEND //
 True
 TrueDELIMITER ;
 True```

 False### 5.3 删除触发器
 False
```sql
 TrueDROP TRIGGER IF EXISTS before_user_insert;
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
 False- 2026-04-30: 大幅细化内容，添加约束类型、索引设计原则、存储过程和触发器详解等
 False- 2026-04-05: 整合 SQL 基础语法知识
 False