---
layout: post
title:  "转向行为! steering behaviors ！"
date:   2021-05-25 22:22:22 +0800
header-img: "img/in-post/post-bg-cocos-creator.png"
categories: cocos-creator
tags:
    - cocos-creator
---

> 寻找 seek 避开 flee 到达 arrive 追逐 purse 躲避 evade 群落 flock !

# 效果
 
> 转向行为旨在通过使用简单的力来帮助自主角色以逼真的方式运动，这些简单的力结合起来可以围绕角色的环境产生逼真的，即兴的导航。它们不是基于涉及路径规划或全局计算的复杂策略，而是使用本地信息，例如邻居的部队。这使它们易于理解和实施，但仍然能够产生非常复杂的运动模式。

群落效果:  
![群落效果](/img/in-post/202105/25-01.gif)    


追逐偏移:  
![追逐偏移](/img/in-post/202105/25-02.gif)    

视频预览:  
[https://www.bilibili.com/video/BV1hD4y127H2/](https://www.bilibili.com/video/BV1hD4y127H2/)


# 实现

实现转向行为抓住以下两个点：  
- 转向力
- 周围角色对象

所以，角色类需要包含以下几个基本属性：  
- 位置
- 速度
- 转向力

每帧根据合力与加速度，速度与位置的关系，更新位置。  
   
![](/img/in-post/202105/25-03.png)  

```ts
this._steeredForce.multiplyScalar(1 / this.mass)
this.velocity.add(this._steeredForce)
this._steeredForce.set(0, 0)
this._position.add(this.velocity)
```

每种行为，都会算出有个期望速度，根据这个期望速度算出一个转向力加上去即可。  


**寻找 `seek` 与 避开 `flee`**

寻找的期望速度直接指向目标点，转向力是期望速度减去当前速度。避开正好相反。  

![](/img/in-post/202105/25-04.gif)  

```ts
seek(target: Vec2): void {
    const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
    desiredVelocity.multiplyScalar(this.maxSpeed);
    const force: Vec2 = desiredVelocity.subtract(this.velocity);
    this._steeredForce.add(force);
}

flee(target: Vec2): void {
    const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
    desiredVelocity.multiplyScalar(this.maxSpeed);
    const force: Vec2 = desiredVelocity.subtract(this.velocity);
    this._steeredForce.subtract(force);
}
```


**到达 `arrive`**

与寻找的期望速度类似，方向是一样的，区别是快到的时候速度会减少。  

![](/img/in-post/202105/25-05.gif)    

可以加一个距离控制，在还没达到这个距离时，先以最快的速度过去，比较近的时候减缓速度。  

```ts
arrive(target: Vec2): void {
    const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
    const dist: number = Vec2.distance(this._position, target)
    if (dist > this.arrivalThreshold) {
        desiredVelocity.multiplyScalar(this.maxSpeed);
    } else {
        desiredVelocity.multiplyScalar(this.maxSpeed * dist / this.arrivalThreshold);
    }
    const force: Vec2 = desiredVelocity.subtract(this.velocity);
    this._steeredForce.add(force);
}
```


**追逐 `purse` 与 躲避 `evade`**

追逐与躲避会预测目标将会移动到的位置，最后再调用寻找和避开。  

![](/img/in-post/202105/25-06.gif)   

其中，追逐时，如果刚好在正前方，就不用预测目标移动的位置，直接飞过去就好。  

```ts
pursue(target: Vehicle): void {
    const toTarget = Vec2.subtract(temp_v2, target.position, this._position)
    if (toTarget.dot(this.heading) > 0 && this.heading.dot(target.heading) < -0.95) {
        // 如果面对面，正好在前面，就直接飞过去
        this.seek(target.position)
    } else {
        const lookAheadTime: number = Vec2.distance(this._position, target.position) / (this.maxSpeed + target.velocity.length());
        const predictedTarget: Vec2 = Vec2.add(temp2_v2, target.position, Vec2.multiplyScalar(temp_v2, target.velocity, lookAheadTime));
        this.seek(predictedTarget)
    }
}

evade(target: Vehicle): void {
    const lookAheadTime: number = Vec2.distance(this._position, target.position) / (this.maxSpeed + target.velocity.length())
    const predictedTarget: Vec2 = Vec2.add(temp2_v2, target.position, Vec2.multiplyScalar(temp_v2, target.velocity, lookAheadTime));
    this.flee(predictedTarget)
}    
```

**追逐偏移 `pursueOffset`**

追逐偏移使得角色之间保持指定位置的偏移。  

![](/img/in-post/202105/25-07.gif)   

先初始算出偏移位置，再算偏移预期位置，最后调用到达。   

```ts
pursueOffset(target: Vehicle, offset: Vec2): void {
    const localOffset = temp_v2.set(
        target.side.x * offset.x + target.side.y * offset.y,
        target.heading.x * offset.x + target.heading.y * offset.y
    )
    const offsetTargetPos = Vec2.add(temp_v2, target.position, localOffset)
    const lookAheadTime: number = Vec2.distance(this._position, offsetTargetPos) / (this.maxSpeed + target.velocity.length())
    const predictedTarget: Vec2 =
        Vec2.add(
            temp2_v2,
            offsetTargetPos,
            Vec2.multiplyScalar(temp2_v2, target.velocity, lookAheadTime),
        );
    this.arrive(predictedTarget)
}
```

**群落 `flock`**

群落行为是由分离、凝聚和队列组成。  
- 分离(separation)：每个角色都试着和相邻角色保持一定的距离。 
- 凝聚(cohesion)：每个角色尽量不掉队，不落下太远。 
- 队列(alignment)：每个角色尽可能与相邻角色行动于同一方向。 

![](/img/in-post/202105/25-08.jpg)   

近了就离开，在一定范围内就靠近，速度取平均值。  

```ts
flock(vehicles: Vehicle[]): void {
    let averageVelocity: Vec2 = temp3_v2.set(this.velocity)
    let averagePosition: Vec2 = temp4_v2.set(0, 0)
    let inSightCount = 0;
    for (let i = 0; i < vehicles.length; i++) {
        let vehicle: Vehicle = vehicles[i] as Vehicle;
        if (vehicle != this && this.inSight(vehicle)) {
            averageVelocity = averageVelocity.add(vehicle.velocity);
            averagePosition = averagePosition.add(vehicle.position);
            if (Vec2.squaredDistance(this.position, vehicle.position) < this.tooCloseDist * this.tooCloseDist) this.flee(vehicle.position);
            inSightCount++;
        }
    }
    if (inSightCount > 0) {
        averageVelocity.multiplyScalar(1 / inSightCount);
        averagePosition.multiplyScalar(1 / inSightCount);
        this.seek(averagePosition);
        const force = averageVelocity;
        this._steeredForce.subtract(force);
    }
}
```


# 小结

转向行为的实现可分解为模拟各个行为的力，再计算合力，接着算加速度和速度，最后更新位置！  

以上为白玉无冰使用 `Cocos Creator 3.1.0` 实现 `"转向行为!"` 的技术分享。     

Cocos Store 链接: [http://store.cocos.com/app/detail/2893](http://store.cocos.com/app/detail/2893)   


## 参考资料

[https://www.red3d.com/cwr/steer/](https://www.red3d.com/cwr/steer/)    
《Flash ActionScript 3.0 动画高级教程》    
《游戏人工智能编程案例精粹》    


> keep hungry! keep foolish! 

# 更多


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

<!-- [原文链接](https://mp.weixin.qq.com/s/NCn8Ygk_I_nRnhmbHQeZwQ)     -->
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   