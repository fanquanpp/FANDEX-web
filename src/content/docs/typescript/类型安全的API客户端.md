---
order: 71
title: 类型安全的API客户端
module: typescript
category: TypeScript
difficulty: advanced
description: 构建端到端类型安全的HTTP客户端
author: fanquanpp
updated: '2026-06-14'
related:
  - typescript/类型声明与模块解析
  - typescript/类型安全的事件系统
  - typescript/类型安全的状态管理
  - typescript/类型安全的表单验证
prerequisites:
  - typescript/语法速查
---

## 1. API 类型定义

```typescript
interface APIClient {
  '/users': {
    GET: { response: User[]; query?: { page: number } };
    POST: { response: User; body: Omit<User, 'id'> };
  };
  '/users/:id': {
    GET: { response: User; params: { id: string } };
    PUT: { response: User; params: { id: string }; body: Partial<User> };
    DELETE: { response: void; params: { id: string } };
  };
}
```

## 2. 类型安全请求

```typescript
type PathsWithMethod<M extends string> = {
  [P in keyof APIClient]: M extends keyof APIClient[P] ? P : never;
}[keyof APIClient];

async function request<
  Path extends PathsWithMethod<Method>,
  Method extends keyof APIClient[Path] = 'GET',
>(
  path: Path,
  options: {
    method?: Method;
    params?: APIClient[Path][Method] extends { params: infer P } ? P : never;
    query?: APIClient[Path][Method] extends { query: infer Q } ? Q : never;
    body?: APIClient[Path][Method] extends { body: infer B } ? B : never;
  }
): Promise<APIClient[Path][Method] extends { response: infer R } ? R : never> {
  // 实现...
}
```

## 3. 路由参数替换

```typescript
type ReplaceParams<Path, Params> = Path extends `${infer Before}:${infer Param}${infer After}`
  ? Params extends { [K in Param]: string }
    ? `${Before}${Params[Param & keyof Params]}${ReplaceParams<After, Params>}`
    : never
  : Path;
```
