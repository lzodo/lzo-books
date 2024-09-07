Object.prototype[Symbol.iterator] = function () {
  const entries = Object.entries(this);
  let index = 0;

  // 这个返回的才是迭代器
  const iterator = {
    next: function () {
      if (index < entries.length) {
        return { done: false, value: entries[index++] };
      } else {
        return { done: true };
      }
    },
  };

  return iterator;
};

let obj = new Object({ a: 1, b: 2 });
let iter = obj[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: entries[index++] }

console.log(Array.from(obj)); // [ [ 'a', 1 ], [ 'b', 2 ] ] 这个值是设置迭代器是个性化设置的

for (const item of obj) {
  console.log(item);
}
