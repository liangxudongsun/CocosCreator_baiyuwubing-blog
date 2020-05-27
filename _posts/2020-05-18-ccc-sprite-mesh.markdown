---
layout: post
title:  "初探精灵(Sprite)中的网格(Mesh)渲染模式 ！ Cocos Creator ! "
date:   2020-05-18 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 小朋友你是否有很多问号？   

![](/img/in-post/202005/18-01.jpg)   


当 `Sprite` 组件选择渲染模式 `Mesh` 时，图片会没了？    

![](/img/in-post/202005/18-02.jpg)   

翻翻官方文档看看这个是什么东西？   

[https://docs.cocos.com/creator/manual/zh/components/sprite.htm](https://docs.cocos.com/creator/manual/zh/components/sprite.htm)   

![](/img/in-post/202005/18-03.jpg)   

按照文档，下载 `TexturePacker` 并导出，拖到编辑器内，改成 `Mesh` 果然出现图片了。  

![](/img/in-post/202005/18-04.jpg)   

请无视上面的红码，因为是免费版的，导出的时候自动加码了。  

好了，该开始研究一下该怎么用这个 `(Mesh)渲染模式` 。

除了使用 `TexturePacker` 导出的资源，我们还可以通过代码去实现这个网络模式。  

先看看 `MeshSpriteAssembler` 的源码。  

![](/img/in-post/202005/18-05.jpg)   

可以看到在 `sprite.spriteFrame` 中有一个数据 `vertices`。   

`vertices` 非常像在 [使用 mesh 实现多边形裁剪图片](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w) 中介绍的 `cc.Mesh`。  

根据命名和源码，大概可以猜到 `vertices` 中的每个参数的含义。  
- `x` ，位置坐标`x`的数组。
- `y` ，位置坐标`y`的数组。
- `nu` ，纹理坐标`u`的数组。
- `nv` ，纹理坐标`v`的数组。
- `triangles` ，顶点索引数组。


可以尝试一下传入一些数据进去。  
```ts
// this.sp // cc.Sprite
this.sp.spriteFrame.vertices = {
    x: [0, 100, 100],
    y: [0, 0, 100],
    nu: [0, 1, 1],
    nv: [0, 0, 1], 
    triangles: [0, 1, 2],
}
// 标记顶点数据修改过了
this.sp.setVertsDirty();  
```

效果如下。  

![](/img/in-post/202005/18-06.jpg)   

可以看出来位置坐标 `x` 和 `y` 是以左上角为原点。纹理坐标`u` 和 `v` 也是以左上角为原点。    

当然可以围成一个正方形，这只需要四个顶点数据，和六个顶点索引就可以了。   

![](/img/in-post/202005/18-07.jpg)   

再大致解释一下这些东西。  

![](/img/in-post/202005/18-08.jpg)   

通过上图可以看出来，`x` `y` `nu` `nv` 构成了顶点数据。

`triangles` 构成了顶点索引，告诉它该以什么顺序画三角形(`0->1->2`和`2->3->0`这两个三角形)。因为网络都是以三角形组成的。   


当然，这个 `MeshSpriteAssembler` 的顶点数据格式仅支持`位置坐标``纹理坐标``颜色值`这几个数据。而且默认颜色值是固定写一个值的。  

![](/img/in-post/202005/18-09.jpg)   

如果要定制其他数据值，或者实现渐变效果，可以自定义 `Assembler` ，达到自定义渲染的效果。  

[https://docs.cocos.com/creator/manual/zh/advanced-topics/custom-render.html](https://docs.cocos.com/creator/manual/zh/advanced-topics/custom-render.html)

![](/img/in-post/202005/18-10.jpg)   

这些内容且听下回分解(挖一个坑)～   

以上为白玉无冰使用 `Cocos Creator v2.3.3` 关于 `"精灵(Sprite)中的网格(Mesh)渲染模式"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。   


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   