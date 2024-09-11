/**
 * 只能从与父页面相同的源加载 (new Worker("http://xxx.other.xx") 是不行的)
 * Worker()构造函数返回的Worker对象是与刚创建的专用工作者线程通信的连接点。它可用于在工作者线程和父上下文间传输信息
 * 工作者线程具有不可忽略的启动延迟，所以即使Worker对象存在，工作者线程的日志也会在主线程的日志之后打印出来
 */

// 创建一个工人（线程），传入的文件就是他的工作内容
const worker = new Worker("./emptyWorker.js");
console.log("创建", worker); // Worker {}
