/**
 *  类中一般包含三部分
 *     构造函数中的属性方法
 *     点出来的静态方法
 *     prototype中的方法
 *
 *  所以继承也要分别继承这三部分才行
 */

// 声明父类
function SuperClass(id) {
  this.id = id;
  this.superValue = "superValue";
  this.books = ["javascript", "vue", "react"];
}
SuperClass.prototype.getSuperValue = function () {
  return this.superValue;
};

// 声明子类
function SubClass(id) {
  //todo 继承 构造函数 部分
  SuperClass.call(this, id);

  this.subValue = false;
}

//todo 继承 prototype 部分
//todo SubClass.prototype = new SuperClass(); 这样也可以，但是这边也会执行异常构造函数，无效的结果，会被call覆盖
SubClass.prototype = Object.create(SuperClass.prototype);
SubClass.prototype.constructor = SubClass; //! 修正一下constructor

SubClass.prototype.getSubValue = function () {
  return this.subValue;
};

var instance = new SubClass();
var instance2 = new SubClass();
console.log(instance.books);
instance2.books.push("new book");
instance2.getSuperValue = function () {};

console.log(instance.books);
console.log(instance.getSuperValue());

// instanceof 运算符可以用于判断前面对象是否是后面对象（包括后面对象院系原型链上的构造函数）的实例
console.log(instance instanceof SubClass);
console.log(instance instanceof SuperClass);
console.log(instance instanceof Object);
console.log(instance.constructor);

// 子类不是父类的实例，子类的原型却是父类的实例 //! 可能是个问题 （寄生式继承解决）
console.log(SubClass instanceof SuperClass); // false
console.log(SubClass.prototype instanceof SuperClass); // true
