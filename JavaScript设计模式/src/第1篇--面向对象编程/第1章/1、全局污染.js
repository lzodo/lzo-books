/**
 * 全局函数都是一个全局变量，容易造成全局污染
 */

function checkName() {
  console.log("验证姓名");
}
function checkEmail() {
  console.log("验证邮箱");
}

// 相当于
// var checkName = function () {};
// var checkEmail = function () {};
