//todo 创建一个小型代码块
var A = (function () {
  // 私有静态方法
  var conf = {
    MAX_VALUE: 100, // 编程语言静态变量一般都写成大写，js尊重他们也最好用大写
    COUNT: 1000,
  };

  // 返回取值器对象
  return {
    // 取值器方法
    Util: {
      util_method1: function () {
        console.log("Util.util_method1");
      },
      util_method2: function () {
        console.log("Util.util_method2");
      },
    },
    Tool: {
      tool_method1: function () {
        console.log("Tool.tool_method1", conf.MAX_VALUE);
      },
      tool_method2: function () {
        console.log("Tool.tool_method2", conf.MAX_VALUE);
      },
      get_val: function (key) {
        return conf[key] ? conf[key] : "null";
      },
    },
  };
})();
A.Tool.tool_method1();
A.Tool.tool_method2();
console.log(A.Tool.get_val("MAX_VALUE"));
