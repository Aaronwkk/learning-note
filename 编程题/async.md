使用了 async 声明的函数在执行时，也是一个单独的协程，我们可以使用 await 来暂停该协程，由于 await 等待的是一个 Promise 对象，我们可以 resolve 来恢复该协程

```js
function p(num) {
  return Promise.resolve(num * 2)
}

function* generator() {
  const value1 = yield p(1)
  const value2 = yield p(value1)
  return value2
}

function higherOrderFn(generatorFn) {
  return () => {
    return new Promise((resolve, reject) => {
      let gen = generatorFn()
      // 链式处理yield
      const doYield = (val)=>{
        console.log(val)
        let res

        try{
          res = gen.next(val)
        }catch(err){
            reject(err)
        }

        const {value,done} = res
        // done === true 函数结束，resolve结果
        if(done){
          return resolve(value)
        }else{
          // 未结束，处理 value，同时传参
          value.then((val)=>{doYield(val)})
        }
      }

      doYield()
    })
  }
}

const asyncFn = higherOrderFn(generator)()
// undefined
// 2
// 4
```


在你的代码示例中，`generator` 函数是一个生成器（generator function），它使用 `yield` 关键字暂停执行并在之后恢复。当 `yield` 后面跟着一个 `Promise` 时，生成器函数会暂停，等待那个 `Promise` 解析。这里是逐步解析你代码的执行流程：

1. 当调用生成器函数 `generator()` 时，它返回一个生成器迭代器（generator iterator）。
2. 第一次调用迭代器的 `next()` 方法时，遇到 `yield p(1)`。这里 `p(1)` 返回一个立即解析为 `2` 的 `Promise`。生成器暂停，等待这个 `Promise` 解析。
3. 当 `Promise` 解析后，生成器继续执行，`value1` 被赋予解析值 `2`。
4. 接下来，遇到 `yield p(value1)`，此时 `value1` 为 `2`，所以实际调用的是 `p(2)`，返回一个解析为 `4` 的 `Promise`。生成器再次暂停。
5. `Promise` 解析后，生成器继续，`value2` 被赋予解析值 `4`。
6. 最后，`return value2` 将 `value2` 的值（即 `4`）作为生成器的最终结果返回。注意，虽然这个值最初来自于一个 `Promise`，但当生成器结束时，它直接返回的是该 `Promise` 解析后的值，而不是 `Promise` 本身。

因此，当完全遍历完生成器时，你得到的是 `value2` 的实际数值（在这个例子中是 `4`），而不是一个 `Promise`。生成器帮你管理了内部的异步操作和等待，使得你可以以同步的方式编写异步逻辑。如果你想要外部代码接收到一个 `Promise` 来知道整个生成器完成的情况，你通常会在消费生成器的地方处理这一点，例如通过封装生成器的迭代过程到一个返回 `Promise` 的函数中。