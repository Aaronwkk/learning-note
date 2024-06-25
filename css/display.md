# display:none和visibility:hidden的区别

##### 使用`display:none`属性后
HTML元素（对象）的宽度、高度等各种属性值都将“去失”。

##### 使用`visibility:hidden`属性后
HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。

##### Overflow属性值
`(visible|hidden|scroll|auto)`
前提是先要限制DIV的宽度（width）和高度（height）。
二者都是隐藏HTML元素，在视觉效果上没有区别，但在一些DOM操作中二者还是有所不同的。

###### `cssdisplay:none;`
 使用该属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”。

###### `visibility:hidden;`
  使用该属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在，也即是说它仍具有高度、宽度等属性值。


- v-if、v-show、v-html 的原理是什么，它是如何封装的？

v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染；
v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；
v-html会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值

