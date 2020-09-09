---
layout: post
title:  "噪声纹理之消融效果！ shader 入门精要！ Cocos Creator Shader !"
date:   2020-09-02 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 溶解！shader 入门实战之噪声纹理！附完整项目！  

# 效果

![](/img/in-post/202009/02-01.gif)  


# 原理

**什么是噪声纹理？**  

噪声纹理的特性是不可预测性的随机。  

个人理解噪声纹理就是一张图片，每个像素点颜色值（`rgba`）是按照一定的随机性分布的。  

![](/img/in-post/202009/02-02.png)  

怎么生成噪声纹理？
- 工具生成
- 代码生成
- 网上下载（这里用的噪声纹理是网上下载的）
- 其他

**怎么实现消融？**

根据噪声纹理的颜色值和消融阈值(`noiseThreshold`)判断，当达到阈值时，丢弃(`discard`)该片元像素。  

```GLSL
vec4 noise = vec4(1, 1, 1, 1);
CCTexture(textureNoise, v_uv0*3.0, noise);
if(noise.r < noiseThreshold){
  discard;
}
```

**加点内描边**

还可以混点颜色，对阈值附近的像素点加一些颜色，就能实现燃烧效果啦。   

```GLSL
float t = 1.0 - smoothstep(0.0, colorWidth, noise.r - noiseThreshold);
vec3 burnColor = lerp(burnColorInner.rgb, burnColorOut.rgb, t);
o.rgb = lerp(o.rgb, burnColor.rgb,  t*step(0.0001, noiseThreshold ));
```


# 其他

`shader` 入门资料可以[参考这篇文章](https://mp.weixin.qq.com/s/3_ShiqpcJDsBcgeszAMT3Q)。  

项目代码在 `2.4.x` 目录下的 `demo04`。   

# 小结  
  
> 噪声纹理 `noise` ！ 消融效果 `dissolve` ！`shader` ！    

以上为白玉无冰使用 `Cocos Creator v2.4` 实现 `"噪声纹理之消融效果(dissolve)"` 的技术分享。欢迎分享给身边的朋友！    

> 天下事有难易乎？为之，则难者亦易矣；不为，则易者亦难矣。人之为学有难易乎？学之，则难者亦易矣；不学，则易者亦难矣。   




# 更多
[![流体之 LiquidFun 流体纹理 shader](/img/in-post/title/20200821.jpg)](https://mp.weixin.qq.com/s/T-xkgkLonYqA_4yqPIYLSg)   
[![3D瞄准器](/img/in-post/title/20200813.jpg)](https://mp.weixin.qq.com/s/3xB7Ab_nR76gRzUkFjAKqw)   
[![gizmo与多边形裁剪](/img/in-post/title/20200804.jpg)](https://mp.weixin.qq.com/s/EkMP_UcFcWTlSn_4Ml8zsA)   

[█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/9od3cxdinGJ4q8Zjfc4qFQ)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   