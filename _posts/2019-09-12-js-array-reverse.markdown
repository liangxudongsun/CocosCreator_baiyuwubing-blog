---
layout: post
title:  "JavaScript | 如何反转(reverse)数组(array)【译】"
date:   2019-09-12 20:00:00 +0800
categories: javascript
header-img: "img/in-post/2019-09-12-bg-js-array-reverse.png"
tags:
    - javascript
---
在javascript如何反转数组呢？如果想反转一个数组，可以使用array的方法`reverse()`⏪。接下来提供了几种方法，可以实现这个功能。你要思考的是你何时使用它而不是是否使用它😉。  
```js
const originalArray = ['a','b', 'c', 'd'];
const newArray = originalArray.reverse();
console.log(newArray);
// ['d', 'c', 'b', 'a']
```
### 修改了原数组
值得注意的是，`reverse()`会修改原数组。
```js
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reverse();

console.log(originalArray); // [ 'c', 'b', 'a' ]
console.log(newArray); // [ 'c', 'b', 'a' ]
```
### 如何在不修改原数组的情况下反转数组
让我们一起看看在不修改原数组的情况下反转数组的一些方法。👀

#### 使用 `slice` 和 `reverse`
```js
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.slice().reverse();

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```
#### 使用 `spread` 和 `reverse`
```js
const originalArray = ['a', 'b', 'c'];
const newArray = [...originalArray].reverse();

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```
#### 使用 `reduce` 和 `spread`
```js
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduce((accumulator, value) => {
  return [value, ...accumulator]
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```
#### 使用 `reduceRight` 和 `spread`
```js
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduceRight((accumulator, value) => {
  console.log(value);
  return [...accumulator, value]
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```
#### 使用`reduceRight` 和 `push`
```js
const originalArray = ['a', 'b', 'c'];
const newArray = originalArray.reduceRight((accumulator, value) => {
  accumulator.push(value);
  return accumulator;
}, []);

console.log(originalArray); // ['a', 'b', 'c']
console.log(newArray); // [ 'c', 'b', 'a' ]
```

---
原文链接🔗: [https://medium.com/dailyjs/code-recipe-how-to-reverse-an-array-in-javascript-4a0306001d28](https://medium.com/dailyjs/code-recipe-how-to-reverse-an-array-in-javascript-4a0306001d28)