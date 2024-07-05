1、克隆当前 Hook。为什么不直接复用？这样可以保证 Fiber 上的 Hook “原件”完整，某些情况下（比如 useEffect 要对比新旧 Hook 的依赖），在构建当前 Hook 的同时，仍需要上一次 Hook 的信息。

React通过一个链表结构来追踪和管理Hook的状态。在组件初始化时，React会创建一个初始的Hook链表。之后的每次渲染，React都会基于这个链表创建一个新的链表副本，这个副本包含了最新的状态和副作用信息。这样，即使在组件多次渲染时，React也能保持Hook的纯净性和副作用的正确管理。

2、为什么 Hook 不能用在 if / for 语句里？

useEffect 第二个参数如果是个空数组 或者 空 什么效果？

在React中，useEffect Hook用于在函数组件中执行副作用操作，如数据获取、订阅或手动更改React组件的DOM。useEffect函数接受两个参数：一个副作用函数和一个依赖数组。

当useEffect的第二个参数是一个空数组[]时，它意味着副作用函数的执行将不会依赖于任何组件内的值。因此，副作用函数只会在组件的初次渲染完成后执行一次，并且在组件卸载时执行一次用于清理（如果副作用函数中返回了清理函数的话）。

这是因为在useEffect中，依赖数组用于告诉React何时重新运行副作用。如果依赖数组为空，那么没有任何值可以改变，也就没有理由重新运行副作用函数。因此，副作用函数被视为只运行一次，就像在类组件中的componentDidMount生命周期方法一样。

#### useState 的更新过程

从 react 源码的角度 分析下 useState 创建和 更新 数据 具体流程

```js
import React, { useState } from 'react';

function Counter() {
  // 第一个计数器的状态
  const [count1, setCount1] = useState(0);

  // 第二个计数器的状态
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <h2>Counter 1: {count1}</h2>
      <button onClick={() => setCount1(count1 + 1)}>Increment Counter 1</button>
      
      <h2>Counter 2: {count2}</h2>
      <button onClick={() => setCount2(count2 + 1)}>Increment Counter 2</button>
    </div>
  );
}

export default Counter;
```

要深入理解`useState`在React源码中的创建和更新流程，我们需要了解React Hooks的工作原理，特别是其内部状态管理机制。下面是从源码角度分析`useState`创建和更新数据的具体流程：

##### 1. Hooks链表和Hook节点

首先，React Hooks内部使用链表结构来跟踪和管理Hooks。对于`useState`而言，每个`useState`调用都会创建一个Hook节点，这个节点包含了状态值、更新函数以及可能的其他信息。在组件的首次渲染时，React会创建一个初始的Hook链表，其中包含所有调用的Hooks。

##### 2. 创建Hook

当在组件中调用`useState(initialState)`时，React会执行以下步骤来创建Hook：

- 首先检查当前是否处于组件的初次渲染。如果是初次渲染，React会为`useState`调用分配一个新的Hook节点，并将`initialState`设置为其初始状态。
- 如果不是初次渲染，React会从上一个渲染周期的Hook链表中找到对应的Hook节点，然后使用它来更新状态。

##### 3. 更新状态

当我们调用`setState`函数（由`useState`返回）来更新状态时，React会执行以下步骤：

- 将状态更新请求添加到当前Hook节点的更新队列中。如果更新队列为空，React会创建一个新的更新，并将其添加到队列中。
- React会标记组件需要重新渲染。但是，状态更新不会立即应用，而是被延迟到当前事件处理完成之后，或者在异步任务中。
- 当重新渲染发生时，React会遍历Hook链表，处理每个Hook节点的更新队列。对于`useState`的Hook节点，React会应用所有排队的更新，然后更新`memoizedState`（当前状态快照）。

##### 4. 渲染阶段

在重新渲染阶段，React会执行以下操作：

- 为每个`useState`调用，React会从Hook链表中获取对应的Hook节点，并读取`memoizedState`来获取当前状态。
- 如果有状态更新，React会应用这些更新，并更新`memoizedState`。
- React会使用最新的状态值来渲染组件。

##### 5. 清理和优化

在组件卸载时，React会清理与该组件相关的所有Hook节点和状态。此外，React还实现了各种优化机制，如批量更新和优先级调度，以提高性能和响应性。

总结起来，`useState`在React中的工作流程涉及创建和管理Hook节点，状态更新的队列化和延迟应用，以及在重新渲染时应用状态更新。React的 Hooks 机制通过链表结构和精细的状态管理，实现了组件状态的高效和灵活管理。


#### 比如 useEffect 要对比新旧 Hook 的依赖 具体说明下？

useEffect与依赖项
当你在useEffect的依赖数组中包含变量时，React会记住这些变量的引用，并在每次渲染时检查这些变量是否发生了变化。如果依赖数组中的任何一个值的引用发生了变化（即使其值看似相同），useEffect就会重新执行。

新旧Hook依赖比较
React在处理useEffect时，会进行以下步骤来决定是否需要重新执行副作用：

获取当前的Hook状态：React会从Hook链表中找到当前的useEffect Hook，并获取其上次执行时的依赖项数组。
比较新旧依赖：React会比较当前渲染时传递给useEffect的依赖数组与上一次渲染时的依赖数组。这里比较的是引用，而不是值。也就是说，即使两个对象或数组具有相同的值，但只要它们不是同一个引用，React就会认为它们是不同的。
决定是否重新执行useEffect：如果发现依赖数组中有任何不同（即任何依赖的引用发生了变化），React就会重新执行useEffect函数，应用新的副作用。

#### react Fiber 节点 有几种类型 是怎么创建的？

React Fiber 是 React 16 版本中引入的新架构，它使用一种称为 Fiber 的数据结构来代替原有的 Virtual DOM 树。Fiber 的设计目标是提高性能和可中断性，使得 React 能够在长任务中进行暂停和恢复，从而改善用户体验。Fiber 节点是一种树形结构的节点，它们构成了整个 UI 层的表示。

### Fiber 节点的类型

Fiber 节点有多种类型，每种类型代表了 React 应用程序中的不同部分，包括但不限于：

1. **FunctionComponent**: 表示函数式组件。
2. **ClassComponent**: 表示类组件。
3. **HostRoot**: 代表整个 React 树的根节点。
4. **HostComponent**: 代表原生 DOM 节点。
5. **HostText**: 代表文本节点。
6. **Portal**: 用于在不同的 DOM 节点间渲染子树。
7. **Fragment**: 用于分组子元素，而不会在 DOM 中产生额外的节点。
8. **ContextConsumer**: 用于消费 Context。
9. **ContextProvider**: 用于提供 Context。
10. **ForwardRef**: 用于转发 ref 的组件。
11. **SuspenseComponent**: 用于实现代码分割和加载状态的组件。

这些类型在 `ReactWorkTags` 枚举中定义，用于区分不同的 Fiber 节点类型。

### 创建 Fiber 节点

Fiber 节点的创建发生在 React 的渲染阶段。当 React 开始渲染一个组件时，它会从宿主环境中（如浏览器的 DOM）创建或更新 Fiber 树的一个版本。这个过程包括以下几个步骤：

1. **初始化**: 当 React 需要渲染一个新的组件时，它会创建一个 Fiber 节点，并设置相应的类型和属性。对于函数式组件或类组件，这可能涉及到创建一个 FunctionComponent 或 ClassComponent 类型的 Fiber 节点。

2. **子节点创建**: 对于有子组件的节点，React 会递归地为每个子组件创建 Fiber 节点，构建出整个子树。

3. **属性和状态赋值**: React 会为 Fiber 节点设置必要的属性，如 key、ref、props 和 state。对于函数式组件或类组件，这还包括设置渲染函数和生命周期方法。

4. **挂接到 DOM**: 最终，当整个 Fiber 树构建完成并通过协调阶段后，React 会将新的 Fiber 树与旧的树进行比较，并根据差异更新实际的 DOM。

### 协调阶段

在协调阶段，React 会比较新旧 Fiber 树之间的差异，这个过程称为 reconciliation。React 会遍历两棵树，寻找差异，并计算出最小的更新集，以高效地更新 DOM。

Fiber 架构使得 React 能够更好地处理复杂的 UI 更新，支持异步渲染和代码分割，同时也使得 React 更加模块化和可扩展。

#### 为什么react hook要用链表的方式存储？

React 使用链表结构来存储 Hooks 主要有几个关键原因，这些原因与 React 的设计哲学、性能优化以及 Hooks 的运作机制密切相关：

1. **状态一致性**：
   Hooks 需要在每次组件渲染时按照相同的顺序执行，以保持状态和副作用的一致性。链表结构可以确保 Hooks 的执行顺序不会改变，即使在组件内部状态更新或重新渲染时也是如此。

2. **性能优化**：
   链表允许 React 在渲染组件时快速地遍历和访问每个 Hook。由于链表中的每个节点都直接指向下一个节点，React 可以有效地按顺序访问每个 Hook，而无需进行复杂的查找或索引操作。

3. **避免重复创建**：
   使用链表可以避免在每次组件渲染时重复创建 Hook 的实例。这不仅节省了内存，也减少了创建和销毁对象的开销，提高了性能。

4. **依赖管理**：
   当使用像 `useEffect` 这样的 Hook 时，React 需要知道 Hook 的依赖关系。链表结构使得 React 能够在更新状态或执行副作用时正确地跟踪和管理这些依赖，确保副作用只在依赖实际改变时重新执行。

5. **Hooks 顺序的限制**：
   链表结构还强化了 React 的规则，即 Hooks 必须在每次渲染中按照相同的顺序调用。这避免了在条件语句（如 `if` 或 `for`）中使用 Hooks 所带来的不确定性，因为这可能会导致 Hook 的数量或顺序在不同的渲染中发生变化，从而破坏状态和副作用的正确性。

6. **批量更新和优先级调度**：
   链表结构有助于 React 执行批量更新和优先级调度，因为它可以轻松地在链表中添加新的状态更新或副作用，然后在适当的时机统一处理这些更新，从而减少不必要的重新渲染，提高应用程序的响应性和性能。

综上所述，链表结构为 React 提供了一种有效、一致且可预测的方式来管理 Hooks 的状态和副作用，这与 React 的整体设计目标相吻合，即提供高性能、可维护和可预测的用户界面。