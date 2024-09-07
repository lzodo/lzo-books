const ajax = function (opt) {
  const option = Object.assign(
    {
      method: "get",
      url: "",
      data: null,
      params: {},
    },
    opt
  );

  console.log(opt);

  let xhr = new XMLHttpRequest();

  let url = option.url;
  for (const key in option.params) {
    url = addURLParam(url, key, option.params[key]);
  }
  xhr.open(option.method, url, false);
  //   if (option.contentType) {
  //     xhr.setRequestHeader("Content-Type", option.contentType);
  //   }
  xhr.send(option.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText, 222);
      } else {
        console.log("Request was unsuccessful: " + xhr.status);
      }
    }
  };
};

// 参数添加
function addURLParam(url, name, value) {
  url += url.indexOf("? ") == -1 ? "? " : "&";
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
