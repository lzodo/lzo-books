/**
 * 前面的写法不想一个整体，构造函数的使用，定义prototype方法等 这些都是在同一个作用域中的
 */

var Book = (function () {
  // 定一个静态私有属性
  var a = 1;
  // 定义一个静态私有方法
  function b() {
    console.log(a);
  }

  function _book(id, bookname, price) {
    this.id = id;
    this.bookname = bookname;
    this.price = price;
    this.copy = function () {}; // 每次new 都会复制一份
  }

  _book.prototype.display = function () {
    console.log("展示这本书");
    a++;
    b();
  };

  _book.staticFun = function () {
    console.log("调用静态方法");
  };

  return _book;
})();

var book = new Book(10, "javascript 设计模式", 50);
console.log(book.bookname);
Book.staticFun();
