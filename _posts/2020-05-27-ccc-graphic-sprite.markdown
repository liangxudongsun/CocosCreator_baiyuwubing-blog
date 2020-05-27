---
layout: post
title:  "画线纹理的一种简单实现！ Cocos Creator ! "
date:   2020-05-27 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> `cc.Graphics` 画线也能加纹理了？文末附送完整代码。  

在 [初探精灵中的网格渲染模式 ！](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg) 中简单分析了 `Sprite` 组件的渲染模式 `Mesh` 。  

![](/img/in-post/202005/18-08.jpg)   

这次，我们应用 `Sprite` 渲染模式 `Mesh` 和 `cc.Graphics` ，实现画线纹理的操作。  

先看看效果如何。  

![](/img/in-post/202005/27-01.gif)   

先在场景创建一个 `cc.Graphics` 节点。并添加一个子节点 `cc.Sprite` ，渲染模式改为 `Mesh` 。     

![](/img/in-post/202005/27-02.jpg)   

因为 `Mesh` 中计算的坐标是从左上角，而 `Graphics` 画图是从中心开始画的。  

所以 `cc.Sprite` 节点， `Scale` 调整为 `(1,-1)`， `Anchor` 调整为 `(0,1)`。  

为了使纹理超出边界后可以重复填充，这个纹理大小得是 `2` 的 `n` 次方，并设为 `Repeat`。  

![](/img/in-post/202005/27-03.jpg)   

画纹理肯定需要坐标位置信息。  

来一起看看，`Graphics` 的 `webgl` 实现。  

![](/img/in-post/202005/27-04.jpg)   

`Graphics` 中有一个 `_impl` 变量。  

这个 `_impl` 里有一个 `_paths` 变量，记录了所有画线路径，和对应的画线的点。  

都会 `lineTo` 和 `moveTo` 往 `_paths` 塞入画线的点数据。  

对于 `circle` 和 `arc` 以及 `rect` 等接口，最终还是调用 `lineTo` 和 `moveTo` 。  

所以有了这个 `_paths` 我们画纹理的时候，可以先把点遍历出来。  

```ts
for (let index = 0; index < _impl._paths.length; index++) {
    const path = _impl._paths[index];
    const pathPoints = path.points;
    if (pathPoints.length < 2) continue;
    for (let index2 = 1; index2 < pathPoints.length; index2++) {
        // 当前点
        const p = cc.v2(pathPoints[index2].x, pathPoints[index2].y);
        // 上一个点
        const p_pre = cc.v2(pathPoints[index2 - 1].x, pathPoints[index2 - 1].y);
    }
}
```

如何画纹理呢？ 

先考虑相邻的两个点，再根据线宽 `w` 画一个长方形。长方形有四个点，我们要求出这四个点的坐标。      

先算出这两个点的方向。  

```ts
const dir = p.sub(p_pre); //方向
```

接着求出一个垂直方向的向量(根据向量内积为0求出)，长度为线宽一半。  

```ts
const cross_dir = (dir.y == 0 ? cc.v2(0, 1) : cc.v2(1, -dir.x / dir.y).normalize()).mulSelf(w / 2); //垂直方向
```

![](/img/in-post/202005/27-05.jpg)  

根据两个点和垂直方向可以求出这个长方形的四个顶点。   

```ts
const p_r_t = p.add(cross_dir); //右上
const p_r_b = p.sub(cross_dir); // 右下
const p_l_t = p_pre.add(cross_dir); // 左上
const p_l_b = p_pre.sub(cross_dir); // 左下
```

最后根据四个点填充 `sprite.spriteFrame` 中的数据 `vertices` ，如果不理解的话，可以参考[初探精灵中的网格渲染模式 ！](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)    

![](/img/in-post/202005/27-06.jpg)  

对于 `uv` 纹理坐标，这边就直接使用顶点坐标的缩放一个系数。参考代码如下。    

```ts
const uv_mul = 50;
const i_offset = vertices.x.length;
vertices.x.push(p_r_t.x, p_r_b.x, p_l_t.x, p_l_b.x);
vertices.y.push(p_r_t.y, p_r_b.y, p_l_t.y, p_l_b.y);
vertices.nu.push(p_r_t.x / uv_mul, p_r_b.x / uv_mul, p_l_t.x / uv_mul, p_l_b.x / uv_mul);
vertices.nv.push(p_r_t.y / uv_mul, p_r_b.y / uv_mul, p_l_t.y / uv_mul, p_l_b.y / uv_mul);

vertices.triangles.push(i_offset + 0);
vertices.triangles.push(i_offset + 1);
vertices.triangles.push(i_offset + 2);
vertices.triangles.push(i_offset + 1);
vertices.triangles.push(i_offset + 2);
vertices.triangles.push(i_offset + 3);
```

这么画长方形存在一个问题，对于画圆弧，如果分隔太大，或者线宽比较大，会出现分割的问题。  

![](/img/in-post/202005/27-07.jpg)  

怎么解决这个问题呢？

一是可以参考源码，把连接处补上。  

另一种方式是直接用 `GraphicsAssembler` 中的 `buffers` 数据，重新组织一下。  

![](/img/in-post/202005/27-08.jpg)  

当然，这些等我研究出来再分享给大家(日常挖坑)！  

以上为白玉无冰使用 `Cocos Creator v2.3.3` 关于 `"画线纹理的一种简单实现！"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。   

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/graphics_sprite)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   