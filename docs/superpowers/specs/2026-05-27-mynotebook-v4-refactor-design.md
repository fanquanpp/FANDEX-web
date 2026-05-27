# MyNotebook v4 重构设计文档
 False
 False## 1. 全局架构映射
 False
 False### 1.1 模块依赖关系图
 False
```mermaid
 Truegraph TB
 True subgraph foundations["基础工具层"]
 True MD["Markdown"]
 True GIT["Git"]
 True GH["GitHub"]
 True end
 True
 True subgraph languages["编程语言层"]
 True C["C"]
 True PY["Python"]
 True JAVA["Java"]
 True JS["JavaScript"]
 True TS["TypeScript"]
 True CPP["C++"]
 True LUA["Lua"]
 True end
 True
 True subgraph web["Web前端层"]
 True HTML["HTML5"]
 True CSS["CSS"]
 True VUE["Vue3"]
 True end
 True
 True subgraph data["数据层"]
 True MYSQL["MySQL"]
 True DA["数据分析"]
 True end
 True
 True subgraph cs["计算机科学层"]
 True ALGO["算法与数据结构"]
 True CSF["计算机基础"]
 True end
 True
 True MD --> GIT --> GH
 True MD --> C --> CPP
 True C --> CPP
 True MD --> PY
 True PY --> DA
 True MD --> JAVA
 True JAVA --> MYSQL
 True MD --> JS --> TS --> VUE
 True HTML --> CSS --> JS
 True TS --> VUE
 True MYSQL --> DA
 True C --> ALGO
 True PY --> ALGO
 True CPP --> ALGO
 True C --> CSF
 True LUA -.-> CPP
 True
 True classDef foundation fill:#01579b,stroke:#0d47a1,color:#fff
 True classDef language fill:#4a148c,stroke:#311b92,color:#fff
 True classDef web fill:#1b5e20,stroke:#2e7d32,color:#fff
 True classDef data fill:#e65100,stroke:#bf360c,color:#fff
 True classDef cs fill:#880e4f,stroke:#ad1457,color:#fff
 True class MD,GIT,GH foundation
 True class C,PY,JAVA,JS,TS,CPP,LUA language
 True class HTML,CSS,VUE web
 True class MYSQL,DA data
 True class ALGO,CSF cs
 True```

 False### 1.2 跨模块引用缺失
 False
 False| 源模块 | 应引用 | 当前状态 |
 False|:---|:---|:---|
 False| JS 异步编程 | HTML5 WebAPI | 未引用 |
 False| TS 类型系统 | JS 原型与继承 | 未引用 |
 False| Vue3 组合式API | JS 闭包/异步 | 未引用 |
 False| 数据分析 | Python 基础 | 模块未创建 |
 False| 算法 | C/C++ 指针与内存 | 模块未创建 |
 False| MySQL 查询 | 数据分析 Pandas | 模块未创建 |
 False
 False---
 False
 False## 2. 内容质量诊断
 False
 False### 2.1 文件大小异常
 False
 False#### 过大文件 (>30KB，需拆分)
 False| 文件 | 大小 | 建议拆分方案 |
 False|:---|:---|:---|
 False| G10_301-SQL注入.md | 54.7KB | → sql-injection-basics.md + sql-injection-attacks.md + sql-injection-defense.md |
 False| V03_101-Python名词注释.md | 52KB | → 按主题分类：python-terms-core.md + python-terms-stdlib.md + python-terms-advanced.md |
 False| C10_102-SQL基础语法.md | 48.8KB | → sql-dml.md + sql-ddl.md + sql-functions.md |
 False| C10_101-概述与环境.md | 47KB | → mysql-overview.md + mysql-install.md + mysql-config.md |
 False| V04_101-Java名词注释.md | 46.8KB | → 按主题分类 |
 False| V06_101-CSS名词注释.md | 44.9KB | → 按主题分类 |
 False| C13_105-模板与STL.md | 40.5KB | → cpp-templates.md + cpp-stl-containers.md + cpp-stl-algorithms.md |
 False| V05_101-HTML5名词注释.md | 39.7KB | → 按主题分类 |
 False| C13_103-指针引用与内存.md | 37.6KB | → cpp-pointers.md + cpp-references.md + cpp-memory.md |
 False| C13_102-基础语法与类型.md | 37.1KB | → cpp-syntax-basics.md + cpp-type-system.md |
 False| C13_104-面向对象.md | 37KB | → cpp-oop-basics.md + cpp-oop-advanced.md |
 False| C10_103-进阶查询与联查.md | 35.5KB | → sql-joins.md + sql-subqueries.md |
 False| G08_202-项目实战.md | 35.4KB | → js-project-todo.md + js-project-api.md |
 False
 False#### 过小/空洞文件 (<5KB，需补充)
 False| 文件 | 大小 | 问题 |
 False|:---|:---|:---|
 False| C06_106-传统布局与定位.md | 1.6KB | 严重空洞，仅4个章节 |
 False| C04_100-快速入门.md | 1.6KB | 内容过少 |
 False| G05_201-Vue核心与实战.md | 2.4KB | 应移至Vue3模块或删除 |
 False| G06_201-响应式设计.md | 3.9KB | 缺少媒体查询实战 |
 False| C08_111-DOM操作.md | 4.2KB | 偏薄 |
 False| C08_110-模块化.md | 3.7KB | 偏薄 |
 False| C10_105-数据类型与约束.md | 4.4KB | 偏薄 |
 False| C10_106-索引与执行计划.md | 3.5KB | 偏薄 |
 False| G11_203-工程化配置.md | 3.3KB | 偏薄 |
 False| G11_204-类型声明与模块解析.md | 3.3KB | 偏薄 |
 False| C08_109-原型与继承.md | 5.4KB | 偏薄 |
 False
 False### 2.2 内容重叠
 False
 False| 文件A | 文件B | 重叠内容 |
 False|:---|:---|:---|
 False| G01_204-Actions与CI.md (13.9KB) | G01_208-GitHub_Actions与Pages.md (9.1KB) | Actions 工作流语法、CI/CD 概念重叠 |
 False
 False### 2.3 Lua 模块评估
 False
 FalseLua 模块共 8 个文件，总内容量约 90KB，质量中等。建议保留，因为：
 False- 与 C/C++ 嵌入式编程有关联
 False- 内容覆盖了 Lua 核心特性
 False- 删除会丢失已有内容
 False
 False---
 False
 False## 3. 架构设计方案
 False
 False### 推荐方案：扁平化语义目录
 False
 False选择方案B（扁平化语义目录），原因：
 False1. URL 更友好：`/python/` 比 `/languages/python/` 短
 False2. 各模块独立，互不干扰
 False3. 更适合 Vue Router 路由映射
 False4. 新增模块无需调整层级
 False
 False### 新目录结构
 False
```
 TrueMyNotebook-main/
 True├── git/ # Git 版本控制
 True├── github/ # GitHub 平台
 True├── markdown/ # Markdown 文档
 True├── c/ # C 语言
 True├── python/ # Python
 True├── java/ # Java
 True├── javascript/ # JavaScript
 True├── typescript/ # TypeScript
 True├── cpp/ # C++
 True├── lua/ # Lua
 True├── html5/ # HTML5
 True├── css/ # CSS
 True├── vue3/ # Vue3
 True├── mysql/ # MySQL
 True├── data-analysis/ # 数据分析（新增）
 True├── algorithm/ # 算法与数据结构（新增）
 True├── cs-fundamentals/ # 计算机基础（新增）
 True├── docs/ # 文档站点源码
 True│ └── adr/ # 架构决策记录
 True├── .obsidian/ # Obsidian 配置
 True├── .github/ # GitHub Actions
 True├── CONTEXT.md
 True├── package.json
 True└── README.md
 True```

 False### 各模块内部命名
 False
 False各模块自由命名，推荐风格：
 False- Python: `01-overview.md`, `02-syntax.md`... (数字前缀保序)
 False- C++: `templates.md`, `stl-containers.md`... (语义化)
 False- MySQL: `sql-dml.md`, `sql-ddl.md`... (技术术语)
 False
 False---
 False
 False## 4. 新增模块内容框架
 False
 False### 4.1 数据分析 (data-analysis/)
 False
 False| 文件 | 内容 |
 False|:---|:---|
 False| overview.md | 数据分析概述、工具链、学习路线 |
 False| numpy.md | NumPy 数组操作、线性代数、随机数 |
 False| pandas.md | DataFrame/Series、数据清洗、合并重塑 |
 False| matplotlib.md | 折线图、柱状图、散点图、子图 |
 False| seaborn.md | 统计可视化、热力图、分布图 |
 False| statistics.md | 描述统计、推断统计、假设检验 |
 False| data-cleaning.md | 缺失值、异常值、数据类型转换 |
 False| project.md | 实战案例：数据分析全流程 |
 False
 False### 4.2 算法与数据结构 (algorithm/)
 False
 False| 文件 | 内容 |
 False|:---|:---|
 False| overview.md | 算法分析、复杂度、学习路线 |
 False| sorting.md | 冒泡/选择/插入/快排/归并/堆排 |
 False| searching.md | 线性/二分/哈希/BFS/DFS |
 False| dynamic-programming.md | 背包/LCS/编辑距离/子序列 |
 False| greedy.md | 活动选择/哈夫曼/最小生成树 |
 False| graph.md | 表示/遍历/最短路径/拓扑排序 |
 False| linked-list.md | 单链表/双链表/环形链表 |
 False| tree.md | 二叉树/BST/AVL/红黑树/B树 |
 False| hashtable.md | 哈希函数/冲突处理/扩容 |
 False| leetcode-guide.md | LeetCode 刷题策略与分类 |
 False
 False### 4.3 计算机基础 (cs-fundamentals/)
 False
 False| 文件 | 内容 |
 False|:---|:---|
 False| overview.md | 计算机科学概述、知识体系 |
 False| architecture.md | 体系结构、CPU/存储/总线 |
 False| os.md | 进程/线程/内存管理/文件系统 |
 False| network.md | OSI/TCP-IP/HTTP/DNS/安全 |
 False| compiler.md | 词法/语法/语义分析/代码生成 |
 False| discrete-math.md | 集合/逻辑/图论/组合 |
 False| design-patterns.md | 23种设计模式分类与实现 |
 False
 False---
 False
 False## 5. 自学体验设计
 False
 False### 5.1 学习路径
 False
```
 True入门路径: Markdown → Git → GitHub → HTML5 → CSS → JavaScript
 True进阶路径: JS → TypeScript → Vue3 | Python → 数据分析 | C → C++
 True专家路径: 算法 → 计算机基础 | Java → MySQL | Vue3 全栈
 True```

 False### 5.2 站点功能
 False
 False- 侧边栏按技术领域分组
 False- 全文搜索
 False- 学习进度追踪 (localStorage)
 False- 暗色/亮色主题
 False- 代码高亮 + 可运行示例
 False- 知识卡片快速预览
 False- 跨模块 wikilink 导航
 False
 False---
 False
 False## 6. 内容重构优先级
 False
 False1. **MySQL** — 问题最多（3个超大文件 + 2个偏薄文件）
 False2. **C++** — 4个超大文件需拆分
 False3. **Python** — 名词注释52KB需拆分
 False4. **新增3模块** — 需从零创建
 False5. **HTML5/CSS** — 空洞内容需补充
 False6. **JavaScript** — 3个偏薄文件
 False7. **GitHub** — 内容重叠需合并
 False8. **其余模块** — 微调优化
 False