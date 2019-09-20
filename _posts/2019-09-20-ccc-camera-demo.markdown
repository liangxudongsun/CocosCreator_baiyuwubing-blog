---
layout: post
title:  "cocos creator 用摄像机实现局部缩放的效果"
date:   2019-09-20 20:00:00 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> 多摄像机的支持可以让你轻松实现高级的自定义效果，比如双人分屏效果，或者场景小地图的生成。  

![](/img/in-post/2019-09-20-bg.png)
### 摄像机是什么
摄像机(camera)是玩家观察游戏世界的窗口。可以这样理解，你在电视📺电脑💻上看到的演唱会直播等，会有不同的视角切换，这是因为切换不同的摄像机📹视角实现的。创建场景时，Creator 会默认创建一个名为 **Main Camera** 的摄像机，作为这个场景的主摄像机。

### 添加一个摄像机
我们先创建一个新的typescript项目。
![](/img/in-post/2019-09-20-ccc-new-project.png)
接着在场景中添加一个摄像机，并改名为`camera`。
![](/img/in-post/2019-09-20-ccc-camera.gif)

### 添加摄像机显示画布
在场景中添加一个**sprite**用于这个摄像机显示的画布。因为用摄像机会上下反转，要修改`scaleY`为`-1`。混合模式改成`ONE`。
![](/img/in-post/2019-09-20-ccc-sprite.png)
摄像机不能把显示画布里的内容放在摄像内，我们要为画布添加一个分组。
![](/img/in-post/2019-09-20-ccc-sprite-group.png)
而摄像机不能显示这分组。
![](/img/in-post/2019-09-20-ccc-camera-mask.png)

### 绑定摄像机到画布
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
    start() {
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
![](/img/in-post/2019-09-20-ccc-script.png)
运行预览效果:
![](/img/in-post/2019-09-20-ccc-result-1.png)

### 控制摄像机
我们还要学会操作摄像机，就像演唱会直播一样，有时摄像机看歌手，有时要看下舞者，有时要近距离看，有时要看的远一点。找到摄像机的属性节点，`Position`属性是摄像机看的位置，而`Zoom Ratio`表示摄像机的远近。
![](/img/in-post/2019-09-20-ccc-camera-prop.png)
修改`Position`为`100,100`,`Zoom Ratio`为`0.8`，运行预览：
![](/img/in-post/2019-09-20-ccc-result-2.png)

### 添加滚动条控制摄像机
我们还可以添加不同的滚动条来控制摄像机的距离，位置。
![](/img/in-post/2019-09-20-ccc-camera-preview.gif)
[项目源码地址](https://github.com/baiyuwubing/cocos_creator_camera_demo){:target="_blank"}

----
cocos creator v2.0.8