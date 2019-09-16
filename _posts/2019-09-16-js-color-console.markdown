---
layout: post
title:  "JavaScript | 为你的日志添加颜色🌈【译】"
date:   2019-09-16 22:22:22 +0800
categories: javascript
header-img: "img/in-post/post-bg-javascript.png"
tags:
    - javascript
---
![](/img/in-post/2019-09-16-bg-js-color-console.png) 
在`console`里添加`%c`说明符👩‍🎨。这可以帮助你很容易找到你要打印的日志👾。特别是在一个有着成千上万个日志的大型应用中，给你的日志假上样式，就不会让你重要的日志埋没。或者说，这可以提醒人们离开控制台。就像在facebook网站中，你打开控制台，会见到一个大大的红色的*Stop!*。现在你应该懂得它的用处了💥。
```js
// 在你的浏览器里的控制台输入
console.log('%cHello', 'color: green; background: yellow; font-size: 30px');
```
![](/img/in-post/2019-09-16-js-color-console-hello.png) 

### `%c`是什么
你可以使用`%c`为打印内容定义样式，在它之前的内容不会被影响，而会影响后面的内容。

### 使用多个样式
想要使用多个样式，你只需在你想要的日志前加上`%c`。在这之后的日志就会根据后面样式的顺序显示。
```js
console.log(
  'Nothing here %cHi Cat %cHey Bear',  // Console 日志
  'color: blue', 'color: red' // CSS 样式
);
```
![](/img/in-post/2019-09-16-js-color-console-mul.png) 

### 为其他的 `console` 加样式
还有5种方式打印日志：

- `console.log`
- `console.info`
- `console.debug`
- `console.warn`
- `console.error`

同样的，你也可以为他们加上样式。
```js
console.log('%cconsole.log', 'color: green;');
console.info('%cconsole.info', 'color: blue;');
console.debug('%cconsole.debug', 'color: yellow;');
console.warn('%cconsole.warn', 'color: fuchsia;');
console.error('%cconsole.error', 'color: red;');
```
![](/img/in-post/2019-09-16-js-color-console-other.png) 

### 使用数组传入 CSS 样式
当你的样式比较复杂的时候，用字符串表示样式会特别长。有个漂亮的写法是用数组和`join()`方法连成字符串。

```js
// 1. 用数字保存
const styles = [
  'color: green', 
  'background: yellow', 
  'font-size: 30px',
  'border: 1px solid red',
  'text-shadow: 2px 2px black',
  'padding: 10px',
].join(';'); // 2. 链接成字符串

// 3. 传入样式
console.log('%cHello There', styles);
```
![](/img/in-post/2019-09-16-js-color-console-array.png) 


### 结合 `%s` 一起使用
同样也可以结合 `%s` 一起使用。
```js
const styles = ['color: green', 'background: yellow'].join(';');
const message = 'Some Important Message Here';
// 3. 传入样式和日志
console.log('%c%s', styles, message);
```
![](/img/in-post/2019-09-16-js-color-console-s.png)

---