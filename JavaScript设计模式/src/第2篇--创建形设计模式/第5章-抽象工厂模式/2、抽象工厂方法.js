/**
 * 抽象工厂方法
 * @param {*} subType  子类
 * @param {*} superType  父类
 */
var VehicleFactor = function (subType, superType) {
  // 抽象工厂中是否有指定父类
  if (typeof VehicleFactor[superType] === "function") {
    // 缓存类
    function F() {}
    // 继承父抽象类的属性和方法
    F.prototype = new VehicleFactor[superType]();
    // 将子类的constructor修正指向自己
    subType.constructor = subType;
    // 子类原型继承父类
    subType.prototype = new F();
  } else {
    return new Error("为创建该抽象类");
  }
};

//todo superType 小汽车
VehicleFactor.Car = function () {
  this.type = "car";
  this.list = [1, 2, 3, 4, 5];
};
VehicleFactor.Car.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function () {
    return new Error("抽象方法不能调用");
  },
  height: 100,
  books: [1, 2, 3],
};

//todo superType 公交车
VehicleFactor.Bus = function () {
  this.type = "bus";
};
VehicleFactor.Bus.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function () {
    return new Error("抽象方法不能调用");
  },
};

//todo superType 货车
VehicleFactor.Truck = function () {
  this.type = "truck";
};
VehicleFactor.Truck.prototype = {
  getPrice: function () {
    return new Error("抽象方法不能调用");
  },
  getSpeed: function () {
    return new Error("抽象方法不能调用");
  },
};

//todo 使用
function BMW(price, speed) {
  // VehicleFactor.Car.call(this);
  this.price = price;
  this.speed = speed;
}
// 调用好后 BMW 就已经继承好了Car的基本属性
VehicleFactor(BMW, "Car");
BMW.prototype.getPrice = function () {
  return this.price;
};
BMW.prototype.getSpeed = function () {
  return this.speed;
};

var bm = new BMW(100, 200);
var bm2 = new BMW(1003, 2001);

bm2.list.push(888);
bm2.books.push(4);
console.log(bm.list); //! 继承的属性中，还是会值类型被复制，引用类型被共用
console.log(bm2.list);
console.log(bm.getPrice());
console.log(bm.height);
console.log(bm.books);
