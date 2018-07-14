
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;
const middleware = require('../utils/wechat-pay').middleware;
const Payment = require('../utils/wechat-pay').Payment;
var initConfig = {
    partnerKey: 'wtP77z2jPt85GhXzFKio4mC0lk7fWEV4',
    appId: 'wx806d517c00b4e3db',
    mchId: '1507977561',
    notifyUrl: "http://www.bjlanyue.cn/paycallback"
};
var payment = new Payment(initConfig);
class PayController extends Controller {
  // 服务器渲染Controller
  async payment() {
    const ctx = this.ctx;
      var order = {
          body: '日卡会员',
          attach: '{"类型":"日卡会员"}',
          out_trade_no: 'siyuearea' + (+new Date),
          total_fee: ctx.params.money * 100,
          spbill_create_ip: '140.143.159.216',
          openid: ctx.params.openid,
          trade_type: 'JSAPI'
      };
      await payment.getBrandWCPayRequestParams(order, async function(err, payargs) {
          if (err) {
              console.log('====================================')
              console.log(err)
              console.log('====================================')
                ctx.body = err.stack;
            } else {

                 ctx.body = {
                     appId: payargs.appId,
                     timeStamp: payargs.timeStamp,
                     nonceStr: payargs.nonceStr,
                     package: payargs.package,
                     signType: payargs.signType,
                     paySign: payargs.paySign,
                 };
            } 
      });
  }
  async paycallback(){
       const ctx = this.ctx;
       middleware(initConfig).getNotify().done(async function (message, req, res, next) {
           await this.ctx.render('result.tpl', {
               result: message
           })
       })
  }
}

module.exports = PayController;
