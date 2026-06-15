---
order: 65
title: POSIX线程
module: c
category: C
difficulty: advanced
description: pthread多线程编程
author: fanquanpp
updated: '2026-06-14'
related:
  - c/内联函数与宏
  - c/复杂声明解析
  - c/Socket网络编程
  - c/进程与管道
prerequisites:
  - c/概述
---

## 1. 基本用法

```c
#include <pthread.h>

void* thread_func(void *arg) {
  printf("Thread %ld\n", (long)arg);
  return NULL;
}

pthread_t thread;
pthread_create(&thread, NULL, thread_func, (void*)1);
pthread_join(thread, NULL);
```

## 2. 互斥锁

```c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&mutex);
// 临界区
pthread_mutex_unlock(&mutex);
```

## 3. 条件变量

```c
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
pthread_cond_wait(&cond, &mutex);
pthread_cond_signal(&cond);
```
