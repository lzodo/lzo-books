// 使用自定义迭代器初始化映射
let obj1 = {};
let obj2 = {};
let obj3 = {};
let obj4 = {};
const m2 = new WeakMap([
  [obj1, "val1"],
  [obj2, "val2"],
  [obj3, "val3"],
]);
console.log(m2);
console.log(m2.has(obj4)); // false 是否存在key4
m2.set(obj4, "通过set添加的属性"); // 添加key4
console.log(m2.has(obj4)); // true 是否存在key4
console.log(m2.get(obj4)); // 通过set添加的属性
m2.delete(obj4);
console.log(m2);
// m2.clear(); // 清除所有
console.log(m2); // {}

// 没有size、没有clear()
