Fiber 上的 Hook
这个力量就是 Fiber，在 Fiber 节点中有两个相关属性：

type：指向 Component，可能是 Function Component，也可能是 Class Component 等其他组件。对 Function Component 来说，就是一个具体的 render 函数，比如上面的 Example 函数。
memoizedState：指向自身状态，在 Class Fiber 下是构造函数声明的 state，在 Function Fiber 下则是一个 Hook 池。Hook 池中维护着组件调用 useXXX 产生的所有 Hook，Hook 中又分别记着各自的状态。这样就实现了 Hook 和 Fiber 的绑定。

#### 挂载和更新执行的逻辑不一样

虽然看起来 Function Component 每次 render 都调用的同一个 useXXX，但实际上 mount 和 update 调用对 Hook 池是几乎完全不同的操作。

因此 ReactFiberHooks 提供了一个换档机制：声明两套 HooksDispatcher，上面绑定了 mount、update 阶段不同的 Hook 实现。当一个 Function Component 准备 render 时，判断它是 mount 还是 update，切换不同的 HooksDispatcher。


#### Stete Hook 的实现

State Hook 来自 useState、useReducer，用来提供状态及其更新。
State Hook 通过 memoizedState 保存状态，通过 queue 维护更新队列的数据和方法（dispatch）。
State Hook 的更新队列是个单向循环链表。
更新阶段的 State Hook 会“清洗”更新队列，计算并返回最新 memoizedState。
我们调用 useState 返回的 dispatch，就是创建并在更新队列中插入新更新，并发起整体调度。


#### Effect Hook 实现：

Effect Hook 来自 useEffect、useLayoutEffect。
Effect Hook 通过 memoizedState 保存一个 useEffect 产生的 Effect 对象。
Effect 对象保存着创建（create）回调、销毁（destroy）回调、依赖、处理标记。
Effect 会同时挂到 Fiber 的 Update Queue 上，方便 Fiber 在 commit 阶段找到并执行，Update Queue 是个单向循环链表。
更新阶段，Effect 会找到同一调用在上一次构建的 Effect，对比依赖以决定被如何处理，并获取 destroy。
接着会做一件重要的事：依赖对比，依赖是否变化，对当前 Effect 的处理方式影响很大。

Unmount 处理
则做 unmount 处理：执行 effect.destroy（上一次 Effect 的销毁函数）
Mount处理
执行 effect.create（回调 useEffect 入参，并把返回作为 destroy 挂到 Effect 上）


#### useMemo

useMemo 返回一个 memoized 值。把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。
Memo Hook 上要存什么状态？依赖值和触发的计算值，实现上是一个数组。然后把计算值返回出去：
但在 update 阶段，上述逻辑是有条件的，即“依赖有变化”，否则只要返回上一次计算值就好。所以 useEffect 曾用到的 areHookInputsEqual 又出场了：

#### useCallback

同 useMemo 十分相似，不同点是入参的方法不执行，变为直接存储：

```js
// mountMemo 和 updateMemo 方法
hook.memoizedState = [callback, nextDeps];
return nextValue;
```

#### useRef

useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”，而这个“盒子”的引用值始终不变。

只要在 mount 时创建一个对象，存到 Hook 上，后续 update 直接取：

```js
// mountRef
const ref = {current: initialValue};
hook.memoizedState = ref;
return ref;

// updateRef
return hook.memoizedState;
```

[React 原理系列 —— Hook 是这样工作的](https://zhuanlan.zhihu.com/p/567534059)