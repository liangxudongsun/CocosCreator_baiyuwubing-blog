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
(暂无)

---

# 挖洞新方案遇到的坑

> 专业挖坑，从未停止。与群内小伙伴讨论后，发现一些坑和可优化的点。。。

## 填充纹理

之前是使用 `cc.graphic` 作图的，可能有小伙伴需要填充好看的纹理。  

这时，可以巧用 `cc.mask` 中的 `_graphic`。    

![](/img/in-post/202005/14-01.jpg)     

可以清楚的看到， `mask` 的裁剪实质上是由一个 `graphic` 作图实现的。  

所以我们上面的 `graphic` 组件可以替换成 `mask` 中的 `_graphic`。在该节点添加一个 `cc.mask` 组件即可。  

在代码中获取一下这个这个 `graphic`，原来的逻辑不变。  

```ts
this.graphics = this.node_dirty.getComponent(cc.Mask)['_graphics'];
```

准备一张 `256x256` 的图片(一定要是2的n次幂)，设置为 `repeat` 模式。并将这个张图片放在 `mask` 节点下，铺满界面。  

![](/img/in-post/202005/14-02.jpg)     

看看效果怎么样。  

![](/img/in-post/202005/14-03.gif)     

## 奇怪的 bug

有群友(感谢`@两年`)反馈，滑动时有概率出现刚体消失。    

![](/img/in-post/202005/14-04.gif)     

仔细琢磨后，发现是 `poly2tri` 这个库有些限制。用 `clipper` 计算的结果还要加一层处理。  

先看第一个报错。  

![](/img/in-post/202005/14-05.jpg)     

大概是说有自交的多边形。  

![](/img/in-post/202005/14-06.jpg)     

我也没办法呀，这结果是 `clipper` 算出来的。  

![](/img/in-post/202005/14-07.jpg)     

还好，`clipper` 官方文档翻了一阵。找到一个可以用的。   

[https://sourceforge.net/p/jsclipper/wiki/documentation/](https://sourceforge.net/p/jsclipper/wiki/documentation/)

![](/img/in-post/202005/14-08.jpg)     

加一个参数，可以实现严格简单的多边形(但是效率更低)。  

```ts
const cpr = new ClipperLib.Clipper(ClipperLib.Clipper.ioStrictlySimple);
```

再看另一种情况下的报错。  

![](/img/in-post/202005/14-09.png)     

这个大概是说，出现了共线不支持。  

经过我细心分析(日志大法)，发现是 `clipper` 计算的结果中的 `holes` 和 `outer` 之间有重复的点时候，就会产生错误。  

![](/img/in-post/202005/14-10.jpg)     

可惜这次没在文档中找到相应的方法处理。  

![](/img/in-post/202005/14-11.jpg)     

只好自己写一个方法，计算后再过滤一下这些重复的节点。   

```ts
private _convertClipperPathToPoly2triPoint(poly: { X: number, Y: number }[], exclude: poly2tri.Point[] = []): poly2tri.Point[] {
    const newPos: poly2tri.Point[] = [];
    poly.forEach((p, i) => {
        const p_now = new poly2tri.Point(p.X, p.Y)
        const isIn = exclude.some((e_p) => {
            if (e_p.equals(p_now)) {
                return true;
            }
        })
        if (!isIn) {
            newPos.push(p_now);
            exclude.push(p_now);
        }
    })
    if (newPos.length > 2)
        return newPos;
    else
        return [];
}
```

最后，发给热心群(`859642112`)友，测试后，暂时没出现这个问题了。  

## 其他

加了这些优化，是否会增加了计算量？是否会产生新的卡顿？

每次绘制一个三角形，效率会不会更低？能否直接绘制多边形？减少绘制次数？  

如果初始多边形比较大，是否可以分割成几个多边形，分区域划分计算？减少大量多边形计算。  

是否可以需要把库拆解？只选取自己需要的部分？根据算法重新设计？这样就不需要转格式了。  

....

这些问题，就交给大家去思考了吧！挖洞挖坑，填坑，就像不停歇的球，永不停歇。




---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/dig_hole)   
[参考文章](https://mp.weixin.qq.com/s/jxKeM2Ah5UHlGTryksdr6Q)  