---
layout: post
title:  "使用 mesh 实现多边形裁剪图片！Cocos Creator！"
date:   2020-01-10 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 和 mask 裁剪图片说拜拜，用上高性能的 shader 。文章底部获取完整代码！

# 效果预览：

![](/img/in-post/202001/10-result.jpg)  

# 使用方法：

1. 创建一个空节点
2. 添加用户脚本组件 `mesh-texture-mask`
3. 添加图片
4. 添加修改多边形顶点坐标

![](/img/in-post/202001/10-01.png)  

# 实现原理

## 创建 `mesh`

`mesh` 是什么？ `mesh` 是决定一个物体形状的东西。 例如在二维中可以是正方形、圆形、三角形等；在三维中可以是正方体、球体、圆柱体等。

`mesh` 初始化需要一个 `VertexFormat` 对象。这个对象是顶点格式对象。

![](/img/in-post/202001/10-02.png)  

其中 `name` 是对应顶点着色器的 `attribute` 变量的值。 `type` 对应数据类型，决定了每个数据大小。

![](/img/in-post/202001/10-03.png)  

`num` 对应有几个数据分量(猜的哈哈！)。例如二维坐标和纹理uv坐标一般只有`x`和`y`两个分量，所以设置为2；三维坐标有`xyz`三个变量，所以值为3；而颜色一般有 `rgba` 四个分量，所以设置为4。

![](/img/in-post/202001/10-04.png)  

`normalize` 表示归一化。

![](/img/in-post/202001/10-05.png)  


对于我们的多边形裁剪图片，只需要一个二维坐标和一个纹理uv坐标，创建 `mesh` 参考代码如下:
```js
const gfx = cc.gfx;
let mesh = new cc.Mesh();
mesh.init(new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
]), this.vertexes.length, true);
```

## 计算纹理uv坐标

纹理uv坐标系在左上角，`u`轴是向右，`v`轴是向下，范围是 0～1。而我们的坐标系在中间，`x`轴向右，`y`轴向上。

![](/img/in-post/202001/10-06.png)  

所以我们可以先求出`x,y`在左下角的占比，然后再反转一下`y`轴，转成`uv`坐标系。参考代码如下。

```js
const vx = (pt.x + this.texture.width / 2 + this.offset.x) / this.texture.width;
const vy = 1.0 - (pt.y + this.texture.height / 2 + this.offset.y) / this.texture.height;
```

## 计算顶点索引

首先需要知道一个概念，绘制一个形状实际上是绘制多个三角形。一个多边形可以分割成多个三角形，而顶点索引是告诉它如何去绘制这些三角形。

![](/img/in-post/202001/10-07.jpeg)  

如何将一个多边形切割成多个三角形？可以采用'耳切法'的方式。把多边形的一个耳朵切掉，然后再对剩下的多边形再次切割。

![](/img/in-post/202001/10-08.png)  

怎么样的耳朵才能切呢？这个耳朵的顶点需要满足是凸顶点且没有其他顶点在这个耳朵里。

![](/img/in-post/202001/10-09.jpg)  

如何判断是凸顶点呢？首先要知道向量外积的定义，表示向量的法向量。方向根据右手法则确定，就是手掌立在a、b所在平面的向量a上，掌心由a转向b的过程中，大拇指的方向就是外积的方向。

![](/img/in-post/202001/10-10.png)  

对于`cc.Vec2`的外积就是面积，有正负之分，也是根据右手法则确定。

![](/img/in-post/202001/10-11.png)  

若多边形ABCDEF顶点以逆时针顺序排序的话，`AB x BC > 0` 表示B点是凸顶点。参考代码如下。

```js
const v1 = p2.sub(p1);
const v2 = p3.sub(p2);
if (v1.cross(v2) >= 0) {
    // 是凸点
}
```

判断点D是否在三角形ABC内，可以通过外积计算点与线的位置关系判断出。

![](/img/in-post/202001/10-12.png)  

```js
// 判断一个点是否在三角形内
_testInTriangle(point, triA, triB, triC) {
    let AB = triB.sub(triA), AC = triC.sub(triA), BC = triC.sub(triB), AD = point.sub(triA), BD = point.sub(triB);
    return (AB.cross(AC) >= 0 ^ AB.cross(AD) < 0)  // D,C 在AB同同方向
        && (AB.cross(AC) >= 0 ^ AC.cross(AD) >= 0) // D,B 在AC同同方向
        && (BC.cross(AB) > 0 ^ BC.cross(BD) >= 0); // D,A 在BC同同方向
},
```

最后把以上综合起来就可以计算出顶点索引。

# 小结

以上为白玉无冰使用 Cocos Creator v2.2.2 开发"使用 mesh 实现多边形裁剪图片"的技术分享。有想法欢迎留言！如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---

[多边形分解成三角形算法](https://blog.csdn.net/zzq61974/article/details/87635763)  

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/meshTexture)   
<!-- [参考文章](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)    -->