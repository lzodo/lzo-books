/**
 * 1、私有属性方法（Js有函数级别作用域，内部的变量和方法外部无法访问，可通过此特性实现）
 * 2、共有属性方法（函数中通过this添加的属性和方法，和prototype的属性方法，外部是可以访问到的，所有可以实现共有属性和共有方法）
 * 3、特权方法（也是this添加方法既可以访问私有属性方法，又可以范围共有属性方法）
 * 4、保护方法
 * 5、静态方法（通过构造函数直接点出来的属性和方法）
 */

var Book = function (id, bookname, price) {
  // new 的时候会执行，所有这里的属性方法可以直接通过实例来访问
  var num = 10; // 私有
  this.id = id;
  this.bookname = bookname;
  this.price = price;
  this.copy = function () {}; // 每次new 都会复制一份
};

// 静态共有属性方法：new 的时候不会执行到，外面不能通过实例使用，只能通过 Book.staticFun 来使用
Book.staticFun = function () {
  console.log("调用静态方法");
};
