---
layout: post
title:  "关于泰勒公式展开"
date:   2021-09-12 22:22:22 +0800
categories: math
tags:
    - math
---

> Taylor's Formula！

最近看书，看到泰勒公式展开，对它没有太大的印象，于是写一篇文章，整理一下个人对泰勒公式的理解吧！

先思考🤔一下，泰勒公式展开做的是什么？  

对于某个函数(如$f(x)=e^x$)，是否可以用该函数的一个点，以及该函数的导数去表示。  

![e^x 与一些函数](/img/in-post/202109/12-01.png)      

先做一个假设，有这么一个点`a` 使得 $f(x) = c_0 + c_1   (x-a) + c_2   (x-a)^2 + c_3   (x-a)^3 + c_4   (x-a)^4 + ... + c_n (x-a)^n$   ``(1-1)``

首先，把`a`点代入 ``(1-1)``式子中得到，$f(a) = c_0$ 

接着对 ``(1-1)``式子两边⚽️求一次导数，并代入`a`这个数值得到， $f'(a)=c_1 + 2c_2(a -a)+3c_3(a-a)^2+4c_4(a-a)^3 + ...+ nc_n(x-a)^{n-1}=c_1$

接着对 ``(1-1)``式子两边⚽️求两次导数，并代入`a`这个数值得到， $f''(a)= 2\times c_2+2\times3\times c_3(a-a)+3\times4\times c_4(a-a)^2 + ...+ n\times{(n-1)}\times c_n(a-a)^{n-2}=2\times c_2  $

接着对 ``(1-1)``式子两边⚽️求三次导数，并代入`a`这个数值得到， $f^{(3)}(a)=2\times3\times c_3+2\times3\times 4\times c_4(a-a) + ...+ n\times{(n-1)}\times {(n-2)}\times c_n(a-a)^{n-3} = 2 \times 3\times c_3 $

接着对 ``(1-1)``式子两边⚽️求四次导数，并代入`a`这个数值得到， $f^{(4)}(a)= 2 \times 3 \times 4\times c_4  + ... + n \times {(n-1)}\times {(n-2)}\times{(n-3)}\times c_n(a-a)^{n-4} = 2 \times 3 \times 4\times c_4 $

...... 

接着对 ``(1-1)``式子两边⚽️求`n`次导数，并代入`a`这个数值得到， $f^{(n)}(a)= 2 \times 3 \times 4 \times ... \times n \times  c_n $

通过以上多次求导，把$c_0 c_1 c_2 c_3 ... c_n$的解带入``(1-1)``式子中，得到$f(x) = f(a) + 
f^{(1)}(a)(x-a) + 
\frac{f^{(2)}(a)}{2}(x-a)^2 +
\frac{f^{(3)}(a)}{2\times3}(x-a)^3 +
\frac{f^{(3)}(a)}{2\times3\times4}(x-a)^4 + 
... + 
\frac{f^{(n)}(a)}{2\times3\times4\times...\times n}(x-a)^n
 = \displaystyle\sum_{i=0}^n \frac{f^{(i)}(a)}{i!}(x-a)^i$


把上面的想法💡综合一下就是 **泰勒近似定理**
> **泰勒近似定理：** 若$f(x)$在 $x=a$ 光滑，则在所有次数为$N$或更低的多项式中，当 $x$ 在 $a$ 附近时，最近似于 $f(x)$ 的是 $P\substack{N} (x)=\displaystyle\sum_{n=0}^N \frac{f^{(n)}(a)}{n!}(x-a)^n$



以上为白玉无冰关于 `"泰勒公式展开"` 的理解分享，如有错误欢迎指出，有任何想法，欢迎讨论！   

--- 
[写一个位图字体制作工具](https://mp.weixin.qq.com/s/OaoeKVmDDdHddPdUmdIpsg)    
[Canvas.toDataURL 用不了咋办？](https://mp.weixin.qq.com/s/tQPIOrweQZrTIM74fM6HUA)    
[Fake3D && Shader](https://mp.weixin.qq.com/s/11ZEPKFLo8uE4DtPB4aOBQ)    
[MatCap && Shader](https://mp.weixin.qq.com/s/_BkQVpEiQaqQ8VojnA0l2w)   
[如何抄 Shader](https://mp.weixin.qq.com/s/X8X1pQh3-juDaKi3LWGWIA)   
[3D折纸](https://mp.weixin.qq.com/s/iiD9IVNi0p3jdZYVCx_KBw)   

---

> 更多精彩欢迎关注微信公众号

![](/img/qrcode.jpg)  

---  

<!-- [原文链接](https://mp.weixin.qq.com/s/OaoeKVmDDdHddPdUmdIpsg)     -->
[原创文章导航](https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ)   