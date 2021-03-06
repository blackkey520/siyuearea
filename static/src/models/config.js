import { update,loadsingle,paytest } from "../services/config";
import { routerRedux } from "dva/router";
export default {
  namespace: "config",
  state: {
    checkconfig: {},
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *loadconfig({ payload }, { call, put }) {
      const data = yield call(loadsingle, payload);
      if (data && data.success) {
        yield put({
          type: "updateState",
          payload: {
            checkconfig: data.data
          }
        });
      }
    },
    * testpay({payload},{call,put})
    {
       const data = yield call(paytest, {money:payload.money});
    },
    *saveconfig({ payload }, { call, put,select }) {
        let data = null;
        const callback = payload.callback;
        delete payload.callback;
        data = yield call(update, payload.param);
        callback && callback(data);
    }
  },
}
