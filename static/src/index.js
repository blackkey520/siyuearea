import "./index.html";
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
// import { browserHistroy } from 'react-router'
import { hashHistory } from "dva/router";
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger';
const OAuth = require('wechat-oauth');
global.client = new OAuth('wx806d517c00b4e3db', 'c463edb586c68158ea39679621ad5a40');
const app = dva({
  ...createLoading({
    effects: true
  }),
  onAction: createLogger(),
  history: createHistory(),
  onError(error) {
    console.error("app onError -- ", error);
  }
});

app.model(require("./models/app"));
app.router(require("./router"));
app.start("#app");
