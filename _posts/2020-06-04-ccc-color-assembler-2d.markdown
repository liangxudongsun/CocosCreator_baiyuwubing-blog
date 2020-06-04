---
layout: post
title:  "图片/文字 的渐变色实现！ Cocos Creator ! "
date:   2020-06-04 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 支持 `Sprite` 和 `Label`！简单易用！摆摊的时候学习一波～   

![](/img/in-post/202006/04-01.jpg)   

效果预览:  

![](/img/in-post/202006/04-02.gif)   


对应位置:   

![](/img/in-post/202006/04-03.jpg)   

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


以上为白玉无冰使用 `Cocos Creator v2.3.3` 关于 `"图片/文字 的渐变色实现"` 的技术分享。如果对你有点帮助，欢迎分享给身边的朋友。   


---

![](/img/in-post/bottom.png)  

---

[完整代码](https://github.com/baiyuwubing/cocos-creator-examples)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   