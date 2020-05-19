
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 
const SockConfig = require('../utils/config').sockconfig;
const LockerConfig = require('../utils/config').lockerconfig;
const moment = require('moment');
var net = require('net') //引入网络模块
const iconv = require('iconv-lite');
const request = require('request');
let doorclient=null;
class SocketServerController extends Controller {
  // 服务器渲染Controller
  * openlight() {
    try {
      const {
        connectObj
      } = this.app;
      if (this.ctx.headers['referer'] == undefined)
      {
        return;
      }
      console.log('====================================');
      console.log(moment().format('YYYY-MM-DD HH:mm:ss') + '|openlight-----pid=' + this.ctx.params.pid + '|' + this.ctx.headers['user-agent'] + '|' + this.ctx.headers['host'] + '|' + this.ctx.headers['referer']);
      console.log('====================================');
      const sock = SockConfig.find((item) => {
        return item.pid === parseInt(this.ctx.params.pid)
      });
      if (sock) {
        // let openbuffer = [0x48, 0x3a, 0x01, 0x70, 0x01, 0x00, 0x00, 0x45, 0x44]
        // openbuffer.splice(3, 0, sock.buffer);
        if (connectObj[sock.sockname] !== null)
          connectObj[sock.sockname].write(new Buffer(sock.openbuffer));
      }
    } catch (err) {
       
    }
    
    
    
 
      const response = { success: true, message: "操作成功" };
      this.ctx.body = response;
      this.ctx.status = 200;
  }
  * closelight() {
    try {
      const {
        connectObj
      } = this.app;
      if (this.ctx.headers['referer'] == undefined)
      {
        return;
      }
           console.log('====================================');
           console.log(moment().format('YYYY-MM-DD HH:mm:ss') + '|closelight-----pid=' + this.ctx.params.pid + '|' + this.ctx.headers['user-agent'] + '|' + this.ctx.headers['host'] + '|' + this.ctx.headers['referer']);
           console.log('====================================');
      const sock = SockConfig.find((item) => {
        return item.pid === parseInt(this.ctx.params.pid)
      });
      // let openbuffer = [0x48, 0x3a, 0x01, 0x70, 0x00, 0x00, 0x00, 0x45, 0x44]
      // openbuffer.splice(3, 0, sock.buffer);
      if (sock) {
        if (connectObj[sock.sockname] !== null)
          // connectObj[sock.sockname].write(new Buffer(openbuffer));
          connectObj[sock.sockname].write(new Buffer(sock.closebuffer));
      }
    } catch (err) {
      
    }
     
    const response = { success: true, message: "操作成功" };
    this.ctx.body = response;
    this.ctx.status = 200;
  }
  * openlocker() {
    try {
      const {
        connectObj
      } = this.app;
      const lockerid=this.ctx.params.lockerid;
      console.log('====================================');
      console.log(moment().format('YYYY-MM-DD HH:mm:ss') + '|openlocker-----lockerid=' + this.ctx.params.lockerid + '|' + this.ctx.headers['user-agent'] + '|' + this.ctx.headers['host'] + '|' + this.ctx.headers['referer']);
      console.log('====================================');
      const item = LockerConfig.find((i) => {
        return i.lockerid == lockerid;
      });
       
      request({
        url: `http://cos.wondware.com/mq/device/screen/openCabinet?deviceId=${item.deviceid}&lockTotalNum=1&lockAddress=${item.lockaddress}%2B1&commandType=openOne&sourceType=O&uqKey=A0FE27E0F1A361BC1F0AF5E807431F17`,
        method: "POST",
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
      }, function (error, response, body) {
      });



    } catch (err) {
       
    }
      const response = { success: true, message: "操作成功" };
      this.ctx.body = response;
      this.ctx.status = 200;
  }
  * opendoor() {
    try {
      const {
        connectObj
      } = this.app;
      const doorid=this.ctx.params.doorid;
      if (doorclient!=null){
         
      }
      else{
        doorclient = new net.Socket();
        doorclient.connect({
          host: '148.70.229.108',
          port: 60006
        });
        doorclient.setKeepAlive(true, 3000);
      }
       
      let b = iconv.encode('N3000 -USER "abc" -PASSWORD "123" -Open "m001-1号"', 'GB2312');
      doorclient.write(b);
       
    } catch (err) {
       doorclient = null;
       this.openlocker();
    }
      const response = { success: true, message: "操作成功" };
      this.ctx.body = response;
      this.ctx.status = 200;
  }
}

module.exports = SocketServerController;
