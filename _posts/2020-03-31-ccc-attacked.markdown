---
layout: post
title:  "被攻击闪白特效！小白shader入门实战 ！Cocos Creator! "
date:   2020-03-31 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

>  小白上手 shader 编程最佳实战！  

![](/img/in-post/202003/31-01.jpg)   


**效果预览**

![](/img/in-post/202003/31-02.gif)   


**实现原理**

在着色器中，给所有颜色值添加一个颜色值。  

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

> 学会思考，拆解需求，解决问题。  

以上为白玉无冰使用 `Cocos Creator v2.2.2` 开发`"闪白特效"`的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。  


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/attacked)   
<!-- [参考文章](https://mp.weixin.qq.com/s/8Kz0l46YWxcx6cLukAnt9w) -->