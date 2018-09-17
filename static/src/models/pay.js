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
      let data = null;
      let paysuccess=false;
      //openid
      if (payload.issuc==="true")
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
        let overdate = moment().format('YYYY-MM-DD HH:mm:ss');
        accournt.mid = checkmember.mid;
        accournt.adesc = payload.title;
        checkmember.mregisttime = moment().format('YYYY-MM-DD HH:mm:ss');
         
        if (payload.type === "1") {
          let rechargev = parseInt(payload.money);
          if(rechargev<500)
        {
          overdate = moment().add(1, 'month').format('YYYY-MM-DD HH:mm:ss');
        }
         if (rechargev >= 500 && rechargev < 1000) {
           overdate = moment().add(2, 'month').format('YYYY-MM-DD HH:mm:ss');
         }
          if (rechargev > 1000 && rechargev < 2000)
        {
          overdate = moment().add(3, 'month').format('YYYY-MM-DD HH:mm:ss');
        }
        if (rechargev >= 2000 && rechargev < 5000) {
           overdate = moment().add(5, 'month').format('YYYY-MM-DD HH:mm:ss');
        }
        if (rechargev > 5000) {
           overdate = moment().add(12, 'month').format('YYYY-MM-DD HH:mm:ss');
        }
          //充值的
          checkmember.mtype = 0;
          checkmember.mregisttime = overdate;
          checkmember.mmoney = parseInt(checkmember.mmoney) + rechargev;
          accournt.atype = 1;
          accournt.amoney = parseInt(payload.money);
          accournt.asmoney = parseInt(payload.money);
        } else if (payload.type === "2") {
           
           if (payload.cardtype === 1) {
             overdate = moment(payload.cardusedate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
           }
           if (payload.cardtype === 2 || payload.cardtype === 5 || payload.cardtype === 8) {
             overdate = moment(payload.cardusedate).add(7, 'days').format('YYYY-MM-DD HH:mm:ss');
           }
           if (payload.cardtype === 3 || payload.cardtype === 6 || payload.cardtype === 9) {
             overdate = moment(payload.cardusedate).add(1, 'month').format('YYYY-MM-DD HH:mm:ss');
           }
           if (payload.cardtype === 4 || payload.cardtype === 7 || payload.cardtype === 10) {
             overdate = moment(payload.cardusedate).add(3, 'month').format('YYYY-MM-DD HH:mm:ss');
           }
          //开卡的
          checkmember.mregisttime = overdate;
          checkmember.mtype = parseInt(payload.mtype);
          accournt.atype = 2;
          accournt.amoney = payload.money;
          accournt.asmoney = payload.money;
          accournt.adesc = mtype[payload.mtype];
        } else {
          const pcitem = productcardlist.find((item) => {
            return item.pcid === parseInt(payload.mtype)
          });
          checkmember.mpd = payload.mtype;
          checkmember.mregisttime = moment(pcitem.etime).format('YYYY-MM-DD HH:mm:ss');
          accournt.atype = 3;
          accournt.amoney = payload.money;
          accournt.asmoney = payload.money;
          accournt.adesc = pcitem.pcname;
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
