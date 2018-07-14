"use strict";
const middleware = require('../utils/wechat-pay').middleware;
const Payment = require('../utils/wechat-pay').Payment;
var initConfig = {
    partnerKey: 'siyuekongjianhejingpingbjlanyue1',
    appId: 'wx806d517c00b4e3db',
    mchId: '1507977561',
    notifyUrl: "http://www.bjlanyue.cn/paycallback"
};
var payment = new Payment(initConfig);

module.exports = app => {
  class PayController extends app.Controller {
    async payment() {
      
    }
    * paycallback() {
       
    }
  }
  return PayController;
};
