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
  updaterecord
} from "../services/order";
import {opendoor} from "../services/locker";
import { addaccournt } from "../services/accournt";
import {loadmemeber,update} from "../services/member";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import {Toast} from 'antd-mobile';
import moment from 'moment';
import { GetMoney } from '../utils';
import {mtype} from '../utils/enum';
import { delay } from 'dva/saga';


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
        const money = GetMoney(moment(recordr.data.record[0].btime), moment());
        const accournt = {};
        const member = memberr.data;
        const order = orderr.data.record[0];
        const record = recordr.data.record[0];
        accournt.mid = member.mid;
        if (member.mtype === 0)
        {
          // if (member.mmoney >= money) {
            accournt.atype = 3;
            accournt.amoney = parseInt(member.mmoney);
            accournt.asmoney = parseInt(member.mmoney) - parseInt(money);
           accournt.adesc = `人工结束订单->充值消费 ${money} 元`;
            yield call(update, {
              mid:member.mid,
              mmoney: member.mmoney - money
            });
          // }
        }else{
          accournt.atype = 3;
          accournt.amoney = 0;
          accournt.asmoney = 0;
           accournt.adesc = `人工结束订单-> ${ mtype[member.mtype]}会员卡消费`;
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
          etime: moment().format('YYYY-MM-DD HH:mm:ss')
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
        if (days < 0) {
          //过期了
          Toast.info('您的会员已过期', 1);
        }else{
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
            pdesc:payload.desc
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
        }
         
        
    },
  },
}
