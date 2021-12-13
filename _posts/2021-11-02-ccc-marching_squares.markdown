---
layout: post
title:  " Regenerate Points 实现解析！ Marching Squares !"
date:   2021-11-02 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 编辑器里 `Regenerate Points` 功能怎么实现？节点动态加载了 `spriteFrame` ,怎么重新获取碰撞组件多边形顶点数组 `points`?


# 背景

在 `Cocos Creator` 编辑中，多边形碰撞组件中有一个 `Regenerate Points` 的功能，这个功能可以根据组件依附的节点上的 `Sprite` 组件的贴图的像素点来自动生成相应轮廓的顶点。`Threshold` 指明生成贴图轮廓顶点间的最小距离，值越大则生成的点越少。

![Regenerate Points](/img/in-post/202111/03-01.png)      

白玉无冰源于兴趣，对其中的实现做一些研究。最终研究成果如下文所示。  


# 实现

编辑器中的实现主要以下几步：
- 读取图片所有的像素点数据
- 计算围成轮廓的像素点
- 计算顶点(处理`Threshold`)
- 对结果进行坐标转换

以下是在 `Canvas` 中计算轮廓(红边)和和计算顶点(蓝点)的效果。    

![实现效果](/img/in-post/202111/03-02.gif)       


## 获取像素点数据

编辑中读取像素数据用了[sharp](https://github.com/lovell/sharp)这个库去读取。  

![编辑器中读取像素数据](/img/in-post/202111/03-03.png)      

白玉无冰这里采用 `Canvas` 获取图片像素数据。  

```js
const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './白玉无冰.png';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

img.onload = function () {
    main();
};
const main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const canvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = canvasImageData.data;
    // data 就是像素数据，从左往右，从上往下的像素数据
}
```

## 计算围成轮廓的像素点

核心思路是参考 `Marching Squares` 算法：
- 先从上到下，从左到右的顺序，找到第一个不透明的点。
- 根据当前点的 左上/左边/上边/当前点 四个点的透明值计算一个值，根据这个值判断往哪个方向移动
- 移动后继续计算，继续移动，直到回到第一个点

简单来说就是，找一个点，然后逆时针环绕一圈。  

先看看如何根据当前点周围的透明度值计算一个值，这里巧妙地使用了二进制相加，可以通过和判断不同情况。  

```JS
/*
checking the 2x2 pixel grid, assigning these values to each pixel, if not transparent
+---+---+
| 1 | 2 |
+---+---+
| 4 | 8 | <- current pixel (curx,cury)
+---+---+
*/
// 以下为伪代码
let state = 0;
let tl = {x:(x-1), y:(y-1)}
state += (containsPoint(tl)&&getAlphaByPos(tl)>0)? 1:0;
let tr = {x:(x-1), y:(y)}
state += (containsPoint(tr)&&getAlphaByPos(tr)>0)? 2:0;
let bl = {x:(x-1), y:(y)}
state += (containsPoint(bl)&&getAlphaByPos(bl)>0)? 4:0;
let br = {x:(x), y:(y)}
state += (containsPoint(br)&&getAlphaByPos(br)>0)? 8:0;
```

根据不同的值，走不同的方向。  

![不同的值不同的方向](/img/in-post/202111/03-04.png)      

这里简单解释一下为何是这么走，因为我们考虑的是逆时针行走，所有箭头方向的左侧必须有像素，箭头方向的右侧必须不能有像素。  

![逆时针与方向](/img/in-post/202111/03-05.png)       

整合一下，完整的JS代码如下:  

```JS
const marching_squares = {
    NONE: 0,
    UP: 1,
    LEFT: 2,
    DOWN: 3,
    RIGHT: 4,
    getBlobOutlinePoints: function (data, width, height, loop) {
        marching_squares.data = data,
            marching_squares.width = width,
            marching_squares.height = height,
            marching_squares.loop = loop;
        var p = marching_squares.getFirstNonTransparentPixelTopDown(),
            result = marching_squares.walkPerimeter(p.x, p.y);
        return marching_squares.width = null,
            marching_squares.height = null,
            marching_squares.data = null,
            marching_squares.loop = null,
            result
    },
    getFirstNonTransparentPixelTopDown: function () {
        var t, a, data = marching_squares.data,
            width = marching_squares.width,
            height = marching_squares.height,
            s = 0;
        for (t = 0; t < height; t++) for (a = 0; a < width; a++, s += 4) if (data[s + 3] > 0) return {
            x: a,
            y: t
        };
        return null
    },
    walkPerimeter: function (pos_x, pos_y) {
        pos_x < 0 && (pos_x = 0),
            pos_x > marching_squares.width && (pos_x = marching_squares.width),
            pos_y < 0 && (pos_y = 0),
            pos_y > marching_squares.height && (pos_y = marching_squares.height);
        var x = pos_x,
            y = pos_y,
            result = [{ x, y }];
        do {
            switch (marching_squares.step(x, y, marching_squares.data), marching_squares.nextStep) {
                case marching_squares.UP:
                    y--;
                    break;
                case marching_squares.LEFT:
                    x--;
                    break;
                case marching_squares.DOWN:
                    y++;
                    break;
                case marching_squares.RIGHT:
                    x++
            }
            x >= 0 && x <= marching_squares.width && y >= 0 && y <= marching_squares.height && result.push({ x, y })
        } while (x !== pos_x || y !== pos_y);
        return marching_squares.loop && result.push({ x, y }),
            result
    },
    step: function (x, y, data) {
        var width = marching_squares.width,
            rowOffset = 4 * width,
            upLeftIndex = (y - 1) * rowOffset + 4 * (x - 1),
            isInLeft = x > 0,
            isInRight = x < width,
            isInDown = y < marching_squares.height,
            isInUp = y > 0;
        marching_squares.upLeft = isInUp && isInLeft && data[upLeftIndex + 3] > 0;
        marching_squares.upRight = isInUp && isInRight && data[upLeftIndex + 7] > 0;
        marching_squares.downLeft = isInDown && isInLeft && data[upLeftIndex + rowOffset + 3] > 0;
        marching_squares.downRight = isInDown && isInRight && data[upLeftIndex + rowOffset + 7] > 0;
        marching_squares.previousStep = marching_squares.nextStep;
        marching_squares.state = 0;
        marching_squares.upLeft && (marching_squares.state |= 1);
        marching_squares.upRight && (marching_squares.state |= 2);
        marching_squares.downLeft && (marching_squares.state |= 4);
        marching_squares.downRight && (marching_squares.state |= 8);
        switch (marching_squares.state) {
            case 1:
                marching_squares.nextStep = marching_squares.UP;
                break;
            case 2:
            case 3:
                marching_squares.nextStep = marching_squares.RIGHT;
                break;
            case 4:
                marching_squares.nextStep = marching_squares.LEFT;
                break;
            case 5:
                marching_squares.nextStep = marching_squares.UP;
                break;
            case 6:
                marching_squares.previousStep == marching_squares.UP ? marching_squares.nextStep = marching_squares.LEFT : marching_squares.nextStep = marching_squares.RIGHT;
                break;
            case 7:
                marching_squares.nextStep = marching_squares.RIGHT;
                break;
            case 8:
                marching_squares.nextStep = marching_squares.DOWN;
                break;
            case 9:
                marching_squares.previousStep == marching_squares.RIGHT ? marching_squares.nextStep = marching_squares.UP : marching_squares.nextStep = marching_squares.DOWN;
                break;
            case 10:
            case 11:
                marching_squares.nextStep = marching_squares.DOWN;
                break;
            case 12:
                marching_squares.nextStep = marching_squares.LEFT;
                break;
            case 13:
                marching_squares.nextStep = marching_squares.UP;
                break;
            case 14:
                marching_squares.nextStep = marching_squares.LEFT;
                break;
            default:
                marching_squares.nextStep = marching_squares.NONE
        }
    }
};
```


对应之前的`canvas`中的数据，就可以获得轮廓的像素点。  

```JS
let blobOutlinePoints = marching_squares.getBlobOutlinePoints(data, canvas.width, canvas.height, true);
```



## 计算顶点

上面得到的像素点过于密集，比如同一直线上只需要两个点，距离太近的点是否需要截取？

编辑器内是这么做的：
1. 先拿出起始点和终点
2. 找出一个中间点，该点到 起点和终点连成的直线 的距离最大
3. 判断这个距离
    - 如果大于`Threshold`，把这些点根据中间分成两份，继续第一步，再把两份拼接起来。
    - 如果小于`Threshold`，返回 `[起点，终点]`

![计算顶点](/img/in-post/202111/03-06.gif)       

这里涉及了一个点到直接的距离公式。  

![点到直线的距离](/img/in-post/202111/03-06.png)       

将上面的设计转成代码如下：

```JS
const pointLineDistance = function (point, linePointBegin, linePointEnd) {
    let result, k, b;
    if (linePointBegin.x === linePointEnd.x) {
        result = Math.abs(point.x - linePointBegin.x)
    } else {
        // y = kx + b
        k = (linePointEnd.y - linePointBegin.y) / (linePointEnd.x - linePointBegin.x);
        b = linePointBegin.y - k * linePointBegin.x;
        // kx - y + b = 0
        result = Math.abs(k * point.x - point.y + b) / Math.sqrt(Math.pow(k, 2) + 1);
    }
    return result
}
const rdp = function rdp(points, threshold) {
    var point0 = points[0],
        point_end = points[points.length - 1];
    if (points.length < 3) return points;
    for (var slice_index = -1, max_dis = 0, index = 1; index < points.length - 1; index++) {
        var cur_dis = pointLineDistance(points[index], point0, point_end);
        cur_dis > max_dis && (max_dis = cur_dis, slice_index = index)
    }
    if (max_dis > threshold) {
        var left_poins = points.slice(0, slice_index + 1),
            right_points = points.slice(slice_index),
            left_rdp = rdp(left_poins, threshold),
            right_rdp = rdp(right_points, threshold);
        return left_rdp.slice(0, left_rdp.length - 1).concat(right_rdp)
    }
    return [point0, point_end]
};
```



对应之前的轮廓的像素点，可以得到顶点数据。  

```JS
const contourPoints = rdp(blobOutlinePoints, config.threshold);
```

## 最后处理

因为 `Canvas` 的坐标系是左上角，与纹理数据相符，所以在这个Demo中并不需要处理。  

![实现效果](/img/in-post/202111/03-02.gif)       

然而，在编辑中，节点的坐标系与纹理的坐标系不同，需要根据锚点等参数再做一次转换，以下是编辑器的处理代码。   

![处理坐标](/img/in-post/202111/03-07.png)      



# 最后

> 示例 Demo 地址:[https://lamyoung.gitee.io/web/marching_squares/](https://lamyoung.gitee.io/web/marching_squares/)   

本 Demo 仅在一个 `Canvas` 中实现简易展示效果, 并未融入`Cocos Creator`的项目中。若要融入项目，重点要解决如何获取图片的像素数据，本Demo使用了 `canvas`的接口，可供参考。

这个算法存在一个问题，只会对第一个不透明的点计算轮廓顶点。如果图片中有多个轮廓，可以统计之前以遍历过的点，以及包围的点，继续算下一个轮廓。  


最后分享一个大佬那拿到的神秘代码，不太好直接给出，需要的进一步研究的可以参考使用。

```
Ly/miZPlvIAyLjTnvJbovpHlmajnmoTosIPor5XnlYzpnaLvvIzlsIbov5nmrrXku6PnoIHlpI3liLbliLDmjqfliLblj7Dlubblm57ovaYKdmFyIGZzID0gcmVxdWlyZSgiZnMiKTsKICAgIHZhciBwYXRoID0gcmVxdWlyZSgicGF0aCIpCiAgICB2YXIgYXBwID0gcmVxdWlyZSgiZWxlY3Ryb24iKS5yZW1vdGUuYXBwOwogICAgLy8gdmFyIGZzaiA9IHJlcXVpcmUoImZzLWpldHBhY2siKTsKICAgIC8vIGV4YW1wbGUgdXNhZ2UgOiBjb3B5RmlsZU91dHNpZGVPZkVsZWN0cm9uQXNhciggIm15Rm9sZGVySW5zaWRlVGhlQXNhckZpbGUiLCBhcHAuZ2V0UGF0aCgidGVtcCIpICsgImNvbS5ibGEuYmxhIgogICAgdmFyIGNvcHlGaWxlT3V0c2lkZU9mRWxlY3Ryb25Bc2FyID0gZnVuY3Rpb24gKHNvdXJjZUluQXNhckFyY2hpdmUsIGRlc3RPdXRzaWRlQXNhckFyY2hpdmUpIHsKICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoYXBwLmdldEFwcFBhdGgoKSxzb3VyY2VJbkFzYXJBcmNoaXZlKSkpIHsKICAgICAgICAgICAvLyBjb25zb2xlLmxvZygi5byA5aeLIik7Ci8vY29uc29sZS5sb2co6Lev5b6EOithcHAuZ2V0QXBwUGF0aCgpICsgIi8iICsgc291cmNlSW5Bc2FyQXJjaGl2ZSk7ICAgICAgICAgICAgCiAgICAgICAgICAgIC8vIGZpbGUgd2lsbCBiZSBjb3BpZWQKICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKGFwcC5nZXRBcHBQYXRoKCkgKyAiLyIgKyBzb3VyY2VJbkFzYXJBcmNoaXZlKS5pc0ZpbGUoKSkgewogICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygi5aSN5Yi25paH5Lu2IikKICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZGVzdE91dHNpZGVBc2FyQXJjaGl2ZSAKICAgICAgICAgICAgICAgIGxldCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSk7CiAgICAgICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkgewogICAgICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhmaWxlLCBmcy5yZWFkRmlsZVN5bmMoYXBwLmdldEFwcFBhdGgoKSArICIvIiArIHNvdXJjZUluQXNhckFyY2hpdmUpKTsKICAgICAgICAgICAgfQogICAgICAgICAgICAvLyBkaXIgaXMgYnJvd3NlZAogICAgICAgICAgICBlbHNlIGlmIChmcy5zdGF0U3luYyhhcHAuZ2V0QXBwUGF0aCgpICsgIi8iICsgc291cmNlSW5Bc2FyQXJjaGl2ZSkuaXNEaXJlY3RvcnkoKSkgewogICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygi5aSN5Yi25paH5Lu25aS5IikKICAgICAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGFwcC5nZXRBcHBQYXRoKCkgKyAiLyIgKyBzb3VyY2VJbkFzYXJBcmNoaXZlKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlT3JGb2xkZXJOYW1lKSB7CiAgICAgICAgICAgICAgICAgICAgY29weUZpbGVPdXRzaWRlT2ZFbGVjdHJvbkFzYXIoc291cmNlSW5Bc2FyQXJjaGl2ZSArICIvIiArIGZpbGVPckZvbGRlck5hbWUsIGRlc3RPdXRzaWRlQXNhckFyY2hpdmUgKyAiLyIgKyBmaWxlT3JGb2xkZXJOYW1lKTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQovL+eEtuWQjuWcqOaOp+WItuWPsO+8jOaJp+ihjOS7peS4i+mAu+i+ke+8jOebruagh+aWh+S7tuWkuei3r+W+hO+8jOiHquW3seS/ruaUuQpjb3B5RmlsZU91dHNpZGVPZkVsZWN0cm9uQXNhcigiLi8iLCJEOlxcQ29jb3NEYXNoYm9hcmRfMS4wLjhcXHJlc291cmNlc1xcLmVkaXRvcnNcXENyZWF0b3JcXDIuNC40XFxyZXNvdXJjZXNcXGFwcCIp
```

## 参考资料

[https://en.wikipedia.org/wiki/Marching_squares](https://en.wikipedia.org/wiki/Marching_squares)
[https://github.com/cocos2d/cocos2d-x/blob/v3/cocos/2d/CCAutoPolygon.cpp](https://github.com/cocos2d/cocos2d-x/blob/v3/cocos/2d/CCAutoPolygon.cpp)
[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
[https://github.com/lovell/sharp](https://github.com/lovell/sharp)


以上为白玉无冰关于 `Regenerate Points 实现解析` 的分享，欢迎大家留言讨论。 


> 如切如磋，如琢如磨。

--- 
[关于泰勒公式展开](https://mp.weixin.qq.com/s/3XMfRo5L8_omY9SYLAo4kw)    
[写一个位图字体制作工具](https://mp.weixin.qq.com/s/OaoeKVmDDdHddPdUmdIpsg)    
[替代 toDataURL 的方案](https://mp.weixin.qq.com/s/tQPIOrweQZrTIM74fM6HUA)    
[Fake3D && Shader](https://mp.weixin.qq.com/s/11ZEPKFLo8uE4DtPB4aOBQ)    
[MatCap && Shader](https://mp.weixin.qq.com/s/_BkQVpEiQaqQ8VojnA0l2w)   
[如何抄shader](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)   
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)   

---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

[原文链接](https://mp.weixin.qq.com/s/trb4dfOyHxAQoyujaSNVaQ)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   
