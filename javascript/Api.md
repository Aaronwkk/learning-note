- in

in 运算符是用来检查一个对象是否具有指定的属性，这包括直接在对象上的属性以及通过原型链继承来的属性。当我们使用 in 运算符时，它会遍历对象的整个原型链

性能问题：由于 in 运算符需要遍历整个原型链，如果原型链很长，这可能会影响性能。在大多数现代JavaScript引擎中，这种影响已经被优化到最小，但在大量嵌套的原型链中，这仍然是一个潜在的问题

检查直接属性：如果你只想检查一个属性是否直接存在于对象上，而不考虑原型链，可以使用 hasOwnProperty 方法

- getOwnPropertyDescriptors 

方法返回一个指定对象上某个自身属性的描述符 property descriptor

- Reflect.ownKeys(obj)

Reflect.ownKeys(obj) 的目的是为了获取对象 obj 所有的自有属性键，包括常规的可枚举和不可枚举属性、Symbol 类型的属性


