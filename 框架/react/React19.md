- 在 React 19 中，React 团队引入了一个新的多用途 Api use，它有两个用途：

通过 use 我们可以在组件渲染函数（render）执行时进行数据获取。
同时通过 use 有条件在组件中读取 Context。

使用 use 时，它接受传入一个 Promise 作为参数，会在 Promise 状态非 fullfilled 时阻塞组件 Render。
通常我们会使用 use Api 配合 Suspense 来一起使用，从而处理在数据获取时的页面加载态展示。

```js
import { use, Suspense } from 'react';
import './App.css';

function getPerson(): Promise<{ name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: '19Qingfeng' });
    }, 1000);
  });
}

const personPromise = getPerson();

function Person() {
  // use Api 接受传入一个 Promise 作为参数
  const person = use(personPromise);

  return <div>userName: {person.name}</div>;
}

function App() {
  return (
    <div>
      <p>Hello:</p>
      {/* 同时配合 Suspense 实现使用 use 组件的渲染加载态 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Person />
      </Suspense>
    </div>
  );
}

export default App;


```