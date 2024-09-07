function* generatorFn() {
  yield "foo";
  yield "bar";
  // return "baz";
}

// 生成器的使用需要先得到一个对象，通过调用next(),就会执行到yield的地方停止，直到遇到return done为true
let generatorObject = generatorFn();
console.log(generatorObject.next()); //{done: false, value: 'foo'}
console.log(generatorObject.next()); //{done: false, value: 'bar'}
console.log(generatorObject.next()); // { done: true, value: 'baz' }
