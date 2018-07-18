import { paymoney } from "../services/member";
import { addaccournt } from "../services/accournt";
import { querylist,update } from "../services/member";
import { loadsingle } from "../services/config";
import moment from 'moment';
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
      let data = null;
      let paysuccess=false;
      
      //openid
      if (payload.issuc)
      {
        const userlist = yield call(querylist, {
          page:1,
          pageSize:1000,
          memberopenid: payload.openid
        });
        let checkmember = userlist.data.record[0];

        const consin = yield call(loadsingle, {
          id: 1
        });
        const config = consin.data;

        const accournt = {};
        
        accournt.mid = checkmember.mid;
        accournt.adesc = payload.title;
        checkmember.mregisttime = moment().format('YYYY-MM-DD HH:mm:ss');
         
        if (payload.type === "1") {
          let rechargev = parseInt(payload.money);
          if (rechargev > 1000 && rechargev <= 2000) {
            rechargev = rechargev + 100;
          }
          if (rechargev > 2000 && rechargev <= 5000) {
            rechargev = rechargev + 200;
          }
          if (rechargev > 5000) {
            rechargev = rechargev + 500;
          }
          //充值的
          checkmember.mtype = 0;
          checkmember.mmoney = parseInt(checkmember.mmoney) + rechargev;
          accournt.atype = 1;
          accournt.amoney = parseInt(payload.money) * config.data.rechargedis;
          accournt.asmoney = parseInt(payload.money) * config.data.rechargedis;
        } else if (payload.type === "2") {
          //开卡的
          checkmember.mtype = parseInt(payload.mtype);
          accournt.atype = 2;
          accournt.amoney = payload.money;
          accournt.asmoney = payload.money;
        } else {
          checkmember.mpd = payload.mtype;
          accournt.atype = 3;
          accournt.amoney = payload.money;
          accournt.asmoney = payload.money;
        }
        accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
        accournt.astate = 0;
        delete checkmember.pcname;
        delete checkmember.btime;
        delete checkmember.etime;
        delete checkmember.isused;
        delete checkmember.pcdesc;
        delete checkmember.value;
        data = yield call(update, checkmember);
        //记账
        const accourntdata = yield call(addaccournt, accournt);
        if (data && data.success && accourntdata && accourntdata.success)
        {
          paysuccess=true;
        }
      }
      yield put({
        type: "updateState",
        payload: {
          paysuccess,
        }
      });
    },
    *paym({ payload }, { call, put }) {
        payload.money=1;
        const result = yield call(paymoney, payload);
    },
  },
}
