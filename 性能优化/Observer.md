
MutationObserver：用来监听 DOM 树的变动

IntersectionObserver：用来监听两个元素是否相交

ResizeObserver：用来监听元素的大小更改

PerformanceObserver：浏览器渲染页面过程中有一些关键的渲染时间点，可以用这个 api 监听到

ReportingObserver：浏览器使用过时的 api 或者浏览器对我们 api 执行有干预的时候会触发监听

Observer Api 属于微任务，优先级小于 Promise，每一个Observer 在创建的时候会调用一次，然后每次监听的相关事件触发的时候会执行回调。


IntersectionObserver

- 相交观察者，可以很方便的检测一个元素是否可见或者两个元素是否相交
是一个相交观察器，用于监听 目标元素 与指定的 root 元素（祖先元素或视窗） 的相交状态（可见性）。

root：指定 root 元素，用于检查目标元素的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。
rootMargin： 配置 root 元素的 margin 值，写法同 css margin 写法。用来扩大检查相交的范围。默认值是 0。
threshold：相交门槛。可以是单一数值，也可以是数字数组。目标元素和 root 元素相交的范围达到该值的时候，触发回调，默认值是 0。

0 表示只要有一个像素的相交就会触发回调函数
1 表示完全相交才会触发回调函数
[0, 0.25, 0.5, 0.75, 1.0] 表示会触发 5 次回调函数，分别是，刚相交、相交范围达到 25%、相交范围达到 50%、相交范围达到 75%、完全相交的时候会触发回调函数。

MutationObserver

小案例
删不掉的水印，使用 MutationObserver 实现，对 body 进行监听，处理水印元素被删除的场景，监听水印元素的所有 dom 操作，用来防止被篡改。
提一嘴，MutationObserver 是这几个 Observer API中 兼容性最好的

subtree 可选，当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性。默认值为 false。
childList 可选，当为 true 时，监听 target 节点中发生的节点的新增与删除。默认值为 false。
attributes可选，当为 true 时观察所有监听的节点属性值的变化。默认值为 true，当声明了 attributeFilter 或 attributeOldValue，默认值则为 false。
attributeFilter可选，用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
attributeOldValue可选，当为 true 时，记录上一次被监听的节点的属性变化；
characterData可选，当为 true 时，监听声明的 target 节点上所有字符的变化。默认值为 true，如果声明了 characterDataOldValue，默认值则为 false。
characterOldValue可选，当为 true 时，记录前一个被监听的节点中发生的文本变化。，默认值则为 false。


ResizeObserver

监听元素大小变化，元素display:none进行隐藏的时候，也是会触发监听的
可选的配置对象，用来描述 DOM 的哪些变化应该触发回调。目前只支持box一个属性配置。
box：设置 observer 将监听的盒模型。可能的值是：

content-box（默认），CSS 中定义的内容区域的大小。
border-box，CSS 中定义的边框区域的大小。
device-pixel-content-box，在对元素或其祖先应用任何 CSS 转换之前，CSS 中定义的内容区域的大小，以设备像素为单位。


ReportingObserver


1、浏览器还会在一些情况下对网页行为做一些干预（intervention），比如会把占用 cpu 太多的广告的 iframe 删掉：
2、当浏览器运行到过时（deprecation）的 api 的时候，会在控制台打印一个过时的警告
3、会在网络比较慢的时候把图片替换为占位图片，点击才会加载：

这些干预都是浏览器做的，会在控制台打印一个报告

这些干预或者过时的 api 并不是报错，所以不能用错误监听的方式来拿到，但这些情况对网页 app 来说可能也是很重要的
比如我这个网页就是为了展示广告的，但浏览器一干预给我把广告删掉了，我却不知道。如果我知道的话或许可以优化下 iframe
比如我这个网页的图片很重要，结果浏览器一干预给我换成占位图了，我却不知道。如果我知道的话可能会优化下图片大小



[Observe 介绍](https://juejin.cn/post/7295277070388035622#heading-23)
