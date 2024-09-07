const m1 = new Map([["key1", "val1"]]); // 接收一个迭代器对象
console.log(m1.size); // 2

// 使用自定义迭代器初始化映射
const m2 = new Map({
  [Symbol.iterator]: function* () {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
    yield ["key1", "val覆盖"];
  },
});
console.log(m2); // { 'key1' => 'val覆盖', 'key2' => 'val2', 'key3' => 'val3' }
console.log(m2.size); // 3
console.log(m2.has("key4")); // 是否存在key4
m2.set("key4", "通过set添加的属性").set("key5", "val5"); // 添加key4,key5
console.log(m2.get("key4")); // 获取key4
m2.delete("key4");
console.log(m2);
m2.clear(); // 清除所有
console.log(m2); // {}

// 与Object不同，Map可以使用任何数据类型作为键值
const functionKey = function () {};
const symbolKey = Symbol();
let objectKey = new Object();
let objectVal = new Object();
m2.set(functionKey, "functionValue");
m2.set(symbolKey, "symbolValue");
m2.set(objectKey, objectVal);
m2.set(null, "null");
m2.set(NaN, "NaN");
m2.set(undefined, "undefined");

objectVal.addtest = "添加属性";
console.log(m2.get(objectKey)); // { addtest: '添加属性' }
objectKey = null;
console.log(m2.get(objectKey)); // null
console.log(m2.get(null)); // null
console.log(m2.get(NaN)); // NaN
console.log(m2); // NaN
m2.clear(); // 清除所有
