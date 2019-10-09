---
layout: post
title:  "怎样快速搭建一个免费的静态网页服务器"
date:   2019-10-09 22:22:22 +0800
categories: web
tags:
    - web
---
> 有时候自己写了一个h5游戏或者网页，想要放到在服务器上运行方便远程访问，该怎么做呢？

![](/img/in-post/2019-10-09-bg.png)  

买服务器？不存在的！花钱！还要自己搭建环境！nodejs? nginx? 通通不要！只要一个免费的服务器！  

![](/img/in-post/2019-10-09-yun.jpg)  

本文介绍的是用 [码云 gitee](https://gitee.com/) 的方法部署一个简单的服务器。  

码云 Pages 是一个免费的静态网页托管服务，你可以使用 码云 Pages 托管博客、项目官网等静态网页。  

首先，访问[码云 gitee](https://gitee.com/)，登录账号(没有账号就注册一个)。

接着，新建一个仓库，可以访问[这个地址](https://gitee.com/projects/new)，或者在网站界面中找到新建仓库的入口。这里将仓库命名为`web`。是否开源选择`公开`。  

![](/img/in-post/2019-10-09-new-project.png) 

进入刚才创建的仓库，在仓库内新建一个文件`index.html` 。
 
![](/img/in-post/2019-10-09-new-file.png)  

往`index.html`里填入些代码。  

![](/img/in-post/2019-10-09-index.png)  

找到仓库里的`服务 -> gitee pages`，点击 `启动`  

![](/img/in-post/2019-10-09-git-page.png)  

启动完成后可以看到你的地址，这个地址就是可以外网可以访问的。  

![](/img/in-post/2019-10-09-web.png)  

点击访问可以看到刚才写的东西。  

![](/img/in-post/2019-10-09-web-show.jpeg)  

如果修改了内容，有新的更新，需要在`服务 -> gitee pages`，点击 `更新`。  

![](/img/in-post/2019-10-09-git-page-fresh.png)  

如果想要多层级的访问子目录，可以在仓库下创建文件夹，并在你的地址下添加文件夹的名字。  

![](/img/in-post/2019-10-09-web-page-show.jpeg)  

现在你应该学会如何搭建web服务器了吧。以 cocos creator 为例，打包发布为 web-mobile , 再将发布成功后这个目录下的文件的放在仓库下，在`服务 -> gitee pages`，点击 `更新`， 访问对应的地址就可以了。  

github 也有类似的功能，而且部署好不用点击更新。关于 github pages 的部署可参考[官方文档](https://help.github.com/en/articles/creating-a-github-pages-site)。

但是 gitee 的服务器是在国内的，相对于 github 访问速度会比较快，所以这里选择 gitee 作为服务器。  

![](/img/in-post/2019-10-09-speed.jpg)  

当然，你要实现一些服务端的功能，还是需要一个自己的服务器的。如果只是简单的预览静态网页，这些就够用了。enjoy it !  
