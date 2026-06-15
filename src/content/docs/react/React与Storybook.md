---
order: 75
title: React与Storybook
module: react
category: React
difficulty: intermediate
description: React组件文档与开发
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与Canvas
  - react/React与D3
  - 'react/React与CI-CD'
  - react/React与Monorepo
prerequisites:
  - react/概述与环境配置
---

## 1. Story 配置

```jsx
// Button.stories.jsx
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export const Primary = { args: { variant: 'primary', children: 'Click me' } };
export const Secondary = { args: { variant: 'secondary', children: 'Click me' } };
export const Large = { args: { size: 'lg', children: 'Large Button' } };
```

## 2. 交互测试

```jsx
import { within, userEvent } from '@storybook/test';

export const ClickTest = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```
