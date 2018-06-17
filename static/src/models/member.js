import { register,querylist,loadmemeber,update,getusrmsg } from "../services/member";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import moment from 'moment';
import {Toast} from 'antd-mobile';
import { routerRedux } from "dva/router";
export default {
  namespace: "member",
  state: {
    mobilemsg:'',
    loginuser:{},
    checkmember:{},
    memberlist:[],
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
          mstate:1,
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
      checkmember.mregisttime = moment(checkmember.mregisttime).format('YYYY-MM-DD HH:mm:ss');
      checkmember.mmoney=parseInt(checkmember.mmoney)+parseInt(payload.rechargevalue);
      delete checkmember.nextOne;
      delete checkmember.preOne;
      data = yield call(update, checkmember);
			callback && callback(data);
		},
    *savemember({ payload }, { call, put }) {
			let data = null,
				tableData = null;
			const callback = payload.callback;
      delete payload.callback;
			if (payload.param.id!==null) {
        payload.param.mid = payload.param.id;
        payload.param.mregisttime = moment(payload.param.mregisttime).format('YYYY-MM-DD HH:mm:ss');
        delete payload.param.id;
				data = yield call(update, payload.param);
			} else {
         delete payload.param.id;
				data = yield call(register, payload.param);
      }
			callback && callback(data);
		}
  },
}
