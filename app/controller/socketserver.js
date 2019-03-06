
'use strict';
// app/controller/news.js
const Controller = require('egg').Controller; 

class SocketServerController extends Controller {
  // 服务器渲染Controller
  * openlight() {
    const {connectObj} = this.app;
    if (connectObj['sock1']!==null)
      connectObj['sock1'].write(new Buffer([0x11,0xa2,0x3b]));
  }
}

module.exports = SocketServerController;
