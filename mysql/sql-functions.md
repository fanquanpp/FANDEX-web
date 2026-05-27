# SQL 函数与高级查询 (SQL Functions & Advanced Queries)
 False
 False> @Version: v4.0.0
 False> @Module: mysql
 False
 False> @Author: Anonymous
 False> @Category: MySQL Basics
 False> @Description: 内置函数详解、子查询、多表查询、最佳实践及常见问题。 | Built-in functions, subqueries, multi-table queries, best practices, and troubleshooting.
 False
 False---
 False
 False## 目录
 False
 False1. [内置函数详解](#内置函数详解)
 False2. [子查询详解](#子查询详解)
 False3. [多表查询详解](#多表查询详解)
 False4. [最佳实践](#最佳实践)
 False5. [常见问题与解决方案](#常见问题与解决方案)
 False6. [总结](#总结)
 False
 False---
 False
 False## 1. 内置函数详解
 False
 False### 1.1 字符串函数
 False
 False| 函数 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| CONCAT | 连接字符串 | CONCAT('Hello', ' ', 'World') |
 False| CONCAT_WS | 带分隔符连接 | CONCAT_WS('-', '2024', '01', '01') |
 False| LENGTH | 字节长度 | LENGTH('你好') = 6 |
 False| CHAR_LENGTH | 字符长度 | CHAR_LENGTH('你好') = 2 |
 False| SUBSTRING | 截取字符串 | SUBSTRING('Hello', 1, 3) = 'Hel' |
 False| LEFT/RIGHT | 从左/右截取 | LEFT('Hello', 2) = 'He' |
 False| TRIM | 去除首尾空格 | TRIM(' Hello ') |
 False| LOWER/UPPER | 转小/大写 | LOWER('HELLO') |
 False| REPLACE | 替换字符串 | REPLACE('Hello', 'l', 'w') |
 False| REVERSE | 反转字符串 | REVERSE('Hello') |
 False| LPAD/RPAD | 左/右填充 | LPAD('5', 3, '0') = '005' |
 False| INSTR | 查找子串位置 | INSTR('Hello', 'll') = 3 |
 False
 False**字符串函数示例**：
 False
```sql
 TrueSELECT 
 True username,
 True CONCAT(username, ' (', email, ')') AS user_info,
 True LENGTH(username) AS name_bytes,
 True CHAR_LENGTH(username) AS name_chars,
 True LOWER(email) AS email_lower,
 True UPPER(username) AS name_upper,
 True SUBSTRING(phone, 1, 3) AS phone_prefix
 TrueFROM users;
 True
 True-- 拼接地址
 TrueSELECT CONCAT_WS('', province, city, district, detail_address) AS full_address FROM addresses;
 True```

 False### 1.2 日期时间函数
 False
 False| 函数 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| NOW | 当前日期时间 | NOW() = '2024-01-15 10:30:00' |
 False| CURDATE | 当前日期 | CURDATE() = '2024-01-15' |
 False| CURTIME | 当前时间 | CURTIME() = '10:30:00' |
 False| DATE | 提取日期部分 | DATE('2024-01-15 10:30:00') |
 False| TIME | 提取时间部分 | TIME('2024-01-15 10:30:00') |
 False| YEAR/MONTH/DAY | 提取年月日 | YEAR(NOW()) = 2024 |
 False| HOUR/MINUTE/SECOND | 提取时分秒 | HOUR(NOW()) = 10 |
 False| DATE_FORMAT | 格式化日期 | DATE_FORMAT(NOW(), '%Y-%m-%d') |
 False| DATE_ADD/DATE_SUB | 日期加减 | DATE_ADD(NOW(), INTERVAL 1 DAY) |
 False| DATEDIFF | 日期差 | DATEDIFF('2024-01-15', '2024-01-01') |
 False| TIMESTAMPDIFF | 时间差 | TIMESTAMPDIFF(DAY, '2024-01-01', '2024-01-15') |
 False| DAYOFWEEK | 星期几 | DAYOFWEEK(NOW()) = 2 (周一=2) |
 False| LAST_DAY | 月份最后一天 | LAST_DAY('2024-01-15') |
 False
 False**日期函数示例**：
 False
```sql
 True-- 日期计算
 TrueSELECT 
 True NOW() AS now,
 True CURDATE() AS today,
 True DATE_ADD(NOW(), INTERVAL 7 DAY) AS next_week,
 True DATE_SUB(NOW(), INTERVAL 1 MONTH) AS last_month,
 True DATE_FORMAT(NOW(), '%Y年%m月%d日 %H:%i:%s') AS formatted;
 True
 True-- 日期差计算
 TrueSELECT 
 True username,
 True DATEDIFF(NOW(), created_at) AS days_since_join,
 True TIMESTAMPDIFF(YEAR, created_at, NOW()) AS years_since_join
 TrueFROM users;
 True
 True-- 格式化生日
 TrueSELECT 
 True username,
 True DATE_FORMAT(birthday, '%Y年%m月%d日') AS birthday_formatted,
 True TIMESTAMPDIFF(YEAR, birthday, NOW()) AS age
 TrueFROM users;
 True```

 False### 1.3 数值函数
 False
 False| 函数 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| ABS | 绝对值 | ABS(-10) = 10 |
 False| ROUND | 四舍五入 | ROUND(3.14159, 2) = 3.14 |
 False| CEIL/CEILING | 向上取整 | CEIL(3.1) = 4 |
 False| FLOOR | 向下取整 | FLOOR(3.9) = 3 |
 False| MOD | 取模 | MOD(10, 3) = 1 |
 False| POW/POWER | 幂运算 | POW(2, 3) = 8 |
 False| SQRT | 平方根 | SQRT(16) = 4 |
 False| RAND | 随机数 | RAND() = 0.123... |
 False| TRUNCATE | 截断 | TRUNCATE(3.14159, 3) = 3.141 |
 False| SIGN | 符号 | SIGN(-10) = -1 |
 False
 False**数值函数示例**：
 False
```sql
 True-- 基本计算
 TrueSELECT 
 True price,
 True ROUND(price, 2) AS rounded,
 True CEIL(price) AS ceil_price,
 True FLOOR(price) AS floor_price,
 True ABS(price - 100) AS price_diff
 TrueFROM products;
 True
 True-- 随机数据
 TrueSELECT * FROM users ORDER BY RAND() LIMIT 5; -- 随机取5条
 TrueUPDATE users SET verification_code = FLOOR(RAND() * 900000 + 100000) WHERE status = 0;
 True```

 False### 1.4 条件函数
 False
 False| 函数 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| IF | 条件判断 | IF(age > 18, '成人', '未成年') |
 False| IFNULL | NULL 替换 | IFNULL(email, '未填写') |
 False| NULLIF | NULL 条件 | NULLIF(a, b) |
 False| CASE | 多条件判断 | CASE WHEN ... THEN ... END |
 False
 False**条件函数示例**：
 False
```sql
 True-- IF 函数
 TrueSELECT 
 True username,
 True age,
 True IF(age >= 18, '成人', '未成年') AS age_desc,
 True IF(status = 1, '正常', '禁用') AS status_desc
 TrueFROM users;
 True
 True-- IFNULL 函数
 TrueSELECT 
 True username,
 True IFNULL(email, '未填写') AS email,
 True IFNULL(phone, IFNULL(telephone, '无')) AS contact
 TrueFROM users;
 True
 True-- CASE WHEN 函数
 TrueSELECT 
 True username,
 True age,
 True CASE 
 True WHEN age < 18 THEN '未成年'
 True WHEN age < 30 THEN '青年'
 True WHEN age < 60 THEN '中年'
 True ELSE '老年'
 True END AS age_group,
 True CASE status
 True WHEN 1 THEN '正常'
 True WHEN 2 THEN '冻结'
 True WHEN 0 THEN '禁用'
 True ELSE '未知'
 True END AS status_desc
 TrueFROM users;
 True
 True-- 复杂 CASE
 TrueSELECT 
 True SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS active_count,
 True SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS inactive_count,
 True SUM(CASE WHEN gender = '男' THEN 1 ELSE 0 END) AS male_count,
 True SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS female_count
 TrueFROM users;
 True```

 False### 1.5 其他常用函数
 False
```sql
 True-- 格式化和类型转换
 TrueSELECT 
 True CAST(price AS CHAR) AS price_str,
 True CONVERT(price, DECIMAL(10,2)) AS price_dec,
 True FORMAT(price, 2) AS price_formatted -- 千位分隔符
 TrueFROM products;
 True
 True-- 加密函数（单向）
 TrueSELECT 
 True MD5('password') AS md5_hash,
 True SHA1('password') AS sha1_hash,
 True SHA2('password', 256) AS sha256_hash
 TrueFROM users;
 True
 True-- UUID
 TrueSELECT UUID() AS uuid;
 True
 True-- 用户变量
 TrueSET @total = 0;
 TrueSELECT @total := @total + price FROM products;
 True```

 False## 2. 子查询详解
 False
 False子查询是嵌套在另一个查询中的查询，可以用于 WHERE、FROM、SELECT 等子句。
 False
 False### 2.1 子查询类型
 False
 False#### 2.1.1 按位置分类
 False
 False| 类型 | 说明 | 示例 |
 False| :--- | :--- | :--- |
 False| WHERE 子句子查询 | 在 WHERE 条件中使用 | `WHERE id IN (SELECT...)` |
 False| FROM 子句子查询 | 作为临时表 | `FROM (SELECT...) AS t` |
 False| SELECT 子句子查询 | 作为列 | `SELECT (SELECT...)` |
 False
 False#### 2.1.2 按返回结果分类
 False
 False| 类型 | 返回值 | 示例 |
 False| :--- | :--- | :--- |
 False| 标量子查询 | 单个值 | `SELECT * WHERE age = (SELECT MAX(age))` |
 False| 列子查询 | 一列值 | `WHERE id IN (SELECT user_id...)` |
 False| 行子查询 | 一行值 | `WHERE (id, name) = (SELECT...)` |
 False| 表子查询 | 多行多列 | `FROM (SELECT...) AS t` |
 False
 False### 2.2 标量子查询
 False
```sql
 True-- 查询年龄最大的用户
 TrueSELECT * FROM users WHERE age = (SELECT MAX(age) FROM users);
 True
 True-- 查询高于平均年龄的用户
 TrueSELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);
 True
 True-- 查询最新注册的用户
 TrueSELECT * FROM users WHERE created_at = (SELECT MAX(created_at) FROM users);
 True
 True-- 更新语句中使用子查询
 TrueUPDATE users SET age = (SELECT MAX(age) FROM users) + 1 WHERE id = 1;
 True```

 False### 2.3 列子查询 (IN/ANY/ALL)
 False
```sql
 True-- IN 子查询
 TrueSELECT * FROM users WHERE id IN (SELECT user_id FROM vip_users);
 True
 True-- NOT IN 子查询
 TrueSELECT * FROM users WHERE id NOT IN (SELECT user_id FROM blocked_users);
 True
 True-- ANY 子查询（满足任一即可）
 TrueSELECT * FROM products WHERE price > ANY (SELECT price FROM products WHERE category_id = 1);
 True
 True-- ALL 子查询（需满足所有）
 TrueSELECT * FROM products WHERE price > ALL (SELECT price FROM products WHERE status = 0);
 True
 True-- EXISTS 子查询
 TrueSELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
 True
 True-- NOT EXISTS 子查询
 TrueSELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
 True```

 False### 2.4 FROM 子句子查询
 False
```sql
 True-- 作为临时表
 TrueSELECT * FROM (SELECT * FROM users WHERE status = 1) AS active_users;
 True
 True-- 带聚合的子查询
 TrueSELECT * FROM (
 True SELECT 
 True status, 
 True COUNT(*) AS count, 
 True AVG(age) AS avg_age 
 True FROM users 
 True GROUP BY status
 True) AS stats WHERE avg_age > 25;
 True
 True-- 多表连接子查询
 TrueSELECT * FROM (
 True SELECT u.*, COUNT(o.id) AS order_count
 True FROM users u
 True LEFT JOIN orders o ON u.id = o.user_id
 True GROUP BY u.id
 True) AS user_orders WHERE order_count > 0;
 True```

 False### 2.5 SELECT 子句子查询
 False
```sql
 True-- 查询每个用户的订单数量
 TrueSELECT 
 True u.id,
 True u.username,
 True (SELECT COUNT(*) FROM orders WHERE user_id = u.id) AS order_count
 TrueFROM users u;
 True
 True-- 查询每个用户的最新订单时间
 TrueSELECT 
 True u.id,
 True u.username,
 True (SELECT MAX(created_at) FROM orders WHERE user_id = u.id) AS last_order_time
 TrueFROM users u;
 True
 True-- 相关子查询
 TrueSELECT 
 True u.username,
 True (SELECT COUNT(*) FROM orders WHERE user_id = u.id AND status = 1) AS active_orders
 TrueFROM users u;
 True```

 False### 2.6 子查询实战
 False
```sql
 True-- 查询购买过商品A和商品B的用户
 TrueSELECT DISTINCT user_id FROM order_items WHERE product_id = 'A'
 TrueAND user_id IN (SELECT user_id FROM order_items WHERE product_id = 'B');
 True
 True-- 查询销售额高于平均销售额的商品
 TrueSELECT * FROM products 
 TrueWHERE id IN (
 True SELECT product_id FROM order_items 
 True GROUP BY product_id 
 True HAVING SUM(price * quantity) > (SELECT AVG(total) FROM (SELECT SUM(price * quantity) AS total FROM order_items GROUP BY product_id) AS avg_total)
 True);
 True
 True-- 查询各部门工资最高的员工
 TrueSELECT * FROM employees e 
 TrueWHERE (dept_id, salary) IN (
 True SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id
 True);
 True```

 False## 3. 多表查询详解
 False
 False### 3.1 连接类型
 False
```
 True表A 表B
 True┌───┐ ┌───┐
 True│ 1 │ ──┐─── │ A │
 True│ 2 │ ──┼─── │ B │
 True│ 3 │ ──┼─── │ C │
 True│ 4 │ ──┘ │ │
 True└───┘ └───┘
 True
 True内连接 (INNER JOIN): 1, 2, 3 (只有两边都有的)
 True左连接 (LEFT JOIN): 1, 2, 3, 4 (A全部 + B匹配的)
 True右连接 (RIGHT JOIN): 1, 2, 3, A, B, C (B全部 + A匹配的)
 True全连接 (FULL JOIN): 1, 2, 3, 4, A, B, C (两边全部)
 True```

 False### 3.2 内连接 (INNER JOIN)
 False
```sql
 True-- 基本语法
 TrueSELECT u.username, o.order_no, o.total_amount
 TrueFROM users u
 TrueINNER JOIN orders o ON u.id = o.user_id;
 True
 True-- 多个表连接
 TrueSELECT u.username, o.order_no, p.product_name, oi.quantity
 TrueFROM users u
 TrueINNER JOIN orders o ON u.id = o.user_id
 TrueINNER JOIN order_items oi ON o.id = oi.order_id
 TrueINNER JOIN products p ON oi.product_id = p.id;
 True
 True-- USING 简化（列名相同时）
 TrueSELECT u.username, o.order_no
 TrueFROM users u
 TrueINNER JOIN orders o USING (user_id);
 True```

 False### 3.3 外连接 (LEFT/RIGHT JOIN)
 False
```sql
 True-- 左连接：返回左表所有记录
 TrueSELECT u.username, o.order_no, o.total_amount
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id;
 True-- 结果：所有用户，即使没有订单的用户也会显示
 True
 True-- 右连接：返回右表所有记录
 TrueSELECT u.username, o.order_no
 TrueFROM users u
 TrueRIGHT JOIN orders o ON u.id = o.user_id;
 True-- 结果：所有订单，即使没有对应用户的订单也会显示
 True
 True-- 左连接实战：统计每个用户的订单数量
 TrueSELECT u.username, COUNT(o.id) AS order_count
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id
 TrueGROUP BY u.id, u.username;
 True
 True-- 左连接实战：查询未购买过商品的用户
 TrueSELECT u.*
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id
 TrueWHERE o.id IS NULL;
 True
 True-- 右连接实战：查询没有被分配的员工
 TrueSELECT e.*
 TrueFROM employees e
 TrueRIGHT JOIN departments d ON e.dept_id = d.id
 TrueWHERE e.id IS NULL;
 True```

 False### 3.4 自连接 (SELF JOIN)
 False
```sql
 True-- 查询与某员工在同一部门的其他员工
 TrueSELECT e1.name AS employee, e2.name AS colleague, d.name AS dept
 TrueFROM employees e1
 TrueJOIN employees e2 ON e1.dept_id = e2.dept_id AND e1.id != e2.id
 TrueJOIN departments d ON e1.dept_id = d.id
 TrueWHERE e1.name = '张三';
 True
 True-- 自连接实战：与翔云公司在同一城市的供应商
 TrueSELECT s1.Supplier_name, s1.Address, s2.Supplier_name AS 同城市供应商
 TrueFROM supplier_info s1
 TrueINNER JOIN supplier_info s2 ON s1.Address = s2.Address
 TrueWHERE s1.Supplier_name = '翔云公司' AND s1.Supplier_id <> s2.Supplier_id;
 True
 True-- 自连接实战：查询所有上级领导
 TrueSELECT e.name AS employee, m.name AS manager
 TrueFROM employees e
 TrueLEFT JOIN employees m ON e.manager_id = m.id;
 True```

 False### 3.5 全连接 (FULL OUTER JOIN)
 False
 FalseMySQL 不直接支持 FULL OUTER JOIN，可使用 UNION 实现：
 False
```sql
 True-- 使用 UNION 实现全连接
 TrueSELECT u.username, o.order_no
 TrueFROM users u
 TrueLEFT JOIN orders o ON u.id = o.user_id
 TrueUNION
 TrueSELECT u.username, o.order_no
 TrueFROM users u
 TrueRIGHT JOIN orders o ON u.id = o.user_id;
 True```

 False### 3.6 交叉连接 (CROSS JOIN)
 False
```sql
 True-- 交叉连接（笛卡尔积）
 TrueSELECT u.username, p.product_name
 TrueFROM users u
 TrueCROSS JOIN products p;
 True-- 结果：每个用户与每个商品的组合
 True
 True-- 实际应用场景：生成时间表、组合枚举值等
 TrueSELECT 
 True DATE_ADD('2024-01-01', INTERVAL n DAY) AS date
 TrueFROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2...) AS numbers;
 True```

 False### 3.7 多表连接实战
 False
```sql
 True-- 列出员工姓名、销售订单编号、客户名称
 TrueSELECT e.Employees_name, s.Sales_id, c.Customer_name
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s ON e.Employees_id = s.Employees_id
 TrueINNER JOIN customer_info c ON s.Customer_id = c.Customer_id;
 True
 True-- 统计各销售员ID的销售业绩
 TrueSELECT e.Employees_id, e.Employees_name,
 True SUM(sl.Sales_price * sl.Sales_Number) AS 销售总业绩
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s ON e.Employees_id = s.Employees_id
 TrueINNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
 TrueGROUP BY e.Employees_id, e.Employees_name
 TrueORDER BY 销售总业绩 DESC;
 True
 True-- 查询客户购买的商品名称和购买数量
 TrueSELECT c.Customer_name, m.Commodity_name, SUM(sl.Sales_Number) AS 购买数量
 TrueFROM customer_info c
 TrueINNER JOIN sales_info s ON c.Customer_id = s.Customer_id
 TrueINNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
 TrueINNER JOIN commodity_info m ON sl.Commodity_id = m.Commodity_id
 TrueGROUP BY c.Customer_name, m.Commodity_name;
 True
 True-- 完整订单信息查询
 TrueSELECT e.Employees_name, s.Sales_id, c.Customer_name,
 True m.Commodity_name, s.Sales_time, sl.Sales_Number
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s ON e.Employees_id = s.Employees_id
 TrueINNER JOIN customer_info c ON s.Customer_id = c.Customer_id
 TrueINNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
 TrueINNER JOIN commodity_info m ON sl.Commodity_id = m.Commodity_id;
 True```

 False## 4. 最佳实践
 False
 False### 4.1 SQL 编写规范
 False
 False1. **使用大写关键字**：提高可读性
 False
 ```sql
 True -- 推荐
 True SELECT id, username, email FROM users WHERE status = 1;
 True 
 True -- 不推荐
 True select id, username, email from users where status = 1;
 True ```

 False2. **使用缩进和对齐**：使代码结构清晰
 False
 ```sql
 True SELECT 
 True u.id,
 True u.username,
 True o.order_no,
 True o.total_amount
 True FROM users u
 True INNER JOIN orders o ON u.id = o.user_id
 True WHERE o.status = 1
 True ORDER BY o.created_at DESC;
 True ```

 False3. **添加注释**：解释复杂逻辑
 False
 ```sql
 True -- 查询活跃用户（30天内有登录）
 True SELECT * FROM users 
 True WHERE last_login_time > DATE_SUB(NOW(), INTERVAL 30 DAY);
 True ```

 False4. **避免 SELECT ***：只选择需要的列
 False
 ```sql
 True -- 推荐
 True SELECT id, username, email FROM users;
 True 
 True -- 不推荐
 True SELECT * FROM users;
 True ```

 False5. **使用有意义别名**：提高可读性
 False
 ```sql
 True -- 推荐
 True SELECT u.username, o.order_no FROM users u INNER JOIN orders o ON u.id = o.user_id;
 True 
 True -- 不推荐
 True SELECT a.username, b.order_no FROM users a INNER JOIN orders b ON a.id = b.user_id;
 True ```

 False### 4.2 性能优化
 False
 False1. **使用索引**：为常用查询列创建索引
 False2. **避免 SELECT ***：减少网络传输
 False3. **使用 LIMIT**：限制返回行数
 False4. **避免在 WHERE 中使用函数**：导致索引失效
 False5. **合理使用 JOIN**：避免过多表连接
 False6. **优化 GROUP BY**：确保有适当的索引
 False7. **使用 EXPLAIN**：分析查询计划
 False
 False### 4.3 安全实践
 False
 False1. **参数化查询**：防止 SQL 注入
 False2. **最小权限原则**：为用户分配最小必要权限
 False3. **加密敏感数据**：密码、身份证号等
 False4. **输入验证**：验证和过滤用户输入
 False5. **定期备份**：确保数据安全
 False
 False## 5. 常见问题与解决方案
 False
 False### 5.1 SQL 注入
 False
 False**问题**：恶意用户通过输入特殊字符来修改 SQL 语句
 False
 False**解决方案**：
 False
 False- 使用参数化查询/预编译语句
 False- 对输入进行验证和过滤
 False- 使用存储过程封装数据访问
 False
 False### 5.2 索引失效
 False
 False**问题**：查询没有使用索引，导致性能下降
 False
 False**原因**：
 False
 False- 在 WHERE 子句中使用函数
 False- 使用 != 或 <> 操作符
 False- 使用 LIKE '%...' 模式
 False- 数据类型不匹配
 False
 False**解决方案**：
 False
 False- 避免在索引列上使用函数
 False- 使用 EXPLAIN 分析查询
 False- 创建合适的索引
 False
 False### 5.3 死锁
 False
 False**问题**：多个事务相互等待对方释放资源
 False
 False**解决方案**：
 False
 False- 保持事务简短
 False- 按相同顺序访问表
 False- 使用适当的隔离级别
 False- 避免长时间锁定资源
 False
 False## 6. 总结
 False
 False本章节详细介绍了 SQL 的高级特性，包括：
 False
 False1. **内置函数**：字符串、日期、数值、条件函数
 False2. **子查询**：嵌套查询的各种用法
 False3. **多表查询**：内连接、外连接、自连接
 False4. **最佳实践**：SQL 编写规范、性能优化、安全实践
 False5. **常见问题**：SQL 注入、索引失效、死锁
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-05-27: 拆分为独立文件，添加元数据，版本升级至 v4.0.0
 False- 2026-04-30: 大幅细化内容，添加内置函数详解、子查询、多表查询、最佳实践等
 False- 2026-04-05: 整合 SQL 基础语法知识
 False