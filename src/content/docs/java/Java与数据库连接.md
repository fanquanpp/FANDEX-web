---
order: 87
title: Java与数据库连接
module: java
category: Java
difficulty: intermediate
description: JDBC与连接池
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java文本块
  - java/Java模块系统
  - java/Java新特性与生态
  - java/数组详解
prerequisites:
  - java/概述与开发环境
---

## 1. JDBC

```java
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {
  ps.setLong(1, userId);
  try (ResultSet rs = ps.executeQuery()) {
    if (rs.next()) return mapUser(rs);
  }
}
```

## 2. HikariCP 连接池

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost/mydb");
config.setMaximumPoolSize(10);
DataSource ds = new HikariDataSource(config);
```
