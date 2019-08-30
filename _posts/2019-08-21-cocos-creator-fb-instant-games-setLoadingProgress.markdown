---
layout: post
title:  "为何cocos creator发布的facebook小游戏的载入进度条从0%飞向100%"
date:   2019-08-21 19:00:00 +0800
header-img: "img/in-post/post-facebook-Instant-games.jpg"
categories: cocos-creator
tags:
    - cocos-creator
    - fb-instant-games
---

*用cocos creator 发布 fb-instant-games (facebook小游戏 )  后，发现平台预载入的进度条会从0等一段时间，然后直接飞到100。这个用户体验不是很好，而且可能影响过审，那么尝试解决这个问题。*  
![](/img/in-post/post-fb-loaded-0.png)  

## FBInstant 设置进度条的接口
``FBInstant.setLoadingProgress(percentagenumber)``报告游戏的初始加载进度。参数percentagenumber 介于 0 和 100 之间的数字。返回 void。  
示例
```js
FBInstant.setLoadingProgress(50); // Assets are 50% loaded
```
看了fb的sdk 在调用``FBInstant.startGameAsync``时，会执行``FBInstant.setLoadingProgress(100)``直接将进度条设置为100%。  
只有在``FBInstant.initializeAsync``成功后``setLoadingProgress``才会有效果。

## ccc默认设置进度条的过程
cocos creator 设置进度条默认使用 ``cc.loader.onProgress``， 这个是全局的 所有资源加载都会调用。返回的``completedCount``和``totalCount``都是1，导致进度设置不对。
```js
function setLoadingDisplay() {
    // Loading splash scene
    cc.loader.onProgress = function (completedCount, totalCount, item) {
        var progress = 100 * completedCount / totalCount;
        FBInstant.setLoadingProgress(progress);
    };
}
```
再看看fb小游载入的流程，绑定onProgress``setLoadingDisplay()``在经过了载入多个js文件、运行游戏后才会调用，那么前面的一堆等待时间会一直显示0%，这个时间可以优化。  
![](/img/in-post/ccc-fb-flow-chat-default.png)  

## 优化方案
可以在加载后``fbinstant.6.2.js``,调用``FBInstant.initializeAsync``,然后再每一步上述步骤插入进度``FBInstant.setLoadingProgress``，这样加载的过程就能看到。  
![](/img/in-post/ccc-fb-flow-chat-optmize.png)  
找到发布后的目录，修改``index.html``里的`body`,监听 `fbinstant.6.2.js`加载后初始化 `FBInstant.initializeAsync` ,接着设置进度 `FBInstant.setLoadingProgress(10);` ,然后加载 `settings.js` ,设置进度 `FBInstant.setLoadingProgress(20);`,最后加载 `main.js`。
```html
<body>
  <canvas id="GameCanvas" oncontextmenu="event.preventDefault()" tabindex="0"></canvas>
  <!-- 新增 -->
  <script type="text/javascript">
    //加载js
    var loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.charset = 'utf-8';
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };
    function setting_js_load() {
        //载入settings.js后的进度条
        FBInstant.setLoadingProgress(20);
        loadSingleScript("main.js", function () { });
    }
    function fb_js_load() {
      console.log('fb_js_load')
      FBInstant.initializeAsync()
        .then(function () {
            //设置初始化后的进度条
            FBInstant.setLoadingProgress(10);
            loadSingleScript("src/settings.js", setting_js_load);
        })
    }
  </script>
  <script src="https://connect.facebook.net/en_US/fbinstant.6.2.js" onload="fb_js_load()">
  </script>
  <!-- 新增 end-->

  <!-- 移除 -->
  <!-- <script src="https://connect.facebook.net/en_US/fbinstant.6.2.js"></script>
  <script src="src/settings.js" charset="utf-8"></script>
  <script src="main.js" charset="utf-8"></script> -->
  <!-- 移除 end-->
</body>
```
接着修改`main.js`,先把原先的初始化和绑定`onProgress`去掉。再找到相应的位置，设置进度条。  
```js
(function () {
    'use strict';
    //设置加载main.js后的进度条
    FBInstant.setLoadingProgress(30);

    function boot() {
        // 载入 cocos2d-js.js 后的进度条
        FBInstant.setLoadingProgress(40);
            //省略代码。。
        }
        //省略代码。。  
        
        //移除绑定
        // function setLoadingDisplay () {
        //     // Loading splash scene
        //     cc.loader.onProgress = function (completedCount, totalCount, item) {
        //         var progress = 100 * completedCount / totalCount;
        //         FBInstant.setLoadingProgress(progress);
        //     };
        // }

        var onStart = function () {
            //cc.game.run  后的进度条
            FBInstant.setLoadingProgress(50);
            //省略代码。。 
            if (cc.sys.isBrowser) {
                 //移除绑定
                // setLoadingDisplay();
            }
            //省略代码。。 
            cc.director.preloadScene(launchScene,
                function () {
                    //预加载场景 后的进度条
                    FBInstant.setLoadingProgress(60);
                    //省略代码。。 
                }
            );
        };
        //省略代码。。 
    }

    if (window.document) {
        //省略代码。。 
        var engineLoaded = function () {
            // 去掉原先的初始化
            // FBInstant.initializeAsync()
            //     .then(function () {
            document.body.removeChild(cocos2d);
            cocos2d.removeEventListener('load', engineLoaded, false);
            if (typeof VConsole !== 'undefined') {
                window.vConsole = new VConsole();
            }
            boot();
            // });
        };
        //省略代码。。 
    }
})();
```
可以将上面修改的`index.html`和`main.js`放在项目的构建模版目录，下次构建发布后就自动拷贝到发布目录，不用再次修改了。
![](/img/in-post/ccc-build-templates-fb-dir.jpg)  
## 修改后的效果
![](/img/in-post/post-fb-loaded-20.jpg)  