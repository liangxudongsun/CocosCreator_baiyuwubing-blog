---
layout: post
title:  "物理挖洞！3D 效果！Cocos Creator ! "
date:   2020-05-21 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 群内小伙伴各个都是人才，挖洞挖出新深度。  

首先，感谢大佬 `@菠萝菠萝` 在[初探精灵中的网格渲染模式 ！](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)留言，提供思路。   

![](/img/in-post/202005/21-05.jpg)   

另一位群友 `@云谷` 在思路指导下，迅速写了一个版本，传到群里给大家分享，再次感谢！  

![](/img/in-post/202005/21-06.jpg)   

最后，白玉无冰再次整理，转成 `TypeScript` 代码.   

看看最终效果。  

![](/img/in-post/202005/21-01.gif)   

这边大致捋捋思路，分享一下这个3d效果是怎么实现的。  

首先挖洞思路还是使用[挖洞-另一种实现](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q)。   

![](/img/in-post/202005/10-02.jpg)     

接着使用[使用 mesh 实现多边形裁剪图片](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w) 中介绍的 `cc.MeshRenderer`。对多边形的边画一个圆筒。    

![](/img/in-post/202005/21-02.jpg)   

就是对我们计算出来的多边形的每一条边，往 `Z轴` 方向画一个长方形，长方形围起来就是一个圆筒了。  

默认摄像机是正交投影，是看不到 `Z轴` 的长方形的。所以要创建一个透视投影的摄像机。   

![](/img/in-post/202005/21-03.jpg)   

为了使土壤的层级在洞之上，这里加了两个摄像机。  

![](/img/in-post/202005/21-04.jpg)   

当然，具体代码使怎么写，见文章底部！(因为我还没细看)，欢迎加群(`859642112`)一起讨论！     

另外，群内的 `@吴先生` 还提供了一种分割矩形的思路，供大家一起学习参考。  

![](/img/in-post/202005/21-07.jpg)   


以上为白玉无冰使用 `Cocos Creator v2.3.3` 关于 `"物理挖洞！3D 效果！"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。   


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/dig_hole_3d)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   