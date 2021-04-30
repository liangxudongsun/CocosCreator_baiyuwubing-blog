---
layout: post
title:  "浅谈渲染数据组装器! Cocos Creator 3.0 Assembler"
date:   1021-04-01 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

>  以`sprite` - `simple` 为例子浅谈  

# 抓手

![](/img/in-post/202104/01-01.gif)   

![](/img/in-post/202103/01-04.gif)    

![](/img/in-post/202006/04-02.gif)   


# 要点

以`sprite` - `simple` 为例子讲解

- 调用时机
- 函数详解
- 实例演示


# 结构体

渲染数据组装器用在哪些组件

![](/img/in-post/202104/01-02.jpg)   

`Renderable2D` 中的涉及的组装其器的主要方法

![](/img/in-post/202104/01-03-01.jpg)   


![](/img/in-post/202104/01-03.jpg)   

以`sprite`为例，看看是如何选择组装器的，根据不同的type选择不同组装器。  

![](/img/in-post/202104/01-04.jpg)   

以其中的`simple`为例，初始化调用，每帧根据flag调用，每帧调用，特定时机调用。  

![](/img/in-post/202104/01-05.jpg)   

初始化准备数据`createData`，准备好renderdata，为什么是4x9呢

![](/img/in-post/202104/01-06.jpg)   

每帧根据标志flag更新本地顶点数据，更新uv数据  

![](/img/in-post/202104/01-07.jpg)   


每帧填充数据，会对本地顶点数据和世界矩阵变换算出世界顶点坐标。  

![](/img/in-post/202104/01-08.jpg)   

特定时间调用更新颜色

![](/img/in-post/202104/01-09.jpg)   


如何开始写自己的组装器呢？ 以改变四个顶点为例，逐一讲解步骤。

1. 拷贝源码中的`assembler`备用
![](/img/in-post/202104/01-05.jpg)   

2. 新建一个类继承`Sprite`
3. 修改`_flushAssembler`方法指向自定义`assembler`
![](/img/in-post/202104/01-09.jpg)   


4. 添加一些属性，修改属性后通知`assmbler` 更新数据
![](/img/in-post/202104/01-10.jpg)   

5. 编写修改`assmbler` 更新数据的逻辑
![](/img/in-post/202104/01-11.jpg)   
![](/img/in-post/202104/01-12.jpg)   




# 呼吁行动

 
---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   