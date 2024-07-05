
与 HTML Template 解析的过程类似, 通过 Webpack 将样式模板转交 stylePostLoader 进行处理, 处理逻辑主要引用了 @vue/component-compiler-utils 中的 compileStyle 部分, 后者对样式模板进行解析的过程中, 将会对含 scoped 标记的模板引入插件 stylePlugins/scoped.js, scoped.js 将 data-v-xxxxxx 添加到选择器末尾的过程如下:


```js
selectors.each((selector) => {
    selector.each((n) => {
        if (n.value === '::v-deep' || n.value === '>>>' || n.value === '/deep/') {
            return false;
        }
    });
    selector.insertAfter(node, selectorParser.attribute({
        attribute: id
    }))
})
```


```html

<div class='lionad' data-v-lionad></div>
<style>
.lionad[data-v-lionad] {
  background: @tiger-orange;
}
</style>

<!-- data-v-[组件hash] -->

```

题外话, 通过以上代码, 我们发现当当前处理到三种特定类型选择器会终止循环, 停止将 data-v-xxx 添加到选择器末尾:

伪类 ::v-deep
选择器 >>>
选择器 /deep/

我们可以利用这个特征, 在组件中写样式穿透, 即内部组件影响外部组件样式 (ε=ε=ε=┏(゜ロ゜;)┛ 主动样式污染), 当然这在特定的情境下是有用的, 比如当我们想主动覆盖第三方UI组件框架的样式, 却不想引入新的CSS文件, 或不想写非 Scoped CSS 模板的时候.


#### css 选择器 .name[data-v-hash]{} 浏览器默认支持这种选择器吗 ？

是的，现代浏览器默认支持这种CSS选择器。这种选择器结合了类选择器（`.name`）和属性选择器（`[data-v-hash]`），其中`data-v-hash`是一种常见的Vue.js用于处理 scoped CSS 的方式，用于给元素添加唯一标识，以保证CSS样式的作用范围。只要浏览器遵循W3C的CSS Selectors Level 3（及更高版本）规范，就能够正确解析和应用这类选择器。

简而言之，对于大多数用户来说，这类型的CSS规则在当前主流浏览器中都是受支持的，无需担心兼容性问题。

https://juejin.cn/post/6844903826198102030#heading-3