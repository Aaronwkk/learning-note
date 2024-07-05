#### react-router 里的 <Link> 标签和 <a> 标签有什么区别

先看Link点击事件handleClick部分源码

```js
if (_this.props.onClick) _this.props.onClick(event);

if (!event.defaultPrevented && // onClick prevented default
event.button === 0 && // ignore everything but left clicks
!_this.props.target && // let browser handle "target=_blank" etc.
!isModifiedEvent(event) // ignore clicks with modifier keys
) {
    event.preventDefault();

    var history = _this.context.router.history;
    var _this$props = _this.props,
        replace = _this$props.replace,
        to = _this$props.to;


    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }
```

Link做了3件事情：

有onclick那就执行onclick
click的时候阻止a标签默认事件（这样子点击<a href="/abc">123</a>就不会跳转和刷新页面）
再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

