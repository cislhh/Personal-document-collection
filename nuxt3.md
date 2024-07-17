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



## 5、nuxt3配合element plus配置主题色

大部分情况下我们需要使用的UI组件库的默认颜色不符合我们自己的主题色，要修改，在nuxt中修改步骤略多，记录一下

##### 1、在nuxt.config.ts中配置如下
```ts
vite: {
// 预加载
    optimizeDeps: {
        include: ['element-plus'],
    },
// 引入修改的主题变量
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: ' @use "@/assets/element/index.scss" as *;', //全局引入变量
            },
        },
    },
},
// 最重要的，引入elementplus，覆盖原本的主题样式
elementPlus: {
    importStyle: 'scss',
},
```
##### 2、创建自己的主题scss文件
```scss
// @import "element-plus/theme-chalk/base.css";

// // 覆盖 primary 主题色
// :root{
//   --el-color-primary: #0cba80 !important;
// }
/* 修改方法参考element默认global样式的写法，地址：https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss */

@use 'sass:map';
@use 'sass:math';
$colors: () !default;
$colors: (
    '--color-white': #ffffff,
    '--color-black': #000000,
    '--color-primary': #f84343,
    '--color-success': #ff7b7b,
    '--color-warning': #e5ff00,
    '--color-danger': #ff0000,
    '--color-error': #ff0000,
    '--color-info': #6b6b6b,
    '--color-bg-1': #fff,
    '--color-bg-2': #f5f5f5,
    '--color-text-1': #000,
    '--color-text-2': #333,
    '--color-text-3': #666,
    '--color-top-menu-theme': #0011ff,
    '--el-menu-active-color': #ffffff,
    '--color-top-menu-text': #000000a6,
    '--color-top-menu-title': #ffffff,
    '--color-top-menu-bg': #014bae,
    '--color-sub-menu-text': #000000a6,
    '--color-sub-menu-bg': #000c17,
    '--color-sub-menu-hover': #103b63,
    '--color-border': #d4d4d4,
);

// 默认主题色
$primary: map.get($colors, --color-primary);
$success: map.get($colors, --color-success);
$warning: map.get($colors, --color-warning);
$danger: map.get($colors, --color-danger);
$info: map.get($colors, --color-info);
// 主背景色
$bg-main: map.get($colors, --color-bg-1);
// 次背景色
$bg-sec: map.get($colors, --color-bg-2);
// 文字颜色
$text-1: map.get($colors, --color-text-1);
$text-2: map.get($colors, --color-text-2);
$text-3: map.get($colors, --color-text-3);
// 边框
$border: map.get($colors, --color-border);
// 侧边导航宽度
$base-sidebar-width: 200px;
// 导航栏高度
$navbar-height: 60px;
// 默认菜单主题
$navbar-theme: map.get($colors, --color-top-menu-theme);
$base-menu-color: map.get($colors, --color-top-menu-text);
$base-menu-color-active: map.get($colors, --color-top-menu-active);
$base-menu-background: map.get($colors, --color-menu-bg);
$base-logo-title-color: map.get($colors, --color-top-menu-title);
$base-sub-menu-color: map.get($colors, --color-sub-menu-text);
$base-sub-menu-background: map.get($colors, --color-sub-menu-bg);
$base-sub-menu-hover: map.get($colors, --color-sub-menu-hover);
// 导航栏背景色
$top-bar-bg: linear-gradient(90deg, #2a65f6, #2879ff, #449cf8);
// dark
/* $color-black:map.get($colors, --color-black); */
// --el-color-primary-dark-2

// types
$types: primary, success, warning, danger, error, info;
$elcolor: '--el-color';
$color: '--color';
$modeLight: 'light';
$modeDark: 'dark';
:root {
    // @each $key, $value in $colors {
    //   #{$key}: $value;
    // }
    //替换elementui颜色
    @each $type in $types {
        #{$elcolor}-#{$type}: map.get($colors, #{$color}-#{$type});
        @for $i from 1 through 9 {
            #{$elcolor}-#{$type}-#{$modeLight}-#{$i}: mix(
                map.get($colors, --color-white),
                map.get($colors, #{$color}-#{$type}),
                math.percentage(math.div($i, 10))
            );
        }
        @for $i from 2 through 1 {
            #{$elcolor}-#{$type}-#{$modeDark}-#{$i}: mix(
                map.get($colors, --color-white),
                map.get($colors, #{$color}-#{$type}),
                math.percentage(math.div($i, 20))
            );
        }
    }
}

```

## 5、 NuxtImage不读取本地文件
解决方法有两个，看具体原因
1、有时候会因为网络问题或者发包问题，ipx的模块没有被安装，"ipx"是一个用于处理图像的库，它可能是在你的项目中被引入的。然而，由于某些原因，Nuxt.js无法找到该模块的确切位置，因此会发出警告。
```shell
npm install ipx
```

2、都没问题，路径没问题就是不渲染，装一个sharp的插件，没弄明白干啥的，反正装了就好使
```shell
npm install sharp
```

3、上面两个都弄了，还是不好使，老老实实用el-image吧

## 6、 nuxt3中使用动态组件不渲染问题
想使用 Vue 的 <component :is="someComputedComponent"> 语法，需要使用 Vue 提供的 resolveComponent 辅助函数
```vue
<script setup lang="ts">
    const MyButton = resolveComponent('MyButton')
</script>

<template>
    <component :is="MyButton" />
</template>
```
