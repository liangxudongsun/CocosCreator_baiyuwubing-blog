---
layout: post
title:  "四叉树与碰撞检测 ！Cocos Creator ! "
date:   2020-07-05 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 四叉树与引擎内置碰撞检测的结合运用。  

# 效果预览

绿色为参加检测的对象(当前四叉树节点)，红色为碰撞对象。   

![](/img/in-post/202007/05-01.gif)   

# 如何使用

引入脚本 `QuadtreeCollision.ts` ， 新建一个 `QuadtreeCollision` ，并初始化为世界坐标系下的对齐轴向的包围盒（AABB）。   

```ts
// 这边是挂载在canvas下的脚本，用canvas的rect初始化创建。
this._quadCollision = new QuadtreeCollision(this.node.getBoundingBoxToWorld())
```

传入待检测的碰撞数组 `cc.Collider[]` 和测试对象的 `cc.Collider`。   

返回准备测试的 `cc.Collider[]` 和发生碰撞的 `cc.Collider[]`。   

```ts
// check(colliders: cc.Collider[], testCollider: cc.Collider)
const { retrieve, contacts } = this._quadCollision.check(this._all_collider, this.collider_role);
// retrieve 准备测试的对象(预览图中的绿色)   cc.Collider[]
// contacts 碰撞对象(预览图中的红色)   cc.Collider[]
```

# 实现原理

**四叉树是什么?** 

白玉无冰是这样理解的，四叉树本身是树结构的一种，如果物体过多的话，先根据物体所处位置划分成四块，如果每个块的中的物体数量还是很多的话，继续划分成四块。如下图红线所示。  

![](/img/in-post/202007/05-02.gif)   

检测的时候，就是根据待测试对象的位置，去找属于哪个块，再把这个块中的物体告诉你。如下图的绿色物体。  

![](/img/in-post/202007/05-03.gif)   

那么怎么实现四叉树呢？用好 `github` 就行了(误)，搜了一下，找到一个库，直接拿来改改就行了。  

https://github.com/timohausmann/quadtree-js

```ts
//export default class QuadtreeCollision {
private _tree;
constructor(rect: { x: number, y: number, width: number, height: number }) {
    this._tree = new Quadtree(rect);
}
```

![](/img/in-post/202007/05-04.gif)   


**那么怎么检测碰撞呢？**  

先看看引擎(v2.3.3)的 `CollisionManager` 是怎么处理的。  

在 `cc.Collider` 这个组件 `onEnable` 时，会把这个组件加入 `CollisionManager` 中。

`CollisionManager` 添加 `Collider` 时，会遍历所有的 `Collider` ，根据分组创建一个碰撞连接。  

![](/img/in-post/202007/05-05.jpg)   

所以，我们碰撞检测的思路，就在源码中搬过来改改。  

![](/img/in-post/202007/05-06.jpg)   

将上面的代码整理出我们要用的检测代码如下。  

```ts
function testContact(collider1, collider2) {
    // 分组不通过
    if (!cc.director.getCollisionManager()['shouldCollide'](collider1, collider2)) {
        return false;
    }

    let world1 = collider1.world;
    let world2 = collider2.world;
    if (!world1.aabb.intersects(world2.aabb)) {
        return false;
    }

    let isCollider1Polygon = (collider1 instanceof cc.BoxCollider) || (collider1 instanceof cc.PolygonCollider);
    let isCollider2Polygon = (collider2 instanceof cc.BoxCollider) || (collider2 instanceof cc.PolygonCollider);
    let isCollider1Circle = collider1 instanceof cc.CircleCollider;
    let isCollider2Circle = collider2 instanceof cc.CircleCollider;

    if (isCollider1Polygon && isCollider2Polygon) {
        return cc.Intersection.polygonPolygon(world1.points, world2.points);
    } else if (isCollider1Circle && isCollider2Circle) {
        return cc.Intersection.circleCircle(world1, world2);
    } else if (isCollider1Polygon && isCollider2Circle) {
        return cc.Intersection.polygonCircle(world1.points, world2);
    } else if (isCollider1Circle && isCollider2Polygon) {
        return cc.Intersection.polygonCircle(world2.points, world1);
    } else {
        // cc.errorID(6601, cc.js.getClassName(collider1), cc.js.getClassName(collider2));
    }
    return false;
}
```

最后再结合四叉树碰撞，检测代码如下。  

```ts
check(colliders: cc.Collider[], testCollider: cc.Collider) {
    const ret: { retrieve: cc.Collider[], contacts: cc.Collider[] } = { retrieve: [], contacts: [] };

    // 四叉树清理
    this._tree.clear();
    const collisionManager = cc.director.getCollisionManager();
    collisionManager['updateCollider'](testCollider);
    for (let i = 0, l = colliders.length; i < l; i++) {
        const collider = colliders[i];
        // 更新碰撞体世界aabb
        collisionManager['updateCollider'](collider);
        const aabb = collider['world'].aabb;
        const rect = { x: aabb.x, y: aabb.y, height: aabb.height, width: aabb.width, collider: collider };
        // 四叉树插入
        this._tree.insert(rect)
    }
    // 四叉树抓出待检查的对象(属于那个块的所有节点)
    const retrieveObjects = this._tree.retrieve(testCollider['world'].aabb);
    retrieveObjects.forEach(element => {
        ret.retrieve.push(element.collider);
        // 抓出来后检查碰撞
        if (testContact(element.collider, testCollider)) {
            ret.contacts.push(element.collider);
        }
    });

    return ret;
}
```


# 更多精彩
[![shader顶点动画之旗子水纹](/img/in-post/title/20200622.png)](https://mp.weixin.qq.com/s/Ubv-wbA8cOPR58GM50bXrA)   
[![2D实现背景图3D滚动效果](/img/in-post/title/20200629.jpg)](https://mp.weixin.qq.com/s/fJxE-Z0BEiQgAhFoJeHjlw)   
[![物理挖洞系列](/img/in-post/title/20200616.jpg)](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   
[![画线纹理之绳子](/img/in-post/title/20200527.jpg)](https://mp.weixin.qq.com/s/QvJ2DHFhUxO3doNviCqBIg)   

[█    渐变色的实现    █](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)  [█    精灵之网格模式    █](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)   [█    shader动画之loading    █](https://mp.weixin.qq.com/s/QhKzmtpwiQgOzsGPcBHSJQ)   [█    js的三位一体    █](https://mp.weixin.qq.com/s/6wq5ekTtyF_LO_oFBb1vRA)   [█    shader 之攻击闪白(+入门资料整理)    █](https://mp.weixin.qq.com/s/3_ShiqpcJDsBcgeszAMT3Q)  [█    物理流体(欢乐水杯)    █](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w)   [█    瞄准线之抛物线    █](https://mp.weixin.qq.com/s/Z-7zQuvjIaBzyQRJslH7bQ)   [█    随机(正态分布)飞溅运动    █](https://mp.weixin.qq.com/s/Qu9Uy55KvUX5sSLt_PTUJQ)   [█    贪吃蛇之平滑移动    █](https://mp.weixin.qq.com/s/qZ7CGFRmncxvQZ0Hhs4g5g)   [█    雷达图的实现  █](https://mp.weixin.qq.com/s/hgybmgTHlga0KgHfz1vIfg)  [█    分形着色器(数学之美)    █](https://mp.weixin.qq.com/s/OuQaI18LwX3Lw7aRcKjDOw)  [█    shader 之渐变过渡    █](https://mp.weixin.qq.com/s/tN2Al3kfo4HwIBGXNjmEDA)   [█    初探 gizmo 使用    █](https://mp.weixin.qq.com/s/YjH9PAWvtgPiDGxp9y7big)   [█    shader 之卷积滤镜    █](https://mp.weixin.qq.com/s/WAajs8p69X8UJFvNiYuNDA)   [█    旗帜效果(meshRenderer)    █](https://mp.weixin.qq.com/s/E5ZjzIFozvPRIIytmtiuTQ)   [█    多边形裁剪(meshRenderer)    █](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w)   [█    高抛平抛发射    █](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)   [█    水纹效果(片元着色器)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   [█    2019年原创(黑历史)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   [█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  

# 小结  
  
> 分块！寻找对应的分块检测！  

以上为白玉无冰使用 `Cocos Creator v2.3.3` 实现 `"四叉树与碰撞检测"` 的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

> 成就我们的恰恰就是那些不断重复做的事情。因此，优秀不是一种行为，而是一种习惯。  


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/gkvOd11kbZYcKXkBc7V8kQ)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   