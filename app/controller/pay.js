
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
  * payment() {
    const ctx = this.ctx;
    const config = yield this.service.restql.index('Base_Config', {
        page: 1,
        pageSize: 1000,
    }, {
        cid: 1
    });
    const money = parseInt(ctx.params.money) * config.record[0].rechargedis;
      var order = {
          body: ctx.params.ptype,
          attach: `${ctx.params.type}|${ctx.params.money}|${ctx.params.mtype}|${ctx.params.title}`,
          out_trade_no: 'siyuearea' + (+new Date),
          total_fee: money * 100,
        //   total_fee: 0.1 * 100,
          spbill_create_ip: '140.143.159.216',
          openid: ctx.params.openid,
          trade_type: 'JSAPI'
      };
      const payargs = yield payment.getBrandWCPayRequestParams(order);
      if (payargs.appId)
      {
        yield ctx.render("pay.tpl", {
            openid:ctx.params.openid,
            appId: payargs.appId,
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.package,
            signType: payargs.signType,
            paySign: payargs.paySign,
            money:ctx.params.money,
            type: ctx.params.type,
            mtype: ctx.params.mtype,
            title: ctx.params.title,
            ptype: ctx.params.ptype
        });
      }
      else{
          ctx.body = payargs.message;
      }
  }
  * paytest() {
      const ctx = this.ctx;
      debugger;
      yield ctx.render("result.tpl", {
          attach: ctx.params.attach,
      });
  }
  async paycallback(){
       const ctx = this.ctx;
  }
}

module.exports = PayController;
