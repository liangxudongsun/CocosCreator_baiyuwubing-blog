---
layout: post
title:  "为何cocos creator发布的facebook小游戏的载入进度条从0%飞向100%"
date:   2019-08-21 19:00:00 +0800
categories: cocos-creator
tags:
    - cocos-creator
    - fb-instant-games
---

*用cocos creator 发布 fb-instant-games (facebook小游戏 )  后，发现平台预载入的进度条会从0等一段时间，然后直接飞到100。这个用户体验不是很好，而且可能影响过审，那么尝试解决这个问题。*  
![](/img/in-post/post-fb-loaded-0.png)  

## FBInstant 设置进度条的接口
``FBInstant.setLoadingProgress(percentagenumber)``报告游戏的初始加载进度。参数percentagenumber 介于 0 和 100 之间的数字。返回 void。
示例
```js
FBInstant.setLoadingProgress(50); // Assets are 50% loaded
```

## ccc默认设置进度条的过程
cocos creator 设置进度条默认使用 ``cc.loader.onProgress``， 这个是全局的 所有资源加载都会调用。返回的``completedCount``和``totalCount``都是1，导致进度设置不对。
```js
function setLoadingDisplay() {
    // Loading splash scene
    cc.loader.onProgress = function (completedCount, totalCount, item) {
        var progress = 100 * completedCount / totalCount;
        FBInstant.setLoadingProgress(progress);
    };
}
```
再看看fb小游载入的流程，设置setLoadingDisplay(),在经过了很多步骤才调用，那么前面的一堆等待时间会一直显示0%。  
![](/img/in-post/ccc-fb-flow-chat-default.png)  