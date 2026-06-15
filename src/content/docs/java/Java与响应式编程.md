---
order: 80
title: Java与响应式编程
module: java
category: Java
difficulty: advanced
description: 'Project Reactor与WebFlux'
author: fanquanpp
updated: '2026-06-14'
related:
  - java/Java与安全
  - java/Java与WebAssembly
  - java/方法详解
  - java/Java与虚拟线程
prerequisites:
  - java/概述与开发环境
---

## 1. Mono & Flux

```java
Mono<String> mono = Mono.just("Hello");
Flux<Integer> flux = Flux.range(1, 10);

mono.map(String::toUpperCase)
    .flatMap(this::processAsync)
    .subscribe(System.out::println);
```

## 2. WebFlux

```java
@RestController
public class UserController {
  @GetMapping("/users/{id}")
  public Mono<User> getUser(@PathVariable String id) {
    return userService.findById(id);
  }
}
```
