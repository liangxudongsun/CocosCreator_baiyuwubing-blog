---
layout: post
title:  "Cocos Creator 3.0 教程! 标志板！ Billboard !"
date:   2020-12-22 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

>  用2D素材节省包体！节约性能！

# 前言

标志板是什么呢？

`billboard` 英文翻译为广告牌，标志板和广告牌肯定会有不可告人的联系！ 

广告牌的使命是什么？就是无论你在哪里，都要让你看到！

标志板也是这个意思！无论你(摄像机)怎么看，这个板永远朝向着你！

![摘自《OpenGLES2.0游戏开发(上卷)》](/img/in-post/202012/22-01.png)    

> 以上纯属个人理解，不构成正确的定义。

标志板可以以低廉的成本呈现出还不错的效果，例如场景中大量出现的草(一种植物)、树和金币等。  

![Cocos Creator 3.0 Preview](/img/in-post/202012/22-02.gif)    

一起看看，我们这最终实现的效果，可以看到随着视角(摄像机)的转动，金币和logo都是一直朝着我们的。

![效果预览](/img/in-post/202012/22-03.gif)    



# 使用

> 此组件并未在线上实际项目实践过，小心驾驶使用！

打开冰箱要几步，使用这个标志板就要几步：
- 在场景中新建一个节点，并为其添加蜜汁组件 `BillboardHelper`。
- 被迫拖入特殊调制的 `lamyoung-billboard.effect` ， 拖入你想要或不想要展示的图片资源。
- 调教 `BillboardHelper` 中的参数，找到一个你喜欢的姿势。

![效果预览](/img/in-post/202012/22-04.gif)   


> La perfection est atteinte non quand il ne reste rien à ajouter，mais quand il ne reste rien à enlever



# 实现

`Cocos Creator 3.0` 中有一个 `Billboard` 组件（引擎内是为粒子系统服务的），本来想直接用的，但存在以下几个问题。
- 颜色值过亮（原因是初始化颜色值没有归一化）
- 纹理上下翻转（原因是计算时纹理坐标与位置坐标的对应关系）
- 不支持纹理缩放偏移（`effect`中有一个变量没用到）

![内置 cc.Billboard 的效果](/img/in-post/202012/22-05.gif)    

针对上面问题，我们只需要重新写一个组件脚本，继承 `Billboard` ，修改成我们想要的（也可改源码，但可能影响粒子系统）。

```ts
export class BillboardHelper extends Billboard 
```

![修改初始颜色值为归一化](/img/in-post/202012/22-06.png)    


针对纹理翻转和缩放偏移，我们可以新建一个`lamyoung-billboard.effect`，把内置的`builtin-billboard.effect`拷贝再改改。

![修改effect](/img/in-post/202012/22-07.png)    

接着在代码中替换材质。  

```ts
this._material.initialize({ effectAsset: this._effect, technique: 1 });
```

在代码中添加一个属性，修改偏移值，啪的一下，就完成啦！  

```ts
set tillOffset(val) {
    this._tillOffset = val;
    this._material.setProperty('mainTiling_Offset', this._tillOffset);
}
```
![效果预览](/img/in-post/202012/22-08.gif)      


# 小结

> 巧用标志板！3d效果值得拥有！

本文中出现的游戏开发程序员必备英语单词回顾：
- `billboard` - `[ˈbilbôrd]`  广告牌
 
以上为白玉无冰使用 `Cocos Creator 3.0 preview-1` 实现 `"标志版！ Cocos Creator Billboard !"` 的技术分享。听说大帅逼/大漂亮都喜欢分享！    

> 完美之道，不在无可增加，而在无可删减！



# 更多
[Cocos Creator 3.0 入门! 2D 素材 3D 效果!](https://mp.weixin.qq.com/s/xHYOzirlAZlbr9Ljuq7NdQ)
[基础光照模型！ Cocos Creator 2D 光照!](https://mp.weixin.qq.com/s/RtARzTb9KahZ70Ct5r8GRw)
[2020 原创精选! shader | 挖洞 | 流体 | 3D | 绳子纹理 | 四叉树 | 数学 样样都有！](https://mp.weixin.qq.com/s/ZrIPUEs9mnpPqV4dN_DIGA)   
[![四元数](/img/in-post/title/20201021.jpg)](https://mp.weixin.qq.com/s/zwF5PcR96gazP1k-IzXEPg)   


---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原文链接](https://mp.weixin.qq.com/s/KV7fyF0kvqqOjf01ZbqbmA)  
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   