---
layout: post
title:  "浅析射线检测 raycast 的使用 ！Cocos Creator 3D ！ "
date:   2019-12-05 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 哎呀？为什么我设置了节点点击回调没反应呀？

![](/img/in-post/201912/05-01.png)  

记得在写小鸡拍拍的时候遇到一个问题，想要捕捉排球的点击事件，按照 2d 的写法，给3d 节点添加 node 事件，结果点了没反应。代码大概是以下的样子。

```
this.node_volleyball.on(Node.EventType.TOUCH_START, () => {
    console.log('不可能看见我')
}, this);
```

后来在论坛上找了个方法，稀里糊涂的写上去就完事了。



但是，最近我把版本升级到 v1.0.1 之后，发现之前的方法不管用了。还好，在最新官方文档找到了解决方案。那 就 是 —— **射线检测** 。

![](/img/in-post/201912/05-02.png)  

什么是射线检测呢？上网查了一下，射线检测是这样子的。

![](/img/in-post/201912/05-03.png)  

这好像不是我想要的东西。于是，我就脑补了一下射线检测是怎么个逻辑。

首先，我们看到的视角是这样子的。假设我们点击其中屏幕中的一个位置(图中的红点点)。

![](/img/in-post/201912/05-04.png)  

因为这个视角是摄像机提供的，我们就把这个点点和摄像机组合一条射线。

![](/img/in-post/201912/05-05.png)  

接着，检查这条射线穿过了那些物体，这些物体中可能就有我们点击的对象。

也可以这么理解，你用眼睛看着一块区域，伸出手指。你可以看到手指头挡住了一点视线，从你的视线做经过手指这个点画一条射线，这个射线穿过的物体，就刚好是你想要点击的物体。

![](/img/in-post/201912/05-06.png)  

讲了大概原理(?)，一起看看如何使用吧。

既然是射线检测，当然要先创建一个射线。

```
private _ray: geometry.ray = new geometry.ray();
```

触摸检测的就用全局系统事件。

```
systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
//onTouchStart(touch: Touch, event: EventTouch)
```

开始画射线，就要用到摄像机嘛！记得上面说的是由点击的点和摄像机决定这条射线的吧。

```
this.camera_3d.screenPointToRay(touch._point.x, touch._point.y, this._ray);
```

接下来就是检测这条线穿过了哪些物体啦。

creator 3d 提供了三种检测方案，可以一起看看是如何使用的。

**基于物理碰撞器的射线检测：**

我们先给需要检测的物体添加碰撞器。

![](/img/in-post/201912/05-07.png)  

在代码中调用物理碰撞器检测方法就可以啦。

```
//基于物理碰撞器的射线检测
if (PhysicsSystem.instance.raycast(this._ray)) {
    const r = PhysicsSystem.instance.raycastResults;
    for (let i = 0; i < r.length; i++) {
        const item = r[i];
        if (item.collider.node.uuid == this.node_volleyball.uuid) {
            this.label_info.string = '点了排球'
        }
    }
}
```

**基于模型的射线检测：**

大致与物理模型检测相同，使用的是模型组件。

![](/img/in-post/201912/05-08.png)  

检测代码如下。

```
//基于模型的射线检测
const rs = director.getScene().renderScene;
if (rs.raycastSingleModel(this._ray, this.model_basketball.model)) {
    const r = rs.rayResultSingleModel;
    for (let i = 0; i < r.length; i++) {
        const item = r[i];
        if (item.node.uuid == this.model_basketball.node.uuid) {
            this.label_info.string = '点了篮球'
        }
    }
}
```

**基于 UITransform 组件的射线检测：**

因为 canvas 有自己的相机实体，我们需要切换摄像机，代码如下。

```
//基于 UITransform 组件的射线检测
const uiCamera = this.canvas_2d.camera;
uiCamera.screenPointToRay(this._ray, touch._point.x, touch._point.y);
if (rs.raycastAllCanvas(this._ray)) {
    const result = rs.rayResultCanvas;
    for (let i = result.length; i--;) {
        const item = result[i];
        if (item.node.uuid == this.label_info.node.uuid) {
            this.label_info.string = '点了文字';
        }
    }
}
```

![](/img/in-post/201912/05-09.png)  


一起看看最后的效果吧！

![](/img/in-post/201912/05-result.gif)  


---

![](/img/in-post/bottom.png)  

---

本文使用图片素材来自网络！版权归原作者所有，如有侵权还请联系！

[完整代码](https://github.com/baiyuwubing/cocos-creator-3d-examples/tree/master/raycast)   
[参考文章](https://mp.weixin.qq.com/s/ATbpJNKromv17ke1cWgDDw)   