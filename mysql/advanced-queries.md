# 进阶查询与多表操作 (Advanced Queries & Joins)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: MySQL Basics
 False> @Description: 多表联查、子查询、分组统计及窗口函数。 | Joins, Subqueries, Grouping, and Window Functions.
 False
 False---
 False
 False## 目录
 False
 False1. [多表联查](#多表联查)
 False2. [分组统计](#分组统计)
 False3. [子查询](#子查询)
 False4. [窗口函数](#窗口函数)
 False5. [实际应用示例](#实际应用示例)
 False
 False---
 False
 False## 1. 多表联查 (Joins)
 False
 False### 1.1 基本联查类型
 False
 False#### 1.1.1 联查类型总览
 False
 False| 联查类型 | 描述 | 返回结果 |
 False| -------------- | ---- | ------------------- |
 False| **INNER JOIN** | 内连接 | 只返回两表匹配的行 |
 False| **LEFT JOIN** | 左外连接 | 返回左表所有行，右表不匹配补 NULL |
 False| **RIGHT JOIN** | 右外连接 | 返回右表所有行，左表不匹配补 NULL |
 False| **FULL JOIN** | 全外连接 | 返回两表所有行，不匹配的补 NULL |
 False
 False#### 1.1.2 联查类型详解
 False
 False##### INNER JOIN（内连接）
 False
 False**作用**：只返回两个表中匹配条件的行。
 False
 False**语法**：
 False
```sql
 TrueSELECT * 
 TrueFROM table1 
 TrueINNER JOIN table2 
 True ON table1.id = table2.id;
 True```

 False**图解**：
 False
```
 True表A 表B 结果
 True┌───┐ ┌───┐ ┌───┐
 True│ 1 │ ────── │ A │ │ 1 │
 True│ 2 │ ────── │ B │ │ 2 │
 True│ 3 │ ────── │ C │ │ 3 │
 True│ 4 │ │ │ └───┘
 True└───┘ └───┘
 True```

 False**特点**：只有两边都匹配的数据才会出现在结果中。
 False
 False***
 False
 False##### LEFT JOIN（左外连接）
 False
 False**作用**：返回左表的所有行，以及右表中匹配的行；右表不匹配的部分用 NULL 填充。
 False
 False**语法**：
 False
```sql
 TrueSELECT * 
 TrueFROM table1 
 TrueLEFT JOIN table2 
 True ON table1.id = table2.id;
 True```

 False**图解**：
 False
```
 True表A 表B 结果
 True┌───┐ ┌───┐ ┌───┬─────┐
 True│ 1 │ ────── │ A │ │ 1 │ A │
 True│ 2 │ ────── │ B │ │ 2 │ B │
 True│ 3 │ ────── │ C │ │ 3 │ C │
 True│ 4 │ │ │ │ 4 │ NULL│
 True└───┘ └───┘ └───┴─────┘
 True```

 False**特点**：左表的数据全部保留，右表没有匹配的用 NULL 填充。
 False
 False***
 False
 False##### RIGHT JOIN（右外连接）
 False
 False**作用**：返回右表的所有行，以及左表中匹配的行；左表不匹配的部分用 NULL 填充。
 False
 False**语法**：
 False
```sql
 TrueSELECT * 
 TrueFROM table1 
 TrueRIGHT JOIN table2 
 True ON table1.id = table2.id;
 True```

 False**图解**：
 False
```
 True表A 表B 结果
 True┌───┐ ┌───┐ ┌─────┬───┐
 True│ 1 │ ────── │ A │ │ 1 │ A │
 True│ 2 │ ────── │ B │ │ 2 │ B │
 True│ │ │ C │ │ NULL│ C │
 True│ │ │ D │ │ NULL│ D │
 True└───┘ └───┘ └─────┴───┘
 True```

 False**特点**：右表的数据全部保留，左表没有匹配的用 NULL 填充。
 False
 False***
 False
 False##### FULL JOIN（全外连接）
 False
 False**作用**：返回两个表的所有行，不匹配的部分用 NULL 填充。
 False
 False**注意**：MySQL 不直接支持 FULL JOIN，需要通过 `UNION` 模拟。
 False
 False**语法**：
 False
```sql
 True-- 模拟 FULL JOIN
 TrueSELECT * 
 TrueFROM table1 
 TrueLEFT JOIN table2 
 True ON table1.id = table2.id
 TrueUNION
 TrueSELECT * 
 TrueFROM table1 
 TrueRIGHT JOIN table2 
 True ON table1.id = table2.id;
 True```

 False**图解**：
 False
```
 True表A 表B 结果
 True┌───┐ ┌───┐ ┌─────┬─────┐
 True│ 1 │ ────── │ A │ │ 1 │ A │
 True│ 2 │ ────── │ B │ │ 2 │ B │
 True│ 3 │ │ C │ │ 3 │ NULL│
 True│ │ │ D │ │ NULL│ C │
 True└───┘ └───┘ │ NULL│ D │
 True └─────┴─────┘
 True```

 False**特点**：两个表的数据全部保留，没有匹配的用 NULL 填充。
 False
 False### 1.2 联查示例
 False
 False**示例表结构**:
 False
```sql
 True-- 部门表
 TrueCREATE TABLE departments (
 True dept_id INT PRIMARY KEY,
 True dept_name VARCHAR(50) NOT NULL
 True);
 True
 True-- 员工表
 TrueCREATE TABLE employees (
 True emp_id INT PRIMARY KEY,
 True emp_name VARCHAR(50) NOT NULL,
 True dept_id INT,
 True salary DECIMAL(10, 2),
 True hire_date DATE,
 True FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
 True);
 True
 True-- 插入测试数据
 TrueINSERT INTO departments VALUES (1, '技术部'), (2, '市场部'), (3, '财务部');
 TrueINSERT INTO employees VALUES 
 True(1, '张三', 1, 8000, '2020-01-01'),
 True(2, '李四', 1, 9000, '2020-02-01'),
 True(3, '王五', 2, 7000, '2020-03-01'),
 True(4, '赵六', 2, 6000, '2020-04-01'),
 True(5, '钱七', 3, 10000, '2020-05-01');
 True```

 False**INNER JOIN 示例**:
 False
```sql
 True-- 查询员工及其所属部门
 TrueSELECT e.emp_id, e.emp_name, d.dept_name, e.salary
 TrueFROM employees e
 TrueINNER JOIN departments d ON e.dept_id = d.dept_id;
 True
 True-- 结果:
 True-- emp_id | emp_name | dept_name | salary
 True-- 1 | 张三 | 技术部 | 8000.00
 True-- 2 | 李四 | 技术部 | 9000.00
 True-- 3 | 王五 | 市场部 | 7000.00
 True-- 4 | 赵六 | 市场部 | 6000.00
 True-- 5 | 钱七 | 财务部 | 10000.00
 True```

 False**LEFT JOIN 示例**:
 False
```sql
 True-- 查询所有部门及其员工（包括没有员工的部门）
 TrueSELECT d.dept_id, d.dept_name, e.emp_name, e.salary
 TrueFROM departments d
 TrueLEFT JOIN employees e ON d.dept_id = e.dept_id;
 True
 True-- 结果:
 True-- dept_id | dept_name | emp_name | salary
 True-- 1 | 技术部 | 张三 | 8000.00
 True-- 1 | 技术部 | 李四 | 9000.00
 True-- 2 | 市场部 | 王五 | 7000.00
 True-- 2 | 市场部 | 赵六 | 6000.00
 True-- 3 | 财务部 | 钱七 | 10000.00
 True```

 False**RIGHT JOIN 示例**:
 False
```sql
 True-- 查询所有员工及其部门（如果员工没有部门也会显示）
 TrueSELECT e.emp_id, e.emp_name, d.dept_name, e.salary
 TrueFROM departments d
 TrueRIGHT JOIN employees e ON d.dept_id = e.dept_id;
 True
 True-- 结果:
 True-- emp_id | emp_name | dept_name | salary
 True-- 1 | 张三 | 技术部 | 8000.00
 True-- 2 | 李四 | 技术部 | 9000.00
 True-- 3 | 王五 | 市场部 | 7000.00
 True-- 4 | 赵六 | 市场部 | 6000.00
 True-- 5 | 钱七 | 财务部 | 10000.00
 True```

 False**FULL JOIN 模拟**:
 False
```sql
 True-- 模拟 FULL JOIN
 TrueSELECT d.dept_id, d.dept_name, e.emp_name, e.salary
 TrueFROM departments d
 TrueLEFT JOIN employees e ON d.dept_id = e.dept_id
 TrueUNION
 TrueSELECT d.dept_id, d.dept_name, e.emp_name, e.salary
 TrueFROM departments d
 TrueRIGHT JOIN employees e ON d.dept_id = e.dept_id;
 True```

 False### 1.3 多表联查实战（商品管理系统）
 False
 False以下示例基于商品管理系统数据库，包含完整的多表联查实战场景：
 False
```sql
 True-- 商品管理系统表结构（参考 Z10_302-comminfo_practice.sql）
 True-- employees_info - 员工信息表
 True-- sales_info - 销售信息表
 True-- sales_list - 销售明细表 
 True-- commodity_info - 商品信息表
 True-- customer_info - 客户信息表
 True```

 False**实战示例1：查询员工及其销售订单**
 False
```sql
 TrueSELECT 
 True e.Employees_id,
 True e.Employees_name,
 True s.Sales_id,
 True s.Sales_time,
 True s.Customer_id
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id;
 True```

 False**实战示例2：查询员工销售订单详情（含客户信息）**
 False
```sql
 TrueSELECT 
 True e.Employees_name,
 True s.Sales_id,
 True c.Customer_name,
 True c.Telephone,
 True s.Sales_time
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id
 TrueINNER JOIN customer_info c 
 True ON s.Customer_id = c.Customer_id;
 True```

 False**实战示例3：查询完整订单信息（五表联查）**
 False
```sql
 TrueSELECT 
 True e.Employees_name AS 员工姓名,
 True s.Sales_id AS 订单编号,
 True c.Customer_name AS 客户姓名,
 True m.Commodity_name AS 商品名称,
 True sl.Sales_price AS 销售单价,
 True sl.Sales_Number AS 销售数量,
 True sl.Sales_price * sl.Sales_Number AS 小计金额,
 True s.Sales_time AS 销售时间
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id
 TrueINNER JOIN customer_info c 
 True ON s.Customer_id = c.Customer_id
 TrueINNER JOIN sales_list sl 
 True ON s.Sales_id = sl.Sales_id
 TrueINNER JOIN commodity_info m 
 True ON sl.Commodity_id = m.Commodity_id
 TrueORDER BY s.Sales_time DESC;
 True```

 False**实战示例4：统计各销售员的销售业绩**
 False
```sql
 TrueSELECT 
 True e.Employees_name AS 销售员,
 True COUNT(DISTINCT s.Sales_id) AS 订单数,
 True SUM(sl.Sales_Number) AS 销售总量,
 True SUM(sl.Sales_price * sl.Sales_Number) AS 销售总业绩
 TrueFROM employees_info e
 TrueINNER JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id
 TrueINNER JOIN sales_list sl 
 True ON s.Sales_id = sl.Sales_id
 TrueGROUP BY e.Employees_id, e.Employees_name
 TrueORDER BY 销售总业绩 DESC;
 True```

 False**实战示例5：查询客户购买的商品明细**
 False
```sql
 TrueSELECT 
 True c.Customer_name AS 客户姓名,
 True m.Commodity_name AS 商品名称,
 True SUM(sl.Sales_Number) AS 购买数量,
 True SUM(sl.Sales_price * sl.Sales_Number) AS 消费金额
 TrueFROM customer_info c
 TrueINNER JOIN sales_info s 
 True ON c.Customer_id = s.Customer_id
 TrueINNER JOIN sales_list sl 
 True ON s.Sales_id = sl.Sales_id
 TrueINNER JOIN commodity_info m 
 True ON sl.Commodity_id = m.Commodity_id
 TrueGROUP BY c.Customer_id, c.Customer_name, m.Commodity_name
 TrueORDER BY c.Customer_name, 消费金额 DESC;
 True```

 False**实战示例6：自连接查询 - 查询同名员工**
 False
```sql
 TrueSELECT 
 True e1.Employees_name AS 姓名,
 True e1.Employees_id AS 员工ID1,
 True e2.Employees_id AS 员工ID2
 TrueFROM employees_info e1
 TrueINNER JOIN employees_info e2 
 True ON e1.Employees_name = e2.Employees_name
 TrueWHERE e1.Employees_id < e2.Employees_id;
 True```

 False**实战示例7：自连接查询 - 同城市供应商**
 False
```sql
 TrueSELECT 
 True s1.Supplier_name AS 供应商1,
 True s1.Address AS 城市,
 True s2.Supplier_name AS 同城市供应商
 TrueFROM supplier_info s1
 TrueINNER JOIN supplier_info s2 
 True ON s1.Address = s2.Address
 TrueWHERE s1.Supplier_id <> s2.Supplier_id
 TrueORDER BY s1.Address, s1.Supplier_name;
 True```

 False**外连接实战示例1：查询所有员工及他们的销售记录**
 False
```sql
 TrueSELECT 
 True e.Employees_name,
 True s.Sales_id,
 True s.Sales_time
 TrueFROM employees_info e
 TrueLEFT JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id;
 True```

 False**外连接实战示例2：统计每种商品的销量（包含未销售的商品）**
 False
```sql
 TrueSELECT 
 True c.Commodity_name,
 True IFNULL(SUM(sl.Sales_Number), 0) AS 销售数量
 TrueFROM commodity_info c
 TrueLEFT JOIN sales_list sl 
 True ON c.Commodity_id = sl.Commodity_id
 TrueGROUP BY c.Commodity_id, c.Commodity_name
 TrueORDER BY 销售数量 DESC;
 True```

 False**外连接实战示例3：查询采购信息（包含没有采购的商品）**
 False
```sql
 TrueSELECT 
 True c.Commodity_name,
 True pi.Purchase_id,
 True pi.Purchase_time,
 True pl.Purchase_Number,
 True pl.Purchase_price,
 True su.Supplier_name,
 True e.Employees_name
 TrueFROM commodity_info c
 TrueLEFT JOIN purchase_list pl 
 True ON c.Commodity_id = pl.Commodity_id
 TrueLEFT JOIN purchase_info pi 
 True ON pl.Purchase_id = pi.Purchase_id
 TrueLEFT JOIN supplier_info su 
 True ON pi.Supplier_id = su.Supplier_id
 TrueLEFT JOIN employees_info e 
 True ON pi.Employees_id = e.Employees_id;
 True```

 False**外连接实战示例4：查询有销售记录的员工**
 False
```sql
 TrueSELECT DISTINCT
 True e.Employees_name
 TrueFROM employees_info e
 TrueRIGHT JOIN sales_info s 
 True ON e.Employees_id = s.Employees_id
 TrueWHERE e.Employees_id IS NOT NULL;
 True```

 False### 1.4 其他连接类型
 False
 False#### 1.4.1 交叉连接 (CROSS JOIN)
 False
 False返回两个表的笛卡尔积：
 False
```sql
 True-- 交叉连接
 TrueSELECT * FROM table1 CROSS JOIN table2;
 True
 True-- 等价于
 TrueSELECT * FROM table1, table2;
 True
 True-- 示例：生成所有部门和所有员工的组合
 TrueSELECT d.dept_name, e.emp_name
 TrueFROM departments d
 TrueCROSS JOIN employees e;
 True```

 False#### 1.4.2 自然连接 (NATURAL JOIN)
 False
 False自动根据相同列名进行连接：
 False
```sql
 True-- 自然内连接
 TrueSELECT * FROM employees NATURAL JOIN departments;
 True
 True-- 自然左连接
 TrueSELECT * FROM employees NATURAL LEFT JOIN departments;
 True
 True-- 自然右连接
 TrueSELECT * FROM employees NATURAL RIGHT JOIN departments;
 True```

 False#### 1.4.3 USING 子句
 False
 False当两个表有相同列名时，可以使用 USING 简化连接：
 False
```sql
 True-- 使用 USING 简化连接
 TrueSELECT e.emp_name, d.dept_name
 TrueFROM employees e
 TrueJOIN departments d USING (dept_id);
 True```

 False### 1.5 连接优先级与括号
 False
```sql
 True-- 使用括号控制连接顺序
 TrueSELECT *
 TrueFROM employees e
 TrueLEFT JOIN (
 True departments d
 True JOIN projects p ON d.dept_id = p.dept_id
 True) ON e.dept_id = d.dept_id;
 True```

 False## 2. 分组统计 (Grouping)
 False
 False### 2.1 基本分组
 False
 False使用 `GROUP BY` 配合聚合函数进行分组统计：
 False
```sql
 True-- 按部门分组，计算每个部门的平均工资
 TrueSELECT dept_id, AVG(salary) as avg_salary
 TrueFROM employees
 TrueGROUP BY dept_id;
 True
 True-- 结果:
 True-- dept_id | avg_salary
 True-- 1 | 8500.00
 True-- 2 | 6500.00
 True-- 3 | 10000.00
 True```

 False### 2.2 HAVING 子句
 False
 False`HAVING` 用于对分组后的结果进行过滤，而 `WHERE` 是在分组前过滤：
 False
```sql
 True-- 查找平均工资大于 7000 的部门
 TrueSELECT dept_id, AVG(salary) as avg_salary
 TrueFROM employees
 TrueGROUP BY dept_id
 TrueHAVING AVG(salary) > 7000;
 True
 True-- 结果:
 True-- dept_id | avg_salary
 True-- 1 | 8500.00
 True-- 3 | 10000.00
 True```

 False### 2.3 多列分组
 False
```sql
 True-- 按部门和入职年份分组，计算平均工资
 TrueSELECT dept_id, YEAR(hire_date) as hire_year, AVG(salary) as avg_salary
 TrueFROM employees
 TrueGROUP BY dept_id, YEAR(hire_date);
 True```

 False### 2.4 常用聚合函数
 False
 False| 聚合函数 | 描述 | 示例 |
 False| ---------------- | ------ | --------------------------------------------------- |
 False| `COUNT()` | 计算行数 | `COUNT(*)`、`COUNT(column)`、`COUNT(DISTINCT column)` |
 False| `SUM()` | 计算数值总和 | `SUM(price)`、`SUM(quantity * price)` |
 False| `AVG()` | 计算平均值 | `AVG(salary)`、`AVG(DISTINCT price)` |
 False| `MAX()` | 计算最大值 | `MAX(price)`、`MAX(created_at)` |
 False| `MIN()` | 计算最小值 | `MIN(price)`、`MIN(created_at)` |
 False| `GROUP_CONCAT()` | 拼接字符串 | `GROUP_CONCAT(name SEPARATOR ',')` |
 False
```sql
 True-- 计算员工总数、总工资、平均工资、最高工资和最低工资
 TrueSELECT 
 True COUNT(*) as total_employees,
 True SUM(salary) as total_salary,
 True AVG(salary) as avg_salary,
 True MAX(salary) as max_salary,
 True MIN(salary) as min_salary
 TrueFROM employees;
 True```

 False### 2.5 ROLLUP 和 CUBE
 False
 False#### 2.5.1 ROLLUP
 False
 False生成小计和总计：
 False
```sql
 True-- 使用 ROLLUP 生成汇总
 TrueSELECT 
 True dept_id, 
 True YEAR(hire_date) as hire_year,
 True COUNT(*) as employee_count
 TrueFROM employees
 TrueGROUP BY dept_id, YEAR(hire_date) WITH ROLLUP;
 True
 True-- 结果:
 True-- dept_id | hire_year | employee_count
 True-- 1 | 2020 | 2
 True-- 1 | NULL | 2 -- 部门1总计
 True-- 2 | 2020 | 2
 True-- 2 | NULL | 2 -- 部门2总计
 True-- 3 | 2020 | 1
 True-- 3 | NULL | 1 -- 部门3总计
 True-- NULL | NULL | 5 -- 总计
 True```

 False#### 2.5.2 GROUPING SETS
 False
 False灵活指定分组组合：
 False
```sql
 True-- 使用 GROUPING SETS 指定多个分组维度
 TrueSELECT 
 True dept_id, 
 True YEAR(hire_date) as hire_year,
 True COUNT(*) as employee_count
 TrueFROM employees
 TrueGROUP BY GROUPING SETS (
 True (dept_id, YEAR(hire_date)), -- 部门+年份
 True (dept_id), -- 仅部门
 True () -- 总计
 True);
 True```

 False### 2.6 GROUP\_CONCAT 的高级用法
 False
```sql
 True-- 按部门分组，拼接员工姓名
 TrueSELECT 
 True dept_id,
 True GROUP_CONCAT(emp_name SEPARATOR ', ') as employees
 TrueFROM employees
 TrueGROUP BY dept_id;
 True
 True-- 结果:
 True-- dept_id | employees
 True-- 1 | 张三, 李四
 True-- 2 | 王五, 赵六
 True-- 3 | 钱七
 True
 True-- 排序后拼接
 TrueSELECT 
 True dept_id,
 True GROUP_CONCAT(emp_name ORDER BY salary DESC SEPARATOR ', ') as employees
 TrueFROM employees
 TrueGROUP BY dept_id;
 True```

 False## 3. 子查询 (Subqueries)
 False
 False### 3.1 标量子查询
 False
 False返回单一值的子查询：
 False
```sql
 True-- 查询工资高于平均工资的员工
 TrueSELECT emp_name, salary
 TrueFROM employees
 TrueWHERE salary > (SELECT AVG(salary) FROM employees);
 True
 True-- 结果:
 True-- emp_name | salary
 True-- 李四 | 9000.00
 True-- 钱七 | 10000.00
 True```

 False### 3.2 列子查询
 False
 False返回一列值的子查询，通常配合 `IN`, `ANY`, `ALL` 使用：
 False
```sql
 True-- 查询技术部和市场部的员工
 TrueSELECT emp_name, dept_id
 TrueFROM employees
 TrueWHERE dept_id IN (SELECT dept_id FROM departments WHERE dept_name IN ('技术部', '市场部'));
 True
 True-- 结果:
 True-- emp_name | dept_id
 True-- 张三 | 1
 True-- 李四 | 1
 True-- 王五 | 2
 True-- 赵六 | 2
 True```

 False### 3.3 行子查询
 False
 False返回一行多列的子查询：
 False
```sql
 True-- 查询与张三同部门同工资的员工
 TrueSELECT emp_name, dept_id, salary
 TrueFROM employees
 TrueWHERE (dept_id, salary) = (SELECT dept_id, salary FROM employees WHERE emp_name = '张三');
 True```

 False### 3.4 表子查询
 False
 False返回一个表的子查询，可以作为临时表使用：
 False
```sql
 True-- 查找每个部门工资最高的员工
 TrueSELECT e.emp_name, e.dept_id, e.salary
 TrueFROM employees e
 TrueJOIN (
 True SELECT dept_id, MAX(salary) as max_salary
 True FROM employees
 True GROUP BY dept_id
 True) t ON e.dept_id = t.dept_id AND e.salary = t.max_salary;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary
 True-- 李四 | 1 | 9000.00
 True-- 王五 | 2 | 7000.00
 True-- 钱七 | 3 | 10000.00
 True```

 False### 3.5 相关子查询
 False
 False子查询中使用了外部查询的列：
 False
```sql
 True-- 查询每个员工的工资在部门中的排名
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True (SELECT COUNT(*) + 1 
 True FROM employees e2 
 True WHERE e2.dept_id = e1.dept_id AND e2.salary > e1.salary) as rank
 TrueFROM employees e1
 TrueORDER BY dept_id, rank;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | rank
 True-- 李四 | 1 | 9000.00 | 1
 True-- 张三 | 1 | 8000.00 | 2
 True-- 王五 | 2 | 7000.00 | 1
 True-- 赵六 | 2 | 6000.00 | 2
 True-- 钱七 | 3 | 10000.00 | 1
 True```

 False### 3.6 EXISTS 子查询
 False
 False检查子查询是否返回任何行：
 False
```sql
 True-- 查询有员工的部门
 TrueSELECT dept_id, dept_name
 TrueFROM departments d
 TrueWHERE EXISTS (
 True SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id
 True);
 True
 True-- 查询没有员工的部门
 TrueSELECT dept_id, dept_name
 TrueFROM departments d
 TrueWHERE NOT EXISTS (
 True SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id
 True);
 True
 True-- 查询至少有一个员工工资超过8000的部门
 TrueSELECT dept_id, dept_name
 TrueFROM departments d
 TrueWHERE EXISTS (
 True SELECT 1 FROM employees e 
 True WHERE e.dept_id = d.dept_id AND e.salary > 8000
 True);
 True```

 False### 3.7 ANY/SOME 和 ALL
 False
```sql
 True-- 查询工资高于任何部门平均工资的员工
 TrueSELECT emp_name, salary
 TrueFROM employees
 TrueWHERE salary > ANY (
 True SELECT AVG(salary) FROM employees GROUP BY dept_id
 True);
 True
 True-- 查询工资高于所有部门平均工资的员工
 TrueSELECT emp_name, salary
 TrueFROM employees
 TrueWHERE salary > ALL (
 True SELECT AVG(salary) FROM employees GROUP BY dept_id
 True);
 True
 True-- ANY 和 SOME 是等价的
 TrueSELECT emp_name, salary
 TrueFROM employees
 TrueWHERE salary > SOME (
 True SELECT AVG(salary) FROM employees GROUP BY dept_id
 True);
 True```

 False### 3.8 子查询的性能考虑
 False
```sql
 True-- 高效：使用 JOIN 替代子查询
 TrueSELECT e.emp_name, e.salary
 TrueFROM employees e
 TrueJOIN (SELECT AVG(salary) as avg_sal FROM employees) t
 TrueWHERE e.salary > t.avg_sal;
 True
 True-- 低效：相关子查询（每一行都执行一次）
 TrueSELECT emp_name, salary
 TrueFROM employees e1
 TrueWHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id);
 True```

 False## 4. 窗口函数 (Window Functions - MySQL 8.0+)
 False
 False窗口函数允许在不分组的情况下进行聚合计算，为每行数据生成一个结果。
 False
 False### 4.1 基本语法
 False
```sql
 True<窗口函数> OVER (
 True [PARTITION BY <分区列>]
 True [ORDER BY <排序列>]
 True [ROWS/RANGE <窗口范围>]
 True)
 True```

 False### 4.2 常用窗口函数
 False
 False#### 4.2.1 排名函数
 False
 False| 函数 | 描述 | 相同值处理 | 示例结果（假设两行值相同） |
 False| -------------- | ---------- | --------------- | ------------- |
 False| `ROW_NUMBER()` | 为每行分配唯一的序号 | 即使值相同也分配不同序号 | 1, 2 |
 False| `RANK()` | 相同值会有相同的排名 | 相同值排名相同，后续排名跳过 | 1, 1, 3（跳过2） |
 False| `DENSE_RANK()` | 相同值会有相同的排名 | 相同值排名相同，后续排名不跳过 | 1, 1, 2 |
 False
 False**示例**:
 False
```sql
 True-- 按部门对员工工资进行排名
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) as row_num,
 True RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank,
 True DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as dense_rank
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | row_num | rank | dense_rank
 True-- 李四 | 1 | 9000.00 | 1 | 1 | 1
 True-- 张三 | 1 | 8000.00 | 2 | 2 | 2
 True-- 王五 | 2 | 7000.00 | 1 | 1 | 1
 True-- 赵六 | 2 | 6000.00 | 2 | 2 | 2
 True-- 钱七 | 3 | 10000.00 | 1 | 1 | 1
 True```

 False#### 4.2.2 聚合函数作为窗口函数
 False
```sql
 True-- 计算累计工资
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True SUM(salary) OVER (PARTITION BY dept_id ORDER BY salary) as cumulative_salary,
 True AVG(salary) OVER (PARTITION BY dept_id) as dept_avg_salary,
 True MAX(salary) OVER (PARTITION BY dept_id) as dept_max_salary
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | cumulative_salary | dept_avg_salary | dept_max_salary
 True-- 张三 | 1 | 8000.00 | 8000.00 | 8500.00 | 9000.00
 True-- 李四 | 1 | 9000.00 | 17000.00 | 8500.00 | 9000.00
 True-- 赵六 | 2 | 6000.00 | 6000.00 | 6500.00 | 7000.00
 True-- 王五 | 2 | 7000.00 | 13000.00 | 6500.00 | 7000.00
 True-- 钱七 | 3 | 10000.00 | 10000.00 | 10000.00 | 10000.00
 True```

 False#### 4.2.3 分析函数
 False
 False| 函数 | 描述 | 语法示例 | 说明 |
 False| --------------- | ----------- | ---------------------- | --------------- |
 False| `LAG()` | 获取前 N 行的值 | `LAG(salary, 1)` | 获取上一行的 salary 值 |
 False| `LEAD()` | 获取后 N 行的值 | `LEAD(salary, 2)` | 获取下两行的 salary 值 |
 False| `FIRST_VALUE()` | 获取窗口内的第一个值 | `FIRST_VALUE(salary)` | 获取分组内的第一个值 |
 False| `LAST_VALUE()` | 获取窗口内的最后一个值 | `LAST_VALUE(salary)` | 获取分组内的最后一个值 |
 False| `NTH_VALUE()` | 获取窗口内第 N 个值 | `NTH_VALUE(salary, 3)` | 获取分组内的第三个值 |
 False
 False**示例**:
 False
```sql
 True-- 计算员工工资与前一个员工的工资差异
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True LAG(salary, 1) OVER (PARTITION BY dept_id ORDER BY salary) as prev_salary,
 True salary - LAG(salary, 1) OVER (PARTITION BY dept_id ORDER BY salary) as salary_diff
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | prev_salary | salary_diff
 True-- 张三 | 1 | 8000.00 | NULL | NULL
 True-- 李四 | 1 | 9000.00 | 8000.00 | 1000.00
 True-- 赵六 | 2 | 6000.00 | NULL | NULL
 True-- 王五 | 2 | 7000.00 | 6000.00 | 1000.00
 True-- 钱七 | 3 | 10000.00 | NULL | NULL
 True```

 False### 4.3 窗口范围
 False
```sql
 True-- 使用 ROWS 定义窗口范围
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True SUM(salary) OVER (
 True PARTITION BY dept_id 
 True ORDER BY salary 
 True ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
 True ) as moving_sum
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | moving_sum
 True-- 张三 | 1 | 8000.00 | 17000.00 -- 8000 + 9000
 True-- 李四 | 1 | 9000.00 | 17000.00 -- 8000 + 9000
 True-- 赵六 | 2 | 6000.00 | 13000.00 -- 6000 + 7000
 True-- 王五 | 2 | 7000.00 | 13000.00 -- 6000 + 7000
 True-- 钱七 | 3 | 10000.00 | 10000.00 -- 只有自己
 True```

 False### 4.4 其他常用窗口函数
 False
 False#### 4.4.1 百分比排名函数
 False
```sql
 True-- PERCENT_RANK() - 计算百分比排名
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True PERCENT_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as percent_rank
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | percent_rank
 True-- 李四 | 1 | 9000.00 | 0.0
 True-- 张三 | 1 | 8000.00 | 1.0
 True-- 王五 | 2 | 7000.00 | 0.0
 True-- 赵六 | 2 | 6000.00 | 1.0
 True-- 钱七 | 3 | 10000.00 | 0.0
 True
 True-- CUME_DIST() - 计算累积分布
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True CUME_DIST() OVER (PARTITION BY dept_id ORDER BY salary) as cume_dist
 TrueFROM employees;
 True```

 False#### 4.4.2 NTILE 函数
 False
```sql
 True-- NTILE(n) - 将数据分成 n 个桶
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True NTILE(2) OVER (PARTITION BY dept_id ORDER BY salary DESC) as bucket
 TrueFROM employees;
 True
 True-- 结果:
 True-- emp_name | dept_id | salary | bucket
 True-- 李四 | 1 | 9000.00 | 1
 True-- 张三 | 1 | 8000.00 | 2
 True-- 王五 | 2 | 7000.00 | 1
 True-- 赵六 | 2 | 6000.00 | 2
 True-- 钱七 | 3 | 10000.00 | 1
 True```

 False#### 4.4.3 LAG 和 LEAD 的高级用法
 False
```sql
 True-- LAG/LEAD 指定默认值
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True LAG(salary, 1, 0) OVER (PARTITION BY dept_id ORDER BY salary) as prev_salary,
 True LEAD(salary, 1, 0) OVER (PARTITION BY dept_id ORDER BY salary) as next_salary
 TrueFROM employees;
 True
 True-- 计算环比增长率
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True ROUND((salary - LAG(salary) OVER (PARTITION BY dept_id ORDER BY salary)) 
 True / LAG(salary) OVER (PARTITION BY dept_id ORDER BY salary) * 100, 2) 
 True as growth_rate
 TrueFROM employees;
 True```

 False### 4.5 命名窗口
 False
```sql
 True-- 使用 WINDOW 子句定义可复用的窗口
 TrueSELECT 
 True emp_name, 
 True dept_id, 
 True salary,
 True ROW_NUMBER() OVER w as row_num,
 True RANK() OVER w as rank,
 True DENSE_RANK() OVER w as dense_rank,
 True AVG(salary) OVER (PARTITION BY dept_id) as dept_avg
 TrueFROM employees
 TrueWINDOW w AS (PARTITION BY dept_id ORDER BY salary DESC);
 True```

 False## 5. 实际应用示例
 False
 False### 5.1 复杂查询示例
 False
```sql
 True-- 查询每个部门工资最高的前两名员工
 TrueSELECT
 True emp_name,
 True dept_name,
 True salary,
 True rank
 TrueFROM (
 True SELECT
 True e.emp_name,
 True d.dept_name,
 True e.salary,
 True ROW_NUMBER() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) as rank
 True FROM employees e
 True JOIN departments d ON e.dept_id = d.dept_id
 True) t
 TrueWHERE rank <= 2;
 True
 True-- 结果:
 True-- emp_name | dept_name | salary | rank
 True-- 李四 | 技术部 | 9000.00 | 1
 True-- 张三 | 技术部 | 8000.00 | 2
 True-- 王五 | 市场部 | 7000.00 | 1
 True-- 赵六 | 市场部 | 6000.00 | 2
 True-- 钱七 | 财务部 | 10000.00 | 1
 True```

 False### 5.2 内连接实战 (商品管理系统)
 False
```sql
 True-- 查询员工姓名以及对应的岗位名称
 TrueSELECT employees_info.Employees_name, post_info.Post_name
 TrueFROM employees_info
 TrueJOIN post_info ON employees_info.Post_id = post_info.Post_id;
 True
 True-- 查询商品名称对应的销售数量
 TrueSELECT commodity_info.Commodity_name, SUM(sales_list.Sales_Number) AS 销售数量
 TrueFROM commodity_info
 TrueJOIN sales_list ON commodity_info.Commodity_id = sales_list.Commodity_id
 TrueGROUP BY commodity_info.Commodity_name;
 True
 True-- 内连接员工表和销售信息表
 TrueSELECT employees_info.*, sales_info.*
 TrueFROM employees_info
 TrueINNER JOIN sales_info ON employees_info.Employees_id = sales_info.Employees_id;
 True
 True-- 列出员工销售订单信息（员工编号、姓名、性别、订单编号、客户编号、销售时间）
 TrueSELECT employees_info.Employees_id, employees_info.Employees_name, employees_info.Employees_sex,
 True sales_info.Sales_id, sales_info.Customer_id, sales_info.Sales_time
 TrueFROM employees_info
 TrueINNER JOIN sales_info ON employees_info.Employees_id = sales_info.Employees_id;
 True
 True-- 列出员工'王小妮'的销售订单信息（多表连接）
 TrueSELECT employees_info.Employees_id, employees_info.Employees_name, employees_info.Employees_sex,
 True sales_info.Sales_id, sales_info.Customer_id, customer_info.Customer_name, sales_info.Sales_time
 TrueFROM employees_info
 TrueINNER JOIN sales_info ON employees_info.Employees_id = sales_info.Employees_id
 TrueINNER JOIN customer_info ON sales_info.Customer_id = customer_info.Customer_id
 TrueWHERE employees_info.Employees_name = '王小妮';
 True
 True-- 使用WHERE子句实现多表连接查询
 TrueSELECT employees_info.Employees_id, employees_info.Employees_name, employees_info.Employees_sex,
 True sales_info.Sales_id, sales_info.Customer_id, customer_info.Customer_name, sales_info.Sales_time
 TrueFROM employees_info, sales_info, customer_info
 TrueWHERE employees_info.Employees_id = sales_info.Employees_id
 True AND sales_info.Customer_id = customer_info.Customer_id
 True AND employees_info.Employees_name = '王小妮';
 True
 True-- 统计各销售员ID的销售业绩并按降序排列
 TrueSELECT employees_info.Employees_id, employees_info.Employees_name,
 True SUM(sales_list.Sales_price * sales_list.Sales_Number) AS 销售总业绩
 TrueFROM employees_info
 TrueINNER JOIN sales_info ON employees_info.Employees_id = sales_info.Employees_id
 TrueINNER JOIN sales_list ON sales_info.Sales_id = sales_list.Sales_id
 TrueGROUP BY employees_info.Employees_id, employees_info.Employees_name
 TrueORDER BY 销售总业绩 DESC;
 True
 True-- 查询客户购买的商品名称和购买数量
 TrueSELECT customer_info.Customer_name, commodity_info.Commodity_name,
 True SUM(sales_list.Sales_Number) AS 购买数量
 TrueFROM customer_info
 TrueINNER JOIN sales_info ON customer_info.Customer_id = sales_info.Customer_id
 TrueINNER JOIN sales_list ON sales_info.Sales_id = sales_list.Sales_id
 TrueINNER JOIN commodity_info ON sales_list.Commodity_id = commodity_info.Commodity_id
 TrueGROUP BY customer_info.Customer_name, commodity_info.Commodity_name;
 True
 True-- 完整订单信息查询（员工姓名、订单编号、客户名称、商品名称、销售时间、销售数量）
 TrueSELECT employees_info.Employees_name, sales_info.Sales_id, customer_info.Customer_name,
 True commodity_info.Commodity_name, sales_info.Sales_time, sales_list.Sales_Number
 TrueFROM employees_info
 TrueINNER JOIN sales_info ON employees_info.Employees_id = sales_info.Employees_id
 TrueINNER JOIN customer_info ON sales_info.Customer_id = customer_info.Customer_id
 TrueINNER JOIN sales_list ON sales_info.Sales_id = sales_list.Sales_id
 TrueINNER JOIN commodity_info ON sales_list.Commodity_id = commodity_info.Commodity_id;
 True
 True-- 自连接查询：查询与翔云公司在同一个城市的供应商信息
 TrueSELECT s1.Supplier_name, s1.Address, s2.Supplier_name AS 同城市供应商
 TrueFROM supplier_info s1
 TrueINNER JOIN supplier_info s2 ON s1.Address = s2.Address
 TrueWHERE s1.Supplier_name = '翔云公司' AND s1.Supplier_id <> s2.Supplier_id;
 True
 True-- 自连接查询：查询与王华员工姓名同名的员工信息
 TrueSELECT e1.Employees_name, e1.Employees_id, e2.Employees_id AS 同名员工ID
 TrueFROM employees_info e1
 TrueINNER JOIN employees_info e2 ON e1.Employees_name = e2.Employees_name
 TrueWHERE e1.Employees_name = '王华' AND e1.Employees_id <> e2.Employees_id;
 True```

 False### 5.3 外连接实战 (商品管理系统)
 False
```sql
 True-- 内连接（只返回匹配记录）
 TrueSELECT Employees_name, b.*
 TrueFROM employees_info a
 TrueJOIN sales_info b ON a.Employees_id = b.Employees_id;
 True
 True-- 左外连接（返回左表所有记录，右表无匹配补NULL）
 TrueSELECT Employees_name, b.*
 TrueFROM employees_info a
 TrueLEFT JOIN sales_info b ON a.Employees_id = b.Employees_id;
 True
 True-- 右外连接（返回右表所有记录，左表无匹配补NULL）
 TrueSELECT Employees_name, b.*
 TrueFROM sales_info b
 TrueRIGHT JOIN employees_info a ON a.Employees_id = b.Employees_id;
 True
 True-- 左外连接：统计每种商品的销量
 TrueSELECT Commodity_name, IFNULL(SUM(Sales_Number), 0) AS 销售数量
 TrueFROM commodity_info a
 TrueLEFT JOIN sales_list b ON a.Commodity_id = b.Commodity_id
 TrueGROUP BY Commodity_name;
 True
 True-- 左外连接：查询采购信息，包含没有采购的商品名称
 TrueSELECT Commodity_name, Purchase_id, Purchase_time, Purchase_Number, Purchase_price,
 True supplier_info.Supplier_name, employees_info.Employees_name
 TrueFROM commodity_info a
 TrueLEFT JOIN purchase_list b ON a.Commodity_id = b.Commodity_id
 TrueLEFT JOIN purchase_info c ON b.Purchase_id = c.Purchase_id
 TrueLEFT JOIN supplier_info ON c.Supplier_id = supplier_info.Supplier_id
 TrueLEFT JOIN employees_info ON c.Employees_id = employees_info.Employees_id;
 True```

 False### 5.4 性能优化建议
 False
 False1. **使用索引**: 确保联查的连接列和 WHERE 子句中的列有索引
 False2. **合理使用子查询**: 避免过于复杂的子查询，考虑使用 JOIN 替代
 False3. **限制返回数据**: 使用 LIMIT 限制返回行数
 False4. **避免 SELECT ***: 只选择需要的列
 False5. **使用 EXPLAIN**: 分析查询执行计划，找出性能瓶颈
 False
 False### 5.5 复杂报表查询示例
 False
```sql
 True-- 月度销售报表（按部门分组）
 TrueSELECT 
 True DATE_FORMAT(s.sales_time, '%Y-%m') as month,
 True d.dept_name,
 True COUNT(DISTINCT s.sales_id) as order_count,
 True SUM(sl.sales_price * sl.sales_number) as total_amount,
 True AVG(sl.sales_price * sl.sales_number) as avg_order_amount,
 True MAX(sl.sales_price * sl.sales_number) as max_order_amount
 TrueFROM sales_info s
 TrueJOIN sales_list sl ON s.sales_id = sl.sales_id
 TrueJOIN employees_info e ON s.employees_id = e.employees_id
 TrueJOIN departments d ON e.dept_id = d.dept_id
 TrueGROUP BY month, d.dept_name
 TrueORDER BY month DESC, total_amount DESC;
 True
 True-- 客户购买分析（前10大客户）
 TrueSELECT 
 True c.customer_name,
 True COUNT(DISTINCT s.sales_id) as order_count,
 True SUM(sl.sales_number) as total_quantity,
 True SUM(sl.sales_price * sl.sales_number) as total_spent,
 True ROUND(SUM(sl.sales_price * sl.sales_number) / (SELECT SUM(sl2.sales_price * sl2.sales_number) FROM sales_list sl2) * 100, 2) as percentage
 TrueFROM customer_info c
 TrueJOIN sales_info s ON c.customer_id = s.customer_id
 TrueJOIN sales_list sl ON s.sales_id = sl.sales_id
 TrueGROUP BY c.customer_id, c.customer_name
 TrueORDER BY total_spent DESC
 TrueLIMIT 10;
 True
 True-- 商品销售趋势分析
 TrueSELECT 
 True DATE_FORMAT(s.sales_time, '%Y-%m-%d') as date,
 True ci.commodity_name,
 True SUM(sl.sales_number) as daily_sales,
 True SUM(sl.sales_price * sl.sales_number) as daily_revenue,
 True LAG(SUM(sl.sales_number)) OVER (PARTITION BY ci.commodity_id ORDER BY DATE_FORMAT(s.sales_time, '%Y-%m-%d')) as prev_day_sales,
 True ROUND((SUM(sl.sales_number) - LAG(SUM(sl.sales_number)) OVER (PARTITION BY ci.commodity_id ORDER BY DATE_FORMAT(s.sales_time, '%Y-%m-%d'))) 
 True / LAG(SUM(sl.sales_number)) OVER (PARTITION BY ci.commodity_id ORDER BY DATE_FORMAT(s.sales_time, '%Y-%m-%d')) * 100, 2) as growth_rate
 TrueFROM sales_info s
 TrueJOIN sales_list sl ON s.sales_id = sl.sales_id
 TrueJOIN commodity_info ci ON sl.commodity_id = ci.commodity_id
 TrueWHERE s.sales_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
 TrueGROUP BY date, ci.commodity_id, ci.commodity_name
 TrueORDER BY date, ci.commodity_name;
 True```

 False### 5.6 使用 CTE (Common Table Expressions)
 False
```sql
 True-- 使用 CTE 简化复杂查询
 TrueWITH monthly_sales AS (
 True SELECT 
 True DATE_FORMAT(sales_time, '%Y-%m') as month,
 True SUM(sales_price * sales_number) as total_sales
 True FROM sales_info s
 True JOIN sales_list sl ON s.sales_id = sl.sales_id
 True GROUP BY month
 True),
 Truemonthly_growth AS (
 True SELECT 
 True month,
 True total_sales,
 True LAG(total_sales) OVER (ORDER BY month) as prev_month_sales,
 True ROUND((total_sales - LAG(total_sales) OVER (ORDER BY month)) 
 True / LAG(total_sales) OVER (ORDER BY month) * 100, 2) as growth_rate
 True FROM monthly_sales
 True)
 TrueSELECT * FROM monthly_growth ORDER BY month DESC;
 True
 True-- 递归 CTE 示例（查询部门层级）
 TrueWITH RECURSIVE dept_hierarchy AS (
 True SELECT 
 True dept_id, 
 True dept_name, 
 True parent_dept_id, 
 True 1 as level
 True FROM departments
 True WHERE parent_dept_id IS NULL
 True UNION ALL
 True SELECT 
 True d.dept_id, 
 True d.dept_name, 
 True d.parent_dept_id, 
 True dh.level + 1 as level
 True FROM departments d
 True JOIN dept_hierarchy dh ON d.parent_dept_id = dh.dept_id
 True)
 TrueSELECT * FROM dept_hierarchy ORDER BY level, dept_id;
 True```

 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-05: 深入细化多表联查与窗口函数。
 False- 2026-04-05: 扩写内容，增加详细的联查示例、子查询用法和窗口函数示例。
 False- 2026-04-30: 补充交叉连接、自然连接、USING子句、ROLLUP、GROUPING SETS、EXISTS子查询、ANY/SOME/ALL、命名窗口、CTE等高级特性。
 False