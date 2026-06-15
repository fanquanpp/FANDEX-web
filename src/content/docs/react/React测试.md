---
order: 61
title: React测试
module: react
category: React
difficulty: intermediate
description: React组件测试策略
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React表单处理
  - react/React与TypeScript
  - react/React路由进阶
  - react/React国际化
prerequisites:
  - react/概述与环境配置
---

## 1. React Testing Library

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

## 2. 异步测试

```javascript
import { render, screen, waitFor } from '@testing-library/react';

test('loads data', async () => {
  render(<DataComponent />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## 3. Mock

```javascript
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ name: 'Test' }),
}));
```
