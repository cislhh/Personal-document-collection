# 用nuxt3开发微信小程序过程中一些通用的内容管理

## 1、项目初始化
下载模板
```shell
npx nuxi@latest init <project-name>
```
有时候模板地址无效可以直接去git仓库拉取
```shell
git clone -b v3 https://github.com/nuxt/starter.git <project-name>
//-b 是指定分支，目前最新的nuxt3在v3分支。
```

## 2、目录结构

```txt
📁 .nuxt // Nuxt在开发中使用.nuxt/目录来生成你的Vue应用程序。
📁 .output // 当构建你的应用程序用于生产时，Nuxt 会创建 .output/ 目录。
📁 assets // 用于添加所有将由构建工具处理的网站资产。
📁 components // 放置所有 Vue 组件的地方。
📁 composables // 将你的Vue组合式函数自动导入到你的应用程序中。
📁 content // 为你的应用创建一个基于文件的内容管理系统（CMS）。
📁 layouts // Nuxt 提供了一个布局框架，用于将常见的 UI 模式提取为可重用的布局。
📁 middleware // Nuxt 提供了中间件来在导航到特定路由之前运行代码。
📁 modules // 在应用程序中自动注册本地模块。
📁 node_modules // 包管理器会将项目的依赖存储在 node_modules/ 目录中。
📁 pages // Nuxt 提供了基于文件的路由功能，用于在你的 Web 应用中创建路由。
📁 plugins // Nuxt拥有一个插件系统，可以在创建Vue应用程序时使用Vue插件和其他功能。
📁 public // 用于提供网站的静态资源。
📁 server // 用于在应用程序中注册API和服务器处理程序。
📁 utils // 在整个应用程序中自动导入你的工具函数。
📄 .env // 用于指定构建和开发环境变量。
📄 .gitignore // 指定了Git应该忽略的故意未跟踪的文件。
📄 .nuxtignore // 允许 Nuxt 在构建阶段忽略项目根目录下的文件。
📄 app.vue // Nuxt 应用的主要组件，入口文件。
📄 app.config.ts // 使用App Config文件在应用程序中公开响应式配置。
📄 nuxt.config.ts // Nuxt可以通过一个单独的nuxt.config文件进行简单配置。
📄 package.json // 包含了应用程序的所有依赖项和脚本。
📄 tsconfig.json // Nuxt会根据你在Nuxt项目中使用的别名，以及其他合理的默认值，自动生成一个`.nuxt/tsconfig.json`文件。
```

## 3、自动引入模块

修改 `nuxt.config.js` 配置文件，让 `nuxt` 自动引入 `stores` 目录中的文件：

```css
export default defineNuxtConfig({
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores']
  },
})
```

## 4、 使用 autoprefixer

*Autoprefixer*是一款自动管理浏览器前缀的插件

安装 autoprefixer

```html
pnpm install autoprefixer -D
```

nuxt.config.ts配置

```js
postcss:{
  plugins:{
    autoprefixer:{}
  }
}
```



## 5、Uni-app使用插槽

在Uni-app中封装组件使用插槽时要注意普通H5的使用和微信小程序是有区别的，微信小程序是通过在标签上使用slot属性，指定插槽名进行使用，**注意使用方式**

如：

```html
//wx
<image wx:if="{{a}}" class="w-2d5 h-5 mr-3d5" src="/static/images/mission/goback_icon@2x.png" bindtap="{{b}}" alt="goback" slot="left" />

//vue3
<template #left v-if="showLeft">
	<img class="w-2.5 h-5 mr-3.5" src="/static/images/mission/goback_icon@2x.png" @click="navigateBack" alt="goback" />
</template>
```

## 6、Uni-app在编译rem到rpx没有考虑比例转换

如果遇到使用tailwindcss的时候，rem单位转换到rpx时有错误，需要单独设置样式，使用px转换

## 7、（2024/6/6）微信小程序暂时不支持vue3.4版本新增的defineModel

到目前为止，defineModel的子父组件的双想绑定不能再微信小程序中使用，需要使用原有的实现逻辑，即通过watch监听传入值props和修改值，当修改值改变时，出发emit，将值返回给父组件，父组件获得子组件的更新数据

```vue
//vue-v<3.4
//父组件
v-model:popupOn="popupOn"
//子组件
const emits = defineEmits(['update:popupOn']);
const popup = ref();
const popShow = ref(props.popupOn);
const change = (e) => {
	popShow.value = e.show;
};
watch(
	() => props.popupOn,
	() => {
		popShow.value = props.popupOn;
	}
);
watch(popShow, () => {
	emits('update:popupOn', popShow.value);
});
```

## 7、uniapp在css中引入图片会裂开

目前发现**微信小程序**中，如果在css里引入本地文件，比如设置背景图片，在实际渲染的时候会裂开，要注意

```js
小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件。需以 base64 方式方可使用。
urlToBase64(floder, fileName, format = 'png') {
	let img = `/static/images/${floder}/${fileName}.${format}`;
	
	// #ifdef H5
	return img;
	// #endif

	// #ifdef MP-WEIXIN
	let imgBase64 = wx.getFileSystemManager().readFileSync(img, 'base64');
	let base64Url = `data:image/png;base64,${imgBase64}`;
	return base64Url;
	// #endif
},
```

## 8、uniapp计算移动设备的顶部和底部安全区，兼容微信小程序

```css
头部：margin-top: calc(var(--window-top));
底部：margin-bottom: calc(var(--window-bottom));
```

## 9、uniapp的组件uni-popup（弹出框）在微信小程序会滚动穿透

```css
//需要在不想滚动的页面第一个子节点设置，设置后可以解决外部滚动穿透问题
<page-meta :page-style="'overflow:' + (isShowPopup ? 'hidden' : 'visible')"></page-meta>
```

