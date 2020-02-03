---
layout: post
title:  "使用卷积实现各种滤镜效果！shader 编程实战！Cocos Creator！"
date:   2020-02-03 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 模糊、锐化、浮雕应有尽有。文章底部获取完整代码！  

# 效果预览

![](/img/in-post/202002/03-01.jpg)  

# 如何使用

新建一个 sprite 节点，拖入对应的材质。  

![](/img/in-post/202002/03-02.jpg)  

也可以自定义材质，设计不同的卷积内核。新建材质，选择 `effect` 为 `convolutionFilter` ，定义自己的卷积内核。

![](/img/in-post/202002/03-03.jpg)  


# 实现原理

卷积是一种数字图形处理操作，简单来说，就是对每一像素的周围像素进行计算处理，生成一个新的像素颜色数值。    

![](/img/in-post/202002/03-04.gif)  

对于`3x3`卷积内核，具体计算思路如下。   

![](/img/in-post/202002/03-05.jpg)  

转化成片元着色器代码如下。  

```glsl
vec4 o = vec4(1, 1, 1, 1);
mat3 kernel = mat3(kernel_0.xyz, kernel_1.xyz, kernel_2.xyz);
float offset = 0.005;
//卷积计算
vec4 sum = vec4(0.0, 0.0, 0.0, 0.0);
sum += texture(texture, v_uv0 + vec2(-offset, -offset)) * kernel[0][0];
sum += texture(texture, v_uv0 + vec2(0.0, -offset)) * kernel[0][1];
sum += texture(texture, v_uv0 + vec2(offset, -offset)) * kernel[0][2];
sum += texture(texture, v_uv0 + vec2(-offset, 0.0)) * kernel[1][0];
sum += texture(texture, v_uv0 + vec2(0.0, 0.0)) * kernel[1][1];
sum += texture(texture, v_uv0 + vec2(offset, 0.0)) * kernel[1][2];
sum += texture(texture, v_uv0 + vec2(-offset, offset)) * kernel[2][0];
sum += texture(texture, v_uv0 + vec2(0.0, offset)) * kernel[2][1];
sum += texture(texture, v_uv0 + vec2(offset, offset)) * kernel[2][2];
//加权因子(调整亮度)
sum *= scaleFactor;
o *= sum;

gl_FragColor = o;
```

不同的卷积内核会生成不同的滤镜效果，以下是几个常见的卷积内核。

![](/img/in-post/202002/03-06.jpg)  


# 小结

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"滤镜效果"`的技术分享。有什么想法欢迎留言交流！如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---


[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/convolutions)   
<!-- [参考文章](https://mp.weixin.qq.com/s/E5ZjzIFozvPRIIytmtiuTQ)    -->