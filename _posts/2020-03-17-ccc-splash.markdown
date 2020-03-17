---
layout: post
title:  "物体随机飞溅运动！ Cocos Creator! "
date:   2020-03-09 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 大量物体以随机初速度的飞溅运动！文章底部附完整代码！

**效果预览**

![](/img/in-post/202003/17-01.gif)  

像火山喷发、烟花等等运动，都是物体随机飞溅运动。  

![](/img/in-post/202003/17-02.jpg)  

这个运动其实是抛物运动。

抛物运动也可以看成是匀加速运动。  

假设一个物体的初速度为`v_0`，加速度为`a`，某一个时刻`t`的速度公式如下：

```
v = v_0 + a * t
```

对这个公式作一次积分，正好是位移。

```
s = v_0 * t + 0.5 * a * t * t + C
```

常量`C`，是物体的初始位置。  

我们把物体分成`x`和`y`两个方向考虑，用上面的公式可以求出在`t`时刻的物体的位置。为此写个通用的组建控制每个物体的位置控制。主要代码如下。  

```ts
update(dt) {
    this._time += dt;
    this.node.x = this._initial_position.x + this.initial_velocity.x * this._time + this.acceleration.x * this._time * this._time / 2;
    this.node.y = this._initial_position.y + this.initial_velocity.y * this._time + this.acceleration.y * this._time * this._time / 2;
}
```

再来看看如何随机初始速度。

当然直接使用`Math.random()`可以实现。参考代码如下。

```ts
// 0-1 均匀分布
const random_a = Math.random();
const random_b = Math.random();

// 均匀分布的初速度
coin.initial_velocity.x = random_a * (V_X_MAX - V_X_MIN) + V_X_MIN;
coin.initial_velocity.y = random_b * (V_Y_MAX - V_Y_MIN) + V_Y_MIN;
```

生成的结果如下。  

![](/img/in-post/202003/17-03.gif)   

这个运行结果可能看起来不太自然。这是为什么呢？

因为自然界中的初速度不是均匀分布的，而是正态分布。  

![](/img/in-post/202003/17-04.jpg)  

如何生成正态分布的初速度？这里用到`Box-Muller`算法。这个算法是根据均匀分布的随机数来产生正态分布的随机数算法。  

![](/img/in-post/202003/17-05.jpg)   

将这个标准正态分布产生的数值进行一定的转化，可以让飞溅运动的物体的初速度 `95%` 的概率在我们的速度范围内。有小概率会超出范围，这样效果看起来就更自然了些。    

```ts
const random_a = Math.random();
const random_b = Math.random();

// box-muller 算法  r1 = sqrt(-2 * ln a) * sin(2*PI*b)    r2 = sqrt(-2 * ln a) * cos(2*PI*b)
const boxMuller_r = Math.sqrt(-2 * Math.log(random_a));
const boxMuller_t = 2 * Math.PI * random_b;
// 标准正态分布 N~(0,1)  68% 的概率 -1～1   95% 的概率 -2~2
const random_normal_x = boxMuller_r * Math.cos(boxMuller_t);
const random_normal_y = boxMuller_r * Math.sin(boxMuller_t);
// random_normal ==除以4==> 95% 的概率 -0.5～0.5  ==加0.5==> 95% 的概率 0～1
coin.initial_velocity.x = (random_normal_x / 4 + 0.5) * (V_X_MAX - V_X_MIN) + V_X_MIN;
coin.initial_velocity.y = (random_normal_y / 4 + 0.5) * (V_Y_MAX - V_Y_MIN) + V_Y_MIN;
```

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"物体随机飞溅运动！"`的技术分享。欢迎留言交流！如果这篇对你有点帮助，欢迎分享给身边的朋友。  


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/splash)   
<!-- [参考文章](https://mp.weixin.qq.com/s/qZ7CGFRmncxvQZ0Hhs4g5g) -->