---
order: 69
title: React与GraphQL
module: react
category: React
difficulty: intermediate
description: React中GraphQL数据获取
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React与WebAssembly
  - react/React与WebSocket
  - react/React与微前端
  - react/React无障碍
prerequisites:
  - react/概述与环境配置
---

## 1. Apollo Client

```jsx
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return data.users.map((user) => <div key={user.id}>{user.name}</div>);
}
```

## 2. Mutation

```jsx
const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

function CreateUser() {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  return (
    <button onClick={() => createUser({ variables: { name: 'Alice' } })}>
      {loading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```
