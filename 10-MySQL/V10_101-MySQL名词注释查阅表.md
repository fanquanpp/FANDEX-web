# MySQL-专有名词注释查阅表 | MySQL

> @Author: fanquanpp
> @Category: MySQL Basics
> @Description: MySQL-专有名词注释查阅表 | MySQL
> @Updated: 2026-05-03

---

## 目录

1. [基础概念类](#基础概念类)
2. [数据类型类](#数据类型类)
3. [DDL 与约束类](#ddl-与约束类)
4. [查询与操作类](#查询与操作类)
5. [进阶查询类](#进阶查询类)
6. [索引与优化类](#索引与优化类)
7. [事务与锁类](#事务与锁类)
8. [存储引擎类](#存储引擎类)
9. [数据库设计类](#数据库设计类)
10. [其他重要概念类](#其他重要概念类)

---

## 1. 基础概念类

### 1.1 MySQL

**名称**：MySQL 数据库（MySQL）

**首次出现位置**：C10_101-概述与环境.md 第1章

**定义**：
MySQL 是 Oracle 公司的开源关系型数据库管理系统，使用 SQL 语言进行数据管理，是最流行的开源数据库之一。

**详解**：
特点：开源免费、性能高效、可靠性高、易于使用。版本：MySQL 5.7（稳定）、MySQL 8.0（当前主流）。衍生版本：MariaDB（MySQL 创始人分支）、Percona Server。存储引擎：InnoDB（默认，支持事务）、MyISAM（早期默认，不支持事务）。应用场景：Web 应用（ LAMP 架构）、电商系统、内容管理系统。

---

### 1.2 数据库（Database）

**名称**：数据库（Database）

**首次出现位置**：C10_101-概述与环境.md 第2章

**定义**：
数据库是组织成表的结构化数据集合，表由行和列组成，是关系型数据库的核心概念。

**详解**：
结构：Database → Table → Row/Column。Schema：有时指数据库，有时指数据库内部结构。与实例：MySQL 实例可包含多个数据库。文件存储：每个数据库对应 data 目录下以数据库名命名的目录。

---

### 1.3 表（Table）

**名称**：数据表（Table）

**首次出现位置**：C10_101-概述与环境.md 第2章

**定义**：
表是关系型数据库的基本存储结构，由行（记录）和列（字段）组成，每个表有唯一的表名。

**详解**：
行（Row）：表示一条记录，所有记录结构相同。列（Column）：表示一个字段，所有记录该字段类型一致。主键：唯一标识每行的列或列组合。存储位置：对应数据库目录下的 .frm（表定义）和 .ibd（InnoDB 数据）。最大行数：InnoDB 支持约 20 亿行。

---

### 1.4 SQL（结构化查询语言）

**名称**：结构化查询语言（Structured Query Language）

**缩写**：SQL

**首次出现位置**：C10_101-概述与环境.md 第3章

**定义**：
SQL 是用于管理关系型数据库的标准编程语言，包括数据查询、数据操作、数据定义、数据控制等功能。

**详解**：
DDL：数据定义语言（CREATE、ALTER、DROP）。DML：数据操作语言（SELECT、INSERT、UPDATE、DELETE）。DCL：数据控制语言（GRANT、REVOKE）。TCL：事务控制语言（COMMIT、ROLLBACK）。标准化：ANSI SQL 是标准，但各数据库有方言差异。

---

### 1.5 客户端/服务器

**名称**：客户端/服务器架构（Client/Server）

**首次出现位置**：C10_101-概述与环境.md 第4章

**定义**：
MySQL 采用客户端/服务器架构，数据库服务器运行在远程或本地，客户端通过 SQL 与服务器通信。

**详解**：
服务器：mysqld 是 MySQL 服务器程序。客户端：mysql命令行、MySQL Workbench、Navicat。连接方式：TCP/IP、Socket、命名管道。默认端口：3306。连接参数：主机名、端口、用户名、密码、数据库名。

---

## 2. 数据类型类

### 2.1 整数类型

**名称**：整数类型（Integer Types）

**首次出现位置**：C10_105-数据类型与约束.md 第1章

**定义**：
MySQL 整数类型包括 TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT，存储不同范围的整数值。

**详解**：
TINYINT：1字节，-128~127 或 0~255（UNSIGNED）。SMALLINT：2字节，约 -3万~3万。MEDIUMINT：3字节，约 -800万~800万。INT：4字节，约 -21亿~21亿（常用）。BIGINT：8字节，超大整数范围。ZEROFILL：前导零填充显示。UNSIGNED：无符号，只能存非负数。

---

### 2.2 浮点类型

**名称**：浮点类型（Floating-Point Types）

**首次出现位置**：C10_105-数据类型与约束.md 第1章

**定义**：
MySQL 浮点类型包括 FLOAT（单精度）和 DOUBLE（双精度），用于存储小数数值。

**详解**：
FLOAT：4字节，单精度浮点。DOUBLE：8字节，双精度浮点（更精确，常用）。DECIMAL：定点数，精确存储货币等。语法：`DECIMAL(M,D)`，M 总位数，D 小数位数。精度问题：FLOAT/DOUBLE 可能丢失精度，货币计算应用 DECIMAL。

---

### 2.3 字符串类型

**名称**：字符串类型（String Types）

**首次出现位置**：C10_105-数据类型与约束.md 第2章

**定义**：
MySQL 字符串类型包括 CHAR（固定长度）和 VARCHAR（可变长度），以及 TEXT 系列用于长文本。

**详解**：
CHAR：固定长度 0-255 字符，不足部分用空格填充。VARCHAR：可变长度 0-65535 字节。TINYTEXT/TEXT/MEDIUMTEXT/LONGTEXT：4种文本类型，存储大段文本。排序规则：字符串比较受字符集和排序规则影响。VARCHAR 性能：InnoDB 行内存储，超长可能行外存储。

---

### 2.4 日期时间类型

**名称**：日期时间类型（Date and Time Types）

**首次出现位置**：C10_105-数据类型与约束.md 第3章

**定义**：
MySQL 日期时间类型包括 DATE、TIME、DATETIME、TIMESTAMP、YEAR，用于存储日期和时间信息。

**详解**：
DATE：日期 'YYYY-MM-DD'，范围 1000-01-01 ~ 9999-12-31。TIME：时间 'HH:MM:SS'，可表示时间间隔。DATETIME：日期时间 'YYYY-MM-DD HH:MM:SS'，8字节。TIMESTAMP：时间戳，4字节，自动更新，范围 1970-2038。YEAR：年份，1字节，存储 1901-2155。TIMESTAMP vs DATETIME：TIMESTAMP 自动处理时区，DATETIME 不变。

---

### 2.5 ENUM 和 SET

**名称**：枚举 / 集合类型（ENUM / SET）

**首次出现位置**：C10_105-数据类型与约束.md 第3章

**定义**：
ENUM 是枚举类型，从预定义列表中选择一个值；SET 是集合类型，从预定义列表中选择多个值。

**详解**：
ENUM：单选，如 `ENUM('男','女')`。优势：存储紧凑、可读性好。SET：多选，如 `SET('足球','篮球','排球')`。存储：位图存储，空间效率高。应用：状态、类别、标签等有限集合。

---

### 2.6 NULL

**名称**：空值（NULL）

**首次出现位置**：C10_105-数据类型与约束.md 第4章

**定义**：
NULL 表示数据缺失或未知，不同于空字符串或零，是 SQL 中的特殊值。

**详解**：
IS NULL：`WHERE col IS NULL` 检测空值。IS NOT NULL：检测非空。NULL vs ''：空字符串是有值，NULL 表示未知。NULL 运算：NULL + 1 = NULL。聚合函数：COUNT(col) 忽略 NULL，COUNT(*) 计所有行。索引：MySQL 5.7+ 支持在索引列存储 NULL。

---

## 3. DDL 与约束类

### 3.1 主键（Primary Key）

**名称**：主键（Primary Key）

**首次出现位置**：C10_105-数据类型与约束.md 第5章

**定义**：
主键是表中唯一标识每行记录的一列或列组合，值必须唯一且非 NULL。

**详解**：
唯一性：主键值在表中不能重复。非空：主键不能为 NULL。自动索引：主键自动创建唯一索引。建议：一个表最好有主键。复合主键：多列组合作为主键。命名规范：常用 `pk_表名` 或 `id`。代理键：使用自增 ID 作为主键优于自然主键。

---

### 3.2 外键（Foreign Key）

**名称**：外键（Foreign Key）

**首次出现位置**：C10_105-数据类型与约束.md 第5章

**定义**：
外键是列或列组合，其值引用另一表的主键，用于建立表之间的关联关系。

**详解**：
语法：`FOREIGN KEY (col) REFERENCES other_table(pk_col)`。作用：维护引用完整性、级联更新/删除。存储引擎限制：仅 InnoDB 支持外键。命名规范：常用 `fk_本表_引用表` 或 `fk_引用表_本表`。NULL 值：外键列可为 NULL（表示无关联）。性能考量：外键增加维护开销，高并发场景可考虑应用层处理。

---

### 3.3 唯一约束（Unique Constraint）

**名称**：唯一约束（Unique Constraint）

**首次出现位置**：C10_105-数据类型与约束.md 第5章

**定义**：
唯一约束确保列或列组合的值在表中唯一，允许 NULL（但只有一行可为 NULL）。

**详解**：
与主键区别：主键唯一且非 NULL，唯一约束可有多行 NULL。与索引：唯一约束自动创建唯一索引。复合唯一：`UNIQUE(col1, col2)` 多列组合唯一。命名规范：常用 `uq_表名_列名`。性能：唯一约束查询可利用索引加速。

---

### 3.4 CHECK 约束

**名称**：检查约束（CHECK Constraint）

**首次出现位置**：C10_105-数据类型与约束.md 第5章

**定义**：
CHECK 约束限制列的值必须满足指定条件，不满足则插入/更新被拒绝。

**详解**：
语法：`CHECK (condition)`。条件示例：`CHECK (age >= 0 AND age <= 150)`。MySQL 5.7：语法检查但被忽略（不强制）。MySQL 8.0.16+：正确强制执行 CHECK 约束。应用：数据有效性验证，如年龄范围、状态值。替代方案：触发器、应用层验证。

---

### 3.5 DEFAULT

**名称**：默认值（DEFAULT）

**首次出现位置**：C10_105-数据类型与约束.md 第5章

**定义**：
DEFAULT 约束为列指定默认值，当插入新行时未指定该列则使用默认值。

**详解**：
语法：`column_name type DEFAULT default_value`。函数值：`DEFAULT CURRENT_TIMESTAMP`。表达式：MySQL 8.0.13+ 支持表达式作为默认值。覆盖：显式指定 NULL 或其他值覆盖默认值。视图：DEFAULT 不适用于视图。

---

### 3.6 索引（Index）

**名称**：索引（Index）

**首次出现位置**：C10_106-索引与执行计划.md 第1章

**定义**：
索引是数据结构，帮助 MySQL 高效查询数据，类似书籍目录，提高 SELECT 查询速度。

**详解**：
B+Tree 索引：InnoDB 默认索引类型。哈希索引：MEMORY 存储引擎支持。全文索引：用于文本搜索。复合索引：多列索引，遵循最左前缀原则。索引代价：占用磁盘空间、降低 INSERT/UPDATE/DELETE 速度。设计原则：选择区分度高的列建索引。

---

## 4. 查询与操作类

### 4.1 SELECT

**名称**：查询语句（SELECT）

**首次出现位置**：C10_102-SQL基础语法.md 第1章

**定义**：
SELECT 是 SQL 中最常用的语句，用于从一个或多个表中查询数据。

**详解**：
基本语法：`SELECT column FROM table WHERE condition`。别名：`SELECT col AS alias`。去重：`SELECT DISTINCT col`。全列：`SELECT *`。计算字段：`SELECT price * quantity AS total`。子查询：SELECT 内嵌套子查询。

---

### 4.2 WHERE

**名称**：条件筛选（WHERE）

**首次出现位置**：C10_102-SQL基础语法.md 第2章

**定义**：
WHERE 子句用于筛选满足条件的记录，是 SELECT、UPDATE、DELETE 的可选子句。

**详解**：
比较运算符：`=`、`>`、`<`、`>=`、`<=`、`<>` 或 `!=`。逻辑运算符：AND、OR、NOT。IN：`WHERE col IN (value1, value2)`。BETWEEN：`WHERE col BETWEEN low AND high`。LIKE：`WHERE name LIKE '%关键词%'`。NULL 条件：`IS NULL`、`IS NOT NULL`。

---

### 4.3 JOIN

**名称**：连接（JOIN）

**首次出现位置**：C10_103-进阶查询与联查.md 第1章

**定义**：
JOIN 用于将两个或多个表的行组合在一起，基于相关列进行匹配。

**详解**：
INNER JOIN：只返回两表匹配的记录。LEFT JOIN：返回左表所有记录，右表无匹配用 NULL。RIGHT JOIN：返回右表所有记录，左表无匹配用 NULL。FULL OUTER JOIN：返回两表所有记录，无匹配用 NULL。CROSS JOIN：笛卡尔积，无 ON 条件。 USING：连接列名相同时使用 `USING(col)`。

---

### 4.4 GROUP BY

**名称**：分组（GROUP BY）

**首次出现位置**：C10_103-进阶查询与联查.md 第2章

**定义**：
GROUP BY 将结果集按一个或多个列分组，常与聚合函数一起使用。

**详解**：
语法：`GROUP BY col1, col2`。聚合函数：COUNT、SUM、AVG、MAX、MIN。HAVING：筛选分组后的结果（WHERE 筛选行，HAVING 筛选分组）。执行顺序：WHERE → GROUP BY → HAVING → SELECT。MySQL 扩展：`GROUP BY col WITH ROLLUP` 生成汇总行。

---

### 4.5 ORDER BY

**名称**：排序（ORDER BY）

**首次出现位置**：C10_102-SQL基础语法.md 第3章

**定义**：
ORDER BY 对查询结果排序，可指定升序（ASC）或降序（DESC）。

**详解**：
语法：`ORDER BY col1 ASC, col2 DESC`。默认排序：未指定时默认 ASC（升序）。多列排序：逗号分隔，先按第一列，相同则按第二列。NULL 排序：NULL 值被视为最小或最大（取决于排序规则）。性能：ORDER BY 需要排序，大数据量可建索引优化。

---

### 4.6 LIMIT

**名称**：限制返回行数（LIMIT）

**首次出现位置**：C10_102-SQL基础语法.md 第3章

**定义**：
LIMIT 限制查询返回的行数，常用于分页查询。

**详解**：
基本语法：`LIMIT count` 或 `LIMIT offset, count`。分页：`LIMIT 0, 10` 第一页，`LIMIT 10, 10` 第二页。MySQL 8.0 新语法：`LIMIT count OFFSET offset`。性能：大偏移量时性能下降，可优化为基于主键的范围查询。

---

### 4.7 INSERT

**名称**：插入语句（INSERT）

**首次出现位置**：C10_102-SQL基础语法.md 第4章

**定义**：
INSERT 向表中插入新行数据。

**详解**：
指定列：`INSERT INTO table (col1, col2) VALUES (val1, val2)`。全列：`INSERT INTO table VALUES (val1, val2, ...)`。批量插入：`INSERT INTO table VALUES (...), (...), (...)`。ON DUPLICATE KEY UPDATE：插入冲突时更新。REPLACE：插入冲突时替换。INSERT SELECT：从另一查询结果插入。

---

### 4.8 UPDATE

**名称**：更新语句（UPDATE）

**首次出现位置**：C10_102-SQL基础语法.md 第4章

**定义**：
UPDATE 修改表中已存在的记录。

**详解**：
语法：`UPDATE table SET col1=val1, col2=val2 WHERE condition`。无 WHERE：更新所有行（谨慎！）。多列：`SET col1=val1, col2=val2`。ORDER BY + LIMIT：可结合使用限制更新行数。事务：UPDATE 可回滚。

---

### 4.9 DELETE

**名称**：删除语句（DELETE）

**首次出现位置**：C10_102-SQL基础语法.md 第4章

**定义**：
DELETE 从表中删除记录。

**详解**：
语法：`DELETE FROM table WHERE condition`。无 WHERE：删除所有行（TRUNCATE 更快）。TRUNCATE：删除所有行，重置自增列，不可回滚。ORDER BY + LIMIT：可结合使用限制删除行数。删除顺序：从右向左，从后往前删除。级联删除：外键约束可设置 ON DELETE CASCADE。

---

## 5. 进阶查询类

### 5.1 子查询

**名称**：子查询（Subquery）

**首次出现位置**：C10_103-进阶查询与联查.md 第3章

**定义**：
子查询是嵌套在另一个查询内部的查询，返回的结果供外层查询使用。

**详解**：
标量子查询：返回单个值。列子查询：返回一列值。行子查询：返回一行。表子查询：返回表。EXISTS：`WHERE EXISTS (子查询)`。IN：`WHERE col IN (子查询)`。关联子查询：子查询引用外层表的列。

---

### 5.2 UNION

**名称**：联合查询（UNION）

**首次出现位置**：C10_103-进阶查询与联查.md 第4章

**定义**：
UNION 合并两个或多个 SELECT 结果集，自动去重；UNION ALL 不去重。

**详解**：
UNION：`SELECT ... UNION SELECT ...` 去重合并。UNION ALL：保留所有行（包括重复）。列数一致：各 SELECT 列数必须相同。列类型：对应位置列类型兼容。排序：最后加 ORDER BY 统一排序。应用：合并同类数据、跨表查询结果整合。

---

### 5.3 视图（View）

**名称**：视图（View）

**首次出现位置**：C10_103-进阶查询与联查.md 第4章

**定义**：
视图是基于 SQL 查询结果的虚拟表，不存储数据，查询时实时生成结果。

**详解**：
创建：`CREATE VIEW view_name AS query`。查询：`SELECT * FROM view_name`。更新限制：包含聚合函数、GROUP BY、DISTINCT、UNION 的视图通常不可更新。优点：简化复杂查询、保护敏感数据、重用 SQL 逻辑。物化视图：MySQL 不支持，Oracle 支持。

---

### 5.4 聚合函数

**名称**：聚合函数（Aggregate Functions）

**首次出现位置**：C10_103-进阶查询与联查.md 第2章

**定义**：
聚合函数对一组值计算返回单个值，常与 GROUP BY 一起使用。

**详解**：
COUNT：计数（COUNT(*) vs COUNT(col)）。SUM：求和。AVG：平均值。MAX：最大值。MIN：最小值。GROUP_CONCAT：连接字符串。其他：VAR_POP/VAR_SAMP（方差）、STD/POP/STDDEV_SAMP（标准差）。

---

### 5.5 条件表达式

**名称**：条件表达式（Conditional Expressions）

**首次出现位置**：C10_103-进阶查询与联查.md 第2章

**定义**：
条件表达式根据条件返回不同值，包括 IF、IFNULL、NULLIF、CASE。

**详解**：
IF：`IF(condition, value_if_true, value_if_false)`。IFNULL：`IFNULL(expr, default)` 返回替代值。NULLIF：`NULLIF(expr1, expr2)` 两值相同返回 NULL。CASE：`CASE WHEN condition THEN result ... END`。DECODE：Oracle 风格，MySQL 使用 CASE。

---

## 6. 索引与优化类

### 6.1 B+Tree

**名称**：B+树索引（B+Tree）

**首次出现位置**：C10_106-索引与执行计划.md 第1章

**定义**：
B+Tree 是 MySQL InnoDB 存储引擎默认的索引数据结构，是平衡多路查找树。

**详解**：
结构：叶子节点存储数据/指向数据，非叶子节点只存储键。优势：范围查询高效、树高稳定（3-4层可索引千万级数据）。主键索引：聚簇索引，数据与索引一起存储。二级索引：非聚簇索引，叶子节点存储主键值。磁盘预读：利用顺序访问特性提高性能。

---

### 6.2 执行计划（EXPLAIN）

**名称**：执行计划分析（EXPLAIN）

**首次出现位置**：C10_106-索引与执行计划.md 第2章

**定义**：
EXPLAIN 显示 MySQL 如何执行查询，帮助分析查询性能问题。

**详解**：
用法：`EXPLAIN SELECT ...` 或 `EXPLAIN ANALYZE SELECT ...`（MySQL 8.0+）。关键列：type（连接类型）、key（使用索引）、rows（扫描行数）、Extra（额外信息）。type 级别：system > const > eq_ref > ref > range > index > ALL。Extra 优化提示：Using index、Using filesort、Using temporary。

---

### 6.3 最左前缀原则

**名称**：最左前缀原则（Leftmost Prefix Rule）

**首次出现位置**：C10_106-索引与执行计划.md 第1章

**定义**：
复合索引的使用必须从最左列开始且不跳过中间列，才能有效利用索引。

**详解**：
索引 `INDEX idx(col1, col2, col3)`。可用索引查询：`col1`、`col1+col2`、`col1+col2+col3`。不可用：`col2`、`col3`、`col2+col3`。范围查询后：col3 无法使用索引。LIKE 前缀匹配：`col1 LIKE '前缀%'` 可用索引。优化建议：将区分度高的列放左边。

---

### 6.4 覆盖索引

**名称**：覆盖索引（Covering Index）

**首次出现位置**：C10_106-索引与执行计划.md 第2章

**定义**：
覆盖索引指查询所需的所有列都包含在索引中，无需回表查询数据行。

**详解**：
Extra 显示：`Using index`。实现：将被查询的列都包含在复合索引中。优势：减少数据访问、提升查询性能。适用场景：只查询索引列的统计、列表查询。设计：在高频查询列上建覆盖索引。

---

### 6.5 慢查询日志

**名称**：慢查询日志（Slow Query Log）

**首次出现位置**：G10_201-索引与优化.md 第2章

**定义**：
慢查询日志记录执行时间超过阈值的 SQL 语句，用于分析和优化性能问题。

**详解**：
开启：`slow_query_log=1`。阈值：`long_query_time=2`（秒）。日志位置：`slow_query_log_file`。无索引查询：`log_queries_not_using_indexes`。分析工具：mysqldumpslow、pt-query-digest。pt-query-digest：Percona Toolkit 工具，分析最慢查询。

---

## 7. 事务与锁类

### 7.1 事务（Transaction）

**名称**：事务（Transaction）

**首次出现位置**：G10_202-事务与锁.md 第1章

**定义**：
事务是数据库操作的逻辑单元，具有 ACID 特性，保证数据操作的完整性和一致性。

**详解**：
ACID 特性：Atomicity（原子性）、Consistency（一致性）、Isolation（隔离性）、Durability（持久性）。基本操作：BEGIN/START TRANSACTION、COMMIT、ROLLBACK。保存点：`SAVEPOINT name`、`ROLLBACK TO SAVEPOINT name`。自动提交：MySQL 默认 autocommit=1，每条语句自动提交。事务日志：InnoDB 使用 redo log 和 undo log。

---

### 7.2 ACID

**名称**：事务特性（ACID）

**首次出现位置**：G10_202-事务与锁.md 第1章

**定义**：
ACID 是事务的四个基本特性：原子性、一致性、隔离性、持久性，是可靠数据库系统的基础。

**详解**：
Atomicity（原子性）：事务是最小执行单元，要么全部成功，要么全部失败回滚。Consistency（一致性）：事务执行前后数据库状态保持一致。Isolation（隔离性）：并发事务相互隔离，不互相干扰。Durability（持久性）：事务提交后其结果永久保存。

---

### 7.3 隔离级别

**名称**：隔离级别（Isolation Level）

**首次出现位置**：G10_202-事务与锁.md 第2章

**定义**：
隔离级别定义并发事务之间的隔离程度，MySQL 支持四种隔离级别。

**详解**：
READ UNCOMMITTED：最低级别，脏读（允许读取未提交数据）。READ COMMITTED：只能读取已提交数据，可能不可重复读。REPEATABLE READ：MySQL InnoDB 默认，可重复读，可能幻读（InnoDB 通过 MVCC + Next-Key Lock 解决）。SERIALIZABLE：最高级别，完全串行执行，性能最低。设置：`SET TRANSACTION ISOLATION LEVEL`。

---

### 7.4 锁（Lock）

**名称**：锁（Lock）

**首次出现位置**：G10_202-事务与锁.md 第3章

**定义**：
锁是 MySQL 用于控制并发事务对数据的访问机制，保证数据在并发环境下一致性和隔离性。

**详解**：
共享锁（S）：允许读，阻止写。排他锁（X）：阻止读和写。意向锁：表级锁，表示即将对某行加锁。行锁：InnoDB 行级锁，锁定数据行。表锁：MyISAM 表级锁，并发性能低。死锁：两个或多个事务相互等待对方持有的锁。

---

### 7.5 MVCC

**名称**：多版本并发控制（Multi-Version Concurrency Control）

**缩写**：MVCC

**首次出现位置**：G10_202-事务与锁.md 第2章

**定义**：
MVCC 是 InnoDB 实现的并发控制机制，通过保存数据的多个版本，使读操作不加锁，提高并发性能。

**详解**：
实现：通过 undo log 实现多版本。ReadView：事务快照，读取可见版本。Read Committed：每次 SELECT 生成新 ReadView。Repeatable Read：事务开始时生成 ReadView，一直使用。隐藏列：InnoDB 每行有 DB_TRX_ID（最后修改事务ID）、DB_ROLL_PTR（回滚指针）、DB_ROW_ID（新增行ID）。好处：大部分读操作不加锁，提高并发。

---

### 7.6 死锁（Deadlock）

**名称**：死锁（Deadlock）

**首次出现位置**：G10_202-事务与锁.md 第4章

**定义**：
死锁是两个或多个事务相互等待对方持有的锁，导致所有事务都无法继续执行。

**详解**：
检测：InnoDB 自动检测死锁。处理：回滚代价最小的事务。预防：按固定顺序访问资源。避免：大事务拆小事务、快速释放锁。日志：`SHOW ENGINE INNODB STATUS` 查看死锁信息。innodb_lock_wait_timeout：设置等待锁超时时间。

---

## 8. 存储引擎类

### 8.1 InnoDB

**名称**：InnoDB 存储引擎（InnoDB）

**首次出现位置**：C10_101-概述与环境.md 第5章

**定义**：
InnoDB 是 MySQL 5.5+ 的默认存储引擎，支持事务、行级锁、外键、崩溃恢复。

**详解**：
特性：事务支持（ACID）、行级锁、外键约束、MVCC、崩溃恢复。表空间：共享表空间（ibdata1）或独立表空间（.ibd）。锁粒度：行级锁，并发性能高。自动增长列：必须是索引且为索引的第一列。全文索引：InnoDB 5.6+ 支持。适用场景：大多数 OLTP 应用。

---

### 8.2 MyISAM

**名称**：MyISAM 存储引擎（MyISAM）

**首次出现位置**：C10_101-概述与环境.md 第5章

**定义**：
MyISAM 是 MySQL 早期默认存储引擎，不支持事务和行级锁，适合读多写少场景。

**详解**：
特性：表级锁、不支持事务、不支持外键、可压缩、可空间回收。全文索引：MyISAM 支持全文索引。表文件：.frm（表定义）、.MYD（数据）、.MYI（索引）。计数器：AEAD_COUNT 存储引擎（MySQL 8.0.27+）。限制：写入会锁表，高并发写入性能差。

---

### 8.3 存储引擎比较

**名称**：存储引擎比较（Storage Engine Comparison）

**首次出现位置**：C10_101-概述与环境.md 第5章

**定义**：
MySQL 支持多种存储引擎，各有特点，应根据业务需求选择。

**详解**：
InnoDB vs MyISAM：事务支持、锁粒度、外键支持。MEMORY：内存存储，速度快但数据易丢失。CSV：CSV 格式存储，可与其他程序交互。ARCHIVE：只支持 INSERT/SELECT，占用空间小。BLACKHOLE：写入数据丢弃，常用于复制过滤。

---

## 9. 数据库设计类

### 9.1 范式（Normalization）

**名称**：数据库规范化（Database Normalization）

**首次出现位置**：C10_104-控制器与应用.md 第1章

**定义**：
范式是数据库设计的原则，通过分解表结构减少数据冗余，包括 1NF、2NF、3NF、BCNF 等。

**详解**：
1NF：字段不可再分（原子性）。2NF：消除部分函数依赖（非主属性完全函数依赖于主键）。3NF：消除传递依赖（非主属性不传递依赖于主键）。BCNF：主属性对候选键的依赖。规范化程度越高，数据冗余越少，但可能增加查询复杂度。反规范化：有时为性能故意增加冗余。

---

### 9.2 ER 图

**名称**：实体关系图（Entity-Relationship Diagram）

**缩写**：ER 图

**首次出现位置**：C10_104-控制器与应用.md 第1章

**定义**：
ER 图是用于描述实体及其之间关系的数据模型工具，是数据库设计的重要辅助手段。

**详解**：
实体：矩形，表示表。属性：椭圆，表示字段。关系：菱形，表示表间关系。基数：1:1、1:N、M:N。ER 图工具：PowerDesigner、Visio、dbdiagram.io。转换为表：实体转换为表，关系转换为外键。

---

### 9.3 三大范式

**名称**：三大范式（Three Normal Forms）

**首次出现位置**：C10_104-控制器与应用.md 第1章

**定义**：
第一范式、第二范式、第三范式是数据库设计的基础规范。

**详解**：
1NF：每个字段保持原子性，不可再分。2NF：非主键字段完全依赖主键（消除部分依赖）。3NF：非主键字段不传递依赖主键（消除传递依赖）。应用：遵循范式可减少数据冗余和更新异常。但不一定完全遵循，根据性能需求调整。

---

### 9.4 反规范化

**名称**：反规范化（Denormalization）

**首次出现位置**：C10_104-控制器与应用.md 第1章

**定义**：
反规范化是有意增加数据冗余以提高查询性能，是规范化的逆向操作。

**详解**：
目的：减少表连接、提高查询性能。方法：字段冗余存储、预计算汇总数据、重复表。风险：增加更新复杂度、可能数据不一致。适用场景：读多写少、数据量大的 OLAP 系统。实践：常见于报表表、汇总表、缓存表。

---

## 10. 其他重要概念类

### 10.1 字符集与排序规则

**名称**：字符集与排序规则（Character Set / Collation）

**首次出现位置**：C10_105-数据类型与约束.md 第6章

**定义**：
字符集定义数据库存储的字符编码，排序规则定义字符比较和排序的规则。

**详解**：
字符集：UTF8（实际是 UTF8MB3）、UTF8MB4（完整 UTF-8）。排序规则：_ci（大小写不敏感）、_cs（大小写敏感）、_bin（二进制比较）。设置级别：服务器、数据库、表、列、连接。推荐配置：字符集 utf8mb4，排序规则 utf8mb4_unicode_ci。Emoji 支持：utf8mb4 支持 Emoji 表情。

---

### 10.2 触发器

**名称**：触发器（Trigger）

**首次出现位置**：C10_104-控制器与应用.md 第3章

**定义**：
触发器是与表关联的存储程序，在表发生 INSERT、UPDATE、DELETE 事件时自动执行。

**详解**：
创建：`CREATE TRIGGER trigger_name BEFORE/AFTER INSERT/UPDATE/DELETE ON table`。OLD/NEW：访问修改前后的行数据。限制：触发器执行有性能开销，禁止递归触发。审计：触发器可用于数据变更审计。替代：应用层逻辑也可实现触发器功能。

---

### 10.3 存储过程

**名称**：存储过程（Stored Procedure）

**首次出现位置**：C10_104-控制器与应用.md 第2章

**定义**：
存储过程是存储在数据库服务器中的预编译 SQL 代码集合，可接受参数并返回值。

**详解**：
创建：`CREATE PROCEDURE proc_name(IN/OUT param type) BEGIN ... END`。调用：`CALL proc_name()`。优势：减少网络通信、提高性能、封装业务逻辑。缺点：业务逻辑分散、可移植性差、调试困难。替代：应用层实现更灵活。

---

### 10.4 存储函数

**名称**：存储函数（Stored Function）

**首次出现位置**：C10_104-控制器与应用.md 第2章

**定义**：
存储函数与存储过程类似，但必须返回值，可像内置函数一样在 SQL 表达式中使用。

**详解**：
创建：`CREATE FUNCTION func_name(param type) RETURNS type`。返回值：必须包含 RETURN 语句。调用：可在 SELECT、WHERE 等处调用。限制：不能包含事务控制语句。优势：可复用在多个查询中。

---

### 10.5 事件调度器

**名称**：事件调度器（Event Scheduler）

**首次出现位置**：C10_104-控制器与应用.md 第4章

**定义**：
事件调度器是 MySQL 5.1+ 提供的定时任务功能，可在指定时间执行 SQL 语句或存储过程。

**详解**：
开启：`event_scheduler=ON`。创建事件：`CREATE EVENT event_name ON SCHEDULE EVERY 1 DAY DO statement`。一次性 vs 周期性：可设置 AT timestamp 或 EVERY interval。启用状态：可 ENABLE/DISABLE。应用：定期数据清理、汇总表更新、数据同步。

---

## 更新日志

- 2026-04-30：创建专有名词解释文档，v1.0.0
