## 第 1 章--什么是 JavaScript

## 第 2 章--HTML 中的 JavaScript

### 2.1.2 推迟执行脚本

```html
<script defer src="xx.js"></script>
```

defer：

- HTML4.01 新增，这个属性表示执行的时候不会改变页面结构
- 告诉浏览器该脚本可以立即下载，但是会延迟执行
- 他们会等到 dom 解析结束（就是解析到斜杆 html>时）才开始执行
- 用了 defer 属性，script 标签就可以放到 head 中了，没必要放到最后（基本浏览器都兼容了）

### 2.1.3 异步执行脚本

```html
<script async src="xx.js"></script>
```

async：

- HTML5 定义
- 也会告诉浏览器立即下载
- 不能保证按顺序执行
- 能保证在页面 load 事件执行前执行，但不能保证 DOMContentLoaded 之前或之后执行

### 2.1.4 动态执行脚本

动态添加的默认是 async 异步执行脚本，为了防止有些浏览器不支持 async，建议明确设置为同步加载

```javascript
let script = document.createElement("script");
script.src = "gibberish.js";
script.async = false;
document.head.appendChild(script);
```

### 2.4 noscript 元素

```html
<body>
  <noscript>
    <p>当浏览器不支持脚本，或对脚本的支持关闭，就会显示这段话</p>
  </noscript>
</body>
```

## 第 3 章--语言基础

### 3.1.1 区分大小写

严格区分大小写

### 3.1.2 标识符

- 必须是字母、数字、下划线、美元符号$组成，**数字不能是第一个字符**

- 关键字、保留字、true、false 和 null 不能作为标识符

### 3.1.4 严格模式

HTML5 新增

- 一些早期不规范写法会直接抛出错误
- 现代浏览器都是支持的

```javascript
"use strict";

function doSomething() {
  "use strict";
  // 函数体
}
```

### 3.4.1 typeof 操作符

typeof 可以简单判断数据类型，结果会返回对应类型的普通字符串 如：`number`

- `object` 表示目标为对象或 null
- `functiion` 表示目标为函数
- typeof null 结果为 `object`，是因为特殊值 null 被认为是一个对空对象的引用
- typeof 是一个操作符，而不是函数，所以是不需要括号的，但是可以加上括号

```javascript
typeof 100; // number
typeof 100; // number
```

严格来讲，ECMAScript 中被认为的对象，并不代表数据类型，函数有自己特殊属性，所有有必要通过 typeof 来区分一下

## 第 4 章--变量、作用域、内存

### 4.1.3 参数传递

ECMAScript 所有函数参数都是按值传递的，外部的值会被复制到函数中，函数中得到的是基本类型值或引用类型的地址

```javascript
function setName(obj) {
  // 传入了person中保存的地址
  obj.name = "Nicholas";
}
let person = new Object();
setName(person);
console.log(person.name); // "Nicholas"
```

### 4.2 执行上下文与作用域

**ES6 的代码块不是独立的上下文**，执行上下文是在全局代码或函数执行时形成的，而块级作用域只是存在于当前执行环境中，是对当前上下文中变量或函数的一个集合。

执行上下文（Global Execution Context）

- ECMAScript 中有**全局上下文**、**函数上下文**、**Eval 上下文**三种（with 语句，try/catch 语句会在最顶端临时添加一个上下文）

- 每个上下文都有一个**变量对象（variable object）**，存放该上下文所有的函数或变量
- 浏览器全局上下文的**变量对象（Window）**
- 函数上下午中的**变量对象（activation object）**，也叫**活动对象**，默认有一个变量`argument`
- `var` 在全局定义的属性和方法都是挂在 window 上的，`let`和`const`的顶级声明**不会挂在 window 中**，但作用**域链解析效果**是一样的

- 某上下文中如果**所有代码执行完毕就会销毁**，包括里面定义的变量和函数（全局上下文是关闭浏览器或关闭网页才算执行完毕）
- 函数有自己上下文，代码就让函数会被推到一个上下文栈中，函数如果**执行完会弹出**，回到之前的上下文，**如继续调用**函数，则有新函数入栈

作用域链（scope chain）基于变量对象

- 上下文代码执行时自动创建
- 决定各级上下文代码访问变量和函数的顺序，代码**正在执行的上下文**优先级最高
- 作用域链就是通过**各个上下文的变量对象**串联起来的链条

### 4.2.1 作用域链增强

with 语句，try/catch 语句会在最顶端临时添加一个上下文

- with

用于**简化**访问对象属性和方法的代码，这边本来要 location.href 的，通过 with 可以直接使用 href

```javascript
function buildUrl() {
  let qs = "? debug=true";
  with (location) {
    // 这种情况下location会产生一个最顶端上下文
    let url = href + qs;
  }
  return url;
}
```

### 4.2.2 变量声明

......

const 定义一个常量

**代码优化**：const 声明的变量是不可更改的，所有 JavaScript 运行时编译器可以将其所有实例替换成实际值，不需要通过查询表进行查找（V8 的优化手段之一）

### 4.3 垃圾回收

JavaScript 通过自动内存管理实现内存分配和闲置资源回收。

- 周期性的去确认哪个变量不会再使用，就释放掉它占用的内存
- 上下文执行完，里面的局部变量占用的资源会被回收

### 4.3.1 标记清除法

### 4.3.2 引用计数

### 4.3.4 内存管理

1、let const 提高性能
2、隐藏类和删除操作
3、内存泄漏

主要原因：有一些变量被一直引用着，回收机制无法清除，积累到分配给浏览器的内存不够使用

```javascript
// 1、意外声明的全局变量，在window对象上创建的属性，只要window本身不被清理就不会消失。
function setName() {
  name = "Jake";
}

// 2、定时器，name一直在被使用，也清除不了
let name = "Jake";
setInterval(() => {
  console.log(name);
}, 100);

// 3、闭包，外部一直引用这闭包，name 一直不能被清理
let outer = function () {
  let name = "Jake";
  return function () {
    return name;
  };
};
```

4、静态分配与对象池

...

## 第 5 章--基本引用类型

### 5.3 原始值包装类型

为了方便操作原始值，ECMAScript 提供了 3 中特殊的引用类型 Number、Boolean、String，有对应原始类型的特殊行为，每当**用到**要给原始值的方法或属性时，**后台会创建一个相应原生保证类型对象**，从而暴露出操作原始值的各种方法

```javascript
let s1 = "some text";
let s2 = s1.substring(2);

/**
	正常情况原始值不是对象是不能调用方法的，相当于内部做了三件事
    let s1 = new String("some text");
    let s2 = s1.substring(2);
    s1 = null;
 */
```

引用类型与原始值包装类型的**主要区别**在于对象的生命周期。在通过**new 实例化**引用类型后，得到的实例会在离开作用域时被销毁，而**自动创建的原始值包装对象**则只存在于**访问它的那行代码执行期间**。

```javascript
let s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined，这边重新 new String('some text') ,和第二行的没有任何关系
```

### 5.3.2 Number

```javascript
let num = new Number(10);
num.toString(); // '10'
num.valueOf(); // 10
num.toFixed(2); // 四舍五入保存2为小数
num.toExponential(2); // 转科学计数法，参数代表小数点后的位数

Number.isInteger(num); // ES6：判断num是否为整数
```

- Number 类型重写了 valueOf()、toLocaleString()和 toString()方法
- valueOf()方法返回 Number 对象表示的**原始数值**，另外两个方法返回**数值字符串**

---

ECMAScript 用 **IEEE 754**（二进制浮点数算术标准），只要是用这个标准的语言 0.1+0.2 都不等于 0.3

```javascript
// 最大值
Number.MAX_SAFE_INTEGER; // 9007199254740991

// 最小值
Number.MIN_SAFE_INTEGER; // -9007199254740991

// 判断数值是否在此范围
Number.isSafeInteger(9007199254740991); // true
```

### 5.3.3 String

...

### 5.4 单例内置对象

ECMA-262 对内置对象的定义是：任何由 ECMAScript 实现提供、与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象（Object、Array、String、...）

### 5.4.1 Global

ECMA-262 规定 Global 对象为一种兜底对象，我们不会直接取访问它

- 它所针对的是不属于任何对象的属性和方法
- 不存在全局变量或全局函数这种东西。在全局作用域中定义的变量和函数都会变成 Global 对象的属性
- isNaN()、isFinite()、parseInt() 等都是 Global 的方法

---

**1、URL 编码方法**

**2、eval()方法**

**3、Global 对象属性**

**4、window**

虽然 ECMA-262 没有规定直接访问 Global 对象的方式，但**浏览器将 window 对象实现为 Global 对象的代理**。因此，所有全局作用域中声明的变量和函数都变成了 window 的属性。

### 5.4.2 Math

## 第 6 章--集合应用类型

### 6.2.5 迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和 entries()

```javascript
const a = ["foo", "bar", "baz", "qux"];
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

直接结构取值

```javascript
const a = ["foo", "bar", "baz", "qux"];
// forof 遍历可迭代对象，forin 适合遍历对象的可枚举属性
for (const [idx, element] of a.entries()) {
  console.log(idx);
  console.log(element);
}
```

### 6.2.8 栈方法

```javascript
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 从栈顶推入两项得到长度
let item = colors.pop(); // 取得最后一项 green 并从栈顶删除
```

### 6.2.8 队列方法

```javascript
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 末尾推入两项，得到长度
let item = colors.shift(); // 取得第0项 red 并从队列中删除
```

### 6.2.14 归并方法

reduce() 和 reduceRight()

### 6.3 定型数组

### 6.3.1 历史

2006 年，Mozilla、Opera 等浏览器提供商为了实现一套能够渲染复杂图形应用程序、无须安装任何插件就能用的编程平台

打算开发出一套能够充分利用 3D 图形 API 和 GPU 加速，在 Canvas 元素上渲染复杂的图形的**一套 JavaScript API**

1、WebGL

- 最后这套 JavaScript API 基于 OpenGL ES 2.0 规范实现（**OpenGL 2.0** 是 OpenGL 专注于 2D 和 3D 计算机图形的**子集**）
- 这套 JavaScript API 命名为 WebGL （2011 年发布 1.0 版）
- 在 WebGL 的早期版本中，因为**JavaScript 数组**与**原生数组**之间不匹配，所以出现了性能问题

- 图形驱动程序 API 通常不需要以 JavaScript 默认双精度浮点格式传递（但是双精度浮点格式就是 JavaScript 在内存中的格式）
- 因此，每次 WebGL 与 JavaScript 运行时之间 的交互非常麻烦

2、定型数组

- Mozilla 为解决这个问题而实现了 CanvasFloatArray，后面改名 **Float32Array**，也就是今天定型数组中可用的第一个“类型”。
- JavaScript 运行时使用这个类型可以**分配、读取和写入数组**。这个数组可以**直接**传给底层图形驱动程序 API，也可以直接从底层获取到。

### 6.3.2 ArrayBuffer （分配内存）

Float32Array 实际上是一种“视图”，可以**允许**JavaScript 运行时访问一块名为**ArrayBuffer 的预分配内存**，ArrayBuffer 是**所有定型数组** 及 **视图引用**的基本单位

```javascript
const buf = new ArrayBuffer(16); // 在内存中分配16 字节，创建就不能再调整大小
alert(buf.byteLength); // 16
```

- ArrayBuffer 分配的内存不能超过 `Number.MAX_SAFE_INTEGER`
- 通过声明 ArrayBuffer 分配的堆内存可以被**当成垃圾回收**，不用手动释放

### 6.3.3 DataView

.....

### 6.3.4 定型数组

.....

### 6.4 Map （新集合类型）

### 6.4.1 基本 API

JavaScript 中实现“键/值”式存储可以使用 Object 来方便高效地完成，Map 是一种新的集合类型，为这门语言带来了**真正的键/值存储机制**。

```javascript
const m1 = new Map([["key1", "val1"]]); // 接收一个迭代器对象
console.log(m1.size); // 2

// 使用自定义迭代器初始化映射
const m2 = new Map({
  [Symbol.iterator]: function* () {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
    yield ["key1", "val覆盖"];
  },
});
console.log(m2); // { 'key1' => 'val覆盖', 'key2' => 'val2', 'key3' => 'val3' }
console.log(m2.size); // 3
console.log(m2.has("key4")); // 是否存在key4
m2.set("key4", "通过set添加的属性").set("key5", "val5"); // 添加key4,key5
console.log(m2.get("key4")); // 获取key4
m2.delete("key4");
console.log(m2);
m2.clear(); // 清除所有
console.log(m2); // {}

// 与Object不同，Map可以使用任何数据类型作为键值
const functionKey = function () {};
const symbolKey = Symbol();
let objectKey = new Object();
let objectVal = new Object();
m2.set(functionKey, "functionValue");
m2.set(symbolKey, "symbolValue");
m2.set(objectKey, objectVal);
m2.set(null, "null");
m2.set(NaN, "NaN");
m2.set(undefined, "undefined");

objectVal.addtest = "添加属性";
console.log(m2.get(objectKey)); // { addtest: '添加属性' }
objectKey = null;
console.log(m2.get(objectKey)); // null
console.log(m2.get(null)); // null
console.log(m2.get(NaN)); // NaN
console.log(m2); // NaN
m2.clear(); // 清除所有
```

### 6.4.2 顺序与迭代

与 Object 不同，Map 实例会维护键值对的插入顺序

...

### 6.4.3 选择 Object 还是 Map

4、删除性能

Map 的 delete() 比 Object 好多了

### 6.5 WeakMap (弱映射)

- 基于 Map 的子集

- 若映射的 key 只能是对象，或继承 Object 的类型，不能是 null
- 没有 size、clear 的一些属性方法

```javascript
let obj1 = { name: "why" };
let obj2 = { name: "kobe" };

// 1.WeakMap的基本使用
const weakMap = new WeakMap();
weakMap.set(obj1, "aaa");
weakMap.set(obj2, "bbb");

obj1 = null;
obj2 = null; // 先去除obj2对具体对象的关联，所以当这行代码执行完成后，这个对象键（{ name: "kobe" }）就会被当作垃圾回收
// 因为weakMap是弱引用，这时，遇到GC，会被回收，如果换成Map 引用着{ name: "kobe" },GC就不会回收
```

### 6.6 Set （新集合类型）

与 Map 大多数 API 和行为都是共有的

### 6.6.1 基本 API

- 也是传入可迭代对象，但是不强制键值对了
- 添加：set ==> add
- delete()返回一个布尔值，表示集合中是否存在要删除的值

```javascript
// 使用数组初始化集合
const s1 = new Set(["val1", "val2", "val3", "val2"]);
console.log(s1); // { 'val1', 'val2', 'val3' }
console.log(s1.size); // 3
console.log([...s1]); // 得到一个去重的数组
console.log(s1.keys()); // { 'val1', 'val2', 'val3' } keys 和 values 是一样的
console.log(s1.values());
console.log(s1.entries());
s1.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1-> val1
// val2-> val2
// val3-> val3
[...s1].forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1-> 0
// val2-> 1
// val3-> 2

console.log("=============================s1========================");

const s = new Set();
const functionKey = function () {};
let objectVal = new Object();

console.log(s);

console.log(s.has("Matt")); // false
console.log(s.size); // 0
s.add("Matt").add("Frisbie");
console.log(s.has("Matt")); // true
console.log(s.size); // 2
console.log(s.delete("Matt"), "s.delete"); // delete()返回一个布尔值
console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // true
console.log(s.size); // 1
s.add(functionKey);
s.add(objectVal);
s.clear(); // 销毁集合实例中的所有值
console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // false
console.log(s.size); // 0
```

### 6.6.2 顺序与迭代

### 6.7 WeakSet (弱映射)

- 里面的值只能是对象，或继承对象的类型
- 可以用 has 查询，可以用 delete 删除
- 其他和 WeakMap 类似

### 6.8 迭代与扩展操作

## 第 7 章 迭代器和生成器

### 7.1 理解迭代

- 迭代”的意思是**按照顺序反复多次**执行一段程序

- 循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。

- 版本 1：for 循环通过**递增索引来访问数据**是特定于数组类型的方式，**并不适合**所有数据结构
- 版本 2：forEach 可以拿到迭代数据的每一项（只解决数值通过索引取值的问题，**只适用于数组**，还不能标识何时终止）

### 7.2 迭代器模式

**迭代器模式** 描述了一个方案，将通过**可迭代协议**实现的**Iterable**接口，而且可以通过迭代器（**Iterator**）消费的数据结构称为"可迭代器对象"

### 7.2.1 可迭代协议

- 原生实现迭代协议的接口的可迭代对象（String、Array、Map、Set、argument、NodeList）

```javascript
let str = "abc";
let arr = ["a", "b", "c"];
let map = new Map().set("a", 1).set("b", 2).set("c", 3);
let set = new Set().add("a").add("b").add("c");
let els = document.querySelectorAll("div");
// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] }
console.log(arr[Symbol.iterator]); // f values() { [native code] }
console.log(map[Symbol.iterator]); // f values() { [native code] }
console.log(set[Symbol.iterator]); // f values() { [native code] }
console.log(els[Symbol.iterator]); // f values() { [native code] }
// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {}
console.log(arr[Symbol.iterator]()); // ArrayIterator {}
console.log(map[Symbol.iterator]()); // MapIterator {}
console.log(set[Symbol.iterator]()); // SetIterator {}
console.log(els[Symbol.iterator]()); // ArrayIterator {}
```

- 内置**没实现**可迭代协议接口类型

```javascript
let num = 1;
let obj = {};
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined
console.log(obj[Symbol.iterator]); // undefined
```

- 操作目标是可迭代对象的语法

```javascript
// forof、数组结构、扩展运算符、Array.from、Set构造函数、Map构造函数

let arr = ["foo", "bar", "baz"];
// 可迭代对象可以通过for-of循环遍历
// 拿到变量那个可迭代对象arr的 [Symbol.iterator] 并执行 得到迭代器，执行 next() 返回 value，直到 done 为 true 结束
for (let el of arr) {
  console.log(el);
}
// 数组解构
let [a, b, c] = arr;
console.log(a, b, c); // foo, bar, baz
// 扩展操作符
let arr2 = [...arr];
console.log(arr2); // ['foo', 'bar', 'baz']
// Array.from()
let arr3 = Array.from(arr);
console.log(arr3); // ['foo', 'bar', 'baz']
// Set构造函数
let set = new Set(arr);
console.log(set); // Set(3) {'foo', 'bar', 'baz'}
// Map构造函数
let pairs = arr.map((x, i) => [x, i]);
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]]
let map = new Map(pairs);
console.log(map); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 }
```

### 7.2.2 迭代器协议

> 迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象

实现要求

- 必须是**参数个数小于等于 1**的函数
- 必须返回存在 `done` 和 `value` 的对象
  - **done(是否结束):** 如果迭代器可以产生下一个值，`done` 为 `false`，如果是最后一个，`done` 为 `true`
  - **value:** `done`为`true`时可以省略

---

让对象变成可迭代对象

```javascript
Object.prototype[Symbol.iterator] = function () {
  const entries = Object.entries(this);
  let index = 0;

  // 这个返回的才是迭代器
  const iterator = {
    next: function () {
      if (index < entries.length) {
        return { done: false, value: entries[index++] };
      } else {
        return { done: true };
      }
    },
  };

  return iterator;
};

let obj = new Object({ a: 1, b: 2 });
let iter = obj[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: entries[index++] }

console.log(Array.from(obj)); // [ [ 'a', 1 ], [ 'b', 2 ] ] 这个值是设置迭代器是个性化设置的

for (const item of obj) {
  console.log(item);
}

// 怎么运行的？
// 可迭代语法操作可迭代对象时，会找打目标对象的[Symbol.iterator]方法并执行，得到返回的迭代器，然后不断执行迭代器next方法，知道得到done为true时停止
```

### 7.3 生成器

灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。

### 7.3.1 生成器基础

本质就是一个函数，函数名称前面加一个星号（＊）表示它是一个生成器。**除了箭头函数**，只要是可以定义函数的地方，就可以定义生成器

### 7.3.2 通过 yield 中断执行

```javascript
function* generatorFn() {
  yield "foo";
  yield "bar";
  return "baz";
}

// 生成器的使用需要先得到一个对象，通过调用next(),就会执行到yield的地方停止，直到遇到return done为true
let generatorObject = generatorFn();
console.log(generatorObject.next()); //{done: false, value: 'foo'}
console.log(generatorObject.next()); //{done: false, value: 'bar'}
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

## 第 8 章--对象、类与面向对象编程

### 8.4 类

- 无法提升
- 使用范围受**块作用域**的限制

### 8.4.1 类定义

```javascript
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```

### 8.4.3 实例、原型和类成员

5、迭代器类

```javascript
class Person {
  constructor() {
    this.nicknames = { a: 1, b: 2 };
  }
  [Symbol.iterator]() {
    let entries = Object.entries(this.nicknames); // 要迭代出什么内容看具体需求
    let index = 0;
    return {
      next() {
        if (index < entries.length) {
          return { done: false, value: entries[index++] };
        } else {
          return { done: true };
        }
      },
    };
  }
}
let p = new Person();
for (let item of p) {
  console.log(item);
}
// [ 'a', 1 ]
// [ 'b', 2 ]
```

### 8.4.4 继承

- super 关键字不能单独使用

```javascript
class Vehicle {
  constructor() {
    this.hasEngine = true;
  }
  static identify() {
    console.log("vehicle");
  }
}
class Bus extends Vehicle {
  constructor() {
    // 不要在调用super()之前引用this，否则会抛出ReferenceError
    super(); // 相当于super.constructor()
    console.log(this instanceof Vehicle); // true
    console.log(this); // Bus { hasEngine: true }
  }

  // 静态方法继承
  static identify() {
    super.identify();
  }
}
new Bus();
```

## 第 9 章--代理与反射

为开发者提供了拦截并向基本操作嵌入额外行为的能力。

### 9.1 代理基础

代理是目标对象的抽象，因为它可以用作目标对象的替身，但又完全独立于目标对象。

### 9.1.2 定义捕获器

```javascript
const target = {
  foo: "bar",
};
// 捕获器：get、set、has、delete...
const handler = {
  // 接收目标对象、要查询的属性、代理对象三个参数
  get(trapTarget, property, receiver) {
    console.log(trapTarget == target); // true
    console.log(proxy == receiver); // true
    console.log(trapTarget, property, receiver, "参数");

    // return trapTarget[property] + "拦截加工返回"; // get 需要用户编写trapTarget[property] 需要指定对应入参，和get捕获器的默认行为
    // Reflect 封装了所有捕获器的同名方法
    return Reflect.get(...arguments) + "拦截加工返回"; // 通过反射器几不用去写 trapTarget[property] 了
  },
  set() {
    console.log("set");
    // return (trapTarget[property] = value);
    return Reflect.set(...arguments);
  },
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);
proxy.foo = 100;
console.log(proxy.foo);
console.log(target.foo);
```

### 9.1.6 实用反射 API

作用就是调用对象的基本操作（内部方法）：Reflect.set(obj,“a”,1)

1、

反射（Reflect）

- 反射 API 并不限于捕获处理程序

- 大多数反射 API 方法在 Object 类型上有对应的方法

4、安全的使用函数

```javascript
Function.prototype.apply.call(myFunc, thisVal, argumentList);
Reflect.apply(myFunc, thisVal, argumentsList);

// Reflect.apply 一定是apply方法，Function的apply有可能被重写
```

### 9.2 代理捕获器与反射方法

### 9.2.1 get()

get 捕获器会在获取属性值的操作中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  get(target, property, receiver) {
    console.log("get()");
    return Reflect.get(...arguments);
  },
});
proxy.foo;
// get()
```

### 9.2.2 set()

set()捕获器会在设置属性值的操作中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  set(target, property, value, receiver) {
    console.log("set()");
    return Reflect.set(...arguments);
  },
});
proxy.foo = "bar";
// set()
```

### 9.2.3 has()

has()捕获器会在 in 操作符中被调用

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  has(target, property) {
    console.log("has()");
    return Reflect.has(...arguments);
  },
});
"foo" in proxy;
// has()
```

### 9.2.4 defineProperty()

defineProperty()捕获器会在 Object.defineProperty()中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  defineProperty(target, property, descriptor) {
    console.log("defineProperty()");
    return Reflect.defineProperty(...arguments);
  },
});
Object.defineProperty(proxy, "foo", { value: "bar" });
// defineProperty()
```

### 9.2.5 getOwnPropertyDescriptor()

getOwnPropertyDescriptor()捕获器会在 Object.getOwnPropertyDescriptor()中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  getOwnPropertyDescriptor(target, property) {
    console.log("getOwnPropertyDescriptor()");
    return Reflect.getOwnPropertyDescriptor(...arguments);
  },
});
Object.getOwnPropertyDescriptor(proxy, "foo");
// getOwnPropertyDescriptor()
```

### 9.2.6 deleteProperty()

deleteProperty()捕获器会在 delete 操作符中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  deleteProperty(target, property) {
    console.log("deleteProperty()");
    return Reflect.deleteProperty(...arguments);
  },
});
delete proxy.foo;
// deleteProperty()
```

### 9.2.7 ownKeys()

ownKeys()捕获器会在 Object.keys()及类似方法中被调用。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
  ownKeys(target) {
    console.log("ownKeys()");
    return Reflect.ownKeys(...arguments);
  },
});
Object.keys(proxy);
// ownKeys()
```

......

### 9.3 代理模式

### 9.3.1 跟踪访问属性

通过捕获 get、set 和 has 等操作，可以知道对象属性什么时候被访问、被查询。把实现相应捕获器的某个对象代理放到应用中，可以监控这个对象何时在何处被访问过：

```javascript
const user = {
  name: "Jake",
};
const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}`);
    return Reflect.set(...arguments);
  },
});
proxy.name; // Getting name
proxy.age = 27; // Setting age=27
```

## 第 12 章 BOM

## 第 13 章 客户端检测

## 第 15 章 DOM 扩展

### 15.1 Selectors API

#### querySelector()

querySelector()方法接收**CSS 选择符参数**，返回匹配该模式的**第一个**后代元素，如果没有匹配项则返回 null。

```javascript
// 取得<body>元素
let body = document.querySelector("body");
// 取得ID为"myDiv"的元素
let myDiv = document.querySelector("#myDiv");
// 取得类名为"selected"的第一个元素
let selected = document.querySelector(".selected");
// 取得类名为"button"的图片(只会从body的后代中查询)
let img = document.body.querySelector("img.button");
```

如果选择符有语法错误或碰到不支持的选择符，则 querySelector()方法会**抛出错误**。

#### querySelectorAll()

- 跟 querySelector 一样，但是这个方法返回的是一个**NodeList**的静态实例。

- 静态的“快照”，而非“实时”的查询
- 如果没有匹配项，则返回空的 NodeList 实例

```javascript
// 取得ID为"myDiv"的<div>元素中的所有<em>元素
let ems = document.getElementById("myDiv").querySelectorAll("em");
// 取得所有类名中包含"selected"的元素
let selecteds = document.querySelectorAll(".selected");
// 取得所有是<p>元素子元素的<strong>元素
let strongs = document.querySelectorAll("p strong");
```

如果选择符有语法错误或碰到不支持的选择符，则 querySelector-All()方法会抛出错误。

#### matches()

- 接收一个 CSS 选择符参数，如果元素匹配则该选择符返回 true，否则返回 false。
- 可以方便地检测某个元素会不会被 querySelector()或 querySelectorAll()方法返回。

```javascript
if (document.body.matches("body.page1")) {
  // true
}
```

### 15.2 元素遍历（新增属性）

有些浏览器（IE678）会把元素间空格当成空白节点，有的浏览器又不会，这就导致 childNodes 和 firstChild 等属性上的差异

因此新增了一组新属性：

- childElementCount，返回子元素数量（不包含文本节点和注释）；
- firstElementChild，指向第一个 Element 类型的子元素（Element 版 firstChild）；
- lastElementChild，指向最后一个 Element 类型的子元素（Element 版 lastChild）；
- previousElementSibling，指向前一个 Element 类型的同胞元素（Element 版 previousSibling）；
- nextElementSibling，指向后一个 Element 类型的同胞元素（Element 版 nextSibling）。

以前写法：

```javascript
let parentElement = document.getElementById("parent");
let currentChildNode = parentElement.firstChild;
// 没有子元素，firstChild返回null，跳过循环
while (currentChildNode) {
  if (currentChildNode.nodeType === 1) {
    // 如果有元素节点，则做相应处理
    processChild(currentChildNode);
  }
  if (currentChildNode === parentElement.lastChild) {
    break;
  }
  currentChildNode = currentChildNode.nextSibling;
}
```

新写法：

```javascript
let parentElement = document.getElementById("parent");
let currentChildElement = parentElement.firstElementChild;
// 没有子元素，firstElementChild返回null，跳过循环
while (currentChildElement) {
  // 这就是元素节点，做相应处理
  processChild(currentChildElement);
  if (currentChildElement === parentElement.lastElementChild) {
    break;
  }
  currentChildElement = currentChildElement.nextElementSibling;
}
```

### 15.3 HTML5

以前 HTML 就是一个纯标记语言。**HTML5 规范**却包含了与标记相关的大量 JavaScript API 定义。其中有的 API 与 DOM 重合，定义了浏览器应该提供的 DOM 扩展。

#### 15.3.1 CSS 类扩展

#### **1、getElementsByClassName()**

- 暴露在 document 对象和所有 HTML 元素上
- 接收一个参数，即包含一个或多个类名的字符串，返回匹配元素的 NodeList

```javascript
// 取得所有类名中包含"username"和"current"元素
// 这两个类名的顺序无关紧要
let allCurrentUsernames = document.getElementsByClassName("username current");
// 取得ID为"myDiv"的元素子树中所有包含"selected"类的元素
let selected = document
  .getElementById("myDiv")
  .getElementsByClassName("selected");
```

#### **2．classList 属性**

```html
<div class="bd user disabled">...</div>
```

以前操作类

```javascript
// 要删除"user"类
let targetClass = "user";
// 把类名拆成数组
let classNames = div.className.split(/\s+/);
// 找到要删除类名的索引
let idx = classNames.indexOf(targetClass);
// 如果有则删除
if (idx > -1) {
  classNames.splice(i, 1);
}
// 重新设置类名
div.className = classNames.join(" ");
```

通过 classList 操作类

```javascript
// 删除"disabled"类
div.classList.remove("disabled");
// 添加"current"类
div.classList.add("current");
// 切换"user"类
div.classList.toggle("user");
// 检测类名是否存在
if (div.classList.contains("bd") && ! div.classList.contains("disabled")){
    // 执行操作
}
// 迭代类名
for (let class of div.classList){
    doStuff(class);
}
```

#### 15.3.2 焦点管理(表单或 tab 定位的焦点)

HTML5 增加了辅助 DOM 焦点管理的功能。

#### 1、存储焦点元素

- `document.activeElement 属性` 始终包含当前拥有焦点的 DOM 元素
  - 在页面刚加载完之后会设置为 document.body。而在页面完全加载之前，document.activeElement 的值为 null。

#### **2、判断是否存在焦点**

- `document.hasFocus() 方法` 该方法返回布尔值，表示文档是否拥有焦点

#### 15.3.3 HTMLDocument 扩展

#### 1、readyState 属性

- ❑ loading，表示文档正在加载；
- ❑ complete，表示文档加载完成

```javascript
if (document.readyState == "complete") {
  // 执行操作
}
```

#### 2、compatMode 属性

- 这个属性唯一的任务是指示浏览器当前处于什么**渲染模式**。

- `BackCompat`：怪异模式，也称混杂模式
- `CSS1Compat`：标准模式或者准标准模式。
- 从 IE 那边标准化过来的

```javascript
if (document.compatMode == "CSS1Compat") {
  console.log("标准模式");
} else {
  console.log("怪异模式");
}
```

#### 3、document.head

和 `document.body` 一样可以获取 head 标签对象

#### 15.3.4 字符集属性

```javascript
console.log(document.characterSet); // 获取 "UTF-16"
document.characterSet = "UTF-8"; // 设置
```

#### 15.3.5 自定义数据属性

- `data-` 开头，以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息。
- 可以通过元素的`dataset`属性来访问 (dataset 是一个 Map)

```html
<div
  id="myDiv"
  data-appId="12345"
  data-myname="Nicholas"
  data-you-name="789"
></div>
```

访问

```javascript
// 本例中使用的方法仅用于示范
let div = document.getElementById("myDiv");
// 取得自定义数据属性的值
let appId = div.dataset.appId;
let myName = div.dataset.myname;
let youName = div.dataset.youName; // 小横杆要组成驼峰
// 设置自定义数据属性的值
div.dataset.appId = 23456;
div.dataset.myname = "Michael";
// 有"myname"吗？
if (div.dataset.myname) {
  console.log(`Hello, ${div.dataset.myname}`);
}
```

#### 15.3.6 插入标记

........

#### 15.3.7 scrollIntoView()

scrollIntoView() 方法存在于所有 HTML 元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。

参数解析：

- alignToTop 是一个布尔值。

  - true：窗口滚动后元素的顶部与视口顶部对齐。
  - false：窗口滚动后元素的底部与视口底部对齐。

- scrollIntoViewOptions 是一个选项对象。
  - behavior：定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。
  - block：定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"start"。
  - inline：定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"nearest"。
- 不传参数等同于 alignToTop 为 true。

```javascript
// 确保元素可见
document.forms[0].scrollIntoView();
// 同上
document.forms[0].scrollIntoView(true);
document.forms[0].scrollIntoView({ block: "start" });
// 尝试将元素平滑地滚入视口
document.forms[0].scrollIntoView({ behavior: "smooth", block: "start" });
```

### 15.4 专有扩展

...

## 第 18 章 动画与 Canvas 图形

### 18.1 requestAnimationFrame

从 Firefox 4 标准来的，名为 mozRequestAnimationFrame() 方法的 API。这个方法会告诉浏览器要执行动画了，于是浏览器可以通过最优方式确定重绘的时序。

定时器方案：

- 于无法准确知晓循环之间的延时。定时间隔必须足够短，这样才能让不同的动画类型都能平滑顺畅
- 如果一个显示器的屏幕刷新率都是 60Hz，基本上意味着每秒需要重绘 60 次。（最佳的重绘间隔为 1000 毫秒/60，大约 17 毫秒）
- setInterval()还是 setTimeout()都是不能保证时间精度的
- 浏览器又开始对切换到后台或不活跃标签页中的计时器执行限流

```javascript
(function () {
  function updateAnimations() {
    doAnimation1();
    doAnimation2();
    // 其他任务
  }
  setInterval(updateAnimations, 100);
})();
```

### 18.1.2 时间间隔的问题

各个浏览器**计时精度**也不相同：

- IE8 及以下，约 15.625 毫秒
- IE9 及以上，约 4 毫秒
- Firefox 和 Safari，约 10 毫秒
- Chrome，约 4 毫秒
- 浏览器又开始对切换到后台或不活跃标签页中的计时器执行限流，这些精度就更那个控制了

### 18.1.3 requestAnimationFrame

- requestAnimationFrame()方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数。
- 每次调用 requestAnimationFrame()都会在队列上推入一个回调函数，队列的长度没有限制。(不一定要是动画)
- 通过 requestAnimationFrame()递归地向队列中加入回调函数，可以保证每次重绘最多只调用一次回调函数

```javascript
// 把多个requestAnimationFrame()调用串联起来，实现动画循环
function updateProgress() {
    // 这个函数就是修改DOM样式以反映下一次重绘有什么变化的地方
    var div = document.getElementById("status");
    div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
    if (div.style.left ! = "100%") {
        requestAnimationFrame(updateProgress);
    }
}
requestAnimationFrame(updateProgress);
```

### 18.1.4 cancelAnimationFrame

equestAnimationFrame()也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame()来取消重绘任务

```javascript
let requestID = window.requestAnimationFrame(() => {
  console.log("Repaint! ");
});
window.cancelAnimationFrame(requestID);
```

### 18.1.5 requestAnimationFrame 节流

```javascript
letenabled = true;
function expensiveOperation() {
  console.log("Invoked at", Date.now());
}
window.addEventListener("scroll", () => {
  if (enabled) {
    enabled = false;
    window.requestAnimationFrame(expensiveOperation);
    window.setTimeout(() => (enabled = true), 50);
  }
});
```

### 18.2 基本的画布功能

- width 和 height 属性，告诉浏览器在多大面积上绘图。
- 开始和结束标签之间的内容是后备数据，会在浏览器不支持 canvas 元素时显示

```html
<canvas id="drawing" width="200" height="200">浏览器不支持canvas</canvas>
```

绘制：

- 上下文：使用 getContext()方法可以获取对绘图上下文的引用。
- 导出：通过 canvas 对象的 toDataURL 方法，接收一个类型，将 canvas 内容导出为对应类型的图片

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
    // 获取上下文，平面图就用2d
    let context = drawing.getContext("2d");
    // 其他代码。。。。

    // 取得图像的数据URI
    let imgURI = drawing.toDataURL("image/png");
    // 显示图片
    let image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);
 
    // 转二进制，并生成临时图片地址
    drawing.toBlob((blob) => {
        let url = URL.createObjectURL(blob) 
    })
}
```

### 18.3 2D 绘图上下文

- 获取到 2d 绘制上下文（content），就可以通过 content 访问其提供的方法，矩形、弧形、路径
- 2D 上下文的坐标原点(0, 0)，在 canvas 元素的左上角

### 18.3.1 填充和描边

2D 上下文有两个基本绘制操作：

- 填充 -- 颜色、渐变或图像 -- **fillStyle**
- 描边 -- 为图形边界着色 -- **strokeStyle**
- 描边和填充样式设置过了就一直是这个设置，除非后面重新修改

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  context.strokeStyle = "red";
  context.fillStyle = "#0000ff";
}
```

### 18.3.2 绘制矩形

相关方法：

- fillRect(x,y,w,h) ：绘制并填充矩形，通过 `fillStyle` 设置的样式。 ---------- 四个参数分别对应 x,y 坐标系，和绘制的宽高，单位像素 px
- strokeRect(x,y,w,h)：绘制矩形轮廓，通过 `strokeStyle` 设置的样式
- clearRect(x,y,w,h)：擦除画布中某个区域

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色矩形
  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);
  // 绘制半透明蓝色矩形
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30, 30, 50, 50);
  //在前两个矩形重叠的区域擦除一个矩形区域
  context.clearRect(40, 40, 10, 10);
}
```

### 18.3.3 绘制路径

### 18.3.4 绘制文本

### 18.3.5 变换

### 18.3.6 绘制图像

### 18.3.7 阴影

### 18.3.8 渐变

### 18.3.9 图案

### 18.3.10 图像数据

- getImageData() 方法获取原始图像数据
- 接收 4 个参数：要取得数据中第一个像素坐标和要取得的像素宽度及高度。
- 对原始图像数据进行访问可以更灵活地操作图像
- 返回的对象是一个 ImageData 的实例
  - width
  - height
  - data：包含图像的原始像素信息的数组，红、绿、蓝和透明度值，第一个像素的信息包含在第 0 到第 3 个值中

```javascript
let imageData = context.getImageData(10, 5, 50, 50);

// 获取第一个像素点的rgba
let data = imageData.data,
  red = data[0],
  green = data[1],
  blue = data[2],
  alpha = data[3];
```

操作图像：

- putImageData() 方法，把图像数据再绘制到画布上。

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d"),
    image = document.images[0],
    imageData,
    data,
    i,
    len,
    average,
    red,
    green,
    blue,
    alpha;
  // 绘制图像
  context.drawImage(image, 0, 0);
  // 取得图像数据
  imageData = context.getImageData(0, 0, image.width, image.height);
  data = imageData.data;
  for (i = 0, len = data.length; i < len; i += 4) {
    red = data[i];
    green = data[i + 1];
    blue = data[i + 2];
    alpha = data[i + 3];
    // 取得RGB平均值
    average = Math.floor((red + green + blue) / 3);
    // 设置颜色，不管透明度
    data[i] = average;
    data[i + 1] = average;
    data[i + 2] = average;
  }
  // 将修改后的数据写回ImageData并应用到画布上显示出来
  imageData.data = data;
  context.putImageData(imageData, 0, 0);
}
```

### 18.3.11 合成

### 18.4 WebGL

- WebGL 是画布的 3D 上下文
- WebGL 不是 W3C 制定的标准，而是 Khronos Group 的标准。
  - Khronos Group 是非营利性、会员资助的联盟，专注于多平台和设备下并行计算、图形和动态媒体的无专利费开放标准

### 18.4.1 WebGL 上下文

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  // WebGL 2.0上下文的名字叫"webgl2"，WebGL 1.0上下文的名字叫"webgl1"，不支持返回null
  let gl = drawing.getContext("webgl");
  if (gl) {
    //使用WebGL
  }
}
```

getContext() 指定属性取得 WebGL 上下文

- `alpha`：布尔值，表示是否为上下文创建透明通道缓冲区，默认为 true。
- `depth`：布尔值，表示是否使用 16 位深缓冲区，默认为 true。
- `stencil`：布尔值，表示是否使用 8 位模板缓冲区，默认为 false。
- `antialias`：布尔值，表示是否使用默认机制执行抗锯齿操作，默认为 true。
- `premultipliedAlpha`：布尔值，表示绘图缓冲区是否预乘透明度值，默认为 true。
- `preserveDrawingBuffer`：布尔值，表示绘图完成后是否保留绘图缓冲区，默认为 false。建议在充分了解这个选项的作用后再自行修改，因为这可能会影响性能。

```javascript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  letgl = drawing.getContext("webgl", { alpha: false });
  if (gl) {
    //使用WebGL
  }
}
```

......

## 第 20 章 JavaScriptAPI

### 20.2 跨上下文消息

跨文档消息，有时候也简称为XDM，在不同执行上下文（如不同工作线程或不同源的页面）间传递信息的能力。

- XDM的核心是postMessage( data, origin, source ) ，这个**方法名**工作者线程也有用到（目的是一样的）

- 通过open关联的窗口

  ```javascript
  // 发送页面
  let btn = document.querySelector('button')
  btn.onclick = function () {
      let subWindow = window.open('./subPage.html')
      setTimeout(() => {
          subWindow.postMessage("index page info", "http://127.0.0.1:5500");
      }, 5000)
  }
  
  window.addEventListener("message", (event) => {
      // 接收返回数据
      console.log("index.html", event.data);
  });
  
  // subPage 页面
  window.addEventListener("message", (event) => {
      // 确保来自预期发送者
      if (event.origin == "http://127.0.0.1:5500") {
          // 对数据进行一些处理
          console.log('subPage.html', event.data); 
          // 可选：向来源窗口发送一条消息
          event.source.postMessage("subPage 收到", "http://127.0.0.1:5500");
      }
  });
  ```

- 通过iframe关联的窗口

  ```javascript
  // 操作对象：iframe.contentWindow 
  
  // iframe内部页面
  // window.parent.postMessage 主动发消息
  // window.parent.ifrmLoaded() 调用父级方法
  ```


### 20.4 File API与Blob API

- Web应用程序的一个主要的痛点是无法操作用户计算机上的文件。
- 2000年前，处理的唯一方式通过 input type="file"
- File API与Blob API是为了让Web开发者能以安全的方式访问客户端机器上的文件

### 20.4.1 File类型

HTML5在DOM上为文件输入元素添加了files集合，里面的元素是一个个的File对象

File类型：

- `name`：本地系统中的文件名。
- `size`：以字节计的文件大小。
- `type`：包含文件MIME类型的字符串。
- `lastModifiedDate`：表示文件最后修改时间的字符串。这个属性只有Chome实现了。

```javascript
let filesList = document.getElementById("files-list");
filesList.addEventListener("change", (event) => {
    let files = event.target.files,
        i = 0,
        len = files.length;
    while (i < len) {
        const f = files[i];
        console.log(`${f.name} (${f.type}, ${f.size} bytes)`);
        i++;
    }
});
```



### 20.4.2 FileReader类型

- 可以实际从文件中读取数据
- FileReader类型表示一种异步文件读取机制，可以把FileReader想象成类似于XHR，只不过是用于从文件系统读取文件，而不是从服务器读取数据。

**FileReader类型方法：**

- readAsText(file, encoding)：从文件中读取纯文本内容并保存在result属性中。第二个参数表示编码，是可选的。
- readAsDataURL(file)：读取文件并将内容的数据URI保存在result属性中。
- readAsBinaryString(file)：读取文件并将每个字符的二进制数据保存在result属性中。
- readAsArrayBuffer(file)：读取文件并将文件内容以ArrayBuffer形式保存在result属性。

FileReader事件：

- progress：用于跟踪和显示读取文件的进度
- error：发生了错误
- load：读取完成
- loadend：不管实名情况最终都会触发（类似于trycatch的finally）

```html
<body>
    <input type="file" id="files-list">
    <div id="progress"></div>
    <div id="output"></div>
</body>
<script>
    let filesList = document.getElementById("files-list");
    filesList.addEventListener("change", (event) => {
        let info = "",
            output = document.getElementById("output"),
            progress = document.getElementById("progress"),
            files = event.target.files,
            type = "default",
            reader = new FileReader();
        if (/image/.test(files[0].type)) {
            // 读取文件并将内容的数据URI保存在result属性中
            reader.readAsDataURL(files[0]);
            type = "image";
        } else {
            // 从文件中读取纯文本内容并保存在result属性中
            reader.readAsText(files[0]);
            type = "text";
        }
        // 读取错误
        reader.onerror = function () {
            output.innerHTML = "Could not read file, error code is " +
                reader.error.code;
        };
        // 读取进度
        reader.onprogress = function (event) {
            if (event.lengthComputable) {
                progress.innerHTML = `${event.loaded}/${event.total}`;
            }
        };
        reader.onload = function () {
            let html = "";
            switch (type) {
                case "image":
                    html = `<img src="${reader.result}">`;
                    break;
                case "text":
                    html = reader.result;
                    break;
                default:
                    html = ""

            }
            output.innerHTML = html;
        };
    });
</script>
```

### 20.4.3 FileReaderSync类型

FileReaderSync类型就是FileReader的同步版本

......

### 20.4.4 Blob与部分读取

某些情况下，可能需要读取部分文件而不是整个文件。为此，File对象提供了一个名为slice()的方法。

**slice()** 方法接收两个参数：起始字节和要读取的字节数。这个方法返回一个Blob的实例，而Blob实际上是File的超类。

blob表示二进制大对象（binary larget object），是JavaScript对不可修改二进制数据的封装类型。

......

### 20.4.5 对象URL与Blob

**window.URL.createObjectURL()**

- 对象URL有时候也称作Blob URL，是指引用存储在File或Blob中数据的URL
- 对象URL的优点是不用把文件内容读取到JavaScript也可以使用文件。
- 可以使用window.URL.createObjectURL()方法并传入File或Blob对象。这个函数返回的值是一个指向内存中地址的字符串



......

### 20.4.6 读取拖放文件

###  20.7 Notifications API

Notifications API用于向用户显示通知，通过触发通知可以在页面不活跃时向用户显示消息，看起来就像原生应用。

使用条件：

- 通知只能在运行在**安全上下文**的代码中被触发
- 通知必须按照每个源的原则明确**得到用户允许**

```javascript
// requestPermission授权方法返回一个期约，用户在授权对话框上执行操作后这个期约会解决。
// 没经过授权无法使用 Notification
Notification.requestPermission()
    .then((permission) => {
    // "granted" 值意味着用户明确授权了显示通知的权限。
    // "denied" 值意味着用户明确拒绝了显示通知的权限。一旦拒绝，就无法通过编程方式挽回(要用户去浏览器设置)，因为不可能再触发授权提示。
    console.log('User responded to permission request:', permission);
});

console.log(Notification.permission);
// 用户允许了，这边还要是https环境才能使用


const n = new Notification('foo');
n.onshow= () => console.log('Notification was shown!');
n.onclick= () => console.log('Notification was clicked!');
n.onclose= () => console.log('Notification was closed!');
n.onerror= () => console.log('Notification experienced an error!');
```



## 第 23 章 JSON

- JSON最关键的一点是要把它当成一种数据格式，而不是编程语言
- JSON不属于JavaScript，它们只是拥有相同的语法而已。
- JSON也不是只能在JavaScript中使用，它是一种通用数据格式。很多语言都有解析和序列化JSON的内置能力

### 23.1 语法

语法：

- JSON字符串必须使用双引号，key也必须用双引号
- 最后一项不需要逗号结尾
- 末尾不需要封号

JSON语法支持表示3种类型的值：

- 简单值
  - 字符串、数值、布尔值、null
- 对象
- 数组

不支持：（JSON.stringify  结果中就会删除相应的键）

- undefined
- 函数

### 23.2 解析与序列化

JSON可以直接被解析成可用的JavaScript对象。与解析为DOM文档的XML相比，这个优势非常明显。

### 23.2.1 JSON对象

JSON对象有两个方法：stringify()和parse()

```javascript
let book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText);
```

### 23.2.2 序列化选项

三个参数：

- 第一个是操作对象

- 第二个参数是过滤器，可以是数组或函数；

  ```javascript
  let book = {
      title: "Professional JavaScript",
      authors: [
          "Nicholas C. Zakas",
          "Matt Frisbie"
      ],
      edition: 4,
      year: 2017
  };
  let jsonText = JSON.stringify(book, ["title", "edition"]); // {"title":"Professional JavaScript", "edition":4}
  let jsonText = JSON.stringify(book, (key, value) => {
        switch(key) {
          case "authors":
            return value.join(",")
          case "year":
            return 5000;
          case "edition":
            return undefined;
          default:
            return value;
        }
      }); //     {"title":"Professional JavaScript", "authors":"Nicholas C. Zakas, Matt Frisbie", "year":5000}
  ```

- 第三个参数是用于缩进结果JSON字符串的选项。(最多十个字符)

  ```javascript
  let jsonText = JSON.stringify(book, null, "--" );
  
  /*
      {
      --"title": "Professional JavaScript",
      --"authors": [
      ----"Nicholas C. Zakas",
      ----"Matt Frisbie"
      --],
      --"edition": 4,
      --"year": 2017
      }
  */
  ```

### 23.2.3 解析选项

两个参数：

- 第一个是操作对象

- 第二个参数是过滤器，可以是数组或函数； （和stringify一样）

  ```javascript
  let book = {
      title: "Professional JavaScript",
      authors: [
          "Nicholas C. Zakas",
          "Matt Frisbie"
      ],
      edition: 4,
      year: 2017,
      releaseDate: new Date(2017, 11, 1)
  };
  let jsonText = JSON.stringify(book);
  // 原函数返回undefined，则结果中就会删除相应的键
  let bookCopy = JSON.parse(jsonText,(key, value) => key == "releaseDate" ? new Date(value) : value);
  alert(bookCopy.releaseDate.getFullYear());
  ```

  

## 第 24 章 网络请求与远程资源

### 24.1 XMLHttpRequest 对象

### 24.1.1 使用 XHR

```javascript
let xhr = new XMLHttpRequest();
/*
 * 1、定义请求
 *   首先要调用open()方法，接收3个参数：请求类型、请求URL、是否异步
 *   不会实际发送请求，只是为发送请求做好准备
 */
xhr.open("get", "example.php", false);

/*
 * 2、发送
 *   send()方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传null（因为这个参数在某些浏览器中是必需的。）
 *   请求就会发送到服务器。
 *   因为这个请求是同步的，所以JavaScript代码会等待服务器响应之后再继续执行。收到响应后，XHR对象的以下属性会被填充上数据。
 *       - responseText：作为响应体返回的文本
 *       - responseXML：如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的XML DOM文档。
 *       - status：响应的HTTP状态
 *       - statusText：响应的HTTP状态描述
 */
xhr.send(null);

/*
 * 3、通过 readyState 属性判断请求状态
 *   readyState 状态每次改变都会触发 readystatechange 事件（所以可以在这监听readyState）
 *
 *   各个阶段状态值的含义
 *       - 0：未初始化（Uninitialized）。尚未调用open()方法。
 *       - 1：已打开（Open）。已调用open()方法，尚未调用send()方法。
 *       - 2：已发送（Sent）。已调用send()方法，尚未收到响应。
 *       - 3：接收中（Receiving）。已经收到部分响应。
 *       - 4：完成（Complete）。已经收到所有响应，可以使用了。
 *
 *  onreadystatechange事件处理程序不会收到event对象。在事件处理程序中，必须使用XHR对象本身来确定接下来该做什么。
 */

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};

/*
 * 5、取消请求
 *   收到响应之前如果想取消异步请求，可以调用abort()方法
 *
 */
xhr.abort();
```

### 24.1.2 HTTP 头部

每个 HTTP 请求和响应都会携带一些头部字段，这些字段可能对开发者有用。XHR 对象会通过一些方法暴露与请求和响应相关的头部字段。

默认情况下，XHR 请求会发送以下头部字段：

- Accept：浏览器可以处理的内容类型。
- Accept-Charset：浏览器可以显示的字符集。
- Accept-Encoding：浏览器可以处理的压缩编码类型。
- Accept-Language：浏览器使用的语言。
- Connection：浏览器与服务器的连接类型。
- Cookie：页面中设置的 Cookie。
- Host：发送请求的页面所在的域。
- Referer：发送请求的页面的 URI。注意，这个字段在 HTTP 规范中就拼错了，所以考虑到兼容性也必须将错就错。（正确的拼写应该是 Referrer。）
- User-Agent：浏览器的用户代理字符串。

添加自定义头部：

```javascript
// open 与 send 之间设置
xhr.open();
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send();

// 获取头部信息
xhr.getRequestHeader("MyHeader");
xhr.getAllRequestHeader("MyHeader");
```

### 24.1.3 GET 请求

查询字符串中的每个名和值都必须使用 encodeURIComponent()编码，所有名/值对必须以和号（&）分隔

```javascript
let url = "example.php";
// 添加参数
url = addURLParam(url, "name", "Nicholas");
url = addURLParam(url, "book", "Professional JavaScript");
// 初始化请求
xhr.open("get", url, false);

// 参数添加
function addURLParam(url, name, value) {
  url += url.indexOf("? ") == -1 ? "? " : "&";
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
```

### 24.1.4 POST 请求

- 每个 POST 请求都应该在请求体中携带提交的数据

- POST 请求的请求体可以包含非常多的数据，而且数据可以是任意格式
  - Content-Type 要设置成对应格式，例如表单提交：Content-Type 头部设置为 "application/x-www-formurlencoded"
  - 通过 send 发送 `xhr.send(data)`

### 24.1.5 XMLHttpRequest Level 2

1、FormData 类型

使用 FormData 的另一个方便之处是不再需要给 XHR 对象显式设置任何请求头部了

```javascript
xhr.open("post", "timeout.php", true);
let data = new FormData(document.forms[0]);
data.append("name", "Nicholas");
xhr.send(data);
```

2、超时

```javascript
xhr.open("get", "timeout.php", true);
xhr.timeout = 1000; //设置1秒超时
xhr.ontimeout = function () {
  alert("Requestdidnotreturninasecond.");
};
xhr.send(null);
```

3、overrideMimeType()方法

强制让 XHR 把响应当成 XML 而不是纯文本来处理

```javascript
let xhr = new XMLHttpRequest();
xhr.open("get", "text.php", true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

### 24.2 进度事件

- loadstart：在接收到响应的第一个字节时触发。
- progress：在接收响应期间反复触发。
- error：在请求出错时触发。
- abort：在调用 abort()终止连接时触发。
- load：在成功接收完响应时触发。
- loadend：在通信完成时，且在 error、abort 或 load 之后触发。

### 24.2.1 load 事件

- 用于代替 readystatechange （ 包含 readystatechange 并且 readyState 为 4 时 ）

```javascript
let xhr = new XMLHttpRequest();
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Requestwasunsuccessful: " + xhr.status);
  }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);
```

### 24.2.2 progress 事件

- 在浏览器接收数据期间，这个事件会反复触发。
- onprogress 事件处理程序都会收到 event 对象，其 target 属性是 XHR 对象
- 且包含 3 个额外属性：
  - lengthComputable：是一个布尔值，表示进度信息是否可用
  - position：是接收到的字节数；
  - totalSize：是响应的 Content-Length 头部定义的总字节数
- open 之前添加事件

```javascript
let xhr = new XMLHttpRequest();
xhr.onload = function (event) {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
};
// 请求进度条
xhr.onprogress = function (event) {
  let divStatus = document.getElementById("status");
  if (event.lengthComputable) {
    divStatus.innerHTML =
      "Received " + event.position + " of " + event.totalSize + " bytes";
  }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);
```

### 24.3 跨源资源共享

CORS 这个安全限制可以防止某些恶意行为。不过，浏览器也需要支持合法跨源访问的能力。

请求在发送时会有一个额外的头部叫 Origin。Origin 头部包含发送请求的页面的源（协议、域名和端口），以便服务器确定是否为其提供响应。

```javascript
Origin: http://www.nczonline.net
```

服务器识别：如果请求拿到的 Orgin 符合自己的要求就提供响应

```shell
Access-Control-Allow-Origin: http://www.nczonline.net  # 或者如果资源是公开的，那么就把具体地址换成"*"
```

......

### 24.3.1 预检请求

OPTIONS 方法

- **CORS 预检**：在进行跨域 AJAX 请求前，浏览器自动发送 OPTIONS 请求，以验证请求是否被目标服务器许可。
- **API 探测**：客户端可以主动发送 OPTIONS 请求来检测服务器支持的功能，以便决定如何与服务器交互。
- **自动化测试**：测试工具或框架可能会使用 OPTIONS 请求来收集有关 API 的元数据。

......

### 24.4.1 图片探测

......

### 24.5 Fetch API

- Fetch API 能够执行 XMLHttpRequest 对象的所有任务
- XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步
- fetch()方法是暴露在全局作用域中

### 24.5.1 基本用法

```javascript
let r = fetch("/bar");
console.log(r); // Promise <pending> 所以可以使用await或then
```

```javascript
let r = fetch("http://localhost:8778/extend/formText?a=1");
console.log(r); // Promise <pending> 所以可以使用await或then

fetch("http://localhost:8778/extend/formText?a=1")
  .then((res) => {
    // 1.获取到res，是一个流，获取具体的结果，如果是json数据，就用json()
    console.log(res.status); // 响应状态码，服务器错误会走，then的第二个回调
    return res.text();
  })
  .then((data) => {
    console.log(data, "data");
  });

//------------------------------------------------
// 参数
async function getData() {
  const formData = new FormData();
  formData.append("name", "lzo");
  formData.append("age", 18);
  const response = await fetch("http://localhost:8778/extend/formText", {
    method: "post",
    body: formData,
  });

  // 获取response状态，ok == 200-299
  console.log(response.ok, response.status, response.statusText);
  const res = await response.text();
  console.log("res:", res);
}
getData();
```

### 24.5.2 常见 Fetch 请求模式

......



### 附：扩展

#### sse

请求连接成功后，服务器可以主动向客户端推送消息

- **技术实现**‌：SSE基于HTTP协议，利用了其长连接特性，通过浏览器向服务器发送一个HTTP请求，建立一条持久化的连接。
- **数据格式与通信方向**‌：SSE可以传输文本和二进制格式的数据，但只支持**单向数据流**，即只能由服务器向客户端推送数据。
- **连接状态与管理**‌：SSE的连接状态仅有三种：已连接、连接中、已断开。连接状态是**由浏览器自动维护的**，客户端无法手动关闭或重新打开连接。
- **兼容性与安全性**‌：SSE是**标准的Web API**，可以在大部分现代浏览器和移动设备上使用。但如果需要兼容老版本的浏览器，则需要使用polyfill库进行兼容。
  - SSE的**实现比较简单**，基于HTTP协议，与**普通的Web应用没有太大差异**，因此风险相对较低。
- ‌**应用场景**‌：如果仅需服务器推送事件给客户端，并且应用在Web环境中，SSE是一个简单易用的选择。

> SSE和WebSocket都有各自的优缺点，适用于不同的场景和需求。SSE因其简单易用、可靠性高和良好的兼容性，在需要服务器向客户端单向推送数据的场景中表现优异。而WebSocket则因其支持双向通信、低延迟和高并发性能，在需要实时性要求较高或需要客户端与服务器交互的应用中更为适用‌

客户端

```javascript
let sse = null;
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        // 按下回车键开始连接sse
        // sse = new EventSource("http://localhost:8778/study/api/sse");
        sse = new EventSource("http://192.168.203.132:8778/study/api/sse");
        showStatus();

        // sse 接收到消息
        sse.addEventListener("res", (e) => {
            console.log(e.data);
        });

        // 连接事件回调
        sse.onopen = function (event) {
            console.log("连接成功！", event);
            showStatus();
        };

        // 连接错误事件回调
        sse.onerror = function (event) {
            console.log("发生错误：", event);
        };

        // 关闭
        // setTimeout(() => {
        //     sse.close();
        //     showStatus();
        // }, 5000);
    }
});
function showStatus() {
    // readyState 监听sse连接状态
    if (sse.readyState === EventSource.CONNECTING) {
        console.log("正在连接服务器...");
    } else if (sse.readyState === EventSource.OPEN) {
        console.log("已经连接上服务器！");
    } else if (sse.readyState === EventSource.CLOSED) {
        console.log("连接已经关闭。");
    }
}
```

服务端：

```javascript
// sse 请求
const { PassThrough } = require('stream');
studyRouter.get('/api/sse', async (ctx, next) => {
	const stream = new PassThrough();
	ctx.response.set('content-type', 'text/event-stream'); // SSE 通信核心代码
	ctx.body = stream;
	setInterval(() => {
		stream.write(`event: res\n`); // 自定义客户端监听事件，可以定义多个，默认 message
		stream.write(`data: ${new Date()}\n\n`);
	}, 1000);
});
```

#### sendBeacon

> send bi肯，sendBeacon是一个浏览器提供的API，特别适用于在用户离开页面之前需要发送重要数据的情况，如统计分析、日志记录等。它的设计初衷是为了确保数据的可靠传输，即使在页面不再响应用户操作时也能完成数据的发送‌1。此外，sendBeacon的优先级较低，不会干扰其他高优先级的任务，如用户界面更新等，从而保证了数据的顺利发送‌

```javascript
// data 参数是将要发送的 ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData 或 URLSearchParams 类型的数据。
navigator.sendBeacon(url, data);
```





## 第 27 章 工作者线程

### 27.1 工作者线程简介

### 27.1.2 工作者线程的类型

Web工作者线程规范中定义了三种主要的工作者线程：（现代浏览器都支持这些工作者线程）

- 专用工作者线程：可以让脚本单独创建一个JavaScript线程，以执行委托的任务，只能被创建它的页面使用
- 共享工作者线程：专用的基础上，还可以被多个不同的上下文使用，包括不同的页面。
- 服务工作者线程：与专用共享完全不一样，它的主要用途是拦截、重定向和修改页面发出的请求，充当网络请求的仲裁者的角色。

### 27.1.3 WorkerGlobalScope

工作者线程内部，没有window的概念。这里的全局对象是WorkerGlobalScope的实例，通过**self**关键字暴露出来。

- 专用工作者线程：DedicatedWorkerGlobalScope
- 共享工作者线程：SharedWorkerGlobalScope
- 服务工作者线程：ServiceWorkerGlobalScope

各自的Global对象都是WorkerGlobalScope的子集

### 27.2 专用工作者线程

这个功能可以用来执行在页面线程之外的其他任务。主要用于**耗时计算**

这样的线程可以与父页面交换信息、发送网络请求、执行文件输入/输出、进行密集计算、处理大量数据，以及实现其他不适合在页面执行线程里做的任务（否则会导致页面响应迟钝）。

注意事项：

- new Worker 里必须从网络引用同源文件

- 不能使用DOM相关操作
- 主线程的方法，DOM节点这些是无法通过postMessage传递到子线程的
- 模块引入：
  - importScripts("模块地址")  必须是网络地址，但是这边可以跨域，引入第三方CDN什么的（不支持ES6语法模块）
  - 使用ES6，new Worker("地址",{type:"module"}) 需要配置一下，子线程就能通过 import 引入ES6模块了



......books有案例
