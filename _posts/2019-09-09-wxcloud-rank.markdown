---
layout: post
title:  "微信云开发之排行榜的实现"
date:   2019-09-09 20:00:00 +0800
header-img: "img/in-post/post-bg-wx-mini.jpg"
categories: wxcloud
tags:
    - wxcloud
---
> 微信云开发提供了数据库和云函数的功能，利用这两个功能，我们可以自主实现一个排行榜功能。

### 整个流程
先获得用户的基本信息(头像，昵称)等，这些数据可能会用在排行榜里展示。获取成功后，进入主界面。完成游戏上传分数。打开排行榜界面获取排行榜数据。所有总共涉及三个接口:1.用户信息；2.上传分数；3.获取排行榜数据。流程图参考如下:
![](/img/in-post/2019-09-09-wx-cloud-rank.png)  


### 用户信息
首先要判断该应用是否有被授权。已经授权，可以直接调用`wx.getUserInfo`获取头像昵称。未授权的要调用`wx.createUserInfoButton`创建按钮引导玩家点击。
![](/img/in-post/2019-09-09-wx-getuserinfo.png)  

`wx.createUserInfoButton`创建的按钮的位置可以通过`wx.getSystemInfoSync`里的`safeArea`调整。例如，需要在安全区域内最中间放放置高度`height`为`50`的按钮，可以将*button*的`left`设置为`safeArea.left`,`width`为`safeArea.width`,`top`为`(safeArea.top - safeArea.height/2 - 25)`。  
![](/img/in-post/2019-09-09-wx-createbutton.jpeg)  

完整代码参考：
```js
// 查看是否授权
wx.getSetting({
    success(res) {
        if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
                success: function (res) {
                    const userInfo = res.userInfo;
                    //保存数据，进入游戏主界面
                }
            })
        } else {
            // 未授权的要调用 createUserInfoButton 创建按钮引导玩家点击
            const systemInfo = wx.getSystemInfoSync();
            const safeArea = systemInfo.safeArea;
            const button = wx.createUserInfoButton({
                type: 'text',
                text: '授权登录',
                style: {
                    left: safeArea.left,
                    top: (safeArea.top - safeArea.height/2 - 25),
                    width: safeArea.width,
                    height: 50,
                    lineHeight: 50,
                    backgroundColor: '#90ef62',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 5
                }
            })
            button.onTap((res) => {
                const userInfo = res.userInfo;
                if (res && userInfo) {
                    //保存数据，进入游戏主界面
                }
            })
        }
    }
})
```

### 上传分数
在[用微信云开发存取用户的数据](http://lamyoung.com/wxcloud/2019/08/14/Save-user-data-with-wxcloud/){:target="_blank"}介绍了如何存取用户数据。我们可以保存一个最高分数的数据，在游戏得分超过最高分的时候上传分数。  
##### 云端

##### 客户端
参考代码:
```js
// score 为最高分数， userInfo 为上一步获取的用户信息
wx.cloud.callFunction({
    // 云函数名称
    name: 'rank',
    // 传给云函数的参数
    data: {
        func: 'uploadScore',
        data: { score, userInfo: userInfo },
    },
}).then((res) => {
 
}, (err) => {
 
})
```


### 获取排行榜数据
##### 云端

##### 客户端
参考代码:
```js
// count 为数量， offset 为偏移量
wx.cloud.callFunction({
    // 云函数名称
    name: 'rank',
    // 传给云函数的参数
    data: {
        func: 'getScoreRankInfo',
        data: { count, offset },
    },
}).then((res) => {
    const result = res.result || [];
    const outDatas = []
    // console.log('result', result);
    for (const entry of result) {
        let outData = {};
        const userInfo = entry.userInfo;
        outData.score = entry.score;
        outData.rank = ++offset;
        outData.userInfo = userInfo;
        outDatas.push(outData);
    };
}, (err) => {
})
```

### 总结
