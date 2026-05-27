/*
 * @Author:      Anonymous
 * @Algorithm:   高级 SQL 查询 (Advanced SQL Queries)
 * @Language:    MySQL 8.0+
 * @Description: 演示窗口函数 (Window Functions)、公用表表达式 (CTE) 与 索引优化建议。 | Demonstrate Window Functions, CTEs, and Index optimization tips.
 * @Teaching:    掌握 OVER() 子句与 WITH 语句。理解 EXPLAIN 分析查询计划。 | Mastering OVER() clause and WITH statements. Using EXPLAIN.
 */

-- 1. 公用表表达式 (CTE) | Common Table Expressions
-- 计算每个部门的平均薪资，并筛选出高于平均薪资的员工
WITH DeptAvgSalary AS (
    SELECT dept_id, AVG(salary) as avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
JOIN DeptAvgSalary d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;

-- 2. 窗口函数 | Window Functions
-- 对每个部门的员工按薪资进行排名
SELECT 
    name, 
    dept_id, 
    salary,
    RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as salary_rank,
    SUM(salary) OVER (PARTITION BY dept_id) as total_dept_salary
FROM employees;

-- 3. 索引优化建议 | Indexing Tips
-- 使用 EXPLAIN 查看查询计划 | Use EXPLAIN to analyze query plan
EXPLAIN SELECT * FROM orders WHERE user_id = 101 AND status = 'completed';

-- 4. 递归 CTE | Recursive CTE
-- 模拟生成 1 到 10 的序列
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 10
)
SELECT * FROM seq;
