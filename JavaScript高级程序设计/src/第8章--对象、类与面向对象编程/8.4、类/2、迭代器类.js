class Person {
  constructor() {
    this.nicknames = ["Jack", "Jake", "J-Dog"];
  }
  [Symbol.iterator]() {
    return this.nicknames.entries(); // 因为数值默认是迭代器对象
  }
}
let p = new Person();
for (let [idx, nickname] of p) {
  console.log(nickname);
}
// Jack
// Jake
// J-Dog
