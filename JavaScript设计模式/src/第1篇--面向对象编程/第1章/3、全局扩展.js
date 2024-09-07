/**
 * 1、类似 prototype.js 框架对原生对象（Function，Array，Object，...）进行扩展
 * 我们项目中直接扩展是不好的，别人创建的也会被你的污染
 */

Function.prototype.checkEmail = function () {
  console.log("验证邮箱");
};

let f = function () {};
f.checkEmail();
let f2 = new Function();
f2.checkEmail();

/**
 * 2、可以考虑在全局添加一个扩展的接口(普通方法使用)
 * 这样就能在自己新实例中添加，影响不到别人
 */

Function.prototype.addMethod = function (name, fn) {
  this[name] = fn; // 这里直接加到M2上了，类似静态方法
  return this; // 链式调用 addMethod 方法
};

let M2 = function () {};
M2.addMethod("checkEmail", function () {
  console.log("验证邮箱2");
  return this; // 给 checkEmail 可以进行链式调用
});

M2.addMethod("checkName", function () {
  console.log("验证姓名2");
  return this; // 给 checkName 可以进行链式调用
});

M2.checkName().checkEmail();

/**
 * 3、可以考虑在全局添加一个扩展的接口(类使用)
 * 这样就能在自己新实例中添加，影响不到别人
 */

Function.prototype.addMethod = function (name, fn) {
  this.prototype[name] = fn;
  return this; // 链式调用 addMethod 方法
};

let M3 = function () {};
M3.addMethod("checkEmail", function () {
  console.log("验证邮箱3");
  return this; // 给 checkEmail 可以进行链式调用
});

M3.addMethod("checkName", function () {
  console.log("验证姓名3");
  return this; // 给 checkName 可以进行链式调用
});

let m3 = new M3();
m3.checkName().checkEmail();
