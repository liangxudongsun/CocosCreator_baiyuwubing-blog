---
layout: post
title:  "3D数学基础 ｜ 坐标系 "
date:   2021-12-10 22:22:22 +0800
categories: math
tags:
    - math
---

> 《3D数学基础：图形与游戏开发》

> 计算机图形学第一准则：近似原则。如果它看上去是对的，它就是对的。  

## 左手坐标系与右手坐标系

3D坐标系中存在两种坐标系：左手坐标系和右手坐标系。  

伸出你的双手，让拇指(x)、食指(y)和中指(z)相互垂直，就构成了相应的坐标系。  

![左手坐标系与右手坐标系](/img/in-post/202112/10-01.png)      

> 🎈 OpenGL中的坐标系大体是右手坐标系，而Direct3D中大体是左手坐标系。 

🥥 Cocos Creator 3.0 的世界坐标系采用的是笛卡尔右手坐标系，默认 x 向右，y 向上，z 向外，同时使用 -z 轴为正前方朝向。

![Cocos Creator 与右手坐标系](/img/in-post/202112/10-02.png)      


其中旋转也遵循对应左右手法则，伸出双手，做一个点赞👍 的手势，拇指指向朝向，四指握着的方向为正。  

![旋转与左右手](/img/in-post/202112/10-03.png)     

🥥 Cocos Creator 3.0 中的旋转（Rotation）遵守右手法则，从转向轴往原点看，当属性值为 正 时，节点 逆时针 旋转。当属性值为 负 时，节点 顺时针 旋转。  

![Cocos Creator 旋转](/img/in-post/202112/10-04.gif)     


> ⚠️ 注意：节点上的 rotation 属性是一个四元数，表示的是绕任意轴旋转的角度。与 属性检查器 中的 Rotation 所对应的属性是欧拉角属性 EulerAngles。这两个属性可以根据需求分别使用，在使用 API 时请一定要注意它们和编辑器面板属性名的对应区别。

左右手坐标系可以相互转换，只需翻转一个轴的符号。  

![翻转一个轴](/img/in-post/202112/10-05.gif)     

## 世界坐标系

世界坐标系（World Coordinate）是一个特殊的坐标系，它建立了我们所关心的最大的空间。

世界坐标系建立了描述其他坐标系所需要的参考框架。也就是说，能够用世界坐标系描述其他坐标系的位置，而不能用更大的、外部的坐标系来描述世界坐标系。  

![世界坐标系](/img/in-post/202112/10-06.png)     

世界坐标系也被广泛称作全局坐标系或者宇宙坐标系。  

关于世界坐标系的典型问题都是关于初始位置和环境：
- 每个物体的位置和方向
- 摄像机的位置和方向
- 世界中每一个点的地形是什么
- 各个物体从哪里来，到哪里去（NPC运动策略）

🥥 世界坐标系也叫做绝对坐标系，在 Cocos Creator 3.0 游戏开发中表示场景空间内的统一坐标体系，「世界」用来表示我们的游戏场景。

![Cocos Creator 世界坐标系](/img/in-post/202112/10-07.png)     

## 物体坐标系

物体坐标系（Local Coordinate）是和特定物体相关的坐标系。每个物体都有它们独立的坐标系，当物体移动或改变方向时，和物体相关的坐标系也会改变。    

某些情况下，物体坐标系也称为模型坐标系。因为模型顶点的坐标时在模型坐标中描述的。   

> 💡 物体坐标系 ｜ 本地坐标系 ｜ 模型坐标系 ｜ 局部坐标系 ❕可以看作一个东西多种叫法。  

在物体坐标系中可能遇到的问题：
- 周围有相互作用的物体吗？（我要攻击它吗）
- 哪个方向？在我的前面后面？左边？右边？（我应该向它射击🔫，，还是转身就跑🏃？）

![物体坐标系](/img/in-post/202112/10-08.png)     


> 🎈 模型定义的空间叫作局部空间（local space）或模型空间（model space）。OpenGL文档使用的术语是物体空间（object space）。  

🥥 Creator 3.0 的 节点（Node） 之间可以有父子关系的层级结构，我们通过修改节点的 Position 属性设定的节点位置是该节点相对于父节点的 本地坐标系，而非世界坐标系。

![Creator 本地坐标系](/img/in-post/202112/10-09.gif)     

> 🎈 3D美工们在构筑3D对象时也在做着类似的事情。他们并不会在全局场景坐标系（即世界空间，也译为世界坐标系，world space）中构建物体的几何形状，而是相对于局部坐标系（局部空间，也译为局部坐标系，local space）来创建物体。  
 

## 摄像机坐标系

摄像机坐标系可被看作是一种特殊的物体坐标系，该物体坐标系就定义在摄像机的屏幕可见区域。  

![摄像机坐标系](/img/in-post/202112/10-10.png)       

关于摄像机坐标系的一些典型问题：
- 3D空间中的某个点是在摄像机的前方吗？
- 3D空间中的某个点是在屏幕上，还是超出了摄像机平界面锥体的边界？（裁剪坐标系）
- 某个物体是否在屏幕上？是部分在，还是全部不在？
- 两个物体，谁在前面？（可见性检测）

![摄像机坐标系](/img/in-post/202112/10-10-01.png)       


> 🎈 我们为摄像机赋予一个局部坐标系（这被称作观察空间（view space），也译作观察坐标系、视图空间、视觉空间（eye space）或摄像机空间（camera space））  

🥥  相机的可视范围是通过 6 个平面组成一个 视锥体（Frustum） 构成，近裁剪面（Near Plane） 和 远裁剪面（Far Plane） 用于控制近处和远处的可视距离与范围，同时它们也构成了视口的大小。  

![摄像机](/img/in-post/202112/10-11.png)     


## 坐标系转换

坐标变换：知道某一点的坐标，怎样在另一个坐标系中描述该点。该点并没有真正移动，而是在不同的坐标系中描述它的位置。  

![坐标变换](/img/in-post/202112/10-12.png)   

通常，坐标系间的变化会用矩阵（先挖个坑，后面再详细讲）表示。  

> 🎈 将局部坐标系内的坐标转换到全局场景坐标系中的过程叫作世界变换（world transform），所使用的变换矩阵名为世界矩阵（world matrix）

![坐标变换](/img/in-post/202112/10-13.png)     

> 🎈 由世界空间至观察空间的坐标变换称为取景变换（view transform，也译作观察变换、视图变换等），此变换所用的矩阵则称为观察矩阵（view matrix，亦译作视图矩阵）。

![SRT MVP](/img/in-post/202112/10-14.png)     

🌰 举个例子，场景中的有两个节点，他们各自有一个子节点，求其中一个子节点在另一个子节点的局部坐标系中的坐标。  

![举个例子](/img/in-post/202112/10-15.png)     

分三步走，解决上述例子：
1. 求出B0的世界坐标
2. 求出A0的世界矩阵的逆
3. 将上面两部的结果相乘




```ts
import { _decorator, Component, Node, Vec3, v3, mat4, Mat4 } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

const temp_mat4 = mat4();
@ccclass('NodeExtraInfo')
@executeInEditMode
export class NodeExtraInfo extends Component {

    @property
    private _refresh = false;
    @property({displayName: "刷新"})
    get refresh() {
        return this._refresh;
    }
    set refresh(value) {
        this.onTransformChange()
    }

    @property({ readonly: true, editorOnly: true })
    Author = "白玉无冰";

    @property({ readonly: true, editorOnly: true })
    worldPosition: Vec3 = v3();

    @property({ editorOnly: true, displayName: "在该节点下的", type: Node })
    otherNode: Node = null!;

    @property({ readonly: true, editorOnly: true, displayName: "坐标" })
    otherNodePosition: Vec3 = v3();

    onEnable() {
        if (!EDITOR) return
        this.onTransformChange();
        this.node.on(Node.EventType.TRANSFORM_CHANGED, this.onTransformChange, this);
    }

    onDisable() {
        if (!EDITOR) return
        this.node.off(Node.EventType.TRANSFORM_CHANGED, this.onTransformChange, this);
    }

    private onTransformChange() {
        this.worldPosition = this.node.worldPosition;
        if (this.otherNode) {
            const otherNodeWorldMatrixInvert = Mat4.invert(temp_mat4, this.otherNode.worldMatrix);
            Vec3.transformMat4(this.otherNodePosition, this.worldPosition, otherNodeWorldMatrixInvert);
        }
    }
}
```


（未完待续。。。）

--- 
[碰撞组件多边形顶点数组是怎么自动生成的](https://mp.weixin.qq.com/s/trb4dfOyHxAQoyujaSNVaQ)    
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

<!-- [原文链接](https://mp.weixin.qq.com/s/trb4dfOyHxAQoyujaSNVaQ)    
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)    -->
