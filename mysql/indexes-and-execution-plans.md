# MySQL 索引与执行计划 (Indexing & EXPLAIN)
 False
 False> @Version: v3.5.0
 False
 False> @Author: Anonymous
 False> @Category: MySQL Basics
 False> @Description: 讲清索引的作用与代价、B+Tree 基础、组合索引规则与 EXPLAIN 的读法，并给出可落地的建索引策略。 | Index fundamentals and how to read EXPLAIN in practice.
 False
 False---
 False
 False## 目录
 False
 False1. [索引是什么](#索引是什么)
 False2. [InnoDB 索引要点](#innodb-索引要点)
 False3. [组合索引与最左前缀](#组合索引与最左前缀)
 False4. [什么时候索引会失效](#什么时候索引会失效)
 False5. [EXPLAIN 怎么看](#explain-怎么看)
 False6. [建索引的实用策略](#建索引的实用策略)
 False7. [小结](#小结)
 False
 False---
 False
 False## 1. 索引是什么 (What is an Index)
 False
 False索引是为了加速检索而构建的数据结构。对 InnoDB 来说，常见索引是 B+Tree。
 False
 False索引带来的收益：
 False
 False- 加速 `WHERE` 过滤、`JOIN`、`ORDER BY`、`GROUP BY`
 False
 False索引带来的成本：
 False
 False- 写入变慢（INSERT/UPDATE/DELETE 需要维护索引）
 False- 占用更多空间
 False- 设计不当会让查询优化器选错计划或无法利用索引
 False
 False## 2. InnoDB 索引要点 (InnoDB Basics)
 False
 False### 2.1 聚簇索引与二级索引
 False
 False- 主键索引（聚簇索引）：叶子节点存放整行数据
 False- 二级索引：叶子节点存放“索引列 + 主键值”
 False
 False因此：
 False
 False- 用二级索引命中后，可能需要回表（根据主键再查一次聚簇索引）
 False- 覆盖索引可以避免回表（查询列都在索引里）
 False
 False## 3. 组合索引与最左前缀 (Composite Index)
 False
 False假设有索引 `(a, b, c)`：
 False
 False- 能有效利用：`a`、`a,b`、`a,b,c` 的前缀过滤
 False- 不能跳过前缀：只用 `b` 或 `c` 往往无法走该索引
 False
 False实践建议：
 False
 False- 把区分度更高、过滤更强的列放在前面（但也要结合排序/分组需求）
 False- 频繁按 `(tenant_id, created_at)` 查询，优先建立组合索引
 False
 False## 4. 什么时候索引会失效 (When Index Isn’t Used)
 False
 False常见原因：
 False
 False- 对索引列做函数/表达式：`WHERE DATE(created_at) = ...`
 False- 隐式类型转换：字符串与数字混用导致无法利用索引
 False- 前缀缺失：组合索引没用到最左前缀
 False- `LIKE '%xxx'` 前置通配符无法利用普通 B+Tree 索引
 False- 返回行数过多：优化器认为全表扫描更便宜
 False
 False## 5. EXPLAIN 怎么看 (How to Read EXPLAIN)
 False
 False常用字段（MySQL 8）：
 False
 False- `type`：访问类型（从好到差大致：`const`/`ref`/`range`/`index`/`ALL`）
 False- `key`：实际使用的索引
 False- `rows`：估算扫描行数
 False- `Extra`：额外信息（例如 `Using index`、`Using filesort`、`Using temporary`）
 False
 False示例：
 False
```sql
 TrueEXPLAIN
 TrueSELECT id, email
 TrueFROM user_account
 TrueWHERE email = 'a@b.com';
 True```

 False解读目标：
 False
 False- 是否使用了期望的索引（`key`）
 False- 扫描行数是否可控（`rows`）
 False- 是否出现 `Using filesort` / `Using temporary`（可能需要优化索引或 SQL）
 False
 False## 6. 建索引的实用策略 (Practical Strategy)
 False
 False- 先写出典型查询，再反推索引，而不是“先建一堆索引”
 False- 一张表的索引数量控制在合理范围，避免写放大
 False- 组合索引优先覆盖高频查询路径
 False- 长字符串字段用前缀索引需谨慎（会影响选择性与排序能力）
 False- 对时间范围查询：`(tenant_id, created_at)` 常见有效
 False
 False## 7. 小结 (Summary)
 False
 False- 索引是“以写换读”的典型优化手段
 False- 组合索引与最左前缀是 MySQL 索引设计的核心
 False- EXPLAIN 是验证索引是否生效的第一工具
 False
 False---
 False
 False### 更新日志 (Changelog)
 False
 False- 2026-04-06: 新增「索引与执行计划」知识点，补充 EXPLAIN 解读与建索引策略
 False