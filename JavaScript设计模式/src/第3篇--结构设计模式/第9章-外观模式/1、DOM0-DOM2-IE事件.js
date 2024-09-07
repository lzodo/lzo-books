/**
 * 补充知识点：
 *      DOM0:给一个对象.事件处理程序属性=赋值方法(btn.onclick=function(){})
 *           这个方法会被视为元素方法，会在btn这个元素中运行，this为btn
 *           通过 btn.onclick = null 清除
 * !         注意：别人如果对同一个元素设置onclick事件，那么会被覆盖
 *
 *      DOM2
 *          提供了添加（addEventListener）与删除（removeEventListener）两个方法
 *          多个相同事件会依次执行
 *          如果希望删除，那么不能事宜匿名函数，删除的时候传入某个事件对应的函数名
 *
 *      IE事件处理程序（IE9以下）
 *          提供了添加（attachEvent）与删除（deatchEvent）
 *          可以添加多个会依次执行
 *          事件名需要加上on
 * !        内部的this不是元素，是window
 */

//todo DOM2事件处理程序
let btn = document.getElementById("myBtn");
function HelloWord() {
  console.log("HelloWord");
}
btn.addEventListener(
  "click",
  () => {
    console.log(this.id);
  },
  false
);
btn.addEventListener("click", HelloWord, false);
btn.removeEventListener("click", HelloWord);

//todo IE事件处理程序
btn.attachEvent("onclick", function () {
  console.log("Clicked");
});
