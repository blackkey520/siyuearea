// 1 获取内容列表，分页，每页几个
exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    var param={};
    param.page = this.request.body.page;
    param.pageSize=this.request.body.pageSize;
    delete this.request.body.page;
    delete this.request.body.pageSize;
    const result = yield this.service.member.index(res, param, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    }
  this.body = response;
  this.status = 200;
};
exports.findlist = function* () {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    var param={};
    param.page = this.request.body.page;
    param.pageSize=this.request.body.pageSize;
    delete this.request.body.page;
    delete this.request.body.pageSize;
    const result = yield this.service.member.findlist(res, param, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    }
  this.body = response;
  this.status = 200;
};
exports.single = function* () {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    const result = yield this.service.member.single(this.params, this.query, this.request.body ? this.request.body : {});
    if (result.length!==0) {
        response.message = "操作成功";
        response.success = true;
        response.data = result[0];
    } 
  this.body = response;
  this.status = 200;
};