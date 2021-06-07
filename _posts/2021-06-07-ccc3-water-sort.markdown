---
layout: post
title:  "水排序中的这个效果怎么实现？"
date:   2021-06-07 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> Water Sort Puzzle!    

# 效果

这次咱们来实现杯子倾斜中的水面效果。   

效果预览:  
![效果预览](/img/in-post/202106/07-01.gif)    


视频预览:  
<!-- [https://www.bilibili.com/video/BV1hD4y127H2/](https://www.bilibili.com/video/BV1hD4y127H2/) -->


# 实现

首先，简化模型，杯子当作长方形处理，仅考虑杯子旋转范围`-90 ~ 90`度。  

水面渲染可采用`graphics`绘图组件处理(把原点移动至杯子左下角作为原点)，再添加一层`mask`图片遮罩，裁剪出杯效果。  


确认已知条件：
- 杯子的宽高。
- 杯子旋转角度。
- 水面初始高度(杯子未旋转时)。


需求出：
- 水面与水杯的交点位置。   

先考虑杯子节点顺时针旋转(`angle`为正)。     

水面会出现两种情况，我们只需把握一个原则，水的体积(面积)不变。   

梯形形状计算过程如下图所示：  

![梯形](/img/in-post/202106/07-02.jpg)    

三角形形状计算过程如下图所示：  

![三角形](/img/in-post/202106/07-03.jpg)    

计算一个临界角度，通过这个角度判断水的形状是属于哪一种。  

![临界角度](/img/in-post/202106/07-04.jpg)    


对于杯子节点逆时针旋转(`angle`为负)，推算过程类似，参考以下计算过程。  

```ts
private drawOneWater(height: number, color: Color) {
    const radiansA = this.bottleAngle / 180 * Math.PI;
    //计算临界角度
    const radiansM = Math.atan(2 * height / this.bottleWidth);
    const tempWTan = this.bottleWidth * Math.tan(radiansA);
    this.drawGraphics.fillColor = color;
    if (radiansA <= radiansM) {
        if (radiansA < -radiansM) {
            // 三角形 逆时针
            let hL = Math.sqrt(2 * height * -tempWTan);
            // 超出高度处理
            hL = hL > this.bottleHeight ? this.bottleHeight : hL;
            const bW = hL / Math.tan(-radiansA);
            this.drawGraphics.moveTo(this.bottleWidth, 0);
            this.drawGraphics.lineTo(this.bottleWidth, hL);
            this.drawGraphics.lineTo(this.bottleWidth - bW, 0);
            this.drawGraphics.lineTo(this.bottleWidth, 0);
        } else {
            // 梯形，包含顺逆时针
            this.drawGraphics.moveTo(0, 0);
            let hL = height + tempWTan / 2;
            // 超出高度处理
            let cutOffset = 0;
            if (hL > this.bottleHeight) {
                cutOffset += hL - this.bottleHeight
            }
            let hR = height - tempWTan / 2;
            if (hR > this.bottleHeight) {
                cutOffset += hR - this.bottleHeight
            }

            this.drawGraphics.lineTo(this.bottleWidth, 0);
            this.drawGraphics.lineTo(this.bottleWidth, hR - cutOffset);
            this.drawGraphics.lineTo(0, hL - cutOffset);
            this.drawGraphics.lineTo(0, 0);
        }
    } else {
        // 三角形 顺时针
        let hL = Math.sqrt(2 * height * tempWTan);
        // 超出高度处理
        hL = hL > this.bottleHeight ? this.bottleHeight : hL;
        const bW = hL / Math.tan(radiansA);
        this.drawGraphics.moveTo(0, 0);
        this.drawGraphics.lineTo(bW, 0);
        this.drawGraphics.lineTo(0, hL);
        this.drawGraphics.lineTo(0, 0);
    }
    this.drawGraphics.fill();
}
```

对于多层水，按照从高到低的顺序画图，低处的水覆盖高层。如下图所示，按照`0,1,2`的顺序画对应的水层。    

![多层水](/img/in-post/202106/07-05.jpg)    

```ts
private drawWater() {
    if (!this.drawGraphics) return
    this.drawGraphics.clear();
    // 水的高度从高到低画
    for (let index = 0; index < this.waterHeights.length; index++) {
        const height = this.waterHeights[index];
        this.drawOneWater(height, this.waterClolors[index] || Color.WHITE);
    }
}
```

对于每一层什么时候倒完，正好是水的下一层到达瓶口时，大家可以算出对应的角度，这里就留给大家继续实现这个功能吧！  


# 小结

抓住不变量，临界值实现对应效果！    

以上为白玉无冰使用 `Cocos Creator 3.1.0` 实现 `"水排序之水杯效果!"` 的技术分享。 

如果你也办法实现这个效果，一起留言讨论吧！  

> keep hungry! keep foolish! 

# 更多

[转向行为AI](https://mp.weixin.qq.com/s/TOAfkeNBDb6NdOqRqzJhwQ) 
[折纸效果](https://mp.weixin.qq.com/s/1guPBbKkG6iWCcWa_uz6CQ) 
[竖直布局的文本](https://mp.weixin.qq.com/s/tMT9ZMFvYf9QoIdWaL8fOQ) 
[弹性跟随相机！](https://mp.weixin.qq.com/s/NCn8Ygk_I_nRnhmbHQeZwQ) 
[标志板！](https://mp.weixin.qq.com/s/KV7fyF0kvqqOjf01ZbqbmA) 
[2D 素材 3D 效果!](https://mp.weixin.qq.com/s/xHYOzirlAZlbr9Ljuq7NdQ) 
[2020 原创精选!](https://mp.weixin.qq.com/s/ZrIPUEs9mnpPqV4dN_DIGA) 


---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

<!-- [原文链接](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)     -->
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   