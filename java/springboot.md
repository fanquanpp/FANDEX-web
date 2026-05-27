# Spring Boot 学习笔记（Spring Boot Learning Notes）
 False
 False> @Version: v3.5.0
 False
 False> @Author: fanquanpp
 False> @Category: Java Basics
 False> @Description: Spring Boot 学习笔记
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [核心概念](#核心概念)
 False2. [环境配置与核心功能](#环境配置与核心功能)
 False3. [实战应用](#实战应用)
 False4. [最佳实践](#最佳实践)
 False5. [延伸阅读](#延伸阅读)
 False6. [更新日志](#更新日志)
 False
 False---
 False
 False## 1. 核心概念
 False
 False- **起步依赖 (Starter)**：将常用的库打包，提供一站式依赖管理。
 False- **自动配置 (Auto-configuration)**：根据类路径下的 Jar 包自动装配 Bean。
 False- **内嵌容器**：如 Tomcat, Jetty，可以直接运行 Jar 包而无需部署外部容器。
 False
 False## 2. 环境配置与核心功能
 False
 False### 2.1 环境配置
 False
 False- `application.properties` 或 `application.yml`：全局配置文件。
 False- `demo-properties`：如何读取配置文件内容。
 False
```yaml
 True# application.yml
 Trueserver:
 True port: 8080
 Truespring:
 True datasource:
 True url: jdbc:mysql://localhost:3306/db
 True```

 False### 2.2 监控与日志
 False
 False- **Actuator**：集成 `spring-boot-starter-actuator`，监控应用的健康状态、度量指标。
 False- **Logback**：Spring Boot 默认集成的日志框架，配置灵活。
 False
```xml
 True<!-- logback-spring.xml -->
 True<configuration>
 True <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
 True <encoder><pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern></encoder>
 True </appender>
 True <root level="INFO"><appender-ref ref="STDOUT" /></root>
 True</configuration>
 True```

 False### 2.3 异常处理
 False
 False- **Unified Exception Handler**：使用 `@ControllerAdvice` 和 `@ExceptionHandler` 实现全局统一返回。
 False
 False## 3. 实战应用
 False
 False### 3.1 ORM 数据库操作
 False
 False- **JdbcTemplate**：简单封装通用 Dao 层。
 False- **JPA**：`spring-boot-starter-data-jpa`，基于 Hibernate 实现。
 False- **MyBatis / MyBatis-Plus**：灵活的 SQL 映射框架。
 False
 False### 3.2 定时任务与异步
 False
 False- `@Scheduled`：快速实现定时任务。
 False- `@Async`：开启多线程异步支持。
 False
```java
 True@Component
 Truepublic class MyTask {
 True @Scheduled(fixedRate = 5000)
 True public void run() {
 True System.out.println("定时任务执行中...");
 True }
 True}
 True```

 False## 4. 最佳实践
 False
 False- **安全认证**：集成 `Spring Security` 或 `Shiro`，配合 JWT 实现无状态鉴权。
 False- **分布式锁**：集成 `Zookeeper` 或 `Redis` 实现基于 AOP 的分布式锁。
 False- **消息队列**：`RabbitMQ`, `RocketMQ`, `Kafka` 集成，解耦业务逻辑。
 False
 False## 5. 延伸阅读
 False
 False- [Spring Boot 官方文档](https://spring.io/projects/spring-boot) <!-- nofollow -->
 False- [spring-boot-demo 仓库](https://github.com/xkcoding/spring-boot-demo) <!-- nofollow -->
 False
 False## 6. 更新日志
 False
 False- **2026-04-05**：初始版本，整理 Spring Boot 核心与实战模块。
 False