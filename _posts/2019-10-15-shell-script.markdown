---
layout: post
title:  "终极 shell 脚本 快速入门指南"
date:   2019-10-15 22:22:22 +0800
categories: shell
tags:
    - shell
---
> shell 脚本开始怎么学？  

![](/img/in-post/2019-10-15-bg.jpg)

shell 脚本就是写在文件里的一系列指令集合。就像在 windows 系统里的 bat 文件 一样，你只需要将一系列的指令放在一个文件中，然后执行它。  

unix 类 系统 shell 种类繁多，本文主要介绍的是 bash script  

## hello world

### 为啥子要学这玩意儿

也许其他语言如(Python Ruby)也可以做到 shell 脚本也能做的事。那 shell 脚本有啥好的？  

shell 脚本主要用于自动化管理任务，特别是涉及到复杂的配置和要调用操作系统的大量功能时。甚至还可将操作指令组合起来变成一个新的指令。此外，还可以将shell和图形界面结合起来，充分发挥两者的优势。  

- 自动化日常任务
- 创建自己的操作指令
- 便携。可以在mac系统或者linux中执行

### 给我整个 hello world
说了这么多，先写个 hello world 吧。选一个你喜欢的文本编辑器，创建一个`my_script.sh`的文件，填入以下内容： 

```sh
#!/bin/bash
echo "Hello world" //打印到屏幕
```

第一行`#!/bin/bash`告诉系统这个脚本需要什么解释器来执行，即使用哪一种 shell。  

`echo` 类似于 print ,打印后面的内容。   

保存文件以后，还要做一件事。刚创建的文件可不是那么随便的，你叫它动它还动不了。要想它可执行，还得修改权限。在命令行执行：  

```
chmod +x  my_script.sh //添加可执行权限
```

接着让它跑起来  

```
./my_script.sh
```

输出结果  

```
Hello world  
```

现在你已经整出了 hello world 了。  

在深入介绍 shell 脚本之前，你应该对linux 命令有一定的了解，可参考 [Linux Shell 生存入门指南](http://lamyoung.com/shell/2019/09/18/linux-shell-survive/) 为下节内容铺垫基础。  


## 变量
为了处理数据，数据通常都存在电脑内存中。内存被分为几个小单元，每个单元都有一个唯一的编号，称为内存地址，用于保存数据。  

我们可以给内存地址起名字，这个名字称为变量。变量是存储位置的一个名字，变量可以有不同数值，但每个变量只能使用一个数值。  

在 Linux shell 脚本 可分为两种变量：  

- 系统变量，由 Linux 本身创建和维护，通常都是由大写字母组成。  
- 用户定义的变量，由我们自己定义和维护的，通常用小写字母定义。  

### 系统变量
可以在脚本中直接使用，用来显示相关的信息。以下是常见的几个系统变量：  

- `BASH` , shell 的路径
- `BASH_VERSION` , shell 的版本号
- `HOME` , home的路径
- `OSTYPE` , 系统类型

![](/img/in-post/2019-10-15-v-system.png)

不同的环境下，名字可能不一样，可以使用`set`指令查看所有的变量  

![](/img/in-post/2019-10-15-cmd-set.png)


### 用户定义的变量
可以保存任何类型的数据，命名要遵守以下规则:  

- 只能以英文字母，下划线`_`，数字组成，首字符不能是数字。
- 不能使用bash里的关键字  

定义变量用`=`连接  

```sh
# 定义一个变量
name="baiyuwubing"
```

访问一个变量用$符号   

```sh
# 访问变量
$name
```

在字符串中使用上面那个变量:  

```sh
# 打印一个变量
echo "My name is $name"
```

输出结果:  

```
My name is abc
```

只读变量，可以使用readonly关键字  

```sh
#!/bin/bash
name="baiyuwubing"
readonly name
```

删除变量，使用unset可以删除变量。变量被删除后不能再次使用。unset不能删除只读变量。  

```sh
unset name
```


## 引号

### 双引号 `"`

除了`\`和`$`，在双引号内的任何内容都会变成字符串。成对出现表示拼接字符串。  

```sh
#用双引号定义字符串的语法
str="baiyuwubing"
echo $str 
#baiyuwubing

#用 \ 转义符号
str="baiyuwubing say \"hi\""
echo $str 
#baiyuwubing say "hi"

#在字符串中使用变量
user="baiyuwubing"
str="$user say \"hi\""
echo $str 
#baiyuwubing say "hi"

#成对出现表示拼接
str="bai"yu"wubing"
echo $str 
#baiyuwubing

user="baiyuwubing"
str="hey "$user" say \"hi\""
echo $str 
#hey baiyuwubing say "hi"
```

### 单引号 `'`

单引号里的任何字符都会原样输出。但是单引号字串中不能出现单独一个的单引号(对单引号使用转义符\后也不行)，成对出现表示拼接字符串。   

```sh
# 用单引号定义字符串
str='baiyuwubing say hi'
echo $str 
#baiyuwubing say hi

# 试着用转义符号 \
str='baiyuwubing say \"hi\"'
echo $str 
#baiyuwubing say \"hi\"

# 试着用$
user="baiyuwubing"
str='$user say \"hi\"'
echo $str 
#$user say \"hi\"

# 成对出现表示拼接
str='bai'yu'wubing'
echo $str 
#baiyuwubing

user="baiyuwubing"
str='hey '$user' say \"hi\"'
echo $str 
#hey baiyuwubing say \"hi\"
```

### 反引号 `` ` ``

在反引号内的字符串会被当成命令执行   

```sh
# 用反引号定义字符串
str=`date`
echo $str 
#2019年10月13日 周日 23时46分11秒 CST
```


## 条件

### 条件语句 `if/else`

和许多语言一样， shell 脚本条件语句使用if。其中的条件通常是用[]包裹起来，也可以使用test命令。  

我们一起看下最基本的用法:  

```sh
age=22
if [ $age -gt 18 ]
then
    echo "成年"
fi
```

输出:  

```sh
成年
```

可以注意到fi是if的反转。接着我们一起看下使用if else的语法格式:  

```sh
age=16
if [ $age -gt 18 ]
then
    echo "成年"
else
    echo "未成年"
fi
```

输出:  

```
未成年
```

else-if 在 shell 中使用 `elif`，接着我们一起看下使用if else-if else的语法格式:  

```sh
age=16
if [ $age -gt 18 ]
then
   echo "成年"
elif [ $age -gt 12 ]
then
   echo "青年"
else
   echo "幼年"
fi
```

输出:  

```
青年
```

在 shell 脚本 中可以使用多种不同的方式来使用条件语句。下表详细说明了一些比较常见的用法：  

```
字符串运算
+------------------+-----------------------------------------------+
|   条件            |                   描述                        |
+------------------+-----------------------------------------------+
| Str1 = Str2      | true 相等                                      |                            
| Str1 != Str2     | true 不相等                                    |
| -n Str1          | true 字符串长度不为0                            | 
| -z Str1          | true 字符串长度为0                              |                             
+------------------+-----------------------------------------------+
关系运算
+------------------+-----------------------------------------------+
|   条件            |                    描述                       |
+------------------+-----------------------------------------------+
| expr1 -eq expr2  | true 相等 (equal)                              |
| expr1 -ne expr2  | true 不相等 (not equal)                        |
| expr1 -gt expr2  | true 大于   (greater than)                     |
| expr1 -ge expr2  | true 大于等于  (greater equal)                  |
| expr1 -lt expr2  | true 小于   (less than)                        | 
| expr1 -le expr2  | true 小于等于  (less equal)                     |
| !expr1           | true 非运算,expr1 为 false                      |    
| expr1 -o expr2   | true 或运算,expr1 或 expr2 为 true              |
| expr1 -a expr2   | true 与运算，expr1 和 expr2 都为 true            |        
+------------------+-----------------------------------------------+
```

### 条件语句 `case`

整体结构用`case` 和 `esac`(`case`反过来写) ，用`)`表示每个情况， `;;`表示停止，`*)`表示默认值。  

```sh
echo '输入 1 到 4 之间的数字:'
read aNum
case $aNum in
    1)  echo '白'
    ;;
    2)  echo '玉'
    ;;
    3)  echo '无'
    ;;
    4)  echo '冰'
    ;;
    *)  echo '欢迎关注白玉无冰'
    ;;
esac
```
![](/img/in-post/2019-10-15-shell-case.png)


## 循环

### `for`

```sh
#!/bin/bash
for i in 白 玉 无 冰
do
  echo "$i"
done
```

输出结果

```
白
玉
无
冰
```

上面那个例子创建了一个变量`i`，并在每次循环迭代的时候给`i`赋值。

### `while`

当条件是`True`时，`while`会一直执行。  

```sh
my_array=('白' '玉' '无' '冰')
my_array_len=${#my_array[@]} #${#my_array[*]}
i=0
while [ $i -lt $my_array_len ]
do
    echo "${my_array[$i]}"
    i=`expr $i + 1` #let i++
done
```

输出结果:

```
白
玉
无
冰
```

上面的例子中，`i`的初始值为`0`，`my_array_len`为数组`my_array`的长度，当`i`小于数组长度的时候循环，每次迭代`i`自增。

## 函数

### 定义

函数(function)可以看作是一个过程或者事务。函数封装了一个任务，通常是一系列代码指令的集合。大多数编程语言都提供了许多内置函数，例如计算数字的平方。  

在 shell 脚本中，我们可以通过两种方式定义函数。
1. 在同一个脚本中定义
2. 在不同脚本中定义，例如，可以定义许多有用的函数在`library.sh`

让我们一起看看如何在 shell 脚本中 定义和使用函数:  

```sh
#定义函数
print_date()
{
echo "Today is `date +"%A %d %B %Y (%r)"`"
return
}
#调用函数
print_date
```
输出结果:

```sh
Today is Tuesday 15 October 2019 (10:24:00 PM)
```


### 函数参数

在 shell 脚本中，调用函数时可以传入参数。在函数内部，通过`${n}`来获取参数的值，`$#`表示传递到脚本的参数个数，`$*`表示以一个单字符串显示所有向脚本传递的参数，`$@`与`$*`相同，但是使用时加引号，并在引号中返回每个参数。

```sh
funWithParam(){
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
    for i in $@
    do
    	echo "$i"
    done	
}
funWithParam 白 玉 无 冰
```

输出结果:
```
参数总数有 4 个!
作为一个字符串输出所有参数 白 玉 无 冰 !
白
玉
无
冰
```

### 退出状态

退出命令(`exit`),表示结束脚本，就像在C程序中一样。 它还可以返回一个值，该值可用于脚本的父进程。

```sh
echo 白玉无冰
exit 0
echo exit
```
输出结果:
```
白玉无冰
```

每个命令都返回退出状态（有时称为返回状态或退出代码）。 成功的命令返回`0`，不成功的命令返回非零值，该值通常可以解释为错误码。 

当脚本没有退出状态码，脚本的退出状态是脚本中执行的最后一条命令的退出状态（退出之前）。

```sh
echo 白玉无冰
exit #exit $?
```

上面的`exit`等同于`exit $?`。

`$?` 是shell中的一个特殊变量，用于读取上一条执行的命令的退出状态。 调用函数后，`$?`返回的是函数中最后执行的命令的退出状态。

```sh
funWithParam(){
    echo "$@"
    return 1;
}
funWithParam 白 玉 无 冰
echo $?
echo $?
```
输出结果:
```
白 玉 无 冰
1
0
```

## 结语

希望这篇文章能帮你快速入门 shell 脚本。

---




---
参考资料🔗: [https://medium.com/tech-tajawal/writing-shell-scripts-the-beginners-guide-4778e2c4f609](https://medium.com/tech-tajawal/writing-shell-scripts-the-beginners-guide-4778e2c4f609){:target="_blank"}
