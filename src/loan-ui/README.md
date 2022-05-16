### 需要了解

* [react](https://reactjs.org/)
* [typescript](https://www.typescriptlang.org/)
* [styled-components](https://www.styled-components.com/)

### 开发

```
1、在根目录README.md -- ui组件统计添加相关组件名
2、在相关目录新建index.tsx，必须增加__stories__组件说明文档
```

### 目录

```
// 基础 UI 组件库
base
  ├── component_1                   // 一级：组件
  ├── component_2
  │      │── __stories__             // Demo & 文档
  │      │      ├── index.tsx
  │      │      └── index.md
  │      └── index.tsx               // 源码
  └── ...                          
```

```
// 业务 UI 组件库，内部结构同 base
待开发
```

```
styled // 封装了主题接口
```

```
theme // 提供几种默认的主题配置
```
