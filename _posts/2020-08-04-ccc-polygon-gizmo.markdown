---
layout: post
title:  "多边形裁剪与Gizmo！新版！Cocos Creator ！"
date:   2020-08-04 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 支持缩放旋转，支持合图，支持`gizmo`添加节点和调整位置，支持顺时针逆时针。   

# 效果预览与使用  

<iframe src="//player.bilibili.com/player.html?aid=584054179&bvid=BV1xz4y1Q7KM&cid=220084438&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

# 原理

## 回顾

在[gizmo入门探索](https://mp.weixin.qq.com/s/YjH9PAWvtgPiDGxp9y7big)介绍了 `gizmo` 与多边形裁剪的配合。  

在[使用 mesh 实现多边形裁剪图片](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w) 中介绍了 `mesh` 和切耳法的相关使用。    

![](/img/in-post/202002/13-01.gif)  

相比`mask`组件，这种`meshRenderer`的实现可以降低两个`draw call`。

因为小伙伴使用的比较多，这边对这个多边形裁剪图片进行一次升级，增加易用性！

升级后添加了以下几个特性：
- 升级版本至 `Cocos Creator 2.4` (一些接口的变化)  
- 支持多边形节点顺时针和逆时针两种方式
- 支持 `gizmo` 直接添加多边形节点  
- 支持节点缩放旋转后，`gizmo` 的正确显示  
- 支持合图，图片资源可以勾选 `packable`  

接下来就大致讲解主要特性的原理吧。

## 分割多边形

这次不采用[切耳法分割](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w)分割了，而是采用[poly2tri](https://github.com/r3mi/poly2tri.js)这个库去分割(注意这个库有[严格的限制](https://mp.weixin.qq.com/s/bL4VTlmzAO7ZzxB9NZ-R8A))。

主要计算顶点索引过程如下。  

```ts
// 计算顶点索引 
const ids = [];
// 多边形切割 poly2tri，支持简单的多边形，确保顶点按顺序且不自交
const countor = this.vertexes.map((p) => { return { x: p.x, y: p.y } }); 
const swctx = new poly2tri.SweepContext(countor, { cloneArrays: true });

swctx.triangulate();
const triangles = swctx.getTriangles();
triangles.forEach((tri) => {
    tri.getPoints().forEach(p => {
        const i = countor.indexOf(p as any);
        ids.push(i);
    });
})
mesh.setIndices(ids);
```

## 支持合图

引用一张 `@GT` 的图。  

![](/img/in-post/202008/04-01.jpg)  

在 `SpriteFrame` 里含有这个`uv`信息，这里可以做一次转换，先计算 `0~1` 的比例，再做一次转化坐标。  

```ts
private _lerp(a: number, b: number, w: number) {
    return a + w * (b - a);
}
```

```ts
const uv = this.spriteFrame.uv;
const texture = this.spriteFrame.getTexture();
/**
*    t
* l     r
*    b
*/
const uv_l = uv[0];
const uv_r = uv[6];
const uv_b = uv[3];
const uv_t = uv[5];

// 计算uv
const uvs = [];
for (const pt of this.vertexes) {
    const u = this._lerp(uv_l, uv_r, (pt.x + texture.width / 2 + this.offset.x) / texture.width);
    const v = this._lerp(uv_b, uv_t, (pt.y + texture.height / 2 - this.offset.y) / texture.height);
    uvs.push(cc.v2(u, v));
}
mesh.setVertices(gfx.ATTR_UV0, uvs);
```

## gizmo 增加多边形顶点

整体思路是先根据所有顶点画线段，给线段添加事件监听，在点击位置添加一个节点。    

点击转换坐标有个坑，`y`的坐标要用一个高度减去后再转换(感谢`@GT`的pr)。  

```js
start: (x, y, event, param) => {
    y = this._view.offsetHeight - y;
    // 转换不正确，会有偏移 todo
    let position = cc.v2(x, y);
    position = Editor.GizmosUtils.snapPixelWihVec2(position);
    position = this._view.pixelToWorld(position);
    position = node.convertToNodeSpaceAR(position);
}
```

## gizmo 支持旋转缩放

整体来说，就是将坐标点先做缩放，再做旋转处理即可。

```js
this._tool.plot(target.vertexes.map((p) => {
    let scaleX = node.scaleX;
    let scaleY = node.scaleY;
    let angle = -node.angle * Math.PI / 180;
    const cos_angle = Math.cos(angle);
    const sin_angle = Math.sin(angle);

    const v = Editor.GizmosUtils.snapPixelWihVec2(p.mul(this._view.scale));
    return cc.v2(
    (v.x * cos_angle * scaleX + v.y * sin_angle * scaleY),
    -(-v.x * sin_angle * scaleX + v.y * cos_angle * scaleY)
    );
}), position);
```


# 小结  
  
> 坐标转换！旋转！跳跃！不停歇！     

以上为白玉无冰使用 `Cocos Creator v2.4` 实现 `"多边形裁剪！"` 的技术分享。欢迎分享给身边的朋友！    

> 知识不过是潜在的力量，只有将它组织成明确的行动计划，并指引它朝着某个明确目的发挥作用的时候，知识才是力量。


# 更多
[![3D摇杆](/img/in-post/title/20200717.jpg)](https://mp.weixin.qq.com/s/Cs2woHVVBT1zUHOoaq_VgA)   
[![两种方法实现亮度/饱和度/对比度的调整](/img/in-post/title/20200714.jpg)](https://mp.weixin.qq.com/s/bKjJS3KX2rEI0F7_4QPJEw)   
[![Assembler 源码解读及使用](/img/in-post/title/20200710.png)](https://mp.weixin.qq.com/s/YaPHcTN1lkgo5eiYoG3p9A)   
[![物理挖洞系列](/img/in-post/title/20200616.jpg)](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   
[█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  


---

![](/img/in-post/bottom.png)  

---

<!-- [原文链接](https://mp.weixin.qq.com/s/Cs2woHVVBT1zUHOoaq_VgA)    -->
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   