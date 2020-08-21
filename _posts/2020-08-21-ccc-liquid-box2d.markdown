---
layout: post
title:  "隐秘的物理粒子系统与渲染 ！Cocos Creator LiquidFun !"
date:   2020-08-21 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 让 `cocos` Q弹起来！物理流体之 `LiquidFun` 流体纹理 `shader` !

# 效果预览

![](/img/in-post/202008/21-01.gif)  

[https://www.bilibili.com/video/BV1hD4y127H2/](https://www.bilibili.com/video/BV1hD4y127H2/)

<iframe src="//player.bilibili.com/player.html?aid=711771972&bvid=BV1hD4y127H2&cid=226850028&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

# 原理

## 物理粒子系统

引擎内置的 `box2d.js` 其实已经携带了 `google` 的 `liquidfun`（但是没有公开接口和适配）。并且引擎还对 `box2d` 做了一次适配，绑定到全局变量的 `b2`。  

![](/img/in-post/202008/21-02.jpg)  

参考 [https://github.com/google/liquidfun](https://github.com/google/liquidfun) 中的其中一个demo。  

粒子系统创建过程大概分为以下几步
- 创建粒子系统定义 `ParticleSystemDef` (粒子半径，强度等参数)
- 通过粒子定义创建粒子系统
- 创建粒子分组定义 `ParticleGroupDef` (建立形状，粒子类型，位置等)
- 通过粒子分组定义创建粒子分组

需要注意物理世界与引擎内的有一个像素转换的关系，转成 `Cocos Creator `中的代码大概如下。

```ts
const phyMgr = cc.director.getPhysicsManager();
const world = phyMgr['_world'];
const psd = new b2.ParticleSystemDef();
psd.radius = PSD_RADIUS / PTM_RATIO; //每个粒子的半径
psd.elasticStrength = 0.5;
particleSystem = world.CreateParticleSystem(psd);

const box = new b2.PolygonShape();
const pgd = new b2.ParticleGroupDef();
box.SetAsBox(this.meshRenderer.node.width / 2 / PTM_RATIO, this.meshRenderer.node.height / 2 / PTM_RATIO);
pgd.flags = b2.ParticleFlag.b2_elasticParticle;
pgd.groupFlags = b2.ParticleGroupFlag.b2_solidParticleGroup;
pgd.shape = box;
const particleGroup = particleSystem.CreateParticleGroup(pgd);

```


## 渲染
 
本次采用 `cc.MeshRenderer` 这个组件去组织顶点纹理数据。并且使用 `gl.POINTS` 点渲染模式去渲染每个粒子。  

主要思路如下：
- 根据节点位置创建粒子组的位置
- 创建粒子组后，计算相应的纹理坐标
- 每帧根据物理粒子的位置，更新粒子的顶点坐标

如何把物理世界的位置同步到 `Cocos` 中的位置？  

![](/img/in-post/202008/21-03.jpg)  

参考引擎源码的同步方法，大概也能写出这个。

```ts
const x = posBuff[i].x * PTM_RATIO;
const y = posBuff[i].y * PTM_RATIO;
const pt = this.meshRenderer.node.convertToNodeSpaceAR(cc.v2(x, y));
```

纹理坐标计算这边写的比较简单，没有考虑节点各种变换和裁剪。([可以参考这篇文章中的纹理计算](https://mp.weixin.qq.com/s/EkMP_UcFcWTlSn_4Ml8zsA))  

```ts
/**
*    t
* l     r
*    b
*/
const u = this._lerp(uv_l, uv_r, (pt.x + texture.width / 2) / texture.width);
const v = this._lerp(uv_b, uv_t, (pt.y + texture.height / 2) / texture.height);
```

## 其他

简单搬运 liquidfun demo，未测试性能，仅供参考学习。项目代码在 `2.4.x` 目录下。    

# 小结  
  
> `box2d` + `LiquidFun` ！ `ParticleSystem` ！`shader` ！    

以上为白玉无冰使用 `Cocos Creator v2.4` 实现 `"流体之 LiquidFun 流体纹理 shader"` 的技术分享。欢迎分享给身边的朋友！    

> 知识不过是潜在的力量，只有将它组织成明确的行动计划，并指引它朝着某个明确目的发挥作用的时候，知识才是力量。




# 更多
[![3D瞄准器](/img/in-post/title/20200813.jpg)](https://mp.weixin.qq.com/s/3xB7Ab_nR76gRzUkFjAKqwA)   
[![gizmo与多边形裁剪](/img/in-post/title/20200804.jpg)](https://mp.weixin.qq.com/s/EkMP_UcFcWTlSn_4Ml8zsA)   
[![3D摇杆](/img/in-post/title/20200717.jpg)](https://mp.weixin.qq.com/s/Cs2woHVVBT1zUHOoaq_VgA)   
[█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/3xB7Ab_nR76gRzUkFjAKqwA)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   