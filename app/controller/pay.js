
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
var pinitConfig = {
    partnerKey: 'wtP77z2jPt85GhXzFKio4mC0lk7fWEV4',
    appId: 'wxc762f1ccccc82daf',
    mchId: '1507977561',
    notifyUrl: "http://" + this.host + "/notify/"
};
var payment = new Payment(initConfig);
var ppayment = new Payment(pinitConfig);
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
    let money = ctx.params.money;
    if (ctx.params.type==="1")
    {
        money = parseFloat(ctx.params.money)
        
         if (money == 500 || money == 1000) {
           money = money * 0.8;
         }
          if (money == 1500 || money == 2000) {
              money = money * 0.75;
          }
          if (money == 2500 || money == 3000) {
              money = money * 0.7;
          }
          if (money == 3500 || money == 4000) {
              money = money * 0.65;
          }
          if (money == 4500 || money == 5000) {
              money = money * 0.6;
          }
    }
    if(ctx.params.type==='2')
    {
        switch (ctx.params.mtype) {
            case '1':
                money = parseFloat(ctx.params.money) * config.record[0].daydis
                break;
            case '2':
                money = parseFloat(ctx.params.money) * config.record[0].weekdis
                break;
            case '3':
                money = parseFloat(ctx.params.money) * config.record[0].monthdis
                break;
            case '4':
                money = parseFloat(ctx.params.money) * config.record[0].sessiondis
                break;
            case '5':
                money = parseFloat(ctx.params.money) * config.record[0].hyeardis
                break;
            case '6':
                money = parseFloat(ctx.params.money) * config.record[0].yeardis
                break;
            case '7':
                money = parseFloat(ctx.params.money) * config.record[0].weekzmdis
                break;
            case '8':
                money = parseFloat(ctx.params.money) * config.record[0].monthzmdis
                break;
            case '9':
                money = parseFloat(ctx.params.money) * config.record[0].sessionzmdis
                break;
            case '10':
                money = parseFloat(ctx.params.money) * config.record[0].weekzydis
                break;
            case '11':
                money = parseFloat(ctx.params.money) * config.record[0].monthzydis
                break;
            case '12':
                money = parseFloat(ctx.params.money) * config.record[0].sessionzydis
                break;
            default:
                break;
        }
    }
    money=money.toFixed(0);
      var order = {
          body: ctx.params.ptype,
          attach: `${ctx.params.type}|${ctx.params.money}|${ctx.params.mtype}`,
          out_trade_no: 'siyuearea' + (+new Date),
          total_fee: money * 100,
        //   total_fee: 0.1 * 100,
        //   spbill_create_ip: '140.143.159.216',//linux
        spbill_create_ip: '140.143.39.138', //win
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
            oldmoney: ctx.params.money,
            money:money,
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
      yield ctx.render("result.tpl", {
          attach: ctx.params.attach,
      });
  }
  * paymentprogram() {
      const ctx = this.ctx;
      const config = yield this.service.restql.index('Base_Config', {
          page: 1,
          pageSize: 1000,
      }, {
          cid: 1
      });
      let money = ctx.params.money;
      if (ctx.params.type === "1") {
          money = parseFloat(ctx.params.money)
          if (money <= 500) {
              money = money * config.record[0].rechargedistwo;
          }
          if (money > 500 && money <= 1000) {
              money = money * config.record[0].rechargedisone;
          }
          if (money > 1000 && money <= 2000) {
              money = money * config.record[0].rechargedis;
          }
          if (money > 2000 && money <= 5000) {
              money = money * config.record[0].rechargedis;
          }
          if (money > 5000) {
              money = money * config.record[0].rechargedis;
          }
      }
      if (ctx.params.type === '2') {
          switch (ctx.params.mtype) {
              case '1':
                  money = parseFloat(ctx.params.money) * config.record[0].daydis
                  break;
              case '2':
                  money = parseFloat(ctx.params.money) * config.record[0].weekdis
                  break;
              case '3':
                  money = parseFloat(ctx.params.money) * config.record[0].monthdis
                  break;
              case '4':
                  money = parseFloat(ctx.params.money) * config.record[0].sessiondis
                  break;
              case '5':
                  money = parseFloat(ctx.params.money) * config.record[0].hyeardis
                  break;
              case '6':
                  money = parseFloat(ctx.params.money) * config.record[0].yeardis
                  break;
              case '7':
                  money = parseFloat(ctx.params.money) * config.record[0].weekzmdis
                  break;
              case '8':
                  money = parseFloat(ctx.params.money) * config.record[0].monthzmdis
                  break;
              case '9':
                  money = parseFloat(ctx.params.money) * config.record[0].sessionzmdis
                  break;
              case '10':
                  money = parseFloat(ctx.params.money) * config.record[0].weekzydis
                  break;
              case '11':
                  money = parseFloat(ctx.params.money) * config.record[0].monthzydis
                  break;
              case '12':
                  money = parseFloat(ctx.params.money) * config.record[0].sessionzydis
                  break;
              default:
                  break;
          }
      }
      money = money.toFixed(0);
      var order = {
          body: ctx.params.ptype,
          attach: `${ctx.params.type}|${ctx.params.money}|${ctx.params.mtype}|${ctx.params.title}`,
          out_trade_no: 'siyuearea' + (+new Date),
          total_fee: money * 100,
          //   total_fee: 0.1 * 100,
        //   spbill_create_ip: '140.143.159.216',//linux
          spbill_create_ip: '140.143.39.138', //win
          openid: ctx.params.openid,
          trade_type: 'JSAPI'
      };
      const payargs = yield ppayment.getBrandWCPayRequestParams(order);
      ctx.body = payargs;
       ctx.status = 200;
  }
  async paycallback(){
       const ctx = this.ctx;
  }
}

module.exports = PayController;
