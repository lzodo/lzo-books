// todo 有时候单例需要延迟创建
var A = (function () {
  // 私有静态方法
  var conf = {
    MAX_VALUE: 100, // 编程语言静态变量一般都写成大写，js尊重他们也最好用大写
    COUNT: 1000,
  };

  // 返回一个方法，只有用户调用的时候才创建
  return function () {
    return {
      Tool: {
        get_val: function (key) {
          return conf[key] ? conf[key] : "null";
        },
      },
    };
  };
})();

setTimeout(() => {
  console.log(A().Tool.get_val("MAX_VALUE"));
}, 1000);
