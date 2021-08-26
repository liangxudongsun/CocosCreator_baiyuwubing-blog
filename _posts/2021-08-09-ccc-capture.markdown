---
layout: post
title:  "Canvas.toDataURL 用不了咋办？"
date:   2021-08-09 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 只好自个 `encode` 了。    

事由是这样的，接到一个截图需求(以 `base64` 输出)，但是在某个环境下，`Canvas.toDataURL` 这个接口返回的数据是错误的。  

为此，写一篇文章记录一下，如何绕过 `Canvas.toDataURL` ，生成 `base64` 字符串。  

以下为 Cocos官网文档中给出的截图事例代码。[https://docs.cocos.com/creator/manual/zh/render/camera.html#%E6%88%AA%E5%9B%BE](https://docs.cocos.com/creator/manual/zh/render/camera.html#%E6%88%AA%E5%9B%BE)   

![官网中的截图代码](/img/in-post/202108/09-01.png)      

幸运的是 `readPixels()` 能读到位图的像素信息。  

程序就是处理输入和输出的过程，为此，明确我们的输入输出。  
- 输入：`data: Uint8Array` 位图信息 和 图片宽高。
- 输出：带有图片信息的`base64`字符串。(可将该字符串放浏览器中的地址栏，会返回一张图片)

经思考🤔一番，决定采用以下几步实现：
- 像素数据 -> 转 `JPG` 数据 -> 转 `base64`

如何转 `JPG` 格式？按照厂里的方法，应该去了解其文件格式如何生成，需要什么头文件信息，关于`JPEG`相关内容可参考wiki : [https://en.wikipedia.org/wiki/JPEG](https://en.wikipedia.org/wiki/JPEG)

但🥚，在思考前，可以考虑是否有前任👩的轮子。毕竟时间也是一种成本。  

很快，很有型地在大型交友网站 `github` 中找到了前人留下的轮子。  

[https://github.com/jpeg-js/jpeg-js/blob/master/lib/encoder.js](https://github.com/jpeg-js/jpeg-js/blob/master/lib/encoder.js)

这是 `JavaScript` 的代码，白玉无冰这里操作的是直接拷贝出来，放到一个 `TypeScript` 代码中，导出 `encodeJPG` 方法。  

![搬运与改造 jpeg-js](/img/in-post/202108/09-02.png)      

再参考 `jpeg-js` 中的实例代码，组织一下，很快就生成了 `JPEG` 的数据。

![像素数据 转 JPEG 数据 ](/img/in-post/202108/09-03.png)      

再把`JPEG` 的数据中 `Uint8Array` 转 `base64`。

![Uint8Array 转 base64 ](/img/in-post/202108/09-04.png)      

但发现截图反了。  

![截图反了 ](/img/in-post/202108/09-05.png)      

最后，再对原来的数据翻转一下，完整的核心代码如下：  

```ts
// 这样我们就能从 RenderTexture 中获取到数据了
let data = texture.readPixels();
let width = texture.width;
let height = texture.height;
// 接下来翻转y的数据
const flipYData = new Uint8Array(width * height * 4);
let rowBytes = width * 4;
for (let row = 0; row < height; row++) {
    let startRow = height - 1 - row;
    let start = startRow * width * 4;
    for (let i = 0; i < rowBytes; i++) {
        flipYData[row * width * 4 + i] = data[start + i];
    }
}
// 准备生成 jpegImageData
const rawImageData = {
    data: flipYData,
    width: width,
    height: height,
};
const jpegImageData = encodeJPG(rawImageData, 50);
// jpeg -> base64
function uint8ToString(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}
const base64 = btoa(uint8ToString(jpegImageData.data));
cc.warn('base64', "data:image/jpg;base64," + base64);
```

> 完整代码工程：[https://github.com/baiyuwubing/cocos-creator-examples/tree/master/2.4.x/assets/demo06](https://github.com/baiyuwubing/cocos-creator-examples/tree/master/2.4.x/assets/demo06)

以上为白玉无冰使用 `Cocos Creator 2.4` 实现 `"截图生成 base64"` 的过程分享。 

--- 

[Fake3D && Shader](https://mp.weixin.qq.com/s/11ZEPKFLo8uE4DtPB4aOBQ)    
[MatCap && Shader](https://mp.weixin.qq.com/s/_BkQVpEiQaqQ8VojnA0l2w)   
[如何抄shader](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)   
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)   
[渐变色文字3.0](https://mp.weixin.qq.com/s/WUpppo1Db_pQTlaqpRQaTw)  
[水排序效果](https://mp.weixin.qq.com/s/DXl7_rvI5fS3Fg-OmHvgmg)   

---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原文链接](https://mp.weixin.qq.com/s/tQPIOrweQZrTIM74fM6HUA)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   