---
layout: post
title:  "图片/文字 的渐变色实现！ Cocos Creator ! "
date:   2020-06-04 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 支持 `Sprite` 和 `Label`！参数可调！摆地摊的时候学习一波～     

![](/img/in-post/202006/04-01.jpg)   

效果预览：  

![](/img/in-post/202006/04-02.gif)   

如何使用？

在 `cc.Sprite` 或 `cc.Label` 添加脚本 `ColorAssembler2D` 。  

调整颜色 `colors` 参数即可。  

每个点的对应位置如下：     

![](/img/in-post/202006/04-03.jpg)   

如何实现的呢？   

对于 `cc.RenderComponent` 都有一个 `_assembler`。   

![](/img/in-post/202006/04-04.jpg)     

只要这个 `_assembler` 是继承 `cc.Assembler2D` , 就有一个 `updateColor` 的方法。  

![](/img/in-post/202006/04-05.jpg)     

只要依葫芦画瓢，修改一下顶点的颜色值就行了，参考代码如下。  

```ts
// private _updateColors() {
const cmp = this.getComponent(cc.RenderComponent);
if (!cmp) return;
const _assembler = cmp['_assembler'];
if (!(_assembler instanceof cc['Assembler2D'])) return;
const uintVerts = _assembler._renderData.uintVDatas[0];
if (!uintVerts) return;
const color = this.node.color;
const floatsPerVert = _assembler.floatsPerVert;
const colorOffset = _assembler.colorOffset;
let count = 0;
for (let i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
    uintVerts[i] = (this.colors[count++] || color)['_val'];
}
```

当然这个方法要在引擎渲染之后再修改才有效。  

```ts
onEnable() {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
}
```

如果移除了这个组建，还要告诉引擎重新渲染这个颜色。  

```ts
onDisable() {
    cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
    this.node['_renderFlag'] |= cc['RenderFlow'].FLAG_COLOR;
}
```

以上为白玉无冰使用 `Cocos Creator v2.3.3` 关于 `"图片/文字 的渐变色实现"` 的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。   


---

![](/img/in-post/bottom.png)  

---

[原文链接](https://mp.weixin.qq.com/s/8pMNeD78fBvF480xiGJCVQ)   
[完整代码(见readme)](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   