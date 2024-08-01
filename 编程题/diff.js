const pre = [1, 2, 3, 4, 5, 6];
const now = [1, 6, 2, 4, 5, 3];

const nodeOps = {
  remove(parent, node) {
    parent.removeChild(node);
  },
  insertBefore(parent, referenceNode, newNode) {
    parent.insertBefore(newNode, referenceNode);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  createElement(tagName) {
    return document.createElement(tagName);
  }
};

const parent = document.body; // 假设 body 已经存在

function diff(pre, now) {
  const len = Math.max(pre.length, now.length);
  const map = new Map();

  // 构建 pre 数组的索引映射
  pre.forEach((item, index) => {
    map.set(item, index);
  });

  // 更新或插入节点
  for (let i = 0; i < len; i++) {
    if (i >= now.length) {
      // 如果 now 数组较短，删除多余的节点
      nodeOps.remove(parent, pre[i]);
      continue;
    }

    if (pre[i] === now[i]) continue;

    if (map.has(now[i])) {
      // 移动已存在的节点
      const oldIndex = map.get(now[i]);
      const node = pre[oldIndex];
      nodeOps.insertBefore(parent, pre[i], node);
      pre[i] = node;
      map.delete(now[i]); // 清除旧的映射
      map.set(now[i], i); // 更新映射
    } else {
      // 创建并插入新节点
      const dom = nodeOps.createElement(now[i].toString()); // 假设 tagName 为数字的字符串形式
      nodeOps.insertBefore(parent, pre[i], dom);
    }
  }

  // 添加 now 数组中新增的节点
  for (let i = now.length; i < pre.length; i++) {
    const dom = nodeOps.createElement(now[i].toString());
    nodeOps.append(parent, dom);
  }
}

diff(pre, now);