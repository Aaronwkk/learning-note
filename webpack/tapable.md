`tapable` 是一个强大的库，为 Webpack 提供了插件系统的基础。它允许开发者在编译的不同阶段插入自定义逻辑，从而扩展 Webpack 的功能。`tapable` 主要有同步钩子（SyncHook）、异步钩子（AsyncSeriesHook、AsyncParallelHook）等几种类型，下面通过一个简单的示例来展示如何使用 `tapable` 编写一个 Webpack 插件。

### tapable 基础概念

- **Hook（钩子）**：它是 `tapable` 的核心，用于挂载（注册）插件。钩子可以是同步的也可以是异步的。
- **Tap（注册）**：通过 `hook.tap` 方法注册插件的处理函数到特定的钩子上。
- **Call（调用）**：当特定的事件发生时，调用钩子，从而触发所有注册到该钩子上的处理函数。

### 创建一个简单的 Webpack 插件

#### 步骤 1: 安装必要的包

确保你已经安装了 `webpack-cli` 和 `webpack`。我们不需要单独安装 `tapable`，因为它作为依赖已经被 `webpack` 自动安装了。

#### 步骤 2: 编写插件

假设我们要创建一个简单的插件，该插件在 Webpack 构建结束后打印一条自定义信息。

```javascript
// PrintMessageWebpackPlugin.js
const { SyncHook } = require("tapable");

class PrintMessageWebpackPlugin {
  constructor(message) {
    // 创建一个自定义的同步钩子
    this.doneHook = new SyncHook(['message']);
  }

  apply(compiler) {
    // 在编译完成时调用我们的钩子
    compiler.hooks.done.tap('PrintMessageWebpackPlugin', (stats) => {
      // 调用自定义钩子，并传递信息
      this.doneHook.call(this.constructor.MESSAGE || '默认构建结束消息');
    });

    // 如果你想在插件实例化时就传递消息，可以这样做
    if (this.constructor.MESSAGE) {
      console.log(`插件初始化时接收到的消息: ${this.constructor.MESSAGE}`);
    }
  }
}

// 设置插件级别的静态属性，用于示例中传递默认消息
PrintMessageWebpackPlugin.MESSAGE = '构建完成，自定义消息';

module.exports = PrintMessageWebpackPlugin;
```

#### 步骤 3: 在 Webpack 配置中使用插件

现在，我们将在 Webpack 配置文件中使用这个插件。

```javascript
// webpack.config.js
const path = require('path');
const PrintMessageWebpackPlugin = require('./PrintMessageWebpackPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // 使用我们创建的插件
    new PrintMessageWebpackPlugin(),
    // 或者传递自定义消息
    // new PrintMessageWebpackPlugin('自定义的构建结束消息')
  ],
};
```

#### 步骤 4: 运行 Webpack

通过命令行运行 Webpack，观察控制台输出。

```bash
npx webpack
```

### 总结

上述示例展示了如何使用 `tapable` 创建一个简单的 Webpack 插件。我们定义了一个自定义的同步钩子，并在 Webpack 的构建生命周期中的特定阶段（本例中是 `done` 钩子）调用了它。这只是一个起点，实际上，你可以利用 `tapable` 提供的各种钩子类型（如异步钩子）和丰富的API，来创建更加复杂和功能丰富的插件，以满足各种定制化需求。