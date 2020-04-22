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
    searchval:'',
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
          mem.mrtime = moment().format('YYYY-MM-DD HH:mm:ss');
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
          pageSize: payload.pageSize,
          searchval: payload.membercode
        }
      });
    },
    *loadmember({ payload }, { call, put }) {
      const data = yield call(loadmemeber, payload);
      if (data && data.success) {
        data.data.mregisttime = moment(data.data.mregisttime).format('YYYY-MM-DD HH:mm:ss');
        data.data.mrtime = moment(data.data.mrtime).format('YYYY-MM-DD HH:mm:ss');
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
      let mmtype=checkmember.mtype;
      let mmoney = checkmember.mmoney == null ? 0 : checkmember.mmoney;
      let mpd = checkmember.mpd;
      if (payload.rechargetype === "1")
      {
        let rechargev = parseInt(payload.rechargevalue);
        if (rechargev <= 1000) {
           overdate = moment().add(4, 'month').format('YYYY-MM-DD 00:00:00');
        }
        if (rechargev == 1500 && rechargev == 2000)
        {
          overdate = moment().add(6, 'month').format('YYYY-MM-DD 00:00:00');
        }
        if (rechargev == 2500 && rechargev == 3000) {
           overdate = moment().add(8, 'month').format('YYYY-MM-DD 00:00:00');
        }
        if (rechargev == 3500 && rechargev == 4000) {
          overdate = moment().add(10, 'month').format('YYYY-MM-DD 00:00:00');
        }
        if (rechargev == 4500 && rechargev == 5000) {
           overdate = moment().add(12, 'month').format('YYYY-MM-DD 00:00:00');
        }
         accournt.amoney = parseInt(mmoney);
         accournt.asmoney = rechargev + parseInt(mmoney);
        //充值的
        mmtype = 0;
        mmoney = parseInt(mmoney) + rechargev;
        accournt.atype=1;
        accournt.adesc = `人工会员充值->${rechargev}元`;
      } else if (payload.rechargetype === "2") {
        let kkmoney=0;

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
           overdate = moment(payload.cardusedate).add(1, 'days').format('YYYY-MM-DD 00:00:00');
         }
         if (payload.cardtype === 2 || payload.cardtype === 7 || payload.cardtype === 10)
         {
           overdate = moment(payload.cardusedate).add(7, 'days').format('YYYY-MM-DD 00:00:00');
         }
         if (payload.cardtype === 3 || payload.cardtype === 8 || payload.cardtype === 11) {
           overdate = moment(payload.cardusedate).add(1, 'month').format('YYYY-MM-DD 00:00:00');
         }
         if (payload.cardtype === 4 || payload.cardtype === 9 || payload.cardtype === 12) {
           overdate = moment(payload.cardusedate).add(3, 'month').format('YYYY-MM-DD 00:00:00');
         }
          if (payload.cardtype === 5 ) {
            overdate = moment(payload.cardusedate).add(6, 'month').format('YYYY-MM-DD 00:00:00');
          }
          if (payload.cardtype === 6) {
            overdate = moment(payload.cardusedate).add(12, 'month').format('YYYY-MM-DD 00:00:00');
          } 
        //开卡的 
        mmtype = parseInt(payload.cardtype);
        accournt.atype = 1;
        accournt.amoney = 0;
        accournt.asmoney = 0;
        accournt.adesc = `人工会员开卡->${mtype[payload.cardtype]}`;
      } 
      accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
      accournt.astate = 0; 
      overdate = moment(overdate).add(1, 'days').format('YYYY-MM-DD 00:00:00');
      data = yield call(update, {
        mid:checkmember.mid,
        mregisttime:overdate,
        mtype: mmtype,
        mmoney,
        mpd
      });
      //记账
      const accourntdata = yield call(addaccournt, accournt);
			callback && callback(data);
    },
    *memberpause({ payload }, { call, put }) {
			let data = null;
      const callback = payload.callback;
       const accournt = {};
       accournt.mid = payload.param.mid;
       accournt.atype = 1;
       accournt.astate = 0;
       accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
      if (payload.param.mstate == 2)
      {
         data = yield call(update, {
           mid: payload.param.mid,
           mstate: 0,
           pausemark: null,
           mregisttime: moment().add((payload.param.pausemark+1),'days').format('YYYY-MM-DD HH:mm:ss')
         });
         accournt.adesc = `人工会员恢复->为用户恢复${payload.param.pausemark}天，恢复后时间 ${moment().add(payload.param.pausemark,'days').format('YYYY-MM-DD HH:mm:ss')}`;
      }else{
        const aaa= moment(payload.param.mregisttime);
         data = yield call(update, {
           mid: payload.param.mid,
           mstate: 2,
           pausemark: moment(payload.param.mregisttime).diff(moment(), 'days', false)
         });
         accournt.adesc = `人工会员暂停->为用户暂停，会员剩余 ${moment(payload.param.mregisttime).diff(moment(), 'days', false)} 天`;
      }
      yield call(addaccournt, accournt);
			callback && callback(data);
    },
    *extendovertime({ payload }, { call, put }) {
			let data = null;
			const callback = payload.callback;
      data = yield call(update, {
        mid: payload.param.mid,
        mregisttime: moment(payload.param.mregisttime).add(payload.extenddays, 'days').format('YYYY-MM-DD HH:mm:ss')
      });
        const accournt = {};
        accournt.mid = payload.param.mid;
        accournt.atype = 1;
        accournt.astate = 0;
        accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
        accournt.amoney = parseInt(payload.param.mmoney);
        accournt.asmoney = parseInt(payload.param.mmoney);
        accournt.adesc = `人工延期：->${payload.extenddays}天，说明：${payload.yqdesc}`;
        const accourntdata = yield call(addaccournt, accournt);
			callback && callback(data);
    },
    *chargingmoney({ payload }, { call, put }) {
			let data = null;
      const callback = payload.callback;
       const accournt = {};
       accournt.mid = payload.param.mid;
       accournt.atype = 1;
       accournt.astate = 1;
       accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
       accournt.amoney = parseInt(payload.param.mmoney);
       accournt.asmoney = parseInt(payload.param.mmoney) - parseInt(payload.kftext);
       accournt.adesc = `人工扣费：->${payload.kftext}元`;
       const accourntdata = yield call(addaccournt, accournt);
      data = yield call(update, {
        mid: payload.param.mid,
        mmoney: payload.param.mmoney - payload.kftext
      });
     
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
        payload.param.mrtime = moment(payload.param.mrtime).format('YYYY-MM-DD HH:mm:ss');
				data = yield call(update, payload.param);
			} else {
        payload.param.membercode = Math.random().toString(20).substr(2);
        payload.param.memberopenid = '-';
        delete payload.param.id;
        payload.param.mmoney=0;
        payload.param.memberprogramopenid='';
        payload.param.mrtime = moment().format('YYYY-MM-DD HH:mm:ss');
          const membercheck = yield call(loadmemberbyphone, {
            phonenum: payload.param.phonenum
          }); 
        if (membercheck.data.record.length !== 0)
        {
        }
				else{
          data = yield call(register, payload.param);
        }
      }
			callback && callback(data);
		} 
  },
}
