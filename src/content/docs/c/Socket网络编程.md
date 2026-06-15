---
order: 66
title: Socket网络编程
module: c
category: C
difficulty: advanced
description: TCP/UDP套接字编程
author: fanquanpp
updated: '2026-06-14'
related:
  - c/复杂声明解析
  - c/POSIX线程
  - c/进程与管道
  - c/共享内存与信号量
prerequisites:
  - c/概述
---

## 1. TCP 服务器

```c
int server_fd = socket(AF_INET, SOCK_STREAM, 0);

struct sockaddr_in addr = {
  .sin_family = AF_INET,
  .sin_port = htons(8080),
  .sin_addr.s_addr = INADDR_ANY
};

bind(server_fd, (struct sockaddr*)&addr, sizeof(addr));
listen(server_fd, 5);

int client_fd = accept(server_fd, NULL, NULL);
char buf[1024];
read(client_fd, buf, sizeof(buf));
write(client_fd, "Hello", 5);
```

## 2. TCP 客户端

```c
int sock = socket(AF_INET, SOCK_STREAM, 0);
struct sockaddr_in addr = {
  .sin_family = AF_INET,
  .sin_port = htons(8080),
  .sin_addr.s_addr = inet_addr("127.0.0.1")
};
connect(sock, (struct sockaddr*)&addr, sizeof(addr));
```
