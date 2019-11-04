---
layout: post
title:  "python爬虫入门实战(三)！xpath 和 csv！"
date:   2019-11-01 22:22:22 +0800
categories: python
tags:
    - python
---
> 最近有小伙伴说正则表达式学不懂？那有什么替代方案呢？一起往下看吧！

![](/img/in-post/201911/2019-11-01-bg.png)

在前两篇文章我们已经学了一些基本技巧。但是之前都是用正则表达式来解析内容的，可能有小伙伴对正则表达式不理解，于是乎，我找到一个相对好用的库来帮助我们解析内容。  

# 配置环境

pyhton3  + requests 库 + lxml 库。在国内安装可能会卡住，可以参考以下指令，使用国内镜像。

```
pip3 install lxml -i http://pypi.douban.com/simple --trusted-host=pypi.douban.com
```
引入库。  

```python
import requests
from multiprocessing.dummy import Pool
import lxml.html
import csv
```
# xpath

首先我们可以清楚地看到，一个html文件是一种树状的结构。  

![](/img/in-post/201911/2019-11-01-tree.png)

有尖括号<>包起来的可以看成树的节点，成对出现的在内部的节点就是子节点。例如<head> 是 <html> 的子节点。  

在尖括号内的 a=xxx 中，a为属性，xxx为属性值。例如<div class="post-preview"> 的属性class的值为 post-preview 。  

成对的尖括号<>的文本叫做内容。例如 <title>白玉无冰 </title>  的内容为 白玉无冰 。   

xpath就是根据树的结构获取信息的。/html/head/title/text() 返回的是内容 `白玉无冰 | 明天进步一点点 | lamyoung` 。 /html/body/div/@class  返回的是属性class的值 "container" 。  

xpath还可以使用双斜杆 // 来查找所有的节点。 例如 //div[@class="post-preview"]  是查找所有属性class为post-preview的div节点。  

![](/img/in-post/201911/2019-11-01-div.png)  

对于我们要爬取的目标链接和题目名字的参考代码如下:(关于requests的用法和解析参考[python爬虫入门实战！爬取博客文章标题和链接！](http://lamyoung.com/python/2019/10/29/py-scrapy-blog-title/))  

```python
def scrapy(index):
  page_url = '';
  if index>1:
    page_url=f'page{index}/'
  url=f'http://lamyoung.com/{page_url}';
  print(url);
  html=requests.get(url);
  if html.status_code == 200:
    html_bytes=html.content;
    selector = lxml.html.fromstring(html_bytes);
    #获取所有的节点
    all_items=selector.xpath('//div[@class="post-preview"]')
    write_content=[];
    for item in all_items:
      #获取链接
      links = item.xpath('a/@href')
      #获取标题
      title=item.xpath('a/h2[@class="post-title"]/text()')
      #标题去掉多余的空格
      title_0=title[0].strip();
      write_content.append({'title': title_0, 'link': f'http://lamyoung.com{links[0]}'});
    return write_content
  else:
    return [];
```

接着使用多线程(详细解释参考[python爬虫入门实战(二)！多线程爬虫！](http://lamyoung.com/python/2019/10/31/py-scrapy-blog-title-mult/))  

```python
pool = Pool(3);
orign_num=[x for x in range(1,10)];
result = pool.map(scrapy,orign_num);
``` 


# csv

之前我们是用txt保存的，阅读起来非常不方便，这次我们用csv的格式保存，阅读时可以用excel打开，排版就好看多了。  

一起看下在python中怎么使用吧！  

```python
with open('lamyoung_title_multi_xpath_out.csv', 'w', newline='') as csvfile:
    fieldnames = ['title', 'link']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    #写入头
    writer.writeheader()
    for write_content in result:
      for _content in write_content:
         #写入内容
         writer.writerow(_content);
```

一起看看最后的结果吧。  

![](/img/in-post/201911/2019-11-01-csv.png)


# 小结

这次主要介绍了xpath的基本用法(有没有比正则简单一点？)和csv保存。如有错误，欢迎斧正！如果我又学到好东西，会第一时间分享给大家的！欢迎关注获取最新更新哦！  

---

我是白玉无冰，游戏开发小赤佬，也玩python和shell

---  

[参考资料](https://mp.weixin.qq.com/s/2W5j_YmV7-vUk2_RptukYg)  