let xhr = new XMLHttpRequest();
/*
 * 1、定义请求
 *   首先要调用open()方法，接收3个参数：请求类型、请求URL、是否异步
 *   不会实际发送请求，只是为发送请求做好准备
 */
xhr.open("get", "example.php", false);

/*
 * 2、发送
 *   send()方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传null（因为这个参数在某些浏览器中是必需的。）
 *   请求就会发送到服务器。
 *   因为这个请求是同步的，所以JavaScript代码会等待服务器响应之后再继续执行。收到响应后，XHR对象的以下属性会被填充上数据。
 *       - responseText：作为响应体返回的文本
 *       - responseXML：如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的XML DOM文档。
 *       - status：响应的HTTP状态
 *       - statusText：响应的HTTP状态描述
 */
xhr.send(null);

/*
 * 3、通过 readyState 属性判断请求状态
 *   readyState 状态每次改变都会触发 readystatechange 事件（所以可以在这监听readyState）
 *
 *   各个阶段状态值的含义
 *       - 0：未初始化（Uninitialized）。尚未调用open()方法。
 *       - 1：已打开（Open）。已调用open()方法，尚未调用send()方法。
 *       - 2：已发送（Sent）。已调用send()方法，尚未收到响应。
 *       - 3：接收中（Receiving）。已经收到部分响应。
 *       - 4：完成（Complete）。已经收到所有响应，可以使用了。
 *
 *  onreadystatechange事件处理程序不会收到event对象。在事件处理程序中，必须使用XHR对象本身来确定接下来该做什么。
 */

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};

/*
 * 5、取消请求
 *   收到响应之前如果想取消异步请求，可以调用abort()方法
 *
 */
xhr.abort();
