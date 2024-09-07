/**
 * 参数适配器：当函数参数太多往往会出现遗漏的情况
 */

// 不好维护
function doSomeThing(name, title, age, color, size) {}

function doSomeThing2(obj) {
  /**
   * obj.name,
   * obj.title,
   * obj.age,
   * obj.color,
   * obj.size
   */
  let _obj = {
    name: "",
    title: "",
    age: "",
    color: "red",
    size: "",
  };
  let params = Object.assign(_obj, obj);

  // 内部定义一个模板对象，在将用户传入的进行覆盖，如果没写则使用模板中默认的
  console.log(params);
}

doSomeThing2({ title: "test in", name: "lzo", color: "green" });
