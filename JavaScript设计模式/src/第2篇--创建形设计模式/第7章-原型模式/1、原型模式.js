/**
 * 原型模式：将可复用、可共享、耗时大的方法从基类中提取出来放在原型中
 *          子类通过继承将属性和方法继承下来
 *          子类将那些需要重写的方法进行重写
 *          这样子类创建的实例既具有子类的属性和方法，也共享了基类的原型方法
 *
 * * 特点任何时候都可以对基类或子类进行拓展，而且所有被实例化的对象都能获取这些方法（但是也有可能覆盖掉被人的东西，所有不用轻易去改）
 */

//? 7.5
