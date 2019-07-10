/**
 * 先预定一个位置，这节我们要讲  setstate() 
 * 内容围绕解决一个问题：setstate()更新状态并不能保证是同步的
 */
// 以下是react 作者对一个issue 给出的答复：https://github.com/facebook/react/issues/11527
// 然后我们再参考一下这篇文章  https://github.com/justjavac/justjavac.github.com/issues/9

facebook/react#11527 (comment)

为什么 setState 要是异步的?

@mweststrate 提出了质疑, 认为这可能是历史原因导致的, 而不是有意义的设计.

他列出了两条他听到过的说法:

因为需要异步渲染所以 setState 是异步的.
因为需要知道哪个 state 被渲染所以 setState 是异步的.
对这两条的反驳均以他作为主作者的 mobx-react 项目为参考.

@milesj 接着提出观点, 因为要合并多个 setState 一起处理(在 React 16 中尤其明显), 所以 setState 是异步的.

下面就是正文, @gaearon 对此进行了回复:

(时间点 2017年12月20日) React 团队正在对 this.state 的异步特性进行研究, 为了避免大的变动导致写点什么之后也要大量修改, 所以回头再说.

(时间点 2018年1月25日) 有了一些想法, 值得说一说. 首先, 延迟 setState 后对状态变动进行批量更新是有意义的, 会提升执行效率.
然后这时会有两种做法:

setState 异步的, 等待其他变动一起修改 state, 然后同步渲染.
setState 同步的, 每次都直接修改 state, 但这时延迟异步渲染.
之所以采用前者而不是后者以下原因:

保证内部一致性
即使 state 同步变动, 但 props 不会.
可能导致一种在 state 中有效的写法放在 props 中却无效. (具体例子可看原文)

并发更新
React 可以通过检查 setState() 被调用的地方来确定该更新的优先级, 然后按照某种粒度进行更新.
为了控制这种粒度, React 可以整体或批量进行更新, 甚至根据优先级一边处理整体更新渲染, 一边兼容之前的(但马上会被替代的)细小更新渲染.
关于这一点, 功劳归属于 @acdlite .