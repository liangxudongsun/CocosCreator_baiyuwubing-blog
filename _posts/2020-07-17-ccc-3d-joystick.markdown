---
layout: post
title:  "3D摇杆控制器一种简单实现！Cocos Creator 3D! "
date:   2020-07-17 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 一个控制移动和视角的遥感控制器3D示例项目。   

# 效果  

![](/img/in-post/202007/17-01.gif)     

# 原理

在[贪吃蛇大作战！蛇移动的思考与实现!](https://mp.weixin.qq.com/s/qZ7CGFRmncxvQZ0Hhs4g5g) 中使用到一个摇杆控制器，不过这是在2D层面上，这次把它改到3D上。   

## 摇杆

摇杆的原理大致是把触摸点的位置传给需要的组件。(参考KUOKUO的摇杆组件改的)      

![](/img/in-post/202007/17-02.jpg)     

监听触摸事件后，需要做一次坐标转换。在 `Cocos 3D` 中 ，坐标转换要用 `UITransformComponent` 组件。  

![](/img/in-post/202007/17-03.jpg)     

接着把坐标和角度以事件的形式发送出去就可以了。  

```ts
onTouchMove(e: EventTouch) {
    const location = e.getUILocation();
    // 坐标转换
    let pos = this.uITransform.convertToNodeSpaceAR(new Vec3(location.x, location.y));
    // 根据半径限制位置
    this.clampPos(pos);
    // 设置中间点的位置
    this.midNode.setPosition(pos.x, pos.y, 0);
    // 算出与(1,0)的夹角
    let angle = this.covertToAngle(pos);
    // 触发回调
    this.joyCallBack.forEach(c => c.emit([pos, angle]));
}
```

## 移动与视角

这里分了三个节点去分别控制节点移动，角色旋转，视角旋转。  

![](/img/in-post/202007/17-04.jpg)     

使用摇杆返回的结果，根据模型初始状态和摄像机的角度，可以算出移动的速度和旋转的速度。  

```ts
/** 移动摇杆触发回调 */
joysitckCallback(vector: Vec3, angle: number) {
    // 根据摄像机的角度旋转
    Vec3.rotateZ(vector, vector, Vec3.ZERO, this.node_camera.eulerAngles.y * macro.RAD);
    this._vector = vector.normalize();
    if (angle) {
        // 模型初始朝前，补个90度
        this.node_role.eulerAngles = new Vec3(0, angle + 90 + this.node_camera.eulerAngles.y, 0);
    }
}

/** 旋转摇杆触发回调 */
joysitckAngleCallback(vector: Vec3, angle: number) {
    this._vectorAngle = vector.normalize();
}
```

根据速度，每帧刷新位置和角度就可以了。   

```typescript
fix_update(dt: number) {
    if (this._vector.lengthSqr() > 0) {
        this.node.setPosition(this.node.position.add3f(this._vector.x * SPEED * dt, 0, -this._vector.y * SPEED * dt));
    }  

    if (this._vectorAngle.lengthSqr() > 0) {
        this.node_camera.eulerAngles = this.node_camera.eulerAngles.add3f(0, -this._vectorAngle.x, 0);
    }
}
```

# 小结  
  
> 坐标转换！旋转！跳跃！不停歇！     

以上为白玉无冰使用 `Cocos Creator 3D v1.1.1` 实现 `"摇杆控制器！"` 的技术分享。欢迎分享给身边的朋友！    

> 那些不能激励自己的人一定是甘于平庸的人，无论他们的其他才能有多么令人印象深刻。

# 更多

[![两种方法实现亮度/饱和度/对比度的调整](/img/in-post/title/20200714.jpg)](https://mp.weixin.qq.com/s/bKjJS3KX2rEI0F7_4QPJEw)   
[![Assembler 源码解读及使用](/img/in-post/title/20200710.png)](https://mp.weixin.qq.com/s/YaPHcTN1lkgo5eiYoG3p9A)   
[![物理挖洞系列](/img/in-post/title/20200616.jpg)](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   
[█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/Cs2woHVVBT1zUHOoaq_VgA)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-3d-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   