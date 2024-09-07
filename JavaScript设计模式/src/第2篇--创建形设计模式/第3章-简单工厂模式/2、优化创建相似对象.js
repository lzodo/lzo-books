/**
 * 优化
 */

// todo 创建工厂对象，用法一，通过不同的标识创建不同的实例
function PopFactory(name, text) {
  // 创建一个对象，并对对象扩展属性和方法
  var o = new Object();
  o.content = text;

  switch (name) {
    case "alert":
      o.show = function () {
        console.log("普通弹窗:", this.content);
      };
      break;
    case "confirm":
      o.show = function () {
        console.log("确认弹窗:", this.content);
      };
      break;
    case "prompt":
      o.show = function () {
        console.log("提示弹窗:", this.content);
      };
      break;
  }
  return o;
}
let gc1 = PopFactory("alert", "用户名长度不能大于16 工厂");
let gc2 = PopFactory("confirm", "请输入用户名 工厂");
let gc3 = PopFactory("prompt", "登录成功 工厂");
gc1.show();
gc2.show();
gc3.show();
