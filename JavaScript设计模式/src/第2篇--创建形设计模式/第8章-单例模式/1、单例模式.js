/**
 * 单例模式（单体模式）：只允许实例化一次的对象类
 *                     提供一个命名空间，因为外部变量太多很容易被覆盖，所有加个命名空间，通过 lzo.xxx 去使用哪个变量
 *                     还可以通过单例模式管理代码块的各个模块
 */

//todo 创建一个小型代码块
var A = {
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
      console.log("Tool.tool_method1");
    },
    tool_method2: function () {
      console.log("Tool.tool_method2");
    },
  },
};
A.Tool.tool_method1();
A.Tool.tool_method2();
