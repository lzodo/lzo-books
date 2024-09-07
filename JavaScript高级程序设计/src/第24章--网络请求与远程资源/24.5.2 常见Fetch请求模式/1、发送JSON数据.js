let payload = JSON.stringify({
  foo: "bar",
});
let jsonHeaders = new Headers({
  "Content-Type": "application/json",
});

fetch("http://localhost:8778/extend/formText", {
  method: "POST", // 发送请求体时必须使用一种HTTP方法
  body: payload,
  headers: jsonHeaders,
})
  .then((res) => res.text())
  .then((res) => {
    console.log(res);
  });
