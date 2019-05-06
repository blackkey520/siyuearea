module.exports = app => {
  class RestqlService extends app.Service {
    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
            if(key=='btime')
            {
                conditionstr = conditionstr + "odrdate>='" + condition[key] + "' and ";
            }
            else if (key == 'etime') {
                conditionstr = conditionstr + "odrdate<='" + condition[key] + "' and ";
            }
            else if(key=='odrdesc'){
                conditionstr = conditionstr + key + " like '%" + condition[key] + "%' and ";
            }
            else{
              conditionstr = conditionstr + key + " = '" + condition[key] + "' and ";
            }
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
      const recordsql = "select * from (select t1.odrid,t1.odrdate,t1.odrtype,t1.isfinish,t1.odrdesc,t2.pid,t2.pname,t2.pdesc from Base_OpenDeskRecord as t1 inner join Base_Place as t2 on t1.pid=t2.pid) as t5 " 
      +conditionstr + " order by odrdate desc limit " + offset + "," + query.pageSize;
      const totalsql = "select count(*) as total from Base_OpenDeskRecord" + conditionstr;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
}
return RestqlService;
}
     