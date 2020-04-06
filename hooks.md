# 这节我们来聊聊 hooks

> 说起 hooks,肯定大家想到的是，hook 只能在函数组件中去使用，然后可以替代 class 中复杂的生命周期和烦人的 this
> 然后我用的最多的是：useSate,useEffect 这两个个 hooks,但其实 hooks 其实远远还不止这些，而且可以继续深挖

## 先来看一下 useState

```js
// 下面这个表达式其实是个数组解构，useState()返回有两个值的数组，他与下面的式等价的
const [state, setState] = useState(initialState);

// 等价于--->
var fruitStateVariable = useState('banana'); // 返回一个有两个元素的数组
var fruit = fruitStateVariable[0]; // 数组里的第一个值
var setFruit = fruitStateVariable[1]; // 数组里的第二个值
```

> 其实一开始看到的时候，我以为这个就是 facebook 这么规定的，其实看 react 的官方文档，我才醍醐灌顶，真的，react 看它几十遍一点不为过
> 这里其实用了数组解构的形式

## 再来看一下 useEffect

> 你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
> 我发现 react 的官方文档真是的可以学到的理念太多了，是一本无穷的知识库

_useEffect 做了什么？_ 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。
React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。

_为什么在组件内部调用 useEffect？_ 将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。
我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。因为 hook 本来就是用在函数组件中，天然的利用了这个条件。
Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API

_useEffect 会在每次渲染后都执行吗？_ 是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。
（我们稍后会谈到如何控制它。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。
React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

> 传递给 useEffect 的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。我们将在本章节后续部分更清楚地了解这样做的意义

_为什么要在 effect 中返回一个函数？_ 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。
如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分

_为什么 Hook 需要在我们组件的最顶层调用_ [参考 react 官方文档](https://zh-hans.reactjs.org/docs/hooks-rules.html)

## 如何自定义 hook：

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook

> 这是 react 文档中自定义 hook 的一个例子

```js
// 自定义的hook
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 使用自定义的hook ----> 在别的文件中用
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

// 使用自定义的hook ----> 在别的文件中用
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  );
}
```

> _自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性_

### 在多个 hook 之间传递信息

```js
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  // 这个我们自定义的hook会在recipientID发生改变的时候调用，可以等效理解为useEffect的作用
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```
