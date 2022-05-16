### 开始
项目框架
* [create-app-react](https://www.html.cn/create-react-app/docs/getting-started/)
* [react](https://reactjs.org/)
* [typescript](https://www.typescriptlang.org/)
* [styled-components](https://www.styled-components.com/)
* [mbox]()
* [Optional Chaining]()


### 开发

```
安装
$ git clone 
$ yarn || npm install
$ yarn start || npm run start
开发
1、scene/components下新建页面
2、如要配置则scene-config下新建配置文件
3、router-config新建路由配置，详细配置看api--路由配置router-config
打包
开发：npm run build:dev 
测试：npm run build:test
预发：npm run build:pre
线上：npm run build:pro
```

### 目录

```
src
  ├── api                          // 接口管理
  │     └── ...
  ├── constants                    // 存放常量枚举
  │     └── ...
  ├── scene                        // 页面代码
  │     └── index.js               // 网页配置导入
  │     │── components             // 网页内容组件
  │     │     └── component_1               
  │     │          │── index.js             
  │     │          └── index.module.less    // 文件名必须以*.module.less，不推荐，样式可以直接用styled-components
  │     └── ...
  ├── scene-config                 // 页面配置
  │     └── ...
  ├── theme                        // 主题管理
  │     └── ...
  ├── loan-components             // 业务组件
  │     └── ...
  ├── loan-ui                     // ui组件，纯ui，不负责业务处理
  │     └── ...
  ├── loan-utils                  // 公共方法
  │     └── ...
  ├── utils.js                     // 将网页的相关配置注入组件并输出
  ├── router-config.js             // 路由配置
  └── index.ts                     // 导出
```



## QA

> optional-chaining
  * 1、vscode报错，vscode升级到1.41以上，ts升级到3.7以上，可以参考这篇文章： https://stackoverflow.com/questions/51741333/optional-chaining-operator-support-in-vscode
  
> 样式
  * 不建议创建*.module.less使用less,推荐使用styled-components，loan-ui中的styled封装了styled-components，可以直接import { styled } from 'loan-ui'来加载，具体使用参考loan-ui中的组件或百度styled-components

> 主题
  * 主要以hx.json主题文件为主，loan-ui中全部使用这个主题文件，使用styled-components也要用这个
  * antd目前使用的是hx.json主题文件
  * 由于之前使用了hx_front_desk.less，*.module.less中使用了很多类似@hx_theme的主题代码，后面将逐步移除，用hx.json来代替


## ui组件统计

> 开发组件，查看loan-ui/README.md文档

> 具体api，查看loan-ui/__stories__

| 组件名 | 说明 |
| - | - |
| Logo | 头部logo |
| Menu | 头部菜单 |
| ProductList | 贷款列表 |
| Title | 页面标题 |
| Suspend | 页面右下角悬浮 |
| Button | 按钮 |

## api
```
// loan-utils

// 路由配置router-config

{
  path: '',  // 路由名
  component: AsyncLoading(parm),
  permissionKey: '' // 权限，设置后会根据userInfo接口返回的权限字段来判断,若匹配不到就会去/login
}
parm:string -----对应了scene/components/文件名,默认不导入配置文件
parm:{ omponentName: 'aboutUs', componentConfig: 'aboutUs' } ---- componentName对应scene/components/文件名,componentConfig对应scene-config/文件名，传空或false不导入配置文件
注：componentName可对应多份componentConfig，componentName也支持*/*文件格式，但文件下必须有index.js

```

## package.json环境配置

```
本地：start, port: 3021  
开发：build:dev 
测试：build:test
预发：build:pre
线上：build:pro
```
