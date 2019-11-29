---
layout: post
title:  "cocos creator 3D | 拇指投篮 "
date:   2019-11-28 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 你的命中率是多少呢？文章底部试玩！

![](/img/in-post/201911/1128-bg.jpg)  

# 效果预览

![](/img/in-post/201911/1128-result.gif)  

### 配置环境：

Cocos Creator 3D v1.0.1  

### 玩法说明：

触摸屏幕，向上滑动投篮！注意篮板是会移动的哦！看看你的命中率是多少！  



# 实现原理

为了能达到好的投篮效果，在网上找了一个投篮机参数，大致按照实际参数设置篮框大小，球的大小，以及篮框的位置。

![](/img/in-post/201911/1128-machine.png)  

### 碰撞器：

篮板直接使用 盒碰撞器组件（BoxColliderComponent），篮球使用的是 球碰撞器组件（SphereColliderComponent）。  

![](/img/in-post/201911/1128-hoop.png)  

![](/img/in-post/201911/1128-basketball.png)  


因为没有 圆环碰撞器组件，所以对于篮球框用了多个 球碰撞器组件 实现碰撞检测。  

![](/img/in-post/201911/1128-hoop-2.png)  


### 小球轨迹：

由于完全采用了物理引擎计算，要让小球轨迹如我们所预期一样，得遵循物理原理。这里需要的知识是 位移与加速度、速度、时间的关系。  

![](/img/in-post/201911/1128-path.png)  

我们可以分为三个方向来考虑，需要计算初始速度 V_z 和 V_y 。在 Z 轴方向可以看作匀速运动，Y 轴方向为匀加速运动。其中 Z 轴 和 Y 轴 的位移我们已经设定好了，我们只需要设定抛球时间 t 就可以计算出初速度。注意 Y 轴的末速度要满足与初速度相反，才能达到图中抛物线的效果哦。参考计算方式如下：  

```
const CONST_H = 1.25;
const CONST_S = 2.3;
const CONST_G = -10;
const CONST_T = 0.8;
const CONST_V_Z = CONST_S / CONST_T;
const CONST_V_Y = CONST_H / CONST_T - CONST_G * CONST_T / 2;
```

初始速度 V_x 可以根据触摸开始的位置 x 和触摸结束的位置 x 的差值乘以一个系数来获取。

### 进球判断：

我是在篮球框下方添加一个碰撞器检测。再通过分组和掩码控制碰撞器的开关。发射前，打开碰撞检查，投进时，关闭碰撞检测，让球往下掉。

![](/img/in-post/201911/1128-target.png)    

只要以下条件为真就会进行碰撞检测。    

```
(GroupA & MaskB) && (GroupB & MaskA)
```  

经测试发现，默认的 Mask 为 -1 (即每一位都是1)，默认的 Group 为  1 。 所以只要将 MaskB 设置为  2  (即只有第二位为1，其余为0 ) ，通过控制 GroupA 第二位可以控制碰撞器开关。参考代码如下：  

```
const PHY_GROUP = {
    Group1: 1 << 1
}

// 设置篮框碰撞器mask
this.colliderComponent_goal.setMask(PHY_GROUP.Group1)

// 打开碰撞，设置球的group
this.colliderComponent_basketball.addGroup(PHY_GROUP.Group1)

// 关闭碰撞，设置球的group
this.colliderComponent_basketball.removeGroup(PHY_GROUP.Group1)
```

# 小结

小球轨迹通过基本的物理知识分析得出初始速度！得分判断采用的是碰撞器检测，并控制其检测开关让球继续运动。如果你有更好的方法或想法，欢迎留言分享交流！  

以上为白玉无冰使用 Cocos Creator 3D 开发"拇指投篮"项目的主要技术分享，欢迎关注【白玉无冰】公众号。公众号内回复【拇指投篮】可获取完整代码。  

---

![](/img/in-post/bottom.png)  

---

本文使用图片素材来自网络！版权归原作者所有，如有侵权还请联系！

[在线试玩](http://lamyoung.gitee.io/web/fingerBasketball)   
[源码获取](https://mp.weixin.qq.com/s/VsbNtTL64J0xHIlhMUHCcQ)  