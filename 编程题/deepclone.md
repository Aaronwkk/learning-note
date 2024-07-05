
根据您提供的两张图片中的代码，我将按照Markdown格式整理并补充完成用例。由于图片中的内容是JavaScript代码，我将首先纠正一些语法错误，并补全代码。以下是整理后的Markdown格式代码和用例：

# 深拷贝函数

- deepCopy 实现

```js

function deepCopy(obj){
  if(obj === null || typeof obj === 'object') return obj

  let res;

  if('_isActiveClone' in obj){
    throw Error('循环引用警告⚠️')
  }

  if(obj instanceOf Date){
    res = new obj.constructor(obj)
  } else {
    res = new obj.constructor()
  }

  Object.keys(obj).forEach(k => {
    obj._isActiveClone = null
    res[k] = deepCopy(obj[k])
    delete obj._isActiveClone
  })

  return res
}

let a = {
  name: 'name',
  list: [1,2,3, {c: 'c'}],
  date: new Date(),
  c: () => {}
}
let obj = {
  people: {
    name: 'name',
  },
  arr: []
}
console.log(deepCopy(obj))

```

## 定义深拷贝函数

```js

const deepClone = function(obj, hash = new WeakMap()) {
  // 处理 null 或 undefined
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 创建对象副本
  let cloneObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

  // 存储到哈希表中，处理循环引用
  hash.set(obj, cloneObj);

  // 遍历对象属性进行拷贝
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  for (let key of Reflect.ownKeys(obj)) {
    if (allDesc[key].get || allDesc[key].set) {
      Object.defineProperty(cloneObj, key, allDesc[key]);
    } else {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
};

// 辅助函数判断复杂数据类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null);

const deepClone = function(obj, hash = new WeakMap()) {

    // 处理 null 或 undefined
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

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
  // 方法返回一个指定对象上某个自身属性的描述符
  // 遍历传入参数所有键的特性
  // Object.getPrototypeOf 是JavaScript中的一个标准内置方法，用于获取一个对象的原型（prototype）
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  // Object.getOwnPropertyNames() 方法返回一个数组，该数组包含了对象的所有自身属性的键名（包括不可枚举属性，但不包括 Symbol 属性）
  // Reflect.ownKeys(obj) 的目的是为了获取对象 obj 所有的自有属性键，包括常规的可枚举和不可枚举属性、Symbol 类型的属性
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = Object.defineProperty(obj[key]) && typeOf obj[key] !== 'function' ?
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

#### 解释下 对象属性的描述符

在JavaScript中，对象的每个属性都有一个关联的属性描述符，它定义了该属性的行为和特性。属性描述符包含了关于属性的元数据，包括其可枚举性、可配置性和值的可写性等。这些描述符由一组关键属性组成，具体取决于属性是数据描述符还是访问器描述符。

1、 数据描述符（Data Descriptors）

数据描述符包含两个主要属性：
- `value`：属性的当前值。
- `writable`：布尔值，指示属性的值是否可以被改变。如果为`true`，则属性值可以被修改；如果为`false`，则尝试修改属性值将抛出一个错误。

另外，数据描述符还包含两个控制权限的关键字：
- `enumerable`：布尔值，指示属性是否可以被枚举。如果为`true`，则属性可以出现在`for...in`循环或`Object.keys()`方法的结果中；如果为`false`，则不能。
- `configurable`：布尔值，指示属性是否可以被删除或其描述符是否可以被重新定义。如果为`true`，则属性可以被删除，其描述符也可以被修改；如果为`false`，则不能。

2、 访问器描述符（Accessor Descriptors）

访问器描述符不存储值，而是定义了读取和/或写入属性的函数，即`getter`和`setter`函数。访问器描述符包含以下属性：
- `get`：一个没有参数的函数，当属性被读取时调用。
- `set`：一个接受单个参数的函数，当属性被赋值时调用。

访问器描述符同样包含`enumerable`和`configurable`属性，作用与数据描述符中的相同。

3、 示例

```javascript
let obj = {};

// 创建一个数据描述符
Object.defineProperty(obj, 'dataProp', {
  value: 10,
  writable: true,
  enumerable: true,
  configurable: true
});

// 创建一个访问器描述符
Object.defineProperty(obj, 'accessorProp', {
  get: function() { return this._internalValue; },
  set: function(value) { this._internalValue = value; },
  enumerable: true,
  configurable: true
});
```

4、 获取和设置描述符

可以使用`Object.getOwnPropertyDescriptor()`方法来获取对象属性的描述符。例如：

```javascript
let descriptor = Object.getOwnPropertyDescriptor(obj, 'dataProp');
console.log(descriptor); // 输出描述符对象
```

描述符的使用使你能够更精细地控制对象属性的行为，这对于创建复杂的、具有特定行为的属性非常有用。