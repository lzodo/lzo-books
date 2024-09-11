let obj = {
  a: 1,
  b: "str",
  c: null,
  d: undefined, // json不包含
  e: {
    a: 1,
    b: 2,
  },
  f: [1, 2, 3, "4"],
  g: function () {},
  toJSON: function () {
    // 用不来
    return this.a;
  },
};

console.log(JSON.stringify(obj));
