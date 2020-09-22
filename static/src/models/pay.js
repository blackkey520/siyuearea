import { paymoney } from "../services/member";
import { addaccournt } from "../services/accournt";
import { querylist,update } from "../services/member";
import { loadsingle } from "../services/config";
import moment from 'moment';
import {mtype} from '../utils/enum';
export default {
  namespace: "pay",
  state: {
    paysuccess:false,
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *payhandle({payload},{call,put}){
       
    },
    *paym({ payload }, { call, put }) {
        payload.money=1;
        const result = yield call(paymoney, payload);
    },
  },
}
