---
layout: post
title:  "3D数学基础 ｜ 坐标系 "
date:   2021-12-10 22:22:22 +0800
categories: math
tags:
    - math
---

> 《3D数学基础：图形与游戏开发》









> 计算机图形学第一准则：近似原则。如果它看上去是对的，它就是对的。  

## 左手坐标系与右手坐标系

3D坐标系中存在两种坐标系：左手坐标系和右手坐标系。  

伸出你的双手，让拇指(x)、食指(y)和中指(z)相互垂直，就构成了相应的坐标系。  

![左手坐标系与右手坐标系](/img/in-post/202112/10-01.png)      

> 🎈 OpenGL中的坐标系大体是右手坐标系，而Direct3D中大体是左手坐标系。 

Cocos Creator 3.0 的世界坐标系采用的是笛卡尔右手坐标系，默认 x 向右，y 向上，z 向外，同时使用 -z 轴为正前方朝向。

![Cocos Creator 与右手坐标系](/img/in-post/202112/10-02.png)      


其中旋转也遵循对应左右手法则，伸出双手，做一个点赞👍 的手势，拇指指向朝向，四指握着的方向为正。  

![旋转与左右手](/img/in-post/202112/10-03.png)     

Cocos Creator 3.0 中的旋转（Rotation）遵守右手法则，从转向轴往原点看，当属性值为 正 时，节点 逆时针 旋转。当属性值为 负 时，节点 顺时针 旋转。  

![Cocos Creator 旋转](/img/in-post/202112/10-04.gif)     


> ⚠️ 注意：节点上的 rotation 属性是一个四元数，表示的是绕任意轴旋转的角度。与 属性检查器 中的 Rotation 所对应的属性是欧拉角属性 EulerAngles。这两个属性可以根据需求分别使用，在使用 API 时请一定要注意它们和编辑器面板属性名的对应区别。

左右手坐标系可以相互转换，只需翻转一个轴的符号。  

![翻转一个轴](/img/in-post/202112/10-05.gif)     

## 世界坐标系

## 物体坐标系

> 🎈 模型定义的空间叫作局部空间（local space）或模型空间（model space）。OpenGL文档使用的术语是物体空间（object space）。

## 摄像机坐标系

## 惯性坐标系


（未完待续。。。）

<!-- --- 
[碰撞组件多边形顶点数组是怎么自动生成的](https://mp.weixin.qq.com/s/trb4dfOyHxAQoyujaSNVaQ)    
[关于泰勒公式展开](https://mp.weixin.qq.com/s/3XMfRo5L8_omY9SYLAo4kw)    
[写一个位图字体制作工具](https://mp.weixin.qq.com/s/OaoeKVmDDdHddPdUmdIpsg)    
[替代 toDataURL 的方案](https://mp.weixin.qq.com/s/tQPIOrweQZrTIM74fM6HUA)    
[Fake3D && Shader](https://mp.weixin.qq.com/s/11ZEPKFLo8uE4DtPB4aOBQ)    
[MatCap && Shader](https://mp.weixin.qq.com/s/_BkQVpEiQaqQ8VojnA0l2w)   
[如何抄shader](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)   
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)   

--- -->

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

<!-- [原文链接](https://mp.weixin.qq.com/s/trb4dfOyHxAQoyujaSNVaQ)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)    -->
