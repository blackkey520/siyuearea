import {
    querylist,
    updatesuggest
} from "../services/suggest";

export default {
  namespace: "suggest",
  state: { 
    suggestlist:[],
     pagination: {
       current: 1,
       pageSize: 100,
       total: 0
     }
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
  },
  effects: {
    *feedbackmsg({ payload }, { call, put,select }) {
      const callback = payload.callback;
      let data = yield call(updatesuggest, {
        sid:payload.sid,
        feedback:payload.feedback,
      });  
      callback && callback(data);
    },
    *getsuggestlist({payload},{call,out,put}){
      const result = yield call(querylist, {
           page:payload.page,
           pageSize:payload.pageSize
      });
      if(result.success&&result.data.record.length!==0)
      {
        yield put({
            type: "updateState",
            payload: {
              suggestlist: result.data.record,
              pagination: {
                  current: payload.page,
                  pageSize: payload.pageSize,
                  total: result.data.totalRecord
              }
            }
          });
      }
    },
    }
}
