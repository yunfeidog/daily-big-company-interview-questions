---
title: MySQL 中的事务隔离级别有哪些?
date: 2025年4月1日
tag:
- 后端
- MySQL
---

# MySQL 事务隔离级别

MySQL 提供了四种事务隔离级别，用于控制多个事务并发执行时的行为。隔离级别从低到高分别为：读未提交、读已提交、可重复读和串行化。

## 事务并发问题

在了解隔离级别前，先了解事务并发可能导致的问题：

### 脏读 (Dirty Read)
- **定义**：一个事务读取到另一个事务未提交的数据
- **示例**：事务A修改数据但未提交，事务B读取了这个修改后的值，之后事务A回滚，事务B读取的数据成为"脏数据"

### 不可重复读 (Non-repeatable Read)
- **定义**：同一事务内，多次读取同一数据得到不同结果
- **示例**：事务A两次读取同一行数据，但在两次读取之间，事务B修改并提交了该行数据

### 幻读 (Phantom Read)
- **定义**：同一事务内，相同查询条件下，读取到了之前不存在的行
- **示例**：事务A查询某个范围的数据，事务B在该范围内插入新行并提交，事务A再次查询时发现了新行

## 四种隔离级别详解

### 1. 读未提交 (READ UNCOMMITTED)

#### 概念
最低级别的隔离，允许事务读取未被其他事务提交的数据变更。

#### 可能发生的问题
- ✅ 脏读：可能发生
- ✅ 不可重复读：可能发生
- ✅ 幻读：可能发生

#### 实际开发案例
```sql
-- 用于非关键数据的高并发统计场景
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN;
-- 获取实时访问量计数，允许一定的数据不精确性
SELECT COUNT(*) FROM page_views WHERE date = CURDATE();
COMMIT;
```

#### 适用场景
- 对数据一致性要求不高的查询统计
- 实时报表生成
- 临时性数据查看

### 2. 读已提交 (READ COMMITTED)

#### 概念
只允许读取已经提交的数据，是Oracle、SQL Server和PostgreSQL的默认隔离级别。

#### 可能发生的问题
- ❌ 脏读：不会发生
- ✅ 不可重复读：可能发生
- ✅ 幻读：可能发生

#### 实际开发案例
```sql
-- CRM系统中查看客户信息
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
-- 每次查询都能看到最新已提交的客户信息
SELECT * FROM customers WHERE customer_id = 1001;
-- 如果此时其他事务修改了客户信息并提交
-- 再次查询将返回不同的结果
SELECT * FROM customers WHERE customer_id = 1001;
COMMIT;
```

#### 适用场景
- 普通的查询操作
- 需要获取最新已提交数据的业务场景
- 读多写少的数据分析场景

### 3. 可重复读 (REPEATABLE READ)

#### 概念
MySQL的默认隔离级别，确保同一事务内多次读取同样数据返回结果一致。

#### 可能发生的问题
- ❌ 脏读：不会发生
- ❌ 不可重复读：不会发生
- ✅ 幻读：可能发生（MySQL通过MVCC多版本并发控制和间隙锁在一定程度上解决了幻读问题）

#### 实际开发案例
```sql
-- 订单系统中处理订单
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
-- 查询用户账户余额
SELECT balance FROM accounts WHERE user_id = 100;
-- 执行业务逻辑...
-- 无论其他事务如何修改user_id=100的余额，此事务中再次查询仍返回相同结果
SELECT balance FROM accounts WHERE user_id = 100;
-- 扣减余额
UPDATE accounts SET balance = balance - 100 WHERE user_id = 100;
COMMIT;
```

#### 适用场景
- 银行转账系统
- 库存管理系统
- 需要事务内数据一致视图的业务场景

### 4. 串行化 (SERIALIZABLE)

#### 概念
最高的隔离级别，通过完全锁定读取的行，强制事务串行执行。

#### 可能发生的问题
- ❌ 脏读：不会发生
- ❌ 不可重复读：不会发生
- ❌ 幻读：不会发生

#### 实际开发案例
```sql
-- 金融交易系统中的关键结算操作
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- 查询并锁定所有相关账户
SELECT * FROM financial_accounts WHERE transaction_date = CURRENT_DATE FOR UPDATE;
-- 进行清算操作
UPDATE financial_accounts SET status = 'SETTLED' WHERE transaction_date = CURRENT_DATE;
COMMIT;
```

#### 适用场景
- 金融系统的关键交易
- 数据一致性要求极高的应用
- 低并发、高安全性要求的场景

## 隔离级别比较表

| 隔离级别 | 脏读 | 不可重复读 | 幻读 | 并发性能 | 默认使用 |
|----------|------|------------|------|----------|----------|
| 读未提交 | 是 | 是 | 是 | 最高 | - |
| 读已提交 | 否 | 是 | 是 | 高 | Oracle, SQL Server |
| 可重复读 | 否 | 否 | 部分解决 | 中等 | MySQL |
| 串行化 | 否 | 否 | 否 | 最低 | - |

## 设置隔离级别

### 全局设置
```sql
-- 查看当前系统默认隔离级别
SELECT @@global.transaction_isolation;

-- 设置全局默认隔离级别
SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

### 会话设置
```sql
-- 查看当前会话隔离级别
SELECT @@session.transaction_isolation;

-- 设置当前会话隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

## 开发建议

1. **默认使用可重复读**：MySQL 默认的可重复读级别已经能满足大多数应用场景
2. **按需调整**：高并发查询可考虑读已提交，极高安全性场景可考虑串行化
3. **避免长事务**：任何隔离级别下，都应避免长时间运行的事务
4. **考虑锁机制**：合理使用行锁、表锁和意向锁来控制并发访问
5. **定期监控**：关注数据库锁等待和死锁情况，及时调整隔离级别或优化SQL

---

**注意**：隔离级别越高，数据一致性保证越好，但并发性能越低。实际应用中需要根据业务需求和性能要求进行权衡选择。
