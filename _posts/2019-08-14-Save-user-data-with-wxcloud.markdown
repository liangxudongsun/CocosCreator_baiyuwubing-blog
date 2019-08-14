---
layout: post
title:  "用微信云开发存取用户的数据"
date:   2019-08-14 19:08:00 +0800
categories: wxcloud
tags:
    - wxcloud
---


  写游戏的时候经常会要保存一些游戏内的数据，比如游戏等级,金币数量等。作为游戏前端，刚开始是把这些数据写在本地缓存。怕用户主动修改这些数据，会再做一层简单的加密处理。但是，这有个弊端，当用户换设备或清理缓存的时候，这些游戏内的用户数据就不存在了。  
    
  后来接触了*FBInstant*(facebook小游戏)里提供了存储读取用户数据的接口，可以将用户数据保存在服务器上。相对微信小游戏未提供用户数据存储接口，对游戏前端开发不是很友好，自己搭建服务器也要新的成本。还好，最近微信提供了云开发，看到里面有数据库,云函数,存储等功能，可以用来实现用户数据存储。

---

# 1. 使用 FBInstant 存储用户数据
## 1.1 获取数据
  直接调用`FBInstant.player.getDataAsync(keys)`从指定的云存储中检索当前用户的数据。
```js
let userData = {coin:0, level:0};
const keys = ['coin','level'];
FBInstant.player.getDataAsync(keys)
    .then((data) => {
        console.log('FBInstant.player.getDataAsync success', data);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this.userData[key] = data[key];
            }
        }
    }, (err) => {
        console.log('FBInstant.player.getDataAsync err', err);
    });
```
## 1.2 上传数据
  使用`setDataAsync()`设置要保存到指定云存储的当前用户的数据,`flushDataAsync()`立即将用户数据的任何更改刷新到指定的云存储中。
```js
let userData = {coin:100,level:1};
FBInstant.player
    .setDataAsync(userData)
    .then(FBInstant.player.flushDataAsync, (err) => {
        console.log('FBInstant.player.setDataAsync err', err)
    })
    .then(() => {
        console.log('Data persisted to FB!');
    }, (err) => {
        console.log('FBInstant.player.flushDataAsync err', err)
    });
```

# 2. 使用用微信云开发存取用户数据
首先参考[微信云开发文档](https://developers.weixin.qq.com/minigame/dev/wxcloud/basis/getting-started.html){:target="_blank"}创建数据库集合`users`，创建云函数`user`。

## 2.1 云函数
通过`cloud.getWXContext()`获取用户唯一标识`OPENID`作为数据库集合`users`的唯一id值，用于查改该用户的数据。  
```js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const collection = db.collection('users');
const { OPENID, APPID, UNIONID } = cloud.getWXContext();
const _openid = OPENID;
```

修改/增加用户数据:通过获取的`_openid`在集合内添加数据，注意插入的数据不能含有`_id`字段。
```js
const addUser = async (_openid, userInfo) => {
  delete userInfo._id;
  await collection.doc(_openid).set({ data: userInfo });
  return userInfo;
}
```
获取用户数据:先在数据库里查询有没有该用户数据，没有数据要先创建数据。
```js
const getUser = async (_openid) => {
  let user;
  const hasUser = await collection.where({ _id: _openid }).get();
  if (Array.isArray(hasUser.data) && hasUser.data.length === 0) {
    user = addUser(_openid, { _id: _openid });
  } else {
    const user_t = await collection.doc(_openid).get();
    user = user_t.data;
  }
  return user;
}
```
云函数的完整代码如下:
```js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const collection = db.collection('users');

const addUser = async (_openid, userInfo) => {
  delete userInfo._id;
  await collection.doc(_openid).set({ data: userInfo });
  return userInfo;
}

const getUser = async (_openid) => {
  let user;
  const hasUser = await collection.where({ _id: _openid }).get();
  if (Array.isArray(hasUser.data) && hasUser.data.length === 0) {
    user = addUser(_openid, { _id: _openid });
  } else {
    const user_t = await collection.doc(_openid).get();
    user = user_t.data;
  }
  return user;
}

exports.main = async (event, context) => {
  const { func, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  let res;
  if (func === 'addUser') {
    res = await addUser(OPENID, data);
  } else if (func === 'getUser') {
    res = await getUser(OPENID);
  } else if (func === 'getOpenId') {
    res = OPENID;
  }
  return res;
}
```

## 2.2 客户端调用
先初始化云环境
```js
wx.cloud.init({env: 'your-env'})
```
获取用户数据的实现
```js
let userData = {coin:0,level:0};
wx.cloud.callFunction({
    // 云函数名称
    name: 'user',
    // 传给云函数的参数
    data: {
        func: 'getUser',
        data: {},
    },
}).then((res) => {
    console.log('getDataAsync success', res);
    const result = res.result || {};
    for (const key in result || {}) {
        if (result.hasOwnProperty(key)) {
            this.userData[key] = result[key];
        }
    }
}, (err) => {
    console.log('getDataAsync err', err);
})
```
上传用户数据的实现
```js
let userData = {coin:100,level:10};
wx.cloud.callFunction({
    // 云函数名称
    name: 'user',
    // 传给云函数的参数
    data: {
        func: 'addUser',
        data: userData,
    },
    }).then(res => {
        console.log('flushDataAsync success', res)
        console.log(res.result)
    }, (err) => {
        console.log('flushDataAsync err', err)
    })
```


---
以上是用微信云存取用户数据的一种实现方式。自己主要是写游戏前端的逻辑，不足之处，欢迎指出。