import "./index.html";
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
// import { browserHistroy } from 'react-router'
import { hashHistory } from "dva/router";
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger';
const OAuth = require('wechat-oauth');
global.client = new OAuth('wx40e94d70b161bccb', '02dd058278c7ef97b1fabdad73d55e5f');
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
