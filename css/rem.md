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

<!-- https://juejin.cn/post/7048175027644006408 -->

(一次搞懂数据大屏适配方案 (vw vh、rem、scale))[https://juejin.cn/post/7163932925955112996#heading-16]