---
layout: post
title:  "如何让文本从右向左竖直布局？Cocos Creator 3.0 "
date:   2021-03-01 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 朕回来了!

# 前言

最近韭菜长的不错，公众号也有点长草了，出来割一波。  

![割草](/img/in-post/202103/01-02.jpg)    
 
逛论坛看到这么一个需求，有人想要圣旨一样布局的文本。  

![问题](/img/in-post/202103/01-03.jpg)    

于是白玉无冰梭哈一下，写了一个简易的组件供在座的各位参考。  

本字体组件支持(就是原本系统字组件Label的阉割版本) ：
- 系统字体
- 空格，斜体，粗体
- 字体大小、行高


~~但暂未支持字体资源，对齐模式，缓存模式，排版模式，下划线。（不过相信你看了这篇文章你自己也会扩展这些功能，不是白玉无冰懒🐶）~~   

使用方法和效果预览如下：  

![使用方法和效果预览](/img/in-post/202103/01-01.gif)    
![调整属性](/img/in-post/202103/01-04.gif)    


# 实现

实现这个组件的精髓在于借鉴~~抄~~，翻源码改造一下！  

可能有些小伙伴不懂如何找源码，只需到打开`Cocos Creator`编辑器，点击右上角的编辑器按钮就能找到了。  

![寻找源码](/img/in-post/202103/01-05.gif)    


接着我们就参考`label.ts`中的源码，写一个组件继承他，修改他的`assembler`，指向我们写的。  

![继承](/img/in-post/202103/01-06.jpg)    


最后我们补上这个自定义的`assembler`，参考源码中的`ttf.ts`和`ttfUtils`。  

![assembler源码](/img/in-post/202103/01-07.jpg)    

主要是修改这个节点的大小和计算每个字符的位置，稍微改改，很快就完成了。  

![修改大小计算](/img/in-post/202103/01-08.jpg)    
![修改位置计算](/img/in-post/202103/01-09.jpg)    



# 小结

> 翻源码！查资料！借鉴！assembler！  
 
以上为白玉无冰使用 `Cocos Creator 3.0.0` 实现 `"文本从右向左竖直布局!"` 的技术分享。欢迎三连(点赞/在看/留言/分享)支持!      


## 参考资料

[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)


# 更多
[弹性跟随相机！](https://mp.weixin.qq.com/s/NCn8Ygk_I_nRnhmbHQeZwQ)   
[标志板！Billboard !](https://mp.weixin.qq.com/s/KV7fyF0kvqqOjf01ZbqbmA)   
[2D 素材 3D 效果!](https://mp.weixin.qq.com/s/xHYOzirlAZlbr9Ljuq7NdQ)   
[2020 原创精选!](https://mp.weixin.qq.com/s/ZrIPUEs9mnpPqV4dN_DIGA)   


---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

<!-- [原文链接](https://mp.weixin.qq.com/s/NCn8Ygk_I_nRnhmbHQeZwQ)     -->
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   