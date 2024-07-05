#### react 怎么去实现 一个 computed的函数？

在React中，可以使用React Hooks来模拟Vue中的`computed`属性。Vue的`computed`属性是响应式的，即当依赖的数据改变时，计算属性会自动重新计算。在React中，我们可以使用`useMemo`或`useReducer`和`useCallback`来达到类似的效果。

### 使用 `useMemo`

`useMemo` Hook接受一个函数和一个依赖项数组。它会在依赖项发生变化时重新计算函数的结果，并缓存结果。这与Vue中的`computed`很相似。

下面是一个使用`useMemo`的例子：

```jsx
import React, { useState, useMemo } from 'react';

function MyComponent() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const computedValue = useMemo(() => {
    // 复杂的计算过程
    return a + b;
  }, [a, b]);

  return (
    <div>
      <p>Computed Value: {computedValue}</p>
      <button onClick={() => setA(a + 1)}>Increment A</button>
      <button onClick={() => setB(b + 1)}>Increment B</button>
    </div>
  );
}
```

在这个例子中，`computedValue`将只在`a`或`b`改变时重新计算，其余时间它将保持缓存的结果。

### 使用 `useReducer`

如果你的计算属性不仅依赖于状态，还依赖于其他逻辑，那么使用`useReducer`可能更合适。`useReducer`可以让你管理复杂的状态逻辑，包括中间值和副作用。

```jsx
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementA':
      return { ...state, a: state.a + 1, computed: state.a + state.b };
    case 'incrementB':
      return { ...state, b: state.b + 1, computed: state.a + state.b };
    default:
      throw new Error();
  }
};

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { a: 1, b: 2, computed: 3 });

  return (
    <div>
      <p>Computed Value: {state.computed}</p>
      <button onClick={() => dispatch({ type: 'incrementA' })}>Increment A</button>
      <button onClick={() => dispatch({ type: 'incrementB' })}>Increment B</button>
    </div>
  );
}
```

在这个例子中，`reducer`函数在每次`dispatch`动作时执行，并根据动作的类型更新状态，包括`computed`属性。

### 结论

`useMemo`和`useReducer`都可以用来模拟Vue的`computed`属性。选择哪一个取决于你的具体需求。如果你只是需要基于状态进行简单的计算，`useMemo`就很合适。如果你需要更复杂的逻辑和状态管理，`useReducer`可能更适合。