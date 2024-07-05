##### pre loader normal loader post loader 的应用场景?

Webpack 中的 loader 可以分为几种类型，包括 pre-loader（前置 loader）、normal loader（普通 loader）和 post-loader（后置 loader）。每种 loader 类型都有其特定的应用场景：

### 1. Pre-Loader（前置 Loader）
前置 loader 主要用于预处理，通常是在其他 loader 执行之前运行。这类 loader 经常用于代码检查、格式化或者清理工作，比如 linter 或者代码美化器。它们可以帮助你在构建过程中发现潜在的问题，比如语法错误或者不符合代码规范的地方。

**应用场景：**
- **代码质量检查**：ESLint、Stylelint 等用于检查 JavaScript 或 CSS 的语法错误和风格问题。
- **图像优化**：对图像进行压缩或者转换格式。
- **多语言支持**：如 Babel 的预处理器，用于将新的语言特性转换成旧的版本以兼容更多环境。

### 2. Normal Loader（普通 Loader）
正常 loader 是最常见的类型，它们按顺序从右向左执行，主要用于转换源代码。这些 loader 负责将源代码从一种格式转换为另一种格式，或者处理某些特定类型的文件。

**应用场景：**
- **模块转换**：Babel-loader 将 ES6+ 的 JavaScript 转换为向后兼容的代码。
- **样式处理**：css-loader 和 sass-loader 分别处理 CSS 和 SASS 文件。
- **资源加载**：file-loader 或 url-loader 用于处理图片、字体等静态资源的加载。

### 3. Post-Loader（后置 Loader）
后置 loader 在所有其他 loader 完成处理之后执行。它们通常用于添加额外的后处理步骤，比如代码混淆、添加额外的注释或元数据等。

**应用场景：**
- **代码混淆**：在生产环境中使用 UglifyJS 或 Terser 插件混淆代码。
- **代码注释**：添加版权信息或版本号。
- **资源优化**：进一步压缩已经转换的资源。

### 总结
- **Pre-Loader**：在转换前执行，用于代码检查和预处理。
- **Normal Loader**：主要的转换任务，从右到左顺序执行。
- **Post-Loader**：在所有转换后执行，用于后处理和优化。

在实际项目中，你可能会将多种类型的 loader 结合使用，以达到对不同类型的文件进行细致处理的目的。例如，你可能会先用一个 linter 作为 pre-loader 检查代码，然后用 normal loader 转换代码，最后用 post-loader 进行混淆和优化。