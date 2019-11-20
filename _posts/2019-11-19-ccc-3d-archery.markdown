---
layout: post
title:  "cocos creator 3D | 拇指射箭 "
date:   2019-11-19 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> 拇指射箭！你能射中靶心么？

![](/img/in-post/201911/1119-bg.jpeg)  

# 效果预览     

![](/img/in-post/201911/1119-result.gif)  

### 配置环境：

cocos creator 3d v1.0.0

### 玩法介绍：

长按屏幕，拖动瞄准，放手发射。风向、重力和距离影响最终结果！越靠近中心得分越高！最高分10分！  

# 实现原理     

### 流程图：

![](/img/in-post/201911/1119-flow.png)    

### 镜头控制：

采用两个摄像机控制镜头显示。一个是发射视角的摄像机；另一个是绑定在箭节点的摄像机，会跟随箭一起移动。通过控制摄像机节点的 active 实现镜头切换。  

![](/img/in-post/201911/1119-camera.png)    

### 弓箭控制：

通过触摸移动的距离乘以一个调控系数，控制弓箭的位置。    

```ts
private onTouchMove(touch: Touch) {
    const delta = touch.getDelta();
    this.NodePos_bows.x -= delta.x * CONST_TOUCH_FACTOR;
    this.NodePos_bows.y += delta.y * CONST_TOUCH_FACTOR;
}
```

为所有需要控制位置的节点写了一个通用的组件脚本。只要为节点添加这个脚本，就可以通过设置 x,y,z 调整位置。  

```ts
export class NodePos extends Component {
    private _curPos: Vec3 = cc.v3();
    start() {
        this._curPos = this.node.position;
    }    
    get x() {
        return this._curPos.x;
    }
    set x(x: number) {
        this._curPos.x = x;
    }
    // 省略部分代码
    update(deltaTime: number) {
        this.node.position = this._curPos;
    }
}
```

### 发射箭：

使用 tween 控制箭位置，并在发射结果添加重力、风向和距离的影响。并为箭添加了拖尾组件。  

```ts
tweenUtil(this.NodePos_arrow)
    .stop()
    .to(5, { z: targetZ, x: targetX, y: targetY })
    .to(1, {})
    .call(() => {
        this.gameOver();
    })
    .start()
```

### 得分计算：

通过计算箭和靶心的距离，以及靶子的半径关系，可以计算出得分。  

```ts
const dis = this.NodePos_arrow.position.clone().subtract(this.NodePos_target.position).length();
const score = dis < CONST_TARGET_RADIUS ? ((1 - dis / CONST_TARGET_RADIUS) * 10).toFixed(2) : ('0');
```

# 小结     

这个拇指射箭游戏采用了两个摄像机控制镜头显示。由于 cocos creator 3d 不能直接设置 x,y,z 控制位置，所以写了个简单的组件控制位置。  

以上就是这个拇指射箭的主要实现方案，详细的细节可以在公众号内回复【拇指射箭】获取完整代码。文章底部可以点击链接试玩哦！打到 9 分以上还是要技巧的哦！  

---

![](/img/in-post/bottom.png)  

---

本文使用图片素材来自网络！版权归原作者所有，如有侵权还请联系！

[在线试玩](http://lamyoung.gitee.io/web/fingerArchery)   
[源码获取](https://mp.weixin.qq.com/s/ISsxM411netkEWLKi4v7XA)  