module.exports = app => {
  class RestqlService extends app.Service {
    *findlist(modal,query, condition = {}) {
      const offset = (parseInt(condition.page) - 1) * parseInt(condition.pageSize);
      let conditionstr = '';
        if (JSON.stringify(condition) != "{}") {
            conditionstr = " where 1=1 ";
            for (const key in condition) {
                if (key == 'mid') {
                    conditionstr = conditionstr + ` and mid='${condition[key]}'`;
                    continue;
                }
                if (key == 'room') {
                  conditionstr = conditionstr + ` and room='${condition[key]}'`;
                  continue;
                }
                if (key == 'msgtype') {
                  conditionstr = conditionstr + ` and msgtype='${condition[key]}'`;
                  continue;
                }
                if (key == 'msgtime') {
                    conditionstr = conditionstr + ` and msgtime<='${condition[key]}'`;
                    continue;
                }
                if (key == 'msgid') {
                  conditionstr = conditionstr + ` and msgid<='${condition[key]}'`;
                  continue;
                }
            }
        }
      const recordsql = "select t1.mname,t1.mpd,t10.wechatmsg,t2.*,coalesce(t3.likecount,0) as likecount,coalesce(t4.comcount,0) as comcount,t3.mid as likemid from Base_Member as t1 left join Base_MemberDetail as t10 on t1.mid=t10.mid right join  (select * from Base_Message  " + conditionstr + " order by msgtime desc limit " + offset + "," + condition.pageSize + ") as t2 on t1.mid = t2.mid left join ( select t7.*,t8.mid from (select count(likeid) as 'likecount',msgid from Base_Like group by msgid) as t7 left join (select * from Base_Like where mid=" + condition['likemid'] + ") as t8 on t7.msgid=t8.msgid) as t3 on t2.msgid = t3.msgid left join(select count(comid) as 'comcount', msgid from Base_Comment group by msgid) as t4 on t2.msgid = t4.msgid "
      const record= yield this.app.mysql.query(recordsql);
      return { record, totalRecord: 0 };
    }
    *findcommunitylist(modal,query, condition = {}) {
     //communityid
     let conditionstr = '';
     if (JSON.stringify(condition) != "{}") {
       conditionstr = " where 1=1 ";
       for (const key in condition) {
         if (key == 'communityid') {
           conditionstr = conditionstr + ` and t1.communityid='${condition[key]}'`;
           continue;
         }
       }
     }
      const recordsql = "select t1.communitydesc,t1.communityid,t1.communityimg,t1.communityname,count(t2.mid)  memcount from Base_Community as t1 left join Base_CommunityMember as t2 on t1.communityid=t2.cid "+conditionstr+" GROUP BY t1.communitydesc,t1.communityid,t1.communityimg,t1.communityname " ;
      const record= yield this.app.mysql.query(recordsql);
      return { record, totalRecord: 0 };
    }
    *findcommunitymemberlist(modal,query, condition = {}) {
     let conditionstr = '';
     if (JSON.stringify(condition) != "{}") {
       conditionstr = " where 1=1 ";
       for (const key in condition) {
         if (key == 'cid') {
           conditionstr = conditionstr + ` and cid='${condition[key]}'`;
           continue;
         }
       }
     }
      const recordsql = "select t1.cid,t1.mid,t1.cmid,t1.mdate,t2.wechatmsg from Base_CommunityMember as t1 left join Base_MemberDetail as t2 on t1.mid=t2.mid " + conditionstr;
      const record= yield this.app.mysql.query(recordsql);
      return { record, totalRecord: 0 };
    }
    *add(modal,query, condition = {}) { 
 const recordsql = `INSERT INTO Base_Message (msgid, mid, msgtime,msgcontent,room,msgtype) values('${condition.msgid}',${condition.mid},'${condition.msgtime}','${condition.msgcontent}',${condition.room},${condition.msgtype})`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *addlike(modal,query, condition = {}) { 
 const recordsql = `INSERT INTO Base_Like (likeid, msgid, mid) values(uuid(),'${condition.msgid}',${condition.mid})`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *dellike(modal,query, condition = {}) { 
 const recordsql = `delete from Base_Like where mid='${condition.mid}'`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *delcomment(modal,query, condition = {}) { 
 const recordsql = `delete from Base_Comment where comid='${condition.comid}'`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *delmessage(modal,query, condition = {}) { 
 const recordsql = `delete from Base_Message where msgid='${condition.msgid}'`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
    *addcomment(modal,query, condition = {}) { 
 const recordsql = `INSERT INTO Base_Comment (comid, msgid, comtime,comcontent,mid) values(uuid(),'${condition.msgid}','${condition.comtime}','${condition.comcontent}',${condition.comtime})`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
     *findcomment(modal,query, condition = {}) { 
 const recordsql = `select t1.mname,t1.mpd,t5.wechatmsg,t1.mpd,t2.* from Base_Member as t1 left join Base_MemberDetail as t5 on t1.mid=t5.mid  inner join (select * from Base_Comment where msgid='${condition['msgid']}' order by comtime desc ) as t2 on t1.mid = t2.mid`
      const record= yield this.app.mysql.query(recordsql);
      return record;
    }
  }
  return RestqlService;
};
