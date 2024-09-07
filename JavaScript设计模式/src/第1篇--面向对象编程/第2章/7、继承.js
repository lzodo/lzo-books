/**
 *  类中一般包含三部分
 *     构造函数中的属性方法
 *     点出来的静态方法
 *     prototype中的方法
 *
 *  所以继承也要分别继承这三部分才行
 *
 *  举个不好的例子：
 */

// 声明父类
function SuperClass() {
  this.superValue = true;
  this.books = ["javascript", "vue", "react"];
}
SuperClass.prototype.getSuperValue = function () {
  return this.superValue;
};

// 声明子类
function SubClass() {
  this.subValue = false;
}

//! 继承代码 new SuperClass();
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubValue = function () {
  return this.subValue;
};

var instance = new SubClass();
var instance2 = new SubClass();
console.log(instance.books);
instance2.books.push("new book");
console.log(instance.books); //! 这时虽然实现了继承，但是实例间会相互影响,

// instanceof 运算符可以用于判断前面对象是否是后面对象（包括后面对象院系原型链上的构造函数）的实例
console.log(instance instanceof SubClass);
console.log(instance instanceof SuperClass);
console.log(instance instanceof Object);
