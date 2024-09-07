/**
 * ++i: 先自增再运算
 * i++: 先运算再自增一个单位
 *
 * 同一次运算表达式进行运算，不在一次运算表达式，后面再使用，那么其实他们的效果是一样的
 */

let i = 10;

console.log(i++); // 10
console.log(++i); // 12
i++;
console.log(i); // 12

//
var a = 1;
var b;
var sum = (b = a++ + --a) + a-- + b++;
console.log(a, b, sum); // 0 3 5

//todo 1.1.6
