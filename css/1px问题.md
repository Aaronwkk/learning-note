```css
/* 伪元素 + transform 实现 */

.border-1px:before{
    content: '';
    position: absolute;
    top: 0;
    height: 1px;
    width: 100%;
    background-color: #999;
    transform-origin: 50% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .border-1px:before{
        transform: scaleY(0.5);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .border-1px:before{
        transform: scaleY(0.33);
    }
}


/* svg 实现
因为 svg 是矢量图形，它的 1px 对应的物理像素就是 1px
可以搭配 PostCSS 的 postcss-write-svg 使用： */

@svg border-1px { 
  height: 2px; 
  @rect { 
    fill: var(--color, black); 
    width: 100%; 
    height: 50%; 
    } 
  } 
.svg { 
    border: 1px solid transparent; 
    border-image: svg(border_1px param(--color #00b1ff)) 2 2 stretch; 
}

```



各种方案

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/513