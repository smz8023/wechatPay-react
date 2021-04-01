# wechatPay

## 安装和运行

```sh
yarn && yarn dev
```

## 目录结构说明

```text
config: 配置文件，react-create-app 执行了 eject 后的配置文件夹
src: 开发目录
    locales: 国际化配置
    pages: 页面目录
    request: 请求目录
    routes: 路由目录
    store: mobx 数据仓库
    App.less: 主体的样式，如果有全局的样式可以考虑写这里
    App.tsx 主体文件，权限判断、页头、页尾、路由控制
    index.tsx 入口文件，App 在这里进行注册挂载
tools:工具脚手架
```

## 组件说明

- 技术框架 [React](https://react.docschina.org/)
- 数据管理 [MobX](https://cn.mobx.js.org/)
- 路由管理 [React Router](http://react-guide.github.io/react-router-cn/)
- UI 组件 [Ant Design](https://ant.design/docs/spec/introduce-cn)
- 请求插件 [Axios](http://www.axios-js.com/zh-cn/docs/)
- CSS 预处理器 [Less](https://less.bootcss.com/)
