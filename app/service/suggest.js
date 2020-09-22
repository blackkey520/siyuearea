module.exports = app => {
  class RestqlService extends app.Service {

    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
     
       const recordsql = `select * from Base_Suggust as t1 inner join Base_Member as t2 on t1.mid=t2.mid  limit ${offset},${query.pageSize}`;
 
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query('select * from Base_Suggust');
      return {
        record,
        totalRecord: totalRecord.length
      };
    }
  }
  return RestqlService;
};
