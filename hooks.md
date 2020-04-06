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
