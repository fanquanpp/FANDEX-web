---
order: 71
title: Java与微服务
module: java
category: Java
difficulty: advanced
description: 'Spring Cloud微服务架构'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java构建工具
  - java/控制流
  - java/Java与消息队列
  - java/Java与Redis
prerequisites:
  - java/概述与开发环境
---

## 1. 核心组件

| 组件                | 说明             |
| ------------------- | ---------------- |
| Eureka/Nacos        | 服务注册与发现   |
| Ribbon/LoadBalancer | 负载均衡         |
| Feign/OpenFeign     | 声明式HTTP客户端 |
| Hystrix/Sentinel    | 熔断降级         |
| Gateway             | API 网关         |
| Config/Nacos        | 配置中心         |

## 2. 服务注册

```java
@EnableDiscoveryClient
@SpringBootApplication
public class Application { public static void main(String[] args) { SpringApplication.run(Application.class, args); } }
```
