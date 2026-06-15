---
order: 68
title: React与WebSocket
module: react
category: React
difficulty: intermediate
description: React中WebSocket实时通信
author: fanquanpp
updated: '2026-06-14'
related:
  - react/React设计模式
  - react/React与WebAssembly
  - react/React与GraphQL
  - react/React与微前端
prerequisites:
  - react/概述与环境配置
---

## 1. WebSocket Hook

```jsx
function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setStatus('connected');
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    ws.onclose = () => setStatus('disconnected');
    ws.onerror = () => setStatus('error');

    return () => ws.close();
  }, [url]);

  return { data, status };
}
```

## 2. 自动重连

```jsx
function useReconnectWebSocket(url, maxRetries = 5) {
  const [ws, setWs] = useState(null);
  const retries = useRef(0);

  const connect = useCallback(() => {
    const socket = new WebSocket(url);
    socket.onclose = () => {
      if (retries.current < maxRetries) {
        retries.current++;
        setTimeout(connect, 1000 * retries.current);
      }
    };
    setWs(socket);
  }, [url, maxRetries]);

  useEffect(() => {
    connect();
  }, [connect]);
  return ws;
}
```
