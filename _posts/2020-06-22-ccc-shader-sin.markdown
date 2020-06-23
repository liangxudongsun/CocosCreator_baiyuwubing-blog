---
layout: post
title:  "shader 动画之旗子/水纹波浪 ！Cocos Creator ! "
date:   2020-06-22 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 顶点动画、正弦、波长、振幅、周期。   

# 效果预览

![](/img/in-post/202006/22-01.gif)   


# 使用步骤

新建材质 `Material` ， 选择对应的 `Effect` ，调整参数。      

![](/img/in-post/202006/22-02.jpg)   

在场景中新建一个精灵(`Sprite`) ， `SpriteFrame` 选取一个超小的图片。渲染模式选择平铺(`TILED`)，修改节点大小。材质选择上面创建的材质。   

![](/img/in-post/202006/22-03.jpg)   

预览就能看到这张图片动起来了。      

# 实现原理

为什么选择平铺模式可以实现这个效果呢？  

简单的 `Sprite` 通常是4个顶点。  

而通过 Cocos 源码中发现，`Sprite` 的平铺渲染模式的 `webgl` 实现是平铺顶点网格。平铺的数量越多，顶点越多。  

所以，只要这张图片足够小的话，这个网格就越密集。   

![](/img/in-post/202006/22-04.jpg)   

如何产生波动效果？   

这里用到正弦波公式  `y = A sin{ 2π ( t/T - x/λ ) }` ，就能实现波动效果。  

![](/img/in-post/202006/22-05.jpg)   

所以，使用 `sin` 函数，对每一个顶点的位置坐标做一次偏移，就能达到波动效果啦～   

顶点着色器主要代码如下。  

```glsl
void main () {
    vec4 pos = vec4(a_position, 1);
    // y = A sin{ 2π ( t/T - x/λ ) }
    pos.y = pos.y + sin_A*sin(2.0*3.141592653*(cc_time.x/sin_T - pos.x/sin_lamda));
    // 省略代码
}
```

使用 `Sprite` 的平铺渲染模式有一个限制条件就是这个纹理要比较简单且可以重复使用，例如这种纯色的波动效果。  

如果要使用复杂的纹理波动可以用以下几种方法。

1. 使用 `Sprite 的网格(Mesh)渲染模式`，自定义顶点数据，可以参考 [初探精灵中的网格渲染模式](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg) 。   
2. 使用 `cc.MeshRenderer` 组织顶点数据，参考 [飘扬的旗帜！shader 编程实战！](https://mp.weixin.qq.com/s/E5ZjzIFozvPRIIytmtiuTQ)   

![](/img/in-post/202006/22-06.jpg)   


# 更多精彩

[█    物理挖洞之分块    █](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   [█    渐变色的实现    █](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)   [█    画线纹理之绳子    █](https://mp.weixin.qq.com/s/QvJ2DHFhUxO3doNviCqBIg)   [█    精灵之网格模式    █](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)   [█    shader动画 之loading    █](https://mp.weixin.qq.com/s/QhKzmtpwiQgOzsGPcBHSJQ)   [█    js的三位一体    █](https://mp.weixin.qq.com/s/6wq5ekTtyF_LO_oFBb1vRA)   [█    shader 之攻击闪白    █](https://mp.weixin.qq.com/s/3_ShiqpcJDsBcgeszAMT3Q)  [█    物理流体(欢乐水杯)    █](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w)   [█    瞄准线之抛物线    █](https://mp.weixin.qq.com/s/Z-7zQuvjIaBzyQRJslH7bQ)   [█    随机(正态分布)飞溅运动    █](https://mp.weixin.qq.com/s/Qu9Uy55KvUX5sSLt_PTUJQ)   [█    贪吃蛇之平滑移动    █](https://mp.weixin.qq.com/s/qZ7CGFRmncxvQZ0Hhs4g5g)   [█    雷达图的实现  █](https://mp.weixin.qq.com/s/hgybmgTHlga0KgHfz1vIfg)  [█    分形着色器    █](https://mp.weixin.qq.com/s/OuQaI18LwX3Lw7aRcKjDOw)  [█    shader 之过渡    █](https://mp.weixin.qq.com/s/tN2Al3kfo4HwIBGXNjmEDA)   [█    初探 gizmo 使用    █](https://mp.weixin.qq.com/s/YjH9PAWvtgPiDGxp9y7big)   [█    shader 之卷积滤镜    █](https://mp.weixin.qq.com/s/WAajs8p69X8UJFvNiYuNDA)   [█    旗帜效果(meshRenderer)    █](https://mp.weixin.qq.com/s/E5ZjzIFozvPRIIytmtiuTQ)   [█    多边形裁剪(meshRenderer)    █](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w)   [█    高抛平抛发射    █](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)   [█    水纹效果(片元着色器)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   [█    2019年原创(黑历史)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   

# 小结  
  
> `y = A sin{ 2π ( t/T - x/λ ) }`

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`" shader 动画之旗子/水纹波浪效果！"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

> 每个人都必定在某一方面胜于我，因此我向所有人学习。    -- 《人性的弱点》

---

![](/img/in-post/bottom.png)  

---

<!-- [原文链接](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)    -->
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   