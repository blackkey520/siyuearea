const Subscription = require('egg').Subscription;
const moment =require('moment');
class CheckPlace extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            type: 'worker',
            cron: '0 */1 * * * *',
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    *subscribe() {
        const memberlist =  yield this.service.restql.index('Base_Order',{page:1,pageSize:1000}, {ostate:0});
        if(memberlist.record.length!==0)
        {
            for (const i = 0;i<memberlist.record.length; i++) {
                const item=memberlist.record[i];
                if(moment().diff(moment(item.otime),'hours',true)>1)
                {
                    const result=yield this.service.restql.update('Base_Order',item.oid, {ostate:3});
                    if(result)
                    {
                        const resultplace=yield this.service.restql.update('Base_Place',item.pid, {pstate:0});
                    }
                }   
            }
        }
    }
}

module.exports = CheckPlace;


