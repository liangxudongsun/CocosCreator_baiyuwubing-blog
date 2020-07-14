---
layout: post
title:  "两种方法实现亮度/饱和度/对比度的调整！Cocos Creator ! "
date:   2020-07-14 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> `uniform` 方案和 `assembler` 方案的实现。   

# 效果预览  

![](/img/in-post/202007/14-01.gif)     

`GT` 在[Assembler 源码解读及使用 ](https://mp.weixin.qq.com/s/YaPHcTN1lkgo5eiYoG3p9A)一文中提到自定义渲染可以实现很多酷炫的 shader 特效，目前常用的有两种方法：
- 创建自定义材质，给材质增加参数。这个参数会作为 `uniform` 变量传入 shader 由于渲染合批要求材质参数保持一致，所以如果大量对象使用自定义材质时，并且材质参数各不相同，是无法进行合批渲染的，一个对象占一个 `draw call` 。  
- 创建自定义 `assembler`，在顶点数据输入渲染管道前修改它的值 这种方式比较灵活，如果需要输入更多自定义参数，标准的顶点格式就不够用了。   

本文将用这两种方案实现亮度/饱和度/对比度的调整。  

# 如何使用

## uniform 方案

新建 `Sprite` 组件，选择材质 `BrightSaturaContrastUniform.mtl` ，添加用户脚本 `BrightSaturaContrastUniform.ts` ，调整对应参数即可。  

![](/img/in-post/202007/14-02.jpg)     


## assembler 方案

新建一个节点，添加用户脚本 `BrightSaturaContrastAssemblerSprite.ts` ，选择材质 `BrightSaturaContrastAssembler.mtl` ，调整对应参数即可。  

![](/img/in-post/202007/14-03.jpg)  

# 实现步骤

调色效果的逻辑参考《Unity Shader入门精要》中的介绍。  

> 亮度的调整只需要把原颜色乘以亮度系数 `brightness` 即可。然后，我们计算该像素对应的亮度值（`luminance`），这是通过对每个颜色分量乘以一个特定的系数再相加得到的。我们使用该亮度值创建了一个饱和度为0的颜色值，并使用`saturation` 属性在其和上一步得到的颜色之间进行插值，从而得到希望的饱和度颜色。对比度的处理类似，我们首先创建一个对比度为0的颜色值（各分量均为0.5），再使用`contrast`属性在其和上一步得到的颜色之间进行插值，从而得到最终的处理结果。

## uniform 方案

新建一个 `BrightSaturaContrastUniform.effect` 。  

在片元着色器中定义一个 `uniform` 块。  

```glsl
uniform lamyoung_com {
    float brightness;
    float saturation;
    float constrast;
};
```

写一个计算插值方法。  

```glsl
vec3 lerp(vec3 a, vec3 b, float w){
    return a + w*(b-a);
}
```

参考《Unity Shader入门精要》中的介绍，翻译一下计算过程即可，主要代码如下。   

```glsl
CCTexture(texture, v_uv0, o);
// apply brightness
vec3 finnalColor = o.rgb * brightness;
// apply saturation
float luminance = 0.2125 * o.r + 0.7154 * o.g + 0.0721 * o.b;
vec3 luminanceColor = vec3(luminance, luminance, luminance);
finnalColor = lerp(luminanceColor, finnalColor, saturation);
// apply constrast
vec3 avgColor = vec3(0.5, 0.5, 0.5);
finnalColor = lerp(avgColor, finnalColor, constrast);

o.rgb = finnalColor.rgb;
```

接着新建材质 `BrightSaturaContrastUniform.mtl`，选择 `BrightSaturaContrastUniform.effect`。  

![](/img/in-post/202007/14-04.jpg)  

最后写一个 `BrightSaturaContrastUniform.ts` 脚本去控制 `uniform` 参数，主要代码如下。  

```ts
this._sprite.getMaterial(0).setProperty('brightness', this._brightness);
this._sprite.getMaterial(0).setProperty('saturation', this._saturation);
this._sprite.getMaterial(0).setProperty('constrast', this._constrast);
```

## assembler 方案

### shader

新建一个 `BrightSaturaContrastAssembler.effect` 。 

因为这里用的是顶点数据，所以在顶点着色器中定义一些要传入片元着色器的属性。  

```glsl
  in float a_brightness;
  out float v_brightness;

  in float a_saturation;
  out float v_saturation;

  in float a_constrast;
  out float v_constrast;
```

并把这些属性值传给片元着色器。  

```glsl
v_brightness = a_brightness;
v_saturation = a_saturation;
v_constrast = a_constrast;
```

片元着色器接收这些属性。  

```glsl
in float v_brightness;
in float v_saturation;
in float v_constrast;
```

在片元着色器的处理和`uniform`的类似。  

```glsl
CCTexture(texture, v_uv0, o);
// apply brightness
vec3 finnalColor = o.rgb * v_brightness;
// apply saturation
float luminance = 0.2125 * o.r + 0.7154 * o.g + 0.0721 * o.b;
vec3 luminanceColor = vec3(luminance, luminance, luminance);
finnalColor = lerp(luminanceColor, finnalColor, v_saturation);
// apply constrast
vec3 avgColor = vec3(0.5, 0.5, 0.5);
finnalColor = lerp(avgColor, finnalColor, v_constrast);

o.rgb = finnalColor.rgb;
```

新建材质 `BrightSaturaContrastAssembler.mtl`，选择 `BrightSaturaContrastAssembler.effect`。  

### assembler

新建 `BrightSaturaContrastAssembler.ts` 继承[Assembler 源码解读及使用 ](https://mp.weixin.qq.com/s/YaPHcTN1lkgo5eiYoG3p9A)中的 `GTSimpleSpriteAssembler2D`。

因为要用到亮度/饱和度/对比度这些属性，所以定义顶点属性的时要加上这些属性。  

```ts
// 自定义顶点格式，在vfmtPosUvColor基础上，加入 a_brightness  a_saturation  a_constrast
let gfx = cc.gfx;
const vfmtCustom = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
    { name: 'a_brightness', type: gfx.ATTR_TYPE_FLOAT32, num: 1 },
    { name: 'a_saturation', type: gfx.ATTR_TYPE_FLOAT32, num: 1 },
    { name: 'a_constrast', type: gfx.ATTR_TYPE_FLOAT32, num: 1 },
]);
```

更新顶点数据时，只需要找到对应的偏移量就可以了。  

```ts
let dstOffset;
let verts = this._renderData.vDatas[0];
for (let i = 0; i < this.verticesCount; ++i) {
    // fill 
    let floatsOffset = this.floatsPerVert * i;

    dstOffset = floatsOffset + this.brightnessOffset;
    verts[dstOffset] = this.brightness;

    dstOffset = floatsOffset + this.saturationOffset;
    verts[dstOffset] = this.saturation;

    dstOffset = floatsOffset + this.constrastOffset;
    verts[dstOffset] = this.constrast;
}
```

最后写一个 `BrightSaturaContrastAssemblerSprite.ts` 使用`BrightSaturaContrastAssembler.ts`，并在需要的时候更新数据。更新数据的代码如下。

```ts
assembler.brightness = this.brightness;
assembler.constrast = this.constrast;
assembler.saturation = this.saturation;
this.setVertsDirty();
```

# 更多精彩

[![四叉树与碰撞检测 ！](/img/in-post/title/20200705.jpg)](https://mp.weixin.qq.com/s/gkvOd11kbZYcKXkBc7V8kQ)   
[![shader顶点动画之旗子水纹](/img/in-post/title/20200622.png)](https://mp.weixin.qq.com/s/Ubv-wbA8cOPR58GM50bXrA)   
[![2D实现背景图3D滚动效果](/img/in-post/title/20200629.jpg)](https://mp.weixin.qq.com/s/fJxE-Z0BEiQgAhFoJeHjlw)   
[![物理挖洞系列](/img/in-post/title/20200616.jpg)](https://mp.weixin.qq.com/s/5JbIX7kHyZoGvJjGrXaZug)   
[![画线纹理之绳子](/img/in-post/title/20200527.jpg)](https://mp.weixin.qq.com/s/QvJ2DHFhUxO3doNviCqBIg)   

[█    渐变色的实现    █](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)  [█    精灵之网格模式    █](https://mp.weixin.qq.com/s/2FcixeoV-Fg-7OodILECeg)   [█    shader动画之loading    █](https://mp.weixin.qq.com/s/QhKzmtpwiQgOzsGPcBHSJQ)   [█    js的三位一体    █](https://mp.weixin.qq.com/s/6wq5ekTtyF_LO_oFBb1vRA)   [█    shader 之攻击闪白(+入门资料整理)    █](https://mp.weixin.qq.com/s/3_ShiqpcJDsBcgeszAMT3Q)  [█    物理流体(欢乐水杯)    █](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w)   [█    瞄准线之抛物线    █](https://mp.weixin.qq.com/s/Z-7zQuvjIaBzyQRJslH7bQ)   [█    随机(正态分布)飞溅运动    █](https://mp.weixin.qq.com/s/Qu9Uy55KvUX5sSLt_PTUJQ)   [█    贪吃蛇之平滑移动    █](https://mp.weixin.qq.com/s/qZ7CGFRmncxvQZ0Hhs4g5g)   [█    雷达图的实现  █](https://mp.weixin.qq.com/s/hgybmgTHlga0KgHfz1vIfg)  [█    分形着色器(数学之美)    █](https://mp.weixin.qq.com/s/OuQaI18LwX3Lw7aRcKjDOw)  [█    shader 之渐变过渡    █](https://mp.weixin.qq.com/s/tN2Al3kfo4HwIBGXNjmEDA)   [█    初探 gizmo 使用    █](https://mp.weixin.qq.com/s/YjH9PAWvtgPiDGxp9y7big)   [█    shader 之卷积滤镜    █](https://mp.weixin.qq.com/s/WAajs8p69X8UJFvNiYuNDA)   [█    旗帜效果(meshRenderer)    █](https://mp.weixin.qq.com/s/E5ZjzIFozvPRIIytmtiuTQ)   [█    多边形裁剪(meshRenderer)    █](https://mp.weixin.qq.com/s/r1IEcFXdy4O2Fn4IPs1m_w)   [█    高抛平抛发射    █](https://mp.weixin.qq.com/s/5GgL_pONl0bQPxFz4xtjmQ)   [█    水纹效果(片元着色器)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   [█    2019年原创(黑历史)    █](https://mp.weixin.qq.com/s/-5FSWg4YuGgqwv3L9tQ2dA)   [█    原创文章导航    █](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)  

# 小结  
  
> 需要注意的是 `drawcall` 数量并不是越少越好，最佳性能往往是 `CPU` 与 `GPU` 负载均衡的结果。  

以上为白玉无冰使用 `Cocos Creator v2.4.0` 实现 `"亮度/饱和度/对比度的调整"` 的技术分享。欢迎分享给身边的朋友！    

> 任何行动往往都比没有行动好，特别是当你一直停滞在不愉快的情势下很长时间的时候。如果这是一个错误，至少你学到了一些东西。这样一来，它就不再是一个错误。如果你仍然选择停滞不前，那么你就学不到任何东西。
`做或者不做。`

![](/img/in-post/bottom.png)  

---

<!-- [原文链接](https://mp.weixin.qq.com/s/gkvOd11kbZYcKXkBc7V8kQ)    -->
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   