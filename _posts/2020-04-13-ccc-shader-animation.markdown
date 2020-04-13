---
layout: post
title:  "shader 动画之 loading ! Cocos Creator ! "
date:   2020-04-13 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 手把手带你玩转 `shader` 动画！  

# 效果预览

![](/img/in-post/202004/13-01.gif)   


# 实现步骤

## 准备阶段

由于实现动画需要纹理`uv`的坐标。刚好 `cocos creator` 在 `sprite` 这个组件中，会传入`uv`坐标。  

并且，`sprite` 组件需要有`spriteFrame`时，才会有`uv`坐标。

![](/img/in-post/202004/13-02.jpg)   

我们就用新建项目后，这个自带的资源作为 `sprite` 的 `spriteFrame` 吧。

需要注意的是，要把这个资源的`Packable`去掉，避免出现`uv`坐标不正确的情况。  

![](/img/in-post/202004/13-03.jpg)   

接着新建 `effect` ，新建 `material` ，新建 `sprite` 节点。然后将这几个东西连接起来。  

![](/img/in-post/202004/13-04.jpg)   


## 画一个圆

编辑刚刚创建好的 `effect` , 开始编写。

`uv` 坐标是的原点在这里是左上角，`u`轴向右，`v`轴向下，范围是`0~1`。  

![](/img/in-post/202004/13-05.jpg)   

一般会把`uv`坐标范围转成`-0.5~0.5`这个范围。这样，图片的正中心刚好是`(0,0)`。  

```glsl
vec2 uv = v_uv0 - 0.5;
```

通过内置函数 `length` 和 `step` 可以帮助我们画一个圆。  

![](/img/in-post/202004/13-06.jpg)   

让距离中心距离小于`0.2`的点的`alpha`值设为`1.0`，代码如下。  

```glsl
vec4 o = vec4(1, 1, 1, 1);
vec2 uv = v_uv0 - 0.5;
o.a = 1.0 - step(0.2, length(uv));
gl_FragColor = o;
```

![](/img/in-post/202004/13-07.jpg)   


这看起来有点锯齿，可以用 `smoothstep` 消除锯齿。  

![](/img/in-post/202004/13-08.jpg)   

```glsl
float radius = 0.2;
o.a = 1.0 - smoothstep(radius-0.01*radius, radius+0.01*radius, length(uv));
```

![](/img/in-post/202004/13-09.jpg)   


## 把圆围成一个圈

先看看怎么平移这个圆。

只需要减去一个坐标，就会往右下角移动。  

![](/img/in-post/202004/13-10.jpg)   

可以把画一个圆封装成一个方法。  

```glsl
float circle(in vec2 uv, in float radius){
    return 1.0 - smoothstep(radius-0.01*radius, radius+0.01*radius, length(uv));
}
```

接着，画一堆小圆，把这些圆围成一个圈。只需要把这个圈平均分成多份，每一个圆都有一个角度，再根据半径和角度的关系，可以求出偏移坐标。  

![](/img/in-post/202004/13-11.jpg)   


```glsl
float R = 0.35;
float radius = 0.05;
vec2 pos = vec2(0.0);
float rotation = 0.0;
const float count = 8.0;

for(float i = 0.0; i<count; i++){
    rotation = 2.0*PI*i/count;
    pos = vec2(R*cos(rotation), R*sin(rotation));
    o.a += circle(uv-pos, radius);
}
```

![](/img/in-post/202004/13-12.jpg)   


## 动起来

`cocos creator` 中内置了一个 `cc_time` 变量，表示运行了多少秒。  

```glsl
float time = cc_time.x;
```

利用这个时间参数，我们可以给角度添加一个时间变化。  

```glsl
rotation = 2.0*PI*i/count + time*2.0*PI/5.0;
```

![](/img/in-post/202004/13-13.gif)   


当然还可以添加一些颜色，大小的变化。  

```glsl
rotation = 2.0*PI*i/count + time*2.0*PI/4.0;
pos = vec2(R*cos(rotation), R*sin(rotation));
o.a += circle(uv-pos, radius * (sin(rotation*0.45)+1.0)/3.0 + radius/3.0);
o.r += o.a * (sin(i/count + time + PI*6.0/3.0)+ 1.0)/2.0;
o.g += o.a * (sin(i/count + time + PI*4.0/3.0)+1.0)/2.0;
o.b += o.a * (sin(i/count + time + PI*2.0/3.0)+1.0)/2.0;
```

![](/img/in-post/202004/13-01.gif)   


# 小结

> 动手实践！在实践中成长！在模仿中学习！  

总结一下实现过程，首先画出一个圆，再到画多个圆，最后再根据时间参数让他动起来，就能实现简单的 loading 效果喽。  

以上为白玉无冰使用 `Cocos Creator v2.3.3` 开发`"shader 动画之 loading"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  

 

---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/shader_animation)   
<!-- [参考文章](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w) -->