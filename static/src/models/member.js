import { register,querylist,loadmemeber,update,getusrmsg } from "../services/member";
import { addaccournt } from "../services/accournt";
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
            yield put(routerRedux.push({ pathname: `/mobile/${payload.routerid}`, }));
          }
        }else{
          mobilemsg='系统出现问题，请稍后再试';
        }
    },
    *register({ payload }, { call, put,select }) {
        const param={
          membercode:Math.random().toString(20).substr(2),
          memberopenid:payload.userInfo.openid,
          mname:payload.userInfo.nickname,
          phonenum:payload.phone,
          mstate:0,
          mregisttime: moment().format('YYYY-MM-DD HH:mm:ss'),
          mtype:1,
          mdesc:'',
          mmoney:0
        }
        const { loginuser } = yield select(state => state.member);
       
        const result = yield call(register, param);
        if(result.success)
        {
           loginuser.member=result.data;
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
      const callback = payload.callback;
      const accournt={};
      accournt.mid = checkmember.mid;
      if(payload.recchargetype===0)
      {
        let rechargev = parseInt(payload.rechargevalue);
        if(rechargev>1000)
        {
          rechargev = rechargev+100;
        }
        if (rechargev > 2000) {
          rechargev = rechargev + 200;
        }
        if (rechargev > 5000) {
          rechargev = rechargev + 500;
        }
        //充值的
        checkmember.mtype = 0;
        checkmember.mregisttime = moment().format('YYYY-MM-DD HH:mm:ss');
        checkmember.mmoney = parseInt(checkmember.mmoney) + rechargev;
        accournt.atype=0;
        accournt.amoney = rechargev;
        accournt.asmoney = rechargev;
        accournt.adesc ='会员充值';
      }else{
        //开卡的
        checkmember.mregisttime = payload.cardusedate;
        checkmember.mtype = parseInt(payload.cardtype);
        accournt.atype = 1;
        accournt.amoney = payload.cardtype === '1' ? 140 : payload.cardtype === '2' ? 488 : payload.cardtype === '3'?1688:3688;
        accournt.asmoney = payload.cardtype === '1' ? 140 : payload.cardtype === '2' ? 488 : payload.cardtype === '3' ? 1688 : 3688;
        accournt.adesc = mtype[payload.cardtype];
      }
      accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
      accournt.astate = 0;
      delete checkmember.nextOne;
      delete checkmember.preOne;
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

      // membercode: Math.random().toString(20).substr(2),
      //   memberopenid: payload.userInfo.openid,
      //   mname: payload.userInfo.nickname,
      //   phonenum: payload.phone,
      //   mstate: 1,
      //   mregisttime: moment().format('YYYY-MM-DD HH:mm:ss'),
      //   mtype: 1,
      //   mdesc: '',
      //   mmoney: 0
			callback && callback(data);
		}
  },
}
