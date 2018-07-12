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
    *payment() {
      const ctx = this.ctx;
      var order = {
          body: '日卡会员',
          attach: '{"类型":"日卡会员"}',
          out_trade_no: '肆阅空间' + (+new Date),
          total_fee: ctx.params.money * 100,
          spbill_create_ip: '140.143.159.216',
          openid: ctx.params.openid,
          trade_type: 'JSAPI'
      };
      yield payment.getBrandWCPayRequestParams(order, function (err, payargs) {
          if (err) {
                ctx.body=ctx.render('public/error.tpl', {
                    err
                })
            } else {
                ctx.body = ctx.render('public/pay.tpl', {
                    appId: payargs.appId,
                    timeStamp: payargs.timeStamp,
                    nonceStr: payargs.nonceStr,
                    package: payargs.package,
                    signType: payargs.signType,
                    paySign: payargs.paySign,
                })
            } 
      });
    }
    * paycallback() {
      const ctx = this.ctx;
       middleware(initConfig).getNotify().done(function (message, req, res, next) {
           ctx.body = ctx.render('public/result.tpl', {
               result: message
           })
       })
      ctx.body = yield ctx.renderView("public/index.html");
    }
  }
  return PayController;
};
