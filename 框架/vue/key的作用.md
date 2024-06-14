
大名鼎鼎的diff算法，其实就是函数patchKeydChildren里面的逻辑。在进入该函数之前，我们先思考为什么会有patchUnkeyedChildren和patchKeyedChildren两个函数存在，这两者有什么区别？其实最直观的比较，从函数名称可以看出keyed、UnKeyed，其实这两者的区分就是表示子节点是否有key属性来标识。没有key属性，比较起来比较复杂，Vue3中有一段这样的逻辑：

```js
// 代码片段3
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  if (
    __DEV__ &&
    n2.shapeFlag & ShapeFlags.COMPONENT &&
    hmrDirtyComponents.has(n2.type as ConcreteComponent)
  ) {
    // HMR only: if the component has been hot-updated, force a reload.
    return false
  }
  return n1.type === n2.type && n1.key === n2.key
}
```