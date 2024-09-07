const target = {
  foo: "bar",
};
// 捕获器：get、set、has、delete
const handler = {
  // 接收目标对象、要查询的属性、代理对象三个参数
  get(trapTarget, property, receiver) {
    console.log(trapTarget == target); // true
    console.log(proxy == receiver); // true
    console.log(trapTarget, property, receiver, "参数");

    // return trapTarget[property] + "拦截加工返回"; // get 需要用户编写trapTarget[property] 需要指定对应入参，和get捕获器的默认行为
    // Reflect 封装了所有捕获器的同名方法
    return Reflect.get(...arguments) + "拦截加工返回"; // 通过反射器几不用去写 trapTarget[property] 了
  },
  set() {
    console.log("set");
    // return (trapTarget[property] = value);
    return Reflect.set(...arguments);
  },
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
proxy.foo = 100;
console.log(proxy.foo); // bar
console.log(target.foo); // bar
