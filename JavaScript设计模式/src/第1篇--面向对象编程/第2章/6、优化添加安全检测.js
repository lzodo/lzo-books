/**
 * 不重要：防止使用者创建实例时忘了new关键字，而直接称为执行行数
 */

var Book = (function () {
  // 定一个静态私有属性
  var a = 1;
  // 定义一个静态私有方法
  function b() {
    console.log(a);
  }

  function _book(id, bookname, price) {
    // 加一个判断
    if (this instanceof Book) {
      this.id = id;
      this.bookname = bookname;
      this.price = price;
      this.copy = function () {}; // 每次new 都会复制一份
    } else {
      // 如果没new关键字就会走这里
      return new Book(id, bookname, price);
    }
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

var book = Book(10, "javascript 设计模式", 50);
console.log(book.bookname);
Book.staticFun();
