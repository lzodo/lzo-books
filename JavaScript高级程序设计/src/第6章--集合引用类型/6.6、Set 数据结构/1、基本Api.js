// 使用数组初始化集合
const s1 = new Set(["val1", "val2", "val3", "val2"]);
console.log(s1); // { 'val1', 'val2', 'val3' }
console.log(s1.size); // 3
console.log([...s1]); // 得到一个去重的数组
console.log(s1.keys()); // { 'val1', 'val2', 'val3' } keys 和 values 是一样的
console.log(s1.values());
console.log(s1.entries());
s1.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1-> val1
// val2-> val2
// val3-> val3
[...s1].forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1-> 0
// val2-> 1
// val3-> 2

console.log("=============================s1========================");

const s = new Set();
const functionKey = function () {};
let objectVal = new Object();

console.log(s);

console.log(s.has("Matt")); // false
console.log(s.size); // 0
s.add("Matt").add("Frisbie");
console.log(s.has("Matt")); // true
console.log(s.size); // 2
console.log(s.delete("Matt"), "s.delete"); // delete()返回一个布尔值
console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // true
console.log(s.size); // 1
s.add(functionKey);
s.add(objectVal);
s.clear(); // 销毁集合实例中的所有值
console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // false
console.log(s.size); // 0
