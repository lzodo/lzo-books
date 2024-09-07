class Person {
  constructor() {
    this.nicknames = { a: 1, b: 2 };
  }
  [Symbol.iterator]() {
    let entries = Object.entries(this.nicknames); // 要迭代出什么内容看具体需求
    let index = 0;
    return {
      next() {
        if (index < entries.length) {
          return { done: false, value: entries[index++] };
        } else {
          return { done: true };
        }
      },
    };
  }
}
let p = new Person();
for (let item of p) {
  console.log(item);
}
// [ 'a', 1 ]
// [ 'b', 2 ]
