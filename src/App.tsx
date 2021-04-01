import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";

import stores from "./store";
import routes, { AsyncRoute } from "./routes";

import "./App.less";

// 用于权限判断，如果用户未登录就进到个人中心就进行重定向
function AuthRouter(item: AsyncRoute) {
  const meta = item.meta;
  let hasPermission = true;
  if (meta) {
    const isAuth = false;
    if (meta.auth && !isAuth) {
      hasPermission = false;
    }
  }
  if (item.component && hasPermission) {
    // eslint-disable-next-line
    return (
      <Route
        key={item.path}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    );
  }

  return <Redirect key={item.path} to="/" />;
}

function App() {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <div className="App-content">
          <Switch>{routes.map((route) => AuthRouter(route))}</Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
