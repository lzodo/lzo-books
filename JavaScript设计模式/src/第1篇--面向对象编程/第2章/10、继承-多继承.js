/**
 *  类中一般包含三部分
 *     构造函数中的属性方法
 *     点出来的静态方法
 *     prototype中的方法
 *
 *  所以继承也要分别继承这三部分才行
 */

// --------------声明父类1
function SuperClass(id) {
  this.id = id;
  this.superValue = "superValue";
  this.books = ["javascript", "vue", "react"];
}
SuperClass.prototype.getSuperValue = function () {
  return this.superValue;
};

// --------------声明父类2
function SuperClass2(id) {
  this.id = id;
  this.superValue2 = "superValue2";
  this.books = ["javascript", "vue", "react", "c2 books"];
}
SuperClass2.prototype.getSuper2Value = function () {
  return this.superValue2;
};

// --------------声明子类
function SubClass(id) {
  //todo 继承 构造函数 部分
  SuperClass.call(this, id);
  SuperClass2.call(this, id);

  this.subValue = false;
}

//todo 继承 prototype 部分
//todo SubClass.prototype = new SuperClass(); 这样也可以，但是这边也会执行异常构造函数，无效的结果，会被call覆盖
//todo SubClass.prototype = Object.create(SuperClass.prototype);
// 自己实现一个方法传入多个父类遍历，在家再将每个属性一个个的赋值过去
// 后面的会覆盖前面的
SubClass.prototype = (function () {
  var obj = {};
  for (let i = 0; i < arguments.length; i++) {
    const item = arguments[i];
    for (const key in item) {
      obj[key] = item[key];
    }
  }
  return obj;
})(SuperClass.prototype, SuperClass2.prototype);

SubClass.prototype.constructor = SubClass; //! 修正一下constructor
SubClass.prototype.getSubValue = function () {
  return this.subValue;
};

var instance = new SubClass(50);
var instance2 = new SubClass(100);
console.log(instance.books);
instance2.books.push("new book");
instance2.getSuperValue = function () {};

console.log(instance.books);
console.log(instance.getSuperValue());
console.log(instance.getSuper2Value());
console.log(instance.id);
console.log(instance.books);

// instanceof
console.log(instance instanceof SubClass); // true
console.log(instance instanceof SuperClass); // false
console.log(instance instanceof SuperClass2); // false
console.log(instance instanceof Object); // true
