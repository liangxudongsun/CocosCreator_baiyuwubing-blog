---
layout: post
title:  "重置facebook小游戏排行榜"
date:   2019-08-27 19:00:00 +0800
header-img: "img/in-post/post-facebook-Instant-games.jpg"
categories: fb-instant-games
tags:
    - fb-instant-games
---
首先以管理员的身份登录facebook管理后台 [https://developers.facebook.com](https://developers.facebook.com)  
然后进入 图谱 API 探索工具 [https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)  
在右侧选择要重置的应用，点击``Get Access Token``以管理员的身份登录
![](/img/in-post/2019-08-27-fb-explorer-token.png)  
在上方选择``POST``方法，并输入``/{application_id}/leaderboards_reset``，其中``{application_id}``指的是你应用后台的那个id  
![](/img/in-post/2019-08-27-fb-explorer-post-reset.png)![](/img/in-post/2019-08-27-fb-id.png)  
接着在右侧添加参数`name`和`reset_time`,`name`表示排行榜的名称，`reset_time`表示在那个时间戳重置。
![](/img/in-post/2019-08-27-fb-explorer-add-params.png)![](/img/in-post/2019-08-27-fb-explorer-params.png) 
在右上方点击提交按钮返回结果
![](/img/in-post/2019-08-27-fb-explorer-submit.png)
成功返回:
![](/img/in-post/2019-08-27-fb-explorer-result.png) 
错误返回:  
![](/img/in-post/2019-08-27-fb-explorer-err.png) 

| 错误码 | 描述 |
| --- | --- |
| 3406 | reset_time 参数错误 |
| 3407 | name 参数错误 |
| 100 | 非法参数 |
| 200 | 没有权限 |

