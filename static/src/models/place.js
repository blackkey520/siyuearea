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
import {addorder,queryorderlist} from "../services/order";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import {Toast} from 'antd-mobile';
import moment from 'moment';

export default {
  namespace: "place",
  state: {
    placelist:[],
    selectPlace:null,
    selectRecord:null,
    traillist:[],
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
    *placehandle({ payload }, { call, put,select }) {
      
        const place = yield select(state => state.place);
        let selectPlace=place.selectPlace;
        let selectRecord=place.selectRecord;
        delete selectPlace.ptypen;
        if (selectPlace.pstate == 0) {
          yield call(addsinglerecord, {
            pid: selectPlace.pid,
            odrdate: moment().format('YYYY-MM-DD HH:mm:ss'),
            odrtype: payload.values.odrtype,
            isfinish:0,
            odrdesc: payload.values.odrdesc || '',
          });
          selectPlace.pstate = 4;
          yield call(updateplace, selectPlace);
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
