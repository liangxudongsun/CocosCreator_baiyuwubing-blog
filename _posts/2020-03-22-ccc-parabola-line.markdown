---
layout: post
title:  "抛物线的瞄准线的绘制！ Cocos Creator! "
date:   2020-03-22 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 给平抛高抛发射添加一个瞄准线！文章底部附完整代码！

**效果预览**

![](/img/in-post/202003/22-01.gif)  

在 [如何实现高抛平抛发射？从抛物线说起！](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ) 中介绍了物体平抛或高抛发射的一种实现。这次我们为它添加一个瞄准线。  

**需求分析**

已知物体初速度`v`，重力加速度`a`，物体初始位置。求物体的运动轨迹。  

这个问题可以转换成，物体在时间`t`之后的位置在哪里。  

而抛物线运动可以分解成`x`轴匀速直线，`y`轴匀加速直线运动。  

对于`t`时刻，`x`方向的位移是
```
s = v_x * t
``` 

`y`方向的位移是
```
h = v_y * t + 0.5 * a * t * t
```   

再把位移加上初始位置，就是物体在`t`时刻的位置。  

最后，取多个时间`t`的组合，就是运动轨迹了。  

**参考代码**

```ts
const dt = 0.05;
for (let count = 0; count < 100; count++) {
    const time = dt * count;
    // s = v_x * t
    const dx = linearVelocity.x * time;
    // h = v_y * t + 0.5 * a * t * t
    const dy = linearVelocity.y * time + 0.5 * G * this.rigidBody_arrow.gravityScale * time * time;
    // 当前时间点坐标
    const targetX = START_POS.x + dx;
    const targetY = START_POS.y + dy;
    // 坐标超过地板就不画了
    if (targetY < -300) break;
    this.graphic_line.circle(targetX, targetY, 8);
}
```

> 学会思考，拆解需求，解决问题。

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"抛物线的瞄准线的绘制！"`的技术分享。如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/parabola)   
<!-- [参考文章](https://mp.weixin.qq.com/s/Qu9Uy55KvUX5sSLt_PTUJQ) -->