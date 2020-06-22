---
layout: post
title:  "物理挖洞之分块 ！Cocos Creator ! "
date:   2020-06-16 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 减少多边形计算！画饼分之～     

# 效果预览

![](/img/in-post/202006/16-01.gif)   

# 回顾

在 [物理挖洞之链条！实现！(含视频讲解)](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg) 中介绍了用 `PolyBool` 和链条组件(`cc.PhysicsChainCollider`)实现物理挖洞的方法。

虽说这种方案可能不是最佳方案，但里面有一种 `evenodd` 的思想，觉得不错的。  

![](/img/in-post/202006/16-02.jpg)   

在 [物理挖洞之链条！优化！(含视频讲解)](https://mp.weixin.qq.com/s/4lFv9p346yEg_PSOwN0WKw) 中介绍了几个优化的地方。  

其中，单位化的思想和平滑移动的思想在后续一直被使用。   

![](/img/in-post/202006/16-03.jpg)   

不过，多边形链条组件有一个问题，容易穿透。   

接着，经过多次查找和分析，在[物理挖洞之多边形！实现！](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q) 中介绍用多边形碰撞组件(`cc.PhysicsPolygonCollider`)去实现物理挖洞。  

整体思路是，先用 `Clipper` 去计算多边形 (效率比 `PolyBool` 高)，接着用 `poly2tri` 将多边形分割成多个三角形，最后用多边形刚体填充。  

![](/img/in-post/202006/16-04.jpg)   

但是呢，`poly2tri` 限制比较多，[物理挖洞之多边形！填坑！](https://mp.weixin.qq.com/s/bL4VTlmzAO7ZzxB9NZ-R8A) 中介绍了填坑之路。

并利用 `mask` 的 `graphics` 实现好看的纹理。  

![](/img/in-post/202006/16-05.jpg)   

当然，还有群内小伙伴们讨论分享的3D效果，在上面的基础上，修改了一个[物理挖洞之3D效果](https://mp.weixin.qq.com/s/LJCdpdiRn9vZe83pf3ysUg)，感谢各位小伙伴的分享！     

![](/img/in-post/202006/16-06.jpg)   

强烈建议按顺序阅读上面几篇文章，有助于更好的理解这篇的文章哦！  

# 实现原理

整体思路是对区域进行分块，点击的时候判断是对哪个区域块有操作，再对这些区域块进行多边形计算，最后再绘制所有的多边形。  

![](/img/in-post/202006/16-07.jpg)   

这里与[物理挖洞之多边形！实现！](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q) 中的区别是少了一步 `poly2tri`，这是怎么做到的？  

首先得明白一点，之前使用 `poly2tri` 是因为会有内多边形出现。  

所以，在分块的时候，只要满足分块的尺寸小于挖洞的尺寸，这样就不会出现内多边形了。  

![](/img/in-post/202006/16-08.jpg)   

如何判断点击的是哪个区域呢？  

在初始化的时候，用一个2D矩形(`cc.Rect`)数组记录每一个分块的信息。    

```ts
private _rects: cc.Rect[] = [];
```

![](/img/in-post/202006/16-09.jpg)   


当点击的时候会生成一个多边形(参考[物理挖洞之链条！优化！](https://mp.weixin.qq.com/s/4lFv9p346yEg_PSOwN0WKw) 中的触摸平滑连续)数据。  

对于这个多边形的每个点，计算出坐标 `x` 和 `y` 的最大值和最小值。   

然后就可以算出这个的多边形的矩形(`aabb (Axis-Aligned Bounding Box)`)。    

```ts
let xMin = Number.MAX_SAFE_INTEGER, xMax = Number.MIN_SAFE_INTEGER, yMin = Number.MAX_SAFE_INTEGER, yMax = Number.MIN_SAFE_INTEGER;
// 计算最小最大值
xMin = p.x < xMin ? p.x : xMin;
yMin = p.y < yMin ? p.y : yMin;
xMax = p.x > xMax ? p.x : xMax;
yMax = p.y > yMax ? p.y : yMax;
// 得出矩形
const rect_r = cc.Rect.fromMinMax(cc.v2(xMin, yMin), cc.v2(xMax, yMax));
```

![](/img/in-post/202006/16-10.jpg)   

再用这个矩形和初始化矩形做一次相交判断，这样就可以粗略的确定要计算的块了。   

```ts
for (let index = 0; index < this._rects.length; index++) {
    const rect = this._rects[index];
    if (rect.intersects(rect_r)) {
        this.polyEx.pushCommand('polyDifference', [regions, index])
    }
}
```
![](/img/in-post/202006/16-11.jpg)   

多边形计算用的是 `Clipper` ，使用接口可以参考官网或者[物理挖洞之多边形！](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q)。    

```ts
// polyDifference(poly: cc.Vec2[], index: number) {
// 计算新的多边形
// https://sourceforge.net/p/jsclipper/wiki/documentation
const cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple);
const subj_paths = this._polys[index];
const clip_paths = [this._convertVecArrayToClipperPath(poly)]
cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);
const subject_fillType = ClipperLib.PolyFillType.pftEvenOdd;
const clip_fillType = ClipperLib.PolyFillType.pftEvenOdd;
const solution = new ClipperLib.Paths();
cpr.Execute(ClipperLib.ClipType.ctDifference, solution, subject_fillType, clip_fillType);
this._polys[index] = solution || [];
```

在所有分块计算之后，最后整体绘制多边形碰撞体和纹理。  

```ts
// private draw() {
ctx.clear();
for (let index = 0; index < this._polys.length; index++) {
    const polygons = this._polys[index];
    for (let index2 = 0; index2 < polygons.length; index2++) {
        const polygon = polygons[index2];
        let c = this._physicsPolygonColliders[_physicsPolygonColliders_count];
        c.points = this._convertClipperPathToVecArray(polygon);
        c.apply();

        for (let index3 = 0; index3 < c.points.length; index3++) {
            const p = c.points[index3];
            if (index3 === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        }
        ctx.close();
    }
}
ctx.fill();
```

当然，群(`859642112`)内小伙伴 `@吴先生` 也实现了这个分块，分块计算多边形同时，也进行分块绘制，欢迎加群一起讨论！  

# 小结  
  
> 生命不息，挖坑不止！  

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`"物理挖洞之分块！"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

> 天下事有难易乎？为之，则难者亦易矣；不为，则易者亦难矣。人之为学有难易乎？学之，则难者亦易矣；不学，则易者亦难矣。    --《为学》

---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   