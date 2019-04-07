
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 
const SockConfig = require('../utils/config').sockconfig;

class SocketServerController extends Controller {
  // 服务器渲染Controller
  * openlight() {
    const {connectObj} = this.app;
    const sock = SockConfig.find((item) => {
      return item.pid === parseInt(this.ctx.params.openid)
    });
    if (connectObj[sock.sockname] !== null)
      connectObj[sock.sockname].write(new Buffer([0x11, 0xa2, 0x3b]));
  }
  * closelight() {
    const {connectObj} = this.app;
    const sock = SockConfig.find((item) => {
      return item.pid === parseInt(this.ctx.params.openid)
    });
    const {connectObj} = this.app;
    if (connectObj[sock.sockname] !== null)
      connectObj[sock.sockname].write(new Buffer([0x11, 0xa2, 0x3b]));
  }
}

module.exports = SocketServerController;
