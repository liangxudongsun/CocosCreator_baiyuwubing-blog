---
layout: post
title:  "为何你的弹球如丝般顺滑？不停歇的球！技术分享！源码相送！ "
date:   2019-12-17 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 最近有小伙伴玩了【不停歇的球】，问我怎么做到这个流畅度的？于是，我稍做整理，把开发中的一些点提炼出来，有了这篇文章！

![](/img/in-post/201912/17-01.png)  

不停歇的球 是在2019年年初完成的，在过年的时候放在 facebook 小游戏上线，应该是叫 firing balls 。后来在19年8月中申请了软著，10月份拿到软著后就放在微信小游戏上线了。接着在19年11月初，在头条系小游戏上线（可以在 微信/抖音/头条 搜【不停歇的球】）。

![](/img/in-post/201912/17-02.png)  

在微信上是成长版，可以通过获取星星升级提升炮台威力。

头条/抖音上是单局版，通过获取星星提升当局炮台威力。

![](/img/in-post/201912/17-03.gif)  

整个游戏主要使用的是物理引擎。除了小球的分组是 ball ，刚体类型为动态。墙和砖块的分组都是 default , 刚体类型为静态。只有小球和其它类型才会产生碰撞。

![](/img/in-post/201912/17-04.png)  

砖块的生成的规则是根据下落层数和炮台数值随机生成的，砖块的下落是每桢控制的，当位置到底线时，游戏结束。

小球的发射是根据炮台旋转角度，设置线性速度。当小球触碰底部时，回收小球。

砖块、小球、碎片、星星特效都采用对象池管理。

```
// 获取
let star_item = this._star_pool.shift();
if (!star_item) {
    star_item = cc.instantiate(this.star_ins);
    this.node_top.addChild(star_item);
}
star_item.active = true;

// 回收
star_item.active = false;
this._star_pool.push(star_item);
```

对于刚体碰撞反馈的缩放，最好采取显示节点缩放，而不是对有刚体的节点直接缩放。因为直接对刚体节点缩放时，会重新构建这个刚体依赖的全部碰撞体。

```
if (this.icon_hp_reduce.getNumberOfRunningActions() <= 0) {
    this.icon_hp_reduce.active = true;
    this.icon_hp_reduce.opacity = 255;
    this.icon_hp_reduce.runAction(cc.sequence(cc.blink(0.2, 1), cc.callFunc(() => {
        if (this.icon_hp_reduce)
            this.icon_hp_reduce.active = false;
    })));
}
```

其中有些动画用到了 Tween ，而当时的版本还没有引入 Tween 动画库。我就把白鹭中的 Tween 移植到 creator 中使用。 有需要可以参考以下文章:  
[三行代码搞定！在 2.0.9 之前版本使用 tween！cocos creator ! 附源代码！](https://mp.weixin.qq.com/s/5vlb9SdHfriEDHz85NRMeQ)    

界面、资源等管理框架采用的是 github 上一位大佬分享的，现在的版本可能和我用的有所不同，地址如下：  
https://github.com/caochao/cocos_creator_proj_base  

在 facebook 上线的过程中，曾经因为开始的载入进度条审核失败，最终通过修改载入顺序得以解决。facebook 分享的图片是用 base64 ，有需要的话可以参考以下文章。  
[为何cocos creator发布的facebook小游戏的载入进度条从0%飞向100% ](https://mp.weixin.qq.com/s/A6-ankg4AJ7fHDL1GG6Hzg)   
[cocos creator 实现截屏，截图，切割，转成 base64 ](https://mp.weixin.qq.com/s/o6o3yAqkPh5w1a8qAQL0KA)   

微信小游戏的总排行榜和用户数据的存储，采用的是微信云开发中的云函数和数据库，有需要的可以参考以下文章。
[微信云开发之排行榜的实现](https://mp.weixin.qq.com/s/cilhclfBl2BFloY3g8sY8Q)  
[用微信云开发存取用户的数据](https://mp.weixin.qq.com/s/G_JckhGsWi4EvYn4CCNBWg)  

![](/img/in-post/201912/17-05.png)  

微信好友排行榜，用的是论坛大佬给的原生方案，使用简单性能好，链接地址如下：

https://forum.cocos.org/t/topic/76743

![](/img/in-post/201912/17-06.png)  

关于微信流量主广告接入，也爬了一些小坑，有需要的话可以参考以下文章。  
[微信小游戏正式发布！什么！审核失败！流量主广告接入指南！](https://mp.weixin.qq.com/s/nYawmP9zaoXfNiPswhXlrg)  

头条系的接入和微信差不多，直接打包发布微信渠道，再接入一个视频分享，具体可以参考张哥写的这篇文章，写的很详细。  
[抖音、头条一个都不放过，字节小游戏上线攻略！](https://mp.weixin.qq.com/s/aiM23bSSv40t4TXKrVsKtQ)  

以上为白玉无冰使用 Cocos Creator v2.0.8 开发"不停歇的球"项目的技术分享。单局版的代码整理到 github 上(文末有链接)。

如果这篇文章或代码对你有帮助，欢迎将文章或游戏分享给朋友。

[2D / 3D 往期原创精选！附送 github 地址！Cocos Creator ！](https://mp.weixin.qq.com/s/heH2j642pdKSqr1E8dgAoA)  

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/firing_balls)   
[参考文章](https://mp.weixin.qq.com/s/YVB2z7wk3xjiJxartkjoOA)   