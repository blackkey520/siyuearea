
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 
const SockConfig = require('../utils/config').sockconfig;
var net = require('net') //引入网络模块
const iconv = require('iconv-lite');
let doorclient=null;
class SocketServerController extends Controller {
  // 服务器渲染Controller
  * openlight() {
    try {
      const {
        connectObj
      } = this.app;
      console.log('====================================');
      console.log('openlight');
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
      console.log('====================================');
      console.log('closelight');
      console.log('====================================');
      const {
        connectObj
      } = this.app;
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
        console.log(`openlocker->${lockerid}`);
       console.log('====================================');
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
      // doorclient.connect({
      //   host: '148.70.229.108',
      //   port: 8500
      // });
   
    // if (connectObj['doorClient'])
    //   connectObj['doorClient'].write(b);
    //  doorclient.end(); 

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
