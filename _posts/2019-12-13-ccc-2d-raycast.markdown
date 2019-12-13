---
layout: post
title:  "反复横跳的瞄准线！ 从向量计算说起！ 基于射线检测的实现！ Cocos Creator! "
date:   2019-12-12 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 最近有小伙伴问我瞄准线遇到各种形状该怎么处理？如何实现反复横跳的瞄准线？最近刚好在《Cocos Creator游戏开发实战》中看到物理系统有一个射线检测，于是，基于这个射线检测，写了一个反复横跳的瞄准线效果。一起往下看吧！文章底部获取完整项目！


国际惯例，先上最终效果！

![](/img/in-post/201912/12-result.gif)  

在讲解之前我们需要一些向量的知识，简单的介绍一些吧！

向量的加法，`OA + AB = OB`   

![](/img/in-post/201912/12-01.png)  


向量的点乘，表示一个向量在另一个向量上的投影，是个标量，有正负之分。向量夹角小于 90度 为正数，等于 90度 为 零，大于 90度 为负数。

![](/img/in-post/201912/12-02.png)  

向量的叉乘，结果为向量，正好垂直于两个向量构成的平面(右手系)，也称为法向量。这里暂时没用到，顺便提一下。

接下来进入正题，已知入射向量(单位向量)，法向量(单位向量)，如何得出反射向量？

![](/img/in-post/201912/12-03.png)  

我们将反射向量平移至入射向量起点，延长法向量与其相交，这个延长线的长度，刚好是 **入射向量在法向量上的投影的相反数的两倍** 。再根据投影和向量加法可以推出反射向量的计算公式。

![](/img/in-post/201912/12-04.png)  

清楚了么？不清楚也没关系，记得最后的公式就可以了，接下来进入 cocos creator 操作环节。

既然是物理系统中的碰撞检测，我们在编辑器里添加的是物理系统中的碰撞器，而不是引擎的碰撞器，不要选错了哦。

![](/img/in-post/201912/12-05.png)  

不动的刚体类型设为 `static` ，添加完所有的物理碰撞器后如下所示。

![](/img/in-post/201912/12-06.png)  

用到物理引擎自然要把物理引擎打开。

```
cc.director.getPhysicsManager().enabled = true;
```

如何进行射线检测的？通过起始点、入射方向和剩余线段的长度获取射线检测的结果。如果检测到碰撞体，就画入射线段，并计算反射方向，再次进行射线检测；如果未检测到碰撞体，就把剩余线段画完。主要代码如下：

```
/**
 * @description 计算射线
 * @param startLocation 起始位置 世界坐标系
 * @param vector_dir 单位方向向量
 */
private drawRayCast(startLocation: cc.Vec2, vector_dir: cc.Vec2) {
    // 剩余长度
    const left_length = AIM_LINE_MAX_LENGTH - this._cur_length;
    if (left_length <= 0) return;
    // 计算线的终点位置
    const endLocation = startLocation.add(vector_dir.mul(left_length));
    // 射线测试
    const results = cc.director.getPhysicsManager().rayCast(startLocation, endLocation, cc.RayCastType.Closest);
    if (results.length > 0) {
        const result = results[0];
        // 指定射线与穿过的碰撞体在哪一点相交。
        const point = result.point;
        // 画入射线段
        this.drawAimLine(startLocation, point);
        // 计算长度
        const line_length = point.sub(startLocation).mag();
        // 计算已画长度
        this._cur_length += line_length;
        // 指定碰撞体在相交点的表面的法线单位向量。
        const vector_n = result.normal;
        // 入射单位向量
        const vector_i = vector_dir;
        // 反射单位向量
        const vector_r = vector_i.sub(vector_n.mul(2 * vector_i.dot(vector_n)));
        // 接着计算下一段
        this.drawRayCast(point, vector_r);
    } else {
        // 画剩余线段
        this.drawAimLine(startLocation, endLocation);
    }
}
```

如何画瞄准线小圈圈？通过结束位置和起始位置计算数量和间隔向量，画出一个个小圆圈。参考代码如下。

```
/**
 * @description 画瞄准线
 * @param startLocation 起始位置 世界坐标系
 * @param endLocation 结束位置 世界坐标系
 */
private drawAimLine(startLocation: cc.Vec2, endLocation: cc.Vec2) {
    // 转换坐标
    const graphic_startLocation = this.graphic_line.node.convertToNodeSpaceAR(startLocation);
    this.graphic_line.moveTo(graphic_startLocation.x, graphic_startLocation.y);
    // 画小圆圆
    // 间隔
    const delta = 20;
    // 方向
    const vector_dir = endLocation.sub(startLocation);
    // 数量
    const total_count = Math.round(vector_dir.mag() / delta);
    // 每次间隔向量
    vector_dir.normalizeSelf().mulSelf(delta);
    for (let index = 0; index < total_count; index++) {
        graphic_startLocation.addSelf(vector_dir)
        this.graphic_line.circle(graphic_startLocation.x, graphic_startLocation.y, 2);
    }
}
```

![](/img/in-post/201912/12-07.png)  


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/aimLine)   
[参考文章](https://mp.weixin.qq.com/s/-zh_4SEd_QMk56T0yE01hQ)   