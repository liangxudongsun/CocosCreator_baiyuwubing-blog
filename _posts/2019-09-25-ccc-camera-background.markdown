---
layout: post
title:  "cocos creator | 用摄像机实现背景滚动"
date:   2019-09-25 23:33:33 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> 利用摄像机的移动实现背景的移动

![](/img/in-post/2019-09-25-bg.png)

### 基本原理
利用摄像机拍摄时移动摄像拍摄点，在显示器上会呈现滚动效果。
![](/img/in-post/2019-09-25-camera.png)


### 创建拍摄画布
创建一个新的typescript项目。  
在场景中添加一个场景两倍宽的画布节点，并将两张背景图放在画布节点内。
![](/img/in-post/2019-09-25-node-background.png)
为两张背景图添加分组`bg`
![](/img/in-post/2019-09-25-node-background-group.png)

### 创建显示画布
在场景中添加一个**sprite**用于这个摄像机显示的画布。因为用摄像机会上下反转，要修改`scaleY`为`-1`。并将它放在中间，大小调整为场景大小。
![](/img/in-post/2019-09-25-node-show.png)

### 添加摄像机
接着在拍摄画布里添加一个摄像机，并将摄像机的拍摄分组选为`bg`。
![](/img/in-post/2019-09-25-node-camera.png)

### 绑定摄像机到显示画布
修改`Helloworld.ts`里的代码，添加`camera`和画布`sprite`的声明。绑定`camera`的`targetTexture`到显示画布`spriteFrame`。参考代码如下:
```js
//Helloworld.ts
const { ccclass, property } = cc._decorator;
@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Camera)
    camera: cc.Camera = null;
    @property(cc.Sprite)
    sp_camera: cc.Sprite = null;
    onLoad() {
        const texture = new cc.RenderTexture();
        texture.initWithSize(this.sp_camera.node.width, this.sp_camera.node.height);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        this.sp_camera.spriteFrame = spriteFrame;
        this.camera.targetTexture = texture;
    }
}
```
将摄影机和画布绑定脚本上:
![](/img/in-post/2019-09-25-ccc-script.png)

### 移动摄像机
摄像机拍摄的区域从黄色的框到红色的框，位置更好是场景的宽度的一边到另一边。
![](/img/in-post/2019-09-25-node-camera-move.png)
可以在`update()`里刷新，位置到最右边的时候要改成最左边。
```js
update() {
    let newX = this.camera.node.x + 2;
    if (newX > this.node.width / 2) {
        newX = -this.node.width / 2;
    }
    this.camera.node.x = newX;
}
```
效果预览：
![](/img/in-post/2019-09-25-preview.gif)


 
[项目源码地址](https://github.com/baiyuwubing/cocos_creator_camera_demo/tree/Background){:target="_blank"}

----
cocos creator v2.0.8