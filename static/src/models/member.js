import { register,querylist,loadmemeber,update,getusrmsg,loadmemberbyphone } from "../services/member";
import { addaccournt } from "../services/accournt";
import { loadsingle } from "../services/config";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import moment from 'moment';
import {Toast} from 'antd-mobile';
import { routerRedux } from "dva/router";
import {mtype} from '../utils/enum';
export default {
  namespace: "member",
  state: {
    mobilemsg:'',
    loginuser:{},
    checkmember:{},
    memberlist:[],
    resultmsg: '您还不是我们的会员，请到店体验吧！我们的位置：北京市海淀区北四环西路68号6层。',
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
      const result = yield call(querylist, {phonenum:payload.phone});
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
            yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}?v1`, }));
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
        }
        else{
          
          const param = {
            membercode: Math.random().toString(20).substr(2),
            memberopenid: payload.userInfo.openid,
            mpd: 0,
            mname: payload.userInfo.nickname,
            phonenum: payload.phone,
            mstate: 0,
            mregisttime: moment().format('YYYY-MM-DD HH:mm:ss'),
            mtype: 0,
            mdesc: '',
            mmoney: 0
          }
          result = yield call(register, param);
          const luser = yield call(loadmemberbyphone, {
            phonenum: payload.phone
          });
           loginuser.member = luser.data.record[0];
        }
        if(result.success)
        {
          yield put({
            type: "updateState",
            payload: {
              loginuser,
            }
          });
          Toast.info('注册成功', 1);
          yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}`, }));
        }else{
          Toast.info('注册失败，请稍后再试', 1);
        }
    },
    *getmemberlist({ payload }, { call, put }) {
      const data = yield call(querylist, payload);
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
      if (payload.rechargetype === "1")
      {
        let rechargev = parseInt(payload.rechargevalue);
        if (rechargev > 1000 && rechargev <= 2000)
        {
          rechargev = rechargev+100;
        }
        if (rechargev > 2000 && rechargev <= 5000) {
          rechargev = rechargev + 200;
        }
        if (rechargev > 5000) {
          rechargev = rechargev + 500;
        }
        //充值的
        checkmember.mtype = 0;
        checkmember.mregisttime = moment().format('YYYY-MM-DD HH:mm:ss');
        checkmember.mmoney = parseInt(checkmember.mmoney) + rechargev;
        accournt.atype=1;
        accournt.amoney = parseInt(payload.rechargevalue) * config.data.rechargedis;
        accournt.asmoney = parseInt(payload.rechargevalue) * config.data.rechargedis;
        accournt.adesc ='会员充值';
      } else if (payload.rechargetype === "2") {
        //开卡的
        debugger;
        checkmember.mregisttime = payload.cardusedate;
        checkmember.mtype = parseInt(payload.cardtype);
        accournt.atype = 2;
        accournt.amoney = payload.cardtype === '1' ? config.data.dayvalue : payload.cardtype === '2' ? config.data.weekvalue : payload.cardtype === '3' ? config.data.monthvalue : config.data.sessionvalue;
        accournt.asmoney = payload.cardtype === '1' ? config.data.dayvalue : payload.cardtype === '2' ? config.data.weekvalue : payload.cardtype === '3' ? config.data.monthvalue : config.data.sessionvalue;
        accournt.adesc = mtype[payload.cardtype];
      }else{
        const pcitem = productcardlist.find((item) => {
          return item.pcid === parseInt(payload.pctype)
        });
        checkmember.mpd = pcitem.pcid;
        checkmember.mregisttime = moment(checkmember.mregisttime).format('YYYY-MM-DD HH:mm:ss');
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
