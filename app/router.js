
// const cors = require('koa-cors');

module.exports = app => {
    console.log(app.oAuth2Server);
  app.get('/', 'client.index');
  app.post('/api/upload', 'uploadfile');

  app.get('/api/restql/:res','restql.index');
  app.get('/api/restql/:res/:id','restql.show');
  app.post('/api/restql/:res', 'restql.create');
  app.put('/api/restql/:res/:id', 'restql.update');
  app.del('/api/restql/:res/:id', 'restql.destroy');

  app.get('/api/table', 'tableinfo.index');
  app.get('/api/table/:res', 'tableinfo.show');
  app.post('/api/table', 'tableinfo.create');
  app.put('/api/table', 'tableinfo.update');
  app.del('/api/table/:res', 'tableinfo.destroy');
  app.post('/api/order/getorderlist', 'order.index');
  app.post('/api/order/getrecordlist', 'order.record');
  app.get('/api/wechat/getusr/:code','wechat.index');
 app.get('/api/wechat/getqrcode/:qrstr','wechat.getqrcode');

  app.post('/user/authorize',  'user.authenticate');
  app.get('/user/authenticate',  'user.authenticate');


};