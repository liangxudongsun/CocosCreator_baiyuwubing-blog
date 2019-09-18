---
layout: post
title:  "Linux Shell 生存入门指南【译】"
date:   2019-09-18 22:22:22 +0800
categories: shell
tags:
    - shell
---

> 通过学习十个最有用的Linux命令来消除对Linux shell的恐惧。

![](/img/in-post/2019-09-18-bg-shell.png)

### 为什么要学习 Linux 命令行
- 可以更多地了解操作系统  
*与图形界面相比，shell 更直接地接触文件系统，更能够了解操作系统的层次结构和结构。你还可以直接使用配置文件，这使您能够更高效地控制操作系统。*
- 可以远程控制计算机和服务器  
*SSH 和 Telnet 等网络协议允许您远程连接到网络上的计算机，但它们仅提供 shell 而不是图形界面。因此，只有在熟悉 shell 时，才能使用这些协议。*
- 无需任何人的帮助即可安装 Arch Linux  
*Arch Linux 是一个 Linux 发行版，由于其安装方法，它吓到许多初学者。要安装 Arch Linux，需要使用 shell 手动执行从磁盘分区到用户创建的所有步骤。你需要非常擅长Linux shell来安装Arch Linux。*
- 可以找到 Linux 相关的工作

### Linux 命令提示符
当你在 Linux 发行版中打开终端应用时，你将看到一个黑屏，上面印有姓名和一些其他信息。在后面可以看到一个光标，这是用来接收命令。提示符显示的信息是可配置的，但本教程不作讨论。
![](/img/in-post/2019-09-18-shell-login.jpeg)
提示符提供有关用户名、主机名、当前工作目录。`$`这意味着你是普通用户而不是root用户(root用户拥有更高的权限)。

### 10个基本命令
这 10 个shell命令基本能够实现在图形用户界面中执行所有任务，如创建和删除目录，修改和删除文件等。

#### 1. `pwd`
打印工作目录(print working directory)`pwd`命令将完整的路径打印到正在使用中的目录。当你打开终端应用程序时，它通常会在主文件夹启动 shell，因此运行 `pwd` 将打印`/home/用户名`。`~`在提示符中表示主页。
![](/img/in-post/2019-09-18-shell-pwd.png)

#### 2. `cd`
更改目录(Change Directory)`cd 目录`更改工作目录。例如，`cd myfolder`会将工作目录更改为`myfolder`，但如果当前目录中不存在`myfolder`，会抛出错误❌。
![](/img/in-post/2019-09-18-shell-cd.png)
`cd ..`返回上一个目录。
![](/img/in-post/2019-09-18-shell-cd-2.png)
同样可以使用绝对路径。绝对路径是从根目录开始的完整路径。例如，`myfolder`的绝对路径将是`/home/baiyuwubing/myfolder`，也就是 `pwd` 输出的结果。

#### 3. `ls`
列举(list)`ls`用于显示指定工作目录下的内容(列出目前工作目录所含之文件及子目录)。在`myfolder`目录中运行`ls`将显示其内容，即 file1、file2 等。
![](/img/in-post/2019-09-18-shell-ls.png)
同样也可以查看绝对路径下的内容。例如，工作目录位于`/home/baiyuwubing/myfolder`，运行`ls /boot`，将打印根(/)目录中存在的`boot`文件夹的内容。工作目录不会更改。此外，`boot`和`/boot`并不相同。`boot`是指当前工作目录中的目录或文件，但`/boot`是指根(/)目录中的目录或文件。运行 `ls boot`将打印错误消息，因为当前工作目录`/home/baiyuwubing/myfolder`中没有名为`boot`的文件或文件夹。
![](/img/in-post/2019-09-18-shell-ls-boot.png)

#### 4. `man`
使用手册(manual)`man 命令`将打开该命令手册页。手册页包含有关 Linux 中所有可用命令，包括如何正确的使用和可选参数。
要退出手册页，按`q`。例如，运行 `man ls` 将打开 `ls` 的手动页面。
![](/img/in-post/2019-09-18-shell-man-ls.png)

#### 5. `mkdir`
创建目录(make-directory)`mkdir 新目录`在当前工作目录中创建新目录。例如，运行 `mkdir hello` 将在当前目录中创建名为`hello`的文件夹。创建目录后，运行 `cd hello` 会将当前目录更改为新构建的`hello`目录。
![](/img/in-post/2019-09-18-shell-mkdir.png)

#### 6. `rmdir`
移除目录(Remove directory)`rmdir 目录`删除空的目录。
![](/img/in-post/2019-09-18-shell-rmdir.png)
如果不出空目录，会抛出错误。
![](/img/in-post/2019-09-18-shell-rmdir-fail.png)

#### 7. `clear`
`clear`命令可清除并删除shell所有之前的输出。当终端非常杂乱时，它非常有用。

#### 8. `nano`
`nano`是一种基于终端的文本编辑器，可用于创建和编辑文本文件以及编辑配置文件。它类似于任何其他文本编辑器(如*notepad*)，唯一的区别是它通过 shell 工作，并且没有 GUI。大多数Linux发行版预装了nano。在 shell 中运行 `nano`将打开nano文本编辑器，并提供一个可以键入文本的界面。
![](/img/in-post/2019-09-18-shell-nano.png)
编辑完后, 按`CTRL+X`会提示是否保存文件。
![](/img/in-post/2019-09-18-shell-nano-save.png)
如果按`Y`，它会要求您输入文件的名称，按`ENTER`将关闭nano文本编辑器。在当前目录中将创建该文件。
![](/img/in-post/2019-09-18-shell-nano-save-file.png)

#### 9. `cat`
`cat`用于在 shell 控制台上打印文件的内容，使用 `cat 文件名`可以在屏幕上输出文件的内容。
![](/img/in-post/2019-09-18-shell-cat.png)

#### 10. `rm`
`rm`用于删除一个文件或者目录。`rm 文件名`可以删除文件。
![](/img/in-post/2019-09-18-shell-rm.png)
`rm -rf 目录`将目录及以下的文件全部删除。
![](/img/in-post/2019-09-18-shell-rm-rf.png)

#### 11. `mv` (额外赠送一个)
`mv` 可用于移动或重命名文件。重命名只是将文件改为另一个名称。`mv`格式为 `mv 源 目标`。如果源和目标位于当前工作目录之外，则需要提供该路径的完整路径。
![](/img/in-post/2019-09-18-shell-mv.png)

### 一些要注意的地方
- Linux shell 是区分大小写的，因此`desktop`和`Desktop`是不同的含义。
- 在 Linux 中写入路径时应注意，因为`boot`和`/boot`是两个不同的文件夹。
- 掌握Linux shell的唯一方法是每天花时间使用它。如果您的主操作系统是 Linux，那就更好了。
- 在操作系统中所做的任何操作，都尝试从 shell 中找到一种做同样的事情的方法。
- 如果你真的想磨练你的Linux技能，并成为一个Linux大师，那么你需要阅读大量相关书籍📚。


---
原文链接🔗: [https://medium.com/free-code-camp/a-beginners-guide-to-surviving-in-the-linux-shell-cda0f5a0698c](https://medium.com/free-code-camp/a-beginners-guide-to-surviving-in-the-linux-shell-cda0f5a0698c)
