---
layout: post
title:  "分形的奥秘！分形着色器！shader 编程入门实战 ！ Cocos Creator！ "
date:   2020-02-26 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 极致的数学之美！文章底部获取完整代码！

![](/img/in-post/202002/26-01.jpg)  

**什么是分形？**

> “一个粗糙或零碎的几何形状，可以分成数个部分，且每一部分都（至少近似地）是整体缩小后的形状”  

简单来说，分形`（fractal）`就像这个doge表情包一样，放大一部分后和原来的图近似。  

![](/img/in-post/202002/26-02.gif)    

用分形着色器实现的效果如下，在编辑器内放大其中的一部分，会发现与整体非常相似！

![](/img/in-post/202002/26-03.gif)    

如何实现这么优雅的图片？一切起源于简单的公式`（julia set）` 。  

```
f(n) = f(n-1) * f(n-1) + c
```

通过迭代 `n` 次后可以实现分形效果。

起始值 `f(0)` 如何确定？ 可以通过纹理坐标来确定。

当然这个起始值是个复数，有实数部分和虚数部分。我们用纹理`u`坐标表示实数，`v`表示虚数部分。

纹理坐标的取值是`0-1`，可以加一些偏移和缩放处理。

```
float real = (v_uv0.x-0.5)/zoom + offset.x;
float image = (v_uv0.y-0.5)/zoom + offset.y;
```

`c` 也是复数，对于不同的值，效果也不一样。  

![](/img/in-post/202002/26-04.jpg)  

一次迭代如何计算？记得虚数部分 ```i*i = -1``` 就可以根据公式计算了，参考代码如下：  

```glsl
float tmp_real = real;
// 计算新的复数-实数部分
// f(n+1) = f(n)*f(n) + c
// (a+bi)*(a+bi) + c = a*a - b*b + (2*a*b)i + c_real + (c_image)i
real = (tmp_real*tmp_real) - (image*image) + c_real;
// 虚数部分
image = 2.0*tmp_real*image + c_image;
```

如何显示不同的颜色？当迭代到一定次数后，这个迭代函数会发散。当这个复数的模大于`2`时，停止迭代，并根据次数显示不同的颜色。  

```glsl
for(float i = 0.0; i < 9999.0; i++){
  // 计算新的复数... 省略部分代码

  // 复数大小的平方
  r2 = real*real + image*image;
  conut = i;
  if(r2 >= 4.0){
    break;
  }
}
if(r2 < 4.0){
  o = v_color;
}else{
  o = vec4(mix(outColor1.rgb, outColor2.rgb, fract(conut*0.07)), 1);
}
```

这里用到了一些内置函数，不清楚的话可以看下图。  

![](/img/in-post/202002/26-05.jpg)  

如果我们对公式中的 `c` 修改一下，让它与起始值相同，就变成了 `mandelbrot set` 。 

```glsl
float real = (v_uv0.x-0.5)/zoom + offset.x;
float image = (v_uv0.y-0.5)/zoom + offset.y;
float c_real = real;
float c_image = image;
```

这幅图被称作`上帝的指纹`。  

![](/img/in-post/202002/26-06.jpg)    


以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"分形着色器"`的技术分享。有什么想法欢迎留言交流！如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---


[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/fractal)   
<!-- [参考文章](https://mp.weixin.qq.com/s/tN2Al3kfo4HwIBGXNjmEDA) -->