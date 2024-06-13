1. display: none;
效果：元素不显示在页面上，完全从页面布局中移除。
占用空间：不占用任何空间。
事件响应：不会响应任何事件（如点击、鼠标悬停等）。
动画：不适合用于动画效果，因为它会完全移除元素。

2. visibility: hidden;
效果：元素不显示在页面上，但仍然占据空间。
占用空间：占用原来的空间，布局不会受到影响。
事件响应：不会响应任何事件。
动画：可以结合其他属性用于动画效果（如 visibility: hidden; 配合 opacity）。

3. opacity: 0;
效果：元素变得完全透明，但仍然显示在页面上。
占用空间：占用原来的空间，布局不会受到影响。
事件响应：仍然响应事件（如点击、鼠标悬停等）。
动画：适合用于动画效果，如淡入淡出。

总结
display: none;：元素完全从文档流中移除，不占用空间，不响应事件。
visibility: hidden;：元素隐藏但保留空间，不响应事件。
opacity: 0;：元素隐藏但保留空间，仍然响应事件，适合动画效果。
根据具体需求选择合适的隐藏方式来实现所需的效果。

rem
定义：rem 是相对于根元素（<html>）的字体大小的单位。
继承：rem 单位是相对于根元素的字体大小，因此不会受到父元素的影响。即使父元素的字体大小变化，使用 rem 定义的尺寸也保持不变。
用途：rem 常用于全局的尺寸控制，例如字体大小、宽度和高度，确保在整个页面中的一致性。

```css

<style>
html {
  font-size: 16px;
}
.parent {
  font-size: 1.5rem; /* 1.5 * 16px = 24px */
  padding: 1rem; /* 1 * 16px = 16px */
}
</style>

<div class="parent">This is a parent element</div>
```

em
定义：em 是相对于当前元素的字体大小的单位。
继承：em 单位是相对的，会继承父元素的字体大小。如果父元素的字体大小变化，使用 em 定义的尺寸也会相应变化。
用途：em 常用于定义内边距（padding）、外边距（margin）、行高（line-height）和其他与字体相关的属性。

```css
<style>
.parent {
  font-size: 16px;
}
.child {
  font-size: 1.5em; /* 1.5 * 16px = 24px */
  padding: 1em; /* 1 * 24px = 24px */
}
</style>

<div class="parent">
  <div class="child">This is a child element</div>
</div>
```

Flex box 基本概念

flex-grow：定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
flex-shrink：定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
flex-basis：定义项目在分配多余空间之前，占据的主轴空间。默认为 auto。

flex: 1 的具体含义
flex-grow: 1：项目将会吸收剩余空间。所有使用 flex-grow: 1 的项目将均分剩余空间。
flex-shrink: 1：当空间不足时，项目将会缩小。所有使用 flex-shrink: 1 的项目将按比例分配可用空间。
flex-basis: 0：项目在分配多余空间之前，占据 0 的主轴空间。

