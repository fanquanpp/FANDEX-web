---
order: 62
title: React路由进阶
module: react
category: React
difficulty: intermediate
description: 'React Router高级用法'
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与TypeScript
  - react/React测试
  - react/React国际化
  - react/React动画
prerequisites:
  - react/概述与环境配置
---

## 1. 路由配置

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'users/:id', element: <UserDetail />, loader: userLoader },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

<RouterProvider router={router} />;
```

## 2. 数据路由

```jsx
// loader — 加载数据
export async function loader({ params }) {
  const user = await getUser(params.id);
  return { user };
}

// action — 处理表单
export async function action({ request }) {
  const formData = await request.formData();
  await updateUser(Object.fromEntries(formData));
  return redirect('/users');
}
```

## 3. 导航守卫

```jsx
function RequireAuth({ children }) {
  const user = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
```
