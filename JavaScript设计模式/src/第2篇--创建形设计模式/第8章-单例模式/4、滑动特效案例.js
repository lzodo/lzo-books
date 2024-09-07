// todo 有时候单例需要延迟创建
var A = (function () {
  // 私有静态方法
  var conf = {};

  return {
    g: function (id) {
      return document.getElementById(id);
    },
    css: function (id, key, value) {
      console.log(this.g);

      this.g(id).style[key] = value;
    },
    attr: function (id, key, value) {
      this.g(id)[key] = value;
    },
    html: function (id, value) {
      this.g(id).innerHTML = value;
    },
    on: function (id, type, fn) {
      this.g(id)["on" + type] = fn;
    },
  };
})();

A.css("id", "key", "value");
