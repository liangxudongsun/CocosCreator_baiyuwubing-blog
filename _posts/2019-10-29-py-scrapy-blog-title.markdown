---
layout: post
title:  "python爬虫入门实战！爬取博客文章标题和链接！"
date:   2019-10-29 22:22:22 +0800
categories: python
tags:
    - python
---
> 最近有小伙伴和我留言想学python爬虫，那么就搞起来吧。

# 准备阶段

爬虫有什么用呢？举个最简单的小例子，你需要《战狼2》的所有豆瓣影评。最先想的做法可能是打开浏览器，进入该网站，找到评论，一个一个复制到文本中，保存，翻页，接着复制，直到翻到最后一页。而爬虫只要写脚本，执行，泡杯咖啡，坐等他执行完。   

首先需要在电脑上装好 python3 和 pip 。此外还需要知道python的一些基本语法。这些内容网上搜索有许多教程(例如廖雪峰)，这边就不再细说了。    

我们这次需要使用的是 正则表达式 re 库和第三方的 requests 库，以下是安装方法。    

```sh
pip3 install requests
```

引入库。  

```python
import requests
import re
```
爬虫可以简单的分为获取数据，分析数据，存储数据三个步骤。  


# 下载数据

简单来说一个网页是由一个html文件解析构成，我们需要获取这个文本内容。  

每个浏览器都可以通过开发者工具获取到文本内容，以chrome为例，打开网页后，右键->检查。  
![](/img/in-post/2019-10-29-check.gif)

右边的 Elements 就是我们要下载的数据。  

让我们看看 requests 是如何获取这个数据的。  

```python
url='http://lamyoung.com/';
html=requests.get(url);
if html.status_code == 200:
    html_bytes=html.content;
    html_str=html_bytes.decode();
```
上面的 html_str 就是我们需要的源数据。获取数据我们需要一个网页地址，获取后判断状态码是否为200，最后再将内容decode就得到需要的整个html源数据。  



# 分析数据

这次我们用正则表达式去解析源数据，截取到我们需要。关于详细的正则知识可以在[这里](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)中学习。  

现在我们的目标是抓取博客的文章标题和链接，我们可以通过刚才的开发者工具获取文章标题和链接的特征。  
![](/img/in-post/2019-10-29-html.png)


可以看到我们要的内容都具有以下这种格式。
```html
<a href="链接">
        <h2 class="post-title">
            标题
        </h2>
        xxxxxx
    </a>
```
我们就为这种格式写出正则表达式。(ps: 我也写了几次才写对，看不懂的话我们私下交流交流)
```python
regex = r"<a href=\"(.*)\">[\s]*?<h2 class=\"post-title\">[\s]*(.*)[\s]*</h2>[\s\S]*?</a>"
```
使用正则表达式中的 findall 把所有内容找出来，并保存在字符串中。
```python
write_content = ''
all_items = re.findall(regex,html_str);
for item in all_items:
  write_content=f'{write_content}\n{item[1]}\nhttp://lamyoung.com{item[0]}\n'
```
但是，我们只爬了其中的一页。还有许多页没有爬呢！(ps: 骄傲脸，我已经写了好多✌️页的原创内容了。)

我们可以点几个下一页，很容易发现其中的规律。

- 第一页:http://lamyoung.com/

- 第二页:http://lamyoung.com/page2/

- 第三页:http://lamyoung.com/page3/

...

为此，我们加个循环判断就可以啦。
```python
index=1
while True:
  page_url = '';
  if index>1:
    page_url=f'page{index}/'
  url=f'http://lamyoung.com/{page_url}';
  html=requests.get(url);
  if html.status_code != 200:
    print(html);
    break;
```
在判断状态码不为200时，退出循环。



# 存储数据

这次我们就用文本存储来结束我们的教程吧。(ps:数据库存储我也还没学到，哈哈哈呃。。)
```python
with open('lamyoung_title_out.txt','w',encoding='utf-8') as f:
  f.write(write_content)
```
最后看下输出结果吧～
![](/img/in-post/2019-10-29-result.png)



# 小结


本文只是简单地带你入门写个python爬虫（其实也不简单哈，正则表达式还是要花时间学学）。其实爬虫还涉及多线程，数据库，还有其他解析库(可能可以替代正则表达式)。后续学到了第一时间分享(也许)给大家。

> "其实我还写过python处理excel表导出json，自动处理svn添加删除等脚本，欢迎一起学习👏"

---

[完整代码我放这里](https://github.com/baiyuwubing/python-exercise/blob/master/py3/scrapy/scrapy_lamyoung_title.py)  