---
order: 61
title: Go与gRPC
module: go
category: Go
difficulty: intermediate
description: gRPC服务开发
author: fanquanpp
updated: '2026-06-14'
related:
  - go/unsafe与指针
  - go/内存对齐
  - go/Go与GraphQL
  - go/Go与Docker
prerequisites:
  - go/概述与环境配置
---

## 1. gRPC 服务

```go
type GreeterServer struct { pb.UnimplementedGreeterServer }

func (s *GreeterServer) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
  return &pb.HelloReply{Message: "Hello " + req.Name}, nil
}

lis, _ := net.Listen("tcp", ":50051")
grpc.NewServer().Serve(lis)
```
