
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 
const SockConfig = require('../utils/config').sockconfig;

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
}

module.exports = SocketServerController;
