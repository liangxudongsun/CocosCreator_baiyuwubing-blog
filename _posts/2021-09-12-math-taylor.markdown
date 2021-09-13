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

先做一个假设，有这么一个点`a` 使得 $f(x) = c_0 + c_1   (x-a) + c_2   (x-a)^2 + c_3   (x-a)^3 + c_4   (x-a)^4 + ... + c_n (x-a)^n$   ``(1)``

首先，把`a`点代入 ``(1)``式子中得到，$f(a) = c_0$ 

接着对 ``(1)``式子两边⚽️求一次导数，并代入`a`这个数值得到， $f'(a)=c_1 + 2c_2(a -a)+3c_3(a-a)^2+4c_4(a-a)^3 + ...+ nc_n(x-a)^{n-1}=c_1$

接着对 ``(1)``式子两边⚽️求两次导数，并代入`a`这个数值得到， $f''(a)= 2\times c_2+2\times3\times c_3(a-a)+3\times4\times c_4(a-a)^2 + ...+ n\times{(n-1)}\times c_n(a-a)^{n-2}=2\times c_2  $

接着对 ``(1)``式子两边⚽️求三次导数，并代入`a`这个数值得到， $f^{(3)}(a)=2\times3\times c_3+2\times3\times 4\times c_4(a-a) + ...+ n\times{(n-1)}\times {(n-2)}\times c_n(a-a)^{n-3} = 2 \times 3\times c_3 $

接着对 ``(1)``式子两边⚽️求四次导数，并代入`a`这个数值得到， $f^{(4)}(a)= 2 \times 3 \times 4\times c_4  + ... + n \times {(n-1)}\times {(n-2)}\times{(n-3)}\times c_n(a-a)^{n-4} = 2 \times 3 \times 4\times c_4 $

...... 

接着对 ``(1)``式子两边⚽️求`n`次导数，并代入`a`这个数值得到， $f^{(n)}(a)= 2 \times 3 \times 4 \times ... \times n \times  c_n $

通过以上多次求导，把$c_0 c_1 c_2 c_3 ... c_n$的解带入``(1)``式子中，得到$f(x) = f(a) + 
f^{(1)}(a)(x-a) + 
\frac{f^{(2)}(a)}{2}(x-a)^2 +
\frac{f^{(3)}(a)}{2\times3}(x-a)^3 +
\frac{f^{(3)}(a)}{2\times3\times4}(x-a)^4 + 
... + 
\frac{f^{(n)}(a)}{2\times3\times4\times...\times n}(x-a)^n
 = \displaystyle\sum_{i=0}^n \frac{f^{(i)}(a)}{i!}(x-a)^i$


把上面的想法💡综合一下就是 **泰勒近似定理**
> **泰勒近似定理：** 若$f(x)$在 $x=a$ 光滑，则在所有次数为$N$或更低的多项式中，当 $x$ 在 $a$ 附近时，最近似于 $f(x)$ 的是 $P_N(x)=\displaystyle\sum_{n=0}^N \frac{f^{(n)}(a)}{n!}(x-a)^n$

经过一系列计算，我们得到了一个近似值，$f(x)\approx P_{N} (x)=\displaystyle\sum_{n=0}^N \frac{f^{(n)}(a)}{n!}(x-a)^n $

那我们再给其补一个值，把近似值换成等于号！  

假设$f(x)=P_N(x) + c_N \times (x - a)^{(N+1)} $，现在我们去求$c_N$ 。

我们先构造一个关于$t$的函数，$g(t) = f(t) - P_N(t) -  c_N \times (t - a)^{(N+1)} ``(2-1)式`` $

- 把 $x$ 代入 $g(t)$ 可以得到 $g(x)=f(x)- P_N(x) -  c_N \times (x - a)^{(N+1)}=0 $

- 把 $a$ 代入 $g(t)$ 可以得到 $g(a)=f(a)- P_N(a) -  c_N \times (a - a)^{(N+1)}=0 $

根据中值定理，如果连续函数在区间内有零点，那么肯定可以在该区间找到一个值$c_0$，其导数为 $0$。

也就是说 存在一个$c_0$使得 $g'(c_0)=0$ 。

我们再构造一个函数 $g_1(t)= g'(t) = f'(t) - P_N'(t) -  c_N \times (N+1)\times (t - a)^{(N)}$

对于$g_1(t)$函数：
- $g_1(c_0)=g'(c_0)=0$
- $g_1(a)=f'(a) - P_N'(a) -  c_N \times (N+1)\times (a - a)^{(N)}=0$

根据中值定理，存在一个$c_1$使得 $g_1'(c_1)=0$ 。

我们再构造一个函数 $g_2(t)= g_1'(t) = f^{(2)}(t) - P_N^{(2)}(t) -  c_N \times (N)\times (N+1)\times (t - a)^{(N-1)}$

对于$g_2(t)$函数：
- $g_2(c_1)=g'(c_1)=0$
- $g_2(a)= f^{(2)}(a) - P_N^{(2)}(a) -  c_N \times (N)\times (N+1)\times (a - a)^{(N-1)}=0$

根据中值定理，存在一个$c_2$使得 $g_2'(c_2)=0$ 。

....

再构造n次函数 $g_n(t) = g_{n-1}'(t) = f^{(n)}(t) - P_N^{(n)}(t) -  c_N \times (N+1)!\times (t - a)$
对于$g_n(t)$函数：
- $g_2(c_{n-1})= g_{n-1}'(c_{n-1})=0$
- $g_2(a)= f^{(n)}(a) - P_N^{(a)}(t) -  c_N \times (N+1)!\times (a - a)=0$

根据中值定理，存在一个$c_n$使得 $g_n'(c_n)=0$ 。

也就是 $g_n'(c_n) = f^{(n+1)}(c_n) - P_N^{(n+1)}(c_n) -  c_N \times (N+1)! = 0$ ``(3)式``

注意到 $P_N^{(n+1)}(c_n)=0$，($P_N(x)$的最高次数为N,所有求(N+1)次导数，必然为0)，所以``(3)式``可求得$c_N = \frac{f^{(n+1)}(c_n)}{(N+1)!}$

把上面的推导综合起来就是泰勒定理。

> **泰勒定理：** 关于$x=a$的N阶余项 $R_N(x)=\frac{f^{(N+1)}(c)}{(N+1)!}(x-a)^{N+1}$，其中c是介于x与a的一个数。于是可以写成$f(x)=P_N(x)+R_N(x)=\displaystyle\sum_{n=0}^N \frac{f^{(n)}(a)}{n!}(x-a)^n+\frac{f^{(N+1)}(c)}{(N+1)!}(x-a)^{N+1}$


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