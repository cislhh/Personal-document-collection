### JavaScript 中的原始类型与引用类型及可变性学习笔记

#### 原始类型：像快递里的物品

- **定义**：
  - 原始类型（如 `number`, `string`, `boolean`）在赋值时直接复制值本身。
  
- **业务场景**：
  - 在购物网站上查看商品库存：
    ```javascript
    let itemStockA = 10;
    let itemStockB = itemStockA;
    itemStockB = 20;
    console.log(itemStockA);  // 输出 10
    console.log(itemStockB);  // 输出 20
    ```
  - 特点：两个变量分别存储各自的值，互不影响。

#### 引用类型：像外卖地址

- **定义**：
  - 引用类型（如 `object`, `array`）在赋值时实际上赋的是指向值的引用。
  
- **业务场景**：
  - 公司内部多部门共享客户信息：
    ```javascript
    let customerInfo = { name: "小明", age: 30 };
    let salesDepartment = customerInfo;
    let serviceDepartment = customerInfo;

    salesDepartment.name = "小红";
    console.log(serviceDepartment.name);  // 输出 "小红"
    ```
  - 特点：多个变量指向同一个对象，修改一个会影响所有指向该对象的变量。

#### 可变性与不可变性

- **可变性**：
  - 引用类型是可变的，可以直接修改其属性值。
  
- **不可变性**：
  - 原始类型是不可变的，任何对其的修改都会产生新的值。
  
- **业务场景**：
  - 订单号不可变，订单详情可变：
    ```javascript
    // 不可变
    let orderNumber = "123456";
    let newOrderNumber = orderNumber.replace("123", "789");
    console.log(orderNumber);  // 输出 "123456"
    console.log(newOrderNumber);  // 输出 "789456"
    
    // 可变
    let orderDetails = { item: "手机", price: 3000 };
    orderDetails.price = 2500;
    console.log(orderDetails);  // 输出 { item: "手机", price: 2500 }
    ```

#### 避免引用带来的麻烦：深拷贝

- **问题**：
  - 多个变量指向同一对象，修改其中一个会影响其他变量。
  
- **解决方案**：
  - 使用深拷贝技术来复制整个对象，保证修改时不影响原对象。
  
- **业务场景**：
  - 创建新商品时复制模板并修改：
    ```javascript
    let productTemplate = { name: "通用手机壳", price: 20 };
    let newProduct = JSON.parse(JSON.stringify(productTemplate));
    newProduct.name = "iPhone手机壳";
    newProduct.price = 30;
    
    console.log(productTemplate);  // 输出 { name: "通用手机壳", price: 20 }
    console.log(newProduct);  // 输出 { name: "iPhone手机壳", price: 30 }
    ```

#### 结论

理解JavaScript中的原始类型和引用类型以及它们的可变性与不可变性对于编写高效可靠的代码至关重要。这些概念在日常开发工作中频繁出现，掌握它们有助于提高代码质量和维护性。