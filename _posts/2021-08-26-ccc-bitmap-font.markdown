---
layout: post
title:  "写一个在线位图字体制作工具！BitmapFont!"
date:   2021-08-26 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 简单易用，跨平台，20KB！


# 效果

效果预览：

视频

[https://www.bilibili.com/video/BV1cf4y1H7Pa](https://www.bilibili.com/video/BV1cf4y1H7Pa)


无论写代码还是写工具，都要明确输入与输出。  
- 输入：零碎的字体图片(通常是数字)
- 处理：可动态调整参数，预览实时效果
- 输出：一张合图以及字体信息文件`xxx.fnt`


为何要重新写一个轮子呢？
- [Glyph Designer(Mac)](https://www.71squared.com/glyphdesigner) 与 [BMFont (Windows)](http://www.angelcode.com/products/bmfont/) 功能完善，但是有平台限制。~~个人不习惯其操作~~
- `Cocos Store` 中也有许多优秀的 BMFont 插件，但是依赖 `Cocos Creator`，可能会有对应版本限制。  


# 实现

于是动手写一个 `HTML`，依赖浏览器的小工具，目录设计如下：
- `index.html`
- `renderer.js`
- `index.css`

## 拖入文件

参考`mozilla`中的文档，监听`ondrop`事件。
[https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)
 

拖入文件后，用一个列表维护文件数据，文件格式可以参文档。
[http://www.angelcode.com/products/bmfont/doc/file_format.html](http://www.angelcode.com/products/bmfont/doc/file_format.html)


![拖入文件代码](/img/in-post/202108/26-01.png)      

## 合成大图

参考 `Cocos Store` 中的一个插件代码，将所有图绘制在一个`Canvas`上。  
[http://store.cocos.com/app/detail/2604](http://store.cocos.com/app/detail/2604)

![合成大图代码](/img/in-post/202108/26-02.png)      

## 预览效果

根据图片`xoffset` `yoffset` `xadvance`的信息，采用 `Canvas` 画布渲染。  

![预览效果代码](/img/in-post/202108/26-03.png)      


## 导出文件


直接使用`FileSaver.js`

[https://github.com/eligrey/FileSaver.js](https://github.com/eligrey/FileSaver.js)

![导出文件代码](/img/in-post/202108/26-04.png)      







# 体验


> 在线体验地址：[https://lamyoung.gitee.io/web/bitmapFont/](https://lamyoung.gitee.io/web/bitmapFont/)

> 代码打包下载：[https://gitee.com/lamyoung/web/raw/master/bitmapFont/source.zip](https://gitee.com/lamyoung/web/raw/master/bitmapFont/source.zip)


以上为白玉无冰使用 `HTML + JS` 实现 `"位图字体制作工具"` 的过程分享。 

--- 

[替代 toDataURL 的方案](https://mp.weixin.qq.com/s/tQPIOrweQZrTIM74fM6HUA)    
[Fake3D && Shader](https://mp.weixin.qq.com/s/11ZEPKFLo8uE4DtPB4aOBQ)    
[MatCap && Shader](https://mp.weixin.qq.com/s/_BkQVpEiQaqQ8VojnA0l2w)   
[如何抄shader](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)   
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)   
[渐变色文字3.0](https://mp.weixin.qq.com/s/WUpppo1Db_pQTlaqpRQaTw)  

---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原文链接](https://mp.weixin.qq.com/s/OaoeKVmDDdHddPdUmdIpsg)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   