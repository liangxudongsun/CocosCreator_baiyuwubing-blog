---
layout: post
title:  "原来这才是拷贝对象属性的正确姿势！从源码中学习 js !"
date:   2019-10-28 22:22:22 +0800
categories: javascript
tags:
    - javascript
---
> 引擎源码里富含了许多知识，之所以能成为引擎，一定有可学习的地方。让我们一起从源码里学习 js 知识吧。

# 源代码

先一起看看完整源代码。

```js
function _getPropertyDescriptor (obj, name) {
    while (obj) {
        var pd = Object.getOwnPropertyDescriptor(obj, name);
        if (pd) {
            return pd;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return null;
}

function _copyprop(name, source, target) {
    var pd = _getPropertyDescriptor(source, name);
    Object.defineProperty(target, name, pd);
}
```

`_copyprop` 这个函数就是用来拷贝对象属性，`name` 为属性名称， `source` 为要拷贝的对象，`target` 为目标对象。  

整体思路是，获取该属性在拷贝对象中的描述符，并在目标对象中定义该熟悉的描述符。如果拷贝对象中没有找到描述符，就从拷贝对象的原型链中找描述符。  

接下来，一起探究各个语法吧。  


# Object.defineProperty

语法

`Object.defineProperty(obj, prop, descriptor)`

- obj 要在其上定义属性的对象。
- prop  要定义或修改的属性的名称。
- descriptor 将被定义或修改的属性描述符
属性描述符有两种主要形式：数据描述符和存取描述符。value,writable 和 get,set 不能同时出现



|               | 数据描述符      |  存取描述符     |
| ------------- |:-------------|:--------------|
| configurable  | `true` 表示该属性描述符可以被改变，该属性可以被删除。   `false`表示该属性描述符不能改变，该属性不可删除。(仅 writable 为 true 时可修改 writable 和 value )  |
| enumerable    | 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。 |
| value         | 该属性对应的值。 |    X     |
| writable      | 当且仅当该属性的writable为true时，value才能被赋值运算符改变 |    X     |
| get           |    X          | 一个给属性提供 getter 的方法 |
| set           |    X          | 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。 |

接着看下默认值


```js
var o = {};
o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});

// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```

# Object.getOwnPropertyDescriptor

语法

`Object.getOwnPropertyDescriptor(obj, prop)`  
- obj 对象
- prop 属性名称
- 返回值 如果对象有该属性，则返回其属性描述。否则返回 `undefined`

如果存在该属性，返回的是数据描述符或存储描述符。

# Object.getPrototypeOf

语法

`Object.getPrototypeOf(object)`  

返回的是该对象的原型对象。  

原型对象可以简单的理解为，一个对象本身找不到属性时，就会在它的原型对象中查找。  

# 小结

拷贝对象属性，通过获取对象的描述符后调用 Object.defineProperty 进行拷贝。

--- 

[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

