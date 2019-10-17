module.exports = app => {
  class RestqlService extends app.Service {
    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
          conditionstr = conditionstr + key + " = '" + condition[key] + "' and ";
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
      const recordsql = "select * from (select t1.highauthority,t1.pausemark,t1.registplace,t1.mid,t1.mmoney,t1.mdesc,t1.mname,t1.mregisttime,t1.mstate,t1.mtype,t1.phonenum,t1.mpd,t1.membercode"
+",t1.memberopenid,t1.memberprogramopenid,t2.pcname,t2.btime,t2.etime,t2.isused,t2.pcdesc,t2.`value`  from Base_Member  as t1 left join Base_ProductCard as t2 on t1.mpd=t2.pcid) as t5 "
      +conditionstr + " order by mid desc limit " + offset + "," + query.pageSize;
      const totalsql = "select count(*) as total from Base_Member" + conditionstr;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    *findlist(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = '';
       if (JSON.stringify(condition) != "{}") {
         conditionstr = ` where mname like '%${condition.membercode}%' or phonenum like '%${condition.membercode}%' or membercode like '%${condition.membercode}%'`;
       }
      const recordsql = "select * from (select t1.highauthority,t1.pausemark,t1.registplace,t1.mid,t1.mmoney,t1.mdesc,t1.mname,t1.mregisttime,t1.mrtime,t1.mstate,t1.mtype,t1.phonenum,t1.mpd,t1.membercode"
+",t1.memberopenid,t2.pcname,t2.btime,t2.etime,t2.isused,t2.pcdesc,t2.`value`  from Base_Member  as t1 left join Base_ProductCard as t2 on t1.mpd=t2.pcid) as t5 "
      +conditionstr + " order by mid desc limit " + offset + "," + query.pageSize;
      const totalsql = "select count(*) as total from Base_Member" + conditionstr;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    *single(modal,query, condition = {}) { 
 const recordsql = "select * from (select t1.highauthority,t1.pausemark,t1.registplace,t1.mid,t1.mmoney,t1.mdesc,t1.mname,t1.mregisttime,t1.mrtime,t1.mstate,t1.mtype,t1.phonenum,t1.mpd,t1.membercode" +
     ",t1.memberopenid,t2.pcname,t2.btime,t2.etime,t2.isused,t2.pcdesc,t2.`value`  from Base_Member  as t1 left join Base_ProductCard as t2 on t1.mpd=t2.pcid) as t5 where mid= " + modal.id;
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *update(modal,query,condition={}){
      const sql = `update Base_Member set memberprogramopenid = '${modal.openid}' where phonenum='${modal.phone}'`;
      yield this.app.mysql.query(sql);
      const record = yield this.app.mysql.query(`select * from Base_Member where memberprogramopenid='${modal.openid}'`);
      return record[0];
    }
    
  }
  return RestqlService;
};
