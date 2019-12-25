---
layout: post
title:  "如何实现高抛平抛发射？从抛物线说起！Cocos Creator！"
date:   2019-12-24 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 游戏中经常会遇到抛物线轨迹问题，为此研究如何运用数学物理知识，实现高抛平抛效果。文章底部获取完整代码！

**效果预览：**

![](/img/in-post/201912/24-result.gif)  


先确认已知条件：
- 起点发射速度大小 `V`
- 重力加速 `G`
- 起始点与经过点


需要求出：
- 发射角度 `a`


对于抛物线运动，可以分两个方向去看。水平方向，匀速直线运动。垂直方向匀加速运动。所以可以得出以下式子：

![](/img/in-post/201912/24-01.png)  

在把 `t` 和 `v_y` 带入最后一个式子，化简整理后，可以得到一个关于 `tan a` 的一元二次方程。

![](/img/in-post/201912/24-02.png)  

再根据一元二次方程通解公式，可以解出角度的 `tan` 值。

![](/img/in-post/201912/24-03.png)  

接着使用反三角函数，求出角度的值。需要注意的是，反三角函数 `arctan` 的值域是 `(-PI/2,  PI/2)` 。这个是第一、四象限的值，在二、三象限的时候要加 180 度(PI) 。也就是说，经过点在发射点左侧时，角度要加180度(PI) 。

![](/img/in-post/201912/24-04.png)  

角度大的正好是高抛效果，而角度小的是平抛效果。

接着看看代码吧。先通过两点的坐标确定水平位移 s 和垂直位移 h 。接着根据上面化简的一元二次方程求出 `tan` 值。最后求出角度。

```
const s = location.x - START_POS.x;
const h = location.y - START_POS.y;
// a*t^2 + b*t + c = 0
const a = G * s / (2 * V * V);
const b = 1;
const c = a - h / s;
const delta = b * b - 4 * a * c;
if (delta >= 0) {
    // 一元二次方程求根公式
    const t1 = (-b + Math.sqrt(delta)) / (2 * a); // 平抛 tan 值
    const t2 = (-b - Math.sqrt(delta)) / (2 * a); // 高抛 tan 值
    // 二、四象限角度要加 180
    const alpha1 = Math.atan(t1) + (s < 0 ? Math.PI : 0);
    const alpha2 = Math.atan(t2) + (s < 0 ? Math.PI : 0);
}
```

这里用了物理引擎，初始速度需要两个方向，只需要根据发射角度和总速度大小，就可以求出两个分量速度大小。

```
const v_x_1 = Math.cos(alpha1) * V;
const v_y_1 = Math.sin(alpha1) * V;
const v_x_2 = Math.cos(alpha2) * V;
const v_y_2 = Math.sin(alpha2) * V;
// 低抛线速度 保存起来
this._linearVelocity_1.x = v_x_1;
this._linearVelocity_1.y = v_y_1;
// 高抛线速度 保存起来
this._linearVelocity_2.x = v_x_2;
this._linearVelocity_2.y = v_y_2;
```

只有线性速度还不行，还要调整各个弓箭的角度。这个角度可以根据刚体的线性速度算出。每帧修改弓箭刚体节点的角度即可。

```
// 计算夹角
const angle = rigidBody.linearVelocity.clone().signAngle(cc.v2(1, 0));
rigidBody.node.rotation = angle * 180 / Math.PI;
```

如何控制箭不停发射？添加一个定时器就可以不停发射弓箭了。

```
this.schedule(this.fireArrow, 0.5, cc.macro.REPEAT_FOREVER);
```

根据不同的发射方式，选择不同的发射线性速度就可以了。

```
private _index = 0;
private fireArrow() {
    const linearVelocity = this.toggle_arrow.isChecked ? this._linearVelocity_2.clone() : this._linearVelocity_1.clone()
    const rigidBody_arrow = this._all_arrows[this._index++ % this._all_arrows.length];
    rigidBody_arrow.node.setPosition(START_POS);
    rigidBody_arrow.linearVelocity = linearVelocity;
}
```

以上为白玉无冰使用 Cocos Creator 开发"平抛高抛发射"的技术分享。有想法欢迎留言！如果这篇对你有点帮助，欢迎分享给身边的朋友。

---

![](/img/in-post/bottom.png)  

---

[试玩链接](http://lamyoung.gitee.io/web/parabola/)   
[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/parabola)   
[参考文章](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)   