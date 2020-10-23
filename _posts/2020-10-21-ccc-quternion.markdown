---
layout: post
title:  "四元数与3D旋转实例！ Cocos Creator 3D Quternion !"
date:   2020-10-21 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 用几个实用的例子带你理解四元数!

# 前言

本文不会讲太多四元数公式的推导过程，重点讲讲几个接口的使用和个人理解。

阅读本文可能需要一些前置的知识（但不限于这些知识点）：
- 向量 （内积外积/基本运算/几何意义）
- 坐标系（左手系/右手系/世界坐标/本地坐标）
- 矩阵（平移/旋转/缩放/模型矩阵/视图矩阵/投影矩阵）
- 视点和视线（视点/观察目标/上方向）

<iframe src="//player.bilibili.com/player.html?aid=627376921&bvid=BV1Bt4y1v7R1&cid=246347577&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

[https://www.bilibili.com/video/BV1Bt4y1v7R1/](https://www.bilibili.com/video/BV1Bt4y1v7R1/)

表示3D旋转一般采用三种方法：
- 矩阵
- 欧拉角
- 四元数

为什么使用四元数表示旋转呢？
- 平滑插值。 (矩阵基本没有，欧拉角可以做插值，但可能遭遇万向锁的问题)
- 快速连接和角位移求逆。
- 能和矩阵快速转换。
- 仅用四个数。（矩阵9个，欧拉角3个）
- ~~难以理解，学会了看起来很牛逼。~~


当然四元数也有一些缺点：
- 四元数可能不合法。（一般通过四元数标准化解决这个问题，确保四元数为单位四元数）
- 对给定的方位的表达方式有两种方法，它们相互为负。（矩阵唯一，欧拉角有无数种）
- 相对难以使用。

![](/img/in-post/202010/21-01.gif)  



# 实例

## 构造四元数

四元数的定义这边就不详细说了，大概知道就是用四个数字去表达旋转。

那么怎么去构造这个四元数呢？我们从API入手去讲解和理解。

### 旋转轴和旋转角

有了旋转轴和旋转角，就可以表示旋转了，那么四元数也可以通过这个构造出来。  

![](/img/in-post/202010/21-02.png)  

```ts
/**
* @zh 根据旋转轴和旋转弧度计算四元数
*/
public static fromAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, axis: VecLike, rad: number) {
    rad = rad * 0.5; // 为什么要除以2？因为公式推导出来的！
    const s = Math.sin(rad);
    out.x = s * axis.x;
    out.y = s * axis.y;
    out.z = s * axis.z;
    out.w = Math.cos(rad);
    return out;
}
```

### 本地坐标轴

根据该物体本地坐标轴也能确定旋转。

![](/img/in-post/202010/21-03.png)  


```ts
/**
* @zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
*/
public static fromAxes<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, xAxis: VecLike, yAxis: VecLike, zAxis: VecLike) {
    Mat3.set(m3_1,
        xAxis.x, xAxis.y, xAxis.z,
        yAxis.x, yAxis.y, yAxis.z,
        zAxis.x, zAxis.y, zAxis.z,
    );
    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
}
```

### 视口和上方向

根据视口的前方向和上方向，先计算本地坐标轴的右向量，再算出本地坐标的上向量，最后再构造成四元数。  

![](/img/in-post/202010/21-04.jpg)  


```ts
/**
* @zh 根据视口的前方向和上方向计算四元数
* @param view 视口面向的前方向，必须归一化
* @param up 视口的上方向，必须归一化，默认为 (0, 1, 0)
*/
public static fromViewUp<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, view: VecLike, up?: Vec3) {
    Mat3.fromViewUp(m3_1, view, up);
    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
}
```

### 两向量间的最短路径旋转

也可以用一个四元数表示量向量旋转的最短路径。

![](/img/in-post/202010/21-05.png)  


```ts
/**
* @zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
*/
public static rotationTo<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, a: VecLike, b: VecLike) {
  // 省略代码实现
}
```

### 矩阵/欧拉角

也可以通过其他表示方法转换为四元数。

```ts
/**
* @zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
*/
public static fromMat3<Out extends IQuatLike> (out: Out, m: Mat3) {
    // 省略代码实现
}

/**
* @zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
*/
public static fromEuler<Out extends IQuatLike> (out: Out, x: number, y: number, z: number) {
    // 省略代码实现
}
```


## 获取四元数相关信息

上面讲了如何去构造，相应的也可以通过四元数获取相关信息，这里不细讲了含义了，直接看看API吧。

```ts
/**
* @zh 获取四元数的旋转轴和旋转弧度
* @param outAxis 旋转轴输出
* @param q 源四元数
* @return 旋转弧度
*/
public static getAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (outAxis: VecLike, q: Out) {
    //...
}

/**
* @zh 返回定义此四元数的坐标系 X 轴向量
*/
public static toAxisX (out: IVec3Like, q: IQuatLike) {
    //...
}

/**
* @zh 返回定义此四元数的坐标系 Y 轴向量
*/
public static toAxisY (out: IVec3Like, q: IQuatLike) {
    //...
}

/**
* @zh 返回定义此四元数的坐标系 Z 轴向量
*/
public static toAxisZ (out: IVec3Like, q: IQuatLike) {
    //...
}

/**
* @zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
* @param outerZ z 取值范围区间改为 [-180, -90] U [90, 180]
*/
public static toEuler (out: IVec3Like, q: IQuatLike, outerZ?: boolean) {
   //...
}

```


## 实际例子

没有实战，单纯讲API就是耍流氓！直接进入实战部分！

### 角色朝向和平滑插值

已知当前点和下一个点，如何求出角色的朝向四元数？
- 先算出前方向
- 根据视口上方向求出四元数

```ts
const cur_p = list[index - 1]; // 当前点
const next_p = list[index]; // 最终点
const quat_end = new Quat(); // 最终旋转四元数
const dir = next_p.clone().subtract(cur_p); // 前向量
// 模型正好朝z轴方向
Quat.fromViewUp(quat_end, dir.normalize(), v3(0, 1, 0)); // 根据视口的前方向和上方向计算四元数  
// 最终旋转四元数 / 视口面向的前方向 / 视口的上方向
```

已知起始四元数和终点四元数，如何平滑旋转？

```ts
const tw = tween(this.node_bezier_role); // 使用tween动画
const quat_start = new Quat();
this.node_bezier_role.getRotation(quat_start); // 获取起始四元数
const quat_end = new Quat(); // 最终旋转四元数 假设已经算出
const quat_now = new Quat(); // 用一个中间变量
tw.to(0.2, {}, {
    onUpdate: (target, ratio: number) => {
        // ratio : 0~1
        // 这里使用球面插值，旋转时不会出现变形
        quat_now.set(quat_start).slerp(quat_end, ratio);
        this.node_bezier_role.setRotation(quat_now);
    },
})
tw.start();

```

将旋转和移动结合起来就能达到下面这个效果。

![](/img/in-post/202010/21-06.gif)  


### 触摸旋转

关键是求出旋转轴，这边处理的旋转轴在 `xoy` 这个平面上。  

![](/img/in-post/202010/21-07.jpg)  


```ts
//  private onTouchMove(touch: Touch) {
const delta = touch.getDelta();

// 自传
// 这个物体模型‘锚点’在正中心效果比较好
// 垂直的轴，右手  
//  
//  旋转轴
//  ↑
//  ---> 触摸方向
const axis = v3(-delta.y, delta.x, 0); //旋转轴，根据相似三角形求出
const rad = delta.length() * 1e-2; //旋转角度
const quat_cur = this.node_touch_rotation_role.getRotation(); //当前的四元数
Quat.rotateAround(this.__temp_quat, quat_cur, axis.normalize(), rad); //当面的四元数绕旋转轴旋转
// 旋转后的结果 / 当前的四元数 / 旋转轴 / 旋转四元数
this.node_touch_rotation_role.setRotation(this.__temp_quat);

```

展示结果如下：

![](/img/in-post/202010/21-08.gif)  



### 绕轴旋转

已知旋转点、旋转轴、旋转角度，求旋转后的位置和朝向。

朝向计算和触摸旋转类似，这里不详说了。

这边讲讲如何计算旋转后的坐标。
- 先计算旋转点和当前位置点的向量（起始向量）
- 计算旋转四元数
- 计算起始向量旋转后的向量
- 计算旋转后的坐标点

![](/img/in-post/202010/21-09.png)  


```ts
//  private onTouchMove(touch: Touch) {
const delta = touch.getDelta();
// 绕轴转
// 这里选取轴朝上
const axis2 = Vec3.UP;//旋转轴
const rad2 = 1e-2 * delta.x; //旋转角度
// 计算坐标
const point = this.node_axi.worldPosition; //旋转点
const point_now = this.node_touch_axi_role.worldPosition; // 当前点的位置
// 算出坐标点的旋转四元数
Quat.fromAxisAngle(this.__temp_quat, axis2, rad2);
// 计算旋转点和现有点的向量
Vec3.subtract(this.__temp_v3, point_now, point);
// 计算旋转后的向量
Vec3.transformQuat(this.__temp_v3, this.__temp_v3, this.__temp_quat)
// 计算旋转后的点
Vec3.add(this.__temp_v3, point, this.__temp_v3);
this.node_touch_axi_role.setWorldPosition(this.__temp_v3);

// 计算朝向
// 这么旋转会按原始的朝向一起旋转
const quat_now = this.node_touch_axi_role.worldRotation;
Quat.rotateAround(this.__temp_quat, quat_now, axis2, rad2);
Quat.normalize(this.__temp_quat, this.__temp_quat);
this.node_touch_axi_role.setWorldRotation(this.__temp_quat);
```

最终效果如下。

![](/img/in-post/202010/21-10.gif)  


# 小结

可以把四元数当作一个工具，想想旋转可以是用轴角度，本地坐标系，或着视角方向构造出来的，再使用相应的接口去实现我们的各种需求。  

以上为白玉无冰使用 `Cocos Creator 3D v1.2` 实现 `"四元数与旋转"` 的技术分享。欢迎分享给身边的朋友！    

# 参考

- 《WebGL编程指南》
- 《3D数学基础：图形与游戏开发》
- [https://docs.cocos.com/creator3d/api/zh/classes/core_math.quat.html](https://docs.cocos.com/creator3d/api/zh/classes/core_math.quat.html)
- [https://en.wikipedia.org/wiki/Quaternion](https://en.wikipedia.org/wiki/Quaternion)
- [https://eater.net/quaternions](https://eater.net/quaternions)
- [https://github.com/Krasjet/quaternion](https://github.com/Krasjet/quaternion)
- [https://forum.cocos.org/t/creator-3d-unity-transfrom-rotatearound-api/85157/5](https://forum.cocos.org/t/creator-3d-unity-transfrom-rotatearound-api/85157/5)
- [https://forum.cocos.org/t/topic/92924/11](https://forum.cocos.org/t/topic/92924/11)
- [https://forum.cocos.org/t/creator-3d/91299](https://forum.cocos.org/t/creator-3d/91299)


---

![](/img/in-post/bottom.png)  

---  

[完整代码](https://github.com/baiyuwubing/cocos-creator-3d-examples/tree/master/1-2-x)   
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   