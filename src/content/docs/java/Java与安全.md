---
order: 78
title: Java与安全
module: java
category: Java
difficulty: intermediate
description: Java安全编程
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java性能调优
  - java/Java与AI
  - java/Java与WebAssembly
  - java/Java与响应式编程
prerequisites:
  - java/概述与开发环境
---

## 1. 加密

```java
// AES 加密
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
cipher.init(Cipher.ENCRYPT_MODE, secretKey);
byte[] encrypted = cipher.doFinal(data);

// 哈希
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest(input.getBytes());
```

## 2. 安全最佳实践

- 使用 BCrypt 存储密码
- 验证所有输入
- 使用参数化查询防 SQL 注入
- 启用 HTTPS
- 使用 SecurityManager
