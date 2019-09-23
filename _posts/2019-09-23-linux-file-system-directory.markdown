---
layout: post
title:  "Linux 文件系统目录层次结构【译】"
date:   2019-09-23 22:22:22 +0800
categories: shell
tags:
    - shell
---
![](/img/in-post/2019-09-23-bg.png)
文件系统是驻留在磁盘部分的数据结构。Linux 文件系统也称为树(tree)。Linux文件系统的主要优势是能够适应不同用户的需求。Linux 文件结构是根据称为文件层次结构标准(FHS) 的文档设置的。此标准是在 Linux 开发者协商建立的。
![](/img/in-post/2019-09-23-linux-root-ls.png)

### /boot
`/boot` 包含引导加载程序的所有静态文件，这些文件包含加载操作系统的代码。每当系统启动时，都会引用这个目录，并且启动系统所需的所有文件都加载到RAM中。
![](/img/in-post/2019-09-23-linux-boot.png)

### /bin
`/bin` 目录包含大多数 Linux 命令的可执行文件。Linux 命令是可执行的 C 程序或 shell 脚本，它可以根据我们的请求执行任务。(shell 脚本是一系列 Linux 命令)
![](/img/in-post/2019-09-23-linux-bin.png)

### /etc
`/etc` 目录包含与系统维护和管理相关的其他命令。它还包含多个用于存储有关系统用户、终端和连接到系统的设备的相关信息的系统文件。
![](/img/in-post/2019-09-23-linux-etc.png)

### /lib
`/lib` 目录包含 Linux 为程序员提供的所有库函数。可以通过进行系统调用来使用这些库函数编写程序。
![](/img/in-post/2019-09-23-linux-lib.png)

### /dev
`/dev` 目录存储与设备相关的文件。Linux 每个 I/O 设备都关联着文件。
![](/img/in-post/2019-09-23-linux-dev.png)

### /usr
为每个用户创建 `/usr` 目录，以便具有一个专用工作区，用户可以在其中存储其文件。它包含所有用户本地程序和数据(用户可用的程序和数据)。
![](/img/in-post/2019-09-23-linux-usr.png)

### /tmp
`/tmp` 目录是保留临时文件的目录。一旦系统关闭并重新启动，存储在此目录中的文件就会被删除。与其他目录相比，此目录的重要性不大。
![](/img/in-post/2019-09-23-linux-tmp.png)

### /sbin
`/sbin` 是 Linux 和其他类似 UNIX 的操作系统中根目录的标准子目录，其中包含可执行(准备运行)程序。它们大多是系统管理命令，这里存放的是系统管理员使用的管理程序。
![](/img/in-post/2019-09-23-linux-sbin.png)

### /media
`/media `目录用于在可移动媒体(CD-ROM 驱动器、软盘、笔驱动器、Zip 驱动器等)上安装文件系统。

### /mnt
`/mnt` 系统提供这个目录是让用户临时挂载其他的文件系统。

### /opt
`/opt` 目录适用于未打包且不符合标准的程序。你只需将所有库与程序放在一起。它通常是一个快速和肮脏的解决方案，但它也可用于由您自己创建有特定的路径的程序。

### /srv
`/srv` 是一个服务目录。它保存系统为 ftp、rsync、www、cvs 等协议提供的特定于站点的数据。为了符合要求分发包括这个文件夹，但我没有看到它使用太多。

### /var
`/var` 目录代表变量(variable)。这将存储随着系统运行而变化的所有文件。日志文件、备份、邮件、缓存等。
![](/img/in-post/2019-09-23-linux-var.png)

### /home
`/hone` 用于存储所有用户特定的文档和设置。这类似于 Windows，"文档和设置"。在大多数 Linux 发行版 `/home` 上，将包含一个包含每个用户名或用户组的目录。例如 `/home/guests`，`/home/guests`。

### /lost+found
`/lost+found` 目录用于处理系统崩溃情况。如果你有一个系统崩溃和Linux文件系统检查器(sck)恢复损坏的文件，他们放在这里。

### /root
`/root` 是系统管理员(root)的主目录。

### /proc
`/proc` 在名为 `/proc/PID` 的目录中包括每个正在运行的进程(括内核进程)的目录，其中 `PID` 是进程编号。
![](/img/in-post/2019-09-23-linux-proc.png)

### /cdrom
`/cdrom` 目录是安装 CD-ROM的, 虽然一些 linux 味道的操作系统有它，但它不是 Linux 文件层次结构的一部分。

----
[原文链接🔗](https://medium.com/@nilayjha99/linux-file-system-directory-hierarchy-explained-a7f8a7549c33){:target="_blank"}
