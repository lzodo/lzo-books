/**
 * ! 本质就是创建一个方法，传入不同值，通过不同值，进行不同的操作，返回不同的结果
 * 简单工厂模式（静态工厂方法）：由一个工厂对象决定某一种产品对象类的实例，主要以用来创建同一类对象
 */

// todo 类1
var LoginAlert = function (text) {
  this.content = text;
};
LoginAlert.prototype.show = function () {
  console.log("普通弹窗:", this.content);
};

var userNameAlert = new LoginAlert("用户名长度不能大于16");
userNameAlert.show();

// todo 类2
var LoginConfirm = function (text) {
  this.content = text;
};
LoginConfirm.prototype.show = function () {
  console.log("确认弹窗:", this.content);
};

var userNameConfirm = new LoginConfirm("请输入用户名");
userNameConfirm.show();

// todo 类3
var LoginPrompt = function (text) {
  this.content = text;
};
LoginPrompt.prototype.show = function () {
  console.log("提示弹窗:", this.content);
};

var userNamePrompt = new LoginPrompt("登录成功");
userNamePrompt.show();

// todo 创建工厂对象，用法一，通过不同的标识创建不同的实例
function PopFactory(name, text) {
  switch (name) {
    case "alert":
      return new LoginAlert(text);
    case "confirm":
      return new LoginConfirm(text);
    case "prompt":
      return new LoginPrompt(text);
  }
}
let gc1 = PopFactory("alert", "用户名长度不能大于16 工厂");
let gc2 = PopFactory("confirm", "请输入用户名 工厂");
let gc3 = PopFactory("prompt", "登录成功 工厂");
gc1.show();
gc2.show();
gc3.show();
