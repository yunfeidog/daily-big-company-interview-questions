---
title: MySQL的索引类型有哪些?
date: 2025年3月31日
tag:
- 后端
- MySQL
---


# MySQL索引类型总结

## 从数据结构角度分类

| 索引类型 | 特点 | 适用场景 | 常用引擎 |
|---------|------|---------|---------|
| B+树索引 | 通过树形结构存储数据，支持有序数据的快速查找 | 范围查询(BETWEEN)和精确查询(=)，排序和聚合操作 | InnoDB, MyISAM (MySQL默认索引类型) |
| 哈希索引 | 基于哈希表结构，查询速度非常快 | 等值查询(=)，不支持范围查询(>、<) | Memory引擎 |
| 倒排索引(全文索引) | 将全文分词，存储词与文档的映射 | 模糊匹配和关键字搜索，适合大文本字段(TEXT类型) | 用于全文搜索 |
| R-树索引 | 为多维空间数据设计 | 空间查询(地理位置最近距离、区域查询) | 用于GIS地理信息系统 |

## 从InnoDB B+树索引角度分类

| 索引类型 | 特点 | 存储内容 | 数量限制 |
|---------|------|---------|---------|
| 聚簇索引 | 基于主键排序存储 | 叶子节点存储完整数据行 | 每表只能有一个(主键索引) |
| 非聚簇索引 | 又称二级索引或辅助索引 | 叶子节点仅保存索引字段和主键值 | 一个表可有多个，查询完整数据需回表 |

## 从索引性质角度分类

| 索引类型 | 特点 | 使用场景 | 限制条件 |
|---------|------|---------|---------|
| 普通索引 | 非主键索引且非唯一索引 | 提高常规查询性能 | 无特殊限制 |
| 主键索引 | 表中每行数据唯一标识 | 唯一标识记录，提高查询效率 | 每表只能有一个，值不能为NULL |
| 联合索引 | 由多个列组成，按指定顺序排列 | 多条件查询 | 需考虑最左前缀匹配原则 |
| 唯一索引 | 保证索引列值唯一 | 防止重复数据插入 | 允许NULL值，但一列中只能有一个NULL |
| 全文索引 | 支持对长文本字段的关键字查找 | 文本内容复杂搜索 | 适用于TEXT类型字段 |
| 空间索引 | 用于空间数据查询 | 地图经纬度坐标等多维数据查询 | 主要用于MyISAM和InnoDB的地理信息数据 |
