/**
 * 观察者模式（发布订阅模式 或 消息机制 或 事件总线）：需要定义一种依赖关系解决主体与观察者之间的耦合
 *
 * 案例背景：飞机向目的地飞行，需要经过很多个站点，站点需要通过卫星知道指定飞机的情况从而安排降落点
 * 解释：此时角色
 *      卫星：观察者，观察某架飞机的情况，把后期得到消息发布给服务站（订阅（在这个卫星注册）过的的服务站） --- 抖音平台/出版社
 *           提供注册方法（服务站来订阅某架飞机）
 *           提供取消注册方法（飞机改路线，不需要经过这服务站了，不需要管这架飞机了）
 *           发布消息方法（将某一个飞机信息，发送给所有订阅了这架飞机的服务站）
 *      飞机：主体对象，属于被观察对象，它可以将自己的情况发给卫星，卫星观察到就可以分发给订阅过的服务站   --- 主播/某报纸
 *           提交的方法（程序中表现是在某一阶段，得到了一个需要推送的消息，就去调用卫星的发布消息方法）
 *      服务站：用户群体，先在卫星上注册某架飞机的信息(点击订阅按钮、关注..)，当卫星观察到这架飞机相关消息，就会发给你  ---用户/用户
 *             注册/取消注册的动作
 *
 *
 * 比如抖音案例：用户在抖音平台关注某主播，当这个主播发动态时，抖音平台就会将这个动态推给你
 *              突然觉得没意思，用户可以取关，以后不再接受
 */

//todo 先定义一个观察者对象
var Observe = (function () {
  // 消息队列，防篡改
  var _message = {};
  return {
    // 注册信息接口
    regist: function (type, fn) {
      // 如果 type 不存在怎创建类型
      if (typeof _message[type] === "undefined") {
        // 将要做的事情推入对应的 type 中
        _message[type] = [fn];
      } else {
        _message[type].push(fn);
      }
    },
    // 发布信息
    fire: function (type, args) {
      // 如果该消息没被注册，直接return
      if (!_message[type]) return;
      // 定义消息信息
      var events = {
        type: type,
        args: args || {},
      };
      for (let i = 0; i < _message[type].length; i++) {
        // 依次执行对应 type 里注册过的 fn
        _message[type][i].call(this, events);
      }
    },
    // 移除注册信息
    remove: function (type, fn) {
      // 如果该消息没被注册，直接return
      if (!_message[type] instanceof Array) return;
      for (let i = _message[type].length - 1; i >= 0; i--) {
        _message[type][i] === fn && _message[type][i].splice(i, 1);
      }
    },
  };
})();

// 服务站1进行注册，名为test的飞机
Observe.regist("test", (args) => {
  console.log("服务站1接收到了消息", args);
});
// 服务站2进行注册，名为test的飞机
Observe.regist("test", (args) => {
  console.log("服务站2接收到了消息", args);
});

// 卫星得到名为test飞机的消息后(程序中只是再某一阶段得到了需要推送的消息)，向每个注册了test飞机的服务站推送消息
Observe.fire("test", { msg: "到达xx站点了" });

// 名词很多地方说的都不太一样，但总体意思都差不多，有一批个体去消息系统注册一个事件，带上一个方法，当消息系统发布某个事件时，注册了这个事件的所有个体都会调用注册时带上的方法，并且拿到发布的数据
