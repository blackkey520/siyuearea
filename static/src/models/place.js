import {
  querylist,
  updateplace,
  querysinglerecord,
  addsinglerecord,
  updatesinglerecord,
  openlight,
  closelight,
  querytraillist
} from "../services/place";
import {
  addorder,
  queryorderlist,
  updateorder,
  queryrecordlist,
  updaterecord,
  getrecordcount
} from "../services/order";

import {opendoor} from "../services/locker";
import { addaccournt } from "../services/accournt";
import {
  loadmemeber,
  update,
  loadmemeberdetail,
  updatememberdetail
} from "../services/member";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import {Toast} from 'antd-mobile';
import moment from 'moment';
import { GetMoney } from '../utils';
import { delay } from 'dva/saga';

import {
  mtype,
  memberlevelupdate,
  discount,
  mlevel
} from '../utils/enum';
export default {
  namespace: "place",
  state: {
    placelist:[],
    selectPlace:null,
    selectRecord:null,
    traillist:[],
    akey:'1',
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *manualcloselight({ payload }, { call, put }) {
        const orderr = yield call(queryorderlist, 1,2,{pid:payload.selectPlace.pid});
        const recordr=yield call(queryrecordlist,1,2,{pid:payload.selectPlace.pid});
        const memberr=yield call(loadmemeber,{id:recordr.data.record[0].mid});
        let money = GetMoney(moment(recordr.data.record[0].btime), moment());
        const accournt = {};
        const member = memberr.data;
        const order = orderr.data.record[0];
        const record = recordr.data.record[0];
        accournt.mid = member.mid;
        const days = moment(member.mregisttime).diff(moment(), 'days', false);
        let disid=0;
         money = money * discount[member.mpd];
        if (member.mtype > 0 && days > 0) {
          accournt.atype = 1;
          accournt.amoney = 0;
          accournt.asmoney = 0;
          accournt.adesc = `管理员结束订单-> ${ mtype[member.mtype]}学习卡消费`;
          disid=1;
          if(member.mtype>=7){
                 let begintime = moment(member.mregisttime).add(-12, 'months').format('YYYY-MM-DD HH:mm:ss');
                let endtime = moment(member.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                let times=0;
                if (member.mtype === 7) {
                  times=2;
                  begintime = moment(member.mregisttime).add(-7,'days').format('YYYY-MM-DD HH:mm:ss');
                  endtime = moment(member.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                }
                if (member.mtype === 8) {
                  times = 10;
                }
                if (member.mtype === 9) {
                  times = 20;
                }
                if (member.mtype === 10) {
                  times = 30;
                }
                if (member.mtype === 11) {
                  times = 50;
                }  
               const dataurecord = yield call(getrecordcount, {
                  mid: member.mid,btime:begintime,etime:endtime
                });
                accournt.adesc+=`已经使用${dataurecord.data.total+1}次，剩余${times-(dataurecord.data.total+1)}。`
              }
        }else{
           accournt.atype = 1;
           accournt.amoney = parseFloat(member.mmoney);
           accournt.asmoney = parseFloat(member.mmoney) - parseFloat(money);
           accournt.adesc = `管理员结束订单->肆阅币消费 ${money} 元，会员等级${mlevel[member.mpd]},会员折扣${discount[member.mpd]}`;
           debugger;
           yield call(update, {
             mid: member.mid,
             mmoney: parseFloat(member.mmoney) - parseFloat(money)
           });
            //需要在这增加积分逻辑了
            const mddata = yield call(loadmemeberdetail, {
              id: member.mid,
            });
            if (mddata.data.record.length > 0) {
              let mdresult = {};
              mdresult = mddata.data.record[0];
              const credit = parseFloat(mdresult.credit) + parseFloat(money);

              yield call(updatememberdetail, {
                mdid: mdresult.mdid,
                credit
              });

              const newlevel = memberlevelupdate.find((item) => {
                return item.cridit >= credit
              })
              if (newlevel && member.mpd != newlevel.level && member.mpd != 0) {
                yield call(update, {
                  mid: member.mid,
                  mpd: newlevel.level
                });
              }
            }
        }

      
        accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
        accournt.astate = 1; 
        yield call(addaccournt, accournt);
        yield call(updateorder, {
          oid:order.oid,
          ostate:2
        });
        yield call(updaterecord, {
          rid: record.rid,
          ostate: 2,
          money:money,
          etime: moment().format('YYYY-MM-DD HH:mm:ss'),
          disid,
          discount: discount[member.mpd]
        });
        yield call(updateplace, {
          pid: payload.selectPlace.pid,
          pstate: 0
        });
        yield call(closelight, payload.selectPlace);
        //getplacelist
         yield put({
           type: "getplacelist",
           payload: {}
         });
    },
    *gettraillist({ payload }, { call, put }) {
        const param = payload.pm;
        const data = yield call(querytraillist, payload.page, payload.pageSize, param);
        yield put({
          type: "updateState",
          payload: {
            traillist: data.data.record,
            pagination: {
              current: payload.page,
              pageSize: payload.pageSize,
              total: data.data.totalRecord || 0
            }
          }
        });
    },
    *getplacelist({ payload }, { call, put }) {
        const result = yield call(querylist, payload); 
         
        yield put({
            type: "updateState",
            payload: {
                placelist:result.data.record
            }
        });
         
    },
    *placeload({ payload }, { call, put }) {
        const {selectPlace} = payload;
        let selectRecord=null;
        if(selectPlace.pstate==4) 
        {
            const record = yield call(querysinglerecord, {
              pid: selectPlace.pid,
              isfinish: 0
            });
            selectRecord = record.data.record[0];
        }
         yield put({
           type: "updateState",
           payload: {
             selectPlace,
             selectRecord
           }
         });
    },
    *opendoor({ payload }, { call, put }) {
       const record = yield call(opendoor, {});
       yield call(delay, 5000);
    },
    *placehandle({ payload }, { call, put,select }) {
      
        const place = yield select(state => state.place);
        let selectPlace=place.selectPlace;
        let selectRecord=place.selectRecord;
        delete selectPlace.pdescn;
        if (selectPlace.pstate == 0) {
          yield call(addsinglerecord, {
            pid: selectPlace.pid,
            odrdate: moment().format('YYYY-MM-DD HH:mm:ss'),
            odrtype: payload.values.odrtype,
            isfinish:0,
            odrdesc: payload.values.odrdesc || '',
          });
          yield call(updateplace, {
            pid:selectPlace.pid,
            pstate:4
          });
          yield call(openlight,{pid:selectPlace.pid})
          message.success("开台成功");
        }else{
          selectRecord.isfinish=1;
          selectRecord.odrdate = moment(selectRecord.odrdate).format('YYYY-MM-DD HH:mm:ss');
          selectRecord.odrdesc = payload.values.odrdesc || '';
          yield call(updatesinglerecord, selectRecord);
          selectPlace.pstate = 0;
          yield call(updateplace, selectPlace);
          yield call(closelight,{pid:selectPlace.pid})
          message.success("离店成功");
        }
        yield put({
          type: "getplacelist",
          payload: {}
        });
    },
     *orderplace({ payload }, { call, put }) {
        let data = null;
        const callback = payload.callback;
        const days = moment(payload.mregisttime).diff(moment(), 'days', true);
        // if (days < 0) {
        //   //过期了
        //   Toast.info('您的会员已过期', 1);
        // }else{
          const ordered = yield call(queryorderlist, 1,100,{mid:payload.mid,ostate:0});
         const useed = yield call(queryorderlist, 1,100,{mid:payload.mid,ostate:1}); 
         if (ordered.data.record.length === 0 && useed.data.record.length === 0)
         {
           const order={
            pid:payload.place.pid,
            ordercode:Math.random().toString(20).substr(2),
            mid:payload.mid,
            ostate:0,
            otime:payload.orderdate,
            pdesc:payload.desc,
            disid:0
          }
          const result=yield call(addorder,order);
          if(result.success)
          {
            payload.place.pstate=1;
            data=yield call(updateplace,payload.place);
          }
          callback && callback(data);
         }else{
           callback && callback();
         }
        // }
         
        
    },
  },
}
