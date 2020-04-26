---
layout: post
title:  "物理挖洞！涂抹地形! 小鳄鱼爱洗澡！百战天虫 ！Cocos Creator ! "
date:   2020-04-24 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 终于来挖坑了！老规矩！图文+视频讲解！

# 效果预览

![](/img/in-post/202004/24-01.gif)   


# 实现步骤

整体思路是先使用 `PolyBool` 计算多边形，接着使用 `cc.PhysicsChainCollider` 将多边形围起来，最后使用 `cc.Graphics` 将整个地形绘制出来。

## 引入 `PolyBool` 

`PolyBool`是什么？对多边形（并集，交集，差，异或）进行运算。(Boolean operations on polygons (union, intersection, difference, xor).)

![](/img/in-post/202004/24-02.jpg)   

前往  https://github.com/voidqk/polybooljs  下载。并作为插件脚本。  

![](/img/in-post/202004/24-03.jpg)   

这个仓库有个 `PR` 提供了一个声明文件，因为我用的是 `TypeScript` ，我就把它拿来改改用了。  

![](/img/in-post/202004/24-04.jpg)   

参考这个库的示例，里面有一个 `regions` 三维数组记录多边形的信息。  

![](/img/in-post/202004/24-05.jpg)   

我们也用个三维数组记录当前多边形的形状的数据，并初始化为一个长方形吧！  

```ts
private _regions: number[][][] = [];
reset() {
    this._regions = [
        [[-480, -320], [-480, 250], [480, 250], [480, -320]]
    ];
}
```

## 添加物理链条

先在场景中添加物理节点。

![](/img/in-post/202004/24-06.jpg)   

为这个节点初始化一些 `cc.PhysicsChainCollider` ，并开启物理引擎，顺便开启物理调试模式，方便看效果。  

```ts
//onLoad() {
cc.director.getPhysicsManager().enabled = true;
cc.director.getPhysicsManager().debugDrawFlags = 1;
for (let index = 0; index < 100; index++) {
    const c = this.node_dirty.addComponent(cc.PhysicsChainCollider);
    c.loop = true;
    c.enabled = false;
}
```

接着根据`_regions`的数值，把`points`传给物理链条。  

```ts
// draw() {
const chains = this.node_dirty.getComponents(cc.PhysicsChainCollider);
chains.forEach((c) => {
    c.enabled = false;
})
for (let index = 0; index < this._regions.length; index++) {
    const pos = this._regions[index];
    let poly = chains[index];
    if (!poly) {
        poly = this.node_dirty.addComponent(cc.PhysicsChainCollider);
        poly.loop = true;
    }
    poly.points.length = 0;
    poly.points = pos.map((v, i) => {
        const v2 = cc.v2(v[0], v[1])
        return v2;
    });
    poly.enabled = true;
}
```

看看效果。  

![](/img/in-post/202004/24-07.jpg)   

## 开始挖洞！

监听一个节点的触摸事件。

```ts
// onLoad() {
this.node_dirty.on(cc.Node.EventType.TOUCH_START, this._touchMove, this);
this.node_dirty.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
```

在触摸点周围圈一个多边形(类似画一个圈，不清楚的话可以[参考上一篇中的把圆围成一个圈](https://mp.weixin.qq.com/s/QhKzmtpwiQgOzsGPcBHSJQ))，并使用差集的方法计算新的多边形，计算后再重写画物理链条。  

```ts
// const DIG_RADIUS = 50;
// const DIG_FRAGMENT = 12;
// _touchMove(touch: cc.Touch) {
const regions = [[]];
const pos = this.node_dirty.convertToNodeSpaceAR(touch.getLocation());

const count = DIG_FRAGMENT;
for (let index = 0; index < count; index++) {
    const r = 2 * Math.PI * index / count;
    const x = pos.x + DIG_RADIUS * Math.cos(r);
    const y = pos.y + DIG_RADIUS * Math.sin(r);
    regions[0].push([x, y]);
}

const result = PolyBool.difference({
    regions: this._regions,
    inverted: false
}, {
    regions,
    inverted: false
});
this._regions = result.regions;
this.draw();
```

看看效果。  

![](/img/in-post/202004/24-08.gif)   


## 填充颜色

先画一个多边形，只需先移动到起点，然后逐一划线，就可以了。  
```ts
// private _drawPoly(ctx, poly) {
poly.forEach((pos, i) => {
    if (i === 0)
        ctx.moveTo(pos.x, pos.y);
    else
        ctx.lineTo(pos.x, pos.y);
    ctx.close();
});
```

填充思路是基于 `canvas` 中的 `evenodd` 规则。  

![](/img/in-post/202004/24-09.jpg)   

与上面不一样的地方是，我是计算这个多边形被几个大的多边形包围，当是偶数的时候填充泥土的颜色，当是奇数时，填充背景的颜色。  

![](/img/in-post/202004/24-10.jpg)   

当然，需要注意的是，计数越大的要越后画，这样才能达到最终效果。

```ts
// draw() {
const enabled_chains_points=[]
for (let index = 0; index < this._regions.length; index++) {
    // 省略与上面相同 draw
    enabled_chains_points[index] = poly.points;
}
this.graphics.clear(true);
const enabled_chains_points_sort = enabled_chains_points.map((curPoly, curPoly_i) => {
    const count = enabled_chains_points.reduce((pre, nextPoly, nextPoly_i) => {
        if ((curPoly_i != nextPoly_i)) {
            const length = curPoly.length;
            for (let i = 0; i < length; ++i) {
                const p0 = curPoly[i];
                if (!cc.Intersection.pointInPolygon(p0, nextPoly))
                    return pre;
            }
            return pre + 1;
        }
        return pre;
    }, 0);

    return { curPoly, count };
}).sort((a, b) => {
    return a.count - b.count;
})
enabled_chains_points_sort.forEach(({ curPoly, count }) => {
    this.graphics.fillColor = count % 2 === 0 ? cc.Color.ORANGE : cc.Color.BLACK;
    this._drawPoly(this.graphics, curPoly);
    this.graphics.fill();
})
```

顺便吐槽一下，`canvas` 中的 `fill` 可以带`evenodd` 的参数， 而 `cc.Graphics` 中不能带这个参数，可能是因为 `creator` 中的 `webgl` 画图不方便实现吧！(试图从源码中看看有没方案，最终还是自己多次填充了，而且`webgl`中的实现会不停创建`buffer` )。   


好吧，看看效果如何！

![](/img/in-post/202004/24-11.gif)   


# 优化

## 物理引擎

调低物理引擎的步长和处理的迭代次数。  

```ts
// onLoad() {
// 开启物理步长的设置
cc.director.getPhysicsManager().enabledAccumulator = true;
// 物理步长，默认 FIXED_TIME_STEP 是 1/60
cc.PhysicsManager.FIXED_TIME_STEP = 1 / 30;
// 每次更新物理系统处理速度的迭代次数，默认为 10
cc.PhysicsManager.VELOCITY_ITERATIONS = 8;
// 每次更新物理系统处理位置的迭代次数，默认为 10
cc.PhysicsManager.POSITION_ITERATIONS = 8;
```

## 多边形的顶点

计算的过程中，可能会带有小数，我们可以把所有的点都优化到整数范围。  

```ts
//const DIG_OPTIMIZE_SIZE = 1;
private _optimizePoint(point) {
    return [Math.floor(point[0] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE, Math.floor(point[1] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE];
}
```

`DIG_OPTIMIZE_SIZE`也可以改大一点，就是把图中红色的点都算作灰色的点。  

![](/img/in-post/202004/24-12.jpg)   


## 多边形的边

需要剔除一些长度为0的边。

去除一些共线的边，这边用到了向量的叉积，关于向量的点积和叉积介绍可以[参考之前的这一篇文章](https://mp.weixin.qq.com/s/-zh_4SEd_QMk56T0yE01hQ)。  

```ts
private _optimizeRegions() {
    const regions = [];
    for (let index = 0; index < this._regions.length; index++) {
        const pos = this._regions[index];
        const newPos = [];
        pos.forEach((p, i) => {
            p = this._optimizePoint(p);
            const p_pre = this._optimizePoint(pos[(i - 1 + pos.length) % pos.length]);
            const p_next = this._optimizePoint(pos[(i + 1) % pos.length]);
            const vec1 = cc.v2(p[0] - p_pre[0], p[1] - p_pre[1]);
            const vec2 = cc.v2(p_next[0] - p[0], p_next[1] - p[1]);
            if (vec1.lengthSqr() != 0 && vec2.lengthSqr() != 0 && vec1.cross(vec2) != 0) {
                newPos.push(p);
            }
        })

        if (newPos.length > 2) {
            regions.push(newPos);
        }
    }
    this._regions = regions;
}

```

## 触摸平滑连续

当手指滑动时，如果 `touch_move` 的抓取的两个点距离比较大的话，就会出现不平滑的情况。

![](/img/in-post/202004/24-13.jpg)   

这里用到向量的点乘帮助我们解决这个问题，不清楚向量计算[参考之前的这一篇文章](https://mp.weixin.qq.com/s/-zh_4SEd_QMk56T0yE01hQ)。  

算出两个触摸点和各自边的向量，与移动的方向向量关系，可以确定整个多边形的点。  

![](/img/in-post/202004/24-14.jpg)   

当两个偏移点距离太小我们就忽略。  

```ts
// private _touchMove(touch: cc.Touch) {
const regions = [[]];
const pos = this.graphics.node.convertToNodeSpaceAR(touch.getLocation());
const delta = touch.getDelta();
const count = DIG_FRAGMENT;
if (delta.lengthSqr() < 5) {
    for (let index = 0; index < count; index++) {
        const r = 2 * Math.PI * index / count;
        const x = pos.x + DIG_RADIUS * Math.cos(r);
        const y = pos.y + DIG_RADIUS * Math.sin(r);
        regions[0].push(this._optimizePoint([x, y]));
    }
} else {
    const startPos = pos.sub(delta);
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
        regions[0].push(this._optimizePoint([x, y]));
    }
}
```

## 调用 `PolyBool` 的优化

在这个库 `https://github.com/voidqk/polybooljs` 中提到了更高级的用法。

![](/img/in-post/202004/24-15.jpg)   

```ts
// private _touchMove(touch: cc.Touch) {
const seg1 = PolyBool.segments({
    regions: this._regions,
    inverted: false
});
const seg2 = PolyBool.segments({
    regions,
    inverted: false
});
const comb = PolyBool.combine(seg1, seg2);
const result = PolyBool.polygon(PolyBool.selectDifference(comb));
```


# 其他

## 另一种实现思路

首先创建一堆刚体铺满所有泥土，在监听到触摸事件后，移除对应位置的刚体。  

## 算法参考

多边形算法我没有深究其实现，如果要做到更好的优化，可能需要自己去实现其中的算法，可以把上面的优化点融入到算法中。以下是一些相关算法的参考资料。  

- http://www.cs.ucr.edu/~vbz/cs230papers/martinez_boolean.pdf
- https://hal.inria.fr/inria-00517670/document
- https://www.sciencedirect.com/science/article/abs/pii/S0965997813000379

## 可能的问题

在`web`端测试感觉比较流畅，未在`native`端测试，也没有在微信小游戏端做测试。

# 小结

可能有其他更好的方案去实现这个功能，如果你有更好的方案，欢迎分享！欢迎加入qq交流群（`859642112`）一起讨论，群里收集了一些我认为还不错的书籍和资料。    

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`"物理挖洞！涂抹地形! "`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

# 视频讲解

**[视频讲解](https://b23.tv/BV1jz411z7w1)**

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/dig_hole)   
[参考文章](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg)  