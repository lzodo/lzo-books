/**
 *  创建一个新的对象
 *  继承父类原型上的方法.
 *  添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
 *  如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
 */

function myNew(fn, ...arr) {
  var obj = {};
  //   obj.__proto__ = fn.prototype;  // 用这个不好
  obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...arr);

  return typeof res == "object" ? res : obj;
}

var Book = function (id, bookname, price) {
  this.id = id;
  this.bookname = bookname;
  this.price = price;
};
Book.prototype.display = function () {
  console.log("展示这本书");
};

// myNew(Book, 10, "javascript 设计模式", 50);
var op = myNew(Book, 10, "javascript 设计模式", 50);
console.log(op.id);
console.log(op.bookname);
console.log(op.price);
op.display();
