module.exports = app => {
  class RestqlService extends app.Service {

    *index(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      let memberCondition = " 1=1 ";
      let orderCondition=" 1=1 ";
      let placeCondition=" 1=1 ";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
          if(key=='mid'){
            memberCondition = memberCondition + ` and mid='${condition[key]}'`;
            continue;
          }
          if(key=='oid'){
            orderCondition = orderCondition + ` and oid='${condition[key]}'`;
            continue;
          }
          if(key=='ordercode'){
            orderCondition = orderCondition + ` and ordercode='${condition[key]}'`;
            continue;
          }
          if(key=='pid')
          {
            placeCondition = placeCondition + `and pid='${condition[key]}'`;
            continue;
          }
          if(key=='pname')
          {
            placeCondition = placeCondition + `and pname='${condition[key]}'`;
            continue;
          }
          if(key=='mname')
          {
            memberCondition = memberCondition + `and mname='${condition[key]}'`;
            continue;
          }
          if(key=='btime')
          {
            orderCondition = orderCondition + ` and otime>='${condition[key]}'`;
            continue;
          }
          if(key=='etime')
          {
             orderCondition = orderCondition + ` and otime<='${condition[key]}'`;
             continue;
          }
          conditionstr = conditionstr + key + " = '" + condition[key] + "' and ";
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
       
       const recordsql = `select * from (select t1.oid,t1.ordercode,t1.pid,t2.pdesc as 'storetype',t2.pname,t1.mid,t3.mname,t1.ostate,t4.ostate 
       as rstate,t1.otime,t1.pdesc,t4.btime,t4.etime,t4.money,t4.disid,t4.discount,t4.rid from ( select * from Base_Order where ${orderCondition}) as 
       t1 inner join (select * from Base_Place where ${placeCondition}) as t2 on t1.pid=t2.pid inner join (select * from Base_Member where ${memberCondition} ) 
       as t3 on t1.mid=t3.mid  left join    Base_Record as t4 on t4.oid=t1.oid) as t5 ${conditionstr} order by otime desc limit ${offset},${query.pageSize}`;
 
      const totalsql = `select * from (select t1.oid,t1.ordercode,t1.pid,t2.pdesc as 'storetype',t2.pname,t1.mid,t3.mname,t1.ostate,t4.ostate 
       as rstate,t1.otime,t1.pdesc,t4.btime,t4.etime,t4.money,t4.disid,t4.discount,t4.rid from ( select * from Base_Order where ${orderCondition}) as 
       t1 inner join (select * from Base_Place where ${placeCondition}) as t2 on t1.pid=t2.pid inner join (select * from Base_Member where ${memberCondition} ) 
       as t3 on t1.mid=t3.mid  left join    Base_Record as t4 on t4.oid=t1.oid) as t5 ${conditionstr} `;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord.length };
    }
    *record(modal,query, condition = {}) {
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
          conditionstr = conditionstr + key + " = " + condition[key] + " and ";
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
const recordsql = "select * from (select t1.rid,t1.pid,t4.pname,t4.pdesc  as 'storetype',t1.mid,t3.mname,t1.oid,t2.ostate,t1.ostate as rstate,t1" +
    ".btime,t1.etime,t1.disid,t1.discount,t1.money,t1.pdesc from Base_Record as t1 in" +
    "ner join Base_Order as t2 on t1.oid=t2.oid inner join Base_Member as t3 on t1.mi" +
    "d=t3.mid inner join Base_Place as t4 on t1.pid=t4.pid) as t5 "
      + conditionstr + " order by btime desc limit " + offset + "," + query.pageSize;
      const totalsql = "select count(*) as total from Base_Order" + conditionstr;
      const record= yield this.app.mysql.query(recordsql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    *count(modal,query, condition = {}) {
const totalsql = `select * from (select t1.oid,t1.ordercode,t1.pid,t2.pdesc as 'storetype',t2.pname,t1.mid,t3.mname,t1.ostate,t4.ostate 
       as rstate,t1.otime,t1.pdesc,t4.btime,t4.etime,t4.money,t4.disid,t4.discount,t4.rid from ( select * from Base_Order where ostate=2 and otime>='${condition.btime}' and otime<='${condition.etime}' ) as 
       t1 inner join(select * from Base_Place) as t2 on t1.pid = t2.pid inner join(select * from Base_Member where mid = '${condition.mid}')
       as t3 on t1.mid=t3.mid  left join    Base_Record as t4 on t4.oid=t1.oid) as t5  `;

      const totalRecord = yield this.app.mysql.query(totalsql);

      return {
        record: totalRecord,total: totalRecord.length
      };
    }
  }
  return RestqlService;
};
