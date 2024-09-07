/**
 * 人物求职
 */

//todo 创建人类
var Human = function (params) {
  // 技能
  this.skill = (params && params.skill) || "保密";
  // 兴趣爱好
  this.hobby = (params && params.hobby) || "保密";
  // 姓名
  this.name = (params && params.name) || "保密";
};
Human.prototype = {
  getSkill: function () {
    return this.skill;
  },
  getHobby: function () {
    return this.hobby;
  },
  getName: function () {
    return this.name;
  },
};

//todo 手机号
var Phone = function (phone) {
  this.phone = phone || "无";
};
Phone.prototype.encryPhone = function () {
  return String(this.phone).replace(/^\d{2}(\d+)\d{2}$/g, (str, group) =>
    str.replace(group, "********")
  );
};

//todo 职位
var Work = function (work) {
  var that = this;
  (function (that, work) {
    switch (work) {
      case "code":
        that.work = "程序员";
        that.workDescript = "程序员的描述";
        break;
      case "UI":
      case "UE":
        that.work = "设计师";
        that.workDescript = "艺术";
        break;
      case "teach":
        that.work = "教师";
        that.workDescript = "分享知识";
        break;
    }
  })(that, work);
};
// 期望的职位名称
Work.prototype.changeWork = function (work) {
  this.work = work;
};
// 期望的职位描述
Work.prototype.changeDescript = function (descript) {
  this.workDescript = descript;
};

//! 建造者模式 生成应聘者对象
var Person = function (param, phone, work) {
  var _person = new Human(param);
  _person.phone = new Phone(phone);
  _person.work = new Work(work);
  return _person;
};

//todo 使用
let lz = Person({ name: "lzoxun", skill: "太多说不完" }, "18060849356", "code");
console.log(lz.getSkill());
console.log(lz.getHobby());
console.log(lz.getName());
console.log(lz.phone.encryPhone());
console.log(lz.work.work);
console.log(lz.work.workDescript);
