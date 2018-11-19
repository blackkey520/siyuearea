import { register,querylists,loadmemeber,update,getusrmsg,loadmemberbyphone } from "../services/member";
import { addaccournt } from "../services/accournt";
import { loadsingle } from "../services/config";
import moment from 'moment';
import { routerRedux } from "dva/router";
import {mtype} from '../utils/enum';
export default {
  namespace: "member",
  state: {
    mobilemsg:'',
    loginuser:{},
    checkmember:{},
    memberlist:[],
    resultmsg: '您还不是我们的会员，请到店体验吧！我们的位置：北京市海淀区北四环西路68号左岸工社6层。',
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
    loaddataSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        memberlist: actionData.data.record,
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.data.totalRecord || 0
        }
      };
    }
  },
  subscriptions: {
  },
  effects: {
    *getusrbyphone({payload},{call,out,put}){
      const result = yield call(loadmemberbyphone, {
        phonenum: payload.phone
      });
      if(result.success&&result.data.record.length!==0)
      {
        yield put({
            type: "updateState",
            payload: {
              loginuser:{member:result.data.record[0]},
            }
          });
          yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}`, }));
      }else{
          yield put(routerRedux.push({ pathname: `/mobile/result/false/认证失败`, }));
      }
    },
    *getusrmsg({ payload }, { call, put }) {
        const result = yield call(getusrmsg, payload);
        if(result.success)
        {
          yield put({
            type: "updateState",
            payload: {
              loginuser:result.data,
            }
          });
          if(result.data.ismember)
          {
            yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}`, }));
          }
        }else{
          mobilemsg='系统出现问题，请稍后再试';
        }
    },
    *register({ payload }, { call, put,select }) {
        const { loginuser } = yield select(state => state.member);
        let result=null;
        const loaduser = yield call(loadmemberbyphone, {phonenum:payload.phone});
        if (loaduser.data.record.length !== 0)
        {
          const mem = loaduser.data.record[0];
          mem.memberopenid = payload.userInfo.openid;
          mem.mregisttime = moment(mem.mregisttime).format('YYYY-MM-DD HH:mm:ss');
          result = yield call(update, mem);
           loginuser.member = mem;
          yield put({
              type: "updateState",
              payload: {
                loginuser,
              }
            });
             
            yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}`, }));
        }
        else{
          yield put(routerRedux.push({ pathname: `/mobile/result/false/认证失败`, }));
          // const param = {
          //   membercode: Math.random().toString(20).substr(2),
          //   memberopenid: payload.userInfo.openid,
          //   mpd: 0,
          //   mname: payload.userInfo.nickname,
          //   phonenum: payload.phone,
          //   mstate: 0,
          //   mregisttime: moment().format('YYYY-MM-DD HH:mm:ss'),
          //   mtype: 0,
          //   mdesc: '',
          //   mmoney: 0
          // }
          // result = yield call(register, param);
          // const luser = yield call(loadmemberbyphone, {
          //   phonenum: payload.phone
          // });
          //  loginuser.member = luser.data.record[0];
        }
        
    },
    *getmemberlist({ payload }, { call, put }) {
      const data = yield call(querylists, payload);
      yield put({
        type: "loaddataSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
    *loadmember({ payload }, { call, put }) {
      const data = yield call(loadmemeber, payload);
      if (data && data.success) {
        yield put({
          type: "updateState",
          payload: {
            checkmember:data.data,
          }
        });
      }
    },
    *recharge({ payload }, { call, put,select }) {
			let data = null;
      const {checkmember} = yield select(state => state.member);
      const {productcardlist} = yield select(state => state.productcard);
      const callback = payload.callback;
      const accournt={};
      const config = yield call(loadsingle, { id:1 });
      accournt.mid = checkmember.mid;
      let overdate = moment().format('YYYY-MM-DD HH:mm:ss');
      if (payload.rechargetype === "1")
      {
        let rechargev = parseInt(payload.rechargevalue);
        if(rechargev<=500)
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
        accournt.atype=1;
        accournt.amoney = parseInt(payload.rechargevalue);
        accournt.asmoney = parseInt(payload.rechargevalue);
        accournt.adesc ='会员充值';
      } else if (payload.rechargetype === "2") {
        let kkmoney=0;
        // switch (payload.cardtype) {
        //   case 1:
        //     kkmoney = config.data.dayvalue * config.data.daydis
        //     break;
        //   case 2:
        //     kkmoney = config.data.weekvalue * config.data.weekdis
        //     break;
        //   case 3:
        //     kkmoney = config.data.monthvalue * config.data.monthdis
        //     break;
        //   case 4:
        //     kkmoney = config.data.sessionvalue * config.data.sessiondis
        //     break;
        //   case 5:
        //     kkmoney = config.data.weekzmvalue * config.data.weekzmdis
        //     break;
        //   case 6:
        //     kkmoney = config.data.monthzmvalue * config.data.monthzmdis
        //     break;
        //   case 7:
        //     kkmoney = config.data.sessionzmvalue * config.data.sessionzmdis
        //     break;
        //   case 8:
        //     kkmoney = config.data.weekzyvalue * config.data.weekzydis
        //     break;
        //   case 9:
        //     kkmoney = config.data.monthzyvalue * config.data.monthzydis
        //     break;
        //   case 10:
        //     kkmoney = config.data.sessionzyvalue * config.data.sessionzydis
        //     break;
        //   default:
        //     kkmoney = 0
        //     break;
        // }
         switch (payload.cardtype) {
           case 1:
             kkmoney = config.data.dayvalue
             break;
           case 2:
             kkmoney = config.data.weekvalue
             break;
           case 3:
             kkmoney = config.data.monthvalue
             break;
           case 4:
             kkmoney = config.data.sessionvalue
             break;
            case 5:
              kkmoney = config.data.hyearvalue
            break;
            case 6:
              kkmoney = config.data.yearvalue
            break;
           case 7:
             kkmoney = config.data.weekzmvalue
             break;
           case 8:
             kkmoney = config.data.monthzmvalue
             break;
           case 9:
             kkmoney = config.data.sessionzmvalue
             break;
           case 10:
             kkmoney = config.data.weekzyvalue
             break;
           case 11:
             kkmoney = config.data.monthzyvalue
             break;
           case 12:
             kkmoney = config.data.sessionzyvalue
             break;
           default:
             kkmoney = 0
             break;
         }
         if (payload.cardtype===1)
         {
           overdate = moment(payload.cardusedate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
         }
         if (payload.cardtype === 2 || payload.cardtype === 7 || payload.cardtype === 10)
         {
           overdate = moment(payload.cardusedate).add(7, 'days').format('YYYY-MM-DD HH:mm:ss');
         }
         if (payload.cardtype === 3 || payload.cardtype === 8 || payload.cardtype === 11) {
           overdate = moment(payload.cardusedate).add(1, 'month').format('YYYY-MM-DD HH:mm:ss');
         }
         if (payload.cardtype === 4 || payload.cardtype === 9 || payload.cardtype === 12) {
           overdate = moment(payload.cardusedate).add(3, 'month').format('YYYY-MM-DD HH:mm:ss');
         }
          if (payload.cardtype === 5 ) {
            overdate = moment(payload.cardusedate).add(6, 'month').format('YYYY-MM-DD HH:mm:ss');
          }
          if (payload.cardtype === 6) {
            overdate = moment(payload.cardusedate).add(12, 'month').format('YYYY-MM-DD HH:mm:ss');
          }
        //开卡的
        checkmember.mregisttime = overdate;
        checkmember.mtype = parseInt(payload.cardtype);
        accournt.atype = 2;
        accournt.amoney = kkmoney;
        accournt.asmoney = kkmoney;
        accournt.adesc = mtype[payload.cardtype];
      }else{
        const pcitem = productcardlist.find((item) => {
          return item.pcid === parseInt(payload.pctype)
        });
        checkmember.mpd = pcitem.pcid;
        checkmember.mregisttime = moment(pcitem.etime).format('YYYY-MM-DD HH:mm:ss');
        accournt.atype = 3;
        accournt.amoney = pcitem.value;
        accournt.asmoney = pcitem.value;
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
			callback && callback(data);
    },
    *extendovertime({ payload }, { call, put }) {
			let data = null;
			const callback = payload.callback;
      delete payload.callback;
      delete payload.param.btime;
      delete payload.param.etime;
      delete payload.param.isused;
      delete payload.param.pcdesc;
      delete payload.param.pcname;
      delete payload.param.value;
      payload.param.mregisttime = moment(payload.param.mregisttime).add(payload.extenddays, 'days').format('YYYY-MM-DD HH:mm:ss');
      data = yield call(update, payload.param);
			callback && callback(data);
		},
    *savemember({ payload }, { call, put }) {
			let data = null,
				tableData = null;
			const callback = payload.callback;
      delete payload.callback;
      payload.param.mpd=0;
			if (payload.param.id) {
        payload.param.mid = payload.param.id;
        payload.param.mregisttime = moment(payload.param.mregisttime).format('YYYY-MM-DD HH:mm:ss');
        delete payload.param.id;
				data = yield call(update, payload.param);
			} else {
        payload.param.membercode = Math.random().toString(20).substr(2);
        payload.param.memberopenid = '-';
         delete payload.param.id;
				data = yield call(register, payload.param);
      }
			callback && callback(data);
		}
  },
}
