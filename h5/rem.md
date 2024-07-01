#### rem的计算规则

首先 DPR 指的是像素比(物理像素 / CSS像素)。以 iPhone6/7/8 来举例，其物理像素为 750px，CSS 像素(设备宽度)为375px，DPR 为 2。此时 UI 要给我们一张图占满整个屏幕的图，那么他应该按照 750px 起稿还是 350px 起稿?

在实际开发中，设计者为了页面的高清，都是采用物理像素的值来进行设计。如 iPhone6/7/8 的设备宽度为 375px，则将其缩放为 750px。

但在我们日常开发中，从设计稿量出来都是像素，假设从设计稿量出来是 100px，那怎么知道这是多少列呢?

此时就需要一个转换了，我们需要算出测量出来的宽度在总宽度中究竟占几列。
假如设计稿是按照 iPhone 6/7/8 尺寸(750px)设计的，我们测量出来的是 100px，而换算成设备像素(375px)就是 50px。得知一列的宽度和总宽度，那么可以算出 50/3.75 约等于13.33列，也就是设置为13.33 * 1列的宽度。


设置方法，代码计算

rem(倍数） =  width  / （html的font-size）=>  width = (html的font-size) * rem(倍数)


```js

!(function(win, doc){
  function setFontSize() {
    // 获取window 宽度
    // zepto实现 $(window).width()就是这么干的
    var winWidth =  window.innerWidth;
    // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;
    
    // 640宽度以上进行限制 需要css进行配合
    var size = (winWidth / 640) * 100;
    doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px' ;
  }

  var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

  var timer = null;

  win.addEventListener(evt, function () {
    clearTimeout(timer);

    timer = setTimeout(setFontSize, 300);
  }, false);

  win.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      clearTimeout(timer);

      timer = setTimeout(setFontSize, 300);
    }
  }, false);
  // 初始化
  setFontSize();

}(window, document));


```

```js

// ( 用户设备宽度 / 设计稿标准宽度 ) * 100

function setRem (baseWidth = 750) {
  const dpr = window.devicePixelRatio
  const currentWidth = document.documentElement.clientWidth
  let remSize = 0
  let scale = 0
  scale = currentWidth / baseWidth
  remSize = 100 * scale
  document.documentElement.style.fontSize = `${remSize}px`
  console.log(remSize)
  document.documentElement.setAttribute('data-dpr', `${dpr}`)
}
```

rem布局的缺点：

在响应式布局中，必须通过js来动态控制根元素font-size的大小，也就是说css样式和js代码有一定的耦合性，且必须将改变font-size的代码放在css样式之前

现在设计稿给你的尺寸是 750 不是 375，那如果设计稿是 100px的 宽度，vw应该写多少？

因为设计稿尺寸翻倍了，你可以将设计稿上的尺寸除以2后再传递给函数，这样，无需改动函数内部的基准值，也能得到正确的结果。



<!-- https://juejin.cn/post/7048175027644006408 -->

(一次搞懂数据大屏适配方案 (vw vh、rem、scale))[https://juejin.cn/post/7163932925955112996#heading-16]