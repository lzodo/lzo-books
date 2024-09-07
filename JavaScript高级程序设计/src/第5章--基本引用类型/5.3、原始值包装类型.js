// let s1 = "some text";
// let s2 = s1.substring(2);
// console.log(s1, s2);

let s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined

let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count); // 2
count = colors.push("black"); // 再推入一项
console.log(count); // 3
let item = colors.pop(); // 取得最后一项
console.log(item); // black
console.log(colors.length); // 2
