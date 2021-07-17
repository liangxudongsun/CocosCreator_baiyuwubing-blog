---
layout: post
title:  "如何抄一个 Shader 到 Cocos Creator"
date:   2021-07-07 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 保姆级手把手，从头开始写！    

# 效果

效果预览:  
![效果预览](/img/in-post/202107/07-01.gif)    
视频

# 前言

感谢大家的观看，感谢大家的点赞留言分享支持，感谢[3D折纸效果的实现(视频+文字)](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)中老板们的赞赏支持，非常感谢。     

![3D折纸效果的赞赏](/img/in-post/202107/07-02.png)   

时常有人问我怎么学习`shader`，其实白玉无冰学的也很浅，推荐几个曾经用过的在线学习网站。  
- [https://thebookofshaders.com/](https://thebookofshaders.com)
- [https://webglfundamentals.org](https://webglfundamentals.org)
- [https://learnopengl-cn.github.io/](https://learnopengl-cn.github.io)

里面有自带环境编辑，在线编写代码，边学边做。

了解了一些概念(顶点着色器/片元着色器/uniform/glsl语法/内置函数/uv坐标)后，参考`Cocos`官方文档和论坛帖子。   

看看`Cocos`内置的`effect`语法怎么写的，动手改改其中的几个数值，看看效果。  

在有需求要做的时候，网上搜一搜，大部分效果都能搜到，剩下的就是借鉴搬运了。  

这次我们来讲讲如何把搜到的`shader`化为己有，在`Cocos`中实现其中的效果。   

本次演示使用`Cocos Creator 3.1.0`版本，看完后，相信大家可以在其他任意版本都可移植！

本次借鉴的源代码如下。

[https://github.com/akella/webgl-mouseover-effects/blob/master/js/step1.js](https://github.com/akella/webgl-mouseover-effects/blob/master/js/step1.js)  

![参考代码](/img/in-post/202107/07-03.png)   


# 实现

本次实现分以下三步：
- 创建模版
- 基本实现
- 传参控制


## 模版

新建场景，在场景中添加一个2D的`sprite`节点，删除3d相机灯光。      

![新建场景](/img/in-post/202107/07-04.gif)    

拖入图片资源，类型`Type`改为`sprite-frame`，去掉自动合图`Packable`(方便uv计算)。    

![拖入资源](/img/in-post/202107/07-05.gif)    

为精灵拖一个图片资源。  

![拖入资源](/img/in-post/202107/07-06.gif)    

新建`effect`。  

![effect](/img/in-post/202107/07-07.gif)    

查找模版`builtin-sprite`，并拷贝到刚刚创建的`effect`。  

![builtin-sprite](/img/in-post/202107/07-08.gif)    

新建材质`matertial`，并选择刚刚创建的`effect`，勾上`USE TEXTURE`。   

![拖入资源](/img/in-post/202107/07-09.gif)    

为精灵选择材质。     

![拖入资源](/img/in-post/202107/07-10.gif)    

看到图片，完成模版创建！   

## 基础

接下来，开始编写`effect`。    

我们先处理`uniform`部分，看看源头有几个`uniform`。  

![源头中的uniform](/img/in-post/202107/07-11.png)    

参考`builtin-standard.effect`中定义`uniform`的部分。  

![builtin-standard.effect](/img/in-post/202107/07-12.png)    

在`effect`中定义`uniform`。

![定义uniform](/img/in-post/202107/07-13.png)    

写完后可以在编辑的材质中看到刚才定义的属性。  

![材质中的uniform](/img/in-post/202107/07-14.png)    

接着就是抄一下片元着色器部分，大部分语法都是通用的。  

![材质中的uniform](/img/in-post/202107/07-15.png)    

在编辑器中改改参数，可以看到初步效果。  

![初步效果](/img/in-post/202107/07-16.gif)    


## 升级

接下来我们加入跟随鼠标变化的效果。  

首先新建一个脚本，添加一个节点挂载这个脚本。  

![新建脚本](/img/in-post/202107/07-17.gif)     

在脚本中添加一个精灵属性，并绑定场景中的精灵。  

![添加属性](/img/in-post/202107/07-18.gif)     

接着编写脚本逻辑
- 添加鼠标监听事件
- 鼠标坐标转换
- 处理`uniform`变量传递(数值逻辑参考源文件)
    - `resolution` 是高宽比
    - `uMouse` 是鼠标以左上角为原点，相对宽高归一化的值

![源头中的uniform](/img/in-post/202107/07-19.png)    


最后再随便写一个按钮，切换精灵的图片，就达到最终的效果啦。   
![效果预览](/img/in-post/202107/07-01.gif)    



# 小结

> 完整代码工程：https://github.com/baiyuwubing/cocos-creator-examples/tree/master/awesome-shader

以上为白玉无冰使用 `Cocos Creator 3.1.0` 实现 `"搬运鼠标悬停图片的shader"` 的技术分享。 

希望大家多多讨论交流，一起学习一起成长！  



# 更多
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw) 
[渐变色文字3.0](https://mp.weixin.qq.com/s/WUpppo1Db_pQTlaqpRQaTw)
[水排序效果](https://mp.weixin.qq.com/s/DXl7_rvI5fS3Fg-OmHvgmg) 
[转向行为AI](https://mp.weixin.qq.com/s/TOAfkeNBDb6NdOqRqzJhwQ) 
[折纸效果](https://mp.weixin.qq.com/s/1guPBbKkG6iWCcWa_uz6CQ) 



---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原文链接](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   