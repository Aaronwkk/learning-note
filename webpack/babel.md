
其实 Babel 里面的AST遍历也是有生命周期的，有两个钩子：在遍历开始之前或遍历结束之后，它们可以用于设置或清理/分析工作。

```js
export default function() {
  return {
   //遍历开始之前
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path) {
        this.cache.set(path.node.value, 1);
      }
    },
    //遍历结束后
    post(state) {
      console.log(this.cache);
    }
  };
}

```

我们怎么通过babel 去修改ast 辅助我们达成目的

要利用Babel修改AST（抽象语法树）以辅助达成特定的目的，比如代码重构、静态分析或增加新的语言特性，你需要熟悉Babel插件的开发流程。以下是通过Babel修改AST的基本步骤：

### 1. 安装必要的依赖
确保你已经安装了`@babel/core`和`@babel/parser`。可能还需要`@babel/traverse`用于遍历AST，`@babel/types`用于构建或修改AST节点，以及`@babel/generator`用于从AST生成代码。

```bash
npm install --save-dev @babel/core @babel/parser @babel/traverse @babel/types @babel/generator
```

### 2. 编写插件
创建一个函数作为Babel插件，该函数接收一个`api`对象和一个包含插件选项的对象。在插件函数内部，你可以定义访问者（visitor）对象，它告诉Babel如何处理特定类型的AST节点。

```javascript
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

const plugin = ({ types: t }) => ({
  visitor: {
    // 访问者模式，定义对哪些AST节点进行操作
    Identifier(path) {
      if (path.node.name === 'oldName') {
        path.node.name = 'newName'; // 修改标识符名称
      }
    },
    
    FunctionDeclaration(path) {
      // 操作函数声明
      const { node } = path;
      
      // 添加或修改函数体、参数等
      node.body.body.push(t.returnStatement(t.stringLiteral('Hello, World!')));
    }
  }
});
```

### 3. 使用插件
将你的插件与Babel一起使用，传入代码字符串和插件列表。

```javascript
const code = `function hello() {
  console.log("Hello, oldName!");
}`;

const result = babel.transform(code, {
  plugins: [plugin]
});

console.log(result.code);
```

### 4. 调整插件功能
根据需要调整插件的功能，比如添加更多的访问者，或者修改已有的访问者逻辑。

### 5. 测试和调试
测试你的插件是否按预期工作。使用不同的代码样例进行测试，确保插件能够正确处理各种情况。

### 6. 集成到项目中
一旦插件满足需求，可以将其集成到项目构建过程中，比如在Webpack、Rollup或其他构建工具中作为插件使用。

通过上述步骤，你可以利用Babel的强大功能来修改AST，实现诸如代码重写、语法糖消除、静态代码分析等功能，从而达到特定的编程目标。记得在开发插件时遵循Babel的最佳实践，如使用`@babel/types`来创建和修改节点，避免直接修改节点属性，以保持代码的健壮性和兼容性。


