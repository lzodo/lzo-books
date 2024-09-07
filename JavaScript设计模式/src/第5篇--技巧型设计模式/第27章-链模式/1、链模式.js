/**
 * 链模式：通过在对象方法中将单前对象返回，实现同一个对象多个方法的链式调用，实现对该对象的多次引用
 */

function A(selector) {
  //   if (this instanceof A) {
  //     return this.init(selector);
  //   } else {
  //     return new A(selector).init(selector);
  //   }
  return new A.fn.init(selector);
}

A.fn = A.prototype = {
  constructor: A,
  init: function (selector) {
    if (/^\./.test(selector)) {
      this[0] = document.querySelectorAll(selector);
      this.length = this[0].length;
      return this;
    } else if (/^\#/.test(selector)) {
      this[0] = document.getElementById(selector.replace(/^\#/, ""));
      this.length = 1;
      return this;
    }
  },
  size: function () {
    return this.length;
  },
  filter: function (value) {
    this[0] = [...this[0]].filter((item) => item.value == String(value));
    return this;
  },
  css: function (styles) {
    this[0].forEach((item) => {
      for (const key in styles || {}) {
        item.style[key] = styles[key];
      }
    });
    return this;
  },
};

// 扩展
A.extend = A.fn.extend = function () {};

// new的是init 防止size方法丢失
A.fn.init.prototype = A.fn;
