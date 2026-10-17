# 开源在线商城系统二次开发实验

基于 Medusa DTC Starter 的二次开发项目，实现浏览→购物车→结算→订单闭环，并新增"销量排行（Best Sellers）"自主功能。

## 技术栈

- 后端：Medusa 2.20.1（Node.js 22 / PostgreSQL 16）
- 前端：Next.js 15.5.2 / Tailwind CSS
- 数据库：PostgreSQL 16
- 包管理：pnpm 10

## 环境要求

| 软件 | 版本 |
|---|---|
| Node.js | v22.23.3+ |
| pnpm | 10.11.1+ |
| PostgreSQL | 16.x |

## 数据库配置

创建数据库和用户：

```sql
CREATE USER medusa_user WITH PASSWORD 'medusa123';
CREATE DATABASE medusa_db OWNER medusa_user;
- 版本：v1.0.0
