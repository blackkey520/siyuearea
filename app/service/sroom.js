module.exports = app => {
  class RestqlService extends app.Service {
    *getsroomstate(modal,query, condition = {}) {
      const offset = (parseInt(condition.page) - 1) * parseInt(condition.pageSize);
      
      const recordsql = "select roomid,count(useid) as usecount from Base_UseRoomRecord where usestate=0 or usestate=2 group by roomid "
      const record= yield this.app.mysql.query(recordsql);
      return { record, totalRecord: 0 };
    }
  }
  return RestqlService;
};
