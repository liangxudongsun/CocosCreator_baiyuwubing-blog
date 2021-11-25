---
layout: post
title:  "C++ Lambda 表达式笔记 "
date:   2021-11-12 22:22:22 +0800
categories: cpp
tags:
    - cpp
---

> [ 捕获列表 ] ( 参数列表 ) mutable(可选) -> 返回类型 {// 函数体}


参考资料[https://zh.cppreference.com/w/cpp/language/lambda](https://zh.cppreference.com/w/cpp/language/lambda)     

直接看代码与结果吧。

# hello lambda

先来一个最简单的`hello lambda!`。   

```CPP
#include <iostream>
int main()
{
    auto lambdaHello = []{
        std::cout << "hello lambda!" << '\n';
    };
    lambdaHello();
}
```

![hello lambda!](/img/in-post/202111/12-01.png)      

> lambda的类型被定义为“闭包”（closure）的类，而每个lambda表达式则会产生一个闭包类型的临时对象（右值）

# 参数列表

传个参数。   

```cpp
#include <iostream>
int main()
{
    auto lambdaHello = [](const std::string &s) {
        std::cout << s << '\n';
    };
    lambdaHello("hello lambda!");
}
```


![传参](/img/in-post/202111/12-02.png)      


# 返回类型


让其返回一个值。   

```cpp
#include <iostream>
int main()
{
    auto lambdaReturn = []{
        return 666;
    };
    std::cout << lambdaReturn() << '\n';
}
```

![返回](/img/in-post/202111/12-03.png)      



指明返回类型。  

```cpp
#include <iostream>
int main()
{
    auto lambdaReturnType = [] ()-> int {
        return 66.6;
    };
    std::cout << lambdaReturnType() << '\n';
}
```

![返回类型](/img/in-post/202111/12-04.png)      



# 捕获列表



捕获列表：
- [var]表示值传递方式捕捉变量var。
- [=]表示值传递方式捕捉所有父作用域的变量（包括this）。
- [&var]表示引用传递捕捉变量var。
- [&]表示引用传递捕捉所有父作用域的变量（包括this）。
- [this]表示值传递方式捕捉当前的this指针。


> 采用值捕获的前提是变量可以拷贝。被捕获的变量的值是在lambda创建时拷贝，而不是调用时拷贝：

```cpp
#include <iostream>
int main()
{
    int value = 1;
    std::cout << "value address                 " << &value<< '\n';
    auto lambdaCaptures = [value] () {
        std::cout << "lambdaCaptures value address: " << &value << '\n';
        std::cout << "lambdaCaptures value:" << value << '\n';
    };
    std::cout << "lambdaCaptures address        " << &lambdaCaptures<< '\n';
    lambdaCaptures();
    std::cout << "value:" << value << '\n';
    std::cout << "set value: 666" << '\n';
    value = 666;
    lambdaCaptures();
    std::cout << "value:" << value << '\n';
}
```
![值捕获](/img/in-post/202111/12-05.png)      


> 在现行C++11标准中，捕捉列表仅能捕捉父作用域的自动变量，而对超出这个范围的变量，是不能被捕捉的。

![捕捉列表仅能捕捉父作用域](/img/in-post/202111/12-06.png)      


> 对于按值方式传递的捕捉列表，其传递的值在lambda函数定义的时候就已经决定了。而按引用传递的捕捉列表变量，其传递的值则等于lambda函数调用时的值。


```cpp
#include <iostream>
int main()
{
    int value = 1;
    auto lambdaCapturesByValue = [value] () {
        std::cout << "lambdaCapturesByValue value:" << value << '\n';
    };
    auto lambdaCapturesByRef = [&value] () {
        std::cout << "lambdaCapturesByRef value:" << value << '\n';
    };
    std::cout << "value:" << value << '\n';
    lambdaCapturesByValue();
    lambdaCapturesByRef();

    std::cout << "set value: 666" << '\n';
    value = 666;
    std::cout << "value:" << value << '\n';
    lambdaCapturesByValue();
    lambdaCapturesByRef();
}
```

![按值传递与按引用传递](/img/in-post/202111/12-07.png)      


> 捕获列表只用于局部非static变量，lambda可以直接使用局部static变量和在它所在函数之外声明的名字。

```cpp
#include <iostream>
static int static_value = 666;
int main()
{
    []() {
        std::cout << "static_value: " << static_value << '\n';
    }();
}
```

![直接使用static变量](/img/in-post/202111/12-08.png)      


# mutable

通常，值捕获是无法在函数内修改的。

![修改值捕获](/img/in-post/202111/12-09.png)      


> mutable：允许 函数体 修改复制捕获的对象，以及调用它们的非 const 成员函数

```cpp
#include <iostream>
int main()
{
    int value = 1;
    auto lambdaCaptures = [value] () mutable{
        value++;
        std::cout << "lambdaCaptures value:" << value << '\n';
    };
    lambdaCaptures();
    std::cout << "main value:" << value << '\n';
}
```

![使用mutable](/img/in-post/202111/12-10.png)      


# 仿函数

> 仿函数简单地说，就是重定义了成员函数operator()的一种自定义类型对象。  

> 仿函数是编译器实现lambda的一种方式。  

![lambda与仿函数](/img/in-post/202111/12-11.png)      




# 参考资料


《深入理解C++11：C++11新特性解析与应用》
《C++标准库（第2版）》
https://en.cppreference.com/
