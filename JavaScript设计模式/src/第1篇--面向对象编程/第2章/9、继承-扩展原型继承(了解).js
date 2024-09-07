/**
 * 声明一个过度函数，数据赋值给这个过度函数的prototype，每次new这个过度函数就行
 */

function inheritObject(o) {
  // 创建定一个过度对象
  function F() {}
  // 过度对象原型继承对象
  F.prototype = o;
  return new F();
}

// 创建一个被继承的对象
var book = {
  name: "js",
  alikBook: ["html book", "html book"],
};

// 直接使用
// var newBook = inheritObject(book);
// var newBook2 = inheritObject(book);
// console.log(newBook.alikBook);
// newBook2.alikBook.push("test");
// console.log(newBook.alikBook); //! 这时虽然实现了继承，但是实例间会相互影响,

// 寄生式继承
function createBook(obj) {
  // 通过原型创建新对象
  var o = new inheritObject(obj);
  // 可扩展新对象
  o.getName = function () {
    // console.log(name);
    return o.name;
  };
  // 返回新对象
  return o;
}
var newBook3 = createBook(book);
var newBook4 = createBook(book);
console.log(newBook3.alikBook);
newBook4.alikBook.push("test book");
console.log(newBook3.alikBook);
console.log(newBook3.getName());

//？ 有空再研究
