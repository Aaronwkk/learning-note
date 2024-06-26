`flex: 1` 是 CSS Flexbox（弹性盒子布局）中一个非常实用的简写属性值，它涉及到弹性盒子模型中的三个核心属性：`flex-grow`、`flex-shrink` 和 `flex-basis`。当为一个弹性子项（flex item）设置 `flex: 1` 时，实际上是在同时指定这三个属性的值，具体如下：

1. **flex-grow**: 这个属性控制着弹性盒子内子项在主轴方向上分配额外空间的方式。当容器有多余空间时，`flex-grow` 决定了子项能“增长”的比例。值为1意味着该子项会与其他同样具有 `flex-grow: 1` 的子项等比例地分享所有剩余空间。如果一个子项的 `flex-grow` 设定为2，而另一个是1，那么前一个子项会获取两倍于后一个子项的额外空间。

2. **flex-shrink**: 当容器空间不足时，这个属性决定了子项能够收缩的程度。值为1表示如果需要，该子项可以按比例缩小以适应容器。默认情况下，所有子项的 `flex-shrink` 都是1，意味着它们都将等比例缩小以应对空间不足的情况。但当设置为 `flex: 1` 时，我们通常关注的是扩展行为而非收缩。

3. **flex-basis**: 定义了在分配剩余空间之前，子项在主轴上的初始大小。当设置为 `flex: 1` 时，`flex-basis` 的默认值通常是 `0%`，意味着在计算分配额外空间之前，该子项不占据任何“基础”大小，完全依赖于 `flex-grow` 来分配空间。

综上所述，`flex: 1` 实际上是一个便捷的写法，相当于 `flex: 1 1 0%`，意味着：
- 该子项愿意并能够按照与其他同配置子项相等的比例来分配任何额外空间（`flex-grow: 1`），
- 同样愿意在需要时按相同比例缩小（`flex-shrink: 1`），
- 并且在计算分配前不设定固定的基准大小，让其大小完全由分配过程决定（`flex-basis: 0%`）。

这使得 `flex: 1` 成为了创建响应式布局、实现元素自适应尺寸的理想选择，特别是在想要子元素均匀填充容器剩余空间的情况下。