babel 插件的实现思路
1）借助 AST 抽象语法树，遍历查找代码中的 await 关键字

2）找到 await 节点后，从父路径中查找声明的 async 函数，获取该函数的 body（函数中包含的代码）

3）创建 try/catch 语句，将原来 async 的 body 放入其中

4）最后将 async 的 body 替换成创建的 try/catch 语句

https://github.com/xy-sea/blog/blob/main/markdown/%E5%A6%82%E4%BD%95%E7%BB%99%E6%89%80%E6%9C%89%E7%9A%84async%E5%87%BD%E6%95%B0%E6%B7%BB%E5%8A%A0try%20catch%EF%BC%9F.md

