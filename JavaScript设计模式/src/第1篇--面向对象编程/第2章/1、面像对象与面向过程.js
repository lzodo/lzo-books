/**
 * 1、面向过程写好的方法不能轻易修改，不利于维护(通过面向对象比人用的时候可以继承你的类，当需要修改的时候可以进行重写)
 * 2、js面向对象模仿强类型语言class的封装方式，js可以通过一些特性模仿实现      ----也带来了极高的灵活性，代码更加自由
 * 3、函数内部自带一个指向当前这个对象的变量this，js通过this给函数（或通过函数的prototype）添加属性或方法来实现一个类的功能
 */

// 规定俗成首字母大写
var Book = function (id, bookname, price) {
  this.id = id;
  this.bookname = bookname;
  this.price = price;
  this.copy = function () {}; // 每次new 都会复制一份
};

// 与new无关，只要是Book的实例都能通过原型链访问到
Book.prototype.display = function () {
  console.log("展示这本书");
};

var book = new Book(10, "javascript 设计模式", 50);
console.log(book.bookname);

/**
 * 1、每个函数都有一个原型对象，该原型对象有一个constructor属性，指向创建对象的函数本身
 * 2、实例的constructor 总指向他的构造函数(用作判断数据类型不适合判断null 和 undefined)
 * 3、Book.prototype.constructor 的指向是可以被修改的
 */

console.log(Book.prototype.constructor, 1); // [Function: Book]
console.log(book.constructor, 2); // [Function: Book]
Book.prototype.constructor = Function;
console.log(Book.prototype.constructor, 3); // [Function: Function]
