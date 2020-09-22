import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import App from "./routes/app";
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_TW'
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
      path: "/mobile/lights/:placeid",
      models: () => [],
      component: () => import("./routes/lights")
    },
     
    {
      path: "/placemanager",
      models: () => [
        import("./models/place")
      ],
      component: () =>
        import("./routes/lights/PlaceManager")
    },
    {
      path: "/lockermanager",
      models: () => [
        import("./models/locker")
      ],
      component: () =>
        import("./routes/locker/index")
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
      path: "/memberlist",
      models: () => [
        import ("./models/member"),
        import("./models/locker"),
        import("./models/order"),
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
      path: "/traillist",
      models: () => [
        import("./models/place")
      ],
      component: () =>
        import("./routes/lights/TrialList")
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
      path: "/message/:communityid",
      models: () => [
        import("./models/message")
      ],
      component: () =>
        import("./routes/message/index")
    },
    {
      path: "/messagedetail/:msgid",
      models: () => [
        import("./models/message")
      ],
      component: () =>
        import("./routes/message/messagedetail")
    },
    {
      path: "/discus",
      models: () => [
          import("./models/message")
        ],
        component: () =>
        import("./routes/message/discus")
    },
    {
      path: "/discus/create",
      models: () => [
        import("./models/message")
      ],
      component: () =>
        import("./routes/message/discusform")
    }, {
      path: "/discus/edit/:id",
      models: () => [
        import("./models/message")
      ],
      component: () =>
        import("./routes/message/discusform")
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
     {
       path: "/product",
       models: () => [import("./models/product")],
       component: () => import("./routes/product/index")
     },
       {
         path: "/goods",
         models: () => [import("./models/goods")],
         component: () => import("./routes/product/Goods")
       },
     {
       path: "/suggest",
       models: () => [import("./models/suggest")],
       component: () => import("./routes/suggest/index")
     },
     {
       path: "/product/create",
       models: () => [
         import("./models/product")
       ],
       component: () =>
         import("./routes/product/ProductForm")
     }, {
       path: "/product/edit/:id",
       models: () => [
         import("./models/product")
       ],
       component: () =>
         import("./routes/product/ProductForm")
     },
  ];
  return (
     <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
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
