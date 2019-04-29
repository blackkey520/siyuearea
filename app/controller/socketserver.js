
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 
const SockConfig = require('../utils/config').sockconfig;

class SocketServerController extends Controller {
  // 服务器渲染Controller
  * openlight() {
    const {connectObj} = this.app;
    console.log('====================================');
    console.log('openlight');
    console.log('====================================');
    const sock = SockConfig.find((item) => {
      return item.pid === parseInt(this.ctx.params.openid)
    });
    if (sock)
    {
      if (connectObj[sock.sockname] !== null)
        connectObj[sock.sockname].write(new Buffer([0x48, 0x3a, 0x01, 0x70, 0x01, 0x01, 0x00, 0x00, 0x45, 0x44]));
    }
    
    
  }
  * closelight() {
     console.log('====================================');
     console.log('closelight');
     console.log('====================================');
    const {connectObj} = this.app;
    const sock = SockConfig.find((item) => {
      return item.pid === parseInt(this.ctx.params.openid)
    });
    if (sock)
    {
      if (connectObj[sock.sockname] !== null)
        connectObj[sock.sockname].write(new Buffer([0x48, 0x3a, 0x01, 0x70, 0x01, 0x00, 0x00, 0x00, 0x45, 0x44]));
    }
    
  }
}

module.exports = SocketServerController;
