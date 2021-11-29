# 回溯算法总结(backtracking)

解题思路：
1.DFS 和回溯算法区别
DFS 是一个劲的往某一个方向搜索，而回溯算法建立在 DFS 基础之上的，但不同的是在搜索过程中，达到结束条件后，恢复状态，回溯上一层，再次搜索。因此回溯算法与 DFS 的区别就是有无状态重置

2.何时使用回溯算法
当问题需要 "回头"，以此来查找出所有的解的时候，使用回溯算法。即满足结束条件或者发现不是正确路径的时候(走不通)，要撤销选择，回退到上一个状态，继续尝试，直到找出所有解为止

3.怎么样写回溯算法(从上而下，※代表难点，根据题目而变化)
①画出递归树，找到状态变量(回溯函数的参数)，这一步非常重要※
②根据题意，确立结束条件
③找准选择列表(与函数参数相关),与第一步紧密关联※
④判断是否需要剪枝
⑤作出选择，递归调用，进入下一层
⑥撤销选择

1、经典回溯算法 (思考剪枝的条件)

46. 全排列（中等）
47. 全排列 II（中等）：思考为什么造成了重复，如何在搜索之前就判断这一支会产生重复；
39. 组合总和（中等）
40. 组合总和 II（中等）
77. 组合（中等）
78. 子集（中等）
90. 子集 II（中等）：剪枝技巧同 47 题、39 题、40 题；
60. 第 k 个排列（中等）：利用了剪枝的思想，减去了大量枝叶，直接来到需要的叶子结点；
93. 复原 IP 地址（中等）

### 40、[组合总和 II（中等）](https://leetcode-cn.com/problems/combination-sum-ii/)
- dfs 同层遍历 禁用相同元素

```js

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const ans = []
    const list = candidates.sort((a,b) => a-b)

    const dfs = function(arr,begin, path, sum){
        if(sum === 0) {
            const res = []
            for(const a of path){
                res.push(a)
            }
            ans.push(res)
            return
        }
        for(let i = begin; i<arr.length; i++){
            if(arr[i] > sum) return
            // 同一层不能选择相同元素
            if(i>begin && arr[i] === arr[i-1]) continue
            // path是栈数据结构，进栈开始搜索
            path.push(arr[i])
            dfs(arr,i+1, path, sum-arr[i])
            // 出栈恢复状态，继续回溯搜索
            path.pop()
        }
    }
    dfs(candidates,0, [], target)
    return ans
};

```
