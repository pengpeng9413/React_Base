/**     高阶组件
 *      概念：高阶组件不是react提供的某种API，而是使用react的一种模式，用于增强现有组件的功能
 *            简单来说，一个高阶组件就是一个函数，这个函数接受一个组件作为输入，然后返回一个新
 *            的组件作为结果，而且返回的新组件拥有了输入组件所不具有的功能
 *      (也可以这么理解，上述提到的函数返回结果似乎更应该叫高阶组件，而这个函数本身应该叫做 ‘高阶组件工厂函数’，这样的定义似乎更加严谨)
 *      主要有两种形式：
 *          1.代理  两种不同组件，一次渲染，两个组件都要经历不一样的生命周期
 *          2.继承  用的同一个组件，一个生命周期，可以调用该生命周期的任何一个钩子函数
 *
 *      我们先来看一下高阶组件的一个简单的例子
 */
import React from 'react';
function removeUserProp(wrappedComponent) {
  return class wrappedComponent extends React.Component {
    render() {
      const { user, ...otherProps } = this.props;
      return <wrappedComponent {...otherProps} />;
    }
  };
}
export default removeUserProp;

// 无意之间发现super的一个新用法
super.render(); // 高阶组件   继承方式  实现中，有这个方法
/** 再次看一下阮老师的es6  class  中  super,发现super
 *   1.super关键字作为函数使用
 *       super作为函数使用的时候，代表父类的构造函数，es6要求，子类的构造函数需执行一次super函数
 *   2.super 作为对象使用，代表父类的原型对象
 */

// super作为函数使用
class A {}
class B extends A {
  constructor() {
    // 虽然super 代表了父类A的构造函数，但是返回的是子类B的实例。
    // 即super内部this指向是B
    // 因此这里的super() 相当于 A.prototype.constructor.bind(this)

    super(); // 子类B 的构造函数中的super() 代表调用父类的构造函数，这是必须的，否则javascript引擎会抛错
  }
}
// super作为对象使用，在普通方法中指向父类的原型对象；在静态方法中指向父类
super.render(); // 相当于父类的  A.prototype.render()
