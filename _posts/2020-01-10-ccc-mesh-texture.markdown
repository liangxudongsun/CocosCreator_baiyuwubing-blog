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

(未完待续)


# 小结

以上为白玉无冰使用 Cocos Creator 开发"使用 mesh 实现多边形裁剪图片"的技术分享。有想法欢迎留言！如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/meshTexture)   
<!-- [参考文章](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)    -->