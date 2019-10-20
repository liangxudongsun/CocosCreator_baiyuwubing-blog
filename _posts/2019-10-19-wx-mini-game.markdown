---
layout: post
title:  "微信小游戏流量主广告接入指南！"
date:   2019-10-19 20:00:00 +0800
categories: wxcloud
tags:
    - wxcloud
---
> 什么？为什么审核不通过？

### 流量主

我们先从流量主说起。游戏通过审核发布上线，累计注册用户达到1000后，可以在管理后台开启流量主功能。  

发布上线是不会有自然的量进入你的游戏。为了开通流量主功能，一方面可以去找人玩游戏，另一种方法是利用公测功能。  

公测按钮在管理后台>>设置>>游戏设置。  

公测按钮点了后没有二次确认框，会直接开启公测！还没调好效果不要直接点了。  

我就直接点掉了公测，然后第二天差不多给了2000的量，第三天开始就没什么量了。  


### 排行榜

排行榜我接入了两种，一种是世界排行榜，用的是微信云开发，有兴趣的可以参考微信云开发之排行榜的实现；另一种是好友排行榜。  

好友排行需要后台配置一个，在管理后台>>设置>>游戏设置>>排行榜设置。  

排行榜设置需要运营素材配置过审。  


### 广告接入

广告类型有三种：激励式视频、插屏和Banner  

Banner广告接入需要注意：  

1. 广告要显示全，不能放在屏幕外。  
2. 不能遮挡游戏内的元素，影响游戏流程。  

我的游戏被以上原因拒绝了两次。  

我的banner广告是放在底部正中间，取最小宽度200。也就是尽量的小，不影响游戏操作。可以参考我接入适配方案:  

```ts
const systemInfo = wx.getSystemInfoSync();
let bannerAd = wx.createBannerAd({
    adUnitId: 'adunit-a195f5405e9ccf2b', //todo
    adIntervals: 30,
    style: {
        left: (systemInfo.windowWidth - 300) / 2,
        top: systemInfo.windowHeight * 0.9,
        width: 300
    }
});
bannerAd.show();
bannerAd.onResize(res => {
    bannerAd.style.top = systemInfo.windowHeight - bannerAd.style.realHeight - 5;
})
```

激励视频采用的是预加载模式，加载成功后才会有对应激励视频的按钮。  

激励视频按钮一定要有视频广告相关的提示！  


### 结语

如果你有时间，想放松放松，可以试下不停歇的球 。  

![](/img/in-post/2019-10-19-mini-game.jpg)

以上就是本人目前爬的主要坑，以后遇到的问题会第一时间分享给大家，希望这篇文章对你有所帮助。  