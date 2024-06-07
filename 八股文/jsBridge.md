作为一名前端专家，我来为您解析JavaScript Bridge（JSBridge）的基本原理及其在混合应用开发中的重要角色。

### JSBridge 简介

JSBridge，即JavaScript桥接技术，是一种在Web View（如基于WebView的Hybrid App、PWA等）中实现JavaScript与原生代码（如Java、Swift、Objective-C等）双向通信的技术方案。它的核心目标是打破Web页面与原生应用环境之间的隔离，使得两者能互相调用对方的功能，实现更深层次的交互与集成。

### 原理概述

JSBridge 的工作原理大致可以分为以下几个步骤：

1. **初始化桥接环境**：首先，在应用启动时，原生应用会初始化一个允许JavaScript调用的环境。这通常涉及在Web View中注入一段JavaScript脚本，这段脚本定义了一系列用于触发原生方法的函数。

2. **消息传递机制**：JSBridge的核心是一个消息传递系统，它允许JavaScript与原生代码之间发送请求和接收响应。这个过程通常采用异步的方式进行，确保不阻塞各自的执行线程。

    - **从JavaScript到原生**：当Web页面需要调用原生功能时，JavaScript会构造一个包含调用信息（如方法名、参数等）的消息，然后通过特定的接口（如`window.postMessage`）发送给原生端。
    
    - **从原生到JavaScript**：原生代码接收到消息后，解析调用信息并执行相应的原生函数。执行完毕后，再通过事先约定好的方式（通常是回调函数或者事件机制），将结果封装成消息发送回JavaScript环境。

3. **安全与沙箱策略**：为了安全起见，原生应用会对从JavaScript传来的消息进行验证和过滤，防止恶意代码的执行。同时，双方的交互也需遵循一定的权限控制和沙箱原则，确保不会影响到应用的稳定性和安全性。

### 实现方式

- **注入脚本**：原生应用通过Web View的API（如Android的`WebView.addJavascriptInterface`，iOS的WKWebView的`WKUserContentController`）向Web页面注入一个或多个JavaScript对象，这些对象作为桥接的入口点，供JavaScript调用。

- **事件监听与处理**：在JavaScript端监听特定事件，用于接收来自原生的响应；原生端则通过Web View提供的接口监听JavaScript的消息，并进行处理。

### 应用场景

JSBridge广泛应用于需要Web页面与原生应用紧密集成的场景，比如调用摄像头、访问本地文件、推送本地通知、深度定制的用户界面交互等，极大地丰富了Hybrid App的功能和用户体验。

总之，JSBridge作为连接Web与原生世界的桥梁，是现代混合应用开发不可或缺的一部分，它让前端开发者能够利用原生能力，同时保持Web开发的灵活性和高效迭代特性。

# 具体实现

以下是一个简化的JavaScript Bridge实现示例，分别展示JavaScript端和原生端（以Android为例）如何设置和使用JSBridge进行通信。

### JavaScript 端

在Web页面中，我们可以通过`postMessage`方法向原生应用发送消息，并通过监听`message`事件来接收原生应用的响应。

```javascript
// 定义发送消息到原生的方法
function callNative(method, params, callback) {
    window.postMessage({
        type: 'nativeCall',
        method: method,
        params: params,
        callbackId: callback ? generateCallbackId(callback) : null,
    });
}

// 接收原生返回的消息
window.addEventListener('message', function(event) {
    if (event.data.type === 'nativeCallback') {
        var callback = getCallback(event.data.callbackId);
        if (callback) {
            callback(event.data.result);
            deleteCallback(event.data.callbackId);
        }
    }
}, false);

// 生成唯一回调ID
var callbackId = 0;
function generateCallbackId(callback) {
    callbackId++;
    callbacks[callbackId] = callback;
    return callbackId;
}

// 获取并执行回调函数
var callbacks = {};
function getCallback(id) {
    return callbacks[id];
}

function deleteCallback(id) {
    delete callbacks[id];
}
```

### Android 原生端

在Android中，我们通过`WebView`的`addJavascriptInterface`方法暴露一个Java对象给JavaScript调用，并通过`WebViewClient`的`onReceiveValue`方法接收JavaScript发来的消息。

首先，定义一个Java类作为JavaScript可以访问的接口：

native调用js

```java
// 安卓4.4版本之前，无法获取返回值
// mWebView = new WebView(this); // 即当前webview对象
mWebView.loadUrl("javascript: 方法名('参数，需要转为字符串')")

// 安卓4.4及以后
//  webView.evaluateJavascript("javascript:if(window.callJS){window.callJS('" + str + "');}", new ValueCallback<String>() {
mWebView.evaluateJavascript("javascript: 方法名，参数需要转换为字符串", new ValueCallback() {
    @Override
    public void onReceiveValue(String value) {
    // 这里的value即为对应JS方法的返回值
    }
})

// js 在全局window上声明一个函数供安卓调用
window.callAndroid = function() {
    console.log('来自中h5的方法，供native调用')
    return "来自h5的返回值"
}

/** 总结：
  1. 4.4 之前Native通过loadUrl来调用js方法，只能让某个js方法执行，但是无法获取该方法的返回值
  2. 4.4 之后，通过evaluateJavaScript异步调用js方法，并且能在onReceive中拿到返回值
  3. 不适合传输大量数据
  4. mWebView.loadUrl("javascript: 方法名") 函数需在UI线程运行，因为mWebView为UI控件，会阻塞UI线程
*/
```
JS调用Native

```java
// 安卓环境配置
WebSettings webSettings = mWebView.getSettings();
// Android容器允许js脚本，必须要
webSettings.setJavaScriptEnabled(true);
// Android 容器设置侨连对象
mWebView.addJavascriptInterface(getJSBridge(), "JSBridge");

// Android中JSBridge的业务代码
private Object getJSBridge() {
    Object insterObj = new Object() {
        @JavascriptInterface
        public String foo() {
            // 此处执行 foo  bridge的业务代码
            return "foo" // 返回值
        }
        @JavascriptInterface
        public String foo2(final String param) {
            // 此处执行 foo2 方法  bridge的业务代码
            return "foo2" + param;
        }
    }
    return inserObj;
}
// js调用原生的代码
// JSBridge 通过addJavascriptInterface已被注入到 window 对象上了
window.JSBridge.foo(); // 返回 'foo'
window.JSBridge.foo2(); // 返回 'foo2:test'
// 注意：在安卓4.2之前 addJavascriptInterface有风险,hacker可以通过反编译获取Native注册的Js对象，然后在页面通过反射Java的内置 静态类，获取一些敏感的信息和破坏

```
# ios 操作方法

```js

  // 注意：ios7 以前 js无法调用native方法，ios7之后可以引入第三方提供的 JavaScriptCore 库
  /*
      总结：
      1. ios7 才出现这种方式，在这之前js无法直接调用Native，只能通过JSBridge方式调用
      2. JS 能调用到已经暴露的api，并且能得到相应返回值
      3. ios原生本身是无法被js调用的，但是通过引入官方提供的第三方“JavaScriptCore”，即可开发api给JS调用
  */
  // WKWebview  ios8之后才出现，js调用native方法
  // ios 代码配置 https://zhuanlan.zhihu.com/p/32899522
  // js调用
  window.webkit.messageHandlers.{name}.postMessage(msgObj);

  /*
      * 优缺点
      ios开发自带两种webview控件 UIWebview（ios8 以前的版本，建议弃用）版本较老，
      可使用JavaScriptCore来注入全局自定义对象
      占用内存大，加载速度慢
      WKWebview 版本较新 加载速度快，占用内存小
  */

```

native 调用 js

```js
// UIWebview
[webView stringByEvaluatingJavaScriptFromString:@"方法名(参数);"];
// WKWebview
[_customWebView evaluateJavaScript:[@"方法名(参数)"] completionHandler:nil];
--------------------
// js 调用 native
// 引用官方库文件 UIWebview（ios8 以前的版本，建议弃用）
#import <JavaScriptCore/JavaScriptCore.h>
// webview 加载完毕后设置一些js接口
-(void)webViewDidFinishLoad:(UIWebView *)webView{
    [self hideProgress];
    [self setJSInterface];
}

-(void)setJSInterface{ 
    JSContext *context =[_wv valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    // 注册名为foo的api方法
    context[@"foo"] = ^() {
    //获取参数
        NSArray *args = [JSContext currentArguments];
        NSString *title = [NSString stringWithFormat:@"%@",[args objectAtIndex:0]];
        //做一些自己的逻辑 返回一个值  'foo:'+title
        return [NSString stringWithFormat:@"foo:%@", title];
    };
}
window.foo('test'); // 返回 'foo:test'


```

# url scheme 介绍

url scheme是一种类似于url的链接，是为了方便app直接互相调用设计的：具体为：可以用系统的 OpenURI 打开类似与url的链接（可拼入参数），然后系统会进行判断，如果是系统的 url scheme，则打开系统应用，否则找看是否有app注册中scheme，打开对应app，需要注意的是，这种scheme必须原生app注册后才会生效，如微信的scheme为 weixin://


调用过程（如用 iframe.src），然后native用某种方法捕获对应的url触发事件，然后拿到当前触发url，根据定好的协议(scheme://method/?params=xxx)，然后native拦截该请求分析当前触发了哪种方法，然后根据定义来实现


客户端捕获url

安卓捕获 url scheme：shouldoverrideurlloading 捕获到url进行分析
ios： 在 UIWebView WKWebview 内发起的所有网络请求，都可以通过 delegate函数在native层得到通知，通过 shouldStartLoadWithRequest捕获webview中触发的url scheme



大致流程：h5 --> 通过某种方式触发一个url --> native捕获到url，进行分析 -->原生做处理 --> 如果需要回调 native再调用h5的JSBridge对象传递回调


缺点：速度可能稍慢一点，url长度会有限制，需要定义url结构解析较为复杂


相较于注入api形式有以下有优点：

Android4.2 一下，addJavaScriptInterface方式有安全漏洞
ios7以下，js无法调用native
url scheme交互方式是一套现有的成熟方案，可以兼容各种版本

重写prompt/alert等原生方法
native会劫持webviewonJsAlert、onJsConfirm、onConsoleMessage、onJsPrompt并进行重写，好像ios高版本对此方式做了限制


JSBridge.send内部的callNative的具体实现

```js
// url schema 实现
// 变成字符串并编码
var url = scheme://ecape(JSON.stringify(param))

// 使用内部创建好的iframe来触发scheme（location.href = 可能会造成跳转问题）
var iframe = document.createElment('iframe');
iframe.src = url;
document.head.appendChild(iframe);
setTimeout(() => document.head.removeChild('iframe'), 200)
```


api注入方式

```js
// ios
window.webkit.messageHandlers.{name}.postMessage(JSON.stringify(params))

// 安卓
window.{name}.{name}(JSON.stringify(params))
```