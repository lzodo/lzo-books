function fb(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return fb(n - 1) + fb(n - 2);
}
console.time("fb执行时间2");
var result = fb(43);
console.timeEnd("fb执行时间2");
self.postMessage("worker2 执行完毕");
