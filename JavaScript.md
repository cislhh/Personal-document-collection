## JavaScript

#### 1、instanceof、Array.isArray、Object.prototype.toString.call()判断数组的区别和优劣
1. instanceof
使用instanceof判断数组，instanceof会判断这个对象的原型链上是否会找到对应的Array的原型，找到则返回true，否则返回false;
instanceof 只能判断对象，原始类型不可以， 并且所有对象类型 instanceof Object 都返回true    

2. Array.isArray
当检测Array实例时，Array.isArray 优于 instanceof
其内部原理是基于Object.prototype.toString.call()
```js
Array.isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
```

3. Object.prototype.toString.call()
任何数据类型的原型最终指向Object， Object的最终指向null。
Object有一个内置方法toString, 通过call()方法可以判断任何数据类型， symbol也可以

```js
let s = Symbol(2)
Object.prototype.toString.call(s)  // "[object Symbol]"
```


