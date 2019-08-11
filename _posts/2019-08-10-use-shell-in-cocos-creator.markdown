---
layout: post
title:  "Use shell in cocos creator"
date:   2019-08-11 17:00:00 +0800
categories: cocos
tags:
    - cocos
    - creator
    - shell
    - gulp
---
 
> Use the Power of Command Shells
 

# 生产环境
``` shell
$ sw_vers
ProductName:	Mac OS X
ProductVersion:	10.14.4
BuildVersion:	18E227

$ node -v
v10.14.1

$ npm -v
6.4.1
```
```
cocos creator v2.0.8
```

# 使用命令行发布
## 基本用法
[官方文档](https://docs.cocos.com/creator/manual/zh/publish/publish-in-command-line.html){:target="_blank"}有介绍用法，其中build后面的默认参数在 ${projectPath}/settings/builder.json 配置
```
/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path projectPath
--build "platform=android;debug=true"
```
我们建立一个项目，创建shell脚本 ${projectPath}/tools/build/build.sh
```shell
#!/bin/bash
#author:lamyoung
# build.sh
/Applications/CocosCreator_2.app/Contents/MacOS/CocosCreator --path './../../' --build "platform=web-mobile;"
```
在终端修改*build.sh*为可执行文件
```shell
$ cd ${projectPath}/tools/build/
$ chmod +x ./build.sh
```
在终端执行*build.sh*,可以看到正在发布web版
```
$ ./build.sh
```

## 传参数构建
要使用同一个shell脚本构建发布不同平台，需要添加传参数控制，我们可以使用*getopts*
```none
#!/bin/bash
#author:lamyoung
#build.sh

your_target='web' #默认web平台
your_debug=0 #默认debug关闭

while getopts "t:d" arg
  do
    case $arg in
      t)
        your_target=$OPTARG
        ;;
      d)
        your_debug=1
        ;;
    esac
done

if [ !$your_debug ]
then
  your_debug='debug=false'  
else  
  your_debug='debug=true'
fi

echo "target:$your_target"  
echo "$your_debug"  

case $your_target in  
	web)  
		echo 'your target is web'
		/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path './../../' --build "platform=web-mobile;${your_debug};"
		;;  
	fb)  
		echo 'your target is fb'
		/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path './../../' --build "platform=fb-instant-games;${your_debug};md5Cache=false"
		;;  
	*)   
		echo '-t must be in [web/fb]'
		;;  
esac  
```

在终端调用 可以打包web-debug版
```shell
$ ./build.sh -t web -d
```

# 按步骤构建-gulp
我们使用nodejs环境下的gulp接着构建我们打包好的项目，包括图片压缩，混淆等。  
在*${projectPath}/tools/build/*目录下初始化nodejs环境，安装gulp。
```shell
$ cd ${projectPath}/tools/build/
$ npm init
$ npm i gulp --save-dev
```
以*web目标*按步骤构建为例,创建*build_web_gulpfile.js*
在*build.sh*里加上对按步骤构建的调用
```
# build.sh
## ...省略代码

echo 'your target is web'
/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path './../../' --build "platform=web-mobile;${your_debug};"
gulp  -f build_web_gulpfile.js #加上这一句

## ...省略代码
```
## 备份
先把之前打包的好的文件先备份，用到了nodejs的*del*库。
```shell
$ cd ${projectPath}/tools/build/
$ npm i del --save-dev
```
```js
//build_web_gulpfile.js
const path = require('path');
const folderP = path.resolve(__dirname, '../../');
const del = require('del');
const gulp = require('gulp'); //https://gulpjs.com/
// 清理备份
gulp.task('clean_backup', function (cb) {
    del.sync([`${folderP}/build/web-mobile_backup/`], { force: true });
    cb()
});

// 备份
gulp.task('backup', function (cb) {
    gulp.src([`${folderP}/build/web-mobile/**`])
        .pipe(gulp.dest(`${folderP}/build/web-mobile_backup/`))
        .on("end", cb);
});
```

## 读取不同目标的配置
打包发布会有不同的目标（如web,facebook），针对不同的目标加一个*${projectPath}/tools/build/buildConfig.json*文件作为打包参数的配置.
```
{
    "web": {
        "texture": {
            "assets/Texture/common": {
                "speed": 4,
                "quality": [
                    0.2,
                    0.3
                ]
            }
        },
        "javascript-obfuscator-options": {
            "compact": true,
            "controlFlowFlattening": true,
            "controlFlowFlatteningThreshold": 0.3,
            "deadCodeInjection": true,
            "deadCodeInjectionThreshold": 0.05,
            "identifierNamesGenerator": "hexadecimal",
            "rotateStringArray": true,
            "selfDefending": true,
            "stringArray": true,
            "stringArrayEncoding": "rc4",
            "stringArrayThreshold": 0.5,
            "seed": 7777,
            "debugProtection": true,
            "debugProtectionInterval": true,
            "disableConsoleOutput": true,
            "log": false
        }
    },
    "fb": {
        "texture": {
            "assets/Texture/common": {
                "speed":7,
                "quality": [
                    0.2,
                    0.3
                ]
            }
        },
        "javascript-obfuscator-options": {
            "compact": true,
            "controlFlowFlattening": true,
            "controlFlowFlatteningThreshold": 0.2,
            "deadCodeInjection": true,
            "deadCodeInjectionThreshold": 0.05,
            "identifierNamesGenerator": "hexadecimal",
            "rotateStringArray": true,
            "selfDefending": true,
            "stringArray": true,
            "stringArrayEncoding": "rc4",
            "stringArrayThreshold": 0.3,
            "seed": 66666,
            "debugProtection": true,
            "debugProtectionInterval": true,
            "disableConsoleOutput": true,
            "log": false
        }
    }
}
```
添加读取配置的gulp任务
```js
const fs = require("fs");
let build_config = {};
//读取配置
gulp.task('read_build_config', (cb) => {
    const data_build_config = fs.readFileSync(path.join('./', 'buildConfig.json'));
    build_config = JSON.parse(data_build_config.toString()).web;
    console.log('build_config', build_config);
    cb();
})
```

## 混淆js代码
用到*gulp-javascript-obfuscator*,[参数参考](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options){:target="_blank"}
```shell
$ npm i gulp-javascript-obfuscator --save-dev
```
*build_config*是上面读取的配置
```js
//build_web_gulpfile.js
const javascriptObfuscator = require("gulp-javascript-obfuscator");
// 混淆
gulp.task("javascriptObfuscator", function (cb) {
    gulp.src([`${folderP}/build/web-mobile/src/*.js`])
        .pipe(javascriptObfuscator(build_config["javascript-obfuscator-options"] || {}))
        .pipe(gulp.dest(`${folderP}/build/web-mobile/src/`))
        .on("end", cb);
});
```

## 压缩图片
由于用引擎打包发布后文件名字是按照uuid映射命名，路径不好找，特别是使用到了[自动图集](https://docs.cocos.com/creator/manual/zh/asset-workflow/auto-atlas.htmls){:target="_blank"}功能。在论坛上找到了一个[插件](https://forum.cocos.com/t/topic/76554){:target="_blank"}，支持构建后输出图片路径，方便我们针对不同的图片压缩不同的参数。只需要把这个插件放在 *${projectPath}/packages* 下，具体可参考[官方文档](https://docs.cocos.com/creator/manual/zh/extension/){:target="_blank"}。成功打包发布后为生成 *${folderP}/$buildtexture.json*  
这次我们使用[gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin){:target="_blank"} 和  [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant){:target="_blank"}来压缩图片
```shell
$ cd ${projectPath}/tools/build/
$ npm i gulp-imagemin --save-dev
$ npm i imagemin-pngquant --save-dev
```
```js
//build_web_gulpfile.js
const imagemin = require('gulp-imagemin');  
const imageminPngquant = require('imagemin-pngquant');
//压缩图片
gulp.task('imagemin', (cb) => {
    // 同步读取
    const data_buildtexture = fs.readFileSync(path.join(folderP, '$buildtexture.json'));
    const _buildtexture_config = JSON.parse(data_buildtexture.toString());
    const _texture_config = build_config.texture || {};
    const pack_files = {};
    let total_count = 0;
    for (const key in _buildtexture_config) {
        if (_buildtexture_config.hasOwnProperty(key)) {
            const element = _buildtexture_config[key];
            if (_texture_config[element.name]) {
                const targetPath = `${folderP}/build/web-mobile/res/raw-assets/**/${key}*.png`;
                if (!pack_files[element.name]) {
                    pack_files[element.name] = [];
                    total_count++;
                }
                pack_files[element.name].push(targetPath);
            }
        }
    }
    let cur_count = 0;
    for (const key in pack_files) {
        if (pack_files.hasOwnProperty(key)) {
            const element = pack_files[key];
            console.log(`start.. ${key}`);
            const cfg = _texture_config[key];
            console.log(cfg);
            gulp.src(element)
                .pipe(imagemin([
                    imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo(),
                    imageminPngquant(cfg)
                ], { verbose: true }))
                .pipe(gulp.dest(`${folderP}/build/web-mobile/res/raw-assets/`))
                .on("end", () => {
                    console.log(`end.. ${key}`);
                    cur_count++;
                    console.log(`progress ${cur_count}/${total_count}`);
                    if (cur_count >= total_count) {
                        cb();
                    }
                });
        }
    }
})
```
## 将所有任务链接在一起
```js
gulp.task('default', gulp.series(gulp.parallel('read_build_config', 'clean_backup'), 'backup', gulp.parallel('imagemin', 'javascriptObfuscator')));
```

# 按版本保存
最后把构建完后的结果按照版本号保存
```
# build.sh
## ...省略代码

your_version=`date +%Y%m%d%H%M%S`
echo 'your target is web'
/Applications/CocosCreator_2.app/Contents/MacOS/CocosCreator --path './../../' --build "platform=web-mobile;${your_debug};"
gulp  -f build_web_gulpfile.js
cd './../../build'
zip -r "./web_${your_game_name}_${your_version}"  './web-mobile'
open ./

## ...省略代码
```
  

---
[项目源码地址](https://github.com/baiyuwubing/cocos_shell){:target="_blank"}