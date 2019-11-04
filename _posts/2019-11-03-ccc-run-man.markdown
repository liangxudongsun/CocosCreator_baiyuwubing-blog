---
layout: post
title:  "cocos creator | 盯着双11开喵铺里的小人许久，我也写了一个！"
date:   2019-11-03 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---
> 打开支付宝，天猫双11合伙人全面开喵铺的活动映入眼帘。点击进去后，我竟然盯着小人走路许久，琢磨着，自己也写个玩玩吧！  

![](/img/in-post/201911/2019-11-02-bg.png)  

# 效果预览

先一起看看最终实现效果是怎么样的吧。  

![](/img/in-post/201911/2019-11-02-result.gif)


# 配置环境

cocos creator 2.0.8 (其他版本可能也可以) + typescript  

# 看看如何使用
```ts
@property(cc.Prefab)
charaterPrefab: cc.Prefab = null; //角色预制节点

onEnable() {
    for (let index = 0; index < 6; index++) {
        const node = cc.instantiate(this.charaterPrefab);
        //初始化 父节点，移动区域(最小x,最大x,最小y,最大y)
        node.getComponent(charaterItem).init(this.node, -this.node.width * 0.6, this.node.width * 0.6, -this.node.height * 0.1, this.node.height * 0.1);
    }
}
```

# 实现逻辑

先一起看看我们的图片资源。  

![](/img/in-post/201911/2019-11-02-img.png)  


我们每个小人都是一张合图，可以看到是3X4的结构，其中第一列是往左的动画，第四列是向右的动画。  

因为每个图片的布局规律是一样的，所以没有去生成plist文件。  

由于是一张大图，加上有多个角色大图，动画播放的控制也没有使用引擎的动画编辑器。  

最终采用的方案是切割大图的 SpriteFrame，使用 setRect 保存为小图 SpriteFrame。因为大图的大小为 96x32，所以每个块的大小为 16x32 。  

![](/img/in-post/201911/2019-11-02-count.png)  

并按照上图进行切割编号保存在数组中，切图代码参考:  
```ts
@property([cc.SpriteFrame])
spriteFrames: cc.SpriteFrame[] = []; //所有大图

private _spriteFrames: cc.SpriteFrame[][] = [];//[大图编号][每个小图编号]

onLoad() {
    for (let index = 0; index < this.spriteFrames.length; index++) {
        const element = this.spriteFrames[index];
        this._spriteFrames[index] = [];
        for (let index2 = 0; index2 < 12; index2++) {
            this._spriteFrames[index][index2] = element.clone();
            this._spriteFrames[index][index2].setRect(cc.rect(16 * Math.floor(index2 / 3), 32 * (index2 % 3), 16, 32));
        }
    }
}
```

最后模拟向左运动，初始化的时候放在最右边，移动到最右边的时候再重新初始化。核心代码参考如下。  

```ts
private moveOneStep() {
    switch (this._dir) {
        case EnumChararerDir.none: {
            break;
        }
        case EnumChararerDir.left: {
            this.sp.spriteFrame = this._spriteFrames[this._img_type][[0, 1, 0, 2][this._stpe_count % 4]];
            this.node.x -= 5;
            if (this.node.x < this._minX) {
                this.initDir();
                return;
            }
            break;
        //...省略其他方向
        }
    this._stpe_count++;
    this.scheduleOnce(() => {
        this.moveOneStep();
    }, this._step_st);
}

private initDir() {
    this._dir = Math.floor(2 * Math.random()) + 1;// 1-左 2-右
    this._step_st = 0.1 + Math.random() * 0.04; // 移动一步的时间
    this._stpe_count = 0;
    this._img_type = Math.floor(this._spriteFrames.length * Math.random()); // 随机一个角色
    this.node.y = this._minY + Math.random() * (this._maxY - this._minY);
    this.node.x = this._minX + Math.random() * (this._maxX - this._minX);
    switch (this._dir) {
        case EnumChararerDir.left: {
            this.node.x = this._maxX;
            break;
        }
        //...省略其他方向
    }

    this.node.opacity = 0;
    this.scheduleOnce(() => {
        this.node.opacity = 255;
        this.moveOneStep();
    }, 5 * Math.random())
}
```

# 小结

小人动画大图切割使用的是 SpriteFrame setRect 。 模拟移动采用的是定时器不停切换图片和改变坐标位置。  

如果有更好的想法，欢迎留言分享！  

--- 

游戏开发小赤佬，也玩python 和 shell。—白玉无冰  

---

[源码获取](https://mp.weixin.qq.com/s/DiB031FORp2JNmWXTdVzmw)  