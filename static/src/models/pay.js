import { paymoney } from "../services/member";

export default {
  namespace: "pay",
  state: {
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *paym({ payload }, { call, put }) {
        payload.money=1;
        const result = yield call(paymoney, payload);
    },
  },
}
