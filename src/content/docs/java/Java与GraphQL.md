---
order: 75
title: Java与GraphQL
module: java
category: Java
difficulty: intermediate
description: 'GraphQL API开发'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与Redis
  - java/Java与Docker
  - java/Java性能调优
  - java/Java与AI
prerequisites:
  - java/概述与开发环境
---

## 1. Spring for GraphQL

```java
@Controller
public class UserGraphQLController {
  @QueryMapping
  public User user(@Argument Long id) { return userService.getUser(id); }

  @SchemaMapping
  public List<Post> posts(User user) { return postService.getByUser(user.getId()); }
}
```
