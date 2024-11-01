# vue3遗漏知识点补充

## 1、组件通信的方式常规方法外的补充
### 1）、第三方插件mitt，这个是一个轻量级的中间件库，用来轻量化解决多层级复杂组件的传值问题，如果一个项目中没有使用pinia进行状态维护，同时又有复杂通信需求，可以使用这个，缺点是注意使用方法，如果使用不当会造成大量垃圾不回收，形成屎山，同时不利于维护
```ts
// 创建中间库
import mitt from 'mitt';
const emitter = mitt()
export default emitter
```
有时候模板地址无效可以直接去git仓库拉取
```vue
<!-- 遵循发布订阅模式，弟 -->
<template>
    Child,{{ toy }}
    <button @click="emitter.emit('set-toy-to-person','i give my toy to you')">set-toy-to-person</button>
</template>
        
<script setup lang="ts">
import emitter from '@/utils/emitter';
</script>
```
```vue
<!-- 遵循发布订阅模式，兄-->
<template>
    {{ personData }}
    <Child />
</template>
  
<script setup lang="ts">
import Child from './Child.vue';
import {ref} from 'vue'
import emitter from '@/utils/emitter';
const personData = ref('person Data')
emitter.on('set-toy-to-person',(val:string)=>{
    personData.value = val
})
</script>
```


