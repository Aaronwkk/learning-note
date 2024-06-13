http websocket sse(sever sent event)

XHR+Streaming模式，即使用XMLHttpRequest（XHR）实现的数据流传输，是一种允许服务器持续发送数据到客户端，而不需要等待整个响应完成的技术。这与传统的XHR请求形成对比，传统请求通常在服务器响应全部数据后才结束，而streaming模式则在数据可用时就开始传输，这对于传输大量数据或实时数据流尤其有效。以下是XHR+Streaming模式的一些关键特点和应用场景：

### 关键特点：

1. **数据即时传输**：服务器可以一边处理数据一边将部分结果发送给客户端，无需等到所有处理完成。这对于实时日志查看、视频音频流传输、大数据量的实时传输等场景非常有用。

2. **节省带宽和资源**：通过逐步传输数据，减少了整体数据传输的延迟，对于长连接和实时数据更新的应用场景，可以显著降低带宽占用和提高用户体验。

3. **更好的控制权**：与EventSource相比，XHR提供了更多的灵活性。开发者可以自定义请求头（包括认证信息等），选择POST方法发送数据，以及更细粒度的异常控制。

4. **兼容性**：XHR是几乎所有现代浏览器都支持的标准技术，而streaming作为其特性之一，也有很好的兼容性基础。

### 实现方式：

1. **设置XHR为streaming模式**：通过设置XHR的`responseType`属性为`stream`（在某些环境下可能是`blob`或`moz-chunked-arraybuffer`等，取决于浏览器实现），可以开启流式传输。

   ```javascript
   var xhr = new XMLHttpRequest();
   xhr.open('GET', '/your/streaming/data/source', true);
   xhr.responseType = 'stream'; // 或其他兼容的类型
   ```

2. **监听progress事件**：通过监听`onprogress`事件，可以在数据片段到达时处理它们，而不是等待整个响应完成。

   ```javascript
   xhr.onprogress = function(e) {
       if (e.lengthComputable) {
           var percentComplete = e.loaded / e.total;
           console.log(`Loaded ${percentComplete * 100}%`);
       }
       if (e.data) {
           processData(e.data); // 处理接收到的数据片段
       }
   };
   ```

3. **错误处理和关闭**：通过监听`onerror`和`onloadend`事件来处理错误和请求结束的逻辑。

### 应用场景：

- **实时数据分析**：在大数据分析场景中，服务器可以边处理数据边将分析结果逐步推送给客户端，实现接近实时的数据可视化。
- **实时日志监控**：在服务器端持续产生日志时，可以立即通过streaming方式推送给运维人员查看，实现即时监控。
- **视频音频流**：视频和音频流媒体服务可以通过XHR+streaming来实现低延迟、连续播放。
- **实时协作工具**：在线文档编辑、协同设计工具等，可以使用此模式实现实时的内容更新和同步。

综上，虽然EventSource在某些方面受限，但XHR+Streaming模式通过提供更多的灵活性和控制能力，满足了更多实际业务场景的需求，尤其是在需要双向通信、自定义请求细节或精细异常处理的场景下。