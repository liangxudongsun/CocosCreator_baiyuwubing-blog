---
layout: post
title:  "cocos creator 按需截屏转成 base64"
date:   2019-08-30 19:00:00 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> facebook小游戏分享的时候要传图片的base64码这个参数，有时需求是要截屏分享，让我们一起探索如何截屏吧。

### 何时截屏
我们要在游戏渲染完一次后截屏，*cocos creator* 提供了``cc.Director.EVENT_AFTER_DRAW``事件，这个事件是在渲染过程之后所触发的事件。由于我们只要触发一次截屏，只需要监听一次事件。  
```js
cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
    //此处开始执行截屏
});
```

### 获取游戏canvas
游戏的画布可以通过``cc.game.canvas``获取，再调用``canvas.toDataURL("image/png")``就可以获取整个游戏屏幕的base64码了。  
```js
    const canvas = cc.game.canvas;
    const base64 = canvas.toDataURL("image/png");
```

### 截取所需区域
有时我们不需要整个屏幕的，而是要截取其中的一部分。这时我们可以通过创建新的`const new_canvas = document.createElement('canvas')`,把旧的`canvas`的图切一部分放在新的`new_canvas`上，再调用``new_canvas.toDataURL("image/png")``，获取新的base64码。
![](/img/in-post/2019-08-30-ccc-clip.jpeg)  
假设我们要截取整个屏幕最中间的部分。`x`的长度刚好是`width`的0.25倍，`y`是`height`的0.25倍，`w`是`width`的0.5倍，`h`是`height`的0.5倍。  
接着用*Canvas 2D API*中的 `CanvasRenderingContext2D.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)` 在Canvas上绘制图像。
![](/img/in-post/2019-08-30-Canvas-drawimage.jpg)  

示例代码:  
```js
    const canvas = cc.game.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // 新截图占原图的比例
    const rect = {x:0.25, y:0.25, w:0.5, h:0.5};

    const w = width * rect.w;
    const h = height * rect.h;
    const x = width * rect.x;
    const y = height * rect.y;

    const new_canvas = document.createElement('canvas');
    const new_canvas_ctx = new_canvas.getContext('2d');
    new_canvas.width = w;
    new_canvas.height = h;
    new_canvas_ctx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
    const base64 = canvas.toDataURL("image/png");
```

### 微信小游戏的截图分享
*cocos creator* 发布微信项目的获取游戏canvas是基于`` wx.createCanvas()``创建的，而且绑定在全局变量``canvas``上,微信的截取所需区域分享可以用``canvas.toTempFilePathSync``和``wx.shareAppMessage``。  
示例代码:   
```js
const canvas = canvas || cc.game.canvas;
const width = canvas.width;
const height = canvas.height;
const rect = {x:0.25, y:0.25, w:0.5, h:0.5};

const w = width * rect.w;
const h = height * rect.h;
const x = width * rect.x;
const y = height * rect.y;
let tempFilePath = canvas.toTempFilePathSync({
  x: x,
  y: y,
  width: w,
  height: h,
  destWidth: w,
  destHeight: h
})
wx.shareAppMessage({
  imageUrl: tempFilePath
})
```

----
cocos creator v2.0.8