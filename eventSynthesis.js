//===================端午过后的第一天，刚看完破冰行动，现在我们来破破react事件合成的冰===============
/**在js基础上我们探究了一下自定义是怎么玩的，现在我们再来回顾一下 */
 // 1.初始化，自定义事件  event = new Event（typeArg，eventInit）;   typeArg:事件名称,eventInit:一个对象，包含一下几个字段

 var event=new Event('build') 

 // 2.事件监听
 elem.addEventListener('build', function (e) { ... }, false); 
 // 事件触发
 elem.dispatchEvent(event)

 //  ========> 我们再看看react的合成事件是怎么样的========
 //  ==在此之前我们先来看原生html的点击事件和react中的点击事件

 /**  原生 onclick 字母全为小写，绑定的是一个字符串  */
<button onclick="activateLasers()">
  Activate Lasers
</button>

/**  react  采取驼峰的写法，绑定的是一个函数，变量*/ 
<button onClick={activateLasers}>
  Activate Lasers
</button>

/**  为啥会有这样的差异呢，
 * 首先原生的绑定的字符串，并带了()，只有在事件触发的时候，函数才会执行
 * 然而在react中，由于react在处理事件的时候和原生不是完全一样的，所以采取了变量的形式，并用
 * {}把函数写在里面，假象一下，如果我们在react中也写上（），那它在render的时候是不是就会执行了，
 * 毕竟他不是字符串
 * 接下来我们再来好好看看 react事件合成机制的原理
 * */


 // 这里我是想看一下react整个的事件合成机制是怎么一回事的，但是我看到react的源码的时候，我懵逼了，真是大海捞针，这给我增加了很大的难度
 /**看源码肯定也是奔着解决问题来的，为什么需要看react的合成事件，因为他和我们传统的事件写法不一致
  * 后续的博客的更新，肯定会扒开react的具体的源码来看，但是由于水平和时间有限，我们先做简短的总结：
  * 1.react和原生的dom 事件机制是不一样的
  * 2.react的事件对象是合成对象(SyntheticEvent)。
  * 3.几乎所有的事件都委托到了dom树的顶层  document,因为document并不是能catch所有的事件类型，委托到document达到了性能优化的目的
  * 4.react的合成事件利用了统一的分发函数：dispachEvent
  * 
  */