// 1 获取内容列表，分页，每页几个
exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    const result = yield this.service.order.index(res,this.query, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    }
  this.body = response;
  this.status = 200;
};
exports.record = function * () {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    const result = yield this.service.order.record(res,this.query, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    } 
  this.body = response;
  this.status = 200;
};
exports.count=function *(){
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
     
    // console.log(this.request.body);
    const result = yield this.service.order.count(res, this.query, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    } 
  this.body = response;
  this.status = 200;
}