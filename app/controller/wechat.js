const OAuth = require('co-wechat-oauth');

exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var code = this.params.code;
    const rtnval={};
       const client = new OAuth('wx806d517c00b4e3db', 'c463edb586c68158ea39679621ad5a40');//生产
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
