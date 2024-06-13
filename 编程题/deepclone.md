
根据您提供的两张图片中的代码，我将按照Markdown格式整理并补充完成用例。由于图片中的内容是JavaScript代码，我将首先纠正一些语法错误，并补全代码。以下是整理后的Markdown格式代码和用例：

# 深拷贝函数

## 定义复杂数据类型判断函数

```javascript
const isComplexDataType = obj => (typeOf obj === 'object' || typeOf obj === 'function') && obj !== null;
```

## 定义深拷贝函数
```javascript
const deepClone = function(obj, hash = new WeakMap()) {
  // 日期对象直接返回一个新的日期对象
  if (obj.constructor === Date) {
    return new Date(obj);
  }
  // 正则对象直接返回一个新的正则对象
  if (obj.constructor === RegExp) {
    return new RegExp(obj);
  }
  // 如果循环引用了就用weakMap来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = isComplexDataType(obj[key]) && typeOf obj[key] !== 'function' ?
      deepClone(obj[key], hash) : obj[key];
  }
  return cloneObj;
};
```

## 验证代码用例
```javascript
let obj = {
  date: new Date(),
  reg: /test/gi,
  nested: {
    value: 123
  }
};

let clonedObj = deepClone(obj);
console.log(clonedObj); // 打印克隆对象
console.log(clonedObj.date === obj.date); // 检查日期对象是否是新实例
console.log(clonedObj.reg === obj.reg); // 检查正则对象是否是新实例
console.log(clonedObj.nested === obj.nested); // 检查嵌套对象是否是新实例
```

请注意，这段代码是一个JavaScript深拷贝函数的示例，它可以处理日期和正则表达式对象，并且能够处理循环引用的情况。用例部分创建了一个包含日期、正则表达式和嵌套对象的原始对象，并使用`deepClone`函数进行克隆，然后打印克隆后的对象并检查日期和正则表达式是否是新创建的实例，以及嵌套对象是否是新实例。


`Reflect.ownKeys` 是 JavaScript 中的一个静态方法，它提供了一种获取对象自身所有键的方法，包括不可枚举的属性（non-enumerable properties）。这个方法与 `Object.keys` 或 `Object.getOwnPropertyNames` 不同，因为它不仅返回对象自身的可枚举属性，还包括了不可枚举的属性。

下面是 `Reflect.ownKeys` 方法的一些关键点：

1. **返回值**：`Reflect.ownKeys` 返回一个数组，包含了对象自身的所有键，包括符号（Symbols）和字符串键。

2. **不可枚举属性**：与 `Object.keys` 相比，`Reflect.ownKeys` 包括了所有键，无论它们是否可枚举。

3. **性能**：在某些情况下，使用 `Reflect.ownKeys` 可能比使用 `Object.getOwnPropertyNames` 更高效，因为它不需要检查键是否可枚举。

4. **兼容性**：`Reflect.ownKeys` 是 ES2015 (ES6) 引入的特性，因此在旧版本的浏览器中可能不受支持。

5. **用途**：当你需要克隆一个对象，并且需要确保包括所有键，包括不可枚举的键时，`Reflect.ownKeys` 是一个有用的工具。

以下是一个简单的例子，展示了如何使用 `Reflect.ownKeys`：

```javascript
const obj = {
  a: 1,
  b: 2,
  [Symbol('sym')]: 3
};

// 使用 Reflect.ownKeys 获取所有键，包括不可枚举的
console.log(Reflect.ownKeys(obj)); // 输出: ['a', 'b', Symbol(sym)]

// 使用 Object.keys 获取可枚举的键
console.log(Object.keys(obj)); // 输出: ['a', 'b']
```

在这个例子中，`Reflect.ownKeys` 返回了包括符号键在内的所有键，而 `Object.keys` 只返回了可枚举的键。