-- =============================================
-- 商品管理系统数据库 (Commodity Management System)
-- 完整的建表语句、测试数据和查询练习
-- 来源：KE-326, KE-330, KE-409, KE-413, KE-423, KE-427
-- =============================================

-- =============================================
-- 一、创建数据库并设置字符集
-- =============================================
CREATE DATABASE IF NOT EXISTS comminfo
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE comminfo;

-- =============================================
-- 二、创建数据表（含主键、外键、约束）
-- =============================================

-- 1. 部门信息表
CREATE TABLE Department_info (
    Department_id CHAR(6) PRIMARY KEY,
    Department_name VARCHAR(30) NOT NULL
);

-- 2. 岗位信息表
CREATE TABLE Post_info (
    Post_id CHAR(6) PRIMARY KEY,
    Post_name VARCHAR(30) NOT NULL,
    Department_id CHAR(6),
    FOREIGN KEY (Department_id) REFERENCES Department_info (Department_id)
);

-- 3. 员工信息表
CREATE TABLE Employees_info (
    Employees_id CHAR(8) PRIMARY KEY,
    Employees_name VARCHAR(30) NOT NULL,
    Employees_sex ENUM('男', '女') DEFAULT '男',
    Identity_id CHAR(18) UNIQUE,
    Hiredate DATETIME DEFAULT NOW(),
    Post_id CHAR(6),
    CHECK (LENGTH(Identity_id) = 18),
    FOREIGN KEY (Post_id) REFERENCES Post_info (Post_id)
);

-- 4. 商品信息表
CREATE TABLE Commodity_info (
    Commodity_id CHAR(6) PRIMARY KEY,
    Commodity_name VARCHAR(30) NOT NULL,
    memo VARCHAR(50)
);

-- 5. 客户信息表
CREATE TABLE Customer_info (
    Customer_id CHAR(6) PRIMARY KEY,
    Customer_name VARCHAR(30) NOT NULL,
    Customer_sex CHAR(2) DEFAULT '男',
    Customer_Birth DATETIME,
    Telephone CHAR(11) NOT NULL UNIQUE,
    Address VARCHAR(50) NOT NULL,
    CHECK (Customer_sex IN ('男', '女')),
    CHECK (LENGTH(Telephone) = 11)
);

-- 6. 供应商信息表
CREATE TABLE Supplier_info (
    Supplier_id CHAR(6) PRIMARY KEY,
    Supplier_name VARCHAR(30) NOT NULL,
    Telephone CHAR(11) NOT NULL UNIQUE,
    Address VARCHAR(50),
    CHECK (LENGTH(Telephone) = 11)
);

-- 7. 销售信息表
CREATE TABLE Sales_info (
    Sales_id CHAR(12) PRIMARY KEY,
    Customer_id CHAR(6),
    Sales_time DATETIME NOT NULL,
    Employees_id CHAR(8),
    FOREIGN KEY (Customer_id) REFERENCES Customer_info (Customer_id),
    FOREIGN KEY (Employees_id) REFERENCES Employees_info (Employees_id)
);

-- 8. 销售明细表
CREATE TABLE Sales_list (
    Slist_id INT PRIMARY KEY AUTO_INCREMENT,
    Sales_id CHAR(12),
    Commodity_id CHAR(6),
    Sales_price FLOAT NOT NULL,
    Sales_Number INT NOT NULL,
    FOREIGN KEY (Sales_id) REFERENCES Sales_info (Sales_id),
    FOREIGN KEY (Commodity_id) REFERENCES Commodity_info (Commodity_id),
    CHECK (Sales_price > 0),
    CHECK (Sales_Number > 0)
);

-- 9. 采购信息表
CREATE TABLE Purchase_info (
    Purchase_id CHAR(12) PRIMARY KEY,
    Supplier_id CHAR(6),
    Purchase_time DATETIME NOT NULL,
    Employees_id CHAR(8),
    FOREIGN KEY (Supplier_id) REFERENCES Supplier_info (Supplier_id),
    FOREIGN KEY (Employees_id) REFERENCES Employees_info (Employees_id)
);

-- 10. 采购明细表
CREATE TABLE Purchase_list (
    Plist_id INT PRIMARY KEY AUTO_INCREMENT,
    Purchase_id CHAR(12),
    Commodity_id CHAR(6),
    Purchase_price FLOAT NOT NULL,
    Purchase_Number INT NOT NULL,
    FOREIGN KEY (Purchase_id) REFERENCES Purchase_info (Purchase_id),
    FOREIGN KEY (Commodity_id) REFERENCES Commodity_info (Commodity_id),
    CHECK (Purchase_price > 0),
    CHECK (Purchase_Number > 0)
);

-- =============================================
-- 三、插入测试数据
-- =============================================

-- 部门信息表数据
INSERT INTO Department_info VALUES
('yy1001', '营业部'),
('xz1001', '行政部'),
('cw1001', '财务部'),
('js1001', '技术部');

-- 岗位信息表数据
INSERT INTO Post_info VALUES
('xs1001', '销售岗', 'yy1001'),
('cg1001', '采购岗', 'yy1001'),
('HR1001', 'HR岗', 'xz1001'),
('cn1001', '出纳岗', 'cw1001'),
('wh1001', '维护岗', 'js1001');

-- 员工信息表数据
INSERT INTO Employees_info VALUES
('xz100101', '王茜', '女', '420303000000000001', '2015-6-2', 'HR1001'),
('xz100102', '李先左', DEFAULT, '420303000000000002', '2008-1-25', 'HR1001'),
('cg100101', '王道友', DEFAULT, '420303000000000003', '2005-9-6', 'cg1001'),
('cg100102', '刘道全', DEFAULT, '420303000000000004', '2010-7-10', 'cg1001'),
('cg100103', '王华', '女', '420303000000000005', '2012-1-15', 'cg1001'),
('xs100101', '王小妮', '女', '420303000000000006', '2012-3-24', 'xs1001'),
('xs100102', '刘祥', '男', '42030300000000000X', '2016-6-20', 'xs1001'),
('xs100103', '王嘉伦', '男', '420303000000000007', '2014-12-8', 'xs1001');

-- 商品信息表数据
INSERT INTO Commodity_info VALUES
('hw1001', '华为P20', NULL),
('hw1002', '华为P20Pro', NULL),
('xm1001', '小米note5', NULL),
('xm1002', '小米6', NULL),
('op1001', 'OPPO A5', NULL),
('op1002', 'OPPO R15', NULL),
('lx1001', '联想S5 pro', NULL),
('lx1002', '联想K5 pro', NULL),
('pg1001', 'iPhone 8', NULL);

-- 客户信息表数据
INSERT INTO Customer_info VALUES
('kh1001', '李思', '女', NULL, '13879008970', '武汉武昌区八一路武汉大学'),
('kh1002', '王天', '男', '1987-8-9', '13879008971', '武汉洪山区珞喻东路华中科技大学'),
('kh1003', '柳田', '女', '1996-9-12', '13879008972', '武汉汉阳区动物园路1号'),
('kh1004', '王武斌', '男', '1993-4-1', '13879008974', '武汉武昌区丁字桥路88号'),
('kh1005', '钱小凤', '女', '1989-6-22', '13879008975', '武汉汉阳区沌口路27号'),
('kh1006', '王武斌', '男', '1993-4-1', '13879008976', '武汉汉口江汉路66号');

-- 供应商信息表数据
INSERT INTO Supplier_info VALUES
('gys001', '蓝天公司', '18781201275', '广东省深圳市龙岗区'),
('gys002', '翔云公司', '18781201274', '北京市'),
('gys003', '喜洋洋公司', '18781201277', '广东省东莞市'),
('gys004', '嘉盛公司', '18781201276', '北京市'),
('gys005', '东方红公司', '18781201239', '武汉市'),
('gys006', '优家公司', '18781201264', '南京市');

-- 采购信息表数据
INSERT INTO Purchase_info VALUES
('201803010001', 'gys001', '2018-3-1', 'cg100101'),
('201705050002', 'gys002', '2017-5-5', 'cg100101'),
('201803050003', 'gys003', '2018-3-5', 'cg100101'),
('201803180004', 'gys004', '2018-3-18', 'cg100102'),
('201806030005', 'gys005', '2018-6-3', 'cg100102'),
('201808090006', 'gys006', '2018-8-9', 'cg100102');

-- 采购明细表数据
INSERT INTO Purchase_list (Purchase_id, Commodity_id, Purchase_price, Purchase_Number) VALUES
('201803010001', 'hw1001', 3000, 23),
('201803010001', 'hw1002', 4100, 57),
('201803010001', 'xm1001', 700, 35),
('201705050002', 'xm1002', 1110, 88),
('201705050002', 'hw1002', 4000, 100),
('201705050002', 'op1001', 900, 20),
('201803050003', 'op1001', 998, 10),
('201803050003', 'op1002', 2000, 5),
('201803180004', 'lx1001', 1020, 67),
('201803180004', 'hw1002', 4050, 25),
('201806030005', 'lx1002', 800, 60),
('201806030005', 'hw1001', 3100, 28),
('201808090006', 'lx1002', 850, 60),
('201808090006', 'op1002', 1800, 18);

-- 销售信息表数据
INSERT INTO Sales_info VALUES
('201804080001', 'kh1001', '2018-4-8', 'xs100101'),
('201812060002', 'kh1002', '2018-12-6', 'xs100101'),
('201806170003', 'kh1003', '2018-6-17', 'xs100101'),
('201811180004', 'kh1004', '2018-11-18', 'xs100102'),
('201809030005', 'kh1005', '2018-9-3', 'xs100102'),
('201810210006', 'kh1006', '2018-10-21', 'xs100102');

-- 销售明细表数据
INSERT INTO Sales_list (Sales_id, Commodity_id, Sales_price, Sales_Number) VALUES
('201804080001', 'hw1001', 3500, 22),
('201804080001', 'hw1002', 4800, 53),
('201804080001', 'xm1001', 1100, 10),
('201804080001', 'xm1002', 1500, 4),
('201812060002', 'xm1002', 1400, 8),
('201812060002', 'hw1002', 4700, 17),
('201812060002', 'op1001', 1100, 6),
('201806170003', 'op1001', 1200, 2),
('201806170003', 'op1002', 2500, 18),
('201811180004', 'hw1002', 4650, 21),
('201811180004', 'xm1002', 1450, 14),
('201809030005', 'lx1001', 1600, 15),
('201809030005', 'lx1002', 1100, 14),
('201810210006', 'lx1002', 1120, 14);

-- =============================================
-- 四、数据查询练习
-- =============================================

-- 查看所有表数据
SELECT * FROM department_info;
SELECT * FROM post_info;
SELECT * FROM employees_info;
SELECT * FROM commodity_info;
SELECT * FROM customer_info;
SELECT * FROM supplier_info;
SELECT * FROM purchase_info;
SELECT * FROM purchase_list;
SELECT * FROM sales_info;
SELECT * FROM sales_list;

-- =============================================
-- 五、条件查询练习
-- =============================================

-- 1. 查询所有女性员工
SELECT * FROM employees_info WHERE Employees_sex = '女';

-- 2. 查询女性员工且入职日期小于2015年
SELECT * FROM employees_info WHERE Employees_sex = '女' AND Hiredate < '2015-01-01';

-- 3. 查询工龄超过15年的员工
SELECT *, YEAR(NOW()) - YEAR(Hiredate) AS 工龄 FROM employees_info WHERE YEAR(NOW()) - YEAR(Hiredate) > 15;

-- 4. 查询工龄在10到15年之间的员工
SELECT *, YEAR(NOW()) - YEAR(Hiredate) AS 工龄 FROM employees_info WHERE YEAR(NOW()) - YEAR(Hiredate) BETWEEN 10 AND 15;

-- 5. 查询岗位编号在cg1001到hr1001之间的员工
SELECT * FROM employees_info WHERE Post_id BETWEEN 'cg1001' AND 'hr1001';

-- 6. 查询特定岗位的员工（使用IN）
SELECT * FROM employees_info WHERE Post_id IN ('cg1001', 'hr1001');

-- 7. 模糊查询：姓名包含"王"的员工
SELECT * FROM employees_info WHERE Employees_name LIKE '%王%';

-- 8. 模糊查询：姓名以"王"开头的员工
SELECT * FROM employees_info WHERE Employees_name LIKE '王%';

-- 9. 排序：按入职日期降序
SELECT * FROM employees_info ORDER BY Hiredate DESC;

-- 10. 查询所有女性客户的姓名和联系电话
SELECT Customer_name, Telephone FROM customer_info WHERE Customer_sex = '女';

-- 11. 查询年龄大于30岁的客户
SELECT *, YEAR(NOW()) - YEAR(Customer_Birth) AS 年龄 FROM customer_info WHERE YEAR(NOW()) - YEAR(Customer_Birth) > 30;

-- 12. 查询没有填写出生日期的客户
SELECT * FROM customer_info WHERE Customer_Birth IS NULL;

-- =============================================
-- 六、分组聚合查询练习
-- =============================================

-- 1. 统计客户表中客户人数
SELECT COUNT(Customer_name) AS 总人数 FROM customer_info;

-- 2. 统计男性和女性客户人数
SELECT COUNT(Customer_name) AS 人数, Customer_sex AS 性别 FROM customer_info GROUP BY Customer_sex;

-- 3. 统计每件商品的销售总数
SELECT Commodity_id, SUM(Sales_Number) AS 总数 FROM sales_list GROUP BY Commodity_id;

-- 4. 统计每件商品的销售均价
SELECT Commodity_id, AVG(Sales_price) AS 平均售价 FROM sales_list GROUP BY Commodity_id;

-- 5. 统计每件商品的最高售价和最低售价
SELECT Commodity_id, MAX(Sales_price) AS 最高价, MIN(Sales_price) AS 最低价 FROM sales_list GROUP BY Commodity_id;

-- 6. 找出销售均价高于1500元的商品
SELECT Commodity_id, AVG(Sales_price) AS 平均售价 FROM sales_list GROUP BY Commodity_id HAVING AVG(Sales_price) > 1500;

-- 7. 找出畅销商品（销售总数量超过50）
SELECT Commodity_id, SUM(Sales_Number) AS 总数量 FROM sales_list GROUP BY Commodity_id HAVING SUM(Sales_Number) > 50;

-- 8. 统计每件商品的销售总金额
SELECT Commodity_id, SUM(Sales_price * Sales_Number) AS 总金额 FROM sales_list GROUP BY Commodity_id;

-- 9. 统计采购总成本
SELECT SUM(Purchase_price * Purchase_Number) AS 总成本 FROM purchase_list;

-- 10. 按采购单统计总数量
SELECT Purchase_id, SUM(Purchase_Number) AS 总量 FROM purchase_list GROUP BY Purchase_id;

-- =============================================
-- 七、内连接查询练习
-- =============================================

-- 1. 查询员工姓名以及对应的岗位名称
SELECT e.Employees_name, p.Post_name
FROM employees_info e
JOIN post_info p ON e.Post_id = p.Post_id;

-- 2. 查询商品名称对应的销售数量
SELECT c.Commodity_name, SUM(s.Sales_Number) AS 销售数量
FROM commodity_info c
JOIN sales_list s ON c.Commodity_id = s.Commodity_id
GROUP BY c.Commodity_name;

-- 3. 内连接员工表和销售信息表
SELECT e.*, s.*
FROM employees_info e
INNER JOIN sales_info s ON e.Employees_id = s.Employees_id;

-- 4. 列出员工销售订单信息
SELECT e.Employees_id, e.Employees_name, e.Employees_sex, s.Sales_id, s.Customer_id, s.Sales_time
FROM employees_info e
INNER JOIN sales_info s ON e.Employees_id = s.Employees_id;

-- 5. 列出员工'王小妮'的销售订单信息
SELECT e.Employees_id, e.Employees_name, e.Employees_sex, s.Sales_id, c.Customer_name, s.Sales_time
FROM employees_info e
INNER JOIN sales_info s ON e.Employees_id = s.Employees_id
INNER JOIN customer_info c ON s.Customer_id = c.Customer_id
WHERE e.Employees_name = '王小妮';

-- 6. 使用WHERE子句实现多表连接
SELECT e.Employees_id, e.Employees_name, e.Employees_sex, s.Sales_id, c.Customer_name, s.Sales_time
FROM employees_info e, sales_info s, customer_info c
WHERE e.Employees_id = s.Employees_id AND s.Customer_id = c.Customer_id AND e.Employees_name = '王小妮';

-- 7. 统计各销售员ID的销售业绩并按降序排列
SELECT e.Employees_id, e.Employees_name, SUM(sl.Sales_price * sl.Sales_Number) AS 销售总业绩
FROM employees_info e
INNER JOIN sales_info s ON e.Employees_id = s.Employees_id
INNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
GROUP BY e.Employees_id, e.Employees_name
ORDER BY 销售总业绩 DESC;

-- 8. 查询客户购买的商品名称和购买数量
SELECT c.Customer_name, m.Commodity_name, SUM(sl.Sales_Number) AS 购买数量
FROM customer_info c
INNER JOIN sales_info s ON c.Customer_id = s.Customer_id
INNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
INNER JOIN commodity_info m ON sl.Commodity_id = m.Commodity_id
GROUP BY c.Customer_name, m.Commodity_name;

-- 9. 完整订单信息查询
SELECT e.Employees_name, s.Sales_id, c.Customer_name, m.Commodity_name, s.Sales_time, sl.Sales_Number
FROM employees_info e
INNER JOIN sales_info s ON e.Employees_id = s.Employees_id
INNER JOIN customer_info c ON s.Customer_id = c.Customer_id
INNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
INNER JOIN commodity_info m ON sl.Commodity_id = m.Commodity_id;

-- 10. 自连接查询：与翔云公司在同一个城市的供应商
SELECT s1.Supplier_name, s1.Address, s2.Supplier_name AS 同城市供应商
FROM supplier_info s1
INNER JOIN supplier_info s2 ON s1.Address = s2.Address
WHERE s1.Supplier_name = '翔云公司' AND s1.Supplier_id <> s2.Supplier_id;

-- 11. 自连接查询：与王华同名的员工
SELECT e1.Employees_name, e1.Employees_id, e2.Employees_id AS 同名员工ID
FROM employees_info e1
INNER JOIN employees_info e2 ON e1.Employees_name = e2.Employees_name
WHERE e1.Employees_name = '王华' AND e1.Employees_id <> e2.Employees_id;

-- =============================================
-- 八、外连接查询练习
-- =============================================

-- 1. 左外连接：查询所有员工及他们的销售记录
SELECT e.Employees_name, s.*
FROM employees_info e
LEFT JOIN sales_info s ON e.Employees_id = s.Employees_id;

-- 2. 右外连接：查询所有销售记录及对应的员工
SELECT e.Employees_name, s.*
FROM employees_info e
RIGHT JOIN sales_info s ON e.Employees_id = s.Employees_id;

-- 3. 左外连接：统计每种商品的销量（包含未销售的商品）
SELECT c.Commodity_name, IFNULL(SUM(sl.Sales_Number), 0) AS 销售数量
FROM commodity_info c
LEFT JOIN sales_list sl ON c.Commodity_id = sl.Commodity_id
GROUP BY c.Commodity_name;

-- 4. 左外连接：查询采购信息（包含没有采购的商品）
SELECT c.Commodity_name, pi.Purchase_id, pi.Purchase_time, pl.Purchase_Number, pl.Purchase_price,
       su.Supplier_name, e.Employees_name
FROM commodity_info c
LEFT JOIN purchase_list pl ON c.Commodity_id = pl.Commodity_id
LEFT JOIN purchase_info pi ON pl.Purchase_id = pi.Purchase_id
LEFT JOIN supplier_info su ON pi.Supplier_id = su.Supplier_id
LEFT JOIN employees_info e ON pi.Employees_id = e.Employees_id;

-- =============================================
-- 九、数据更新与删除练习
-- =============================================

-- 1. 修改员工姓名
UPDATE employees_info SET Employees_name = '王西' WHERE Employees_id = 'xz100101';

-- 2. 修改员工岗位
UPDATE employees_info SET Post_id = 'xs1001' WHERE Employees_id = 'xs100103';

-- 3. 修改客户信息
UPDATE customer_info
SET Customer_name = '柳甜', Customer_Birth = NULL, Telephone = '13879008942'
WHERE Customer_name = '柳田';

-- 4. 批量修改销售数量（小于10的加5）
UPDATE sales_list SET Sales_Number = Sales_Number + 5 WHERE Sales_Number < 10;

-- 5. 修改销售时间
UPDATE sales_info SET Sales_time = NOW() WHERE Sales_time IS NOT NULL;

-- 6. 删除特定数据
DELETE FROM mark WHERE studentno = 'xx100104' AND courseno = 'kc1002';

-- =============================================
-- 十、综合练习
-- =============================================

-- 练习1: 查询每位员工负责的客户数量
SELECT e.Employees_name, COUNT(s.Customer_id) AS 客户数量
FROM employees_info e
LEFT JOIN sales_info s ON e.Employees_id = s.Employees_id
GROUP BY e.Employees_name;

-- 练习2: 查询销售额最高的前3种商品
SELECT c.Commodity_name, SUM(sl.Sales_price * sl.Sales_Number) AS 总销售额
FROM commodity_info c
INNER JOIN sales_list sl ON c.Commodity_id = sl.Commodity_id
GROUP BY c.Commodity_name
ORDER BY 总销售额 DESC
LIMIT 3;

-- 练习3: 查询每位客户的消费总额
SELECT c.Customer_name, SUM(sl.Sales_price * sl.Sales_Number) AS 消费总额
FROM customer_info c
INNER JOIN sales_info s ON c.Customer_id = s.Customer_id
INNER JOIN sales_list sl ON s.Sales_id = sl.Sales_id
GROUP BY c.Customer_name
ORDER BY 消费总额 DESC;

-- 练习4: 查询每个部门的员工数量和平均工龄
SELECT d.Department_name, COUNT(e.Employees_id) AS 员工数量,
       AVG(YEAR(NOW()) - YEAR(e.Hiredate)) AS 平均工龄
FROM department_info d
LEFT JOIN post_info p ON d.Department_id = p.Department_id
LEFT JOIN employees_info e ON p.Post_id = e.Post_id
GROUP BY d.Department_name;

-- 练习5: 查询采购次数最多的供应商
SELECT su.Supplier_name, COUNT(DISTINCT pi.Purchase_id) AS 采购次数
FROM supplier_info su
INNER JOIN purchase_info pi ON su.Supplier_id = pi.Supplier_id
GROUP BY su.Supplier_name
ORDER BY 采购次数 DESC;

-- =============================================
-- 十一、常用指令速查
-- =============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS dbname CHARACTER SET utf8 COLLATE utf8_general_ci;

-- 创建表
CREATE TABLE tablename (字段...);

-- 主键约束
PRIMARY KEY (字段名)

-- 非空约束
NOT NULL

-- 唯一约束
UNIQUE (字段名)

-- 默认值
DEFAULT 值

-- 检查约束
CHECK (条件)

-- 外键约束
FOREIGN KEY (字段名) REFERENCES 表名 (字段名)

-- 自动增长
AUTO_INCREMENT

-- 插入数据
INSERT INTO 表名 (字段名) VALUES (值)

-- 更新数据
UPDATE 表名 SET 字段名 = 值 WHERE 条件

-- 删除数据
DELETE FROM 表名 WHERE 条件

-- 简单查询
SELECT * FROM 表名 WHERE 条件

-- 去重查询
SELECT DISTINCT 字段名 FROM 表名

-- 排序查询
SELECT * FROM 表名 ORDER BY 字段名 ASC/DESC

-- 分页查询
SELECT * FROM 表名 LIMIT n, m

-- 范围查询
SELECT * FROM 表名 WHERE 字段 BETWEEN 值1 AND 值2

-- IN查询
SELECT * FROM 表名 WHERE 字段 IN (值1, 值2, ...)

-- 模糊查询
SELECT * FROM 表名 WHERE 字段 LIKE '%关键词%'

-- 分组查询
SELECT 字段, 聚合函数 FROM 表名 GROUP BY 字段

-- 分组后过滤
SELECT 字段, 聚合函数 FROM 表名 GROUP BY 字段 HAVING 条件

-- 内连接
SELECT * FROM 表1 INNER JOIN 表2 ON 条件

-- 左外连接
SELECT * FROM 表1 LEFT JOIN 表2 ON 条件

-- 右外连接
SELECT * FROM 表1 RIGHT JOIN 表2 ON 条件
