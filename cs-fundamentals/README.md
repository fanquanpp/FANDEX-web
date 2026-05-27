# 计算机科学基础
 False
 False> @Version: v4.0.0
 False> @Author: fanquanpp
 False> @Category: Computer Science / Fundamentals
 False> @Description: 计算机科学基础知识体系模块概览，涵盖体系结构、操作系统、网络协议栈、编译原理、离散数学与设计模式。
 False
 False---
 False
 False## 目录
 False
 False- [计算机科学概述](overview.md) — 知识体系全景图与学科脉络
 False- [体系结构](architecture.md) — CPU / 存储 / 总线 / 指令集
 False- [操作系统](os.md) — 进程 / 线程 / 内存 / 文件系统
 False- [网络协议栈](network.md) — OSI / TCP-IP / HTTP / DNS / 安全
 False- [编译原理](compiler.md) — 词法 / 语法 / 语义 / 代码生成
 False- [离散数学](discrete-math.md) — 集合 / 逻辑 / 图论 / 组合
 False- [设计模式](design-patterns.md) — 23 种模式分类与实现
 False
 False---
 False
 False## 模块定位
 False
 False本模块以**原理驱动**为核心理念，围绕三条主线组织知识：
 False
 False1. **体系结构图** — 从硬件到软件的层次映射，理解每一层抽象的边界与契约
 False2. **网络协议栈** — 自底向上的协议分层思维，掌握数据在各层间的封装与解封
 False3. **状态机** — 用有限状态自动机建模并发、协议、编译等动态行为
 False
 False---
 False
 False## 阅读路线
 False
```
 Trueoverview ──┬── architecture ──── os ──── network
 True │
 True ├── compiler ──── discrete-math
 True │
 True └── design-patterns
 True```

 False- **自底向上路线**：overview → architecture → os → network → compiler → discrete-math → design-patterns
 False- **问题驱动路线**：从任意模块切入，按需跳转依赖章节
 False
 False---
 False
 False## 约定
 False
 False- 每章均包含**原理图**（ASCII / Mermaid）与**状态机图**
 False- 关键概念使用 `> **定义**` 引用块标注
 False- 代码示例以 C / Rust 为主，辅以伪代码
 False
 False---
 False
 False## 延伸阅读
 False
 False- *Computer Systems: A Programmer's Perspective* — Bryant & O'Hallaron
 False- *Structure and Interpretation of Computer Programs* — Abelson & Sussman
 False- *The Art of Computer Programming* — Donald Knuth
 False