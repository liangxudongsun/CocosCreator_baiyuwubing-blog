---
layout: post
title:  "用 python 实现蚂蚁庄园自动拍球！"
date:   2019-11-21 22:22:22 +0800
categories: python
tags:
    - python
---
> 解放双手，享受 python 带来的快感！    
> 之前写了一篇蚂蚁庄园星星球的实现，有小伙伴留言要自动拍球。好吧！作为懒人，这是个强烈的需求！那么就行动起来吧！  

![](/img/in-post/201911/1121-result.gif)  

# 配置环境     

### 硬件设备：

电脑(本文以mac系统为例) + 打开开发者选项USB调试的安卓手机(一般在设置>>查看本机>>点击版本号多次) + 可以传输数据的数据线。  

![](/img/in-post/201911/1121-usb.png)  

### 软件环境：

电脑上 从官网下载安装 Android Studio ，并在 SDK manager 里安装手机对应版本的 sdk 。  

![](/img/in-post/201911/1121-sdk.png)  

在电脑上添加环境变量。  

```
vim ~/.bash_profile
```

```
ANDROID_HOME=/Users/lamyoung/Library/Android/sdk
PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH:.
export PATH
```

开启了usb调试的安卓手机连接电脑，确保执行 adb devices 可以看到连接上的设备。  

![](/img/in-post/201911/1121-adb.png)  

接着就是安装 python3 中的 uiautomator2 库。  

```
pip3 install -U uiautomator2 --timeout 10000
```

安装包含httprpc服务的apk到手机。  

```
python3 -m uiautomator2 init
```

检查有没配置成功，进入 python3 解释器，输入以下代码，看到结果说明配置成功！  

![](/img/in-post/201911/1121-uiauto.png)  

# 执行代码     

工欲善其事必先利其器，以上配置好了就可以开始写 python3 代码啦。   

经多次测试，小球最终都会在左下角区域。所以我们只需要让它不停的在该区域点击就可以了。参考代码如下。   

```
import uiautomator2 as u2

d = u2.connect()
window_size = d.window_size()
window_w = window_size[0];
window_h = window_size[1];

count = 0
while count<10000:
  count = count+1
  d.click(window_w*0.62,window_h*0.89)
```

在手机点击支付宝，进入蚂蚁庄园星星球界面。执行代码就可以坐等它打球啦。打完结束后按 ctrl + z 退出脚本。  

![](/img/in-post/201911/1121-bg.png)  

# 小结     

整个工程主要在配置环境。uiautomator2 这个库主要是用于自动化测试，还有许多其他功能，本文只用到了模拟点击。

本来打算用 weditor 分析 xml 获取球节点，结果发现整个游戏是绑在ali的一个 webview 上，没能成功获取 。如果你有其他好方法欢迎留言分享。


---  

本文仅供个人学习交流使用，请勿用于其他用途！

--- 

![](/img/in-post/bottom.png)  

---  

[参考资料](https://mp.weixin.qq.com/s/9B0IooKX4MTE6hmYGQSOuQ)  