修改Web Components组件内的样式可以通过几种方法实现，具体取决于你想要如何封装你的样式，以及组件的类型（自定义元素（Custom Elements）或影子元素（Shadow DOM elements））。以下是一些常用的方法：

1. **使用影子DOM（Shadow DOM）**:
   影子DOM允许你在组件内部封装样式，外部样式无法直接影响到封装在影子DOM中的元素。要修改影子DOM中的样式，你需要直接在组件内部进行操作。

   ```javascript
   class MyElement extends HTMLElement {
     constructor() {
       super();
       const shadowRoot = this.attachShadow({mode: 'open'});
       shadowRoot.innerHTML = `
         <style>
           .my-class {
             color: red;
           }
         </style>
         <div class="my-class">My content</div>
       `;
     }
   }
   customElements.define('my-element', MyElement);
   ```

   在这个例子中，`.my-class` 的样式只会应用于影子DOM内部的元素。

2. **通过组件属性修改样式**:
   你可以在组件内部监听属性的变化，并根据属性值动态修改内部元素的样式。

   ```javascript
   class ThemedElement extends HTMLElement {
     connectedCallback() {
       this.updateStyles();
     }
     
     attributeChangedCallback(name, oldVal, newVal) {
       if(name === 'theme') {
         this.updateStyles();
       }
     }
     
     updateStyles() {
       const theme = this.getAttribute('theme');
       this.shadowRoot.querySelector('div').classList.add(theme);
     }
   }
   
   ThemedElement.prototype.updateStyles = function() {
     // Logic to update styles based on attributes
   };
   
   customElements.define('themed-element', ThemedElement);
   ```

3. **使用CSS变量**:
   在Web Components中使用CSS变量，允许你从外部定义样式，然后在组件内部使用这些变量。

   ```css
   :root {
     --main-color: #333;
   }
   
   /* 在组件内部 */
   <style>
     .my-element {
       color: var(--main-color);
     }
   </style>
   ```

4. **外部样式覆盖**:
   如果组件没有使用影子DOM，或者你故意将样式暴露给外部，你可以使用外部样式表来覆盖组件的样式。

   ```css
   my-element {
     color: blue;
   }
   ```

5. **插槽（Slots）**:
   如果你的组件使用插槽来分发内容，你可以为插槽定义样式，这些样式将应用于插入插槽的任何内容。

   ```javascript
   class MyElement extends HTMLElement {
     constructor() {
       super();
       this.attachShadow({mode: 'open'});
       this.shadowRoot.innerHTML = `
         <style>
           ::slotted(.custom-class) {
             font-weight: bold;
           }
         </style>
         <slot></slot>
       `;
     }
   }
   customElements.define('my-element', MyElement);
   ```

6. **JavaScript 动态修改样式**:
   你还可以使用JavaScript来动态修改组件的样式。

   ```javascript
   const myElement = document.querySelector('my-element');
   const style = myElement.shadowRoot.querySelector('style');
   style.textContent = `.my-class { color: green; }`;
   ```

选择哪种方法取决于你的具体需求，比如你是否需要封装样式，或者是否希望允许样式从外部被覆盖或修改。

### ：host 伪类改变 组件样式


在Web组件中，`:host`伪类选择器是用来选中当前定义Shadow DOM的宿主元素（即包含Shadow DOM的元素）。这意味着你可以直接对宿主元素应用样式，而不需要知道它的具体标签名。`:host`伪类非常有用，因为它帮助你保持组件的样式封装，并能根据宿主元素的状态来调整样式。

### 基本写法

基本的`:host`伪类写法如下：

```css
:host {
  /* 在这里添加应用于宿主元素的样式规则 */
  background-color: blue;
  font-size: 16px;
}
```
### :host()伪类函数

:host(.my-card) 只会选择类名为 my-card 的自定义元素, 且它后面也可以跟子选择器来选择自己跟节点下的子元素。

需要注意的是：:host() 的参数是必传的，否则选择器函数失效

### 传参 - 通过属性状态改变样式

虽然`:host`本身不直接“传参”，但你可以利用宿主元素的属性（attributes）来改变其样式。这意味着你可以根据宿主元素上是否存在某个属性或属性的值来应用不同的样式。这通常称为“属性选择器”。

例如，如果你想根据宿主元素上是否存在一个名为`theme`的属性来改变背景颜色，可以这样做：

```css
:host([theme="dark"]) {
  background-color: #333;
  color: white;
}

:host:not([theme="dark"]) {
  background-color: white;
  color: black;
}
```

在这个例子中，如果宿主元素有`theme="dark"`这个属性，那么背景色将变为深色，并且文字颜色变为白色；否则，背景色为白色，文字颜色为黑色。

### 注意

- `:host`仅在Shadow DOM上下文中有效。
- 使用`:host-context()`可以基于宿主元素的祖先元素来改变样式，提供一种跨Shadow DOM边界传递样式的方式。
- 通过监听宿主元素的属性变化并利用JavaScript动态修改样式是一种更复杂的交互方式，但这不属于`:host`伪类直接“传参”的范畴。

### :host-context()伪类函数

用来选择特定祖先内部的自定义元素，祖先元素选择器通过参数传入。比如以下代码：

```js
<div id="container">
    <my-card></my-card>
</div>
<my-card></my-card>
<script>
    class MyCard extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});
            let styleEle = document.createElement("style");
            styleEle.textContent = `
                :host-context(#container){
                    display: block;
                    margin: 20px;
                    width: 200px;
                    height: 200px;
                    border: 3px solid #000;
                }
                :host .card-header{
                    border: 2px solid red;
                    padding:10px;
                    background-color: yellow;
                    font-size: 16px;
                    font-weight: bold;
                }
            `;
            this.shadow.appendChild(styleEle);


            let headerEle = document.createElement("div");
            headerEle.className = "card-header";
            headerEle.innerText = "My Card";
            this.shadow.appendChild(headerEle);
        }
    }

    window.customElements.define("my-card", MyCard);
</script>
```



[Web_Components 系列](https://cloud.tencent.com/developer/article/1943789)