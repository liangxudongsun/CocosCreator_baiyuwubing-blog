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

前往 `https://github.com/voidqk/polybooljs` 下载。并作为插件脚本。  

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

< 未完待续 >

# 其他

# 小结

> 动手实践！在实践中成长！在模仿中学习！  

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`"物理挖洞！涂抹地形! "`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

# 视频讲解

**[视频讲解](https://b23.tv/BV1jz411z7w1)**

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/dig_hole)   
[参考文章](https://mp.weixin.qq.com/s/Xcf-WPaqiIo-ef6O_IITFg)  