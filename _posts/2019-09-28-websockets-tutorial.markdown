---
layout: post
title:  "初学者教程 | 5分钟内学习WebSockets【译】"
date:   2019-09-28 09:09:09 +0800
categories: web
tags:
    - web
---
> WebSockets实时应用比想象的更有用。让我们看看这些例子。  

![](/img/in-post/2019-09-28-bg.png) 
 
### WebSockets 是什么
"**WebSockets**"是一种先进技术，它允许客户端浏览器和服务器之间的实时交互通信。它允许双向数据流，这与**HTTP**是完全不同的协议。

#### HTTP 如何工作？
![](/img/in-post/2019-09-28-http-work.png)   
如果你是开发人员，你可能知道什么是 HTTP（或 HTTPS）。它每天都在你的浏览器中看到。想要收到响应必需发送请求。**为了能收到新消息，需要不断询问服务器是否有新消息**。HTTP 有不同类型的请求，如post、get和put，每个请求都具有不同的用途。

#### WebSockets 如何工作？
![](/img/in-post/2019-09-28-websockets-work.png)   
与HTTP不同的是，WebSockets不需要发送请求也可以收到响应。它允许双向数据流，因此你只需要侦听是否收到任何数据。**你要做的是侦听服务器，服务器在有消息时会向你发送消息。**看起来更实用，对吧？  

#### WebSockets 适合做什么？
- 实时应用
- 聊天应用
- 物联网
- 在线多人游戏

### 什么时候避免使用它？
答案几乎永远不会。我唯一能想到不使用 WebSockets 的原因是当前的兼容性，你可以看到 96% 的浏览器已经兼容它。
![](/img/in-post/2019-09-28-caniuse.png)   

在某些情况下，甚至不需要 WebSockets。例如简单的内容管理系统(CMS)应用。对于表现层状态转化(RESTful-API)，HTTP协议里的四个操作(GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源),我建议不要使用WebSockets。

### 结论
WebSockets 是目前许多开发人员采用的"大型 Web 技术"之一。非常适合实时互动，甚至包括在线游戏。我希望这篇文章能帮助你理解WebSockets协议。

----
[原文链接🔗](https://medium.com/@dominik.t/what-are-web-sockets-what-about-rest-apis-b9c15fd72aac){:target="_blank"}