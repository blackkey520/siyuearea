
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;
const middleware = require('../utils/wechat-pay').middleware;
const Payment = require('../utils/wechat-pay').Payment;
var initConfig = {
    partnerKey: 'wtP77z2jPt85GhXzFKio4mC0lk7fWEV4',
    appId: 'wx806d517c00b4e3db',
    mchId: '1507977561',
    notifyUrl: "http://" + this.host + "/notify/"
};
var payment = new Payment(initConfig);
class PayController extends Controller {
  // 服务器渲染Controller
  async payment() {
    const ctx = this.ctx;
    debugger;
      var order = {
          body: ctx.params.ptype,
          attach: `${ctx.params.type}|${ctx.params.money}|${ctx.params.mtype}|${ctx.params.title}`,
          out_trade_no: 'siyuearea' + (+new Date),
        //   total_fee: ctx.params.money * 100,
          total_fee: 0.1 * 100,
          spbill_create_ip: '140.143.159.216',
          openid: ctx.params.openid,
          trade_type: 'JSAPI'
      };
      const payargs= await payment.getBrandWCPayRequestParams(order);
      if (payargs.appId)
      {
        await ctx.render("pay.tpl", {
            appId: payargs.appId,
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.package,
            signType: payargs.signType,
            paySign: payargs.paySign,
            type: ctx.params.type,
            mtype: ctx.params.mtype,
            title: ctx.params.title,
        });
      }
      else{
          ctx.body = payargs.message;
      }
  }
  async paytest() {
      const ctx = this.ctx;
      debugger;
      await ctx.render("result.tpl", {
          attach: ctx.params.attach,
      });
  }
  async paycallback(){
       const ctx = this.ctx;
  }
}

module.exports = PayController;
