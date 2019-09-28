---
layout: post
title:  "初学者教程 | 5分钟内学习TypeScript【译】"
date:   2019-09-26 22:22:22 +0800
categories: javascript
tags:
    - javascript
---
> 结合示例学习 TypeScript 的基础知识  

![](/img/in-post/2019-09-26-bg.png) 
TypeScript 是 JavaScript 的类型化超集，旨在使语言更具可扩展性和可靠性。它是开源的，自 2012 年创建以来一直由 Microsoft 维护。TypeScript 作为 Angular2 中的核心编程语言获得了初步的突破。从那时起，它一直在增长，在React和Vue社区也一直在增长。在本教程中，结合示例学习 TypeScript 的基础知识。让我们开始吧。

### 安装TypeScript
在开始编码之前，我们需要在计算机上安装 TypeScript。我们将为此使用 `npm`，打开终端并键入以下命令：
```shell
npm install -g typescript
```
安装后，我们可以通过运行将显示安装的 TypeScript 版本的命令 `tsc -v` 来验证它。
![](/img/in-post/2019-09-26-tsc-v.png) 

### 编写代码
让我们创建第一个 TypeScript 文件，并在其中编写一些代码。打开您最喜爱的 IDE 或文本编辑器，并创建一个名称为 `first.ts` 的文件。对于 TypeScript 文件，我们使用扩展名`.ts`  

现在，我们只是要写几行普通的 JavaScript 代码，因为所有的 JavaScript 代码都是有效的 TypeScript 代码：  
```ts
let a = 5;  
let b = 5;  
let c = a + b;

console.log(c);
```
下一步是将我们的TypeScript编译成普通的JavaScript，因为浏览器读取的是.js文件 。

### 编译 TypeScript
为了进行编译，我们将运行 `tsc filename.ts` 的命令，它创建具有相同文件名但扩展名不同的 JavaScript 文件，并且最终可以传递给的浏览器。因此，在文件位置打开终端并运行以下命令：
```
tsc first.ts
```
> 提示：如果要编译任何文件夹中的所有 TypeScript 文件，使用命令：`tsc *.ts`

### 数据类型
TypeScript(顾名思义)是有类型的JavaScript。这意味着我们可以在声明时为不同的变量指定类型。它们将始终在该作用域中保存相同类型的数据。  

类型是一项非常有用的功能，可确保可靠性和可扩展性。类型检查有助于确保我们的代码按预期工作。此外，它有助于发现错误和错误，并正确编写代码。  

将类型分配给任何变量的语法是编写变量的名称后跟一个`:`符号，然后是类型的名称，最后是`=`符号和变量的值。

TypeScript 中有三种不同的类型：任意(any)类型、内置(Built-in)类型和用户定义(User-defined)的类型。让我们来看看他们的每个用法。  

#### 任意类型
`any`都是 TypeScript 中所有数据类型的超集。给任何变量的定义`any`等效于跳过变量的类型检查。  
```ts
let myVariable: any = 'This is a string'
```

#### 内置类型
这些是内置于 TypeScript 中的类型。它们包括数字(`number`)、字符串(`string`)、布尔(`boolean`)、`void`、`null` 和`undefined`。  
```ts
let num: number = 5;  
let name: string = 'Alex';  
let isPresent: boolean = true;
```

#### 用户定义的类型
用户定义的类型包括枚举(`enum`)、类(`class`)、接口(`interface`)、数组(`array`)和元组(`tuple`)。我们将在本文后面讨论一些。

### 面向对象编程
TypeScript 支持面向对象编程的所有功能，如类(`class`)和接口(`interface`)。此功能对 JavaScript 来说是一个巨大的推动。自从开发人员开始将其用于大规模应用程序以来，JavaScript一直都在努力使用 面向对象编程(OOP) 功能。  

#### 类
在面向对象的编程中，类是对象的模板。类定义了对象的特性和方法。类还封装对象的数据。  

TypeScript 具有对类的内置支持，ES5 和早期版本不支持这些类。这意味着我们可以使用关键字`class`声明一个类。
```ts
class Car {
  //属性  
  model: String;  
  doors: Number;  
  isElectric: Boolean;

constructor(model: String, doors: Number, isElectric: Boolean) {  
    this.model = model;  
    this.doors = doors;  
    this.isElectric = isElectric;  
  }

displayMake(): void {  
    console.log(`This car is ${this.model}`);  
  }
}
```
在上面的示例中，我们声明了 `Car` 类及其一些属性，我们将在构造函数中初始化这些属性。我们还有一个方法，该方法将使用其属性显示一些消息。  

让我们看看如何创建此类的新实例：  
```ts
const Prius = new Car('Prius', 4, true);  
Prius.displayMake(); // This car is Prius
```
要创建类的对象，我们使用 `new` 的关键字，并调用 类的构造函数并将其传递属性。现在这个对象`Prius`有它自己的属性`model`,`doors`和`isElectric`。该对象还可以调用`displayMake`方法，该方法可以访问`Prius`的属性。

#### 接口
接口的概念是 TypeScript 的另一个强大的功能，它允许您定义变量的结构。接口类似于对象应遵循的语法协定。  

接口最好通过实际示例进行描述。所以，假设我们有一个汽车的对象：  
```ts
const Car = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}
```
如果我们查看上面的对象并尝试提取其结构，它将是：  
```ts
{  
  model: String,  
  make: String,  
  display(): void  
}

```
如果我们想要重用此结构，我们可以以接口的形式声明它。要创建接口，我们使用关键字`interface`。
```ts
interface ICar {  
  model: String,  
  make: String,  
  display(): void  
}

const Car: ICar = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}
```
在这里，我们声明了一个叫做`ICar`的接口，并创建了一个对象汽车。`Car `现在绑定到 `ICar` 接口，确保 `Car` 对象定义接口中的所有属性。

### 结论
我希望这能让你快速了解 TypeScript 是如何使 JavaScript 更加稳定，更不容易出错。TypeScript 在 Web 开发领域获得了许多发展势头。也有越来越多的React开发人员正在采用它。TypeScript 绝对是前端开发人员都应该知道的。  

Happy coding :)  


----
[原文链接🔗](https://www.freecodecamp.org/news/learn-typescript-in-5-minutes-13eda868daeb/){:target="_blank"}