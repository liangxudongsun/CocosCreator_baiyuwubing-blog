---
layout: post
title:  "cocos creator | 用摄像机实现残影幻影拖尾效果"
date:   2019-09-29 08:08:08 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> 超级幻影了解一下？

![](/img/in-post/2019-09-29-bg.png)

### 基本原理
利用摄像机拍摄角色，然后投影到多个显示画布，给画布节点设置不同的透明度，最后让画布节点跟随角色移动。  
![](/img/in-post/2019-09-29-camera.png)

### 创建角色和摄像机
创建一个新的typescript项目。  
创建一个角色节点，并添加分组`role`。
![](/img/in-post/2019-09-29-role.png)
接着在角色节点里添加一个摄像机，并将摄像机的拍摄分组选为`role`。
![](/img/in-post/2019-09-29-node-camera.png)

### 创建显示画布
在场景中添加多个**sprite**用于这个摄像机显示的画布。因为用摄像机会上下反转，要修改`scaleY`为`-1`。并将它放在角色节点的下一层级，大小调整为角色节点大小，位置和角色节点一样。将画布的透明度设置为不同的数值。
![](/img/in-post/2019-09-29-node-show.png)

### 绑定摄像机到显示画布
修改`Helloworld.ts`里的代码，添加摄像机`camera`，角色节点和画布数组`sprite`的声明。绑定`camera`的`targetTexture`到显示画布`spriteFrame`。参考代码如下:
```js
//Helloworld.ts
const { ccclass, property } = cc._decorator;
@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Camera)
    camera: cc.Camera = null;
    @property([cc.Sprite])
    sp_cameras: cc.Sprite[] = [];
    @property(cc.Node)
    node_icon: cc.Node = null;
    onLoad() {
        const texture = new cc.RenderTexture();
        texture.initWithSize(this.sp_cameras[0].node.width, this.sp_cameras[0].node.height);
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        this.camera.targetTexture = texture;
        this.sp_cameras.forEach((v) => {
            v.spriteFrame = spriteFrame
        })
    }
}
```
将摄影机，角色节点和画布绑定脚本上:
![](/img/in-post/2019-09-29-ccc-script.png)

### 显示画布的跟随
可以监听node节点`cc.Node.EventType.TOUCH_MOVE`事件控制角色节点移动。参考代码：
```ts
    onLoad() {
        //...
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onNodeIconTouchMove, this);
    }
    private onNodeIconTouchMove(evt: cc.Event.EventTouch) {
        this.node_icon.x += evt.getDeltaX();
        this.node_icon.y += evt.getDeltaY();
    }
```
设置一个定时器，让画布节点跟随角色节点运动。参考代码
```ts
    onLoad() {
        //...
        this.schedule(this.shadowFollow, 0.1, cc.macro.REPEAT_FOREVER);
    }
    private shadowFollow() {
        this.sp_cameras.forEach((v, i) => {
            const dis = this.node.position.sub(v.node.position).mag(); 
            if (dis > 0) {
                v.node.stopAllActions();
                v.node.runAction(cc.moveTo(i * 0.05 + 0.02, this.node_icon.x, this.node_icon.y));
            }
        })
    }
```

### 效果预览
![](/img/in-post/2019-09-29-shadow-preview.gif)


 
[项目源码地址](https://github.com/baiyuwubing/cocos_creator_camera_demo/tree/shadow){:target="_blank"}

----
cocos creator v2.0.8