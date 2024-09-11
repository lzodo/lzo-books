self.addEventListener("message", (e) => {
  console.log(e.data, "内部收到外部消息");
});

let worker1_1 = new Worker("./worker1-1.js");
worker1_1.onmessage = (e) => {
  //   console.log(e.data);
  self.postMessage("worker1 执行完毕");
};
