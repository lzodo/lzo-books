/**
 * 1、将很多全局污染变为单个，问题是如果覆盖了CheckObject那么里面所有方法也会覆盖
 * 只能自己用，无法赋值
 */

var CheckObject = {
  checkName: function () {
    console.log("验证姓名");
  },
  checkEmail: function () {
    console.log("验证邮箱");
  },
};
CheckObject.checkName();

/**
 *  2、转成构造函数， 相当于静态方法，new的时候不在示例上,只能通过构造函数名使用
 */
var CheckObject2 = function () {};
CheckObject2.checkName = function () {
  console.log("验证姓名2");
};
CheckObject2.checkEmail = function () {
  console.log("验证邮箱2");
};
CheckObject2.checkName();

/**
 * 3、简单进行赋值
 * 不是真正意义上的类，实例c3（返回出的对象）与CheckObject3完全无关
 */

var CheckObject3 = function () {
  return {
    checkName: function () {
      console.log("验证姓名3");
    },
    checkEmail: function () {
      console.log("验证邮箱3");
    },
  };
};
var c3 = CheckObject3();
c3.checkName();

/**
 * 4、转为类的写法
 * 每次new都会复制一次构造函数内的方法，不好
 */

var CheckObject4 = function () {
  this.checkName = function () {
    console.log("验证姓名4");
  };
  this.checkEmail = function () {
    console.log("验证邮箱4");
  };
};

var c4 = new CheckObject4();
c4.checkName();

/**
 * 5、优化方法，通过依赖prototype原型依次查找
 *
 */

var CheckObject5 = function () {};
CheckObject5.prototype.checkName = function () {
  console.log("验证姓名5");
};
CheckObject5.prototype.checkEmail = function () {
  console.log("验证邮箱5");
};

var c5 = new CheckObject5();
c5.checkName();

/**
 * 6、转为类的写法
 * 添加链式调用功能，方法中返回this
 */

var CheckObject6 = function () {};
CheckObject6.prototype.checkName = function () {
  console.log("验证姓名6");
  return this;
};
CheckObject6.prototype.checkEmail = function () {
  console.log("验证邮箱6");
  return this;
};

var c6 = new CheckObject6();
c6.checkName().checkEmail();
