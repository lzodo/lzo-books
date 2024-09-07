class Person {
  constructor(age) {
    this.age = age;
    // 构造函数中的方法
    this.locate = () => console.log("instance");
  }
  // Person.prototype.locate 原型上的方法
  locate() {
    console.log("prototype");
  }

  // Person.create 静态方法
  static create(age) {
    return new Person(age);
  }

  // 和普通对象一样设置访问器
  set name(newName) {
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
let p = new Person(18);
p.locate(); // instance
Person.prototype.locate(); // prototype
p.name = "lzo";
console.log(p.name);
// -------------------------------------------------
let p2 = Person.create(20);
p2.locate();
