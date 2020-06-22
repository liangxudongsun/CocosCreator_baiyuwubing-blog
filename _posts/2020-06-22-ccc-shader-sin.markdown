---
layout: post
title:  "shader 动画之旗子/水纹波浪 ！Cocos Creator ! "
date:   2020-06-22 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 波形、正弦、波长、振幅、周期。   

# 效果预览

![](/img/in-post/202006/22-01.gif)   


# 使用步骤

新建材质 `Material` ， 选择对应的 `Effect` ，调整参数。      

![](/img/in-post/202006/22-02.jpg)   

在场景中新建一个精灵(`Sprite`) ， `SpriteFrame` 选取一个超小的图片。渲染模式选择平铺(`TILED`)，修改节点大小。材质选择上面创建的材质。   

![](/img/in-post/202006/22-03.jpg)   



# 实现原理

![](/img/in-post/202006/22-04.jpg)   


# 小结  
  
> `y = A sin{ 2π ( t/T - x/λ ) }`

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`" shader 动画之旗子/水纹波浪效果！"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

> 每个人都必定在某一方面胜于我，因此我向所有人学习。    -- 《人性的弱点》

---

![](/img/in-post/bottom.png)  

---

<!-- [原文链接](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)    -->
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   