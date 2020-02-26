---
layout: post
title:  "笑容逐渐消失？ shader 编程入门实战 ！ Cocos Creator！ "
date:   2020-02-20 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 编程斗图！随手拈来！文章底部获取完整代码！ 

![](/img/in-post/202002/20-02.jpg)  


**效果预览**

![](/img/in-post/202002/20-01.gif)   

为了实现这个效果，需要准备两张相近的图片。

![](/img/in-post/202002/20-03.jpg)  

在 `Cocos Creator` 编辑器中，新建一个材质 `Material`，`Effect` 选择为 `gradient`，拖入两张图片。

![](/img/in-post/202002/20-04.jpg)  

新建一个 `Sprite` 节点，拖入材质。

![](/img/in-post/202002/20-05.jpg)  

接着再写个脚本，定时控制 `Sprite` 材质中的混合因子。

```ts
update(dt) {
  // sp :cc.Sprite
  let material = sp['sharedMaterials'][0];
  if (material) {
      this._gradient_value = (this._gradient_value + 0.003) % 1;
      material.setProperty('gradient_value', this._gradient_value);
  }
}
```

那么`shader effect`是如何实现的呢？

片元着色器根据变化的混合因子，从两幅纹理中采样得到的颜色，按照比例混合，就能实现图片平滑过度的效果了。片元着色器代码参考如下。

```glsl
void main () {
  vec4 o_first = vec4(1, 1, 1, 1);
  vec4 o_last = vec4(1, 1, 1, 1);

  #if USE_TEXTURE
    o_first *= texture2D(texture_first, v_uv0);
    o_last *= texture2D(texture_last, v_uv0);
  #endif

  o_first *= v_color;
  o_last *= v_color;

  gl_FragColor = o_first * (1.0 - gradient_value) + o_last * gradient_value;
}

```

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"图像渐变-shader"`的技术分享。有什么想法欢迎留言交流！如果这篇对你有点帮助，欢迎分享给身边的朋友。  

---

![](/img/in-post/bottom.png)  

---


[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/gradient)   
[参考文章](https://mp.weixin.qq.com/s/tN2Al3kfo4HwIBGXNjmEDA)