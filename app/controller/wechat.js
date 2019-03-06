const OAuth = require('co-wechat-oauth');
var fs = require("fs");

const httpx = require('httpx');
exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var code = this.params.code;
    const rtnval={};
       const client = new OAuth('wx806d517c00b4e3db', 'c463edb586c68158ea39679621ad5a40'); //生产
        const result=yield client.getAccessToken(code);
        var accessToken = result.data.access_token;
        var openid = result.data.openid;
        var userInfo = yield client.getUser(openid);
        rtnval.ismember=false;
        rtnval.userInfo=userInfo;
        const memberlist =  yield this.service.member.index({}, {page:1,pageSize:1}, {memberopenid:userInfo.openid});
        if(memberlist.record.length!==0)
        {
          rtnval.ismember=true;
          rtnval.member=memberlist.record[0];
        }
        response.message = "操作成功";         
        response.success = true;
        response.data = rtnval;
        this.body = response;
        this.status = 200;
};
 

exports.program = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var code = this.params.code;
  const rtnval = {};
   
  var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${'wxc762f1ccccc82daf'}&secret=${'6a41970b9017e11632c88ddb53ec9561'}&js_code=${code}&grant_type=authorization_code`;
  var result = yield request(url, {
    headers: {
      accept: 'application/json'
    }
  });
  rtnval.ismember = false;
  const memberlist = yield this.service.member.index({}, {
    page: 1,
    pageSize: 1
  }, {
    memberprogramopenid: result.openid
  });
  if (memberlist.record.length !== 0) {
    rtnval.ismember = true;
    rtnval.member = memberlist.record[0];
  }
  rtnval.openid = result.openid;
  response.message = "操作成功";
  response.success = true;
  response.data = rtnval;
  this.body = response;
  this.status = 200;
};


exports.redirect=function*(){
  const client = new OAuth('wx806d517c00b4e3db', 'c463edb586c68158ea39679621ad5a40');//生产
  const url = client.getAuthorizeURL('http://' + this.host + '/callback', this.params.routeid, 'snsapi_userinfo');
  this.unsafeRedirect(url);
}
exports.getqrcode=function*(){
  const response = { success: false, message: "操作失败" };
  const qrstr = this.params.qrstr;
  var QRCode = require('qrcode');
  const rtnval=yield QRCode.toDataURL(qrstr);
  response.message = "操作成功";
  response.success = true;
  response.data = rtnval;
  this.body = response;
  this.status = 200;
}


async function request(url, opts = {}) {
  var options = Object.assign({}, this.defaults);
  for (var key in opts) {
    if (key !== 'headers') {
      options[key] = opts[key];
    } else {
      if (opts.headers) {
        options.headers = options.headers || {};
        Object.assign(options.headers, opts.headers);
      }
    }
  }

  var data;
  try {
    var response = await httpx.request(url, options);
    var text = await httpx.read(response, 'utf8');
    data = JSON.parse(text);
  } catch (err) {
    err.name = 'WeChatAPI' + err.name;
    throw err;
  }

  if (data.errcode) {
    var err = new Error(data.errmsg);
    err.name = 'WeChatAPIError';
    err.code = data.errcode;
    throw err;
  }

  return data;
}