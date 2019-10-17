module.exports = app => {
  class RestqlService extends app.Service {

    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
          if (key == 'mem')
          {
            if (condition[key] == 1) {
              conditionstr = conditionstr + "lmember <> 0 and ";
            }else{
              conditionstr = conditionstr + "lmember = 0 and ";
            }
          }else{
            if (key == 'searchval') {
              conditionstr = conditionstr + `(lname like '%${condition[key]}%' or mname like '%${condition[key]}%' or phonenum like '%${condition[key]}%') and `;
            } else {
              conditionstr = conditionstr + key + " = '" + condition[key] + "' and ";
            }
          }
          
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
       const recordsql = `select * from ( select t2.mid,t1.lid,t1.lname,t1.lstate,t1.lmember,t1.ltype,t2.mname,t2.mtype,t2.mmoney,t2.mregisttime,t2.phonenum from Base_Locker as t1 left join Base_Member as t2 on t1.lmember=t2.mid) as t5 ${conditionstr} order by lstate desc limit ${offset},${query.pageSize}`;
      console.log(recordsql);   
      const totalsql = `select * from ( select t2.mid,t1.lid,t1.lname,t1.lstate,t1.lmember,t1.ltype,t2.mname,t2.mtype,t2.mmoney,t2.mregisttime,t2.phonenum from Base_Locker as t1 left join Base_Member as t2 on t1.lmember=t2.mid) as t5 ${conditionstr} `;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord.length };
    }
  }
  return RestqlService;
};
