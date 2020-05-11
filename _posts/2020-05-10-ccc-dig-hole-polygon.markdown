---
layout: post
title:  "物理刚体挖洞！另一种实现 ！Cocos Creator ! "
date:   2020-05-10 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 这次就不用物理链条了，换一种方式实现。

# 回顾

在 [物理挖洞-优化篇](https://mp.weixin.qq.com/s/4lFv9p346yEg_PSOwN0WKw) 和 [物理挖洞-实现篇](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg) 中介绍了一种用多边形链条组件(`cc.PhysicsChainCollider`)实现物理挖洞的方法。这次打算用多边形碰撞组件(`cc.PhysicsPolygonCollider`)去实现物理挖洞。

建议先看前两篇的讲解，有助于更快理解这篇文章。

# 效果预览

![](/img/in-post/202005/10-01.gif)   

微信小游戏-ios-端效果预览(点击下面的图片)

[![Watch the video](/img/in-post/202005/10-01.gif)](/img/in-post/202005/10-00.mp4){:target="_blank"}

# 实现步骤

整体思路是，先用 `Clipper` 去计算多边形，接着用 `poly2tri` 将多边形分割成多个三角形，最后用多边形刚体填充。  

![](/img/in-post/202005/10-02.jpg)     

## 引入第三方库

### Clipper

`Clipper` 是一个强大的用于多边形布尔运算库。前往下面这个地址下载，并作为插件导入 `creator` 。  

http://jsclipper.sourceforge.net  

为什么这次不用 [物理挖洞-实现篇](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg) 中的 `PolyBool` 呢？

经测试发现 `Clipper` 的效率会比 `PolyBool` 高，并且 `Clipper` 内置了一个方法可以明确知道哪些多边形是洞。  

![](/img/in-post/202005/10-03.jpg)     


### poly2tri

`poly2tri` 是一个把多边形分割成三角形的库。下载地址如下：  

https://github.com/r3mi/poly2tri.js  

`poly2tri` 的使用有一些要注意的，大致就是不能有重复的点，不能有相交的形状。  

![](/img/in-post/202005/10-04.jpg)  


## 初始化准备

先在场景中添加一个物理节点，一个绘图组件(用来画图)。  

![](/img/in-post/202005/10-05.jpg)  

接着把物理引擎打开，监听触摸事件。  

```ts
// onLoad() {
// 多点触控关闭
cc.macro.ENABLE_MULTI_TOUCH = false;
cc.director.getPhysicsManager().enabled = true;

this.node_dirty.on(cc.Node.EventType.TOUCH_START, this._touchMove, this);
this.node_dirty.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
// }
```

## 扩展多边形碰撞的组件

为了方便管理多边形碰撞组件，新建一个脚本 `PhysicsPolygonColliderEx.ts`。

### 初始化

因为物理碰撞体需要物理刚体，我们可以加一些限制，并把这个菜单指向物理碰撞体的菜单中。  

```ts
const { ccclass, property, menu, requireComponent } = cc._decorator;
@ccclass
@menu("i18n:MAIN_MENU.component.physics/Collider/PolygonEX-lamyoung.com")
@requireComponent(cc.RigidBody)
export default class PhysicsPolygonColliderEx extends cc.Component {
}
```

我们就可以在刚体节点中添加这个插件脚本了。  

![](/img/in-post/202005/10-06.jpg)  

既然要用到多边形碰撞体，就定义一个多边形碰撞体数组。  

```ts
private _physicsPolygonColliders: cc.PhysicsPolygonCollider[] = [];
```

因为 `Clipper` 中计算的结构是 `{X,Y}`。

![](/img/in-post/202005/10-07.jpg)  

所以加个变量记录多边形顶点信息。  

```ts
private _polys: { X: number, Y: number }[][] = [];
```

因为不同的库用的数据结构不同，所以添加两个转换方法。  

```ts
private _convertVecArrayToClipperPath(poly: cc.Vec2[]) {
    return poly.map((p) => { return { X: p.x, Y: p.y } });
}

private _convertClipperPathToPoly2triPoint(poly: { X: number, Y: number }[]) {
    return poly.map((p) => { return new poly2tri.Point(p.X, p.Y) });
}
```

加一个初始化数据的接口。 

```ts
init(polys: cc.Vec2[][]) {
    this._polys = polys.map((v) => { return this._convertVecArrayToClipperPath(v) });
}
```

### 计算多边形

参考 `Clipper` 中的使用例子，写一个多边形差集调用。  

```ts
//polyDifference(poly: cc.Vec2[]) {
const cpr = new ClipperLib.Clipper();
const subj_paths = this._polys;
const clip_paths = [this._convertVecArrayToClipperPath(poly)]
cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);
const subject_fillType = ClipperLib.PolyFillType.pftEvenOdd;
const clip_fillType = ClipperLib.PolyFillType.pftEvenOdd;
const solution_polytree = new ClipperLib.PolyTree();
cpr.Execute(ClipperLib.ClipType.ctDifference, solution_polytree, subject_fillType, clip_fillType);
const solution_expolygons = ClipperLib.JS.PolyTreeToExPolygons(solution_polytree);
this._polys = ClipperLib.Clipper.PolyTreeToPaths(solution_polytree);
```

### 分割多边形并添加刚体

参考 `poly2tri` 中的使用，写一个多边形分割成三角形的调用。记得要把上面返回的数据转成 `poly2tri` 中可以使用的数据格式。  

```ts
// polyDifference(poly: cc.Vec2[]) {
let _physicsPolygonColliders_count = 0;
for (const expolygon of solution_expolygons) {
    const countor = this._convertClipperPathToPoly2triPoint(expolygon.outer);
    const swctx = new poly2tri.SweepContext(countor);
    const holes = expolygon.holes.map(h => { return this._convertClipperPathToPoly2triPoint(h) });
    swctx.addHoles(holes);
    swctx.triangulate();
    const triangles = swctx.getTriangles();
    // 逐一处理三角形...
}
```

然后再逐一处理分割好的三角形，修改 `cc.PhysicsPolygonCollider` 的 `points` 属性。

```ts
// 逐一处理三角形...
for (const tri of triangles) {
    let c = this._physicsPolygonColliders[_physicsPolygonColliders_count];
    if (!c) {
        //没有的话就创建
        c = this.addComponent(cc.PhysicsPolygonCollider);
        c.friction = 0;
        c.restitution = 0;
        this._physicsPolygonColliders[_physicsPolygonColliders_count] = c;
    }
    c.points = tri.getPoints().map((v, i) => {
        return cc.v2(v.x, v.y)
    });
    c.apply();
    _physicsPolygonColliders_count++;
}
// 剩余不要用的多边形清空。
this._physicsPolygonColliders.slice(_physicsPolygonColliders_count).forEach((v => {
    if (v.points.length) {
        v.points.length = 0;
        v.apply();
    }
}));
```

### 绘制泥土

只要在遍历三角形的时候逐点画线就行了。

```ts
if (i === 0) ctx.moveTo(v.x, v.y);
else ctx.lineTo(v.x, v.y);
```

### 添加命令队列

为了不让每帧计算量过多，添加一个命令队列。  

```ts
private _commands: { name: string, params: any[] }[] = [];

pushCommand(name: string, params: any[]) {
    this._commands.push({ name, params });
}
```

在每次更新的时候，取出几个命令去执行。  

![](/img/in-post/202005/10-08.jpg)  

```ts
lateUpdate(dt: number) {
    if (this._commands.length) {
        // 每帧执行命令队列
        for (let index = 0; index < 2; index++) {
            const cmd = this._commands.shift();
            if (cmd)
                this[cmd.name](...cmd.params);
            else
                break;
        }
    }
}
```

## 涂抹地形

整体思路和 [物理挖洞-优化篇](https://mp.weixin.qq.com/s/4lFv9p346yEg_PSOwN0WKw) 和 [物理挖洞-实现篇](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg) 差不多。不清楚的话，可以回看这两篇文章。  

![](/img/in-post/202005/10-09.jpg)  

这次不同的是，加了一个涂抹步长控制，当涂抹间隔太小的时候，就参与不计算。  

```ts
private _touchStartPos: cc.Vec2;
private _touchStart(touch: cc.Touch) {
    this._touchStartPos = undefined;
    this._touchMove(touch);
}

private _touchMove(touch: cc.Touch) {
    const regions: cc.Vec2[] = [];
    const pos = this.graphics.node.convertToNodeSpaceAR(touch.getLocation());

    const count = DIG_FRAGMENT;
    if (!this._touchStartPos) {
        // 画一个圆（其实是多边形）
        for (let index = 0; index < count; index++) {
            const r = 2 * Math.PI * index / count;
            const x = pos.x + DIG_RADIUS * Math.cos(r);
            const y = pos.y + DIG_RADIUS * Math.sin(r);
            regions.push(this._optimizePoint([x, y]));
        }
        this._touchStartPos = pos;
    } else {
        const delta = pos.sub(this._touchStartPos);
        // 手指移动的距离太小的话忽略
        if (delta.lengthSqr() > 25) {
            // 这里是合并成一个顺滑的图形  详细上一篇文章
            const startPos = this._touchStartPos;
            for (let index = 0; index < count; index++) {
                const r = 2 * Math.PI * index / count;
                let vec_x = DIG_RADIUS * Math.cos(r);
                let vec_y = DIG_RADIUS * Math.sin(r);
                let x, y;
                if (delta.dot(cc.v2(vec_x, vec_y)) > 0) {
                    x = pos.x + vec_x;
                    y = pos.y + vec_y;
                } else {
                    x = startPos.x + vec_x;
                    y = startPos.y + vec_y;
                }
                regions.push(this._optimizePoint([x, y]));
            }
            this._touchStartPos = pos;
        }
    }

    if (regions.length)
        this.polyEx.pushCommand('polyDifference', [regions, this.graphics]);
}

private _touchEnd(touch: cc.Touch) {
    this._touchStartPos = undefined;
}
```

# 小结   

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`"物理挖洞之多边形碰撞体的实现"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

# 视频讲解

<!-- **[视频讲解](https://b23.tv/BV1jz411z7w1)** -->

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/dig_hole)   
[参考文章](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q)  