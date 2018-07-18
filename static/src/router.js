import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import App from "./routes/app";
import {LocaleProvider} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
const {ConnectedRouter} = routerRedux

const Routers = function({ history, app }) {
  const error = dynamic({
    app,
    component: () => import("./routes/error")
  });
  const routes = [
     {
      path: "/mobile/login/:routeid",
      models: () => [import("./models/member")],
      component: () => import("./routes/member/login/index")
    },
    {
      path: "/mobile/result/:suc/:tit",
      models: () => [import("./models/member")],
      component: () => import("./routes/member/resultpage/index")
    },
    {
      path: "/mobile/register",
      models: () => [import("./models/member")],
      component: () => import("./routes/member/register/index")
    },
    {
      path: "/mobile/mine",
      models: () => [import("./models/member")],
      component: () => import("./routes/member/mine/index")
    },
     {
      path: "/mobile/mine/:memberid",
      models: () => [],
      component: () => import("./routes/member/mymembercode/index")
    },
    {
      path: "/mobile/mine/pay/recharge",
      models: () => [
        import ("./models/pay"),
        import ("./models/member")
      ],
      component: () =>
        import ("./routes/member/pay/Recharge")
    },
    {
      path: "/mobile/mine/pay/productcard",
      models: () => [
        import ("./models/pay"),
        import ("./models/member"),
        import ("./models/productcard")
      ],
      component: () =>
        import ("./routes/member/pay/ProductCard")
    },
    {
      path: "/mobile/mine/pay/membercard",
      models: () => [
        import ("./models/pay"),
        import ("./models/member"),
        import ("./models/config")
      ],
      component: () =>
        import ("./routes/member/pay/MemberCard")
    },
    {
      path: "/mobile/order",
      models: () => [import("./models/member"),import("./models/order")],
      component: () => import("./routes/member/order/index")
    },
     {
      path: "/mobile/order/:orderid",
      models: () => [import("./models/order")],
      component: () => import("./routes/member/myordercode/index")
    },
    {
      path: "/mobile/reserve",
      models: () => [import("./models/member"),import("./models/place")],
      component: () => import("./routes/member/reserve/index")
    },
    {
      path: "/callback",
      models: () => [import("./models/member")],
      component: () => import("./routes/wechat/callback")
    },
     {
      path: "/mobile/paypage",
      models: () => [],
      component: () => import("./routes/wechat/paypage")
    }, 
    {
      path: "/mobile/payresult/:issuc/:openid/:money/:type/:mtype/:title",
      models: () => [import("./models/pay")],
      component: () =>
        import ("./routes/member/pay/PayResult")
    },
    {
      path: "/productcard",
      models: () => [
        import ("./models/productcard")
      ],
      component: () =>
        import ("./routes/productcard/index")
    },
    {
      path: "/config",
      models: () => [
        import ("./models/config")
      ],
      component: () =>
        import ("./routes/config/index")
    },
    {
      path: "/productcard/create",
      models: () => [
        import ("./models/productcard")
      ],
      component: () =>
        import ("./routes/productcard/ProductCardForm")
    }, {
      path: "/productcard/edit/:id",
      models: () => [
        import ("./models/productcard")
      ],
      component: () =>
        import ("./routes/productcard/ProductCardForm")
    },
    {
      path: "/memberlist",
      models: () => [
        import ("./models/member")
      ],
      component: () =>
        import ("./routes/member/memberlist/index")
    },
     {
      path: "/orderlist",
      models: () => [
        import ("./models/order")
      ],
      component: () =>
        import ("./routes/order/index")
    },
    {
      path: "/accountslist",
      models: () => [
        import ("./models/accournt")
      ],
      component: () =>
        import ("./routes/accournt/index")
    },
    {
      path: "/memberlist/recharge/:id",
      models: () => [
        import ("./models/member"),
        import ("./models/accournt"),
        import ("./models/productcard")
      ],
      component: () =>
        import ("./routes/member/memberlist/Recharge")
    },
    {
      path: "/memberlist/create",
      models: () => [
        import ("./models/member")
      ],
      component: () =>
        import ("./routes/member/memberlist/MemberForm")
    },
    {
      path: "/memberlist/edit/:id",
      models: () => [
        import ("./models/member")
      ],
      component: () =>
        import ("./routes/member/memberlist/MemberForm")
    },
    {
      path: "/memberlist/orderrecord/:id",
      models: () => [
        import ("./models/order")
      ],
      component: () =>
        import ("./routes/member/memberlist/OrderRecord")
    },
    {
      path: "/memberlist/userecord/:id",
      models: () => [
        import ("./models/accournt")
      ],
      component: () =>
        import ("./routes/member/memberlist/UseRecord")
    },
    {
      path: "/memberlist/orderrecord/:id/add",
      models: () => [
        import ("./models/place")
      ],
      component: () =>
        import ("./routes/order/OrderAdd")
    },
     {
      path: "/memberlist/orderrecord/:id/:oid",
      models: () => [
        import ("./models/order"),
        import ("./models/place")
      ],
      component: () =>
        import ("./routes/order/OrderForm")
    },
     {
      path: "/memberlist/orderrecord/:id/:oid/orderend",
      models: () => [
        import ("./models/order"),
        import ("./models/place")
      ],
      component: () =>
        import ("./routes/order/OrderEnd")
    },
    {
      path: "/showApi",
      models: () => [import("./models/showApi")],
      component: () => import("./routes/showApi/index")
    },
    {
      path: "/tableManager",
      models: () => [import("./models/tableManager")],
      component: () => import("./routes/tableManager/index")
    },
    {
      path: "/tableManager/create",
      models: () => [import("./models/tableForm")],
      component: () => import("./routes/tableManager/TableForm")
    },
    {
      path: "/tableManager/edit/:id",
      models: () => [import("./models/tableForm")],
      component: () => import("./routes/tableManager/TableForm")
    },
  ];
  return (
     <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/memberlist" />}
          />
          {routes.map(({ path, ...dynamics }, key) => (
            <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
          ))}
          <Route component={error} />
        </Switch>
      </App>
     </LocaleProvider>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
