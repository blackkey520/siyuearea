 
exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var code = this.params.code;
    const rtnval={};
        const OAuth = require('co-wechat-oauth');
        const client = new OAuth('wx40e94d70b161bccb', '02dd058278c7ef97b1fabdad73d55e5f');
        const result=yield client.getAccessToken(code);
        var accessToken = result.data.access_token;
        var openid = result.data.openid;
        var userInfo = yield client.getUser(openid);
        rtnval.ismember=false;
        rtnval.userInfo=userInfo;
        const memberlist = yield this.service.restql.index('Base_Member',{page:1,pageSize:1}, {memberopenid:userInfo.openid});
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