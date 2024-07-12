##### 初始化

```js
window.addEventListener('load', () => {
  // 获取首屏时间
  const time = this.getFirstScreenTime()
}
```
##### 白屏时间

1、如果有图片，就按照图片渲染结束的时间算
2、如果没有图片，就按照 t.domContentLoadedEventStart - t.navigationStart 的时间算

这两个API属于`window.performance.timing`对象，它们是浏览器性能监测的一部分，主要用于帮助开发者了解网页加载过程中的各个时间节点。具体到您提到的两个属性：

1. `t.domContentLoadedEventStart`: 此属性表示浏览器开始触发`DOMContentLoaded`事件的时间戳。`DOMContentLoaded`事件在文档初始化完成，即DOM树构建完成，而不需要等待样式表、图片和子框架完成加载时触发。这意味着在这个时间点上，JavaScript可以访问和操作所有的DOM元素，尽管某些外部资源可能还在加载中。

2. `t.navigationStart`: 此属性代表用户导航到当前文档的起始时间，即浏览器开始处理这个请求的时间。这通常是用户点击链接、输入URL或者通过脚本触发页面跳转的时间点。

因此，当你计算 `t.domContentLoadedEventStart - t.navigationStart` 的时候，得到的是从浏览器开始处理页面请求到DOMContentLoaded事件开始触发之间的时间差，这个时间可以反映页面结构（HTML和相关CSS）加载并解析完成的速度。这对于优化首次渲染时间（First Contentful Paint, FCP）和提升用户体验至关重要，因为它衡量了用户能够开始与页面内容交互的大致时间。