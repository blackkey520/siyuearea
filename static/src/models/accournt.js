import { querylist } from "../services/accournt";
import moment from 'moment';
import {ListView} from 'antd-mobile';
const DataSource = ListView.DataSource;

export default {
  namespace: "accournt",
  state: {
    accourntlist: [],
    errormsg:'',
    atype:100,
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
        accourntlist: actionData.data.record,
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
    *getaccourntlistbymid({ payload }, { call, put,select }) {
      const param={};
      param.mid = payload.mid;
       
      if (payload.atype !== undefined) {
        param.atype = payload.atype;
      }
      if (payload.astate !== undefined) {
        param.astate = payload.astate;
      }
      if (payload.btime !== undefined) {
        param.btime = payload.btime;
        param.etime = payload.etime;
      }
      
      const data = yield call(querylist, payload.page,payload.pageSize,param);
      yield put({
        type: "loaddataSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
    *getaccourntlist({ payload }, { call, put }) {
      const param={};
      if (payload.membercode!==undefined)
      {
        param.membercode = payload.membercode;
      }
      if (payload.atype !== undefined)
      {
        param.atype = payload.atype;
      }
      if (payload.astate !== undefined)
      {
        param.astate = payload.astate;
      }
      if (payload.btime !== undefined)
      {
          param.btime = payload.btime;
          param.etime = payload.etime;
      }
      const data = yield call(querylist, payload.page,payload.pageSize,param);
      yield put({
        type: "loaddataSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
  },
}
