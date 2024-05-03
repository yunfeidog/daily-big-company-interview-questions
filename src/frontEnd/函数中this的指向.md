---
title: this指向
date: 2024-05-03
tag:
  - 前端
  - javascript
---

**在js的函数中，this的指向遵循什么规则？**

::: tip this指向原则
在函数内部，有一个特殊的对象——`this`.它在标准函数中和箭头函数中有着不同的行为。

在标准函数中，this引用的是把函数当做方法调用的上下文对象。

在箭头函数中，this引用的是函数定义时的上下文对象。
:::

代码题：  
1. 4秒后，p.age 是多少？
```js
function Person() {
    this.age = 20;
    setInterval(function growUp() {
        this.age++;
    }, 1000);
}

const p = new Person();
setTimeout(function logAge() {
    console.log(p.age);
}, 4000);
```

2. 以下代码中，调用g()时打印的值是什么？
```js
var obj = {
    num: 2,
    method: function() {
        return function() {
            return this.num;
        };
    }
};
var globalNum = 10;
var g = obj.method();
console.log(g());

```

第一题答案：  
这个问题的答案实是20。这是因为setInterval里的growUp函数并没有绑定到Person实例上，而是作为一个普通函数调用，这导致this指向全局对象（浏览器环境下是window），而不是Person的实例。所以，this.age++实际上是在增加window.age的值，而p.age的值没有改变，依旧是初始值20。

第二题答案：  
由于返回的函数是在全局作用域中调用的，所以其中的this指向全局对象（浏览器环境下是window）。在window对象中没有定义num属性，所以结果是undefined。
