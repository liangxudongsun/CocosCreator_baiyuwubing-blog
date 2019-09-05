---
layout: post
title:  "为何使用 JavaScript Symbols 【译】"
date:   2019-09-05 19:00:00 +0800
categories: javascript
header-img: "img/in-post/post-bg-javascript.png"
tags:
    - javascript
---
*Symbols* 是*javascript*最新的基本数据类型(primitive)，并带来了一些好处，特别是作为object的标识符(properties)的时候。可是，这个和用*string*作为标识符有什么特别的呢？  

在我们研究*Symbols*之前，我们先看看许多开发者没有注意到的*javascript*的一些特性。  

### 背景
*Javascript*主要可以分为两大类。第一类是基本数据类型(primitives)，第二类是对象(Object)(包含函数)。基本数据类型包括数字(Number)(所有的整数，小数，`Infinity` 和 `NaN`)，布尔值(Boolean)，字符串(String)， `undefined` ， `null`  (注意⚠️: 虽然 ``typeof null === 'object'``，但`null`仍是基本数据类型)。  

基本数据类型是不可修改的。当然一个被基本数据赋值的变量(variable)可以重新被赋值。例如，``let x = 1; x++;``，这里是重新对变量`x`赋值，并没有修改基本类型数字`1`。  

像一些语言(如C语言)一样，javascript也有引用传递(pass-by-reference)和值传递(pass-by-value)的概念。当你给一个函数传值的时候，在函数内重新赋值(reassign)时不会修改原来那个值，然而*修改(modify)*一个非基本数据类型(non-primitive)时，原来那个数值也会被修改。可以看下面例子:  
```js
function primitiveMutator(val) {
  val = val + 1;
}
let x = 1;
primitiveMutator(x);
console.log(x); // 1
function objectMutator(val) {
  val.prop = val.prop + 1;
}
let obj = { prop: 1 };
objectMutator(obj);
console.log(obj.prop); // 2
```  

当基本数据类型的值相等时，这个变量总是完全相等的（除了`NaN`）。  
```js
const first = "abc" + "def";
const second = "ab" + "cd" + "ef";
console.log(first === second); // true
console.log(NaN === NaN); // false
```
然而，非基本数据类型(non-primitive)却不是这样。
```js
const obj1 = { name: "Intrinsic" };
const obj2 = { name: "Intrinsic" };
console.log(obj1 === obj2); // false
// 他们 name 属性是 基本数据类型
console.log(obj1.name === obj2.name); // true
```  

在javascript中对象(Object)是一个重要的角色，在任何地方都能见到它的身影。Object通常包含了许多键值(key/value)。当symbols还没出现的时候，Object的键(key)只能是字符串(String)，这个给Object带来了一些限制。当使用一个非字符串(non-string)作为Object的key时，这个值会被转成字符串。例如:  
```js
const obj = {};
obj.foo = 'foo';
obj['bar'] = 'bar';
obj[2] = 2;
obj[{}] = 'someobj';
console.log(obj);// { '2': 2, foo: 'foo', bar: 'bar', '[object Object]': 'someobj' }
```
> 注意⚠️: `Map` 可以允许 key 不是字符串。

### Symbol 是什么
现在我们已经知道基本数据类型(primitive)是什么了。一个Symbol是不能重复创建的基本数据类型。也就是说,一个symbol可以类似一个对象的实例，是不会相等的。就是说每一个symbol是唯一的基本数据类型。例如:
```js
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false
```  
当初始化一个symbol时可以传一个字符串对象。这个字符串可以在调试的时候使用，并不会影响symbol的唯一性。
```js
const s1 = Symbol('debug');
const str = 'debug';
const s2 = Symbol('debug');
console.log(s1 === str); // false
console.log(s1 === s2); // false
console.log(s1); // Symbol(debug)
```
> 注意⚠️: ``Symbol.for`` 是全局创建，它会首先检查给定的 key 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。

### Symbols 作为对象属性的标识符
Symbols有个很重要的用法，他们可以作为对象的keys。例如:
```js
const obj = {};
const sym = Symbol();
obj[sym] = 'foo';
obj.bar = 'bar';
console.log(obj); // { bar: 'bar' }
console.log(sym in obj); // true
console.log(obj[sym]); // foo
console.log(Object.keys(obj)); // ['bar']
```

注意到``Object.keys()``不会返回Symbol。第一眼看上去，symbols可以作为Object的私有变量。许多语言有私有变量，而javascript没有。可惜的是，还是有办法访问到symbol作为Object的key的值。例如， `Reflect.ownKeys()`方法可以列出Object的包括string和symbol的所有key。
```js
function tryToAddPrivate(o) {
  o[Symbol('Pseudo Private')] = 42;
}
const obj = { prop: 'hello' };
tryToAddPrivate(obj);
console.log(Reflect.ownKeys(obj)); // [ 'prop', Symbol(Pseudo Private) ]
console.log(obj[Reflect.ownKeys(obj)[1]]); // 42
```

### 防止标识符冲突
Symbols可能不能直接给Object添加私有属性。但是，在给Object加属性标识符可以防止名字冲突，这起到非常重要的作用。 例如，有两个库想要给一个对象加一个自己的唯一标识符号，这两个库都用字符串`id`作为key，这里会产生很大的危险许多库用着同样的key.  
```js
function lib1tag(obj) {
  obj.id = 42;
}
function lib2tag(obj) {
  obj.id = 369;
}
```
使用symbol作为key就不会有这个冲突了。
```js
const library1property = Symbol('lib1');
function lib1tag(obj) {
  obj[library1property] = 42;
}
const library2property = Symbol('lib2');
function lib2tag(obj) {
  obj[library2property] = 369;
}
```
如果我们用symbol作为一个对象的key，`JSON.stringify`不会包含这个值。这是因为javascript支持symbol并不意味着JSON也支持。JSON只允许用字符串作为key的对象。但定义`enumerable`为false时，当字符串的key也会被隐藏，就像symbol一样。他们都会在``Object.keys``和`JSON.stringify`中隐藏，在``Reflect.ownKeys()``会列出。例如:
```js
const obj = {};
obj[Symbol()] = 1;
Object.defineProperty(obj, 'foo', {
  enumberable: false,
  value: 2
});
console.log(Object.keys(obj)); // []
console.log(Reflect.ownKeys(obj)); // [ 'foo', Symbol() ]
console.log(JSON.stringify(obj)); // {}
```

### 小结
每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符,这个值在``Object.keys``和`JSON.stringify`是隐藏的，在``Reflect.ownKeys()``会列出。

