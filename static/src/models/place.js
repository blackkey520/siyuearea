import {querylist, updateplace} from "../services/place";
import {addorder} from "../services/order";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import moment from 'moment';

export default {
  namespace: "place",
  state: {
    placelist:[],
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *getplacelist({ payload }, { call, put }) {
        const result = yield call(querylist, payload); 
        yield put({
            type: "updateState",
            payload: {
                placelist:result.data.record
            }
        });
    },
     *orderplace({ payload }, { call, put }) {
        let data = null;
        const callback = payload.callback;
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
    },
  },
}
