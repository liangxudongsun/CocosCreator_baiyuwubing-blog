---
layout: post
title:  "5分钟内学会几个JavaScript的巧妙小技巧【译】"
date:   2019-09-24 22:22:22 +0800
categories: javascript
header-img: "img/in-post/2019-09-24-js-tricks.png"
tags:
    - javascript
---
> 专业人员使用的省时技术

![](/img/in-post/2019-09-24-js-tricks.png) 

### 1. 清除或截断数组
在不重新分配数组的情况下清除或截断数组的一种简单方法是修改`length`属性值：
```js
const arr = [11, 22, 33, 44, 55, 66];
// 截断
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// 清除
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined
```

### 2. 使用对象解构声明参数
当传一组变量选项传递给某些函数时，可能需要一些默认值，如下所示：
```js
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
  // ...
}
```
这是一种旧的但有效的模式，函数调用看起来正常。但是，这样非常冗长。可以使用 ES2015 对象解构，您可以规避此缺点：
```js
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}
```
如果使得参数可选，也可以这样：
```js
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}

```
### 3. 数组项的对象析构
将数组项分配给具有对象解构的单个变量：
```js
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');
```
![](/img/in-post/2019-09-24-js-trick-3.png) 

### 4. switch 语句中使用范围
下面是在 switch 语句中使用范围的简单技巧：
```js
function getWaterState(tempInCelsius) {
  let state;
  switch (true) {
    case (tempInCelsius <= 0): 
      state = 'Solid';
      break;
    case (tempInCelsius > 0 && tempInCelsius < 100): 
      state = 'Liquid';
      break;
    default: 
      state = 'Gas';
  }
  return state;
}
```

### 5. 等待多个异步功能
可以使用 `Promise.all` 等待多个异步函数来完成：
```js
await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
```

### 6. 创建纯对象
您可以创建 100% 纯对象，该对象不会从 `Object` 继承任何属性或方法（例如，`constructor`、`toString()`等）。
```js
const pureObject = Object.create(null);
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```

### 7. 格式化 JSON 代码
`JSON.stringify` 可以不仅仅将对象转成字串化，还可以使用它美化 JSON 输出：
```js
const obj = { 
  foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } } 
};
JSON.stringify(obj, null, 4); 
```
![](/img/in-post/2019-09-24-js-trick-7.png) 

### 8. 从数组中删除重复项
使用 ES2015 的 `Set`和`...`，可以轻松地从数组中删除重复项：
```js
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, "foo", true]
```

### 9. 拼合多维数组
使用 ES2015 的 `concat`和`...`，可以轻松地拼合多维数组：
```js
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); //=> [11, 22, 33, 44, 55, 66]
```
可惜的是，上述技巧仅适用于二维数组。但是，可以使用递归调用，适用于二维以上的数组：
```js
function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? 
    flattenArray(flattened) : flattened;
}
const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr); 
//=> [11, 22, 33, 44, 55, 66, 77, 88, 99]
```

现在你已经掌握了这些技巧！我希望这些巧妙的小技巧可以帮助你写更好，更漂亮的JavaScript。

----
[原文链接🔗](https://medium.com/free-code-camp/9-neat-javascript-tricks-e2742f2735c3){:target="_blank"}