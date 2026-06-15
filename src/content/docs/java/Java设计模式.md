---
order: 65
title: Java设计模式
module: java
category: Java
difficulty: intermediate
description: GoF设计模式Java实现
author: fanquanpp
updated: '2026-06-14'
related:
  - java/SpringBoot安全
  - java/SpringBoot数据访问
  - java/Java函数式编程
  - java/Java网络编程
prerequisites:
  - java/概述与开发环境
---

## 1. 创建型

- 单例：`enum Singleton { INSTANCE }`
- 工厂方法：`interface Factory<T> { T create(); }`
- 建造者：`User.builder().name("A").age(25).build()`

## 2. 结构型

- 适配器：`class Adapter implements Target { delegate() }`
- 装饰器：`class Decorator implements Component { wrapped() }`
- 代理：`java.lang.reflect.Proxy`

## 3. 行为型

- 策略：`interface Strategy { void execute(); }`
- 观察者：`interface Listener { void onEvent(Event e); }`
- 模板方法：`abstract class Template { final void run() { step1(); step2(); } }`
