PerformanceObserver

`PerformanceObserver` 的 `entryType` 属性用于指定观察器应该监听哪种类型的性能条目。以下是 `PerformanceObserver` 支持的 `entryType` 属性列表，这些条目类型代表了不同的性能指标和事件：

1. **`'paint'`**：
   - 捕获页面绘制事件，如 `first-paint`, `first-contentful-paint` 和 `last-contentful-paint`。

2. **`'navigation'`**：
   - 捕获导航事件，提供关于页面加载过程的信息。

3. **`'resource'`**：
   - 捕获资源加载事件，如图片、脚本、样式表等。

4. **`'mark'`**：
   - 捕获通过 `performance.mark()` 添加的性能标记。

5. **`'measure'`**：
   - 捕获通过 `performance.measure()` 计算的性能测量。

6. **`'frame'`**：
   - 捕获帧渲染事件，如 `largest-contentful-paint` 和每帧的渲染时间。

7. **`'event'`**：
   - 捕获与事件处理相关的性能数据。

8. **`'task'`**：
   - 捕获与任务队列相关的性能数据，如宏任务和微任务的执行时间。

9. **`'longtask'`**：
   - 捕获长任务，即持续时间超过50ms的任务，这可能会影响页面的交互性。

10. **`'paint'`**：
    - 已经提到过，但这里再次强调，因为它是最常用的性能指标之一。

11. **`'first-input'`**：
    - 捕获用户第一次与页面交互的事件，用于计算 `first-input-delay`。

12. **`'layout-shift'`**：
    - 捕获布局偏移事件，用于计算累积布局偏移（Cumulative Layout Shift，CLS）。

13. **`'element'`**：
    - 捕获 HTML 元素的加载时间，属于 `Element Timing` API 的一部分。

14. **`'webview'`**：
    - 在某些环境中，如 Chrome 的 WebView，可以捕获 WebView 的性能事件。

15. **`'function'`**：
    - 一些实验性的功能可能使用这种类型，但这不是标准的一部分。

16. **`'http2'`**：
    - 捕获 HTTP/2 协议相关的性能事件，如流和会话级别的数据。

请注意，某些 `entryType` 可能需要浏览器的支持，并且在不同的浏览器版本中可用性可能会有所不同。例如，`'largest-contentful-paint'`, `'first-input'` 和 `'layout-shift'` 等指标是在近几年的浏览器更新中逐渐引入的，主要用于现代的 Web 性能指标测量。

当你创建一个 `PerformanceObserver` 实例时，你可以通过 `{ entryTypes: ['type1', 'type2', ...] }` 形式的选项来指定要监听的条目类型。如果想要监听所有类型，可以使用 `PerformanceObserver.supportedEntryTypes` 来获取当前浏览器支持的所有条目类型。