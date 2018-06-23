module.exports = app => {
  class RestqlService extends app.Service {
    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        if (condition.btime)
        {
          conditionstr = conditionstr + ` atime between '${condition.btime}'`;
          conditionstr = conditionstr + ` and '${condition.etime}' and `
          console.log(conditionstr);
          delete condition.btime;
          delete condition.etime;
        }
        for (const key in condition) {
          conditionstr = conditionstr + key + " = '" + condition[key] + "' and ";
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
      const recordsql = "select * from (select t1.aid,t1.mid,t2.mname,t2.membercode,t1.atype,t1.astate,t1.atime,t1.amoney,t1.asmoney,t1.adesc"
      +" from Base_Accounts as t1 inner join Base_Member as t2 on t1.mid=t2.mid ) as t5 " 
      +conditionstr + " order by atime desc limit " + offset + "," + query.pageSize;
      console.log(recordsql);
      const totalsql = "select count(*) as total from (select t1.aid,t1.mid,t2.mname,t2.membercode,t1.atype,t1.astate,t1.atime,t1.amoney,t1.asmoney,t1.adesc from Base_Accounts as t1 inner join Base_Member as t2 on t1.mid=t2.mid) as t9 " + conditionstr;
       console.log(totalsql);
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
  }
  return RestqlService;
};
