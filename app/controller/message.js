// 1 获取内容列表，分页，每页几个

exports.index = function*() {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    const result = yield this.service.message.findlist(res, this.query, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    }
  this.body = response;
  this.status = 200;
};
exports.findcommunitylist = function* () { 
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.findcommunitylist(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.findcommunitymemberlist = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.findcommunitymemberlist(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.add = function * () {
  const response = { success: false, message: "操作失败" };
    var res = this.params.res;
    const result = yield this.service.message.add(res,this.query, this.request.body ? this.request.body : {});
    if (result) {
        response.message = "操作成功";
        response.success = true;
        response.data = result;
    } 
  this.body = response;
  this.status = 200;
};
exports.addlike = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.addlike(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.dellike = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.dellike(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.delcomment = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.delcomment(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.delmessage = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.delmessage(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.addcomment = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.addcomment(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
exports.findcomment = function* () {
  const response = {
    success: false,
    message: "操作失败"
  };
  var res = this.params.res;
  const result = yield this.service.message.findcomment(res, this.query, this.request.body ? this.request.body : {});
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};