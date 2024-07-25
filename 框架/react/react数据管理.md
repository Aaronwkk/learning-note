## react 原生事件和合成事件的区别？

React 中的事件处理分为两类：原生事件和合成事件。这两类事件的主要区别在于它们的绑定、执行和特性上。以下是两者之间的主要区别：

### 原生事件 (Native Events)

- **绑定位置**：原生事件直接绑定在具体的 DOM 元素上。例如，当在按钮上添加一个点击事件监听器时，该监听器直接附加到该按钮元素上。

- **事件委托**：原生事件可以利用事件冒泡或捕获阶段的特性，使用事件委托来减少事件监听器的数量。但是，React 自身并不做这样的优化。

- **事件对象**：原生事件处理函数接收到的事件对象是浏览器提供的 `Event` 对象或其派生类（如 `MouseEvent`, `KeyboardEvent` 等）。这些对象的属性和方法可能因浏览器而异。

- **执行时机**：原生事件的监听器会在事件冒泡或捕获阶段按照 DOM 结构顺序执行。

### 合成事件 (Synthetic Events)

- **绑定位置**：React 使用合成事件，它们不是直接绑定在 DOM 元素上，而是由 React 统一注册在文档的顶层（通常是 `document` 对象），并通过事件代理的方式处理。

- **事件对象**：合成事件处理函数接收到的事件对象是 React 自定义的 `SyntheticEvent` 对象。这个对象在不同的浏览器上提供一致的 API，消除了浏览器之间的差异。

- **执行时机**：合成事件仅在事件冒泡阶段执行，这意味着它们的响应顺序总是在原生事件之后。

- **性能优化**：合成事件在事件处理完毕后会被复用或清理，这样可以减少内存消耗和提高性能。

- **事件阻止**：在合成事件中，使用 `event.stopPropagation()` 和 `event.preventDefault()` 方法可以阻止事件冒泡和默认行为，这些方法在所有浏览器中表现一致。

- **兼容性**：合成事件提供了更好的跨浏览器兼容性，因为 React 对事件对象进行了标准化处理。

总的来说，React 使用合成事件是为了提供更好的性能、一致性和可预测性。然而，当需要访问原生事件的特定特性时，React 也提供了 `nativeEvent` 属性来获取底层的原生事件对象。在实际开发中，应当优先使用合成事件，除非有特殊需求要求直接访问原生事件。

##### react setState 是如何更新数据的

在 React 中，`setState` 是用于更新组件状态并触发重新渲染的一个关键方法。当你调用 `setState` 时，React 会计划一次更新，并最终重新渲染组件。下面是一个简化的概述，描述了 `setState` 如何更新数据并触发组件更新的过程：

1. **状态更新队列**：
   当你调用 `setState` 时，React 会把新的状态值加入到状态更新队列中。这个队列会保存所有待处理的状态更新，直到它们被应用。

2. **批处理更新**：
   React 不会立即应用状态更新并重新渲染组件。相反，它会批处理（batch）多个 `setState` 调用，以减少不必要的重新渲染次数。这意味着即使你在短时间内多次调用 `setState`，React 也会尽可能地合并这些更新，并在一次渲染中处理它们。

3. **更新计划**：
   React 使用一个更新计划（update scheduler）来决定何时应用状态更新。在非严格的模式下，React 可能在浏览器空闲时执行更新，而在严格模式下，它会尽快执行更新。

4. **计算新的状态**：
   当更新计划决定应用状态更新时，React 会计算组件的新状态。`setState` 的参数可以是一个函数，这个函数接收当前状态和属性作为参数，返回一个新的状态对象。这样可以确保状态更新是基于当前状态的。

5. **执行生命周期方法**：
   更新状态后，React 会执行与更新相关的生命周期方法。在 React 16.3 之前的版本中，这些方法包括 `componentWillUpdate` 和 `componentDidUpdate`。在 React 16.3 及更高版本中，这些方法被替换为 `getDerivedStateFromProps`（静态方法）和 `componentDidUpdate`。`getDerivedStateFromProps` 可以在组件更新前根据新的 props 计算新的状态，而 `componentDidUpdate` 在组件更新后被调用。

6. **重新渲染**：
   最终，React 会使用新的状态和属性重新渲染组件。它会比较新旧虚拟 DOM 树，生成最小的更新指令集，然后更新实际的 DOM。

值得注意的是，在函数组件中，`useState` 钩子提供了类似的功能，但其实现方式略有不同。在函数组件中，React 使用了闭包和引用相等性检查来跟踪状态的变化，并在每次渲染时重新评估组件。

此外，`setState` 的异步性质意味着你不能依赖于它立即更新状态。如果你想在状态更新后执行某些操作，你可以将一个回调函数作为 `setState` 的第二个参数，这个回调函数将在状态更新并完成重新渲染后被调用。

最后，需要注意的是，`setState` 的行为可能在严格模式（Strict Mode）下有所不同，因为它会强制进行额外的渲染以帮助发现潜在的副作用。在生产环境中，React 会优化渲染过程，而在开发环境中，它会进行额外的检查以提高代码质量。

## react-redux  和 redux 的区别？

`Redux` 和 `react-redux` 是两个紧密相关但功能不同的库，它们在管理前端应用程序状态方面扮演着重要角色。下面是两者之间的主要区别：

### Redux

Redux 是一个用于 JavaScript 应用程序的状态容器。它提供了一个集中式存储（store）来保存整个应用程序的状态。Redux 的设计原则是单一数据源，这使得状态管理变得更加可预测和易于调试。

Redux 的核心概念包括：

- **Store（存储）**：保存应用程序状态的地方。每个应用只有一个 store，但可以有多个 reducer 来管理不同部分的状态。
- **Actions（动作）**：描述已发生事件的对象，通常由 action creators 创建。
- **Reducers（还原器）**：纯函数，接受当前状态和一个 action，返回新的状态。Reducers 不能修改原始状态，而是返回一个新的状态对象。

Redux 提供了一种机制，让你能够预测和控制状态的更改，这对于大型和复杂的单页应用来说非常有用。

### react-redux

`react-redux` 是一个允许 React 组件与 Redux 结合使用的库。它提供了连接 React 组件到 Redux store 的桥梁，让组件可以访问和操作全局状态。

`react-redux` 的主要组成部分是：

- **Provider**：这是一个 React 组件，它将 Redux store 传递给其后代组件的上下文。这是将 React 应用与 Redux 连接起来的第一步。
- **connect()**：这是一个高阶组件（HOC），用于将 React 组件与 Redux store 连接。它可以从 store 映射状态到组件的 props，也可以映射 dispatch 方法到组件的 props，从而允许组件触发 actions。
- **useSelector() 和 useDispatch()**：这两个是 React Hooks，分别用于读取 store 中的状态和分发 actions。它们使函数组件可以像类组件一样与 Redux 交互，而无需使用 `connect()`。

### 区别总结

- **Redux** 是一个状态管理库，提供了一种中心化管理和更新应用程序状态的模式。
- **react-redux** 是一个绑定库，它提供了一组工具，使得 React 组件可以与 Redux store 进行通信。

通常情况下，你不会单独使用 Redux，而是会结合使用 Redux 和 react-redux，以便在 React 应用中有效地管理状态。Redux 负责状态逻辑，而 react-redux 则负责在 React 应用中实现这些逻辑。


## react-redux  是如何做到数据更新 组件也从新render的？

`react-redux` 主要通过两个核心功能来确保数据更新后组件能够重新渲染：`Provider` 组件和 `connect()` 高阶组件（或在函数组件中对应的 `useSelector` 和 `useDispatch` Hooks）。

### Provider 组件

`Provider` 组件是 `react-redux` 提供的用于将 Redux store 与 React 组件树连接的组件。它将 store 作为 props 传递给其子组件，使 store 可以在组件树中被任何组件访问。`Provider` 组件应该包裹住整个应用的组件树的根部，确保所有子组件都能访问到同一个 store。

### connect() 高阶组件和 Hooks

`connect()` 是一个高阶组件（Higher Order Component, HOC），它接受一个或两个函数作为参数：`mapStateToProps` 和 `mapDispatchToProps`。这些函数用于从 store 中映射状态到组件的 props，以及从 store 中映射 actions 到组件的 props。当 store 中的状态改变时，`connect()` 会重新计算这些映射，并在必要时更新组件的 props，从而触发组件的重新渲染。

对于函数组件，`react-redux` 提供了 `useSelector` 和 `useDispatch` Hooks。`useSelector` 允许函数组件订阅 Redux store 中的状态，而 `useDispatch` 则提供了一个函数来触发 actions。

### 数据更新触发组件重新渲染的机制

当 store 中的状态更新时，以下机制确保组件重新渲染：

1. **State 订阅**：`react-redux` 使用 `subscribe` 方法监听 store 的变化。每当 store 中的状态更新时，`subscribe` 回调就会被调用。

2. **Reconciliation**：当 `Provider` 监听到状态更新时，它会触发其子组件的重新渲染。在重新渲染过程中，React 的 diff 算法会比较新旧虚拟 DOM，找出需要更新的部分。

3. **Props 更新**：对于使用 `connect()` 的组件，当状态更新时，`connect()` 会重新计算 `mapStateToProps` 和 `mapDispatchToProps` 的结果，并更新组件的 props。对于使用 `useSelector` 的组件，当选择的状态部分发生变化时，`useSelector` 会触发组件的重新渲染。

4. **组件重新渲染**：一旦组件的 props 发生变化，组件就会重新渲染。React 会调用组件的渲染方法或渲染函数，生成新的虚拟 DOM。React 的 diff 算法会对比新旧虚拟 DOM，只更新必要的 DOM 节点，从而提高渲染性能。

总之，`react-redux` 通过监听 store 的变化，并将状态和 actions 的变化映射到组件的 props 上，确保了数据更新时组件能够正确地重新渲染。

### 写一个demo useSelector Provider store数据更新的组件变化

为了演示 `useSelector` 和 `Provider` 在 `react-redux` 中如何工作，我们先需要创建一个简单的 Redux store 和 React 应用。这里我们将使用 `createStore` 和 `applyMiddleware` 从 Redux 库，以及 `Provider` 和 `useSelector` 从 react-redux。

首先，确保你已经安装了必需的依赖包：
```bash
npm install redux react-redux
```

然后，我们可以开始编写代码。首先，我们需要创建一个 Redux store 和 reducer：

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  count: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer, applyMiddleware(thunk));

export default store;
```

接下来，我们创建一个 React 组件，该组件将使用 `useSelector` 来订阅 store 中的数据：

```javascript
// CounterDisplay.js
import React from 'react';
import { useSelector } from 'react-redux';

function CounterDisplay() {
  const count = useSelector(state => state.count);

  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
}

export default CounterDisplay;
```

然后，我们需要创建一个组件来处理增加和减少计数器的操作：

```javascript
// CounterControl.js
import React from 'react';
import { useDispatch } from 'react-redux';

function CounterControl() {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default CounterControl;
```

最后，我们把所有组件放在 `App.js` 文件中，并使用 `Provider` 来包装它们：

```javascript
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CounterDisplay from './CounterDisplay';
import CounterControl from './CounterControl';

function App() {
  return (
    <Provider store={store}>
      <div>
        <CounterDisplay />
        <CounterControl />
      </div>
    </Provider>
  );
}

export default App;
```

现在，当你运行你的 React 应用并点击“Increment”或“Decrement”按钮时，`CounterDisplay` 组件中的计数器将根据 store 中的数据更新。

请注意，在实际项目中，你可能需要设置更复杂的 reducer 和 actions，但是这个例子展示了基本的原理。如果你正在使用 create-react-app 或类似脚手架工具，你可以直接在 `src/index.js` 中导入 `App` 组件并将其作为根组件使用。