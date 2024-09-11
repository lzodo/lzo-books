let payload = "foo=bar&baz=qux";
let paramHeaders = new Headers({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
});
fetch("http://localhost:8778/extend/formText", {
  method: "POST", // 发送请求体时必须使用一种HTTP方法
  body: payload,
  headers: paramHeaders,
})
  .then((res) => res.text())
  .then((res) => {
    console.log(res);
  });
