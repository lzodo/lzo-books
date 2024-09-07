/**
 * 数据适配器：数据结构转换
 */

// 数值数据，代表含义各不相同
let arr = ["javascript", "book", "前端编程", "1月2号"];

function arrToObjter(arr) {
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    date: arr[3],
  };
}

// 将一个数组转为对象
let obj = arrToObjter(arr);
console.log(obj);
