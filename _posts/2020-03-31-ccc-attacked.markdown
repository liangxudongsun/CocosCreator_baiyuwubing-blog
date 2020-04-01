---
layout: post
title:  "被攻击闪白特效！小白shader入门实战 ！Cocos Creator! "
date:   2020-03-31 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

>  小白上手 `shader` 编程最佳实战！讲解`effect` 和 `material` 在 `cocos creator`中的关系。

![](/img/in-post/202003/31-01.jpg)   


**效果预览**

![](/img/in-post/202003/31-02.gif)   


**实现原理**

在着色器中，对每个像素点添加一个颜色值。  

```glsl
o.rgb = o.rgb + addColor.rgb;
```

接着写个定时器，切换一下材质。  

```ts
private attackOne(render: cc.RenderComponent) {
    render.setMaterial(0, this.material_attacked);
    this.scheduleOnce(() => {
        render.setMaterial(0, this.material_normal);
    }, 0.1)
}
```

完～(误)

![](/img/in-post/202003/31-03.jpg)   


接下来讲讲 `effect` 和 `material` 在 `cocos creator` 中的关系吧。  

`effect` 是我们编写 `shader` 的地方， `effect` 中可能会有多个配置参数，不同的配置参数可以生成不同 `material` , `material` 挂载在 `RenderComponent` 上，对其产生效果。  

![](/img/in-post/202003/31-04.jpg)   


例如，在[分形着色器！](https://mp.weixin.qq.com/s/OuQaI18LwX3Lw7aRcKjDOw)和[卷积滤镜！](https://mp.weixin.qq.com/s/WAajs8p69X8UJFvNiYuNDA)这两篇文章中，对同一个 `effect` 生成了不同的 `material` 。   

![](/img/in-post/202003/31-05.jpg)   


继承 `RenderComponent` 的组件有多个，只要修改对应的 `material` 就能实现我们的定义的 `shader` 。  

![](/img/in-post/202003/31-06.jpg)   

不过需要注意的是，要基于默认材质去修改哦。  

![](/img/in-post/202003/31-07.jpg)   


最后，推荐一个学习shader编程的网站: [https://thebookofshaders.com/](https://thebookofshaders.com/?lan=ch)

> 动手实践！在实践中成长！在模仿中学习！  

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"闪白特效"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/attacked)   
<!-- [参考文章](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w) -->