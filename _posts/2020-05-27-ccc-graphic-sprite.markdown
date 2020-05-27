---
layout: post
title:  "画线纹理的一种简单实现！ Cocos Creator ! "
date:   2020-05-27 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> `cc.Graphics` + `cc.Sprite` 实现画线纹理。   

  

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

这边考虑两个点，每两个点画一个长方形。  

![](/img/in-post/202005/27-05.jpg)   


  
---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/graphics_sprite)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   